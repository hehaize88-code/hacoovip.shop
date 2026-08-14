/* Remote source images are intentionally displayed from their exact listing URLs. */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Product } from "./site-data";
import { MAIN_SITE } from "./site-data";
import { LanguageSwitcher } from "./language-switcher";

export function ArrowIcon() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function SiteHeader() {
  const nav = [
    ["Spreadsheet", "/spreadsheet/"],
    ["Finds", "/finds/"],
    ["QC Guide", "/qc-guide/"],
    ["Shipping", "/shipping/"],
    ["Articles", "/articles/"],
    ["FAQ", "/faq/"],
  ];

  return (
    <header className="site-header">
      <div className="edition-bar">
        <div className="shell">
          <span>Independent buyer index</span>
          <span>Issue 01 / 2026</span>
          <span>Routes reviewed 14 Aug</span>
        </div>
      </div>
      <div className="shell nav-wrap">
        <Link className="brand" href="/" aria-label="Sheet Superbuy home">
          <img className="brand-logo" src="/superbuy-logo.png" alt="Superbuy" width="756" height="126" />
          <span className="brand-tag">Independent index</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <LanguageSwitcher />
        <a
          className="nav-cta"
          href={`${MAIN_SITE}/AllProducts/`}
          target="_blank"
          rel="noopener sponsored nofollow"
        >
          Browse products <ArrowIcon />
        </a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener sponsored nofollow">Browse products</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <img className="brand-logo" src="/superbuy-logo.png" alt="Superbuy" width="756" height="126" />
            <span className="brand-tag">Independent index</span>
          </Link>
          <p>Independent product research for more deliberate spreadsheet shopping.</p>
        </div>
        <div>
          <strong>Research</strong>
          <Link href="/spreadsheet/">Spreadsheet guide</Link>
          <Link href="/qc-guide/">QC checklist</Link>
          <Link href="/shipping/">Shipping planner</Link>
        </div>
        <div>
          <strong>Browse</strong>
          <Link href="/finds/">Product finds</Link>
          <Link href="/articles/">Articles</Link>
          <Link href="/faq/">FAQ</Link>
        </div>
        <div>
          <strong>Important</strong>
          <p>This site is independent and is not affiliated with Superbuy. Product names belong to their respective owners. No authenticity claim is made.</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 SheetSuperbuy</span>
        <span>Information only · No on-site sales</span>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow plain">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

export function SearchBar({ variant = "default" }: { variant?: "hero" | "default" }) {
  return (
    <form
      className={`search-bar ${variant === "hero" ? "search-bar-hero" : ""}`}
      action={`${MAIN_SITE}/search.html`}
      method="get"
      target="_blank"
      role="search"
    >
      <label htmlFor={`product-search-${variant}`} className="sr-only">Search products</label>
      <span aria-hidden="true">⌕</span>
      <input
        id={`product-search-${variant}`}
        name="keywords"
        type="search"
        placeholder="Search shoes, hoodies, jackets…"
        autoComplete="off"
      />
      <input type="hidden" name="channelid" value="2" />
      <button type="submit">Search <ArrowIcon /></button>
    </form>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      className="product-card"
      href={product.url}
      target="_blank"
      rel="noopener sponsored nofollow"
    >
      <span className="product-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          width="480"
          height="520"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <span className="checked-badge">Verified route</span>
      </span>
      <span className="product-meta"><small>{product.category}</small><small>{product.status}</small></span>
      <strong>{product.title}</strong>
      <span className="product-bottom"><b>{product.price}</b><span>Open listing <ArrowIcon /></span></span>
    </a>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  aside: string;
}) {
  return (
    <section className="page-hero shell">
      <div>
        <p className="eyebrow plain">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <aside><span>Review principle</span><p>{aside}</p></aside>
    </section>
  );
}
