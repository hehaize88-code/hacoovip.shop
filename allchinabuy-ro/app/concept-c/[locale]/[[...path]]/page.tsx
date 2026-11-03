import type { Metadata } from "next";
import {
  getLocaleCopy,
  locales,
  type Locale,
  TerminalPage,
} from "../../terminal";
import { notFound } from "next/navigation";
import { englishArticles, getArticle } from "../../articles";

type Params = { locale: string; path?: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale: rawLocale, path = [] } = await params;
  const locale = (
    locales.includes(rawLocale as Locale) ? rawLocale : "en"
  ) as Locale;
  const copy = getLocaleCopy(locale);
  if (path[0] === "articles" && path[1]) {
    if (!englishArticles.some(article => article.slug === path[1])) return {};
    const article = getArticle(locale, path[1]);
    return {
      title: article.title,
      description: article.description,
      robots: { index: false, follow: false },
    };
  }
  const page = copy.pages[path[0] || "products"] || copy.pages.articles;
  return {
    title: `${page[0]} — ACB_FIND//`,
    description: page[1],
    robots: { index: false, follow: false },
  };
}

export default async function LocalizedTerminal({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale: rawLocale, path = [] } = await params;
  const locale = (
    locales.includes(rawLocale as Locale) ? rawLocale : "en"
  ) as Locale;
  if (path[0] === "articles" && path[1] && !englishArticles.some(article => article.slug === path[1])) notFound();
  return <TerminalPage locale={locale} path={path} />;
}
