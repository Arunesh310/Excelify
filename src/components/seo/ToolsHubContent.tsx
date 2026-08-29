import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PublicBreadcrumbs } from "@/components/seo/PublicBreadcrumbs";
import { PublicSiteChrome } from "@/components/seo/PublicSiteChrome";
import { TOOLS_HUB, TOOL_HUB_CARDS } from "@/lib/seo/pages";

export function ToolsHubContent() {
  return (
    <PublicSiteChrome>
      <BreadcrumbJsonLd breadcrumbs={TOOLS_HUB.breadcrumbs} />
      <div className="mx-auto max-w-5xl">
        <PublicBreadcrumbs items={TOOLS_HUB.breadcrumbs} />

        <header className="mt-6 max-w-3xl space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            {TOOLS_HUB.h1}
          </h1>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            Clean spreadsheet data, compare two files, and match columns between workbooks — all
            processed locally in your browser.
          </p>
          <Link
            href={TOOLS_HUB.appHref}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            {TOOLS_HUB.ctaLabel}
          </Link>
        </header>

        <section className="mt-12">
          <h2 className="sr-only">Available tools</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_HUB_CARDS.map((tool) => (
              <li key={tool.href}>
                <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">{tool.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {tool.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={tool.appHref}
                      className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    >
                      Open Tool
                    </Link>
                    <Link
                      href={tool.href}
                      className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    >
                      Learn More
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PublicSiteChrome>
  );
}
