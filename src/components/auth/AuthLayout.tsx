import Link from "next/link";

import { ExcelifyLogo } from "@/components/brand/ExcelifyLogo";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <div className="text-center">
          <div className="inline-flex justify-center">
            <ExcelifyLogo href="/" variant="full" />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{subtitle}</p>
            )}
          </div>
          {children}
        </div>

        <p className="text-center text-xs text-[var(--color-text-subtle)]">
          <Link
            href="/"
            className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          >
            Back to Excelify
          </Link>
        </p>
      </div>
    </div>
  );
}
