import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, categories, products } from "@/lib/content";
import { buildPageMetadata, socialCard } from "@/lib/metadata";
import { SearchBox } from "@/components/SearchBox";
import { ProductCard } from "@/components/ProductCard";
import { PlatformStatus } from "@/components/PlatformStatus";

export const metadata: Metadata = buildPageMetadata({
  title: "AllChinaBuy Spreadsheet: Finds, Categories and QC Checks",
  description: "Browse AllChinaBuy product finds by category, match item IDs and options, and use a practical QC and shipping record before choosing a product.",
  path: "/allchinabuy-spreadsheet",
  image: socialCard("spreadsheet", "Searchable AllChinaBuy spreadsheet alternative share card"),
});

export default function SpreadsheetPage() {
  return (
    <main id="main-content" className="inner-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AllChinaBuy spreadsheet alternative",
        url: `${SITE_URL}/allchinabuy-spreadsheet`,
        description: "A searchable directory alternative to a static product spreadsheet.",
      }} />
      <section className="page-hero page-hero--plain">
        <p className="eyebrow">Spreadsheet alternative</p>
        <h1>AllChinaBuy Spreadsheet and Product Finds</h1>
        <p>
          Looking for an AllChinaBuy spreadsheet? This independent directory uses searchable pages instead:
          each entry explains its destination, review date and the checks still left to you.
        </p>
        <SearchBox />
        <div className="page-hero__actions">
          <Link className="button button--lime" href="/finds">Search the finds <span aria-hidden="true">→</span></Link>
          <Link className="button button--outline-dark" href="/guides/how-a-china-shopping-directory-works">How the directory works</Link>
        </div>
      </section>
      <PlatformStatus />
      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">Start with a category</p><h2>Find a useful product starting point.</h2></div></div>
        <div className="localized-grid">{categories.map(category => <a key={category.slug} href={category.targetUrl} rel="nofollow noopener noreferrer" target="_blank">{category.title}</a>)}</div>
        <div className="product-grid spreadsheet-products">{products.slice(0, 6).map(product => <ProductCard key={product.slug} product={product} />)}</div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">Why searchable pages</p><h2>Context travels with every link.</h2></div>
          <p>A static sheet can be fast to scan, but it often loses explanation, source context and update history on a small screen.</p>
        </div>
        <div className="check-grid">
          <article><span>01</span><h3>Search by intent</h3><p>Filter product types and research prompts instead of hunting through unexplained rows.</p></article>
          <article><span>02</span><h3>Read the limits</h3><p>Every product entry pairs a source-listing image and item ID while keeping editorial artwork clearly separate.</p></article>
          <article><span>03</span><h3>Keep useful context</h3><p>Measurement, QC and shipping checks sit beside the route instead of in a forgotten note.</p></article>
          <article><span>04</span><h3>Verify live details</h3><p>The destination remains the source for current price, availability, seller information and terms.</p></article>
        </div>
      </section>
      <section className="prose-shell">
        <h2>An independent directory with clear destinations</h2>
        <p>
          AllChinaBuy Pro is independent from the official AllChinaBuy website and is not owned,
          sponsored or endorsed by AllChinaBuy. Product entries match public source images and item IDs to exact destination product pages;
          broad searches and category buttons open the corresponding main catalogue pages. The site does
          not offer a downloadable spreadsheet and does not process transactions.
        </p>
        <h2>Keep a useful record beside every find</h2>
        <p>
          Useful entries identify the product type, preserve a clear destination, show when the route was
          reviewed and avoid fabricated prices or popularity signals. They also tell readers what the page
          cannot establish—especially quality, stock, authenticity and final shipping cost.
        </p>
        <div className="table-wrap"><table><thead><tr><th>Record</th><th>What to save</th><th>Why it matters</th></tr></thead><tbody>
          <tr><td>Item identity</td><td>Original marketplace item ID and destination item ID.</td><td>Detect a link pointing to a different product.</td></tr>
          <tr><td>Selected option</td><td>Size, colour, quantity and included parts.</td><td>A matching thumbnail does not prove a matching option.</td></tr>
          <tr><td>Price evidence</td><td>Displayed amount, currency and date.</td><td>Keep a dated estimate separate from a confirmed charge.</td></tr>
          <tr><td>QC record</td><td>Photo set, requested measurement and decision.</td><td>Connect the decision to the actual received item.</td></tr>
          <tr><td>Parcel planning</td><td>Warehouse, packing, scale weight and dimensions.</td><td>Compare shipping using the same parcel inputs.</td></tr>
          <tr><td>Open issue</td><td>Support case and next action.</td><td>Avoid treating an unresolved detail as verified.</td></tr>
        </tbody></table></div>
        <h2>Match the listing before comparing prices</h2>
        <p>Open the selected product and compare its item identity, title, images and options with the saved record. A similar name or first image can appear across different sellers and sizes. If an item is unavailable, label the row unavailable and research another listing; do not silently replace the saved URL with a different product. Existing product cards preserve their mapped destinations, while the search form passes your words to the associated catalogue.</p>
        <p>The directory is an alternative browsing format, not a downloadable spreadsheet or the official AllChinaBuy account system. It does not transfer orders, balances or warehouse inventory. Current prices and stock must be checked at the destination. Keep product research separate from any unresolved order with another service.</p>
        <h2>How to begin</h2>
        <p>
          Open the <Link href="/finds">searchable finds index</Link>, choose a category, read the verification
          notes and then examine the live result. For a first order, use the <Link href="/guides/qc-photo-checklist">QC photo checklist</Link> and <Link href="/guides/shipping-cost-planning">shipping planner</Link> before building a larger parcel.
        </p>
        <p>For shoes, compare the <Link href="/guides/allchinabuy-shoe-sizing-insole-qc/">insole measurement method</Link> before choosing a label. For an existing order, use the <Link href="/guides/allchinabuy-tracking-not-updating/">tracking stages</Link> or <Link href="/guides/allchinabuy-return-refund-stages/">return and refund record</Link>. These guides support a specific decision rather than asking you to trust a product card on its own.</p>
      </section>
    </main>
  );
}
