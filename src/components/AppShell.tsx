"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Upload & Preview", description: "View workbook data" },
  { href: "/clean", label: "Clean Data", description: "Clean messy spreadsheets" },
] as const;

interface AppShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white/80 px-4 py-8 md:block">
          <div className="mb-8 px-2">
            <Link href="/" className="text-xl font-bold text-slate-900">
              Excelify
            </Link>
            <p className="mt-1 text-xs text-slate-500">Work smarter with Excel.</p>
          </div>

          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white/80 px-6 py-8 backdrop-blur">
            <div className="md:hidden">
              <Link href="/" className="text-sm font-semibold text-emerald-700">
                Excelify
              </Link>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 md:mt-0">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-1 text-sm font-medium md:hidden ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-1 text-base text-slate-600">{subtitle}</p>
          </header>

          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
