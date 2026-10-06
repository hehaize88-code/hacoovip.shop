import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://kakobuys.store"),
  title: "Kakobuy QC Checklist 2026: Photos, Sizing & Returns",
  description: "Check Kakobuy warehouse QC photos for size, stitching, color and defects, then decide whether to ship, request evidence or return.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de/",
      fr: "/fr/",
      es: "/es/",
      it: "/it/",
      pl: "/pl/",
      pt: "/pt/",
      ro: "/ro/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Kakobuy QC Checklist 2026: Photos, Sizing & Returns",
    description: "Check Kakobuy warehouse QC photos for size, stitching, color and defects, then decide whether to ship, request evidence or return.",
    type: "website",
    url: "/",
    siteName: "Kakobuy QC Index",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/brand/kakobuy.png",
    shortcut: "/brand/kakobuy.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<head>
        <link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/readability-v2.css" />
        <script src="/analytics-v2.js" defer />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
