"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

export function EngagementTracking() {
  useEffect(() => {
    const send = (event: string, fields: Record<string, string | number>) => {
      (window as AnalyticsWindow).gtag?.("event", event, {
        site_language: document.documentElement.lang,
        ...fields,
      });
    };
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.hostname === "cnfanshp.com") {
        send("catalogue_click", {
          destination_path: url.pathname,
          link_type: url.pathname.startsWith("/AllProducts/") ? "product" : url.pathname === "/" ? "catalogue" : "category",
          source_article: anchor.closest("[data-article-slug]")?.getAttribute("data-article-slug") || "",
        });
      } else if (url.origin === window.location.origin && /^\/articles\/[^/]+$/.test(url.pathname)) {
        send("guide_click", { article_slug: url.pathname.split("/").pop() || "" });
      }
    };
    const onSubmit = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      const url = new URL(event.target.action, window.location.href);
      if (url.hostname === "cnfanshp.com" && url.pathname === "/search.html") {
        // Search text is intentionally excluded from custom analytics events.
        send("catalogue_search", { destination_path: url.pathname });
      }
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
