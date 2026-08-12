import {
  categories,
  ConceptSwitcher,
  Footer,
  ProductCard,
  products,
  SearchBar,
} from "../concepts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChinaBuy Spreadsheet 2026 — Curated Product Finds",
  description:
    "Browse independent AllChinaBuy spreadsheet finds by category with USD price previews and direct product paths.",
  robots: { index: false, follow: false },
};

export default function ConceptA() {
  return (
    <main className="site concept-a">
      <ConceptSwitcher active="A" />
      <header className="site-nav nav-a">
        <a className="site-brand" href="#top">
          <span className="brand-mark">A</span>
          <b>ACBuy Atlas</b>
        </a>
        <nav>
          <a href="#categories">Categories</a>
          <a href="#drops">New drops</a>
          <a href="#guide">How it works</a>
        </nav>
        <a className="nav-cta" href="#drops">
          Browse finds <span>↗</span>
        </a>
      </header>

      <section className="hero-a" id="top">
        <div className="hero-a-copy">
          <div className="live-chip">
            <i /> UPDATED AUG 12 · 2026
          </div>
          <h1>
            Find the piece.
            <br />
            <em>Skip the noise.</em>
          </h1>
          <p>
            A sharper AllChinaBuy spreadsheet experience—curated products, clear
            USD prices and a direct path to every find.
          </p>
          <SearchBar />
          <div className="trust-row">
            <span>
              <b>2K+</b> curated finds
            </span>
            <span>
              <b>6</b> core categories
            </span>
            <span>
              <b>Daily</b> link checks
            </span>
          </div>
        </div>
        <div className="hero-a-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <a
            className="hero-product hero-product-main"
            href={products[3].href}
            target="_blank"
            rel="noopener"
          >
            <img src={products[3].image} alt={products[3].name} />
            <div>
              <span>EDITOR&apos;S PICK</span>
              <strong>{products[3].name}</strong>
              <b>{products[3].price} ↗</b>
            </div>
          </a>
          <div className="float-card float-card-one">
            <b>QC</b>
            <span>Photo-ready finds</span>
          </div>
          <div className="float-card float-card-two">
            <b>94%</b>
            <span>curation match</span>
          </div>
        </div>
      </section>

      <section className="category-strip" id="categories">
        {categories.map(([name, note, href, n]) => (
          <a href={href} target="_blank" rel="noopener" key={name}>
            <span>{n}</span>
            <div>
              <b>{name}</b>
              <small>{note}</small>
            </div>
            <i>↗</i>
          </a>
        ))}
      </section>

      <section className="section-a" id="drops">
        <div className="section-heading">
          <div>
            <span className="section-kicker">FRESHLY INDEXED</span>
            <h2>Today&apos;s radar</h2>
          </div>
          <p>
            Clean picks, real listing photos, zero endless spreadsheet
            scrolling.
          </p>
        </div>
        <div className="products-a">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.href} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="how-a" id="guide">
        <div>
          <span className="section-kicker">THE SIMPLE ROUTE</span>
          <h2>
            From find to cart
            <br />
            in three clean moves.
          </h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <b>Discover</b>
              <p>Search or browse a tightly organized category.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>Inspect</b>
              <p>Open the product listing and review the details.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>Continue</b>
              <p>Use the direct product path when you are ready.</p>
            </div>
          </li>
        </ol>
      </section>
      <Footer mode="a" />
    </main>
  );
}
