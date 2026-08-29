import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { ExcelifyApp } from "@/components/ExcelifyApp";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Upload & Preview Excel Files",
  description:
    "Upload and preview Excel and CSV files in your browser. View sheets, rows, and columns instantly with Excelify — no upload to servers.",
  path: "/app",
});

export default function AppPage() {
  return (
    <AppShell title="Excelify" subtitle="Work smarter with Excel.">
      <ExcelifyApp />
    </AppShell>
  );
}
