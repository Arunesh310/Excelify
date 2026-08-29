import { SITE_URL } from "@/lib/seo/config";
import type { SeoBreadcrumb } from "@/lib/seo/pages";

interface BreadcrumbJsonLdProps {
  breadcrumbs: SeoBreadcrumb[];
}

export function BreadcrumbJsonLd({ breadcrumbs }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
