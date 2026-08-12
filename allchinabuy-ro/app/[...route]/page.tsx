import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { englishArticles, getEnglishArticle } from "../concept-c/articles";
import { getLocaleCopy, locales, type Locale, TerminalPage } from "../concept-c/terminal";

type Params = { route: string[] };

const sections = ["products", "categories", "qc-guide", "shipping-guide", "articles", "faq"];

function parseRoute(route: string[]) {
  const candidate = route[0] as Locale;
  const hasLocale = locales.includes(candidate);
  const locale: Locale = hasLocale ? candidate : "en";
  const path = hasLocale ? route.slice(1) : route;
  return { locale, path };
}

function cleanPath(locale: Locale, path: string[]) {
  const suffix = path.length ? `/${path.join("/")}` : "/";
  return locale === "en" ? suffix : `/${locale}${suffix}`;
}

function languageAlternates(path: string[]) {
  const suffix = path.length ? `/${path.join("/")}` : "/";
  return {
    "x-default": suffix,
    en: suffix,
    de: `/de${suffix}`,
    fr: `/fr${suffix}`,
    es: `/es${suffix}`,
    it: `/it${suffix}`,
    pl: `/pl${suffix}`,
    ro: `/ro${suffix}`,
  };
}

function isValid(path: string[]) {
  if (!path.length) return true;
  if (!sections.includes(path[0])) return false;
  if (path[0] !== "articles") return path.length === 1;
  if (path.length === 1) return true;
  return path.length === 2 && englishArticles.some((article) => article.slug === path[1]);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { route } = await params;
  const { locale, path } = parseRoute(route);
  if (!isValid(path)) return {};
  const canonical = cleanPath(locale, path);
  const alternates = { canonical, languages: languageAlternates(path) };
  if (path[0] === "articles" && path[1]) {
    const article = getEnglishArticle(path[1]);
    const seoTitles: Record<string, string> = {
      "spreadsheet-guide": "AllChinaBuy Spreadsheet Guide: Find Better Products",
      "qc-photo-routine": "AllChinaBuy QC Photos: 5-Minute Inspection Guide",
      "parcel-cost-guide": "AllChinaBuy Shipping Cost: Product vs Parcel Price",
    };
    return { title: seoTitles[article.slug], description: article.description, alternates };
  }
  const copy = getLocaleCopy(locale);
  const page = copy.pages[path[0] || "products"] || copy.pages.articles;
  return { title: `${page[0]} — AllChinaBuy Spreadsheet`, description: page[1], alternates };
}

export default async function PublicRoute({ params }: { params: Promise<Params> }) {
  const { route } = await params;
  if (route[0] === "en") permanentRedirect(`/${route.slice(1).join("/")}`);
  const { locale, path } = parseRoute(route);
  if (!isValid(path)) notFound();
  return <TerminalPage locale={locale} path={path} />;
}
