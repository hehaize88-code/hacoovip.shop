import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description: "Terms for using the AllChinaBuy Pro independent shopping directory and its outbound research links.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms of use"
      title="Use the directory as a research starting point."
      intro="Effective July 17, 2026. These terms apply to this website, not to transactions on a destination platform."
    >
      <h2>Informational use</h2>
      <p>
        AllChinaBuy Pro provides category routes, research entries and general educational material. You
        remain responsible for confirming current product, seller, shipping, legal and destination details
        before acting on the information.
      </p>

      <h2>Third-party websites</h2>
      <p>
        Outbound links are provided for convenience and context. A link does not transfer ownership or
        control to AllChinaBuy Pro and does not guarantee a destination&apos;s availability, security, claims
        or performance. The destination&apos;s own terms govern your use of that service.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not attempt to disrupt the website, bypass security, submit malicious material, misrepresent an
        affiliation with this directory or use its original editorial work in a way that violates
        applicable rights. Normal linking and brief attributed quotation remain welcome.
      </p>

      <h2>No transaction warranty</h2>
      <p>
        To the extent permitted by applicable law, the directory is provided for general information
        without a promise that a route or explanation will remain complete, current or suitable for a
        particular purchase. Nothing here excludes rights that cannot lawfully be excluded.
      </p>

      <h2>Updates</h2>
      <p>
        These terms may be revised when site features or legal requirements change. A revised effective
        date will appear at the top of the page. Material changes should be reviewed before public release.
      </p>
    </InfoPage>
  );
}
