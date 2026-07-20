import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { buildPageMetadata, socialCard } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Independent Website Disclaimer",
  description: "Independence, trademark, product-information and cross-border shopping disclaimers for AllChinaBuy Pro.",
  path: "/disclaimer",
  image: socialCard("disclaimer", "AllChinaBuy Pro independent website disclaimer"),
});

export default function DisclaimerPage() {
  return (
    <InfoPage
      eyebrow="Important disclosure"
      title="Independent, informational and separate from every transaction."
      intro="Last reviewed July 18, 2026. Read this page before relying on a directory entry or outbound link."
    >
      <h2>No official affiliation</h2>
      <p>
        AllChinaBuy Pro is an independent editorial directory. It is not owned, operated, sponsored or
        endorsed by AllChinaBuy or the marketplaces and brands that may be referenced for
        identification. Third-party names and marks belong to their respective owners.
      </p>

      <h2>No product sale or fulfilment</h2>
      <p>
        This site does not sell, inspect, authenticate, store, ship or insure products. Any transaction
        happens on a destination website under that website&apos;s current terms. Questions about an order
        must be directed to the party that processed it.
      </p>

      <h2>Information can change</h2>
      <p>
        Route checks are dated, but destination content can change without notice. Prices, exchange rates,
        availability, seller details, product options, shipping lines, restrictions, taxes and policies
        must be confirmed on the current destination and relevant official sources.
      </p>

      <h2>How images are used</h2>
      <p>
        Product cards reproduce the first image attached to the cited public source listing and pair it
        with that listing&apos;s item ID. Category artwork and some editorial figures remain original
        illustrations. Neither type of image establishes quality, origin, authenticity, certification,
        performance or current availability.
      </p>

      <h2>Cross-border decisions involve risk</h2>
      <p>
        Import requirements, duties, consumer remedies and restricted goods differ by destination and can
        change. Editorial guidance is general information, not legal, customs, tax or financial advice.
        Consult current official sources when those questions affect a purchase.
      </p>
    </InfoPage>
  );
}
