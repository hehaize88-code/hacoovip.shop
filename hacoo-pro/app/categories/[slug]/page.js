import { notFound } from "next/navigation";
import Link from "next/link";
import { Arrow, CheckIcon } from "@/components/Icons";
import StructuredData from "@/components/StructuredData";
import { CATALOG_REVIEW, categories, categoryResearch, DESTINATION, products, SITE_URL } from "../../data";
import { languageAlternates } from "../../i18n";
import { createPageMetadata } from "../../seo";
import { createBreadcrumbList, pageUrl, WEBSITE_ID } from "../../schema";

export function generateStaticParams(){ return categories.map(c=>({slug:c.slug})); }
export async function generateMetadata({params}) { const {slug}=await params; const c=categories.find(x=>x.slug===slug); if(!c)return{}; return createPageMetadata({ title:`Hacoo ${c.name}: Product Links & Checks`, description:`Explore the Hacoo ${c.name.toLowerCase()} spreadsheet route, current catalog links and practical checks for measurements, listing details and availability.`, path:`/categories/${c.slug}`, alternates:languageAlternates(`/categories/${c.slug}`,"en") }); }

export default async function CategoryPage({params}) {
  const {slug}=await params;
  const c=categories.find(x=>x.slug===slug);
  const research=categoryResearch[slug];
  const featuredProduct=products.find((product)=>product.categorySlug===slug);
  if(!c||!research||!featuredProduct) notFound();
  const verifiedListing=`${DESTINATION}${featuredProduct.listingPath}`;
  const liveSearch=`${DESTINATION}/search.html?keywords=${encodeURIComponent(featuredProduct.query)}&channelid=2&method=1`;
  const categoryUrl = pageUrl(`/categories/${c.slug}`);
  const breadcrumb = createBreadcrumbList({ path: `/categories/${c.slug}`, items: [{ name: "Home", path: "/" }, { name: "Categories", path: "/categories" }, { name: c.name, path: `/categories/${c.slug}` }] });
  const schema={"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","@id":`${categoryUrl}#webpage`,name:`Hacoo ${c.name} Spreadsheet`,url:categoryUrl,description:c.description,dateModified:CATALOG_REVIEW.iso,mainEntity:{"@id":`${SITE_URL}/products/${featuredProduct.slug}/`},breadcrumb:{"@id":breadcrumb["@id"]},isPartOf:{"@id":WEBSITE_ID}},{"@type":"ItemList",name:`Current ${c.name} reference`,itemListElement:[{"@type":"ListItem",position:1,url:`${SITE_URL}/products/${featuredProduct.slug}/`,name:featuredProduct.name}]},{"@type":"FAQPage",mainEntity:research.faqs.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))},breadcrumb]};

  return <>
    <StructuredData data={schema}/>
    <section className="category-hero"><div className="category-hero-image"><img src={c.image} alt={`${c.name} discovery category`}/></div><div className="category-hero-copy"><span className="section-label">{c.eyebrow} / Hacoo category</span><h1>{c.name}<br/><em>spreadsheet.</em></h1><p>{c.description}</p><a className="button primary" href={`${DESTINATION}${c.destination}`} target="_blank" rel="noopener noreferrer">Browse live {c.name.toLowerCase()} <Arrow/></a></div></section>

    <section className="section wrap"><div className="split-copy"><div><span className="section-label">Before opening a listing</span><h2>A category-specific checklist.</h2></div><div className="stacked-checks">{c.checklist.map((x,i)=><div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></div></section>

    <section className="verified-product-section"><div className="wrap"><div className="section-heading compact"><div><span className="section-label">Current product reference</span><h2>One real listing, checked directly.</h2></div><p>The detail route and image were checked together; the live page remains the final source for current options.</p></div><article className="verified-product"><div className="verified-product-image"><img src={featuredProduct.image} alt={`${featuredProduct.name} verified catalog reference`}/><span>Verified {CATALOG_REVIEW.label}</span></div><div className="verified-product-copy"><div className="verified-product-status"><span></span>Detail link opened successfully</div><p className="verified-product-id">CNFansHP listing #{featuredProduct.listingId}</p><h3>{featuredProduct.name}</h3><p>{featuredProduct.focus}</p><dl><div><dt>Observed catalog label</dt><dd>{featuredProduct.catalogLabel}</dd></div><div><dt>Last checked</dt><dd>{CATALOG_REVIEW.label}</dd></div></dl><div className="hero-actions"><Link className="button quiet" href={`/products/${featuredProduct.slug}/`}>Research page</Link><a className="button primary" href={verifiedListing} target="_blank" rel="noopener noreferrer">Open verified listing <Arrow/></a><a className="button quiet" href={liveSearch} target="_blank" rel="noopener noreferrer">Search fallback</a></div><p className="verified-product-disclosure">Reference inclusion does not verify stock, quality, authenticity or suitability. Recheck the selected option and current destination terms.</p></div></article></div></section>

    <section className="soft-section"><div className="wrap"><div className="section-heading"><div><span className="section-label">What to compare</span><h2>Three useful reference points.</h2></div><p>{research.intro}</p></div><div className="research-grid">{research.comparison.map(([title,text],index)=><article className="research-card" key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><p className="verification-note"><strong>Catalog route checked:</strong> {CATALOG_REVIEW.label}. Product options and availability can change after this review.</p></div></section>

    <section className="section wrap"><div className="section-heading"><div><span className="section-label">Size &amp; QC worksheet</span><h2>Record evidence, not impressions.</h2></div><p>Use the same method for every candidate. A blank cell means the information still needs confirmation.</p></div><div className="research-table-wrap"><table className="research-table"><thead><tr><th>Check</th><th>What to record</th><th>Useful evidence</th></tr></thead><tbody>{research.reviewRows.map(([check,record,evidence])=><tr key={check}><th>{check}</th><td>{record}</td><td>{evidence}</td></tr>)}</tbody></table></div><p className="table-note">This worksheet is category guidance, not a claim about the featured listing. Only record evidence visible on the current product page or its matching QC set.</p></section>

    <section className="section wrap"><div className="story-grid"><div><span className="section-label">Avoid false matches</span><h2>Common comparison mistakes.</h2></div><div><p className="large-copy">A focused {c.name.toLowerCase()} page is useful only when the selected option, measurements and live details all refer to the same item.</p><ul className="mistake-list">{research.mistakes.map((mistake)=><li key={mistake}><CheckIcon size={18}/><span>{mistake}</span></li>)}</ul><div className="inline-links"><Link href="/guides/how-to-use-hacoo-spreadsheet/">Use the spreadsheet workflow <Arrow size={16}/></Link><Link href="/guides/qc-photo-checklist/">Read the photo checklist <Arrow size={16}/></Link></div></div></div></section>

    <section className="update-section"><div className="wrap update-layout"><div><span className="section-label">Update log</span><h2>What changed on this page.</h2></div><ol className="update-log"><li><time dateTime={CATALOG_REVIEW.iso}>{CATALOG_REVIEW.label}</time><div><h3>Product and research refresh</h3><p>Verified listing #{featuredProduct.listingId} and the category route, added a direct-link fallback, published the size/QC worksheet, and expanded the category FAQ.</p></div></li></ol></div></section>

    <section className="soft-section"><div className="wrap category-faq"><div><span className="section-label">Quick answers</span><h2>{c.name} research FAQ.</h2></div><div className="faq-list">{research.faqs.map(([question,answer])=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
  </>;
}
