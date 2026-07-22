import Breadcrumbs from "../../components/Breadcrumbs";
import T from "../../components/LocalizedText";
import { localizedMetadata } from "../../lib/seo";

export const metadata = localizedMetadata({ title: "Terms of Use", description: "Terms of use for FindQC Pro." }, "/terms");

export default function TermsPage() {
  return (
    <article className="shell inner-page policy-page">
      <Breadcrumbs items={[{ labelKey: "terms.title" }]} />
      <header><span className="eyebrow"><T id="policy.information" /></span><h1><T id="terms.title" /></h1><p><T id="policy.updated" /></p></header>
      <div className="policy-copy">
        <h2><T id="terms.s1Title" /></h2><p><T id="terms.s1Text" /></p>
        <h2><T id="terms.s2Title" /></h2><p><T id="terms.s2Text" /></p>
        <h2><T id="terms.s3Title" /></h2><p><T id="terms.s3Text" /></p>
        <h2><T id="terms.s4Title" /></h2><p><T id="terms.s4Text" /></p>
        <h2><T id="terms.s5Title" /></h2><p><T id="terms.s5Text" /></p>
        <h2><T id="terms.s6Title" /></h2><p><T id="terms.s6Text" /> <a href="mailto:hello@findqc.pro">hello@findqc.pro</a>.</p>
      </div>
    </article>
  );
}
