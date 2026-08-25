import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superbuy Spreadsheet 2026: Product Finds & QC Guide",
  description: "Browse an organized Superbuy spreadsheet with product finds, category links, approximate USD prices and a practical QC photo protocol.",
  keywords: ["superbuy spreadsheet", "superbuy finds", "superbuy product spreadsheet", "superbuy qc photos"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Superbuy Spreadsheet 2026: Product Finds & QC Guide",
    description: "A product index for browsing finds, categories and QC guidance.",
    type: "website",
    url: "https://superbuys.pro/",
    siteName: "Superbuy Product Index",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Superbuy Product Index",
    url: "https://superbuys.pro/",
    description: "Independent Superbuy spreadsheet and product discovery guide.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.cnfanshp.com/search.html?channelid=2&method=1&keywords={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return <html lang="en">
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-MGRK9E4V6G" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MGRK9E4V6G');" }}
          />
        </head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
