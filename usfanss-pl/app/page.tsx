import type { Metadata } from "next";
import { SitePage } from "./site-page";
import { getPageSeo, locales, routeFor } from "./site-data";

const siteBase = "https://usfanss.pl";

export const metadata: Metadata = {
  title: getPageSeo("pl", "home").title,
  description: getPageSeo("pl", "home").description,
  alternates: {
    canonical: `${siteBase}/`,
    languages: Object.fromEntries(locales.map((locale) => [locale.lang, `${siteBase}${routeFor(locale.code, "home")}`]).concat([["x-default", `${siteBase}/en/`]])),
  },
};

export default function Home() {
  return <SitePage locale="pl" page="home" />;
}
