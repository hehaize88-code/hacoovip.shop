import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowIcon,
  PageHero,
  SearchBar,
  SiteFooter,
  SiteHeader,
} from "../components";
import { categories } from "../site-data";

export const metadata: Metadata = {
  title: "Superbuy Spreadsheet Guide",
  description:
    "Learn how to use a Superbuy spreadsheet-style product index, verify routes, compare listings, and avoid buying from stale links.",
};

export default function SpreadsheetPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Spreadsheet guide"
          title="Use the index. Keep your judgment."
          intro="A useful spreadsheet is a starting map—not proof of quality, authenticity, stock, or final cost. This guide shows you how to turn a product route into a deliberate buying decision."
          aside="A route check confirms that a destination and its primary image were reachable when reviewed. It does not endorse the seller or the item."
        />

        <section className="content-section content-shell">
          <h2>What makes this different from a link dump?</h2>
          <p>
            Large public spreadsheets often mix old links, copied labels, and
            vague price claims. This index is intentionally smaller at the
            product-card level: representative routes are checked for a live
            destination and a matching primary image, then categories and
            search connect you to the broader source catalogue.
          </p>
          <div className="info-grid">
            <article className="info-card">
              <span>01 / DESTINATION</span>
              <h3>Working route</h3>
              <p>The product card should open the intended detail page rather than a dead page or unrelated agent.</p>
            </article>
            <article className="info-card">
              <span>02 / IMAGE</span>
              <h3>Primary-image match</h3>
              <p>The card image is taken from the same destination so you can spot obvious route mismatches before clicking.</p>
            </article>
            <article className="info-card">
              <span>03 / CONTEXT</span>
              <h3>Clear uncertainty</h3>
              <p>USD amounts are browsing estimates. Availability, variants, domestic delivery, services, and shipping can change.</p>
            </article>
          </div>
        </section>

        <section className="content-section content-shell">
          <h2>A five-minute spreadsheet workflow</h2>
          <ol className="checklist">
            <li><strong>Search broadly.</strong> Use an item type or material first; a very specific copied title can hide useful alternatives.</li>
            <li><strong>Open the live listing.</strong> Confirm that the displayed photos, options, and current price match what attracted you.</li>
            <li><strong>Save the exact variant.</strong> Record colour, size, quantity, and any seller note before submitting the purchase.</li>
            <li><strong>Wait for warehouse evidence.</strong> Compare QC photos with your selected variant before building an international parcel.</li>
            <li><strong>Estimate the full parcel.</strong> Add domestic delivery, optional services, international shipping, and possible import charges.</li>
          </ol>
          <div className="callout">
            <strong>Do not use the card price as a checkout total.</strong>
            <p>The item price is only one part of the landed cost. Heavy packaging, volumetric weight, remote-area fees, and local customs rules can materially change the total.</p>
          </div>
          <SearchBar />
        </section>

        <section className="content-section content-shell">
          <h2>Browse by category</h2>
          <p>These links open the corresponding live collection in a new tab. Re-check the destination and listing details before placing an order.</p>
          <div className="category-grid compact-category-grid">
            {categories.map((category, index) => (
              <a href={category.url} target="_blank" rel="noopener noreferrer" className="category-card" key={category.name}>
                <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="category-copy"><strong>{category.name}</strong><small>{category.note}</small></span>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </section>

        <section className="cta-panel shell">
          <div><p className="eyebrow plain">Next checkpoint</p><h2>Inspect before you ship.</h2></div>
          <Link className="button button-primary" href="/qc-guide">Open the QC guide <ArrowIcon /></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
