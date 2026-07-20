import type { Metadata } from "next";
import { SITE_URL } from "./content";

type SocialImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image: SocialImage;
  type?: "website" | "article";
  modifiedTime?: string;
  locale?: string;
  languages?: Record<string, string>;
};

function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build a complete, page-owned social metadata set.
 *
 * Next.js replaces nested metadata objects instead of deep-merging them. Every
 * route therefore supplies all Open Graph and Twitter fields explicitly so a
 * child page can never inherit the homepage URL, title or image by accident.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  modifiedTime,
  locale,
  languages,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.url);
  const openGraphImage = {
    url: imageUrl,
    alt: image.alt,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
  };
  const commonOpenGraph = {
    url: canonical,
    siteName: "AllChinaBuy Pro",
    title,
    description,
    images: [openGraphImage],
    ...(locale ? { locale } : {}),
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph:
      type === "article"
        ? {
            ...commonOpenGraph,
            type: "article",
            ...(modifiedTime ? { modifiedTime } : {}),
          }
        : { ...commonOpenGraph, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function socialCard(filename: string, alt: string): SocialImage {
  return {
    url: `/images/social/${filename}.webp`,
    width: 1200,
    height: 630,
    alt,
  };
}

export function guideSocialCard(src: string, alt: string): SocialImage {
  const filename = src.split("/").pop()?.replace(/\.svg$/i, ".webp");
  if (!filename) throw new Error(`Unable to build guide social image for ${src}`);
  return {
    url: `/images/guides/social/${filename}`,
    width: 1200,
    height: 630,
    alt,
  };
}
