import Link from "next/link";
import { Arrow } from "@/components/Icons";
import BreadcrumbData from "@/components/BreadcrumbData";
import { createPageMetadata } from "../seo";
import { articles } from "./data";
import { priorityArticles } from "./priority-articles";

export const metadata = createPageMetadata({
  title: "Hacoo Guides: Website, App, Reviews, Delivery & Orders",
  description: "Independent Hacoo guides for the website, app, product links, reviews, regional availability, payments, delivery, tracking and support evidence.",
  path: "/articles",
  alternates: { canonical: "/articles" },
});

const allArticles = [...priorityArticles, ...articles];

export default function ArticlesPage() {
  return <>
    <BreadcrumbData path="/articles" items={[{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }]}/>
    <section className="page-hero simple-hero"><div className="wrap">
      <span className="section-label">Independent Hacoo research</span>
      <h1>Verify the route.<br/><em>Keep the evidence.</em></h1>
      <p>Current, source-linked Hacoo articles covering website and app identity, product links, customer reviews, listings, delivery, orders, tracking and support.</p>
    </div></section>
    <section className="section wrap">
      <div className="section-heading compact"><div><span className="section-label">Priority buyer checks</span><h2>Start before checkout.</h2></div><p>These guides target the questions people search first and connect them to the order-stage help already published below.</p></div>
      <div className="article-index">{allArticles.map((article, index) => <Link href={`/articles/${article.slug}/`} key={article.slug}>
        <span className="article-no">{String(index + 1).padStart(2, "0")}</span>
        <div><small>{article.read} read · Checked {article.checkedLabel}</small><h2>{article.title}</h2><p>{article.excerpt}</p></div>
        <span className="article-arrow"><Arrow/></span>
      </Link>)}</div>
    </section>
  </>;
}
