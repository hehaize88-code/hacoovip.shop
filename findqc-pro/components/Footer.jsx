"use client";

import Link from "./LocalizedLink";
import SearchBox from "./SearchBox";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow light">{t("footer.keepExploring")}</span>
          <h2>{t("footer.title1")}<br />{t("footer.title2")}</h2>
        </div>
        <SearchBox compact />
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand footer-logo">
            <img className="brand-logo-image" src="/findqc-logo.png" alt="" width="48" height="48" loading="lazy" decoding="async" />
            <span className="brand-name">findqc<span>.pro</span></span>
          </div>
          <p>{t("footer.description")}</p>
        </div>
        <div>
          <h3>{t("footer.explore")}</h3>
          <Link href="/products">{t("footer.latest")}</Link>
          <Link href="/categories">{t("footer.categories")}</Link>
          <Link href="/guides">{t("footer.guides")}</Link>
          <Link href="/articles">{t("footer.journal")}</Link>
        </div>
        <div>
          <h3>{t("footer.information")}</h3>
          <Link href="/about">{t("footer.about")}</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">{t("footer.contact")}</Link>
          <Link href="/privacy">{t("footer.privacy")}</Link>
          <Link href="/terms">{t("footer.terms")}</Link>
        </div>
        <div>
          <h3>{t("footer.catalog")}</h3>
          <a href="https://cnfanshp.com/AllProducts/" target="_blank" rel="noopener noreferrer">{t("footer.allProducts")} ↗</a>
          <a href="https://cnfanshp.com/shoes/" target="_blank" rel="noopener noreferrer">{t("footer.shoes")} ↗</a>
          <a href="https://cnfanshp.com/headwear/" target="_blank" rel="noopener noreferrer">{t("footer.headwear")} ↗</a>
          <a href="https://cnfanshp.com/accessories/" target="_blank" rel="noopener noreferrer">{t("footer.accessories")} ↗</a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 FindQC Pro</span>
        <p>{t("footer.legal")}</p>
      </div>
    </footer>
  );
}
