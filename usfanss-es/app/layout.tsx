import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";

const sans=Manrope({variable:"--font-sans",subsets:["latin"]});
const serif=Playfair_Display({variable:"--font-serif",subsets:["latin"],style:["normal","italic"]});

export const metadata:Metadata={
  title:"USFans España — Product Discovery",
  description:"Explora productos, categorías y guías de compra USFans para España en un catálogo visual sencillo y rápido.",
  other:{"codex-preview":"development"}
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es">
<head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-56TMQMXE1J" />
          <script
            dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-56TMQMXE1J');" }}
          />
        </head><body className={`${sans.variable} ${serif.variable}`}><LanguageProvider>{children}</LanguageProvider></body></html>}
