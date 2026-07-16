import { SITE_URL } from "./data.js";
import { absoluteLocalizedUrl } from "./i18n.js";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANIZATION_LOGO_ID = `${SITE_URL}/#logo`;
export const ORGANIZATION_LOGO_URL = `${SITE_URL}/hacoo-organization-logo.svg`;

export const GUIDE_ARTICLE_IMAGES = {
  "what-is-a-hacoo-spreadsheet": { path: "/products/shoe-performance.webp", width: 750, height: 750 },
  "how-to-use-hacoo-spreadsheet": { path: "/products/tee-edit.webp", width: 750, height: 750 },
  "qc-photo-checklist": { path: "/products/live-6045.jpg", width: 1280, height: 1052 },
  "size-guide": { path: "/products/sweatshirt-layered.webp", width: 750, height: 750 },
  "shipping-planning": { path: "/products/jacket-edit.webp", width: 750, height: 750 },
};

export function withPageSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

export function pageUrl(path = "/", locale = "en") {
  return withPageSlash(absoluteLocalizedUrl(path, locale));
}

export function createOrganizationGraph() {
  return [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Hacoo Pro",
      alternateName: "Hacoo Pro Editorial",
      url: `${SITE_URL}/`,
      description: "Editorial Hacoo spreadsheet guide operated by the same publishing team as CNFansHP; not affiliated with or endorsed by Hacoo.",
      email: "service@cnfanshp.com",
      logo: { "@id": ORGANIZATION_LOGO_ID },
      image: { "@id": ORGANIZATION_LOGO_ID },
    },
    {
      "@type": "ImageObject",
      "@id": ORGANIZATION_LOGO_ID,
      url: ORGANIZATION_LOGO_URL,
      contentUrl: ORGANIZATION_LOGO_URL,
      width: 512,
      height: 512,
      caption: "Hacoo Pro",
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: "Hacoo Pro",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: ["en", "es", "fr", "de", "it", "pt"],
    },
  ];
}

export function createBreadcrumbList({ locale = "en", path, items }) {
  const currentUrl = pageUrl(path, locale);
  return {
    "@type": "BreadcrumbList",
    "@id": `${currentUrl}#breadcrumb`,
    itemListElement: items.map(({ name, path: itemPath }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: pageUrl(itemPath, locale),
    })),
  };
}

export function getGuideArticleImage(slug, title) {
  const image = GUIDE_ARTICLE_IMAGES[slug] || GUIDE_ARTICLE_IMAGES["what-is-a-hacoo-spreadsheet"];
  const url = `${SITE_URL}${image.path}`;
  return {
    ...image,
    url,
    contentUrl: url,
    caption: `${title} — Hacoo Pro guide reference`,
  };
}
