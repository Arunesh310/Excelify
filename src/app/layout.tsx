import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { defaultMetadata } from "@/lib/seo/metadata";
import { VercelAnalytics } from "@/components/seo/VercelAnalytics";

import "./globals.css";

const inter = Inter({
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
      <body className={`${inter.variable} antialiased`}>
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
