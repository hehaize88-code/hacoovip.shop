import { notFound } from "next/navigation";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import StructuredData from "@/components/StructuredData";
import { guides, guideContent, SITE_URL } from "../../data";
import { languageAlternates } from "../../i18n";
import { createPageMetadata } from "../../seo";
import { getCyclicRelated, withTrailingSlash } from "../../internal-links";
import { createBreadcrumbList, getGuideArticleImage, ORGANIZATION_ID, pageUrl, WEBSITE_ID } from "../../schema";

export function generateStaticParams(){return guides.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}) {
  const { slug } = await params;
  const g = guides.find((item) => item.slug === slug);
  if (!g) return {};
  const image = getGuideArticleImage(g.slug, g.title);
  return createPageMetadata({
    title: g.title,
    description: g.short,
    path: `/guides/${g.slug}`,
    alternates: languageAlternates(`/guides/${g.slug}`, "en"),
    type: "article",
    image: { url: image.url, width: image.width, height: image.height, alt: image.caption },
  });
}

export default async function GuidePage({params}) {
  const { slug } = await params;
  const g = guides.find((item) => item.slug === slug);
  const c = guideContent[slug];
  if (!g || !c) notFound();
  const relatedGuides = getCyclicRelated(guides, slug, 3);
  const articleUrl = pageUrl(`/guides/${g.slug}`);
  const image = getGuideArticleImage(g.slug, g.title);
  const imageId = `${articleUrl}#primaryimage`;
  const breadcrumb = createBreadcrumbList({
    path: `/guides/${g.slug}`,
    items: [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: g.title, path: `/guides/${g.slug}` }],
  });
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${articleUrl}#article`, headline: g.title, description: g.short, image: { "@id": imageId }, mainEntityOfPage: { "@id": `${articleUrl}#webpage` }, author: { "@type": "Organization", name: "Hacoo Pro Editorial", url: `${SITE_URL}/about/` }, publisher: { "@id": ORGANIZATION_ID }, datePublished: "2026-07-14", dateModified: "2026-07-16", inLanguage: "en" },
    { "@type": "ImageObject", "@id": imageId, url: image.url, contentUrl: image.contentUrl, width: image.width, height: image.height, caption: image.caption },
    { "@type": "WebPage", "@id": `${articleUrl}#webpage`, url: articleUrl, name: g.title, inLanguage: "en", primaryImageOfPage: { "@id": imageId }, breadcrumb: { "@id": breadcrumb["@id"] }, isPartOf: { "@id": WEBSITE_ID } },
    breadcrumb,
  ] };
  return <><StructuredData data={schema}/><article className="article"><header className="article-hero"><div className="wrap article-head"><span className="section-label">{c.kicker}</span><h1>{g.title}</h1><div className="article-meta"><span>Hacoo Pro Editorial</span><span>{g.read} read</span><span>Reviewed July 16, 2026</span></div><p>{c.intro}</p></div></header><figure className="wrap article-cover"><img src={image.path} width={image.width} height={image.height} alt={`${g.title} visual research reference`}/></figure><div className="wrap article-body"><aside><span>In this guide</span>{c.sections.map(([h])=><a href={`#${h.toLowerCase().replaceAll(" ","-")}`} key={h}>{h}</a>)}<a href="#quick-process">Quick process</a></aside><div className="article-content">{c.sections.map(([h,p])=><section id={h.toLowerCase().replaceAll(" ","-")} key={h}><h2>{h}</h2><p>{p}</p></section>)}<section id="quick-process"><h2>Quick process</h2><ol>{c.steps.map((s,i)=><li key={s}><span>{i+1}</span>{s}</li>)}</ol></section><div className="article-callout"><h2>Continue with a live category</h2><p>Use the guide as context, then confirm current information on the destination listing.</p><Link className="button primary" href="/categories/">Browse categories <Arrow/></Link></div></div></div></article><section className="soft-section"><div className="wrap"><div className="section-heading compact"><div><span className="section-label">Continue reading</span><h2>Related Hacoo guides.</h2></div><Link className="text-link large" href="/guides/">View all guides <Arrow size={17}/></Link></div><div className="guide-grid">{relatedGuides.map((item,index)=><Link href={withTrailingSlash(`/guides/${item.slug}`)} className="guide-card" key={item.slug}><span className="guide-number">0{index+1}</span><div><small>{item.read}</small><h3>{item.title}</h3><p>{item.short}</p><span className="text-link">Read guide <Arrow size={16}/></span></div></Link>)}</div></div></section></>;
}
