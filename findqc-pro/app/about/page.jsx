import Link from "../../components/LocalizedLink";
import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import { ArrowIcon, ExternalIcon } from "../../components/Icons";
import T from "../../components/LocalizedText";
import { localizedMetadata } from "../../lib/seo";
import { BUILD_LANGUAGE, languageUrl } from "../../lib/routing";
import { getTrustContent } from "../../lib/trustContent";

export const metadata = localizedMetadata({ title: "About", description: "About FindQC Pro, an independent product-discovery and QC education website." }, "/about");

export default function AboutPage() {
  const copy = getTrustContent(BUILD_LANGUAGE).about;
  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: languageUrl("/about"),
    name: "About FindQC Pro",
    mainEntity: {
      "@type": "Organization",
      name: "FindQC Pro",
      url: "https://findqc.pro",
      email: "hello@findqc.pro",
      logo: "https://findqc.pro/findqc-logo.png",
      description: "Independent product discovery, source verification and visual QC education.",
      publishingPrinciples: languageUrl("/editorial-policy"),
    },
  };

  return (
    <div className="shell inner-page info-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />
      <Breadcrumbs items={[{ labelKey: "footer.about" }]} />
      <PageHero eyebrow={<T id="about.eyebrow" />} title={<><T id="about.title1" /><br /><em><T id="about.title2" /></em></>} intro={<T id="about.intro" />} />
      <section className="info-grid">
        <div><span>01</span><h2><T id="about.discoveryTitle" /></h2><p><T id="about.discoveryText" /></p></div>
        <div><span>02</span><h2><T id="about.educationTitle" /></h2><p><T id="about.educationText" /></p></div>
        <div><span>03</span><h2><T id="about.boundariesTitle" /></h2><p><T id="about.boundariesText" /></p></div>
      </section>

      <section className="trust-profile" id="editorial-desk">
        <header className="trust-heading">
          <span className="eyebrow">{copy.deskEyebrow}</span>
          <h2>{copy.deskTitle}</h2>
          <p>{copy.deskIntro}</p>
        </header>
        <dl className="trust-facts">
          {copy.deskFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
        </dl>
      </section>

      <section className="trust-method">
        <header className="trust-heading compact">
          <span className="eyebrow">{copy.methodEyebrow}</span>
          <h2>{copy.methodTitle}</h2>
          <p>{copy.methodIntro}</p>
        </header>
        <div className="trust-method-grid">
          {copy.methods.map((method, index) => (
            <article key={method.title}><span>0{index + 1}</span><h3>{method.title}</h3><p>{method.text}</p></article>
          ))}
        </div>
      </section>

      <section className="trust-disclosure">
        <div><span className="eyebrow light">{copy.disclosureEyebrow}</span><h2>{copy.disclosureTitle}</h2></div>
        <div><p>{copy.disclosureText}</p><small>{copy.disclosureNote}</small></div>
      </section>

      <section className="trust-updates">
        <header className="trust-heading compact"><span className="eyebrow">{copy.updatesEyebrow}</span><h2>{copy.updatesTitle}</h2></header>
        <div className="trust-timeline">
          {copy.updates.map((update) => <article key={`${update.date}-${update.title}`}><time>{update.date}</time><h3>{update.title}</h3><p>{update.text}</p></article>)}
        </div>
      </section>

      <section className="trust-sources">
        <header className="trust-heading compact"><span className="eyebrow">{copy.sourcesEyebrow}</span><h2>{copy.sourcesTitle}</h2><p>{copy.sourcesIntro}</p></header>
        <div className="trust-source-grid">
          {copy.sources.map((source, index) => (
            <a href={source.href} target="_blank" rel="noopener noreferrer" key={source.href}>
              <span>0{index + 1}</span><div><h3>{source.title}</h3><p>{source.note}</p></div><ExternalIcon />
            </a>
          ))}
        </div>
      </section>

      <section className="plain-content trust-actions">
        <h2><T id="about.independentTitle" /></h2>
        <p><T id="about.independentText" /></p>
        <div>
          <Link href="/editorial-policy">{copy.policyLink} <ArrowIcon /></Link>
          <Link href="/contact">{copy.correctionLink} <ArrowIcon /></Link>
        </div>
      </section>
    </div>
  );
}
