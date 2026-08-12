import type { Metadata } from "next";
import { SitePage } from "./site-page";
import { locales, routeFor } from "./site-data";

const siteBase = "https://usfanss.pl";

export const metadata: Metadata = {
  title: "Znajdź produkt. Sprawdź szczegóły. Kupuj rozsądniej.",
  description: "Niezależny katalog znalezisk z arkuszy USFans: produkty, kategorie, poradniki i artykuły SEO w siedmiu językach.",
  alternates: {
    canonical: `${siteBase}/`,
    languages: Object.fromEntries(locales.map((locale) => [locale.lang, `${siteBase}${routeFor(locale.code, "home")}`]).concat([["x-default", `${siteBase}/en/`]])),
  },
};

export default function Home() {
  return <SitePage locale="pl" page="home" />;
}
