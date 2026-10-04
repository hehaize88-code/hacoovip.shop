import Link from "next/link";
import { Arrow } from "@/components/Icons";
import BreadcrumbData from "@/components/BreadcrumbData";
import { createPageMetadata } from "../seo";
import { articles } from "./data";
import { priorityArticles } from "./priority-articles";
import { comparisonArticles } from "./comparison-articles";

export const metadata = createPageMetadata({
  title: "Hacoo Spreadsheet Guides: Finds, Sizing & Buyer Checks",
  description: "Independent Hacoo articles on clothing finds, shoe and hoodie sizing, budget comparisons, product links, QC, app identity and order support.",
  path: "/articles",
  alternates: { canonical: "/articles" },
});

const allArticles = [...comparisonArticles, ...priorityArticles, ...articles];

export default function ArticlesPage() {
  return <>
    <BreadcrumbData path="/articles" items={[{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }]}/>
    <section className="page-hero simple-hero"><div className="wrap">
      <span className="section-label">Independent Hacoo research</span>
      <h1>Compare the finds.<br/><em>Keep the evidence.</em></h1>
      <p>Practical Hacoo spreadsheet research for clothing, shoes, sizing, total-cost comparisons and exact product options, alongside website, app and order guides.</p>
    </div></section>
    <section className="section wrap">
      <div className="section-heading compact"><div><span className="section-label">Priority buyer checks</span><h2>Start before checkout.</h2></div><p>Start with the new comparison guides, then use the website, app and order-stage articles when those questions become relevant.</p></div>
      <div className="article-index">{allArticles.map((article, index) => <Link href={`/articles/${article.slug}/`} key={article.slug}>
        <span className="article-no">{String(index + 1).padStart(2, "0")}</span>
        <div><small>{article.read} read · Checked {article.checkedLabel}</small><h2>{article.title}</h2><p>{article.excerpt}</p></div>
        <span className="article-arrow"><Arrow/></span>
      </Link>)}</div>
    </section>
  </>;
}
