import { notFound } from "next/navigation";
import { LocalizedHome, localizedPageMetadata } from "@/components/LocalizedPages";
import { getCopy, LOCALIZED_LOCALES } from "../i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const copy = getCopy(locale).home;
  return localizedPageMetadata(locale, "/", copy.title.join(" "), copy.lead);
}

export default async function LocaleHome({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <LocalizedHome locale={locale}/>;
}
