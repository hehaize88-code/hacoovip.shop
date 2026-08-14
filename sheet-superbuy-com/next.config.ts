import type { NextConfig } from "next";

const isCloudflarePagesStaticExport =
  process.env.CLOUDFLARE_PAGES_STATIC_EXPORT === "1" ||
  process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  ...(isCloudflarePagesStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
        generateBuildId: async () => "sheet-superbuy-static",
        typescript: { tsconfigPath: "./tsconfig.pages.json" },
      }
    : {}),
};

export default nextConfig;
