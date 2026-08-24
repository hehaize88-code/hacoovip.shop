import type { Metadata } from "next";
import { InnerHero, SiteChrome } from "../site-chrome";

export const metadata: Metadata = { title:"Hipobuy Product Categories 2026: Shoes, Clothing & More", description:"Browse focused Hipobuy spreadsheet categories and open the matching live catalogue." };
const cats = [
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
export default function CategoriesPage(){ return <SiteChrome><main className="inner-main"><InnerHero eyebrow="Twelve focused routes" title="Browse Hipobuy product categories." intro="Start with product intent instead of scrolling a mixed list. Every card opens the corresponding category or search result on the main catalogue."/><section className="category-image-grid inner-category-images">{cats.map(c=><a href={c.href} target="_blank" rel="noopener noreferrer" key={c.name} aria-label={`Open ${c.name} on cnfanshp.com`}><span className="category-product"><img src={c.image} alt="" loading="lazy" /></span><h3>{c.name}</h3><b aria-hidden="true">↗</b></a>)}</section><section className="decision-note"><span>DIRECT ROUTES</span><h2>Less wandering. More checking.</h2><p>Opening a focused category is only the first step. Confirm product options and inspect available warehouse photos before approving an item.</p></section></main></SiteChrome> }
