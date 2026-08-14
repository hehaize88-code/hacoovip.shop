import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Superbuy Spreadsheet 2026 | Product Index & QC Guide";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Sheet Superbuy",
  },
  description:
    "An independent Superbuy spreadsheet-style product index with working product routes, QC guidance, shipping planning, and practical buyer checklists.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
