import Link from "../../components/LocalizedLink";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import { ArrowIcon } from "../../components/Icons";
import { articles } from "../../lib/articles";
import T from "../../components/LocalizedText";
import { localizedMetadata } from "../../lib/seo";

export const metadata = localizedMetadata({
  title: "FindQC Guides: Search, QC Photos & Shopping Agents",
  description: "Fact-checked English guides to FindQC search, product signals, QC photo review and the shopping-agent workflow.",
}, "/articles");

export default function ArticlesPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FindQC Pro research journal",
    numberOfItems: articles.length,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://findqc.pro/articles/${article.slug}`,
      name: article.title,
    })),
  };

  return (
    <div className="shell inner-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <Breadcrumbs items={[{ labelKey: "nav.journal" }]} />
      <PageHero eyebrow={<T id="articles.eyebrow" />} title={<><T id="articles.title1" /><br /><em><T id="articles.title2" /></em></>} intro={<T id="articles.intro" />} />
      <div className="journal-research-note">
        <span>05 in-depth guides</span>
        <p>Every article is written in English, checked against current FindQC-owned pages and linked to its official source notes. Images are clearly marked editorial examples rather than warehouse QC evidence.</p>
      </div>
      <section className="journal-grid">
        {articles.map((article, index) => (
          <Link href={`/articles/${article.slug}`} className="journal-card" key={article.slug}>
            <span>0{index + 1}</span>
            <div className="journal-card-image"><img src={article.heroImage} alt="" loading={index === 0 ? "eager" : "lazy"} /></div>
            <div className="journal-card-copy">
              <small>{article.category} · {article.readTime}</small>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
            </div>
            <b><T id="articles.read" /> <ArrowIcon /></b>
          </Link>
        ))}
      </section>
    </div>
  );
}
