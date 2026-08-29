import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Excelify — Work Smarter with Excel",
  description:
    "Clean, compare and transform Excel & CSV files in seconds with Excelify.",
  metadataBase: new URL("https://excelify.co.in"),
  openGraph: {
    title: "Excelify — Work Smarter with Excel",
    description:
      "Clean, compare and transform Excel & CSV files in seconds with Excelify.",
    url: "https://excelify.co.in",
    siteName: "Excelify",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excelify — Work Smarter with Excel",
    description:
      "Clean, compare and transform Excel & CSV files in seconds with Excelify.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
