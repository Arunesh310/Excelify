"use client";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function AuthButton({
  variant = "primary",
  loading,
  children,
  disabled,
  className = "",
  ...props
}: AuthButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const styles =
    variant === "primary"
      ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:outline-[var(--color-primary)]"
      : "border border-[var(--color-border-strong)] bg-white text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] focus-visible:outline-[var(--color-primary)]";

  return (
    <button
      className={`${base} ${styles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

export function AuthAlert({
  variant,
  children,
}: {
  variant: "error" | "success" | "info";
  children: React.ReactNode;
}) {
  const styles = {
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border-amber-200 bg-amber-50 text-amber-900",
  };

  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${styles[variant]}`}
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function SupabaseConfigNotice() {
  return (
    <AuthAlert variant="info">
      Supabase is not configured yet. Add{" "}
      <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
      and{" "}
      <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">
        NEXT_PUBLIC_SUPABASE_ANON_KEY
      </code>{" "}
      to your <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">.env.local</code> file.
    </AuthAlert>
  );
}
