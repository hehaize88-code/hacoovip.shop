import { hydrateRoot } from "react-dom/client";
import Home from "./page";
import { ArticlePage, ArticlesPage, CategoriesPage, DiscoverPage, FaqPage, HowPage } from "./components/IndependentPages";
import { LanguageProvider } from "./components/LanguageProvider";
import { articleSlugs } from "./data";

const prefix = window.location.pathname.split("/").filter(Boolean)[0];
const initialLang = prefix === "zh-cn" ? "zh" : (["en", "fr", "de", "it", "pl", "pt"].includes(prefix) ? prefix : "es");
const normalized = window.location.pathname.replace(/^\/(en|fr|de|it|pl|pt|zh-cn)(?=\/|$)/, "").replace(/\/+$/, "") || "/";

function CurrentPage() {
  if (normalized === "/discover") return <DiscoverPage />;
  if (normalized === "/categories") return <CategoriesPage />;
  if (normalized === "/how-it-works") return <HowPage />;
  if (normalized === "/articles") return <ArticlesPage />;
  if (normalized === "/faq") return <FaqPage />;
  if (normalized.startsWith("/articles/")) {
    const slug = normalized.split("/").pop() ?? "";
    if (articleSlugs.includes(slug)) return <ArticlePage slug={slug} />;
  }
  return <Home />;
}

hydrateRoot(
  document.getElementById("root")!,
  <LanguageProvider initialLang={initialLang as import("./i18n").Lang}><CurrentPage /></LanguageProvider>,
);
