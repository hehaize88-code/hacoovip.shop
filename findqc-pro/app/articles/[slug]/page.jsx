import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ArrowIcon, ExternalIcon } from "../../../components/Icons";
import { articles, getArticle } from "../../../lib/articles";

const siteUrl = "https://findqc.pro";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${siteUrl}/articles/${article.slug}`,
      publishedTime: article.dateISO,
      modifiedTime: article.dateISO,
      authors: ["FindQC Pro Editorial Desk"],
      images: [{ url: article.heroImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.heroImage],
    },
    robots: { index: true, follow: true },
  };
}

function ContentBlock({ block }) {
  if (block.type === "p") return <p>{block.text}</p>;

  if (block.type === "callout") {
    return (
      <div className="prose-rule">
        <b>{block.title}</b>
        <span>{block.text}</span>
      </div>
    );
  }

  if (block.type === "list") {
    return (
      <div className="prose-list">
        {block.title && <h3>{block.title}</h3>}
        <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div className="prose-table-wrap">
        <table>
          <thead><tr>{block.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
          <tbody>{block.rows.map((row) => <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }

  if (block.type === "figure") {
    return (
      <figure className="prose-figure">
        <img src={block.image} alt={block.alt} loading="lazy" />
        <figcaption>{block.caption}</figcaption>
      </figure>
    );
  }

  return null;
}

function ArticleCta({ cta }) {
  const content = <>{cta.label} {cta.external ? <ExternalIcon /> : <ArrowIcon />}</>;
  return (
    <div className="end-card">
      <span>{cta.eyebrow}</span>
      <h2>{cta.title}</h2>
      {cta.external ? (
        <a href={cta.href} target="_blank" rel="noopener noreferrer">{content}</a>
      ) : (
        <Link href={cta.href}>{content}</Link>
      )}
    </div>
  );
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const relatedArticles = article.related.map(getArticle).filter(Boolean);
  const articleUrl = `${siteUrl}/articles/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${siteUrl}${article.heroImage}`],
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    author: { "@type": "Organization", name: "FindQC Pro Editorial Desk", url: `${siteUrl}/about` },
    publisher: {
      "@type": "Organization",
      name: "FindQC Pro",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/findqc-logo.png` },
    },
    keywords: article.keywords.join(", "),
    articleSection: article.category,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${siteUrl}/articles` },
      { "@type": "ListItem", position: 3, name: article.shortTitle, item: articleUrl },
    ],
  };

  return (
    <article className="shell inner-page long-read">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Breadcrumbs items={[{ labelKey: "nav.journal", href: "/articles" }, { label: article.shortTitle }]} />

      <header className="long-read-header">
        <span className="eyebrow">{article.category} · {article.readTime}</span>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <div>
          <span>FindQC Pro Editorial Desk</span>
          <time dateTime={article.dateISO}>{article.date}</time>
          <span>Fact-checked</span>
        </div>
      </header>

      <figure className="article-hero-figure">
        <img src={article.heroImage} alt={article.heroAlt} fetchPriority="high" />
        <figcaption>Editorial product image used to illustrate the inspection subject. It is not presented as a FindQC warehouse QC record.</figcaption>
      </figure>

      <div className="long-read-layout">
        <aside>
          <strong>In this article</strong>
          {article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title.replace(/^\d+\.\s*/, "")}</a>)}
        </aside>
        <div className="prose">
          {article.intro.map((paragraph, index) => <p className={index === 0 ? "lede" : undefined} key={paragraph}>{paragraph}</p>)}

          {article.sections.map((section) => (
            <section id={section.id} className="prose-section" key={section.id}>
              <h2>{section.title}</h2>
              {section.blocks.map((block, index) => <ContentBlock block={block} key={`${section.id}-${index}`} />)}
            </section>
          ))}

          <section className="article-sources" aria-labelledby="official-sources">
            <span>Research notes</span>
            <h2 id="official-sources">Official sources checked</h2>
            <p>This independent editorial guide was checked against the following FindQC-owned pages on 20 July 2026. Product features and policies can change, so verify current details at the source.</p>
            <ul>
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} <ExternalIcon /></a>
                  <span>{source.note}</span>
                </li>
              ))}
            </ul>
            <small>FindQC Pro is an independent discovery and education site. It is not FindQC and does not claim to operate FindQC's service.</small>
          </section>

          <ArticleCta cta={article.cta} />
        </div>
      </div>

      <section className="related-articles" aria-labelledby="related-reading">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow">Continue the research</span><h2 id="related-reading">Related field notes</h2></div>
          <Link href="/articles">All journal articles <ArrowIcon /></Link>
        </div>
        <div className="related-article-grid">
          {relatedArticles.map((related) => (
            <Link href={`/articles/${related.slug}`} key={related.slug}>
              <span>{related.category}</span>
              <h3>{related.shortTitle}</h3>
              <p>{related.excerpt}</p>
              <b>Read article <ArrowIcon /></b>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
