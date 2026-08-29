import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoSolutionPageContent } from "@/components/seo/SeoPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SEO_SOLUTION_PAGES, getSeoSolutionPageBySlug } from "@/lib/seo/pages";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SEO_SOLUTION_PAGES.map((page) => ({
    slug: page.path.replace("/solutions/", ""),
  }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoSolutionPageBySlug(slug);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function SolutionSeoPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const page = getSeoSolutionPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <SeoSolutionPageContent page={page} />;
}
