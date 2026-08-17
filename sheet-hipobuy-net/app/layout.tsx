import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./improvements.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hipobuy Spreadsheet 2026 | Verified Product Links",
  description:
    "Browse an independent Hipobuy spreadsheet with current product links, category finds, USD reference prices, QC guidance and a clear warehouse-to-shipping workflow.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "Hipobuy Spreadsheet 2026 | Verified Product Links",
    description: "Searchable Hipobuy product links, category finds, QC guidance and shipping research.",
    url: "https://sheet-hipobuy.net/",
    siteName: "Hipobuy Sheet",
    images: [{ url: "https://sheet-hipobuy.net/og-image.svg", width: 1200, height: 630, alt: "Hipobuy Spreadsheet 2026" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
