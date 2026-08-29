"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  AuthAlert,
  AuthButton,
  AuthDivider,
  AuthInput,
  GoogleIcon,
  SupabaseConfigNotice,
} from "@/components/auth/AuthForm";
import { getAuthErrorMessage, isValidEmail } from "@/lib/auth/errors";
import { signInWithGoogle } from "@/lib/auth/google";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirectPath(searchParams.get("redirect"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const configured = isSupabaseConfigured();

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!isValidEmail(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Please enter your password.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);

    if (!configured) {
      setErrorMessage("Authentication is not configured yet.");
      return;
    }

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(getAuthErrorMessage(error));
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setErrorMessage(null);

    if (!configured) {
      setErrorMessage("Authentication is not configured yet.");
      return;
    }

    setGoogleLoading(true);

    try {
      const error = await signInWithGoogle(redirectTo);
      if (error) {
        setErrorMessage(error);
        setGoogleLoading(false);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setGoogleLoading(false);
    }
  }

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4" noValidate>
      {!configured && <SupabaseConfigNotice />}

      {errorMessage && <AuthAlert variant="error">{errorMessage}</AuthAlert>}

      <AuthInput
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
        disabled={loading || googleLoading}
      />

      <AuthInput
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={fieldErrors.password}
        disabled={loading || googleLoading}
      />

      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          Forgot password?
        </Link>
      </div>

      <AuthButton type="submit" loading={loading} disabled={googleLoading}>
        Sign In
      </AuthButton>

      <AuthDivider />

      <AuthButton
        type="button"
        variant="secondary"
        loading={googleLoading}
        disabled={loading}
        onClick={handleGoogleSignIn}
      >
        <GoogleIcon />
        Continue with Google
      </AuthButton>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup${redirectTo !== "/app" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
          className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
