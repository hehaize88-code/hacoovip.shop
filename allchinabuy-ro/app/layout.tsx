import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://allchinabuy.ro"),
  title: "AllChinaBuy Spreadsheet România 2026 | Produse, QC și Livrare",
  description:
    "Ghid independent AllChinaBuy pentru România: produse selectate, poze QC, costuri de colet, TVA, vamă și planificarea livrării.",
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      ro: "/",
      en: "/en",
      de: "/de",
      fr: "/fr",
      es: "/es",
      it: "/it",
      pl: "/pl",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "allchinabuy.ro",
    locale: "ro_RO",
    title: "AllChinaBuy Spreadsheet pentru România",
    description:
      "Produse, poze QC și ghiduri de livrare pentru cumpărătorii din România.",
    images: [
      {
        url: "/allchinabuy.png",
        width: 1200,
        height: 177,
        alt: "AllChinaBuy independent Romania guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AllChinaBuy Spreadsheet pentru România",
    description:
      "Produse, poze QC și ghiduri de livrare pentru cumpărătorii din România.",
    images: ["/allchinabuy.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-site-locale") || "ro";
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "allchinabuy.ro",
    url: "https://allchinabuy.ro/",
    inLanguage: ["ro", "en", "de", "fr", "es", "it", "pl"],
    description:
      "Independent AllChinaBuy research and product-discovery guide for shoppers in Romania.",
  };

  return (
    <html lang={locale}>
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-J8E9BDTGDW" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-J8E9BDTGDW');" }}
          />
        </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
