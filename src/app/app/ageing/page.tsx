import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { AgeingApp } from "@/components/ageing/AgeingApp";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Calculate Excel Ageing Online",
  description:
    "Calculate ageing in days from a date column in Excel or CSV files. Processed locally in your browser with Excelify.",
  path: "/app/ageing",
});

export default function AppAgeingPage() {
  return (
    <AppShell
      title="Ageing"
      subtitle="Calculate ageing automatically from a date column."
    >
      <AgeingApp />
    </AppShell>
  );
}
