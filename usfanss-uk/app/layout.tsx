import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "USFans Spreadsheet 2026: Product Finds & QC Guide",
  description: "Explore USFans spreadsheet product finds through direct category routes, approximate USD prices and a practical QC photo inspection guide.",
  keywords: ["USFans spreadsheet", "USFans sheets", "USFans QC photos", "USFans finds", "USFans spreadsheet 2026"],
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
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
