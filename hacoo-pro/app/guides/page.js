import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { guides } from "../data";
import { languageAlternates } from "../i18n";

export const metadata = { title: "Hacoo Spreadsheet Guides — QC, Size & Shipping Research", description: "Read practical Hacoo spreadsheet guides covering discovery workflows, QC photographs, measurements and responsible shipping research.", alternates: languageAlternates("/guides", "en") };

export default function GuidesPage(){return <><section className="page-hero simple-hero"><div className="wrap"><span className="section-label">Independent field notes</span><h1>Read first.<br/><em>Click with context.</em></h1><p>Original, practical reading for the parts of product discovery that a spreadsheet row cannot explain on its own.</p></div></section><section className="section wrap"><div className="article-index">{guides.map((g,i)=><Link href={`/guides/${g.slug}`} key={g.slug}><span className="article-no">0{i+1}</span><div><small>{g.read} read</small><h2>{g.title}</h2><p>{g.short}</p></div><span className="article-arrow"><Arrow/></span></Link>)}</div></section></>}
