import Link from "next/link";

function HeroMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg landing-animate landing-animate-delay-2"
      aria-hidden="true"
    >
      <div className="absolute -inset-4 rounded-[var(--radius-xl)] bg-[var(--color-primary-light)] opacity-60 blur-2xl" />
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs font-medium text-[var(--color-text-subtle)]">Excelify</span>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Clean Data
            </p>
            <p className="mt-1 text-lg font-semibold text-[var(--color-text)]">customers.xlsx</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
              <p className="text-xs text-[var(--color-text-subtle)]">Rows</p>
              <p className="text-lg font-semibold text-[var(--color-text)]">10,482</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
              <p className="text-xs text-[var(--color-text-subtle)]">Columns</p>
              <p className="text-lg font-semibold text-[var(--color-text)]">18</p>
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-primary-muted)] bg-[var(--color-primary-light)] px-4 py-3">
            <p className="text-sm font-semibold text-[var(--color-primary-hover)]">
              Cleaning completed ✓
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-[var(--color-text-muted)]">Duplicates removed</span>
              <span className="font-medium text-[var(--color-text)]">426</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-[var(--color-text-muted)]">Blank rows removed</span>
              <span className="font-medium text-[var(--color-text)]">83</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-[var(--color-text-muted)]">Spaces cleaned</span>
              <span className="font-medium text-[var(--color-text)]">1,284</span>
            </div>
          </div>

          <div className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-center text-sm font-semibold text-white">
            Download Cleaned File
          </div>

          <p className="text-center text-[10px] text-[var(--color-text-subtle)]">
            Illustrative sample data
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="landing-animate text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Excel productivity, simplified.
          </p>
          <h1 className="landing-animate landing-animate-delay-1 mt-4 text-4xl font-bold leading-tight tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
            Work smarter with Excel.
          </h1>
          <p className="landing-animate landing-animate-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]">
            Clean, compare and transform Excel &amp; CSV files in seconds — without complicated
            formulas.
          </p>
          <div className="landing-animate landing-animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/app"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              Try Excelify Free
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              See how it works
            </a>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
