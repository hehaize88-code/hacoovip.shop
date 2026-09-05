import Link from "next/link";
import { Arrow } from "@/components/Icons";
import BreadcrumbData from "@/components/BreadcrumbData";
import { createPageMetadata } from "../seo";
import { articles } from "./data";

export const metadata = createPageMetadata({
  title: "Hacoo Guides: Delivery, Orders, Tracking & Support",
  description: "Practical Hacoo guides for delivery times, shipping, order issues, tracking updates, address changes and support evidence.",
  path: "/articles",
  alternates: { canonical: "/articles" },
});

export default function ArticlesPage() {
  return <>
    <BreadcrumbData path="/articles" items={[{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }]}/>
    <section className="page-hero simple-hero">
      <div className="wrap">
        <span className="section-label">Independent Hacoo help</span>
        <h1>Resolve issues.<br/><em>Keep the evidence.</em></h1>
        <p>Practical Hacoo articles for delivery, order, tracking and support questions, with clear decision steps and visible review dates.</p>
      </div>
    </section>
    <section className="section wrap">
      <div className="article-index">
        {articles.map((article, index) => <Link href={`/articles/${article.slug}/`} key={article.slug}>
          <span className="article-no">{String(index + 1).padStart(2, "0")}</span>
          <div><small>{article.read} read · Checked {article.checkedLabel}</small><h2>{article.title}</h2><p>{article.excerpt}</p></div>
          <span className="article-arrow"><Arrow/></span>
        </Link>)}
      </div>
    </section>
  </>;
}
