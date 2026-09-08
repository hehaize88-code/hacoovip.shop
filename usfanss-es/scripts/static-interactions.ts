const prefixes: Record<string, string> = { es: "", en: "en", fr: "fr", de: "de", it: "it", pl: "pl", pt: "pt", zh: "zh-cn" };
const spanishOnlyArticles = new Set(["que-es-usfans-como-funciona", "usfans-ropa-guia", "usfans-opiniones-fiabilidad", "usfans-canarias-envios", "spanish-line-packet-usfans", "usfans-tiempos-envio-tracking", "usfans-devoluciones-almacen"]);

const basePath = window.location.pathname.replace(/^\/(en|fr|de|it|pl|pt|zh-cn)(?=\/|$)/, "") || "/";

document.querySelectorAll<HTMLSelectElement>("select").forEach(select => {
  if (!Object.hasOwn(prefixes, select.value)) return;
  select.addEventListener("change", () => {
    const prefix = prefixes[select.value];
    const slug = basePath.match(/^\/articles\/([^/]+)\/$/)?.[1];
    const safeBasePath = prefix && slug && spanishOnlyArticles.has(slug) ? "/articles/" : basePath;
    const target = prefix ? `/${prefix}${safeBasePath}`.replace(/\/{2,}/g, "/") : safeBasePath;
    window.location.assign(`${target}${window.location.hash}`);
  });
});

const menu = document.querySelector<HTMLButtonElement>(".menu");
const nav = document.querySelector<HTMLElement>(".nav");
menu?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") ?? false;
  menu.setAttribute("aria-expanded", String(open));
});

const track = (name: string, params: Record<string, string>) => {
  const gtag = (window as typeof window & { gtag?: (event: string, name: string, params: Record<string, string>) => void }).gtag;
  gtag?.("event", name, params);
};

document.querySelectorAll<HTMLAnchorElement>('a[href^="https://cnfanshp.com"]').forEach(link => {
  link.addEventListener("click", () => track("catalog_click", {
    link_url: link.href,
    link_text: link.textContent?.trim().slice(0, 100) || "catalog",
    page_path: window.location.pathname,
  }));
});

const searchForm = document.querySelector<HTMLFormElement>(".hero-search");
searchForm?.addEventListener("submit", () => {
  const term = new FormData(searchForm).get("keywords")?.toString().trim() || "";
  track("catalog_search", { search_term: term, page_path: window.location.pathname });
});
