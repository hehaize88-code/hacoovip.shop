import { notFound } from "next/navigation";
import { TermsPage } from "@/components/LegalPages";
import { getLegalCopy } from "@/app/legal-copy";
import { LOCALIZED_LOCALES } from "@/app/i18n";
import { localizedPageMetadata } from "@/components/LocalizedPages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const page = getLegalCopy(locale).terms;
  return localizedPageMetadata(locale, "/terms", page.title, page.description);
}

export default async function Terms({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <TermsPage locale={locale}/>;
}
