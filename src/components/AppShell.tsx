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
      className={`block rounded-lg px-3 py-2.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
        isActive
          ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
          : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      <p className="text-sm font-semibold">{item.label}</p>
      {item.description && (
        <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
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
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main
        </p>
        <NavLink item={HOME_NAV} pathname={pathname} onNavigate={onNavigate} />
      </div>

      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white/80 px-4 py-6 md:block">
          <div className="mb-8 px-2">
            <Link
              href="/"
              className="group inline-flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              aria-label="Go to Excelify homepage"
            >
              <ExcelifyLogo href="" variant="full" priority />
              <p className="mt-2 text-xs text-slate-500 transition group-hover:text-slate-700">
                Work smarter with Excel.
              </p>
            </Link>
          </div>

          <SidebarNav pathname={pathname} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                aria-label="Go to Excelify homepage"
              >
                <ExcelifyLogo href="" variant="icon" />
                <span className="text-sm font-semibold text-slate-900">Excelify</span>
              </Link>

              <div className="hidden md:block">
                <Link
                  href="/"
                  className="text-sm font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Excelify
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/#faq"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Help
                </Link>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
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
              <div className="mt-4 border-t border-slate-100 pt-4">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-slate-600 md:text-base">{subtitle}</p>
                )}
              </div>
            )}
          </header>

          {mobileMenuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40 bg-slate-900/20 md:hidden"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
              />
              <div
                id="app-mobile-menu"
                className="fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-4 shadow-xl md:hidden"
              >
                <div className="mb-6 flex items-center justify-between">
                  <ExcelifyLogo href="/" variant="full" />
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 p-2 text-slate-700"
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
