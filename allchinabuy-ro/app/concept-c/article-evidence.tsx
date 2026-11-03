import type { Locale } from "./terminal";
import { articleUI } from "./article-ui";

const productExamples = new Set(["qc-photos-weidian-taobao-link", "t-shirt-size-chart-qc", "qc-photo-routine", "spreadsheet-guide"]);

export function ArticleEvidence({ locale, slug }: { locale: Locale; slug: string }) {
  if (!productExamples.has(slug)) return null;
  const ui = articleUI[locale];
  const showImages = slug !== "spreadsheet-guide";
  return <aside className="article-evidence">
    <h2>{ui.gallery}</h2>
    <p>{ui.note}</p>
    {showImages && <div className="example-photos">
      {(["front","back"] as const).map(side => <figure key={side}>
        <img src={`/guides/tee-${side}.jpg`} loading="lazy" alt={ui[side]} width="1280" height={side === "front" ? 1020 : 1022} />
        <figcaption>{ui[side]}</figcaption>
      </figure>)}
    </div>}
    <a href="https://weidian.com/item.html?itemID=7727281311" rel="noopener noreferrer" target="_blank">{ui.original} · 7727281311 ↗</a>
    <a href={`https://cnfanshp.com/AllProducts/5934.html?utm_source=allchinabuy.ro&utm_medium=referral&utm_campaign=ro_article&utm_content=${slug}`} rel="sponsored noopener noreferrer" target="_blank">{ui.catalog} ↗</a>
    {slug === "t-shirt-size-chart-qc" && <a href="https://ascolour.co.uk/staple-tee-5001/" target="_blank" rel="noopener noreferrer">{ui.chart} ↗</a>}
  </aside>;
}
