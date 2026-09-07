import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Fraunces } from "next/font/google";
import { Analytics } from "./analytics";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});
const serif = Fraunces({ variable: "--font-serif", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://superbuys.id"),
  title: "Superbuy Indonesia 2026: Spreadsheet, QC & Panduan Ongkir",
  description:
    "Temukan spreadsheet Superbuy, panduan foto QC, estimasi ongkir, pajak, dan cara kirim paket ke Indonesia. Cek produk aktif sebelum membeli.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id-ID">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8XL6GVTEJY"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-8XL6GVTEJY');",
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${serif.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
