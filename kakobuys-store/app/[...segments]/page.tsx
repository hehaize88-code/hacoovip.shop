import { SitePage } from "../site-page";
import type { Metadata } from "next";
import { longArticles } from "../article-content";

const localeCodes = ["de", "fr", "es", "it", "pl", "pt", "ro"];

export async function generateMetadata({ params }: { params: Promise<{ segments?: string[] }> }): Promise<Metadata> {
  const { segments = [] } = await params;
  const route = localeCodes.includes(segments[0]) ? segments[1] : segments[0];
  const article = longArticles.find(item => item.slug === route);
  if (!article) return {};
  const canonicalPath = `/${article.slug}`;
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
