import type { NextConfig } from "next";

const staticPagesBuild = process.env.CLOUDFLARE_PAGES_STATIC === "1";

const nextConfig: NextConfig = staticPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
      distDir: ".next-static",
      typescript: { tsconfigPath: "tsconfig.static.json" },
    }
  : {};

export default nextConfig;
