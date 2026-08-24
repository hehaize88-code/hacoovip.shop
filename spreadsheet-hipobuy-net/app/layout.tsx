import type { Metadata } from "next";
import "./globals.css";
import { TranslationBridge } from "./translation-bridge";

export const metadata: Metadata = {
  metadataBase: new URL("https://spreadsheet-hipobuy.net"),
  title: "Hipobuy Spreadsheet 2026: Product Finds, QC & Shipping Guide",
  description: "Browse an independent Hipobuy spreadsheet with checked product links, USD reference prices, categories, QC guidance and practical shipping notes.",
  keywords: ["Hipobuy spreadsheet", "Hipobuy spreadsheet 2026", "Hipobuy finds", "Hipobuy QC photos", "Hipobuy shipping"],
  robots: { index: true, follow: true },
  openGraph: { title: "Hipobuy Spreadsheet 2026", description: "Checked product finds, practical QC and clearer shipping decisions.", type: "website", siteName: "Hipobuy Sheet", images: [{ url: "/og.png", width: 1731, height: 909, alt: "Hipobuy Spreadsheet 2026 — Finds, QC and Shipping" }] },
  twitter: { card: "summary_large_image", title: "Hipobuy Spreadsheet 2026", description: "Checked product finds, practical QC and clearer shipping decisions.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<TranslationBridge /></body></html>;
}
