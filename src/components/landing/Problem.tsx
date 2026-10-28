const PROBLEMS = [
  "Removing duplicates manually",
  "Comparing two files with VLOOKUP/XLOOKUP",
  "Cleaning inconsistent data",
  "Calculating ageing",
  "Copying data between spreadsheets",
  "Repeating the same operations every day",
] as const;

export function Problem() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            Excel shouldn&apos;t feel like a second job.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Hours disappear into repetitive spreadsheet work. Excelify turns common spreadsheet
            tasks into simple workflows.
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <li
              key={problem}
              className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-muted)]"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 8.5l2.5 2.5 5.5-5.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {problem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
