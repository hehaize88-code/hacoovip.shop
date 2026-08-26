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
  title: "Kakobuy QC Guide 2026: Photo Checks, Sizing & Returns",
  description: "Use this practical Kakobuy QC guide to check warehouse photos, measurements, stitching, color and missing evidence before choosing shipping or return.",
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
    title: "Kakobuy QC Guide 2026: Photo Checks, Sizing & Returns",
    description: "Use this practical Kakobuy QC guide to check warehouse photos, measurements, stitching, color and missing evidence before choosing shipping or return.",
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
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
