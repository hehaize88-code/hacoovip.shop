import type { Metadata } from "next";
import "./globals.css";
import {
  SITE_NAME,
  SITE_URL,
} from "./seo";

const siteTitle = "Superbuy Spreadsheet Link Checker 2026 | Verified Routes";
const siteDescription =
  "An independent Superbuy spreadsheet link checker for verified routes, stale-link review, primary-image matching, QC evidence, and dated route updates.";
const isCloudflarePagesStaticExport =
  process.env.CLOUDFLARE_PAGES_STATIC_EXPORT === "1" ||
  process.env.CF_PAGES === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: siteDescription,
  applicationName: SITE_NAME,
  authors: [{ name: `${SITE_NAME} editorial`, url: SITE_URL }],
  creator: `${SITE_NAME} editorial`,
  publisher: SITE_NAME,
  category: "shopping research",
  ...(isCloudflarePagesStaticExport
    ? {}
    : { other: { "codex-preview": "development" } }),
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
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-P91GYCQQPL" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P91GYCQQPL');" }}
          />
        </head>
      <body>{children}</body>
    </html>
  );
}
