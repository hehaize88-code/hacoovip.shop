import { SITE_URL } from "./data";

export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/products/shoe-performance.webp`,
  width: 750,
  height: 750,
  alt: "Hacoo Pro independent spreadsheet and product discovery guide",
};

const OG_LOCALES = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  pt: "pt_PT",
};

function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  return `${SITE_URL}${normalized}`;
}

export function createPageMetadata({ title, description, path = "/", locale = "en", alternates, type = "website", image = SOCIAL_IMAGE }) {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | Hacoo Pro`;
  return {
    title,
    description,
    alternates,
    openGraph: {
      type,
      siteName: "Hacoo Pro",
      locale: OG_LOCALES[locale] || OG_LOCALES.en,
      title: socialTitle,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
