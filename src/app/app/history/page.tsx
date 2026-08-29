import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { HistoryPlaceholder } from "@/components/app/HistoryPlaceholder";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Excelify History",
  description: "View your Excelify processing history. Coming in a future version.",
  path: "/app/history",
});

export default function AppHistoryPage() {
  return (
    <AppShell title="History" subtitle="Your recent spreadsheet work.">
      <HistoryPlaceholder />
    </AppShell>
  );
}
