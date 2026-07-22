import Breadcrumbs from "../../components/Breadcrumbs";
import T from "../../components/LocalizedText";
import { localizedMetadata } from "../../lib/seo";

export const metadata = localizedMetadata({ title: "Privacy Policy", description: "Privacy policy for FindQC Pro." }, "/privacy");

export default function PrivacyPage() {
  return <Policy>
    <h2><T id="privacy.s1Title" /></h2><p><T id="privacy.s1Text" /></p>
    <h2><T id="privacy.s2Title" /></h2><p><T id="privacy.s2Text" /></p>
    <h2><T id="privacy.s3Title" /></h2><p><T id="privacy.s3Text" /></p>
    <h2><T id="privacy.s4Title" /></h2><p><T id="privacy.s4Text" /></p>
    <h2><T id="privacy.s5Title" /></h2><p><T id="privacy.s5Text" /> <a href="mailto:hello@findqc.pro">hello@findqc.pro</a>.</p>
  </Policy>;
}

function Policy({ children }) {
  return <article className="shell inner-page policy-page"><Breadcrumbs items={[{ labelKey: "privacy.title" }]} /><header><span className="eyebrow"><T id="policy.information" /></span><h1><T id="privacy.title" /></h1><p><T id="policy.updated" /></p></header><div className="policy-copy">{children}</div></article>;
}
