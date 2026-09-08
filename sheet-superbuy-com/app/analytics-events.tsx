"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters: Record<string, string | number | boolean>) => void;
};

export function AnalyticsEvents() {
  useEffect(() => {
    const track = (eventName: string, parameters: Record<string, string | number | boolean>) => {
      (window as AnalyticsWindow).gtag?.("event", eventName, parameters);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.hostname !== window.location.hostname) {
        track("outbound_click", {
          link_domain: destination.hostname,
          link_url: destination.href,
          link_text: (anchor.textContent || "").trim().slice(0, 100),
          page_path: window.location.pathname,
        });
      } else if (destination.pathname.startsWith("/articles/")) {
        track("article_click", {
          link_url: destination.href,
          link_text: (anchor.textContent || "").trim().slice(0, 100),
          page_path: window.location.pathname,
        });
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.getAttribute("role") !== "search") return;
      const query = new FormData(form).get("keywords");
      track("search_submit", {
        search_term: typeof query === "string" ? query.trim().slice(0, 100) : "",
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
