"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ExcelifyLogo } from "@/components/brand/ExcelifyLogo";

import {
  ALL_TOOLS_NAV,
  HOME_NAV,
  SIDEBAR_TOOL_ITEMS,
  isNavItemActive,
  type AppNavItem,
} from "@/lib/app/navigation";

interface AppShellProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: AppNavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const isActive = isNavItemActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`block cursor-pointer rounded-lg px-3 py-2.5 transition duration-[var(--transition-fast)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] ${
        isActive
          ? "bg-[var(--color-primary-light)] text-[var(--color-text)] ring-1 ring-[var(--color-primary-muted)]"
          : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]"
      }`}
    >
      <p className="text-sm font-semibold">{item.label}</p>
      {item.description && (
        <p className="mt-0.5 text-xs text-[var(--color-text-subtle)]">{item.description}</p>
      )}
    </Link>
  );
}

function SidebarNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-6" aria-label="Application navigation">
      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
          Main
        </p>
        <NavLink item={HOME_NAV} pathname={pathname} onNavigate={onNavigate} />
      </div>

      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
          Tools
        </p>
        <div className="flex flex-col gap-1">
          {SIDEBAR_TOOL_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
          Other
        </p>
        <NavLink item={ALL_TOOLS_NAV} pathname={pathname} onNavigate={onNavigate} />
      </div>
    </nav>
  );
}

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const showPageHeader = Boolean(title);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  return (
    <div className="app-shell-bg min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]/90 px-4 py-6 md:block">
          <div className="mb-8 px-2">
            <Link
              href="/"
              className="group inline-flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
              aria-label="Go to Excelify homepage"
            >
              <ExcelifyLogo href="" variant="full" priority />
              <p className="mt-2 text-xs text-[var(--color-text-subtle)] transition group-hover:text-[var(--color-text-muted)]">
                Reconcile in your browser.
              </p>
            </Link>
          </div>

          <SidebarNav pathname={pathname} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 px-4 py-4 backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                aria-label="Go to Excelify homepage"
              >
                <ExcelifyLogo href="" variant="icon" />
                <span className="text-sm font-semibold text-[var(--color-text)]">Excelify</span>
              </Link>

              <div className="hidden md:block">
                <Link
                  href="/"
                  className="text-sm font-semibold text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                >
                  Excelify
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/#faq"
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition duration-[var(--transition-fast)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                >
                  Help
                </Link>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="app-mobile-menu"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {showPageHeader && (
              <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)] md:text-3xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-[var(--color-text-muted)] md:text-base">{subtitle}</p>
                )}
              </div>
            )}
          </header>

          {mobileMenuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40 bg-[var(--color-text)]/20 md:hidden"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
              />
              <div
                id="app-mobile-menu"
                className="fixed inset-y-0 left-0 z-50 w-72 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-lg)] md:hidden"
              >
                <div className="mb-6 flex items-center justify-between">
                  <ExcelifyLogo href="/" variant="full" />
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-muted)]"
                    aria-label="Close menu"
                    onClick={closeMobileMenu}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <SidebarNav pathname={pathname} onNavigate={closeMobileMenu} />
              </div>
            </>
          )}

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
