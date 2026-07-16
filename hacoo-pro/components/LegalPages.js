import StructuredData from "./StructuredData";
import { CATALOG_REVIEW } from "@/app/data";
import { absoluteLocalizedUrl } from "@/app/i18n";
import { getLegalCopy } from "@/app/legal-copy";

function PageSchema({ locale, path, name, description }) {
  return <StructuredData data={{ "@context": "https://schema.org", "@type": "WebPage", name, description, url: `${absoluteLocalizedUrl(path, locale)}/`, inLanguage: locale, dateModified: CATALOG_REVIEW.iso }}/>;
}

export function ContactPage({ locale = "en" }) {
  const page = getLegalCopy(locale).contact;
  return <><PageSchema locale={locale} path="/contact" name={page.title} description={page.description}/><section className="page-hero simple-hero full-page" lang={locale}><div className="wrap narrow"><span className="section-label">{page.label}</span><h1>{page.heading[0]}<br/><em>{page.heading[1]}</em></h1><p>{page.intro} <a href="mailto:service@cnfanshp.com">service@cnfanshp.com</a></p><div className="contact-note"><strong>{page.important}</strong><p>{page.note}</p></div></div></section></>;
}

export function PrivacyPage({ locale = "en" }) {
  const copy = getLegalCopy(locale);
  const page = copy.privacy;
  return <><PageSchema locale={locale} path="/privacy" name={page.title} description={page.description}/><Legal locale={locale} reviewed={copy.reviewed} title={page.heading} intro={page.intro} sections={page.sections}/></>;
}

export function TermsPage({ locale = "en" }) {
  const copy = getLegalCopy(locale);
  const page = copy.terms;
  return <><PageSchema locale={locale} path="/terms" name={page.title} description={page.description}/><Legal locale={locale} reviewed={copy.reviewed} title={page.heading} intro={page.intro} sections={page.sections}/></>;
}

function Legal({ locale, reviewed, title, intro, sections }) {
  return <section className="legal wrap" lang={locale}><span className="section-label">{reviewed}</span><h1>{title}</h1><p className="legal-intro">{intro}</p>{sections.map(([heading, text]) => <div key={heading}><h2>{heading}</h2><p>{text}</p></div>)}</section>;
}
