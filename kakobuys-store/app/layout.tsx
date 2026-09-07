import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kakobuys.store"),
  title: "Kakobuy QC Checklist 2026: Photos, Sizing & Returns",
  description: "Check Kakobuy warehouse QC photos for size, stitching, color and defects, then decide whether to ship, request evidence or return.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de/",
      fr: "/fr/",
      es: "/es/",
      it: "/it/",
      pl: "/pl/",
      pt: "/pt/",
      ro: "/ro/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Kakobuy QC Checklist 2026: Photos, Sizing & Returns",
    description: "Check Kakobuy warehouse QC photos for size, stitching, color and defects, then decide whether to ship, request evidence or return.",
    type: "website",
    url: "/",
    siteName: "Kakobuy QC Index",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/brand/kakobuy.png",
    shortcut: "/brand/kakobuy.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-L9YML1CM7K" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L9YML1CM7K');" }}
          />
          <script
            dangerouslySetInnerHTML={{ __html: "window.addEventListener('click',function(event){var link=event.target&&event.target.closest?event.target.closest('a'):null;if(!link)return;try{var url=new URL(link.href,location.href);if(url.hostname==='www.cnfanshp.com'||url.hostname==='cnfanshp.com'){gtag('event','outbound_catalog_click',{link_url:url.href,link_text:(link.innerText||'').trim().slice(0,100),page_path:location.pathname,transport_type:'beacon'});}}catch(error){}},true);window.addEventListener('submit',function(event){var form=event.target;if(!form||!form.matches||!form.matches('form.search'))return;var input=form.querySelector('input[name=keywords]');gtag('event','catalog_search',{search_term:input&&input.value?input.value.trim():'',page_path:location.pathname,transport_type:'beacon'});},true);" }}
          />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
