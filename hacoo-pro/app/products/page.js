import ProductsIndex from "@/components/ProductsIndex";
import { languageAlternates } from "@/app/i18n";
import { createPageMetadata } from "@/app/seo";

export const metadata = createPageMetadata({
  title: "Hacoo Products: Checked Links & Images",
  description: "Browse eight checked Hacoo product references with image-matched CNFansHP detail routes, category research checks and live-search fallbacks.",
  path: "/products",
  alternates: languageAlternates("/products", "en"),
});

export default function ProductsPage() {
  return <ProductsIndex locale="en"/>;
}
