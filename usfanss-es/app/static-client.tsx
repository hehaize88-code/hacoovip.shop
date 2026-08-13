import { hydrateRoot } from "react-dom/client";
import Home from "./page";
import { ArticlePage, ArticlesPage, CategoriesPage, DiscoverPage, FaqPage, HowPage } from "./components/IndependentPages";
import { LanguageProvider } from "./components/LanguageProvider";
import { articleSlugs } from "./data";

const normalized = window.location.pathname.replace(/\/+$/, "") || "/";

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
  <LanguageProvider><CurrentPage /></LanguageProvider>,
);
