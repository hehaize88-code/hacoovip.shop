import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Site from "../site";
import { articleSlugs, ArticleSlug, copy, Lang, languages, routeKeys, RouteKey } from "../site-data";

type Props = { params: Promise<{ slug?: string[] }> };

function parseSegments(raw: string[] = []) {
  const maybeLang = raw[0] as Lang | undefined;
  const hasLang = languages.some((item) => item.code === maybeLang) && maybeLang !== "en";
  const lang: Lang = hasLang ? maybeLang! : "en";
  const routeSegments = hasLang ? raw.slice(1) : raw;
  if (routeSegments.length === 0) return { lang, route: "" as RouteKey, routePath: "" };
  if (routeSegments[0] === "articles" && routeSegments.length === 2 && articleSlugs.includes(routeSegments[1] as ArticleSlug)) {
    return { lang, route: "article" as const, articleSlug: routeSegments[1] as ArticleSlug, routePath: routeSegments.join("/") };
  }
  if (routeSegments.length === 1 && routeKeys.includes(routeSegments[0] as RouteKey)) {
    return { lang, route: routeSegments[0] as RouteKey, routePath: routeSegments[0] };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const parsed = parseSegments(slug);
  if (!parsed) return {};
  const t = copy[parsed.lang];
  const title = parsed.route === "" ? "Superbuy Spreadsheet — Product Finds & QC Guides" : parsed.route === "article" ? t.articles[parsed.articleSlug!].title : t.pageTitles[parsed.route].title;
  const description = parsed.route === "" ? t.heroText : parsed.route === "article" ? t.articles[parsed.articleSlug!].excerpt : t.pageTitles[parsed.route].text;
  return { title, description, robots: { index: false, follow: false } };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug = [] } = await params;
  const parsed = parseSegments(slug);
  if (!parsed) notFound();
  return <Site {...parsed} />;
}
