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
  title: { default: "Hacoo Website Guide 2026: Links, Spreadsheet & App Help", template: "%s | Hacoo Pro" },
  description: "Find current Hacoo product links, spreadsheet categories, size guidance, shipping information and independent app help for 2026.",
  alternates: languageAlternates("/", "en"),
  openGraph: { type: "website", siteName: "Hacoo Pro", locale: "en_US", title: "Hacoo Website Guide 2026: Links, Spreadsheet & App Help", description: "Current Hacoo links, spreadsheet categories, size guidance, delivery information and independent app help.", url: SITE_URL, images: [SOCIAL_IMAGE] },
  twitter: { card: "summary_large_image", title: "Hacoo Website Guide 2026: Links, Spreadsheet & App Help", description: "Current Hacoo links, spreadsheet categories, size guidance, delivery information and independent app help.", images: [SOCIAL_IMAGE.url] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const schema = { "@context": "https://schema.org", "@graph": createOrganizationGraph() };
  return <html lang="en" suppressHydrationWarning>
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-SJ7LTZ5CP2" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-SJ7LTZ5CP2');" }}
          />
        </head><body><StructuredData data={schema}/><Header/><main>{children}</main><Footer/></body></html>;
}
