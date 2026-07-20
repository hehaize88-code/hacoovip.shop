import Breadcrumbs from "../../../components/Breadcrumbs";
import PageHero from "../../../components/PageHero";
import SearchBox from "../../../components/SearchBox";
import T from "../../../components/LocalizedText";

export const metadata = {
  title: "How to Buy More Carefully",
  description: "A six-step workflow for finding, verifying and reviewing a product listing before international shipping.",
  alternates: { canonical: "/guides/how-to-buy" },
};

export default function HowToBuyPage() {
  return (
    <article className="shell inner-page guide-article">
      <Breadcrumbs items={[{ labelKey: "nav.guides", href: "/guides" }, { labelKey: "howBuy.crumb" }]} />
      <PageHero eyebrow={<T id="howBuy.eyebrow" />} title={<><T id="howBuy.title1" /><br /><em><T id="howBuy.title2" /></em></>} intro={<T id="howBuy.intro" />} ><SearchBox compact /></PageHero>
      <section className="buy-steps">
        {[1, 2, 3, 4, 5, 6].map((number, index) => <div key={number}><span>0{index + 1}</span><h2><T id={`howBuy.steps.${number}.title`} /></h2><p><T id={`howBuy.steps.${number}.text`} /></p></div>)}
      </section>
      <div className="article-callout wide"><strong><T id="howBuy.calloutTitle" /></strong><p><T id="howBuy.calloutText" /></p></div>
    </article>
  );
}
