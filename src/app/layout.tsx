import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Excelify",
  description: "Work smarter with Excel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
