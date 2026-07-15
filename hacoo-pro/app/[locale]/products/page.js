import { notFound } from "next/navigation";
import ProductsIndex from "@/components/ProductsIndex";
import { getProductPageCopy } from "@/app/products-copy";
import { LOCALIZED_LOCALES } from "@/app/i18n";
import { localizedPageMetadata } from "@/components/LocalizedPages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) return {};
  const copy = getProductPageCopy(locale);
  return localizedPageMetadata(locale, "/products", copy.title.join(" "), copy.lead);
}

export default async function ProductsPage({ params }) {
  const { locale } = await params;
  if (!LOCALIZED_LOCALES.includes(locale)) notFound();
  return <ProductsIndex locale={locale}/>;
}
