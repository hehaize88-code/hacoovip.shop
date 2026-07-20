"use client";

import { useLanguage } from "./LanguageProvider";

export default function LocalizedText({ id, values }) {
  const { t } = useLanguage();
  return t(id, values);
}
