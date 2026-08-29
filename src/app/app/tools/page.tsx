import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { AllToolsPage } from "@/components/app/AllToolsPage";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "All Tools",
  description: "Browse every Excelify spreadsheet tool available in your workspace.",
  path: "/app/tools",
});

export default function AppToolsPage() {
  return (
    <AppShell title="All Tools" subtitle="Browse every Excelify tool currently available.">
      <AllToolsPage />
    </AppShell>
  );
}
