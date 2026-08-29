import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/LandingPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Excelify — Clean Excel & CSV Files Online",
  description:
    "Excelify helps you clean Excel and CSV files in seconds. Remove duplicates, blank rows, and messy spaces online — free, private, browser-based spreadsheet tools for business teams.",
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
