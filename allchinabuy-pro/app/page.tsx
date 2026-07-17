/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { SearchBox } from "@/components/SearchBox";
import { categories, faqs, guides, products, SITE_URL } from "@/lib/content";

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
              target: "https://cnfanshp.com/search.html?channelid=2&keywords={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "AllChinaBuy Pro Editorial",
            url: SITE_URL,
            logo: `${SITE_URL}/logo-allchinabuy.png`,
            description: "An independent editorial shopping directory. Not affiliated with AllChinaBuy or CNFansHP.",
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
            <a href="https://cnfanshp.com/AllProducts/" className="button button--lime">Browse all products <span aria-hidden="true">→</span></a>
            <Link href="/guides/how-a-china-shopping-directory-works" className="button button--outline">How it works</Link>
          </div>
          <ul className="trust-chips" aria-label="Directory principles">
            <li><span aria-hidden="true">✓</span> Routes checked</li>
            <li><span aria-hidden="true">▦</span> Clear categories</li>
            <li><span aria-hidden="true">▯</span> Mobile friendly</li>
          </ul>
          <div className="hero-trending">
            <div className="section-label"><span>Trending research routes</span><Link href="/finds">View all ↗</Link></div>
            <div className="hero-trending__grid">
              {products.slice(0, 3).map((product) => <ProductCard key={product.slug} product={product} compact />)}
            </div>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <img src="/images/hero-collage.png" alt="" width="1120" height="1400" fetchPriority="high" />
          <span className="hero-art__stamp">Independent<br />not official</span>
        </div>
      </section>

      <section className="category-band" aria-labelledby="category-heading">
        <div className="section-heading section-heading--dark">
          <div><p className="eyebrow">Browse by intent</p><h2 id="category-heading">A directory built around useful categories.</h2></div>
          <p>Choose a research route here, then confirm current commercial details on the live CNFansHP page.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a href={category.targetUrl} key={category.slug} className="category-card">
              <span className="category-card__number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{category.title}</h3><p>{category.kicker}</p></div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="editorial-split">
        <div className="editorial-split__visual">
          <img src="/images/neutral-sneaker.png" alt="Generic neutral technical sneaker used as a category illustration" width="1254" height="1254" loading="lazy" />
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
          {guides.map((guide, index) => (
            <article className="guide-card" key={guide.slug}>
              <span className="guide-card__index">0{index + 1}</span>
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
          {faqs.slice(0, 4).map((item, index) => (
            <details key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>
          ))}
        </div>
      </section>

      <section className="search-cta">
        <div><p className="eyebrow">Ready to look?</p><h2>Search the live CNFansHP catalogue.</h2><p>Your exact words are passed to the destination search — not reduced to a generic “all products” page.</p></div>
        <SearchBox compact />
      </section>
    </main>
  );
}
