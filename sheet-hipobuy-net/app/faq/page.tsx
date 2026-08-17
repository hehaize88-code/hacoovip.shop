import SitePage from "../site-page";
import { pageMetadata } from "../seo";
import { copies } from "../site-data";

export const metadata = pageMetadata("en", "faq");

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copies.en.faqItems.map((item) => ({
      "@type": "Question",
      name: item[0],
      acceptedAnswer: { "@type": "Answer", text: item[1] },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SitePage lang="en" page="faq" />
    </>
  );
}
