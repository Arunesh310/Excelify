"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AuthAlert,
  GoogleIcon,
  SupabaseConfigNotice,
} from "@/components/auth/AuthForm";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirectPath(searchParams.get("redirect"));

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  const googleAuthHref =
    redirectTo === "/app"
      ? "/auth/google"
      : `/auth/google?redirect=${encodeURIComponent(redirectTo)}`;

  useEffect(() => {
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

  return (
    <div className="flex flex-col gap-4">
      {!configured && <SupabaseConfigNotice />}

      {errorMessage && <AuthAlert variant="error">{errorMessage}</AuthAlert>}

      {configured ? (
        <Link
          href={googleAuthHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <GoogleIcon />
          Continue with Google
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white opacity-60"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      )}

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Sign in with your Google account to access Excelify.
      </p>
    </div>
  );
}
