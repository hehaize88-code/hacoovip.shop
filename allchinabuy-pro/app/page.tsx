/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { SearchBox } from "@/components/SearchBox";
import { MAIN_CATALOGUE_URL, categories, featuredFaqs, guides, products, SITE_URL } from "@/lib/content";

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "AllChinaBuy Pro",
            description: "Independent China shopping directory and research guides.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.cnfanshp.com/search.html?channelid=2&keywords={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "AllChinaBuy Pro Editorial",
            url: SITE_URL,
            logo: `${SITE_URL}/logo-allchinabuy.png`,
            description: "An editorial shopping directory whose product and category links lead to the associated CNFansHP main catalogue; it is not the official AllChinaBuy website.",
          },
        ],
      }} />

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Independent directory · Clearer routes</p>
          <h1>Find better China shopping links. Faster.</h1>
          <p className="hero-copy__intro">Curated product finds, link checks and practical buying guides — built for international shoppers.</p>
          <SearchBox />
          <div className="hero-actions">
            <a
              href={MAIN_CATALOGUE_URL}
              className="button button--lime"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Browse all products <span aria-hidden="true">↗</span>
            </a>
            <Link href="/guides/how-a-china-shopping-directory-works" className="button button--outline">How it works</Link>
          </div>
          <ul className="trust-chips" aria-label="Directory principles">
            <li><span aria-hidden="true">✓</span> Routes checked</li>
            <li><span aria-hidden="true">▦</span> Clear categories</li>
            <li><span aria-hidden="true">▯</span> Mobile friendly</li>
          </ul>
        </div>
        <div className="hero-art" aria-hidden="true">
          <img
            src="/images/hero-collage.webp"
            srcSet="/images/hero-collage-560.webp 560w, /images/hero-collage.webp 1120w"
            sizes="(max-width: 860px) 100vw, 40vw"
            alt=""
            width="1120"
            height="1400"
            fetchPriority="high"
          />
          <span className="hero-art__stamp">Independent<br />not official</span>
        </div>
      </section>

      <section className="home-trending" aria-labelledby="home-trending-heading">
        <div className="home-trending__heading">
          <div>
            <p className="eyebrow">Freshly checked</p>
            <h2 id="home-trending-heading">Trending research routes</h2>
          </div>
          <Link className="text-link" href="/finds">View all finds <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="home-trending__grid">
          {products.slice(0, 3).map((product) => <ProductCard key={product.slug} product={product} compact />)}
        </div>
      </section>

      <section className="category-band" aria-labelledby="category-heading">
        <div className="section-heading section-heading--dark">
          <div><p className="eyebrow">Browse by intent</p><h2 id="category-heading">A directory built around useful categories.</h2></div>
          <p>Choose a research route here, then confirm current commercial details in the matching main-site category.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a href={category.targetUrl} key={category.slug} className="category-card" target="_blank" rel="nofollow noopener noreferrer">
              <span className="category-card__number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{category.title}</h3><p>{category.kicker}</p></div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="editorial-split">
        <div className="editorial-split__visual">
          <img
            src="/images/neutral-sneaker.webp"
            srcSet="/images/neutral-sneaker-640.webp 640w, /images/neutral-sneaker.webp 1254w"
            sizes="(max-width: 560px) 112px, (max-width: 860px) 100vw, 50vw"
            alt="Generic neutral technical sneaker used as a category illustration"
            width="1254"
            height="1254"
            loading="lazy"
          />
          <span>Image is illustrative.<br />No brand claim.</span>
        </div>
        <div className="editorial-split__copy">
          <p className="eyebrow">Useful, not inflated</p>
          <h2>We do not pretend a product card is proof.</h2>
          <p>A strong shopping directory should reduce confusion without inventing ratings, availability, authenticity or customer quotations. Every entry explains what to verify when you reach the live catalogue.</p>
          <ol className="method-list">
            <li><span>01</span><div><h3>Find the route</h3><p>Start with a product type, category or practical question.</p></div></li>
            <li><span>02</span><div><h3>Check the destination</h3><p>Confirm current options, measurements, images and terms.</p></div></li>
            <li><span>03</span><div><h3>Plan the full order</h3><p>Consider packing, shipping, restrictions and destination rules.</p></div></li>
          </ol>
          <Link className="text-link" href="/reviews">Read our review method <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="guides-section" aria-labelledby="guides-heading">
        <div className="section-heading">
          <div><p className="eyebrow">Practical reading</p><h2 id="guides-heading">Guides with a job to do.</h2></div>
          <Link className="text-link" href="/guides">All guides <span aria-hidden="true">→</span></Link>
        </div>
        <div className="guide-grid">
          {guides.slice(0, 4).map((guide, index) => (
            <article className="guide-card" key={guide.slug}>
              <span className="guide-card__index">{String(index + 1).padStart(2, "0")}</span>
              <p className="eyebrow">{guide.eyebrow}</p>
              <h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3>
              <p>{guide.description}</p>
              <div><span>{guide.readingTime}</span><Link href={`/guides/${guide.slug}`} aria-label={`Read ${guide.title}`}>↗</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="faq-section__intro"><p className="eyebrow">Straight answers</p><h2 id="faq-heading">Before you use the directory.</h2><p>Clear ownership and limits matter. This website is independent and does not process orders.</p><Link className="text-link" href="/faq">Read every answer →</Link></div>
        <div className="faq-list">
          {featuredFaqs.map((item) => (
            <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>
          ))}
        </div>
      </section>

      <section className="search-cta">
        <div><p className="eyebrow">Ready to look?</p><h2>Search the main catalogue.</h2><p>Your exact words are passed to the CNFansHP product search — not reduced to a generic “all products” page.</p></div>
        <SearchBox compact />
      </section>
    </main>
  );
}
