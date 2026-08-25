import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "USFans Product Discovery Atlas", description: "Independent product discovery, QC and shipping guide.", robots: { index: false, follow: false }, other: { "codex-preview": "development" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en">
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-BCNPML3ZE2" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BCNPML3ZE2');" }}
          />
        </head><body>{children}</body></html>; }
