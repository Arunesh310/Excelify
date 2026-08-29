import { CompareFilesApp } from "@/components/compare/CompareFilesApp";
import { AppShell } from "@/components/AppShell";

export default function AppComparePage() {
  return (
    <AppShell
      title="Compare Files"
      subtitle="Find matching and missing records between two spreadsheets."
    >
      <CompareFilesApp />
    </AppShell>
  );
}
