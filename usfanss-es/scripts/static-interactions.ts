const prefixes: Record<string, string> = { es: "", en: "en", fr: "fr", de: "de", it: "it", pl: "pl", pt: "pt", zh: "zh-cn" };

const basePath = window.location.pathname.replace(/^\/(en|fr|de|it|pl|pt|zh-cn)(?=\/|$)/, "") || "/";

document.querySelectorAll<HTMLSelectElement>("select").forEach(select => {
  if (!Object.hasOwn(prefixes, select.value)) return;
  select.addEventListener("change", () => {
    const prefix = prefixes[select.value];
    const target = prefix ? `/${prefix}${basePath}`.replace(/\/{2,}/g, "/") : basePath;
    window.location.assign(`${target}${window.location.hash}`);
  });
});

const menu = document.querySelector<HTMLButtonElement>(".menu");
const nav = document.querySelector<HTMLElement>(".nav");
menu?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open") ?? false;
  menu.setAttribute("aria-expanded", String(open));
});
