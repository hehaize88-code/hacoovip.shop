import { hydrateRoot } from "react-dom/client";
import { SiteShell, type PageName } from "./site-shell";
import type { ArticleSlug } from "./localized-content";

const normalized = window.location.pathname.replace(/\/+$/, "") || "/";
const articles: ArticleSlug[] = [
  "how-to-use-usfans",
  "usfans-qc-photos-guide",
  "usfans-review-2026",
];

let page: PageName = "home";
let article: ArticleSlug | undefined;

if (normalized === "/categories") page = "categories";
else if (normalized === "/finds") page = "finds";
else if (normalized === "/articles") page = "articles";
else if (normalized === "/faq") page = "faq";
else if (normalized === "/qc-guide") page = "qc";
else if (normalized === "/shipping") page = "shipping";
else if (normalized.startsWith("/articles/")) {
  const candidate = normalized.split("/").pop() as ArticleSlug;
  if (articles.includes(candidate)) {
    page = "article";
    article = candidate;
  }
}

hydrateRoot(document.getElementById("root")!, <SiteShell page={page} article={article} />);
