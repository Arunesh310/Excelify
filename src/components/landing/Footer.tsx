const FOOTER_LINKS = {
  Tools: [
    { label: "All Tools", href: "/tools" },
    { label: "Clean Data", href: "/tools/excel-cleaner" },
    { label: "Compare Files", href: "/tools/excel-compare" },
    { label: "Match & Bring Data", href: "/tools/excel-match" },
    { label: "Ageing", href: "/tools/excel-ageing" },
  ],
  Solutions: [
    { label: "Compare Two Excel Files", href: "/solutions/compare-two-excel-files" },
    { label: "XLOOKUP Between Two Files", href: "/solutions/xlookup-between-two-files" },
    { label: "Remove Duplicates from Excel", href: "/solutions/remove-duplicates-excel" },
    { label: "Calculate Excel Ageing", href: "/solutions/calculate-excel-ageing" },
  ],
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Open App", href: "/app" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold text-[var(--color-text)]">Excelify</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Work smarter with Excel.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-sm font-semibold text-[var(--color-text)]">{group}</p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    >
                      {link.label}
                    </a>
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
  );
}
