import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("does not render development preview metadata", async () => {
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
  assert.doesNotMatch(await response.text(), developmentPreviewMeta);
});

const allowedExternalHosts = new Set(["cnfanshp.com", "www.cnfanshp.com"]);
const articleRoutes = [
  "read-kakobuy-qc-photos",
  "kakobuy-spreadsheet-first-time-guide",
  "product-price-vs-parcel-cost",
];
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
  ...articleRoutes,
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
      const linkMarkup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
      const externalUrls = linkMarkup.match(/https?:\\?\/\\?\/[^"'<>\s]+/g) ?? [];
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

test("FAQ renders thirteen localized questions, related guides and FAQPage data", async () => {
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
    assert.equal((html.match(/<details>/g) ?? []).length, 13, `${path} should contain 13 FAQs`);
    assert.equal((html.match(/class="faq-answer"/g) ?? []).length, 13, `${path} should link every answer to a related guide`);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("English article center includes the warehouse and returns guides", async () => {
  const worker = await loadWorker();
  const center = await worker.fetch(
    new Request("http://localhost/articles", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const centerHtml = await center.text();
  assert.equal((centerHtml.match(/<article>/g) ?? []).length, 5);
  assert.match(centerHtml, /Kakobuy Warehouse Storage Guide/);
  assert.match(centerHtml, /Kakobuy Returns and After-Sales Checklist/);

  const article = await worker.fetch(
    new Request("http://localhost/kakobuy-warehouse-storage-guide", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const articleHtml = await article.text();
  const visibleWords = articleHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  assert.equal(article.status, 200);
  assert.ok(visibleWords >= 1200 && visibleWords <= 1800, `article should contain 1200–1800 visible words, found ${visibleWords}`);

  const returns = await worker.fetch(
    new Request("http://localhost/kakobuy-returns-after-sales-checklist", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const returnsHtml = await returns.text();
  const returnsArticle = returnsHtml.match(/<article class="article-page">[\s\S]*?<\/article>/)?.[0] ?? "";
  const returnsWords = returnsArticle
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  assert.equal(returns.status, 200);
  assert.ok(returnsWords >= 1200 && returnsWords <= 1800, `returns article should contain 1200–1800 visible words, found ${returnsWords}`);
  assert.match(returnsHtml, /"@type":"Article"/);
  assert.match(returnsHtml, /"@type":"BreadcrumbList"/);
  assert.match(returnsHtml, /<link rel="canonical" href="https:\/\/kakobuys\.store\/kakobuy-returns-after-sales-checklist\/"/);
  assert.doesNotMatch(returnsHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " "), /https?:\/\/(?!www\.cnfanshp\.com|cnfanshp\.com|kakobuys\.store)[^"'<\s]+/);
});

test("expanded Finds page contains thirty unique records and every detail page", async () => {
  const worker = await loadWorker();
  const center = await worker.fetch(
    new Request("http://localhost/finds", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const centerHtml = await center.text();
  const routes = [...centerHtml.matchAll(/href="\/(find-\d+)"/g)].map((match) => match[1]);
  assert.equal(new Set(routes).size, 30);
  for (const route of new Set(routes)) {
    const response = await worker.fetch(
      new Request(`http://localhost/${route}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await response.text();
    assert.equal(response.status, 200, `${route} should render`);
    assert.match(html, /Last checked/);
    assert.match(html, /Open matching product/);
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

test("all three article bodies follow the selected language", async () => {
  const worker = await loadWorker();
  const languages = ["de", "fr", "es", "it", "pl", "pt", "ro"];
  const englishBodyMarkers = [
    "A warehouse photo is not a guarantee that an item is perfect.",
    "A Kakobuy spreadsheet can shorten product discovery, but it should never replace verification.",
    "The number on a product card is useful for comparing items, but it is not a delivered-price quote.",
  ];
  const expectedStructure = [
    { sections: 7, paragraphs: 14, bullets: 10 },
    { sections: 9, paragraphs: 18, bullets: 8 },
    { sections: 9, paragraphs: 18, bullets: 18 },
  ];

  for (const language of languages) {
    for (const [index, route] of articleRoutes.entries()) {
      const path = routePath(language, route);
      const response = await worker.fetch(
        new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
        { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
        { waitUntil() {}, passThroughOnException() {} },
      );
      const html = await response.text();
      assert.equal(response.status, 200, `${path} should render`);
      assert.doesNotMatch(html, new RegExp(englishBodyMarkers[index].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${path} should not render the English introduction`);
      assert.equal((html.match(/<section>/g) ?? []).length, expectedStructure[index].sections, `${path} should preserve every article section`);
      const articleSections = html.match(/<section>[\s\S]*?<\/section>/g) ?? [];
      const paragraphCount = articleSections.reduce((total, section) => total + (section.match(/<p>/g) ?? []).length, 0);
      assert.equal(paragraphCount, expectedStructure[index].paragraphs, `${path} should preserve every article paragraph`);
      assert.equal((html.match(/<li>/g) ?? []).length, expectedStructure[index].bullets, `${path} should preserve every checklist item`);
    }
  }
});

test("production page routing returns real 404s for false article paths", async () => {
  globalThis.HTMLRewriter = class {
    on() { return this; }
    transform(response) { return response; }
  };
  const pagesWorkerUrl = new URL("../_worker.js", import.meta.url);
  pagesWorkerUrl.searchParams.set("routing", `${process.pid}-${Date.now()}`);
  const pagesWorker = (await import(pagesWorkerUrl.href)).default;
  const validAssets = new Set(["/kakobuy-warehouse-storage-guide/", "/kakobuy-returns-after-sales-checklist/", "/finds/", "/find-5756/"]);
  const env = { ASSETS: { fetch: async (request) => {
    const path = new URL(request.url).pathname;
    return validAssets.has(path)
      ? new Response("<!doctype html><html><head></head><body>valid</body></html>", { status: 200, headers: { "content-type": "text/html" } })
      : new Response("<!doctype html><title>Page Not Found</title>", { status: 404, headers: { "content-type": "text/html" } });
  } } };

  for (const path of ["/articles/how-to-read-kakobuy-qc-photos/", "/not-real-92731/", "/de/kakobuy-warehouse-storage-guide/"]) {
    const response = await pagesWorker.fetch(new Request(`https://kakobuys.store${path}`), env);
    assert.equal(response.status, 404, `${path} must return a real 404`);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, follow");
  }
  for (const path of validAssets) {
    const response = await pagesWorker.fetch(new Request(`https://kakobuys.store${path}`), env);
    assert.equal(response.status, 200, `${path} should be a recognized page`);
  }
  const canonicalRedirect = await pagesWorker.fetch(new Request("https://kakobuys.store/finds"), env);
  assert.equal(canonicalRedirect.status, 301);
  assert.equal(canonicalRedirect.headers.get("location"), "https://kakobuys.store/finds/");
});
