"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function sendEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export default function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    sendEvent("page_view", { page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target?.closest?.("a");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      const common = {
        link_url: url.href,
        link_text: (link.textContent || "").trim().slice(0, 100),
        page_path: window.location.pathname,
      };
      if (url.hostname === "cnfanssp.com" || url.hostname === "www.cnfanssp.com") {
        const linkType = link.closest(".product-card, .related-product-card")
          ? "product"
          : link.closest(".category-card")
            ? "category"
            : "catalog";
        sendEvent("outbound_catalog_click", { ...common, link_type: linkType });
      } else if (url.origin === window.location.origin && url.pathname.startsWith("/articles/")) {
        sendEvent("article_click", common);
      }
    };
    const onSubmit = (event) => {
      const form = event.target;
      if (!form?.matches?.("form[role='search']")) return;
      const query = form.querySelector("input[type='search']")?.value || "";
      sendEvent("search", { search_term: query.slice(0, 80), page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
