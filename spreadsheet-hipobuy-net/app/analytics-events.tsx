"use client";

import { useEffect } from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

export function AnalyticsEvents() {
  useEffect(() => {
    function track(name:string, parameters:Record<string,string>) {
      window.gtag?.("event", name, {page_language:document.documentElement.lang,source_path:window.location.pathname,...parameters});
    }
    function onClick(event:MouseEvent) {
      const anchor=(event.target as Element | null)?.closest("a");
      if (!anchor) return;
      const url=new URL(anchor.href, window.location.href);
      if (["cnfanshp.com","www.cnfanshp.com"].includes(url.hostname)) {
        const match=url.pathname.match(/^\/AllProducts\/(\d+)\.html$/i);
        const name=match?"outbound_product_click":url.pathname==="/search.html"?"outbound_search_click":url.pathname==="/"?"outbound_catalog_click":"outbound_category_click";
        track(name,{link_url:url.href,link_text:(anchor.textContent||"").trim().slice(0,100),...(match?{product_id:match[1]}:{})});
      }
      if (url.origin === window.location.origin && /\/articles\/.+/.test(url.pathname)) track("article_click", { link_url:url.href, link_text:(anchor.textContent||"").trim().slice(0,100) });
    }
    function onSubmit(event:SubmitEvent) {
      const form=event.target as HTMLFormElement | null;
      if (form?.classList.contains("hero-search")) {
        const query=String(new FormData(form).get("keywords")||"").trim();
        track("site_search", { search_term:query });
      }
    }
    document.addEventListener("click",onClick);
    document.addEventListener("submit",onSubmit);
    return ()=>{ document.removeEventListener("click",onClick); document.removeEventListener("submit",onSubmit); };
  },[]);
  return null;
}
