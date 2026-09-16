import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { Arrow } from "@/components/Icons";
import { SITE_URL } from "../data";
import { createPageMetadata } from "../seo";
import { createBreadcrumbList, ORGANIZATION_ID, pageUrl, WEBSITE_ID } from "../schema";
import { getPriorityArticle, priorityArticles } from "./priority-articles";

export function buildPriorityMetadata(slug) {
  const article = getPriorityArticle(slug);
  const path = `/articles/${slug}`;
  const imageUrl = `${SITE_URL}${article.image.path}`;
  return createPageMetadata({
    title: article.seoTitle,
    description: article.description,
    path,
    alternates: { canonical: path, languages: { en: path, "x-default": path } },
    type: "article",
    image: { url: imageUrl, width: article.image.width, height: article.image.height, alt: article.image.alt },
  });
}

function SourceLink({ source }) {
  const external = source.href.startsWith("http");
  return external
    ? <a className="source-link" href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
    : <Link className="source-link" href={source.href}>{source.label}</Link>;
}

export default function PriorityArticlePage({ slug }) {
  const article = getPriorityArticle(slug);
  const path = `/articles/${slug}`;
  const url = pageUrl(path);
  const imageUrl = `${SITE_URL}${article.image.path}`;
  const imageId = `${url}#primaryimage`;
  const breadcrumb = createBreadcrumbList({ path, items: [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: article.title, path },
  ] });
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${url}#article`, headline: article.title, description: article.description, image: { "@id": imageId }, mainEntityOfPage: { "@id": `${url}#webpage` }, author: { "@type": "Organization", name: "Hacoo Pro Editorial", url: `${SITE_URL}/about/` }, publisher: { "@id": ORGANIZATION_ID }, datePublished: article.published, dateModified: article.modified, inLanguage: "en", articleSection: article.sectionLabel, keywords: article.keywords, isAccessibleForFree: true, wordCount: article.wordCount },
    { "@type": "ImageObject", "@id": imageId, url: imageUrl, contentUrl: imageUrl, width: article.image.width, height: article.image.height, caption: article.image.caption },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: article.title, description: article.description, inLanguage: "en", primaryImageOfPage: { "@id": imageId }, breadcrumb: { "@id": breadcrumb["@id"] }, isPartOf: { "@id": WEBSITE_ID } },
    breadcrumb,
  ] };

  return <>
    <StructuredData data={schema}/>
    <article className="research-article" data-longform-article>
      <header className="article-hero research-article-hero"><div className="wrap article-head">
        <span className="section-label">{article.sectionLabel}</span>
        <h1>{article.title}</h1>
        <div className="article-meta"><span>Hacoo Pro Editorial</span><span>{article.read} read</span><span>Published {article.publishedLabel}</span><span>Last checked {article.checkedLabel}</span></div>
        <p>{article.lead}</p>
      </div></header>

      <figure className="wrap article-cover research-cover">
        <img src={article.image.path} width={article.image.width} height={article.image.height} alt={article.image.alt}/>
        <figcaption>{article.image.caption} Editorial reference image; it is not proof of a listing, seller or transaction outcome.</figcaption>
      </figure>

      <div className="wrap article-body research-article-body">
        <aside aria-label="Article contents"><span>In this article</span>{article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.nav}</a>)}<a href="#checklist">Checklist</a><a href="#sources">Sources</a></aside>
        <div className="article-content research-copy">
          {article.sections.map((section, index) => <section id={section.id} key={section.id}>
            {index === 0 && <span className="section-label">Evidence-led answer</span>}
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
          </section>)}

          <section id="method">
            <h2>How this guide was checked and how to keep it current</h2>
            <p>This article uses a source-first method. We begin with Hacoo's public website, the live app-store record and the policy or shipping pages relevant to the topic. We separate statements that those pages currently publish from practical steps that a reader can perform. We do not create customer quotations, purchase outcomes, delivery promises, seller ratings or claims of authenticity. A route being reachable on the check date means only that the route worked then; it does not certify every page, product or future transaction reached through it.</p>
            <p>Before relying on the article, open the linked source and compare its current host, date, regional setting and wording with the statement you need. Give the live listing, checkout, account and carrier record priority over a general guide when they concern your exact order. Save only the evidence required for the decision, redact personal details before sending screenshots and keep passwords, one-time codes and full payment credentials out of support messages. If a source has changed, record the new wording and date instead of forcing it to match an older screenshot.</p>
            <p>Hacoo Pro is an independent editorial guide and is not operated or endorsed by Hacoo. It cannot access accounts, verify sellers internally, change orders, approve refunds or control carriers. The purpose of the workflow is to make the source, selected option, date and unresolved uncertainty visible. When an important fact cannot be reproduced from a current first-party record, leave it unresolved, ask the verified service one precise question, or pause the decision.</p>
          </section>

          <section id="checklist">
            <h2>{article.checklistTitle}</h2>
            <ol className="decision-list">{article.checklist.map((item, index) => <li key={item.title}><span>{index + 1}</span><div><strong>{item.title}</strong><p>{item.text}</p></div></li>)}</ol>
          </section>

          <section id="sources" className="sources-panel"><h2>Sources and next checks</h2><p>These links provide the current official or first-party context used for this guide, plus closely related Hacoo Pro pages. Recheck live pages because policies, app listings and product availability can change after publication.</p><ul>{article.sources.map((source) => <li key={`${source.href}-${source.label}`}><SourceLink source={source}/> — {source.note}</li>)}</ul></section>

          <section className="sources-panel"><h2>Continue the buyer verification sequence</h2><p>Each guide answers a different decision question, so use the pages that match the stage you have reached rather than transferring one conclusion to another.</p><ul>{priorityArticles.filter((item) => item.slug !== slug).map((item) => <li key={item.slug}><Link className="source-link" href={`/articles/${item.slug}/`}>{item.title}</Link> — {item.excerpt}</li>)}</ul></section>

          <div className="article-callout"><h2>{article.calloutTitle}</h2><p>{article.calloutText}</p><div className="article-callout-actions"><Link className="button light" href="/articles/">Browse all Hacoo articles <Arrow/></Link><Link className="button quiet-dark" href="/spreadsheet/">Open the spreadsheet guide</Link></div></div>
        </div>
      </div>
    </article>
  </>;
}
