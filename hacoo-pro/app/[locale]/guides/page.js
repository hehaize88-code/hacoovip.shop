import { notFound } from "next/navigation";
import { LocalizedGuides, localizedPageMetadata } from "@/components/LocalizedPages";
import { getCopy, LOCALIZED_LOCALES } from "../../i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const copy = getCopy(locale).guidesPage;
  return localizedPageMetadata(locale, "/guides", copy.title.join(" "), copy.lead);
}

export default async function Guides({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <LocalizedGuides locale={locale}/>;
}
