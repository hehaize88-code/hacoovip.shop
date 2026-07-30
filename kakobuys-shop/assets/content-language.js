const KB_CONTENT_LANGS = ["en", "pl", "de", "fr", "it"];

function selectedContentLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  const stored = window.localStorage?.getItem("kakobuys-language");
  return KB_CONTENT_LANGS.includes(fromUrl)
    ? fromUrl
    : (KB_CONTENT_LANGS.includes(stored) ? stored : "en");
}

const contentLanguage = selectedContentLanguage();
document.querySelectorAll("[data-content-language]").forEach((button) => {
  const language = button.dataset.contentLanguage;
  button.classList.toggle("is-active", language === contentLanguage);
  button.addEventListener("click", () => {
    window.localStorage?.setItem("kakobuys-language", language);
    const url = new URL(window.location.href);
    if (language === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", language);
    window.location.assign(`${url.pathname}${url.search}`);
  });
});

const languageSummary = document.querySelector("[data-content-language-summary]");
if (languageSummary) languageSummary.textContent = contentLanguage.toUpperCase();

document.addEventListener("click", (event) => {
  const link = event.target.closest?.("a[href]");
  if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
  const next = new URL(link.href, window.location.href);
  if (next.origin !== window.location.origin || contentLanguage === "en") return;
  event.preventDefault();
  next.searchParams.set("lang", contentLanguage);
  window.location.assign(`${next.pathname}${next.search}`);
}, true);
