import { notFound } from "next/navigation";
import { ContactPage } from "@/components/LegalPages";
import { getLegalCopy } from "@/app/legal-copy";
import { LOCALIZED_LOCALES } from "@/app/i18n";
import { localizedPageMetadata } from "@/components/LocalizedPages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const page = getLegalCopy(locale).contact;
  return localizedPageMetadata(locale, "/contact", page.title, page.description);
}

export default async function Contact({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <ContactPage locale={locale}/>;
}
