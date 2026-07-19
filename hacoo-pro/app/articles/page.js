import Link from "next/link";
import { Arrow } from "@/components/Icons";
import BreadcrumbData from "@/components/BreadcrumbData";
import { createPageMetadata } from "../seo";
import { articles } from "./data";

export const metadata = createPageMetadata({
  title: "China Shopping Agent Research Articles",
  description: "Fact-checked English research on ACbuy, warehouse checks, parcel consolidation and China shopping-agent workflows.",
  path: "/articles",
  alternates: { canonical: "/articles" },
});

export default function ArticlesPage() {
  return <>
    <BreadcrumbData path="/articles" items={[{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }]}/>
    <section className="page-hero simple-hero">
      <div className="wrap">
        <span className="section-label">Fact-checked field research</span>
        <h1>Research first.<br/><em>Decide with context.</em></h1>
        <p>Long-form English articles that separate official platform claims from independent logistics guidance, with visible source links and review dates.</p>
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
