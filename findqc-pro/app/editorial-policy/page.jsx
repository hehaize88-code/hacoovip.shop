import Link from "../../components/LocalizedLink";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import { ArrowIcon, ExternalIcon } from "../../components/Icons";
import { BUILD_LANGUAGE, languageUrl } from "../../lib/routing";
import { localizedMetadata } from "../../lib/seo";
import { getTrustContent } from "../../lib/trustContent";

const copy = getTrustContent(BUILD_LANGUAGE).editorial;

export const metadata = localizedMetadata({ title: copy.metaTitle, description: copy.metaDescription }, "/editorial-policy");

export default function EditorialPolicyPage() {
  const policyLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.metaTitle,
    description: copy.metaDescription,
    url: languageUrl("/editorial-policy"),
    dateModified: "2026-07-22",
    author: { "@type": "Organization", name: "FindQC Pro Editorial Desk", url: languageUrl("/about#editorial-desk") },
    publisher: { "@type": "Organization", name: "FindQC Pro", url: "https://findqc.pro", logo: "https://findqc.pro/findqc-logo.png" },
  };

  return (
    <div className="shell inner-page editorial-policy-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(policyLd) }} />
      <Breadcrumbs items={[{ label: copy.metaTitle }]} />
      <PageHero eyebrow={copy.eyebrow} title={<>{copy.title1}<br /><em>{copy.title2}</em></>} intro={copy.intro} />
      <p className="policy-reviewed">{copy.reviewed}</p>

      <section className="editorial-identity" id="editorial-desk">
        <span className="eyebrow">01 / {copy.identityTitle}</span><h2>{copy.identityTitle}</h2><p>{copy.identityText}</p><small>{copy.identityNote}</small>
      </section>

      <section className="editorial-principles">
        <header className="trust-heading compact"><span className="eyebrow">02</span><h2>{copy.principlesTitle}</h2></header>
        <div>{copy.principles.map((principle, index) => <article key={principle.title}><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div>
      </section>

      <section className="editorial-hierarchy">
        <header className="trust-heading compact"><span className="eyebrow">03</span><h2>{copy.hierarchyTitle}</h2><p>{copy.hierarchyIntro}</p></header>
        <div>{copy.hierarchy.map((tier) => <article key={tier.rank}><span>{tier.rank}</span><h3>{tier.title}</h3><p>{tier.text}</p></article>)}</div>
      </section>

      <section className="editorial-workflow">
        <header><span className="eyebrow light">04</span><h2>{copy.workflowTitle}</h2></header>
        <ol>{copy.workflow.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="editorial-split">
        <article><span className="eyebrow">05</span><h2>{copy.catalogTitle}</h2><ul>{copy.catalogItems.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span className="eyebrow">06</span><h2>{copy.correctionsTitle}</h2><p>{copy.correctionsText}</p><a href="mailto:hello@findqc.pro?subject=FindQC%20Pro%20correction%20request">{copy.correctionsLink} <ArrowIcon /></a></article>
      </section>

      <section className="editorial-transparency"><span className="eyebrow light">07</span><h2>{copy.transparencyTitle}</h2><p>{copy.transparencyText}</p></section>

      <section className="trust-sources editorial-references">
        <header className="trust-heading compact"><span className="eyebrow">08</span><h2>{copy.referencesTitle}</h2><p>{copy.referencesIntro}</p></header>
        <div className="trust-source-grid">
          {copy.references.map((source, index) => <a href={source.href} target="_blank" rel="noopener noreferrer" key={source.href}><span>0{index + 1}</span><div><h3>{source.title}</h3><p>{source.note}</p></div><ExternalIcon /></a>)}
        </div>
      </section>

      <div className="editorial-end-links"><Link href="/about">FindQC Pro <ArrowIcon /></Link><Link href="/contact">hello@findqc.pro <ArrowIcon /></Link></div>
    </div>
  );
}
