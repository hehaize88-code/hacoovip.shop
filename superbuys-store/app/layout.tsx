import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://superbuys.store"),
  title: {
    default: "Superbuy Spreadsheet 2026 | Product Index & Guides",
    template: "%s | Superbuy Product Index",
  },
  description:
    "Independent Superbuy spreadsheet-style product index with category routes, QC guidance, shipping explanations and practical shopping-agent articles.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1QS8EWYKPX" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-1QS8EWYKPX');" }}
          />
        </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
