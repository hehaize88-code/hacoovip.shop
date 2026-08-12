import type { Metadata } from "next";
import { SiteRouter, parseRoute } from "../../components/site";
import { articles, copy } from "../../lib/content";

export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }): Promise<Metadata> {
  const { segments } = await params;
  const route = parseRoute(segments);
  const t = copy[route.locale];
  if (route.kind === "article") {
    const article = articles[route.locale].find((item) => item.slug === route.slug);
    return { title: article?.title, description: article?.dek };
  }
  const titles = {
    categories: t.categoriesPage.title,
    guides: t.guidesPage.title,
    faq: t.faqPage.title,
    articles: t.articlesPage.title,
    "not-found": "Page not found",
  } as const;
  const descriptions = {
    categories: t.categoriesPage.intro,
    guides: t.guidesPage.intro,
    faq: t.faqPage.intro,
    articles: t.articlesPage.intro,
    "not-found": "The requested page could not be found.",
  } as const;
  if (route.kind === "home") return {};
  if (route.kind === "not-found") {
    return { title: titles["not-found"], description: descriptions["not-found"], robots: { index: false, follow: false } };
  }
  return { title: titles[route.kind as keyof typeof titles], description: descriptions[route.kind as keyof typeof descriptions] };
}

export default async function RoutedPage({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  return <SiteRouter segments={segments} />;
}
