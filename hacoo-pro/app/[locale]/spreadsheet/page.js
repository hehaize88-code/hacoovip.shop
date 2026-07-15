import { notFound } from "next/navigation";
import { LocalizedSpreadsheet, localizedPageMetadata } from "@/components/LocalizedPages";
import { getCopy, LOCALIZED_LOCALES } from "../../i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const copy = getCopy(locale).spreadsheet;
  return localizedPageMetadata(locale, "/spreadsheet", copy.shortTitle, copy.lead);
}

export default async function Spreadsheet({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <LocalizedSpreadsheet locale={locale}/>;
}
