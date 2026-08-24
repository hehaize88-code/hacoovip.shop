import type { Metadata } from "next";
import { InnerHero, SiteChrome } from "../site-chrome";
export const metadata:Metadata={title:"Hipobuy QC Photos Guide 2026: A Warehouse Checklist",description:"Use a repeatable checklist to review Hipobuy warehouse QC photos before approval.",alternates:{canonical:"/qc-guide/"}};
const checks=[
  ["01","Order match","Compare the photographed color, size label, selected version and quantity with the order record before judging appearance."],
  ["02","Measurements","Request or inspect useful measurements and compare them with a garment or item that already fits—not only a generic size chart."],
  ["03","Shape & symmetry","Look at the front, back, both sides and top. Check whether panels, prints, seams and paired items align consistently."],
  ["04","Construction","Zoom in on stitching, edges, closures, hardware, printed areas and attachment points. Separate cosmetic variation from functional damage."],
  ["05","Visible damage","Check for stains, scratches, dents, glue marks, loose threads, missing pieces and packaging damage."],
  ["06","Decision record","Keep the photos and note why you approved, requested another image, exchanged or returned the item."],
];
export default function QCPage(){return <SiteChrome><main className="inner-main"><InnerHero eyebrow="Warehouse decision system" title="Read QC photos in the same order, every time." intro="A product link helps you discover an item. Warehouse photographs help you evaluate the item that arrived. Use this order so an attractive first image does not hide a material problem."/><section className="checklist-grid">{checks.map(c=><article key={c[0]}><span>{c[0]}</span><div><h2>{c[1]}</h2><p>{c[2]}</p></div></article>)}</section><section className="two-column-note"><div><small>REQUEST AN EXTRA PHOTO WHEN</small><h2>The supplied view cannot answer a material question.</h2></div><ul><li>A size label or measurement is unreadable.</li><li>A mark may be glare, dust or damage.</li><li>A critical closure or accessory is hidden.</li><li>Only one angle is supplied for a three-dimensional item.</li></ul></section></main></SiteChrome>}
