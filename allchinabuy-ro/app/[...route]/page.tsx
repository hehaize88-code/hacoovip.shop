import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { englishArticles, getEnglishArticle } from "../concept-c/articles";
import {
  getLocaleCopy,
  locales,
  type Locale,
  TerminalPage,
} from "../concept-c/terminal";

type Params = { route: string[] };

const sections = [
  "products",
  "categories",
  "qc-guide",
  "shipping-guide",
  "articles",
  "faq",
];

const localeMeta: Record<Locale, { region: string; ogLocale: string }> = {
  ro: { region: "pentru cumpărătorii din România", ogLocale: "ro_RO" },
  en: { region: "for shoppers in Romania", ogLocale: "en_US" },
  de: { region: "für Käufer in Rumänien", ogLocale: "de_DE" },
  fr: { region: "pour les acheteurs en Roumanie", ogLocale: "fr_FR" },
  es: { region: "para compradores en Rumanía", ogLocale: "es_ES" },
  it: { region: "per gli acquirenti in Romania", ogLocale: "it_IT" },
  pl: { region: "dla kupujących w Rumunii", ogLocale: "pl_PL" },
};

function parseRoute(route: string[]) {
  const candidate = route[0] as Locale;
  const hasLocale = locales.includes(candidate);
  const locale: Locale = hasLocale ? candidate : "ro";
  const path = hasLocale ? route.slice(1) : route;
  return { locale, path };
}

function cleanPath(locale: Locale, path: string[]) {
  const suffix = path.length ? `/${path.join("/")}` : "";
  return locale === "ro" ? suffix || "/" : `/${locale}${suffix}`;
}

function languageAlternates(path: string[]) {
  const suffix = path.length ? `/${path.join("/")}` : "";
  return {
    "x-default": suffix || "/",
    ro: suffix || "/",
    en: `/en${suffix}`,
    de: `/de${suffix}`,
    fr: `/fr${suffix}`,
    es: `/es${suffix}`,
    it: `/it${suffix}`,
    pl: `/pl${suffix}`,
  };
}

function isValid(path: string[]) {
  if (!path.length) return true;
  if (!sections.includes(path[0])) return false;
  if (path[0] !== "articles") return path.length === 1;
  if (path.length === 1) return true;
  return (
    path.length === 2 &&
    englishArticles.some((article) => article.slug === path[1])
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { route } = await params;
  const { locale, path } = parseRoute(route);
  if (!isValid(path)) return {};
  const canonical = cleanPath(locale, path);
  const alternates = { canonical, languages: languageAlternates(path) };
  const copy = getLocaleCopy(locale);
  const ogBase = {
    url: canonical,
    siteName: "allchinabuy.ro",
    locale: localeMeta[locale].ogLocale,
    alternateLocale: Object.values(localeMeta)
      .filter((item) => item.ogLocale !== localeMeta[locale].ogLocale)
      .map((item) => item.ogLocale),
    images: [
      {
        url: "/allchinabuy.png",
        width: 1200,
        height: 177,
        alt: "AllChinaBuy independent Romania guide",
      },
    ],
  };
  if (path[0] === "articles" && path[1]) {
    const article = getEnglishArticle(path[1]);
    const title = article.title;
    const description = article.description;
    const canonicalArticle = `/articles/${article.slug}`;
    return {
      title,
      description,
      alternates: { canonical: canonicalArticle },
      robots:
        locale === "ro"
          ? { index: true, follow: true }
          : { index: false, follow: true },
      openGraph: {
        ...ogBase,
        url: canonicalArticle,
        type: "article",
        title,
        description,
        locale: "en_US",
        alternateLocale: [],
        publishedTime: `${article.published}T00:00:00Z`,
        modifiedTime: `${article.modified}T00:00:00Z`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/allchinabuy.png"],
      },
    };
  }
  const page = copy.pages[path[0] || "products"] || copy.pages.articles;
  const roSeo: Record<string, [string, string]> = {
    products: [
      "AllChinaBuy Spreadsheet România | Produse și QC",
      "Descoperă produse din spreadsheet AllChinaBuy, compară estimări USD și verifică mărimea și pozele QC înainte de comandă.",
    ],
    categories: [
      "AllChinaBuy România: Sneakers, Hanorace și Categorii",
      "Explorează categorii AllChinaBuy: sneakers, hanorace, tricouri, jachete, pantaloni și accesorii. Deschide colecția potrivită.",
    ],
    "qc-guide": [
      "AllChinaBuy QC Photos: Ghid de Verificare | România",
      "Verifică pozele QC AllChinaBuy: mărimi, măsurători, cusături, culoare și defecte vizibile înainte de expediere.",
    ],
    "shipping-guide": [
      "AllChinaBuy România: Transport, Costuri și Vamă",
      "Planifică transportul AllChinaBuy în România: greutate, volum, rute eligibile, tracking și informații vamale datate.",
    ],
    articles: [
      "Ghiduri AllChinaBuy: Mărimi, QC, Transport și Tracking",
      "Ghiduri independente în engleză pentru România: spreadsheet, sneakers, hanorace, QC, costuri de transport, tracking și comenzi.",
    ],
  };
  const optimized = locale === "ro" ? roSeo[path[0] || "products"] : undefined;
  const title = locale === "en" && !path.length
    ? "AllChinaBuy Spreadsheet for Romania | Finds & QC Guide"
    : optimized?.[0] ?? `${page[0]} | AllChinaBuy România`;
  const description =
    optimized?.[1] ?? `${page[1]} ${localeMeta[locale].region}.`;
  return {
    title,
    description,
    alternates,
    openGraph: { ...ogBase, type: "website", title, description },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/allchinabuy.png"],
    },
  };
}

export default async function PublicRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { route } = await params;
  if (route[0] === "ro") permanentRedirect(`/${route.slice(1).join("/")}`);
  const { locale, path } = parseRoute(route);
  if (!isValid(path)) notFound();
  return <TerminalPage locale={locale} path={path} />;
}
