import Link from "next/link";

import {
  AgeingFeatureIcon,
  CleanFeatureIcon,
  CompareFeatureIcon,
  MatchFeatureIcon,
} from "@/components/landing/FeatureIcons";

const FEATURES = [
  {
    title: "Clean Data",
    description: "Remove duplicates, blank rows and extra spaces before you match or compare.",
    href: "/app/clean",
    cta: "Open Clean Data",
    Icon: CleanFeatureIcon,
    comingSoon: false,
  },
  {
    title: "Compare Files",
    description: "Find matching, missing, and duplicate records between two exports.",
    href: "/app/compare",
    cta: "Open Compare Files",
    Icon: CompareFeatureIcon,
    comingSoon: false,
  },
  {
    title: "Match & Bring Data",
    description:
      "Pull columns from a lookup file into your base sheet — no XLOOKUP setup required.",
    href: "/app/match",
    cta: "Open Match & Bring",
    Icon: MatchFeatureIcon,
    comingSoon: false,
  },
  {
    title: "Ageing",
    description: "Calculate days outstanding from invoice or due dates in one step.",
    href: "/app/ageing",
    cta: "Open Ageing",
    Icon: AgeingFeatureIcon,
    comingSoon: false,
  },
] as const;

export function Features() {
  return (
    <section id="features" className="bg-[var(--color-surface-muted)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            Tools that follow a reconciliation workflow
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Each tool stands alone, but they chain together for the jobs you repeat every week.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="group flex cursor-default flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition duration-[var(--transition-fast)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-light)]">
                <feature.Icon />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">{feature.title}</h3>
              <p className="mt-3 flex-1 text-[var(--color-text-muted)]">{feature.description}</p>
              {!feature.comingSoon && (
                <Link
                  href={feature.href}
                  className="mt-5 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-[var(--color-primary)] transition duration-[var(--transition-fast)] hover:text-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
                >
                  {feature.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
