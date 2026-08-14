import type { Metadata } from "next";

export const SITE_URL = "https://sheet-superbuy.com";
export const SITE_NAME = "Sheet Superbuy";
export const SOCIAL_IMAGE = `${SITE_URL}/superbuy-logo.png`;
export const SOCIAL_IMAGE_ALT =
  "Sheet Superbuy independent spreadsheet link verification index";
const isIndexableBuild =
  process.env.CLOUDFLARE_PAGES_STATIC_EXPORT === "1" ||
  process.env.CF_PAGES === "1";

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    robots: {
      index: isIndexableBuild,
      follow: isIndexableBuild,
      googleBot: {
        index: isIndexableBuild,
        follow: isIndexableBuild,
      },
    },
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 756,
          height: 126,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
