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
  title: "The Finds Edit — Independent AllChinaBuy Product Picks",
  description:
    "A curated editorial shortlist of fashion finds for AllChinaBuy spreadsheet shoppers.",
  robots: { index: false, follow: false },
};

export default function ConceptB() {
  return (
    <main className="site concept-b">
      <ConceptSwitcher active="B" />
      <header className="site-nav nav-b">
        <a className="site-brand" href="#top">
          <span>THE</span>
          <b>
            FINDS
            <br />
            EDIT
          </b>
        </a>
        <nav>
          <a href="#edit">The edit</a>
          <a href="#departments">Departments</a>
          <a href="#notes">Field notes</a>
        </nav>
        <a className="nav-cta" href="#edit">
          Shop the issue ↘
        </a>
      </header>

      <section className="hero-b" id="top">
        <div className="issue-label">
          <span>ISSUE</span>
          <b>08 / 26</b>
          <i>Independent ACBuy discovery</i>
        </div>
        <div className="hero-b-title">
          <h1>
            Things worth
            <br />
            <em>finding.</em>
          </h1>
          <p>
            A weekly edit of standout fashion finds—selected for people with
            taste, not time.
          </p>
        </div>
        <div className="hero-b-collage">
          <div className="collage-copy">
            <span>DROP 032</span>
            <strong>
              New
              <br />
              Season
              <br />
              Layers
            </strong>
            <a href="#edit">Enter the edit ↗</a>
          </div>
          <img
            className="collage-main"
            src={products[4].image}
            alt={products[4].name}
          />
          <img
            className="collage-small"
            src={products[0].image}
            alt={products[0].name}
          />
          <span className="vertical-note">CURATED / CONSIDERED / CURRENT</span>
        </div>
        <SearchBar label="What are you looking for?" />
      </section>

      <section className="departments-b" id="departments">
        <span>SHOP BY DEPARTMENT</span>
        <div>
          {categories.map(([name, , href], index) => (
            <a href={href} target="_blank" rel="noopener" key={name}>
              <small>0{index + 1}</small>
              {name}
              <i>↗</i>
            </a>
          ))}
        </div>
      </section>

      <section className="section-b" id="edit">
        <div className="editorial-heading">
          <span>THE SHORTLIST · 08.12.26</span>
          <h2>
            Eight good reasons
            <br />
            to stop scrolling.
          </h2>
          <p>
            Prices shown in USD for faster comparison. Open any item to see the
            full current listing.
          </p>
        </div>
        <div className="products-b">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard
              mode="b"
              key={product.href}
              product={product}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="notes-b" id="notes">
        <span>FIELD NOTE № 04</span>
        <blockquote>
          “The best spreadsheet isn&apos;t the longest one. It&apos;s the one
          that helps you decide.”
        </blockquote>
        <p>
          Built around clearer categories, real product imagery and fewer dead
          ends.
        </p>
      </section>
      <Footer mode="b" />
    </main>
  );
}
