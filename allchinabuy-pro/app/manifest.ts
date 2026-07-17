import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AllChinaBuy Pro",
    short_name: "AllChinaBuy Pro",
    description: "Independent China shopping directory and practical buying guides.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4eedf",
    theme_color: "#10110f",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
