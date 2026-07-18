import type { Metadata } from "next";
import { FindsExplorer } from "@/components/FindsExplorer";
import { JsonLd } from "@/components/JsonLd";
import { categories, products, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Independent China Shopping Finds",
  description:
    "Browse source-matched product images and item IDs, then open each corresponding product through AllChinaBuy.",
  alternates: { canonical: `${SITE_URL}/finds` },
};

export default function FindsPage() {
  return (
    <main id="main-content" className="inner-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "AllChinaBuy Pro independent shopping finds",
          url: `${SITE_URL}/finds`,
          description: "Independent product discovery entries and verification prompts.",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.title,
              url: `${SITE_URL}/finds/${product.slug}`,
            })),
          },
        }}
      />
      <section className="page-hero page-hero--plain">
        <p className="eyebrow">Independent discovery index</p>
        <h1>Finds that explain what to check next.</h1>
        <p>
          These are research routes, not product endorsements. Filter the index,
          read the checks, then confirm current information on the destination page.
        </p>
      </section>
      <section className="content-section">
        <FindsExplorer products={products} categories={categories} />
      </section>
    </main>
  );
}
