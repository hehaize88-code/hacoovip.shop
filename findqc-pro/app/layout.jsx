import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import IndependenceNotice from "../components/IndependenceNotice";
import Footer from "../components/Footer";
import LanguageProvider from "../components/LanguageProvider";
import { DEFAULT_LANGUAGE } from "../lib/i18n";
import { localizedMetadata } from "../lib/seo";

export const metadata = localizedMetadata({
  metadataBase: new URL("https://findqc.pro"),
  title: {
    default: "FindQC Pro — Product Finder & QC Guides",
    template: "%s | FindQC Pro",
  },
  description:
    "Search product listings, browse useful finds and learn how to review warehouse QC photos before international shipping.",
  keywords: ["product finder", "QC photos", "quality check guide", "warehouse inspection", "China shopping guide"],
  openGraph: {
    title: "FindQC Pro — Find Better. Check Smarter.",
    description: "Independent product discovery and practical QC education.",
    url: "https://findqc.pro",
    siteName: "FindQC Pro",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindQC Pro — Find Better. Check Smarter.",
    description: "Independent product discovery and practical QC education.",
    images: ["/og.svg"],
  },
  icons: { icon: "/findqc-logo.png", apple: "/findqc-logo.png" },
}, "/");

export default function RootLayout({ children }) {
  return (
    <html lang={DEFAULT_LANGUAGE}>
      <body>
        <LanguageProvider>
          <SiteHeader />
          <IndependenceNotice />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
