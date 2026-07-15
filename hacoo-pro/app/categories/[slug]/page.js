import { notFound } from "next/navigation";
import Link from "next/link";
import { Arrow, CheckIcon } from "@/components/Icons";
import StructuredData from "@/components/StructuredData";
import { categories, DESTINATION, SITE_URL } from "../../data";
import { languageAlternates } from "../../i18n";

export function generateStaticParams(){ return categories.map(c=>({slug:c.slug})); }
export async function generateMetadata({params}) { const {slug}=await params; const c=categories.find(x=>x.slug===slug); if(!c)return{}; return { title:`Hacoo ${c.name} Spreadsheet — Finds & Practical Checks`, description:`Explore the Hacoo ${c.name.toLowerCase()} spreadsheet route, current catalog links and practical checks for measurements, listing details and availability.`, alternates:languageAlternates(`/categories/${c.slug}`,"en") }; }

export default async function CategoryPage({params}) {
  const {slug}=await params; const c=categories.find(x=>x.slug===slug); if(!c) notFound();
  const schema={"@context":"https://schema.org","@type":"CollectionPage",name:`Hacoo ${c.name} Spreadsheet`,url:`${SITE_URL}/categories/${c.slug}`,description:c.description};
  return <><StructuredData data={schema}/><section className="category-hero"><div className="category-hero-image"><img src={c.image} alt={`${c.name} discovery category`}/></div><div className="category-hero-copy"><span className="section-label">{c.eyebrow} / Hacoo category</span><h1>{c.name}<br/><em>spreadsheet.</em></h1><p>{c.description}</p><a className="button primary" href={`${DESTINATION}${c.destination}`} target="_blank" rel="noopener noreferrer">Browse live {c.name.toLowerCase()} <Arrow/></a></div></section>
    <section className="section wrap"><div className="split-copy"><div><span className="section-label">Before opening a listing</span><h2>A category-specific checklist.</h2></div><div className="stacked-checks">{c.checklist.map((x,i)=><div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></div></section>
    <section className="soft-section"><div className="wrap story-grid"><div><span className="section-label">Why this route exists</span><h2>More useful than a wall of links.</h2></div><div><p className="large-copy">A focused {c.name.toLowerCase()} page lets you compare the details that matter for this product type instead of reusing one generic checklist for everything.</p><p>Hacoo Pro provides independent research context. The external destination provides the current listing. Always recheck availability, options, terms and the information relevant to your location.</p><div className="inline-links"><Link href="/guides/how-to-use-hacoo-spreadsheet">Use the spreadsheet guide <Arrow size={16}/></Link><Link href="/guides/qc-photo-checklist">Read the photo checklist <Arrow size={16}/></Link></div></div></div></section></>;
}
