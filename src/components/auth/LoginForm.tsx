"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AuthAlert,
  AuthButton,
  GoogleIcon,
  SupabaseConfigNotice,
} from "@/components/auth/AuthForm";
import { signInWithGoogle } from "@/lib/auth/google";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirectPath(searchParams.get("redirect"));

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseConfigured();

  useEffect(() => {
    setLoading(false);

    const authError = searchParams.get("error");
    if (authError === "auth_callback_failed") {
      const details = searchParams.get("details");
      setErrorMessage(
        details
          ? `Google Sign-In failed: ${details}`
          : "Google Sign-In could not be completed. Please try again.",
      );
    }
  }, [searchParams]);

  async function handleGoogleSignIn() {
    setErrorMessage(null);

    if (!configured) {
      setErrorMessage("Authentication is not configured yet.");
      return;
    }

    setLoading(true);

    const timeoutId = window.setTimeout(() => {
      setLoading(false);
      setErrorMessage("Google Sign-In timed out. Please try again.");
    }, 15000);

    try {
      const error = await signInWithGoogle(redirectTo);
      window.clearTimeout(timeoutId);

      if (error) {
        setErrorMessage(error);
        setLoading(false);
      }
    } catch {
      window.clearTimeout(timeoutId);
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {!configured && <SupabaseConfigNotice />}

      {errorMessage && <AuthAlert variant="error">{errorMessage}</AuthAlert>}

      <AuthButton type="button" loading={loading} onClick={handleGoogleSignIn}>
        <GoogleIcon />
        Continue with Google
      </AuthButton>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Sign in with your Google account to access Excelify.
      </p>
    </div>
  );
}
