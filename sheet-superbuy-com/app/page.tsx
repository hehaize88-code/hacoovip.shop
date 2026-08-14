/* Remote source images are intentionally displayed from their exact listing URLs. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MAIN_SITE, categories, products, quickFaqs } from "./site-data";
import { SITE_URL } from "./seo";
import {
  ArrowIcon,
  ProductCard,
  SearchBar,
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "./components";

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Sheet Superbuy",
      alternateName: "Verified Superbuy Spreadsheet Link Index",
      description:
        "Independent Superbuy spreadsheet link verification, route checks, QC evidence, and dated update guidance.",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Sheet Superbuy",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/superbuy-logo.png`,
      description:
        "An independent research site not affiliated with Superbuy.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero shell">
          <div className="hero-index-line">
            <span>Sheet / 001</span>
            <span>Spreadsheet link verification and route updates</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> Independent index · review build</div>
              <h1 className="hero-verification-title">
                <span>Verified Superbuy</span>
                <span>Spreadsheet Link</span>
                <span>Index.</span>
              </h1>
            </div>
            <div className="hero-manifesto">
              <span className="manifesto-code">WHY / 01</span>
              <p className="hero-lede">
                A spreadsheet rebuilt as an inspectable link-checking desk.
                Review working routes, spot stale or mismatched destinations,
                then plan QC and shipping before committing to a parcel.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener sponsored nofollow">
                  Browse all products <ArrowIcon />
                </a>
                <Link className="button button-secondary" href="/spreadsheet/">Read the method</Link>
              </div>
              <p className="microcopy">Independent guide. No checkout or payment is processed here.</p>
            </div>
          </div>

          <div className="hero-search-desk">
            <div className="search-label"><span>01</span><strong>Search the live catalogue</strong></div>
            <SearchBar variant="hero" />
          </div>

          <div className="hero-ledger">
            <a className="hero-feature" href={products[0].url} target="_blank" rel="noopener sponsored nofollow">
              <img src={products[0].image} alt={products[0].title} width="720" height="580" referrerPolicy="no-referrer" />
              <span className="feature-caption"><small>Featured route / 6049</small><strong>{products[0].title}</strong><b>{products[0].price}</b></span>
            </a>
            <div className="route-sheet" aria-label="Route-check ledger">
              <div className="route-sheet-head"><span>Recent route checks</span><span>Status</span></div>
              {products.slice(1, 5).map((product, index) => (
                <a href={product.url} target="_blank" rel="noopener sponsored nofollow" key={product.url}>
                  <span className="route-id">0{index + 2}</span>
                  <strong>{product.title}</strong>
                  <span>{product.category}</span>
                  <b>{product.price}</b>
                  <i>Live ↗</i>
                </a>
              ))}
            </div>
          </div>

          <div className="trust-grid">
            <div><strong>6</strong><span>verified routes</span></div>
            <div><strong>20K+</strong><span>source catalogue</span></div>
            <div><strong>USD</strong><span>clear price estimates</span></div>
            <div><strong>14 Aug</strong><span>latest route check</span></div>
          </div>
        </section>

        <section className="section shell" id="categories">
          <SectionHeading
            eyebrow="Start with a category"
            title="Skip the spreadsheet scroll"
            body="Every category opens the corresponding product collection. No unrelated agents, pop-ups, or intermediate redirects."
          />
          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className="category-card"
                href={category.url}
                target="_blank"
                rel="noopener sponsored nofollow"
                key={category.name}
              >
                <span className="category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="category-copy">
                  <strong>{category.name}</strong>
                  <small>{category.note}</small>
                </span>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </section>

        <section className="section section-tint">
          <div className="shell">
            <div className="section-toolbar">
              <SectionHeading
                eyebrow="Recently checked"
                title="Real routes, not a 10,000-item claim"
                body="These representative listings were checked for a working destination and a matching primary image. USD figures are estimates; confirm the live listing before ordering."
              />
              <Link className="text-link" href="/finds/">
                View the research shelf <ArrowIcon />
              </Link>
            </div>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard product={product} key={product.url} />
              ))}
            </div>
          </div>
        </section>

        <section className="section shell process-section">
          <div className="process-intro">
            <p className="eyebrow plain">A clearer buying workflow</p>
            <h2>Find first. Inspect second. Ship last.</h2>
            <p>
              Product discovery and international shipping are separate
              decisions. This guide keeps them separate so beginners can judge
              the item before paying for a parcel.
            </p>
            <Link className="button button-secondary" href="/qc-guide/">
              Open the QC checklist
            </Link>
          </div>
          <div className="process-list">
            <article>
              <span>01</span>
              <div>
                <h3>Choose a product route</h3>
                <p>Open the source listing, confirm options, price, and availability.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Review warehouse photos</h3>
                <p>Superbuy states that three standard QC photos are supplied after warehouse inspection.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Build the parcel</h3>
                <p>Use consolidation, packaging choices, and the shipping calculator before submitting.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section dark-ink">
          <div className="shell guide-split">
            <div>
              <p className="eyebrow invert">Built for useful long-tail searches</p>
              <h2>Research that continues after the product click.</h2>
              <p>
                The product index answers “what can I browse?” The independent
                guides answer “what should I check before I buy?”
              </p>
            </div>
            <div className="guide-cards">
              <Link href="/spreadsheet/" className="guide-card">
                <span>Spreadsheet</span>
                <h3>How to use product links without buying blind</h3>
                <ArrowIcon />
              </Link>
              <Link href="/qc-guide/" className="guide-card">
                <span>QC photos</span>
                <h3>A practical warehouse-photo checklist</h3>
                <ArrowIcon />
              </Link>
              <Link href="/shipping/" className="guide-card">
                <span>Shipping</span>
                <h3>Plan weight, packaging, and parcel cost</h3>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        <section className="section shell faq-preview">
          <SectionHeading
            eyebrow="Straight answers"
            title="Before you open a listing"
            body="A short version of the questions most first-time spreadsheet users ask."
          />
          <div className="faq-list">
            {quickFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span>+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <Link className="text-link faq-link" href="/faq/">
            Read all questions <ArrowIcon />
          </Link>
        </section>

        <section className="cta-panel shell">
          <div>
            <p className="eyebrow plain">Ready to browse?</p>
            <h2>Start with a working product route.</h2>
          </div>
          <a
            className="button button-primary"
            href={`${MAIN_SITE}/AllProducts/`}
            target="_blank"
            rel="noopener sponsored nofollow"
          >
            Open all products <ArrowIcon />
          </a>
        </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
