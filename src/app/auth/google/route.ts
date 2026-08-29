import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { OAUTH_REDIRECT_COOKIE } from "@/lib/auth/oauth";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const redirect = getSafeRedirectPath(searchParams.get("redirect"));
  const loginErrorUrl = new URL("/login", origin);
  loginErrorUrl.searchParams.set("error", "auth_callback_failed");

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(loginErrorUrl);
  }

  const callbackUrl = `${origin}/auth/callback`;
  let authUrl: string | null = null;

  const response = NextResponse.redirect(loginErrorUrl);

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error || !data.url) {
    return response;
  }

  authUrl = data.url;
  const redirectResponse = NextResponse.redirect(authUrl);

  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  redirectResponse.cookies.set(OAUTH_REDIRECT_COOKIE, encodeURIComponent(redirect), {
    path: "/",
    maxAge: 600,
    sameSite: "lax",
  });

  return redirectResponse;
}
