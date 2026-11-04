import { SiteChrome } from "../site-chrome";
import Link from "next/link";
import improvements from "../../content/article-improvements.json";
import releaseImprovements from "../../content/seo-20261104-improvements.json";
import { ProductLinkHelper } from "../product-link-helper";

export type Section = { heading:string; paragraphs:string[]; bullets?:string[]; table?:{headers:string[];rows:string[][]} };

export type ArticleSource = { label:string; href:string };
export type RelatedGuide = { title:string; href:string };

export function ArticleContent({ tag, title, dek, slug, sections, published="2026-08-22", updated="2026-08-24", sources=[], related=[] }:{ tag:string; title:string; dek:string; slug:string; sections:Section[]; published?:string; updated?:string; sources?:ArticleSource[]; related?:RelatedGuide[] }){
  const improvement=improvements[slug as keyof typeof improvements];
  if(improvement){ sections=[...sections,{heading:improvement.heading,paragraphs:improvement.paragraphs}]; related=[...related,{title:improvement.linkTitle,href:`/articles/${improvement.link}/`}]; updated="2026-10-07"; }
  const release=releaseImprovements[slug as keyof typeof releaseImprovements];
  if(release){sections=[...sections,...release.sections];related=[...related,...release.related];sources=[...sources,...release.sources];updated="2026-11-04";}
  sources=[...new Map(sources.map(s=>[s.href,s])).values()];
  related=[...new Map(related.map(s=>[s.href,s])).values()];
  const wordCount=[title,dek,...sections.flatMap(s=>[s.heading,...s.paragraphs,...(s.bullets??[]),...(s.table?[...s.table.headers,...s.table.rows.flat()]:[])])].join(" ").trim().split(/\s+/).length;
  const canonical=`https://spreadsheet-hipobuy.net/articles/${slug}/`;
  const schema=[
    {"@context":"https://schema.org","@type":"Article",headline:title,datePublished:published,dateModified:updated,wordCount,mainEntityOfPage:canonical,image:"https://spreadsheet-hipobuy.net/og.png",author:{"@type":"Organization",name:"Hipobuy Sheet editorial desk"},publisher:{"@type":"Organization",name:"Hipobuy Sheet",logo:{"@type":"ImageObject",url:"https://spreadsheet-hipobuy.net/hipobuy-logo.png"}}},
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://spreadsheet-hipobuy.net/"},{"@type":"ListItem",position:2,name:"Articles",item:"https://spreadsheet-hipobuy.net/articles/"},{"@type":"ListItem",position:3,name:title,item:canonical}]},
  ];
  const formatted=(date:string)=>new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",timeZone:"UTC"}).toUpperCase();
  return <SiteChrome><main className="article-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><header className="article-hero"><div><span>{tag}</span><small>PUBLISHED {formatted(published)} · UPDATED {formatted(updated)}</small></div><h1>{title}</h1><p>{dek}</p><div className="article-byline">By Hipobuy Sheet editorial desk</div><nav><Link href="/articles/">All guides</Link><Link href="/spreadsheet/">Open spreadsheet</Link></nav></header><article className="article-body"><aside><span>ON THIS PAGE</span>{sections.map((s,i)=><a href={`#section-${i+1}`} key={s.heading}>{String(i+1).padStart(2,"0")} {s.heading}</a>)}</aside><div className="article-copy"><div className="article-research"><strong>Sources and editorial update · {formatted(updated)}</strong><p>Official platform and customs information is separated from estimates and third-party reports. Rules, routes and prices can change, so verify the live checkout before payment.</p>{sources.length>0&&<nav className="article-sources" aria-label="Primary sources">{sources.map(source=><a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</nav>}</div><div className="article-callout"><strong>Scope note</strong><p>This independent guide explains a decision process, not a guaranteed rate, delivery date, tax result or refund outcome.</p></div>{slug==="hipobuy-link-converter-guide"&&<ProductLinkHelper/>}{sections.map((s,i)=><section id={`section-${i+1}`} key={s.heading}><small>{String(i+1).padStart(2,"0")}</small><h2>{s.heading}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}{s.table&&<div className="article-table-wrap"><table><thead><tr>{s.table.headers.map(h=><th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{s.table.rows.map((row,r)=><tr key={r}>{row.map((cell,c)=><td key={c}>{cell}</td>)}</tr>)}</tbody></table></div>}{s.bullets&&<ul>{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>}</section>)}{related.length>0&&<section className="related-guides"><small>NEXT</small><h2>Continue your research</h2><nav>{related.map(item=><Link href={item.href} key={item.href}>{item.title}<span>→</span></Link>)}</nav></section>}</div></article></main></SiteChrome>;
}
