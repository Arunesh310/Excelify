const TRUST_ITEMS = [
  "Browser-based processing",
  "Simple workflow",
  "No complicated formulas",
  "Privacy-focused",
] as const;

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold text-[var(--color-text)]">
          Built for everyday business spreadsheets
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
            >
              <span className="text-[var(--color-primary)]" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-[var(--color-text-subtle)]">
          Files are processed locally in your browser for supported tools.
        </p>
      </div>
    </section>
  );
}
