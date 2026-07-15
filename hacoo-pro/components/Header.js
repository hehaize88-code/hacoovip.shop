"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Arrow, MenuIcon } from "./Icons";
import LanguageSwitcher from "./LanguageSwitcher";
import { getCopy, localeFromPath, localizePath, stripLocale } from "@/app/i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const cleanPath = stripLocale(pathname);
  const copy = getCopy(locale);
  const links = [
    ["/spreadsheet", copy.nav.spreadsheet],
    ["/categories", copy.nav.categories],
    ["/products", copy.nav.products],
    ["/guides", copy.nav.guides],
    ["/faq", copy.nav.faq],
    ["/about", copy.nav.about],
  ];
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href={localizePath("/", locale)} className="brand" onClick={() => setOpen(false)} aria-label="Hacoo Pro home">
          <img className="brand-logo" src="/hacoo.png" width="200" height="64" alt="Hacoo"/>
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-nav" aria-label="Toggle navigation"><MenuIcon open={open}/></button>
        <nav id="primary-nav" className={open ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
          {links.map(([href, label]) => <Link key={href} href={localizePath(href, locale)} className={cleanPath === href || cleanPath.startsWith(href + "/") ? "active" : ""} onClick={() => setOpen(false)}>{label}</Link>)}
          <LanguageSwitcher onNavigate={() => setOpen(false)}/>
          <a className="nav-cta" href="https://www.cnfanshp.com/AllProducts/" target="_blank" rel="noopener noreferrer">{copy.nav.live} <Arrow size={16}/></a>
        </nav>
      </div>
    </header>
  );
}
