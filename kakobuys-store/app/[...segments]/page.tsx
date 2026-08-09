import { SitePage } from "../site-page";
import type { Metadata } from "next";
import { longArticles } from "../article-content";
import articleTranslations from "../article-translations.json";
import { finds } from "../finds-data";

const localeCodes = ["de", "fr", "es", "it", "pl", "pt", "ro"];

export async function generateMetadata({ params }: { params: Promise<{ segments?: string[] }> }): Promise<Metadata> {
  const { segments = [] } = await params;
  const language = localeCodes.includes(segments[0]) ? segments[0] : "en";
  const route = language === "en" ? segments[0] : segments[1];
  const articleIndex = longArticles.findIndex(item => item.slug === route);
  const article = articleIndex < 0 || (language !== "en" && articleIndex >= 3) ? undefined : language === "en"
    ? longArticles[articleIndex]
    : articleTranslations[language as keyof typeof articleTranslations][articleIndex];
  const find = language === "en" ? finds.find(item => item.slug === route) : undefined;
  if (find) return {
    title: `${find.name} | Kakobuy Finds Record`,
    description: `Independent details for ${find.name}, including category, reference price, destination record and the last-checked date.`,
    alternates: { canonical: `/${find.slug}` },
    openGraph: { title: `${find.name} | Kakobuy Finds Record`, description: `Independent checked details for ${find.name}.`, type: "website" }
  };
  if (language === "en" && route === "finds") return {
    title: "Kakobuy Finds: 30 Checked Product Records (2026)",
    description: "Browse 30 Kakobuy finds with independent detail pages, product images, USD reference prices, destination records and last-checked dates.",
    alternates: { canonical: "/finds" }
  };
  if (!article) return {};
  const canonicalPath = language === "en" ? `/${article.slug}` : `/${language}/${article.slug}`;
  const isReturns = language === "en" && article.slug === "kakobuy-returns-after-sales-checklist";
  const canonical = isReturns ? "https://kakobuys.store/kakobuy-returns-after-sales-checklist/" : canonicalPath;
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    robots: isReturns ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } } : undefined,
    alternates: {
      canonical,
      languages: articleIndex < 3 ? {
        en: `/${article.slug}`,
        de: `/de/${article.slug}`,
        fr: `/fr/${article.slug}`,
        es: `/es/${article.slug}`,
        it: `/it/${article.slug}`,
        pl: `/pl/${article.slug}`,
        pt: `/pt/${article.slug}`,
        ro: `/ro/${article.slug}`,
        "x-default": `/${article.slug}`
      } : { en: canonical, "x-default": canonical }
    },
    openGraph: { title: article.seoTitle, description: article.seoDescription, type: "article", url: isReturns ? canonical : undefined, images: isReturns ? ["https://kakobuys.store/brand/kakobuy.png"] : undefined }
  };
}

export default async function RoutedPage({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  return <SitePage segments={segments || []} />;
}
