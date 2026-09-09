import type { Metadata } from "next";
import "./globals.css";
import { TranslationBridge } from "./translation-bridge";
import { AnalyticsEvents } from "./analytics-events";

export const metadata: Metadata = {
  metadataBase: new URL("https://spreadsheet-hipobuy.net"),
  title: "Hipobuy Spreadsheet 2026: Updated Finds, QC & Shipping",
  description: "Browse 60 checked Hipobuy product links, QC guidance and 2026 shipping-cost planning for the UK, France, Germany and the Netherlands.",
  keywords: ["Hipobuy spreadsheet", "Hipobuy spreadsheet 2026", "Hipobuy finds", "Hipobuy QC photos", "Hipobuy shipping"],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: { title: "Hipobuy Spreadsheet 2026", description: "Checked product finds, practical QC and clearer shipping decisions.", type: "website", siteName: "Hipobuy Sheet", images: [{ url: "/og.png", width: 1731, height: 909, alt: "Hipobuy Spreadsheet 2026 — Finds, QC and Shipping" }] },
  twitter: { card: "summary_large_image", title: "Hipobuy Spreadsheet 2026", description: "Checked product finds, practical QC and clearer shipping decisions.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Hipobuy Sheet",
      url: "https://spreadsheet-hipobuy.net/",
      description: "Independent checked product directory and decision guides.",
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Hipobuy Sheet",
      url: "https://spreadsheet-hipobuy.net/",
      logo: "https://spreadsheet-hipobuy.net/hipobuy-logo.png",
      description: "Independent product-discovery and education resource; not affiliated with Hipobuy.",
    },
  ];
  return <html lang="en">
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-KR0Y8RYEX1" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KR0Y8RYEX1');" }}
          />
        </head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}<AnalyticsEvents /><TranslationBridge /></body></html>;
}
