"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/content";
import {
  defaultChromeContent,
  localeContent,
  localeFromPathname,
} from "@/lib/locales";

const categoryTarget = (slug: string) => {
  const category = categories.find((item) => item.slug === slug);
  if (!category) throw new Error(`Missing navigation category: ${slug}`);
  return category.targetUrl;
};

const languages = [
  ["EN", "/"],
  ["FR", "/fr"],
  ["DE", "/de"],
  ["IT", "/it"],
  ["ES", "/es"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const localized = locale ? localeContent[locale] : undefined;
  const chrome = localized?.chrome ?? defaultChromeContent;
  const homeHref = locale ? `/${locale}` : "/";
  const nav = [
    { label: chrome.nav.finds, href: "/finds" },
    { label: chrome.nav.shoes, href: categoryTarget("shoes"), external: true },
    { label: chrome.nav.clothing, href: categoryTarget("clothing"), external: true },
    { label: chrome.nav.accessories, href: categoryTarget("accessories"), external: true },
    { label: chrome.nav.guides, href: "/guides" },
    { label: chrome.nav.faq, href: "/faq" },
  ];

  useEffect(() => {
    document.documentElement.lang = localized?.language ?? "en";
  }, [localized?.language]);

  return (
    <>
      <a className="skip-link" href="#main-content">{chrome.skipToContent}</a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href={homeHref} className="brand" aria-label={chrome.homeLabel}>
            <span className="brand__logo-frame">
              <img src="/logo-allchinabuy.png" alt="AllChinaBuy" width="1718" height="253" />
            </span>
            <span className="brand__tagline">{chrome.tagline}</span>
          </Link>
          <nav className="desktop-nav" aria-label={chrome.primaryNavigation}>
            {nav.map((item) => item.external ? (
              <a key={item.href} href={item.href} target="_blank" rel="nofollow noopener noreferrer">{item.label}</a>
            ) : (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <details className="language-menu">
            <summary aria-label={chrome.chooseLanguage}>
              <span aria-hidden="true">◎</span> {chrome.languageLabel} <span aria-hidden="true">⌄</span>
            </summary>
            <div>
              {languages.map(([label, href]) => (
                <Link key={label} href={href} hrefLang={label.toLowerCase()}>{label}</Link>
              ))}
            </div>
          </details>
          <details className="mobile-menu">
            <summary aria-label={chrome.openMenu}><span></span><span></span><span></span></summary>
            <nav aria-label={chrome.primaryNavigation}>
              {nav.map((item) => item.external ? (
                <a key={item.href} href={item.href} target="_blank" rel="nofollow noopener noreferrer">{item.label}</a>
              ) : (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <div className="mobile-menu__languages">
                {languages.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
              </div>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
