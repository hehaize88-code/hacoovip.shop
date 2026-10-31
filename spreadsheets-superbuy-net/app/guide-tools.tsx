import type { ArticleSlug, Lang } from "./site-data";
import practical from "./content/release-2026-10-31/practical.json";

type Table = [string, string[], string[][], string[]];
const keys: Partial<Record<ArticleSlug, string>> = {
  "superbuy-shipping-calculator-estimate-final-cost": "calculator",
  "superbuy-qc-photo-checklist": "qc",
  "superbuy-shoes-spreadsheet-sizing-qc": "shoes",
  "superbuy-hoodie-finds-measurements-qc": "hoodies",
  "superbuy-fees-explained": "fees",
  "superbuy-order-status-tracking": "tracking",
  "superbuy-returns-after-qc": "returns",
};
export function PracticalGuide({ lang, slug }: { lang: Lang; slug: ArticleSlug }) {
  const key = keys[slug];
  if (!key) return null;
  const data = practical[lang] as unknown as Record<string, Table>;
  const [title, headers, rows, paragraphs] = data[key];
  return <aside className="practical-guide" aria-label={title}>
    <span>{practical[lang].labels[0]}</span><h2>{title}</h2>
    {paragraphs.map(p => <p key={p}>{p}</p>)}
    <div className="table-scroll" tabIndex={0} role="region" aria-label={title}><table><caption className="sr-only">{title}</caption><thead><tr>{headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>
  </aside>;
}
export function OfficialSources({ lang, slug }: { lang: Lang; slug: ArticleSlug }) {
  const t = practical[lang].labels;
  const links = [["https://www.superbuy.com/en/page/guide/shoppingagent/", t[2]], ["https://www.superbuy.com/en/page/guide/feecomposition/", t[3]], ["https://www.superbuy.com/en/page/query/freight/", t[4]], ["https://www.superbuy.com/en/page/help/#search_helpId1451", t[5]]];
  const selected = slug.includes("return") || slug.includes("qc") ? [links[0], links[3], links[1]] : slug.includes("shipping") || slug.includes("fees") || slug.includes("storage") ? [links[2], links[1], links[0]] : [links[0], links[1]];
  return <aside className="official-sources"><h2>{t[1]}</h2><ul>{selected.map(([url, label]) => <li key={url}><a href={url} target="_blank" rel="noopener" data-ga-event="official_source_click" data-ga-content={slug}>{label} ↗</a></li>)}</ul></aside>;
}
