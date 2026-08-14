import type { MetadataRoute } from "next";
import { articles } from "./article-data";

const siteUrl = "https://sheet-superbuy.com";
const lastModified = "2026-08-14";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/spreadsheet/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/finds/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/qc-guide/`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/shipping/`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/articles/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/faq/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}/`,
    lastModified: article.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...corePages, ...articlePages];
}
