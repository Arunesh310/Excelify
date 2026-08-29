import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PublicBreadcrumbs } from "@/components/seo/PublicBreadcrumbs";
import { PublicSiteChrome } from "@/components/seo/PublicSiteChrome";
import type { RelatedLink, SeoToolPageDefinition } from "@/lib/seo/pages";

interface SeoToolPageContentProps {
  page: SeoToolPageDefinition;
}

function RelatedLinksSection({ links }: { links: RelatedLink[] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-[var(--color-border)] pt-10">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">Related tools & guides</h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[var(--color-primary-muted)] hover:shadow-[var(--shadow-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              <p className="font-semibold text-[var(--color-text)]">{link.label}</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{link.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SeoToolPageContent({ page }: SeoToolPageContentProps) {
  return (
    <PublicSiteChrome>
      <BreadcrumbJsonLd breadcrumbs={page.breadcrumbs} />
      <article className="mx-auto max-w-3xl">
        <PublicBreadcrumbs items={page.breadcrumbs} />

        <header className="mt-6 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl">
            {page.h1}
          </h1>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            {page.intro}
          </p>
          <Link
            href={page.appHref}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            {page.ctaLabel}
          </Link>
        </header>

        <div className="mt-10 space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-[var(--color-text)]">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <RelatedLinksSection links={page.relatedLinks} />
      </article>
    </PublicSiteChrome>
  );
}

export function SeoSolutionPageContent({ page }: SeoToolPageContentProps) {
  return <SeoToolPageContent page={page} />;
}
