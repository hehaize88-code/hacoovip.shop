import "./globals.css";
import "./search.css";
import "./mobile.css";
import "./product.css";
import "./research-modules.css";
import "./mobile-readability.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import StructuredData from "@/components/StructuredData";
import { SITE_URL } from "./data";
import { GA_MEASUREMENT_ID } from "./site-config";
import { languageAlternates } from "./i18n";
import { SOCIAL_IMAGE } from "./seo";
import { createOrganizationGraph } from "./schema";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Hacoo Website & Spreadsheet Guide 2026: Links, App Help & Buyer Checks", template: "%s | Hacoo Pro" },
  description: "Use current Hacoo website and app links, spreadsheet-style categories, buyer checks, delivery guidance and independent evidence-led articles.",
  alternates: languageAlternates("/", "en"),
  openGraph: { type: "website", siteName: "Hacoo Pro", locale: "en_US", title: "Hacoo Website & Spreadsheet Guide 2026", description: "Current Hacoo links, spreadsheet categories, app help and independent buyer checks.", url: SITE_URL, images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: "Hacoo Website & Spreadsheet Guide 2026", description: "Current Hacoo links, spreadsheet categories, app help and independent buyer checks.", images: [SOCIAL_IMAGE.url] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const schema = { "@context": "https://schema.org", "@graph": createOrganizationGraph() };
  return <html lang="en" suppressHydrationWarning>
    <head>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{send_page_view:false});` }}/>
    </head>
    <body><StructuredData data={schema}/><AnalyticsEvents/><Header/><main>{children}</main><Footer/></body>
  </html>;
}
