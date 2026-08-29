export function ProductPreview() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            From messy spreadsheet to usable data.
          </h2>
          <p className="mt-3 text-sm text-[var(--color-text-subtle)]">
            Illustrative example — not real customer data
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
              Before
            </p>
            <div className="mt-4 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--color-surface-muted)]">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-[var(--color-text-muted)]">
                      Customer Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {['" Rahul "', '"Rahul"', '"  Priya"', '"Priya"'].map((row) => (
                    <tr key={row} className="border-t border-[var(--color-border)]">
                      <td className="px-4 py-2 font-mono text-[var(--color-text-muted)]">{row}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hidden text-center lg:block" aria-hidden="true">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              →
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-primary-muted)] bg-[var(--color-primary-light)]/30 p-6 shadow-[var(--shadow-sm)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              After
            </p>
            <div className="mt-4 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--color-surface-muted)]">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-[var(--color-text-muted)]">
                      Customer Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {["Rahul", "Priya"].map((row) => (
                    <tr key={row} className="border-t border-[var(--color-border)]">
                      <td className="px-4 py-2 text-[var(--color-text)]">{row}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-1 text-sm text-[var(--color-text-muted)]">
              <p>426 duplicates removed</p>
              <p>83 blank rows removed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
