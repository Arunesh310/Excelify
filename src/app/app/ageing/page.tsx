import type { Metadata } from "next";

import { AppShell } from "@/components/AppShell";
import { ComingSoonTool } from "@/components/app/ComingSoonTool";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Calculate Excel Ageing — Coming Soon",
  description:
    "Calculate ageing automatically from a date column with Excelify. Coming soon.",
  path: "/app/ageing",
});

export default function AppAgeingPage() {
  return (
    <AppShell
      title="Ageing"
      subtitle="Calculate ageing automatically from a date column."
    >
      <ComingSoonTool
        toolName="Ageing"
        description="Calculate ageing automatically from a date column."
      />
    </AppShell>
  );
}
