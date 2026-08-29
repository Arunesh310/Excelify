import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { CleanDataApp } from "@/components/CleanDataApp";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Clean Excel & CSV Data Online",
  description:
    "Remove duplicate rows, blank rows, blank columns, and extra spaces from Excel and CSV files. Download cleaned spreadsheets instantly with Excelify Clean Data.",
  path: "/app/clean",
});

export default function AppCleanPage() {
  return (
    <AppShell title="Clean Data" subtitle="Clean messy spreadsheets in seconds.">
      <CleanDataApp />
    </AppShell>
  );
}
