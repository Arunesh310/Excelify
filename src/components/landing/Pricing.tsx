import Link from "next/link";

const BETA_FEATURES = [
  "Excel & CSV tools",
  "Clean Data",
  "Browser-based processing",
  "No credit card required",
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            Simple pricing.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <article className="rounded-[var(--radius-xl)] border-2 border-[var(--color-primary-muted)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-md)]">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">Excelify Beta</h3>
            <p className="mt-2 text-4xl font-bold text-[var(--color-text)]">Free</p>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Excelify is currently free while we&apos;re building and improving the product.
            </p>

            <ul className="mt-6 space-y-3">
              {BETA_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
                >
                  <span className="text-[var(--color-primary)]" aria-hidden="true">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/app"
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              Try Excelify Free
            </Link>

            <p className="mt-4 text-center text-xs text-[var(--color-text-subtle)]">
              Paid plans may be introduced as advanced features are added.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
