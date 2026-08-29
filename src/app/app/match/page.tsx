import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { ComingSoonTool } from "@/components/app/ComingSoonTool";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Match Excel Columns — Coming Soon",
  description:
    "Map differently named columns between spreadsheets with Excelify. Coming soon.",
  path: "/app/match",
});

export default function AppMatchPage() {
  return (
    <AppShell
      title="Match Columns"
      subtitle="Map differently named columns between spreadsheets."
    >
      <ComingSoonTool
        toolName="Match Columns"
        description="Map differently named columns between spreadsheets without complicated formulas."
      />
    </AppShell>
  );
}
