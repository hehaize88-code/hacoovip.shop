import Breadcrumbs from "../../components/Breadcrumbs";
import PageHero from "../../components/PageHero";
import SearchBox from "../../components/SearchBox";
import { ExternalIcon } from "../../components/Icons";
import T from "../../components/LocalizedText";
import { PAGE_TRANSLATIONS } from "../../lib/pageTranslations";
import { localizedMetadata } from "../../lib/seo";

export const metadata = localizedMetadata({
  title: "FindQC FAQ: Search, QC Photos, Reviews & Agent Flow",
  description: "Fact-checked answers about FindQC search methods, QC data sources, Trending, Karma, reviews, hauls, removed listings and shopping-agent limits.",
}, "/faq");

const faqGroups = [
  { titleKey: "faq.groups.official", items: [10, 11, 12, 13, 14, 15, 16, 17] },
  { titleKey: "faq.groups.site", items: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
];

const faqOrder = faqGroups.flatMap((group) => group.items);

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqOrder.map((number) => ({
      "@type": "Question",
      name: PAGE_TRANSLATIONS.en[`faq.items.${number}.question`],
      acceptedAnswer: {
        "@type": "Answer",
        text: PAGE_TRANSLATIONS.en[`faq.items.${number}.answer`],
      },
    })),
  };

  return (
    <div className="shell inner-page faq-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ labelKey: "nav.faq" }]} />
      <PageHero eyebrow={<T id="faq.eyebrow" />} title={<><T id="faq.title1" /><br /><em><T id="faq.title2" /></em></>} intro={<T id="faq.intro" />}><SearchBox compact /></PageHero>

      <section className="faq-fact-grid" aria-label="FindQC official fact summary">
        {[1, 2, 3, 4].map((number) => (
          <article key={number}>
            <span>0{number}</span>
            <small><T id={`faq.facts.${number}.label`} /></small>
            <p><T id={`faq.facts.${number}.text`} /></p>
          </article>
        ))}
      </section>

      <section className="faq-full-list" aria-label="Frequently asked questions">
        {faqGroups.map((group, groupIndex) => {
          const offset = groupIndex === 0 ? 0 : faqGroups[0].items.length;
          return (
            <div className="faq-group" key={group.titleKey}>
              <header className="faq-group-heading">
                <span>0{groupIndex + 1}</span>
                <h2><T id={group.titleKey} /></h2>
              </header>
              <div>
                {group.items.map((number, index) => {
                  const displayNumber = String(offset + index + 1).padStart(2, "0");
                  return (
                    <details key={number} open={groupIndex === 0 && index === 0}>
                      <summary><span>{displayNumber}</span><T id={`faq.items.${number}.question`} /><b>+</b></summary>
                      <p><T id={`faq.items.${number}.answer`} /></p>
                    </details>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <section className="faq-research-panel" aria-labelledby="faq-research-title">
        <div>
          <span className="eyebrow light"><T id="faq.researchEyebrow" /></span>
          <h2 id="faq-research-title"><T id="faq.researchTitle" /></h2>
          <p><T id="faq.researchIntro" /></p>
          <small><T id="faq.researchNote" /></small>
        </div>
        <div className="faq-source-links">
          <a href="https://findqc.com/terms-of-service" target="_blank" rel="noopener noreferrer"><span>01</span><b>FindQC Terms of Service</b><ExternalIcon /></a>
          <a href="https://findqc.com/privacy-policy" target="_blank" rel="noopener noreferrer"><span>02</span><b>FindQC Privacy Policy</b><ExternalIcon /></a>
          <a href="https://academy.findqc.com/2024/12/21/mastering-qc-finder-choosing-the-best-search-method/" target="_blank" rel="noopener noreferrer"><span>03</span><b>FindQC Academy: Search Methods</b><ExternalIcon /></a>
          <a href="https://findqc.com/haulsStatis" target="_blank" rel="noopener noreferrer"><span>04</span><b>FindQC Real Hauls Analytics</b><ExternalIcon /></a>
        </div>
      </section>
    </div>
  );
}
