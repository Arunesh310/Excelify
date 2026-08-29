import Link from "next/link";

const FEATURES = [
  {
    title: "Clean Data",
    description: "Remove duplicates, blank rows and unwanted spaces in seconds.",
    href: "/app/clean",
    cta: "Explore Clean Data →",
    comingSoon: false,
  },
  {
    title: "Compare Files",
    description: "Find matching, missing and duplicate records between two spreadsheets.",
    href: "#",
    cta: "Compare Files →",
    comingSoon: true,
  },
  {
    title: "Match Columns",
    description:
      "Map differently named columns between spreadsheets without complicated formulas.",
    href: "#",
    cta: "Match Columns →",
    comingSoon: true,
  },
  {
    title: "Ageing",
    description: "Calculate ageing from any date column automatically.",
    href: "#",
    cta: "Calculate Ageing →",
    comingSoon: true,
  },
] as const;

export function Features() {
  return (
    <section id="features" className="bg-[var(--color-surface-muted)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            Your everyday Excel toolkit.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-[var(--color-text)]">{feature.title}</h3>
                {feature.comingSoon && (
                  <span className="shrink-0 rounded-full bg-[var(--color-surface-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-muted)]">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-[var(--color-text-muted)]">{feature.description}</p>
              {feature.comingSoon ? (
                <span className="mt-5 text-sm font-semibold text-[var(--color-text-subtle)]">
                  {feature.cta}
                </span>
              ) : (
                <Link
                  href={feature.href}
                  className="mt-5 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                >
                  {feature.cta}
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
