import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AllChinaBuy Pro — Independent Shopping Directory & Buying Guides",
    template: "%s | AllChinaBuy Pro",
  },
  description:
    "An independent AllChinaBuy shopping directory with curated product routes, link checks, QC guidance and practical international buying guides.",
  keywords: [
    "AllChinaBuy spreadsheet",
    "AllChinaBuy sheet",
    "China shopping directory",
    "AllChinaBuy finds",
    "QC photo guide",
    "China shopping links",
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
    title: "AllChinaBuy Pro — Independent Shopping Directory",
    description: "Find clearer product routes, link checks and practical China shopping guides.",
    images: [{ url: "/images/hero-collage.webp", width: 1120, height: 1400, alt: "Logo-free clothing and footwear editorial collage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllChinaBuy Pro — Independent Shopping Directory",
    description: "Find clearer product routes, link checks and practical China shopping guides.",
    images: ["/images/hero-collage.webp"],
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
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
