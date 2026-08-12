import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const serif = Fraunces({ variable: "--font-serif", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://superbuys.id"),
  title: "Superbuy Spreadsheet 2026 — Finds, QC & Product Index",
  description: "Browse Superbuy spreadsheet-style product finds by category, compare listing photos, review QC notes and open direct product routes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
