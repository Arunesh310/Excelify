import Link from "next/link";

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg landing-animate landing-animate-delay-2"
      aria-hidden="true"
    >
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-secondary)]" />
          <span className="ml-2 text-xs font-medium text-[var(--color-text-subtle)]">
            Reconciliation workspace
          </span>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--color-primary-light)] px-2.5 py-1 text-xs font-semibold text-[var(--color-primary-hover)]">
              Base file
            </span>
            <span className="rounded-full bg-[var(--color-surface-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--color-text-muted)]">
              Lookup file
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Match &amp; bring
            </p>
            <p className="mt-1 text-lg font-semibold text-[var(--color-text)]">orders_march.csv</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
              <p className="text-xs text-[var(--color-text-subtle)]">Matched</p>
              <p className="text-lg font-semibold text-[var(--color-text)]">94%</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
              <p className="text-xs text-[var(--color-text-subtle)]">Not found</p>
              <p className="text-lg font-semibold text-[var(--color-accent)]">38</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3">
              <p className="text-xs text-[var(--color-text-subtle)]">Exported</p>
              <p className="text-lg font-semibold text-[var(--color-text)]">CSV</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-primary-muted)] bg-[var(--color-primary-light)] px-4 py-3 text-sm font-semibold text-[var(--color-primary-hover)]">
            <CheckIcon />
            Ready to download — processed locally
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
              <span className="text-[var(--color-text-muted)]">Duplicates cleaned</span>
              <span className="font-medium text-[var(--color-text)]">426</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-[var(--color-text-muted)]">Columns brought from lookup</span>
              <span className="font-medium text-[var(--color-text)]">Status, Region</span>
            </div>
          </div>

          <div className="rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--color-on-primary)]">
            Download reconciled file
          </div>

          <p className="text-center text-[10px] text-[var(--color-text-subtle)]">
            Illustrative sample — your data stays in the browser
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="landing-hero-bg relative overflow-hidden px-6 pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="landing-grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="landing-animate text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Browser-based spreadsheet reconciliation
          </p>
          <h1 className="landing-animate landing-animate-delay-1 mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)] md:text-5xl lg:text-[3.25rem]">
            Reconcile Excel files in minutes, not hours.
          </h1>
          <p className="landing-animate landing-animate-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]">
            Clean messy exports, compare two datasets, and match lookup columns — without
            formulas, macros, or uploading files to a server.
          </p>
          <ul className="landing-animate landing-animate-delay-2 mt-6 space-y-2 text-sm text-[var(--color-text-muted)]">
            <li className="flex items-center gap-2">
              <span className="text-[var(--color-primary)]">
                <CheckIcon />
              </span>
              Private processing in your browser
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[var(--color-primary)]">
                <CheckIcon />
              </span>
              Built for finance, ops, and inventory workflows
            </li>
          </ul>
          <div className="landing-animate landing-animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/app"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] transition-[background,transform] duration-[var(--transition-fast)] hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
            >
              Start reconciling free
            </Link>
            <Link
              href="#workflow"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-[var(--transition-fast)] hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
            >
              See the workflow
            </Link>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
