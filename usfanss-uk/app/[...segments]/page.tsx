import type { Metadata } from "next";
import { localeCodes, pageMeta, SitePage, type Locale } from "../site";

const staticRoutes = [
  "categories",
  "products",
  "qc-desk",
  "articles",
  "help",
  "articles/usfans-first-order-link-to-warehouse",
  "articles/usfans-spreadsheet-guide",
  "articles/usfans-qc-photos-guide",
  "articles/usfans-shipping-cost-guide",
];

export const dynamicParams = false;

export function generateStaticParams() {
  const englishRoutes = staticRoutes.map((route) => ({ segments: route.split("/") }));
  const localizedRoutes = localeCodes
    .filter((locale) => locale !== "en")
    .flatMap((locale) => ["", ...staticRoutes].map((route) => ({
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
  const suffix=route==="articles/usfans-first-order-link-to-warehouse" ? `/${route}` : route ? `/${route}/` : "/";
  const canonical=`https://usfanss.uk${locale==="en" ? "" : `/${locale}`}${suffix}`;
  const languages=Object.fromEntries(localeCodes.map(code=>[code,`https://usfanss.uk${code==="en" ? "" : `/${code}`}${suffix}`]));
  const image="https://usfanss.uk/usfans.png";
  return {title:meta.title,description:meta.description,alternates:{canonical,languages:{...languages,"x-default":`https://usfanss.uk${suffix}`}},openGraph:{title:meta.title,description:meta.description,url:canonical,siteName:"USFans Spreadsheet & QC Guide",locale,images:[{url:image,width:375,height:123,alt:"USFans Spreadsheet & QC Guide"}],type:route.startsWith("articles/") ? "article" : "website"},twitter:{card:"summary_large_image",title:meta.title,description:meta.description,images:[image]}};
}

export default async function RoutedPage({params}:{params:Promise<{segments:string[]}>}) {
  const {locale,route}=parse((await params).segments);
  return <SitePage locale={locale} route={route}/>;
}
