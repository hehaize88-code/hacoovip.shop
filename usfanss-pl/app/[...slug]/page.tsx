import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleSlugs, getArticles, getPageSeo, locales, parseRoute, routeFor } from "../site-data";
import { SitePage } from "../site-page";

const siteBase = "https://usfanss.pl";

export async function generateStaticParams() {
  const routes: string[][] = [];
  for (const locale of locales) {
    const prefix = locale.code === "pl" ? [] : [locale.code];
    routes.push(prefix);
    for (const page of ["finds", "categories", "guides", "articles", "faq"]) routes.push([...prefix, page]);
    for (const article of articleSlugs) routes.push([...prefix, "articles", article]);
  }
  return routes.filter((slug) => slug.length > 0).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const route = parseRoute((await params).slug);
  if (!route) return {};
  const article = route.page === "article" && route.article ? getArticles(route.locale)[route.article] : null;
  const seo = route.page === "article" ? null : getPageSeo(route.locale, route.page);
  const pageTitle = article ? article.seoTitle ?? article.title : seo!.title;
  const description = article ? article.excerpt : seo!.description;
  const pathname = routeFor(route.locale, route.page, route.article);
  const isNewFullArticle = route.article === "usfans-poland-preorder-checklist";
  const isThinLocalizedArticle = route.page === "article" && route.locale !== "en" && !isNewFullArticle;
  const languageEntries = route.page === "article"
    ? (isNewFullArticle
      ? locales.map((l) => [l.lang, `${siteBase}${routeFor(l.code, "article", route.article)}`]).concat([["x-default", `${siteBase}${routeFor("pl", "article", route.article)}`]])
      : [["en", `${siteBase}${routeFor("en", "article", route.article)}`], ["x-default", `${siteBase}${routeFor("en", "article", route.article)}`]])
    : locales.map((l) => [l.lang, `${siteBase}${routeFor(l.code, route.page)}`]).concat([["x-default", `${siteBase}${routeFor("en", route.page)}`]]);
  return {
    title: pageTitle, description,
    alternates: { canonical: `${siteBase}${pathname}`, languages: Object.fromEntries(languageEntries) },
    robots: { index: !isThinLocalizedArticle, follow: true },
    openGraph: { type: "article", title: pageTitle, description, url: `${siteBase}${pathname}`, siteName: "USFanss" },
    twitter: { card: "summary", title: pageTitle, description }
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const route = parseRoute((await params).slug);
  if (!route) notFound();
  return <SitePage locale={route.locale} page={route.page} article={route.article} />;
}
