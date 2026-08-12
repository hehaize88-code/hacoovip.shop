import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://allchinabuy.ro"),
  title: "AllChinaBuy Spreadsheet 2026: ACBuy Finds, QC & Shipping Guides",
  description:
    "Browse curated AllChinaBuy spreadsheet finds, compare product previews, read QC photo checks and plan parcel costs with fact-led guides.",
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
      de: "/de/",
      fr: "/fr/",
      es: "/es/",
      it: "/it/",
      pl: "/pl/",
      ro: "/ro/",
    },
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
