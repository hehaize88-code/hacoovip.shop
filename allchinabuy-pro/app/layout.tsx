import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AllChinaBuy Finds, QC Photos & Buying Guides",
    template: "%s | AllChinaBuy Pro",
  },
  description:
      "Explore AllChinaBuy product finds, QC photo checks, tracking help and shipping guides, with a dated maintenance update and clear evidence limits.",
  keywords: [
    "AllChinaBuy fees",
    "AllChinaBuy QC photos",
    "AllChinaBuy shipping",
    "AllChinaBuy warehouse",
    "AllChinaBuy 1688 guide",
    "AllChinaBuy buying guide",
    "AllChinaBuy shipping to USA",
    "AllChinaBuy USA shipping cost",
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
    title: "AllChinaBuy Finds, QC Photos & Buying Guides",
    description: "Product finds, QC photo checks, tracking and shipping guides, plus the dated official maintenance notice.",
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
    title: "AllChinaBuy Finds, QC Photos & Buying Guides",
    description: "Product finds, QC photo checks, tracking and shipping guides, plus the dated official maintenance notice.",
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
          <script defer src="/site-tools.js" />
        </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
