// The complete localized page is server-rendered; only language navigation needs JS.
const languageSelect = document.querySelector<HTMLSelectElement>(".language select");
languageSelect?.addEventListener("change", () => {
  const target = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${languageSelect.value === "zh-cn" ? "zh-CN" : languageSelect.value}"]`);
  if (target) window.location.assign(target.href);
});
