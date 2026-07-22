"use client";

import Link from "./LocalizedLink";
import { useLanguage } from "./LanguageProvider";

export default function Breadcrumbs({ items }) {
  const { t } = useLanguage();

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">{t("common.home")}</Link>
      {items.map((item, index) => {
        const label = item.labelKey ? t(item.labelKey, item.values) : item.label;
        return (
          <span key={item.href || item.labelKey || item.label}>
            <i>/</i>
            {item.href && index < items.length - 1 ? <Link href={item.href}>{label}</Link> : <b>{label}</b>}
          </span>
        );
      })}
    </nav>
  );
}
