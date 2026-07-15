import { notFound } from "next/navigation";
import { LocalizedFAQ, localizedPageMetadata } from "@/components/LocalizedPages";
import { getCopy, LOCALIZED_LOCALES } from "../../i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const copy = getCopy(locale).faqPage;
  return localizedPageMetadata(locale, "/faq", copy.title.join(" "), copy.lead);
}

export default async function FAQ({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <LocalizedFAQ locale={locale}/>;
}
