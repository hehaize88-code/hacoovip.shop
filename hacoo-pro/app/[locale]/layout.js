import { notFound } from "next/navigation";
import { LOCALIZED_LOCALES } from "../i18n";

export function generateStaticParams() {
  return LOCALIZED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  const setLanguage = `document.documentElement.lang=${JSON.stringify(locale)}`;
  return <><meta httpEquiv="content-language" content={locale}/><script dangerouslySetInnerHTML={{ __html: setLanguage }}/><div lang={locale} data-locale={locale}>{children}</div></>;
}
