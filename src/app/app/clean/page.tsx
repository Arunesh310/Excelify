import { AppShell } from "@/components/AppShell";
import { CleanDataApp } from "@/components/CleanDataApp";

export default function AppCleanPage() {
  return (
    <AppShell title="Clean Data" subtitle="Clean messy spreadsheets in seconds.">
      <CleanDataApp />
    </AppShell>
  );
}
