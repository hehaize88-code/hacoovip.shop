import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "./site-header";

export function SiteChrome({ children }: { children: ReactNode }) {
  return <>
    <SiteHeader />
    {children}
    <footer><div className="footer-brand notranslate" data-no-translate><span className="footer-logo"><img src="/hipobuy-logo.png" alt="Hipobuy" /></span><strong>SHEET</strong></div><p>Independent product-discovery and education resource. Not affiliated with Hipobuy or the marketplaces referenced by product listings.</p><div><Link href="/">Home ↑</Link><span>FACTS REVIEWED · 24 AUG 2026</span></div></footer>
  </>;
}

export function InnerHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="inner-hero"><div className="eyebrow"><span />{eyebrow}</div><h1>{title}</h1><p>{intro}</p></section>;
}
