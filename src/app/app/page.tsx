import { AppShell } from "@/components/AppShell";
import { ExcelifyApp } from "@/components/ExcelifyApp";

export default function AppPage() {
  return (
    <AppShell title="Excelify" subtitle="Work smarter with Excel.">
      <ExcelifyApp />
    </AppShell>
  );
}
