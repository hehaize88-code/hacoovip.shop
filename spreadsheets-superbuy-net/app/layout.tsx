import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://spreadsheets-superbuy.net"),
  title: "Superbuy Spreadsheet — Curated Product Finds & QC Guides",
  description: "A clean, searchable Superbuy spreadsheet with exact product links, category browsing, QC guidance and shipping research.",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-NPK3BPNZMW" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NPK3BPNZMW');" }}
          />
          <script
            dangerouslySetInnerHTML={{ __html: `
              document.addEventListener('click',function(event){
                if(!(event.target instanceof Element))return;
                var link=event.target.closest('a[data-ga-event]');
                if(!link||typeof window.gtag!=='function')return;
                window.gtag('event',link.dataset.gaEvent,{
                  content_id:link.dataset.gaContent||'',
                  item_name:link.dataset.gaItem||'',
                  link_url:link.href,
                  link_text:(link.textContent||'').trim().slice(0,120)
                });
              });
              document.addEventListener('submit',function(event){
                if(!(event.target instanceof HTMLFormElement))return;
                var form=event.target;
                if(!form.dataset.gaEvent||typeof window.gtag!=='function')return;
                window.gtag('event',form.dataset.gaEvent,{content_id:form.dataset.gaContent||''});
              });
            ` }}
          />
        </head><body>{children}</body></html>;
}
