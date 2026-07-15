import "./globals.css";
import "./search.css";
import "./mobile.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "./data";
import { languageAlternates, LOCALES } from "./i18n";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Hacoo Spreadsheet Guide, Categories & Product Links | Hacoo Pro", template: "%s | Hacoo Pro" },
  description: "Independent Hacoo spreadsheet guide for category routes, current product links, sizing, QC photo checks and responsible shopping research.",
  alternates: languageAlternates("/", "en"),
  openGraph: { type: "website", siteName: "Hacoo Pro", locale: "en_US", title: "Hacoo Pro — Find Better Routes", description: "A clearer way to explore Hacoo spreadsheet categories, product links and practical guides.", url: SITE_URL },
  twitter: { card: "summary_large_image", title: "Hacoo Pro — Find Better Routes", description: "Independent Hacoo spreadsheet categories and practical guides." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Hacoo Pro", url: SITE_URL, description: "Independent Hacoo spreadsheet discovery and editorial guide." },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "Hacoo Pro", publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: LOCALES }
  ]};
  return <html lang="en"><body><StructuredData data={schema}/><Header/><main>{children}</main><Footer/></body></html>;
}
