"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/content";
import {
  defaultCategoryLabels,
  defaultChromeContent,
  localeContent,
  localeFromPathname,
} from "@/lib/locales";

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const localized = locale ? localeContent[locale] : undefined;
  const chrome = localized?.chrome ?? defaultChromeContent;
  const categoryLabels = localized?.categoryLabels ?? defaultCategoryLabels;
  const homeHref = locale ? `/${locale}` : "/";

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <Link href={homeHref} className="brand brand--footer" aria-label={chrome.homeLabel}>
            <span className="brand__logo-frame">
              <img src="/logo-allchinabuy.png" alt="AllChinaBuy" width="1718" height="253" loading="lazy" />
            </span>
            <span className="brand__tagline">{chrome.tagline}</span>
          </Link>
          <p>{chrome.footer.description}</p>
        </div>
        <div>
          <h2>{chrome.footer.browse}</h2>
          <Link href="/finds">{chrome.footer.allFinds}</Link>
          {categories.slice(0, 4).map((category) => (
            <a key={category.slug} href={category.targetUrl} target="_blank" rel="nofollow noopener noreferrer">
              {categoryLabels[category.slug] ?? category.title}
            </a>
          ))}
        </div>
        <div>
          <h2>{chrome.footer.learn}</h2>
          <Link href="/guides">{chrome.nav.guides}</Link>
          <Link href="/allchinabuy-spreadsheet">{chrome.footer.spreadsheet}</Link>
          <Link href="/reviews">{chrome.footer.reviewMethod}</Link>
          <Link href="/faq">{chrome.nav.faq}</Link>
          <Link href="/about">{chrome.footer.about}</Link>
        </div>
        <div>
          <h2>{chrome.footer.important}</h2>
          <Link href="/disclaimer">{chrome.footer.disclaimer}</Link>
          <Link href="/privacy">{chrome.footer.privacy}</Link>
          <Link href="/terms">{chrome.footer.terms}</Link>
          <Link href="/contact">{chrome.footer.contact}</Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 AllChinaBuy Pro</span>
        <span>{chrome.footer.legal}</span>
      </div>
    </footer>
  );
}
