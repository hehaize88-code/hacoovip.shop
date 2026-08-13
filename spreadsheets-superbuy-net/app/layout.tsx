import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superbuy Spreadsheet — Curated Product Finds & QC Guides",
  description: "A clean, searchable Superbuy spreadsheet with exact product links, category browsing, QC guidance and shipping research.",
  robots: { index: false, follow: false },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
