"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const languageFromPath = () => {
  const match = window.location.pathname.match(/^\/(en|de|fr|es|it)(?:\/|$)/);
  return match?.[1] ?? "id";
};

const send = (name: string, parameters: Record<string, string>) => {
  window.gtag?.("event", name, parameters);
};

export function Analytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      const page_language = languageFromPath();

      if (link.closest(".language")) {
        send("language_switch", { destination_url: url.href, page_language });
        return;
      }

      if (url.hostname === "www.cnbuycha.com") {
        const product = url.pathname.match(/^\/AllProducts\/(\d+)\.html$/);
        if (product) {
          send("outbound_product_click", {
            destination_url: url.href,
            product_id: product[1],
            page_language,
          });
        } else if (url.pathname === "/AllProducts/") {
          send("browse_all_click", {
            destination_url: url.href,
            page_language,
          });
        } else {
          send("category_click", {
            category_path: url.pathname,
            destination_url: url.href,
            page_language,
          });
        }
        return;
      }

      const article = url.pathname.match(/\/articles\/([^/]+)\/$/);
      if (url.hostname === window.location.hostname && article) {
        send("article_cta_click", { article_slug: article[1], page_language });
      }
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form?.matches(".pop-search")) return;
      const query = new FormData(form).get("keywords")?.toString().trim() ?? "";
      send("search_submit", {
        search_term: query,
        page_language: languageFromPath(),
      });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
