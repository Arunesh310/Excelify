"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AuthAlert,
  AuthButton,
  AuthInput,
  SupabaseConfigNotice,
} from "@/components/auth/AuthForm";
import { getAuthErrorMessage, isValidEmail } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseConfigured();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFieldError(null);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!configured) {
      setErrorMessage("Authentication is not configured yet.");
      return;
    }

    if (!email.trim()) {
      setFieldError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setFieldError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const redirectTo = new URL("/auth/update-password", window.location.origin);

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectTo.toString(),
      });

      if (error) {
        setErrorMessage(getAuthErrorMessage(error));
        return;
      }

      setSuccessMessage(
        "If an account exists for this email, we've sent a password reset link.",
      );
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {!configured && <SupabaseConfigNotice />}

      {errorMessage && <AuthAlert variant="error">{errorMessage}</AuthAlert>}
      {successMessage && <AuthAlert variant="success">{successMessage}</AuthAlert>}

      <p className="text-sm text-[var(--color-text-muted)]">
        Enter the email address associated with your account and we&apos;ll send you a
        reset link.
      </p>

      <AuthInput
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldError ?? undefined}
        disabled={loading}
      />

      <AuthButton type="submit" loading={loading}>
        Send Reset Link
      </AuthButton>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        <Link
          href="/login"
          className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
