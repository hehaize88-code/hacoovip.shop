"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  defaultChromeContent,
  localeContent,
  localeFromPathname,
} from "@/lib/locales";

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
  const contentPath = (pathname ?? "/").replace(/^\/(fr|de|it|es)(?=\/|$)/, "") || "/";
  const languageHref = (code: string) => `${code === "EN" ? "" : `/${code.toLowerCase()}`}${contentPath === "/" ? "/" : `${contentPath.replace(/\/$/, "")}/`}`;
  const nav = [
    { label: chrome.nav.finds, href: "/finds" },
    { label: "Spreadsheet", href: "/allchinabuy-spreadsheet/" },
    { label: "QC", href: "/guides/qc-photo-checklist/" },
    { label: "Shipping", href: "/guides/shipping-cost-planning/" },
    { label: "How to buy", href: "/guides/how-a-china-shopping-directory-works/" },
    { label: "Articles", href: "/guides/" },
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
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <details className="language-menu">
            <summary aria-label={chrome.chooseLanguage}>
              <span aria-hidden="true">◎</span> {chrome.languageLabel} <span aria-hidden="true">⌄</span>
            </summary>
            <div>
              {languages.map(([label]) => (
                <a key={label} href={languageHref(label)} hrefLang={label.toLowerCase()}>{label}</a>
              ))}
            </div>
          </details>
          <details className="mobile-menu">
            <summary aria-label={chrome.openMenu}><span></span><span></span><span></span></summary>
            <nav aria-label={chrome.primaryNavigation}>
              {nav.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
              <div className="mobile-menu__languages">
                {languages.map(([label]) => <a key={label} href={languageHref(label)} hrefLang={label.toLowerCase()}>{label}</a>)}
              </div>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
