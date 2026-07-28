import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = process.cwd();
const outputPath = path.join(
  repositoryRoot,
  "oopbuys-store",
  "data",
  "catalog-health.json",
);
const monitorUserAgent =
  "oopbuys.store catalog health monitor (+https://oopbuys.store/editorial-policy/)";
const inactiveAfterFailures = 2;

const products = [
  {
    id: "5974",
    name: "Classic loose-fit crew neck",
    url: "https://www.cnfanshp.com/AllProducts/5974.html",
    fallbackCny: 140,
  },
  {
    id: "5976",
    name: "Breathable pique polo",
    url: "https://www.cnfanshp.com/AllProducts/5976.html",
    fallbackCny: 215,
  },
  {
    id: "5981",
    name: "Color-block zip jacket",
    url: "https://www.cnfanshp.com/AllProducts/5981.html",
    fallbackCny: 298,
  },
  {
    id: "5983",
    name: "Washed drawstring shorts",
    url: "https://www.cnfanshp.com/AllProducts/5983.html",
    fallbackCny: 249,
  },
  {
    id: "5971",
    name: "Embroidered knit beanie set",
    url: "https://www.cnfanshp.com/AllProducts/5971.html",
    fallbackCny: 89,
  },
  {
    id: "5952",
    name: "Minimal-dial watch",
    url: "https://www.cnfanshp.com/AllProducts/5952.html",
    fallbackCny: 520,
  },
  {
    id: "5822",
    name: "Magnetic phone power bank",
    url: "https://www.cnfanshp.com/AllProducts/5822.html",
    fallbackCny: 75,
  },
  {
    id: "5850",
    name: "City Edition jersey collection",
    url: "https://www.cnfanshp.com/AllProducts/5850.html",
    fallbackCny: 88,
  },
];

const catalogRoutes = [
  ["all-products", "https://www.cnfanshp.com/AllProducts/"],
  ["shoes", "https://www.cnfanshp.com/shoes/"],
  ["hoodies", "https://www.cnfanshp.com/hoodies-sweaters/"],
  ["t-shirts", "https://www.cnfanshp.com/t-shirts/"],
  ["jackets", "https://www.cnfanshp.com/jackets/"],
  ["pants", "https://www.cnfanshp.com/pants-shorts/"],
  ["headwear", "https://www.cnfanshp.com/headwear/"],
  ["accessories", "https://www.cnfanshp.com/accessories/"],
  ["jerseys", "https://www.cnfanshp.com/Jersey/"],
  ["electronics", "https://www.cnfanshp.com/electronics/"],
  ["other", "https://www.cnfanshp.com/other-stuff/"],
  [
    "search",
    "https://www.cnfanshp.com/search.html?keywords=shoes&channelid=2&method=1",
  ],
].map(([id, url]) => ({ id, url }));

async function readPrevious() {
  try {
    return JSON.parse(await readFile(outputPath, "utf8"));
  } catch {
    return null;
  }
}

async function fetchText(url, attempts = 2) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);
    try {
      const response = await fetch(url, {
        headers: {
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "user-agent": monitorUserAgent,
        },
        redirect: "follow",
        signal: controller.signal,
      });
      const text = await response.text();
      clearTimeout(timeout);
      return {
        ok: response.ok,
        status: response.status,
        finalUrl: response.url,
        text,
      };
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 1_500));
      }
    }
  }
  return {
    ok: false,
    status: 0,
    finalUrl: url,
    text: "",
    error: lastError instanceof Error ? lastError.message : String(lastError),
  };
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .trim();
}

function parseProductPage(html) {
  const productInfo =
    html.match(
      /<div[^>]+class=["'][^"']*\bproduct-info\b[^"']*["'][^>]*>([\s\S]*?)<div[^>]+class=["'][^"']*\bproduct-actions\b/i,
    )?.[1] ?? "";
  const title = productInfo.match(
    /<h1[^>]+class=["'][^"']*\bproduct-title\b[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i,
  )?.[1];
  const amount = productInfo.match(
    /<div[^>]+class=["'][^"']*\bproduct-price\b[^"']*["'][^>]*>\s*([0-9]+(?:\.[0-9]+)?)\s*<\/div>/i,
  )?.[1];
  const parsedAmount = Number.parseFloat(amount ?? "");
  return {
    title: title ? decodeEntities(title.replace(/<[^>]+>/g, "")) : null,
    sourceAmountCny:
      Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : null,
  };
}

async function fetchExchangeRate(previous) {
  const sourceUrl =
    "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
  const response = await fetchText(sourceUrl, 3);
  const publishedAt = response.text.match(
    /<Cube\s+time=["']([^"']+)["']/i,
  )?.[1];
  const usdPerEur = Number.parseFloat(
    response.text.match(
      /<Cube\s+currency=["']USD["']\s+rate=["']([^"']+)["']/i,
    )?.[1] ?? "",
  );
  const cnyPerEur = Number.parseFloat(
    response.text.match(
      /<Cube\s+currency=["']CNY["']\s+rate=["']([^"']+)["']/i,
    )?.[1] ?? "",
  );
  const cnyPerUsd = cnyPerEur / usdPerEur;

  if (
    response.ok &&
    publishedAt &&
    Number.isFinite(usdPerEur) &&
    Number.isFinite(cnyPerEur) &&
    Number.isFinite(cnyPerUsd)
  ) {
    return {
      status: "fresh",
      base: "USD",
      quote: "CNY",
      cnyPerUsd: Number(cnyPerUsd.toFixed(4)),
      usdPerEur,
      cnyPerEur,
      source: "European Central Bank euro reference rates",
      sourceUrl:
        "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
      sourcePublishedAt: publishedAt,
      fetchedAt: new Date().toISOString(),
      calculation: "CNY per EUR divided by USD per EUR",
      notice:
        "Reference rate for informational estimates only; it is not a checkout or transaction rate.",
    };
  }

  const fallback = previous?.exchangeRate;
  if (fallback?.cnyPerUsd) {
    return {
      ...fallback,
      status: "fallback",
      fetchedAt: new Date().toISOString(),
      error: `ECB refresh failed with HTTP ${response.status || "network error"}`,
    };
  }

  throw new Error("ECB exchange-rate refresh failed and no previous rate exists.");
}

async function checkProduct(product, previousProduct, exchangeRate) {
  const checkedAt = new Date().toISOString();
  const response = await fetchText(product.url);
  const parsed = parseProductPage(response.text);
  const successful =
    response.ok &&
    Boolean(parsed.title) &&
    Number.isFinite(parsed.sourceAmountCny);
  const consecutiveFailures = successful
    ? 0
    : (previousProduct?.consecutiveFailures ?? 0) + 1;
  const sourceAmountCny =
    parsed.sourceAmountCny ??
    previousProduct?.sourceAmountCny ??
    product.fallbackCny;
  const state = successful
    ? "active"
    : consecutiveFailures >= inactiveAfterFailures
      ? "inactive"
      : "warning";

  return {
    id: product.id,
    name: parsed.title ?? previousProduct?.name ?? product.name,
    url: product.url,
    finalUrl: response.finalUrl,
    httpStatus: response.status,
    state,
    checkedAt,
    lastSuccessAt: successful
      ? checkedAt
      : (previousProduct?.lastSuccessAt ?? null),
    consecutiveFailures,
    sourceAmountCny,
    usdEstimate: Number(
      (sourceAmountCny / exchangeRate.cnyPerUsd).toFixed(2),
    ),
    validation: successful
      ? "HTTP success with product title and source price block"
      : "Product title or source price block was unavailable",
  };
}

async function checkRoute(route, previousRoute) {
  const checkedAt = new Date().toISOString();
  const response = await fetchText(route.url);
  const successful =
    response.ok &&
    response.text.length > 500 &&
    !/<title>\s*(?:404|not found)/i.test(response.text);
  const consecutiveFailures = successful
    ? 0
    : (previousRoute?.consecutiveFailures ?? 0) + 1;
  return {
    id: route.id,
    url: route.url,
    finalUrl: response.finalUrl,
    httpStatus: response.status,
    state: successful
      ? "active"
      : consecutiveFailures >= inactiveAfterFailures
        ? "inactive"
        : "warning",
    checkedAt,
    lastSuccessAt: successful
      ? checkedAt
      : (previousRoute?.lastSuccessAt ?? null),
    consecutiveFailures,
  };
}

const previous = await readPrevious();
const exchangeRate = await fetchExchangeRate(previous);
const previousProducts = new Map(
  (previous?.products ?? []).map((product) => [product.id, product]),
);
const previousRoutes = new Map(
  (previous?.catalogRoutes ?? []).map((route) => [route.id, route]),
);

const checkedProducts = await Promise.all(
  products.map((product) =>
    checkProduct(product, previousProducts.get(product.id), exchangeRate),
  ),
);
const checkedRoutes = await Promise.all(
  catalogRoutes.map((route) =>
    checkRoute(route, previousRoutes.get(route.id)),
  ),
);

const allChecks = [...checkedProducts, ...checkedRoutes];
const activeChecks = allChecks.filter((item) => item.state === "active");
const warningChecks = allChecks.filter((item) => item.state === "warning");
const inactiveChecks = allChecks.filter((item) => item.state === "inactive");

const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  monitor: {
    schedule: "Daily at 03:17 UTC",
    requestMethod: "GET",
    inactiveAfterConsecutiveFailures: inactiveAfterFailures,
    behavior:
      "The first failed check moves a listing behind healthy results. Two consecutive failed daily checks hide it until a later check succeeds.",
  },
  summary: {
    totalChecks: allChecks.length,
    active: activeChecks.length,
    warning: warningChecks.length,
    inactive: inactiveChecks.length,
    productCount: checkedProducts.length,
    activeProducts: checkedProducts.filter((item) => item.state === "active")
      .length,
  },
  exchangeRate,
  products: checkedProducts,
  catalogRoutes: checkedRoutes,
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(
  `Catalog health refreshed: ${activeChecks.length}/${allChecks.length} active, ` +
    `${warningChecks.length} warning, ${inactiveChecks.length} inactive; ` +
    `1 USD = CNY ${exchangeRate.cnyPerUsd.toFixed(4)}.`,
);
