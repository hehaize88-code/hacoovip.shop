import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AllChinaBuy Guides 2026: Fees, QC Photos & Shipping",
    template: "%s | AllChinaBuy Pro",
  },
  description:
    "Research AllChinaBuy fees, QC photos, warehouse rules, shipping lines and 1688 orders with practical, source-checked 2026 guides.",
  keywords: [
    "AllChinaBuy fees",
    "AllChinaBuy QC photos",
    "AllChinaBuy shipping",
    "AllChinaBuy warehouse",
    "AllChinaBuy 1688 guide",
    "AllChinaBuy buying guide",
  ],
  authors: [{ name: "AllChinaBuy Pro Editorial" }],
  creator: "AllChinaBuy Pro",
  publisher: "AllChinaBuy Pro",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": SITE_URL,
      "fr": `${SITE_URL}/fr`,
      "de": `${SITE_URL}/de`,
      "it": `${SITE_URL}/it`,
      "es": `${SITE_URL}/es`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "AllChinaBuy Pro",
    title: "AllChinaBuy Guides 2026: Fees, QC Photos & Shipping",
    description: "Source-checked guides to AllChinaBuy fees, QC photos, warehouse rules, shipping lines and 1688 orders.",
    images: [
      {
        url: "/images/social/home.webp",
        width: 1200,
        height: 630,
        alt: "AllChinaBuy Pro independent shopping directory share card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllChinaBuy Guides 2026: Fees, QC Photos & Shipping",
    description: "Source-checked guides to AllChinaBuy fees, QC photos, warehouse rules, shipping lines and 1688 orders.",
    images: ["/images/social/home.webp"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10110f",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-4S8LT5M79M" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4S8LT5M79M');" }}
          />
        </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
