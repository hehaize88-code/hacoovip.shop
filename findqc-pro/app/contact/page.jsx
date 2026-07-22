import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import Link from "../../components/LocalizedLink";
import { ArrowIcon } from "../../components/Icons";
import T from "../../components/LocalizedText";
import { localizedMetadata } from "../../lib/seo";
import { BUILD_LANGUAGE, languageUrl } from "../../lib/routing";
import { getTrustContent } from "../../lib/trustContent";

export const metadata = localizedMetadata({ title: "Contact", description: "Contact information and correction requests for FindQC Pro." }, "/contact");

export default function ContactPage() {
  const copy = getTrustContent(BUILD_LANGUAGE).contact;
  const correctionHref = "mailto:hello@findqc.pro?subject=FindQC%20Pro%20correction%20request";
  const generalHref = "mailto:hello@findqc.pro?subject=FindQC%20Pro%20general%20question";
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: languageUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: "FindQC Pro",
      url: "https://findqc.pro",
      email: "hello@findqc.pro",
      contactPoint: { "@type": "ContactPoint", contactType: "editorial corrections", email: "hello@findqc.pro" },
    },
  };

  return (
    <div className="shell inner-page info-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }} />
      <Breadcrumbs items={[{ labelKey: "footer.contact" }]} />
      <PageHero eyebrow={<T id="contact.eyebrow" />} title={<><T id="contact.title1" /><br /><em><T id="contact.title2" /></em></>} intro={<T id="contact.intro" />} />
      <section className="contact-card"><div><span><T id="contact.general" /></span><a href="mailto:hello@findqc.pro">hello@findqc.pro</a></div><p><T id="contact.text" /></p></section>

      <section className="correction-request">
        <header className="trust-heading compact"><span className="eyebrow">{copy.correctionEyebrow}</span><h2>{copy.correctionTitle}</h2><p>{copy.correctionIntro}</p></header>
        <ol>{copy.correctionItems.map((item) => <li key={item}>{item}</li>)}</ol>
        <div className="contact-actions"><a href={correctionHref}>{copy.correctionButton} <ArrowIcon /></a><a href={generalHref}>{copy.generalButton} <ArrowIcon /></a></div>
      </section>

      <section className="contact-scope">
        <article><span>01</span><h2>{copy.helpTitle}</h2><ul>{copy.canHelp.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span>02</span><h2>{copy.cannotTitle}</h2><p>{copy.cannotText}</p></article>
      </section>

      <section className="contact-process">
        <header className="trust-heading compact"><span className="eyebrow">03</span><h2>{copy.processTitle}</h2></header>
        <div>{copy.process.map((step, index) => <article key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="contact-privacy">
        <div><span className="eyebrow light">{copy.privacyTitle}</span><p>{copy.privacyText}</p></div>
        <Link href="/editorial-policy">{copy.policyLink} <ArrowIcon /></Link>
      </section>
    </div>
  );
}
