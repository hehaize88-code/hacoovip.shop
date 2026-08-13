import { createRoot } from "react-dom/client";
import { SiteShell, type Lang, type PageName } from "./site-shell";
import type { ArticleSlug } from "./localized-content";

const supported: Lang[] = ["en","de","es","fr","it","pl","pt","zh-cn"];
const segments = window.location.pathname.split("/").filter(Boolean);
const candidateLanguage = segments[0] as Lang | undefined;
const initialLang: Lang = candidateLanguage && supported.includes(candidateLanguage) && candidateLanguage !== "en" ? candidateLanguage : "en";
const routeSegments = initialLang === "en" ? segments : segments.slice(1);
const normalized = `/${routeSegments.join("/")}`.replace(/\/+$/, "") || "/";
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

createRoot(document.getElementById("root")!).render(<SiteShell page={page} article={article} initialLang={initialLang} />);
