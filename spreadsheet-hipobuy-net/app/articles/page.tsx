import type { Metadata } from "next";
import { InnerHero, SiteChrome } from "../site-chrome";
import { priorityArticles } from "./priority-article-data";
export const metadata:Metadata={title:"Hipobuy Guides 2026: Shipping, Review, Fees, QC & Tracking",description:"11 fact-conscious Hipobuy guides covering the spreadsheet, country shipping, price per KG, reviews, fees, coupons, QC, storage and refunds.",alternates:{canonical:"/articles/"}};
const articles=[
  ["C01 · START HERE","How to Buy with Hipobuy in 2026: Product Link to Delivery","A fact-checked workflow for product selection, order notes, warehouse review, 90-day storage planning, consolidation and international shipping.","12 MIN","/articles/how-to-buy-with-hipobuy/"],
  ["C02 · QC PHOTOS","Hipobuy QC Photos: What to Check Before Warehouse Approval","A practical inspection system for variants, measurements, construction, damage, evidence requests and a defensible warehouse decision.","11 MIN","/articles/hipobuy-qc-photos/"],
  ["C03 · COSTS","Hipobuy Shipping Cost 2026: Build a Realistic Total","A transparent cost model covering product price, domestic delivery, packing, chargeable weight, route eligibility and customs uncertainty.","12 MIN","/articles/hipobuy-shipping-cost/"],
  ...priorityArticles.map((article,index)=>[`C${String(index+4).padStart(2,"0")} · ${article.tag}`,article.title,article.description,"8 MIN",`/articles/${article.slug}/`]),
];
export default function ArticlesPage(){return <SiteChrome><main className="inner-main"><InnerHero eyebrow="11 fact-checked guides · reviewed 9 Sep 2026" title="Hipobuy answers built around real search decisions." intro="Start with the buying workflow, then use focused guides for QC, country shipping, fees, storage, reviews, tracking and refunds. Official facts are sourced; live prices and outcomes are never invented."/><section className="article-index">{articles.map((a,i)=><a href={a[4]} key={a[1]}><div><span>{a[0]}</span><small>{String(i+1).padStart(2,"0")}</small></div><h2>{a[1]}</h2><p>{a[2]}</p><footer><b>{a[3]} READ</b><strong>READ ARTICLE →</strong></footer></a>)}</section></main></SiteChrome>}
