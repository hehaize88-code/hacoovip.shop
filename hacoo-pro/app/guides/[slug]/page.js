import { notFound } from "next/navigation";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import StructuredData from "@/components/StructuredData";
import { guides, guideContent, SITE_URL } from "../../data";
import { languageAlternates } from "../../i18n";

export function generateStaticParams(){return guides.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}){const {slug}=await params;const g=guides.find(x=>x.slug===slug);if(!g)return{};return{title:g.title,description:g.short,alternates:languageAlternates(`/guides/${g.slug}`,"en")}}

export default async function GuidePage({params}){const{slug}=await params;const g=guides.find(x=>x.slug===slug);const c=guideContent[slug];if(!g||!c)notFound();const schema={"@context":"https://schema.org","@type":"Article",headline:g.title,description:g.short,mainEntityOfPage:`${SITE_URL}/guides/${g.slug}`,author:{"@type":"Organization",name:"Hacoo Pro Editorial"},datePublished:"2026-07-14",dateModified:"2026-07-14"};return <><StructuredData data={schema}/><article className="article"><header className="article-hero"><div className="wrap article-head"><span className="section-label">{c.kicker}</span><h1>{g.title}</h1><div className="article-meta"><span>Hacoo Pro Editorial</span><span>{g.read} read</span><span>Reviewed July 14, 2026</span></div><p>{c.intro}</p></div></header><div className="wrap article-body"><aside><span>In this guide</span>{c.sections.map(([h])=><a href={`#${h.toLowerCase().replaceAll(" ","-")}`} key={h}>{h}</a>)}<a href="#quick-process">Quick process</a></aside><div className="article-content">{c.sections.map(([h,p])=><section id={h.toLowerCase().replaceAll(" ","-")} key={h}><h2>{h}</h2><p>{p}</p></section>)}<section id="quick-process"><h2>Quick process</h2><ol>{c.steps.map((s,i)=><li key={s}><span>{i+1}</span>{s}</li>)}</ol></section><div className="article-callout"><h2>Continue with a live category</h2><p>Use the guide as context, then confirm current information on the destination listing.</p><Link className="button primary" href="/categories">Browse categories <Arrow/></Link></div></div></div></article></>}
