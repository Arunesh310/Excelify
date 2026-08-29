import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { ComingSoonTool } from "@/components/app/ComingSoonTool";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Compare Excel Files — Coming Soon",
  description:
    "Compare two spreadsheets and find matched and missing records with Excelify. Coming soon.",
  path: "/app/compare",
});

export default function AppComparePage() {
  return (
    <AppShell
      title="Compare Files"
      subtitle="Find matching, missing and duplicate records between spreadsheets."
    >
      <ComingSoonTool
        toolName="Compare Files"
        description="Compare two spreadsheets and quickly find matched and missing records."
      />
    </AppShell>
  );
}
