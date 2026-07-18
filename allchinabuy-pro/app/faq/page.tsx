import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/content";
import {
  FAQ_REVIEWED,
  faqCategories,
  faqs,
  faqSources,
} from "@/lib/faqs";

export const metadata: Metadata = {
  title: "AllChinaBuy FAQ: Orders, QC, Packing & Shipping",
  description:
    "30 source-linked answers about AllChinaBuy checkout, warehouse inspection, detailed photos, packing, storage, shipping weight, restrictions and used items.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

const officialSources = Object.values(faqSources).filter((source) => source.official);

export default function FaqPage() {
  return (
    <main id="main-content" className="inner-page faq-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <section className="page-hero page-hero--plain faq-page__hero">
        <p className="eyebrow">Fact-checked FAQ</p>
        <h1>30 answers, tied to live sources.</h1>
        <p>
          Practical answers about checkout, QC photos, packing, storage, shipping and
          restricted goods—checked against AllChinaBuy&apos;s public English mobile pages.
        </p>
        <ul className="page-hero__facts" aria-label="FAQ research summary">
          <li>30 researched questions</li>
          <li>3 official public sources</li>
          <li>Checked {FAQ_REVIEWED}</li>
        </ul>
      </section>

      <section className="faq-research" aria-labelledby="faq-research-heading">
        <div className="faq-research__intro">
          <p className="eyebrow">Research rule</p>
          <h2 id="faq-research-heading">Public wording is evidence—not a lifetime promise.</h2>
          <p>
            We report what the public interface says and flag the parts that can change.
            Logged-in fees, routes, deadlines and order-specific notices take priority over
            this page whenever the two differ.
          </p>
        </div>
        <div className="faq-research__sources">
          {officialSources.map((source, index) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              <span>{String(index + 1).padStart(2, "0")} · Official public page</span>
              <strong>{source.title}</strong>
              <small>{source.scope}</small>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <nav className="faq-category-nav" aria-label="FAQ topics">
        {faqCategories.map((category) => (
          <a key={category.slug} href={`#${category.slug}`}>
            {category.label}
          </a>
        ))}
      </nav>

      <div className="faq-groups">
        {faqCategories.map((category, categoryIndex) => {
          const items = faqs.filter((item) => item.category === category.label);
          const startIndex = faqCategories
            .slice(0, categoryIndex)
            .reduce(
              (total, current) =>
                total + faqs.filter((item) => item.category === current.label).length,
              0,
            );

          return (
            <section className="faq-group" id={category.slug} key={category.slug}>
              <header className="faq-group__header">
                <span>{String(categoryIndex + 1).padStart(2, "0")}</span>
                <div>
                  <p className="eyebrow">{items.length} answers</p>
                  <h2>{category.label}</h2>
                  <p>{category.description}</p>
                </div>
              </header>

              <div className="faq-accordion">
                {items.map((item, itemIndex) => (
                  <details
                    id={item.id}
                    key={item.id}
                    open={categoryIndex === 0 && itemIndex === 0}
                  >
                    <summary>
                      <span className="faq-accordion__number">
                        {String(startIndex + itemIndex + 1).padStart(2, "0")}
                      </span>
                      <strong>{item.question}</strong>
                      <span className="faq-accordion__toggle" aria-hidden="true">+</span>
                    </summary>
                    <div className="faq-accordion__answer">
                      <p>{item.answer}</p>
                      <div className="faq-accordion__sources" aria-label="Sources for this answer">
                        {item.sources.map((sourceKey) => {
                          const source = faqSources[sourceKey];
                          return (
                            <a
                              key={sourceKey}
                              href={source.url}
                              target={source.official ? "_blank" : undefined}
                              rel={source.official ? "noreferrer" : undefined}
                            >
                              {source.official ? "Official source" : "Site disclosure"}: {source.title}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
