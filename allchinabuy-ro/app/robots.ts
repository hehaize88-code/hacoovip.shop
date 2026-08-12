import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://allchinabuy.ro/sitemap.xml",
    host: "https://allchinabuy.ro",
  };
}
