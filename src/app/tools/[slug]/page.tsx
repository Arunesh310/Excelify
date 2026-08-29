import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoToolPageContent } from "@/components/seo/SeoPageContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SEO_TOOL_PAGES, getSeoToolPageBySlug } from "@/lib/seo/pages";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SEO_TOOL_PAGES.map((page) => ({
    slug: page.path.replace("/tools/", ""),
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoToolPageBySlug(slug);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function ToolSeoPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const page = getSeoToolPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <SeoToolPageContent page={page} />;
}
