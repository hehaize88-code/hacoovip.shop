"use client";

import { useMemo, useState } from "react";
import { SiteHeader } from "./site-header";

const categories = [
  { name: "Shoes", href: "https://cnfanshp.com/shoes/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G55S9251.jpg" },
  { name: "Jackets", href: "https://cnfanshp.com/jackets/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1193O56.webp" },
  { name: "Hoodies/Sweaters", href: "https://cnfanshp.com/hoodies-sweaters/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1101D39.webp" },
  { name: "T-shirts", href: "https://cnfanshp.com/t-shirts/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1121Q55.webp" },
  { name: "Jersey", href: "https://cnfanshp.com/Jersey/", image: "https://cnfanshp.com/uploads/allimg/20260328/1-26032Q40Z2R6.webp" },
  { name: "Pants/Shorts", href: "https://cnfanshp.com/pants-shorts/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1212V39.webp" },
  { name: "Women", href: "https://cnfanshp.com/search.html?keywords=women&channelid=2", image: "https://cnfanshp.com/uploads/allimg/20260321/1-260321104011U9.webp" },
  { name: "Bags", href: "https://cnfanshp.com/search.html?keywords=bags&channelid=2", image: "https://cnfanshp.com/uploads/allimg/20260326/1-260326111Z1A1.webp" },
  { name: "Electronics", href: "https://cnfanshp.com/electronics/", image: "https://cnfanshp.com/uploads/allimg/20260328/1-26032Q32640313.webp" },
  { name: "Headwear", href: "https://cnfanshp.com/headwear/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G10Fc05.webp" },
  { name: "Accessories", href: "https://cnfanshp.com/accessories/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G04523609.webp" },
  { name: "Other Stuff", href: "https://cnfanshp.com/other-stuff/", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G11119217.webp" },
];

const products = [
  { id: "HB-5974", name: "Classic loose-fit sweatshirt", category: "Hoodies", price: "$19.45", source: "¥140", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G1101D39.webp", href: "https://cnfanshp.com/AllProducts/5974.html", checked: "2026-08-22" },
  { id: "HB-6045", name: "Everyday trainer · 60", category: "Shoes", price: "$45.85", source: "¥330", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G55S9251.jpg", href: "https://cnfanshp.com/AllProducts/6045.html", checked: "2026-08-22" },
  { id: "HB-5971", name: "Letter-embroidered cap", category: "Headwear", price: "$12.35", source: "¥89", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G10Fc05.webp", href: "https://cnfanshp.com/AllProducts/5971.html", checked: "2026-08-22" },
  { id: "HB-6043", name: "Daily runner · 58", category: "Shoes", price: "$38.90", source: "¥280", image: "https://cnfanshp.com/uploads/allimg/20260417/1-26041G55T15c.jpg", href: "https://cnfanshp.com/AllProducts/6043.html", checked: "2026-08-22" },
];

const guides = [
  { tag: "START HERE", title: "How to buy with Hipobuy", text: "A decision-by-decision route from product link to warehouse review." },
  { tag: "QC", title: "Read warehouse photos", text: "Check variants, measurements, construction and visible damage in order." },
  { tag: "SHIPPING", title: "Build a realistic total", text: "Separate item price, domestic delivery and international chargeable weight." },
];

const faqs = [
  { question: "What does Hipobuy say it does?", answer: "Its official app listings describe a shopping service for products from Chinese marketplaces, followed by international shipping." },
  { question: "Is 90-day storage advertised?", answer: "Yes. Current official app descriptions advertise 90 days of free warehouse storage; confirm live terms before relying on it." },
  { question: "Does it serve 200+ countries?", answer: "That is the current official platform claim, but route eligibility still depends on destination, contents and parcel limits." },
  { question: "Is five-day delivery guaranteed?", answer: "No. ‘As fast as 5 days’ is a best-case marketing claim, not a promise for every route or parcel." },
];

export default function Home() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => products.filter((product) => {
    return active === "All" || product.category === active;
  }), [active]);

  return (
    <main>
      <div className="grid-shell" aria-hidden="true" />
      <SiteHeader home />

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Checked product directory · 2026 edition</div>
          <h1><span className="notranslate" data-no-translate>Hipobuy</span><br /><em>Spreadsheet</em> 2026.</h1>
          <p className="hero-lede">Use a regularly checked catalogue to find products by category, open the exact listing and apply a repeatable verification checklist before ordering or shipping.</p>
          <form className="hero-search" action="https://cnfanshp.com/search.html" method="get" target="_blank">
            <label htmlFor="hero-query">Search the main catalogue</label>
            <div><span>⌕</span><input id="hero-query" name="keywords" required placeholder="Shoes, hoodie, product ID…" /><input type="hidden" name="channelid" value="2" /><button type="submit">Search ↗</button></div>
          </form>
          <div className="trust-line"><span><b>60</b> checked rows</span><span><b>06</b> indexable category pages</span><span><b>24 AUG</b> last link check</span></div>
        </div>

        <div className="hero-board" aria-label="Directory preview">
          <div className="board-top"><span>LIVE_INDEX.csv</span><span className="live-dot">LINK CHECKED</span></div>
          <div className="board-head"><span>ITEM</span><span>CATEGORY</span><span>USD REF.</span></div>
          {products.slice(0, 3).map((product, index) => (
            <a href={product.href} target="_blank" rel="noopener noreferrer" className="board-row" key={product.id}>
              <span className="row-number">0{index + 1}</span><img src={product.image} alt="" /><span className="row-name">{product.name}<small>{product.id}</small></span><span className="row-category">{product.category}</span><strong>{product.price}</strong><i>↗</i>
            </a>
          ))}
          <div className="board-note">Prices are dated references—not checkout quotes.</div>
        </div>
      </section>

      <section className="category-strip" id="categories">
        <div className="section-kicker">01 / BROWSE</div>
        <div className="section-heading"><h2>Start with a shelf,<br />not an endless scroll.</h2><p>Each route opens the matching live category. Confirm the current listing before making a decision.</p></div>
        <div className="category-image-grid">
          {categories.map((category) => (
            <a href={category.href} target="_blank" rel="noopener noreferrer" key={category.name} aria-label={`Open ${category.name} on cnfanshp.com`}>
              <span className="category-product"><img src={category.image} alt="" loading="lazy" /></span>
              <h3>{category.name}</h3><b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="index-section" id="live-index">
        <div className="section-kicker light">02 / LIVE INDEX</div>
        <div className="index-toolbar"><div><h2>Checked product rows.</h2><p>Preview data from the destination catalogue.</p></div><div className="filter-tabs" role="group" aria-label="Filter products by category">{["All", "Shoes", "Hoodies", "Headwear"].map((tab) => <button className={active === tab ? "active" : ""} onClick={() => setActive(tab)} key={tab}>{tab}</button>)}</div></div>
        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id}>
              <a className="product-image" href={product.href} target="_blank" rel="noopener noreferrer"><img src={product.image} alt={product.name} loading="lazy" /><span>{product.category}</span></a>
              <div className="product-data"><small><span className="notranslate" data-no-translate>{product.id}</span> · <span>Checked</span> {product.checked}</small><h3>{product.name}</h3><div><strong>{product.price}</strong><span><b className="currency-ref notranslate" data-no-translate>{product.source}</b> <i>snapshot</i></span></div><a href={product.href} target="_blank" rel="noopener noreferrer">Open exact product <b>↗</b></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="qc-section" id="qc">
        <div className="qc-intro"><div className="section-kicker">03 / QC METHOD</div><h2>Approve with a checklist,<br />not a feeling.</h2><p>Marketplace photos describe a listing. Warehouse photos help verify the item that actually arrived.</p><a href="/qc-guide/">Read the full QC guide <span>→</span></a></div>
        <ol className="qc-steps">
          <li><span>01</span><div><h3>Variant match</h3><p>Confirm color, size and selected version first.</p></div><b>FIRST</b></li>
          <li><span>02</span><div><h3>Measurements</h3><p>Compare dimensions with an item that already fits.</p></div><b>FIT</b></li>
          <li><span>03</span><div><h3>Construction</h3><p>Review symmetry, stitching, edges and hardware.</p></div><b>BUILD</b></li>
          <li><span>04</span><div><h3>Damage & extras</h3><p>Look for marks, missing pieces and packaging issues.</p></div><b>FINAL</b></li>
        </ol>
      </section>

      <section className="guide-section" id="guides">
        <div className="section-kicker">04 / RESEARCH NOTES</div>
        <div className="section-heading compact"><h2>Useful guides,<br />kept practical.</h2><p>Platform facts can change. Each guide separates what the sheet shows from what must be confirmed at checkout.</p></div>
        <div className="guide-grid">{guides.map((guide, index) => <article key={guide.title}><div><span>{guide.tag}</span><small>0{index + 1}</small></div><h3>{guide.title}</h3><p>{guide.text}</p><a href={index === 0 ? "/articles/how-to-buy-with-hipobuy/" : index === 1 ? "/articles/hipobuy-qc-photos/" : "/articles/hipobuy-shipping-cost/"}>Read guide <b>→</b></a></article>)}</div>
      </section>

      <section className="faq-home" id="faq">
        <div className="section-kicker">05 / FAQ</div>
        <div className="section-heading compact"><h2>Before you open<br />a product link.</h2><p>Quick answers about prices, link checks, QC evidence and shipping estimates.</p></div>
        <div className="faq-card-grid">{faqs.map((faq, index) => <a href="/faq/" key={faq.question}><span>0{index + 1}</span><h3>{faq.question}</h3><p>{faq.answer}</p><b>Read all FAQs →</b></a>)}</div>
      </section>

      <footer><div className="footer-brand notranslate" data-no-translate><span className="footer-logo"><img src="/hipobuy-logo.png" alt="Hipobuy" /></span><strong>SHEET</strong></div><p>Independent product-discovery resource. Not affiliated with Hipobuy or the marketplaces referenced by product listings.</p><div><a href="#top">Back to top ↑</a><span>LINKS CHECKED · 24 AUG 2026</span></div></footer>
    </main>
  );
}
