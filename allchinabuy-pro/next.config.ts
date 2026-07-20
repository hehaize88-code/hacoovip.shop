import type { NextConfig } from "next";

const isPagesStaticExport = process.env.CLOUDFLARE_PAGES_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isPagesStaticExport ? { output: "export", trailingSlash: true } : {}),
};

export default nextConfig;
