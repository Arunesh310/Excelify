import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { AppDashboard } from "@/components/app/AppDashboard";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Excelify Tools Dashboard",
  description:
    "Choose an Excelify tool to upload, preview, clean, and work with Excel and CSV files in your browser.",
  path: "/app",
});

export default function AppDashboardPage() {
  return (
    <AppShell
      title="Excelify Tools"
      subtitle="Choose a tool to work with your spreadsheet."
    >
      <AppDashboard />
    </AppShell>
  );
}
