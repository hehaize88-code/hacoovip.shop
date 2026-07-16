import { notFound } from "next/navigation";
import LocalizedProductReference from "@/components/LocalizedProductReference";
import { products, SITE_URL } from "@/app/data";
import { LOCALIZED_LOCALES } from "@/app/i18n";
import { getLocalizedProduct } from "@/app/product-locales";
import { localizedPageMetadata } from "@/components/LocalizedPages";

export function generateStaticParams() {
  return LOCALIZED_LOCALES.flatMap((locale) => products.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const source = products.find((item) => item.slug === slug);
  if (!LOCALIZED_LOCALES.includes(locale) || !source) return {};
  const product = getLocalizedProduct(source, locale);
  return localizedPageMetadata(locale, `/products/${slug}`, product.name, product.summary, {
    image: { url: `${SITE_URL}${product.image}`, width: 750, height: 750, alt: product.name },
  });
}

export default async function ProductPage({ params }) {
  const { locale, slug } = await params;
  if (!LOCALIZED_LOCALES.includes(locale) || !products.some((item) => item.slug === slug)) notFound();
  return <LocalizedProductReference locale={locale} slug={slug}/>;
}
