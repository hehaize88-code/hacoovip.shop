import { notFound } from "next/navigation";
import { LocalizedGuide, localizedPageMetadata } from "@/components/LocalizedPages";
import { guides } from "../../../data";
import { LOCALIZED_LOCALES, localizeGuides } from "../../../i18n";

export function generateStaticParams() {
  return LOCALIZED_LOCALES.flatMap((locale) => guides.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const guide = localizeGuides(guides,locale).find((item)=>item.slug===slug);
  if (!LOCALIZED_LOCALES.includes(locale) || !guide) return {};
  return localizedPageMetadata(locale, `/guides/${slug}`, guide.title, guide.short);
}

export default async function Guide({ params }) {
  const { locale, slug } = await params;
  if (!LOCALIZED_LOCALES.includes(locale) || !guides.some((item)=>item.slug===slug)) notFound();
  return <LocalizedGuide locale={locale} slug={slug}/>;
}
