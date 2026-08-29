import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/LandingPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Excelify — Simple Excel & CSV Productivity Tools",
  description:
    "Simple online tools to clean, compare and work with Excel and CSV files without complicated formulas.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <StructuredData />
      <LandingPage />
    </>
  );
}
