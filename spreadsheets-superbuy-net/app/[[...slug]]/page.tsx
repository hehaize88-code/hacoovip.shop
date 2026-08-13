import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Site from "../site";
import { articleSlugs, ArticleSlug, copy, Lang, languages, localizedPath, routeKeys, RouteKey } from "../site-data";
import { homeSeo, pageSeo, trustPages, trustRouteKeys, TrustRoute } from "../seo-data";

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
  if (routeSegments.length === 1 && trustRouteKeys.includes(routeSegments[0] as TrustRoute)) {
    return { lang, route: "trust" as const, trustRoute: routeSegments[0] as TrustRoute, routePath: routeSegments[0] };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const parsed = parseSegments(slug);
  if (!parsed) return {};
  const t = copy[parsed.lang];
  const title = parsed.route === ""
    ? homeSeo[parsed.lang].title
    : parsed.route === "article"
      ? t.articles[parsed.articleSlug!].title
      : parsed.route === "trust"
        ? trustPages[parsed.lang][parsed.trustRoute!].title
        : pageSeo[parsed.lang][parsed.route].title;
  const description = parsed.route === ""
    ? homeSeo[parsed.lang].description
    : parsed.route === "article"
      ? t.articles[parsed.articleSlug!].excerpt
      : parsed.route === "trust"
        ? trustPages[parsed.lang][parsed.trustRoute!].description
        : pageSeo[parsed.lang][parsed.route].description;
  const routePath = parsed.route === "article" ? `articles/${parsed.articleSlug}` : parsed.route === "trust" ? parsed.trustRoute! : parsed.route;
  const absoluteUrl = (lang: Lang) => `https://spreadsheets-superbuy.net${localizedPath(lang, routePath)}`;
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: absoluteUrl(parsed.lang),
      languages: {
        en: absoluteUrl("en"),
        "fr-FR": absoluteUrl("fr"),
        "de-DE": absoluteUrl("de"),
        "id-ID": absoluteUrl("id"),
        "zh-CN": absoluteUrl("zh-cn"),
        "x-default": absoluteUrl("en"),
      },
    },
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug = [] } = await params;
  const parsed = parseSegments(slug);
  if (!parsed) notFound();
  return <Site {...parsed} />;
}
