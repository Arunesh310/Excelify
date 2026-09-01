const PRIVACY_POINTS = [
  "Local processing",
  "No unnecessary uploads",
  "No permanent file storage in the MVP",
] as const;

export function PrivacySection() {
  return (
    <section className="bg-[var(--color-surface-muted)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            Your spreadsheets are your business.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-muted)]">
            Clean, compare and match spreadsheets in your browser. Files stay on your device — they
            are not uploaded to Excelify for these tools.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {PRIVACY_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-medium text-[var(--color-text)]"
              >
                <span className="text-[var(--color-primary)]" aria-hidden="true">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
