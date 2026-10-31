import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./improvements.css";
import AnalyticsTracking from "./analytics-tracking";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hipobuy Spreadsheet: Product Links, QC & Shipping",
  description: "Browse an independent Hipobuy spreadsheet with current product links, category finds, USD reference prices, QC guidance and a clear warehouse-to-shipping workflow.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { type: "website", title: "Hipobuy Spreadsheet: Product Links, QC & Shipping", description: "Searchable Hipobuy product links, category finds, QC guidance and shipping research.", url: "https://sheet-hipobuy.net/", siteName: "Hipobuy Sheet", images: [{ url: "https://sheet-hipobuy.net/og-image.png", width: 1200, height: 630, alt: "Hipobuy Spreadsheet 2026" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const languageScript = `(() => { const p = location.pathname.split('/').filter(Boolean)[0]; const map = { de: 'de', es: 'es', it: 'it', pl: 'pl' }; document.documentElement.lang = map[p] || 'en'; })()`;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

          <script
            dangerouslySetInnerHTML={{ __html: "if(['sheet-hipobuy.net','www.sheet-hipobuy.net'].includes(location.hostname)){window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};var tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id=G-XC17DVXPLC';document.head.appendChild(tag);window.gtag('js',new Date());window.gtag('config','G-XC17DVXPLC');}" }}
          />
        <script dangerouslySetInnerHTML={{ __html: languageScript }} /></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}><AnalyticsTracking />{children}</body>
    </html>
  );
}
