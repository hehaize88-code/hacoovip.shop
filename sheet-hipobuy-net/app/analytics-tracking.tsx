"use client";

import { useEffect } from "react";

type GtagWindow = Window & {
  gtag?: (command: "event", eventName: string, params?: Record<string, string>) => void;
};

function analyticsParams(element: HTMLElement) {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(element.dataset)) {
    if (key.startsWith("ga") && key !== "gaEvent" && value) {
      const rawParameter = key.slice(2);
      const parameter = `${rawParameter.charAt(0).toLowerCase()}${rawParameter.slice(1)}`.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      params[parameter] = value;
    }
  }
  return params;
}

export default function AnalyticsTracking() {
  useEffect(() => {
    const send = (eventName: string, params: Record<string, string>) => {
      (window as GtagWindow).gtag?.("event", eventName, params);
    };

    const onClick = (event: MouseEvent) => {
      const origin = event.target instanceof Element ? event.target : null;
      const tracked = origin?.closest<HTMLElement>("a[data-ga-event], button[data-ga-event]");
      if (tracked?.dataset.gaEvent) {
        send(tracked.dataset.gaEvent, analyticsParams(tracked));
        return;
      }

      const link = origin?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) {
        send("outbound_click", {
          link_url: url.href,
          link_text: (link.textContent ?? "").trim().slice(0, 100),
          page_path: window.location.pathname,
        });
      }
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (!form?.dataset.gaEvent) return;
      const params = analyticsParams(form);
      const query = new FormData(form).get("keywords");
      if (typeof query === "string") params.search_term = query.trim().slice(0, 100);
      send(form.dataset.gaEvent, params);
    };

    let readSent = false;
    const onScroll = () => {
      const article = document.querySelector<HTMLElement>(".longform-article");
      if (!article || readSent) return;
      const rect = article.getBoundingClientRect();
      if (window.innerHeight - rect.top < rect.height * 0.75) return;
      readSent = true;
      send("guide_read", { page_path: window.location.pathname, reading_progress: "75_percent" });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("submit", onSubmit);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
