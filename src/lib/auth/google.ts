"use client";

import { createClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { getSafeRedirectPath } from "@/lib/auth/redirect";

export async function signInWithGoogle(redirectTo: string): Promise<string | null> {
  const supabase = createClient();
  const callbackUrl = new URL("/auth/callback", window.location.origin);
  callbackUrl.searchParams.set("redirect", getSafeRedirectPath(redirectTo));

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    if (error.message.includes("provider is not enabled")) {
      return "Google Sign-In is not configured yet. Please contact support.";
    }

    return getAuthErrorMessage(error);
  }

  return null;
}
