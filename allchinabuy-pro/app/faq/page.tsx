import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { faqs, SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about AllChinaBuy Pro ownership, search links, product images, reviews and destination shopping pages.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FaqPage() {
  return (
    <main id="main-content" className="inner-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }} />
      <section className="page-hero page-hero--plain">
        <p className="eyebrow">Straight answers</p>
        <h1>Know what this directory is — and is not.</h1>
        <p>Ownership, link behaviour and information limits, stated without small-print ambiguity.</p>
      </section>
      <section className="prose-shell faq-page-list">
        {faqs.map((item, index) => (
          <article key={item.question}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h2>{item.question}</h2><p>{item.answer}</p></div>
          </article>
        ))}
      </section>
    </main>
  );
}
