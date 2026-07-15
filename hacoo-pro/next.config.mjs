/** @type {import('next').NextConfig} */
const isPagesExport = process.env.CLOUDFLARE_PAGES_STATIC_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  ...(isPagesExport ? { output: "export", trailingSlash: true } : {}),
};

export default nextConfig;
