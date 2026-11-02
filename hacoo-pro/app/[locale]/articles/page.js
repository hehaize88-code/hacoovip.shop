import { notFound } from "next/navigation";
import { ArticleHub, hubMetadata } from "@/components/ArticleEdition";
import { LOCALIZED_LOCALES } from "@/app/i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return LOCALIZED_LOCALES.includes(locale) ? hubMetadata(locale) : {};
}

export default async function Articles({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <ArticleHub locale={locale}/>;
}
