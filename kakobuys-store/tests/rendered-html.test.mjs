import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

const allowedExternalHosts = new Set(["cnfanshp.com", "www.cnfanshp.com"]);
const siteRoutes = [
  "",
  "categories",
  "qc-hub",
  "guides",
  "faq",
  "articles",
  "under-25",
  "qc-first",
  "new-this-week",
  "read-kakobuy-qc-photos",
  "kakobuy-spreadsheet-first-time-guide",
  "product-price-vs-parcel-cost",
];
const languagePrefixes = ["", "de", "fr", "es", "it", "pl", "pt", "ro"];

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("link-audit", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

function routePath(language, route) {
  return `/${[language, route].filter(Boolean).join("/")}`;
}

test("all rendered external links point only to the approved catalog", async () => {
  const worker = await loadWorker();

  for (const language of languagePrefixes) {
    for (const route of siteRoutes) {
      const path = routePath(language, route);
      const response = await worker.fetch(
        new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
        { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
        { waitUntil() {}, passThroughOnException() {} },
      );
      assert.equal(response.status, 200, `${path} should render`);

      const html = await response.text();
      const externalUrls = html.match(/https?:\\?\/\\?\/[^"'<>\s]+/g) ?? [];
      for (const rawUrl of externalUrls) {
        const normalized = rawUrl.replaceAll("\\/", "/");
        const url = new URL(normalized);
        assert.ok(
          allowedExternalHosts.has(url.hostname),
          `${path} contains an unapproved external destination: ${url.hostname}`,
        );
      }
    }
  }
});

test("the approved catalog brand name is not visible in page copy", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const visibleText = (await response.text())
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  assert.doesNotMatch(visibleText, /cnfans(?:hp)?|cnbuycha/i);
});

test("FAQ renders twelve localized questions in every language", async () => {
  const worker = await loadWorker();
  const localeMarkers = {
    "": "Why can a displayed price change?",
    de: "Warum kann sich ein angezeigter Preis ändern?",
    fr: "Pourquoi un prix affiché peut-il changer ?",
    es: "¿Por qué puede cambiar un precio mostrado?",
    it: "Perché un prezzo visualizzato può cambiare?",
    pl: "Dlaczego wyświetlana cena może się zmienić?",
    pt: "Por que um preço exibido pode mudar?",
    ro: "De ce se poate schimba un preț afișat?",
  };

  for (const [language, marker] of Object.entries(localeMarkers)) {
    const path = routePath(language, "faq");
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.equal(response.status, 200, `${path} should render`);
    assert.equal((html.match(/<details>/g) ?? []).length, 12, `${path} should contain 12 FAQs`);
    assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("article interface labels follow the selected language", async () => {
  const worker = await loadWorker();
  const expected = { de: "Kurzantwort", fr: "Réponse rapide", es: "Respuesta rápida", it: "Risposta rapida", pl: "Krótka odpowiedź", pt: "Resposta rápida", ro: "Răspuns rapid" };
  for (const [language, marker] of Object.entries(expected)) {
    const path = routePath(language, "read-kakobuy-qc-photos");
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.equal(response.status, 200, `${path} should render`);
    assert.match(html, new RegExp(marker));
  }
});
