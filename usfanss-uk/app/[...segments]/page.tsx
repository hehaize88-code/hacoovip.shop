import type { Metadata } from "next";
import { localeCodes, pageMeta, SitePage, type Locale } from "../site";

function parse(segments:string[]) {
  const first=segments[0] as Locale;
  const locale:Locale=localeCodes.includes(first) ? first : "en";
  const route=(locale==="en" ? segments : segments.slice(1)).join("/");
  return {locale,route};
}

export async function generateMetadata({params}:{params:Promise<{segments:string[]}>}):Promise<Metadata> {
  const {locale,route}=parse((await params).segments);
  const meta=pageMeta(locale,route);
  const canonical=`https://usfanss.uk${locale==="en" ? "" : `/${locale}`}${route ? `/${route}` : "/"}`;
  const languages=Object.fromEntries(localeCodes.map(code=>[code,`https://usfanss.uk${code==="en" ? "" : `/${code}`}${route ? `/${route}` : "/"}`]));
  return {title:meta.title,description:meta.description,alternates:{canonical,languages:{...languages,"x-default":`https://usfanss.uk${route ? `/${route}` : "/"}`}},openGraph:{title:meta.title,description:meta.description,type:"website"}};
}

export default async function RoutedPage({params}:{params:Promise<{segments:string[]}>}) {
  const {locale,route}=parse((await params).segments);
  return <SitePage locale={locale} route={route}/>;
}
