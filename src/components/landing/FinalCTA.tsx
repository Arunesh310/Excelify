import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12 text-center shadow-[var(--shadow-md)] md:px-16 md:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
          Ready to stop doing the same Excel work manually?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Try Excelify and turn repetitive spreadsheet tasks into simple workflows.
        </p>
        <Link
          href="/app"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          Try Excelify Free
        </Link>
      </div>
    </section>
  );
}
