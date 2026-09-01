import Link from "next/link";

import { ExcelifyLogo } from "@/components/brand/ExcelifyLogo";

const FOOTER_LINKS = {
  Tools: [
    { label: "All Tools", href: "/tools" },
    { label: "Excel Cleaner", href: "/tools/excel-cleaner" },
    { label: "Compare Excel Files", href: "/tools/excel-compare" },
    { label: "Match & Bring Data", href: "/tools/excel-match" },
    { label: "Ageing", href: "/tools/excel-ageing" },
  ],
  Solutions: [
    { label: "All Solutions", href: "/solutions" },
    { label: "Compare Two Excel Files", href: "/solutions/compare-two-excel-files" },
    { label: "XLOOKUP Between Two Files", href: "/solutions/xlookup-between-two-files" },
    { label: "Remove Duplicates from Excel", href: "/solutions/remove-duplicates-excel" },
    { label: "Calculate Excel Ageing", href: "/solutions/calculate-excel-ageing" },
  ],
  Product: [
    { label: "Home", href: "/" },
    { label: "Open App", href: "/app" },
    { label: "FAQ", href: "/#faq" },
  ],
} as const;

interface PublicSiteChromeProps {
  children: React.ReactNode;
}

export function PublicSiteChrome({ children }: PublicSiteChromeProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <ExcelifyLogo href="/" />
          <nav className="flex items-center gap-4 text-sm" aria-label="Public navigation">
            <Link
              href="/tools"
              className="hidden font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)] sm:inline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              Tools
            </Link>
            <Link
              href="/solutions"
              className="hidden font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)] sm:inline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              Solutions
            </Link>
            <Link
              href="/app"
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              Open App
            </Link>
          </nav>
        </div>
      </header>

      <main className="px-6 py-10 md:py-14">{children}</main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-lg font-bold text-[var(--color-text)]">Excelify</p>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Simple online tools to clean, compare and work with Excel and CSV files.
              </p>
            </div>

            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <p className="text-sm font-semibold text-[var(--color-text)]">{group}</p>
                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-text-subtle)]">
            © 2026 Excelify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
