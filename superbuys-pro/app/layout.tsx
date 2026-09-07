import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superbuy Spreadsheet 2026: Product Finds & QC Guide",
  description: "Browse an organized Superbuy spreadsheet with product finds, category links, approximate USD prices and a practical QC photo protocol.",
  keywords: ["superbuy spreadsheet", "superbuy warehouse", "superbuy fees", "superbuy qc photos", "superbuy shipping calculator", "superbuy parcel forwarding"],
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
          <script data-analytics="ga4" async src="https://www.googletagmanager.com/gtag/js?id=G-MGRK9E4V6G" />
          <script
            data-analytics="ga4"
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MGRK9E4V6G');document.addEventListener('click',function(event){var target=event.target instanceof Element?event.target.closest('a[href]'):null;if(!target)return;try{var url=new URL(target.href,location.href);if(url.hostname==='www.cnfanshp.com'||url.hostname==='cnfanshp.com'){gtag('event','outbound_click',{link_url:url.href,link_text:(target.textContent||'').trim().slice(0,100),transport_type:'beacon'});}}catch(_){}});" }}
          />
        </head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
