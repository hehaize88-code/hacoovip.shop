import Link from "next/link";

export default function GuideEvidenceSection({ slug }) {
  if (slug === "qc-photo-checklist") return <section id="photo-evidence-worksheet">
    <h2>A Hacoo QC worksheet for shoes and clothing</h2>
    <p>QC means quality control, but a set of photographs is only evidence of the details it actually shows. This checklist does not imply that Hacoo or the linked catalog offers an inspection service. Use item-specific images when available, and label listing or promotional photographs separately. A missing image is an unanswered question, not evidence of a defect.</p>
    <div className="research-table-wrap"><table className="research-table"><thead><tr><th scope="col">Decision</th><th scope="col">Useful photograph</th><th scope="col">Still unproven</th></tr></thead><tbody>
      <tr><th scope="row">Correct shoe option</th><td>Both shoes, selected color, visible size label and matching listing context</td><td>Comfort, authenticity and hidden materials</td></tr>
      <tr><th scope="row">Shoe measurement</th><td>Defined start and endpoint with readable units; distinguish foot, insole and outsole length</td><td>Usable internal space from outsole length alone</td></tr>
      <tr><th scope="row">Top or hoodie dimensions</th><td>Garment flat, chest endpoints visible, no stretched fabric</td><td>Fit from a model photo or an unexplained chest number</td></tr>
      <tr><th scope="row">Visible construction</th><td>Comparable front and back views, then seams, hems and fastenings</td><td>Long-term wear, wash behavior or a hidden defect</td></tr>
    </tbody></table></div>
    <p>For example, a chest photograph showing only the final number cannot confirm the starting point. Ask for one complete view with both endpoints and the selected size label. If that is unavailable, keep the measurement unresolved rather than using the number as a confirmed garment width. This is a measurement example, not a report about a specific listing.</p>
    <p>Use three outcomes in your notes: visible detail matches the selected option, a visible difference needs clarification, or the image is insufficient. Record the option, photo source and date with the outcome. Do not combine a clear photograph of one size with a chart for another size and call the set complete.</p>
    <p>Continue with the <Link href="/articles/hacoo-shoes-spreadsheet-size-fit/">shoe size and fit comparison</Link> or the <Link href="/articles/hacoo-hoodie-size-guide-measurements/">hoodie measurement guide</Link>. To compare two listings, use the <Link href="/articles/hacoo-spreadsheet-compare-product-links/">exact-option worksheet</Link> before transferring any image evidence between them.</p>
  </section>;

  if (slug === "how-to-use-hacoo-spreadsheet") return <section id="shortlist-worksheet">
    <h2>Turn three open tabs into a useful shortlist</h2>
    <p>Start with one requirement, such as a sweatshirt that layers under a jacket you own. Measure that reference garment, then record the same fields for each candidate. A product thumbnail is a discovery lead; the selected option and current chart supply the details needed for comparison.</p>
    <div className="research-table-wrap"><table className="research-table"><thead><tr><th scope="col">Field</th><th scope="col">What belongs in the row</th></tr></thead><tbody>
      <tr><th scope="row">Identity</th><td>Full destination, visible identifier, selected color, size and version</td></tr>
      <tr><th scope="row">Fit or specification</th><td>Current value, unit and measurement method for the exact option</td></tr>
      <tr><th scope="row">Evidence</th><td>Listing image, customer image or item-specific photo, clearly distinguished</td></tr>
      <tr><th scope="row">Cost</th><td>Currency, quantity, displayed amount and any unresolved required charge</td></tr>
      <tr><th scope="row">Outcome</th><td>Keep researching, reject for a stated reason, or proceed to a final live check</td></tr>
    </tbody></table></div>
    <p>For a hypothetical comparison, one sweatshirt provides flat chest width while another lists an unexplained chest number. The rows are not comparable yet. Ask what the second number measures; do not guess a circumference or borrow a chart from a similar photograph. A blank cell is more accurate than a confident-looking assumption.</p>
    <p>Keep Hacoo Pro's independent directory separate from the external catalog and from the official Hacoo service. Product discovery links do not make their accounts, orders, policies or inventory interchangeable. Save the host with the product route so that evidence stays attached to the right site.</p>
    <p>Choose the next guide by the decision you need to make: <Link href="/articles/hacoo-spreadsheet-men-clothing-finds/">build a men's clothing shortlist</Link>, <Link href="/articles/hacoo-spreadsheet-compare-product-links/">compare working product links</Link>, or <Link href="/articles/hacoo-budget-finds-total-cost/">compare the visible total cost</Link>. If the route itself fails, use the <Link href="/articles/hacoo-product-links-not-working/">broken-link recovery guide</Link>.</p>
  </section>;

  if (slug === "size-guide") return <section id="category-measurements">
    <h2>Choose the measurement method for the category</h2>
    <p>A number is useful only when its unit, endpoints and meaning are known. For shoes, keep foot length, insole length and outsole length separate. For a hoodie, distinguish flat chest width from body circumference and check whether sleeve length starts at the shoulder or neck. Comparing incompatible methods creates a false match even when the numbers look close.</p>
    <p>Use the <Link href="/articles/hacoo-shoes-spreadsheet-size-fit/">Hacoo shoe size comparison</Link> for a chart-reading example and the <Link href="/articles/hacoo-hoodie-size-guide-measurements/">hoodie size guide</Link> for chest, length and layering checks. Each uses clearly labeled illustrative measurements rather than claiming a universal size conversion.</p>
  </section>;
  return null;
}
