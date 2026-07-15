import Link from "next/link";
import { Arrow, CheckIcon } from "@/components/Icons";
import { CategoryCard, ProductCard } from "@/components/Cards";
import HeroSearch from "@/components/HeroSearch";
import StructuredData from "@/components/StructuredData";
import { categories, products, guides, faqs, DESTINATION } from "./data";
import { languageAlternates } from "./i18n";

export const metadata = { alternates: languageAlternates("/", "en") };

export default function Home() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.slice(0, 4).map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <div className="home-page">
      <StructuredData data={faqSchema}/>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> Independent Hacoo discovery guide</div>
          <h1>Find better.<br/><em>Check smarter.</em></h1>
          <p className="hero-lead">A clearer Hacoo spreadsheet experience for product links, category routes and practical checks—before you open the live listing.</p>
          <div className="hero-actions"><a className="button primary" href={DESTINATION} target="_blank" rel="noopener noreferrer">Visit CNFansHP main site <Arrow/></a><Link className="button quiet" href="/categories">Browse categories</Link></div>
          <div className="trust-row"><span><CheckIcon/> Independent</span><span><CheckIcon/> Category-led</span><span><CheckIcon/> Live-link checks</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"><img src="/products/shoe-performance.webp" alt="Footwear product discovery preview"/><span className="photo-note">DISCOVER / 01</span></div>
          <HeroSearch/>
          <div className="signal-card"><span>08</span><p>Focused category routes</p></div>
        </div>
      </section>

      <section className="ticker" aria-label="Popular Hacoo spreadsheet topics"><div>HACOO SPREADSHEET <i>•</i> PRODUCT LINKS <i>•</i> SIZE GUIDE <i>•</i> QC CHECKS <i>•</i> CATEGORY FINDS <i>•</i> LIVE LISTINGS <i>•</i></div></section>

      <section className="section wrap">
        <div className="section-heading"><div><span className="section-label">01 / Choose a route</span><h2>Start with what<br/>you actually need.</h2></div><p>Skip the endless tab shuffle. Every category has a clear purpose, a short verification checklist and a direct path to current catalog details.</p></div>
        <div className="category-grid">{categories.slice(0, 6).map((c, i) => <CategoryCard category={c} index={i} key={c.slug}/>)}</div>
        <div className="center-action"><Link className="button outline" href="/categories">View all categories <Arrow/></Link></div>
      </section>

      <section className="dark-section">
        <div className="wrap process-layout">
          <div className="process-intro"><span className="section-label inverse">02 / A useful process</span><h2>Discovery is only<br/>the first step.</h2><p>The most useful Hacoo spreadsheet guide does more than collect links. It helps you recognize what still needs to be confirmed.</p><Link className="button light" href="/guides/how-to-use-hacoo-spreadsheet">Read the full workflow <Arrow/></Link></div>
          <ol className="process-list">
            <li><span>01</span><div><h3>Pick the closest category</h3><p>Start narrow so the right measurements and checks stay visible.</p></div></li>
            <li><span>02</span><div><h3>Compare the useful details</h3><p>Look beyond the cover image: options, dimensions, materials and current status matter.</p></div></li>
            <li><span>03</span><div><h3>Open the live listing</h3><p>Use the destination page—not an old screenshot—as the final source for listing details.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-heading compact"><div><span className="section-label">03 / Current catalog routes</span><h2>Fresh routes to explore.</h2></div><a className="text-link large" href="https://www.cnfanshp.com/AllProducts/" target="_blank" rel="noopener noreferrer">View the live catalog <Arrow/></a></div>
        <div className="product-grid">{products.map(p => <ProductCard product={p} key={p.slug}/>)}</div>
        <p className="data-note">Each card opens an independent reference page with a current search route. Images and external availability may change; Hacoo Pro does not sell or authenticate products.</p>
      </section>

      <section className="editorial-section">
        <div className="wrap">
          <div className="section-heading"><div><span className="section-label">04 / Field notes</span><h2>Useful reading,<br/>without the hype.</h2></div><p>Short, practical guides built around the questions that block real decisions: what a spreadsheet is, how to compare links, what to measure and what can change.</p></div>
          <div className="guide-grid">{guides.slice(0, 4).map((g, i) => <Link href={`/guides/${g.slug}`} className="guide-card" key={g.slug}><span className="guide-number">0{i + 1}</span><div><small>{g.read} read</small><h3>{g.title}</h3><p>{g.short}</p><span className="text-link">Read guide <Arrow size={16}/></span></div></Link>)}</div>
        </div>
      </section>

      <section className="section wrap faq-preview">
        <div><span className="section-label">05 / Clear answers</span><h2>Before you click out.</h2><p>Hacoo Pro is an independent discovery guide. We do not process orders, promise shipping times or control the external listings we reference.</p><Link className="button outline" href="/faq">Read all answers <Arrow/></Link></div>
        <div className="faq-list">{faqs.slice(0, 4).map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>
    </div>
  );
}
