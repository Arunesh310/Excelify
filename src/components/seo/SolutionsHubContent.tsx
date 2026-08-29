import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PublicBreadcrumbs } from "@/components/seo/PublicBreadcrumbs";
import { PublicSiteChrome } from "@/components/seo/PublicSiteChrome";
import { SOLUTIONS_HUB, SOLUTION_HUB_CARDS } from "@/lib/seo/pages";

export function SolutionsHubContent() {
  return (
    <PublicSiteChrome>
      <BreadcrumbJsonLd breadcrumbs={SOLUTIONS_HUB.breadcrumbs} />
      <div className="mx-auto max-w-5xl">
        <PublicBreadcrumbs items={SOLUTIONS_HUB.breadcrumbs} />

        <header className="mt-6 max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            {SOLUTIONS_HUB.h1}
          </h1>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            Practical guides for common spreadsheet tasks. Each solution links directly to a
            working Excelify tool you can use right away.
          </p>
          <Link
            href={SOLUTIONS_HUB.appHref}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            {SOLUTIONS_HUB.ctaLabel}
          </Link>
        </header>

        <section className="mt-12">
          <h2 className="sr-only">Available solutions</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTION_HUB_CARDS.map((solution) => (
              <li key={solution.href}>
                <Link
                  href={solution.href}
                  className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition hover:border-[var(--color-primary-muted)] hover:shadow-[var(--shadow-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    {solution.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {solution.description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-[var(--color-primary)]">
                    Read guide →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PublicSiteChrome>
  );
}
