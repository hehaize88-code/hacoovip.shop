"use client";

import { useLanguage } from "./LanguageProvider";

export default function IndependenceNotice() {
  const { t } = useLanguage();

  return (
    <aside className="independence-notice" aria-label={t("notice.label")}>
      <div className="independence-notice-inner">
        <strong><i aria-hidden="true" />{t("notice.label")}</strong>
        <p>{t("notice.text")}</p>
      </div>
    </aside>
  );
}
