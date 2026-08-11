import type { Metadata } from "next";
import type { Locale } from "./content";

const languageMap: Record<Locale, string> = { en:"en", de:"de-DE", fr:"fr-FR", it:"it-IT", nl:"nl-NL", ms:"ms-MY" };
const allLocales = Object.keys(languageMap) as Locale[];

export function makeMetadata(path:string, locale:Locale, title:string, description:string):Metadata {
  const clean=path.replace(/^\/+|\/+$/g,"");
  const localized=(lang:Locale)=>lang==="en"?(clean?`https://superbuys.pro/${clean}/`:"https://superbuys.pro/"):(clean?`https://superbuys.pro/${lang}/${clean}/`:`https://superbuys.pro/${lang}/`);
  return {
    title,
    description,
    alternates:{canonical:localized(locale),languages:Object.fromEntries(allLocales.map(lang=>[languageMap[lang],localized(lang)]).concat([["x-default",localized("en")]]))},
    robots:{index:true,follow:true},
    openGraph:{title,description,type:"website",url:localized(locale),siteName:"Superbuy Product Index"},
  };
}
