import type { Metadata } from "next";

import { ToolsHubContent } from "@/components/seo/ToolsHubContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import { TOOLS_HUB } from "@/lib/seo/pages";

export const metadata: Metadata = createPageMetadata({
  title: TOOLS_HUB.title,
  description: TOOLS_HUB.description,
  path: TOOLS_HUB.path,
});

export default function ToolsHubPage() {
  return <ToolsHubContent />;
}
