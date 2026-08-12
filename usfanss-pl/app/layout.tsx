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
      <body>{children}</body>
    </html>
  );
}
