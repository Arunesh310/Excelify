import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { defaultMetadata } from "@/lib/seo/metadata";
import { VercelAnalytics } from "@/components/seo/VercelAnalytics";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={`${plusJakarta.variable} antialiased`}>
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
