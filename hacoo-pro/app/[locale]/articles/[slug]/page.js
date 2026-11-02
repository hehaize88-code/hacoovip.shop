import { notFound } from "next/navigation";
import { ArticleEdition, editionMetadata } from "@/components/ArticleEdition";
import { articleSlugs } from "@/app/articles/editions";
import { LOCALIZED_LOCALES } from "@/app/i18n";

export const dynamicParams = false;
export function generateStaticParams() { return articleSlugs.map(slug => ({ slug })); }
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  return LOCALIZED_LOCALES.includes(locale) ? editionMetadata(locale, slug) : {};
}
export default async function Article({ params }) {
  const { locale, slug } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <ArticleEdition locale={locale} slug={slug}/>;
}
