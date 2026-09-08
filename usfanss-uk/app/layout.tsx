import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USFans Spreadsheet 2026 | Links, QC Photos & Shipping Guide",
  description: "Browse USFans spreadsheet links, check QC photos, estimate shipping and follow practical warehouse and parcel guides for 2026.",
  keywords: ["USFans spreadsheet", "US Fans spreadsheet", "USFans links", "USFans QC photos", "USFans shipping", "USFans tracking"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "USFans Spreadsheet & QC Product Finds",
    description: "A route-based USFans spreadsheet guide with product finds, approximate USD prices and practical QC checks.",
    url: "https://usfanss.uk/",
    images: [{ url: "/usfans.png", width: 375, height: 123, alt: "USFans Spreadsheet & QC Guide" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "USFans Spreadsheet & QC Product Finds",
    description: "A route-based USFans spreadsheet guide with product finds, approximate USD prices and practical QC checks.",
    images: ["/usfans.png"],
  },
  metadataBase: new URL("https://usfanss.uk"),
  alternates: { canonical: "/", languages: { en: "/", de: "/de/", fr: "/fr/", es: "/es/", it: "/it/", pl: "/pl/", "x-default": "/" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning>
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1FPZG2GLH8" />
          <script
            dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1FPZG2GLH8');
document.addEventListener('click',function(event){var el=event.target&&event.target.closest?event.target.closest('[data-track]'):null;if(!el||el.tagName==='FORM')return;gtag('event',el.dataset.track,{page_path:location.pathname,language:document.documentElement.lang||'en',target_url:el.href||'',product:el.dataset.product||'',category:el.dataset.category||'',article:el.dataset.article||'',placement:el.dataset.placement||''});});
document.addEventListener('submit',function(event){var form=event.target;if(!form||!form.matches||!form.matches('form[data-track]'))return;var input=form.querySelector('input[name="keywords"]');gtag('event',form.dataset.track,{page_path:location.pathname,language:document.documentElement.lang||'en',target_url:form.action||'',search_term:input?input.value:'',placement:form.dataset.placement||''});});` }}
          />
        </head><body>{children}</body></html>;
}
