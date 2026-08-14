import type { NextConfig } from "next";

const isCloudflarePagesStaticExport =
  process.env.CLOUDFLARE_PAGES_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isCloudflarePagesStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
        typescript: { tsconfigPath: "./tsconfig.pages.json" },
      }
    : {}),
};

export default nextConfig;
