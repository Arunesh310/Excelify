import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { AppDashboard } from "@/components/app/AppDashboard";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Excelify Workspace",
  description:
    "Choose an Excelify tool to clean, compare, and work with Excel and CSV files in your browser.",
  path: "/app",
});

export default function AppDashboardPage() {
  return (
    <AppShell>
      <AppDashboard />
    </AppShell>
  );
}
