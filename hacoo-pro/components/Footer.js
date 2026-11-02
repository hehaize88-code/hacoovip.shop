"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "./Icons";
import { CATALOG_URL } from "@/app/site-config";
import { getCopy, localeFromPath, localizePath, LOCALES, LOCALE_NAMES, stripLocale } from "@/app/i18n";

export default function Footer() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = getCopy(locale);
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><span className="section-label inverse">{copy.footer.eyebrow}</span><h2>{copy.footer.title[0]}<br/>{copy.footer.title[1]}</h2></div>
        <a className="round-link" href={`${CATALOG_URL}/AllProducts/`} target="_blank" rel="noopener noreferrer" aria-label="Open live catalog"><Arrow size={28}/></a>
      </div>
      <div className="footer-grid">
        <div className="footer-brand"><div className="brand brand-inverse"><img className="brand-logo" src="/hacoo.png" width="200" height="64" alt="Hacoo"/></div><p>{copy.footer.description}</p></div>
        <div><h3>{copy.footer.explore}</h3><Link href={localizePath("/spreadsheet", locale)}>{copy.nav.spreadsheet}</Link><Link href={localizePath("/categories", locale)}>{copy.nav.categories}</Link><Link href={localizePath("/products", locale)}>{copy.nav.products}</Link><Link href={localizePath("/articles", locale)}>{copy.nav.articles}</Link><Link href={localizePath("/guides", locale)}>{copy.nav.guides}</Link><Link href={localizePath("/faq", locale)}>{copy.nav.faq}</Link></div>
        <div><h3>{copy.footer.site}</h3><Link href={localizePath("/about", locale)}>{copy.nav.about}</Link><Link href={localizePath("/contact", locale)}>{copy.footer.contact}</Link><Link href={localizePath("/privacy", locale)}>{copy.footer.privacy}</Link><Link href={localizePath("/terms", locale)}>{copy.footer.terms}</Link></div>
      </div>
      <nav className="edition-languages" aria-label={copy.nav.languages}>{LOCALES.map(code => <Link key={code} hrefLang={code} lang={code} aria-current={code === locale ? "page" : undefined} href={localizePath(stripLocale(pathname), code)}>{LOCALE_NAMES[code]}</Link>)}</nav>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} Hacoo Pro</p><p>{copy.footer.disclaimer}</p></div>
    </footer>
  );
}
