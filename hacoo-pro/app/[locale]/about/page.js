import { notFound } from "next/navigation";
import { LocalizedAbout, localizedPageMetadata } from "@/components/LocalizedPages";
import { getCopy, LOCALIZED_LOCALES } from "../../i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const copy = getCopy(locale).about;
  return localizedPageMetadata(locale, "/about", copy.title.join(" "), copy.lead);
}

export default async function About({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <LocalizedAbout locale={locale}/>;
}
