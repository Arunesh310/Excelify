import type { Metadata } from "next";

import { SolutionsHubContent } from "@/components/seo/SolutionsHubContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { SOLUTIONS_HUB } from "@/lib/seo/pages";

export const metadata: Metadata = createPageMetadata({
  title: SOLUTIONS_HUB.title,
  description: SOLUTIONS_HUB.description,
  path: SOLUTIONS_HUB.path,
});

export default function SolutionsHubPage() {
  return <SolutionsHubContent />;
}
