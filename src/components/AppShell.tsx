"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ExcelifyLogo } from "@/components/brand/ExcelifyLogo";

import {
  DASHBOARD_NAV,
  HISTORY_NAV,
  TOOL_NAV_ITEMS,
  isNavItemActive,
  type AppNavItem,
} from "@/lib/app/navigation";

interface AppShellProps {
  title: string;
  subtitle: string;
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
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{item.label}</p>
        {item.comingSoon && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Soon
          </span>
        )}
        {item.devOnly && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-800">
            Dev
          </span>
        )}
      </div>
      {item.description && (
        <p className="text-xs text-slate-500">{item.description}</p>
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
        <NavLink item={DASHBOARD_NAV} pathname={pathname} onNavigate={onNavigate} />
      </div>

      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Tools
        </p>
        <div className="flex flex-col gap-1">
          {TOOL_NAV_ITEMS.map((item) => (
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
          History
        </p>
        <NavLink item={HISTORY_NAV} pathname={pathname} onNavigate={onNavigate} />
      </div>
    </nav>
  );
}

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white/80 px-4 py-8 md:block">
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
          <header className="border-b border-slate-200 bg-white/80 px-6 py-6 backdrop-blur md:py-8">
            <div className="flex items-center justify-between gap-4">
              <div className="md:hidden">
                <ExcelifyLogo href="/" variant="icon" />
              </div>

              <div className="ml-auto flex items-center gap-3">
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

            {mobileMenuOpen && (
              <div id="app-mobile-menu" className="mt-4 border-t border-slate-200 pt-4 md:hidden">
                <SidebarNav pathname={pathname} onNavigate={closeMobileMenu} />
              </div>
            )}

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-600 md:text-base">{subtitle}</p>
          </header>

          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
