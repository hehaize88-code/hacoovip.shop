import { notFound } from "next/navigation";
import { LocalizedCategory, localizedPageMetadata } from "@/components/LocalizedPages";
import { categories } from "../../../data";
import { LOCALIZED_LOCALES, localizeCategories } from "../../../i18n";

export function generateStaticParams() {
  return LOCALIZED_LOCALES.flatMap((locale) => categories.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const category = localizeCategories(categories,locale).find((item)=>item.slug===slug);
  if (!LOCALIZED_LOCALES.includes(locale) || !category) return {};
  return localizedPageMetadata(locale, `/categories/${slug}`, category.name, category.description);
}

export default async function Category({ params }) {
  const { locale, slug } = await params;
  if (!LOCALIZED_LOCALES.includes(locale) || !categories.some((item)=>item.slug===slug)) notFound();
  return <LocalizedCategory locale={locale} slug={slug}/>;
}
