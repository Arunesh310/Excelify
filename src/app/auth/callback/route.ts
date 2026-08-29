import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { OAUTH_REDIRECT_COOKIE } from "@/lib/auth/oauth";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const oauthError = searchParams.get("error");
  const oauthErrorDescription = searchParams.get("error_description");
  const redirectCookie = request.cookies.get(OAUTH_REDIRECT_COOKIE)?.value;
  const redirect = getSafeRedirectPath(
    redirectCookie ? decodeURIComponent(redirectCookie) : searchParams.get("redirect"),
  );
  const next = searchParams.get("next");

  const destination = next ? getSafeRedirectPath(next) : redirect;
  const redirectUrl = new URL(destination, origin);

  if (oauthError) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("error", "auth_callback_failed");
    if (oauthErrorDescription) {
      loginUrl.searchParams.set("details", oauthErrorDescription);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(OAUTH_REDIRECT_COOKIE, "", { path: "/", maxAge: 0 });

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  return response;
}
