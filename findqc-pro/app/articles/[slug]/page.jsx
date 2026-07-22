import Link from "../../../components/LocalizedLink";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ArrowIcon, ExternalIcon } from "../../../components/Icons";
import { articles } from "../../../lib/articles";
import { getArticleUi, getLocalizedArticle } from "../../../lib/localizedArticles";
import { BUILD_LANGUAGE, languageUrl } from "../../../lib/routing";
import { localizedMetadata } from "../../../lib/seo";
import ResponsiveImage from "../../../components/ResponsiveImage";

const siteUrl = "https://findqc.pro";
const articleUi = getArticleUi(BUILD_LANGUAGE);

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getLocalizedArticle(slug, BUILD_LANGUAGE);
  if (!article) return {};

  return localizedMetadata({
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: languageUrl(`/articles/${article.slug}`),
      publishedTime: article.dateISO,
      modifiedTime: article.updatedISO || article.dateISO,
      authors: [articleUi.editorialDesk],
      images: [{ url: article.heroImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.heroImage],
    },
    robots: { index: true, follow: true },
  }, `/articles/${article.slug}`);
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
        <ResponsiveImage src={block.image} alt={block.alt} sizes="(max-width: 760px) calc(100vw - 40px), 680px" />
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
  const article = getLocalizedArticle(slug, BUILD_LANGUAGE);
  if (!article) notFound();

  const relatedArticles = article.related.map((relatedSlug) => getLocalizedArticle(relatedSlug, BUILD_LANGUAGE)).filter(Boolean);
  const articleUrl = languageUrl(`/articles/${article.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${siteUrl}${article.heroImage}`],
    datePublished: article.dateISO,
    dateModified: article.updatedISO || article.dateISO,
    inLanguage: BUILD_LANGUAGE,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    author: { "@type": "Organization", name: articleUi.editorialDesk, url: languageUrl("/editorial-policy#editorial-desk") },
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
      { "@type": "ListItem", position: 1, name: articleUi.home, item: languageUrl("/") },
      { "@type": "ListItem", position: 2, name: articleUi.journal, item: languageUrl("/articles") },
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
          <Link className="article-author-link" href="/editorial-policy#editorial-desk">{articleUi.editorialDesk} <ArrowIcon /></Link>
          <time dateTime={article.dateISO}>{article.date}</time>
          <span>{articleUi.factChecked}</span>
        </div>
      </header>

      <figure className="article-hero-figure">
        <ResponsiveImage src={article.heroImage} alt={article.heroAlt} sizes="(max-width: 1040px) calc(100vw - 40px), 980px" priority />
        <figcaption>{articleUi.heroCaption}</figcaption>
      </figure>

      <div className="long-read-layout">
        <aside>
          <strong>{articleUi.contents}</strong>
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
            <span>{articleUi.researchNotes}</span>
            <h2 id="official-sources">{articleUi.officialSources}</h2>
            <p>{articleUi.sourceIntro}</p>
            <ul>
              {article.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} <ExternalIcon /></a>
                  <span>{source.note}</span>
                </li>
              ))}
            </ul>
            <small>{articleUi.independentNote}</small>
          </section>

          <ArticleCta cta={article.cta} />
        </div>
      </div>

      <section className="related-articles" aria-labelledby="related-reading">
        <div className="section-heading compact-heading">
          <div><span className="eyebrow">{articleUi.continueResearch}</span><h2 id="related-reading">{articleUi.relatedNotes}</h2></div>
          <Link href="/articles">{articleUi.allArticles} <ArrowIcon /></Link>
        </div>
        <div className="related-article-grid">
          {relatedArticles.map((related) => (
            <Link href={`/articles/${related.slug}`} key={related.slug}>
              <span>{related.category}</span>
              <h3>{related.shortTitle}</h3>
              <p>{related.excerpt}</p>
              <b>{articleUi.readArticle} <ArrowIcon /></b>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
