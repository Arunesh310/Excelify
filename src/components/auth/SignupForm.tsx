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
import {
  getAuthErrorMessage,
  isStrongEnoughPassword,
  isValidEmail,
} from "@/lib/auth/errors";
import { signInWithGoogle } from "@/lib/auth/google";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirectPath(searchParams.get("redirect"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const configured = isSupabaseConfigured();

  function validate(): boolean {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!isValidEmail(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Please enter a password.";
    } else if (!isStrongEnoughPassword(password)) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSignUp(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

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
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("redirect", redirectTo);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { name: name.trim() },
          emailRedirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        setErrorMessage(getAuthErrorMessage(error));
        return;
      }

      if (data.session) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      setSuccessMessage("Check your email to confirm your Excelify account.");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setErrorMessage(null);
    setSuccessMessage(null);

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
    <form onSubmit={handleSignUp} className="flex flex-col gap-4" noValidate>
      {!configured && <SupabaseConfigNotice />}

      {errorMessage && <AuthAlert variant="error">{errorMessage}</AuthAlert>}
      {successMessage && <AuthAlert variant="success">{successMessage}</AuthAlert>}

      <AuthInput
        label="Name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={fieldErrors.name}
        disabled={loading || googleLoading}
      />

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
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={fieldErrors.password}
        disabled={loading || googleLoading}
      />

      <AuthInput
        label="Confirm Password"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        error={fieldErrors.confirmPassword}
        disabled={loading || googleLoading}
      />

      <AuthButton type="submit" loading={loading} disabled={googleLoading}>
        Create Account
      </AuthButton>

      <AuthDivider />

      <AuthButton
        type="button"
        variant="secondary"
        loading={googleLoading}
        disabled={loading}
        onClick={handleGoogleSignUp}
      >
        <GoogleIcon />
        Continue with Google
      </AuthButton>

      <p className="text-center text-sm text-[var(--color-text-muted)]">
        Already have an account?{" "}
        <Link
          href={`/login${redirectTo !== "/app" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
          className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
