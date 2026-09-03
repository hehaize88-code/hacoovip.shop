import type { Metadata } from "next";
import { localizedPath, SiteRouter, parseRoute } from "../../components/site";
import { articles, copy } from "../../lib/content";

const BASE = "https://superbuys.store";

function absoluteUrl(path: string) {
  return `${BASE}${path}`;
}

function alternates(locale: "en" | "fr" | "de", basePath: string) {
  return {
    canonical: absoluteUrl(localizedPath(locale, basePath)),
    languages: {
      en: absoluteUrl(localizedPath("en", basePath)),
      "fr-FR": absoluteUrl(localizedPath("fr", basePath)),
      "de-DE": absoluteUrl(localizedPath("de", basePath)),
      "x-default": absoluteUrl(localizedPath("en", basePath)),
    },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }): Promise<Metadata> {
  const { segments } = await params;
  const route = parseRoute(segments);
  const t = copy[route.locale];
  if (route.kind === "article") {
    const article = articles[route.locale].find((item) => item.slug === route.slug);
    const url = absoluteUrl(localizedPath(route.locale, route.basePath));
    return {
      title: article?.title,
      description: article?.dek,
      alternates: alternates(route.locale, route.basePath),
      ...(["superbuy-warehouse-arrival-checklist", "superbuy-order-remarks-writing-guide", "superbuy-seller-not-shipped-delay-record"].includes(route.slug) ? {
        openGraph: { type: "article" as const, title: article?.title, description: article?.dek, url, siteName: "Superbuy Product Index" },
        twitter: { card: "summary", title: article?.title, description: article?.dek },
      } : {}),
    };
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
  return {
    title: titles[route.kind as keyof typeof titles],
    description: descriptions[route.kind as keyof typeof descriptions],
    alternates: alternates(route.locale, route.basePath),
  };
}

export default async function RoutedPage({ params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  return <SiteRouter segments={segments} />;
}
