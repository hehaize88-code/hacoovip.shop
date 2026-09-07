import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://usfanss.pl"),
  title: { default: "USFans / US Fans Lista 2026 – Spreadsheet Polska i QC", template: "%s | USFans" },
  description: "Independent, multilingual product discovery directory with categories, finds, guides, and practical articles.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl-PL" suppressHydrationWarning>
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-HX4MTTJWZF" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HX4MTTJWZF');" }}
          />
          <script
            dangerouslySetInnerHTML={{ __html: `document.addEventListener('click',function(event){var link=event.target&&event.target.closest?event.target.closest('a'):null;if(!link)return;try{var url=new URL(link.href,location.href);if(url.hostname==='cnfanshp.com'||url.hostname==='www.cnfanshp.com'){var kind=link.classList.contains('product-card')?'product':link.classList.contains('category-card')?'category':link.closest('.final-cta')?'main_catalog':'outbound';gtag('event','click_main_site',{link_url:url.href,link_text:(link.textContent||'').trim().slice(0,100),link_type:kind,page_path:location.pathname});}}catch(e){}},true);document.addEventListener('submit',function(event){var form=event.target;if(form&&form.classList&&form.classList.contains('search-box')){var input=form.querySelector('input[name="keywords"]');gtag('event','site_search',{search_term:input?input.value:'',destination_host:'cnfanshp.com',page_path:location.pathname});}},true);` }}
          />
        </head>
      <body>{children}</body>
    </html>
  );
}
