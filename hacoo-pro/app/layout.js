import "./globals.css";
import "./search.css";
import "./mobile.css";
import "./product.css";
import "./research-modules.css";
import "./mobile-readability.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "./data";
import { languageAlternates } from "./i18n";
import { SOCIAL_IMAGE } from "./seo";
import { createOrganizationGraph } from "./schema";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Hacoo Spreadsheet Guide, Categories & Product Links | Hacoo Pro", template: "%s | Hacoo Pro" },
  description: "Independent Hacoo spreadsheet guide for category routes, current product links, sizing, QC photo checks and responsible shopping research.",
  alternates: languageAlternates("/", "en"),
  openGraph: { type: "website", siteName: "Hacoo Pro", locale: "en_US", title: "Hacoo Spreadsheet Guide, Categories & Product Links | Hacoo Pro", description: "A clearer way to explore Hacoo spreadsheet categories, product links and practical guides.", url: SITE_URL, images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: "Hacoo Spreadsheet Guide & Product Links | Hacoo Pro", description: "Independent Hacoo spreadsheet categories and practical guides.", images: [SOCIAL_IMAGE.url] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const schema = { "@context": "https://schema.org", "@graph": createOrganizationGraph() };
  return <html lang="en" suppressHydrationWarning><body><StructuredData data={schema}/><Header/><main>{children}</main><Footer/></body></html>;
}
