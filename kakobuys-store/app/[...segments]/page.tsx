import { SitePage } from "../site-page";
import type { Metadata } from "next";
import { longArticles } from "../article-content";
import articleTranslations from "../article-translations.json";

const localeCodes = ["de", "fr", "es", "it", "pl", "pt", "ro"];

export async function generateMetadata({ params }: { params: Promise<{ segments?: string[] }> }): Promise<Metadata> {
  const { segments = [] } = await params;
  const language = localeCodes.includes(segments[0]) ? segments[0] : "en";
  const route = language === "en" ? segments[0] : segments[1];
  const articleIndex = longArticles.findIndex(item => item.slug === route);
  const article = articleIndex < 0 ? undefined : language === "en"
    ? longArticles[articleIndex]
    : articleTranslations[language as keyof typeof articleTranslations][articleIndex];
  if (!article) return {};
  const canonicalPath = language === "en" ? `/${article.slug}` : `/${language}/${article.slug}`;
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: canonicalPath,
        de: `/de/${article.slug}`,
        fr: `/fr/${article.slug}`,
        es: `/es/${article.slug}`,
        it: `/it/${article.slug}`,
        pl: `/pl/${article.slug}`,
        pt: `/pt/${article.slug}`,
        ro: `/ro/${article.slug}`,
        "x-default": canonicalPath
      }
    },
    openGraph: { title: article.seoTitle, description: article.seoDescription, type: "article" }
  };
}

export default async function RoutedPage({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  return <SitePage segments={segments || []} />;
}
