"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon, MenuIcon } from "./Icons";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";

const links = [
  ["/products", "nav.finds"],
  ["/categories", "nav.categories"],
  ["/guides", "nav.guides"],
  ["/articles", "nav.journal"],
  ["/faq", "nav.faq"],
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" aria-label="FindQC Pro home">
          <img className="brand-logo-image" src="/findqc-logo.png" alt="" width="44" height="44" />
          <span className="brand-name">findqc<span>.pro</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, key]) => (
            <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : ""}>
              {t(key)}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <a className="nav-cta" href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noopener noreferrer">
          {t("nav.browse")} <ArrowIcon size={16} />
        </a>

        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={t("nav.toggle")}>
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-language-row">
            <span>{t("language.label")}</span>
            <LanguageSwitcher mobile />
          </div>
          {links.map(([href, key]) => (
            <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : ""}>
              {t(key)}<span>↗</span>
            </Link>
          ))}
          <a href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noopener noreferrer">
            {t("nav.browseMobile")}<span>↗</span>
          </a>
        </nav>
      )}
    </header>
  );
}
