import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { MatchBringDataApp } from "@/components/match/MatchBringDataApp";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Match & Bring Data",
  description:
    "Match two spreadsheets and bring data from one into the other — no formulas required.",
  path: "/app/match",
});

export default function AppMatchPage() {
  return (
    <AppShell
      title="Match & Bring Data"
      subtitle="Match two spreadsheets and bring data from one into the other — no formulas required."
    >
      <MatchBringDataApp />
    </AppShell>
  );
}
