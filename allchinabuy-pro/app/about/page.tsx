import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "About This Independent Directory",
  description: "Why AllChinaBuy Pro organizes China shopping routes and practical verification guides as an independent editorial website.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About AllChinaBuy Pro"
      title="A clearer layer between a search and a decision."
      intro="AllChinaBuy Pro is an independent editorial directory for international shoppers researching China shopping links."
    >
      <h2>Why this site exists</h2>
      <p>
        Large catalogues are useful, but a long spreadsheet or an unlabelled wall of product cards can
        make it difficult to know what to check. This website organizes a smaller set of routes around
        categories, practical questions and verifiable next steps.
      </p>

      <h2>Independent means separate</h2>
      <p>
        AllChinaBuy Pro is not the official AllChinaBuy website and is not owned, sponsored or endorsed
        by AllChinaBuy, CNFansHP or any marketplace mentioned in the editorial material. It does not
        process accounts, payments, orders, returns or shipping.
      </p>

      <h2>What readers should expect</h2>
      <ul>
        <li>Clear destination links and the date a core route was reviewed.</li>
        <li>Original explanations focused on measurements, QC evidence and parcel planning.</li>
        <li>No fabricated ratings, testimonials, prices, scarcity labels or authenticity claims.</li>
        <li>Product images matched to public item IDs, with editorial illustrations labelled separately.</li>
      </ul>

      <h2>How this relates to CNFansHP</h2>
      <p>
        CNFansHP is used as a public discovery source for catalogue titles, images and original item IDs.
        Product cards open the corresponding item through AllChinaBuy, and broad search and category buttons
        now open AllChinaBuy search results. A visitor should always read the destination domain, review its
        current terms and contact the transaction platform directly for support.
      </p>
    </InfoPage>
  );
}
