import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isArticle, isLang, isPage, SitePage, type Lang, type PageName } from "../site-page";
import { englishArticles } from "../article-content";
import { localizedArticles } from "../article-localizations";

type RouteProps = { params: Promise<{ path: string[] }> };

export function generateStaticParams() {
  const languages = ["en", "de", "fr", "es", "it"] as const;
  const pages = ["hot-drops", "categories", "how-it-works", "faq", "articles"] as const;
  const articles = ["spreadsheet-guide", "qc-photo-checklist", "shipping-cost-guide"] as const;
  const routes: string[][] = [];
  for (const lang of languages) {
    const prefix = lang === "en" ? [] : [lang];
    if (prefix.length) routes.push(prefix);
    for (const page of pages) routes.push([...prefix, page]);
    for (const article of articles) routes.push([...prefix, "articles", article]);
  }
  return routes.map((path) => ({ path }));
}

function resolvePath(parts: string[]) {
  let lang: Lang = "en";
  let rest = parts;
  if (parts[0] && isLang(parts[0])) {
    lang = parts[0];
    rest = parts.slice(1);
  }
  if (rest.length === 0) return { lang, page: "home" as PageName };
  if (rest[0] === "articles" && rest[1] && isArticle(rest[1]) && rest.length === 2) {
    return { lang, page: "article" as PageName, article: rest[1] };
  }
  if (rest.length === 1 && isPage(rest[0])) return { lang, page: rest[0] };
  return null;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const resolved = resolvePath((await params).path);
  if (!resolved) return { title: "Page not found" };
  if (resolved.page === "article" && "article" in resolved) {
    const articleSlug = resolved.article;
    if (!articleSlug) return { title: "Page not found" };
    const article = resolved.lang === "en" ? englishArticles[articleSlug] : localizedArticles[resolved.lang][articleSlug];
    const prefix = resolved.lang === "en" ? "" : `/${resolved.lang}`;
    return {
      title: article.title,
      description: article.description,
      alternates: { canonical: `${prefix}/articles/${articleSlug}` },
    };
  }
  const titles: Record<string, string> = {
    home: "Superbuy Spreadsheet 2026 — Product Finds & QC Guides",
    "hot-drops": "Superbuy Finds 2026 — Latest Product Index",
    categories: "Superbuy Spreadsheet Categories — Shoes, Hoodies & More",
    "how-it-works": "How to Use a Superbuy Spreadsheet — 2026 Guide",
    faq: "Superbuy Spreadsheet FAQ — Products, QC & Shipping",
    articles: "Superbuy Guides — QC Photos, Shipping & Product Finds",
  };
  return { title: titles[resolved.page], description: "Independent Superbuy product discovery, category routes, QC guidance and practical shopping-agent research." };
}

export default async function DynamicPage({ params }: RouteProps) {
  const resolved = resolvePath((await params).path);
  if (!resolved) notFound();
  return <SitePage {...resolved} />;
}
