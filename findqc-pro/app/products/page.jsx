import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import SearchBox from "../../components/SearchBox";
import ProductCard from "../../components/ProductCard";
import T from "../../components/LocalizedText";
import { products } from "../../lib/data";

export const metadata = {
  title: "Product Finds",
  description: "Browse a curated set of product listings with direct links to their matching source catalog pages.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="shell inner-page">
      <Breadcrumbs items={[{ labelKey: "nav.finds" }]} />
      <PageHero eyebrow={<T id="products.eyebrow" />} title={<><T id="products.title1" /><br /><em><T id="products.title2" /></em></>} intro={<T id="products.intro" />}><SearchBox compact /></PageHero>
      <section className="product-grid all-products">
        {products.map((product, index) => <ProductCard product={product} priority={index < 4} key={product.id} />)}
      </section>
      <p className="price-note"><T id="products.priceNote" /></p>
    </div>
  );
}
