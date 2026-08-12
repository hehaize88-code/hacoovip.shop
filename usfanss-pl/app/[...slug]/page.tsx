import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleSlugs, copy, getArticles, locales, parseRoute, routeFor } from "../site-data";
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
  const c = copy[route.locale];
  const pageTitle = route.page === "article" && route.article ? getArticles(route.locale)[route.article].seoTitle ?? getArticles(route.locale)[route.article].title : route.page === "home" ? c.heroLines.join(" ") : route.page === "finds" ? c.findsTitle : route.page === "categories" ? c.categoriesTitle : route.page === "guides" ? c.guidesTitle : route.page === "articles" ? c.articlesTitle : c.faqTitle;
  const description = route.page === "article" && route.article ? getArticles(route.locale)[route.article].excerpt : c.heroBody;
  const pathname = routeFor(route.locale, route.page, route.article);
  return {
    title: pageTitle, description,
    alternates: { canonical: `${siteBase}${pathname}`, languages: Object.fromEntries(locales.map((l) => [l.lang, `${siteBase}${routeFor(l.code, route.page, route.article)}`]).concat([["x-default", `${siteBase}${routeFor("en", route.page, route.article)}`]])) },
    robots: { index: true, follow: true }
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const route = parseRoute((await params).slug);
  if (!route) notFound();
  return <SitePage locale={route.locale} page={route.page} article={route.article} />;
}
