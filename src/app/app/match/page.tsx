import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { ComingSoonTool } from "@/components/app/ComingSoonTool";
import { MatchBringDataApp } from "@/components/match/MatchBringDataApp";
import { MATCH_BRING_DATA_ENABLED } from "@/lib/app/feature-flags";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: MATCH_BRING_DATA_ENABLED
    ? "Match & Bring Data"
    : "Match & Bring Data — Coming Soon",
  description: MATCH_BRING_DATA_ENABLED
    ? "Match two spreadsheets and bring data from one into the other — no formulas required."
    : "Match two spreadsheets and bring data from one into the other. Coming soon.",
  path: "/app/match",
});

export default function AppMatchPage() {
  return (
    <AppShell
      title="Match & Bring Data"
      subtitle="Match two spreadsheets and bring data from one into the other — no formulas required."
    >
      {MATCH_BRING_DATA_ENABLED ? (
        <MatchBringDataApp />
      ) : (
        <ComingSoonTool
          toolName="Match & Bring Data"
          description="Match two spreadsheets and bring data from one into the other without formulas."
        />
      )}
    </AppShell>
  );
}
