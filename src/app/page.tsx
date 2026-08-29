import { AppShell } from "@/components/AppShell";
import { ExcelifyApp } from "@/components/ExcelifyApp";

export default function Home() {
  return (
    <AppShell title="Excelify" subtitle="Work smarter with Excel.">
      <ExcelifyApp />
    </AppShell>
  );
}
