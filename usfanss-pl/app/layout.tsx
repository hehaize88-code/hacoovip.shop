import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://usfanss.pl"),
  title: { default: "USFanss 2026 — Independent Product Finder", template: "%s | USFanss 2026" },
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
        </head>
      <body>{children}</body>
    </html>
  );
}
