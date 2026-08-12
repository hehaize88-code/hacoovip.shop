import type { Metadata } from "next";
import {
  getLocaleCopy,
  locales,
  type Locale,
  TerminalPage,
} from "../../terminal";
import { getEnglishArticle } from "../../articles";

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
    const article = getEnglishArticle(path[1]);
    const seoTitles: Record<string, string> = {
      "spreadsheet-guide":
        "AllChinaBuy Spreadsheet Guide: Find Better Products",
      "qc-photo-routine": "AllChinaBuy QC Photos: 5-Minute Inspection Guide",
      "parcel-cost-guide": "AllChinaBuy Shipping Cost: Product vs Parcel Price",
    };
    return {
      title: seoTitles[article.slug],
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
  return <TerminalPage locale={locale} path={path} />;
}
