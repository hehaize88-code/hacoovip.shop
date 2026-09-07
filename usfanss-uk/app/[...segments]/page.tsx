import type { Metadata } from "next";
import { articleMeta, articleSupportsLocale, localeCodes, pageMeta, SitePage, type Locale } from "../site";

const staticRoutes = [
  "categories",
  "products",
  "qc-desk",
  "articles",
  "help",
];

export const dynamicParams = false;

export function generateStaticParams() {
  const englishArticleRoutes=articleMeta.filter(article=>articleSupportsLocale(article,"en")).map(article=>`articles/${article.slug}`);
  const englishRoutes = [...staticRoutes,...englishArticleRoutes].map((route) => ({ segments: route.split("/") }));
  const localizedRoutes = localeCodes
    .filter((locale) => locale !== "en")
    .flatMap((locale) => ["", ...staticRoutes,...articleMeta.filter(article=>articleSupportsLocale(article,locale)).map(article=>`articles/${article.slug}`)].map((route) => ({
      segments: route ? [locale, ...route.split("/")] : [locale],
    })));
  return [...englishRoutes, ...localizedRoutes];
}

function parse(segments:string[]) {
  const first=segments[0] as Locale;
  const locale:Locale=localeCodes.includes(first) ? first : "en";
  const route=(locale==="en" ? segments : segments.slice(1)).join("/");
  return {locale,route};
}

export async function generateMetadata({params}:{params:Promise<{segments:string[]}>}):Promise<Metadata> {
  const {locale,route}=parse((await params).segments);
  const meta=pageMeta(locale,route);
  const suffix=route ? `/${route}/` : "/";
  const canonical=`https://usfanss.uk${locale==="en" ? "" : `/${locale}`}${suffix}`;
  const routedArticle=route.startsWith("articles/") ? articleMeta.find(article=>article.slug===route.split("/")[1]) : undefined;
  const hreflangLocales=routedArticle ? localeCodes.filter(code=>articleSupportsLocale(routedArticle,code)) : localeCodes;
  const languages=Object.fromEntries(hreflangLocales.map(code=>[code,`https://usfanss.uk${code==="en" ? "" : `/${code}`}${suffix}`]));
  const image="https://usfanss.uk/usfans.png";
  return {title:meta.title,description:meta.description,alternates:{canonical,languages:{...languages,"x-default":`https://usfanss.uk${suffix}`}},openGraph:{title:meta.title,description:meta.description,url:canonical,siteName:"USFans Spreadsheet & QC Guide",locale,images:[{url:image,width:375,height:123,alt:"USFans Spreadsheet & QC Guide"}],type:route.startsWith("articles/") ? "article" : "website"},twitter:{card:"summary_large_image",title:meta.title,description:meta.description,images:[image]}};
}

export default async function RoutedPage({params}:{params:Promise<{segments:string[]}>}) {
  const {locale,route}=parse((await params).segments);
  return <SitePage locale={locale} route={route}/>;
}
