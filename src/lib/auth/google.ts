"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getAuthErrorMessage } from "@/lib/auth/errors";
import { setOAuthRedirectCookie } from "@/lib/auth/oauth";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/config";

export async function signInWithGoogle(redirectTo: string): Promise<string | null> {
  const supabase = createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    isSingleton: false,
  });

  const safeRedirect = getSafeRedirectPath(redirectTo);
  setOAuthRedirectCookie(safeRedirect);

  const callbackUrl = `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    if (error.message.includes("provider is not enabled")) {
      return "Google Sign-In is not configured yet. Please contact support.";
    }

    return getAuthErrorMessage(error);
  }

  if (data?.url) {
    window.location.href = data.url;
    return null;
  }

  return "Could not start Google Sign-In. Please try again.";
}
