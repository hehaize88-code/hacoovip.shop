import assert from "node:assert/strict";
import test from "node:test";
import { onRequest } from "../functions/_middleware.js";

test("redirects www to the canonical host and preserves the request target", async () => {
  const response = await onRequest({
    request: new Request("https://www.sheet-hipobuy.net/it/shipping/?source=test"),
    next: () => new Response("asset"),
  });

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://sheet-hipobuy.net/it/shipping/?source=test");
});

test("passes canonical-host requests through to Pages assets", async () => {
  const response = await onRequest({
    request: new Request("https://sheet-hipobuy.net/it/"),
    next: () => new Response("asset", { status: 200 }),
  });

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "asset");
});
