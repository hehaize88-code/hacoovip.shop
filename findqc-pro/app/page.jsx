import HomeContent from "../components/HomeContent";
import { BUILD_LANGUAGE } from "../lib/routing";
import { getLocalizedArticle } from "../lib/localizedArticles";

const reading = [
  "1688-image-search-from-screenshot", "weidian-youshop-short-link-qc",
  "find-qc-photos-by-product-link", "qc-weight-dimensions-shipping-estimates",
  "findqc-vs-finderqc", "hoodie-qc-checklist", "t-shirt-qc-checklist",
];

export default function HomePage() {
  const featuredReading = reading.map((slug) => {
    const article = getLocalizedArticle(slug, BUILD_LANGUAGE);
    return { slug, title: article.shortTitle, description: article.excerpt };
  });
  return <HomeContent featuredReading={featuredReading} />;
}
