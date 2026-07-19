import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { guides } from "../data";
import { languageAlternates } from "../i18n";
import { createPageMetadata } from "../seo";
import BreadcrumbData from "@/components/BreadcrumbData";
import { articles } from "../articles/data";

export const metadata = createPageMetadata({ title: "Hacoo Guides: QC, Size & Shipping", description: "Read practical Hacoo spreadsheet guides covering discovery workflows, QC photographs, measurements and responsible shipping research.", path: "/guides", alternates: languageAlternates("/guides", "en") });

export default function GuidesPage(){return <><BreadcrumbData path="/guides" items={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }]}/><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">Independent field notes</span><h1>Read first.<br/><em>Click with context.</em></h1><p>Original, practical reading for the parts of product discovery that a spreadsheet row cannot explain on its own.</p></div></section><section className="section wrap"><div className="article-index">{guides.map((g,i)=><Link href={`/guides/${g.slug}`} key={g.slug}><span className="article-no">0{i+1}</span><div><small>{g.read} read</small><h2>{g.title}</h2><p>{g.short}</p></div><span className="article-arrow"><Arrow/></span></Link>)}</div><div className="featured-research-link"><div><span className="section-label">Long-form research</span><h3>{articles[0].title}</h3><p>{articles[0].excerpt}</p></div><Link className="button dark" href={`/articles/${articles[0].slug}/`}>Read the article <Arrow/></Link></div><div className="center-action"><Link className="button outline" href="/articles/">Browse all research articles <Arrow/></Link></div></section></>}
