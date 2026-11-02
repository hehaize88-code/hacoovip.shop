import Link from "next/link";
import { notFound } from "next/navigation";
import { articleEdition, articleSlugs, featuredSlugs } from "@/app/articles/editions";
import { editionCopy } from "@/app/articles/edition-copy";
import { SITE_URL } from "@/app/data";
import { getCopy, languageAlternates, localizePath } from "@/app/i18n";
import { createBreadcrumbList, ORGANIZATION_ID, pageUrl } from "@/app/schema";
import { createPageMetadata } from "@/app/seo";
import StructuredData from "./StructuredData";
import BreadcrumbData from "./BreadcrumbData";
import { Arrow } from "./Icons";

const policySource = { label: "Hacoo · Shipping & Delivery", url: "https://web.hacoo.app/en-US/pages/shipping-info" };
const orderSource = { label: "Hacoo · Help Center", url: "https://act.hacoo.app/act/sara/helpcenter/order1" };
const appSource = { label: "Hacoo · Google Play", url: "https://play.google.com/store/apps/details?id=com.saramart.android" };
const webSource = { label: "Hacoo", url: "https://www.hacoo.app/" };

const regions = { en: "gb", fr: "fr", es: "es", de: "de", it: "it", pt: "pt" };

function sourcesFor(slug, locale) {
  if (slug === "hacoo-on-pc-without-app") return [webSource, orderSource, { label: "Apple App Store · Mac", url: `https://apps.apple.com/${regions[locale]}/app/hacoo-discovering-inspiring/id1399907836?platform=mac` }];
  if (slug === "hacoo-jacket-size-guide") return [orderSource, { label: "Hacoo · FAQ", url: "https://act.hacoo.app/act/sara/helpcenter/home/qa3" }];
  if (/delivery|track|sales|order|refund|address|received/.test(slug)) return [policySource, orderSource];
  if (/website|pc-without|link|regional|saramart|legit/.test(slug)) return [webSource, appSource];
  return [webSource];
}

export function editionMetadata(locale, slug) {
  const a = articleEdition(locale, slug);
  if (!a) return {};
  const path = `/articles/${slug}`;
  return createPageMetadata({
    title: a.title, description: a.description, path: localizePath(path, locale), locale, type: "article",
    alternates: languageAlternates(path, locale),
    image: { url: SITE_URL + a.image.path, width: a.image.width, height: a.image.height, alt: a.title },
  });
}

export function hubMetadata(locale) {
  const copy = editionCopy[locale];
  return createPageMetadata({ title: copy.hub, description: copy.lead, path: localizePath("/articles", locale), locale, alternates: languageAlternates("/articles", locale) });
}

export function ArticleHub({ locale }) {
  const copy = editionCopy[locale];
  return <>
    <BreadcrumbData locale={locale} path="/articles" items={[{ name: copy.home, path: "/" }, { name: copy.hub, path: "/articles" }]}/>
    <section className="page-hero simple-hero"><div className="wrap"><span className="section-label">Hacoo Pro</span><h1>{copy.hub}</h1><p>{copy.lead}</p></div></section>
    <section className="section wrap"><div className="article-index">{articleSlugs.map((slug, index) => {
      const a = articleEdition(locale, slug);
      return <Link href={localizePath(`/articles/${slug}`, locale)} key={slug}><span className="article-no">{String(index + 1).padStart(2, "0")}</span><div><h2>{a.title}</h2><p>{a.description}</p></div><span className="article-arrow"><Arrow/></span></Link>;
    })}</div></section>
  </>;
}

export function ArticleEdition({ locale, slug }) {
  const a = articleEdition(locale, slug);
  if (!a?.sections) notFound();
  const copy = editionCopy[locale];
  const nav = getCopy(locale).nav;
  const path = `/articles/${slug}`;
  const url = pageUrl(path, locale);
  const imageUrl = SITE_URL + a.image.path;
  const sources = a.sources?.length ? a.sources : sourcesFor(slug, locale);
  const clusters = [
    ["hacoo-on-pc-without-app", "hacoo-product-links-not-working", "hacoo-website-app-official-links", "hacoo-saramart-app-identity", "hacoo-regional-availability-listing-differences"],
    ["hacoo-jacket-size-guide", "hacoo-hoodie-size-guide-measurements", "hacoo-shoes-spreadsheet-size-fit", "hacoo-spreadsheet-men-clothing-finds"],
    ["hacoo-budget-finds-total-cost", "hacoo-spreadsheet-compare-product-links", "hacoo-seller-listing-verification-checklist", "hacoo-customer-reviews-evidence-guide", "is-hacoo-legit-evidence-review"],
    ["hacoo-delivery-time-uk-spain-europe", "hacoo-tracking-not-updating", "hacoo-order-missing-item-split-shipment", "hacoo-preorder-backorder-support", "hacoo-marked-delivered-not-received", "hacoo-wrong-address-evidence"],
    ["hacoo-refund-instructions-checklist", "hacoo-after-sales-request-window-evidence", "hacoo-order-cancellation-billing-evidence", "hacoo-payment-order-record-checklist"],
  ];
  const group = clusters.find(list => list.includes(slug)) || featuredSlugs;
  const index = group.indexOf(slug);
  const related = [group[(index + 1) % group.length], group[(index + group.length - 1) % group.length]];
  const isJacket = /jacket|hoodie|men-clothing/.test(slug);
  const prefix = p => localizePath(p, locale);
  const words = a.sections.map(s => [s.heading, ...s.paragraphs].join(" ")).join(" ").trim().split(/\s+/).length;
  const breadcrumb = createBreadcrumbList({ locale, path, items: [{ name: copy.home, path: "/" }, { name: nav.articles, path: "/articles" }, { name: a.title, path }] });
  const graph = [
    { "@type": "Article", "@id": url + "#article", headline: a.title, description: a.description, mainEntityOfPage: url, image: { "@id": url + "#image" }, author: { "@id": ORGANIZATION_ID }, publisher: { "@id": ORGANIZATION_ID }, datePublished: a.published, dateModified: a.modified, inLanguage: locale, wordCount: words },
    { "@type": "ImageObject", "@id": url + "#image", url: imageUrl, contentUrl: imageUrl, width: a.image.width, height: a.image.height }, breadcrumb,
  ];
  return <>
    <StructuredData data={{ "@context": "https://schema.org", "@graph": graph }}/>
    <article className="research-article" data-longform-article>
      <header className="article-hero research-article-hero"><div className="wrap article-head">
        <Link className="section-label" href={prefix("/articles")}>{nav.articles}</Link><h1>{a.title}</h1>
        <div className="article-meta"><span>Hacoo Pro</span><span>{copy.revised} <time dateTime={a.modified}>{new Intl.DateTimeFormat(locale, {dateStyle:"long",timeZone:"UTC"}).format(new Date(a.modified))}</time></span></div>
        <p>{a.description}</p>
      </div></header>
      {!a.image.path.endsWith(".svg") || slug === "hacoo-on-pc-without-app" ? <figure className="wrap article-cover research-cover"><img src={a.image.path} width={a.image.width} height={a.image.height} alt="" /></figure> : null}
      <div className="wrap article-body research-article-body">
        <aside aria-label={copy.contents}><span>{copy.contents}</span>{a.sections.map((s,i) => <a key={s.heading} href={`#section-${i+1}`}>{s.heading}</a>)}</aside>
        <div className="article-content research-copy">
          {a.sections.map((s,i) => <section key={s.heading} id={`section-${i+1}`}><h2>{s.heading}</h2>{s.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}
          <section className="sources-panel"><h2>{copy.sources}</h2><ul>{sources.map(s => <li key={s.url}><a className="source-link" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul></section>
          <section className="sources-panel"><h2>{copy.related}</h2><ul>
            {related.map(s => <li key={s}><Link className="source-link" href={prefix(`/articles/${s}`)}>{articleEdition(locale,s).title}</Link></li>)}
            <li><Link className="source-link" href={prefix(isJacket ? "/categories/jackets" : "/spreadsheet")}>{isJacket ? copy.details : nav.spreadsheet}</Link></li>
            <li><Link className="source-link" href={prefix("/articles")}>{copy.hub}</Link></li>
          </ul></section>
        </div>
      </div>
    </article>
  </>;
}
