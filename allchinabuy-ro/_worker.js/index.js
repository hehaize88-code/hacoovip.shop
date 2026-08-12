globalThis.__VINEXT_LAZY_CHUNKS__ = ["assets/query-BbOc3VB2.js","assets/layout-segment-context-x8yh0QyV.js","assets/link-BvwKYxX5.js","assets/router-DRbwv1Bi.js"];
import * as __viteRscAsyncHooks from "node:async_hooks";
import { AsyncLocalStorage as AsyncLocalStorage$1 } from "node:async_hooks";
import assetsManifest from "./__vite_rsc_assets_manifest.js";
import "node:fs";
import "node:path";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/vinext/dist/server/http-error-responses.js
/**
* Build a 400 Bad Request plain-text response.
*
* Used for malformed percent-encoding, invalid HTTP methods (where Next.js
* returns 400), and other request-shape validation failures.
*/
function badRequestResponse(init) {
	return new Response("Bad Request", {
		status: 400,
		headers: init?.headers
	});
}
/**
* Build a 403 Forbidden plain-text response.
*
* Used by CSRF origin validation and dev-server origin checks.
*/
function forbiddenResponse() {
	return new Response("Forbidden", {
		status: 403,
		headers: { "Content-Type": "text/plain" }
	});
}
/**
* Build a 404 Not Found plain-text response.
*
* The `headers` option lets call sites merge middleware response headers into
* the 404, matching the pattern used by `app-rsc-handler` after a route match
* fails but middleware has already contributed headers.
*/
function notFoundResponse(init) {
	return new Response("Not Found", {
		status: 404,
		headers: init?.headers
	});
}
/**
* Build a 405 Method Not Allowed plain-text response with the `Allow` header set.
*
* `allowedMethods` is rendered as the comma-separated `Allow` header value.
* Existing headers (e.g. middleware response headers) can be merged via `init.headers`;
* the `Allow` header takes precedence and overwrites any colliding entry.
*/
function methodNotAllowedResponse(allowedMethods, init) {
	const headers = new Headers(init?.headers);
	headers.set("Allow", allowedMethods);
	return new Response("Method Not Allowed", {
		status: 405,
		headers
	});
}
/**
* Build a 413 Payload Too Large plain-text response.
*
* Used by server action body-size enforcement.
*/
function payloadTooLargeResponse() {
	return new Response("Payload Too Large", { status: 413 });
}
/**
* Build a 500 Internal Server Error plain-text response.
*
* The `message` argument lets dev-mode handlers surface failure details while
* production paths fall back to the canonical body. Pass `undefined` (or omit)
* to use the canonical "Internal Server Error" body.
*/
function internalServerErrorResponse(message, init) {
	return new Response(message ?? "Internal Server Error", {
		status: 500,
		headers: init?.headers
	});
}
//#endregion
//#region node_modules/vinext/dist/server/image-optimization.js
/**
* Next.js default device sizes and image sizes.
* These are the allowed widths for image optimization when no custom
* config is provided. Matches Next.js defaults exactly.
*/
var DEFAULT_DEVICE_SIZES = [
	640,
	750,
	828,
	1080,
	1200,
	1920,
	2048,
	3840
];
var DEFAULT_IMAGE_SIZES = [
	16,
	32,
	48,
	64,
	96,
	128,
	256,
	384
];
/**
* Absolute maximum image width. Even if custom deviceSizes/imageSizes are
* configured, widths above this are always rejected. This prevents resource
* exhaustion from absurdly large resize requests.
*/
var ABSOLUTE_MAX_WIDTH = 3840;
/**
* Parse and validate image optimization query parameters.
* Returns null if the request is malformed.
*
* When `allowedWidths` is provided, the width must be 0 (no resize) or
* exactly match one of the allowed values. This matches Next.js behavior
* where only configured deviceSizes and imageSizes are accepted.
*
* When `allowedWidths` is not provided, any width from 0 to ABSOLUTE_MAX_WIDTH
* is accepted (backwards-compatible fallback).
*/
function parseImageParams(url, allowedWidths) {
	const imageUrl = url.searchParams.get("url");
	if (!imageUrl) return null;
	const w = parseInt(url.searchParams.get("w") || "0", 10);
	const q = parseInt(url.searchParams.get("q") || "75", 10);
	if (Number.isNaN(w) || w < 0) return null;
	if (w > ABSOLUTE_MAX_WIDTH) return null;
	if (allowedWidths && w !== 0 && !allowedWidths.includes(w)) return null;
	if (Number.isNaN(q) || q < 1 || q > 100) return null;
	const normalizedUrl = imageUrl.replaceAll("\\", "/");
	if (!normalizedUrl.startsWith("/") || normalizedUrl.startsWith("//")) return null;
	try {
		const base = "https://localhost";
		if (new URL(normalizedUrl, base).origin !== base) return null;
	} catch {
		return null;
	}
	return {
		imageUrl: normalizedUrl,
		width: w,
		quality: q
	};
}
/**
* Negotiate the best output format based on the Accept header.
* Returns an IANA media type.
*/
function negotiateImageFormat(acceptHeader) {
	if (!acceptHeader) return "image/jpeg";
	if (acceptHeader.includes("image/avif")) return "image/avif";
	if (acceptHeader.includes("image/webp")) return "image/webp";
	return "image/jpeg";
}
/**
* Standard Cache-Control header for optimized images.
* Optimized images are immutable because the URL encodes the transform params.
*/
var IMAGE_CACHE_CONTROL = "public, max-age=31536000, immutable";
/**
* Allowlist of Content-Types that are safe to serve from the image endpoint.
* SVG is intentionally excluded â€” it can contain embedded JavaScript and is
* essentially an XML document, not a safe raster image format.
*/
var SAFE_IMAGE_CONTENT_TYPES = new Set([
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/webp",
	"image/avif",
	"image/x-icon",
	"image/vnd.microsoft.icon",
	"image/bmp",
	"image/tiff"
]);
/**
* Check if a Content-Type header value is a safe image type.
* Returns false for SVG (unless dangerouslyAllowSVG is true), HTML, or any non-image type.
*/
function isSafeImageContentType(contentType, dangerouslyAllowSVG = false) {
	if (!contentType) return false;
	const mediaType = contentType.split(";")[0].trim().toLowerCase();
	if (SAFE_IMAGE_CONTENT_TYPES.has(mediaType)) return true;
	if (dangerouslyAllowSVG && mediaType === "image/svg+xml") return true;
	return false;
}
/**
* Apply security headers to an image optimization response.
* These headers are set on every response from the image endpoint,
* regardless of whether the image was transformed or served as-is.
* When an ImageConfig is provided, uses its values for CSP and Content-Disposition.
*/
function setImageSecurityHeaders(headers, config) {
	headers.set("Content-Security-Policy", config?.contentSecurityPolicy ?? "script-src 'none'; frame-src 'none'; sandbox;");
	headers.set("X-Content-Type-Options", "nosniff");
	headers.set("Content-Disposition", config?.contentDispositionType === "attachment" ? "attachment" : "inline");
}
function createPassthroughImageResponse(source, config) {
	const headers = new Headers(source.headers);
	headers.set("Cache-Control", IMAGE_CACHE_CONTROL);
	headers.set("Vary", "Accept");
	setImageSecurityHeaders(headers, config);
	return new Response(source.body, {
		status: 200,
		headers
	});
}
/**
* Handle image optimization requests.
*
* Parses and validates the request, fetches the source image via the provided
* handlers, optionally transforms it, and returns the response with appropriate
* cache headers.
*/
async function handleImageOptimization(request, handlers, allowedWidths, imageConfig) {
	const params = parseImageParams(new URL(request.url), allowedWidths);
	if (!params) return badRequestResponse();
	const { imageUrl, width, quality } = params;
	const source = await handlers.fetchAsset(imageUrl, request);
	if (!source.ok || !source.body) return new Response("Image not found", { status: 404 });
	const format = negotiateImageFormat(request.headers.get("Accept"));
	const sourceContentType = source.headers.get("Content-Type");
	if (!isSafeImageContentType(sourceContentType, imageConfig?.dangerouslyAllowSVG)) return new Response("The requested resource is not an allowed image type", { status: 400 });
	if (sourceContentType?.split(";")[0].trim().toLowerCase() === "image/svg+xml") return createPassthroughImageResponse(source, imageConfig);
	if (handlers.transformImage) try {
		const transformed = await handlers.transformImage(source.body, {
			width,
			format,
			quality
		});
		const headers = new Headers(transformed.headers);
		headers.set("Cache-Control", IMAGE_CACHE_CONTROL);
		headers.set("Vary", "Accept");
		setImageSecurityHeaders(headers, imageConfig);
		if (!isSafeImageContentType(headers.get("Content-Type"), imageConfig?.dangerouslyAllowSVG)) headers.set("Content-Type", format);
		return new Response(transformed.body, {
			status: 200,
			headers
		});
	} catch (e) {
		console.error("[vinext] Image optimization error:", e);
	}
	try {
		return createPassthroughImageResponse(source, imageConfig);
	} catch (e) {
		console.error("[vinext] Image fallback error, refetching source image:", e);
		const refetchedSource = await handlers.fetchAsset(imageUrl, request);
		if (!refetchedSource.ok || !refetchedSource.body) return new Response("Image not found", { status: 404 });
		if (!isSafeImageContentType(refetchedSource.headers.get("Content-Type"), imageConfig?.dangerouslyAllowSVG)) return new Response("The requested resource is not an allowed image type", { status: 400 });
		return createPassthroughImageResponse(refetchedSource, imageConfig);
	}
}
//#endregion
//#region node_modules/vinext/dist/shims/internal/als-registry.js
/**
* Shared helper for registering AsyncLocalStorage instances on `globalThis`
* via `Symbol.for(...)` so that they survive multiple module instances.
*
* Why this helper exists
* ----------------------
* Vite's multi-environment setup (RSC / SSR / client) and HMR can load a
* single source module under several different specifiers, producing more
* than one module instance at runtime. If each instance kept its own
* module-local `new AsyncLocalStorage()`, request-scoped state would silently
* fork across instances â€” `headers()` in one environment wouldn't see what
* `connection()` registered in another, concurrent requests would stomp each
* other, etc.
*
* The fix every shim was applying inline:
*
*   const _ALS_KEY = Symbol.for("vinext.foo.als");
*   const _g = globalThis as unknown as Record<PropertyKey, unknown>;
*   const _als = (_g[_ALS_KEY] ??=
*     new AsyncLocalStorage<T>()) as AsyncLocalStorage<T>;
*
* This helper packages that pattern.
*
* Cross-bundle singleton property â€” preserved
* -------------------------------------------
* - `Symbol.for(key)` consults the global symbol registry and returns the
*   same symbol regardless of which module instance calls it.
* - `globalThis[sym]` is a single slot shared by every module instance.
* - `??=` only assigns when the slot is empty, so the first caller wins and
*   every subsequent caller (in any module instance) reads the same ALS.
*
* The helper module itself never holds the ALS by reference â€” it always
* round-trips through `globalThis`. So even if this helper file is itself
* loaded under multiple module instances, every copy still hands back the
* one true ALS for a given key.
*/
var _g$8 = globalThis;
/**
* Get (or lazily create) the AsyncLocalStorage registered on `globalThis`
* under `Symbol.for(key)`. Multiple callers â€” including callers in different
* module instances â€” that pass the same `key` receive the same ALS instance.
*
* @param key - String key fed to `Symbol.for(...)`. By convention vinext
*   shims use a dotted namespace such as `"vinext.cache.als"`.
*/
function getOrCreateAls(key) {
	const sym = Symbol.for(key);
	return _g$8[sym] ??= new AsyncLocalStorage$1();
}
//#endregion
//#region node_modules/vinext/dist/shims/unified-request-context.js
var _REQUEST_CONTEXT_ALS_KEY = Symbol.for("vinext.requestContext.als");
var _g$7 = globalThis;
var _als$4 = getOrCreateAls("vinext.unifiedRequestContext.als");
function _getInheritedExecutionContext() {
	const unifiedStore = _als$4.getStore();
	if (unifiedStore) return unifiedStore.executionContext;
	return _g$7[_REQUEST_CONTEXT_ALS_KEY]?.getStore() ?? null;
}
/**
* Create a fresh `UnifiedRequestContext` with defaults for all fields.
* Pass partial overrides for the fields you need to pre-populate.
*/
function createRequestContext(opts) {
	return {
		headersContext: null,
		actionRevalidationKind: 0,
		dynamicUsageDetected: false,
		invalidDynamicUsageError: null,
		pendingSetCookies: [],
		draftModeCookieHeader: null,
		phase: "render",
		i18nContext: null,
		serverContext: null,
		serverInsertedHTMLCallbacks: [],
		requestScopedCacheLife: null,
		unstableCacheRevalidation: "foreground",
		_privateCache: null,
		currentRequestTags: [],
		currentFetchSoftTags: [],
		currentFetchCacheMode: null,
		isFetchDedupeActive: false,
		currentFetchDedupeEntries: /* @__PURE__ */ new Map(),
		executionContext: _getInheritedExecutionContext(),
		requestCache: /* @__PURE__ */ new WeakMap(),
		ssrContext: null,
		ssrHeadChildren: [],
		rootParams: null,
		...opts
	};
}
function runWithRequestContext(ctx, fn) {
	return _als$4.run(ctx, fn);
}
function runWithUnifiedStateMutation(mutate, fn) {
	const parentCtx = _als$4.getStore();
	if (!parentCtx) return fn();
	const childCtx = { ...parentCtx };
	mutate(childCtx);
	return _als$4.run(childCtx, fn);
}
/**
* Get the current unified request context.
* Returns the ALS store when inside a `runWithRequestContext()` scope,
* or a fresh detached context otherwise. Unlike the legacy per-shim fallback
* singletons, this detached value is ephemeral â€” mutations do not persist
* across calls. This is intentional to prevent state leakage outside request
* scopes.
*
* Only direct callers observe this detached fallback. Shim `_getState()`
* helpers should continue to gate on `isInsideUnifiedScope()` and fall back
* to their standalone ALS/fallback singletons outside the unified scope.
* If called inside a standalone `runWithExecutionContext()` scope, the
* detached context still reflects that inherited `executionContext`.
*/
function getRequestContext() {
	return _als$4.getStore() ?? createRequestContext();
}
/**
* Check whether the current execution is inside a `runWithRequestContext()` scope.
* Shim modules use this to decide whether to read from the unified store
* or fall back to their own standalone ALS.
*/
function isInsideUnifiedScope() {
	return _als$4.getStore() != null;
}
//#endregion
//#region node_modules/vinext/dist/shims/request-context.js
/**
* Request ExecutionContext â€” AsyncLocalStorage-backed accessor.
*
* Makes the Cloudflare Workers `ExecutionContext` (which provides
* `waitUntil`) available to any code on the call stack during a request
* without requiring it to be threaded through every function signature.
*
* Usage:
*
*   // In the worker entry, wrap the handler:
*   import { runWithExecutionContext } from "vinext/shims/request-context";
*   export default {
*     fetch(request, env, ctx) {
*       return runWithExecutionContext(ctx, () => handler.fetch(request, env, ctx));
*     }
*   };
*
*   // Anywhere downstream:
*   import { getRequestExecutionContext } from "vinext/shims/request-context";
*   const ctx = getRequestExecutionContext(); // null on Node.js dev
*   ctx?.waitUntil(somePromise);
*/
var _als$3 = getOrCreateAls("vinext.requestContext.als");
function runWithExecutionContext(ctx, fn) {
	if (isInsideUnifiedScope()) return runWithUnifiedStateMutation((uCtx) => {
		uCtx.executionContext = ctx;
	}, fn);
	return _als$3.run(ctx, fn);
}
/**
* Get the `ExecutionContext` for the current request, or `null` when called
* outside a `runWithExecutionContext()` scope (e.g. on Node.js dev server).
*
* Use `ctx?.waitUntil(promise)` to schedule background work that must
* complete before the Worker isolate is torn down.
*/
function getRequestExecutionContext() {
	if (isInsideUnifiedScope()) return getRequestContext().executionContext;
	return _als$3.getStore() ?? null;
}
//#endregion
//#region node_modules/vinext/dist/utils/base-path.js
/**
* Shared basePath helpers.
*
* Next.js only treats a pathname as being under basePath when it is an exact
* match ("/app") or starts with the basePath followed by a path separator
* ("/app/..."). Prefix-only matches like "/application" must be left intact.
*/
/**
* Check whether a pathname is inside the configured basePath.
*/
function hasBasePath(pathname, basePath) {
	if (!basePath) return false;
	return pathname === basePath || pathname.startsWith(basePath + "/");
}
/**
* Strip the basePath prefix from a pathname when it matches on a segment
* boundary. Returns the original pathname when it is outside the basePath.
*/
function stripBasePath(pathname, basePath) {
	if (!hasBasePath(pathname, basePath)) return pathname;
	return pathname.slice(basePath.length) || "/";
}
/**
* Remove trailing slashes from a pathname while preserving the root "/".
* Collapses any number of trailing slashes ("/a//" â†’ "/a"). Used by the
* trailing-slash redirect path and route pattern normalization.
*/
function removeTrailingSlash(pathname) {
	if (pathname === "/") return "/";
	let end = pathname.length;
	while (end > 0 && pathname.charCodeAt(end - 1) === 47) end--;
	return end === 0 ? "/" : pathname.slice(0, end);
}
//#endregion
//#region node_modules/vinext/dist/server/headers.js
/**
* Internal HTTP header name constants used throughout vinext.
*
* Centralizes all custom header names so they are defined once and referenced
* everywhere via imports. Keeping them in one module prevents typos, makes
* rename-refactors trivial, and lets grep find every consumer instantly.
*
* Standard HTTP headers (Content-Type, Cache-Control, etc.) are intentionally
* omitted â€” only vinext-internal and Next.js-protocol headers belong here.
*/
/** ISR / page cache state indicator: "HIT" | "MISS" | "STALE" | "STATIC". */
var VINEXT_CACHE_HEADER = "X-Vinext-Cache";
/** Static file signal â€” value is URL-encoded pathname. */
var VINEXT_STATIC_FILE_HEADER = "x-vinext-static-file";
/** Serialized middleware context (JSON) forwarded from dev server to RSC entry. */
var VINEXT_MW_CTX_HEADER = "x-vinext-mw-ctx";
/** Timing metrics: `handlerStart,compileMs,renderMs`. */
var VINEXT_TIMING_HEADER = "x-vinext-timing";
/** Build-time prerender authentication secret. */
var VINEXT_PRERENDER_SECRET_HEADER = "x-vinext-prerender-secret";
/** URL-encoded JSON route params carried on RSC responses. */
var VINEXT_PARAMS_HEADER = "X-Vinext-Params";
/** Deduplicated, sorted list of mounted layout slots for cache keying. */
var VINEXT_MOUNTED_SLOTS_HEADER = "X-Vinext-Mounted-Slots";
/** Route interception context for parallel/intercepting routes. */
var VINEXT_INTERCEPTION_CONTEXT_HEADER = "X-Vinext-Interception-Context";
/** RSC render mode (e.g. "navigation", "prefetch"). */
var VINEXT_RSC_RENDER_MODE_HEADER = "X-Vinext-Rsc-Render-Mode";
/** Next.js action-not-found indicator (value "1"). */
var NEXTJS_ACTION_NOT_FOUND_HEADER = "x-nextjs-action-not-found";
/** Indicates revalidation occurred â€” value is JSON kind (1 = path/tag, 2 = dynamic-only). */
var ACTION_REVALIDATED_HEADER = "x-action-revalidated";
/** Redirect URL from a Server Action. */
var ACTION_REDIRECT_HEADER = "x-action-redirect";
/** Redirect type from a Server Action ("push" | "replace"). */
var ACTION_REDIRECT_TYPE_HEADER = "x-action-redirect-type";
/** HTTP status for a Server Action redirect (e.g. "308"). */
var ACTION_REDIRECT_STATUS_HEADER = "x-action-redirect-status";
/** Prefix for forwarded request headers (e.g. `x-middleware-request-cookie`). */
var MIDDLEWARE_REQUEST_HEADER_PREFIX = "x-middleware-request-";
/** Comma-separated list of header names that middleware wants to override. */
var MIDDLEWARE_OVERRIDE_HEADERS = "x-middleware-override-headers";
/** Carries cookies set by middleware for same-render reads. */
var MIDDLEWARE_SET_COOKIE_HEADER = "x-middleware-set-cookie";
/** Signal from `NextResponse.next()` â€” value "1" means "continue to next handler". */
var MIDDLEWARE_NEXT_HEADER = "x-middleware-next";
/** Rewrite destination URL set by `NextResponse.rewrite()`. */
var MIDDLEWARE_REWRITE_HEADER = "x-middleware-rewrite";
/** Redirect URL set by middleware. */
var MIDDLEWARE_REDIRECT_HEADER = "x-middleware-redirect";
/** Skip-middleware signal. */
var MIDDLEWARE_SKIP_HEADER = "x-middleware-skip";
var NEXT_ROUTER_STATE_TREE_HEADER = "Next-Router-State-Tree";
var NEXT_ROUTER_PREFETCH_HEADER = "Next-Router-Prefetch";
var NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = "Next-Router-Segment-Prefetch";
var NEXT_URL_HEADER = "Next-Url";
/** Lowercase flight header variants used in middleware forwarding. */
var FLIGHT_HEADERS = [
	"rsc",
	"next-router-state-tree",
	"next-router-prefetch",
	"next-hmr-refresh",
	"next-router-segment-prefetch"
];
/**
* Headers that must be stripped from external requests before any handler
* processes them. An attacker could forge these to influence routing or
* impersonate internal data fetches.
*
* Ported from Next.js `INTERNAL_HEADERS`:
* https://github.com/vercel/next.js/blob/canary/packages/next/src/server/lib/server-ipc/utils.ts
*/
var INTERNAL_HEADERS = [
	MIDDLEWARE_REWRITE_HEADER,
	MIDDLEWARE_REDIRECT_HEADER,
	MIDDLEWARE_SET_COOKIE_HEADER,
	MIDDLEWARE_SKIP_HEADER,
	MIDDLEWARE_OVERRIDE_HEADERS,
	MIDDLEWARE_NEXT_HEADER,
	"x-now-route-matches",
	"x-matched-path",
	"x-nextjs-data",
	"x-next-resume-state-length"
];
//#endregion
//#region node_modules/vinext/dist/server/middleware-request-headers.js
var CREDENTIAL_REQUEST_HEADERS = ["authorization", "cookie"];
function getMiddlewareHeaderValue(source, key) {
	if (source instanceof Headers) return source.get(key);
	const value = source[key];
	if (value === void 0) return null;
	return Array.isArray(value) ? value[0] ?? null : value;
}
function getOverrideHeaderNames(source) {
	const rawValue = getMiddlewareHeaderValue(source, MIDDLEWARE_OVERRIDE_HEADERS);
	if (rawValue === null) return null;
	return rawValue.split(",").map((key) => key.trim()).filter(Boolean);
}
function getForwardedRequestHeaders(source) {
	const forwardedHeaders = /* @__PURE__ */ new Map();
	if (source instanceof Headers) {
		for (const [key, value] of source.entries()) if (key.startsWith("x-middleware-request-")) forwardedHeaders.set(key.slice(MIDDLEWARE_REQUEST_HEADER_PREFIX.length), value);
		return forwardedHeaders;
	}
	for (const [key, value] of Object.entries(source)) {
		if (!key.startsWith("x-middleware-request-")) continue;
		const normalizedValue = Array.isArray(value) ? value[0] ?? "" : value;
		forwardedHeaders.set(key.slice(MIDDLEWARE_REQUEST_HEADER_PREFIX.length), normalizedValue);
	}
	return forwardedHeaders;
}
function cloneHeaders(source) {
	const cloned = new Headers();
	for (const [key, value] of source.entries()) cloned.append(key, value);
	return cloned;
}
function encodeMiddlewareRequestHeaders(targetHeaders, requestHeaders) {
	const overrideHeaderNames = [...requestHeaders.keys()];
	targetHeaders.set(MIDDLEWARE_OVERRIDE_HEADERS, overrideHeaderNames.join(","));
	for (const [key, value] of requestHeaders.entries()) targetHeaders.set(`${MIDDLEWARE_REQUEST_HEADER_PREFIX}${key}`, value);
}
function buildRequestHeadersFromMiddlewareResponse(baseHeaders, middlewareHeaders, options = {}) {
	const overrideHeaderNames = getOverrideHeaderNames(middlewareHeaders);
	const forwardedHeaders = getForwardedRequestHeaders(middlewareHeaders);
	if (overrideHeaderNames === null && forwardedHeaders.size === 0) return null;
	const nextHeaders = overrideHeaderNames === null ? cloneHeaders(baseHeaders) : new Headers();
	if (overrideHeaderNames === null) {
		for (const [key, value] of forwardedHeaders) nextHeaders.set(key, value);
		return nextHeaders;
	}
	if (options.preserveCredentialHeaders) {
		const overrideHeaderNameSet = new Set(overrideHeaderNames);
		for (const key of CREDENTIAL_REQUEST_HEADERS) {
			if (overrideHeaderNameSet.has(key)) continue;
			const value = baseHeaders.get(key);
			if (value !== null) nextHeaders.set(key, value);
		}
	}
	for (const key of overrideHeaderNames) {
		const value = forwardedHeaders.get(key);
		if (value !== void 0) nextHeaders.set(key, value);
	}
	return nextHeaders;
}
function shouldKeepMiddlewareHeader(key) {
	return key === "x-middleware-override-headers" || key === "x-middleware-set-cookie" || key.startsWith("x-middleware-request-");
}
//#endregion
//#region node_modules/vinext/dist/config/config-matchers.js
/**
* Cache for compiled regex patterns in matchConfigPattern.
*
* Redirect/rewrite patterns are static â€” they come from next.config.js and
* never change at runtime. Without caching, every request that hits the regex
* branch re-runs the full tokeniser walk + isSafeRegex + new RegExp() for
* every rule in the array. On apps with many locale-prefixed rules (which all
* contain `(` and therefore enter the regex branch) this dominated profiling
* at ~2.4 seconds of CPU self-time.
*
* Value is `null` when safeRegExp rejected the pattern (ReDoS risk), so we
* skip it on subsequent requests too without re-running the scanner.
*/
var _compiledPatternCache = /* @__PURE__ */ new Map();
/**
* Cache for compiled header source regexes in matchHeaders.
*
* Each NextHeader rule has a `source` that is run through escapeHeaderSource()
* then safeRegExp() to produce a RegExp. Both are pure functions of the source
* string and the result never changes. Without caching, every request
* re-runs the full escapeHeaderSource tokeniser + isSafeRegex scan + new RegExp()
* for every header rule.
*
* Value is `null` when safeRegExp rejected the pattern (ReDoS risk).
*/
var _compiledHeaderSourceCache = /* @__PURE__ */ new Map();
/**
* Cache for compiled has/missing condition value regexes in checkSingleCondition.
*
* Each has/missing condition may carry a `value` string that is passed directly
* to safeRegExp() for matching against header/cookie/query/host values. The
* condition objects are static (from next.config.js) so the compiled RegExp
* never changes. Without caching, safeRegExp() is called on every request for
* every condition on every rule.
*
* Value is `null` when safeRegExp rejected the pattern, or `false` when the
* value string was undefined (no regex needed â€” use exact string comparison).
*/
var _compiledConditionCache = /* @__PURE__ */ new Map();
/**
* Cache for destination substitution regexes in substituteDestinationParams.
*
* The regex depends only on the set of param keys captured from the matched
* source pattern. Caching by sorted key list avoids recompiling a new RegExp
* for repeated redirect/rewrite calls that use the same param shape.
*/
var _compiledDestinationParamCache = /* @__PURE__ */ new Map();
/**
* Generic helper for the regex compilation caches above.
*
* Each cache stores the compiled artifact (or `null` when safeRegExp rejected
* the pattern) the first time a key is seen, and reuses it forever. The
* `undefined` sentinel distinguishes "not yet seen" from "seen and rejected"
* so we never re-run isSafeRegex on the same input.
*
* Keep the security path intact: `compile()` is responsible for calling
* safeRegExp(); this helper only handles caching.
*/
function getCachedRegex(cache, key, compile) {
	let value = cache.get(key);
	if (value === void 0) {
		value = compile();
		cache.set(key, value);
	}
	return value;
}
/**
* Redirect index for O(1) locale-static rule lookup.
*
* Many Next.js apps generate 50-100 redirect rules of the form:
*   /:locale(en|es|fr|...)?/some-static-path  â†’  /some-destination
*
* The compiled regex for each is like:
*   ^/(en|es|fr|...)?/some-static-path$
*
* When no redirect matches (the common case for ordinary page loads),
* matchRedirect previously ran exec() on every one of those regexes â€”
* ~2ms per call, ~2992ms total self-time in profiles.
*
* The index splits rules into two buckets:
*
*   localeStatic â€” rules whose source is exactly /:paramName(alt1|alt2|...)?/suffix
*     where `suffix` is a static path with no further params or regex groups.
*     These are indexed in a Map<suffix, entry[]> for O(1) lookup after a
*     single fast strip of the optional locale prefix.
*
*   linear â€” all other rules. Matched with the original O(n) loop.
*
* The index is stored in a WeakMap keyed by the redirects array so it is
* computed once per config load and GC'd when the array is no longer live.
*
* ## Ordering invariant
*
* Redirect rules must be evaluated in their original order (first match wins).
* Each locale-static entry stores its `originalIndex` so that, when a
* locale-static fast-path match is found, any linear rules that appear earlier
* in the array are still checked first.
*/
/** Matches `/:param(alternation)?/static/suffix` â€” the locale-static pattern. */
var _LOCALE_STATIC_RE = /^\/:[\w-]+\(([^)]+)\)\?\/([a-zA-Z0-9_~.%@!$&'*+,;=:/-]+)$/;
var _redirectIndexCache = /* @__PURE__ */ new WeakMap();
/**
* Build (or retrieve from cache) the redirect index for a given redirects array.
*
* Called once per config load from matchRedirect. The WeakMap ensures the index
* is recomputed if the config is reloaded (new array reference) and GC'd when
* the array is collected.
*/
function _getRedirectIndex(redirects) {
	let index = _redirectIndexCache.get(redirects);
	if (index !== void 0) return index;
	const localeStatic = /* @__PURE__ */ new Map();
	const linear = [];
	for (let i = 0; i < redirects.length; i++) {
		const redirect = redirects[i];
		const m = _LOCALE_STATIC_RE.exec(redirect.source);
		if (m) {
			const paramName = redirect.source.slice(2, redirect.source.indexOf("("));
			const alternation = m[1];
			const suffix = "/" + m[2];
			const altRe = safeRegExp("^(?:" + alternation + ")$");
			if (!altRe) {
				linear.push([i, redirect]);
				continue;
			}
			const entry = {
				paramName,
				altRe,
				redirect,
				originalIndex: i
			};
			const bucket = localeStatic.get(suffix);
			if (bucket) bucket.push(entry);
			else localeStatic.set(suffix, [entry]);
		} else linear.push([i, redirect]);
	}
	index = {
		localeStatic,
		linear
	};
	_redirectIndexCache.set(redirects, index);
	return index;
}
/** Hop-by-hop headers that should not be forwarded through a proxy. */
var HOP_BY_HOP_HEADERS = new Set([
	"connection",
	"keep-alive",
	"proxy-authenticate",
	"proxy-authorization",
	"te",
	"trailers",
	"transfer-encoding",
	"upgrade"
]);
/**
* Request hop-by-hop headers to strip before proxying with fetch().
* Intentionally narrower than HOP_BY_HOP_HEADERS: external rewrite proxying
* still forwards proxy auth credentials, while response sanitization strips
* them before returning data to the client.
*/
var REQUEST_HOP_BY_HOP_HEADERS = new Set([
	"connection",
	"keep-alive",
	"te",
	"trailers",
	"transfer-encoding",
	"upgrade"
]);
function stripHopByHopRequestHeaders(headers) {
	const connectionTokens = (headers.get("connection") || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
	for (const header of REQUEST_HOP_BY_HOP_HEADERS) headers.delete(header);
	for (const token of connectionTokens) headers.delete(token);
}
/**
* Detect regex patterns vulnerable to catastrophic backtracking (ReDoS).
*
* Uses a lightweight heuristic: scans the pattern string for nested quantifiers
* (a quantifier applied to a group that itself contains a quantifier). This
* catches the most common pathological patterns like `(a+)+`, `(.*)*`,
* `([^/]+)+`, `(a|a+)+` without needing a full regex parser.
*
* Returns true if the pattern appears safe, false if it's potentially dangerous.
*/
function isSafeRegex(pattern) {
	const quantifierAtDepth = [];
	let depth = 0;
	let i = 0;
	while (i < pattern.length) {
		const ch = pattern[i];
		if (ch === "\\") {
			i += 2;
			continue;
		}
		if (ch === "[") {
			i++;
			while (i < pattern.length && pattern[i] !== "]") {
				if (pattern[i] === "\\") i++;
				i++;
			}
			i++;
			continue;
		}
		if (ch === "(") {
			depth++;
			if (quantifierAtDepth.length <= depth) quantifierAtDepth.push(false);
			else quantifierAtDepth[depth] = false;
			i++;
			continue;
		}
		if (ch === ")") {
			const hadQuantifier = depth > 0 && quantifierAtDepth[depth];
			if (depth > 0) depth--;
			const next = pattern[i + 1];
			if (next === "+" || next === "*" || next === "{") {
				if (hadQuantifier) return false;
				if (depth >= 0 && depth < quantifierAtDepth.length) quantifierAtDepth[depth] = true;
			}
			i++;
			continue;
		}
		if (ch === "+" || ch === "*") {
			if (depth > 0) quantifierAtDepth[depth] = true;
			i++;
			continue;
		}
		if (ch === "?") {
			const prev = i > 0 ? pattern[i - 1] : "";
			if (prev !== "+" && prev !== "*" && prev !== "?" && prev !== "}") {
				if (depth > 0) quantifierAtDepth[depth] = true;
			}
			i++;
			continue;
		}
		if (ch === "{") {
			let j = i + 1;
			while (j < pattern.length && /[\d,]/.test(pattern[j])) j++;
			if (j < pattern.length && pattern[j] === "}" && j > i + 1) {
				if (depth > 0) quantifierAtDepth[depth] = true;
				i = j + 1;
				continue;
			}
		}
		i++;
	}
	return true;
}
/**
* Compile a regex pattern safely. Returns the compiled RegExp or null if the
* pattern is invalid or vulnerable to ReDoS.
*
* Logs a warning when a pattern is rejected so developers can fix their config.
*/
function safeRegExp(pattern, flags) {
	if (!isSafeRegex(pattern)) {
		console.warn(`[vinext] Ignoring potentially unsafe regex pattern (ReDoS risk): ${pattern}\n  Patterns with nested quantifiers (e.g. (a+)+) can cause catastrophic backtracking.\n  Simplify the pattern to avoid nested repetition.`);
		return null;
	}
	try {
		return new RegExp(pattern, flags);
	} catch {
		return null;
	}
}
/**
* Convert a Next.js header/rewrite/redirect source pattern into a regex string.
*
* Regex groups in the source (e.g. `(\d+)`) are extracted first, the remaining
* text is escaped/converted in a **single pass** (avoiding chained `.replace()`
* which CodeQL flags as incomplete sanitization), then groups are restored.
*/
function escapeHeaderSource(source) {
	const S = "î€€";
	const groups = [];
	const withPlaceholders = source.replace(/\(([^)]+)\)/g, (_m, inner) => {
		groups.push(inner);
		return `${S}G${groups.length - 1}${S}`;
	});
	let result = "";
	const re = new RegExp(`${S}G(\\d+)${S}|:[\\w-]+|[.+?*]|[^.+?*:\\uE000]+`, "g");
	let m;
	while ((m = re.exec(withPlaceholders)) !== null) if (m[1] !== void 0) result += `(${groups[Number(m[1])]})`;
	else if (m[0].startsWith(":")) {
		const constraintMatch = withPlaceholders.slice(re.lastIndex).match(new RegExp(`^${S}G(\\d+)${S}`));
		if (constraintMatch) {
			re.lastIndex += constraintMatch[0].length;
			result += `(${groups[Number(constraintMatch[1])]})`;
		} else result += "[^/]+";
	} else switch (m[0]) {
		case ".":
			result += "\\.";
			break;
		case "+":
			result += "\\+";
			break;
		case "?":
			result += "\\?";
			break;
		case "*":
			result += ".*";
			break;
		default:
			result += m[0];
			break;
	}
	return result;
}
/**
* Parse a Cookie header string into a key-value record.
*/
function parseCookies(cookieHeader) {
	if (!cookieHeader) return {};
	const cookies = {};
	for (const part of cookieHeader.split(";")) {
		const eq = part.indexOf("=");
		if (eq === -1) continue;
		const key = part.slice(0, eq).trim();
		const value = part.slice(eq + 1).trim();
		if (key) cookies[key] = value;
	}
	return cookies;
}
/**
* Build a RequestContext from a Web Request object.
*/
function requestContextFromRequest(request) {
	const url = new URL(request.url);
	return {
		headers: request.headers,
		cookies: parseCookies(request.headers.get("cookie")),
		query: url.searchParams,
		host: normalizeHost(request.headers.get("host"), url.hostname)
	};
}
function normalizeHost(hostHeader, fallbackHostname) {
	return (hostHeader ?? fallbackHostname).split(":", 1)[0].toLowerCase();
}
function _emptyParams() {
	return Object.create(null);
}
function _matchConditionValue(actualValue, expectedValue) {
	if (expectedValue === void 0) return _emptyParams();
	const re = _cachedConditionRegex(expectedValue);
	if (re) {
		const match = re.exec(actualValue);
		if (!match) return null;
		const params = _emptyParams();
		if (match.groups) {
			for (const [key, value] of Object.entries(match.groups)) if (value !== void 0) params[key] = value;
		}
		return params;
	}
	return actualValue === expectedValue ? _emptyParams() : null;
}
/**
* Check a single has/missing condition against request context.
* Returns captured params when the condition is satisfied, or null otherwise.
*/
function matchSingleCondition(condition, ctx) {
	switch (condition.type) {
		case "header": {
			const headerValue = ctx.headers.get(condition.key);
			if (headerValue === null) return null;
			return _matchConditionValue(headerValue, condition.value);
		}
		case "cookie": {
			const cookieValue = ctx.cookies[condition.key];
			if (cookieValue === void 0) return null;
			return _matchConditionValue(cookieValue, condition.value);
		}
		case "query": {
			const queryValue = ctx.query.get(condition.key);
			if (queryValue === null) return null;
			return _matchConditionValue(queryValue, condition.value);
		}
		case "host":
			if (condition.value !== void 0) return _matchConditionValue(ctx.host, condition.value);
			return ctx.host === condition.key ? _emptyParams() : null;
		default: return null;
	}
}
/**
* Return a cached RegExp for a has/missing condition value string, compiling
* on first use. Returns null if safeRegExp rejected the pattern or if the
* value is not a valid regex (fall back to exact string comparison).
*/
function _cachedConditionRegex(value) {
	return getCachedRegex(_compiledConditionCache, value, () => safeRegExp(`^${value}$`));
}
/**
* Check all has/missing conditions for a config rule.
* Returns true if the rule should be applied (all has conditions pass, all missing conditions pass).
*
* - has: every condition must match (the request must have it)
* - missing: every condition must NOT match (the request must not have it)
*/
function collectConditionParams(has, missing, ctx) {
	const params = _emptyParams();
	if (has) for (const condition of has) {
		const conditionParams = matchSingleCondition(condition, ctx);
		if (!conditionParams) return null;
		Object.assign(params, conditionParams);
	}
	if (missing) {
		for (const condition of missing) if (matchSingleCondition(condition, ctx)) return null;
	}
	return params;
}
function checkHasConditions(has, missing, ctx) {
	return collectConditionParams(has, missing, ctx) !== null;
}
/**
* If the current position in `str` starts with a parenthesized group, consume
* it and advance `re.lastIndex` past the closing `)`. Returns the group
* contents or null if no group is present.
*/
function extractConstraint$1(str, re) {
	if (str[re.lastIndex] !== "(") return null;
	const start = re.lastIndex + 1;
	let depth = 1;
	let i = start;
	while (i < str.length && depth > 0) {
		if (str[i] === "(") depth++;
		else if (str[i] === ")") depth--;
		i++;
	}
	if (depth !== 0) return null;
	re.lastIndex = i;
	return str.slice(start, i - 1);
}
/**
* Match a Next.js config pattern (from redirects/rewrites sources) against a pathname.
* Returns matched params or null.
*
* Supports:
*   :param     - matches a single path segment
*   :param*    - matches zero or more segments (catch-all)
*   :param+    - matches one or more segments
*   (regex)    - inline regex patterns in the source
*   :param(constraint) - named param with inline regex constraint
*/
function matchConfigPattern(pathname, pattern) {
	if (pattern.includes("(") || pattern.includes("\\") || /:[\w-]+[*+][^/]/.test(pattern) || /:[\w-]+\./.test(pattern)) try {
		const compiled = getCachedRegex(_compiledPatternCache, pattern, () => {
			const paramNames = [];
			let regexStr = "";
			const tokenRe = /:([\w-]+)|[.]|[^:.]+/g;
			let tok;
			while ((tok = tokenRe.exec(pattern)) !== null) if (tok[1] !== void 0) {
				const name = tok[1];
				const rest = pattern.slice(tokenRe.lastIndex);
				if (rest.startsWith("*") || rest.startsWith("+")) {
					const quantifier = rest[0];
					tokenRe.lastIndex += 1;
					const constraint = extractConstraint$1(pattern, tokenRe);
					paramNames.push(name);
					if (constraint !== null) regexStr += `(${constraint})`;
					else regexStr += quantifier === "*" ? "(.*)" : "(.+)";
				} else {
					const constraint = extractConstraint$1(pattern, tokenRe);
					paramNames.push(name);
					regexStr += constraint !== null ? `(${constraint})` : "([^/]+)";
				}
			} else if (tok[0] === ".") regexStr += "\\.";
			else regexStr += tok[0];
			const re = safeRegExp("^" + regexStr + "$");
			return re ? {
				re,
				paramNames
			} : null;
		});
		if (!compiled) return null;
		const match = compiled.re.exec(pathname);
		if (!match) return null;
		const params = Object.create(null);
		for (let i = 0; i < compiled.paramNames.length; i++) params[compiled.paramNames[i]] = match[i + 1] ?? "";
		return params;
	} catch {}
	const catchAllMatch = pattern.match(/:([\w-]+)(\*|\+)$/);
	if (catchAllMatch) {
		const prefix = pattern.slice(0, pattern.lastIndexOf(":"));
		const paramName = catchAllMatch[1];
		const isPlus = catchAllMatch[2] === "+";
		const prefixNoSlash = prefix.replace(/\/$/, "");
		if (!pathname.startsWith(prefixNoSlash)) return null;
		const charAfter = pathname[prefixNoSlash.length];
		if (charAfter !== void 0 && charAfter !== "/") return null;
		const rest = pathname.slice(prefixNoSlash.length);
		if (isPlus && (!rest || rest === "/")) return null;
		let restValue = rest.startsWith("/") ? rest.slice(1) : rest;
		return { [paramName]: restValue };
	}
	const parts = pattern.split("/");
	const pathParts = pathname.split("/");
	if (parts.length !== pathParts.length) return null;
	const params = Object.create(null);
	for (let i = 0; i < parts.length; i++) if (parts[i].startsWith(":")) params[parts[i].slice(1)] = pathParts[i];
	else if (parts[i] !== pathParts[i]) return null;
	return params;
}
/**
* Apply redirect rules from next.config.js.
* Returns the redirect info if a redirect was matched, or null.
*
* `ctx` provides the request context (cookies, headers, query, host) used
* to evaluate has/missing conditions. Next.js always has request context
* when evaluating redirects, so this parameter is required.
*
* ## Performance
*
* Rules with a locale-capture-group prefix (the dominant pattern in large
* Next.js apps â€” e.g. `/:locale(en|es|fr|...)?/some-path`) are handled via
* a pre-built index. Instead of running exec() on each locale regex
* individually, we:
*
*   1. Strip the optional locale prefix from the pathname with one cheap
*      string-slice check (no regex exec on the hot path).
*   2. Look up the stripped suffix in a Map<suffix, entry[]>.
*   3. For each matching entry, validate the captured locale string against
*      a small, anchored alternation regex.
*
* This reduces the per-request cost from O(n Ã— regex) to O(1) map lookup +
* O(matches Ã— tiny-regex), eliminating the ~2992ms self-time reported in
* profiles for apps with 63+ locale-prefixed rules.
*
* Rules that don't fit the locale-static pattern fall back to the original
* linear matchConfigPattern scan.
*
* ## Ordering invariant
*
* First match wins, preserving the original redirect array order. When a
* locale-static fast-path match is found at position N, all linear rules with
* an original index < N are checked via matchConfigPattern first â€” they are
* few in practice (typically zero) so this is not a hot-path concern.
*/
function matchRedirect(pathname, redirects, ctx) {
	if (redirects.length === 0) return null;
	const index = _getRedirectIndex(redirects);
	let localeMatch = null;
	let localeMatchIndex = Infinity;
	if (index.localeStatic.size > 0) {
		const noLocaleBucket = index.localeStatic.get(pathname);
		if (noLocaleBucket) for (const entry of noLocaleBucket) {
			if (entry.originalIndex >= localeMatchIndex) continue;
			const redirect = entry.redirect;
			const conditionParams = redirect.has || redirect.missing ? collectConditionParams(redirect.has, redirect.missing, ctx) : _emptyParams();
			if (!conditionParams) continue;
			localeMatch = {
				destination: substituteAndSanitizeDestination(redirect.destination, {
					[entry.paramName]: "",
					...conditionParams
				}),
				permanent: redirect.permanent
			};
			localeMatchIndex = entry.originalIndex;
			break;
		}
		const slashTwo = pathname.indexOf("/", 1);
		if (slashTwo !== -1) {
			const suffix = pathname.slice(slashTwo);
			const localePart = pathname.slice(1, slashTwo);
			const localeBucket = index.localeStatic.get(suffix);
			if (localeBucket) for (const entry of localeBucket) {
				if (entry.originalIndex >= localeMatchIndex) continue;
				if (!entry.altRe.test(localePart)) continue;
				const redirect = entry.redirect;
				const conditionParams = redirect.has || redirect.missing ? collectConditionParams(redirect.has, redirect.missing, ctx) : _emptyParams();
				if (!conditionParams) continue;
				localeMatch = {
					destination: substituteAndSanitizeDestination(redirect.destination, {
						[entry.paramName]: localePart,
						...conditionParams
					}),
					permanent: redirect.permanent
				};
				localeMatchIndex = entry.originalIndex;
				break;
			}
		}
	}
	for (const [origIdx, redirect] of index.linear) {
		if (origIdx >= localeMatchIndex) break;
		const params = matchConfigPattern(pathname, redirect.source);
		if (params) {
			const conditionParams = redirect.has || redirect.missing ? collectConditionParams(redirect.has, redirect.missing, ctx) : _emptyParams();
			if (!conditionParams) continue;
			return {
				destination: substituteAndSanitizeDestination(redirect.destination, {
					...params,
					...conditionParams
				}),
				permanent: redirect.permanent
			};
		}
	}
	return localeMatch;
}
/**
* Apply rewrite rules from next.config.js.
* Returns the rewritten URL or null if no rewrite matched.
*
* `ctx` provides the request context (cookies, headers, query, host) used
* to evaluate has/missing conditions. Next.js always has request context
* when evaluating rewrites, so this parameter is required.
*/
function matchRewrite(pathname, rewrites, ctx) {
	for (const rewrite of rewrites) {
		const params = matchConfigPattern(pathname, rewrite.source);
		if (params) {
			const conditionParams = rewrite.has || rewrite.missing ? collectConditionParams(rewrite.has, rewrite.missing, ctx) : _emptyParams();
			if (!conditionParams) continue;
			return substituteAndSanitizeDestination(rewrite.destination, {
				...params,
				...conditionParams
			});
		}
	}
	return null;
}
/**
* Substitute all matched route params into a redirect/rewrite destination.
*
* Handles repeated params (e.g. `/api/:id/:id`) and catch-all suffix forms
* (`:path*`, `:path+`) in a single pass. Unknown params are left intact.
*/
function substituteDestinationParams(destination, params) {
	const keys = Object.keys(params);
	if (keys.length === 0) return destination;
	const sortedKeys = [...keys].sort((a, b) => b.length - a.length);
	const cacheKey = sortedKeys.join("\0");
	let paramRe = _compiledDestinationParamCache.get(cacheKey);
	if (!paramRe) {
		const paramAlternation = sortedKeys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
		paramRe = new RegExp(`:(${paramAlternation})([+*])?(?![A-Za-z0-9_])`, "g");
		_compiledDestinationParamCache.set(cacheKey, paramRe);
	}
	return destination.replace(paramRe, (_token, key) => params[key]);
}
/**
* Substitute params into a redirect/rewrite destination and sanitize the
* result. Used by every redirect/rewrite branch â€” the substitution can
* introduce protocol-relative URLs (e.g. `//evil.com` from a decoded `%2F`
* in a catch-all param), which sanitizeDestination collapses.
*/
function substituteAndSanitizeDestination(destination, params) {
	return sanitizeDestination(substituteDestinationParams(destination, params));
}
/**
* Sanitize a redirect/rewrite destination to collapse protocol-relative URLs.
*
* After parameter substitution, a destination like `/:path*` can become
* `//evil.com` if the catch-all captured a decoded `%2F` (`/evil.com`).
* Browsers interpret `//evil.com` as a protocol-relative URL, redirecting
* users off-site.
*
* This function collapses any leading double (or more) slashes to a single
* slash for non-external (relative) destinations.
*/
function sanitizeDestination(dest) {
	if (dest.startsWith("http://") || dest.startsWith("https://")) return dest;
	dest = dest.replace(/^[\\/]+/, "/");
	return dest;
}
/**
* Check if a URL is external (absolute URL or protocol-relative).
* Detects any URL scheme (http:, https:, data:, javascript:, blob:, etc.)
* per RFC 3986, plus protocol-relative URLs (//).
*/
function isExternalUrl(url) {
	return /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("//");
}
/**
* Proxy an incoming request to an external URL and return the upstream response.
*
* Used for external rewrites (e.g. `/ph/:path*` â†’ `https://us.i.posthog.com/:path*`).
* Next.js handles these as server-side reverse proxies, forwarding the request
* method, headers, and body to the external destination.
*
* Works in all runtimes (Node.js, Cloudflare Workers) via the standard fetch() API.
*/
async function proxyExternalRequest(request, externalUrl) {
	const originalUrl = new URL(request.url);
	const targetUrl = new URL(externalUrl);
	const destinationKeys = new Set(targetUrl.searchParams.keys());
	for (const [key, value] of originalUrl.searchParams) if (!destinationKeys.has(key)) targetUrl.searchParams.append(key, value);
	const headers = new Headers(request.headers);
	headers.set("host", targetUrl.host);
	stripHopByHopRequestHeaders(headers);
	const keysToDelete = [];
	for (const key of headers.keys()) if (key.startsWith("x-middleware-")) keysToDelete.push(key);
	for (const key of keysToDelete) headers.delete(key);
	headers.delete(VINEXT_PRERENDER_SECRET_HEADER);
	headers.delete(VINEXT_MW_CTX_HEADER);
	const method = request.method;
	const hasBody = method !== "GET" && method !== "HEAD";
	const init = {
		method,
		headers,
		redirect: "manual"
	};
	if (hasBody && request.body) {
		init.body = request.body;
		init.duplex = "half";
	}
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 3e4);
	let upstreamResponse;
	try {
		upstreamResponse = await fetch(targetUrl.href, {
			...init,
			signal: controller.signal
		});
	} catch (e) {
		if (e instanceof Error && e.name === "AbortError") {
			console.error("[vinext] External rewrite proxy timeout:", targetUrl.href);
			return new Response("Gateway Timeout", { status: 504 });
		}
		console.error("[vinext] External rewrite proxy error:", e);
		return new Response("Bad Gateway", { status: 502 });
	} finally {
		clearTimeout(timeout);
	}
	const isNodeRuntime = typeof process !== "undefined" && !!process.versions?.node;
	const responseHeaders = new Headers();
	upstreamResponse.headers.forEach((value, key) => {
		const lower = key.toLowerCase();
		if (HOP_BY_HOP_HEADERS.has(lower)) return;
		if (isNodeRuntime && (lower === "content-encoding" || lower === "content-length")) return;
		responseHeaders.append(key, value);
	});
	return new Response(upstreamResponse.body, {
		status: upstreamResponse.status,
		statusText: upstreamResponse.statusText,
		headers: responseHeaders
	});
}
/**
* Apply custom header rules from next.config.js.
* Returns an array of { key, value } pairs to set on the response.
*
* `ctx` provides the request context (cookies, headers, query, host) used
* to evaluate has/missing conditions. Next.js always has request context
* when evaluating headers, so this parameter is required.
*/
function matchHeaders(pathname, headers, ctx) {
	const result = [];
	for (const rule of headers) {
		const sourceRegex = getCachedRegex(_compiledHeaderSourceCache, rule.source, () => safeRegExp("^" + escapeHeaderSource(rule.source) + "$"));
		if (sourceRegex && sourceRegex.test(pathname)) {
			if (rule.has || rule.missing) {
				if (!checkHasConditions(rule.has, rule.missing, ctx)) continue;
			}
			result.push(...rule.headers);
		}
	}
	return result;
}
//#endregion
//#region node_modules/vinext/dist/server/request-pipeline.js
/**
* Shared request pipeline utilities.
*
* Extracted from generated entries and server hot paths to keep codegen focused
* on app shape while normal modules own request behavior. Some dev-server and
* worker-template setup code still has inline normalization that should be
* migrated in follow-up work.
*
* These utilities handle the common request lifecycle steps: protocol-
* relative URL guards, basePath stripping, trailing slash normalization,
* and CSRF origin validation.
*
* Plain-text error response builders (forbidden / not-found / etc.) live in
* `./http-error-responses.ts`.
*/
/**
* Guard against protocol-relative URL open redirects.
*
* Paths like `//example.com/` would be redirected to `//example.com` by the
* trailing-slash normalizer, which browsers interpret as `http://example.com`.
* Backslashes are equivalent to forward slashes in the URL spec
* (e.g. `/\evil.com` is treated as `//evil.com` by browsers).
*
* Next.js returns 404 for these paths. We check the RAW pathname before
* normalization so the guard fires before normalizePath collapses `//`.
*
* Percent-encoded variants are also blocked because:
*   - `%5C` decodes to `\` (browsers treat `/\evil.com` as `//evil.com`).
*   - `%2F` decodes to `/` (so `/%2F/evil.com` effectively becomes `//evil.com`).
* These forms survive segment-wise decoding that re-encodes path delimiters
* (e.g. `normalizePathnameForRouteMatchStrict`), so a later trailing-slash
* redirect would still echo the encoded form in its `Location` header. See
* `isOpenRedirectShaped` for the full list of rejected leading-segment forms.
*
* @param rawPathname - The raw pathname from the URL, before any normalization
* @returns A 404 Response if the path is protocol-relative, or null to continue
*/
function guardProtocolRelativeUrl(rawPathname) {
	if (isOpenRedirectShaped(rawPathname)) return notFoundResponse();
	return null;
}
/**
* Returns true if a request pathname looks like a protocol-relative open
* redirect, in either literal or percent-encoded form.
*
* Exported for call sites that need to replicate the guard inline (Pages
* Router worker codegen, Node production server) and for defense-in-depth
* checks inside redirect emitters.
*
* A pathname is considered "open redirect shaped" when its first segment,
* after decoding backslashes and encoded delimiters, would cause a browser
* to resolve a `Location` containing the pathname as protocol-relative:
*
*   - literal   `//evil.com`
*   - literal   `/\evil.com`             (browsers normalize `\` to `/`)
*   - encoded   `/%5Cevil.com`           (`%5C` decodes to `\` in Location)
*   - encoded   `/%2F/evil.com`          (`%2F` decodes to `/` â†’ `//`)
*   - mixed     `/%5C%2F`, `/%5C%5C`     (and other combinations)
*
* We explicitly do not require a valid percent sequence elsewhere in the
* pathname â€” we only examine the leading bytes (up to the second real or
* encoded delimiter) so malformed suffixes can still reach the normal
* "400 Bad Request" decode path instead of being masked as "404".
*/
function isOpenRedirectShaped(rawPathname) {
	if (!rawPathname.startsWith("/")) return false;
	const afterSlash = rawPathname.slice(1);
	if (afterSlash.startsWith("/") || afterSlash.startsWith("\\")) return true;
	if (afterSlash.length >= 3 && afterSlash[0] === "%") {
		const encoded = afterSlash.slice(0, 3).toLowerCase();
		if (encoded === "%5c" || encoded === "%2f") return true;
	}
	return false;
}
/**
* Apply matched next.config.js headers to a Web Headers object.
*
* Next.js evaluates config header match conditions against the original
* request snapshot. Middleware response headers still win for the same
* response key, while multi-value headers are additive.
*/
function applyConfigHeadersToResponse(responseHeaders, options) {
	const matched = matchHeaders(options.pathname, options.configHeaders, options.requestContext);
	for (const header of matched) {
		const lowerName = header.key.toLowerCase();
		if (lowerName === "vary" || lowerName === "set-cookie") responseHeaders.append(header.key, header.value);
		else if (!responseHeaders.has(lowerName)) responseHeaders.set(header.key, header.value);
	}
}
function createStaticFileSignal(pathname, context) {
	const headers = new Headers({ [VINEXT_STATIC_FILE_HEADER]: encodeURIComponent(pathname) });
	if (context.headers) for (const [key, value] of context.headers) headers.append(key, value);
	return new Response(null, {
		status: context.status ?? 200,
		headers
	});
}
/**
* Resolve the public/ filesystem-route slot in the Next.js routing order.
*
* Public files are checked after middleware and before afterFiles/fallback
* rewrites. The generated App Router entry provides the public-file set; this
* helper owns the request-method and RSC exclusions plus static-file signaling.
*/
function resolvePublicFileRoute(options) {
	if (options.request.method !== "GET" && options.request.method !== "HEAD") return null;
	if (options.pathname.endsWith(".rsc")) return null;
	if (!options.publicFiles.has(options.cleanPathname)) return null;
	return createStaticFileSignal(options.cleanPathname, options.middlewareContext);
}
/**
* Check if the pathname needs a trailing slash redirect, and return the
* redirect Response if so.
*
* Follows Next.js behavior:
* - `/api` routes are never redirected
* - The root path `/` is never redirected
* - If `trailingSlash` is true, redirect `/about` â†’ `/about/`
* - If `trailingSlash` is false (default), redirect `/about/` â†’ `/about`
*
* @param pathname - The basePath-stripped pathname
* @param basePath - The basePath to prepend to the redirect Location
* @param trailingSlash - Whether trailing slashes should be enforced
* @param search - The query string (including `?`) to preserve in the redirect
* @returns A 308 redirect Response, or null if no redirect is needed
*/
function normalizeTrailingSlash(pathname, basePath, trailingSlash, search) {
	if (pathname === "/" || pathname === "/api" || pathname.startsWith("/api/")) return null;
	if (isOpenRedirectShaped(pathname)) return notFoundResponse();
	const hasTrailing = pathname.endsWith("/");
	if (trailingSlash && !hasTrailing && !pathname.endsWith(".rsc")) return new Response(null, {
		status: 308,
		headers: { Location: basePath + pathname + "/" + search }
	});
	if (!trailingSlash && hasTrailing) return new Response(null, {
		status: 308,
		headers: { Location: basePath + removeTrailingSlash(pathname) + search }
	});
	return null;
}
/**
* Validate CSRF origin for server action requests.
*
* Matches Next.js behavior: compares the Origin header against the Host
* header. If they don't match, the request is rejected with 403 unless
* the origin is in the allowedOrigins list.
*
* @param request - The incoming Request
* @param allowedOrigins - Origins from experimental.serverActions.allowedOrigins
* @returns A 403 Response if origin validation fails, or null to continue
*/
function validateCsrfOrigin(request, allowedOrigins = []) {
	const originHeader = request.headers.get("origin");
	if (!originHeader) return null;
	if (originHeader === "null") {
		if (allowedOrigins.includes("null")) return null;
		console.warn(`[vinext] CSRF origin "null" blocked for server action. To allow requests from sandboxed contexts, add "null" to experimental.serverActions.allowedOrigins.`);
		return forbiddenResponse();
	}
	let originHost;
	try {
		originHost = new URL(originHeader).host.toLowerCase();
	} catch {
		return forbiddenResponse();
	}
	const hostHeader = (request.headers.get("host") || "").split(",")[0].trim().toLowerCase() || new URL(request.url).host.toLowerCase();
	if (originHost === hostHeader) return null;
	if (allowedOrigins.length > 0 && isOriginAllowed(originHost, allowedOrigins)) return null;
	console.warn(`[vinext] CSRF origin mismatch: origin "${originHost}" does not match host "${hostHeader}". Blocking server action request.`);
	return forbiddenResponse();
}
/**
* Reject malformed Flight container reference graphs in server action payloads.
*
* `@vitejs/plugin-rsc` vendors its own React Flight decoder. Malicious action
* payloads can abuse container references (`$Q`, `$W`, `$i`) to trigger very
* expensive deserialization before the action is even looked up.
*
* Legitimate React-encoded container payloads use separate numeric backing
* fields (e.g. field `1` plus root field `0` containing `"$Q1"`). We reject
* numeric backing-field graphs that contain missing backing fields or cycles.
* Regular user form fields are ignored entirely.
*/
async function validateServerActionPayload(body) {
	const containerRefRe = /"\$([QWi])(\d+)"/g;
	const fieldRefs = /* @__PURE__ */ new Map();
	const collectRefs = (fieldKey, text) => {
		const refs = /* @__PURE__ */ new Set();
		let match;
		containerRefRe.lastIndex = 0;
		while ((match = containerRefRe.exec(text)) !== null) refs.add(match[2]);
		fieldRefs.set(fieldKey, refs);
	};
	if (typeof body === "string") collectRefs("0", body);
	else for (const [key, value] of body.entries()) {
		if (!/^\d+$/.test(key)) continue;
		if (typeof value === "string") {
			collectRefs(key, value);
			continue;
		}
		if (typeof value?.text === "function") collectRefs(key, await value.text());
	}
	if (fieldRefs.size === 0) return null;
	const knownFields = new Set(fieldRefs.keys());
	for (const refs of fieldRefs.values()) for (const ref of refs) if (!knownFields.has(ref)) return new Response("Invalid server action payload", {
		status: 400,
		headers: { "Content-Type": "text/plain" }
	});
	const visited = /* @__PURE__ */ new Set();
	const stack = /* @__PURE__ */ new Set();
	const hasCycle = (node) => {
		if (stack.has(node)) return true;
		if (visited.has(node)) return false;
		visited.add(node);
		stack.add(node);
		for (const ref of fieldRefs.get(node) ?? []) if (hasCycle(ref)) return true;
		stack.delete(node);
		return false;
	};
	for (const node of fieldRefs.keys()) if (hasCycle(node)) return new Response("Invalid server action payload", {
		status: 400,
		headers: { "Content-Type": "text/plain" }
	});
	return null;
}
/**
* Check if an origin matches any pattern in the allowed origins list.
* Supports wildcard subdomains (e.g. `*.example.com`).
*/
/**
* Segment-by-segment domain matching for wildcard origin patterns.
* `*` matches exactly one DNS label; `**` matches one or more labels.
*
* Ported from Next.js: packages/next/src/server/app-render/csrf-protection.ts
* https://github.com/vercel/next.js/blob/canary/packages/next/src/server/app-render/csrf-protection.ts
*/
function matchWildcardDomain(domain, pattern) {
	const normalizedDomain = domain.replace(/[A-Z]/g, (c) => c.toLowerCase());
	const normalizedPattern = pattern.replace(/[A-Z]/g, (c) => c.toLowerCase());
	const domainParts = normalizedDomain.split(".");
	const patternParts = normalizedPattern.split(".");
	if (patternParts.length < 1) return false;
	if (domainParts.length < patternParts.length) return false;
	if (patternParts.length === 1 && (patternParts[0] === "*" || patternParts[0] === "**")) return false;
	while (patternParts.length) {
		const patternPart = patternParts.pop();
		const domainPart = domainParts.pop();
		if (patternPart === void 0) return false;
		switch (patternPart) {
			case "": return false;
			case "*": if (domainPart) continue;
			else return false;
			case "**":
				if (patternParts.length > 0) return false;
				return domainPart !== void 0;
			default: if (patternPart !== domainPart) return false;
		}
	}
	return domainParts.length === 0;
}
function isOriginAllowed(origin, allowed) {
	for (const pattern of allowed) if (pattern.includes("*")) {
		if (matchWildcardDomain(origin, pattern)) return true;
	} else if (origin.toLowerCase() === pattern.toLowerCase()) return true;
	return false;
}
/**
* Validate an image optimization URL parameter.
*
* Ensures the URL is a relative path that doesn't escape the origin:
* - Must start with "/" but not "//"
* - Backslashes are normalized (browsers treat `\` as `/`)
* - Origin validation as defense-in-depth
*
* @param rawUrl - The raw `url` query parameter value
* @param requestUrl - The full request URL for origin comparison
* @returns An error Response if validation fails, or the normalized image URL
*/
function validateImageUrl(rawUrl, requestUrl) {
	const imgUrl = rawUrl?.replaceAll("\\", "/") ?? null;
	if (!imgUrl || !imgUrl.startsWith("/") || imgUrl.startsWith("//")) return new Response(!rawUrl ? "Missing url parameter" : "Only relative URLs allowed", { status: 400 });
	const url = new URL(requestUrl);
	if (new URL(imgUrl, url.origin).origin !== url.origin) return new Response("Only relative URLs allowed", { status: 400 });
	return imgUrl;
}
/**
* Strip internal `x-middleware-*` headers from a Headers object.
*
* Middleware uses `x-middleware-*` headers as internal signals (e.g.
* `x-middleware-next`, `x-middleware-rewrite`, `x-middleware-request-*`).
* These must be removed before sending the response to the client.
*
* @param headers - The Headers object to modify in place
*/
function processMiddlewareHeaders(headers) {
	const keysToDelete = [];
	for (const key of headers.keys()) if (key.startsWith("x-middleware-")) keysToDelete.push(key);
	for (const key of keysToDelete) headers.delete(key);
}
/**
* Strip internal headers from an inbound request so they cannot be forged by
* an external attacker to influence routing or impersonate internal state.
*
* Must be called at every request entry point BEFORE middleware, routing,
* or any handler logic accesses the request headers.
*
* Returns a new Headers object with internal headers removed. The input
* is never mutated â€” Request.headers is immutable in Workers/miniflare
* environments (see applyMiddlewareRequestHeaders in config-matchers.ts
* for the same cloning pattern).
*
* @param headers - The source Headers (never modified)
* @returns A new Headers with INTERNAL_HEADERS removed
*/
function filterInternalHeaders(headers) {
	const filtered = new Headers();
	for (const [key, value] of headers) if (!INTERNAL_HEADERS.includes(key.toLowerCase())) filtered.append(key, value);
	return filtered;
}
function getRequestCf(request) {
	const cf = Reflect.get(request, "cf");
	return cf === void 0 ? void 0 : cf;
}
/**
* Clone a Request while overriding headers, preserving metadata when possible.
*
* Some runtimes (Workers) allow `new Request(request, { headers })` which
* retains redirect/signal/cf data. Others (Node/undici across realms) can throw
* when cloning a foreign Request instance. In that case, fall back to building
* a RequestInit with best-effort metadata.
*/
function cloneRequestWithHeaders(request, headers) {
	let cloned;
	try {
		cloned = new Request(request, { headers });
	} catch {
		const init = {
			method: request.method,
			headers,
			body: request.body ?? void 0,
			redirect: request.redirect,
			signal: request.signal,
			integrity: request.integrity,
			cache: request.cache,
			mode: request.mode,
			credentials: request.credentials,
			referrer: request.referrer,
			referrerPolicy: request.referrerPolicy
		};
		if (request.body) init.duplex = "half";
		cloned = new Request(request.url, init);
	}
	const cf = getRequestCf(request);
	if (cf !== void 0) Object.defineProperty(cloned, "cf", {
		value: cf,
		enumerable: true,
		configurable: true
	});
	return cloned;
}
//#endregion
//#region node_modules/vinext/dist/server/worker-utils.js
/**
* Shared utilities for Cloudflare Worker entries.
*
* Used by hand-written example worker entries and can be imported as
* "vinext/server/worker-utils". The generated worker entry (deploy.ts)
* inlines these functions in its template string.
*/
/**
* Merge middleware/config headers into a response.
* Response headers take precedence over middleware headers for all headers
* except Set-Cookie, which is additive (both middleware and response cookies
* are preserved). Uses getSetCookie() to preserve multiple Set-Cookie values.
* Keep this in sync with prod-server.ts and the generated copy in deploy.ts.
*/
var NO_BODY_RESPONSE_STATUSES = new Set([
	204,
	205,
	304
]);
function isVinextStreamedHtmlResponse(response) {
	return response.__vinextStreamedHtmlResponse === true;
}
function isContentLengthHeader(name) {
	return name.toLowerCase() === "content-length";
}
function cancelResponseBody(response) {
	const body = response.body;
	if (!body || body.locked) return;
	body.cancel().catch(() => {});
}
function buildHeaderRecord(response, omitNames = []) {
	const omitted = new Set(omitNames.map((name) => name.toLowerCase()));
	const headers = {};
	response.headers.forEach((value, key) => {
		if (omitted.has(key.toLowerCase()) || key === "set-cookie") return;
		headers[key] = value;
	});
	const cookies = response.headers.getSetCookie?.() ?? [];
	if (cookies.length > 0) headers["set-cookie"] = cookies;
	return headers;
}
function mergeHeaders(response, extraHeaders, statusOverride) {
	const status = statusOverride ?? response.status;
	const merged = new Headers();
	for (const [k, v] of Object.entries(extraHeaders)) {
		if (isContentLengthHeader(k)) continue;
		if (Array.isArray(v)) for (const item of v) merged.append(k, item);
		else merged.set(k, v);
	}
	response.headers.forEach((v, k) => {
		if (k === "set-cookie") return;
		merged.set(k, v);
	});
	const responseCookies = response.headers.getSetCookie?.() ?? [];
	for (const cookie of responseCookies) merged.append("set-cookie", cookie);
	const shouldDropBody = NO_BODY_RESPONSE_STATUSES.has(status);
	const shouldStripStreamLength = isVinextStreamedHtmlResponse(response) && merged.has("content-length");
	if (!Object.keys(extraHeaders).some((key) => !isContentLengthHeader(key)) && statusOverride === void 0 && !shouldDropBody && !shouldStripStreamLength) return response;
	if (shouldDropBody) {
		cancelResponseBody(response);
		merged.delete("content-encoding");
		merged.delete("content-length");
		merged.delete("content-type");
		merged.delete("transfer-encoding");
		return new Response(null, {
			status,
			statusText: status === response.status ? response.statusText : void 0,
			headers: merged
		});
	}
	if (shouldStripStreamLength) merged.delete("content-length");
	return new Response(response.body, {
		status,
		statusText: status === response.status ? response.statusText : void 0,
		headers: merged
	});
}
async function resolveStaticAssetSignal(signalResponse, options) {
	const signal = signalResponse.headers.get(VINEXT_STATIC_FILE_HEADER);
	if (!signal) return null;
	let assetPath = "/";
	try {
		assetPath = decodeURIComponent(signal);
	} catch {
		assetPath = signal;
	}
	const extraHeaders = buildHeaderRecord(signalResponse, [
		VINEXT_STATIC_FILE_HEADER,
		"content-encoding",
		"content-length",
		"content-type"
	]);
	cancelResponseBody(signalResponse);
	const assetResponse = await options.fetchAsset(assetPath);
	return mergeHeaders(assetResponse, extraHeaders, assetResponse.ok && signalResponse.status !== 200 ? signalResponse.status : void 0);
}
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/dist-rz-Bnebz.js
function tinyassert(value, message) {
	if (value) return;
	if (message instanceof Error) throw message;
	throw new TinyAssertionError(message, tinyassert);
}
var TinyAssertionError = class extends Error {
	constructor(message, stackStartFunction) {
		super(message ?? "TinyAssertionError");
		if (stackStartFunction && "captureStackTrace" in Error) Error.captureStackTrace(this, stackStartFunction);
	}
};
function safeFunctionCast(f) {
	return f;
}
function memoize(f, options) {
	const keyFn = options?.keyFn ?? ((...args) => args[0]);
	const cache = options?.cache ?? /* @__PURE__ */ new Map();
	return safeFunctionCast(function(...args) {
		const key = keyFn(...args);
		const value = cache.get(key);
		if (typeof value !== "undefined") return value;
		const newValue = f.apply(this, args);
		cache.set(key, newValue);
		return newValue;
	});
}
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/shared-BViDMJTQ.js
var SERVER_REFERENCE_PREFIX = "$$server:";
var SERVER_DECODE_CLIENT_PREFIX = "$$decode-client:";
function removeReferenceCacheTag(id) {
	return id.split("$$cache=")[0];
}
function setInternalRequire() {
	globalThis.__vite_rsc_require__ = (id) => {
		if (id.startsWith("$$server:")) {
			id = id.slice(9);
			return globalThis.__vite_rsc_server_require__(id);
		}
		return globalThis.__vite_rsc_client_require__(id);
	};
}
//#endregion
//#region node_modules/react/cjs/react.react-server.production.js
/**
* @license React
* react.react-server.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_react_server_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var ReactSharedInternals = {
		H: null,
		A: null
	};
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var isArrayImpl = Array.isArray;
	function noop() {}
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error(formatProdErrorMessage(31, "[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array));
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	function createCacheRoot() {
		return /* @__PURE__ */ new WeakMap();
	}
	function createCacheNode() {
		return {
			s: 0,
			v: void 0,
			o: null,
			p: null
		};
	}
	exports.Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
			return children;
		}
	};
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.cache = function(fn) {
		return function() {
			var dispatcher = ReactSharedInternals.A;
			if (!dispatcher) return fn.apply(null, arguments);
			var fnMap = dispatcher.getCacheForType(createCacheRoot);
			dispatcher = fnMap.get(fn);
			void 0 === dispatcher && (dispatcher = createCacheNode(), fnMap.set(fn, dispatcher));
			fnMap = 0;
			for (var l = arguments.length; fnMap < l; fnMap++) {
				var arg = arguments[fnMap];
				if ("function" === typeof arg || "object" === typeof arg && null !== arg) {
					var objectCache = dispatcher.o;
					null === objectCache && (dispatcher.o = objectCache = /* @__PURE__ */ new WeakMap());
					dispatcher = objectCache.get(arg);
					void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
				} else objectCache = dispatcher.p, null === objectCache && (dispatcher.p = objectCache = /* @__PURE__ */ new Map()), dispatcher = objectCache.get(arg), void 0 === dispatcher && (dispatcher = createCacheNode(), objectCache.set(arg, dispatcher));
			}
			if (1 === dispatcher.s) return dispatcher.v;
			if (2 === dispatcher.s) throw dispatcher.v;
			try {
				var result = fn.apply(null, arguments);
				fnMap = dispatcher;
				fnMap.s = 1;
				return fnMap.v = result;
			} catch (error) {
				throw result = dispatcher, result.s = 2, result.v = error, error;
			}
		};
	};
	exports.cacheSignal = function() {
		var dispatcher = ReactSharedInternals.A;
		return dispatcher ? dispatcher.cacheSignal() : null;
	};
	exports.captureOwnerStack = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error(formatProdErrorMessage(267, element));
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useDebugValue = function() {};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.version = "19.2.6";
}));
//#endregion
//#region node_modules/react/react.react-server.js
var require_react_react_server = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_react_server_production();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.react-server.production.js
/**
* @license React
* react-dom.react-server.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_react_server_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react_react_server();
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	};
	if (!React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error("The \"react\" package in this environment is not configured correctly. The \"react-server\" condition must be enabled in any environment that runs React Server Components.");
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.version = "19.2.6";
}));
//#endregion
//#region node_modules/react-dom/react-dom.react-server.js
var require_react_dom_react_server = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_dom_react_server_production();
}));
//#endregion
//#region node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-server.edge.production.js
var require_react_server_dom_webpack_server_edge_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	globalThis.AsyncLocalStorage = __viteRscAsyncHooks.AsyncLocalStorage;
	/**
	* @license React
	* react-server-dom-webpack-server.edge.production.js
	*
	* Copyright (c) Meta Platforms, Inc. and affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	var ReactDOM = require_react_dom_react_server(), React = require_react_react_server(), REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ASYNC_ITERATOR = Symbol.asyncIterator;
	function handleErrorInNextTick(error) {
		setTimeout(function() {
			throw error;
		});
	}
	var LocalPromise = Promise, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : function(callback) {
		LocalPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
	}, currentView = null, writtenBytes = 0;
	function writeChunkAndReturn(destination, chunk) {
		if (0 !== chunk.byteLength) if (2048 < chunk.byteLength) 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = new Uint8Array(2048), writtenBytes = 0), destination.enqueue(chunk);
		else {
			var allowableBytes = currentView.length - writtenBytes;
			allowableBytes < chunk.byteLength && (0 === allowableBytes ? destination.enqueue(currentView) : (currentView.set(chunk.subarray(0, allowableBytes), writtenBytes), destination.enqueue(currentView), chunk = chunk.subarray(allowableBytes)), currentView = new Uint8Array(2048), writtenBytes = 0);
			currentView.set(chunk, writtenBytes);
			writtenBytes += chunk.byteLength;
		}
		return !0;
	}
	var textEncoder = new TextEncoder();
	function stringToChunk(content) {
		return textEncoder.encode(content);
	}
	function byteLengthOfChunk(chunk) {
		return chunk.byteLength;
	}
	function closeWithError(destination, error) {
		"function" === typeof destination.error ? destination.error(error) : destination.close();
	}
	var CLIENT_REFERENCE_TAG$1 = Symbol.for("react.client.reference"), SERVER_REFERENCE_TAG = Symbol.for("react.server.reference");
	function registerClientReferenceImpl(proxyImplementation, id, async) {
		return Object.defineProperties(proxyImplementation, {
			$$typeof: { value: CLIENT_REFERENCE_TAG$1 },
			$$id: { value: id },
			$$async: { value: async }
		});
	}
	var FunctionBind = Function.prototype.bind, ArraySlice = Array.prototype.slice;
	function bind() {
		var newFn = FunctionBind.apply(this, arguments);
		if (this.$$typeof === SERVER_REFERENCE_TAG) {
			var args = ArraySlice.call(arguments, 1), $$typeof = { value: SERVER_REFERENCE_TAG }, $$id = { value: this.$$id };
			args = { value: this.$$bound ? this.$$bound.concat(args) : args };
			return Object.defineProperties(newFn, {
				$$typeof,
				$$id,
				$$bound: args,
				bind: {
					value: bind,
					configurable: !0
				}
			});
		}
		return newFn;
	}
	var serverReferenceToString = {
		value: function() {
			return "function () { [omitted code] }";
		},
		configurable: !0,
		writable: !0
	}, PROMISE_PROTOTYPE = Promise.prototype, deepProxyHandlers = {
		get: function(target, name) {
			switch (name) {
				case "$$typeof": return target.$$typeof;
				case "$$id": return target.$$id;
				case "$$async": return target.$$async;
				case "name": return target.name;
				case "displayName": return;
				case "defaultProps": return;
				case "_debugInfo": return;
				case "toJSON": return;
				case Symbol.toPrimitive: return Object.prototype[Symbol.toPrimitive];
				case Symbol.toStringTag: return Object.prototype[Symbol.toStringTag];
				case "Provider": throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
				case "then": throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
			}
			throw Error("Cannot access " + (String(target.name) + "." + String(name)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
		},
		set: function() {
			throw Error("Cannot assign to a client module from a server module.");
		}
	};
	function getReference(target, name) {
		switch (name) {
			case "$$typeof": return target.$$typeof;
			case "$$id": return target.$$id;
			case "$$async": return target.$$async;
			case "name": return target.name;
			case "defaultProps": return;
			case "_debugInfo": return;
			case "toJSON": return;
			case Symbol.toPrimitive: return Object.prototype[Symbol.toPrimitive];
			case Symbol.toStringTag: return Object.prototype[Symbol.toStringTag];
			case "__esModule":
				var moduleId = target.$$id;
				target.default = registerClientReferenceImpl(function() {
					throw Error("Attempted to call the default export of " + moduleId + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
				}, target.$$id + "#", target.$$async);
				return !0;
			case "then":
				if (target.then) return target.then;
				if (target.$$async) return;
				var clientReference = registerClientReferenceImpl({}, target.$$id, !0), proxy = new Proxy(clientReference, proxyHandlers$1);
				target.status = "fulfilled";
				target.value = proxy;
				return target.then = registerClientReferenceImpl(function(resolve) {
					return Promise.resolve(resolve(proxy));
				}, target.$$id + "#then", !1);
		}
		if ("symbol" === typeof name) throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
		clientReference = target[name];
		clientReference || (clientReference = registerClientReferenceImpl(function() {
			throw Error("Attempted to call " + String(name) + "() from the server but " + String(name) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
		}, target.$$id + "#" + name, target.$$async), Object.defineProperty(clientReference, "name", { value: name }), clientReference = target[name] = new Proxy(clientReference, deepProxyHandlers));
		return clientReference;
	}
	var proxyHandlers$1 = {
		get: function(target, name) {
			return getReference(target, name);
		},
		getOwnPropertyDescriptor: function(target, name) {
			var descriptor = Object.getOwnPropertyDescriptor(target, name);
			descriptor || (descriptor = {
				value: getReference(target, name),
				writable: !1,
				configurable: !1,
				enumerable: !1
			}, Object.defineProperty(target, name, descriptor));
			return descriptor;
		},
		getPrototypeOf: function() {
			return PROMISE_PROTOTYPE;
		},
		set: function() {
			throw Error("Cannot assign to a client module from a server module.");
		}
	}, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, previousDispatcher = ReactDOMSharedInternals.d;
	ReactDOMSharedInternals.d = {
		f: previousDispatcher.f,
		r: previousDispatcher.r,
		D: prefetchDNS,
		C: preconnect,
		L: preload,
		m: preloadModule$1,
		X: preinitScript,
		S: preinitStyle,
		M: preinitModuleScript
	};
	function prefetchDNS(href) {
		if ("string" === typeof href && href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "D|" + href;
				hints.has(key) || (hints.add(key), emitHint(request, "D", href));
			} else previousDispatcher.D(href);
		}
	}
	function preconnect(href, crossOrigin) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "C|" + (null == crossOrigin ? "null" : crossOrigin) + "|" + href;
				hints.has(key) || (hints.add(key), "string" === typeof crossOrigin ? emitHint(request, "C", [href, crossOrigin]) : emitHint(request, "C", href));
			} else previousDispatcher.C(href, crossOrigin);
		}
	}
	function preload(href, as, options) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "L";
				if ("image" === as && options) {
					var imageSrcSet = options.imageSrcSet, imageSizes = options.imageSizes, uniquePart = "";
					"string" === typeof imageSrcSet && "" !== imageSrcSet ? (uniquePart += "[" + imageSrcSet + "]", "string" === typeof imageSizes && (uniquePart += "[" + imageSizes + "]")) : uniquePart += "[][]" + href;
					key += "[image]" + uniquePart;
				} else key += "[" + as + "]" + href;
				hints.has(key) || (hints.add(key), (options = trimOptions(options)) ? emitHint(request, "L", [
					href,
					as,
					options
				]) : emitHint(request, "L", [href, as]));
			} else previousDispatcher.L(href, as, options);
		}
	}
	function preloadModule$1(href, options) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "m|" + href;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "m", [href, options]) : emitHint(request, "m", href);
			}
			previousDispatcher.m(href, options);
		}
	}
	function preinitStyle(href, precedence, options) {
		if ("string" === typeof href) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "S|" + href;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "S", [
					href,
					"string" === typeof precedence ? precedence : 0,
					options
				]) : "string" === typeof precedence ? emitHint(request, "S", [href, precedence]) : emitHint(request, "S", href);
			}
			previousDispatcher.S(href, precedence, options);
		}
	}
	function preinitScript(src, options) {
		if ("string" === typeof src) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "X|" + src;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "X", [src, options]) : emitHint(request, "X", src);
			}
			previousDispatcher.X(src, options);
		}
	}
	function preinitModuleScript(src, options) {
		if ("string" === typeof src) {
			var request = resolveRequest();
			if (request) {
				var hints = request.hints, key = "M|" + src;
				if (hints.has(key)) return;
				hints.add(key);
				return (options = trimOptions(options)) ? emitHint(request, "M", [src, options]) : emitHint(request, "M", src);
			}
			previousDispatcher.M(src, options);
		}
	}
	function trimOptions(options) {
		if (null == options) return null;
		var hasProperties = !1, trimmed = {}, key;
		for (key in options) null != options[key] && (hasProperties = !0, trimmed[key] = options[key]);
		return hasProperties ? trimmed : null;
	}
	function getChildFormatContext(parentContext, type, props) {
		switch (type) {
			case "img":
				type = props.src;
				var srcSet = props.srcSet;
				if (!("lazy" === props.loading || !type && !srcSet || "string" !== typeof type && null != type || "string" !== typeof srcSet && null != srcSet || "low" === props.fetchPriority || parentContext & 3) && ("string" !== typeof type || ":" !== type[4] || "d" !== type[0] && "D" !== type[0] || "a" !== type[1] && "A" !== type[1] || "t" !== type[2] && "T" !== type[2] || "a" !== type[3] && "A" !== type[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
					var sizes = "string" === typeof props.sizes ? props.sizes : void 0;
					var input = props.crossOrigin;
					preload(type || "", "image", {
						imageSrcSet: srcSet,
						imageSizes: sizes,
						crossOrigin: "string" === typeof input ? "use-credentials" === input ? input : "" : void 0,
						integrity: props.integrity,
						type: props.type,
						fetchPriority: props.fetchPriority,
						referrerPolicy: props.referrerPolicy
					});
				}
				return parentContext;
			case "link":
				type = props.rel;
				srcSet = props.href;
				if (!(parentContext & 1 || null != props.itemProp || "string" !== typeof type || "string" !== typeof srcSet || "" === srcSet)) switch (type) {
					case "preload":
						preload(srcSet, props.as, {
							crossOrigin: props.crossOrigin,
							integrity: props.integrity,
							nonce: props.nonce,
							type: props.type,
							fetchPriority: props.fetchPriority,
							referrerPolicy: props.referrerPolicy,
							imageSrcSet: props.imageSrcSet,
							imageSizes: props.imageSizes,
							media: props.media
						});
						break;
					case "modulepreload":
						preloadModule$1(srcSet, {
							as: props.as,
							crossOrigin: props.crossOrigin,
							integrity: props.integrity,
							nonce: props.nonce
						});
						break;
					case "stylesheet": preload(srcSet, "stylesheet", {
						crossOrigin: props.crossOrigin,
						integrity: props.integrity,
						nonce: props.nonce,
						type: props.type,
						fetchPriority: props.fetchPriority,
						referrerPolicy: props.referrerPolicy,
						media: props.media
					});
				}
				return parentContext;
			case "picture": return parentContext | 2;
			case "noscript": return parentContext | 1;
			default: return parentContext;
		}
	}
	var supportsRequestStorage = "function" === typeof AsyncLocalStorage, requestStorage = supportsRequestStorage ? new AsyncLocalStorage() : null, TEMPORARY_REFERENCE_TAG = Symbol.for("react.temporary.reference"), proxyHandlers = {
		get: function(target, name) {
			switch (name) {
				case "$$typeof": return target.$$typeof;
				case "name": return;
				case "displayName": return;
				case "defaultProps": return;
				case "_debugInfo": return;
				case "toJSON": return;
				case Symbol.toPrimitive: return Object.prototype[Symbol.toPrimitive];
				case Symbol.toStringTag: return Object.prototype[Symbol.toStringTag];
				case "Provider": throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
				case "then": return;
			}
			throw Error("Cannot access " + String(name) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
		},
		set: function() {
			throw Error("Cannot assign to a temporary client reference from a server module.");
		}
	};
	function createTemporaryReference(temporaryReferences, id) {
		var reference = Object.defineProperties(function() {
			throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
		}, { $$typeof: { value: TEMPORARY_REFERENCE_TAG } });
		reference = new Proxy(reference, proxyHandlers);
		temporaryReferences.set(reference, id);
		return reference;
	}
	function noop() {}
	var SuspenseException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
	function trackUsedThenable(thenableState, thenable, index) {
		index = thenableState[index];
		void 0 === index ? thenableState.push(thenable) : index !== thenable && (thenable.then(noop, noop), thenable = index);
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default:
				"string" === typeof thenable.status ? thenable.then(noop, noop) : (thenableState = thenable, thenableState.status = "pending", thenableState.then(function(fulfilledValue) {
					if ("pending" === thenable.status) {
						var fulfilledThenable = thenable;
						fulfilledThenable.status = "fulfilled";
						fulfilledThenable.value = fulfilledValue;
					}
				}, function(error) {
					if ("pending" === thenable.status) {
						var rejectedThenable = thenable;
						rejectedThenable.status = "rejected";
						rejectedThenable.reason = error;
					}
				}));
				switch (thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenable.reason;
				}
				suspendedThenable = thenable;
				throw SuspenseException;
		}
	}
	var suspendedThenable = null;
	function getSuspendedThenable() {
		if (null === suspendedThenable) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
		var thenable = suspendedThenable;
		suspendedThenable = null;
		return thenable;
	}
	var currentRequest$1 = null, thenableIndexCounter = 0, thenableState = null;
	function getThenableStateAfterSuspending() {
		var state = thenableState || [];
		thenableState = null;
		return state;
	}
	var HooksDispatcher = {
		readContext: unsupportedContext,
		use,
		useCallback: function(callback) {
			return callback;
		},
		useContext: unsupportedContext,
		useEffect: unsupportedHook,
		useImperativeHandle: unsupportedHook,
		useLayoutEffect: unsupportedHook,
		useInsertionEffect: unsupportedHook,
		useMemo: function(nextCreate) {
			return nextCreate();
		},
		useReducer: unsupportedHook,
		useRef: unsupportedHook,
		useState: unsupportedHook,
		useDebugValue: function() {},
		useDeferredValue: unsupportedHook,
		useTransition: unsupportedHook,
		useSyncExternalStore: unsupportedHook,
		useId,
		useHostTransitionStatus: unsupportedHook,
		useFormState: unsupportedHook,
		useActionState: unsupportedHook,
		useOptimistic: unsupportedHook,
		useMemoCache: function(size) {
			for (var data = Array(size), i = 0; i < size; i++) data[i] = REACT_MEMO_CACHE_SENTINEL;
			return data;
		},
		useCacheRefresh: function() {
			return unsupportedRefresh;
		}
	};
	HooksDispatcher.useEffectEvent = unsupportedHook;
	function unsupportedHook() {
		throw Error("This Hook is not supported in Server Components.");
	}
	function unsupportedRefresh() {
		throw Error("Refreshing the cache is not supported in Server Components.");
	}
	function unsupportedContext() {
		throw Error("Cannot read a Client Context from a Server Component.");
	}
	function useId() {
		if (null === currentRequest$1) throw Error("useId can only be used while React is rendering");
		var id = currentRequest$1.identifierCount++;
		return "_" + currentRequest$1.identifierPrefix + "S_" + id.toString(32) + "_";
	}
	function use(usable) {
		if (null !== usable && "object" === typeof usable || "function" === typeof usable) {
			if ("function" === typeof usable.then) {
				var index = thenableIndexCounter;
				thenableIndexCounter += 1;
				null === thenableState && (thenableState = []);
				return trackUsedThenable(thenableState, usable, index);
			}
			usable.$$typeof === REACT_CONTEXT_TYPE && unsupportedContext();
		}
		if (usable.$$typeof === CLIENT_REFERENCE_TAG$1) {
			if (null != usable.value && usable.value.$$typeof === REACT_CONTEXT_TYPE) throw Error("Cannot read a Client Context from a Server Component.");
			throw Error("Cannot use() an already resolved Client Reference.");
		}
		throw Error("An unsupported type was passed to use(): " + String(usable));
	}
	var DefaultAsyncDispatcher = {
		getCacheForType: function(resourceType) {
			var JSCompiler_inline_result = (JSCompiler_inline_result = resolveRequest()) ? JSCompiler_inline_result.cache : /* @__PURE__ */ new Map();
			var entry = JSCompiler_inline_result.get(resourceType);
			void 0 === entry && (entry = resourceType(), JSCompiler_inline_result.set(resourceType, entry));
			return entry;
		},
		cacheSignal: function() {
			var request = resolveRequest();
			return request ? request.cacheController.signal : null;
		}
	}, ReactSharedInternalsServer = React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	if (!ReactSharedInternalsServer) throw Error("The \"react\" package in this environment is not configured correctly. The \"react-server\" condition must be enabled in any environment that runs React Server Components.");
	var isArrayImpl = Array.isArray, getPrototypeOf = Object.getPrototypeOf;
	function objectName(object) {
		object = Object.prototype.toString.call(object);
		return object.slice(8, object.length - 1);
	}
	function describeValueForErrorMessage(value) {
		switch (typeof value) {
			case "string": return JSON.stringify(10 >= value.length ? value : value.slice(0, 10) + "...");
			case "object":
				if (isArrayImpl(value)) return "[...]";
				if (null !== value && value.$$typeof === CLIENT_REFERENCE_TAG) return "client";
				value = objectName(value);
				return "Object" === value ? "{...}" : value;
			case "function": return value.$$typeof === CLIENT_REFERENCE_TAG ? "client" : (value = value.displayName || value.name) ? "function " + value : "function";
			default: return String(value);
		}
	}
	function describeElementType(type) {
		if ("string" === typeof type) return type;
		switch (type) {
			case REACT_SUSPENSE_TYPE: return "Suspense";
			case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
		}
		if ("object" === typeof type) switch (type.$$typeof) {
			case REACT_FORWARD_REF_TYPE: return describeElementType(type.render);
			case REACT_MEMO_TYPE: return describeElementType(type.type);
			case REACT_LAZY_TYPE:
				var payload = type._payload;
				type = type._init;
				try {
					return describeElementType(type(payload));
				} catch (x) {}
		}
		return "";
	}
	var CLIENT_REFERENCE_TAG = Symbol.for("react.client.reference");
	function describeObjectForErrorMessage(objectOrArray, expandedName) {
		var objKind = objectName(objectOrArray);
		if ("Object" !== objKind && "Array" !== objKind) return objKind;
		objKind = -1;
		var length = 0;
		if (isArrayImpl(objectOrArray)) {
			var str = "[";
			for (var i = 0; i < objectOrArray.length; i++) {
				0 < i && (str += ", ");
				var value = objectOrArray[i];
				value = "object" === typeof value && null !== value ? describeObjectForErrorMessage(value) : describeValueForErrorMessage(value);
				"" + i === expandedName ? (objKind = str.length, length = value.length, str += value) : str = 10 > value.length && 40 > str.length + value.length ? str + value : str + "...";
			}
			str += "]";
		} else if (objectOrArray.$$typeof === REACT_ELEMENT_TYPE) str = "<" + describeElementType(objectOrArray.type) + "/>";
		else {
			if (objectOrArray.$$typeof === CLIENT_REFERENCE_TAG) return "client";
			str = "{";
			i = Object.keys(objectOrArray);
			for (value = 0; value < i.length; value++) {
				0 < value && (str += ", ");
				var name = i[value], encodedKey = JSON.stringify(name);
				str += ("\"" + name + "\"" === encodedKey ? name : encodedKey) + ": ";
				encodedKey = objectOrArray[name];
				encodedKey = "object" === typeof encodedKey && null !== encodedKey ? describeObjectForErrorMessage(encodedKey) : describeValueForErrorMessage(encodedKey);
				name === expandedName ? (objKind = str.length, length = encodedKey.length, str += encodedKey) : str = 10 > encodedKey.length && 40 > str.length + encodedKey.length ? str + encodedKey : str + "...";
			}
			str += "}";
		}
		return void 0 === expandedName ? str : -1 < objKind && 0 < length ? (objectOrArray = " ".repeat(objKind) + "^".repeat(length), "\n  " + str + "\n  " + objectOrArray) : "\n  " + str;
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty, ObjectPrototype$1 = Object.prototype, stringify = JSON.stringify;
	function defaultErrorHandler(error) {
		console.error(error);
	}
	function RequestInstance(type, model, bundlerConfig, onError, onPostpone, onAllReady, onFatalError, identifierPrefix, temporaryReferences) {
		if (null !== ReactSharedInternalsServer.A && ReactSharedInternalsServer.A !== DefaultAsyncDispatcher) throw Error("Currently React only supports one RSC renderer at a time.");
		ReactSharedInternalsServer.A = DefaultAsyncDispatcher;
		var abortSet = /* @__PURE__ */ new Set(), pingedTasks = [], hints = /* @__PURE__ */ new Set();
		this.type = type;
		this.status = 10;
		this.flushScheduled = !1;
		this.destination = this.fatalError = null;
		this.bundlerConfig = bundlerConfig;
		this.cache = /* @__PURE__ */ new Map();
		this.cacheController = new AbortController();
		this.pendingChunks = this.nextChunkId = 0;
		this.hints = hints;
		this.abortableTasks = abortSet;
		this.pingedTasks = pingedTasks;
		this.completedImportChunks = [];
		this.completedHintChunks = [];
		this.completedRegularChunks = [];
		this.completedErrorChunks = [];
		this.writtenSymbols = /* @__PURE__ */ new Map();
		this.writtenClientReferences = /* @__PURE__ */ new Map();
		this.writtenServerReferences = /* @__PURE__ */ new Map();
		this.writtenObjects = /* @__PURE__ */ new WeakMap();
		this.temporaryReferences = temporaryReferences;
		this.identifierPrefix = identifierPrefix || "";
		this.identifierCount = 1;
		this.taintCleanupQueue = [];
		this.onError = void 0 === onError ? defaultErrorHandler : onError;
		this.onPostpone = void 0 === onPostpone ? noop : onPostpone;
		this.onAllReady = onAllReady;
		this.onFatalError = onFatalError;
		type = createTask(this, model, null, !1, 0, abortSet);
		pingedTasks.push(type);
	}
	var currentRequest = null;
	function resolveRequest() {
		if (currentRequest) return currentRequest;
		if (supportsRequestStorage) {
			var store = requestStorage.getStore();
			if (store) return store;
		}
		return null;
	}
	function serializeThenable(request, task, thenable) {
		var newTask = createTask(request, thenable, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		switch (thenable.status) {
			case "fulfilled": return newTask.model = thenable.value, pingTask(request, newTask), newTask.id;
			case "rejected": return erroredTask(request, newTask, thenable.reason), newTask.id;
			default:
				if (12 === request.status) return request.abortableTasks.delete(newTask), 21 === request.type ? (haltTask(newTask), finishHaltedTask(newTask, request)) : (task = request.fatalError, abortTask(newTask), finishAbortedTask(newTask, request, task)), newTask.id;
				"string" !== typeof thenable.status && (thenable.status = "pending", thenable.then(function(fulfilledValue) {
					"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
				}, function(error) {
					"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
				}));
		}
		thenable.then(function(value) {
			newTask.model = value;
			pingTask(request, newTask);
		}, function(reason) {
			0 === newTask.status && (erroredTask(request, newTask, reason), enqueueFlush(request));
		});
		return newTask.id;
	}
	function serializeReadableStream(request, task, stream) {
		function progress(entry) {
			if (0 === streamTask.status) if (entry.done) streamTask.status = 1, entry = streamTask.id.toString(16) + ":C\n", request.completedRegularChunks.push(stringToChunk(entry)), request.abortableTasks.delete(streamTask), request.cacheController.signal.removeEventListener("abort", abortStream), enqueueFlush(request), callOnAllReadyIfReady(request);
			else try {
				streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), reader.read().then(progress, error);
			} catch (x$11) {
				error(x$11);
			}
		}
		function error(reason) {
			0 === streamTask.status && (request.cacheController.signal.removeEventListener("abort", abortStream), erroredTask(request, streamTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
		}
		function abortStream() {
			if (0 === streamTask.status) {
				var signal = request.cacheController.signal;
				signal.removeEventListener("abort", abortStream);
				signal = signal.reason;
				21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal), enqueueFlush(request));
				reader.cancel(signal).then(error, error);
			}
		}
		var supportsBYOB = stream.supportsBYOB;
		if (void 0 === supportsBYOB) try {
			stream.getReader({ mode: "byob" }).releaseLock(), supportsBYOB = !0;
		} catch (x) {
			supportsBYOB = !1;
		}
		var reader = stream.getReader(), streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		request.pendingChunks++;
		task = streamTask.id.toString(16) + ":" + (supportsBYOB ? "r" : "R") + "\n";
		request.completedRegularChunks.push(stringToChunk(task));
		request.cacheController.signal.addEventListener("abort", abortStream);
		reader.read().then(progress, error);
		return serializeByValueID(streamTask.id);
	}
	function serializeAsyncIterable(request, task, iterable, iterator) {
		function progress(entry) {
			if (0 === streamTask.status) if (entry.done) {
				streamTask.status = 1;
				if (void 0 === entry.value) var endStreamRow = streamTask.id.toString(16) + ":C\n";
				else try {
					var chunkId = outlineModelWithFormatContext(request, entry.value, 0);
					endStreamRow = streamTask.id.toString(16) + ":C" + stringify(serializeByValueID(chunkId)) + "\n";
				} catch (x) {
					error(x);
					return;
				}
				request.completedRegularChunks.push(stringToChunk(endStreamRow));
				request.abortableTasks.delete(streamTask);
				request.cacheController.signal.removeEventListener("abort", abortIterable);
				enqueueFlush(request);
				callOnAllReadyIfReady(request);
			} else try {
				streamTask.model = entry.value, request.pendingChunks++, tryStreamTask(request, streamTask), enqueueFlush(request), iterator.next().then(progress, error);
			} catch (x$12) {
				error(x$12);
			}
		}
		function error(reason) {
			0 === streamTask.status && (request.cacheController.signal.removeEventListener("abort", abortIterable), erroredTask(request, streamTask, reason), enqueueFlush(request), "function" === typeof iterator.throw && iterator.throw(reason).then(error, error));
		}
		function abortIterable() {
			if (0 === streamTask.status) {
				var signal = request.cacheController.signal;
				signal.removeEventListener("abort", abortIterable);
				var reason = signal.reason;
				21 === request.type ? (request.abortableTasks.delete(streamTask), haltTask(streamTask), finishHaltedTask(streamTask, request)) : (erroredTask(request, streamTask, signal.reason), enqueueFlush(request));
				"function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
			}
		}
		iterable = iterable === iterator;
		var streamTask = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		request.pendingChunks++;
		task = streamTask.id.toString(16) + ":" + (iterable ? "x" : "X") + "\n";
		request.completedRegularChunks.push(stringToChunk(task));
		request.cacheController.signal.addEventListener("abort", abortIterable);
		iterator.next().then(progress, error);
		return serializeByValueID(streamTask.id);
	}
	function emitHint(request, code, model) {
		model = stringify(model);
		code = stringToChunk(":H" + code + model + "\n");
		request.completedHintChunks.push(code);
		enqueueFlush(request);
	}
	function readThenable(thenable) {
		if ("fulfilled" === thenable.status) return thenable.value;
		if ("rejected" === thenable.status) throw thenable.reason;
		throw thenable;
	}
	function createLazyWrapperAroundWakeable(request, task, wakeable) {
		switch (wakeable.status) {
			case "fulfilled": return wakeable.value;
			case "rejected": break;
			default: "string" !== typeof wakeable.status && (wakeable.status = "pending", wakeable.then(function(fulfilledValue) {
				"pending" === wakeable.status && (wakeable.status = "fulfilled", wakeable.value = fulfilledValue);
			}, function(error) {
				"pending" === wakeable.status && (wakeable.status = "rejected", wakeable.reason = error);
			}));
		}
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: wakeable,
			_init: readThenable
		};
	}
	function voidHandler() {}
	function processServerComponentReturnValue(request, task, Component, result) {
		if ("object" !== typeof result || null === result || result.$$typeof === CLIENT_REFERENCE_TAG$1) return result;
		if ("function" === typeof result.then) return createLazyWrapperAroundWakeable(request, task, result);
		var iteratorFn = getIteratorFn(result);
		return iteratorFn ? (request = {}, request[Symbol.iterator] = function() {
			return iteratorFn.call(result);
		}, request) : "function" !== typeof result[ASYNC_ITERATOR] || "function" === typeof ReadableStream && result instanceof ReadableStream ? result : (request = {}, request[ASYNC_ITERATOR] = function() {
			return result[ASYNC_ITERATOR]();
		}, request);
	}
	function renderFunctionComponent(request, task, key, Component, props) {
		var prevThenableState = task.thenableState;
		task.thenableState = null;
		thenableIndexCounter = 0;
		thenableState = prevThenableState;
		props = Component(props, void 0);
		if (12 === request.status) throw "object" === typeof props && null !== props && "function" === typeof props.then && props.$$typeof !== CLIENT_REFERENCE_TAG$1 && props.then(voidHandler, voidHandler), null;
		props = processServerComponentReturnValue(request, task, Component, props);
		Component = task.keyPath;
		prevThenableState = task.implicitSlot;
		null !== key ? task.keyPath = null === Component ? key : Component + "," + key : null === Component && (task.implicitSlot = !0);
		request = renderModelDestructive(request, task, emptyRoot, "", props);
		task.keyPath = Component;
		task.implicitSlot = prevThenableState;
		return request;
	}
	function renderFragment(request, task, children) {
		return null !== task.keyPath ? (request = [
			REACT_ELEMENT_TYPE,
			REACT_FRAGMENT_TYPE,
			task.keyPath,
			{ children }
		], task.implicitSlot ? [request] : request) : children;
	}
	var serializedSize = 0;
	function deferTask(request, task) {
		task = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
		pingTask(request, task);
		return serializeLazyID(task.id);
	}
	function renderElement(request, task, type, key, ref, props) {
		if (null !== ref && void 0 !== ref) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
		if ("function" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1 && type.$$typeof !== TEMPORARY_REFERENCE_TAG) return renderFunctionComponent(request, task, key, type, props);
		if (type === REACT_FRAGMENT_TYPE && null === key) return type = task.implicitSlot, null === task.keyPath && (task.implicitSlot = !0), props = renderModelDestructive(request, task, emptyRoot, "", props.children), task.implicitSlot = type, props;
		if (null != type && "object" === typeof type && type.$$typeof !== CLIENT_REFERENCE_TAG$1) switch (type.$$typeof) {
			case REACT_LAZY_TYPE:
				var init = type._init;
				type = init(type._payload);
				if (12 === request.status) throw null;
				return renderElement(request, task, type, key, ref, props);
			case REACT_FORWARD_REF_TYPE: return renderFunctionComponent(request, task, key, type.render, props);
			case REACT_MEMO_TYPE: return renderElement(request, task, type.type, key, ref, props);
		}
		else "string" === typeof type && (ref = task.formatContext, init = getChildFormatContext(ref, type, props), ref !== init && null != props.children && outlineModelWithFormatContext(request, props.children, init));
		request = key;
		key = task.keyPath;
		null === request ? request = key : null !== key && (request = key + "," + request);
		props = [
			REACT_ELEMENT_TYPE,
			type,
			request,
			props
		];
		task = task.implicitSlot && null !== request ? [props] : props;
		return task;
	}
	function pingTask(request, task) {
		var pingedTasks = request.pingedTasks;
		pingedTasks.push(task);
		1 === pingedTasks.length && (request.flushScheduled = null !== request.destination, 21 === request.type || 10 === request.status ? scheduleMicrotask(function() {
			return performWork(request);
		}) : setTimeout(function() {
			return performWork(request);
		}, 0));
	}
	function createTask(request, model, keyPath, implicitSlot, formatContext, abortSet) {
		request.pendingChunks++;
		var id = request.nextChunkId++;
		"object" !== typeof model || null === model || null !== keyPath || implicitSlot || request.writtenObjects.set(model, serializeByValueID(id));
		var task = {
			id,
			status: 0,
			model,
			keyPath,
			implicitSlot,
			formatContext,
			ping: function() {
				return pingTask(request, task);
			},
			toJSON: function(parentPropertyName, value) {
				serializedSize += parentPropertyName.length;
				var prevKeyPath = task.keyPath, prevImplicitSlot = task.implicitSlot;
				try {
					var JSCompiler_inline_result = renderModelDestructive(request, task, this, parentPropertyName, value);
				} catch (thrownValue) {
					if (parentPropertyName = task.model, parentPropertyName = "object" === typeof parentPropertyName && null !== parentPropertyName && (parentPropertyName.$$typeof === REACT_ELEMENT_TYPE || parentPropertyName.$$typeof === REACT_LAZY_TYPE), 12 === request.status) task.status = 3, 21 === request.type ? (prevKeyPath = request.nextChunkId++, prevKeyPath = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath), JSCompiler_inline_result = prevKeyPath) : (prevKeyPath = request.fatalError, JSCompiler_inline_result = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath));
					else if (value = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, "object" === typeof value && null !== value && "function" === typeof value.then) {
						JSCompiler_inline_result = createTask(request, task.model, task.keyPath, task.implicitSlot, task.formatContext, request.abortableTasks);
						var ping = JSCompiler_inline_result.ping;
						value.then(ping, ping);
						JSCompiler_inline_result.thenableState = getThenableStateAfterSuspending();
						task.keyPath = prevKeyPath;
						task.implicitSlot = prevImplicitSlot;
						JSCompiler_inline_result = parentPropertyName ? serializeLazyID(JSCompiler_inline_result.id) : serializeByValueID(JSCompiler_inline_result.id);
					} else task.keyPath = prevKeyPath, task.implicitSlot = prevImplicitSlot, request.pendingChunks++, prevKeyPath = request.nextChunkId++, prevImplicitSlot = logRecoverableError(request, value, task), emitErrorChunk(request, prevKeyPath, prevImplicitSlot), JSCompiler_inline_result = parentPropertyName ? serializeLazyID(prevKeyPath) : serializeByValueID(prevKeyPath);
				}
				return JSCompiler_inline_result;
			},
			thenableState: null
		};
		abortSet.add(task);
		return task;
	}
	function serializeByValueID(id) {
		return "$" + id.toString(16);
	}
	function serializeLazyID(id) {
		return "$L" + id.toString(16);
	}
	function encodeReferenceChunk(request, id, reference) {
		request = stringify(reference);
		id = id.toString(16) + ":" + request + "\n";
		return stringToChunk(id);
	}
	function serializeClientReference(request, parent, parentPropertyName, clientReference) {
		var clientReferenceKey = clientReference.$$async ? clientReference.$$id + "#async" : clientReference.$$id, writtenClientReferences = request.writtenClientReferences, existingId = writtenClientReferences.get(clientReferenceKey);
		if (void 0 !== existingId) return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(existingId) : serializeByValueID(existingId);
		try {
			var config = request.bundlerConfig, modulePath = clientReference.$$id;
			existingId = "";
			var resolvedModuleData = config[modulePath];
			if (resolvedModuleData) existingId = resolvedModuleData.name;
			else {
				var idx = modulePath.lastIndexOf("#");
				-1 !== idx && (existingId = modulePath.slice(idx + 1), resolvedModuleData = config[modulePath.slice(0, idx)]);
				if (!resolvedModuleData) throw Error("Could not find the module \"" + modulePath + "\" in the React Client Manifest. This is probably a bug in the React Server Components bundler.");
			}
			if (!0 === resolvedModuleData.async && !0 === clientReference.$$async) throw Error("The module \"" + modulePath + "\" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.");
			var JSCompiler_inline_result = !0 === resolvedModuleData.async || !0 === clientReference.$$async ? [
				resolvedModuleData.id,
				resolvedModuleData.chunks,
				existingId,
				1
			] : [
				resolvedModuleData.id,
				resolvedModuleData.chunks,
				existingId
			];
			request.pendingChunks++;
			var importId = request.nextChunkId++, json = stringify(JSCompiler_inline_result), processedChunk = stringToChunk(importId.toString(16) + ":I" + json + "\n");
			request.completedImportChunks.push(processedChunk);
			writtenClientReferences.set(clientReferenceKey, importId);
			return parent[0] === REACT_ELEMENT_TYPE && "1" === parentPropertyName ? serializeLazyID(importId) : serializeByValueID(importId);
		} catch (x) {
			return request.pendingChunks++, parent = request.nextChunkId++, parentPropertyName = logRecoverableError(request, x, null), emitErrorChunk(request, parent, parentPropertyName), serializeByValueID(parent);
		}
	}
	function outlineModelWithFormatContext(request, value, formatContext) {
		value = createTask(request, value, null, !1, formatContext, request.abortableTasks);
		retryTask(request, value);
		return value.id;
	}
	function serializeTypedArray(request, tag, typedArray) {
		request.pendingChunks++;
		var bufferId = request.nextChunkId++;
		emitTypedArrayChunk(request, bufferId, tag, typedArray, !1);
		return serializeByValueID(bufferId);
	}
	function serializeBlob(request, blob) {
		function progress(entry) {
			if (0 === newTask.status) if (entry.done) request.cacheController.signal.removeEventListener("abort", abortBlob), pingTask(request, newTask);
			else return model.push(entry.value), reader.read().then(progress).catch(error);
		}
		function error(reason) {
			0 === newTask.status && (request.cacheController.signal.removeEventListener("abort", abortBlob), erroredTask(request, newTask, reason), enqueueFlush(request), reader.cancel(reason).then(error, error));
		}
		function abortBlob() {
			if (0 === newTask.status) {
				var signal = request.cacheController.signal;
				signal.removeEventListener("abort", abortBlob);
				signal = signal.reason;
				21 === request.type ? (request.abortableTasks.delete(newTask), haltTask(newTask), finishHaltedTask(newTask, request)) : (erroredTask(request, newTask, signal), enqueueFlush(request));
				reader.cancel(signal).then(error, error);
			}
		}
		var model = [blob.type], newTask = createTask(request, model, null, !1, 0, request.abortableTasks), reader = blob.stream().getReader();
		request.cacheController.signal.addEventListener("abort", abortBlob);
		reader.read().then(progress).catch(error);
		return "$B" + newTask.id.toString(16);
	}
	var modelRoot = !1;
	function renderModelDestructive(request, task, parent, parentPropertyName, value) {
		task.model = value;
		if (value === REACT_ELEMENT_TYPE) return "$";
		if (null === value) return null;
		if ("object" === typeof value) {
			switch (value.$$typeof) {
				case REACT_ELEMENT_TYPE:
					var elementReference = null, writtenObjects = request.writtenObjects;
					if (null === task.keyPath && !task.implicitSlot) {
						var existingReference = writtenObjects.get(value);
						if (void 0 !== existingReference) if (modelRoot === value) modelRoot = null;
						else return existingReference;
						else -1 === parentPropertyName.indexOf(":") && (parent = writtenObjects.get(parent), void 0 !== parent && (elementReference = parent + ":" + parentPropertyName, writtenObjects.set(value, elementReference)));
					}
					if (3200 < serializedSize) return deferTask(request, task);
					parentPropertyName = value.props;
					parent = parentPropertyName.ref;
					request = renderElement(request, task, value.type, value.key, void 0 !== parent ? parent : null, parentPropertyName);
					"object" === typeof request && null !== request && null !== elementReference && (writtenObjects.has(request) || writtenObjects.set(request, elementReference));
					return request;
				case REACT_LAZY_TYPE:
					if (3200 < serializedSize) return deferTask(request, task);
					task.thenableState = null;
					parentPropertyName = value._init;
					value = parentPropertyName(value._payload);
					if (12 === request.status) throw null;
					return renderModelDestructive(request, task, emptyRoot, "", value);
				case REACT_LEGACY_ELEMENT_TYPE: throw Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.");
			}
			if (value.$$typeof === CLIENT_REFERENCE_TAG$1) return serializeClientReference(request, parent, parentPropertyName, value);
			if (void 0 !== request.temporaryReferences && (elementReference = request.temporaryReferences.get(value), void 0 !== elementReference)) return "$T" + elementReference;
			elementReference = request.writtenObjects;
			writtenObjects = elementReference.get(value);
			if ("function" === typeof value.then) {
				if (void 0 !== writtenObjects) {
					if (null !== task.keyPath || task.implicitSlot) return "$@" + serializeThenable(request, task, value).toString(16);
					if (modelRoot === value) modelRoot = null;
					else return writtenObjects;
				}
				request = "$@" + serializeThenable(request, task, value).toString(16);
				elementReference.set(value, request);
				return request;
			}
			if (void 0 !== writtenObjects) if (modelRoot === value) {
				if (writtenObjects !== serializeByValueID(task.id)) return writtenObjects;
				modelRoot = null;
			} else return writtenObjects;
			else if (-1 === parentPropertyName.indexOf(":") && (writtenObjects = elementReference.get(parent), void 0 !== writtenObjects)) {
				existingReference = parentPropertyName;
				if (isArrayImpl(parent) && parent[0] === REACT_ELEMENT_TYPE) switch (parentPropertyName) {
					case "1":
						existingReference = "type";
						break;
					case "2":
						existingReference = "key";
						break;
					case "3":
						existingReference = "props";
						break;
					case "4": existingReference = "_owner";
				}
				elementReference.set(value, writtenObjects + ":" + existingReference);
			}
			if (isArrayImpl(value)) return renderFragment(request, task, value);
			if (value instanceof Map) return value = Array.from(value), "$Q" + outlineModelWithFormatContext(request, value, 0).toString(16);
			if (value instanceof Set) return value = Array.from(value), "$W" + outlineModelWithFormatContext(request, value, 0).toString(16);
			if ("function" === typeof FormData && value instanceof FormData) return value = Array.from(value.entries()), "$K" + outlineModelWithFormatContext(request, value, 0).toString(16);
			if (value instanceof Error) return "$Z";
			if (value instanceof ArrayBuffer) return serializeTypedArray(request, "A", new Uint8Array(value));
			if (value instanceof Int8Array) return serializeTypedArray(request, "O", value);
			if (value instanceof Uint8Array) return serializeTypedArray(request, "o", value);
			if (value instanceof Uint8ClampedArray) return serializeTypedArray(request, "U", value);
			if (value instanceof Int16Array) return serializeTypedArray(request, "S", value);
			if (value instanceof Uint16Array) return serializeTypedArray(request, "s", value);
			if (value instanceof Int32Array) return serializeTypedArray(request, "L", value);
			if (value instanceof Uint32Array) return serializeTypedArray(request, "l", value);
			if (value instanceof Float32Array) return serializeTypedArray(request, "G", value);
			if (value instanceof Float64Array) return serializeTypedArray(request, "g", value);
			if (value instanceof BigInt64Array) return serializeTypedArray(request, "M", value);
			if (value instanceof BigUint64Array) return serializeTypedArray(request, "m", value);
			if (value instanceof DataView) return serializeTypedArray(request, "V", value);
			if ("function" === typeof Blob && value instanceof Blob) return serializeBlob(request, value);
			if (elementReference = getIteratorFn(value)) return parentPropertyName = elementReference.call(value), parentPropertyName === value ? (value = Array.from(parentPropertyName), "$i" + outlineModelWithFormatContext(request, value, 0).toString(16)) : renderFragment(request, task, Array.from(parentPropertyName));
			if ("function" === typeof ReadableStream && value instanceof ReadableStream) return serializeReadableStream(request, task, value);
			elementReference = value[ASYNC_ITERATOR];
			if ("function" === typeof elementReference) return null !== task.keyPath ? (request = [
				REACT_ELEMENT_TYPE,
				REACT_FRAGMENT_TYPE,
				task.keyPath,
				{ children: value }
			], request = task.implicitSlot ? [request] : request) : (parentPropertyName = elementReference.call(value), request = serializeAsyncIterable(request, task, value, parentPropertyName)), request;
			if (value instanceof Date) return "$D" + value.toJSON();
			request = getPrototypeOf(value);
			if (request !== ObjectPrototype$1 && (null === request || null !== getPrototypeOf(request))) throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + describeObjectForErrorMessage(parent, parentPropertyName));
			return value;
		}
		if ("string" === typeof value) {
			serializedSize += value.length;
			if ("Z" === value[value.length - 1] && parent[parentPropertyName] instanceof Date) return "$D" + value;
			if (1024 <= value.length && null !== byteLengthOfChunk) return request.pendingChunks++, task = request.nextChunkId++, emitTextChunk(request, task, value, !1), serializeByValueID(task);
			request = "$" === value[0] ? "$" + value : value;
			return request;
		}
		if ("boolean" === typeof value) return value;
		if ("number" === typeof value) return Number.isFinite(value) ? 0 === value && -Infinity === 1 / value ? "$-0" : value : Infinity === value ? "$Infinity" : -Infinity === value ? "$-Infinity" : "$NaN";
		if ("undefined" === typeof value) return "$undefined";
		if ("function" === typeof value) {
			if (value.$$typeof === CLIENT_REFERENCE_TAG$1) return serializeClientReference(request, parent, parentPropertyName, value);
			if (value.$$typeof === SERVER_REFERENCE_TAG) return task = request.writtenServerReferences, parentPropertyName = task.get(value), void 0 !== parentPropertyName ? request = "$h" + parentPropertyName.toString(16) : (parentPropertyName = value.$$bound, parentPropertyName = null === parentPropertyName ? null : Promise.resolve(parentPropertyName), request = outlineModelWithFormatContext(request, {
				id: value.$$id,
				bound: parentPropertyName
			}, 0), task.set(value, request), request = "$h" + request.toString(16)), request;
			if (void 0 !== request.temporaryReferences && (request = request.temporaryReferences.get(value), void 0 !== request)) return "$T" + request;
			if (value.$$typeof === TEMPORARY_REFERENCE_TAG) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
			if (/^on[A-Z]/.test(parentPropertyName)) throw Error("Event handlers cannot be passed to Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
			throw Error("Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with \"use server\". Or maybe you meant to call this function rather than return it." + describeObjectForErrorMessage(parent, parentPropertyName));
		}
		if ("symbol" === typeof value) {
			task = request.writtenSymbols;
			elementReference = task.get(value);
			if (void 0 !== elementReference) return serializeByValueID(elementReference);
			elementReference = value.description;
			if (Symbol.for(elementReference) !== value) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (value.description + ") cannot be found among global symbols.") + describeObjectForErrorMessage(parent, parentPropertyName));
			request.pendingChunks++;
			parentPropertyName = request.nextChunkId++;
			parent = encodeReferenceChunk(request, parentPropertyName, "$S" + elementReference);
			request.completedImportChunks.push(parent);
			task.set(value, parentPropertyName);
			return serializeByValueID(parentPropertyName);
		}
		if ("bigint" === typeof value) return "$n" + value.toString(10);
		throw Error("Type " + typeof value + " is not supported in Client Component props." + describeObjectForErrorMessage(parent, parentPropertyName));
	}
	function logRecoverableError(request, error) {
		var prevRequest = currentRequest;
		currentRequest = null;
		try {
			var onError = request.onError;
			var errorDigest = supportsRequestStorage ? requestStorage.run(void 0, onError, error) : onError(error);
		} finally {
			currentRequest = prevRequest;
		}
		if (null != errorDigest && "string" !== typeof errorDigest) throw Error("onError returned something with a type other than \"string\". onError should return a string and may return null or undefined but must not return anything else. It received something of type \"" + typeof errorDigest + "\" instead");
		return errorDigest || "";
	}
	function fatalError(request, error) {
		var onFatalError = request.onFatalError;
		onFatalError(error);
		null !== request.destination ? (request.status = 14, closeWithError(request.destination, error)) : (request.status = 13, request.fatalError = error);
		request.cacheController.abort(Error("The render was aborted due to a fatal error.", { cause: error }));
	}
	function emitErrorChunk(request, id, digest) {
		digest = { digest };
		id = id.toString(16) + ":E" + stringify(digest) + "\n";
		id = stringToChunk(id);
		request.completedErrorChunks.push(id);
	}
	function emitModelChunk(request, id, json) {
		id = id.toString(16) + ":" + json + "\n";
		id = stringToChunk(id);
		request.completedRegularChunks.push(id);
	}
	function emitTypedArrayChunk(request, id, tag, typedArray, debug) {
		debug ? request.pendingDebugChunks++ : request.pendingChunks++;
		debug = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
		typedArray = 2048 < typedArray.byteLength ? debug.slice() : debug;
		debug = typedArray.byteLength;
		id = id.toString(16) + ":" + tag + debug.toString(16) + ",";
		id = stringToChunk(id);
		request.completedRegularChunks.push(id, typedArray);
	}
	function emitTextChunk(request, id, text, debug) {
		if (null === byteLengthOfChunk) throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
		debug ? request.pendingDebugChunks++ : request.pendingChunks++;
		text = stringToChunk(text);
		debug = text.byteLength;
		id = id.toString(16) + ":T" + debug.toString(16) + ",";
		id = stringToChunk(id);
		request.completedRegularChunks.push(id, text);
	}
	function emitChunk(request, task, value) {
		var id = task.id;
		"string" === typeof value && null !== byteLengthOfChunk ? emitTextChunk(request, id, value, !1) : value instanceof ArrayBuffer ? emitTypedArrayChunk(request, id, "A", new Uint8Array(value), !1) : value instanceof Int8Array ? emitTypedArrayChunk(request, id, "O", value, !1) : value instanceof Uint8Array ? emitTypedArrayChunk(request, id, "o", value, !1) : value instanceof Uint8ClampedArray ? emitTypedArrayChunk(request, id, "U", value, !1) : value instanceof Int16Array ? emitTypedArrayChunk(request, id, "S", value, !1) : value instanceof Uint16Array ? emitTypedArrayChunk(request, id, "s", value, !1) : value instanceof Int32Array ? emitTypedArrayChunk(request, id, "L", value, !1) : value instanceof Uint32Array ? emitTypedArrayChunk(request, id, "l", value, !1) : value instanceof Float32Array ? emitTypedArrayChunk(request, id, "G", value, !1) : value instanceof Float64Array ? emitTypedArrayChunk(request, id, "g", value, !1) : value instanceof BigInt64Array ? emitTypedArrayChunk(request, id, "M", value, !1) : value instanceof BigUint64Array ? emitTypedArrayChunk(request, id, "m", value, !1) : value instanceof DataView ? emitTypedArrayChunk(request, id, "V", value, !1) : (value = stringify(value, task.toJSON), emitModelChunk(request, task.id, value));
	}
	function erroredTask(request, task, error) {
		task.status = 4;
		error = logRecoverableError(request, error, task);
		emitErrorChunk(request, task.id, error);
		request.abortableTasks.delete(task);
		callOnAllReadyIfReady(request);
	}
	var emptyRoot = {};
	function retryTask(request, task) {
		if (0 === task.status) {
			task.status = 5;
			var parentSerializedSize = serializedSize;
			try {
				modelRoot = task.model;
				var resolvedModel = renderModelDestructive(request, task, emptyRoot, "", task.model);
				modelRoot = resolvedModel;
				task.keyPath = null;
				task.implicitSlot = !1;
				if ("object" === typeof resolvedModel && null !== resolvedModel) request.writtenObjects.set(resolvedModel, serializeByValueID(task.id)), emitChunk(request, task, resolvedModel);
				else {
					var json = stringify(resolvedModel);
					emitModelChunk(request, task.id, json);
				}
				task.status = 1;
				request.abortableTasks.delete(task);
				callOnAllReadyIfReady(request);
			} catch (thrownValue) {
				if (12 === request.status) if (request.abortableTasks.delete(task), task.status = 0, 21 === request.type) haltTask(task), finishHaltedTask(task, request);
				else {
					var errorId = request.fatalError;
					abortTask(task);
					finishAbortedTask(task, request, errorId);
				}
				else {
					var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
					if ("object" === typeof x && null !== x && "function" === typeof x.then) {
						task.status = 0;
						task.thenableState = getThenableStateAfterSuspending();
						var ping = task.ping;
						x.then(ping, ping);
					} else erroredTask(request, task, x);
				}
			} finally {
				serializedSize = parentSerializedSize;
			}
		}
	}
	function tryStreamTask(request, task) {
		var parentSerializedSize = serializedSize;
		try {
			emitChunk(request, task, task.model);
		} finally {
			serializedSize = parentSerializedSize;
		}
	}
	function performWork(request) {
		var prevDispatcher = ReactSharedInternalsServer.H;
		ReactSharedInternalsServer.H = HooksDispatcher;
		var prevRequest = currentRequest;
		currentRequest$1 = currentRequest = request;
		try {
			var pingedTasks = request.pingedTasks;
			request.pingedTasks = [];
			for (var i = 0; i < pingedTasks.length; i++) retryTask(request, pingedTasks[i]);
			flushCompletedChunks(request);
		} catch (error) {
			logRecoverableError(request, error, null), fatalError(request, error);
		} finally {
			ReactSharedInternalsServer.H = prevDispatcher, currentRequest$1 = null, currentRequest = prevRequest;
		}
	}
	function abortTask(task) {
		0 === task.status && (task.status = 3);
	}
	function finishAbortedTask(task, request, errorId) {
		3 === task.status && (errorId = serializeByValueID(errorId), task = encodeReferenceChunk(request, task.id, errorId), request.completedErrorChunks.push(task));
	}
	function haltTask(task) {
		0 === task.status && (task.status = 3);
	}
	function finishHaltedTask(task, request) {
		3 === task.status && request.pendingChunks--;
	}
	function flushCompletedChunks(request) {
		var destination = request.destination;
		if (null !== destination) {
			currentView = new Uint8Array(2048);
			writtenBytes = 0;
			try {
				for (var importsChunks = request.completedImportChunks, i = 0; i < importsChunks.length; i++) request.pendingChunks--, writeChunkAndReturn(destination, importsChunks[i]);
				importsChunks.splice(0, i);
				var hintChunks = request.completedHintChunks;
				for (i = 0; i < hintChunks.length; i++) writeChunkAndReturn(destination, hintChunks[i]);
				hintChunks.splice(0, i);
				var regularChunks = request.completedRegularChunks;
				for (i = 0; i < regularChunks.length; i++) request.pendingChunks--, writeChunkAndReturn(destination, regularChunks[i]);
				regularChunks.splice(0, i);
				var errorChunks = request.completedErrorChunks;
				for (i = 0; i < errorChunks.length; i++) request.pendingChunks--, writeChunkAndReturn(destination, errorChunks[i]);
				errorChunks.splice(0, i);
			} finally {
				request.flushScheduled = !1, currentView && 0 < writtenBytes && (destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes)), currentView = null, writtenBytes = 0);
			}
		}
		0 === request.pendingChunks && (12 > request.status && request.cacheController.abort(Error("This render completed successfully. All cacheSignals are now aborted to allow clean up of any unused resources.")), null !== request.destination && (request.status = 14, request.destination.close(), request.destination = null));
	}
	function startWork(request) {
		request.flushScheduled = null !== request.destination;
		supportsRequestStorage ? scheduleMicrotask(function() {
			requestStorage.run(request, performWork, request);
		}) : scheduleMicrotask(function() {
			return performWork(request);
		});
		setTimeout(function() {
			10 === request.status && (request.status = 11);
		}, 0);
	}
	function enqueueFlush(request) {
		!1 === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination && (request.flushScheduled = !0, setTimeout(function() {
			request.flushScheduled = !1;
			flushCompletedChunks(request);
		}, 0));
	}
	function callOnAllReadyIfReady(request) {
		0 === request.abortableTasks.size && (request = request.onAllReady, request());
	}
	function startFlowing(request, destination) {
		if (13 === request.status) request.status = 14, closeWithError(destination, request.fatalError);
		else if (14 !== request.status && null === request.destination) {
			request.destination = destination;
			try {
				flushCompletedChunks(request);
			} catch (error) {
				logRecoverableError(request, error, null), fatalError(request, error);
			}
		}
	}
	function finishHalt(request, abortedTasks) {
		try {
			abortedTasks.forEach(function(task) {
				return finishHaltedTask(task, request);
			});
			var onAllReady = request.onAllReady;
			onAllReady();
			flushCompletedChunks(request);
		} catch (error) {
			logRecoverableError(request, error, null), fatalError(request, error);
		}
	}
	function finishAbort(request, abortedTasks, errorId) {
		try {
			abortedTasks.forEach(function(task) {
				return finishAbortedTask(task, request, errorId);
			});
			var onAllReady = request.onAllReady;
			onAllReady();
			flushCompletedChunks(request);
		} catch (error) {
			logRecoverableError(request, error, null), fatalError(request, error);
		}
	}
	function abort(request, reason) {
		if (!(11 < request.status)) try {
			request.status = 12;
			request.cacheController.abort(reason);
			var abortableTasks = request.abortableTasks;
			if (0 < abortableTasks.size) if (21 === request.type) abortableTasks.forEach(function(task) {
				return haltTask(task, request);
			}), setTimeout(function() {
				return finishHalt(request, abortableTasks);
			}, 0);
			else {
				var error = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason, digest = logRecoverableError(request, error, null), errorId = request.nextChunkId++;
				request.fatalError = errorId;
				request.pendingChunks++;
				emitErrorChunk(request, errorId, digest, error, !1, null);
				abortableTasks.forEach(function(task) {
					return abortTask(task, request, errorId);
				});
				setTimeout(function() {
					return finishAbort(request, abortableTasks, errorId);
				}, 0);
			}
			else {
				var onAllReady = request.onAllReady;
				onAllReady();
				flushCompletedChunks(request);
			}
		} catch (error$26) {
			logRecoverableError(request, error$26, null), fatalError(request, error$26);
		}
	}
	function resolveServerReference(bundlerConfig, id) {
		var name = "", resolvedModuleData = bundlerConfig[id];
		if (resolvedModuleData) name = resolvedModuleData.name;
		else {
			var idx = id.lastIndexOf("#");
			-1 !== idx && (name = id.slice(idx + 1), resolvedModuleData = bundlerConfig[id.slice(0, idx)]);
			if (!resolvedModuleData) throw Error("Could not find the module \"" + id + "\" in the React Server Manifest. This is probably a bug in the React Server Components bundler.");
		}
		return resolvedModuleData.async ? [
			resolvedModuleData.id,
			resolvedModuleData.chunks,
			name,
			1
		] : [
			resolvedModuleData.id,
			resolvedModuleData.chunks,
			name
		];
	}
	var chunkCache = /* @__PURE__ */ new Map();
	function requireAsyncModule(id) {
		var promise = __vite_rsc_require__(id);
		if ("function" !== typeof promise.then || "fulfilled" === promise.status) return null;
		promise.then(function(value) {
			promise.status = "fulfilled";
			promise.value = value;
		}, function(reason) {
			promise.status = "rejected";
			promise.reason = reason;
		});
		return promise;
	}
	function ignoreReject() {}
	function preloadModule(metadata) {
		for (var chunks = metadata[1], promises = [], i = 0; i < chunks.length;) {
			var chunkId = chunks[i++];
			chunks[i++];
			var entry = chunkCache.get(chunkId);
			if (void 0 === entry) {
				entry = __webpack_chunk_load__(chunkId);
				promises.push(entry);
				var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
				entry.then(resolve, ignoreReject);
				chunkCache.set(chunkId, entry);
			} else null !== entry && promises.push(entry);
		}
		return 4 === metadata.length ? 0 === promises.length ? requireAsyncModule(metadata[0]) : Promise.all(promises).then(function() {
			return requireAsyncModule(metadata[0]);
		}) : 0 < promises.length ? Promise.all(promises) : null;
	}
	function requireModule(metadata) {
		var moduleExports = __vite_rsc_require__(metadata[0]);
		if (4 === metadata.length && "function" === typeof moduleExports.then) if ("fulfilled" === moduleExports.status) moduleExports = moduleExports.value;
		else throw moduleExports.reason;
		if ("*" === metadata[2]) return moduleExports;
		if ("" === metadata[2]) return moduleExports.__esModule ? moduleExports.default : moduleExports;
		if (hasOwnProperty.call(moduleExports, metadata[2])) return moduleExports[metadata[2]];
	}
	function appendBackingEntry(backingStore, key, value) {
		backingStore.data.append(key, value);
		value = backingStore.keys;
		null === value ? (backingStore.keys = Array.from(backingStore.data.keys()), backingStore.keyPointer = 0) : value.push(key);
	}
	var RESPONSE_SYMBOL = Symbol();
	function ReactPromise(status, value, reason) {
		this.status = status;
		this.value = value;
		this.reason = reason;
	}
	ReactPromise.prototype = Object.create(Promise.prototype);
	ReactPromise.prototype.then = function(resolve, reject) {
		switch (this.status) {
			case "resolved_model": initializeModelChunk(this);
		}
		switch (this.status) {
			case "fulfilled":
				if ("function" === typeof resolve) {
					for (var inspectedValue = this.value, cycleProtection = 0, visited = /* @__PURE__ */ new Set(); inspectedValue instanceof ReactPromise;) {
						cycleProtection++;
						if (inspectedValue === this || visited.has(inspectedValue) || 1e3 < cycleProtection) {
							"function" === typeof reject && reject(Error("Cannot have cyclic thenables."));
							return;
						}
						visited.add(inspectedValue);
						if ("fulfilled" === inspectedValue.status) inspectedValue = inspectedValue.value;
						else break;
					}
					resolve(this.value);
				}
				break;
			case "pending":
			case "blocked":
				"function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
				"function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
				break;
			default: "function" === typeof reject && reject(this.reason);
		}
	};
	var ObjectPrototype = Object.prototype, ArrayPrototype = Array.prototype;
	function wakeChunk(response, listeners, value, chunk) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, chunk.reason);
		}
	}
	function rejectChunk(response, listeners, error) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(error) : rejectReference(response, listener.handler, error);
		}
	}
	function triggerErrorOnChunk(response, chunk, error) {
		if ("pending" !== chunk.status && "blocked" !== chunk.status) chunk.reason.error(error);
		else {
			var listeners = chunk.reason;
			chunk.status = "rejected";
			chunk.reason = error;
			null !== listeners && rejectChunk(response, listeners, error);
		}
	}
	function createResolvedModelChunk(response, value, id) {
		var $jscomp$compprop2 = {};
		return new ReactPromise("resolved_model", value, ($jscomp$compprop2.id = id, $jscomp$compprop2[RESPONSE_SYMBOL] = response, $jscomp$compprop2));
	}
	function resolveModelChunk(response, chunk, value, id) {
		if ("pending" !== chunk.status) chunk = chunk.reason, "C" === value[0] ? chunk.close("C" === value ? "\"$undefined\"" : value.slice(1)) : chunk.enqueueModel(value);
		else {
			var resolveListeners = chunk.value, rejectListeners = chunk.reason;
			chunk.status = "resolved_model";
			chunk.value = value;
			value = {};
			chunk.reason = (value.id = id, value[RESPONSE_SYMBOL] = response, value);
			if (null !== resolveListeners) switch (initializeModelChunk(chunk), chunk.status) {
				case "fulfilled":
					wakeChunk(response, resolveListeners, chunk.value, chunk);
					break;
				case "blocked":
				case "pending":
					if (chunk.value) for (response = 0; response < resolveListeners.length; response++) chunk.value.push(resolveListeners[response]);
					else chunk.value = resolveListeners;
					if (chunk.reason) {
						if (rejectListeners) for (resolveListeners = 0; resolveListeners < rejectListeners.length; resolveListeners++) chunk.reason.push(rejectListeners[resolveListeners]);
					} else chunk.reason = rejectListeners;
					break;
				case "rejected": rejectListeners && rejectChunk(response, rejectListeners, chunk.reason);
			}
		}
	}
	function createResolvedIteratorResultChunk(response, value, done) {
		var $jscomp$compprop4 = {};
		return new ReactPromise("resolved_model", (done ? "{\"done\":true,\"value\":" : "{\"done\":false,\"value\":") + value + "}", ($jscomp$compprop4.id = -1, $jscomp$compprop4[RESPONSE_SYMBOL] = response, $jscomp$compprop4));
	}
	function resolveIteratorResultChunk(response, chunk, value, done) {
		resolveModelChunk(response, chunk, (done ? "{\"done\":true,\"value\":" : "{\"done\":false,\"value\":") + value + "}", -1);
	}
	function loadServerReference$1(response, metaData, parentObject, key) {
		function reject(error) {
			var rejectListeners = blockedPromise.reason, erroredPromise = blockedPromise;
			erroredPromise.status = "rejected";
			erroredPromise.value = null;
			erroredPromise.reason = error;
			null !== rejectListeners && rejectChunk(response, rejectListeners, error);
			rejectReference(response, handler, error);
		}
		var id = metaData.id;
		if ("string" !== typeof id || "then" === key) return null;
		var cachedPromise = metaData.$$promise;
		if (void 0 !== cachedPromise) {
			if ("fulfilled" === cachedPromise.status) return cachedPromise = cachedPromise.value, "__proto__" === key ? null : parentObject[key] = cachedPromise;
			initializingHandler ? (id = initializingHandler, id.deps++) : id = initializingHandler = {
				chunk: null,
				value: null,
				reason: null,
				deps: 1,
				errored: !1
			};
			cachedPromise.then(resolveReference.bind(null, response, id, parentObject, key), rejectReference.bind(null, response, id));
			return null;
		}
		var blockedPromise = new ReactPromise("blocked", null, null);
		metaData.$$promise = blockedPromise;
		var serverReference = resolveServerReference(response._bundlerConfig, id);
		cachedPromise = metaData.bound;
		if (id = preloadModule(serverReference)) cachedPromise instanceof ReactPromise && (id = Promise.all([id, cachedPromise]));
		else if (cachedPromise instanceof ReactPromise) id = Promise.resolve(cachedPromise);
		else return cachedPromise = requireModule(serverReference), id = blockedPromise, id.status = "fulfilled", id.value = cachedPromise;
		if (initializingHandler) {
			var handler = initializingHandler;
			handler.deps++;
		} else handler = initializingHandler = {
			chunk: null,
			value: null,
			reason: null,
			deps: 1,
			errored: !1
		};
		id.then(function() {
			var resolvedValue = requireModule(serverReference);
			if (metaData.bound) {
				var promiseValue = metaData.bound.value;
				promiseValue = isArrayImpl(promiseValue) ? promiseValue.slice(0) : [];
				if (1e3 < promiseValue.length) {
					reject(Error("Server Function has too many bound arguments. Received " + promiseValue.length + " but the limit is 1000."));
					return;
				}
				promiseValue.unshift(null);
				resolvedValue = resolvedValue.bind.apply(resolvedValue, promiseValue);
			}
			promiseValue = blockedPromise.value;
			var initializedPromise = blockedPromise;
			initializedPromise.status = "fulfilled";
			initializedPromise.value = resolvedValue;
			initializedPromise.reason = null;
			null !== promiseValue && wakeChunk(response, promiseValue, resolvedValue, initializedPromise);
			resolveReference(response, handler, parentObject, key, resolvedValue);
		}, reject);
		return null;
	}
	function reviveModel(response, parentObj, parentKey, value, reference, arrayRoot) {
		if ("string" === typeof value) return parseModelString(response, parentObj, parentKey, value, reference, arrayRoot);
		if ("object" === typeof value && null !== value) if (void 0 !== reference && void 0 !== response._temporaryReferences && response._temporaryReferences.set(value, reference), isArrayImpl(value)) {
			if (null === arrayRoot) {
				var childContext = {
					count: 0,
					fork: !1
				};
				response._rootArrayContexts.set(value, childContext);
			} else childContext = arrayRoot;
			1 < value.length && (childContext.fork = !0);
			bumpArrayCount(childContext, value.length + 1, response);
			for (parentObj = 0; parentObj < value.length; parentObj++) value[parentObj] = reviveModel(response, value, "" + parentObj, value[parentObj], void 0 !== reference ? reference + ":" + parentObj : void 0, childContext);
		} else for (childContext in value) hasOwnProperty.call(value, childContext) && ("__proto__" === childContext ? delete value[childContext] : (parentObj = void 0 !== reference && -1 === childContext.indexOf(":") ? reference + ":" + childContext : void 0, parentObj = reviveModel(response, value, childContext, value[childContext], parentObj, null), void 0 !== parentObj ? value[childContext] = parentObj : delete value[childContext]));
		return value;
	}
	function bumpArrayCount(arrayContext, slots, response) {
		if ((arrayContext.count += slots) > response._arraySizeLimit && arrayContext.fork) throw Error("Maximum array nesting exceeded. Large nested arrays can be dangerous. Try adding intermediate objects.");
	}
	var initializingHandler = null;
	function initializeModelChunk(chunk) {
		var prevHandler = initializingHandler;
		initializingHandler = null;
		var _chunk$reason = chunk.reason, response = _chunk$reason[RESPONSE_SYMBOL];
		_chunk$reason = _chunk$reason.id;
		_chunk$reason = -1 === _chunk$reason ? void 0 : _chunk$reason.toString(16);
		var resolvedModel = chunk.value;
		chunk.status = "blocked";
		chunk.value = null;
		chunk.reason = null;
		try {
			var rawModel = JSON.parse(resolvedModel);
			resolvedModel = {
				count: 0,
				fork: !1
			};
			var value = reviveModel(response, { "": rawModel }, "", rawModel, _chunk$reason, resolvedModel), resolveListeners = chunk.value;
			if (null !== resolveListeners) for (chunk.value = null, chunk.reason = null, rawModel = 0; rawModel < resolveListeners.length; rawModel++) {
				var listener = resolveListeners[rawModel];
				"function" === typeof listener ? listener(value) : fulfillReference(response, listener, value, resolvedModel);
			}
			if (null !== initializingHandler) {
				if (initializingHandler.errored) throw initializingHandler.reason;
				if (0 < initializingHandler.deps) {
					initializingHandler.value = value;
					initializingHandler.reason = resolvedModel;
					initializingHandler.chunk = chunk;
					return;
				}
			}
			chunk.status = "fulfilled";
			chunk.value = value;
			chunk.reason = resolvedModel;
		} catch (error) {
			chunk.status = "rejected", chunk.reason = error;
		} finally {
			initializingHandler = prevHandler;
		}
	}
	function reportGlobalError(response, error) {
		response._closed = !0;
		response._closedReason = error;
		response._chunks.forEach(function(chunk) {
			"pending" === chunk.status ? triggerErrorOnChunk(response, chunk, error) : "fulfilled" === chunk.status && null !== chunk.reason && (chunk = chunk.reason, "function" === typeof chunk.error && chunk.error(error));
		});
	}
	function getChunk(response, id) {
		var chunks = response._chunks, chunk = chunks.get(id);
		chunk || (chunk = response._formData.data.get(response._prefix + id), chunk = "string" === typeof chunk ? createResolvedModelChunk(response, chunk, id) : response._closed ? new ReactPromise("rejected", null, response._closedReason) : new ReactPromise("pending", null, null), chunks.set(id, chunk));
		return chunk;
	}
	function fulfillReference(response, reference, value, arrayRoot) {
		var handler = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
		try {
			for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < path.length; i++) {
				var name = path[i];
				if ("object" !== typeof value || null === value || getPrototypeOf(value) !== ObjectPrototype && getPrototypeOf(value) !== ArrayPrototype || !hasOwnProperty.call(value, name)) throw Error("Invalid reference.");
				value = value[name];
				if (isArrayImpl(value)) localLength = 0, arrayRoot = rootArrayContexts.get(value) || arrayRoot;
				else if (arrayRoot = null, "string" === typeof value) localLength = value.length;
				else if ("bigint" === typeof value) {
					var n = Math.abs(Number(value));
					localLength = 0 === n ? 1 : Math.floor(Math.log10(n)) + 1;
				} else localLength = ArrayBuffer.isView(value) ? value.byteLength : 0;
			}
			var resolvedValue = map(response, value, parentObject, key);
			var referenceArrayRoot = reference.arrayRoot;
			null !== referenceArrayRoot && (null !== arrayRoot ? (arrayRoot.fork && (referenceArrayRoot.fork = !0), bumpArrayCount(referenceArrayRoot, arrayRoot.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
		} catch (error) {
			rejectReference(response, handler, error);
			return;
		}
		resolveReference(response, handler, parentObject, key, resolvedValue);
	}
	function resolveReference(response, handler, parentObject, key, resolvedValue) {
		"__proto__" !== key && (parentObject[key] = resolvedValue);
		"" === key && null === handler.value && (handler.value = resolvedValue);
		handler.deps--;
		0 === handler.deps && (parentObject = handler.chunk, null !== parentObject && "blocked" === parentObject.status && (key = parentObject.value, parentObject.status = "fulfilled", parentObject.value = handler.value, parentObject.reason = handler.reason, null !== key && wakeChunk(response, key, handler.value, parentObject)));
	}
	function rejectReference(response, handler, error) {
		handler.errored || (handler.errored = !0, handler.value = null, handler.reason = error, handler = handler.chunk, null !== handler && "blocked" === handler.status && triggerErrorOnChunk(response, handler, error));
	}
	function getOutlinedModel(response, reference, parentObject, key, referenceArrayRoot, map) {
		reference = reference.split(":");
		var id = parseInt(reference[0], 16), chunk = getChunk(response, id);
		switch (chunk.status) {
			case "resolved_model": initializeModelChunk(chunk);
		}
		switch (chunk.status) {
			case "fulfilled":
				id = chunk.value;
				chunk = chunk.reason;
				if (null !== chunk && "error" in chunk) throw Error("Expected an initialized chunk but got an initialized stream chunk instead. This payload may have been submitted by an older version of React.");
				for (var localLength = 0, rootArrayContexts = response._rootArrayContexts, i = 1; i < reference.length; i++) {
					localLength = reference[i];
					if ("object" !== typeof id || null === id || getPrototypeOf(id) !== ObjectPrototype && getPrototypeOf(id) !== ArrayPrototype || !hasOwnProperty.call(id, localLength)) throw Error("Invalid reference.");
					id = id[localLength];
					isArrayImpl(id) ? (localLength = 0, chunk = rootArrayContexts.get(id) || chunk) : (chunk = null, "string" === typeof id ? localLength = id.length : "bigint" === typeof id ? (localLength = Math.abs(Number(id)), localLength = 0 === localLength ? 1 : Math.floor(Math.log10(localLength)) + 1) : localLength = ArrayBuffer.isView(id) ? id.byteLength : 0);
				}
				parentObject = map(response, id, parentObject, key);
				null !== referenceArrayRoot && (null !== chunk ? (chunk.fork && (referenceArrayRoot.fork = !0), bumpArrayCount(referenceArrayRoot, chunk.count, response)) : 0 < localLength && bumpArrayCount(referenceArrayRoot, localLength, response));
				return parentObject;
			case "blocked": return initializingHandler ? (response = initializingHandler, response.deps++) : response = initializingHandler = {
				chunk: null,
				value: null,
				reason: null,
				deps: 1,
				errored: !1
			}, referenceArrayRoot = {
				handler: response,
				parentObject,
				key,
				map,
				path: reference,
				arrayRoot: referenceArrayRoot
			}, null === chunk.value ? chunk.value = [referenceArrayRoot] : chunk.value.push(referenceArrayRoot), null === chunk.reason ? chunk.reason = [referenceArrayRoot] : chunk.reason.push(referenceArrayRoot), null;
			case "pending": throw Error("Invalid forward reference.");
			default: return initializingHandler ? (initializingHandler.errored = !0, initializingHandler.value = null, initializingHandler.reason = chunk.reason) : initializingHandler = {
				chunk: null,
				value: null,
				reason: chunk.reason,
				deps: 0,
				errored: !0
			}, null;
		}
	}
	function createMap(response, model) {
		if (!isArrayImpl(model)) throw Error("Invalid Map initializer.");
		if (!0 === model.$$consumed) throw Error("Already initialized Map.");
		model.$$consumed = !0;
		return new Map(model);
	}
	function createSet(response, model) {
		if (!isArrayImpl(model)) throw Error("Invalid Set initializer.");
		if (!0 === model.$$consumed) throw Error("Already initialized Set.");
		model.$$consumed = !0;
		return new Set(model);
	}
	function extractIterator(response, model) {
		if (!isArrayImpl(model)) throw Error("Invalid Iterator initializer.");
		if (!0 === model.$$consumed) throw Error("Already initialized Iterator.");
		model.$$consumed = !0;
		return model[Symbol.iterator]();
	}
	function createModel(response, model, parentObject, key) {
		return "then" === key && "function" === typeof model ? null : model;
	}
	function parseTypedArray(response, reference, constructor, bytesPerElement, parentObject, parentKey, referenceArrayRoot) {
		function reject(error) {
			if (!handler.errored) {
				handler.errored = !0;
				handler.value = null;
				handler.reason = error;
				var chunk = handler.chunk;
				null !== chunk && "blocked" === chunk.status && triggerErrorOnChunk(response, chunk, error);
			}
		}
		reference = parseInt(reference.slice(2), 16);
		var key = response._prefix + reference;
		bytesPerElement = response._chunks;
		if (bytesPerElement.has(reference)) throw Error("Already initialized typed array.");
		bytesPerElement.set(reference, new ReactPromise("rejected", null, Error("Already initialized typed array.")));
		reference = response._formData.data.get(key).arrayBuffer();
		if (initializingHandler) {
			var handler = initializingHandler;
			handler.deps++;
		} else handler = initializingHandler = {
			chunk: null,
			value: null,
			reason: null,
			deps: 1,
			errored: !1
		};
		reference.then(function(buffer) {
			try {
				null !== referenceArrayRoot && bumpArrayCount(referenceArrayRoot, buffer.byteLength, response);
				var resolvedValue = constructor === ArrayBuffer ? buffer : new constructor(buffer);
				"__proto__" !== key && (parentObject[parentKey] = resolvedValue);
				"" === parentKey && null === handler.value && (handler.value = resolvedValue);
			} catch (x) {
				reject(x);
				return;
			}
			handler.deps--;
			0 === handler.deps && (buffer = handler.chunk, null !== buffer && "blocked" === buffer.status && (resolvedValue = buffer.value, buffer.status = "fulfilled", buffer.value = handler.value, buffer.reason = null, null !== resolvedValue && wakeChunk(response, resolvedValue, handler.value, buffer)));
		}, reject);
		return null;
	}
	function resolveStream(response, id, stream, controller) {
		var chunks = response._chunks;
		stream = new ReactPromise("fulfilled", stream, controller);
		chunks.set(id, stream);
		response = response._formData.data.getAll(response._prefix + id);
		for (id = 0; id < response.length; id++) chunks = response[id], "string" === typeof chunks && ("C" === chunks[0] ? controller.close("C" === chunks ? "\"$undefined\"" : chunks.slice(1)) : controller.enqueueModel(chunks));
	}
	function parseReadableStream(response, reference, type) {
		function enqueue(value) {
			"bytes" !== type || ArrayBuffer.isView(value) ? controller.enqueue(value) : flightController.error(Error("Invalid data for bytes stream."));
		}
		reference = parseInt(reference.slice(2), 16);
		if (response._chunks.has(reference)) throw Error("Already initialized stream.");
		var controller = null, closed = !1, stream = new ReadableStream({
			type,
			start: function(c) {
				controller = c;
			}
		}), previousBlockedChunk = null, flightController = {
			enqueueModel: function(json) {
				if (null === previousBlockedChunk) {
					var chunk = createResolvedModelChunk(response, json, -1);
					initializeModelChunk(chunk);
					"fulfilled" === chunk.status ? enqueue(chunk.value) : (chunk.then(enqueue, flightController.error), previousBlockedChunk = chunk);
				} else {
					chunk = previousBlockedChunk;
					var chunk$31 = new ReactPromise("pending", null, null);
					chunk$31.then(enqueue, flightController.error);
					previousBlockedChunk = chunk$31;
					chunk.then(function() {
						previousBlockedChunk === chunk$31 && (previousBlockedChunk = null);
						resolveModelChunk(response, chunk$31, json, -1);
					});
				}
			},
			close: function() {
				if (!closed) if (closed = !0, null === previousBlockedChunk) controller.close();
				else {
					var blockedChunk = previousBlockedChunk;
					previousBlockedChunk = null;
					blockedChunk.then(function() {
						return controller.close();
					});
				}
			},
			error: function(error) {
				if (!closed) if (closed = !0, null === previousBlockedChunk) controller.error(error);
				else {
					var blockedChunk = previousBlockedChunk;
					previousBlockedChunk = null;
					blockedChunk.then(function() {
						return controller.error(error);
					});
				}
			}
		};
		resolveStream(response, reference, stream, flightController);
		return stream;
	}
	function FlightIterator(next) {
		this.next = next;
	}
	FlightIterator.prototype = {};
	FlightIterator.prototype[ASYNC_ITERATOR] = function() {
		return this;
	};
	function parseAsyncIterable(response, reference, iterator) {
		reference = parseInt(reference.slice(2), 16);
		if (response._chunks.has(reference)) throw Error("Already initialized stream.");
		var buffer = [], closed = !1, nextWriteIndex = 0, $jscomp$compprop5 = {};
		$jscomp$compprop5 = ($jscomp$compprop5[ASYNC_ITERATOR] = function() {
			var nextReadIndex = 0;
			return new FlightIterator(function(arg) {
				if (void 0 !== arg) throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
				if (nextReadIndex === buffer.length) {
					if (closed) return new ReactPromise("fulfilled", {
						done: !0,
						value: void 0
					}, null);
					buffer[nextReadIndex] = new ReactPromise("pending", null, null);
				}
				return buffer[nextReadIndex++];
			});
		}, $jscomp$compprop5);
		iterator = iterator ? $jscomp$compprop5[ASYNC_ITERATOR]() : $jscomp$compprop5;
		resolveStream(response, reference, iterator, {
			enqueueModel: function(value) {
				nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !1) : resolveIteratorResultChunk(response, buffer[nextWriteIndex], value, !1);
				nextWriteIndex++;
			},
			close: function(value) {
				if (!closed) for (closed = !0, nextWriteIndex === buffer.length ? buffer[nextWriteIndex] = createResolvedIteratorResultChunk(response, value, !0) : resolveIteratorResultChunk(response, buffer[nextWriteIndex], value, !0), nextWriteIndex++; nextWriteIndex < buffer.length;) resolveIteratorResultChunk(response, buffer[nextWriteIndex++], "\"$undefined\"", !0);
			},
			error: function(error) {
				if (!closed) for (closed = !0, nextWriteIndex === buffer.length && (buffer[nextWriteIndex] = new ReactPromise("pending", null, null)); nextWriteIndex < buffer.length;) triggerErrorOnChunk(response, buffer[nextWriteIndex++], error);
			}
		});
		return iterator;
	}
	function parseModelString(response, obj, key, value, reference, arrayRoot) {
		if ("$" === value[0]) {
			switch (value[1]) {
				case "$": return null !== arrayRoot && bumpArrayCount(arrayRoot, value.length - 1, response), value.slice(1);
				case "@": return obj = parseInt(value.slice(2), 16), getChunk(response, obj);
				case "h": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, loadServerReference$1);
				case "T":
					if (void 0 === reference || void 0 === response._temporaryReferences) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
					return createTemporaryReference(response._temporaryReferences, reference);
				case "Q": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createMap);
				case "W": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, createSet);
				case "K":
					key = value.slice(2);
					obj = response._prefix + "_";
					key = obj + key + "_";
					arrayRoot = new FormData();
					for (response = response._formData;;) {
						value = response.keys;
						null === value && (value = response.keys = Array.from(response.data.keys()), response.keyPointer = 0);
						value = value[response.keyPointer];
						if (void 0 === value) break;
						if (value.startsWith(key)) {
							reference = response.data.getAll(value);
							for (var referencedFormDataKey = value.slice(key.length), i = 0; i < reference.length; i++) arrayRoot.append(referencedFormDataKey, reference[i]);
							response.data.delete(value);
							response.keyPointer++;
						} else if (value.startsWith(obj)) break;
						else response.keyPointer++;
					}
					return arrayRoot;
				case "i": return arrayRoot = value.slice(2), getOutlinedModel(response, arrayRoot, obj, key, null, extractIterator);
				case "I": return Infinity;
				case "-": return "$-0" === value ? -0 : -Infinity;
				case "N": return NaN;
				case "u": return;
				case "D": return new Date(Date.parse(value.slice(2)));
				case "n":
					obj = value.slice(2);
					if (300 < obj.length) throw Error("BigInt is too large. Received " + obj.length + " digits but the limit is 300.");
					null !== arrayRoot && bumpArrayCount(arrayRoot, obj.length, response);
					return BigInt(obj);
				case "A": return parseTypedArray(response, value, ArrayBuffer, 1, obj, key, arrayRoot);
				case "O": return parseTypedArray(response, value, Int8Array, 1, obj, key, arrayRoot);
				case "o": return parseTypedArray(response, value, Uint8Array, 1, obj, key, arrayRoot);
				case "U": return parseTypedArray(response, value, Uint8ClampedArray, 1, obj, key, arrayRoot);
				case "S": return parseTypedArray(response, value, Int16Array, 2, obj, key, arrayRoot);
				case "s": return parseTypedArray(response, value, Uint16Array, 2, obj, key, arrayRoot);
				case "L": return parseTypedArray(response, value, Int32Array, 4, obj, key, arrayRoot);
				case "l": return parseTypedArray(response, value, Uint32Array, 4, obj, key, arrayRoot);
				case "G": return parseTypedArray(response, value, Float32Array, 4, obj, key, arrayRoot);
				case "g": return parseTypedArray(response, value, Float64Array, 8, obj, key, arrayRoot);
				case "M": return parseTypedArray(response, value, BigInt64Array, 8, obj, key, arrayRoot);
				case "m": return parseTypedArray(response, value, BigUint64Array, 8, obj, key, arrayRoot);
				case "V": return parseTypedArray(response, value, DataView, 1, obj, key, arrayRoot);
				case "B": return obj = parseInt(value.slice(2), 16), response._formData.data.get(response._prefix + obj);
				case "R": return parseReadableStream(response, value, void 0);
				case "r": return parseReadableStream(response, value, "bytes");
				case "X": return parseAsyncIterable(response, value, !1);
				case "x": return parseAsyncIterable(response, value, !0);
			}
			value = value.slice(1);
			return getOutlinedModel(response, value, obj, key, arrayRoot, createModel);
		}
		null !== arrayRoot && bumpArrayCount(arrayRoot, value.length, response);
		return value;
	}
	function createResponse(bundlerConfig, formFieldPrefix, temporaryReferences) {
		var backingFormData = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData(), arraySizeLimit = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 1e6;
		return {
			_bundlerConfig: bundlerConfig,
			_prefix: formFieldPrefix,
			_formData: {
				data: backingFormData,
				keyPointer: -1,
				keys: null
			},
			_chunks: /* @__PURE__ */ new Map(),
			_closed: !1,
			_closedReason: null,
			_temporaryReferences: temporaryReferences,
			_rootArrayContexts: /* @__PURE__ */ new WeakMap(),
			_arraySizeLimit: arraySizeLimit
		};
	}
	function close(response) {
		reportGlobalError(response, Error("Connection closed."));
	}
	function loadServerReference(bundlerConfig, metaData) {
		var id = metaData.id;
		if ("string" !== typeof id) return null;
		var serverReference = resolveServerReference(bundlerConfig, id);
		bundlerConfig = preloadModule(serverReference);
		metaData = metaData.bound;
		return metaData instanceof Promise ? Promise.all([metaData, bundlerConfig]).then(function(_ref) {
			_ref = _ref[0];
			var fn = requireModule(serverReference);
			if (1e3 < _ref.length) throw Error("Server Function has too many bound arguments. Received " + _ref.length + " but the limit is 1000.");
			return fn.bind.apply(fn, [null].concat(_ref));
		}) : bundlerConfig ? Promise.resolve(bundlerConfig).then(function() {
			return requireModule(serverReference);
		}) : Promise.resolve(requireModule(serverReference));
	}
	function decodeBoundActionMetaData(body, serverManifest, formFieldPrefix, arraySizeLimit) {
		body = createResponse(serverManifest, formFieldPrefix, void 0, body, arraySizeLimit);
		close(body);
		body = getChunk(body, 0);
		body.then(function() {});
		if ("fulfilled" !== body.status) throw body.reason;
		return body.value;
	}
	exports.createClientModuleProxy = function(moduleId) {
		moduleId = registerClientReferenceImpl({}, moduleId, !1);
		return new Proxy(moduleId, proxyHandlers$1);
	};
	exports.createTemporaryReferenceSet = function() {
		return /* @__PURE__ */ new WeakMap();
	};
	exports.decodeAction = function(body, serverManifest) {
		var formData = new FormData(), action = null, seenActions = /* @__PURE__ */ new Set();
		body.forEach(function(value, key) {
			key.startsWith("$ACTION_") ? key.startsWith("$ACTION_REF_") ? seenActions.has(key) || (seenActions.add(key), value = "$ACTION_" + key.slice(12) + ":", value = decodeBoundActionMetaData(body, serverManifest, value), action = loadServerReference(serverManifest, value)) : key.startsWith("$ACTION_ID_") && !seenActions.has(key) && (seenActions.add(key), value = key.slice(11), action = loadServerReference(serverManifest, {
				id: value,
				bound: null
			})) : formData.append(key, value);
		});
		return null === action ? null : action.then(function(fn) {
			return fn.bind(null, formData);
		});
	};
	exports.decodeFormState = function(actionResult, body, serverManifest) {
		var keyPath = body.get("$ACTION_KEY");
		if ("string" !== typeof keyPath) return Promise.resolve(null);
		var metaData = null;
		body.forEach(function(value, key) {
			key.startsWith("$ACTION_REF_") && (value = "$ACTION_" + key.slice(12) + ":", metaData = decodeBoundActionMetaData(body, serverManifest, value));
		});
		if (null === metaData) return Promise.resolve(null);
		var referenceId = metaData.id;
		return Promise.resolve(metaData.bound).then(function(bound) {
			return null === bound ? null : [
				actionResult,
				keyPath,
				referenceId,
				bound.length - 1
			];
		});
	};
	exports.decodeReply = function(body, webpackMap, options) {
		if ("string" === typeof body) {
			var form = new FormData();
			form.append("0", body);
			body = form;
		}
		body = createResponse(webpackMap, "", options ? options.temporaryReferences : void 0, body, options ? options.arraySizeLimit : void 0);
		webpackMap = getChunk(body, 0);
		close(body);
		return webpackMap;
	};
	exports.decodeReplyFromAsyncIterable = function(iterable, webpackMap, options) {
		function progress(entry) {
			if (entry.done) close(response);
			else {
				entry = entry.value;
				var name = entry[0];
				entry = entry[1];
				if ("string" === typeof entry) {
					appendBackingEntry(response._formData, name, entry);
					var prefix = response._prefix;
					if (name.startsWith(prefix)) {
						var chunks = response._chunks;
						name = +name.slice(prefix.length);
						(chunks = chunks.get(name)) && resolveModelChunk(response, chunks, entry, name);
					}
				} else appendBackingEntry(response._formData, name, entry);
				iterator.next().then(progress, error);
			}
		}
		function error(reason) {
			reportGlobalError(response, reason);
			"function" === typeof iterator.throw && iterator.throw(reason).then(error, error);
		}
		var iterator = iterable[ASYNC_ITERATOR](), response = createResponse(webpackMap, "", options ? options.temporaryReferences : void 0, void 0, options ? options.arraySizeLimit : void 0);
		iterator.next().then(progress, error);
		return getChunk(response, 0);
	};
	exports.prerender = function(model, webpackMap, options) {
		return new Promise(function(resolve, reject) {
			var request = new RequestInstance(21, model, webpackMap, options ? options.onError : void 0, options ? options.onPostpone : void 0, function() {
				resolve({ prelude: new ReadableStream({
					type: "bytes",
					pull: function(controller) {
						startFlowing(request, controller);
					},
					cancel: function(reason) {
						request.destination = null;
						abort(request, reason);
					}
				}, { highWaterMark: 0 }) });
			}, reject, options ? options.identifierPrefix : void 0, options ? options.temporaryReferences : void 0);
			if (options && options.signal) {
				var signal = options.signal;
				if (signal.aborted) abort(request, signal.reason);
				else {
					var listener = function() {
						abort(request, signal.reason);
						signal.removeEventListener("abort", listener);
					};
					signal.addEventListener("abort", listener);
				}
			}
			startWork(request);
		});
	};
	exports.registerClientReference = function(proxyImplementation, id, exportName) {
		return registerClientReferenceImpl(proxyImplementation, id + "#" + exportName, !1);
	};
	exports.registerServerReference = function(reference, id, exportName) {
		return Object.defineProperties(reference, {
			$$typeof: { value: SERVER_REFERENCE_TAG },
			$$id: {
				value: null === exportName ? id : id + "#" + exportName,
				configurable: !0
			},
			$$bound: {
				value: null,
				configurable: !0
			},
			bind: {
				value: bind,
				configurable: !0
			},
			toString: serverReferenceToString
		});
	};
	exports.renderToReadableStream = function(model, webpackMap, options) {
		var request = new RequestInstance(20, model, webpackMap, options ? options.onError : void 0, options ? options.onPostpone : void 0, noop, noop, options ? options.identifierPrefix : void 0, options ? options.temporaryReferences : void 0);
		if (options && options.signal) {
			var signal = options.signal;
			if (signal.aborted) abort(request, signal.reason);
			else {
				var listener = function() {
					abort(request, signal.reason);
					signal.removeEventListener("abort", listener);
				};
				signal.addEventListener("abort", listener);
			}
		}
		return new ReadableStream({
			type: "bytes",
			start: function() {
				startWork(request);
			},
			pull: function(controller) {
				startFlowing(request, controller);
			},
			cancel: function(reason) {
				request.destination = null;
				abort(request, reason);
			}
		}, { highWaterMark: 0 });
	};
}));
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/core/rsc.js
var import_server_edge = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	var s = require_react_server_dom_webpack_server_edge_production();
	exports.renderToReadableStream = s.renderToReadableStream;
	exports.decodeReply = s.decodeReply;
	exports.decodeReplyFromAsyncIterable = s.decodeReplyFromAsyncIterable;
	exports.decodeAction = s.decodeAction;
	exports.decodeFormState = s.decodeFormState;
	exports.registerServerReference = s.registerServerReference;
	exports.registerClientReference = s.registerClientReference;
	exports.createClientModuleProxy = s.createClientModuleProxy;
	exports.createTemporaryReferenceSet = s.createTemporaryReferenceSet;
})))(), 1);
var init = false;
var requireModule;
function setRequireModule(options) {
	if (init) return;
	init = true;
	requireModule = (id) => {
		return options.load(removeReferenceCacheTag(id));
	};
	globalThis.__vite_rsc_server_require__ = memoize(async (id) => {
		if (id.startsWith("$$decode-client:")) {
			id = id.slice(SERVER_DECODE_CLIENT_PREFIX.length);
			id = removeReferenceCacheTag(id);
			const target = {};
			const getOrCreateClientReference = (name) => {
				return target[name] ??= import_server_edge.registerClientReference(() => {
					throw new Error(`Unexpectedly client reference export '${name}' is called on server`);
				}, id, name);
			};
			return new Proxy(target, { getOwnPropertyDescriptor(_target, name) {
				if (typeof name !== "string" || name === "then") return Reflect.getOwnPropertyDescriptor(target, name);
				getOrCreateClientReference(name);
				return Reflect.getOwnPropertyDescriptor(target, name);
			} });
		}
		return requireModule(id);
	});
	setInternalRequire();
}
async function loadServerAction(id) {
	const [file, name] = id.split("#");
	return (await requireModule(file))[name];
}
function createServerManifest() {
	const cacheTag = "";
	return new Proxy({}, { get(_target, $$id, _receiver) {
		tinyassert(typeof $$id === "string");
		let [id, name] = $$id.split("#");
		tinyassert(id);
		tinyassert(name);
		return {
			id: SERVER_REFERENCE_PREFIX + id + cacheTag,
			name,
			chunks: [],
			async: true
		};
	} });
}
function createClientManifest(options) {
	const cacheTag = "";
	return new Proxy({}, { get(_target, $$id, _receiver) {
		tinyassert(typeof $$id === "string");
		let [id, name] = $$id.split("#");
		tinyassert(id);
		tinyassert(name);
		options?.onClientReference?.({
			id,
			name
		});
		return {
			id: id + cacheTag,
			name,
			chunks: [],
			async: true
		};
	} });
}
//#endregion
//#region node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-client.edge.production.js
/**
* @license React
* react-server-dom-webpack-client.edge.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_server_dom_webpack_client_edge_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var ReactDOM = require_react_dom_react_server(), hasOwnProperty = Object.prototype.hasOwnProperty;
	function requireModule(metadata) {
		var moduleExports = __vite_rsc_require__(metadata[0]);
		if (4 === metadata.length && "function" === typeof moduleExports.then) if ("fulfilled" === moduleExports.status) moduleExports = moduleExports.value;
		else throw moduleExports.reason;
		if ("*" === metadata[2]) return moduleExports;
		if ("" === metadata[2]) return moduleExports.__esModule ? moduleExports.default : moduleExports;
		if (hasOwnProperty.call(moduleExports, metadata[2])) return moduleExports[metadata[2]];
	}
	ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
	Array.isArray;
	Function.prototype.bind;
	Array.prototype.slice;
	function ReactPromise(status, value, reason) {
		this.status = status;
		this.value = value;
		this.reason = reason;
	}
	ReactPromise.prototype = Object.create(Promise.prototype);
	ReactPromise.prototype.then = function(resolve, reject) {
		switch (this.status) {
			case "resolved_model":
				initializeModelChunk(this);
				break;
			case "resolved_module": initializeModuleChunk(this);
		}
		switch (this.status) {
			case "fulfilled":
				"function" === typeof resolve && resolve(this.value);
				break;
			case "pending":
			case "blocked":
				"function" === typeof resolve && (null === this.value && (this.value = []), this.value.push(resolve));
				"function" === typeof reject && (null === this.reason && (this.reason = []), this.reason.push(reject));
				break;
			case "halted": break;
			default: "function" === typeof reject && reject(this.reason);
		}
	};
	function wakeChunk(listeners, value, chunk) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(value) : fulfillReference(listener, value, chunk);
		}
	}
	function rejectChunk(listeners, error) {
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			"function" === typeof listener ? listener(error) : rejectReference(listener, error);
		}
	}
	function resolveBlockedCycle(resolvedChunk, reference) {
		var referencedChunk = reference.handler.chunk;
		if (null === referencedChunk) return null;
		if (referencedChunk === resolvedChunk) return reference.handler;
		reference = referencedChunk.value;
		if (null !== reference) for (referencedChunk = 0; referencedChunk < reference.length; referencedChunk++) {
			var listener = reference[referencedChunk];
			if ("function" !== typeof listener && (listener = resolveBlockedCycle(resolvedChunk, listener), null !== listener)) return listener;
		}
		return null;
	}
	function triggerErrorOnChunk(response, chunk, error) {
		"pending" !== chunk.status && "blocked" !== chunk.status ? chunk.reason.error(error) : (response = chunk.reason, chunk.status = "rejected", chunk.reason = error, null !== response && rejectChunk(response, error));
	}
	var initializingHandler = null;
	function initializeModelChunk(chunk) {
		var prevHandler = initializingHandler;
		initializingHandler = null;
		var resolvedModel = chunk.value, response = chunk.reason;
		chunk.status = "blocked";
		chunk.value = null;
		chunk.reason = null;
		try {
			var value = JSON.parse(resolvedModel, response._fromJSON), resolveListeners = chunk.value;
			if (null !== resolveListeners) for (chunk.value = null, chunk.reason = null, resolvedModel = 0; resolvedModel < resolveListeners.length; resolvedModel++) {
				var listener = resolveListeners[resolvedModel];
				"function" === typeof listener ? listener(value) : fulfillReference(listener, value, chunk);
			}
			if (null !== initializingHandler) {
				if (initializingHandler.errored) throw initializingHandler.reason;
				if (0 < initializingHandler.deps) {
					initializingHandler.value = value;
					initializingHandler.chunk = chunk;
					return;
				}
			}
			chunk.status = "fulfilled";
			chunk.value = value;
		} catch (error) {
			chunk.status = "rejected", chunk.reason = error;
		} finally {
			initializingHandler = prevHandler;
		}
	}
	function initializeModuleChunk(chunk) {
		try {
			var value = requireModule(chunk.value);
			chunk.status = "fulfilled";
			chunk.value = value;
		} catch (error) {
			chunk.status = "rejected", chunk.reason = error;
		}
	}
	function fulfillReference(reference, value) {
		var response = reference.response, handler = reference.handler, parentObject = reference.parentObject, key = reference.key, map = reference.map, path = reference.path;
		try {
			for (var i = 1; i < path.length; i++) {
				for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE;) {
					var referencedChunk = value._payload;
					if (referencedChunk === handler.chunk) value = handler.value;
					else {
						switch (referencedChunk.status) {
							case "resolved_model":
								initializeModelChunk(referencedChunk);
								break;
							case "resolved_module": initializeModuleChunk(referencedChunk);
						}
						switch (referencedChunk.status) {
							case "fulfilled":
								value = referencedChunk.value;
								continue;
							case "blocked":
								var cyclicHandler = resolveBlockedCycle(referencedChunk, reference);
								if (null !== cyclicHandler) {
									value = cyclicHandler.value;
									continue;
								}
							case "pending":
								path.splice(0, i - 1);
								null === referencedChunk.value ? referencedChunk.value = [reference] : referencedChunk.value.push(reference);
								null === referencedChunk.reason ? referencedChunk.reason = [reference] : referencedChunk.reason.push(reference);
								return;
							case "halted": return;
							default:
								rejectReference(reference, referencedChunk.reason);
								return;
						}
					}
				}
				var name = path[i];
				if ("object" === typeof value && null !== value && hasOwnProperty.call(value, name)) value = value[name];
				else throw Error("Invalid reference.");
			}
			for (; "object" === typeof value && null !== value && value.$$typeof === REACT_LAZY_TYPE;) {
				var referencedChunk$44 = value._payload;
				if (referencedChunk$44 === handler.chunk) value = handler.value;
				else {
					switch (referencedChunk$44.status) {
						case "resolved_model":
							initializeModelChunk(referencedChunk$44);
							break;
						case "resolved_module": initializeModuleChunk(referencedChunk$44);
					}
					switch (referencedChunk$44.status) {
						case "fulfilled":
							value = referencedChunk$44.value;
							continue;
					}
					break;
				}
			}
			var mappedValue = map(response, value, parentObject, key);
			"__proto__" !== key && (parentObject[key] = mappedValue);
			"" === key && null === handler.value && (handler.value = mappedValue);
			if (parentObject[0] === REACT_ELEMENT_TYPE && "object" === typeof handler.value && null !== handler.value && handler.value.$$typeof === REACT_ELEMENT_TYPE) {
				var element = handler.value;
				switch (key) {
					case "3": element.props = mappedValue;
				}
			}
		} catch (error) {
			rejectReference(reference, error);
			return;
		}
		handler.deps--;
		0 === handler.deps && (reference = handler.chunk, null !== reference && "blocked" === reference.status && (value = reference.value, reference.status = "fulfilled", reference.value = handler.value, reference.reason = handler.reason, null !== value && wakeChunk(value, handler.value, reference)));
	}
	function rejectReference(reference, error) {
		var handler = reference.handler;
		reference = reference.response;
		handler.errored || (handler.errored = !0, handler.value = null, handler.reason = error, handler = handler.chunk, null !== handler && "blocked" === handler.status && triggerErrorOnChunk(reference, handler, error));
	}
}));
(/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_server_dom_webpack_client_edge_production();
})))();
function renderToReadableStream$2(data, options, extraOptions) {
	return import_server_edge.renderToReadableStream(data, createClientManifest({ onClientReference: extraOptions?.onClientReference }), options);
}
function registerClientReference(proxy, id, name) {
	return import_server_edge.registerClientReference(proxy, id, name);
}
var decodeReply = (body, options) => import_server_edge.decodeReply(body, createServerManifest(), options);
function decodeAction(body) {
	return import_server_edge.decodeAction(body, createServerManifest());
}
function decodeFormState(actionResult, body) {
	return import_server_edge.decodeFormState(actionResult, body, createServerManifest());
}
var createTemporaryReferenceSet = import_server_edge.createTemporaryReferenceSet;
//#endregion
//#region \0virtual:vite-rsc/server-references
var server_references_default = {};
//#endregion
//#region node_modules/@vitejs/plugin-rsc/dist/rsc.js
initialize();
function initialize() {
	setRequireModule({ load: async (id) => {
		{
			const import_ = server_references_default[id];
			if (!import_) throw new Error(`server reference not found '${id}'`);
			return import_();
		}
	} });
}
function renderToReadableStream$1(data, options, extraOptions) {
	return renderToReadableStream$2(data, options, { onClientReference(metadata) {
		const deps = assetsManifest.clientReferenceDeps[metadata.id] ?? {
			js: [],
			css: []
		};
		extraOptions?.onClientReference?.({
			id: metadata.id,
			name: metadata.name,
			deps
		});
	} });
}
//#endregion
//#region node_modules/vinext/dist/server/rsc-stream-hints.js
var REACT_FLIGHT_STYLESHEET_PRELOAD_HINT = /(\d*:HL\[.*?),"stylesheet"(\]|,)/g;
/**
* React Flight emits HL hints with "stylesheet" for CSS preloads, but the
* HTML spec requires "style" for <link rel="preload">. Rewrite each complete
* Flight line so SSR embeds, navigation, and server actions see valid hints.
*/
function normalizeReactFlightHintLine(line) {
	return line.replace(REACT_FLIGHT_STYLESHEET_PRELOAD_HINT, "$1,\"style\"$2");
}
function normalizeReactFlightPreloadHints(stream) {
	const decoder = new TextDecoder();
	const encoder = new TextEncoder();
	let carry = "";
	return stream.pipeThrough(new TransformStream({
		transform(chunk, controller) {
			const text = carry + decoder.decode(chunk, { stream: true });
			const lastNewline = text.lastIndexOf("\n");
			if (lastNewline === -1) {
				carry = text;
				return;
			}
			carry = text.slice(lastNewline + 1);
			controller.enqueue(encoder.encode(normalizeReactFlightHintLine(text.slice(0, lastNewline + 1))));
		},
		flush(controller) {
			const text = carry + decoder.decode();
			if (text) controller.enqueue(encoder.encode(normalizeReactFlightHintLine(text)));
		}
	}));
}
function createRscRenderer(render) {
	return (model, options) => normalizeReactFlightPreloadHints(render(model, options));
}
//#endregion
//#region node_modules/vinext/dist/shims/readonly-url-search-params.js
var import_react_react_server = /* @__PURE__ */ __toESM(require_react_react_server(), 1);
var ReadonlyURLSearchParamsError = class extends Error {
	constructor() {
		super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
	}
};
/**
* Read-only URLSearchParams wrapper matching Next.js runtime behavior.
* Mutation methods remain present for instanceof/API compatibility but throw.
*/
var ReadonlyURLSearchParams = class extends URLSearchParams {
	append(_name, _value) {
		throw new ReadonlyURLSearchParamsError();
	}
	delete(_name, _value) {
		throw new ReadonlyURLSearchParamsError();
	}
	set(_name, _value) {
		throw new ReadonlyURLSearchParamsError();
	}
	sort() {
		throw new ReadonlyURLSearchParamsError();
	}
};
//#endregion
//#region node_modules/vinext/dist/shims/url-safety.js
/**
* Shared URL safety utilities for Link, Form, and navigation shims.
*
* Centralizes dangerous URI scheme detection so all components and
* navigation functions use the same validation logic.
*/
/**
* Detect dangerous URI schemes that should never be navigated to.
*
* Adapted from Next.js's javascript URL detector:
* packages/next/src/client/lib/javascript-url.ts
* https://github.com/vercel/next.js/blob/canary/packages/next/src/client/lib/javascript-url.ts
*
* URL parsing ignores leading C0 control characters / spaces, and treats
* embedded tab/newline characters in the scheme as insignificant. We mirror
* that behavior here so obfuscated values like `java\nscript:` and
* `\x00javascript:` are still blocked.
*
* Vinext intentionally extends this handling to `data:` and `vbscript:` too,
* since both are also dangerous navigation targets.
*/
var LEADING_IGNORED = "[\\u0000-\\u001F \\u200B\\uFEFF]*";
var SCHEME_IGNORED = "[\\r\\n\\t]*";
function buildDangerousSchemeRegex(scheme) {
	const chars = scheme.split("").join(SCHEME_IGNORED);
	return new RegExp(`^${LEADING_IGNORED}${chars}${SCHEME_IGNORED}:`, "i");
}
var DANGEROUS_SCHEME_RES = [
	buildDangerousSchemeRegex("javascript"),
	buildDangerousSchemeRegex("data"),
	buildDangerousSchemeRegex("vbscript")
];
var DANGEROUS_URL_BLOCK_MESSAGE = "Next.js has blocked a javascript: URL as a security precaution.";
function isDangerousScheme(url) {
	const str = "" + url;
	return DANGEROUS_SCHEME_RES.some((re) => re.test(str));
}
function assertSafeNavigationUrl(url) {
	if (isDangerousScheme(url)) throw new Error(DANGEROUS_URL_BLOCK_MESSAGE);
}
//#endregion
//#region node_modules/vinext/dist/utils/hash.js
/**
* FNV-1a hash producing a 64-bit result (two 32-bit rounds with different seeds).
* Used for deterministic key generation where collisions must be rare.
*/
function fnv1a64(input) {
	let h1 = 2166136261;
	for (let i = 0; i < input.length; i++) {
		h1 ^= input.charCodeAt(i);
		h1 = h1 * 16777619 >>> 0;
	}
	let h2 = 84696351;
	for (let i = 0; i < input.length; i++) {
		h2 ^= input.charCodeAt(i);
		h2 = h2 * 16777619 >>> 0;
	}
	return h1.toString(36) + h2.toString(36);
}
//#endregion
//#region node_modules/vinext/dist/server/artifact-compatibility.js
function createArtifactCompatibilityEnvelope(input = {}) {
	return {
		schemaVersion: 1,
		graphVersion: input.graphVersion ?? null,
		deploymentVersion: input.deploymentVersion ?? null,
		appElementsSchemaVersion: 1,
		rscPayloadSchemaVersion: 1,
		rootBoundaryId: input.rootBoundaryId ?? null,
		renderEpoch: input.renderEpoch ?? null
	};
}
function createArtifactCompatibilityGraphVersion(input) {
	return `app-route-graph:${fnv1a64(JSON.stringify([input.routePattern, input.rootBoundaryId]))}`;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isStringOrNull(value) {
	return typeof value === "string" || value === null;
}
function hasCurrentSchemaVersions(record) {
	return record.schemaVersion === 1 && record.appElementsSchemaVersion === 1 && record.rscPayloadSchemaVersion === 1;
}
function parseArtifactCompatibilityEnvelope(value) {
	if (!isRecord(value)) return null;
	if (!hasCurrentSchemaVersions(value)) return null;
	if (!isStringOrNull(value.graphVersion)) return null;
	if (!isStringOrNull(value.deploymentVersion)) return null;
	if (!isStringOrNull(value.rootBoundaryId)) return null;
	if (!isStringOrNull(value.renderEpoch)) return null;
	return {
		schemaVersion: 1,
		graphVersion: value.graphVersion,
		deploymentVersion: value.deploymentVersion,
		appElementsSchemaVersion: 1,
		rscPayloadSchemaVersion: 1,
		rootBoundaryId: value.rootBoundaryId,
		renderEpoch: value.renderEpoch
	};
}
//#endregion
//#region node_modules/vinext/dist/server/app-elements-wire.js
var APP_INTERCEPTION_SEPARATOR = "\0";
var APP_ARTIFACT_COMPATIBILITY_KEY = "__artifactCompatibility";
var APP_INTERCEPTION_CONTEXT_KEY = "__interceptionContext";
var APP_LAYOUT_IDS_KEY = "__layoutIds";
var APP_LAYOUT_FLAGS_KEY = "__layoutFlags";
var APP_ROUTE_KEY = "__route";
var APP_ROOT_LAYOUT_KEY = "__rootLayout";
var APP_UNMATCHED_SLOT_WIRE_VALUE = "__VINEXT_UNMATCHED_SLOT__";
var UNMATCHED_SLOT = Symbol.for("vinext.unmatchedSlot");
function appendInterceptionContext(identity, interceptionContext) {
	return interceptionContext === null ? identity : `${identity}${APP_INTERCEPTION_SEPARATOR}${interceptionContext}`;
}
function createAppPayloadRouteId(routePath, interceptionContext) {
	return appendInterceptionContext(`route:${routePath}`, interceptionContext);
}
function createAppPayloadPageId(routePath, interceptionContext) {
	return appendInterceptionContext(`page:${routePath}`, interceptionContext);
}
function createAppPayloadLayoutId(treePath) {
	return `layout:${treePath}`;
}
function createAppPayloadTemplateId(treePath) {
	return `template:${treePath}`;
}
function createAppPayloadSlotId(slotName, treePath) {
	return `slot:${slotName}:${treePath}`;
}
function createAppPayloadCacheKey(rscUrl, interceptionContext) {
	return appendInterceptionContext(rscUrl, interceptionContext);
}
function parsePathWithInterception(input) {
	const separatorIndex = input.indexOf(APP_INTERCEPTION_SEPARATOR);
	const path = separatorIndex === -1 ? input : input.slice(0, separatorIndex);
	if (!path.startsWith("/")) return null;
	return {
		interceptionContext: separatorIndex === -1 ? null : input.slice(separatorIndex + 1),
		path
	};
}
/**
* AppElements tree paths are absolute route-tree paths on the wire.
* Bare segment names are not valid layout/template/slot tree identities.
*/
function parseTreePath(input) {
	return input.startsWith("/") ? input : null;
}
function parseAppElementsWireElementKey(key) {
	if (key.startsWith("route:")) {
		const parsed = parsePathWithInterception(key.slice(6));
		if (!parsed) return null;
		return {
			interceptionContext: parsed.interceptionContext,
			kind: "route",
			path: parsed.path
		};
	}
	if (key.startsWith("page:")) {
		const parsed = parsePathWithInterception(key.slice(5));
		if (!parsed) return null;
		return {
			interceptionContext: parsed.interceptionContext,
			kind: "page",
			path: parsed.path
		};
	}
	if (key.startsWith("layout:")) {
		const treePath = parseTreePath(key.slice(7));
		return treePath ? {
			kind: "layout",
			treePath
		} : null;
	}
	if (key.startsWith("template:")) {
		const treePath = parseTreePath(key.slice(9));
		return treePath ? {
			kind: "template",
			treePath
		} : null;
	}
	if (key.startsWith("slot:")) {
		const body = key.slice(5);
		const separatorIndex = body.indexOf(":");
		if (separatorIndex <= 0) return null;
		const name = body.slice(0, separatorIndex);
		const treePath = parseTreePath(body.slice(separatorIndex + 1));
		return treePath ? {
			kind: "slot",
			name,
			treePath
		} : null;
	}
	return null;
}
function isAppElementsWireSlotId(key) {
	if (!key.startsWith("slot:")) return false;
	const body = key.slice(5);
	const separatorIndex = body.indexOf(":");
	return separatorIndex > 0 && body.charCodeAt(separatorIndex + 1) === 47;
}
function createAppElementsWireMetadataEntries(input) {
	return {
		[APP_ROUTE_KEY]: input.routeId,
		[APP_INTERCEPTION_CONTEXT_KEY]: input.interceptionContext,
		[APP_LAYOUT_IDS_KEY]: [...input.layoutIds ?? []],
		[APP_ROOT_LAYOUT_KEY]: input.rootLayoutTreePath
	};
}
function normalizeAppElements(elements) {
	let needsNormalization = false;
	for (const [key, value] of Object.entries(elements)) if (isAppElementsWireSlotId(key) && value === "__VINEXT_UNMATCHED_SLOT__") {
		needsNormalization = true;
		break;
	}
	if (!needsNormalization) return elements;
	const normalized = {};
	for (const [key, value] of Object.entries(elements)) normalized[key] = isAppElementsWireSlotId(key) && value === "__VINEXT_UNMATCHED_SLOT__" ? UNMATCHED_SLOT : value;
	return normalized;
}
function isLayoutFlagsRecord(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	for (const v of Object.values(value)) if (v !== "s" && v !== "d") return false;
	return true;
}
function parseLayoutFlags(value) {
	if (isLayoutFlagsRecord(value)) return value;
	return {};
}
function parseLayoutIds(value) {
	if (value === void 0) return [];
	if (!Array.isArray(value)) throw new Error("[vinext] Invalid __layoutIds in App Router payload: expected layout id string[]");
	const layoutIds = [];
	for (const entry of value) {
		if (typeof entry !== "string") throw new Error("[vinext] Invalid __layoutIds in App Router payload: expected layout id string[]");
		if (parseAppElementsWireElementKey(entry)?.kind !== "layout") throw new Error("[vinext] Invalid __layoutIds in App Router payload: expected layout ids");
		layoutIds.push(entry);
	}
	return layoutIds;
}
/**
* Type predicate for a plain (non-null, non-array) record of app payload values.
* Used to distinguish the App Router payload object from bare React elements at
* the render boundary. Narrows to `Readonly<Record<string, unknown>>` because
* the outgoing payload carries heterogeneous values (ReactNodes for the rendered
* tree, plus metadata like `__layoutFlags` which is a plain object). Delegates
* to React's canonical `isValidElement` so we don't depend on React's internal
* `$$typeof` marker scheme.
*/
function isAppElementsRecord(value) {
	if (typeof value !== "object" || value === null) return false;
	if (Array.isArray(value)) return false;
	if ((0, import_react_react_server.isValidElement)(value)) return false;
	return true;
}
function withLayoutFlags(elements, layoutFlags) {
	return {
		...elements,
		[APP_LAYOUT_FLAGS_KEY]: layoutFlags
	};
}
function buildOutgoingAppPayload(input) {
	if (!isAppElementsRecord(input.element)) return input.element;
	return {
		...input.element,
		[APP_LAYOUT_FLAGS_KEY]: input.layoutFlags,
		[APP_ARTIFACT_COMPATIBILITY_KEY]: input.artifactCompatibility ?? createArtifactCompatibilityEnvelope()
	};
}
function readArtifactCompatibilityMetadata(value) {
	if (value === void 0) return createArtifactCompatibilityEnvelope();
	return parseArtifactCompatibilityEnvelope(value) ?? createArtifactCompatibilityEnvelope();
}
function readAppElementsMetadata(elements) {
	const routeId = elements[APP_ROUTE_KEY];
	if (typeof routeId !== "string") throw new Error("[vinext] Missing __route string in App Router payload");
	const interceptionContext = elements[APP_INTERCEPTION_CONTEXT_KEY];
	if (interceptionContext !== void 0 && interceptionContext !== null && typeof interceptionContext !== "string") throw new Error("[vinext] Invalid __interceptionContext in App Router payload");
	const rootLayoutTreePath = elements[APP_ROOT_LAYOUT_KEY];
	if (rootLayoutTreePath === void 0) throw new Error("[vinext] Missing __rootLayout key in App Router payload");
	if (rootLayoutTreePath !== null && typeof rootLayoutTreePath !== "string") throw new Error("[vinext] Invalid __rootLayout in App Router payload: expected string or null");
	const layoutFlags = parseLayoutFlags(elements[APP_LAYOUT_FLAGS_KEY]);
	const layoutIds = parseLayoutIds(elements[APP_LAYOUT_IDS_KEY]);
	return {
		artifactCompatibility: readArtifactCompatibilityMetadata(elements[APP_ARTIFACT_COMPATIBILITY_KEY]),
		interceptionContext: interceptionContext ?? null,
		layoutIds,
		layoutFlags,
		routeId,
		rootLayoutTreePath
	};
}
var AppElementsWire = {
	keys: {
		artifactCompatibility: APP_ARTIFACT_COMPATIBILITY_KEY,
		interceptionContext: APP_INTERCEPTION_CONTEXT_KEY,
		layoutIds: APP_LAYOUT_IDS_KEY,
		layoutFlags: APP_LAYOUT_FLAGS_KEY,
		rootLayout: APP_ROOT_LAYOUT_KEY,
		route: APP_ROUTE_KEY
	},
	unmatchedSlotValue: APP_UNMATCHED_SLOT_WIRE_VALUE,
	createMetadataEntries: createAppElementsWireMetadataEntries,
	decode: normalizeAppElements,
	encodeCacheKey: createAppPayloadCacheKey,
	encodeLayoutId: createAppPayloadLayoutId,
	encodeOutgoingPayload: buildOutgoingAppPayload,
	encodePageId: createAppPayloadPageId,
	encodeRouteId: createAppPayloadRouteId,
	encodeSlotId: createAppPayloadSlotId,
	encodeTemplateId: createAppPayloadTemplateId,
	isSlotId: isAppElementsWireSlotId,
	parseElementKey: parseAppElementsWireElementKey,
	readMetadata: readAppElementsMetadata,
	withLayoutFlags
};
//#endregion
//#region node_modules/vinext/dist/server/app-mounted-slots-header.js
/**
* Normalize the `x-vinext-mounted-slots` header for request handling and cache keying.
*
* The browser sends mounted slot ids as a space-separated list in the order slots were
* rendered, which changes across navigations. This normalizes to a canonical form
* (sorted, deduplicated) so equivalent slot sets map to the same RSC cache entry.
*
* Consumed by:
*   - app-rsc-request-normalization (request lifecycle, reads incoming header)
*   - app-elements (outgoing x-vinext-mounted-slots construction)
*   - isr-cache (RSC cache key generation)
*/
function normalizeMountedSlotsHeader(raw) {
	if (!raw) return null;
	return Array.from(new Set(raw.split(/\s+/).filter(Boolean))).sort().join(" ") || null;
}
//#endregion
//#region node_modules/vinext/dist/server/app-rsc-render-mode.js
var APP_RSC_RENDER_MODE_NAVIGATION = "navigation";
var APP_RSC_RENDER_MODE_REFRESH_PRESERVE_UI = "refresh-preserve-ui";
var APP_RSC_RENDER_MODE_ACTION_RERENDER_PRESERVE_UI = "action-rerender-preserve-ui";
function shouldSuppressLoadingBoundaries(mode) {
	return mode === "refresh-preserve-ui" || mode === "action-rerender-preserve-ui";
}
function shouldUsePreserveUiCacheVariant(mode) {
	return shouldSuppressLoadingBoundaries(mode);
}
function parseAppRscRenderMode(value) {
	switch (value) {
		case APP_RSC_RENDER_MODE_REFRESH_PRESERVE_UI: return APP_RSC_RENDER_MODE_REFRESH_PRESERVE_UI;
		case APP_RSC_RENDER_MODE_ACTION_RERENDER_PRESERVE_UI: return APP_RSC_RENDER_MODE_ACTION_RERENDER_PRESERVE_UI;
		default: return APP_RSC_RENDER_MODE_NAVIGATION;
	}
}
//#endregion
//#region node_modules/vinext/dist/server/app-rsc-cache-busting.js
/**
* RSC cache-busting hashes cover the headers that make a `.rsc` payload vary.
* Client-side variant headers must survive transit through CDNs and reverse
* proxies; stripping them changes the server hash and turns stale URLs into
* repeated canonicalization redirects.
*/
var VINEXT_RSC_CACHE_BUSTING_SEARCH_PARAM = "_rsc";
var VINEXT_RSC_VARY_HEADER = [
	"RSC",
	"Accept",
	NEXT_ROUTER_STATE_TREE_HEADER,
	NEXT_ROUTER_PREFETCH_HEADER,
	NEXT_ROUTER_SEGMENT_PREFETCH_HEADER,
	NEXT_URL_HEADER,
	VINEXT_INTERCEPTION_CONTEXT_HEADER,
	VINEXT_MOUNTED_SLOTS_HEADER,
	VINEXT_RSC_RENDER_MODE_HEADER
].join(", ");
var CACHE_BUSTING_DIGEST_BYTES = 12;
var textEncoder = new TextEncoder();
function encodeBase64Url(bytes) {
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
function normalizeHeaderValue(value) {
	return value ?? "0";
}
function normalizeRenderModeHeaderValue(value) {
	const renderMode = parseAppRscRenderMode(value);
	return renderMode === "navigation" ? null : renderMode;
}
function createCacheBustingInput(headers, options = {}) {
	const values = [
		headers.get(NEXT_ROUTER_PREFETCH_HEADER),
		headers.get(NEXT_ROUTER_SEGMENT_PREFETCH_HEADER),
		headers.get(NEXT_ROUTER_STATE_TREE_HEADER),
		headers.get(NEXT_URL_HEADER),
		headers.get(VINEXT_INTERCEPTION_CONTEXT_HEADER),
		headers.get(VINEXT_MOUNTED_SLOTS_HEADER),
		...options.includeRenderModeHeader === false ? [] : [normalizeRenderModeHeaderValue(headers.get(VINEXT_RSC_RENDER_MODE_HEADER))]
	];
	if (values.every((value) => value === null)) return null;
	return values.map(normalizeHeaderValue).join(",");
}
async function sha256CacheBustingHash(input) {
	const digest = await globalThis.crypto.subtle.digest("SHA-256", textEncoder.encode(input));
	return encodeBase64Url(new Uint8Array(digest).subarray(0, CACHE_BUSTING_DIGEST_BYTES));
}
function computeLegacyRscCacheBustingSearchParam(headers) {
	const input = createCacheBustingInput(headers);
	return input === null ? "" : fnv1a64(input);
}
async function computePreviousRscCacheBustingSearchParam(headers) {
	const input = createCacheBustingInput(headers, { includeRenderModeHeader: false });
	if (input === null) return null;
	return sha256CacheBustingHash(input);
}
function computePreviousLegacyRscCacheBustingSearchParam(headers) {
	const input = createCacheBustingInput(headers, { includeRenderModeHeader: false });
	return input === null ? null : fnv1a64(input);
}
function getSearchPairsWithoutRscCacheBusting(url) {
	return (url.search.startsWith("?") ? url.search.slice(1) : url.search).split("&").filter((pair) => pair.length > 0 && !isRscCacheBustingSearchPair(pair));
}
function isRscCacheBustingSearchPair(pair) {
	const separatorIndex = pair.indexOf("=");
	const rawKey = separatorIndex === -1 ? pair : pair.slice(0, separatorIndex);
	try {
		return decodeURIComponent(rawKey.replaceAll("+", " ")) === VINEXT_RSC_CACHE_BUSTING_SEARCH_PARAM;
	} catch {
		return rawKey === VINEXT_RSC_CACHE_BUSTING_SEARCH_PARAM;
	}
}
async function computeRscCacheBustingSearchParam(headers) {
	const input = createCacheBustingInput(headers);
	if (input === null) return "";
	return sha256CacheBustingHash(input);
}
function setRscCacheBustingSearchParam(url, hash) {
	const pairs = getSearchPairsWithoutRscCacheBusting(url);
	pairs.push(hash.length > 0 ? `${VINEXT_RSC_CACHE_BUSTING_SEARCH_PARAM}=${hash}` : VINEXT_RSC_CACHE_BUSTING_SEARCH_PARAM);
	url.search = `?${pairs.join("&")}`;
}
function stripRscCacheBustingSearchParam(url) {
	const pairs = getSearchPairsWithoutRscCacheBusting(url);
	url.search = pairs.length > 0 ? `?${pairs.join("&")}` : "";
}
/**
* Remove a trailing `.rsc` suffix from a pathname. Returns the pathname
* unchanged when the suffix is absent.
*/
function stripRscSuffix(pathname) {
	return pathname.endsWith(".rsc") ? pathname.slice(0, -4) : pathname;
}
function toRscRequestPath(href) {
	const hashIndex = href.indexOf("#");
	const beforeHash = hashIndex === -1 ? href : href.slice(0, hashIndex);
	const queryIndex = beforeHash.indexOf("?");
	const pathname = queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);
	const query = queryIndex === -1 ? "" : beforeHash.slice(queryIndex);
	return `${pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}.rsc${query}`;
}
async function createRscRequestUrl(href, headers) {
	const url = new URL(toRscRequestPath(href), "http://vinext.local");
	setRscCacheBustingSearchParam(url, await computeRscCacheBustingSearchParam(headers));
	return `${url.pathname}${url.search}`;
}
async function createRscRedirectLocation(location, request) {
	const requestUrl = new URL(request.url);
	const destinationUrl = new URL(location, requestUrl);
	if (destinationUrl.origin !== requestUrl.origin) return destinationUrl.toString();
	const rscPath = await createRscRequestUrl(`${destinationUrl.pathname}${destinationUrl.search}`, request.headers);
	return `${destinationUrl.origin}${rscPath}`;
}
async function resolveInvalidRscCacheBustingRequest(options) {
	if (!options.isRscRequest || options.request.method !== "GET" && options.request.method !== "HEAD") return null;
	const url = new URL(options.request.url);
	const actualHash = url.searchParams.get(VINEXT_RSC_CACHE_BUSTING_SEARCH_PARAM);
	const expectedHash = await computeRscCacheBustingSearchParam(options.request.headers);
	if (actualHash === null && expectedHash === "") return null;
	const acceptedHashes = new Set([expectedHash]);
	if (actualHash !== null && actualHash !== expectedHash) {
		acceptedHashes.add(computeLegacyRscCacheBustingSearchParam(options.request.headers));
		if (normalizeRenderModeHeaderValue(options.request.headers.get("X-Vinext-Rsc-Render-Mode")) === null) {
			const previousHash = await computePreviousRscCacheBustingSearchParam(options.request.headers);
			const previousLegacyHash = computePreviousLegacyRscCacheBustingSearchParam(options.request.headers);
			if (previousHash !== null) acceptedHashes.add(previousHash);
			if (previousLegacyHash !== null) acceptedHashes.add(previousLegacyHash);
		}
	}
	if (actualHash !== null && acceptedHashes.has(actualHash)) return null;
	setRscCacheBustingSearchParam(url, expectedHash);
	return new Response(null, {
		status: 307,
		headers: { Location: `${url.pathname}${url.search}` }
	});
}
//#endregion
//#region node_modules/vinext/dist/shims/navigation.js
var _SERVER_INSERTED_HTML_CTX_KEY = Symbol.for("vinext.serverInsertedHTMLContext");
function getServerInsertedHTMLContext() {
	if (typeof import_react_react_server.createContext !== "function") return null;
	const globalState = globalThis;
	if (!globalState[_SERVER_INSERTED_HTML_CTX_KEY]) globalState[_SERVER_INSERTED_HTML_CTX_KEY] = import_react_react_server.createContext(null);
	return globalState[_SERVER_INSERTED_HTML_CTX_KEY] ?? null;
}
getServerInsertedHTMLContext();
var GLOBAL_ACCESSORS_KEY = Symbol.for("vinext.navigation.globalAccessors");
var _GLOBAL_ACCESSORS_KEY = GLOBAL_ACCESSORS_KEY;
var _GLOBAL_HYDRATION_CONTEXT_KEY = Symbol.for("vinext.navigation.clientHydrationContext");
function _getGlobalAccessors() {
	return globalThis[_GLOBAL_ACCESSORS_KEY];
}
function _getClientHydrationContext() {
	const globalState = globalThis;
	if (Object.prototype.hasOwnProperty.call(globalState, _GLOBAL_HYDRATION_CONTEXT_KEY)) return globalState[_GLOBAL_HYDRATION_CONTEXT_KEY] ?? null;
}
function _setClientHydrationContext(ctx) {
	globalThis[_GLOBAL_HYDRATION_CONTEXT_KEY] = ctx;
}
var _serverContext = null;
var _getServerContext = () => {
	if (typeof window !== "undefined") {
		const hydrationContext = _getClientHydrationContext();
		return hydrationContext !== void 0 ? hydrationContext : _serverContext;
	}
	const g = _getGlobalAccessors();
	return g ? g.getServerContext() : _serverContext;
};
var _setServerContext = (ctx) => {
	if (typeof window !== "undefined") {
		_serverContext = ctx;
		_setClientHydrationContext(ctx);
		return;
	}
	const g = _getGlobalAccessors();
	if (g) g.setServerContext(ctx);
	else _serverContext = ctx;
};
/**
* Register ALS-backed state accessors. Called by navigation-state.ts on import.
* @internal
*/
function _registerStateAccessors(accessors) {
	_getServerContext = accessors.getServerContext;
	_setServerContext = accessors.setServerContext;
	accessors.getInsertedHTMLCallbacks;
	accessors.clearInsertedHTMLCallbacks;
}
/**
* Get the navigation context for the current SSR/RSC render.
* Reads from AsyncLocalStorage when available (concurrent-safe),
* otherwise falls back to module-level state.
*/
function getNavigationContext() {
	return _getServerContext();
}
/**
* Set the navigation context for the current SSR/RSC render.
* Called by the framework entry before rendering each request.
*/
function setNavigationContext(ctx) {
	_setServerContext(ctx);
}
var isServer = typeof window === "undefined";
var _CLIENT_NAV_STATE_KEY = Symbol.for("vinext.clientNavigationState");
function getClientNavigationState() {
	if (isServer) return null;
	const globalState = window;
	globalState[_CLIENT_NAV_STATE_KEY] ??= {
		listeners: /* @__PURE__ */ new Set(),
		cachedSearch: window.location.search,
		cachedReadonlySearchParams: new ReadonlyURLSearchParams(window.location.search),
		cachedPathname: stripBasePath(window.location.pathname, ""),
		clientParams: {},
		clientParamsJson: "{}",
		pendingClientParams: null,
		pendingClientParamsJson: null,
		pendingPathname: null,
		pendingPathnameNavId: null,
		originalPushState: window.history.pushState.bind(window.history),
		originalReplaceState: window.history.replaceState.bind(window.history),
		patchInstalled: false,
		hasPendingNavigationUpdate: false,
		suppressUrlNotifyCount: 0,
		navigationSnapshotActiveCount: 0
	};
	return globalState[_CLIENT_NAV_STATE_KEY];
}
function notifyNavigationListeners() {
	const state = getClientNavigationState();
	if (!state) return;
	for (const fn of state.listeners) fn();
}
function syncCommittedUrlStateFromLocation() {
	const state = getClientNavigationState();
	if (!state) return false;
	let changed = false;
	const pathname = stripBasePath(window.location.pathname, "");
	if (pathname !== state.cachedPathname) {
		state.cachedPathname = pathname;
		changed = true;
	}
	const search = window.location.search;
	if (search !== state.cachedSearch) {
		state.cachedSearch = search;
		state.cachedReadonlySearchParams = new ReadonlyURLSearchParams(search);
		changed = true;
	}
	return changed;
}
/**
* Commit pending client navigation state to committed snapshots.
*
* navId is optional: callers that don't own pendingPathname (for example,
* superseded pre-paint cleanup) may pass undefined to flush URL/params state
* without clearing pendingPathname owned by the active navigation. Such callers
* must opt in explicitly if they also own an activated render snapshot.
*/
function commitClientNavigationState(navId, options) {
	if (isServer) return;
	const state = getClientNavigationState();
	if (!state) return;
	if ((navId !== void 0 || options?.releaseSnapshot === true) && state.navigationSnapshotActiveCount > 0) state.navigationSnapshotActiveCount -= 1;
	const urlChanged = syncCommittedUrlStateFromLocation();
	if (state.pendingClientParams !== null && state.pendingClientParamsJson !== null) {
		state.clientParams = state.pendingClientParams;
		state.clientParamsJson = state.pendingClientParamsJson;
		state.pendingClientParams = null;
		state.pendingClientParamsJson = null;
	}
	if (state.pendingPathnameNavId === null || navId !== void 0 && state.pendingPathnameNavId === navId) {
		state.pendingPathname = null;
		state.pendingPathnameNavId = null;
	}
	const shouldNotify = urlChanged || state.hasPendingNavigationUpdate;
	state.hasPendingNavigationUpdate = false;
	if (shouldNotify) notifyNavigationListeners();
}
/**
* Restore scroll position from a history state object (used on popstate).
*
* When an RSC navigation is in flight (back/forward triggers both this
* handler and the browser entry's popstate handler which calls
* __VINEXT_RSC_NAVIGATE__), we must wait for the new content to render
* before scrolling. Otherwise the user sees old content flash at the
* restored scroll position.
*
* This handler fires before the browser entry's popstate handler (because
* navigation.ts is loaded before hydration completes), so we defer via a
* microtask to give the browser entry handler a chance to set
* __VINEXT_RSC_PENDING__. Promise.resolve() schedules a microtask
* that runs after all synchronous event listeners have completed.
*/
function restoreScrollPosition(state) {
	if (state && typeof state === "object" && "__vinext_scrollY" in state) {
		const { __vinext_scrollX: x, __vinext_scrollY: y } = state;
		Promise.resolve().then(() => {
			const pending = window.__VINEXT_RSC_PENDING__ ?? null;
			if (pending) pending.then(() => {
				requestAnimationFrame(() => {
					window.scrollTo(x, y);
				});
			});
			else requestAnimationFrame(() => {
				window.scrollTo(x, y);
			});
		});
	}
}
/**
* HTTP Access Fallback error code â€” shared prefix for notFound/forbidden/unauthorized.
* Matches Next.js 16's unified error handling approach.
*/
var HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
/**
* Internal error class used by redirect/notFound/forbidden/unauthorized.
* The `digest` field is the serialised control-flow signal read by the
* framework's error boundary and server-side request handlers.
*/
var VinextNavigationError = class extends Error {
	digest;
	constructor(message, digest) {
		super(message);
		this.digest = digest;
	}
};
/**
* Trigger a permanent redirect (308).
*
* Accepts an optional `type` parameter matching Next.js's signature.
* Defaults to "replace" (not context-dependent like `redirect()`).
*
* @see https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/redirect.ts
*/
function permanentRedirect(url, type = "replace") {
	throw new VinextNavigationError(`NEXT_REDIRECT:${url}`, `NEXT_REDIRECT;${type};${encodeURIComponent(url)};308`);
}
/**
* Trigger a not-found response (404). Caught by the framework.
*/
function notFound() {
	throw new VinextNavigationError("NEXT_NOT_FOUND", `${HTTP_ERROR_FALLBACK_ERROR_CODE};404`);
}
if (!isServer) {
	const state = getClientNavigationState();
	if (state && !state.patchInstalled) {
		state.patchInstalled = true;
		window.addEventListener("popstate", (event) => {
			if (typeof window.__VINEXT_RSC_NAVIGATE__ !== "function") {
				commitClientNavigationState();
				restoreScrollPosition(event.state);
			}
		});
		window.history.pushState = function patchedPushState(data, unused, url) {
			state.originalPushState.call(window.history, data, unused, url);
			if (state.suppressUrlNotifyCount === 0) commitClientNavigationState();
		};
		window.history.replaceState = function patchedReplaceState(data, unused, url) {
			state.originalReplaceState.call(window.history, data, unused, url);
			if (state.suppressUrlNotifyCount === 0) commitClientNavigationState();
		};
	}
}
//#endregion
//#region node_modules/vinext/dist/shims/client-hook-error.js
/**
* Shared error helper for client-only hooks called in Server Components.
*
* Used by `.react-server.ts` shim variants to provide a clear, actionable
* error message when a developer forgets the "use client" directive.
*
* @see https://github.com/cloudflare/vinext/issues/834
*/
function buildClientHookErrorMessage(hookName) {
	return `${hookName} only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component`;
}
//#endregion
//#region node_modules/vinext/dist/shims/internal/cookie-serialize.js
/**
* RFC 6265 Â§4.1.1: cookie-name is a token (RFC 2616 Â§2.2).
* Allowed: any visible ASCII (0x21-0x7E) except separators: ()<>@,;:\"/[]?={}
*/
var VALID_COOKIE_NAME_RE = /^[\x21\x23-\x27\x2A\x2B\x2D\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+$/;
function validateCookieName(name) {
	if (!name || !VALID_COOKIE_NAME_RE.test(name)) throw new Error(`Invalid cookie name: ${JSON.stringify(name)}`);
}
/**
* Validate cookie attribute values (path, domain) to prevent injection
* via semicolons, newlines, or other control characters.
*/
function validateCookieAttributeValue(value, attributeName) {
	for (let i = 0; i < value.length; i++) {
		const code = value.charCodeAt(i);
		if (code <= 31 || code === 127 || value[i] === ";") throw new Error(`Invalid cookie ${attributeName} value: ${JSON.stringify(value)}`);
	}
}
/**
* Build a Set-Cookie header string from a cookie name, value, and attributes.
*
* - Encodes the value with `encodeURIComponent`.
* - Defaults `Path` to `/` (matching @edge-runtime/cookies and Next.js).
* - Validates path/domain to reject control characters and semicolons.
* - Emits attributes in the order: Path, Domain, Max-Age, Expires, HttpOnly,
*   Secure, SameSite.
*
* The caller is responsible for validating the cookie name (typically before
* mutating any internal state) via `validateCookieName`.
*/
function serializeSetCookie(name, value, options) {
	const parts = [`${name}=${encodeURIComponent(value)}`];
	const path = options?.path ?? "/";
	validateCookieAttributeValue(path, "Path");
	parts.push(`Path=${path}`);
	if (options?.domain) {
		validateCookieAttributeValue(options.domain, "Domain");
		parts.push(`Domain=${options.domain}`);
	}
	if (options?.maxAge !== void 0) parts.push(`Max-Age=${options.maxAge}`);
	if (options?.expires) parts.push(`Expires=${options.expires.toUTCString()}`);
	if (options?.httpOnly) parts.push("HttpOnly");
	if (options?.secure) parts.push("Secure");
	if (options?.sameSite) parts.push(`SameSite=${options.sameSite}`);
	return parts.join("; ");
}
//#endregion
//#region node_modules/vinext/dist/shims/internal/parse-cookie-header.js
/**
* Port of the current Next.js/@edge-runtime request cookie parser semantics.
*
* Important details:
* - split on a semicolon-plus-optional-spaces pattern
* - preserve whitespace around names/values otherwise
* - bare tokens become "true"
* - malformed percent-encoded values are skipped
* - duplicate names collapse to the last value via Map.set()
*/
function parseCookieHeader(cookieHeader) {
	const cookies = /* @__PURE__ */ new Map();
	for (const pair of cookieHeader.split(/; */)) {
		if (!pair) continue;
		const splitAt = pair.indexOf("=");
		if (splitAt === -1) {
			cookies.set(pair, "true");
			continue;
		}
		const key = pair.slice(0, splitAt);
		const value = pair.slice(splitAt + 1);
		try {
			cookies.set(key, decodeURIComponent(value));
		} catch {}
	}
	return cookies;
}
//#endregion
//#region node_modules/vinext/dist/shims/headers.js
var _FALLBACK_KEY$4 = Symbol.for("vinext.nextHeadersShim.fallback");
var _g$6 = globalThis;
var _als$2 = getOrCreateAls("vinext.nextHeadersShim.als");
var _fallbackState$3 = _g$6[_FALLBACK_KEY$4] ??= {
	headersContext: null,
	dynamicUsageDetected: false,
	invalidDynamicUsageError: null,
	pendingSetCookies: [],
	draftModeCookieHeader: null,
	phase: "render"
};
(/* @__PURE__ */ new Date(0)).toUTCString();
function splitMiddlewareSetCookieHeader(value) {
	const cookies = [];
	let start = 0;
	let inExpires = false;
	let expiresCommaSeen = false;
	for (let i = 0; i < value.length; i++) {
		if (value.slice(i, i + 8).toLowerCase() === "expires=") {
			inExpires = true;
			expiresCommaSeen = false;
			i += 7;
			continue;
		}
		const ch = value[i];
		if (inExpires && ch === ";") {
			inExpires = false;
			expiresCommaSeen = false;
			continue;
		}
		if (ch !== ",") continue;
		if (inExpires && !expiresCommaSeen) {
			expiresCommaSeen = true;
			continue;
		}
		const cookie = value.slice(start, i).trim();
		if (cookie) cookies.push(cookie);
		start = i + 1;
		inExpires = false;
		expiresCommaSeen = false;
	}
	const cookie = value.slice(start).trim();
	if (cookie) cookies.push(cookie);
	return cookies;
}
function setCookieNameValue(setCookie) {
	const equalsIndex = setCookie.indexOf("=");
	if (equalsIndex <= 0) return null;
	const name = setCookie.slice(0, equalsIndex).trim();
	const valueEnd = setCookie.indexOf(";", equalsIndex + 1);
	const encodedValue = setCookie.slice(equalsIndex + 1, valueEnd === -1 ? void 0 : valueEnd);
	let value;
	try {
		value = decodeURIComponent(encodedValue);
	} catch {
		value = encodedValue;
	}
	return {
		name,
		value
	};
}
function rebuildCookiesFromHeader(ctx, cookieHeader) {
	ctx.cookies.clear();
	if (cookieHeader === null) return;
	const nextCookies = parseCookieHeader(cookieHeader);
	for (const [name, value] of nextCookies) ctx.cookies.set(name, value);
}
function mergeMiddlewareSetCookies(ctx, rawHeader) {
	if (rawHeader === null) return false;
	let merged = false;
	for (const setCookie of splitMiddlewareSetCookieHeader(rawHeader)) {
		const entry = setCookieNameValue(setCookie);
		if (!entry) continue;
		ctx.cookies.set(entry.name, entry.value);
		merged = true;
	}
	return merged;
}
function _getState$2() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _als$2.getStore() ?? _fallbackState$3;
}
/**
* Dynamic usage flag â€” set when a component calls connection(), cookies(),
* headers(), or noStore() during rendering. When true, ISR caching is
* bypassed and the response gets Cache-Control: no-store.
*/
/**
* Mark the current render as requiring dynamic (uncached) rendering.
* Called by connection(), cookies(), headers(), and noStore().
*/
function markDynamicUsage() {
	const state = _getState$2();
	if (state.headersContext?.forceStatic) return;
	state.dynamicUsageDetected = true;
}
/** Symbol used by cache-runtime.ts to store the "use cache" ALS on globalThis */
var _USE_CACHE_ALS_KEY = Symbol.for("vinext.cacheRuntime.contextAls");
/** Symbol used by cache.ts to store the unstable_cache ALS on globalThis */
var _UNSTABLE_CACHE_ALS_KEY = Symbol.for("vinext.unstableCache.als");
var _gHeaders = globalThis;
function _isInsideUseCache() {
	return _gHeaders[_USE_CACHE_ALS_KEY]?.getStore() != null;
}
function _isInsideUnstableCache() {
	return _gHeaders[_UNSTABLE_CACHE_ALS_KEY]?.getStore() === true;
}
/**
* Throw if the current execution is inside a "use cache" or unstable_cache()
* scope. Called by dynamic request APIs (headers, cookies, connection) to
* prevent request-specific data from being frozen into cached results.
*
* @param apiName - The name of the API being called (e.g. "connection()")
*/
function throwIfInsideCacheScope(apiName) {
	if (_isInsideUseCache()) {
		const error = /* @__PURE__ */ new Error(`\`${apiName}\` cannot be called inside "use cache". If you need this data inside a cached function, call \`${apiName}\` outside and pass the required data as an argument.`);
		try {
			const ctx = getRequestContext();
			if (ctx) ctx.invalidDynamicUsageError = error;
		} catch {}
		throw error;
	}
	if (_isInsideUnstableCache()) {
		const error = /* @__PURE__ */ new Error(`\`${apiName}\` cannot be called inside a function cached with \`unstable_cache()\`. If you need this data inside a cached function, call \`${apiName}\` outside and pass the required data as an argument.`);
		try {
			const ctx = getRequestContext();
			if (ctx) ctx.invalidDynamicUsageError = error;
		} catch {}
		throw error;
	}
}
/**
* Check, consume, and return any invalid dynamic usage error recorded during
* the render (e.g. cookies() called inside "use cache"). This error persists
* even if the throw was caught by user-code try/catch, so it can surface on
* client-side navigations where the static shell validation is skipped.
* Ported from Next.js: workStore.invalidDynamicUsageError in
* packages/next/src/server/app-render/app-render.tsx
* https://github.com/vercel/next.js/commit/f5e54c06726b571a042fce67417e40a29f6b8689
*/
function consumeInvalidDynamicUsageError() {
	const state = _getState$2();
	const err = state.invalidDynamicUsageError;
	state.invalidDynamicUsageError = null;
	return err;
}
/**
* Check and reset the dynamic usage flag.
* Called by the server after rendering to decide on caching.
*/
function consumeDynamicUsage() {
	const state = _getState$2();
	const used = state.dynamicUsageDetected;
	state.dynamicUsageDetected = false;
	return used;
}
function _setStatePhase(state, phase) {
	const previous = state.phase;
	state.phase = phase;
	return previous;
}
function setHeadersAccessPhase(phase) {
	return _setStatePhase(_getState$2(), phase);
}
/**
* Set the headers/cookies context for the current RSC render.
* Called by the framework's RSC entry before rendering each request.
*
* @deprecated Prefer runWithHeadersContext() which uses als.run() for
* proper per-request isolation. This function mutates the ALS store
* in-place and is only safe for cleanup (ctx=null) within an existing
* als.run() scope.
*/
/**
* Returns the current live HeadersContext from ALS (or the fallback).
* Used after applyMiddlewareRequestHeaders() to build a post-middleware
* request context for afterFiles/fallback rewrite has/missing evaluation.
*/
function getHeadersContext() {
	return _getState$2().headersContext;
}
function setHeadersContext(ctx) {
	const state = _getState$2();
	if (ctx !== null) {
		state.headersContext = ctx;
		state.dynamicUsageDetected = false;
		state.pendingSetCookies = [];
		state.draftModeCookieHeader = null;
		state.phase = "render";
	} else {
		state.headersContext = null;
		state.phase = "render";
	}
}
/**
* Apply middleware-forwarded request headers to the current headers context.
*
* When Next.js middleware calls `NextResponse.next()` or `NextResponse.rewrite()`
* with `{ request: { headers } }`, the modified headers are encoded on the
* middleware response. This function decodes that protocol and applies the
* resulting request header set to the live `HeadersContext`. When an override
* list is present, omitted headers are deleted as part of the rebuild.
*
* Cached `readonlyHeaders` and `readonlyCookies` snapshots on the
* HeadersContext must be invalidated whenever this function rebuilds the
* underlying `headers`/`cookies`. Otherwise a middleware that reads
* `headers()` (or `cookies()`) before returning a request-header override â€”
* for example `@clerk/nextjs`, whose `clerkClient()` reads `headers()` via
* `buildRequestLike()` during middleware execution â€” primes a sealed snapshot
* built from the *pre*-override request, and any subsequent `headers()` call
* from a Server Component would return that stale snapshot instead of the
* middleware-modified view.
*/
function applyMiddlewareRequestHeaders(middlewareResponseHeaders) {
	const state = _getState$2();
	if (!state.headersContext) return;
	const ctx = state.headersContext;
	const previousCookieHeader = ctx.headers.get("cookie");
	const middlewareSetCookieHeader = middlewareResponseHeaders.get(MIDDLEWARE_SET_COOKIE_HEADER);
	const nextHeaders = buildRequestHeadersFromMiddlewareResponse(ctx.headers, middlewareResponseHeaders);
	if (!nextHeaders && middlewareSetCookieHeader === null) return;
	if (nextHeaders) {
		ctx.headers = nextHeaders;
		ctx.readonlyHeaders = void 0;
		const nextCookieHeader = nextHeaders.get("cookie");
		if (previousCookieHeader !== nextCookieHeader) {
			rebuildCookiesFromHeader(ctx, nextCookieHeader);
			ctx.readonlyCookies = void 0;
			ctx.mutableCookies = void 0;
		}
	}
	if (mergeMiddlewareSetCookies(ctx, middlewareSetCookieHeader)) {
		ctx.readonlyCookies = void 0;
		ctx.mutableCookies = void 0;
	}
}
/** Methods on `Headers` that mutate state. Hoisted to module scope â€” static. */
var _HEADERS_MUTATING_METHODS = new Set([
	"set",
	"delete",
	"append"
]);
var ReadonlyHeadersError = class ReadonlyHeadersError extends Error {
	constructor() {
		super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
	}
	static callable() {
		throw new ReadonlyHeadersError();
	}
};
function _decorateRequestApiPromise(promise, target) {
	return new Proxy(promise, {
		get(promiseTarget, prop) {
			if (prop in promiseTarget) {
				const value = Reflect.get(promiseTarget, prop, promiseTarget);
				return typeof value === "function" ? value.bind(promiseTarget) : value;
			}
			const value = Reflect.get(target, prop, target);
			return typeof value === "function" ? value.bind(target) : value;
		},
		has(promiseTarget, prop) {
			return prop in promiseTarget || prop in target;
		},
		ownKeys(promiseTarget) {
			return Array.from(new Set([...Reflect.ownKeys(promiseTarget), ...Reflect.ownKeys(target)]));
		},
		getOwnPropertyDescriptor(promiseTarget, prop) {
			return Reflect.getOwnPropertyDescriptor(promiseTarget, prop) ?? Reflect.getOwnPropertyDescriptor(target, prop);
		}
	});
}
var _decoratedHeadersPromises = /* @__PURE__ */ new WeakMap();
function _getOrCreateDecoratedRequestApiPromise(cache, target) {
	const cached = cache.get(target);
	if (cached) return cached;
	const promise = _decorateRequestApiPromise(Promise.resolve(target), target);
	cache.set(target, promise);
	return promise;
}
function _decorateRejectedRequestApiPromise(error) {
	const normalizedError = error instanceof Error ? error : new Error(String(error));
	const promise = Promise.reject(normalizedError);
	promise.catch(() => {});
	return _decorateRequestApiPromise(promise, new Proxy({}, { get(_target, prop) {
		if (prop === "then" || prop === "catch" || prop === "finally") return;
		throw normalizedError;
	} }));
}
function _sealHeaders(headers) {
	return new Proxy(headers, { get(target, prop) {
		if (typeof prop === "string" && _HEADERS_MUTATING_METHODS.has(prop)) throw new ReadonlyHeadersError();
		const value = Reflect.get(target, prop, target);
		return typeof value === "function" ? value.bind(target) : value;
	} });
}
function _getReadonlyHeaders(ctx) {
	if (!ctx.readonlyHeaders) ctx.readonlyHeaders = _sealHeaders(ctx.headers);
	return ctx.readonlyHeaders;
}
/**
* Create a HeadersContext from a standard Request object.
*
* Performance note: In Workerd (Cloudflare Workers), `new Headers(request.headers)`
* copies the entire header map across the V8/C++ boundary, which shows up as
* ~815 ms self-time in production profiles when requests carry many headers.
* We defer this copy with a lazy proxy:
*
* - Reads (`get`, `has`, `entries`, â€¦) are forwarded directly to the original
*   immutable `request.headers` â€” zero copy cost on the hot path.
* - The first mutating call (`set`, `delete`, `append`) materialises
*   `new Headers(request.headers)` once, then applies the mutation to the copy.
*   All subsequent operations go to the copy.
*
* This means the ~815 ms copy only occurs when middleware actually rewrites
* request headers via `NextResponse.next({ request: { headers } })`, which is
* uncommon.  Pure read requests (the vast majority) pay zero copy cost.
*
* Cookie parsing is also deferred: the `cookie` header string is not split
* until the first call to `cookies()` or `draftMode()`.
*/
function headersContextFromRequest(request) {
	let _mutable = null;
	const headersProxy = new Proxy(request.headers, { get(target, prop) {
		const src = _mutable ?? target;
		if (typeof prop === "string" && _HEADERS_MUTATING_METHODS.has(prop)) return (...args) => {
			if (!_mutable) _mutable = new Headers(target);
			return _mutable[prop](...args);
		};
		const value = Reflect.get(src, prop, src);
		return typeof value === "function" ? value.bind(src) : value;
	} });
	let _cookies = null;
	function getCookies() {
		if (_cookies) return _cookies;
		_cookies = parseCookieHeader(headersProxy.get("cookie") || "");
		return _cookies;
	}
	return {
		headers: headersProxy,
		get cookies() {
			return getCookies();
		}
	};
}
/**
* Read-only Headers instance from the incoming request.
* Returns a Promise in Next.js 15+ style (but resolves synchronously since
* the context is already available).
*/
function headers() {
	try {
		throwIfInsideCacheScope("headers()");
	} catch (error) {
		return _decorateRejectedRequestApiPromise(error);
	}
	const state = _getState$2();
	if (!state.headersContext) return _decorateRejectedRequestApiPromise(/* @__PURE__ */ new Error("headers() can only be called from a Server Component, Route Handler, or Server Action. Make sure you're not calling it from a Client Component."));
	if (state.headersContext.accessError) return _decorateRejectedRequestApiPromise(state.headersContext.accessError);
	markDynamicUsage();
	return _getOrCreateDecoratedRequestApiPromise(_decoratedHeadersPromises, _getReadonlyHeaders(state.headersContext));
}
/** Accumulated Set-Cookie headers from cookies().set() / .delete() calls */
/**
* Get and clear all pending Set-Cookie headers generated by cookies().set()/delete().
* Called by the framework after rendering to attach headers to the response.
*/
function getAndClearPendingCookies() {
	const state = _getState$2();
	const cookies = state.pendingSetCookies;
	state.pendingSetCookies = [];
	return cookies;
}
var DRAFT_MODE_COOKIE = "__prerender_bypass";
(/* @__PURE__ */ new Date(0)).toUTCString();
function getDraftSecret() {
	return "6250c53c-5c57-4b86-90a0-d46a0e7a6f6f";
}
/**
* Get any Set-Cookie header generated by draftMode().enable()/disable().
* Called by the framework after rendering to attach the header to the response.
*/
function getDraftModeCookieHeader() {
	const state = _getState$2();
	const header = state.draftModeCookieHeader;
	state.draftModeCookieHeader = null;
	return header;
}
function isDraftModeRequest(request) {
	const cookieHeader = request.headers.get("cookie");
	if (!cookieHeader) return false;
	return parseCookieHeader(cookieHeader).get(DRAFT_MODE_COOKIE) === getDraftSecret();
}
//#endregion
//#region node_modules/vinext/dist/shims/thenable-params.js
function hasParamProperty(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}
var wellKnownProperties = new Set([
	"hasOwnProperty",
	"isPrototypeOf",
	"propertyIsEnumerable",
	"toString",
	"valueOf",
	"toLocaleString",
	"then",
	"catch",
	"finally",
	"status",
	"value",
	"error",
	"displayName",
	"_debugInfo",
	"toJSON",
	"$$typeof",
	"__esModule",
	"@@iterator"
]);
function isWellKnownProperty(prop) {
	return wellKnownProperties.has(prop);
}
function makeThenableParams(obj) {
	const plain = { ...obj };
	const promise = Promise.resolve(plain);
	return new Proxy(promise, {
		get(target, prop, receiver) {
			if (!isWellKnownProperty(prop) && hasParamProperty(plain, prop)) return Reflect.get(plain, prop);
			const value = Reflect.get(target, prop, receiver);
			return typeof value === "function" ? value.bind(target) : value;
		},
		getOwnPropertyDescriptor(target, prop) {
			if (!isWellKnownProperty(prop) && hasParamProperty(plain, prop)) return {
				configurable: true,
				enumerable: true,
				value: Reflect.get(plain, prop),
				writable: true
			};
			return Reflect.getOwnPropertyDescriptor(target, prop);
		},
		has(target, prop) {
			return Reflect.has(target, prop) || !isWellKnownProperty(prop) && hasParamProperty(plain, prop);
		},
		ownKeys() {
			return Reflect.ownKeys(plain).filter((prop) => !isWellKnownProperty(prop));
		}
	});
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.react-server.production.js
/**
* @license React
* react-jsx-runtime.react-server.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_react_server_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react_react_server(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	if (!React.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error("The \"react\" package in this environment is not configured correctly. The \"react-server\" condition must be enabled in any environment that runs React Server Components.");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/vinext/dist/shims/metadata.js
var import_jsx_runtime_react_server = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_react_server_production();
})))();
/**
* Resolve viewport config from a module. Handles both static `viewport` export
* and async `generateViewport()` function.
*/
async function resolveModuleViewport(mod, params) {
	if (typeof mod.generateViewport === "function") {
		const asyncParams = makeThenableParams(params);
		return await mod.generateViewport({ params: asyncParams });
	}
	if (mod.viewport && typeof mod.viewport === "object") return mod.viewport;
	return null;
}
/**
* Merge viewport configs from multiple sources (layouts + page).
* Later entries override earlier ones.
*/
var DEFAULT_VIEWPORT = {
	width: "device-width",
	initialScale: 1
};
function mergeViewport(viewportList) {
	const merged = { ...DEFAULT_VIEWPORT };
	for (const vp of viewportList) Object.assign(merged, vp);
	return merged;
}
/**
* React component that renders viewport meta tags into <head>.
*/
function ViewportHead({ viewport }) {
	const elements = [];
	let key = 0;
	const parts = [];
	if (viewport.width !== void 0) parts.push(`width=${viewport.width}`);
	if (viewport.height !== void 0) parts.push(`height=${viewport.height}`);
	if (viewport.initialScale !== void 0) parts.push(`initial-scale=${viewport.initialScale}`);
	if (viewport.minimumScale !== void 0) parts.push(`minimum-scale=${viewport.minimumScale}`);
	if (viewport.maximumScale !== void 0) parts.push(`maximum-scale=${viewport.maximumScale}`);
	if (viewport.userScalable !== void 0) parts.push(`user-scalable=${viewport.userScalable ? "yes" : "no"}`);
	if (parts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "viewport",
		content: parts.join(", ")
	}, key++));
	if (viewport.themeColor) {
		if (typeof viewport.themeColor === "string") elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "theme-color",
			content: viewport.themeColor
		}, key++));
		else if (Array.isArray(viewport.themeColor)) for (const entry of viewport.themeColor) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "theme-color",
			content: entry.color,
			...entry.media ? { media: entry.media } : {}
		}, key++));
	}
	if (viewport.colorScheme) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "color-scheme",
		content: viewport.colorScheme
	}, key++));
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(import_jsx_runtime_react_server.Fragment, { children: elements });
}
function isPlainObject$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof URL);
}
function isOtherMetadata(value) {
	if (!isPlainObject$1(value)) return false;
	return Object.values(value).every((item) => {
		if (typeof item === "string") return true;
		return Array.isArray(item) && item.every((nestedItem) => typeof nestedItem === "string");
	});
}
/**
* Extract a plain string title from a metadata title value.
*/
function resolveStringTitle(title) {
	if (typeof title === "string") return title;
	if (title && typeof title === "object") return title.absolute ?? title.default ?? void 0;
}
/**
* Post-process merged metadata to cross-fill openGraph and Twitter fields.
*
* Next.js runs this once after all layouts/pages and file-based metadata
* have been resolved. When openGraph exists, it auto-fills missing
* twitter:title/description/images from openGraph (falling back to root
* metadata title/description). Existing openGraph/twitter objects also inherit
* missing title/description from root metadata.
*
* Ported from Next.js:
* https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/metadata/resolve-metadata.ts
*/
function postProcessMetadata(merged) {
	const result = { ...merged };
	const resolvedTitle = resolveStringTitle(result.title);
	if (result.openGraph) {
		const og = { ...result.openGraph };
		if (!og.title && resolvedTitle) og.title = resolvedTitle;
		if (!og.description && result.description) og.description = result.description;
		result.openGraph = og;
	}
	if (result.openGraph) {
		const autoFill = {};
		const existingTwitter = result.twitter;
		const hasTwTitle = existingTwitter ? Boolean(existingTwitter.title) : false;
		const hasTwDescription = existingTwitter ? Boolean(existingTwitter.description) : false;
		const hasTwImages = existingTwitter ? Object.prototype.hasOwnProperty.call(existingTwitter, "images") && Boolean(existingTwitter.images) : false;
		if (!hasTwTitle) {
			if (result.openGraph.title) autoFill.title = result.openGraph.title;
			else if (resolvedTitle) autoFill.title = resolvedTitle;
		}
		if (!hasTwDescription) autoFill.description = result.openGraph.description || result.description || void 0;
		if (!hasTwImages) autoFill.images = result.openGraph.images;
		if (Object.keys(autoFill).length > 0) if (existingTwitter) result.twitter = {
			...existingTwitter,
			...autoFill
		};
		else result.twitter = autoFill;
	}
	if (result.twitter) {
		const tw = { ...result.twitter };
		if (!tw.title && resolvedTitle) tw.title = resolvedTitle;
		if (!tw.description && result.description) tw.description = result.description;
		result.twitter = tw;
	}
	if (result.twitter) {
		const tw = { ...result.twitter };
		if (!tw.card) {
			const images = tw.images;
			tw.card = (Array.isArray(images) ? images.length > 0 : Boolean(images)) ? "summary_large_image" : "summary";
		}
		result.twitter = tw;
	}
	return result;
}
/**
* Merge metadata from multiple sources (layouts + page).
*
* The list is ordered [rootLayout, nestedLayout, ..., page].
* Title template from layouts applies to the page title but NOT to
* the segment that defines the template itself. `title.absolute`
* skips all templates. `title.default` is the fallback when no
* child provides a title.
*
* For top-level keys, later entries override earlier ones. `other` custom meta
* tags are the exception: Next.js merges those across segments.
*/
function mergeMetadataEntries(entries) {
	if (entries.length === 0) return {};
	const merged = {};
	let parentTemplate;
	for (const entry of entries) {
		const meta = entry.metadata;
		const isPage = Boolean(entry.isPage);
		const contributesTitle = entry.contributesTitle !== false;
		if (contributesTitle && !isPage && meta.title && typeof meta.title === "object" && meta.title.template) parentTemplate = meta.title.template;
		for (const key of Object.keys(meta)) {
			if (key === "title") continue;
			const incoming = meta[key];
			const existing = merged[key];
			if (key === "other" && isOtherMetadata(existing) && isOtherMetadata(incoming)) merged.other = {
				...existing,
				...incoming
			};
			else merged[key] = incoming;
		}
		if (contributesTitle && meta.title !== void 0) merged.title = meta.title;
	}
	const finalTitle = merged.title;
	if (finalTitle) {
		if (typeof finalTitle === "string") {
			if (parentTemplate) merged.title = parentTemplate.replace("%s", finalTitle);
		} else if (typeof finalTitle === "object") {
			if (finalTitle.absolute) merged.title = finalTitle.absolute;
			else if (finalTitle.default) merged.title = finalTitle.default;
			else if (finalTitle.template && !finalTitle.default && !finalTitle.absolute) merged.title = void 0;
		}
	}
	return merged;
}
/**
* Resolve metadata from a module. Handles both static `metadata` export
* and async `generateMetadata()` function.
*
* @param parent - A Promise that resolves to the accumulated (merged) metadata
*   from all ancestor segments. Passed as the second argument to
*   `generateMetadata()`, matching Next.js's eager-execution-with-serial-
*   resolution approach. If not provided, defaults to a promise that resolves
*   to an empty object (so `await parent` never throws).
*/
async function resolveModuleMetadata(mod, params = {}, searchParams, parent = Promise.resolve({})) {
	if (typeof mod.generateMetadata === "function") {
		const asyncParams = makeThenableParams(params);
		const props = searchParams === void 0 ? { params: asyncParams } : {
			params: asyncParams,
			searchParams: makeThenableParams(searchParams)
		};
		return await mod.generateMetadata(props, parent);
	}
	if (mod.metadata && typeof mod.metadata === "object") return mod.metadata;
	return null;
}
/**
* React component that renders metadata as HTML head elements.
* Used by the RSC entry to inject into the <head>.
*/
function isIconDescriptor(value) {
	if (typeof value !== "object" || value === null || value instanceof URL || Array.isArray(value)) return false;
	const urlValue = Reflect.get(value, "url");
	return typeof urlValue === "string" || urlValue instanceof URL;
}
function isIconsMap(value) {
	return typeof value === "object" && !(value instanceof URL) && !Array.isArray(value) && !isIconDescriptor(value);
}
function normalizeUrlDescriptor(value, createDescriptor) {
	if (typeof value === "string" || value instanceof URL) return createDescriptor(value);
	return value;
}
function normalizeUrlDescriptorEntries(value, createDescriptor) {
	if (!value) return [];
	if (Array.isArray(value)) return value.map((entry) => normalizeUrlDescriptor(entry, createDescriptor));
	return [normalizeUrlDescriptor(value, createDescriptor)];
}
function MetadataHead({ metadata }) {
	const elements = [];
	let key = 0;
	const base = metadata.metadataBase;
	function resolveUrl(url) {
		if (!url) return void 0;
		const s = typeof url === "string" ? url : url instanceof URL ? url.toString() : String(url);
		if (!base) return s;
		if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("//")) return s;
		try {
			return new URL(s, base).toString();
		} catch {
			return s;
		}
	}
	const title = typeof metadata.title === "string" ? metadata.title : typeof metadata.title === "object" ? metadata.title.absolute || metadata.title.default : void 0;
	if (title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("title", { children: title }, key++));
	if (metadata.description) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "description",
		content: metadata.description
	}, key++));
	if (metadata.generator) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "generator",
		content: metadata.generator
	}, key++));
	if (metadata.applicationName) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "application-name",
		content: metadata.applicationName
	}, key++));
	if (metadata.referrer) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "referrer",
		content: metadata.referrer
	}, key++));
	if (metadata.keywords) {
		const kw = Array.isArray(metadata.keywords) ? metadata.keywords.join(",") : metadata.keywords;
		elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "keywords",
			content: kw
		}, key++));
	}
	if (metadata.authors) {
		const authorList = Array.isArray(metadata.authors) ? metadata.authors : [metadata.authors];
		for (const author of authorList) {
			if (author.name) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				name: "author",
				content: author.name
			}, key++));
			if (author.url) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "author",
				href: author.url
			}, key++));
		}
	}
	if (metadata.creator) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "creator",
		content: metadata.creator
	}, key++));
	if (metadata.publisher) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "publisher",
		content: metadata.publisher
	}, key++));
	if (metadata.formatDetection) {
		const parts = [];
		if (metadata.formatDetection.telephone === false) parts.push("telephone=no");
		if (metadata.formatDetection.address === false) parts.push("address=no");
		if (metadata.formatDetection.email === false) parts.push("email=no");
		if (parts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "format-detection",
			content: parts.join(", ")
		}, key++));
	}
	if (metadata.category) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "category",
		content: metadata.category
	}, key++));
	if (metadata.robots) if (typeof metadata.robots === "string") elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
		name: "robots",
		content: metadata.robots
	}, key++));
	else {
		const { googleBot, ...robotsRest } = metadata.robots;
		const robotParts = [];
		for (const [k, v] of Object.entries(robotsRest)) if (v === true) robotParts.push(k);
		else if (v === false) robotParts.push(`no${k}`);
		else if (typeof v === "string" || typeof v === "number") robotParts.push(`${k}:${v}`);
		if (robotParts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "robots",
			content: robotParts.join(", ")
		}, key++));
		if (googleBot) if (typeof googleBot === "string") elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "googlebot",
			content: googleBot
		}, key++));
		else {
			const gbParts = [];
			for (const [k, v] of Object.entries(googleBot)) if (v === true) gbParts.push(k);
			else if (v === false) gbParts.push(`no${k}`);
			else if (typeof v === "string" || typeof v === "number") gbParts.push(`${k}:${v}`);
			if (gbParts.length > 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				name: "googlebot",
				content: gbParts.join(", ")
			}, key++));
		}
	}
	if (metadata.openGraph) {
		const og = metadata.openGraph;
		if (og.title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:title",
			content: og.title
		}, key++));
		if (og.description) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:description",
			content: og.description
		}, key++));
		if (og.url) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:url",
			content: resolveUrl(og.url)
		}, key++));
		if (og.siteName) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:site_name",
			content: og.siteName
		}, key++));
		if (og.type) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:type",
			content: og.type
		}, key++));
		if (og.locale) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:locale",
			content: og.locale
		}, key++));
		if (og.publishedTime) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "article:published_time",
			content: og.publishedTime
		}, key++));
		if (og.modifiedTime) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "article:modified_time",
			content: og.modifiedTime
		}, key++));
		if (og.authors) for (const author of og.authors) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "article:author",
			content: author
		}, key++));
		if (og.images) {
			const imgList = typeof og.images === "string" || og.images instanceof URL ? [{ url: og.images }] : Array.isArray(og.images) ? og.images : [og.images];
			for (const img of imgList) {
				const imgUrl = typeof img === "string" || img instanceof URL ? img : img.url;
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					property: "og:image",
					content: resolveUrl(imgUrl)
				}, key++));
				if (typeof img !== "string" && !(img instanceof URL)) {
					if (img.width) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						property: "og:image:width",
						content: String(img.width)
					}, key++));
					if (img.height) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						property: "og:image:height",
						content: String(img.height)
					}, key++));
					if (img.type) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						property: "og:image:type",
						content: img.type
					}, key++));
					if (img.alt) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						property: "og:image:alt",
						content: img.alt
					}, key++));
				}
			}
		}
		if (og.videos) for (const video of og.videos) {
			elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				property: "og:video",
				content: resolveUrl(video.url)
			}, key++));
			if (video.width) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				property: "og:video:width",
				content: String(video.width)
			}, key++));
			if (video.height) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				property: "og:video:height",
				content: String(video.height)
			}, key++));
		}
		if (og.audio) for (const audio of og.audio) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			property: "og:audio",
			content: resolveUrl(audio.url)
		}, key++));
	}
	if (metadata.twitter) {
		const tw = metadata.twitter;
		if (tw.card) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:card",
			content: tw.card
		}, key++));
		if (tw.site) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:site",
			content: tw.site
		}, key++));
		if (tw.siteId) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:site:id",
			content: tw.siteId
		}, key++));
		if (tw.title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:title",
			content: tw.title
		}, key++));
		if (tw.description) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:description",
			content: tw.description
		}, key++));
		if (tw.creator) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:creator",
			content: tw.creator
		}, key++));
		if (tw.creatorId) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "twitter:creator:id",
			content: tw.creatorId
		}, key++));
		if (tw.images) {
			const imgList = typeof tw.images === "string" || tw.images instanceof URL ? [tw.images] : Array.isArray(tw.images) ? tw.images : [tw.images];
			for (const img of imgList) {
				const imgUrl = typeof img === "string" || img instanceof URL ? img : img.url;
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:image",
					content: resolveUrl(imgUrl)
				}, key++));
				if (typeof img !== "string" && !(img instanceof URL)) {
					if (img.type) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						name: "twitter:image:type",
						content: img.type
					}, key++));
					if (img.width) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						name: "twitter:image:width",
						content: String(img.width)
					}, key++));
					if (img.height) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						name: "twitter:image:height",
						content: String(img.height)
					}, key++));
					if (img.alt) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						name: "twitter:image:alt",
						content: img.alt
					}, key++));
				}
			}
		}
		if (tw.players) {
			const players = Array.isArray(tw.players) ? tw.players : [tw.players];
			for (const player of players) {
				const playerUrl = player.playerUrl.toString();
				const streamUrl = player.streamUrl.toString();
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player",
					content: resolveUrl(playerUrl)
				}, key++));
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player:stream",
					content: resolveUrl(streamUrl)
				}, key++));
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player:width",
					content: String(player.width)
				}, key++));
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: "twitter:player:height",
					content: String(player.height)
				}, key++));
			}
		}
		if (tw.app) {
			const { app } = tw;
			for (const platform of [
				"iphone",
				"ipad",
				"googleplay"
			]) {
				if (app.name) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: `twitter:app:name:${platform}`,
					content: app.name
				}, key++));
				if (app.id[platform] !== void 0) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					name: `twitter:app:id:${platform}`,
					content: String(app.id[platform])
				}, key++));
				if (app.url?.[platform] !== void 0) {
					const appUrl = app.url[platform].toString();
					elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
						name: `twitter:app:url:${platform}`,
						content: resolveUrl(appUrl)
					}, key++));
				}
			}
		}
	}
	if (metadata.icons) {
		const iconEntries = isIconsMap(metadata.icons) ? normalizeUrlDescriptorEntries(metadata.icons.icon, (url) => ({ url })) : normalizeUrlDescriptorEntries(metadata.icons, (url) => ({ url }));
		if (isIconsMap(metadata.icons) && metadata.icons.shortcut) {
			const shortcuts = Array.isArray(metadata.icons.shortcut) ? metadata.icons.shortcut : [metadata.icons.shortcut];
			for (const s of shortcuts) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "shortcut icon",
				href: resolveUrl(s)
			}, key++));
		}
		if (iconEntries.length > 0) for (const i of iconEntries) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "icon",
			href: resolveUrl(i.url),
			...i.sizes ? { sizes: i.sizes } : {},
			...i.type ? { type: i.type } : {},
			...i.media ? { media: i.media } : {}
		}, key++));
		if (isIconsMap(metadata.icons) && metadata.icons.apple) for (const a of normalizeUrlDescriptorEntries(metadata.icons.apple, (url) => ({ url }))) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "apple-touch-icon",
			href: resolveUrl(a.url),
			...a.sizes ? { sizes: a.sizes } : {},
			...a.type ? { type: a.type } : {}
		}, key++));
		if (isIconsMap(metadata.icons) && metadata.icons.other) for (const o of metadata.icons.other) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: o.rel,
			href: resolveUrl(o.url),
			...o.sizes ? { sizes: o.sizes } : {}
		}, key++));
	}
	if (metadata.manifest) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
		rel: "manifest",
		href: resolveUrl(metadata.manifest)
	}, key++));
	if (metadata.alternates) {
		const alt = metadata.alternates;
		if (alt.canonical) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "canonical",
			href: resolveUrl(alt.canonical)
		}, key++));
		if (alt.languages) for (const [lang, href] of Object.entries(alt.languages)) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "alternate",
			hrefLang: lang,
			href: resolveUrl(href)
		}, key++));
		if (alt.media) for (const [media, href] of Object.entries(alt.media)) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "alternate",
			media,
			href: resolveUrl(href)
		}, key++));
		if (alt.types) for (const [type, href] of Object.entries(alt.types)) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
			rel: "alternate",
			type,
			href: resolveUrl(href)
		}, key++));
	}
	if (metadata.verification) {
		const v = metadata.verification;
		if (v.google) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "google-site-verification",
			content: v.google
		}, key++));
		if (v.yahoo) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "y_key",
			content: v.yahoo
		}, key++));
		if (v.yandex) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "yandex-verification",
			content: v.yandex
		}, key++));
		if (v.other) for (const [name, content] of Object.entries(v.other)) {
			const values = Array.isArray(content) ? content : [content];
			for (const val of values) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
				name,
				content: val
			}, key++));
		}
	}
	if (metadata.appleWebApp) {
		const awa = metadata.appleWebApp;
		if (awa.capable !== false) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "mobile-web-app-capable",
			content: "yes"
		}, key++));
		if (awa.title) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "apple-mobile-web-app-title",
			content: awa.title
		}, key++));
		if (awa.statusBarStyle) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "apple-mobile-web-app-status-bar-style",
			content: awa.statusBarStyle
		}, key++));
		if (awa.startupImage) {
			const imgs = typeof awa.startupImage === "string" ? [{ url: awa.startupImage }] : awa.startupImage;
			for (const img of imgs) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("link", {
				rel: "apple-touch-startup-image",
				href: resolveUrl(img.url),
				...img.media ? { media: img.media } : {}
			}, key++));
		}
	}
	if (metadata.itunes) {
		const { appId, appArgument } = metadata.itunes;
		let content = `app-id=${appId}`;
		if (appArgument) content += `, app-argument=${appArgument}`;
		elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name: "apple-itunes-app",
			content
		}, key++));
	}
	if (metadata.appLinks) {
		const al = metadata.appLinks;
		for (const platform of [
			"ios",
			"iphone",
			"ipad",
			"android",
			"windows_phone",
			"windows",
			"windows_universal",
			"web"
		]) {
			const entries = al[platform];
			if (!entries) continue;
			const list = Array.isArray(entries) ? entries : [entries];
			for (const entry of list) for (const [k, v] of Object.entries(entry)) {
				if (v === void 0 || v === null) continue;
				const str = String(v);
				const content = k === "url" ? resolveUrl(str) : str;
				elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
					property: `al:${platform}:${k}`,
					content
				}, key++));
			}
		}
	}
	if (metadata.other) for (const [name, content] of Object.entries(metadata.other)) {
		const values = Array.isArray(content) ? content : [content];
		for (const val of values) elements.push(/* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)("meta", {
			name,
			content: val
		}, key++));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime_react_server.jsx)(import_jsx_runtime_react_server.Fragment, { children: elements });
}
//#endregion
//#region node_modules/vinext/dist/shims/server.js
var NextRequest = class extends Request {
	_nextUrl;
	_url;
	_cookies;
	constructor(input, init) {
		const { nextConfig: _nextConfig, ...requestInit } = init ?? {};
		if (input instanceof Request) {
			const requestInput = requestInit.body === void 0 && input.body && !input.bodyUsed ? input.clone() : input;
			super(requestInput, requestInit);
		} else super(input, requestInit);
		const url = typeof input === "string" ? new URL(input, "http://localhost") : input instanceof URL ? input : new URL(input.url, "http://localhost");
		const urlConfig = _nextConfig ? {
			basePath: _nextConfig.basePath,
			nextConfig: { i18n: _nextConfig.i18n }
		} : void 0;
		this._nextUrl = new NextURL(url, void 0, urlConfig);
		this._url = process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? url.toString() : this._nextUrl.toString();
		this._cookies = new RequestCookies(this.headers);
	}
	get nextUrl() {
		return this._nextUrl;
	}
	get url() {
		return this._url;
	}
	get cookies() {
		return this._cookies;
	}
	/**
	* Client IP address. Prefers Cloudflare's trusted CF-Connecting-IP header
	* over the spoofable X-Forwarded-For. Returns undefined if unavailable.
	*/
	get ip() {
		return this.headers.get("cf-connecting-ip") ?? this.headers.get("x-real-ip") ?? this.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? void 0;
	}
	/**
	* Geolocation data. Platform-dependent (e.g., Cloudflare, Vercel).
	* Returns undefined if not available.
	*/
	get geo() {
		const country = this.headers.get("cf-ipcountry") ?? this.headers.get("x-vercel-ip-country") ?? void 0;
		if (!country) return void 0;
		return {
			country,
			city: this.headers.get("cf-ipcity") ?? this.headers.get("x-vercel-ip-city") ?? void 0,
			region: this.headers.get("cf-region") ?? this.headers.get("x-vercel-ip-country-region") ?? void 0,
			latitude: this.headers.get("cf-iplatitude") ?? this.headers.get("x-vercel-ip-latitude") ?? void 0,
			longitude: this.headers.get("cf-iplongitude") ?? this.headers.get("x-vercel-ip-longitude") ?? void 0
		};
	}
	/**
	* The build ID of the Next.js application.
	* Delegates to `nextUrl.buildId` to match Next.js API surface.
	* Can be used in middleware to detect deployment skew between client and server.
	*/
	get buildId() {
		return this._nextUrl.buildId;
	}
};
/** Valid HTTP redirect status codes, matching Next.js's REDIRECTS set. */
var REDIRECT_STATUSES = new Set([
	301,
	302,
	303,
	307,
	308
]);
function validateURL(url) {
	assertSafeNavigationUrl(String(url));
	try {
		return String(new URL(String(url)));
	} catch (error) {
		throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: error });
	}
}
var NextResponse = class NextResponse extends Response {
	_cookies;
	constructor(body, init) {
		super(body, init);
		this._cookies = new MiddlewareResponseCookies(this.headers);
	}
	get cookies() {
		return this._cookies;
	}
	/**
	* Create a JSON response.
	*/
	static json(body, init) {
		const headers = new Headers(init?.headers);
		if (!headers.has("content-type")) headers.set("content-type", "application/json");
		return new NextResponse(JSON.stringify(body), {
			...init,
			headers
		});
	}
	/**
	* Create a redirect response.
	*/
	static redirect(url, init) {
		const status = typeof init === "number" ? init : init?.status ?? 307;
		if (!REDIRECT_STATUSES.has(status)) throw new RangeError(`Failed to execute "redirect" on "response": Invalid status code`);
		const headers = new Headers(typeof init === "object" ? init?.headers : void 0);
		headers.set("Location", validateURL(url));
		return new NextResponse(null, {
			status,
			headers
		});
	}
	/**
	* Create a rewrite response (middleware pattern).
	* Sets the x-middleware-rewrite header.
	*/
	static rewrite(destination, init) {
		const headers = new Headers(init?.headers);
		headers.set(MIDDLEWARE_REWRITE_HEADER, validateURL(destination));
		if (init?.request?.headers) encodeMiddlewareRequestHeaders(headers, init.request.headers);
		return new NextResponse(null, {
			...init,
			headers
		});
	}
	/**
	* Continue to the next handler (middleware pattern).
	* Sets the x-middleware-next header.
	*/
	static next(init) {
		const headers = new Headers(init?.headers);
		headers.set(MIDDLEWARE_NEXT_HEADER, "1");
		if (init?.request?.headers) encodeMiddlewareRequestHeaders(headers, init.request.headers);
		return new NextResponse(null, {
			...init,
			headers
		});
	}
};
var NextURL = class NextURL {
	/** Internal URL stores the pathname WITHOUT basePath or locale prefix. */
	_url;
	_basePath;
	_locale;
	_defaultLocale;
	_locales;
	constructor(input, base, config) {
		this._url = new URL(input.toString(), base);
		this._basePath = config?.basePath ?? "";
		this._stripBasePath();
		const i18n = config?.nextConfig?.i18n;
		if (i18n) {
			this._locales = [...i18n.locales];
			this._defaultLocale = i18n.defaultLocale;
			this._analyzeLocale(this._locales);
		}
	}
	/** Strip basePath prefix from the internal pathname. */
	_stripBasePath() {
		if (!this._basePath) return;
		this._url.pathname = stripBasePath(this._url.pathname, this._basePath);
	}
	/** Extract locale from pathname, stripping it from the internal URL. */
	_analyzeLocale(locales) {
		const segments = this._url.pathname.split("/");
		const candidate = segments[1]?.toLowerCase();
		const match = locales.find((l) => l.toLowerCase() === candidate);
		if (match) {
			this._locale = match;
			this._url.pathname = "/" + segments.slice(2).join("/");
		} else this._locale = this._defaultLocale;
	}
	/**
	* Reconstruct the full pathname with basePath + locale prefix.
	* Mirrors Next.js's internal formatPathname().
	*/
	_formatPathname() {
		let prefix = this._basePath;
		if (this._locale && this._locale !== this._defaultLocale) prefix += "/" + this._locale;
		if (!prefix) return this._url.pathname;
		const inner = this._url.pathname;
		return inner === "/" ? prefix : prefix + inner;
	}
	get href() {
		const formatted = this._formatPathname();
		if (formatted === this._url.pathname) return this._url.href;
		const { href, pathname, search, hash } = this._url;
		const baseEnd = href.length - pathname.length - search.length - hash.length;
		return href.slice(0, baseEnd) + formatted + search + hash;
	}
	set href(value) {
		this._url.href = value;
		this._stripBasePath();
		if (this._locales) this._analyzeLocale(this._locales);
	}
	get origin() {
		return this._url.origin;
	}
	get protocol() {
		return this._url.protocol;
	}
	set protocol(value) {
		this._url.protocol = value;
	}
	get username() {
		return this._url.username;
	}
	set username(value) {
		this._url.username = value;
	}
	get password() {
		return this._url.password;
	}
	set password(value) {
		this._url.password = value;
	}
	get host() {
		return this._url.host;
	}
	set host(value) {
		this._url.host = value;
	}
	get hostname() {
		return this._url.hostname;
	}
	set hostname(value) {
		this._url.hostname = value;
	}
	get port() {
		return this._url.port;
	}
	set port(value) {
		this._url.port = value;
	}
	/** Returns the pathname WITHOUT basePath or locale prefix. */
	get pathname() {
		return this._url.pathname;
	}
	set pathname(value) {
		this._url.pathname = value;
	}
	get search() {
		return this._url.search;
	}
	set search(value) {
		this._url.search = value;
	}
	get searchParams() {
		return this._url.searchParams;
	}
	get hash() {
		return this._url.hash;
	}
	set hash(value) {
		this._url.hash = value;
	}
	get basePath() {
		return this._basePath;
	}
	set basePath(value) {
		this._basePath = value === "" ? "" : value.startsWith("/") ? value : "/" + value;
	}
	get locale() {
		return this._locale ?? "";
	}
	set locale(value) {
		if (this._locales) {
			if (!value) {
				this._locale = this._defaultLocale;
				return;
			}
			if (!this._locales.includes(value)) throw new TypeError(`The locale "${value}" is not in the configured locales: ${this._locales.join(", ")}`);
		}
		this._locale = this._locales ? value : this._locale;
	}
	get defaultLocale() {
		return this._defaultLocale;
	}
	get locales() {
		return this._locales ? [...this._locales] : void 0;
	}
	clone() {
		const config = {
			basePath: this._basePath,
			nextConfig: this._locales ? { i18n: {
				locales: [...this._locales],
				defaultLocale: this._defaultLocale
			} } : void 0
		};
		return new NextURL(this.href, void 0, config);
	}
	toString() {
		return this.href;
	}
	/**
	* The build ID of the Next.js application.
	* Set from `generateBuildId` in next.config.js, or a random UUID if not configured.
	* Can be used in middleware to detect deployment skew between client and server.
	* Matches the Next.js API: `request.nextUrl.buildId`.
	*/
	get buildId() {
		return "6b8bd8f0-3d3f-4a1a-845a-dbbc9edfdab4";
	}
};
var RequestCookies = class {
	_headers;
	_parsed;
	constructor(headers) {
		this._headers = headers;
		this._parsed = parseCookieHeader(headers.get("cookie") ?? "");
	}
	get(name) {
		const value = this._parsed.get(name);
		return value !== void 0 ? {
			name,
			value
		} : void 0;
	}
	getAll(nameOrOptions) {
		const name = typeof nameOrOptions === "string" ? nameOrOptions : nameOrOptions?.name;
		return [...this._parsed.entries()].filter(([cookieName]) => name === void 0 || cookieName === name).map(([cookieName, value]) => ({
			name: cookieName,
			value
		}));
	}
	has(name) {
		return this._parsed.has(name);
	}
	set(nameOrOptions, value) {
		let cookieName;
		let cookieValue;
		if (typeof nameOrOptions === "string") {
			cookieName = nameOrOptions;
			cookieValue = value ?? "";
		} else {
			cookieName = nameOrOptions.name;
			cookieValue = nameOrOptions.value;
		}
		validateCookieName(cookieName);
		this._parsed.set(cookieName, cookieValue);
		this._syncHeader();
		return this;
	}
	delete(names) {
		if (Array.isArray(names)) {
			const results = names.map((name) => {
				validateCookieName(name);
				return this._parsed.delete(name);
			});
			this._syncHeader();
			return results;
		}
		validateCookieName(names);
		const result = this._parsed.delete(names);
		this._syncHeader();
		return result;
	}
	clear() {
		this._parsed.clear();
		this._syncHeader();
		return this;
	}
	get size() {
		return this._parsed.size;
	}
	toString() {
		return this._serialize();
	}
	_serialize() {
		return [...this._parsed.entries()].map(([n, v]) => `${n}=${encodeURIComponent(v)}`).join("; ");
	}
	_syncHeader() {
		if (this._parsed.size === 0) this._headers.delete("cookie");
		else this._headers.set("cookie", this._serialize());
	}
	[Symbol.iterator]() {
		return this.getAll().map((c) => [c.name, c])[Symbol.iterator]();
	}
};
var ReadonlyRequestCookiesError = class ReadonlyRequestCookiesError extends Error {
	constructor() {
		super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
	}
	static callable() {
		throw new ReadonlyRequestCookiesError();
	}
};
var REQUEST_HEADERS_MUTATING_METHODS = new Set([
	"set",
	"delete",
	"append"
]);
var ReadonlyRequestHeadersError = class ReadonlyRequestHeadersError extends Error {
	constructor() {
		super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
	}
	static callable() {
		throw new ReadonlyRequestHeadersError();
	}
};
function sealRequestHeaders(headers) {
	return new Proxy(headers, { get(target, prop) {
		if (typeof prop === "string" && REQUEST_HEADERS_MUTATING_METHODS.has(prop)) return ReadonlyRequestHeadersError.callable;
		const value = Reflect.get(target, prop, target);
		return typeof value === "function" ? value.bind(target) : value;
	} });
}
function sealRequestCookies(cookies) {
	return new Proxy(cookies, { get(target, prop) {
		if (prop === "set" || prop === "delete" || prop === "clear") return ReadonlyRequestCookiesError.callable;
		const value = Reflect.get(target, prop, target);
		return typeof value === "function" ? value.bind(target) : value;
	} });
}
var ResponseCookies = class {
	_headers;
	/** Internal map keyed by cookie name â€” single source of truth. */
	_parsed = /* @__PURE__ */ new Map();
	constructor(headers) {
		this._headers = headers;
		for (const header of headers.getSetCookie()) {
			const eq = header.indexOf("=");
			if (eq === -1) continue;
			const cookieName = header.slice(0, eq);
			const semi = header.indexOf(";", eq);
			const raw = header.slice(eq + 1, semi === -1 ? void 0 : semi);
			let value;
			try {
				value = decodeURIComponent(raw);
			} catch {
				value = raw;
			}
			this._parsed.set(cookieName, {
				serialized: header,
				entry: {
					name: cookieName,
					value
				}
			});
		}
	}
	set(...args) {
		const [name, value, opts] = parseCookieSetArgs(args);
		validateCookieName(name);
		const serialized = serializeSetCookie(name, value, opts);
		this._parsed.set(name, {
			serialized,
			entry: {
				name,
				value
			}
		});
		this._syncHeaders();
		return this;
	}
	get(...args) {
		const key = typeof args[0] === "string" ? args[0] : args[0].name;
		return this._parsed.get(key)?.entry;
	}
	has(name) {
		return this._parsed.has(name);
	}
	getAll(...args) {
		const all = [...this._parsed.values()].map((v) => v.entry);
		if (args.length === 0) return all;
		const key = typeof args[0] === "string" ? args[0] : args[0].name;
		return all.filter((c) => c.name === key);
	}
	delete(...args) {
		const [name, opts] = typeof args[0] === "string" ? [args[0], void 0] : [args[0].name, args[0]];
		return this.set({
			name,
			value: "",
			expires: /* @__PURE__ */ new Date(0),
			path: opts?.path,
			domain: opts?.domain,
			httpOnly: opts?.httpOnly,
			secure: opts?.secure,
			sameSite: opts?.sameSite
		});
	}
	[Symbol.iterator]() {
		return [...this._parsed.values()].map((v) => [v.entry.name, v.entry])[Symbol.iterator]();
	}
	/** Delete all Set-Cookie headers and re-append from the internal map. */
	_syncHeaders() {
		this._headers.delete("Set-Cookie");
		for (const { serialized } of this._parsed.values()) this._headers.append("Set-Cookie", serialized);
	}
};
var MiddlewareResponseCookies = class extends ResponseCookies {
	_responseHeaders;
	constructor(headers) {
		super(headers);
		this._responseHeaders = headers;
	}
	set(...args) {
		super.set(...args);
		this._syncMiddlewareCookieHeader();
		return this;
	}
	delete(...args) {
		super.delete(...args);
		this._syncMiddlewareCookieHeader();
		return this;
	}
	_syncMiddlewareCookieHeader() {
		const cookies = this._responseHeaders.getSetCookie();
		if (cookies.length === 0) {
			this._responseHeaders.delete(MIDDLEWARE_SET_COOKIE_HEADER);
			return;
		}
		this._responseHeaders.set(MIDDLEWARE_SET_COOKIE_HEADER, cookies.join(","));
	}
};
/**
* Parse the overloaded arguments for ResponseCookies.set():
*   - (name, value, options?) â€” positional form
*   - ({ name, value, ...options }) â€” object form
*/
function parseCookieSetArgs(args) {
	if (typeof args[0] === "string") return [
		args[0],
		args[1],
		args[2]
	];
	const { name, value, ...opts } = args[0];
	return [
		name,
		value,
		opts
	];
}
/**
* Minimal NextFetchEvent â€” extends FetchEvent where available,
* otherwise provides the waitUntil pattern standalone.
*/
var NextFetchEvent = class {
	sourcePage;
	_waitUntilPromises = [];
	constructor(params) {
		this.sourcePage = params.page;
	}
	waitUntil(promise) {
		this._waitUntilPromises.push(promise);
	}
	get waitUntilPromises() {
		return this._waitUntilPromises;
	}
	/** Drain all waitUntil promises. Returns a single promise that settles when all are done. */
	drainWaitUntil() {
		return Promise.allSettled(this._waitUntilPromises);
	}
};
globalThis.URLPattern;
//#endregion
//#region proxy.ts
var proxy_exports = /* @__PURE__ */ __exportAll({
	config: () => config,
	proxy: () => proxy
});
var supportedLocales = new Set([
	"en",
	"de",
	"fr",
	"es",
	"it",
	"pl",
	"ro"
]);
function proxy(request) {
	const url = request.nextUrl.clone();
	if (url.hostname === "www.allchinabuy.ro") {
		url.hostname = "allchinabuy.ro";
		url.protocol = "https:";
		return NextResponse.redirect(url, 301);
	}
	const firstSegment = url.pathname.split("/").filter(Boolean)[0];
	const locale = firstSegment && supportedLocales.has(firstSegment) ? firstSegment : "ro";
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-site-locale", locale);
	return NextResponse.next({ request: { headers: requestHeaders } });
}
var config = { matcher: ["/((?!_next/static|_next/image|favicon.svg|allchinabuy.png|robots.txt|sitemap.xml).*)"] };
//#endregion
//#region node_modules/vinext/dist/utils/encode-cache-tag.js
/**
* Cache-tag canonicalisation.
*
* Tags can flow into HTTP headers (e.g. `x-next-cache-tags` on ISR responses,
* Cloudflare cache-tag headers, downstream Worker code) where Node's
* `validateHeaderValue` rejects any byte outside `\t\x20-\x7e` and crashes
* the response with `ERR_INVALID_CHAR`. Even on platforms with permissive
* header setters, divergence between storage form and wire form silently
* breaks invalidation when a `revalidateTag` call's tag does not byte-match
* the form that was stored.
*
* The fix is to apply this encoding at every public boundary so storage,
* comparison, and the wire all see the same ASCII-safe form. The fast-path
* returns the input unchanged for already-ASCII tags (the common case), so
* pre-encoded `%xx` input round-trips losslessly without `decodeURIComponent`
* mangling literal `%xx` characters.
*
* The replacement matches *runs* of out-of-class code units rather than each
* code unit individually so surrogate pairs (emoji, non-BMP characters) are
* handed to `encodeURIComponent` as a complete code point â€” a per-code-unit
* regex would split the pair and throw `URIError`.
*
* Mirrors Next.js's `packages/next/src/server/lib/encode-cache-tag.ts`
* (introduced in vercel/next.js#93601).
*/
var OUT_OF_CLASS_CHAR = /[^\t\x20-\x7e]/;
var OUT_OF_CLASS_RUN = /[^\t\x20-\x7e]+/g;
function encodeCacheTag(tag) {
	return OUT_OF_CLASS_CHAR.test(tag) ? tag.replace(OUT_OF_CLASS_RUN, (run) => encodeURIComponent(run)) : tag;
}
function encodeCacheTags(tags) {
	return tags.map(encodeCacheTag);
}
//#endregion
//#region node_modules/vinext/dist/shims/internal/work-unit-async-storage.js
/**
* Shim for next/dist/server/app-render/work-unit-async-storage.external
* and next/dist/client/components/request-async-storage.external
*
* Tracks the current rendering context type so that dynamic APIs
* (io, headers, cookies, etc.) can branch on whether they're
* inside a request, prerender, cache scope, or other context.
*
* Used by: @sentry/nextjs (runtime resolve for request context injection),
* io() for hanging-promise behavior during prerendering.
*/
var workUnitAsyncStorage = new AsyncLocalStorage$1();
//#endregion
//#region node_modules/vinext/dist/utils/cache-control-metadata.js
function isUnknownRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
function readRecordField(ctx, field) {
	const value = ctx?.[field];
	return isUnknownRecord(value) ? value : void 0;
}
function readCacheControlNumberField(ctx, field) {
	const value = readRecordField(ctx, "cacheControl")?.[field] ?? ctx?.[field];
	return typeof value === "number" ? value : void 0;
}
//#endregion
//#region node_modules/vinext/dist/shims/cache.js
function readStringArrayField(ctx, field) {
	const value = ctx?.[field];
	if (!Array.isArray(value)) return [];
	return value.filter((item) => typeof item === "string");
}
var MemoryCacheHandler = class {
	store = /* @__PURE__ */ new Map();
	tagRevalidatedAt = /* @__PURE__ */ new Map();
	async get(key, _ctx) {
		const entry = this.store.get(key);
		if (!entry) return null;
		for (const tag of entry.tags) {
			const revalidatedAt = this.tagRevalidatedAt.get(tag);
			if (revalidatedAt && revalidatedAt >= entry.lastModified) {
				this.store.delete(key);
				return null;
			}
		}
		for (const tag of readStringArrayField(_ctx, "softTags")) {
			const revalidatedAt = this.tagRevalidatedAt.get(tag);
			if (revalidatedAt && revalidatedAt >= entry.lastModified) return null;
		}
		if (entry.expireAt !== null && Date.now() > entry.expireAt) {
			this.store.delete(key);
			return null;
		}
		if (entry.revalidateAt !== null && Date.now() > entry.revalidateAt) return {
			lastModified: entry.lastModified,
			value: entry.value,
			cacheState: "stale",
			cacheControl: entry.cacheControl
		};
		return {
			lastModified: entry.lastModified,
			value: entry.value,
			cacheControl: entry.cacheControl
		};
	}
	async set(key, data, ctx) {
		const tagSet = /* @__PURE__ */ new Set();
		if (data && "tags" in data && Array.isArray(data.tags)) for (const t of data.tags) tagSet.add(t);
		for (const t of readStringArrayField(ctx, "tags")) tagSet.add(t);
		const tags = [...tagSet];
		let effectiveRevalidate;
		let effectiveExpire;
		effectiveRevalidate = readCacheControlNumberField(ctx, "revalidate");
		effectiveExpire = readCacheControlNumberField(ctx, "expire");
		if (data && "revalidate" in data && typeof data.revalidate === "number") effectiveRevalidate = data.revalidate;
		if (effectiveRevalidate === 0) return;
		const now = Date.now();
		const revalidateAt = typeof effectiveRevalidate === "number" && effectiveRevalidate > 0 ? now + effectiveRevalidate * 1e3 : null;
		const expireAt = typeof effectiveExpire === "number" && effectiveExpire > 0 ? now + effectiveExpire * 1e3 : null;
		const cacheControl = typeof effectiveRevalidate === "number" ? effectiveExpire === void 0 ? { revalidate: effectiveRevalidate } : {
			revalidate: effectiveRevalidate,
			expire: effectiveExpire
		} : void 0;
		this.store.set(key, {
			value: data,
			tags,
			lastModified: now,
			revalidateAt,
			expireAt,
			cacheControl
		});
	}
	async revalidateTag(tags, _durations) {
		const tagList = Array.isArray(tags) ? tags : [tags];
		const now = Date.now();
		for (const tag of tagList) this.tagRevalidatedAt.set(tag, now);
	}
	resetRequestCache() {}
};
var _HANDLER_KEY = Symbol.for("vinext.cacheHandler");
var _gHandler = globalThis;
function _getActiveHandler() {
	return _gHandler[_HANDLER_KEY] ?? (_gHandler[_HANDLER_KEY] = new MemoryCacheHandler());
}
/**
* Get the active CacheHandler (for internal use or testing).
*/
function getCacheHandler() {
	return _getActiveHandler();
}
/**
* A fulfilled thenable that React can unwrap synchronously via `use()`
* without ever suspending. Reusing a single instance avoids allocating
* on every call â€” matching Next.js's browser/client implementation.
*
* @see https://github.com/vercel/next.js/blob/canary/packages/next/src/client/request/io.browser.ts
*/
var _resolvedIOPromise = Promise.resolve(void 0);
_resolvedIOPromise.status = "fulfilled";
_resolvedIOPromise.value = void 0;
var _FALLBACK_KEY$3 = Symbol.for("vinext.cache.fallback");
var _g$5 = globalThis;
var _cacheAls = getOrCreateAls("vinext.cache.als");
var _cacheFallbackState = _g$5[_FALLBACK_KEY$3] ??= {
	actionRevalidationKind: 0,
	requestScopedCacheLife: null,
	unstableCacheRevalidation: "foreground"
};
var ACTION_DID_NOT_REVALIDATE$1 = 0;
function _getCacheState() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _cacheAls.getStore() ?? _cacheFallbackState;
}
function getAndClearActionRevalidationKind() {
	const state = _getCacheState();
	const kind = state.actionRevalidationKind;
	state.actionRevalidationKind = ACTION_DID_NOT_REVALIDATE$1;
	return kind;
}
/**
* Read the request-scoped cache life without clearing it. Prerender response
* shaping needs the metadata before the manifest writer consumes it after the
* body has been fully rendered.
* @internal
*/
function _peekRequestScopedCacheLife() {
	const config = _getCacheState().requestScopedCacheLife;
	return config === null ? null : { ...config };
}
/**
* Consume and reset the request-scoped cache life. Returns null if none was set.
* @internal
*/
function _consumeRequestScopedCacheLife() {
	const state = _getCacheState();
	const config = state.requestScopedCacheLife;
	state.requestScopedCacheLife = null;
	return config;
}
getOrCreateAls("vinext.unstableCache.als");
//#endregion
//#region node_modules/vinext/dist/shims/fetch-cache.js
/**
* Extended fetch() with Next.js caching semantics.
*
* Patches `globalThis.fetch` during server rendering to support:
*
*   fetch(url, { next: { revalidate: 60, tags: ['posts'] } })
*   fetch(url, { cache: 'force-cache' })
*   fetch(url, { cache: 'no-store' })
*
* Cached responses are stored via the pluggable CacheHandler, so
* revalidateTag() and revalidatePath() invalidate fetch-level caches.
*
* Usage (in server entry):
*   import { withFetchCache, cleanupFetchCache } from './fetch-cache';
*   const cleanup = withFetchCache();
*   try { ... render ... } finally { cleanup(); }
*
* Or use the async helper:
*   await runWithFetchCache(async () => { ... render ... });
*/
/**
* Headers excluded from the cache key. These are W3C trace context headers
* that can break request caching and deduplication.
* All other headers ARE included in the cache key, matching Next.js behavior.
*/
var HEADER_BLOCKLIST = ["traceparent", "tracestate"];
var CACHE_KEY_PREFIX = "v3";
var MAX_CACHE_KEY_BODY_BYTES = 1024 * 1024;
var BodyTooLargeForCacheKeyError = class extends Error {
	constructor() {
		super("Fetch body too large for cache key generation");
	}
};
var SkipCacheKeyGenerationError = class extends Error {
	constructor() {
		super("Fetch body could not be serialized for cache key generation");
	}
};
/**
* Collect all headers from the request, excluding the blocklist.
* Merges headers from both the Request object and the init object,
* with init taking precedence (matching fetch() spec behavior).
*/
function collectHeaders(input, init) {
	const merged = {};
	if (input instanceof Request && input.headers) input.headers.forEach((v, k) => {
		merged[k] = v;
	});
	if (init?.headers) (init.headers instanceof Headers ? init.headers : new Headers(init.headers)).forEach((v, k) => {
		merged[k] = v;
	});
	for (const blocked of HEADER_BLOCKLIST) delete merged[blocked];
	return merged;
}
/**
* Check whether a fetch request carries any per-user auth headers.
* Used for the safety bypass (skip caching when auth headers are present
* without an explicit cache opt-in).
*/
var AUTH_HEADERS = [
	"authorization",
	"cookie",
	"x-api-key"
];
function hasAuthHeaders(input, init) {
	const headers = collectHeaders(input, init);
	return AUTH_HEADERS.some((name) => name in headers);
}
async function serializeFormData(formData, pushBodyChunk, getTotalBodyBytes) {
	for (const [key, val] of formData.entries()) {
		if (typeof val === "string") {
			pushBodyChunk(JSON.stringify([key, {
				kind: "string",
				value: val
			}]));
			continue;
		}
		if (val.size > MAX_CACHE_KEY_BODY_BYTES || getTotalBodyBytes() + val.size > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(JSON.stringify([key, {
			kind: "file",
			name: val.name,
			type: val.type,
			value: await val.text()
		}]));
	}
}
function getParsedFormContentType(contentType) {
	const mediaType = contentType?.split(";")[0]?.trim().toLowerCase();
	if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") return mediaType;
}
function stripMultipartBoundary(contentType) {
	const [type, ...params] = contentType.split(";");
	const keptParams = params.map((param) => param.trim()).filter(Boolean).filter((param) => !/^boundary\s*=/i.test(param));
	const normalizedType = type.trim().toLowerCase();
	return keptParams.length > 0 ? `${normalizedType}; ${keptParams.join("; ")}` : normalizedType;
}
async function readRequestBodyChunksWithinLimit(request) {
	const contentLengthHeader = request.headers.get("content-length");
	if (contentLengthHeader) {
		const contentLength = Number(contentLengthHeader);
		if (Number.isFinite(contentLength) && contentLength > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
	}
	const requestClone = request.clone();
	const contentType = requestClone.headers.get("content-type") ?? void 0;
	const reader = requestClone.body?.getReader();
	if (!reader) return {
		chunks: [],
		contentType
	};
	const chunks = [];
	let totalBodyBytes = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			totalBodyBytes += value.byteLength;
			if (totalBodyBytes > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
			chunks.push(value);
		}
	} catch (err) {
		reader.cancel().catch(() => {});
		throw err;
	}
	return {
		chunks,
		contentType
	};
}
/**
* Serialize request body into string chunks for cache key inclusion.
* Handles all body types: string, Uint8Array, ReadableStream, FormData, Blob,
* and Request object bodies.
* Returns the serialized body chunks and optionally stashes the original body
* on init as `_ogBody` so it can still be used after stream consumption.
*/
async function serializeBody(input, init) {
	if (!init?.body && !(input instanceof Request && input.body)) return { bodyChunks: [] };
	const bodyChunks = [];
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();
	let totalBodyBytes = 0;
	let canonicalizedContentType;
	const pushBodyChunk = (chunk) => {
		totalBodyBytes += encoder.encode(chunk).byteLength;
		if (totalBodyBytes > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		bodyChunks.push(chunk);
	};
	const getTotalBodyBytes = () => totalBodyBytes;
	if (init?.body instanceof Uint8Array) {
		if (init.body.byteLength > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(decoder.decode(init.body));
		init._ogBody = init.body;
	} else if (init?.body && typeof init.body.getReader === "function") {
		const [bodyForHashing, bodyForFetch] = init.body.tee();
		init._ogBody = bodyForFetch;
		const reader = bodyForHashing.getReader();
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (typeof value === "string") pushBodyChunk(value);
				else {
					totalBodyBytes += value.byteLength;
					if (totalBodyBytes > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
					bodyChunks.push(decoder.decode(value, { stream: true }));
				}
			}
			const finalChunk = decoder.decode();
			if (finalChunk) pushBodyChunk(finalChunk);
		} catch (err) {
			await reader.cancel();
			if (err instanceof BodyTooLargeForCacheKeyError) throw err;
			throw new SkipCacheKeyGenerationError();
		}
	} else if (init?.body instanceof URLSearchParams) {
		init._ogBody = init.body;
		pushBodyChunk(init.body.toString());
	} else if (init?.body && typeof init.body.keys === "function") {
		const formData = init.body;
		init._ogBody = init.body;
		await serializeFormData(formData, pushBodyChunk, getTotalBodyBytes);
	} else if (init?.body && typeof init.body.arrayBuffer === "function") {
		const blob = init.body;
		if (blob.size > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(await blob.text());
		const arrayBuffer = await blob.arrayBuffer();
		init._ogBody = new Blob([arrayBuffer], { type: blob.type });
	} else if (typeof init?.body === "string") {
		if (init.body.length > MAX_CACHE_KEY_BODY_BYTES) throw new BodyTooLargeForCacheKeyError();
		pushBodyChunk(init.body);
		init._ogBody = init.body;
	} else if (input instanceof Request && input.body) {
		let chunks;
		let contentType;
		try {
			({chunks, contentType} = await readRequestBodyChunksWithinLimit(input));
		} catch (err) {
			if (err instanceof BodyTooLargeForCacheKeyError) throw err;
			throw new SkipCacheKeyGenerationError();
		}
		const formContentType = getParsedFormContentType(contentType);
		if (formContentType) try {
			await serializeFormData(await new Request(input.url, {
				method: input.method,
				headers: contentType ? { "content-type": contentType } : void 0,
				body: new Blob(chunks)
			}).formData(), pushBodyChunk, getTotalBodyBytes);
			canonicalizedContentType = formContentType === "multipart/form-data" && contentType ? stripMultipartBoundary(contentType) : void 0;
			return {
				bodyChunks,
				canonicalizedContentType
			};
		} catch (err) {
			if (err instanceof BodyTooLargeForCacheKeyError) throw err;
			throw new SkipCacheKeyGenerationError();
		}
		for (const chunk of chunks) pushBodyChunk(decoder.decode(chunk, { stream: true }));
		const finalChunk = decoder.decode();
		if (finalChunk) pushBodyChunk(finalChunk);
	}
	return {
		bodyChunks,
		canonicalizedContentType
	};
}
/**
* Generate a deterministic cache key from a fetch request.
*
* Matches Next.js behavior: the key is a SHA-256 hash of a JSON array
* containing URL, method, all headers (minus blocklist), all RequestInit
* options, and the serialized body.
*/
async function buildFetchCacheKey(input, init) {
	let url;
	let method = "GET";
	if (typeof input === "string") url = input;
	else if (input instanceof URL) url = input.toString();
	else {
		url = input.url;
		method = input.method || "GET";
	}
	if (init?.method) method = init.method;
	const headers = collectHeaders(input, init);
	const { bodyChunks, canonicalizedContentType } = await serializeBody(input, init);
	if (canonicalizedContentType) headers["content-type"] = canonicalizedContentType;
	const cacheString = JSON.stringify([
		CACHE_KEY_PREFIX,
		url,
		method,
		headers,
		init?.mode,
		init?.redirect,
		init?.credentials,
		init?.referrer,
		init?.referrerPolicy,
		init?.integrity,
		init?.cache,
		bodyChunks
	]);
	const buffer = new TextEncoder().encode(cacheString);
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	return Array.prototype.map.call(new Uint8Array(hashBuffer), (b) => b.toString(16).padStart(2, "0")).join("");
}
var _PENDING_KEY = Symbol.for("vinext.fetchCache.pendingRefetches");
var _gPending = globalThis;
var pendingRefetches = _gPending[_PENDING_KEY] ??= /* @__PURE__ */ new Map();
var DEDUP_TIMEOUT_MS = 6e4;
var _ORIG_FETCH_KEY = Symbol.for("vinext.fetchCache.originalFetch");
var _gFetch = globalThis;
var originalFetch = _gFetch[_ORIG_FETCH_KEY] ??= globalThis.fetch;
var _FALLBACK_KEY$2 = Symbol.for("vinext.fetchCache.fallback");
var _g$4 = globalThis;
var _als$1 = getOrCreateAls("vinext.fetchCache.als");
var _noop = () => {};
var _responseBodyRegistry;
if (globalThis.FinalizationRegistry) _responseBodyRegistry = new FinalizationRegistry((weakRef) => {
	const stream = weakRef.deref();
	if (stream && !stream.locked) stream.cancel("Response object has been garbage collected").then(_noop, _noop);
});
var _fallbackState$2 = _g$4[_FALLBACK_KEY$2] ??= {
	currentRequestTags: [],
	currentFetchSoftTags: [],
	currentFetchCacheMode: null,
	isFetchDedupeActive: false,
	currentFetchDedupeEntries: /* @__PURE__ */ new Map()
};
function _getState$1() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _als$1.getStore() ?? _fallbackState$2;
}
/**
* Get tags collected during the current render pass.
* Useful for associating page-level cache entries with all the
* fetch tags used during rendering.
*/
function getCollectedFetchTags() {
	return [..._getState$1().currentRequestTags];
}
/**
* Set path-derived implicit tags for fetch cache reads in the current render.
*
* These are intentionally not persisted on fetch entries. They mirror Next.js
* `softTags`: `revalidatePath()` should make a fetch miss while rendering the
* affected route, without permanently coupling a shared fetch entry to one path.
*/
function setCurrentFetchSoftTags(tags) {
	_getState$1().currentFetchSoftTags = [...tags];
}
function setCurrentFetchCacheMode(mode) {
	_getState$1().currentFetchCacheMode = mode;
}
function isNoStoreFetch(cacheDirective, nextOpts) {
	return cacheDirective === "no-store" || cacheDirective === "no-cache" || nextOpts?.revalidate === false || nextOpts?.revalidate === 0;
}
function isCacheableFetch(cacheDirective, nextOpts) {
	return cacheDirective === "force-cache" || typeof nextOpts?.revalidate === "number" && nextOpts.revalidate > 0;
}
function hasExplicitRevalidateValue(nextOpts) {
	return nextOpts?.revalidate !== void 0;
}
function resolveSegmentCacheDirective(cacheDirective, nextOpts, mode) {
	if (!mode || mode === "auto") return cacheDirective;
	switch (mode) {
		case "force-cache": return "force-cache";
		case "force-no-store": return "no-store";
		case "only-cache":
			if (isNoStoreFetch(cacheDirective, nextOpts)) throw new Error("Route segment config `fetchCache = \"only-cache\"` conflicts with no-store fetch.");
			return cacheDirective ?? "force-cache";
		case "only-no-store":
			if (isCacheableFetch(cacheDirective, nextOpts)) throw new Error("Route segment config `fetchCache = \"only-no-store\"` conflicts with cacheable fetch.");
			return cacheDirective ?? "no-store";
		case "default-cache": return cacheDirective ?? (hasExplicitRevalidateValue(nextOpts) ? void 0 : "force-cache");
		case "default-no-store": return cacheDirective ?? (hasExplicitRevalidateValue(nextOpts) ? void 0 : "no-store");
	}
	return cacheDirective;
}
function getFetchCacheDirective(input, init) {
	if (init?.cache !== void 0) return init.cache;
	if (!(input instanceof Request) || input.cache === "default") return;
	return input.cache;
}
function buildFetchDedupeKey(request) {
	const filteredHeaders = Array.from(request.headers.entries()).filter(([key]) => !HEADER_BLOCKLIST.includes(key.toLowerCase()));
	return JSON.stringify([
		request.method,
		filteredHeaders,
		request.mode,
		request.redirect,
		request.credentials,
		request.referrer,
		request.referrerPolicy,
		request.integrity
	]);
}
function createFetchDedupeCandidate(input, init) {
	if (init?.signal) return null;
	const method = init?.method?.toUpperCase();
	if (method && method !== "GET" && method !== "HEAD") return null;
	if (init?.keepalive) return null;
	const request = typeof input === "string" || input instanceof URL ? new Request(input, init) : input;
	if (request.method !== "GET" && request.method !== "HEAD" || request.keepalive) return null;
	return {
		url: request.url,
		key: buildFetchDedupeKey(request)
	};
}
function buildDedupeClone(body, source) {
	const cloned = new Response(body, {
		status: source.status,
		statusText: source.statusText,
		headers: new Headers(source.headers)
	});
	Object.defineProperty(cloned, "url", {
		value: source.url,
		configurable: true,
		enumerable: true,
		writable: false
	});
	if (_responseBodyRegistry && cloned.body) _responseBodyRegistry.register(cloned, new WeakRef(cloned.body));
	return cloned;
}
function cloneDedupeResponse(response) {
	if (!response.body) return [buildDedupeClone(null, response), buildDedupeClone(null, response)];
	const [body1, body2] = response.body.tee();
	return [buildDedupeClone(body1, response), buildDedupeClone(body2, response)];
}
function dedupeFetch(input, init) {
	const state = _getState$1();
	if (!state.isFetchDedupeActive) return originalFetch(input, init);
	const candidate = createFetchDedupeCandidate(input, init);
	if (!candidate) return originalFetch(input, init);
	const entriesByUrl = state.currentFetchDedupeEntries;
	let entries = entriesByUrl.get(candidate.url);
	if (!entries) {
		entries = [];
		entriesByUrl.set(candidate.url, entries);
	}
	for (const entry of entries) {
		if (entry.key !== candidate.key) continue;
		return entry.promise.then(() => {
			if (!entry.response) throw new Error("[vinext] Missing deduped fetch response");
			const [responseForCaller, responseForFutureCaller] = cloneDedupeResponse(entry.response);
			entry.response = responseForFutureCaller;
			return responseForCaller;
		});
	}
	const promise = originalFetch(input, init);
	const entry = {
		key: candidate.key,
		promise,
		response: null
	};
	entries.push(entry);
	return promise.then((response) => {
		const [responseForCaller, responseForFutureCaller] = cloneDedupeResponse(response);
		entry.response = responseForFutureCaller;
		return responseForCaller;
	}, (err) => {
		const idx = entries.indexOf(entry);
		if (idx !== -1) entries.splice(idx, 1);
		throw err;
	});
}
/**
* Create a patched fetch function with Next.js caching semantics.
*
* The patched fetch:
* 1. Checks `cache` and `next` options to determine caching behavior
* 2. On cache hit, returns the cached response without hitting the network
* 3. On cache miss, fetches from network, stores in cache, returns response
* 4. Respects `next.revalidate` for TTL-based revalidation
* 5. Respects `next.tags` for tag-based invalidation via revalidateTag()
*/
function createPatchedFetch() {
	return async function patchedFetch(input, init) {
		const nextOpts = init?.next;
		const cacheDirective = resolveSegmentCacheDirective(getFetchCacheDirective(input, init), nextOpts, _getState$1().currentFetchCacheMode);
		if (!nextOpts && !cacheDirective) return dedupeFetch(input, init);
		if (cacheDirective === "no-store" || cacheDirective === "no-cache" || nextOpts?.revalidate === false || nextOpts?.revalidate === 0) return dedupeFetch(input, stripNextFromInit(init, cacheDirective));
		if (!(cacheDirective === "force-cache" || typeof nextOpts?.revalidate === "number" && nextOpts.revalidate > 0) && hasAuthHeaders(input, init)) return dedupeFetch(input, stripNextFromInit(init, cacheDirective));
		let revalidateSeconds;
		if (cacheDirective === "force-cache") revalidateSeconds = nextOpts?.revalidate && typeof nextOpts.revalidate === "number" ? nextOpts.revalidate : 31536e3;
		else if (typeof nextOpts?.revalidate === "number" && nextOpts.revalidate > 0) revalidateSeconds = nextOpts.revalidate;
		else if (nextOpts?.tags && nextOpts.tags.length > 0) revalidateSeconds = 31536e3;
		else return dedupeFetch(input, stripNextFromInit(init, cacheDirective));
		const tags = encodeCacheTags(nextOpts?.tags ?? []);
		const softTags = _getState$1().currentFetchSoftTags;
		let fetchInit = stripNextFromInit(init, cacheDirective);
		let cacheKey;
		try {
			cacheKey = await buildFetchCacheKey(input, fetchInit);
			fetchInit = stripNextFromInit(fetchInit, cacheDirective);
		} catch (err) {
			if (err instanceof BodyTooLargeForCacheKeyError || err instanceof SkipCacheKeyGenerationError) {
				fetchInit = stripNextFromInit(fetchInit, cacheDirective);
				return dedupeFetch(input, fetchInit);
			}
			throw err;
		}
		const handler = getCacheHandler();
		const reqTags = _getState$1().currentRequestTags;
		if (tags.length > 0) {
			for (const tag of tags) if (!reqTags.includes(tag)) reqTags.push(tag);
		}
		try {
			const cached = await handler.get(cacheKey, {
				kind: "FETCH",
				tags,
				softTags
			});
			if (cached?.value && cached.value.kind === "FETCH" && cached.cacheState !== "stale") {
				const cachedData = cached.value.data;
				return new Response(cachedData.body, {
					status: cachedData.status ?? 200,
					headers: cachedData.headers
				});
			}
			if (cached?.value && cached.value.kind === "FETCH" && cached.cacheState === "stale") {
				const staleData = cached.value.data;
				if (!pendingRefetches.has(cacheKey)) {
					const refetchPromise = originalFetch(input, fetchInit).then(async (freshResp) => {
						if (freshResp.status !== 200) return;
						const freshBody = await freshResp.text();
						const freshHeaders = {};
						freshResp.headers.forEach((v, k) => {
							if (k.toLowerCase() === "set-cookie") return;
							freshHeaders[k] = v;
						});
						const freshValue = {
							kind: "FETCH",
							data: {
								headers: freshHeaders,
								body: freshBody,
								url: typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url,
								status: freshResp.status
							},
							tags,
							revalidate: revalidateSeconds
						};
						await handler.set(cacheKey, freshValue, {
							fetchCache: true,
							tags,
							revalidate: revalidateSeconds
						});
					}).catch((err) => {
						const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
						console.error(`[vinext] fetch cache background revalidation failed for ${url} (key=${cacheKey.slice(0, 12)}...):`, err);
					}).finally(() => {
						if (pendingRefetches.get(cacheKey) === refetchPromise) pendingRefetches.delete(cacheKey);
						clearTimeout(timeoutId);
					});
					pendingRefetches.set(cacheKey, refetchPromise);
					const timeoutId = setTimeout(() => {
						if (pendingRefetches.get(cacheKey) === refetchPromise) pendingRefetches.delete(cacheKey);
					}, DEDUP_TIMEOUT_MS);
					getRequestExecutionContext()?.waitUntil(refetchPromise);
				}
				return new Response(staleData.body, {
					status: staleData.status ?? 200,
					headers: staleData.headers
				});
			}
		} catch (cacheErr) {
			console.error("[vinext] fetch cache read error:", cacheErr);
		}
		const response = await dedupeFetch(input, fetchInit);
		if (response.status === 200) {
			const cloned = response.clone();
			const body = await cloned.text();
			const headers = {};
			cloned.headers.forEach((v, k) => {
				if (k.toLowerCase() === "set-cookie") return;
				headers[k] = v;
			});
			const cacheValue = {
				kind: "FETCH",
				data: {
					headers,
					body,
					url: typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url,
					status: cloned.status
				},
				tags,
				revalidate: revalidateSeconds
			};
			handler.set(cacheKey, cacheValue, {
				fetchCache: true,
				tags,
				revalidate: revalidateSeconds
			}).catch((err) => {
				console.error("[vinext] fetch cache write error:", err);
			});
		}
		return response;
	};
}
/**
* Strip the `next` property from RequestInit before passing to real fetch.
* The `next` property is not a standard fetch option and would cause warnings
* in some environments.
*/
function stripNextFromInit(init, cacheOverride) {
	if (!init) return cacheOverride === void 0 ? void 0 : { cache: cacheOverride };
	const { next: _next, _ogBody, ...rest } = init;
	if (cacheOverride !== void 0) rest.cache = cacheOverride;
	if (_ogBody !== void 0) rest.body = _ogBody;
	return Object.keys(rest).length > 0 ? rest : void 0;
}
var _PATCH_KEY = Symbol.for("vinext.fetchCache.patchInstalled");
function _ensurePatchInstalled() {
	if (_g$4[_PATCH_KEY]) return;
	_g$4[_PATCH_KEY] = true;
	globalThis.fetch = createPatchedFetch();
}
function runWithFetchDedupe(fn) {
	_ensurePatchInstalled();
	const state = _getState$1();
	if (state.isFetchDedupeActive) return fn();
	if (isInsideUnifiedScope()) return runWithUnifiedStateMutation((uCtx) => {
		uCtx.isFetchDedupeActive = true;
		uCtx.currentFetchDedupeEntries = /* @__PURE__ */ new Map();
	}, fn);
	return _als$1.run({
		...state,
		isFetchDedupeActive: true,
		currentFetchDedupeEntries: /* @__PURE__ */ new Map()
	}, fn);
}
/**
* Install the patched fetch without creating a standalone ALS scope.
*
* `runWithFetchCache()` is the standalone helper: it installs the patch and
* creates an isolated per-request tag store. The unified request context owns
* that isolation itself via `currentRequestTags`, so callers inside
* `runWithRequestContext()` only need the process-global fetch monkey-patch.
*/
function ensureFetchPatch() {
	_ensurePatchInstalled();
}
//#endregion
//#region node_modules/vinext/dist/server/csp.js
var ESCAPE_REGEX = /[&><\u2028\u2029]/;
function matchesDirectiveName(directive, name) {
	return directive === name || directive.startsWith(`${name} `);
}
function getScriptNonceFromHeader(cspHeaderValue) {
	const directives = cspHeaderValue.split(";").map((directive) => directive.trim());
	const directive = directives.find((value) => matchesDirectiveName(value, "script-src")) ?? directives.find((value) => matchesDirectiveName(value, "default-src"));
	if (!directive) return;
	const nonce = directive.split(" ").slice(1).map((source) => source.trim()).find((source) => source.startsWith("'nonce-") && source.length > 8 && source.endsWith("'"))?.slice(7, -1);
	if (!nonce) return;
	if (ESCAPE_REGEX.test(nonce)) throw new Error("Nonce value from Content-Security-Policy contained HTML escape characters.\nLearn more: https://nextjs.org/docs/messages/nonce-contained-invalid-characters");
	return nonce;
}
function getScriptNonceFromHeaders(headers) {
	const csp = headers?.get("content-security-policy") ?? headers?.get("content-security-policy-report-only");
	if (!csp) return;
	return getScriptNonceFromHeader(csp);
}
function getScriptNonceFromHeaderSources(...headersList) {
	for (const headers of headersList) {
		const nonce = getScriptNonceFromHeaders(headers);
		if (nonce) return nonce;
	}
}
//#endregion
//#region node_modules/vinext/dist/server/middleware-response-headers.js
var ADDITIVE_RESPONSE_HEADER_NAMES = new Set(["set-cookie", "vary"]);
function mergeVaryHeader(target, value) {
	const existing = target.get("Vary");
	const tokens = (existing ? `${existing}, ${value}` : value).split(",").map((token) => token.trim()).filter((token) => token.length > 0);
	if (tokens.some((token) => token === "*")) {
		target.set("Vary", "*");
		return;
	}
	const seen = /* @__PURE__ */ new Set();
	const merged = [];
	for (const token of tokens) {
		const normalized = token.toLowerCase();
		if (seen.has(normalized)) continue;
		seen.add(normalized);
		merged.push(token);
	}
	target.set("Vary", merged.join(", "));
}
/**
* Merge middleware response headers into a target Headers object.
*
* Set-Cookie and Vary are accumulated (append) since multiple sources can
* contribute values. All other headers use set() so middleware owns singular
* response headers like Cache-Control.
*/
function mergeMiddlewareResponseHeaders(target, middlewareHeaders) {
	if (!middlewareHeaders) return;
	for (const [key, value] of middlewareHeaders) {
		if (key.toLowerCase() === "vary") {
			mergeVaryHeader(target, value);
			continue;
		}
		if (ADDITIVE_RESPONSE_HEADER_NAMES.has(key.toLowerCase())) {
			target.append(key, value);
			continue;
		}
		target.set(key, value);
	}
}
//#endregion
//#region node_modules/vinext/dist/routing/utils.js
var PATH_DELIMITER_REGEX = /([/#?\\]|%(2f|23|3f|5c))/gi;
function encodePathDelimiters(segment) {
	return segment.replace(PATH_DELIMITER_REGEX, (char) => encodeURIComponent(char));
}
/**
* Decode a filesystem or URL path segment while preserving encoded path delimiters.
* Mirrors Next.js segment-wise decoding so "%5F" becomes "_" but "%2F" stays "%2F".
*/
function decodeRouteSegment(segment) {
	try {
		return encodePathDelimiters(decodeURIComponent(segment));
	} catch {
		return segment;
	}
}
/**
* Strict variant for request pipelines that should reject malformed percent-encoding.
*/
function decodeRouteSegmentStrict(segment) {
	return encodePathDelimiters(decodeURIComponent(segment));
}
/**
* Normalize a pathname for route matching by decoding each segment independently.
* This prevents encoded slashes from turning into real path separators.
*/
function normalizePathnameForRouteMatch(pathname) {
	return pathname.split("/").map((segment) => decodeRouteSegment(segment)).join("/");
}
/**
* Strict pathname normalization for live request handling.
* Throws on malformed percent-encoding so callers can return 400.
*/
function normalizePathnameForRouteMatchStrict(pathname) {
	return pathname.split("/").map((segment) => decodeRouteSegmentStrict(segment)).join("/");
}
function decodeMatchedParam(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
/**
* Decode captured route params with `decodeURIComponent`, mirroring Next.js
* route-matcher.ts:25-27. Mutates the params object in place. Catch-all
* arrays are decoded element-wise. Malformed escapes are preserved (the
* strict normalization layer rejects them at the request boundary).
*/
function decodeMatchedParams(params) {
	for (const key of Object.keys(params)) {
		const value = params[key];
		if (Array.isArray(value)) params[key] = value.map(decodeMatchedParam);
		else params[key] = decodeMatchedParam(value);
	}
}
//#endregion
//#region node_modules/vinext/dist/server/normalize-path.js
/**
* Path normalization utility for request handling.
*
* Normalizes URL pathnames to a canonical form BEFORE any matching occurs
* (middleware, routing, redirects, rewrites). This ensures middleware and
* the router always see the same path, preventing path-confusion issues like
* double-slash mismatches.
*
* Normalization rules:
*  1. Collapse consecutive slashes: //foo///bar â†’ /foo/bar
*  2. Resolve single-dot segments:  /foo/./bar  â†’ /foo/bar
*  3. Resolve double-dot segments:  /foo/../bar â†’ /bar
*  4. Ensure leading slash:         foo/bar     â†’ /foo/bar
*  5. Preserve root:                /           â†’ /
*
* This function does NOT:
*  - Strip or add trailing slashes (handled separately by trailingSlash config)
*  - Decode percent-encoded characters (callers should decode before calling this)
*  - Lowercase the path (route matching is case-sensitive)
*/
function normalizePath(pathname) {
	if (pathname === "/" || pathname.length > 1 && pathname[0] === "/" && !pathname.includes("//") && !pathname.includes("/./") && !pathname.includes("/../") && !pathname.endsWith("/.") && !pathname.endsWith("/..")) return pathname;
	const segments = pathname.split("/");
	const resolved = [];
	for (const segment of segments) {
		if (segment === "" || segment === ".") continue;
		if (segment === "..") resolved.pop();
		else resolved.push(segment);
	}
	return "/" + resolved.join("/");
}
//#endregion
//#region node_modules/vinext/dist/server/middleware-matcher.js
var EMPTY_MIDDLEWARE_REQUEST_CONTEXT = {
	headers: new Headers(),
	cookies: {},
	query: new URLSearchParams(),
	host: ""
};
var _mwPatternCache = /* @__PURE__ */ new Map();
function matchesMiddleware(pathname, matcher, request, i18nConfig) {
	if (!matcher) return true;
	if (typeof matcher === "string") return matchMatcherPattern(pathname, matcher, i18nConfig);
	if (!Array.isArray(matcher)) return false;
	const requestContext = request ? requestContextFromRequest(request) : EMPTY_MIDDLEWARE_REQUEST_CONTEXT;
	for (const m of matcher) {
		if (typeof m === "string") {
			if (matchMatcherPattern(pathname, m, i18nConfig)) return true;
			continue;
		}
		if (isValidMiddlewareMatcherObject(m)) {
			if (!matchObjectMatcher(pathname, m, i18nConfig)) continue;
			if (!checkHasConditions(m.has, m.missing, requestContext)) continue;
			return true;
		}
	}
	return false;
}
function isValidMiddlewareMatcherObject(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	if (!("source" in value) || typeof value.source !== "string") return false;
	for (const key of Object.keys(value)) if (key !== "source" && key !== "locale" && key !== "has" && key !== "missing") return false;
	if ("locale" in value && value.locale !== void 0 && value.locale !== false) return false;
	if ("has" in value && value.has !== void 0 && !Array.isArray(value.has)) return false;
	if ("missing" in value && value.missing !== void 0 && !Array.isArray(value.missing)) return false;
	return true;
}
function matchMatcherPattern(pathname, pattern, i18nConfig) {
	if (!i18nConfig) return matchPattern(pathname, pattern);
	return matchPattern(stripLocalePrefix(pathname, i18nConfig) ?? pathname, pattern);
}
function matchObjectMatcher(pathname, matcher, i18nConfig) {
	return matcher.locale === false ? matchPattern(pathname, matcher.source) : matchMatcherPattern(pathname, matcher.source, i18nConfig);
}
function stripLocalePrefix(pathname, i18nConfig) {
	if (pathname === "/") return null;
	const segments = pathname.split("/");
	const firstSegment = segments[1];
	if (!firstSegment || !i18nConfig.locales.includes(firstSegment)) return null;
	return removeTrailingSlash("/" + segments.slice(2).join("/"));
}
function matchPattern(pathname, pattern) {
	let cached = _mwPatternCache.get(pattern);
	if (cached === void 0) {
		cached = compileMatcherPattern(pattern);
		_mwPatternCache.set(pattern, cached);
	}
	if (cached === null) return pathname === pattern;
	return cached.test(pathname);
}
function extractConstraint(str, re) {
	if (str[re.lastIndex] !== "(") return null;
	const start = re.lastIndex + 1;
	let depth = 1;
	let i = start;
	while (i < str.length && depth > 0) {
		if (str[i] === "(") depth++;
		else if (str[i] === ")") depth--;
		i++;
	}
	if (depth !== 0) return null;
	re.lastIndex = i;
	return str.slice(start, i - 1);
}
function compileMatcherPattern(pattern) {
	const hasConstraints = /:[\w-]+[*+]?\(/.test(pattern);
	if (!hasConstraints && (pattern.includes("(") || pattern.includes("\\"))) return safeRegExp("^" + pattern + "$");
	let regexStr = "";
	const tokenRe = /\/:([\w-]+)\*|\/:([\w-]+)\+|:([\w-]+)|[.]|[^/:.]+|./g;
	let tok;
	while ((tok = tokenRe.exec(pattern)) !== null) if (tok[1] !== void 0) {
		const constraint = hasConstraints ? extractConstraint(pattern, tokenRe) : null;
		regexStr += constraint !== null ? `(?:/(${constraint}))?` : "(?:/.*)?";
	} else if (tok[2] !== void 0) {
		const constraint = hasConstraints ? extractConstraint(pattern, tokenRe) : null;
		regexStr += constraint !== null ? `(?:/(${constraint}))` : "(?:/.+)";
	} else if (tok[3] !== void 0) {
		const constraint = hasConstraints ? extractConstraint(pattern, tokenRe) : null;
		const isOptional = pattern[tokenRe.lastIndex] === "?";
		if (isOptional) tokenRe.lastIndex += 1;
		const group = constraint !== null ? `(${constraint})` : "([^/]+)";
		if (isOptional && regexStr.endsWith("/")) regexStr = regexStr.slice(0, -1) + `(?:/${group})?`;
		else if (isOptional) regexStr += `${group}?`;
		else regexStr += group;
	} else if (tok[0] === ".") regexStr += "\\.";
	else regexStr += tok[0];
	return safeRegExp("^" + regexStr + "$");
}
//#endregion
//#region node_modules/vinext/dist/server/middleware-runtime.js
function isMiddlewareHandler(value) {
	return typeof value === "function";
}
function isMiddlewareConfigExport(value) {
	return !!value && typeof value === "object";
}
function middlewareFileLabel(isProxy) {
	return isProxy ? "Proxy" : "Middleware";
}
function middlewareExpectedExport(isProxy) {
	return isProxy ? "proxy" : "middleware";
}
function resolveMiddlewareModuleHandler(mod, options) {
	const handler = options.isProxy ? mod.proxy ?? mod.default : mod.middleware ?? mod.default;
	if (isMiddlewareHandler(handler)) return handler;
	const fileLabel = middlewareFileLabel(options.isProxy);
	const expectedExport = middlewareExpectedExport(options.isProxy);
	const fileSuffix = options.filePath ? ` "${options.filePath}"` : "";
	throw new Error(`The ${fileLabel} file${fileSuffix} must export a function named \`${expectedExport}\` or a \`default\` function.`);
}
function middlewareMatcher(mod) {
	const config = mod.config;
	if (!isMiddlewareConfigExport(config)) return void 0;
	return config.matcher;
}
function stripMiddlewareHeadersFromResponse(response) {
	const headers = new Headers(response.headers);
	processMiddlewareHeaders(headers);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
function collectMiddlewareHeaders(response) {
	const responseHeaders = new Headers();
	for (const [key, value] of response.headers) if (!key.startsWith("x-middleware-") || shouldKeepMiddlewareHeader(key)) responseHeaders.append(key, value);
	return responseHeaders;
}
function drainFetchEvent(fetchEvent) {
	const waitUntilPromises = fetchEvent.waitUntilPromises;
	const drained = fetchEvent.drainWaitUntil();
	const executionContext = getRequestExecutionContext();
	if (executionContext) executionContext.waitUntil(drained);
	return waitUntilPromises;
}
function resolveMiddlewarePathname(request) {
	const url = new URL(request.url);
	try {
		return normalizePath(normalizePathnameForRouteMatchStrict(url.pathname));
	} catch {
		return badRequestResponse();
	}
}
function createNextRequest(request, normalizedPathname, i18nConfig, basePath) {
	const url = new URL(request.url);
	let mwRequest = request.body && !request.bodyUsed ? request.clone() : request;
	if (normalizedPathname !== url.pathname) {
		const mwUrl = new URL(url);
		mwUrl.pathname = normalizedPathname;
		mwRequest = new Request(mwUrl, mwRequest);
	}
	const nextConfig = basePath || i18nConfig ? {
		basePath: basePath ?? "",
		i18n: i18nConfig ?? void 0
	} : void 0;
	return mwRequest instanceof NextRequest ? mwRequest : new NextRequest(mwRequest, nextConfig ? { nextConfig } : void 0);
}
async function executeMiddleware(options) {
	const middlewareFn = resolveMiddlewareModuleHandler(options.module, {
		filePath: options.filePath,
		isProxy: options.isProxy
	});
	const normalizedPathname = options.normalizedPathname ?? resolveMiddlewarePathname(options.request);
	if (normalizedPathname instanceof Response) return {
		continue: false,
		response: normalizedPathname
	};
	if (!matchesMiddleware(normalizedPathname, middlewareMatcher(options.module), options.request, options.i18nConfig)) return { continue: true };
	const nextRequest = createNextRequest(options.request, normalizedPathname, options.i18nConfig, options.basePath);
	const fetchEvent = new NextFetchEvent({ page: normalizedPathname });
	let response;
	try {
		response = await middlewareFn(nextRequest, fetchEvent);
	} catch (e) {
		console.error("[vinext] Middleware error:", e);
		const waitUntilPromises = drainFetchEvent(fetchEvent);
		return {
			continue: false,
			response: internalServerErrorResponse(options.includeErrorDetails ? "Middleware Error: " + (e instanceof Error ? e.message : String(e)) : "Internal Server Error"),
			waitUntilPromises
		};
	}
	const waitUntilPromises = drainFetchEvent(fetchEvent);
	if (!response) return {
		continue: true,
		waitUntilPromises
	};
	if (response.headers.get("x-middleware-next") === "1") return {
		continue: true,
		responseHeaders: collectMiddlewareHeaders(response),
		status: response.status !== 200 ? response.status : void 0,
		waitUntilPromises
	};
	if (response.status >= 300 && response.status < 400) {
		const location = response.headers.get("Location") ?? response.headers.get("location");
		if (location) {
			const responseHeaders = new Headers();
			for (const [key, value] of response.headers) if (!key.startsWith("x-middleware-") && key.toLowerCase() !== "location") responseHeaders.append(key, value);
			return {
				continue: false,
				redirectUrl: location,
				redirectStatus: response.status,
				response: stripMiddlewareHeadersFromResponse(response),
				responseHeaders,
				waitUntilPromises
			};
		}
	}
	const rewriteUrl = response.headers.get(MIDDLEWARE_REWRITE_HEADER);
	if (rewriteUrl) {
		let rewritePath;
		try {
			const rewriteParsed = new URL(rewriteUrl, options.request.url);
			const requestOrigin = new URL(options.request.url).origin;
			rewritePath = rewriteParsed.origin === requestOrigin ? rewriteParsed.pathname + rewriteParsed.search : rewriteParsed.href;
		} catch {
			rewritePath = rewriteUrl;
		}
		return {
			continue: true,
			rewriteUrl: rewritePath,
			rewriteStatus: response.status !== 200 ? response.status : void 0,
			responseHeaders: collectMiddlewareHeaders(response),
			status: response.status !== 200 ? response.status : void 0,
			waitUntilPromises
		};
	}
	return {
		continue: false,
		response: stripMiddlewareHeadersFromResponse(response),
		waitUntilPromises
	};
}
//#endregion
//#region node_modules/vinext/dist/server/app-middleware.js
var FLIGHT_HEADER_SET = new Set(FLIGHT_HEADERS);
function requestWithoutFlightHeaders(request) {
	let hasFlightHeader = false;
	const headers = new Headers();
	for (const [key, value] of request.headers) if (FLIGHT_HEADER_SET.has(key.toLowerCase())) hasFlightHeader = true;
	else headers.append(key, value);
	if (!hasFlightHeader) return request;
	return cloneRequestWithHeaders(request.body ? request.clone() : request, headers);
}
function responseFromMiddlewareRedirect(result) {
	if (result.response) return result.response;
	const headers = new Headers(result.responseHeaders);
	if (result.redirectUrl) headers.set("Location", result.redirectUrl);
	return new Response(null, {
		status: result.redirectStatus ?? 307,
		headers
	});
}
function isExternalMiddlewareRewrite(rewriteUrl, request) {
	return new URL(rewriteUrl, request.url).origin !== new URL(request.url).origin;
}
function requestWithMiddlewareRequestHeaders(request, middlewareHeaders) {
	const nextHeaders = middlewareHeaders ? buildRequestHeadersFromMiddlewareResponse(request.headers, middlewareHeaders, { preserveCredentialHeaders: true }) : null;
	if (!nextHeaders) return request;
	const init = {
		method: request.method,
		headers: nextHeaders,
		body: request.body
	};
	if (request.body) Object.defineProperty(init, "duplex", {
		value: "half",
		enumerable: true
	});
	return new Request(request.url, init);
}
async function proxyExternalMiddlewareRewrite(request, rewriteUrl, context) {
	const proxyRequest = requestWithMiddlewareRequestHeaders(request, context.requestHeaders ?? context.headers);
	setHeadersContext(null);
	setNavigationContext(null);
	const proxyResponse = await proxyExternalRequest(proxyRequest, rewriteUrl);
	const headers = new Headers(proxyResponse.headers);
	processMiddlewareHeaders(headers);
	if (!context.headers) return new Response(proxyResponse.body, {
		status: proxyResponse.status,
		statusText: proxyResponse.statusText,
		headers
	});
	const middlewareHeaders = new Headers(context.headers);
	processMiddlewareHeaders(middlewareHeaders);
	mergeMiddlewareResponseHeaders(headers, middlewareHeaders);
	return new Response(proxyResponse.body, {
		status: proxyResponse.status,
		statusText: proxyResponse.statusText,
		headers
	});
}
function applyForwardedMiddlewareContext(request, context) {
	return { applied: false };
}
async function applyAppMiddleware(options) {
	const forwarded = applyForwardedMiddlewareContext(options.request, options.context);
	const middlewareRequest = requestWithoutFlightHeaders(options.request);
	let cleanPathname = options.cleanPathname;
	let search = null;
	if (forwarded.rewriteUrl) try {
		if (isExternalMiddlewareRewrite(forwarded.rewriteUrl, middlewareRequest)) return {
			kind: "response",
			response: await proxyExternalMiddlewareRewrite(middlewareRequest, forwarded.rewriteUrl, options.context)
		};
		const rewriteParsed = new URL(forwarded.rewriteUrl, middlewareRequest.url);
		cleanPathname = rewriteParsed.pathname;
		search = rewriteParsed.search;
	} catch (e) {
		console.error("[vinext] Failed to apply forwarded middleware rewrite:", e);
		forwarded.applied = false;
	}
	if (!forwarded.applied) {
		const result = await executeMiddleware({
			basePath: options.basePath,
			i18nConfig: options.i18nConfig,
			isProxy: options.isProxy,
			module: options.module,
			normalizedPathname: cleanPathname,
			request: middlewareRequest
		});
		if (!result.continue) {
			if (result.redirectUrl) return {
				kind: "response",
				response: responseFromMiddlewareRedirect(result)
			};
			if (result.response) return {
				kind: "response",
				response: result.response
			};
			return {
				kind: "response",
				response: internalServerErrorResponse()
			};
		}
		if (result.responseHeaders) options.context.headers = new Headers(result.responseHeaders);
		if (result.status !== void 0) options.context.status = result.status;
		if (result.rewriteUrl) {
			if (result.rewriteStatus !== void 0) options.context.status = result.rewriteStatus;
			if (isExternalUrl(result.rewriteUrl)) return {
				kind: "response",
				response: await proxyExternalMiddlewareRewrite(middlewareRequest, result.rewriteUrl, options.context)
			};
			const rewriteParsed = new URL(result.rewriteUrl, middlewareRequest.url);
			cleanPathname = rewriteParsed.pathname;
			search = rewriteParsed.search;
		}
	}
	if (options.context.headers) {
		options.context.requestHeaders = new Headers(options.context.headers);
		applyMiddlewareRequestHeaders(options.context.headers);
		processMiddlewareHeaders(options.context.headers);
	}
	return {
		kind: "continue",
		cleanPathname,
		search
	};
}
//#endregion
//#region node_modules/vinext/dist/server/cache-control.js
var NEVER_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
var STATIC_CACHE_CONTROL = "s-maxage=31536000, stale-while-revalidate";
var STALE_REVALIDATE_CACHE_CONTROL = "s-maxage=0, stale-while-revalidate";
var NO_STORE_CACHE_CONTROL$1 = "no-store, must-revalidate";
/**
* Matches Next.js's `getCacheControlHeader` stale window semantics while
* preserving vinext's legacy unbounded SWR header when no expire ceiling is
* available yet.
*
* Next.js source:
* https://github.com/vercel/next.js/blob/canary/packages/next/src/server/lib/cache-control.ts
*/
function buildRevalidateCacheControl(revalidateSeconds, expireSeconds) {
	if (expireSeconds === void 0) return `s-maxage=${revalidateSeconds}, stale-while-revalidate`;
	if (revalidateSeconds >= expireSeconds) return `s-maxage=${revalidateSeconds}`;
	return `s-maxage=${revalidateSeconds}, stale-while-revalidate=${expireSeconds - revalidateSeconds}`;
}
/**
* Builds Cache-Control for ISR cache reads. HIT responses and STALE responses
* with stored expire metadata use the same route policy because Next.js derives
* this header from cache-control metadata, not from the cache hit/stale state.
* STALE entries without expire metadata keep vinext's legacy `s-maxage=0`
* fallback so older cache entries are not treated as newly fresh downstream.
*/
function buildCachedRevalidateCacheControl(cacheState, revalidateSeconds, expireSeconds) {
	if (revalidateSeconds === Infinity) return STATIC_CACHE_CONTROL;
	if (cacheState === "STALE" && expireSeconds === void 0) return STALE_REVALIDATE_CACHE_CONTROL;
	return buildRevalidateCacheControl(revalidateSeconds, expireSeconds);
}
//#endregion
//#region node_modules/vinext/dist/server/app-page-response.js
function applyTimingHeader(headers, timing) {
	if (!timing) return;
	const handlerStart = Math.round(timing.handlerStart);
	const compileMs = timing.compileEnd !== void 0 ? Math.round(timing.compileEnd - timing.handlerStart) : -1;
	const renderMs = timing.responseKind === "html" && timing.renderEnd !== void 0 && timing.compileEnd !== void 0 ? Math.round(timing.renderEnd - timing.compileEnd) : -1;
	headers.set(VINEXT_TIMING_HEADER, `${handlerStart},${compileMs},${renderMs}`);
}
function resolveAppPageRscResponsePolicy(options) {
	if (options.isDraftMode) return { cacheControl: NO_STORE_CACHE_CONTROL$1 };
	if (options.isForceDynamic || options.dynamicUsedDuringBuild) return { cacheControl: NO_STORE_CACHE_CONTROL$1 };
	if (options.revalidateSeconds === 0) return { cacheControl: NO_STORE_CACHE_CONTROL$1 };
	if ((options.isForceStatic || options.isDynamicError) && !options.revalidateSeconds || options.revalidateSeconds === Infinity) return {
		cacheControl: STATIC_CACHE_CONTROL,
		cacheState: "STATIC"
	};
	if (options.revalidateSeconds) return {
		cacheControl: buildRevalidateCacheControl(options.revalidateSeconds, options.expireSeconds),
		cacheState: options.isProduction ? "MISS" : void 0
	};
	return {};
}
function resolveAppPageHtmlResponsePolicy(options) {
	if (options.isDraftMode) return {
		cacheControl: NO_STORE_CACHE_CONTROL$1,
		shouldWriteToCache: false
	};
	if (options.isForceDynamic) return {
		cacheControl: NO_STORE_CACHE_CONTROL$1,
		shouldWriteToCache: false
	};
	if (options.hasScriptNonce) return {
		cacheControl: NO_STORE_CACHE_CONTROL$1,
		shouldWriteToCache: false
	};
	if (options.isProgressiveActionRender) return {
		cacheControl: NO_STORE_CACHE_CONTROL$1,
		shouldWriteToCache: false
	};
	if (options.revalidateSeconds === 0) return {
		cacheControl: NO_STORE_CACHE_CONTROL$1,
		shouldWriteToCache: false
	};
	if ((options.isForceStatic || options.isDynamicError) && options.revalidateSeconds === null) return {
		cacheControl: STATIC_CACHE_CONTROL,
		cacheState: "STATIC",
		shouldWriteToCache: false
	};
	if (options.dynamicUsedDuringRender) return {
		cacheControl: NO_STORE_CACHE_CONTROL$1,
		shouldWriteToCache: false
	};
	if (options.revalidateSeconds !== null && options.revalidateSeconds > 0 && options.revalidateSeconds !== Infinity) return {
		cacheControl: buildRevalidateCacheControl(options.revalidateSeconds, options.expireSeconds),
		cacheState: options.isProduction ? "MISS" : void 0,
		shouldWriteToCache: options.isProduction
	};
	if (options.revalidateSeconds === Infinity) return {
		cacheControl: STATIC_CACHE_CONTROL,
		cacheState: "STATIC",
		shouldWriteToCache: false
	};
	return { shouldWriteToCache: false };
}
function buildAppPageRscResponse(body, options) {
	const headers = new Headers({
		"Content-Type": "text/x-component; charset=utf-8",
		Vary: VINEXT_RSC_VARY_HEADER
	});
	if (options.params && Object.keys(options.params).length > 0) headers.set(VINEXT_PARAMS_HEADER, encodeURIComponent(JSON.stringify(options.params)));
	if (options.mountedSlotsHeader) headers.set(VINEXT_MOUNTED_SLOTS_HEADER, options.mountedSlotsHeader);
	if (options.policy.cacheControl) headers.set("Cache-Control", options.policy.cacheControl);
	if (options.policy.cacheState) headers.set(VINEXT_CACHE_HEADER, options.policy.cacheState);
	mergeMiddlewareResponseHeaders(headers, options.middlewareContext.headers);
	applyTimingHeader(headers, options.timing);
	return new Response(body, {
		status: options.middlewareContext.status ?? 200,
		headers
	});
}
function buildAppPageHtmlResponse(body, options) {
	const headers = new Headers({
		"Content-Type": "text/html; charset=utf-8",
		Vary: VINEXT_RSC_VARY_HEADER
	});
	if (options.policy.cacheControl) headers.set("Cache-Control", options.policy.cacheControl);
	if (options.policy.cacheState) headers.set(VINEXT_CACHE_HEADER, options.policy.cacheState);
	if (options.draftCookie) headers.append("Set-Cookie", options.draftCookie);
	if (options.fontLinkHeader) headers.set("Link", options.fontLinkHeader);
	mergeMiddlewareResponseHeaders(headers, options.middlewareContext.headers);
	applyTimingHeader(headers, options.timing);
	return new Response(body, {
		status: options.middlewareContext.status ?? 200,
		headers
	});
}
//#endregion
//#region node_modules/vinext/dist/server/implicit-tags.js
var NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
function appendUnique(tags, tag) {
	if (!tags.includes(tag)) tags.push(tag);
}
function normalizeRouteSegment(segment) {
	if (!segment || segment === "." || segment.startsWith("@")) return null;
	return segment;
}
function buildRouteCachePath(routeSegments, leafKind) {
	const parts = [];
	for (const segment of routeSegments) {
		const normalized = normalizeRouteSegment(segment);
		if (normalized) parts.push(normalized);
	}
	parts.push(leafKind);
	return `/${parts.join("/")}`;
}
function appendDerivedTags(tags, routePath) {
	appendUnique(tags, `${NEXT_CACHE_IMPLICIT_TAG_ID}/layout`);
	if (!routePath.startsWith("/")) return;
	const routeParts = routePath.split("/");
	const leafIndex = routeParts.length - 1;
	for (let i = 1; i <= routeParts.length; i++) {
		let currentPathname = routeParts.slice(0, i).join("/");
		if (!currentPathname) continue;
		if (!(i - 1 === leafIndex)) currentPathname = `${currentPathname}/layout`;
		appendUnique(tags, `${NEXT_CACHE_IMPLICIT_TAG_ID}${currentPathname}`);
	}
}
function buildPageCacheTags(pathname, extraTags, routeSegments, leafKind) {
	const tags = [pathname, `${NEXT_CACHE_IMPLICIT_TAG_ID}${pathname}`];
	if (pathname === "/") appendUnique(tags, `${NEXT_CACHE_IMPLICIT_TAG_ID}/index`);
	if (pathname === "/index") appendUnique(tags, `${NEXT_CACHE_IMPLICIT_TAG_ID}/`);
	appendDerivedTags(tags, buildRouteCachePath(routeSegments, leafKind));
	for (const tag of extraTags) appendUnique(tags, tag);
	return tags.map(encodeCacheTag);
}
//#endregion
//#region node_modules/vinext/dist/server/app-post-middleware-context.js
/**
* Build a request context from the live ALS HeadersContext, which reflects
* any x-middleware-request-* header mutations applied by middleware.
* Used for afterFiles and fallback rewrite has/missing evaluation â€” these
* run after middleware in the App Router execution order.
*
* Falls back to `requestContextFromRequest(request)` when no HeadersContext
* is set (no middleware ran, or middleware didn't set request headers).
*/
function buildPostMwRequestContext(request) {
	const url = new URL(request.url);
	const ctx = getHeadersContext();
	if (!ctx) return requestContextFromRequest(request);
	const cookiesRecord = Object.fromEntries(ctx.cookies);
	return {
		headers: ctx.headers,
		cookies: cookiesRecord,
		query: url.searchParams,
		host: normalizeHost(ctx.headers.get("host"), url.hostname)
	};
}
//#endregion
//#region node_modules/vinext/dist/shims/root-params.js
var _FALLBACK_KEY$1 = Symbol.for("vinext.rootParams.fallback");
var _g$3 = globalThis;
var _fallbackState$1 = _g$3[_FALLBACK_KEY$1] ??= { rootParams: null };
function getState() {
	if (isInsideUnifiedScope()) return getRequestContext();
	return _fallbackState$1;
}
function pickRootParams(params, rootParamNames) {
	const picked = {};
	for (const name of rootParamNames ?? []) picked[name] = params[name];
	return picked;
}
function setRootParams(params) {
	getState().rootParams = params;
}
//#endregion
//#region node_modules/vinext/dist/server/app-prerender-static-params.js
async function callAppPrerenderStaticParams(options) {
	setRootParams(pickRootParams(options.params, options.rootParamNamesByPattern[options.pattern]));
	try {
		return await options.fn({ params: options.params });
	} finally {
		setRootParams(null);
	}
}
//#endregion
//#region node_modules/vinext/dist/server/app-prerender-endpoints.js
var STATIC_PARAMS_ENDPOINT = "/__vinext/prerender/static-params";
var PAGES_STATIC_PATHS_ENDPOINT = "/__vinext/prerender/pages-static-paths";
var JSON_HEADERS = { "content-type": "application/json" };
async function handleAppPrerenderEndpoint(request, options) {
	if (options.pathname === STATIC_PARAMS_ENDPOINT) return handleStaticParamsEndpoint(request, options);
	if (options.pathname === PAGES_STATIC_PATHS_ENDPOINT) {
		if (!options.loadPagesRoutes) return null;
		return handlePagesStaticPathsEndpoint(request, options);
	}
	return null;
}
async function handleStaticParamsEndpoint(request, options) {
	if (!isEnabled(options)) return notFoundResponse();
	const url = new URL(request.url);
	const pattern = url.searchParams.get("pattern");
	if (!pattern) return new Response("missing pattern", { status: 400 });
	const generateStaticParams = options.staticParamsMap[pattern];
	if (typeof generateStaticParams !== "function") return jsonNullResponse();
	try {
		return jsonResponse(await callAppPrerenderStaticParams({
			fn: generateStaticParams,
			params: parseParentParams(url.searchParams.get("parentParams")),
			pattern,
			rootParamNamesByPattern: options.rootParamNamesByPattern ?? {}
		}));
	} catch (error) {
		return jsonResponse({ error: String(error) }, 500);
	}
}
async function handlePagesStaticPathsEndpoint(request, options) {
	if (!isEnabled(options)) return notFoundResponse();
	const url = new URL(request.url);
	const pattern = url.searchParams.get("pattern");
	if (!pattern) return new Response("missing pattern", { status: 400 });
	try {
		const getStaticPaths = findPageRoute(await options.loadPagesRoutes?.(), pattern)?.module?.getStaticPaths;
		if (typeof getStaticPaths !== "function") return jsonNullResponse();
		return jsonResponse(await getStaticPaths({
			locales: parseLocales(url.searchParams.get("locales")),
			defaultLocale: url.searchParams.get("defaultLocale") ?? ""
		}));
	} catch (error) {
		return jsonResponse({ error: String(error) }, 500);
	}
}
function isEnabled(options) {
	return options.isPrerenderEnabled?.() ?? false;
}
function jsonResponse(body, status = 200) {
	return new Response(JSON.stringify(body), {
		headers: JSON_HEADERS,
		status
	});
}
function jsonNullResponse() {
	return new Response("null", {
		headers: JSON_HEADERS,
		status: 200
	});
}
function parseParentParams(raw) {
	if (!raw) return {};
	const value = JSON.parse(raw);
	if (!isPlainObject(value)) return {};
	const params = {};
	for (const [key, paramValue] of Object.entries(value)) if (typeof paramValue === "string" || paramValue === void 0 || isStringArray(paramValue)) params[key] = paramValue;
	return params;
}
function parseLocales(raw) {
	if (!raw) return [];
	const value = JSON.parse(raw);
	if (!Array.isArray(value)) return [];
	return value.filter((locale) => typeof locale === "string");
}
function findPageRoute(value, pattern) {
	if (!Array.isArray(value)) return void 0;
	for (const route of value) if (isPageRoute(route) && route.pattern === pattern) return route;
}
function isPageRoute(value) {
	if (!isPlainObject(value) || typeof value.pattern !== "string") return false;
	if (value.module === void 0) return true;
	if (!isPlainObject(value.module)) return false;
	return value.module.getStaticPaths === void 0 || typeof value.module.getStaticPaths === "function";
}
function isPlainObject(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isStringArray(value) {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}
//#endregion
//#region node_modules/vinext/dist/server/app-rsc-response-finalizer.js
/**
* Apply App Router response finalization that must happen outside individual
* route dispatchers.
*
* Called once per request in the outer handler() wrapper, after all route
* handling, so that every response path (page, route handler, server action,
* metadata, not-found) gets headers applied consistently.
*
* Skips 3xx redirect responses. Response.redirect() creates immutable
* headers that throw on mutation, and Next.js does not apply config headers
* to redirects regardless.
*/
function finalizeAppRscResponse(response, request, options) {
	if (response.status >= 300 && response.status < 400) return response;
	if (!response.headers.has("x-vinext-static-file")) mergeVaryHeader(response.headers, VINEXT_RSC_VARY_HEADER);
	if (!options.configHeaders.length) return response;
	const url = new URL(request.url);
	let pathname;
	try {
		pathname = normalizePath(normalizePathnameForRouteMatch(url.pathname));
	} catch {
		pathname = url.pathname;
	}
	pathname = stripBasePath(pathname, options.basePath);
	applyConfigHeadersToResponse(response.headers, {
		configHeaders: options.configHeaders,
		pathname,
		requestContext: options.requestContext
	});
	return response;
}
//#endregion
//#region node_modules/vinext/dist/server/app-rsc-request-normalization.js
/**
* Normalize an App Router RSC request.
*
* Performs all security-sensitive and compatibility-sensitive preprocessing before
* route matching. The ordering of steps is security-critical â€” changing it introduces
* vulnerabilities:
*
*   1. Parse URL
*   2. Protocol-relative URL guard â€” on the raw pathname, BEFORE normalizePath collapses
*      `//` to `/`. If the guard ran after normalization, `//evil.com` â†’ `/evil.com`
*      would bypass the check and reach the trailing-slash redirector, which echoes the
*      path into a `Location` header that browsers interpret as protocol-relative.
*   3. Strict percent-decode each segment â€” throws on malformed sequences (â†’ 400). Must
*      run before basePath check so %2F-encoded slashes cannot create fake basePath prefixes.
*   4. Collapse double-slashes, resolve `.` and `..` segments (normalizePath)
*   5. basePath check + strip â€” 404 when pathname lacks the basePath prefix.
*      `/__vinext/` bypasses this for internal prerender endpoints.
*   6. RSC detection: `.rsc` suffix only. RSC headers do not select payload
*      rendering at the canonical HTML URL, so caches that ignore Vary cannot
*      store Flight responses under HTML URLs.
*   7. cleanPathname â€” pathname with `.rsc` suffix stripped
*   8. Sanitize X-Vinext-Interception-Context â€” strip null bytes (header injection)
*   9. Normalize x-vinext-mounted-slots â€” dedup and sort for canonical cache keys
*   10. Read semantic render mode for refresh/action payload rendering
*
* @returns A 400 or 404 Response for invalid or out-of-scope inputs,
*          or a NormalizedRscRequest for valid requests.
*/
function normalizeRscRequest(request, basePath) {
	const url = new URL(request.url);
	const protoGuard = guardProtocolRelativeUrl(url.pathname);
	if (protoGuard) return protoGuard;
	let decoded;
	try {
		decoded = normalizePathnameForRouteMatchStrict(url.pathname);
	} catch {
		return badRequestResponse();
	}
	let pathname = normalizePath(decoded);
	if (basePath) {
		if (!hasBasePath(pathname, basePath) && !pathname.startsWith("/__vinext/")) return notFoundResponse();
		pathname = stripBasePath(pathname, basePath);
	}
	const isRscRequest = pathname.endsWith(".rsc");
	const cleanPathname = stripRscSuffix(pathname);
	const interceptionContextHeader = request.headers.get("X-Vinext-Interception-Context")?.replaceAll("\0", "") || null;
	const mountedSlotsHeader = normalizeMountedSlotsHeader(request.headers.get(VINEXT_MOUNTED_SLOTS_HEADER));
	const renderMode = isRscRequest ? parseAppRscRenderMode(request.headers.get(VINEXT_RSC_RENDER_MODE_HEADER)) : APP_RSC_RENDER_MODE_NAVIGATION;
	return {
		url,
		pathname,
		cleanPathname,
		isRscRequest,
		interceptionContextHeader,
		mountedSlotsHeader,
		renderMode
	};
}
//#endregion
//#region node_modules/vinext/dist/routing/route-pattern.js
function routePatternPart(segment) {
	if (segment.startsWith("[[...") && segment.endsWith("]]")) return `:${segment.slice(5, -2)}*`;
	if (segment.startsWith("[...") && segment.endsWith("]")) return `:${segment.slice(4, -1)}+`;
	if (segment.startsWith("[") && segment.endsWith("]")) return `:${segment.slice(1, -1)}`;
	return segment;
}
function routePatternParts(pathname) {
	return pathname.split("/").filter(Boolean).map(routePatternPart);
}
function routePattern(pathname) {
	const parts = routePatternParts(pathname);
	return parts.length > 0 ? `/${parts.join("/")}` : "";
}
function appendParamValue(target, value) {
	if (Array.isArray(value)) {
		for (const entry of value) target.push(entry);
		return;
	}
	target.push(value);
}
function fillRoutePatternSegments(pathname, params) {
	const segments = pathname.split("/").filter(Boolean);
	const resolvedSegments = [];
	for (const segment of segments) {
		if (segment.startsWith("[[...") && segment.endsWith("]]")) {
			const value = params[segment.slice(5, -2)];
			if (value !== void 0 && value !== "") {
				if (Array.isArray(value) && value.length === 0) continue;
				appendParamValue(resolvedSegments, value);
			}
			continue;
		}
		if (segment.startsWith("[...") && segment.endsWith("]")) {
			const value = params[segment.slice(4, -1)];
			if (value === void 0 || (Array.isArray(value) ? value.length === 0 : value === "")) return null;
			appendParamValue(resolvedSegments, value);
			continue;
		}
		if (segment.startsWith("[") && segment.endsWith("]")) {
			const value = params[segment.slice(1, -1)];
			if (typeof value === "string") {
				resolvedSegments.push(value);
				continue;
			}
			if (Array.isArray(value) && value.length > 0) {
				if (value.length > 1) return null;
				resolvedSegments.push(value[0]);
				continue;
			}
			return null;
		}
		resolvedSegments.push(segment);
	}
	return resolvedSegments.length > 0 ? `/${resolvedSegments.join("/")}` : "/";
}
function matchRoutePattern(urlParts, patternParts) {
	const params = Object.create(null);
	function matchFrom(urlIndex, patternIndex) {
		if (patternIndex === patternParts.length) return urlIndex === urlParts.length;
		const patternPart = patternParts[patternIndex];
		if (patternPart.startsWith(":") && (patternPart.endsWith("+") || patternPart.endsWith("*"))) {
			const paramName = patternPart.slice(1, -1);
			const minLength = patternPart.endsWith("+") ? 1 : 0;
			for (let endIndex = urlIndex + minLength; endIndex <= urlParts.length; endIndex++) {
				const value = urlParts.slice(urlIndex, endIndex);
				if (value.length > 0) params[paramName] = value;
				else delete params[paramName];
				if (matchFrom(endIndex, patternIndex + 1)) return true;
			}
			delete params[paramName];
			return false;
		}
		if (patternPart.startsWith(":")) {
			if (urlIndex >= urlParts.length) return false;
			const paramName = patternPart.slice(1);
			params[paramName] = urlParts[urlIndex];
			if (matchFrom(urlIndex + 1, patternIndex + 1)) return true;
			delete params[paramName];
			return false;
		}
		if (urlIndex >= urlParts.length || urlParts[urlIndex] !== patternPart) return false;
		return matchFrom(urlIndex + 1, patternIndex + 1);
	}
	if (!matchFrom(0, 0)) return null;
	decodeMatchedParams(params);
	return params;
}
//#endregion
//#region node_modules/vinext/dist/server/metadata-routes.js
/** Escape the five XML special characters in text content and attribute values. */
function escapeXml(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
/**
* Convert a sitemap array to XML string.
*/
function sitemapToXml(entries) {
	const hasAlternates = entries.some((entry) => Object.keys(entry.alternates ?? {}).length > 0);
	const hasImages = entries.some((entry) => Boolean(entry.images?.length));
	const hasVideos = entries.some((entry) => Boolean(entry.videos?.length));
	let content = "";
	content += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	content += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"";
	if (hasImages) content += " xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\"";
	if (hasVideos) content += " xmlns:video=\"http://www.google.com/schemas/sitemap-video/1.1\"";
	if (hasAlternates) content += " xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n";
	else content += ">\n";
	for (const entry of entries) {
		content += "<url>\n";
		content += `<loc>${escapeXml(entry.url)}</loc>\n`;
		const languages = entry.alternates?.languages;
		if (languages && Object.keys(languages).length) for (const language in languages) content += `<xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(languages[language])}" />\n`;
		if (entry.images?.length) for (const image of entry.images) content += `<image:image>\n<image:loc>${escapeXml(image)}</image:loc>\n</image:image>\n`;
		if (entry.videos?.length) for (const video of entry.videos) {
			const videoFields = [
				"<video:video>",
				`<video:title>${escapeXml(String(video.title))}</video:title>`,
				`<video:thumbnail_loc>${escapeXml(String(video.thumbnail_loc))}</video:thumbnail_loc>`,
				`<video:description>${escapeXml(String(video.description))}</video:description>`,
				video.content_loc && `<video:content_loc>${escapeXml(String(video.content_loc))}</video:content_loc>`,
				video.player_loc && `<video:player_loc>${escapeXml(String(video.player_loc))}</video:player_loc>`,
				video.duration && `<video:duration>${video.duration}</video:duration>`,
				video.view_count && `<video:view_count>${video.view_count}</video:view_count>`,
				video.tag && `<video:tag>${escapeXml(String(video.tag))}</video:tag>`,
				video.rating && `<video:rating>${video.rating}</video:rating>`,
				video.expiration_date && `<video:expiration_date>${escapeXml(String(video.expiration_date))}</video:expiration_date>`,
				video.publication_date && `<video:publication_date>${escapeXml(String(video.publication_date))}</video:publication_date>`,
				video.family_friendly && `<video:family_friendly>${video.family_friendly}</video:family_friendly>`,
				video.requires_subscription && `<video:requires_subscription>${video.requires_subscription}</video:requires_subscription>`,
				video.live && `<video:live>${video.live}</video:live>`,
				video.restriction && `<video:restriction relationship="${escapeXml(String(video.restriction.relationship))}">${escapeXml(String(video.restriction.content))}</video:restriction>`,
				video.platform && `<video:platform relationship="${escapeXml(String(video.platform.relationship))}">${escapeXml(String(video.platform.content))}</video:platform>`,
				video.uploader && `<video:uploader${video.uploader.info ? ` info="${escapeXml(String(video.uploader.info))}"` : ""}>${escapeXml(String(video.uploader.content))}</video:uploader>`,
				"</video:video>\n"
			].filter(Boolean);
			content += videoFields.join("\n");
		}
		if (entry.lastModified) content += `<lastmod>${serializeDate(entry.lastModified)}</lastmod>\n`;
		if (entry.changeFrequency) content += `<changefreq>${entry.changeFrequency}</changefreq>\n`;
		if (typeof entry.priority === "number") content += `<priority>${entry.priority}</priority>\n`;
		content += "</url>\n";
	}
	content += "</urlset>\n";
	return content;
}
/**
* Convert a robots config to text format.
*/
function robotsToText(config) {
	const lines = [];
	const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
	for (const rule of rules) {
		const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent ?? "*"];
		for (const agent of agents) lines.push(`User-Agent: ${agent}`);
		if (rule.allow) {
			const allows = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
			for (const allow of allows) lines.push(`Allow: ${allow}`);
		}
		if (rule.disallow) {
			const disallows = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
			for (const disallow of disallows) lines.push(`Disallow: ${disallow}`);
		}
		if (rule.crawlDelay !== void 0) lines.push(`Crawl-delay: ${rule.crawlDelay}`);
		if (rule.other) for (const key of Object.keys(rule.other)) {
			const value = rule.other[key];
			if (value == null) continue;
			const values = Array.isArray(value) ? value : [value];
			for (const v of values) lines.push(`${key}: ${v}`);
		}
		lines.push("");
	}
	if (config.sitemap) {
		const sitemaps = Array.isArray(config.sitemap) ? config.sitemap : [config.sitemap];
		for (const sitemap of sitemaps) lines.push(`Sitemap: ${sitemap}`);
	}
	if (config.host) lines.push(`Host: ${config.host}`);
	return lines.join("\n").trim() + "\n";
}
/**
* Convert a manifest config to JSON string.
*/
function manifestToJson(config) {
	return JSON.stringify(config, null, 2);
}
function serializeDate(value) {
	return value instanceof Date ? value.toISOString() : value;
}
function getMetadataRouteKind(route) {
	if (route.type === "favicon") return "favicon";
	if (route.type === "icon") return "icon";
	if (route.type === "apple-icon") return "apple";
	if (route.type === "opengraph-image") return "openGraph";
	if (route.type === "twitter-image") return "twitter";
	if (route.type === "manifest") return "manifest";
	return null;
}
function getMetadataImageRouteKind(route) {
	const kind = getMetadataRouteKind(route);
	if (kind === "icon" || kind === "apple" || kind === "openGraph" || kind === "twitter") return kind;
	return null;
}
var metadataImageIdPattern = /^[a-zA-Z0-9-_.]+$/;
function isValidMetadataImageId(id) {
	return metadataImageIdPattern.test(id);
}
function matchMetadataRoutePattern(urlParts, patternParts) {
	return matchRoutePattern(urlParts, patternParts);
}
//#endregion
//#region node_modules/vinext/dist/server/metadata-route-response.js
var routeFunctionCache = /* @__PURE__ */ new WeakMap();
function isObject(value) {
	return typeof value === "object" && value !== null;
}
function readFunction(module, key) {
	if (!module) return null;
	const value = Reflect.get(module, key);
	if (typeof value !== "function") return null;
	return (props) => Reflect.apply(value, module, [props]);
}
function isSitemapEntries(value) {
	return Array.isArray(value);
}
function isRobotsConfig(value) {
	return isObject(value) && !Array.isArray(value);
}
function isManifestConfig(value) {
	return isObject(value) && !Array.isArray(value);
}
function isImageMetadataRoute(route) {
	return route.type === "icon" || route.type === "apple-icon" || route.type === "opengraph-image" || route.type === "twitter-image";
}
function getMetadataRouteFunctions(route) {
	const cached = routeFunctionCache.get(route);
	if (cached) return cached;
	const generateImageMetadata = route.isDynamic && isImageMetadataRoute(route) ? readFunction(route.module, "generateImageMetadata") : null;
	const functions = {
		defaultExport: route.isDynamic ? readFunction(route.module, "default") : null,
		generateImageMetadata,
		generateSitemaps: route.type === "sitemap" && route.isDynamic ? readFunction(route.module, "generateSitemaps") : null,
		hasGeneratedImageMetadata: route.isDynamic && isImageMetadataRoute(route) && Boolean(generateImageMetadata)
	};
	routeFunctionCache.set(route, functions);
	return functions;
}
function matchMetadataRoute(route, cleanPathname, functions) {
	if (route.patternParts) {
		const urlParts = cleanPathname.split("/").filter(Boolean);
		if (functions.hasGeneratedImageMetadata && urlParts.length > 0) {
			const params = matchMetadataRoutePattern(urlParts.slice(0, -1), route.patternParts);
			if (params) return {
				params,
				imageId: urlParts[urlParts.length - 1]
			};
		}
		const params = matchMetadataRoutePattern(urlParts, route.patternParts);
		return params ? {
			params,
			imageId: null
		} : null;
	}
	if (functions.hasGeneratedImageMetadata && cleanPathname.startsWith(`${route.servedUrl}/`)) {
		const imageSuffix = cleanPathname.slice(route.servedUrl.length + 1);
		if (!imageSuffix || imageSuffix.includes("/")) return null;
		return {
			params: Object.create(null),
			imageId: imageSuffix
		};
	}
	return cleanPathname === route.servedUrl ? {
		params: null,
		imageId: null
	} : null;
}
function findGeneratedSitemapId(entries, rawId) {
	if (!Array.isArray(entries)) return null;
	for (const entry of entries) {
		if (!isObject(entry) || Reflect.get(entry, "id") == null) throw new Error("id property is required for every item returned from generateSitemaps");
		const id = Reflect.get(entry, "id");
		if (String(id) === rawId) return rawId;
	}
	return null;
}
function makeThenableMetadataRouteId(id) {
	return Object.assign(Promise.resolve(id), {
		toString() {
			return id;
		},
		valueOf() {
			return id;
		},
		[Symbol.toPrimitive]() {
			return id;
		}
	});
}
async function handleGeneratedSitemap(route, cleanPathname, functions) {
	if (!functions.generateSitemaps || !functions.defaultExport) return null;
	const sitemapPrefix = route.servedUrl.slice(0, -4);
	if (!cleanPathname.startsWith(`${sitemapPrefix}/`) || !cleanPathname.endsWith(".xml")) return null;
	const rawId = cleanPathname.slice(sitemapPrefix.length + 1, -4);
	if (rawId.includes("/")) return null;
	const matchedId = findGeneratedSitemapId(await functions.generateSitemaps({}), rawId);
	if (!matchedId) return notFoundResponse();
	const result = await functions.defaultExport({ id: makeThenableMetadataRouteId(matchedId) });
	if (result instanceof Response) return result;
	if (!isSitemapEntries(result)) throw new TypeError("Metadata sitemap routes must return an array.");
	return new Response(sitemapToXml(result), { headers: {
		"Content-Type": route.contentType,
		"Cache-Control": "public, max-age=0, must-revalidate"
	} });
}
function findGeneratedImageId(imageMetadata, imageId, servedUrl) {
	if (!Array.isArray(imageMetadata)) return null;
	for (const item of imageMetadata) {
		if (!isObject(item) || Reflect.get(item, "id") == null) throw new Error("id property is required for every item returned from generateImageMetadata");
		const itemId = String(Reflect.get(item, "id"));
		if (!isValidMetadataImageId(itemId)) {
			console.warn(`[vinext] Skipping metadata route ${servedUrl} image id "${itemId}" because metadata image ids must match /^[a-zA-Z0-9-_.]+$/.`);
			continue;
		}
		if (itemId === imageId) return itemId;
	}
	return null;
}
async function callDynamicMetadataRoute(route, match, makeThenableParams, functions) {
	if (!functions.defaultExport) {
		console.warn(`[vinext] Dynamic metadata route ${route.servedUrl} has no default export.`);
		return notFoundResponse();
	}
	const paramsThenable = makeThenableParams(match.params ?? {});
	let result;
	if (functions.hasGeneratedImageMetadata) {
		if (match.imageId === null || !isValidMetadataImageId(match.imageId)) return notFoundResponse();
		if (!functions.generateImageMetadata) return notFoundResponse();
		const matchedImageId = findGeneratedImageId(await functions.generateImageMetadata({ params: paramsThenable }), match.imageId, route.servedUrl);
		if (!matchedImageId) return notFoundResponse();
		result = await functions.defaultExport({
			params: paramsThenable,
			id: makeThenableMetadataRouteId(matchedImageId)
		});
	} else result = await functions.defaultExport({ params: paramsThenable });
	if (result instanceof Response) return result;
	let body;
	if (route.type === "sitemap") {
		if (!isSitemapEntries(result)) throw new TypeError("Metadata sitemap routes must return an array.");
		body = sitemapToXml(result);
	} else if (route.type === "robots") {
		if (!isRobotsConfig(result)) throw new TypeError("Metadata robots routes must return an object.");
		body = robotsToText(result);
	} else if (route.type === "manifest") {
		if (!isManifestConfig(result)) throw new TypeError("Metadata manifest routes must return an object.");
		body = manifestToJson(result);
	} else if (isImageMetadataRoute(route)) throw new TypeError(`Dynamic metadata ${route.type} route ${route.servedUrl} must return a Response.`);
	else body = JSON.stringify(result);
	return new Response(body, { headers: {
		"Content-Type": route.contentType,
		"Cache-Control": "public, max-age=0, must-revalidate"
	} });
}
function serveStaticMetadataRoute(route) {
	if (typeof route.fileDataBase64 !== "string") throw new Error(`[vinext] Static metadata route ${route.servedUrl} is missing embedded file data.`);
	try {
		const binary = atob(route.fileDataBase64);
		const bytes = new Uint8Array(binary.length);
		for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index);
		return new Response(bytes, { headers: {
			"Content-Type": route.contentType,
			"Cache-Control": "public, max-age=0, must-revalidate"
		} });
	} catch (error) {
		const reason = error instanceof Error && error.message ? `: ${error.message}` : "";
		throw new Error(`[vinext] Failed to decode embedded metadata route file data for ${route.servedUrl}${reason}`, { cause: error });
	}
}
async function handleMetadataRouteRequest(options) {
	for (const route of options.metadataRoutes) {
		const functions = getMetadataRouteFunctions(route);
		if (route.type === "sitemap" && route.isDynamic) {
			if (functions.generateSitemaps) {
				const generatedSitemapResponse = await handleGeneratedSitemap(route, options.cleanPathname, functions);
				if (generatedSitemapResponse) return generatedSitemapResponse;
				continue;
			}
		}
		const match = matchMetadataRoute(route, options.cleanPathname, functions);
		if (!match) continue;
		return route.isDynamic ? callDynamicMetadataRoute(route, match, options.makeThenableParams, functions) : serveStaticMetadataRoute(route);
	}
	return null;
}
//#endregion
//#region node_modules/vinext/dist/server/prerender-work-unit-setup.js
/**
* Sets up the work unit async storage for prerendering.
*
* When VINEXT_PRERENDER=1, wraps execution in a workUnitAsyncStorage.run()
* with a PrerenderStore so that dynamic APIs (e.g., io()) can
* detect the prerender context and return hanging promises.
*
* Used by: app-rsc-entry.ts handler template.
*
* TODO: If future dynamic APIs need request-scoped stores for normal (non-prerender)
* requests, add a `{ type: "request" }` store during normal request handling.
*/
function runWithPrerenderWorkUnit(fn, options) {
	if (process.env.VINEXT_PRERENDER === "1") {
		const controller = new AbortController();
		const route = typeof options?.route === "function" ? options.route() : options?.route;
		return workUnitAsyncStorage.run({
			type: "prerender",
			renderSignal: controller.signal,
			route
		}, fn).finally(() => controller.abort());
	}
	return fn();
}
//#endregion
//#region node_modules/vinext/dist/server/app-rsc-handler.js
function hasProperty(value, key) {
	return key in value;
}
function isExecutionContextLike(value) {
	if (!value || typeof value !== "object") return false;
	return hasProperty(value, "waitUntil") && typeof value.waitUntil === "function";
}
function redirectDestinationWithBasePath(destination, basePath) {
	if (!basePath || isExternalUrl(destination) || hasBasePath(destination, basePath)) return destination;
	return basePath + destination;
}
async function applyRewrite(options, cleanPathname) {
	if (!options.rewrites.length) return null;
	const rewritten = matchRewrite(cleanPathname, options.rewrites, options.requestContext);
	if (!rewritten) return null;
	if (isExternalUrl(rewritten)) {
		options.clearRequestContext();
		return proxyExternalRequest(options.request, rewritten);
	}
	return rewritten;
}
function applyConfigHeadersToMiddlewareRedirect(response, options) {
	if (response.status < 300 || response.status >= 400) return response;
	if (!options.configHeaders.length) return response;
	const headers = new Headers();
	applyConfigHeadersToResponse(headers, {
		configHeaders: options.configHeaders,
		pathname: options.pathname,
		requestContext: options.requestContext
	});
	if (!headers.entries().next().done) {
		mergeMiddlewareResponseHeaders(headers, response.headers);
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers
		});
	}
	return response;
}
async function handleAppRscRequest(options, request, preMiddlewareRequestContext) {
	const handlerStart = 0;
	const normalized = normalizeRscRequest(request, options.basePath);
	if (normalized instanceof Response) return normalized;
	const { url, isRscRequest, interceptionContextHeader, mountedSlotsHeader, renderMode } = normalized;
	let { pathname, cleanPathname } = normalized;
	const prerenderEndpointResponse = await handleAppPrerenderEndpoint(request, {
		isPrerenderEnabled() {
			return process.env.VINEXT_PRERENDER === "1";
		},
		loadPagesRoutes: options.loadPrerenderPagesRoutes,
		pathname,
		rootParamNamesByPattern: options.rootParamNamesByPattern,
		staticParamsMap: options.staticParamsMap
	});
	if (prerenderEndpointResponse) return prerenderEndpointResponse;
	const trailingSlashRedirect = normalizeTrailingSlash(pathname, options.basePath, options.trailingSlash, url.search);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	const redirect = matchRedirect(stripRscSuffix(pathname), options.configRedirects, preMiddlewareRequestContext);
	if (redirect) {
		const destination = sanitizeDestination(redirectDestinationWithBasePath(redirect.destination, options.basePath));
		const location = isRscRequest && request.headers.get("RSC") === "1" ? await createRscRedirectLocation(destination, request) : destination;
		return new Response(null, {
			status: redirect.permanent ? 308 : 307,
			headers: { Location: location }
		});
	}
	const rscCacheBustingRedirect = await resolveInvalidRscCacheBustingRequest({
		isRscRequest,
		request
	});
	if (rscCacheBustingRedirect) return rscCacheBustingRedirect;
	const middlewareContext = {
		headers: null,
		requestHeaders: null,
		status: null
	};
	if (options.middlewareModule) {
		const middlewareResult = await applyAppMiddleware({
			basePath: options.basePath,
			cleanPathname,
			context: middlewareContext,
			i18nConfig: options.i18nConfig,
			isProxy: options.isMiddlewareProxy,
			module: options.middlewareModule,
			request
		});
		if (middlewareResult.kind === "response") return applyConfigHeadersToMiddlewareRedirect(middlewareResult.response, {
			configHeaders: options.configHeaders,
			pathname: cleanPathname,
			requestContext: preMiddlewareRequestContext
		});
		cleanPathname = middlewareResult.cleanPathname;
		if (middlewareResult.search !== null) url.search = middlewareResult.search;
	}
	const scriptNonce = getScriptNonceFromHeaderSources(request.headers, middlewareContext.headers);
	const postMiddlewareRequestContext = buildPostMwRequestContext(request);
	const×8ñ¼­zÊ&ŠÛ^uÐÝÉ…Á½É•MÑ…Ñ¥9•áÑUÉ°€ô€¡¹•áÑUÉ°¤€ôøì($%½¹ÍÐ•µÁÑåM•…É¡A…É…µÌ€ô¹•ÜUI1M•…É¡A…É…µÌ ¤ì($%½¹ÍÐÍÑ…Ñ¥!É•˜€ô±•…¹MÑ…Ñ¥UÉ°¡¹•áÑUÉ°¹¡É•˜¤ì($%É•ÑÕÉ¸¹•ÜAÉ½áä¡¹•áÑUÉ°°ì•Ð¡Ñ…É•Ð°ÁÉ½À¤ì($$%ÍÝ¥Ñ €¡ÁÉ½À¤ì($$$%…Í”€‰Í•…É ˆèÉ•ÑÕÉ¸€ˆˆì($$$%…Í”€‰Í•…É¡A…É…µÌˆèÉ•ÑÕÉ¸•µÁÑåM•…É¡A…É…µÌì($$$%…Í”€‰¡É•˜ˆèÉ•ÑÕÉ¸ÍÑ…Ñ¥!É•˜ì($$$%…Í”€‰ÕÉ°ˆèÉ•ÑÕÉ¸ì($$$%…Í”€‰Ñ½)M=8ˆè($$$%…Í”€‰Ñ½MÑÉ¥¹œˆèÉ•ÑÕÉ¸€ ¤€ôøÍÑ…Ñ¥!É•˜ì($$$%…Í”€‰±½¹”ˆèÉ•ÑÕÉ¸€ ¤€ôøÝÉ…Á½É•MÑ…Ñ¥9•áÑUÉ°¡Ñ…É•Ð¹±½¹” ¤¤ì($$$%‘•™…Õ±ÐèÉ•ÑÕÉ¸‰¥¹‘5•Ñ¡½‘%™9••‘•¡I•™±•Ð¹•Ð¡Ñ…É•Ð°ÁÉ½À°Ñ…É•Ð¤°Ñ…É•Ð¤ì($$%ô($%ôô¤ì(%ôì(%½¹ÍÐÑ¡É½ÝMÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½È€ô€¡•áÁÉ•ÍÍ¥½¸¤€ôøì($%Ñ¡É½Ü¹•ÜÉÉ½È¡½ÁÑ¥½¹Ì¹ÍÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½É5•ÍÍ…”ü¸¡•áÁÉ•ÍÍ¥½¸¤€üüI½ÕÑ”¡…¹‘±•ÈÝ¥Ñ q‘å¹…µ¥Œ€ô€‰•ÉÉ½È‰q€ÕÍ•€‘í•áÁÉ•ÍÍ¥½¹ô¹€¤ì(%ôì(%½¹ÍÐÝÉ…ÁI•ÅÕ¥É•MÑ…Ñ¥9•áÑUÉ°€ô€¡¹•áÑUÉ°¤€ôøì($%É•ÑÕÉ¸¹•ÜAÉ½áä¡¹•áÑUÉ°°ì•Ð¡Ñ…É•Ð°ÁÉ½À¤ì($$%ÍÝ¥Ñ €¡ÁÉ½À¤ì($$$%…Í”€‰Í•…É ˆè($$$%…Í”€‰Í•…É¡A…É…µÌˆè($$$%…Í”€‰ÕÉ°ˆè($$$%…Í”€‰¡É•˜ˆè($$$%…Í”€‰Ñ½)M=8ˆè($$$%…Í”€‰Ñ½MÑÉ¥¹œˆè($$$%…Í”€‰½É¥¥¸ˆèÉ•ÑÕÉ¸Ñ¡É½ÝMÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½È¡¹•áÑUÉ°¸‘íMÑÉ¥¹œ¡ÁÉ½À¥õ€¤ì($$$%…Í”€‰±½¹”ˆèÉ•ÑÕÉ¸€ ¤€ôøÝÉ…ÁI•ÅÕ¥É•MÑ…Ñ¥9•áÑUÉ°¡Ñ…É•Ð¹±½¹” ¤¤ì($$$%‘•™…Õ±ÐèÉ•ÑÕÉ¸‰¥¹‘5•Ñ¡½‘%™9••‘•¡I•™±•Ð¹•Ð¡Ñ…É•Ð°ÁÉ½À°Ñ…É•Ð¤°Ñ…É•Ð¤ì($$%ô($%ôô¤ì(%ôì(%½¹ÍÐÝÉ…ÁI•ÅÕ•ÍÐ€ô€¡¥¹ÁÕÐ¤€ôøì($%½¹ÍÐÉ•ÅÕ•ÍÑ!•…‘•ÉÌ€ô½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ€ü‰Õ¥±‘I•ÅÕ•ÍÑ!•…‘•ÉÍÉ½µ5¥‘‘±•Ý…É•I•ÍÁ½¹Í”¡¥¹ÁÕÐ¹¡•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ¤€è¹Õ±°ì($%½¹ÍÐÉ•ÅÕ•ÍÑ]¥Ñ¡=Ù•ÉÉ¥‘•Ì€ôÉ•ÅÕ•ÍÑ!•…‘•ÉÌ€üÉ•‰Õ¥±‘I•ÅÕ•ÍÑ]¥Ñ¡!•…‘•ÉÌ¡¥¹ÁÕÐ°É•ÅÕ•ÍÑ!•…‘•ÉÌ¤€è¥¹ÁÕÐì($%½¹ÍÐ¹•áÑI•ÅÕ•ÍÐ€ôÉ•ÅÕ•ÍÑ]¥Ñ¡=Ù•ÉÉ¥‘•Ì¥¹ÍÑ…¹•½˜9•áÑI•ÅÕ•ÍÐ€üÉ•ÅÕ•ÍÑ]¥Ñ¡=Ù•ÉÉ¥‘•Ì€è¹•Ü9•áÑI•ÅÕ•ÍÐ¡É•ÅÕ•ÍÑ]¥Ñ¡=Ù•ÉÉ¥‘•Ì°ì¹•áÑ½¹™¥œè¹•áÑ½¹™¥œ€üüÙ½¥€Àô¤ì($%±•ÐÁÉ½á¥•‘9•áÑUÉ°€ô¹Õ±°ì($%±•Ð™½É•MÑ…Ñ¥9•áÑUÉ°€ô¹Õ±°ì($%±•ÐÉ•ÅÕ¥É•MÑ…Ñ¥9•áÑUÉ°€ô¹Õ±°ì($%±•Ð™½É•MÑ…Ñ¥!•…‘•ÉÌ€ô¹Õ±°ì($%±•Ð™½É•MÑ…Ñ¥½½­¥•Ì€ô¹Õ±°ì($%É•ÑÕÉ¸¹•ÜAÉ½áä¡¹•áÑI•ÅÕ•ÍÐ°ì•Ð¡Ñ…É•Ð°ÁÉ½À¤ì($$%¥˜€¡É•ÅÕ•ÍÑ5½‘”€ôôô€‰™½É”µÍÑ…Ñ¥Œˆ¤ÍÝ¥Ñ €¡ÁÉ½À¤ì($$$%…Í”€‰¹•áÑUÉ°ˆè($$$$%™½É•MÑ…Ñ¥9•áÑUÉ°€üüôÝÉ…Á½É•MÑ…Ñ¥9•áÑUÉ°¡Ñ…É•Ð¹¹•áÑUÉ°¤ì($$$$%É•ÑÕÉ¸™½É•MÑ…Ñ¥9•áÑUÉ°ì($$$%…Í”€‰¡•…‘•ÉÌˆè($$$$%™½É•MÑ…Ñ¥!•…‘•ÉÌ€üüôÍ•…±I•ÅÕ•ÍÑ!•…‘•ÉÌ¡¹•Ü!•…‘•ÉÌ ¤¤ì($$$$%É•ÑÕÉ¸™½É•MÑ…Ñ¥!•…‘•ÉÌì($$$%…Í”€‰½½­¥•Ìˆè($$$$%™½É•MÑ…Ñ¥½½­¥•Ì€üüôÍ•…±I•ÅÕ•ÍÑ½½­¥•Ì¡¹•ÜI•ÅÕ•ÍÑ½½­¥•Ì¡¹•Ü!•…‘•ÉÌ ¤¤¤ì($$$$%É•ÑÕÉ¸™½É•MÑ…Ñ¥½½­¥•Ìì($$$%…Í”€‰ÕÉ°ˆèÉ•ÑÕÉ¸±•…¹MÑ…Ñ¥UÉ°¡Ñ…É•Ð¹¹•áÑUÉ°¹¡É•˜¤ì($$$%…Í”€‰¥Àˆè($$$%…Í”€‰•¼ˆèÉ•ÑÕÉ¸ì($$$%…Í”€‰‰½‘äˆèÉ•ÑÕÉ¸¹Õ±°ì($$$%…Í”€‰…ÉÉ…å	Õ™™•ÈˆèÉ•ÑÕÉ¸É•…‘µÁÑå	½‘åÍÉÉ…å	Õ™™•Èì($$$%…Í”€‰‰±½ˆˆèÉ•ÑÕÉ¸É•…‘µÁÑå	½‘åÍ	±½ˆì($$$%…Í”€‰™½Éµ…Ñ„ˆèÉ•ÑÕÉ¸É•…‘µÁÑå	½‘åÍ½Éµ…Ñ„ì($$$%…Í”€‰©Í½¸ˆèÉ•ÑÕÉ¸É•…‘µÁÑå	½‘åÍ)Í½¸ì($$$%…Í”€‰Ñ•áÐˆèÉ•ÑÕÉ¸É•…‘µÁÑå	½‘åÍQ•áÐì($$$%…Í”€‰±½¹”ˆèÉ•ÑÕÉ¸€ ¤€ôøÝÉ…ÁI•ÅÕ•ÍÐ¡Ñ…É•Ð¹±½¹” ¤¤ì($$$%‘•™…Õ±ÐèÉ•ÑÕÉ¸‰¥¹‘5•Ñ¡½‘%™9••‘•¡I•™±•Ð¹•Ð¡Ñ…É•Ð°ÁÉ½À°Ñ…É•Ð¤°Ñ…É•Ð¤ì($$%ô($$%¥˜€¡É•ÅÕ•ÍÑ5½‘”€ôôô€‰•ÉÉ½Èˆ¤ÍÝ¥Ñ €¡ÁÉ½À¤ì($$$%…Í”€‰¹•áÑUÉ°ˆè($$$$%É•ÅÕ¥É•MÑ…Ñ¥9•áÑUÉ°€üüôÝÉ…ÁI•ÅÕ¥É•MÑ…Ñ¥9•áÑUÉ°¡Ñ…É•Ð¹¹•áÑUÉ°¤ì($$$$%É•ÑÕÉ¸É•ÅÕ¥É•MÑ…Ñ¥9•áÑUÉ°ì($$$%…Í”€‰¡•…‘•ÉÌˆè($$$%…Í”€‰½½­¥•Ìˆè($$$%…Í”€‰ÕÉ°ˆè($$$%…Í”€‰¥Àˆè($$$%…Í”€‰•¼ˆè($$$%…Í”€‰‰½‘äˆè($$$%…Í”€‰‰±½ˆˆè($$$%…Í”€‰©Í½¸ˆè($$$%…Í”€‰Ñ•áÐˆè($$$%…Í”€‰…ÉÉ…å	Õ™™•Èˆè($$$%…Í”€‰™½Éµ…Ñ„ˆèÉ•ÑÕÉ¸Ñ¡É½ÝMÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½È¡É•ÅÕ•ÍÐ¸‘íMÑÉ¥¹œ¡ÁÉ½À¥õ€¤ì($$$%…Í”€‰±½¹”ˆèÉ•ÑÕÉ¸€ ¤€ôøÝÉ…ÁI•ÅÕ•ÍÐ¡Ñ…É•Ð¹±½¹” ¤¤ì($$$%‘•™…Õ±ÐèÉ•ÑÕÉ¸‰¥¹‘5•Ñ¡½‘%™9••‘•¡I•™±•Ð¹•Ð¡Ñ…É•Ð°ÁÉ½À°Ñ…É•Ð¤°Ñ…É•Ð¤ì($$%ô($$%ÍÝ¥Ñ €¡ÁÉ½À¤ì($$$%…Í”€‰¹•áÑUÉ°ˆè($$$$%ÁÉ½á¥•‘9•áÑUÉ°€üüôÝÉ…Á9•áÑUÉ°¡Ñ…É•Ð¹¹•áÑUÉ°¤ì($$$$%É•ÑÕÉ¸ÁÉ½á¥•‘9•áÑUÉ°ì($$$%…Í”€‰¡•…‘•ÉÌˆè($$$%…Í”€‰½½­¥•Ìˆè($$$%…Í”€‰¥Àˆè($$$%…Í”€‰•¼ˆè($$$%…Í”€‰ÕÉ°ˆè($$$%…Í”€‰‰½‘äˆè($$$%…Í”€‰‰±½ˆˆè($$$%…Í”€‰©Í½¸ˆè($$$%…Í”€‰Ñ•áÐˆè($$$%…Í”€‰…ÉÉ…å	Õ™™•Èˆè($$$%…Í”€‰™½Éµ…Ñ„ˆè($$$$%µ…É­å¹…µ¥•ÍÌ¡É•ÅÕ•ÍÐ¸‘íMÑÉ¥¹œ¡ÁÉ½À¥õ€¤ì($$$$%É•ÑÕÉ¸‰¥¹‘5•Ñ¡½‘%™9••‘•¡I•™±•Ð¹•Ð¡Ñ…É•Ð°ÁÉ½À°Ñ…É•Ð¤°Ñ…É•Ð¤ì($$$%…Í”€‰±½¹”ˆèÉ•ÑÕÉ¸€ ¤€ôøÝÉ…ÁI•ÅÕ•ÍÐ¡Ñ…É•Ð¹±½¹” ¤¤ì($$$%‘•™…Õ±ÐèÉ•ÑÕÉ¸‰¥¹‘5•Ñ¡½‘%™9••‘•¡I•™±•Ð¹•Ð¡Ñ…É•Ð°ÁÉ½À°Ñ…É•Ð¤°Ñ…É•Ð¤ì($$%ô($%ôô¤ì(%ôì(%É•ÑÕÉ¸ì($%É•ÅÕ•ÍÐèÝÉ…ÁI•ÅÕ•ÍÐ¡É•ÅÕ•ÍÐ¤°($%‘¥‘•ÍÍå¹…µ¥I•ÅÕ•ÍÐ ¤ì($$%É•ÑÕÉ¸‘¥‘•ÍÍå¹…µ¥I•ÅÕ•ÍÐì($%ô(%ôì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½¹•áÐµ•ÉÉ½Èµ‘¥•ÍÐ¹©Ì(¼¨¨(¨AÕ±±Ì„ÍÑÉ¥¹¥™¥•‘¥•ÍÑ€½™˜…¸Õ¹­¹½Ý¸Ñ¡É½Ý¸Ù…±Õ”°½ÈÉ•ÑÕÉ¹Ì¹Õ±°(¨Ý¡•¸Ñ¡”Ù…±Õ”¥Ì¹½Ð„‘¥•ÍÐµ‰•…É¥¹œ•ÉÉ½È¸(¨¼)™Õ¹Ñ¥½¸•Ñ9•áÑÉÉ½É¥•ÍÐ¡•ÉÉ½È¤ì(%¥˜€ …•ÉÉ½ÈñðÑåÁ•½˜•ÉÉ½È€„ôô€‰½‰©•Ðˆñð€„ ‰‘¥•ÍÐˆ¥¸•ÉÉ½È¤¤É•ÑÕÉ¸¹Õ±°ì(%É•ÑÕÉ¸MÑÉ¥¹œ¡•ÉÉ½È¹‘¥•ÍÐ¤ì)ô(¼¨¨(¨A…ÉÍ•Ì„9aQ}I%IPìñÑåÁ”øìñ•¹½‘•‘UÉ°øìñÍÑ…ÑÕÌù€‘¥•ÍÐ¸I•ÑÕÉ¹Ì¹Õ±°(¨Ý¡•¸Ñ¡”‘¥•ÍÐ¥Ì¹½Ð„É•‘¥É•Ð‘¥•ÍÐ½ÈÑ¡”•¹½‘•UI0Í•µ•¹Ð¥Ì(¨µ¥ÍÍ¥¹œ¸Q¡”ÕÉ±€¥Ì‘•½‘•Ý¥Ñ ‘•½‘•UI%½µÁ½¹•¹Ñ€ìÑ¡”ÍÑ…ÑÕÍ€(¨‘•™…Õ±ÑÌÑ¼€ÌÀÜÝ¡•¸½µ¥ÑÑ•ì…¸½µ¥ÑÑ•ÑåÁ•€¥Ì±•™Ð…Ì¹Õ±°Í¼Ñ¡”(¨…±±•È…¸…ÁÁ±äÑ¡”½ÉÉ•Ð½¹Ñ•áÐµÍ•¹Í¥Ñ¥Ù”‘•™…Õ±Ð¸(¨¼)™Õ¹Ñ¥½¸Á…ÉÍ•9•áÑI•‘¥É•Ñ¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€ …‘¥•ÍÐ¹ÍÑ…ÉÑÍ]¥Ñ  ‰9aQ}I%IPìˆ¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÁ…ÉÑÌ€ô‘¥•ÍÐ¹ÍÁ±¥Ð ˆìˆ¤ì(%½¹ÍÐ•¹½‘•‘UÉ°€ôÁ…ÉÑÍlÉtì(%¥˜€ …•¹½‘•‘UÉ°¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÑåÁ”€ôÁ…ÉÑÍlÅtì(%É•ÑÕÉ¸ì($%ÍÑ…ÑÕÌèÁ…ÉÑÍlÍt€üÁ…ÉÍ•%¹Ð¡Á…ÉÑÍlÍt°€ÄÀ¤€è€ÌÀÜ°($%ÑåÁ”èÑåÁ”ñð¹Õ±°°($%ÕÉ°è‘•½‘•UI%½µÁ½¹•¹Ð¡•¹½‘•‘UÉ°¤(%ôì)ô(¼¨¨(¨A…ÉÍ•Ì„9aQ}9=Q}=U9€½È9aQ}!QQA}II=I}11	,ìñÍÑ…ÑÕÌù€‘¥•ÍÐ¸(¨I•ÑÕÉ¹ÌìÍÑ…ÑÕÌè€ÐÀÐõ€™½È9aQ}9=Q}=U9€…¹Ñ¡”Á…ÉÍ•ÍÑ…ÑÕÌ½‘”(¨™½ÈÑ¡”™…±±‰…¬™½É´¸I•ÑÕÉ¹Ì¹Õ±°½Ñ¡•ÉÝ¥Í”¸(¨¼)™Õ¹Ñ¥½¸Á…ÉÍ•9•áÑ!ÑÑÁÉÉ½É¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€¡‘¥•ÍÐ€ôôô€‰9aQ}9=Q}=U9ˆ¤É•ÑÕÉ¸ìÍÑ…ÑÕÌè€ÐÀÐôì(%¥˜€¡‘¥•ÍÐ¹ÍÑ…ÉÑÍ]¥Ñ  ‰9aQ}!QQA}II=I}11	,ìˆ¤¤É•ÑÕÉ¸ìÍÑ…ÑÕÌèÁ…ÉÍ•%¹Ð¡‘¥•ÍÐ¹ÍÁ±¥Ð ˆìˆ¥lÅt°€ÄÀ¤ôì(%É•ÑÕÉ¸¹Õ±°ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ”µ¡…¹‘±•ÈµÁ½±¥ä¹©Ì)™Õ¹Ñ¥½¸¥ÍA½ÍÍ¥‰±•ÁÁI½ÕÑ•Ñ¥½¹I•ÅÕ•ÍÐ¡É•ÅÕ•ÍÐ¤ì(%¥˜€¡É•ÅÕ•ÍÐ¹µ•Ñ¡½¹Ñ½UÁÁ•É…Í” ¤€„ôô€‰A=MPˆ¤É•ÑÕÉ¸™…±Í”ì(%½¹ÍÐ½¹Ñ•¹ÑQåÁ”€ôÉ•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰½¹Ñ•¹ÐµÑåÁ”ˆ¤ì(%É•ÑÕÉ¸É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹¡…Ì ‰àµÉÍŒµ…Ñ¥½¸ˆ¤ñðÉ•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹¡…Ì ‰¹•áÐµ…Ñ¥½¸ˆ¤ñð½¹Ñ•¹ÑQåÁ”€ôôô€‰…ÁÁ±¥…Ñ¥½¸½àµÝÝÜµ™½É´µÕÉ±•¹½‘•ˆñð½¹Ñ•¹ÑQåÁ”ü¹ÍÑ…ÉÑÍ]¥Ñ  ‰µÕ±Ñ¥Á…ÉÐ½™½É´µ‘…Ñ„ˆ¤€ôôôÑÉÕ”ì)ô)™Õ¹Ñ¥½¸•ÑÁÁI½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ•M•½¹‘Ì¡¡…¹‘±•È¤ì(%½¹ÍÐìÉ•Ù…±¥‘…Ñ”ô€ô¡…¹‘±•Èì(%¥˜€¡É•Ù…±¥‘…Ñ”€ôôô™…±Í”¤É•ÑÕÉ¸%¹™¥¹¥Ñäì(%¥˜€¡ÑåÁ•½˜É•Ù…±¥‘…Ñ”€„ôô€‰¹Õµ‰•Èˆñð€…9Õµ‰•È¹¥Í¥¹¥Ñ”¡É•Ù…±¥‘…Ñ”¤ñðÉ•Ù…±¥‘…Ñ”€ð€À¤É•ÑÕÉ¸¹Õ±°ì(%É•ÑÕÉ¸É•Ù…±¥‘…Ñ”ì)ô)™Õ¹Ñ¥½¸¡…ÍÁÁI½ÕÑ•!…¹‘±•É•™…Õ±ÑáÁ½ÉÐ¡¡…¹‘±•È¤ì(%É•ÑÕÉ¸ÑåÁ•½˜¡…¹‘±•È¹‘•™…Õ±Ð€ôôô€‰™Õ¹Ñ¥½¸ˆì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁI½ÕÑ•!…¹‘±•É5•Ñ¡½¡¡…¹‘±•È°µ•Ñ¡½¤ì(%½¹ÍÐ•áÁ½ÉÑ•‘5•Ñ¡½‘Ì€ô½±±•ÑI½ÕÑ•!…¹‘±•É5•Ñ¡½‘Ì¡¡…¹‘±•È¤ì(%½¹ÍÐ…±±½Ý!•…‘•É½É=ÁÑ¥½¹Ì€ô‰Õ¥±‘I½ÕÑ•!…¹‘±•É±±½Ý!•…‘•È¡•áÁ½ÉÑ•‘5•Ñ¡½‘Ì¤ì(%½¹ÍÐÍ¡½Õ±‘ÕÑ½I•ÍÁ½¹‘Q½=ÁÑ¥½¹Ì€ôµ•Ñ¡½€ôôô€‰=AQ%=9Lˆ€˜˜ÑåÁ•½˜¡…¹‘±•È¹=AQ%=9L€„ôô€‰™Õ¹Ñ¥½¸ˆì(%±•Ð¡…¹‘±•É¸€ôÑåÁ•½˜¡…¹‘±•Émµ•Ñ¡½‘t€ôôô€‰™Õ¹Ñ¥½¸ˆ€ü¡…¹‘±•Émµ•Ñ¡½‘t€èÙ½¥€Àì(%±•Ð¥ÍÕÑ½!•…€ô™…±Í”ì(%¥˜€¡µ•Ñ¡½€ôôô€‰!ˆ€˜˜ÑåÁ•½˜¡…¹‘±•È¹!€„ôô€‰™Õ¹Ñ¥½¸ˆ€˜˜ÑåÁ•½˜¡…¹‘±•È¹P€ôôô€‰™Õ¹Ñ¥½¸ˆ¤ì($%¡…¹‘±•É¸€ô¡…¹‘±•È¹Pì($%¥ÍÕÑ½!•…€ôÑÉÕ”ì(%ô(%É•ÑÕÉ¸ì($%…±±½Ý!•…‘•É½É=ÁÑ¥½¹Ì°($%•áÁ½ÉÑ•‘5•Ñ¡½‘Ì°($%¡…¹‘±•É¸°($%¥ÍÕÑ½!•…°($%Í¡½Õ±‘ÕÑ½I•ÍÁ½¹‘Q½=ÁÑ¥½¹Ì(%ôì)ô)™Õ¹Ñ¥½¸Í¡½Õ±‘I•…‘ÁÁI½ÕÑ•!…¹‘±•É…¡”¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€˜˜½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô¹Õ±°€˜˜½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ø€À€˜˜½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô%¹™¥¹¥Ñä€˜˜½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€„ôô€‰™½É”µ‘å¹…µ¥Œˆ€˜˜€…½ÁÑ¥½¹Ì¹¥Í-¹½Ý¹å¹…µ¥Œ€˜˜€¡½ÁÑ¥½¹Ì¹µ•Ñ¡½€ôôô€‰Pˆñð½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…¤€˜˜ÑåÁ•½˜½ÁÑ¥½¹Ì¹¡…¹‘±•É¸€ôôô€‰™Õ¹Ñ¥½¸ˆì)ô)™Õ¹Ñ¥½¸Í¡½Õ±‘ÁÁ±åÁÁI½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ•!•…‘•È¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô¹Õ±°€˜˜€…½ÁÑ¥½¹Ì¹‘å¹…µ¥UÍ•‘%¹!…¹‘±•È€˜˜€¡½ÁÑ¥½¹Ì¹µ•Ñ¡½€ôôô€‰Pˆñð½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…¤€˜˜€…½ÁÑ¥½¹Ì¹¡…¹‘±•ÉM•Ñ…¡•½¹ÑÉ½°ì)ô)™Õ¹Ñ¥½¸Í¡½Õ±‘]É¥Ñ•ÁÁI½ÕÑ•!…¹‘±•É…¡”¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€˜˜½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô¹Õ±°€˜˜½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ø€À€˜˜½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô%¹™¥¹¥Ñä€˜˜½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€„ôô€‰™½É”µ‘å¹…µ¥Œˆ€˜˜Í¡½Õ±‘ÁÁ±åÁÁI½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ•!•…‘•È¡½ÁÑ¥½¹Ì¤ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁI½ÕÑ•!…¹‘±•ÉMÁ•¥…±ÉÉ½È¡•ÉÉ½È°É•ÅÕ•ÍÑUÉ°°½ÁÑ¥½¹Ì¤ì(%¥˜€ „¡•ÉÉ½È€˜˜ÑåÁ•½˜•ÉÉ½È€ôôô€‰½‰©•Ðˆ€˜˜€‰‘¥•ÍÐˆ¥¸•ÉÉ½È¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ‘¥•ÍÐ€ôMÑÉ¥¹œ¡•ÉÉ½È¹‘¥•ÍÐ¤ì(%½¹ÍÐÉ•‘¥É•Ð€ôÁ…ÉÍ•9•áÑI•‘¥É•Ñ¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€¡É•‘¥É•Ð¤É•ÑÕÉ¸ì($%­¥¹è€‰É•‘¥É•Ðˆ°($%±½…Ñ¥½¸è¹•ÜUI0¡É•‘¥É•Ð¹ÕÉ°°É•ÅÕ•ÍÑUÉ°¤¹Ñ½MÑÉ¥¹œ ¤°($%ÍÑ…ÑÕÍ½‘”è½ÁÑ¥½¹Ìü¹¥ÍÑ¥½¸€ü€ÌÀÌ€èÉ•‘¥É•Ð¹ÍÑ…ÑÕÌ(%ôì(%½¹ÍÐ¡ÑÑÁÉÉ½È€ôÁ…ÉÍ•9•áÑ!ÑÑÁÉÉ½É¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€¡¡ÑÑÁÉÉ½È¤É•ÑÕÉ¸ì($%­¥¹è€‰ÍÑ…ÑÕÌˆ°($%ÍÑ…ÑÕÍ½‘”è¡ÑÑÁÉÉ½È¹ÍÑ…ÑÕÌ(%ôì(%É•ÑÕÉ¸¹Õ±°ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÍÑ…Ñ¥Œµ•¹•É…Ñ¥½¸¹©Ì)™Õ¹Ñ¥½¸•ÑÁÁA…•MÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½É5•ÍÍ…” ¤ì(%É•ÑÕÉ¸€‰A…”Ý¥Ñ ‘å¹…µ¥Œ€ôp‰•ÉÉ½Ép‰€ÕÍ•„‘å¹…µ¥ŒA$¸Q¡¥ÌÁ…”Ý…Ì•áÁ•Ñ•Ñ¼‰”™Õ±±äÍÑ…Ñ¥Œ°‰ÕÐ¡•…‘•ÉÌ ¤°½½­¥•Ì ¤°½ÈÍ•…É¡A…É…µÌÝ…Ì…•ÍÍ•¸I•µ½Ù”Ñ¡”‘å¹…µ¥ŒA$ÕÍ…”½È¡…¹”Ñ¡”‘å¹…µ¥Œ½¹™¥œÑ¼p‰…ÕÑ½pˆ½Èp‰™½É”µ‘å¹…µ¥pˆ¸ˆì)ô)™Õ¹Ñ¥½¸•ÑÁÁI½ÕÑ•MÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½É5•ÍÍ…”¡É½ÕÑ•A…ÑÑ•É¸°•áÁÉ•ÍÍ¥½¸¤ì(%É•ÑÕÉ¸I½ÕÑ”€‘íÉ½ÕÑ•A…ÑÑ•É¸€üü€‰Õ¹­¹½Ý¸É½ÕÑ”‰ôÝ¥Ñ q‘å¹…µ¥Œ€ô€‰•ÉÉ½È‰q€½Õ±‘¸Ð‰”É•¹‘•É•ÍÑ…Ñ¥…±±ä‰•…ÕÍ”¥ÐÕÍ•€‘í•áÁÉ•ÍÍ¥½¸€üü€‰„‘å¹…µ¥ŒÉ•ÅÕ•ÍÐA$‰ô¸M•”µ½É”¥¹™¼¡•É”è¡ÑÑÁÌè¼½¹•áÑ©Ì¹½Éœ½‘½Ì½…ÁÀ½‰Õ¥±‘¥¹œµå½ÕÈµ…ÁÁ±¥…Ñ¥½¸½É•¹‘•É¥¹œ½ÍÑ…Ñ¥Œµ…¹µ‘å¹…µ¥Œ‘å¹…µ¥ŒµÉ•¹‘•É¥¹€ì)ô)™Õ¹Ñ¥½¸É•…Ñ•MÑ…Ñ¥•¹•É…Ñ¥½¹!•…‘•ÉÍ½¹Ñ•áÐ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ½¹Ñ•áÐ€ôì($%¡•…‘•ÉÌè¹•Ü!•…‘•ÉÌ ¤°($%½½­¥•Ìè€¼¨}}AUI}|€¨¼¹•Ü5…À ¤(%ôì(%¥˜€¡½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µÍÑ…Ñ¥Œˆ¤½¹Ñ•áÐ¹™½É•MÑ…Ñ¥Œ€ôÑÉÕ”ì(%¥˜€¡½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰•ÉÉ½Èˆ¤½¹Ñ•áÐ¹…•ÍÍÉÉ½È€ô¹•ÜÉÉ½È¡½ÁÑ¥½¹Ì¹É½ÕÑ•-¥¹€ôôô€‰É½ÕÑ”ˆ€ü•ÑÁÁI½ÕÑ•MÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½É5•ÍÍ…”¡½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸¤€è•ÑÁÁA…•MÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½É5•ÍÍ…” ¤¤ì(%É•ÑÕÉ¸½¹Ñ•áÐì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ”µ¡…¹‘±•ÈµÉ•ÍÁ½¹Í”¹©Ì)Ù…ÈAA}I=UQ}I]I%Q}II=H€ô€‰9•áÑI•ÍÁ½¹Í”¹É•ÝÉ¥Ñ” ¤Ý…ÌÕÍ•¥¸„…ÁÀÉ½ÕÑ”¡…¹‘±•È°Ñ¡¥Ì¥Ì¹½ÐÕÉÉ•¹Ñ±äÍÕÁÁ½ÉÑ•¸A±•…Í”É•µ½Ù”Ñ¡”¥¹Ù½…Ñ¥½¸Ñ¼½¹Ñ¥¹Õ”¸ˆì)Ù…ÈAA}I=UQ}9aQ}II=H€ô€‰9•áÑI•ÍÁ½¹Í”¹¹•áÐ ¤Ý…ÌÕÍ•¥¸„…ÁÀÉ½ÕÑ”¡…¹‘±•È°Ñ¡¥Ì¥Ì¹½ÐÍÕÁÁ½ÉÑ•¸M•”¡•É”™½Èµ½É”¥¹™¼è¡ÑÑÁÌè¼½¹•áÑ©Ì¹½Éœ½‘½Ì½µ•ÍÍ…•Ì½¹•áÐµÉ•ÍÁ½¹Í”µ¹•áÐµ¥¸µ…ÁÀµÉ½ÕÑ”µ¡…¹‘±•Èˆì)™Õ¹Ñ¥½¸¡…Í5¥‘‘±•Ý…É•!•…‘•È¡¡•…‘•ÉÌ¤ì(%™½È€¡½¹ÍÐ­•ä½˜¡•…‘•ÉÌ¹­•åÌ ¤¤¥˜€¡­•ä¹ÍÑ…ÉÑÍ]¥Ñ  ‰àµµ¥‘‘±•Ý…É”´ˆ¤¤É•ÑÕÉ¸ÑÉÕ”ì(%É•ÑÕÉ¸™…±Í”ì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘I½ÕÑ•!…¹‘±•É…¡•½¹ÑÉ½°¡…¡•MÑ…Ñ”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤ì(%¥˜€¡É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô€À¤É•ÑÕÉ¸9YI}!}=9QI=0ì(%¥˜€¡É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô%¹™¥¹¥Ñä¤É•ÑÕÉ¸MQQ%}!}=9QI=0ì(%É•ÑÕÉ¸‰Õ¥±‘…¡•‘I•Ù…±¥‘…Ñ•…¡•½¹ÑÉ½°¡…¡•MÑ…Ñ”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤ì)ô)™Õ¹Ñ¥½¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡É•ÍÁ½¹Í”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%¥˜€ …µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ€˜˜µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹ÍÑ…ÑÕÌ€ôô¹Õ±°¤É•ÑÕÉ¸É•ÍÁ½¹Í”ì(%½¹ÍÐÉ•ÍÁ½¹Í•!•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¤ì(%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡É•ÍÁ½¹Í•!•…‘•ÉÌ°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”¹‰½‘ä°ì($%ÍÑ…ÑÕÌèµ¥‘‘±•Ý…É•½¹Ñ•áÐ¹ÍÑ…ÑÕÌ€üüÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÌ°($%ÍÑ…ÑÕÍQ•áÐèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÍQ•áÐ°($%¡•…‘•ÉÌèÉ•ÍÁ½¹Í•!•…‘•ÉÌ(%ô¤ì)ô)™Õ¹Ñ¥½¸…ÍÍ•ÉÑMÕÁÁ½ÉÑ•‘ÁÁI½ÕÑ•!…¹‘±•ÉI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”¤ì(%¥˜€¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹¡…Ì ‰àµµ¥‘‘±•Ý…É”µÉ•ÝÉ¥Ñ”ˆ¤¤Ñ¡É½Ü¹•ÜÉÉ½È¡AA}I=UQ}I]I%Q}II=H¤ì(%¥˜€¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹•Ð ‰àµµ¥‘‘±•Ý…É”µ¹•áÐˆ¤€ôôô€ˆÄˆ¤Ñ¡É½Ü¹•ÜÉÉ½È¡AA}I=UQ}9aQ}II=H¤ì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘I½ÕÑ•!…¹‘±•É…¡•‘I•ÍÁ½¹Í”¡…¡•‘Y…±Õ”°½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ ¤ì(%™½È€¡½¹ÍÐm­•ä°Ù…±Õ•t½˜=‰©•Ð¹•¹ÑÉ¥•Ì¡…¡•‘Y…±Õ”¹¡•…‘•ÉÌ¤¤¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤¤™½È€¡½¹ÍÐ•¹ÑÉä½˜Ù…±Õ”¤¡•…‘•ÉÌ¹…ÁÁ•¹¡­•ä°•¹ÑÉä¤ì(%•±Í”¡•…‘•ÉÌ¹Í•Ð¡­•ä°Ù…±Õ”¤ì(%¡•…‘•ÉÌ¹Í•Ð¡Y%9aQ}!}!H°½ÁÑ¥½¹Ì¹…¡•MÑ…Ñ”¤ì(%½¹ÍÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹…¡•½¹ÑÉ½°ü¹É•Ù…±¥‘…Ñ”€üü½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì(%½¹ÍÐ•áÁ¥É•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹…¡•½¹ÑÉ½°€ôôôÙ½¥€À€üÙ½¥€À€è½ÁÑ¥½¹Ì¹…¡•½¹ÑÉ½°¹•áÁ¥É”€üü½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ìì(%¡•…‘•ÉÌ¹Í•Ð ‰…¡”µ½¹ÑÉ½°ˆ°‰Õ¥±‘I½ÕÑ•!…¹‘±•É…¡•½¹ÑÉ½°¡½ÁÑ¥½¹Ì¹…¡•MÑ…Ñ”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¹¥Í!•…€ü¹Õ±°€è…¡•‘Y…±Õ”¹‰½‘ä°ì($%ÍÑ…ÑÕÌè…¡•‘Y…±Õ”¹ÍÑ…ÑÕÌ°($%¡•…‘•ÉÌ(%ô¤ì)ô)™Õ¹Ñ¥½¸…ÁÁ±åI½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ•!•…‘•È¡É•ÍÁ½¹Í”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤ì(%É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹Í•Ð ‰…¡”µ½¹ÑÉ½°ˆ°‰Õ¥±‘I½ÕÑ•!…¹‘±•É…¡•½¹ÑÉ½° ‰!%Pˆ°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤¤ì)ô)™Õ¹Ñ¥½¸µ…É­I½ÕÑ•!…¹‘±•É…¡•5¥ÍÌ¡É•ÍÁ½¹Í”¤ì(%É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹Í•Ð¡Y%9aQ}!}!H°€‰5%MLˆ¤ì)ô)™Õ¹Ñ¥½¸•ÑM•Ñ½½­¥•9…µ”¡½½­¥”¤ì(%½¹ÍÐ•ÅÕ…±Í%¹‘•à€ô½½­¥”¹¥¹‘•á=˜ ˆôˆ¤ì(%¥˜€¡•ÅÕ…±Í%¹‘•à€ðô€À¤É•ÑÕÉ¸¹Õ±°ì(%É•ÑÕÉ¸½½­¥”¹Í±¥” À°•ÅÕ…±Í%¹‘•à¤ì)ô)™Õ¹Ñ¥½¸…ÁÁ±å5ÕÑ…‰±•½½­¥•…±±‰…­Ì¡¡•…‘•ÉÌ°Á•¹‘¥¹½½­¥•Ì¤ì(%¥˜€¡Á•¹‘¥¹½½­¥•Ì¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸ì(%½¹ÍÐÉ•ÑÕÉ¹•‘½½­¥•Ì€ô¡•…‘•ÉÌ¹•ÑM•Ñ½½­¥” ¤ì(%½¹ÍÐÉ•ÑÕÉ¹•‘½½­¥•9…µ•Ì€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ð ¤ì(%™½È€¡½¹ÍÐ½½­¥”½˜É•ÑÕÉ¹•‘½½­¥•Ì¤ì($%½¹ÍÐ¹…µ”€ô•ÑM•Ñ½½­¥•9…µ”¡½½­¥”¤ì($%¥˜€¡¹…µ”¤É•ÑÕÉ¹•‘½½­¥•9…µ•Ì¹…‘¡¹…µ”¤ì(%ô(%½¹ÍÐ™…±±‰…­½½­¥•Ì€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%½¹ÍÐÕ¹­•å•‘…±±‰…­½½­¥•Ì€ômtì(%™½È€¡½¹ÍÐ½½­¥”½˜Á•¹‘¥¹½½­¥•Ì¤ì($%½¹ÍÐ¹…µ”€ô•ÑM•Ñ½½­¥•9…µ”¡½½­¥”¤ì($%¥˜€ …¹…µ”¤ì($$%Õ¹­•å•‘…±±‰…­½½­¥•Ì¹ÁÕÍ ¡½½­¥”¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%¥˜€ …É•ÑÕÉ¹•‘½½­¥•9…µ•Ì¹¡…Ì¡¹…µ”¤¤™…±±‰…­½½­¥•Ì¹Í•Ð¡¹…µ”°½½­¥”¤ì(%ô(%¡•…‘•ÉÌ¹‘•±•Ñ” ‰M•Ðµ½½­¥”ˆ¤ì(%™½È€¡½¹ÍÐ½½­¥”½˜Õ¹­•å•‘…±±‰…­½½­¥•Ì¤¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°½½­¥”¤ì(%™½È€¡½¹ÍÐ½½­¥”½˜™…±±‰…­½½­¥•Ì¹Ù…±Õ•Ì ¤¤¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°½½­¥”¤ì(%™½È€¡½¹ÍÐ½½­¥”½˜É•ÑÕÉ¹•‘½½­¥•Ì¤¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°½½­¥”¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁI½ÕÑ•…¡•Y…±Õ”¡É•ÍÁ½¹Í”¤ì(%½¹ÍÐ‰½‘ä€ô…Ý…¥ÐÉ•ÍÁ½¹Í”¹…ÉÉ…å	Õ™™•È ¤ì(%½¹ÍÐ¡•…‘•ÉÌ€ôíôì(%É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹™½É…  ¡Ù…±Õ”°­•ä¤€ôøì($%¥˜€¡­•ä€ôôô€‰Í•Ðµ½½­¥”ˆñð­•ä€ôôô€‰`µY¥¹•áÐµ…¡”ˆ¹Ñ½1½Ý•É…Í” ¤ñð­•ä€ôôô€‰…¡”µ½¹ÑÉ½°ˆñð­•ä¹ÍÑ…ÉÑÍ]¥Ñ  ‰àµµ¥‘‘±•Ý…É”´ˆ¤¤É•ÑÕÉ¸ì($%¡•…‘•ÉÍm­•åt€ôÙ…±Õ”ì(%ô¤ì(%½¹ÍÐÍ•Ñ½½­¥•Ì€ôÉ•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹•ÑM•Ñ½½­¥”ü¸ ¤€üümtì(%¥˜€¡Í•Ñ½½­¥•Ì¹±•¹Ñ €ø€À¤¡•…‘•ÉÍl‰Í•Ðµ½½­¥”‰t€ôÍ•Ñ½½­¥•Ìì(%É•ÑÕÉ¸ì($%­¥¹è€‰AA}I=UQˆ°($%‰½‘ä°($%ÍÑ…ÑÕÌèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÌ°($%¡•…‘•ÉÌ(%ôì)ô)™Õ¹Ñ¥½¸™¥¹…±¥é•I½ÕÑ•!…¹‘±•ÉI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”°½ÁÑ¥½¹Ì¤ì(%½¹ÍÐìÁ•¹‘¥¹½½­¥•Ì°‘É…™Ñ½½­¥”°¥Í!•…ô€ô½ÁÑ¥½¹Ìì(%¥˜€¡Á•¹‘¥¹½½­¥•Ì¹±•¹Ñ €ôôô€À€˜˜€…‘É…™Ñ½½­¥”€˜˜€…¥Í!•…€˜˜€…¡…Í5¥‘‘±•Ý…É•!•…‘•È¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¤¤É•ÑÕÉ¸É•ÍÁ½¹Í”ì(%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¤ì(%ÁÉ½•ÍÍ5¥‘‘±•Ý…É•!•…‘•ÉÌ¡¡•…‘•ÉÌ¤ì(%…ÁÁ±å5ÕÑ…‰±•½½­¥•…±±‰…­Ì¡¡•…‘•ÉÌ°Á•¹‘¥¹½½­¥•Ì¤ì(%¥˜€¡‘É…™Ñ½½­¥”¤¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°‘É…™Ñ½½­¥”¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡¥Í!•…€ü¹Õ±°€èÉ•ÍÁ½¹Í”¹‰½‘ä°ì($%ÍÑ…ÑÕÌèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÌ°($%ÍÑ…ÑÕÍQ•áÐèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÍQ•áÐ°($%¡•…‘•ÉÌ(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ”µ¡…¹‘±•Èµ•á•ÕÑ¥½¸¹©Ì)™Õ¹Ñ¥½¸½¹™¥ÕÉ•ÁÁI½ÕÑ•MÑ…Ñ¥•¹•É…Ñ¥½¹½¹Ñ•áÐ¡½ÁÑ¥½¹Ì¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µÍÑ…Ñ¥Œˆñð½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰•ÉÉ½Èˆ¤ì($%Í•Ñ!•…‘•ÉÍ½¹Ñ•áÐ¡É•…Ñ•MÑ…Ñ¥•¹•É…Ñ¥½¹!•…‘•ÉÍ½¹Ñ•áÐ¡ì($$%‘å¹…µ¥½¹™¥œè½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ°($$%É½ÕÑ•-¥¹è€‰É½ÕÑ”ˆ°($$%É½ÕÑ•A…ÑÑ•É¸è½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸($%ô¤¤ì($%½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”ü¸ ‰É½ÕÑ”µ¡…¹‘±•Èˆ¤ì(%ô)ô)…Íå¹Œ™Õ¹Ñ¥½¸ÉÕ¹ÁÁI½ÕÑ•!…¹‘±•È¡½ÁÑ¥½¹Ì¤ì(%½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…” ¤ì(%½¹™¥ÕÉ•ÁÁI½ÕÑ•MÑ…Ñ¥•¹•É…Ñ¥½¹½¹Ñ•áÐ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÑÉ…­•‘I•ÅÕ•ÍÐ€ôÉ•…Ñ•QÉ…­•‘ÁÁI½ÕÑ•I•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°ì($%‰…Í•A…Ñ è½ÁÑ¥½¹Ì¹‰…Í•A…Ñ °($%¤Äá¸è½ÁÑ¥½¹Ì¹¤Äá¸°($%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•I•ÅÕ•ÍÑ!•…‘•ÉÌ°($%½¹å¹…µ¥•ÍÌ ¤ì($$%½ÁÑ¥½¹Ì¹µ…É­å¹…µ¥UÍ…” ¤ì($%ô°($%É•ÅÕ•ÍÑ5½‘”è½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µÍÑ…Ñ¥Œˆñð½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰•ÉÉ½Èˆ€ü½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€è€‰…ÕÑ¼ˆ°($%ÍÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½É5•ÍÍ…”¡•áÁÉ•ÍÍ¥½¸¤ì($$%É•ÑÕÉ¸•ÑÁÁI½ÕÑ•MÑ…Ñ¥•¹•É…Ñ¥½¹ÉÉ½É5•ÍÍ…”¡½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸°•áÁÉ•ÍÍ¥½¸¤ì($%ô(%ô¤ì(%½¹ÍÐÉ•ÍÁ½¹Í”€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹¡…¹‘±•É¸¡ÑÉ…­•‘I•ÅÕ•ÍÐ¹É•ÅÕ•ÍÐ°ìÁ…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌô¤ì(%É•ÑÕÉ¸ì($%‘å¹…µ¥UÍ•‘%¹!…¹‘±•Èè½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…” ¤°($%É•ÍÁ½¹Í”(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸•á•ÕÑ•ÁÁI½ÕÑ•!…¹‘±•È¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÁÉ•Ù¥½ÕÍ!•…‘•ÉÍA¡…Í”€ô½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í” ‰É½ÕÑ”µ¡…¹‘±•Èˆ¤ì(%ÑÉäì($%½¹ÍÐì‘å¹…µ¥UÍ•‘%¹!…¹‘±•È°É•ÍÁ½¹Í”ô€ô…Ý…¥ÐÉÕ¹ÁÁI½ÕÑ•!…¹‘±•È¡ì($$$¸¸¹½ÁÑ¥½¹Ì°($$%‘å¹…µ¥½¹™¥œè½ÁÑ¥½¹Ì¹¡…¹‘±•È¹‘å¹…µ¥Œ($%ô¤ì($%…ÍÍ•ÉÑMÕÁÁ½ÉÑ•‘ÁÁI½ÕÑ•!…¹‘±•ÉI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”¤ì($%½¹ÍÐ¡…¹‘±•ÉM•Ñ…¡•½¹ÑÉ½°€ôÉ•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹¡…Ì ‰…¡”µ½¹ÑÉ½°ˆ¤ì($%¥˜€¡‘å¹…µ¥UÍ•‘%¹!…¹‘±•È¤µ…É­-¹½Ý¹å¹…µ¥ÁÁI½ÕÑ”¡½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸¤ì($%¥˜€¡Í¡½Õ±‘ÁÁ±åÁÁI½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ•!•…‘•È¡ì($$%‘å¹…µ¥UÍ•‘%¹!…¹‘±•È°($$%¡…¹‘±•ÉM•Ñ…¡•½¹ÑÉ½°°($$%¥ÍÕÑ½!•…è½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…°($$%µ•Ñ¡½è½ÁÑ¥½¹Ì¹µ•Ñ¡½°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($%ô¤¤ì($$%½¹ÍÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì($$%¥˜€¡É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôô¹Õ±°¤Ñ¡É½Ü¹•ÜÉÉ½È ‰áÁ•Ñ•É½ÕÑ”¡…¹‘±•ÈÉ•Ù…±¥‘…Ñ”Í•½¹‘Ìˆ¤ì($$%…ÁÁ±åI½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ•!•…‘•È¡É•ÍÁ½¹Í”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì¤ì($%ô($%¥˜€¡Í¡½Õ±‘]É¥Ñ•ÁÁI½ÕÑ•!…¹‘±•É…¡”¡ì($$%‘å¹…µ¥½¹™¥œè½ÁÑ¥½¹Ì¹¡…¹‘±•È¹‘å¹…µ¥Œ°($$%‘å¹…µ¥UÍ•‘%¹!…¹‘±•È°($$%¡…¹‘±•ÉM•Ñ…¡•½¹ÑÉ½°°($$%¥ÍÕÑ½!•…è½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…°($$%¥ÍAÉ½‘ÕÑ¥½¸è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸°($$%µ•Ñ¡½è½ÁÑ¥½¹Ì¹µ•Ñ¡½°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($%ô¤¤ì($$%µ…É­I½ÕÑ•!…¹‘±•É…¡•5¥ÍÌ¡É•ÍÁ½¹Í”¤ì($$%½¹ÍÐÉ½ÕÑ•±½¹”€ôÉ•ÍÁ½¹Í”¹±½¹” ¤ì($$%½¹ÍÐÉ½ÕÑ•-•ä€ô½ÁÑ¥½¹Ì¹¥ÍÉI½ÕÑ•-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$%½¹ÍÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì($$%¥˜€¡É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôô¹Õ±°¤Ñ¡É½Ü¹•ÜÉÉ½È ‰áÁ•Ñ•É½ÕÑ”¡…¹‘±•È…¡”É•Ù…±¥‘…Ñ”Í•½¹‘Ìˆ¤ì($$%½¹ÍÐÉ½ÕÑ•Q…Ì€ô½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•…¡•Q…Ì¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹•Ñ½±±•Ñ•‘•Ñ¡Q…Ì ¤¤ì($$%½¹ÍÐÉ½ÕÑ•]É¥Ñ•AÉ½µ¥Í”€ô€¡…Íå¹Œ€ ¤€ôøì($$$%ÑÉäì($$$$%½¹ÍÐÉ½ÕÑ•…¡•Y…±Õ”€ô…Ý…¥Ð‰Õ¥±‘ÁÁI½ÕÑ•…¡•Y…±Õ”¡É½ÕÑ•±½¹”¤ì($$$$%…Ý…¥Ð½ÁÑ¥½¹Ì¹¥ÍÉM•Ð¡É½ÕÑ•-•ä°É½ÕÑ•…¡•Y…±Õ”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°É½ÕÑ•Q…Ì°½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì¤ì($$$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰É½ÕÑ”…¡”ÝÉ¥ÑÑ•¸ˆ°É½ÕÑ•-•ä¤ì($$$%ô…Ñ €¡…¡•ÉÈ¤ì($$$$%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑt%MHÉ½ÕÑ”…¡”ÝÉ¥Ñ”•ÉÉ½Èèˆ°…¡•ÉÈ¤ì($$$%ô($$%ô¤ ¤ì($$%½ÁÑ¥½¹Ì¹•á•ÕÑ¥½¹½¹Ñ•áÐü¹Ý…¥ÑU¹Ñ¥°¡É½ÕÑ•]É¥Ñ•AÉ½µ¥Í”¤ì($%ô($%½¹ÍÐÁ•¹‘¥¹½½­¥•Ì€ô½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì($%½¹ÍÐ‘É…™Ñ½½­¥”€ô½ÁÑ¥½¹Ì¹•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È ¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡™¥¹…±¥é•I½ÕÑ•!…¹‘±•ÉI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”°ì($$%Á•¹‘¥¹½½­¥•Ì°($$%‘É…™Ñ½½­¥”°($$%¥Í!•…è½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…($%ô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%ô…Ñ €¡•ÉÉ½È¤ì($%½¹ÍÐÁ•¹‘¥¹½½­¥•Ì€ô½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì($%½¹ÍÐ‘É…™Ñ½½­¥”€ô½ÁÑ¥½¹Ì¹•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È ¤ì($%½¹ÍÐÍÁ•¥…±ÉÉ½È€ôÉ•Í½±Ù•ÁÁI½ÕÑ•!…¹‘±•ÉMÁ•¥…±ÉÉ½È¡•ÉÉ½È°½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹ÕÉ°°ì¥ÍÑ¥½¸è¥ÍA½ÍÍ¥‰±•ÁÁI½ÕÑ•Ñ¥½¹I•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¤ô¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%¥˜€¡ÍÁ•¥…±ÉÉ½È¤ì($$%¥˜€¡ÍÁ•¥…±ÉÉ½È¹­¥¹€ôôô€‰É•‘¥É•Ðˆ¤É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡™¥¹…±¥é•I½ÕÑ•!…¹‘±•ÉI•ÍÁ½¹Í”¡¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ì($$$%ÍÑ…ÑÕÌèÍÁ•¥…±ÉÉ½È¹ÍÑ…ÑÕÍ½‘”°($$$%¡•…‘•ÉÌèì1½…Ñ¥½¸èÍÁ•¥…±ÉÉ½È¹±½…Ñ¥½¸ô($$%ô¤°ì($$$%Á•¹‘¥¹½½­¥•Ì°($$$%‘É…™Ñ½½­¥”°($$$%¥Í!•…è½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…($$%ô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($$%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ìÍÑ…ÑÕÌèÍÁ•¥…±ÉÉ½È¹ÍÑ…ÑÕÍ½‘”ô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($%ô($%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑtI½ÕÑ”¡…¹‘±•È•ÉÉ½Èèˆ°•ÉÉ½È¤ì($%½ÁÑ¥½¹Ì¹É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È¡•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€ü•ÉÉ½È€è¹•ÜÉÉ½È¡MÑÉ¥¹œ¡•ÉÉ½È¤¤°ì($$%Á…Ñ è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%µ•Ñ¡½è½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹µ•Ñ¡½°($$%¡•…‘•ÉÌè=‰©•Ð¹™É½µ¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•¹ÑÉ¥•Ì ¤¤($%ô°ì($$%É½ÕÑ•É-¥¹è€‰ÁÀI½ÕÑ•Èˆ°($$%É½ÕÑ•A…Ñ è½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸°($$%É½ÕÑ•QåÁ”è€‰É½ÕÑ”ˆ($%ô¤ì($%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ìÍÑ…ÑÕÌè€ÔÀÀô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%ô™¥¹…±±äì($%½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”¡ÁÉ•Ù¥½ÕÍ!•…‘•ÉÍA¡…Í”¤ì(%ô)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ”µ¡…¹‘±•Èµ…¡”¹©Ì)™Õ¹Ñ¥½¸•Ñ…¡•‘ÁÁI½ÕÑ•Y…±Õ”¡•¹ÑÉä¤ì(%É•ÑÕÉ¸•¹ÑÉäü¹Ù…±Õ”¹Ù…±Õ”€˜˜•¹ÑÉä¹Ù…±Õ”¹Ù…±Õ”¹­¥¹€ôôô€‰AA}I=UQˆ€ü•¹ÑÉä¹Ù…±Õ”¹Ù…±Õ”€è¹Õ±°ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•…‘ÁÁI½ÕÑ•!…¹‘±•É…¡•I•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÉ½ÕÑ•-•ä€ô½ÁÑ¥½¹Ì¹¥ÍÉI½ÕÑ•-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì(%ÑÉäì($%½¹ÍÐ…¡•€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹¥ÍÉ•Ð¡É½ÕÑ•-•ä¤ì($%½¹ÍÐ…¡•‘Y…±Õ”€ô•Ñ…¡•‘ÁÁI½ÕÑ•Y…±Õ”¡…¡•¤ì($%¥˜€¡…¡•‘Y…±Õ”€˜˜€……¡•ü¹¥ÍMÑ…±”¤ì($$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰!%P€¡É½ÕÑ”¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡‰Õ¥±‘I½ÕÑ•!…¹‘±•É…¡•‘I•ÍÁ½¹Í”¡…¡•‘Y…±Õ”°ì($$$%…¡•MÑ…Ñ”è€‰!%Pˆ°($$$%…¡•½¹ÑÉ½°è…¡•ü¹Ù…±Õ”¹…¡•½¹ÑÉ½°°($$$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$$%¥Í!•…è½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…°($$$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($$%ô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($%ô($%¥˜€¡…¡•ü¹¥ÍMÑ…±”€˜˜…¡•‘Y…±Õ”¤ì($$%½¹ÍÐÍÑ…±•Y…±Õ”€ô…¡•‘Y…±Õ”ì($$%½¹ÍÐÉ•Ù…±¥‘…Ñ•M•…É¡A…É…µÌ€ô¹•ÜUI1M•…É¡A…É…µÌ¡½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•…É¡A…É…µÌ¤ì($$%½ÁÑ¥½¹Ì¹Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡É½ÕÑ•-•ä°…Íå¹Œ€ ¤€ôøì($$$%…Ý…¥Ð½ÁÑ¥½¹Ì¹ÉÕ¹%¹I•Ù…±¥‘…Ñ¥½¹½¹Ñ•áÐ¡…Íå¹Œ€ ¤€ôøì($$$$%½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡ì($$$$$%Á…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$$$$%Í•…É¡A…É…µÌèÉ•Ù…±¥‘…Ñ•M•…É¡A…É…µÌ°($$$$$%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ($$$$%ô¤ì($$$$%½¹ÍÐì‘å¹…µ¥UÍ•‘%¹!…¹‘±•È°É•ÍÁ½¹Í”ô€ô…Ý…¥ÐÉÕ¹ÁÁI½ÕÑ•!…¹‘±•È¡ì($$$$$%‰…Í•A…Ñ è½ÁÑ¥½¹Ì¹‰…Í•A…Ñ °($$$$$%½¹ÍÕµ•å¹…µ¥UÍ…”è½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…”°($$$$$%‘å¹…µ¥½¹™¥œè½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ°($$$$$%¡…¹‘±•É¸è½ÁÑ¥½¹Ì¹¡…¹‘±•É¸°($$$$$%¤Äá¸è½ÁÑ¥½¹Ì¹¤Äá¸°($$$$$%µ…É­å¹…µ¥UÍ…”è½ÁÑ¥½¹Ì¹µ…É­å¹…µ¥UÍ…”°($$$$$%Á…É…µÌèµ…­•Q¡•¹…‰±•A…É…µÌ¡½ÁÑ¥½¹Ì¹Á…É…µÌ¤°($$$$$%É•ÅÕ•ÍÐè¹•ÜI•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑUÉ°°ìµ•Ñ¡½è€‰Pˆô¤°($$$$$%É½ÕÑ•A…ÑÑ•É¸è½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸°($$$$$%Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”è½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”($$$$%ô¤ì($$$$%½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡¹Õ±°¤ì($$$$%…ÍÍ•ÉÑMÕÁÁ½ÉÑ•‘ÁÁI½ÕÑ•!…¹‘±•ÉI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”¤ì($$$$%¥˜€¡‘å¹…µ¥UÍ•‘%¹!…¹‘±•È¤ì($$$$$%µ…É­-¹½Ý¹å¹…µ¥ÁÁI½ÕÑ”¡½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸¤ì($$$$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰É½ÕÑ”É••¸Í­¥ÁÁ•€¡‘å¹…µ¥ŒÕÍ…”¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$$$$%É•ÑÕÉ¸ì($$$$%ô($$$$%½¹ÍÐÉ½ÕÑ•Q…Ì€ô½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•…¡•Q…Ì¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹•Ñ½±±•Ñ•‘•Ñ¡Q…Ì ¤¤ì($$$$%½¹ÍÐÉ½ÕÑ•…¡•Y…±Õ”€ô…Ý…¥Ð‰Õ¥±‘ÁÁI½ÕÑ•…¡•Y…±Õ”¡É•ÍÁ½¹Í”¤ì($$$$%…Ý…¥Ð½ÁÑ¥½¹Ì¹¥ÍÉM•Ð¡É½ÕÑ•-•ä°É½ÕÑ•…¡•Y…±Õ”°½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì°É½ÕÑ•Q…Ì°½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì¤ì($$$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰É½ÕÑ”É••¸½µÁ±•Ñ”ˆ°É½ÕÑ•-•ä¤ì($$$%ô¤ì($$%ô¤ì($$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰MQ1€¡É½ÕÑ”¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡‰Õ¥±‘I½ÕÑ•!…¹‘±•É…¡•‘I•ÍÁ½¹Í”¡ÍÑ…±•Y…±Õ”°ì($$$%…¡•MÑ…Ñ”è€‰MQ1ˆ°($$$%…¡•½¹ÑÉ½°è…¡•¹Ù…±Õ”¹…¡•½¹ÑÉ½°°($$$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$$%¥Í!•…è½ÁÑ¥½¹Ì¹¥ÍÕÑ½!•…°($$$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($$%ô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($%ô(%ô…Ñ €¡É½ÕÑ•…¡•ÉÉ½È¤ì($%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑt%MHÉ½ÕÑ”…¡”É•…•ÉÉ½Èèˆ°É½ÕÑ•…¡•ÉÉ½È¤ì(%ô(%É•ÑÕÉ¸¹Õ±°ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ”µ¡…¹‘±•Èµ‘¥ÍÁ…Ñ ¹©Ì)™Õ¹Ñ¥½¸¥ÍÁÁI½ÕÑ•!…¹‘±•ÉÕ¹Ñ¥½¸¡Ù…±Õ”¤ì(%É•ÑÕÉ¸ÑåÁ•½˜Ù…±Õ”€ôôô€‰™Õ¹Ñ¥½¸ˆì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘I½ÕÑ•!…¹‘±•ÉA…•…¡•Q…Ì¡Á…Ñ¡¹…µ”°•áÑÉ…Q…Ì°É½ÕÑ•M•µ•¹ÑÌ¤ì(%É•ÑÕÉ¸‰Õ¥±‘A…•…¡•Q…Ì¡Á…Ñ¡¹…µ”°•áÑÉ…Q…Ì°É½ÕÑ•M•µ•¹ÑÌ°€‰É½ÕÑ”ˆ¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸ÉÕ¹%¹I½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ¥½¹½¹Ñ•áÐ¡½ÁÑ¥½¹Ì°É•¹‘•É¸¤ì(%…Ý…¥ÐÉÕ¹]¥Ñ¡I•ÅÕ•ÍÑ½¹Ñ•áÐ¡É•…Ñ•I•ÅÕ•ÍÑ½¹Ñ•áÐ¡ì($%¡•…‘•ÉÍ½¹Ñ•áÐèÉ•…Ñ•MÑ…Ñ¥•¹•É…Ñ¥½¹!•…‘•ÉÍ½¹Ñ•áÐ¡ì($$%‘å¹…µ¥½¹™¥œè½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ°($$%É½ÕÑ•-¥¹è€‰É½ÕÑ”ˆ°($$%É½ÕÑ•A…ÑÑ•É¸è½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸($%ô¤°($%•á•ÕÑ¥½¹½¹Ñ•áÐè•ÑI•ÅÕ•ÍÑá•ÕÑ¥½¹½¹Ñ•áÐ ¤°($%Õ¹ÍÑ…‰±•…¡•I•Ù…±¥‘…Ñ¥½¸è€‰™½É•É½Õ¹ˆ(%ô¤°…Íå¹Œ€ ¤€ôøì($%•¹ÍÕÉ••Ñ¡A…Ñ  ¤ì($%Í•ÑÕÉÉ•¹Ñ•Ñ¡M½™ÑQ…Ì¡‰Õ¥±‘I½ÕÑ•!…¹‘±•ÉA…•…¡•Q…Ì¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°mt°½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ¤¤ì($%…Ý…¥ÐÉ•¹‘•É¸ ¤ì(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸‘¥ÍÁ…Ñ¡ÁÁI½ÕÑ•!…¹‘±•È¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐìÉ½ÕÑ”ô€ô½ÁÑ¥½¹Ìì(%½¹ÍÐ¡…¹‘±•È€ôÉ½ÕÑ”¹É½ÕÑ•!…¹‘±•Èì(%½¹ÍÐµ•Ñ¡½€ô½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹µ•Ñ¡½¹Ñ½UÁÁ•É…Í” ¤ì(%½¹ÍÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô•ÑÁÁI½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ•M•½¹‘Ì¡¡…¹‘±•È¤ì(%½¹ÍÐ¥Í•Ù•±½Áµ•¹Ð€ô½ÁÑ¥½¹Ì¹¥Í•Ù•±½Áµ•¹Ð€üü™…±Í”ì(%½¹ÍÐ¥ÍAÉ½‘ÕÑ¥½¸€ô½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€üüÑÉÕ”ì(%¥˜€¡¡…ÍÁÁI½ÕÑ•!…¹‘±•É•™…Õ±ÑáÁ½ÉÐ¡¡…¹‘±•È¤€˜˜¥Í•Ù•±½Áµ•¹Ð¤½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑt•Ñ•Ñ•‘•™…Õ±Ð•áÁ½ÉÐ¥¸É½ÕÑ”¡…¹‘±•È€ˆ€¬É½ÕÑ”¹Á…ÑÑ•É¸€¬€ˆ¸áÁ½ÉÐ„¹…µ••áÁ½ÉÐ™½È•… !QQ@µ•Ñ¡½¥¹ÍÑ•…¸ˆ¤ì(%¥˜€ …¥ÍY…±¥‘!QQA5•Ñ¡½¡µ•Ñ¡½¤¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ìÍÑ…ÑÕÌè€ÐÀÀô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%ô(%½¹ÍÐì…±±½Ý!•…‘•É½É=ÁÑ¥½¹Ì°¡…¹‘±•É¸°¥ÍÕÑ½!•…°Í¡½Õ±‘ÕÑ½I•ÍÁ½¹‘Q½=ÁÑ¥½¹Ìô€ôÉ•Í½±Ù•ÁÁI½ÕÑ•!…¹‘±•É5•Ñ¡½¡¡…¹‘±•È°µ•Ñ¡½¤ì(%¥˜€¡Í¡½Õ±‘ÕÑ½I•ÍÁ½¹‘Q½=ÁÑ¥½¹Ì¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ì($$%ÍÑ…ÑÕÌè€ÈÀÐ°($$%¡•…‘•ÉÌèì±±½Üè…±±½Ý!•…‘•É½É=ÁÑ¥½¹Ìô($%ô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%ô(%½¹ÍÐÉ•Í½±Ù•‘!…¹‘±•É¸€ô¥ÍÁÁI½ÕÑ•!…¹‘±•ÉÕ¹Ñ¥½¸¡¡…¹‘±•É¸¤€ü¡…¹‘±•É¸€èÙ½¥€Àì(%¥˜€¡É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô¹Õ±°€˜˜Í¡½Õ±‘I•…‘ÁÁI½ÕÑ•!…¹‘±•É…¡”¡ì($%‘å¹…µ¥½¹™¥œè¡…¹‘±•È¹‘å¹…µ¥Œ°($%¡…¹‘±•É¸èÉ•Í½±Ù•‘!…¹‘±•É¸°($%¥ÍÕÑ½!•…°($%¥Í-¹½Ý¹å¹…µ¥Œè¥Í-¹½Ý¹å¹…µ¥ÁÁI½ÕÑ”¡É½ÕÑ”¹Á…ÑÑ•É¸¤°($%¥ÍAÉ½‘ÕÑ¥½¸°($%µ•Ñ¡½°($%É•Ù…±¥‘…Ñ•M•½¹‘Ì(%ô¤€˜˜É•Í½±Ù•‘!…¹‘±•É¸¤ì($%½¹ÍÐ…¡•‘I½ÕÑ•I•ÍÁ½¹Í”€ô…Ý…¥ÐÉ•…‘ÁÁI½ÕÑ•!…¹‘±•É…¡•I•ÍÁ½¹Í”¡ì($$%‰…Í•A…Ñ è½ÁÑ¥½¹Ì¹‰…Í•A…Ñ °($$%‰Õ¥±‘A…•…¡•Q…Ì¡Á…Ñ¡¹…µ”°•áÑÉ…Q…Ì¤ì($$$%É•ÑÕÉ¸‰Õ¥±‘I½ÕÑ•!…¹‘±•ÉA…•…¡•Q…Ì¡Á…Ñ¡¹…µ”°•áÑÉ…Q…Ì°É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤ì($$%ô°($$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$%½¹ÍÕµ•å¹…µ¥UÍ…”°($$%‘å¹…µ¥½¹™¥œè¡…¹‘±•È¹‘å¹…µ¥Œ°($$%•Ñ½±±•Ñ•‘•Ñ¡Q…Ì°($$%¡…¹‘±•É¸èÉ•Í½±Ù•‘!…¹‘±•É¸°($$%¤Äá¸è½ÁÑ¥½¹Ì¹¤Äá¸°($$%¥ÍÕÑ½!•…°($$%¥ÍÉ•‰Õœè½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœ°($$%¥ÍÉ•Ðè½ÁÑ¥½¹Ì¹¥ÍÉ•Ð°($$%¥ÍÉI½ÕÑ•-•äè½ÁÑ¥½¹Ì¹¥ÍÉI½ÕÑ•-•ä°($$%¥ÍÉM•Ðè½ÁÑ¥½¹Ì¹¥ÍÉM•Ð°($$%µ…É­å¹…µ¥UÍ…”°($$%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($$%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ°($$%É•ÅÕ•ÍÑUÉ°è½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹ÕÉ°°($$%É•Ù…±¥‘…Ñ•M•…É¡A…É…µÌè½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ°($$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ì°($$%É½ÕÑ•A…ÑÑ•É¸èÉ½ÕÑ”¹Á…ÑÑ•É¸°($$%ÉÕ¹%¹I•Ù…±¥‘…Ñ¥½¹½¹Ñ•áÐ¡É•¹‘•É¸¤ì($$$%É•ÑÕÉ¸ÉÕ¹%¹I½ÕÑ•!…¹‘±•ÉI•Ù…±¥‘…Ñ¥½¹½¹Ñ•áÐ¡ì($$$$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$$$%‘å¹…µ¥½¹™¥œè¡…¹‘±•È¹‘å¹…µ¥Œ°($$$$%É½ÕÑ•A…ÑÑ•É¸èÉ½ÕÑ”¹Á…ÑÑ•É¸°($$$$%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ($$$%ô°É•¹‘•É¸¤ì($$%ô°($$%Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡­•ä°É•¹‘•É¸¤ì($$$%½ÁÑ¥½¹Ì¹Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡­•ä°É•¹‘•É¸°ì($$$$%É½ÕÑ•É-¥¹è€‰ÁÀI½ÕÑ•Èˆ°($$$$%É½ÕÑ•A…Ñ èÉ½ÕÑ”¹Á…ÑÑ•É¸°($$$$%É½ÕÑ•QåÁ”è€‰É½ÕÑ”ˆ($$$%ô¤ì($$%ô°($$%Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”°($$%Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ($%ô¤ì($%¥˜€¡…¡•‘I½ÕÑ•I•ÍÁ½¹Í”¤É•ÑÕÉ¸…¡•‘I½ÕÑ•I•ÍÁ½¹Í”ì(%ô(%¥˜€¡É•Í½±Ù•‘!…¹‘±•É¸¤É•ÑÕÉ¸•á•ÕÑ•ÁÁI½ÕÑ•!…¹‘±•È¡ì($%‰…Í•A…Ñ è½ÁÑ¥½¹Ì¹‰…Í•A…Ñ °($%‰Õ¥±‘A…•…¡•Q…Ì¡Á…Ñ¡¹…µ”°•áÑÉ…Q…Ì¤ì($$%É•ÑÕÉ¸‰Õ¥±‘I½ÕÑ•!…¹‘±•ÉA…•…¡•Q…Ì¡Á…Ñ¡¹…µ”°•áÑÉ…Q…Ì°É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤ì($%ô°($%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($%½¹ÍÕµ•å¹…µ¥UÍ…”°($%•á•ÕÑ¥½¹½¹Ñ•áÐè•ÑI•ÅÕ•ÍÑá•ÕÑ¥½¹½¹Ñ•áÐ ¤°($%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì°($%•Ñ½±±•Ñ•‘•Ñ¡Q…Ì°($%•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È°($%¡…¹‘±•È°($%¡…¹‘±•É¸èÉ•Í½±Ù•‘!…¹‘±•É¸°($%¤Äá¸è½ÁÑ¥½¹Ì¹¤Äá¸°($%¥ÍÕÑ½!•…°($%¥ÍAÉ½‘ÕÑ¥½¸°($%¥ÍÉ•‰Õœè½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœ°($%¥ÍÉI½ÕÑ•-•äè½ÁÑ¥½¹Ì¹¥ÍÉI½ÕÑ•-•ä°($%¥ÍÉM•Ðè½ÁÑ¥½¹Ì¹¥ÍÉM•Ð°($%µ…É­å¹…µ¥UÍ…”°($%µ•Ñ¡½°($%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($%µ¥‘‘±•Ý…É•I•ÅÕ•ÍÑ!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•I•ÅÕ•ÍÑ!•…‘•ÉÌ°($%Á…É…µÌèµ…­•Q¡•¹…‰±•A…É…µÌ¡½ÁÑ¥½¹Ì¹Á…É…µÌ¤°($%É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È¡•ÉÉ½È°É•ÅÕ•ÍÐ°½¹Ñ•áÐ¤ì($$%É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È¡•ÉÉ½È°É•ÅÕ•ÍÐ°½¹Ñ•áÐ¤ì($%ô°($%É•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°($%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($%É•Ù…±¥‘…Ñ•M•½¹‘Ì°($%É½ÕÑ•A…ÑÑ•É¸èÉ½ÕÑ”¹Á…ÑÑ•É¸°($%Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”(%ô¤ì(%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%É•ÑÕÉ¸…ÁÁ±åI½ÕÑ•!…¹‘±•É5¥‘‘±•Ý…É•½¹Ñ•áÐ¡¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ìÍÑ…ÑÕÌè€ÐÀÔô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½ÕÑ¥±Ì½Ñ•áÐµÍÑÉ•…´¹©Ì(¼¨¨(¨!•±Á•ÉÌ™½ÈÑ¡”É•Á•…Ñ•¹•ÜQ•áÑ•½‘•È ¥€€¬I•…‘…‰±•MÑÉ•…µ€¡Õ¹¬µ±½½À(¨Á…ÑÑ•É¸ÕÍ•…É½ÍÌÑ¡”Í•ÉÙ•È¸… ¡•±Á•È¡…¹‘±•ÌÑ¡”ÍÑÉ•…µ¥¹œµ‘•½‘”(¨‰½Õ¹‘…Éä½ÉÉ•Ñ±ä€¡™¥¹…°•µÁÑä‘•½‘•È¹‘•½‘” ¥€™±ÕÍ Í¼…¹ä¥¹½µÁ±•Ñ”(¨ÑÉ…¥±¥¹œUQ´àÍ•ÅÕ•¹”¥ÌÉ•Á½ÉÑ•¤¸(¨(¨M¥Ñ•ÌÝ¥Ñ …‘‘¥Ñ¥½¹…°±½…µ‰•…É¥¹œ‰•¡…Ù¥½ÕÈ€¡±¥¹”µ‰Õ™™•É•ÑÉ…¹Í™½ÉµÌ°(¨É…Üµ‰åÑ”…ÕµÕ±…Ñ½ÉÌ°µ¥á•ÍÑÉ¥¹œ½U¥¹ÐáÉÉ…äÍÑÉ•…µÌ°…¡”µ­•ä‰½‘ä(¨…¹½¹¥…±¥Í…Ñ¥½¸¤¥¹Ñ•¹Ñ¥½¹…±±äÍÑ¥±°¥¹±¥¹”Ñ¡•¥È½Ý¸‘•½‘•È¸(¨¼(¼¨¨(¨É…¥¸„UQ´à‰åÑ”ÍÑÉ•…´…¹É•ÑÕÉ¸Ñ¡”™Õ±°‘•½‘•Ñ•áÐ¸Q¡”ÍÑÉ•…´(¨É•…‘•È¥ÌÉ•±•…Í•½¸‰½Ñ ÍÕ•ÍÌ…¹™…¥±ÕÉ”¸(¨¼)…Íå¹Œ™Õ¹Ñ¥½¸É•…‘MÑÉ•…µÍQ•áÐ¡ÍÑÉ•…´¤ì(%½¹ÍÐÉ•…‘•È€ôÍÑÉ•…´¹•ÑI•…‘•È ¤ì(%½¹ÍÐ‘•½‘•È€ô¹•ÜQ•áÑ•½‘•È ¤ì(%½¹ÍÐ¡Õ¹­Ì€ômtì(%ÑÉäì($%™½È€ ìì¤ì($$%½¹ÍÐì‘½¹”°Ù…±Õ”ô€ô…Ý…¥ÐÉ•…‘•È¹É•… ¤ì($$%¥˜€¡‘½¹”¤‰É•…¬ì($$%¡Õ¹­Ì¹ÁÕÍ ¡‘•½‘•È¹‘•½‘”¡Ù…±Õ”°ìÍÑÉ•…´èÑÉÕ”ô¤¤ì($%ô($%¡Õ¹­Ì¹ÁÕÍ ¡‘•½‘•È¹‘•½‘” ¤¤ì($%É•ÑÕÉ¸¡Õ¹­Ì¹©½¥¸ ˆˆ¤ì(%ô™¥¹…±±äì($%É•…‘•È¹É•±•…Í•1½¬ ¤ì(%ô)ô(¼¨¨(¨É…¥¸„UQ´à‰åÑ”ÍÑÉ•…´ÕÀÑ¼µ…á	åÑ•Í€½˜€©É…Ü¨¥¹ÁÕÐ°É•ÑÕÉ¹¥¹œÑ¡”(¨‘•½‘•Ñ•áÐ¸%˜Ñ¡”É…ÜÍ¥é”±¥µ¥Ð¥Ì•á••‘•°Ñ¡”É•…‘•È¥Ì…¹•±±•(¨…¹½¹1¥µ¥Ñá••‘•‘€¥Ì¥¹Ù½­•ì¥Ð5UMPÑ¡É½ÜƒŠP¥ÑÌÉ•ÑÕÉ¸ÑåÁ”¥Ì(¨¹•Ù•É€Ñ¼•¹™½É”Ñ¡…Ð¸… …±±•ÈÁ…ÍÍ•Ì¥ÑÌ½Ý¸•ÉÉ½ÈÑåÁ”¸(¨(¨Q¡”Í¥é”¡•¬¥Ì½¸É…Ü‰åÑ•Ì€¡ÁÉ”µ‘•½‘”¤Ñ¼‰½Õ¹µ•µ½Éä‰•™½É”(¨Á…å¥¹œÑ¡”‘•½‘•È½ÍÐ¸(¨¼)…Íå¹Œ™Õ¹Ñ¥½¸É•…‘MÑÉ•…µÍQ•áÑ]¥Ñ¡1¥µ¥Ð¡ÍÑÉ•…´°µ…á	åÑ•Ì°½¹1¥µ¥Ñá••‘•¤ì(%½¹ÍÐÉ•…‘•È€ôÍÑÉ•…´¹•ÑI•…‘•È ¤ì(%½¹ÍÐ‘•½‘•È€ô¹•ÜQ•áÑ•½‘•È ¤ì(%½¹ÍÐ¡Õ¹­Ì€ômtì(%±•ÐÑ½Ñ…±M¥é”€ô€Àì(%ÑÉäì($%™½È€ ìì¤ì($$%½¹ÍÐÉ•ÍÕ±Ð€ô…Ý…¥ÐÉ•…‘•È¹É•… ¤ì($$%¥˜€¡É•ÍÕ±Ð¹‘½¹”¤‰É•…¬ì($$%Ñ½Ñ…±M¥é”€¬ôÉ•ÍÕ±Ð¹Ù…±Õ”¹‰åÑ•1•¹Ñ ì($$%¥˜€¡Ñ½Ñ…±M¥é”€øµ…á	åÑ•Ì¤ì($$$%…Ý…¥ÐÉ•…‘•È¹…¹•° ¤ì($$$%½¹1¥µ¥Ñá••‘• ¤ì($$%ô($$%¡Õ¹­Ì¹ÁÕÍ ¡‘•½‘•È¹‘•½‘”¡É•ÍÕ±Ð¹Ù…±Õ”°ìÍÑÉ•…´èÑÉÕ”ô¤¤ì($%ô($%¡Õ¹­Ì¹ÁÕÍ ¡‘•½‘•È¹‘•½‘” ¤¤ì($%É•ÑÕÉ¸¡Õ¹­Ì¹©½¥¸ ˆˆ¤ì(%ô™¥¹…±±äì($%É•…‘•È¹É•±•…Í•1½¬ ¤ì(%ô)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½Í•ÉÙ•Èµ…Ñ¥½¸µ¹½Ðµ™½Õ¹¹©Ì)Ù…ÈMIYI}Q%=9}9=Q}=U9}=L€ô€‰¡ÑÑÁÌè¼½¹•áÑ©Ì¹½Éœ½‘½Ì½µ•ÍÍ…•Ì½™…¥±•µÑ¼µ™¥¹µÍ•ÉÙ•Èµ…Ñ¥½¸ˆì)Ù…ÈMIYI}Q%=9}9=Q}=U9}	=d€ô€‰M•ÉÙ•È…Ñ¥½¸¹½Ð™½Õ¹¸ˆì)™Õ¹Ñ¥½¸•ÑM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘AÉ•™¥à¡…Ñ¥½¹%¤ì(%É•ÑÕÉ¸…¥±•Ñ¼™¥¹M•ÉÙ•ÈÑ¥½¸‘í…Ñ¥½¹%€ü€€ˆ‘í…Ñ¥½¹%‘ô‰€€è€ˆ‰ô¹€ì)ô)™Õ¹Ñ¥½¸•ÑM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘5•ÍÍ…”¡…Ñ¥½¹%¤ì(%É•ÑÕÉ¸€‘í•ÑM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘AÉ•™¥à¡…Ñ¥½¹%¥ôQ¡¥ÌÉ•ÅÕ•ÍÐµ¥¡Ð‰”™É½´…¸½±‘•È½È¹•Ý•È‘•Á±½åµ•¹Ð¹q¹I•…µ½É”è€‘íMIYI}Q%=9}9=Q}=U9}=Mõ€ì)ô)™Õ¹Ñ¥½¸•ÑU¹­¹½Ý¹5•ÍÍ…”¡•ÉÉ½È¤ì(%¥˜€¡•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È¤É•ÑÕÉ¸•ÉÉ½È¹µ•ÍÍ…”ì(%É•ÑÕÉ¸ÑåÁ•½˜•ÉÉ½È€ôôô€‰ÍÑÉ¥¹œˆ€ü•ÉÉ½È€è€ˆˆì)ô)™Õ¹Ñ¥½¸¥ÍM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘ÉÉ½È¡•ÉÉ½È°…Ñ¥½¹%¤ì(%½¹ÍÐµ•ÍÍ…”€ô•ÑU¹­¹½Ý¹5•ÍÍ…”¡•ÉÉ½È¤ì(%¥˜€ …µ•ÍÍ…”¤É•ÑÕÉ¸™…±Í”ì(%¥˜€ ……Ñ¥½¹%¤É•ÑÕÉ¸µ•ÍÍ…”¹ÍÑ…ÉÑÍ]¥Ñ  ‰…¥±•Ñ¼™¥¹M•ÉÙ•ÈÑ¥½¸ˆ¤ì(%¥˜€¡µ•ÍÍ…”¹ÍÑ…ÉÑÍ]¥Ñ ¡•ÑM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘AÉ•™¥à¡…Ñ¥½¹%¤¤¤É•ÑÕÉ¸ÑÉÕ”ì(%É•ÑÕÉ¸	½½±•…¸¡…Ñ¥½¹%€˜˜µ•ÍÍ…”¹¥¹±Õ‘•Ì¡mÙ¥Ñ”µÉÍt¥¹Ù…±¥Í•ÉÙ•ÈÉ•™•É•¹”€œ‘í…Ñ¥½¹%‘ô€¤¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•M•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘I•ÍÁ½¹Í” ¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡MIYI}Q%=9}9=Q}=U9}	=d°ì($%ÍÑ…ÑÕÌè€ÐÀÐ°($%¡•…‘•ÉÌèì($$%m9aQ)M}Q%=9}9=Q}=U9}!Itè€ˆÄˆ°($$$‰½¹Ñ•¹ÐµÑåÁ”ˆè€‰Ñ•áÐ½Á±…¥¸ˆ($%ô(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µÁ…É…µÌ¹©Ì)™Õ¹Ñ¥½¸•ÑÁÁA…•M•µ•¹ÑA…É…µ9…µ”¡Í•µ•¹Ð¤ì(%¥˜€¡Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰ml¸¸¸ˆ¤€˜˜Í•µ•¹Ð¹•¹‘Í]¥Ñ  ‰utˆ¤€˜˜Í•µ•¹Ð¹±•¹Ñ €ø€Ü¤É•ÑÕÉ¸Í•µ•¹Ð¹Í±¥” Ô°€´È¤ì(%¥˜€¡Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰l¸¸¸ˆ¤€˜˜Í•µ•¹Ð¹•¹‘Í]¥Ñ  ‰tˆ¤€˜˜Í•µ•¹Ð¹±•¹Ñ €ø€Ô¤É•ÑÕÉ¸Í•µ•¹Ð¹Í±¥” Ð°€´Ä¤ì(%¥˜€¡Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰lˆ¤€˜˜Í•µ•¹Ð¹•¹‘Í]¥Ñ  ‰tˆ¤€˜˜€…Í•µ•¹Ð¹¥¹±Õ‘•Ì ˆ¸ˆ¤€˜˜Í•µ•¹Ð¹±•¹Ñ €ø€È¤É•ÑÕÉ¸Í•µ•¹Ð¹Í±¥” Ä°€´Ä¤ì(%É•ÑÕÉ¸¹Õ±°ì)ô)™Õ¹Ñ¥½¸¥ÍµÁÑå=ÁÑ¥½¹…±…Ñ¡±°¡Í•µ•¹Ð°Á…É…µY…±Õ”¤ì(%É•ÑÕÉ¸Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰ml¸¸¸ˆ¤€˜˜ÉÉ…ä¹¥ÍÉÉ…ä¡Á…É…µY…±Õ”¤€˜˜Á…É…µY…±Õ”¹±•¹Ñ €ôôô€Àì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•M•µ•¹ÑA…É…µÌ¡É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸°µ…Ñ¡•‘A…É…µÌ¤ì(%½¹ÍÐÍ•µ•¹ÑA…É…µÌ€ôíôì(%½¹ÍÐÍ•µ•¹ÑÌ€ôÉ½ÕÑ•M•µ•¹ÑÌ€üümtì(%½¹ÍÐ•¹€ô5…Ñ ¹µ¥¸¡5…Ñ ¹µ…à¡ÑÉ••A½Í¥Ñ¥½¸°€À¤°Í•µ•¹ÑÌ¹±•¹Ñ ¤ì(%™½È€¡±•Ð¥¹‘•à€ô€Àì¥¹‘•à€ð•¹ì¥¹‘•à¬¬¤ì($%½¹ÍÐÍ•µ•¹Ð€ôÍ•µ•¹ÑÍm¥¹‘•átì($%½¹ÍÐÁ…É…µ9…µ”€ô•ÑÁÁA…•M•µ•¹ÑA…É…µ9…µ”¡Í•µ•¹Ð¤ì($%¥˜€ …Á…É…µ9…µ”¤½¹Ñ¥¹Õ”ì($%½¹ÍÐÁ…É…µY…±Õ”€ôµ…Ñ¡•‘A…É…µÍmÁ…É…µ9…µ•tì($%¥˜€¡Á…É…µY…±Õ”€ôôôÙ½¥€Àñð¥ÍµÁÑå=ÁÑ¥½¹…±…Ñ¡±°¡Í•µ•¹Ð°Á…É…µY…±Õ”¤¤½¹Ñ¥¹Õ”ì($%Í•µ•¹ÑA…É…µÍmÁ…É…µ9…µ•t€ôÁ…É…µY…±Õ”ì(%ô(%É•ÑÕÉ¸Í•µ•¹ÑA…É…µÌì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µÉ•ÅÕ•ÍÐ¹©Ì)™Õ¹Ñ¥½¸Á¥­I½ÕÑ•A…É…µÌ¡µ…Ñ¡•‘A…É…µÌ°É½ÕÑ•A…É…µ9…µ•Ì¤ì(%½¹ÍÐÁ…É…µÌ€ôíôì(%™½È€¡½¹ÍÐÁ…É…µ9…µ”½˜É½ÕÑ•A…É…µ9…µ•Ì¤ì($%½¹ÍÐÙ…±Õ”€ôµ…Ñ¡•‘A…É…µÍmÁ…É…µ9…µ•tì($%¥˜€¡Ù…±Õ”€„ôôÙ½¥€À¤Á…É…µÍmÁ…É…µ9…µ•t€ôÙ…±Õ”ì(%ô(%É•ÑÕÉ¸Á…É…µÌì)ô)™Õ¹Ñ¥½¸½±±•ÑA…É•¹ÑA…É…µ9…µ•Ì¡É½ÕÑ•M•µ•¹ÑÌ°‰½Õ¹‘…ÉåA½Í¥Ñ¥½¸¤ì(%½¹ÍÐ±¥µ¥Ð€ô5…Ñ ¹µ…à À°5…Ñ ¹µ¥¸¡‰½Õ¹‘…ÉåA½Í¥Ñ¥½¸°É½ÕÑ•M•µ•¹ÑÌ¹±•¹Ñ ¤¤ì(%½¹ÍÐ¹…µ•Ì€ômtì(%™½È€¡½¹ÍÐÍ•µ•¹Ð½˜É½ÕÑ•M•µ•¹ÑÌ¹Í±¥” À°±¥µ¥Ð¤¤ì($%½¹ÍÐ¹…µ”€ô•ÑÁÁA…•M•µ•¹ÑA…É…µ9…µ”¡Í•µ•¹Ð¤ì($%¥˜€¡¹…µ”€˜˜€…¹…µ•Ì¹¥¹±Õ‘•Ì¡¹…µ”¤¤¹…µ•Ì¹ÁÕÍ ¡¹…µ”¤ì(%ô(%É•ÑÕÉ¸¹…µ•Ìì)ô)™Õ¹Ñ¥½¸•Ñ1…å½ÕÑ•¹•É…Ñ•MÑ…Ñ¥A…É…µÍ	½Õ¹‘…Éä¡±…å½ÕÑQÉ••A½Í¥Ñ¥½¸¤ì(%É•ÑÕÉ¸€¡±…å½ÕÑQÉ••A½Í¥Ñ¥½¸€üü€À¤€´€Äì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…••¹•É…Ñ•MÑ…Ñ¥A…É…µÍM½ÕÉ•Ì¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÍ½ÕÉ•Ì€ômtì(%½ÁÑ¥½¹Ì¹±…å½ÕÑÌü¹™½É…  ¡±…å½ÕÐ°¥¹‘•à¤€ôøì($%¥˜€¡ÑåÁ•½˜±…å½ÕÐü¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ€„ôô€‰™Õ¹Ñ¥½¸ˆ¤É•ÑÕÉ¸ì($%Í½ÕÉ•Ì¹ÁÕÍ ¡ì($$%•¹•É…Ñ•MÑ…Ñ¥A…É…µÌè±…å½ÕÐ¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ°($$%Á…É•¹ÑA…É…µ9…µ•Ìè½±±•ÑA…É•¹ÑA…É…µ9…µ•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ°•Ñ1…å½ÕÑ•¹•É…Ñ•MÑ…Ñ¥A…É…µÍ	½Õ¹‘…Éä¡½ÁÑ¥½¹Ì¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹m¥¹‘•át¤¤($%ô¤ì(%ô¤ì(%¥˜€¡ÑåÁ•½˜½ÁÑ¥½¹Ì¹Á…”ü¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ€ôôô€‰™Õ¹Ñ¥½¸ˆ¤Í½ÕÉ•Ì¹ÁÕÍ ¡ì($%•¹•É…Ñ•MÑ…Ñ¥A…É…µÌè½ÁÑ¥½¹Ì¹Á…”¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ°($%Á…É•¹ÑA…É…µ9…µ•Ìè½±±•ÑA…É•¹ÑA…É…µ9…µ•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ°5…Ñ ¹µ…à À°½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ¹±•¹Ñ €´€Ä¤¤(%ô¤ì(%É•ÑÕÉ¸Í½ÕÉ•Ìì)ô)™Õ¹Ñ¥½¸…É•MÑ…Ñ¥A…É…µÍ±±½Ý•¡Á…É…µÌ°ÍÑ…Ñ¥A…É…µÌ¤ì(%½¹ÍÐÁ…É…µ-•åÌ€ô=‰©•Ð¹­•åÌ¡Á…É…µÌ¤ì(%É•ÑÕÉ¸ÍÑ…Ñ¥A…É…µÌ¹Í½µ” ¡ÍÑ…Ñ¥A…É…µM•Ð¤€ôøÁ…É…µ-•åÌ¹•Ù•Éä ¡­•ä¤€ôøì($%½¹ÍÐÙ…±Õ”€ôÁ…É…µÍm­•åtì($%½¹ÍÐÍÑ…Ñ¥Y…±Õ”€ôÍÑ…Ñ¥A…É…µM•Ñm­•åtì($%¥˜€¡ÍÑ…Ñ¥Y…±Õ”€ôôôÙ½¥€À¤É•ÑÕÉ¸ÑÉÕ”ì($%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤¤É•ÑÕÉ¸)M=8¹ÍÑÉ¥¹¥™ä¡Ù…±Õ”¤€ôôô)M=8¹ÍÑÉ¥¹¥™ä¡ÍÑ…Ñ¥Y…±Õ”¤ì($%¥˜€¡ÑåÁ•½˜ÍÑ…Ñ¥Y…±Õ”€ôôô€‰ÍÑÉ¥¹œˆñðÑåÁ•½˜ÍÑ…Ñ¥Y…±Õ”€ôôô€‰¹Õµ‰•ÈˆñðÑåÁ•½˜ÍÑ…Ñ¥Y…±Õ”€ôôô€‰‰½½±•…¸ˆ¤É•ÑÕÉ¸MÑÉ¥¹œ¡Ù…±Õ”¤€ôôôMÑÉ¥¹œ¡ÍÑ…Ñ¥Y…±Õ”¤ì($%É•ÑÕÉ¸)M=8¹ÍÑÉ¥¹¥™ä¡Ù…±Õ”¤€ôôô)M=8¹ÍÑÉ¥¹¥™ä¡ÍÑ…Ñ¥Y…±Õ”¤ì(%ô¤¤ì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é••¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¡•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¤ì(%É•ÑÕÉ¸€¡ÉÉ…ä¹¥ÍÉÉ…ä¡•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¤€ü•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ€èm•¹•É…Ñ•MÑ…Ñ¥A…É…µÍt¤¹™±…Ñ5…À ¡Í½ÕÉ”¤€ôøì($%¥˜€¡ÑåÁ•½˜Í½ÕÉ”€ôôô€‰™Õ¹Ñ¥½¸ˆ¤É•ÑÕÉ¸mì($$%•¹•É…Ñ•MÑ…Ñ¥A…É…µÌèÍ½ÕÉ”°($$%Á…É•¹ÑA…É…µ9…µ•Ìèmt($%õtì($%¥˜€¡ÑåÁ•½˜Í½ÕÉ”ü¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ€ôôô€‰™Õ¹Ñ¥½¸ˆ¤É•ÑÕÉ¸mÍ½ÕÉ•tì($%É•ÑÕÉ¸mtì(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸Ù…±¥‘…Ñ•ÁÁA…•å¹…µ¥A…É…µÌ¡½ÁÑ¥½¹Ì¤ì(%¥˜€ …½ÁÑ¥½¹Ì¹•¹™½É•MÑ…Ñ¥A…É…µÍ=¹±äñð€…½ÁÑ¥½¹Ì¹¥Íå¹…µ¥I½ÕÑ”¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ•¹•É…Ñ•MÑ…Ñ¥A…É…µÍM½ÕÉ•Ì€ô¹½Éµ…±¥é••¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¡½ÁÑ¥½¹Ì¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¤ì(%¥˜€¡•¹•É…Ñ•MÑ…Ñ¥A…É…µÍM½ÕÉ•Ì¹±•¹Ñ €ôôô€À¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸¹½Ñ½Õ¹‘I•ÍÁ½¹Í” ¤ì(%ô(%™½È€¡½¹ÍÐÍ½ÕÉ”½˜•¹•É…Ñ•MÑ…Ñ¥A…É…µÍM½ÕÉ•Ì¤ì($%½¹ÍÐÍÑ…Ñ¥A…É…µÌ€ô…Ý…¥ÐÉÕ¹]¥Ñ¡•Ñ¡•‘ÕÁ”  ¤€ôøÍ½ÕÉ”¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¡ìÁ…É…µÌèÁ¥­I½ÕÑ•A…É…µÌ¡½ÁÑ¥½¹Ì¹Á…É…µÌ°Í½ÕÉ”¹Á…É•¹ÑA…É…µ9…µ•Ì¤ô¤¤ì($%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡ÍÑ…Ñ¥A…É…µÌ¤€˜˜€……É•MÑ…Ñ¥A…É…µÍ±±½Ý•¡½ÁÑ¥½¹Ì¹Á…É…µÌ°ÍÑ…Ñ¥A…É…µÌ¤¤ì($$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%É•ÑÕÉ¸¹½Ñ½Õ¹‘I•ÍÁ½¹Í” ¤ì($%ô(%ô(%É•ÑÕÉ¸¹Õ±°ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•%¹Ñ•É•ÁÑMÑ…Ñ”¡½ÁÑ¥½¹Ì¤ì(%¥˜€ …½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ¤É•ÑÕÉ¸ì­¥¹è€‰¹½¹”ˆôì(%½¹ÍÐ¥¹Ñ•É•ÁÐ€ô½ÁÑ¥½¹Ì¹™¥¹‘%¹Ñ•É•ÁÐ¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì(%¥˜€ …¥¹Ñ•É•ÁÐ¤É•ÑÕÉ¸ì­¥¹è€‰¹½¹”ˆôì(%½¹ÍÐÍ½ÕÉ•I½ÕÑ”€ô½ÁÑ¥½¹Ì¹•ÑM½ÕÉ•I½ÕÑ”¡¥¹Ñ•É•ÁÐ¹Í½ÕÉ•I½ÕÑ•%¹‘•à¤ì(%¥˜€ …Í½ÕÉ•I½ÕÑ”¤É•ÑÕÉ¸ì­¥¹è€‰¹½¹”ˆôì(%¥˜€¡Í½ÕÉ•I½ÕÑ”€ôôô½ÁÑ¥½¹Ì¹ÕÉÉ•¹ÑI½ÕÑ”¤É•ÑÕÉ¸ì($%­¥¹è€‰ÕÉÉ•¹ÐµÉ½ÕÑ”ˆ°($%¥¹Ñ•É•ÁÐ(%ôì(%É•ÑÕÉ¸ì($%­¥¹è€‰Í½ÕÉ”µÉ½ÕÑ”ˆ°($%¥¹Ñ•É•ÁÐ°($%Í½ÕÉ•I½ÕÑ”(%ôì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ¥¹Ñ•É•ÁÑMÑ…Ñ”€ôÉ•Í½±Ù•ÁÁA…•%¹Ñ•É•ÁÑMÑ…Ñ”¡ì($%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($%ÕÉÉ•¹ÑI½ÕÑ”è½ÁÑ¥½¹Ì¹ÕÉÉ•¹ÑI½ÕÑ”°($%™¥¹‘%¹Ñ•É•ÁÐè½ÁÑ¥½¹Ì¹™¥¹‘%¹Ñ•É•ÁÐ°($%•ÑI½ÕÑ•A…É…µ9…µ•Ìè½ÁÑ¥½¹Ì¹•ÑI½ÕÑ•A…É…µ9…µ•Ì°($%•ÑM½ÕÉ•I½ÕÑ”è½ÁÑ¥½¹Ì¹•ÑM½ÕÉ•I½ÕÑ”°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%Ñ½%¹Ñ•É•ÁÑ=ÁÑÌè½ÁÑ¥½¹Ì¹Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ(%ô¤ì(%¥˜€¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹­¥¹€ôôô€‰Í½ÕÉ”µÉ½ÕÑ”ˆ¤É•ÑÕÉ¸ì($%¥¹Ñ•É•ÁÑ=ÁÑÌè½ÁÑ¥½¹Ì¹Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¤°($%¹…Ù¥…Ñ¥½¹A…É…µÌè¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¹µ…Ñ¡•‘A…É…µÌ°($%Á…É…µÌèÁ¥­I½ÕÑ•A…É…µÌ¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¹µ…Ñ¡•‘A…É…µÌ°½ÁÑ¥½¹Ì¹•ÑI½ÕÑ•A…É…µ9…µ•Ì¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹Í½ÕÉ•I½ÕÑ”¤¤°($%É½ÕÑ”è¥¹Ñ•É•ÁÑMÑ…Ñ”¹Í½ÕÉ•I½ÕÑ”(%ôì(%É•ÑÕÉ¸ì($%¥¹Ñ•É•ÁÑ=ÁÑÌè¥¹Ñ•É•ÁÑMÑ…Ñ”¹­¥¹€ôôô€‰ÕÉÉ•¹ÐµÉ½ÕÑ”ˆ€ü½ÁÑ¥½¹Ì¹Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¤€èÙ½¥€À°($%¹…Ù¥…Ñ¥½¹A…É…µÌè½ÁÑ¥½¹Ì¹ÕÉÉ•¹ÑA…É…µÌ°($%Á…É…µÌè½ÁÑ¥½¹Ì¹ÕÉÉ•¹ÑA…É…µÌ°($%É½ÕÑ”è½ÁÑ¥½¹Ì¹ÕÉÉ•¹ÑI½ÕÑ”(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•%¹Ñ•É•ÁÐ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ¥¹Ñ•É•ÁÑMÑ…Ñ”€ôÉ•Í½±Ù•ÁÁA…•%¹Ñ•É•ÁÑMÑ…Ñ”¡ì($%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($%ÕÉÉ•¹ÑI½ÕÑ”è½ÁÑ¥½¹Ì¹ÕÉÉ•¹ÑI½ÕÑ”°($%™¥¹‘%¹Ñ•É•ÁÐè½ÁÑ¥½¹Ì¹™¥¹‘%¹Ñ•É•ÁÐ°($%•ÑI½ÕÑ•A…É…µ9…µ•Ìè½ÁÑ¥½¹Ì¹•ÑI½ÕÑ•A…É…µ9…µ•Ì°($%•ÑM½ÕÉ•I½ÕÑ”è½ÁÑ¥½¹Ì¹•ÑM½ÕÉ•I½ÕÑ”°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%Ñ½%¹Ñ•É•ÁÑ=ÁÑÌè½ÁÑ¥½¹Ì¹Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ(%ô¤ì(%¥˜€¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹­¥¹€ôôô€‰Í½ÕÉ”µÉ½ÕÑ”ˆ¤ì($%½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡ì($$%Á…É…µÌè¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¹µ…Ñ¡•‘A…É…µÌ°($$%Á…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%Í•…É¡A…É…µÌè½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ($%ô¤ì($%½¹ÍÐ¥¹Ñ•É•ÁÑ±•µ•¹Ð€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•±•µ•¹Ð¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹Í½ÕÉ•I½ÕÑ”°Á¥­I½ÕÑ•A…É…µÌ¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¹µ…Ñ¡•‘A…É…µÌ°½ÁÑ¥½¹Ì¹•ÑI½ÕÑ•A…É…µ9…µ•Ì¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹Í½ÕÉ•I½ÕÑ”¤¤°½ÁÑ¥½¹Ì¹Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¤°½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ¤ì($%É•ÑÕÉ¸ì($$%¥¹Ñ•É•ÁÑ=ÁÑÌèÙ½¥€À°($$%É•ÍÁ½¹Í”è…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•É%¹Ñ•É•ÁÑI•ÍÁ½¹Í”¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹Í½ÕÉ•I½ÕÑ”°¥¹Ñ•É•ÁÑ±•µ•¹Ð¤($%ôì(%ô(%É•ÑÕÉ¸ì($%¥¹Ñ•É•ÁÑ=ÁÑÌè¥¹Ñ•É•ÁÑMÑ…Ñ”¹­¥¹€ôôô€‰ÕÉÉ•¹ÐµÉ½ÕÑ”ˆ€ü½ÁÑ¥½¹Ì¹Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ¡¥¹Ñ•É•ÁÑMÑ…Ñ”¹¥¹Ñ•É•ÁÐ¤€èÙ½¥€À°($%É•ÍÁ½¹Í”è¹Õ±°(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•±•µ•¹Ð¡½ÁÑ¥½¹Ì¤ì(%ÑÉäì($%É•ÑÕÉ¸ì($$%•±•µ•¹Ðè…Ý…¥Ð½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•±•µ•¹Ð ¤°($$%É•ÍÁ½¹Í”è¹Õ±°($%ôì(%ô…Ñ €¡•ÉÉ½È¤ì($%½¹ÍÐÍÁ•¥…±ÉÉ½È€ô½ÁÑ¥½¹Ì¹É•Í½±Ù•MÁ•¥…±ÉÉ½È¡•ÉÉ½È¤ì($%¥˜€¡ÍÁ•¥…±ÉÉ½È¤É•ÑÕÉ¸ì($$%•±•µ•¹Ðè¹Õ±°°($$%É•ÍÁ½¹Í”è…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉMÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤($%ôì($%½¹ÍÐ•ÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåA…”¡•ÉÉ½È¤ì($%¥˜€¡•ÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”¤É•ÑÕÉ¸ì($$%•±•µ•¹Ðè¹Õ±°°($$%É•ÍÁ½¹Í”è•ÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”($%ôì($%Ñ¡É½Ü•ÉÉ½Èì(%ô)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÍ•ÉÙ•Èµ…Ñ¥½¸µ•á•ÕÑ¥½¸¹©Ì(¼¨¨(¨5…Ñ¡•Ì9•áÐ¹©ÌœÍ•ÉÙ•È…Ñ¥½¸…ÉÕµ•¹Ð…ÀÑ¼ÁÉ•Ù•¹ÐÍÑ…¬½Ù•É™±½Ü¥¸(¨Õ¹Ñ¥½¸¹ÁÉ½Ñ½ÑåÁ”¹…ÁÁ±äÝ¡•¸‘•½‘¥¹œ¡½ÍÑ¥±”…Ñ¥½¸Á…å±½…‘Ì¸(¨¼)Ù…ÈMIYI}Q%=9}IM}1%5%P€ô€Å”Ìì)Ù…ÈQ%=9}%}9=Q}IY1%Q€ô€Àì)Ù…ÈQ%=9}%}IY1%Q}MQQ%}9}e95%€ô€Äì)™Õ¹Ñ¥½¸Í•ÑÑ¥½¹I•Ù…±¥‘…Ñ•‘!•…‘•È¡¡•…‘•ÉÌ°­¥¹¤ì(%¥˜€¡­¥¹€ôôôQ%=9}%}9=Q}IY1%Q¤É•ÑÕÉ¸ì(%¡•…‘•ÉÌ¹Í•Ð¡Q%=9}IY1%Q}!H°)M=8¹ÍÑÉ¥¹¥™ä¡­¥¹¤¤ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹¡¡…Í5½‘¥™¥•‘½½­¥•Ì¤ì(%½¹ÍÐÉ•Ù…±¥‘…Ñ¥½¹-¥¹€ô•Ñ¹‘±•…ÉÑ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹ ¤ì(%¥˜€¡¡…Í5½‘¥™¥•‘½½­¥•Ì¤É•ÑÕÉ¸Q%=9}%}IY1%Q}MQQ%}9}e95%ì(%É•ÑÕÉ¸É•Ù…±¥‘…Ñ¥½¹-¥¹ì)ô)™Õ¹Ñ¥½¸¥ÍI•ÅÕ•ÍÑ	½‘åQ½½1…É”¡•ÉÉ½È¤ì(%É•ÑÕÉ¸•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€˜˜•ÉÉ½È¹µ•ÍÍ…”€ôôô€‰I•ÅÕ•ÍÐ‰½‘äÑ½¼±…É”ˆì)ô)™Õ¹Ñ¥½¸¥ÍÁÁM•ÉÙ•ÉÑ¥½¹Õ¹Ñ¥½¸¡…Ñ¥½¸¤ì(%É•ÑÕÉ¸ÑåÁ•½˜…Ñ¥½¸€ôôô€‰™Õ¹Ñ¥½¸ˆì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•ÉÉ½È¡•ÉÉ½È¤ì(%É•ÑÕÉ¸•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€ü•ÉÉ½È€è¹•ÜÉÉ½È¡MÑÉ¥¹œ¡•ÉÉ½È¤¤ì)ô)™Õ¹Ñ¥½¸Ù…±¥‘…Ñ•M•ÉÙ•ÉÑ¥½¹ÉÌ¡…ÉÌ¤ì(%¥˜€¡…ÉÌ¹±•¹Ñ €øMIYI}Q%=9}IM}1%5%P¤Ñ¡É½Ü¹•ÜÉÉ½È¡M•ÉÙ•ÈÑ¥½¸…ÉÕµ•¹ÑÌ±¥ÍÐ¥ÌÑ½¼±½¹œ€ ‘í…ÉÌ¹±•¹Ñ¡ô¤¸5…á¥µÕ´…±±½Ý•¥Ì€‘íMIYI}Q%=9}IM}1%5%Qô¹€¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•…‘Ñ¥½¹	½‘å]¥Ñ¡1¥µ¥Ð¡É•ÅÕ•ÍÐ°µ…á	åÑ•Ì¤ì(%¥˜€ …É•ÅÕ•ÍÐ¹‰½‘ä¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸É•…‘MÑÉ•…µÍQ•áÑ]¥Ñ¡1¥µ¥Ð¡É•ÅÕ•ÍÐ¹‰½‘ä°µ…á	åÑ•Ì°€ ¤€ôøì($%Ñ¡É½Ü¹•ÜÉÉ½È ‰I•ÅÕ•ÍÐ‰½‘äÑ½¼±…É”ˆ¤ì(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•…‘Ñ¥½¹½Éµ…Ñ…]¥Ñ¡1¥µ¥Ð¡É•ÅÕ•ÍÐ°µ…á	åÑ•Ì¤ì(%¥˜€ …É•ÅÕ•ÍÐ¹‰½‘ä¤É•ÑÕÉ¸¹•Ü½Éµ…Ñ„ ¤ì(%½¹ÍÐÉ•…‘•È€ôÉ•ÅÕ•ÍÐ¹‰½‘ä¹•ÑI•…‘•È ¤ì(%½¹ÍÐ¡Õ¹­Ì€ômtì(%±•ÐÑ½Ñ…±M¥é”€ô€Àì(%™½È€ ìì¤ì($%½¹ÍÐÉ•ÍÕ±Ð€ô…Ý…¥ÐÉ•…‘•È¹É•… ¤ì($%¥˜€¡É•ÍÕ±Ð¹‘½¹”¤‰É•…¬ì($%Ñ½Ñ…±M¥é”€¬ôÉ•ÍÕ±Ð¹Ù…±Õ”¹‰åÑ•1•¹Ñ ì($%¥˜€¡Ñ½Ñ…±M¥é”€øµ…á	åÑ•Ì¤ì($$%…Ý…¥ÐÉ•…‘•È¹…¹•° ¤ì($$%Ñ¡É½Ü¹•ÜÉÉ½È ‰I•ÅÕ•ÍÐ‰½‘äÑ½¼±…É”ˆ¤ì($%ô($%¡Õ¹­Ì¹ÁÕÍ ¡É•ÍÕ±Ð¹Ù…±Õ”¤ì(%ô(%½¹ÍÐ½µ‰¥¹•€ô¹•ÜU¥¹ÐáÉÉ…ä¡Ñ½Ñ…±M¥é”¤ì(%±•Ð½™™Í•Ð€ô€Àì(%™½È€¡½¹ÍÐ¡Õ¹¬½˜¡Õ¹­Ì¤ì($%½µ‰¥¹•¹Í•Ð¡¡Õ¹¬°½™™Í•Ð¤ì($%½™™Í•Ð€¬ô¡Õ¹¬¹‰åÑ•1•¹Ñ ì(%ô(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡½µ‰¥¹•°ì¡•…‘•ÉÌèì€‰½¹Ñ•¹ÐµQåÁ”ˆèÉ•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰½¹Ñ•¹ÐµÑåÁ”ˆ¤ñð€ˆˆôô¤¹™½Éµ…Ñ„ ¤ì)ô)™Õ¹Ñ¥½¸•ÑÑ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¡•ÉÉ½È¤ì(%½¹ÍÐ‘¥•ÍÐ€ô•Ñ9•áÑÉÉ½É¥•ÍÐ¡•ÉÉ½È¤ì(%¥˜€ …‘¥•ÍÐ¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÉ•‘¥É•Ð€ôÁ…ÉÍ•9•áÑI•‘¥É•Ñ¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€¡É•‘¥É•Ð¤É•ÑÕÉ¸ì($%­¥¹è€‰É•‘¥É•Ðˆ°($%ÕÉ°èÉ•‘¥É•Ð¹ÕÉ°(%ôì(%½¹ÍÐ¡ÑÑÁÉÉ½È€ôÁ…ÉÍ•9•áÑ!ÑÑÁÉÉ½É¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€¡¡ÑÑÁÉÉ½È¤ì($%¥˜€ …9Õµ‰•È¹¥Í%¹Ñ••È¡¡ÑÑÁÉÉ½È¹ÍÑ…ÑÕÌ¤¤É•ÑÕÉ¸¹Õ±°ì($%É•ÑÕÉ¸ì($$%­¥¹è€‰ÍÑ…ÑÕÌˆ°($$%ÍÑ…ÑÕÍ½‘”è¡ÑÑÁÉÉ½È¹ÍÑ…ÑÕÌ($%ôì(%ô(%É•ÑÕÉ¸¹Õ±°ì)ô)™Õ¹Ñ¥½¸•ÑÑ¥½¹I•‘¥É•Ð¡•ÉÉ½È¤ì(%½¹ÍÐ‘¥•ÍÐ€ô•Ñ9•áÑÉÉ½É¥•ÍÐ¡•ÉÉ½È¤ì(%¥˜€ …‘¥•ÍÐ¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÉ•‘¥É•Ð€ôÁ…ÉÍ•9•áÑI•‘¥É•Ñ¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€ …É•‘¥É•Ð¤É•ÑÕÉ¸¹Õ±°ì(%É•ÑÕÉ¸ì($%ÍÑ…ÑÕÌèÉ•‘¥É•Ð¹ÍÑ…ÑÕÌ°($%ÑåÁ”èÉ•‘¥É•Ð¹ÑåÁ”€üü€‰ÁÕÍ ˆ°($%ÕÉ°èÉ•‘¥É•Ð¹ÕÉ°(%ôì)ô)™Õ¹Ñ¥½¸•ÑÑ¥½¹!ÑÑÁ…±±‰…­MÑ…ÑÕÌ¡•ÉÉ½È¤ì(%½¹ÍÐ‘¥•ÍÐ€ô•Ñ9•áÑÉÉ½É¥•ÍÐ¡•ÉÉ½È¤ì(%¥˜€ …‘¥•ÍÐ¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ¡ÑÑÁÉÉ½È€ôÁ…ÉÍ•9•áÑ!ÑÑÁÉÉ½É¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€ …¡ÑÑÁÉÉ½Èñð€…9Õµ‰•È¹¥Í%¹Ñ••È¡¡ÑÑÁÉÉ½È¹ÍÑ…ÑÕÌ¤¤É•ÑÕÉ¸¹Õ±°ì(%É•ÑÕÉ¸¡ÑÑÁÉÉ½È¹ÍÑ…ÑÕÌì)ô)™Õ¹Ñ¥½¸É•…Ñ•M•ÉÙ•ÉÑ¥½¹ÉÉ½ÉI•ÍÁ½¹Í”¡•ÉÉ½È°½ÁÑ¥½¹Ì¤ì(%½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì(%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑtM•ÉÙ•È…Ñ¥½¸•ÉÉ½Èèˆ°•ÉÉ½È¤ì(%½ÁÑ¥½¹Ì¹É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È¡¹½Éµ…±¥é•ÉÉ½È¡•ÉÉ½È¤°ì($%Á…Ñ è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($%µ•Ñ¡½è½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹µ•Ñ¡½°($%¡•…‘•ÉÌè=‰©•Ð¹™É½µ¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•¹ÑÉ¥•Ì ¤¤(%ô°ì($%É½ÕÑ•É-¥¹è€‰ÁÀI½ÕÑ•Èˆ°($%É½ÕÑ•A…Ñ è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($%É½ÕÑ•QåÁ”è€‰…Ñ¥½¸ˆ(%ô¤ì(%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%É•ÑÕÉ¸¥¹Ñ•É¹…±M•ÉÙ•ÉÉÉ½ÉI•ÍÁ½¹Í”¡Ù½¥€À¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•Ñ¥½¹9½Ñ½Õ¹‘I•ÍÁ½¹Í”¡…Ñ¥½¹%°½ÁÑ¥½¹Ì¤ì(%½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì(%½¹Í½±”¹Ý…É¸¡•ÑM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘5•ÍÍ…”¡…Ñ¥½¹%¤¤ì(%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%É•ÑÕÉ¸É•…Ñ•M•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘I•ÍÁ½¹Í” ¤ì)ô)™Õ¹Ñ¥½¸¥ÍAÉ½É•ÍÍ¥Ù•M•ÉÙ•ÉÑ¥½¹I•ÅÕ•ÍÐ¡É•ÅÕ•ÍÐ°½¹Ñ•¹ÑQåÁ”°…Ñ¥½¹%¤ì(%É•ÑÕÉ¸É•ÅÕ•ÍÐ¹µ•Ñ¡½¹Ñ½UÁÁ•É…Í” ¤€ôôô€‰A=MPˆ€˜˜½¹Ñ•¹ÑQåÁ”¹ÍÑ…ÉÑÍ]¥Ñ  ‰µÕ±Ñ¥Á…ÉÐ½™½É´µ‘…Ñ„ˆ¤€˜˜€……Ñ¥½¹%ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸¡…¹‘±•AÉ½É•ÍÍ¥Ù•M•ÉÙ•ÉÑ¥½¹I•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¤ì(%¥˜€ …¥ÍAÉ½É•ÍÍ¥Ù•M•ÉÙ•ÉÑ¥½¹I•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°½ÁÑ¥½¹Ì¹½¹Ñ•¹ÑQåÁ”°½ÁÑ¥½¹Ì¹…Ñ¥½¹%¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÍÉ™I•ÍÁ½¹Í”€ôÙ…±¥‘…Ñ•ÍÉ™=É¥¥¸¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°½ÁÑ¥½¹Ì¹…±±½Ý•‘=É¥¥¹Ì¤ì(%¥˜€¡ÍÉ™I•ÍÁ½¹Í”¤É•ÑÕÉ¸ÍÉ™I•ÍÁ½¹Í”ì(%¥˜€¡Á…ÉÍ•%¹Ð¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰½¹Ñ•¹Ðµ±•¹Ñ ˆ¤ñð€ˆÀˆ°€ÄÀ¤€ø½ÁÑ¥½¹Ì¹µ…áÑ¥½¹	½‘åM¥é”¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸Á…å±½…‘Q½½1…É•I•ÍÁ½¹Í” ¤ì(%ô(%ÑÉäì($%±•Ð‰½‘äì($%ÑÉäì($$%‰½‘ä€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•…‘½Éµ…Ñ…]¥Ñ¡1¥µ¥Ð¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹±½¹” ¤°½ÁÑ¥½¹Ì¹µ…áÑ¥½¹	½‘åM¥é”¤ì($%ô…Ñ €¡•ÉÉ½È¤ì($$%¥˜€¡¥ÍI•ÅÕ•ÍÑ	½‘åQ½½1…É”¡•ÉÉ½È¤¤ì($$$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%É•ÑÕÉ¸Á…å±½…‘Q½½1…É•I•ÍÁ½¹Í” ¤ì($$%ô($$%Ñ¡É½Ü•ÉÉ½Èì($%ô($%½¹ÍÐÁ…å±½…‘I•ÍÁ½¹Í”€ô…Ý…¥ÐÙ…±¥‘…Ñ•M•ÉÙ•ÉÑ¥½¹A…å±½…¡‰½‘ä¤ì($%¥˜€¡Á…å±½…‘I•ÍÁ½¹Í”¤ì($$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%É•ÑÕÉ¸Á…å±½…‘I•ÍÁ½¹Í”ì($%ô($%½¹ÍÐ…Ñ¥½¸€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹‘•½‘•Ñ¥½¸¡‰½‘ä¤ì($%¥˜€ …¥ÍÁÁM•ÉÙ•ÉÑ¥½¹Õ¹Ñ¥½¸¡…Ñ¥½¸¤¤É•ÑÕÉ¸¹Õ±°ì($%±•Ð…Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”€ô¹Õ±°ì($%±•Ð…Ñ¥½¹I•ÍÕ±Ðì($%½¹ÍÐÁÉ•Ù¥½ÕÍ!•…‘•ÉÍA¡…Í”€ô½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í” ‰…Ñ¥½¸ˆ¤ì($%ÑÉäì($$%…Ñ¥½¹I•ÍÕ±Ð€ô…Ý…¥Ð…Ñ¥½¸ ¤ì($%ô…Ñ €¡•ÉÉ½È¤ì($$%…Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”€ô•ÑÑ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¡•ÉÉ½È¤ì($$%¥˜€ ……Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¤Ñ¡É½Ü•ÉÉ½Èì($%ô™¥¹…±±äì($$%½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”¡ÁÉ•Ù¥½ÕÍ!•…‘•ÉÍA¡…Í”¤ì($%ô($%¥˜€ ……Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¤ì($$%•Ñ¹‘±•…ÉÑ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹ ¤ì($$%É•ÑÕÉ¸ì($$$%­¥¹è€‰™½É´µÍÑ…Ñ”ˆ°($$$%™½ÉµMÑ…Ñ”è…Ý…¥Ð½ÁÑ¥½¹Ì¹‘•½‘•½ÉµMÑ…Ñ”¡…Ñ¥½¹I•ÍÕ±Ð°‰½‘ä¤€üü¹Õ±°($$%ôì($%ô($%½¹ÍÐ…Ñ¥½¹A•¹‘¥¹½½­¥•Ì€ô½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì($%½¹ÍÐ…Ñ¥½¹É…™Ñ½½­¥”€ô½ÁÑ¥½¹Ì¹•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È ¤ì($%½¹ÍÐ…Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹€ôÉ•Í½±Ù•Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹¡…Ñ¥½¹A•¹‘¥¹½½­¥•Ì¹±•¹Ñ €ø€Àñð	½½±•…¸¡…Ñ¥½¹É…™Ñ½½­¥”¤¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ ¤ì($%¥˜€¡…Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¹­¥¹€ôôô€‰É•‘¥É•Ðˆ¤¡•…‘•ÉÌ¹Í•Ð ‰1½…Ñ¥½¸ˆ°¹•ÜUI0¡…Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¹ÕÉ°°½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹ÕÉ°¤¹Ñ½MÑÉ¥¹œ ¤¤ì($%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¡•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ¤ì($%™½È€¡½¹ÍÐ½½­¥”½˜…Ñ¥½¹A•¹‘¥¹½½­¥•Ì¤¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°½½­¥”¤ì($%¥˜€¡…Ñ¥½¹É…™Ñ½½­¥”¤¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°…Ñ¥½¹É…™Ñ½½­¥”¤ì($%Í•ÑÑ¥½¹I•Ù…±¥‘…Ñ•‘!•…‘•È¡¡•…‘•ÉÌ°…Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹¤ì($%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ì($$%ÍÑ…ÑÕÌè…Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¹­¥¹€ôôô€‰É•‘¥É•Ðˆ€ü€ÌÀÌ€è…Ñ¥½¹½¹ÑÉ½±I•ÍÁ½¹Í”¹ÍÑ…ÑÕÍ½‘”°($$%¡•…‘•ÉÌ($%ô¤ì(%ô…Ñ €¡•ÉÉ½È¤ì($%¥˜€¡¥ÍM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘ÉÉ½È¡•ÉÉ½È°¹Õ±°¤¤É•ÑÕÉ¸É•…Ñ•Ñ¥½¹9½Ñ½Õ¹‘I•ÍÁ½¹Í”¡¹Õ±°°ì($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ìè½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì($%ô¤ì($%•Ñ¹‘±•…ÉÑ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹ ¤ì($%½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì($%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑtM•ÉÙ•È…Ñ¥½¸•ÉÉ½Èèˆ°•ÉÉ½È¤ì($%½ÁÑ¥½¹Ì¹É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È¡¹½Éµ…±¥é•ÉÉ½È¡•ÉÉ½È¤°ì($$%Á…Ñ è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%µ•Ñ¡½è½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹µ•Ñ¡½°($$%¡•…‘•ÉÌè=‰©•Ð¹™É½µ¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•¹ÑÉ¥•Ì ¤¤($%ô°ì($$%É½ÕÑ•É-¥¹è€‰ÁÀI½ÕÑ•Èˆ°($$%É½ÕÑ•A…Ñ è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%É½ÕÑ•QåÁ”è€‰…Ñ¥½¸ˆ($%ô¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸¥¹Ñ•É¹…±M•ÉÙ•ÉÉÉ½ÉI•ÍÁ½¹Í”¡Ù½¥€À¤ì(%ô)ô)…Íå¹Œ™Õ¹Ñ¥½¸¡…¹‘±•M•ÉÙ•ÉÑ¥½¹IÍI•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹µ•Ñ¡½¹Ñ½UÁÁ•É…Í” ¤€„ôô€‰A=MPˆñð€…½ÁÑ¥½¹Ì¹…Ñ¥½¹%¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÍÉ™I•ÍÁ½¹Í”€ôÙ…±¥‘…Ñ•ÍÉ™=É¥¥¸¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°½ÁÑ¥½¹Ì¹…±±½Ý•‘=É¥¥¹Ì¤ì(%¥˜€¡ÍÉ™I•ÍÁ½¹Í”¤É•ÑÕÉ¸ÍÉ™I•ÍÁ½¹Í”ì(%¥˜€¡Á…ÉÍ•%¹Ð¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰½¹Ñ•¹Ðµ±•¹Ñ ˆ¤ñð€ˆÀˆ°€ÄÀ¤€ø½ÁÑ¥½¹Ì¹µ…áÑ¥½¹	½‘åM¥é”¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸Á…å±½…‘Q½½1…É•I•ÍÁ½¹Í” ¤ì(%ô(%ÑÉäì($%±•Ð‰½‘äì($%ÑÉäì($$%‰½‘ä€ô½ÁÑ¥½¹Ì¹½¹Ñ•¹ÑQåÁ”¹ÍÑ…ÉÑÍ]¥Ñ  ‰µÕ±Ñ¥Á…ÉÐ½™½É´µ‘…Ñ„ˆ¤€ü…Ý…¥Ð½ÁÑ¥½¹Ì¹É•…‘½Éµ…Ñ…]¥Ñ¡1¥µ¥Ð¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°½ÁÑ¥½¹Ì¹µ…áÑ¥½¹	½‘åM¥é”¤€è…Ý…¥Ð½ÁÑ¥½¹Ì¹É•…‘	½‘å]¥Ñ¡1¥µ¥Ð¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°½ÁÑ¥½¹Ì¹µ…áÑ¥½¹	½‘åM¥é”¤ì($%ô…Ñ €¡•ÉÉ½È¤ì($$%¥˜€¡¥ÍI•ÅÕ•ÍÑ	½‘åQ½½1…É”¡•ÉÉ½È¤¤ì($$$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%É•ÑÕÉ¸Á…å±½…‘Q½½1…É•I•ÍÁ½¹Í” ¤ì($$%ô($$%Ñ¡É½Ü•ÉÉ½Èì($%ô($%½¹ÍÐÁ…å±½…‘I•ÍÁ½¹Í”€ô…Ý…¥ÐÙ…±¥‘…Ñ•M•ÉÙ•ÉÑ¥½¹A…å±½…¡‰½‘ä¤ì($%¥˜€¡Á…å±½…‘I•ÍÁ½¹Í”¤ì($$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%É•ÑÕÉ¸Á…å±½…‘I•ÍÁ½¹Í”ì($%ô($%±•Ð…Ñ¥½¸ì($%ÑÉäì($$%…Ñ¥½¸€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹±½…‘M•ÉÙ•ÉÑ¥½¸¡½ÁÑ¥½¹Ì¹…Ñ¥½¹%¤ì($%ô…Ñ €¡•ÉÉ½È¤ì($$%¥˜€¡¥ÍM•ÉÙ•ÉÑ¥½¹9½Ñ½Õ¹‘ÉÉ½È¡•ÉÉ½È°½ÁÑ¥½¹Ì¹…Ñ¥½¹%¤¤É•ÑÕÉ¸É•…Ñ•Ñ¥½¹9½Ñ½Õ¹‘I•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¹…Ñ¥½¹%°ì($$$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$$%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ìè½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì($$%ô¤ì($$%Ñ¡É½Ü•ÉÉ½Èì($%ô($%¥˜€ …¥ÍÁÁM•ÉÙ•ÉÑ¥½¹Õ¹Ñ¥½¸¡…Ñ¥½¸¤¤É•ÑÕÉ¸É•…Ñ•Ñ¥½¹9½Ñ½Õ¹‘I•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¹…Ñ¥½¹%°ì($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ìè½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì($%ô¤ì($%½¹ÍÐÑ•µÁ½É…ÉåI•™•É•¹•Ì€ô½ÁÑ¥½¹Ì¹É•…Ñ•Q•µÁ½É…ÉåI•™•É•¹•M•Ð ¤ì($%½¹ÍÐ…ÉÌ€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹‘•½‘•I•Á±ä¡‰½‘ä°ìÑ•µÁ½É…ÉåI•™•É•¹•Ìô¤ì($%±•ÐÉ•ÑÕÉ¹Y…±Õ”ì($%±•Ð…Ñ¥½¹I•‘¥É•Ð€ô¹Õ±°ì($%±•Ð…Ñ¥½¹MÑ…ÑÕÌ€ô€ÈÀÀì($%½¹ÍÐÁÉ•Ù¥½ÕÍ!•…‘•ÉÍA¡…Í”€ô½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í” ‰…Ñ¥½¸ˆ¤ì($%ÑÉäì($$%ÑÉäì($$$%Ù…±¥‘…Ñ•M•ÉÙ•ÉÑ¥½¹ÉÌ¡…ÉÌ¤ì($$$%É•ÑÕÉ¹Y…±Õ”€ôì($$$$%½¬èÑÉÕ”°($$$$%‘…Ñ„è…Ý…¥Ð…Ñ¥½¸¹…ÁÁ±ä¡¹Õ±°°…ÉÌ¤($$$%ôì($$%ô…Ñ €¡•ÉÉ½È¤ì($$$%…Ñ¥½¹I•‘¥É•Ð€ô•ÑÑ¥½¹I•‘¥É•Ð¡•ÉÉ½È¤ì($$$%¥˜€¡…Ñ¥½¹I•‘¥É•Ð¤É•ÑÕÉ¹Y…±Õ”€ôì($$$$%½¬èÑÉÕ”°($$$$%‘…Ñ„èÙ½¥€À($$$%ôì($$$%•±Í”ì($$$$%½¹ÍÐ¡ÑÑÁ…±±‰…­MÑ…ÑÕÌ€ô•ÑÑ¥½¹!ÑÑÁ…±±‰…­MÑ…ÑÕÌ¡•ÉÉ½È¤ì($$$$%¥˜€¡¡ÑÑÁ…±±‰…­MÑ…ÑÕÌ€„ôô¹Õ±°¤ì($$$$$%…Ñ¥½¹MÑ…ÑÕÌ€ô¡ÑÑÁ…±±‰…­MÑ…ÑÕÌì($$$$$%É•ÑÕÉ¹Y…±Õ”€ôì($$$$$$%½¬è™…±Í”°($$$$$$%‘…Ñ„è•ÉÉ½È($$$$$%ôì($$$$%ô•±Í”ì($$$$$%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑtM•ÉÙ•È…Ñ¥½¸•ÉÉ½Èèˆ°•ÉÉ½È¤ì($$$$$%É•ÑÕÉ¹Y…±Õ”€ôì($$$$$$%½¬è™…±Í”°($$$$$$%‘…Ñ„è½ÁÑ¥½¹Ì¹Í…¹¥Ñ¥é•ÉÉ½É½É±¥•¹Ð¡•ÉÉ½È¤($$$$$%ôì($$$$%ô($$$%ô($$%ô($%ô™¥¹…±±äì($$%½ÁÑ¥½¹Ì¹Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”¡ÁÉ•Ù¥½ÕÍ!•…‘•ÉÍA¡…Í”¤ì($%ô($%¥˜€¡…Ñ¥½¹I•‘¥É•Ð¤ì($$%½¹ÍÐ…Ñ¥½¹A•¹‘¥¹½½­¥•Ì€ô½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì($$%½¹ÍÐ…Ñ¥½¹É…™Ñ½½­¥”€ô½ÁÑ¥½¹Ì¹•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È ¤ì($$%½¹ÍÐ…Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹€ôÉ•Í½±Ù•Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹¡…Ñ¥½¹A•¹‘¥¹½½­¥•Ì¹±•¹Ñ €ø€Àñð	½½±•…¸¡…Ñ¥½¹É…™Ñ½½­¥”¤¤ì($$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%½¹ÍÐÉ•‘¥É•Ñ!•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì($$$$‰½¹Ñ•¹ÐµQåÁ”ˆè€‰Ñ•áÐ½àµ½µÁ½¹•¹Ðì¡…ÉÍ•ÐõÕÑ˜´àˆ°($$$%Y…ÉäèY%9aQ}IM}YIe}!H($$%ô¤ì($$%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡É•‘¥É•Ñ!•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ¤ì($$%É•‘¥É•Ñ!•…‘•ÉÌ¹Í•Ð¡Q%=9}I%IQ}!H°…Ñ¥½¹I•‘¥É•Ð¹ÕÉ°¤ì($$%É•‘¥É•Ñ!•…‘•ÉÌ¹Í•Ð¡Q%=9}I%IQ}QeA}!H°…Ñ¥½¹I•‘¥É•Ð¹ÑåÁ”¤ì($$%É•‘¥É•Ñ!•…‘•ÉÌ¹Í•Ð¡Q%=9}I%IQ}MQQUM}!H°MÑÉ¥¹œ¡…Ñ¥½¹I•‘¥É•Ð¹ÍÑ…ÑÕÌ¤¤ì($$%™½È€¡½¹ÍÐ½½­¥”½˜…Ñ¥½¹A•¹‘¥¹½½­¥•Ì¤É•‘¥É•Ñ!•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°½½­¥”¤ì($$%¥˜€¡…Ñ¥½¹É…™Ñ½½­¥”¤É•‘¥É•Ñ!•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°…Ñ¥½¹É…™Ñ½½­¥”¤ì($$%Í•ÑÑ¥½¹I•Ù…±¥‘…Ñ•‘!•…‘•È¡É•‘¥É•Ñ!•…‘•ÉÌ°…Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹¤ì($$%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í” ˆˆ°ì($$$%ÍÑ…ÑÕÌè€ÈÀÀ°($$$%¡•…‘•ÉÌèÉ•‘¥É•Ñ!•…‘•ÉÌ($$%ô¤ì($%ô($%½¹ÍÐ…Ñ¥½¹A•¹‘¥¹½½­¥•Ì€ô½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì ¤ì($%½¹ÍÐ…Ñ¥½¹É…™Ñ½½­¥”€ô½ÁÑ¥½¹Ì¹•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È ¤ì($%½¹ÍÐ…Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹€ôÉ•Í½±Ù•Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹¡…Ñ¥½¹A•¹‘¥¹½½­¥•Ì¹±•¹Ñ €ø€Àñð	½½±•…¸¡…Ñ¥½¹É…™Ñ½½­¥”¤¤ì($%¥˜€¡…Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹€ôôôQ%=9}%}9=Q}IY1%Q¤ì($$%½¹ÍÐ½¹I•¹‘•ÉÉÉ½È€ô½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$%½¹ÍÐÉÍMÑÉ•…´€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´¡ìÉ•ÑÕÉ¹Y…±Õ”ô°ì($$$%Ñ•µÁ½É…ÉåI•™•É•¹•Ì°($$$%½¹ÉÉ½Èè½¹I•¹‘•ÉÉÉ½È($$%ô¤ì($$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%½¹ÍÐ…Ñ¥½¹!•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì($$$$‰½¹Ñ•¹ÐµQåÁ”ˆè€‰Ñ•áÐ½àµ½µÁ½¹•¹Ðì¡…ÉÍ•ÐõÕÑ˜´àˆ°($$$%Y…ÉäèY%9aQ}IM}YIe}!H($$%ô¤ì($$%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡…Ñ¥½¹!•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ¤ì($$%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡ÉÍMÑÉ•…´°ì($$$%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•MÑ…ÑÕÌ€üü…Ñ¥½¹MÑ…ÑÕÌ°($$$%¡•…‘•ÉÌè…Ñ¥½¹!•…‘•ÉÌ($$%ô¤ì($%ô($%½¹ÍÐµ…Ñ €ô½ÁÑ¥½¹Ì¹µ…Ñ¡I½ÕÑ”¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($%±•Ð•±•µ•¹Ðì($%±•Ð•ÉÉ½ÉA…ÑÑ•É¸€ôµ…Ñ €üµ…Ñ ¹É½ÕÑ”¹Á…ÑÑ•É¸€è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”ì($%¥˜€¡µ…Ñ ¤ì($$%½¹ÍÐìÉ½ÕÑ”è…Ñ¥½¹I½ÕÑ”°Á…É…µÌè…Ñ¥½¹A…É…µÌô€ôµ…Ñ ì($$%½¹ÍÐ…Ñ¥½¹I•É•¹‘•ÉQ…É•Ð€ôÉ•Í½±Ù•ÁÁA…•Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¡ì($$$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$$%ÕÉÉ•¹ÑA…É…µÌè…Ñ¥½¹A…É…µÌ°($$$%ÕÉÉ•¹ÑI½ÕÑ”è…Ñ¥½¹I½ÕÑ”°($$$%™¥¹‘%¹Ñ•É•ÁÐè½ÁÑ¥½¹Ì¹™¥¹‘%¹Ñ•É•ÁÐ°($$$%•ÑI½ÕÑ•A…É…µ9…µ•Ìè½ÁÑ¥½¹Ì¹•ÑI½ÕÑ•A…É…µ9…µ•Ì°($$$%•ÑM½ÕÉ•I½ÕÑ”è½ÁÑ¥½¹Ì¹•ÑM½ÕÉ•I½ÕÑ”°($$$%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($$$%Ñ½%¹Ñ•É•ÁÑ=ÁÑÌè½ÁÑ¥½¹Ì¹Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ($$%ô¤ì($$%½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡ì($$$%Á…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$$%Í•…É¡A…É…µÌè½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ°($$$%Á…É…µÌè…Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¹¹…Ù¥…Ñ¥½¹A…É…µÌ($$%ô¤ì($$%Í•ÑÕÉÉ•¹Ñ•Ñ¡…¡•5½‘”¡½ÁÑ¥½¹Ì¹É•Í½±Ù•I½ÕÑ••Ñ¡…¡•5½‘”ü¸¡…Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¹É½ÕÑ”¤€üü¹Õ±°¤ì($$%•±•µ•¹Ð€ô½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•±•µ•¹Ð¡ì($$$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$$%¥¹Ñ•É•ÁÑ=ÁÑÌè…Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¹¥¹Ñ•É•ÁÑ=ÁÑÌ°($$$%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($$$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$$%Á…É…µÌè…Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¹Á…É…µÌ°($$$%É•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°($$$%É½ÕÑ”è…Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¹É½ÕÑ”°($$$%Í•…É¡A…É…µÌè½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ°($$$%É•¹‘•É5½‘”èAA}IM}I9I}5=}Q%=9}II9I}AIMIY}U$($$%ô¤ì($$%•ÉÉ½ÉA…ÑÑ•É¸€ô…Ñ¥½¹I•É•¹‘•ÉQ…É•Ð¹É½ÕÑ”¹Á…ÑÑ•É¸ì($%ô•±Í”ì($$%½¹ÍÐ…Ñ¥½¹I½ÕÑ•%€ô½ÁÑ¥½¹Ì¹É•…Ñ•A…å±½…‘I½ÕÑ•%¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°¹Õ±°¤ì($$%•±•µ•¹Ð€ô½ÁÑ¥½¹Ì¹É•…Ñ•9½Ñ½Õ¹‘±•µ•¹Ð¡…Ñ¥½¹I½ÕÑ•%¤ì($%ô($%½¹ÍÐ½¹I•¹‘•ÉÉÉ½È€ô½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°•ÉÉ½ÉA…ÑÑ•É¸¤ì($%½¹ÍÐÉÍMÑÉ•…´€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´¡ì($$%É½½Ðè•±•µ•¹Ð°($$%É•ÑÕÉ¹Y…±Õ”($%ô°ì($$%Ñ•µÁ½É…ÉåI•™•É•¹•Ì°($$%½¹ÉÉ½Èè½¹I•¹‘•ÉÉÉ½È($%ô¤ì($%½¹ÍÐ…Ñ¥½¹!•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì($$$‰½¹Ñ•¹ÐµQåÁ”ˆè€‰Ñ•áÐ½àµ½µÁ½¹•¹Ðì¡…ÉÍ•ÐõÕÑ˜´àˆ°($$%Y…ÉäèY%9aQ}IM}YIe}!H($%ô¤ì($%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡…Ñ¥½¹!•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ¤ì($%Í•ÑÑ¥½¹I•Ù…±¥‘…Ñ•‘!•…‘•È¡…Ñ¥½¹!•…‘•ÉÌ°…Ñ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹¤ì($%½¹ÍÐ…Ñ¥½¹I•ÍÁ½¹Í”€ô¹•ÜI•ÍÁ½¹Í”¡ÉÍMÑÉ•…´°ì($$%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•MÑ…ÑÕÌ€üü…Ñ¥½¹MÑ…ÑÕÌ°($$%¡•…‘•ÉÌè…Ñ¥½¹!•…‘•ÉÌ($%ô¤ì($%¥˜€¡…Ñ¥½¹A•¹‘¥¹½½­¥•Ì¹±•¹Ñ €ø€Àñð…Ñ¥½¹É…™Ñ½½­¥”¤ì($$%™½È€¡½¹ÍÐ½½­¥”½˜…Ñ¥½¹A•¹‘¥¹½½­¥•Ì¤…Ñ¥½¹I•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°½½­¥”¤ì($$%¥˜€¡…Ñ¥½¹É…™Ñ½½­¥”¤…Ñ¥½¹I•ÍÁ½¹Í”¹¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°…Ñ¥½¹É…™Ñ½½­¥”¤ì($%ô($%É•ÑÕÉ¸…Ñ¥½¹I•ÍÁ½¹Í”ì(%ô…Ñ €¡•ÉÉ½È¤ì($%•Ñ¹‘±•…ÉÑ¥½¹I•Ù…±¥‘…Ñ¥½¹-¥¹ ¤ì($%É•ÑÕÉ¸É•…Ñ•M•ÉÙ•ÉÑ¥½¹ÉÉ½ÉI•ÍÁ½¹Í”¡•ÉÉ½È°ì($$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ìè½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì°($$%É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½Èè½ÁÑ¥½¹Ì¹É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È°($$%É•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ($%ô¤ì(%ô)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µ•á•ÕÑ¥½¸¹©Ì)™Õ¹Ñ¥½¸¥ÍAÉ½µ¥Í•1¥­”¡Ù…±Õ”¤ì(%É•ÑÕÉ¸	½½±•…¸¡Ù…±Õ”€˜˜€¡ÑåÁ•½˜Ù…±Õ”€ôôô€‰½‰©•ÐˆñðÑåÁ•½˜Ù…±Õ”€ôôô€‰™Õ¹Ñ¥½¸ˆ¤€˜˜€‰Ñ¡•¸ˆ¥¸Ù…±Õ”€˜˜ÑåÁ•½˜Ù…±Õ”¹Ñ¡•¸€ôôô€‰™Õ¹Ñ¥½¸ˆ¤ì)ô)™Õ¹Ñ¥½¸•ÑÁÁA…•MÑ…ÑÕÍQ•áÐ¡ÍÑ…ÑÕÍ½‘”¤ì(%É•ÑÕÉ¸ÍÑ…ÑÕÍ½‘”€ôôô€ÐÀÌ€ü€‰½É‰¥‘‘•¸ˆ€èÍÑ…ÑÕÍ½‘”€ôôô€ÐÀÄ€ü€‰U¹…ÕÑ¡½É¥é•ˆ€è€‰9½Ð½Õ¹ˆì)ô)™Õ¹Ñ¥½¸µ•É•ÁÁA…•MÁ•¥…±ÉÉ½É!•…‘•ÉÌ¡É•ÍÁ½¹Í”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¤ì(%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¡•…‘•ÉÌ°µ¥‘‘±•Ý…É•½¹Ñ•áÐü¹¡•…‘•ÉÌ€üü¹Õ±°¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”¹‰½‘ä°ì($%¡•…‘•ÉÌ°($%ÍÑ…ÑÕÌèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÌ°($%ÍÑ…ÑÕÍQ•áÐèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÍQ•áÐ(%ô¤ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•MÁ•¥…±ÉÉ½È¡•ÉÉ½È¤ì(%¥˜€ „¡•ÉÉ½È€˜˜ÑåÁ•½˜•ÉÉ½È€ôôô€‰½‰©•Ðˆ€˜˜€‰‘¥•ÍÐˆ¥¸•ÉÉ½È¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ‘¥•ÍÐ€ôMÑÉ¥¹œ¡•ÉÉ½È¹‘¥•ÍÐ¤ì(%½¹ÍÐÉ•‘¥É•Ð€ôÁ…ÉÍ•9•áÑI•‘¥É•Ñ¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€¡É•‘¥É•Ð¤É•ÑÕÉ¸ì($%­¥¹è€‰É•‘¥É•Ðˆ°($%±½…Ñ¥½¸èÉ•‘¥É•Ð¹ÕÉ°°($%ÍÑ…ÑÕÍ½‘”èÉ•‘¥É•Ð¹ÍÑ…ÑÕÌ(%ôì(%½¹ÍÐ¡ÑÑÁÉÉ½È€ôÁ…ÉÍ•9•áÑ!ÑÑÁÉÉ½É¥•ÍÐ¡‘¥•ÍÐ¤ì(%¥˜€¡¡ÑÑÁÉÉ½È¤É•ÑÕÉ¸ì($%­¥¹è€‰¡ÑÑÀµ…•ÍÌµ™…±±‰…¬ˆ°($%ÍÑ…ÑÕÍ½‘”è¡ÑÑÁÉÉ½È¹ÍÑ…ÑÕÌ(%ôì(%É•ÑÕÉ¸¹Õ±°ì)ô(¼¨¨(¨I•Í½±Ù•Ì„É•‘¥É•Ð ¤Ñ…É•Ð……¥¹ÍÐÑ¡”É•ÅÕ•ÍÐUI0…¹ÁÉ•Á•¹‘ÌÑ¡”(¨½¹™¥ÕÉ•‰…Í•A…Ñ Ý¡•¸Ñ¡”Ñ…É•Ð¥Ì…¸…ÁÀµ¥¹Ñ•É¹…°…‰Í½±ÕÑ”Á…Ñ ¸(¨(¨5¥ÉÉ½ÉÌ9•áÐ¹©ÌÌ…‘‘A…Ñ¡AÉ•™¥à¡•ÑUI1É½µI•‘¥É•ÑÉÉ½È¡•ÉÈ¤°‰…Í•A…Ñ ¥€(¨¥¸…ÁÀµÉ•¹‘•È¹ÑÍá€è„É•‘¥É•Ð ˆ½…‰½ÕÐˆ¥€…±°™É½´„Á…”µ½Õ¹Ñ•…Ð(¨€½‰±½€€¡‰…Í•A…Ñ ¤ÁÉ½‘Õ•Ì1½…Ñ¥½¸è€½‰±½œ½…‰½ÕÑ€¸(¨(¨M­¥ÁÌÁÉ•™¥á¥¹œÝ¡•¸è(¨€€´‰…Í•A…Ñ ¥ÌÕ¹Í•Ð€¼•µÁÑä(¨€€´Ñ¡”Ñ…É•Ð¥Ì„™Õ±°UI0Á½¥¹Ñ¥¹œ…Ð„‘¥™™•É•¹Ð½É¥¥¸€¡•áÑ•É¹…°É•‘¥É•Ð¤(¨€€´Ñ¡”Ñ…É•Ð…±É•…‘äÍÑ…ÉÑÌÝ¥Ñ Ñ¡”‰…Í•A…Ñ €¡…±±•È‘¥Ñ¡”Ý½É¬Ñ¡•µÍ•±Ù•Ì¤(¨¼)™Õ¹Ñ¥½¸…ÁÁ±åÁÁA…•I•‘¥É•Ñ	…Í•A…Ñ ¡±½…Ñ¥½¸°É•ÅÕ•ÍÑUÉ°°‰…Í•A…Ñ ¤ì(%½¹ÍÐÉ•Í½±Ù•€ô¹•ÜUI0¡±½…Ñ¥½¸°É•ÅÕ•ÍÑUÉ°¤ì(%½¹ÍÐÉ•ÅÕ•ÍÑ=É¥¥¸€ô¹•ÜUI0¡É•ÅÕ•ÍÑUÉ°¤¹½É¥¥¸ì(%¥˜€ …‰…Í•A…Ñ ñðÉ•Í½±Ù•¹½É¥¥¸€„ôôÉ•ÅÕ•ÍÑ=É¥¥¸¤É•ÑÕÉ¸É•Í½±Ù•¹Ñ½MÑÉ¥¹œ ¤ì(%¥˜€¡¡…Í	…Í•A…Ñ ¡É•Í½±Ù•¹Á…Ñ¡¹…µ”°‰…Í•A…Ñ ¤¤É•ÑÕÉ¸É•Í½±Ù•¹Ñ½MÑÉ¥¹œ ¤ì(%É•Í½±Ù•¹Á…Ñ¡¹…µ”€ôÉ•Í½±Ù•¹Á…Ñ¡¹…µ”€ôôô€ˆ¼ˆ€ü‰…Í•A…Ñ €è€‘í‰…Í•A…Ñ¡ô‘íÉ•Í½±Ù•¹Á…Ñ¡¹…µ•õ€ì(%É•ÑÕÉ¸É•Í½±Ù•¹Ñ½MÑÉ¥¹œ ¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•MÁ•¥…±ÉÉ½ÉI•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹ÍÁ•¥…±ÉÉ½È¹­¥¹€ôôô€‰É•‘¥É•Ðˆ¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%½¹ÍÐÁÉ•™¥á•‘1½…Ñ¥½¸€ô…ÁÁ±åÁÁA…•I•‘¥É•Ñ	…Í•A…Ñ ¡½ÁÑ¥½¹Ì¹ÍÁ•¥…±ÉÉ½È¹±½…Ñ¥½¸°½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹ÕÉ°°½ÁÑ¥½¹Ì¹‰…Í•A…Ñ ¤ì($%½¹ÍÐ±½…Ñ¥½¸€ô½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€ü…Ý…¥ÐÉ•…Ñ•IÍI•‘¥É•Ñ1½…Ñ¥½¸¡ÁÉ•™¥á•‘1½…Ñ¥½¸°½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¤€èÁÉ•™¥á•‘1½…Ñ¥½¸ì($%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì1½…Ñ¥½¸è±½…Ñ¥½¸ô¤ì($%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¡•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐü¹¡•…‘•ÉÌ€üü¹Õ±°¤ì($%½¹ÍÐÁ•¹‘¥¹½½­¥•Ì€ô½ÁÑ¥½¹Ì¹•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ìü¸ ¤€üümtì($%™½È€¡½¹ÍÐ½½­¥”½˜Á•¹‘¥¹½½­¥•Ì¤¡•…‘•ÉÌ¹…ÁÁ•¹ ‰M•Ðµ½½­¥”ˆ°½½­¥”¤ì($%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡¹Õ±°°ì($$%¡•…‘•ÉÌ°($$%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹ÍÁ•¥…±ÉÉ½È¹ÍÑ…ÑÕÍ½‘”($%ô¤ì(%ô(%¥˜€¡½ÁÑ¥½¹Ì¹É•¹‘•É…±±‰…­A…”¤ì($%½¹ÍÐ™…±±‰…­I•ÍÁ½¹Í”€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•É…±±‰…­A…”¡½ÁÑ¥½¹Ì¹ÍÁ•¥…±ÉÉ½È¹ÍÑ…ÑÕÍ½‘”¤ì($%¥˜€¡™…±±‰…­I•ÍÁ½¹Í”¤É•ÑÕÉ¸µ•É•ÁÁA…•MÁ•¥…±ÉÉ½É!•…‘•ÉÌ¡™…±±‰…­I•ÍÁ½¹Í”°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%ô(%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%É•ÑÕÉ¸µ•É•ÁÁA…•MÁ•¥…±ÉÉ½É!•…‘•ÉÌ¡¹•ÜI•ÍÁ½¹Í”¡•ÑÁÁA…•MÑ…ÑÕÍQ•áÐ¡½ÁÑ¥½¹Ì¹ÍÁ•¥…±ÉÉ½È¹ÍÑ…ÑÕÍ½‘”¤°ìÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹ÍÁ•¥…±ÉÉ½È¹ÍÑ…ÑÕÍ½‘”ô¤°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì)ô(¼¨¨M•”1…å½ÕÑ±…Í€ÑåÁ”‘½‰±½¬¥¸…ÁÀµ•±•µ•¹ÑÌ¹ÑÌ™½È±¥™•å±”¸€¨¼)…Íå¹Œ™Õ¹Ñ¥½¸ÁÉ½‰•ÁÁA…•1…å½ÕÑÌ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ±…å½ÕÑ±…Ì€ôíôì(%½¹ÍÐ±Ì€ô½ÁÑ¥½¹Ì¹±…ÍÍ¥™¥…Ñ¥½¸€üü¹Õ±°ì(%É•ÑÕÉ¸ì($%É•ÍÁ½¹Í”è…Ý…¥Ð½ÁÑ¥½¹Ì¹ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡…Íå¹Œ€ ¤€ôøì($$%™½È€¡±•Ð±…å½ÕÑ%¹‘•à€ô½ÁÑ¥½¹Ì¹±…å½ÕÑ½Õ¹Ð€´€Äì±…å½ÕÑ%¹‘•à€øô€Àì±…å½ÕÑ%¹‘•à´´¤ì($$$%½¹ÍÐ‰Õ¥±‘Q¥µ•I•ÍÕ±Ð€ô±Ìü¹‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìü¹•Ð¡±…å½ÕÑ%¹‘•à¤ì($$$%¥˜€¡±Ì€˜˜‰Õ¥±‘Q¥µ•I•ÍÕ±Ð¤ì($$$$%±…å½ÕÑ±…Ím±Ì¹•Ñ1…å½ÕÑ%¡±…å½ÕÑ%¹‘•à¥t€ô‰Õ¥±‘Q¥µ•I•ÍÕ±Ð€ôôô€‰ÍÑ…Ñ¥Œˆ€ü€‰Ìˆ€è€‰ˆì($$$$%¥˜€¡±Ì¹‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸¤±Ì¹‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸¡±Ì¹•Ñ1…å½ÕÑ%¡±…å½ÕÑ%¹‘•à¤°±Ì¹‰Õ¥±‘Q¥µ•I•…Í½¹Ìü¹•Ð¡±…å½ÕÑ%¹‘•à¤€üüì±…å•Èè€‰¹¼µ±…ÍÍ¥™¥•Èˆô¤ì($$$$%½¹ÍÐ•ÉÉ½ÉI•ÍÁ½¹Í”€ô…Ý…¥ÐÁÉ½‰•1…å½ÕÑ½ÉÉÉ½ÉÌ¡½ÁÑ¥½¹Ì°±…å½ÕÑ%¹‘•à¤ì($$$$%¥˜€¡•ÉÉ½ÉI•ÍÁ½¹Í”¤É•ÑÕÉ¸•ÉÉ½ÉI•ÍÁ½¹Í”ì($$$$%½¹Ñ¥¹Õ”ì($$$%ô($$$%¥˜€¡±Ì¤ì($$$$%ÑÉäì($$$$$%½¹ÍÐì‘å¹…µ¥•Ñ•Ñ•ô€ô…Ý…¥Ð±Ì¹ÉÕ¹]¥Ñ¡%Í½±…Ñ•‘å¹…µ¥M½Á”  ¤€ôø½ÁÑ¥½¹Ì¹ÁÉ½‰•1…å½ÕÑÐ¡±…å½ÕÑ%¹‘•à¤¤ì($$$$$%±…å½ÕÑ±…Ím±Ì¹•Ñ1…å½ÕÑ%¡±…å½ÕÑ%¹‘•à¥t€ô‘å¹…µ¥•Ñ•Ñ•€ü€‰ˆ€è€‰Ìˆì($$$$$%¥˜€¡±Ì¹‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸¤±Ì¹‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸¡±Ì¹•Ñ1…å½ÕÑ%¡±…å½ÕÑ%¹‘•à¤°ì($$$$$$%±…å•Èè€‰ÉÕ¹Ñ¥µ”µÁÉ½‰”ˆ°($$$$$$%½ÕÑ½µ”è‘å¹…µ¥•Ñ•Ñ•€ü€‰‘å¹…µ¥Œˆ€è€‰ÍÑ…Ñ¥Œˆ($$$$$%ô¤ì($$$$%ô…Ñ €¡•ÉÉ½È¤ì($$$$$%±…å½ÕÑ±…Ím±Ì¹•Ñ1…å½ÕÑ%¡±…å½ÕÑ%¹‘•à¥t€ô€‰ˆì($$$$$%¥˜€¡±Ì¹‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸¤±Ì¹‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸¡±Ì¹•Ñ1…å½ÕÑ%¡±…å½ÕÑ%¹‘•à¤°ì($$$$$$%±…å•Èè€‰ÉÕ¹Ñ¥µ”µÁÉ½‰”ˆ°($$$$$$%½ÕÑ½µ”è€‰‘å¹…µ¥Œˆ°($$$$$$%•ÉÉ½Èè•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€ü•ÉÉ½È¹µ•ÍÍ…”€èMÑÉ¥¹œ¡•ÉÉ½È¤($$$$$%ô¤ì($$$$$%½¹ÍÐ•ÉÉ½ÉI•ÍÁ½¹Í”€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹½¹1…å½ÕÑÉÉ½È¡•ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì($$$$$%¥˜€¡•ÉÉ½ÉI•ÍÁ½¹Í”¤É•ÑÕÉ¸•ÉÉ½ÉI•ÍÁ½¹Í”ì($$$$%ô($$$$%½¹Ñ¥¹Õ”ì($$$%ô($$$%½¹ÍÐ•ÉÉ½ÉI•ÍÁ½¹Í”€ô…Ý…¥ÐÁÉ½‰•1…å½ÕÑ½ÉÉÉ½ÉÌ¡½ÁÑ¥½¹Ì°±…å½ÕÑ%¹‘•à¤ì($$$%¥˜€¡•ÉÉ½ÉI•ÍÁ½¹Í”¤É•ÑÕÉ¸•ÉÉ½ÉI•ÍÁ½¹Í”ì($$%ô($$%É•ÑÕÉ¸¹Õ±°ì($%ô¤°($%±…å½ÕÑ±…Ì(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸ÁÉ½‰•1…å½ÕÑ½ÉÉÉ½ÉÌ¡½ÁÑ¥½¹Ì°±…å½ÕÑ%¹‘•à¤ì(%ÑÉäì($%½¹ÍÐ±…å½ÕÑI•ÍÕ±Ð€ô½ÁÑ¥½¹Ì¹ÁÉ½‰•1…å½ÕÑÐ¡±…å½ÕÑ%¹‘•à¤ì($%¥˜€¡¥ÍAÉ½µ¥Í•1¥­”¡±…å½ÕÑI•ÍÕ±Ð¤¤…Ý…¥Ð±…å½ÕÑI•ÍÕ±Ðì(%ô…Ñ €¡•ÉÉ½È¤ì($%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹½¹1…å½ÕÑÉÉ½È¡•ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì(%ô(%É•ÑÕÉ¸¹Õ±°ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸ÁÉ½‰•ÁÁA…•½µÁ½¹•¹Ð¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡…Íå¹Œ€ ¤€ôøì($%ÑÉäì($$%½¹ÍÐÁ…•I•ÍÕ±Ð€ô½ÁÑ¥½¹Ì¹ÁÉ½‰•A…” ¤ì($$%¥˜€¡¥ÍAÉ½µ¥Í•1¥­”¡Á…•I•ÍÕ±Ð¤¤¥˜€¡½ÁÑ¥½¹Ì¹…Ý…¥ÑÍå¹I•ÍÕ±Ð¤…Ý…¥ÐÁ…•I•ÍÕ±Ðì($$%•±Í”AÉ½µ¥Í”¹É•Í½±Ù”¡Á…•I•ÍÕ±Ð¤¹…Ñ   ¤€ôøíô¤ì($%ô…Ñ €¡•ÉÉ½È¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹½¹ÉÉ½È¡•ÉÉ½È¤ì($%ô($%É•ÑÕÉ¸¹Õ±°ì(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•…‘ÁÁA…•	¥¹…ÉåMÑÉ•…´¡ÍÑÉ•…´¤ì(%½¹ÍÐÉ•…‘•È€ôÍÑÉ•…´¹•ÑI•…‘•È ¤ì(%½¹ÍÐ¡Õ¹­Ì€ômtì(%±•ÐÑ½Ñ…±1•¹Ñ €ô€Àì(%™½È€ ìì¤ì($%½¹ÍÐì‘½¹”°Ù…±Õ”ô€ô…Ý…¥ÐÉ•…‘•È¹É•… ¤ì($%¥˜€¡‘½¹”¤‰É•…¬ì($%¡Õ¹­Ì¹ÁÕÍ ¡Ù…±Õ”¤ì($%Ñ½Ñ…±1•¹Ñ €¬ôÙ…±Õ”¹‰åÑ•1•¹Ñ ì(%ô(%½¹ÍÐ‰Õ™™•È€ô¹•ÜU¥¹ÐáÉÉ…ä¡Ñ½Ñ…±1•¹Ñ ¤ì(%±•Ð½™™Í•Ð€ô€Àì(%™½È€¡½¹ÍÐ¡Õ¹¬½˜¡Õ¹­Ì¤ì($%‰Õ™™•È¹Í•Ð¡¡Õ¹¬°½™™Í•Ð¤ì($%½™™Í•Ð€¬ô¡Õ¹¬¹‰åÑ•1•¹Ñ ì(%ô(%É•ÑÕÉ¸‰Õ™™•È¹‰Õ™™•Èì)ô)™Õ¹Ñ¥½¸Ñ••ÁÁA…•IÍMÑÉ•…µ½É…ÁÑÕÉ”¡ÍÑÉ•…´°Í¡½Õ±‘…ÁÑÕÉ”¤ì(%¥˜€ …Í¡½Õ±‘…ÁÑÕÉ”¤É•ÑÕÉ¸ìÍÍÉMÑÉ•…´èÍÑÉ•…´ôì(%½¹ÍÐmÍÍÉMÑÉ•…´°Í¥‘•MÑÉ•…µt€ôÍÑÉ•…´¹Ñ•” ¤ì(%É•ÑÕÉ¸ì($%ÍÍÉMÑÉ•…´°($%Í¥‘•MÑÉ•…´(%ôì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•½¹Ñ1¥¹­!•…‘•È¡ÁÉ•±½…‘Ì¤ì(%¥˜€ …ÁÉ•±½…‘ÌñðÁÉ•±½…‘Ì¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸ÁÉ•±½…‘Ì¹µ…À ¡ÁÉ•±½…¤€ôø€ð‘íÁÉ•±½…¹¡É•™ôøìÉ•°õÁÉ•±½…ì…Ìõ™½¹ÐìÑåÁ”ô‘íÁÉ•±½…¹ÑåÁ•ôìÉ½ÍÍ½É¥¥¹€¤¹©½¥¸ ˆ°€ˆ¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉÍŒµ•ÉÉ½ÉÌ¹©Ì)™Õ¹Ñ¥½¸¡…Í¥•ÍÐ¡•ÉÉ½È¤ì(%É•ÑÕÉ¸	½½±•…¸¡•ÉÉ½È€˜˜ÑåÁ•½˜•ÉÉ½È€ôôô€‰½‰©•Ðˆ€˜˜€‰‘¥•ÍÐˆ¥¸•ÉÉ½È¤ì)ô)™Õ¹Ñ¥½¸•ÑQ¡É½Ý¹Y…±Õ•5•ÍÍ…”¡•ÉÉ½È¤ì(%É•ÑÕÉ¸•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€ü•ÉÉ½È¹µ•ÍÍ…”€èMÑÉ¥¹œ¡•ÉÉ½È¤ì)ô)™Õ¹Ñ¥½¸•ÑQ¡É½Ý¹Y…±Õ•MÑ…¬¡•ÉÉ½È¤ì(%É•ÑÕÉ¸•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€ü•ÉÉ½È¹ÍÑ…¬ñð€ˆˆ€è€ˆˆì)ô(¼¨¨(¨‘©ˆÈ¡…Í µ…Ñ¡¥¹œ9•áÐ¹©ÌÌÍÑÉ¥¹œµ¡…Í Á…­…”™½ÈIM•ÉÉ½È‘¥•ÍÑÌ¸(¨¼)™Õ¹Ñ¥½¸•ÉÉ½É¥•ÍÐ¡¥¹ÁÕÐ¤ì(%±•Ð¡…Í €ô€ÔÌàÄì(%™½È€¡±•Ð¤€ô¥¹ÁÕÐ¹±•¹Ñ €´€Äì¤€øô€Àì¤´´¤¡…Í €ô¡…Í €¨€ÌÌx¥¹ÁÕÐ¹¡…É½‘•Ð¡¤¤ì(%É•ÑÕÉ¸€¡¡…Í €øøø€À¤¹Ñ½MÑÉ¥¹œ ¤ì)ô)™Õ¹Ñ¥½¸Í…¹¥Ñ¥é•ÉÉ½É½É±¥•¹Ð¡•ÉÉ½È°¹½‘•¹Ø€ô€‰ÁÉ½‘ÕÑ¥½¸ˆ¤ì(%¥˜€¡É•Í½±Ù•ÁÁA…•MÁ•¥…±ÉÉ½È¡•ÉÉ½È¤¤É•ÑÕÉ¸•ÉÉ½Èì(%¥˜€¡¹½‘•¹Ø€„ôô€‰ÁÉ½‘ÕÑ¥½¸ˆ¤É•ÑÕÉ¸•ÉÉ½Èì(%½¹ÍÐÍ…¹¥Ñ¥é•€ô€¼¨}}AUI}|€¨¼¹•ÜÉÉ½È ‰¸•ÉÉ½È½ÕÉÉ•¥¸Ñ¡”M•ÉÙ•È½µÁ½¹•¹ÑÌÉ•¹‘•È¸Q¡”ÍÁ•¥™¥Œµ•ÍÍ…”¥Ì½µ¥ÑÑ•¥¸ÁÉ½‘ÕÑ¥½¸‰Õ¥±‘ÌÑ¼…Ù½¥±•…­¥¹œÍ•¹Í¥Ñ¥Ù”‘•Ñ…¥±Ì¸‘¥•ÍÐÁÉ½Á•ÉÑä¥Ì¥¹±Õ‘•½¸Ñ¡¥Ì•ÉÉ½È¥¹ÍÑ…¹”Ý¡¥ µ…äÁÉ½Ù¥‘”…‘‘¥Ñ¥½¹…°‘•Ñ…¥±Ì…‰½ÕÐÑ¡”¹…ÑÕÉ”½˜Ñ¡”•ÉÉ½È¸ˆ¤ì(%Í…¹¥Ñ¥é•¹‘¥•ÍÐ€ô•ÉÉ½É¥•ÍÐ¡•ÑQ¡É½Ý¹Y…±Õ•5•ÍÍ…”¡•ÉÉ½È¤€¬•ÑQ¡É½Ý¹Y…±Õ•MÑ…¬¡•ÉÉ½È¤¤ì(%É•ÑÕÉ¸Í…¹¥Ñ¥é•ì)ô)™Õ¹Ñ¥½¸É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•ÈÄ¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸€¡•ÉÉ½È¤€ôøì($%½¹ÍÐ¹½‘•¹Ø€ô½ÁÑ¥½¹Ì¹¹½‘•¹Ø€üü€‰ÁÉ½‘ÕÑ¥½¸ˆì($%¥˜€¡¡…Í¥•ÍÐ¡•ÉÉ½È¤¤É•ÑÕÉ¸MÑÉ¥¹œ¡•ÉÉ½È¹‘¥•ÍÐ¤ì($%¥˜€¡¹½‘•¹Ø€„ôô€‰ÁÉ½‘ÕÑ¥½¸ˆ€˜˜•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€˜˜•ÉÉ½È¹µ•ÍÍ…”¹¥¹±Õ‘•Ì ‰=¹±äÁ±…¥¸½‰©•ÑÌ°…¹„™•Ü‰Õ¥±Ðµ¥¹Ì°…¸‰”Á…ÍÍ•Ñ¼±¥•¹Ð½µÁ½¹•¹ÑÌˆ¤¤ì($$%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑtIMÍ•É¥…±¥é…Ñ¥½¸•ÉÉ½Èè„¹½¸µÁ±…¥¸½‰©•ÐÝ…ÌÁ…ÍÍ•™É½´„M•ÉÙ•È½µÁ½¹•¹ÐÑ¼„±¥•¹Ð½µÁ½¹•¹Ð¹q¹q¹½µµ½¸…ÕÍ•Ìéq¸€€¨A…ÍÍ¥¹œ„µ½‘Õ±”¹…µ•ÍÁ…”€¡¥µÁ½ÉÐ€¨…Ì`¤‘¥É•Ñ±ä…Ì„ÁÉ½À¹q¸€€€U¹±¥­”9•áÐ¹©Ì€¡Ý•‰Á…¬¤°Y¥Ñ”ÁÉ½‘Õ•ÌÉ•…°M4µ½‘Õ±”¹…µ•ÍÁ…”½‰©•ÑÍq¸€€€Ý¡¥ …É”¹½ÐÍ•É¥…±¥é…‰±”¸¥àèÁ…ÍÌ¥¹‘¥Ù¥‘Õ…°Ù…±Õ•Ì¥¹ÍÑ•…±q¸€€€”¹œ¸€ñ½µÀÙ…±Õ”õíµ½‘Õ±”¹Ù…±Õ•ô€¼ùq¸€€¨A…ÍÍ¥¹œ„±…ÍÌ¥¹ÍÑ…¹”€¡¹•Ü½¼ ¤¤…Ì„ÁÉ½À¹q¸€€€¥àè½¹Ù•ÉÐÑ¼„Á±…¥¸½‰©•Ð°”¹œ¸ì¥è™½¼¹¥°¹…µ”è™½¼¹¹…µ”õq¸€€¨A…ÍÍ¥¹œ„…Ñ”°5…À°½ÈM•Ð¸UÍ”€¹Ñ½%M=MÑÉ¥¹œ ¤°l¸¸¹µ…À¹•¹ÑÉ¥•Ì ¥t°•ÑŒ¹q¸€€¨A…ÍÍ¥¹œ=‰©•Ð¹É•…Ñ”¡¹Õ±°¤¸UÍ”ì€¸¸¹½‰¨ôÑ¼É•ÍÑ½É”„ÁÉ½Ñ½ÑåÁ”¹q¹q¹=É¥¥¹…°•ÉÉ½Èèˆ°•ÉÉ½È¹µ•ÍÍ…”¤ì($$%É•ÑÕÉ¸ì($%ô($%¥˜€¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑ%¹™¼€˜˜½ÁÑ¥½¹Ì¹•ÉÉ½É½¹Ñ•áÐ€˜˜•ÉÉ½È¤½ÁÑ¥½¹Ì¹É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È¡•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€ü•ÉÉ½È€è¹•ÜÉÉ½È¡•ÑQ¡É½Ý¹Y…±Õ•5•ÍÍ…”¡•ÉÉ½È¤¤°½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑ%¹™¼°½ÁÑ¥½¹Ì¹•ÉÉ½É½¹Ñ•áÐ¤ì($%¥˜€¡¹½‘•¹Ø€ôôô€‰ÁÉ½‘ÕÑ¥½¸ˆ€˜˜•ÉÉ½È¤É•ÑÕÉ¸•ÉÉ½É¥•ÍÐ¡•ÑQ¡É½Ý¹Y…±Õ•5•ÍÍ…”¡•ÉÉ½È¤€¬•ÑQ¡É½Ý¹Y…±Õ•MÑ…¬¡•ÉÉ½È¤¤ì(%ôì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉÍŒµ•ÉÉ½Èµ¡…¹‘±•È¹©Ì(¼¨¨(¨	Õ¥±„Á•ÈµÉ•ÅÕ•ÍÐIM•ÉÉ½È¡…¹‘±•ÈÑ¡…Ð•áÑÉ…ÑÌÉ•ÅÕ•ÍÐµ•Ñ…‘…Ñ„™É½´(¨Ñ¡”¥¹½µ¥¹œ]•ˆI•ÅÕ•ÍÑ€°Ý¥É•Ì¥Ð¥¹Ñ¼„É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•É€…±°°(¨…¹‰¥¹‘ÌÑ¡”½¹™¥ÕÉ•É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½É€É•Á½ÉÑ•È¸(¨(¨AÕÉ”™…Ñ½ÉäèÑ…­•Ì…±°‘•ÁÌ•áÁ±¥¥Ñ±äƒŠP¹¼±½ÍÕÉ”½Ù•Èµ½‘Õ±”µ±•Ù•°ÍÑ…Ñ”¸(¨¼)™Õ¹Ñ¥½¸É•…Ñ•ÁÁIÍ=¹ÉÉ½É!…¹‘±•È¡É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È°É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì(%½¹ÍÐÉ•ÅÕ•ÍÑ!•…‘•ÉÌ€ô=‰©•Ð¹™É½µ¹ÑÉ¥•Ì¡É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•¹ÑÉ¥•Ì ¤¤ì(%½¹ÍÐÉ•ÅÕ•ÍÑ%¹™¼€ôì($%Á…Ñ èÁ…Ñ¡¹…µ”°($%µ•Ñ¡½èÉ•ÅÕ•ÍÐ¹µ•Ñ¡½°($%¡•…‘•ÉÌèÉ•ÅÕ•ÍÑ!•…‘•ÉÌ(%ôì(%É•ÑÕÉ¸É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•ÈÄ¡ì($%•ÉÉ½É½¹Ñ•áÐèì($$%É½ÕÑ•É-¥¹è€‰ÁÀI½ÕÑ•Èˆ°($$%É½ÕÑ•A…Ñ èÉ½ÕÑ•A…Ñ ñðÁ…Ñ¡¹…µ”°($$%É½ÕÑ•QåÁ”è€‰É•¹‘•Èˆ($%ô°($%É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È°($%É•ÅÕ•ÍÑ%¹™¼(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í¡¥µÌ½•ÉÉ½Èµ‰½Õ¹‘…Éä¹©Ì)Ù…ÈÉÉ½É	½Õ¹‘…Éä€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€ÉÉ½É	½Õ¹‘…Éäœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆÔäÍ˜ÌÐÑ‘ŒÔÄÀˆ°€‰ÉÉ½É	½Õ¹‘…Éäˆ¤ì)Ù…È½É‰¥‘‘•¹	½Õ¹‘…Éä€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€½É‰¥‘‘•¹	½Õ¹‘…Éäœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆÔäÍ˜ÌÐÑ‘ŒÔÄÀˆ°€‰½É‰¥‘‘•¹	½Õ¹‘…Éäˆ¤ì)Ù…È9½Ñ½Õ¹‘	½Õ¹‘…Éä€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€9½Ñ½Õ¹‘	½Õ¹‘…Éäœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆÔäÍ˜ÌÐÑ‘ŒÔÄÀˆ°€‰9½Ñ½Õ¹‘	½Õ¹‘…Éäˆ¤ì)Ù…ÈI•‘¥É•Ñ	½Õ¹‘…Éä€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€I•‘¥É•Ñ	½Õ¹‘…Éäœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆÔäÍ˜ÌÐÑ‘ŒÔÄÀˆ°€‰I•‘¥É•Ñ	½Õ¹‘…Éäˆ¤ì)Ù…ÈU¹…ÕÑ¡½É¥é•‘	½Õ¹‘…Éä€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€U¹…ÕÑ¡½É¥é•‘	½Õ¹‘…Éäœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆÔäÍ˜ÌÐÑ‘ŒÔÄÀˆ°€‰U¹…ÕÑ¡½É¥é•‘	½Õ¹‘…Éäˆ¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í¡¥µÌ½±…å½ÕÐµÍ•µ•¹Ðµ½¹Ñ•áÐ¹©Ì(¼¨¨(¨1…å½ÕÐÍ•µ•¹Ð½¹Ñ•áÐÁÉ½Ù¥‘•È¸(¨(¨5ÕÍÐ‰”€‰ÕÍ”±¥•¹ÐˆÍ¼Ñ¡…ÐY¥Ñ”ÌIM‰Õ¹‘±•ÈÉ•¹‘•ÉÌÑ¡¥Ì½µÁ½¹•¹Ð¥¸(¨Ñ¡”MMH½‰É½ÝÍ•È•¹Ù¥É½¹µ•¹ÐÝ¡•É”I•…Ð¹É•…Ñ•½¹Ñ•áÐ¥Ì…Ù…¥±…‰±”¸Q¡”IM(¨•¹ÑÉä¥µÁ½ÉÑÌ…¹É•¹‘•ÉÌ1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È‘¥É•Ñ±ä°‰ÕÐ‰•…ÕÍ”½˜Ñ¡”(¨€‰ÕÍ”±¥•¹Ðˆ‰½Õ¹‘…ÉäÑ¡”…ÑÕ…°•á•ÕÑ¥½¸¡…ÁÁ•¹Ì½¸Ñ¡”MMH½±¥•¹ÐÍ¥‘”(¨Ý¡•É”Ñ¡”½¹Ñ•áÐ…¸‰”É•…Ñ•…¹½¹ÍÕµ•‰äÕÍ•M•±•Ñ•‘1…å½ÕÑM•µ•¹Ð¡Ì¤¸(¨(¨]¥Ñ¡½ÕÐ€‰ÕÍ”±¥•¹Ðˆ°Ñ¡¥ÌÉÕ¹Ì¥¸Ñ¡”IM•¹Ù¥É½¹µ•¹ÐÝ¡•É”(¨I•…Ð¹É•…Ñ•½¹Ñ•áÐ¥ÌÕ¹‘•™¥¹•°•Ñ1…å½ÕÑM•µ•¹Ñ½¹Ñ•áÐ ¤É•ÑÕÉ¹Ì¹Õ±°°(¨Ñ¡”ÁÉ½Ù¥‘•È‰•½µ•Ì„¹¼µ½À°…¹ÕÍ•M•±•Ñ•‘1…å½ÕÑM•µ•¹ÑÌ…±Ý…åÌÉ•ÑÕÉ¹Ìmt¸(¨(¨Q¡”½¹Ñ•áÐ¥ÌÍ¡…É•Ý¥Ñ ¹…Ù¥…Ñ¥½¸¹ÑÌÙ¥„•Ñ1…å½ÕÑM•µ•¹Ñ½¹Ñ•áÐ ¤(¨Ñ¼…Ù½¥É•…Ñ¥¹œÍ•Á…É…Ñ”½¹Ñ•áÑÌ¥¸‘¥™™•É•¹Ðµ½‘Õ±•Ì¸(¨¼(¼¨¨(¨]É…ÁÌ¡¥±‘É•¸Ý¥Ñ Ñ¡”±…å½ÕÐÍ•µ•¹Ð½¹Ñ•áÐ¸(¨(¨… ±…å½ÕÐ¥¸Ñ¡”ÁÀI½ÕÑ•ÈÑÉ•”ÝÉ…ÁÌ¥ÑÌ¡¥±‘É•¸Ý¥Ñ Ñ¡¥ÌÁÉ½Ù¥‘•È°(¨Á…ÍÍ¥¹œ„µ…À½˜Á…É…±±•°É½ÕÑ”­•äÑ¼Í•µ•¹ÐÁ…Ñ ¸Q¡”€‰¡¥±‘É•¸ˆ­•ä¥Ì(¨…±Ý…åÌÁÉ•Í•¹Ð€¡Ñ¡”‘•™…Õ±ÐÁ…É…±±•°É½ÕÑ”¤¸9…µ•Á…É…±±•°Í±½ÑÌ…ÐÑ¡¥Ì(¨±…å½ÕÐ±•Ù•°…‘Ñ¡•¥È½Ý¸­•åÌ¸(¨(¨½µÁ½¹•¹ÑÌ¥¹Í¥‘”Ñ¡”ÁÉ½Ù¥‘•È…±°ÕÍ•M•±•Ñ•‘1…å½ÕÑM•µ•¹ÑÌ¡Á…É…±±•±I½ÕÑ•Í-•ä¤(¨Ñ¼É•…Ñ¡”Í•µ•¹ÑÌ™½È„ÍÁ•¥™¥ŒÁ…É…±±•°É½ÕÑ”¸(¨¼)Ù…È1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•Èœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆÄÕŒÄá™…••™˜ˆ°€‰1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•Èˆ¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í¡¥µÌ½Í±½Ð¹©Ì(¼¨¨(¨!½±‘ÌÉ•Í½±Ù•ÁÁ±•µ•¹ÑÌ€¡¹½Ð„AÉ½µ¥Í”¤¸I•…Ð€ÄäÌÕÍ”¡AÉ½µ¥Í”¤‘ÕÉ¥¹œ(¨¡å‘É…Ñ¥½¸ÑÉ¥•ÉÌ€‰…Íå¹Œ±¥•¹Ð½µÁ½¹•¹Ðˆ™½È¹…Ñ¥Ù”AÉ½µ¥Í•ÌÑ¡…Ð±…¬(¨I•…ÐÌ¥¹Ñ•É¹…°€¹ÍÑ…ÑÕÌÁÉ½Á•ÉÑä¸MÑ½É¥¹œÉ•Í½±Ù•Ù…±Õ•ÌÍ¥‘•ÍÑ•ÁÌÑ¡¥Ì¸(¨¼)Ù…È¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€¡¥±‘É•¸œ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆáŒÁ˜ÈÄÙŒÐØÀÐˆ°€‰¡¥±‘É•¸ˆ¤ì)Ù…ÈA…É…±±•±M±½Ð€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€A…É…±±•±M±½Ðœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆáŒÁ˜ÈÄÙŒÐØÀÐˆ°€‰A…É…±±•±M±½Ðˆ¤ì)Ù…ÈM±½Ð€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€M±½Ðœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€ˆáŒÁ˜ÈÄÙŒÐØÀÐˆ°€‰M±½Ðˆ¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ•¹‘•Èµ‘•Á•¹‘•¹ä¹©Ì)™Õ¹Ñ¥½¸É•…Ñ•ÁÁI•¹‘•É•Á•¹‘•¹ä ¤ì(%±•ÐÉ•±•…Í•€ô™…±Í”ì(%±•ÐÉ•Í½±Ù”ì(%É•ÑÕÉ¸ì($%ÁÉ½µ¥Í”è¹•ÜAÉ½µ¥Í” ¡ÁÉ½µ¥Í•I•Í½±Ù”¤€ôøì($$%É•Í½±Ù”€ôÁÉ½µ¥Í•I•Í½±Ù”ì($%ô¤°($%É•±•…Í” ¤ì($$%¥˜€¡É•±•…Í•¤É•ÑÕÉ¸ì($$%É•±•…Í•€ôÑÉÕ”ì($$%É•Í½±Ù” ¤ì($%ô(%ôì)ô)™Õ¹Ñ¥½¸É•¹‘•É™Ñ•ÉÁÁ•Á•¹‘•¹¥•Ì¡¡¥±‘É•¸°‘•Á•¹‘•¹¥•Ì¤ì(%¥˜€¡‘•Á•¹‘•¹¥•Ì¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸¡¥±‘É•¸ì(%…Íå¹Œ™Õ¹Ñ¥½¸Ý…¥ÑÁÁI•¹‘•É•Á•¹‘•¹¥•Ì ¤ì($%…Ý…¥ÐAÉ½µ¥Í”¹…±°¡‘•Á•¹‘•¹¥•Ì¹µ…À ¡‘•Á•¹‘•¹ä¤€ôø‘•Á•¹‘•¹ä¹ÁÉ½µ¥Í”¤¤ì($%É•ÑÕÉ¸¡¥±‘É•¸ì(%ô(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Ý…¥ÑÁÁI•¹‘•É•Á•¹‘•¹¥•Ì°íô¤ì)ô)™Õ¹Ñ¥½¸É•¹‘•É]¥Ñ¡ÁÁ•Á•¹‘•¹å	…ÉÉ¥•È¡¡¥±‘É•¸°‘•Á•¹‘•¹ä¤ì(%™Õ¹Ñ¥½¸I•±•…Í•ÁÁI•¹‘•É•Á•¹‘•¹ä ¤ì($%‘•Á•¹‘•¹ä¹É•±•…Í” ¤ì($%É•ÑÕÉ¸¹Õ±°ì(%ô(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èm¡¥±‘É•¸°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡I•±•…Í•ÁÁI•¹‘•É•Á•¹‘•¹ä°íô¥tô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µÍ•µ•¹ÐµÍÑ…Ñ”¹©Ì)™Õ¹Ñ¥½¸¥Í=ÁÑ¥½¹…±…Ñ¡±±M•µ•¹Ð¡Í•µ•¹Ð¤ì(%É•ÑÕÉ¸Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰ml¸¸¸ˆ¤€˜˜Í•µ•¹Ð¹•¹‘Í]¥Ñ  ‰utˆ¤€˜˜Í•µ•¹Ð¹±•¹Ñ €ø€Üì)ô)™Õ¹Ñ¥½¸¥Í…Ñ¡±±M•µ•¹Ð¡Í•µ•¹Ð¤ì(%É•ÑÕÉ¸Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰l¸¸¸ˆ¤€˜˜Í•µ•¹Ð¹•¹‘Í]¥Ñ  ‰tˆ¤€˜˜Í•µ•¹Ð¹±•¹Ñ €ø€Ôì)ô)™Õ¹Ñ¥½¸¥Íå¹…µ¥M•µ•¹Ð¡Í•µ•¹Ð¤ì(%É•ÑÕÉ¸Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰lˆ¤€˜˜Í•µ•¹Ð¹•¹‘Í]¥Ñ  ‰tˆ¤€˜˜€…Í•µ•¹Ð¹¥¹±Õ‘•Ì ˆ¸ˆ¤ì)ô)™Õ¹Ñ¥½¸¥ÍI½ÕÑ•É½ÕÁM•µ•¹Ð¡Í•µ•¹Ð¤ì(%É•ÑÕÉ¸Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ˆ ˆ¤€˜˜Í•µ•¹Ð¹•¹‘Í]¥Ñ  ˆ¤ˆ¤ì)ô)™Õ¹Ñ¥½¸™½Éµ…ÑA…É…µM•µ•¹ÑY…±Õ”¡Ù…±Õ”¤ì(%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤¤É•ÑÕÉ¸Ù…±Õ”¹©½¥¸ ˆ¼ˆ¤ì(%É•ÑÕÉ¸Ù…±Õ”ì)ô)™Õ¹Ñ¥½¸É•…‘M•µ•¹ÑA…É…´¡Í•µ•¹Ð¤ì(%¥˜€¡¥Í=ÁÑ¥½¹…±…Ñ¡±±M•µ•¹Ð¡Í•µ•¹Ð¤¤É•ÑÕÉ¸ì($%¹…µ”èÍ•µ•¹Ð¹Í±¥” Ô°€´È¤°($%ÑåÁ”è€‰½Œˆ(%ôì(%¥˜€¡¥Í…Ñ¡±±M•µ•¹Ð¡Í•µ•¹Ð¤¤É•ÑÕÉ¸ì($%¹…µ”èÍ•µ•¹Ð¹Í±¥” Ð°€´Ä¤°($%ÑåÁ”è€‰Œˆ(%ôì(%¥˜€¡¥Íå¹…µ¥M•µ•¹Ð¡Í•µ•¹Ð¤¤É•ÑÕÉ¸ì($%¹…µ”èÍ•µ•¹Ð¹Í±¥” Ä°€´Ä¤°($%ÑåÁ”è€‰ˆ(%ôì(%É•ÑÕÉ¸¹Õ±°ì)ô)™Õ¹Ñ¥½¸™½Éµ…ÑM•µ•¹ÑMÑ…Ñ•A…É…µY…±Õ”¡Á…É…´°Á…É…µÌ°™…±±‰…­M•µ•¹Ð¤ì(%½¹ÍÐÙ…±Õ”€ôÁ…É…µÍmÁ…É…´¹¹…µ•tì(%¥˜€¡Á…É…´¹ÑåÁ”€ôôô€‰½Œˆ€˜˜€¡Ù…±Õ”€ôôôÙ½¥€ÀñðÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤€˜˜Ù…±Õ”¹±•¹Ñ €ôôô€À¤¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸™½Éµ…ÑA…É…µM•µ•¹ÑY…±Õ”¡Ù…±Õ”¤€üü™…±±‰…­M•µ•¹Ðì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•M¥¹±•M•µ•¹ÑMÑ…Ñ•-•ä¡Í•µ•¹Ð°Á…É…µÌ¤ì(%½¹ÍÐÁ…É…´€ôÉ•…‘M•µ•¹ÑA…É…´¡Í•µ•¹Ð¤ì(%¥˜€ …Á…É…´¤É•ÑÕÉ¸Í•µ•¹Ðì(%É•ÑÕÉ¸€‘íÁ…É…´¹¹…µ•õð‘í™½Éµ…ÑM•µ•¹ÑMÑ…Ñ•A…É…µY…±Õ”¡Á…É…´°Á…É…µÌ°Í•µ•¹Ð¥õð‘íÁ…É…´¹ÑåÁ•õ€ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•¡¥±‘M•µ•¹ÑÌ¡É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸°Á…É…µÌ¤ì(%½¹ÍÐÉ…ÝM•µ•¹ÑÌ€ôÉ½ÕÑ•M•µ•¹ÑÌ¹Í±¥”¡ÑÉ••A½Í¥Ñ¥½¸¤ì(%½¹ÍÐÉ•Í½±Ù•‘M•µ•¹ÑÌ€ômtì(%™½È€¡½¹ÍÐÍ•µ•¹Ð½˜É…ÝM•µ•¹ÑÌ¤ì($%¥˜€¡¥Í=ÁÑ¥½¹…±…Ñ¡±±M•µ•¹Ð¡Í•µ•¹Ð¤¤ì($$%½¹ÍÐÁ…É…µY…±Õ”€ôÁ…É…µÍmÍ•µ•¹Ð¹Í±¥” Ô°€´È¥tì($$%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡Á…É…µY…±Õ”¤€˜˜Á…É…µY…±Õ”¹±•¹Ñ €ôôô€À¤½¹Ñ¥¹Õ”ì($$%½¹ÍÐÉ•Í½±Ù•‘Y…±Õ”€ô™½Éµ…ÑA…É…µM•µ•¹ÑY…±Õ”¡Á…É…µY…±Õ”¤ì($$%¥˜€¡É•Í½±Ù•‘Y…±Õ”€„ôôÙ½¥€À¤É•Í½±Ù•‘M•µ•¹ÑÌ¹ÁÕÍ ¡É•Í½±Ù•‘Y…±Õ”¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%¥˜€¡¥Í…Ñ¡±±M•µ•¹Ð¡Í•µ•¹Ð¤¤ì($$%½¹ÍÐÁ…É…µ9…µ”€ôÍ•µ•¹Ð¹Í±¥” Ð°€´Ä¤ì($$%É•Í½±Ù•‘M•µ•¹ÑÌ¹ÁÕÍ ¡™½Éµ…ÑA…É…µM•µ•¹ÑY…±Õ”¡Á…É…µÍmÁ…É…µ9…µ•t¤€üüÍ•µ•¹Ð¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%¥˜€¡¥Íå¹…µ¥M•µ•¹Ð¡Í•µ•¹Ð¤¤ì($$%½¹ÍÐÁ…É…µ9…µ”€ôÍ•µ•¹Ð¹Í±¥” Ä°€´Ä¤ì($$%É•Í½±Ù•‘M•µ•¹ÑÌ¹ÁÕÍ ¡™½Éµ…ÑA…É…µM•µ•¹ÑY…±Õ”¡Á…É…µÍmÁ…É…µ9…µ•t¤€üüÍ•µ•¹Ð¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%É•Í½±Ù•‘M•µ•¹ÑÌ¹ÁÕÍ ¡Í•µ•¹Ð¤ì(%ô(%É•ÑÕÉ¸É•Í½±Ù•‘M•µ•¹ÑÌì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•M•µ•¹ÑMÑ…Ñ•-•ä¡É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸°Á…É…µÌ¤ì(%™½È€¡½¹ÍÐÍ•µ•¹Ð½˜É½ÕÑ•M•µ•¹ÑÌ¹Í±¥”¡ÑÉ••A½Í¥Ñ¥½¸¤¤¥˜€ …¥ÍI½ÕÑ•É½ÕÁM•µ•¹Ð¡Í•µ•¹Ð¤¤É•ÑÕÉ¸É•Í½±Ù•M¥¹±•M•µ•¹ÑMÑ…Ñ•-•ä¡Í•µ•¹Ð°Á…É…µÌ¤ì(%É•ÑÕÉ¸€ˆˆì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•I½ÕÑ•MÑ…Ñ•-•ä¡É½ÕÑ•M•µ•¹ÑÌ°Á…É…µÌ¤ì(%½¹ÍÐÍÑ…Ñ•A…Ñ €ômtì(%™½È€¡½¹ÍÐÍ•µ•¹Ð½˜É½ÕÑ•M•µ•¹ÑÌ¤¥˜€ …¥ÍI½ÕÑ•É½ÕÁM•µ•¹Ð¡Í•µ•¹Ð¤¤ÍÑ…Ñ•A…Ñ ¹ÁÕÍ ¡É•Í½±Ù•M¥¹±•M•µ•¹ÑMÑ…Ñ•-•ä¡Í•µ•¹Ð°Á…É…µÌ¤¤ì(%É•ÑÕÉ¸ÍÑ…Ñ•A…Ñ ¹±•¹Ñ €ø€À€ü)M=8¹ÍÑÉ¥¹¥™ä¡ÍÑ…Ñ•A…Ñ ¤€è€ˆˆì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µÉ½ÕÑ”µÝ¥É¥¹œ¹©Ì)™Õ¹Ñ¥½¸•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡µ½‘Õ±”¤ì(%É•ÑÕÉ¸µ½‘Õ±”ü¹‘•™…Õ±Ð€üü¹Õ±°ì)ô)™Õ¹Ñ¥½¸•ÑÉÉ½É	½Õ¹‘…ÉåáÁ½ÉÐ¡µ½‘Õ±”¤ì(%É•ÑÕÉ¸µ½‘Õ±”ü¹‘•™…Õ±Ð€üü¹Õ±°ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•QÉ••A…Ñ ¡É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸¤ì(%½¹ÍÐÑÉ••A…Ñ¡M•µ•¹ÑÌ€ôÉ½ÕÑ•M•µ•¹ÑÌü¹Í±¥” À°ÑÉ••A½Í¥Ñ¥½¸¤€üümtì(%¥˜€¡ÑÉ••A…Ñ¡M•µ•¹ÑÌ¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸€ˆ¼ˆì(%É•ÑÕÉ¸€¼‘íÑÉ••A…Ñ¡M•µ•¹ÑÌ¹©½¥¸ ˆ¼ˆ¥õ€ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•1…å½ÕÑ¹ÑÉ¥•Ì¡É½ÕÑ”¤ì(%É•ÑÕÉ¸É½ÕÑ”¹±…å½ÕÑÌ¹µ…À ¡±…å½ÕÑ5½‘Õ±”°¥¹‘•à¤€ôøì($%½¹ÍÐÑÉ••A½Í¥Ñ¥½¸€ôÉ½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹m¥¹‘•át€üü€Àì($%½¹ÍÐÑÉ••A…Ñ €ôÉ•…Ñ•ÁÁA…•QÉ••A…Ñ ¡É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸¤ì($%É•ÑÕÉ¸ì($$%•ÉÉ½É5½‘Õ±”èÉ½ÕÑ”¹•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ì€ü¹Õ±°€èÉ½ÕÑ”¹•ÉÉ½ÉÌü¹m¥¹‘•át€üü¹Õ±°°($$%™½É‰¥‘‘•¹5½‘Õ±”èÉ½ÕÑ”¹™½É‰¥‘‘•¹Ìü¹m¥¹‘•át€üü¹Õ±°°($$%¥èÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•1…å½ÕÑ%¡ÑÉ••A…Ñ ¤°($$%±…å½ÕÑ5½‘Õ±”°($$%¹½Ñ½Õ¹‘5½‘Õ±”èÉ½ÕÑ”¹¹½Ñ½Õ¹‘Ìü¹m¥¹‘•át€üü¹Õ±°°($$%Õ¹…ÕÑ¡½É¥é•‘5½‘Õ±”èÉ½ÕÑ”¹Õ¹…ÕÑ¡½É¥é•‘Ìü¹m¥¹‘•át€üü¹Õ±°°($$%ÑÉ••A…Ñ °($$%ÑÉ••A½Í¥Ñ¥½¸($%ôì(%ô¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•Q•µÁ±…Ñ•¹ÑÉ¥•Ì¡É½ÕÑ”¤ì(%É•ÑÕÉ¸€¡É½ÕÑ”¹Ñ•µÁ±…Ñ•Ì€üümt¤¹µ…À ¡Ñ•µÁ±…Ñ•5½‘Õ±”°¥¹‘•à¤€ôøì($%½¹ÍÐÑÉ••A½Í¥Ñ¥½¸€ôÉ½ÕÑ”¹Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìü¹m¥¹‘•át€üü€Àì($%½¹ÍÐÑÉ••A…Ñ €ôÉ•…Ñ•ÁÁA…•QÉ••A…Ñ ¡É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸¤ì($%É•ÑÕÉ¸ì($$%¥èÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•Q•µÁ±…Ñ•%¡ÑÉ••A…Ñ ¤°($$%Ñ•µÁ±…Ñ•5½‘Õ±”°($$%ÑÉ••A…Ñ °($$%ÑÉ••A½Í¥Ñ¥½¸($%ôì(%ô¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•ÉÉ½É¹ÑÉ¥•Ì¡É½ÕÑ”¤ì(%É•ÑÕÉ¸€¡É½ÕÑ”¹•ÉÉ½ÉA…Ñ¡Ì€üüÉ½ÕÑ”¹•ÉÉ½ÉÌ€üümt¤¹™±…Ñ5…À ¡•ÉÉ½É5½‘Õ±”°¥¹‘•à¤€ôøì($%¥˜€ …•ÉÉ½É5½‘Õ±”¤É•ÑÕÉ¸mtì($%½¹ÍÐÑÉ••A½Í¥Ñ¥½¸€ôÉ½ÕÑ”¹•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìü¹m¥¹‘•átì($%¥˜€¡ÑÉ••A½Í¥Ñ¥½¸€ôôôÙ½¥€À¤É•ÑÕÉ¸mtì($%É•ÑÕÉ¸mì($$%•ÉÉ½É5½‘Õ±”°($$%ÑÉ••A½Í¥Ñ¥½¸($%õtì(%ô¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•A…É…±±•±M±½Ñ¹ÑÉ¥•Ì¡±…å½ÕÑ%¹‘•à°±…å½ÕÑ¹ÑÉ¥•Ì°É½ÕÑ”°•Ñ™™•Ñ¥Ù•M±½ÑA…É…µÌ¤ì(%½¹ÍÐÁ…É…±±•±M±½ÑÌ€ôíôì(%™½È€¡½¹ÍÐmÍ±½Ñ-•ä°Í±½Ñt½˜=‰©•Ð¹•¹ÑÉ¥•Ì¡É½ÕÑ”¹Í±½ÑÌ€üüíô¤¤ì($%½¹ÍÐÍ±½Ñ9…µ”€ôÍ±½Ð¹¹…µ”ì($%½¹ÍÐÑ…É•Ñ%¹‘•à€ôÍ±½Ð¹±…å½ÕÑ%¹‘•à€øô€À€üÍ±½Ð¹±…å½ÕÑ%¹‘•à€è±…å½ÕÑ¹ÑÉ¥•Ì¹±•¹Ñ €´€Äì($%¥˜€¡Ñ…É•Ñ%¹‘•à€„ôô±…å½ÕÑ%¹‘•à¤½¹Ñ¥¹Õ”ì($%½¹ÍÐÑÉ••A…Ñ €ô±…å½ÕÑ¹ÑÉ¥•ÍmÑ…É•Ñ%¹‘•átü¹ÑÉ••A…Ñ €üü€ˆ¼ˆì($%½¹ÍÐÍ±½ÑA…É…µÌ€ô•Ñ™™•Ñ¥Ù•M±½ÑA…É…µÌ¡Í±½Ñ-•ä°Í±½Ñ9…µ”¤ì($%Á…É…±±•±M±½ÑÍmÍ±½Ñ9…µ•t€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È°ì($$%Í•µ•¹Ñ5…Àèì¡¥±‘É•¸èÍ±½Ð¹É½ÕÑ•M•µ•¹ÑÌ€üÉ•Í½±Ù•ÁÁA…•¡¥±‘M•µ•¹ÑÌ¡Í±½Ð¹É½ÕÑ•M•µ•¹ÑÌ°€À°Í±½ÑA…É…µÌ¤€èmtô°($$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M±½Ð°ì¥èÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•M±½Ñ%¡Í±½Ñ9…µ”°ÑÉ••A…Ñ ¤ô¤($%ô¤ì(%ô(%É•ÑÕÉ¸=‰©•Ð¹­•åÌ¡Á…É…±±•±M±½ÑÌ¤¹±•¹Ñ €ø€À€üÁ…É…±±•±M±½ÑÌ€èÙ½¥€Àì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•I½ÕÑ•!•…¡µ•Ñ…‘…Ñ„°Ù¥•ÝÁ½ÉÐ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èl($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰µ•Ñ„ˆ°ì¡…ÉM•Ðè€‰ÕÑ˜´àˆô¤°($%µ•Ñ…‘…Ñ„€ü€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡5•Ñ…‘…Ñ…!•…°ìµ•Ñ…‘…Ñ„ô¤€è¹Õ±°°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Y¥•ÝÁ½ÉÑ!•…°ìÙ¥•ÝÁ½ÉÐô¤(%tô¤ì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•±•µ•¹ÑÌ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ€ô½ÁÑ¥½¹Ì¹¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ€üü¹Õ±°ì(%½¹ÍÐÉ½ÕÑ•M•µ•¹ÑÌ€ô½ÁÑ¥½¹Ì¹É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ€üümtì(%½¹ÍÐÉ½ÕÑ•I•Í•Ñ-•ä€ôÉ•Í½±Ù•ÁÁA…•I½ÕÑ•MÑ…Ñ•-•ä¡É½ÕÑ•M•µ•¹ÑÌ°½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ¤ì(%½¹ÍÐÉ½ÕÑ•%€ôÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•I½ÕÑ•%¡½ÁÑ¥½¹Ì¹É½ÕÑ•A…Ñ °¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ¤ì(%½¹ÍÐÁ…•%€ôÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•A…•%¡½ÁÑ¥½¹Ì¹É½ÕÑ•A…Ñ °¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ¤ì(%½¹ÍÐ±…å½ÕÑ¹ÑÉ¥•Ì€ôÉ•…Ñ•ÁÁA…•1…å½ÕÑ¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”¤ì(%½¹ÍÐÑ•µÁ±…Ñ•¹ÑÉ¥•Ì€ôÉ•…Ñ•ÁÁA…•Q•µÁ±…Ñ•¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”¤ì(%½¹ÍÐ•ÉÉ½É¹ÑÉ¥•Ì€ôÉ•…Ñ•ÁÁA…•ÉÉ½É¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”¤ì(%½¹ÍÐ±…å½ÕÑ¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%½¹ÍÐÑ•µÁ±…Ñ•¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%½¹ÍÐ•ÉÉ½É¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%™½È€¡½¹ÍÐ±…å½ÕÑ¹ÑÉä½˜±…å½ÕÑ¹ÑÉ¥•Ì¤±…å½ÕÑ¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸¹Í•Ð¡±…å½ÕÑ¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸°±…å½ÕÑ¹ÑÉä¤ì(%™½È€¡½¹ÍÐÑ•µÁ±…Ñ•¹ÑÉä½˜Ñ•µÁ±…Ñ•¹ÑÉ¥•Ì¤Ñ•µÁ±…Ñ•¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸¹Í•Ð¡Ñ•µÁ±…Ñ•¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸°Ñ•µÁ±…Ñ•¹ÑÉä¤ì(%™½È€¡½¹ÍÐ•ÉÉ½É¹ÑÉä½˜•ÉÉ½É¹ÑÉ¥•Ì¤•ÉÉ½É¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸¹Í•Ð¡•ÉÉ½É¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸°•ÉÉ½É¹ÑÉä¤ì(%½¹ÍÐ±…å½ÕÑ%¹‘¥•Í	åQÉ••A½Í¥Ñ¥½¸€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%™½È€¡±•Ð¥¹‘•à€ô€Àì¥¹‘•à€ð±…å½ÕÑ¹ÑÉ¥•Ì¹±•¹Ñ ì¥¹‘•à¬¬¤±…å½ÕÑ%¹‘¥•Í	åQÉ••A½Í¥Ñ¥½¸¹Í•Ð¡±…å½ÕÑ¹ÑÉ¥•Ím¥¹‘•át¹ÑÉ••A½Í¥Ñ¥½¸°¥¹‘•à¤ì(%½¹ÍÐ±…å½ÕÑ•Á•¹‘•¹¥•Í	å%¹‘•à€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%½¹ÍÐ±…å½ÕÑ•Á•¹‘•¹¥•Í	•™½É”€ômtì(%½¹ÍÐÍ±½Ñ•Á•¹‘•¹¥•Í	å1…å½ÕÑ%¹‘•à€ômtì(%½¹ÍÐÑ•µÁ±…Ñ••Á•¹‘•¹¥•Í	å%€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%½¹ÍÐÑ•µÁ±…Ñ••Á•¹‘•¹¥•Í	•™½É•	å%€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%½¹ÍÐÁ…••Á•¹‘•¹¥•Ì€ômtì(%½¹ÍÐÉ½½Ñ1…å½ÕÑQÉ••A…Ñ €ô±…å½ÕÑ¹ÑÉ¥•ÍlÁtü¹ÑÉ••A…Ñ €üü¹Õ±°ì(%½¹ÍÐ•±•µ•¹ÑÌ€ôì€¸¸¹ÁÁ±•µ•¹ÑÍ]¥É”¹É•…Ñ•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡ì($%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°($%±…å½ÕÑ%‘Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”¹¥‘Ìü¹±…å½ÕÑÌ€üü±…å½ÕÑ¹ÑÉ¥•Ì¹µ…À ¡•¹ÑÉä¤€ôø•¹ÑÉä¹¥¤°($%É½½Ñ1…å½ÕÑQÉ••A…Ñ °($%É½ÕÑ•%(%ô¤ôì(%½¹ÍÐÍ±½Ñ9…µ•½Õ¹ÑÌ€ô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(%™½È€¡½¹ÍÐÍ±½Ð½˜=‰©•Ð¹Ù…±Õ•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹Í±½ÑÌ€üüíô¤¤ì($%½¹ÍÐÍ±½Ñ9…µ”€ôÍ±½Ð¹¹…µ”ì($%Í±½Ñ9…µ•½Õ¹ÑÌ¹Í•Ð¡Í±½Ñ9…µ”°€¡Í±½Ñ9…µ•½Õ¹ÑÌ¹•Ð¡Í±½Ñ9…µ”¤€üü€À¤€¬€Ä¤ì(%ô(%½¹ÍÐ½É‘•É•‘QÉ••A½Í¥Ñ¥½¹Ì€ôÉÉ…ä¹™É½´¡¹•ÜM•Ð¡l($$¸¸¹±…å½ÕÑ¹ÑÉ¥•Ì¹µ…À ¡•¹ÑÉä¤€ôø•¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸¤°($$¸¸¹Ñ•µÁ±…Ñ•¹ÑÉ¥•Ì¹µ…À ¡•¹ÑÉä¤€ôø•¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸¤°($$¸¸¹•ÉÉ½É¹ÑÉ¥•Ì¹µ…À ¡•¹ÑÉä¤€ôø•¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸¤(%t¤¤¹Í½ÉÐ ¡±•™Ð°É¥¡Ð¤€ôø±•™Ð€´É¥¡Ð¤ì(%½¹ÍÐÉ•Í½±Ù•M±½Ñ=Ù•ÉÉ¥‘”€ô€¡Í±½Ñ-•ä°Í±½Ñ9…µ”¤€ôøì($%½¹ÍÐ½Ù•ÉÉ¥‘•	å-•ä€ô½ÁÑ¥½¹Ì¹Í±½Ñ=Ù•ÉÉ¥‘•Ìü¹mÍ±½Ñ-•åtì($%¥˜€¡½Ù•ÉÉ¥‘•	å-•ä¤É•ÑÕÉ¸½Ù•ÉÉ¥‘•	å-•äì($%¥˜€¡Í±½Ñ-•ä€ôôôÍ±½Ñ9…µ”ñð€¡Í±½Ñ9…µ•½Õ¹ÑÌ¹•Ð¡Í±½Ñ9…µ”¤€üü€À¤€ôôô€Ä¤É•ÑÕÉ¸½ÁÑ¥½¹Ì¹Í±½Ñ=Ù•ÉÉ¥‘•Ìü¹mÍ±½Ñ9…µ•tì(%ôì(%½¹ÍÐ•Ñ™™•Ñ¥Ù•M±½ÑA…É…µÌ€ô€¡Í±½Ñ-•ä°Í±½Ñ9…µ”¤€ôøÉ•Í½±Ù•M±½Ñ=Ù•ÉÉ¥‘”¡Í±½Ñ-•ä°Í±½Ñ9…µ”¤ü¹Á…É…µÌ€üü½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌì(%™½È€¡½¹ÍÐÑÉ••A½Í¥Ñ¥½¸½˜½É‘•É•‘QÉ••A½Í¥Ñ¥½¹Ì¤ì($%½¹ÍÐ±…å½ÕÑ%¹‘•à€ô±…å½ÕÑ%¹‘¥•Í	åQÉ••A½Í¥Ñ¥½¸¹•Ð¡ÑÉ••A½Í¥Ñ¥½¸¤ì($%¥˜€¡±…å½ÕÑ%¹‘•à€„ôôÙ½¥€À¤ì($$%½¹ÍÐ±…å½ÕÑ¹ÑÉä€ô±…å½ÕÑ¹ÑÉ¥•Ím±…å½ÕÑ%¹‘•átì($$%±…å½ÕÑ•Á•¹‘•¹¥•Í	•™½É•m±…å½ÕÑ%¹‘•át€ôl¸¸¹Á…••Á•¹‘•¹¥•Ítì($$%¥˜€¡•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡±…å½ÕÑ¹ÑÉä¹±…å½ÕÑ5½‘Õ±”¤¤ì($$$%½¹ÍÐ±…å½ÕÑ•Á•¹‘•¹ä€ôÉ•…Ñ•ÁÁI•¹‘•É•Á•¹‘•¹ä ¤ì($$$%±…å½ÕÑ•Á•¹‘•¹¥•Í	å%¹‘•à¹Í•Ð¡±…å½ÕÑ%¹‘•à°±…å½ÕÑ•Á•¹‘•¹ä¤ì($$$%Á…••Á•¹‘•¹¥•Ì¹ÁÕÍ ¡±…å½ÕÑ•Á•¹‘•¹ä¤ì($$%ô($$%Í±½Ñ•Á•¹‘•¹¥•Í	å1…å½ÕÑ%¹‘•ám±…å½ÕÑ%¹‘•át€ôl¸¸¹Á…••Á•¹‘•¹¥•Ítì($%ô($%½¹ÍÐÑ•µÁ±…Ñ•¹ÑÉä€ôÑ•µÁ±…Ñ•¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸¹•Ð¡ÑÉ••A½Í¥Ñ¥½¸¤ì($%¥˜€ …Ñ•µÁ±…Ñ•¹ÑÉäñð€…•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Ñ•µÁ±…Ñ•¹ÑÉä¹Ñ•µÁ±…Ñ•5½‘Õ±”¤¤½¹Ñ¥¹Õ”ì($%½¹ÍÐÑ•µÁ±…Ñ••Á•¹‘•¹ä€ôÉ•…Ñ•ÁÁI•¹‘•É•Á•¹‘•¹ä ¤ì($%Ñ•µÁ±…Ñ••Á•¹‘•¹¥•Í	å%¹Í•Ð¡Ñ•µÁ±…Ñ•¹ÑÉä¹¥°Ñ•µÁ±…Ñ••Á•¹‘•¹ä¤ì($%Ñ•µÁ±…Ñ••Á•¹‘•¹¥•Í	•™½É•	å%¹Í•Ð¡Ñ•µÁ±…Ñ•¹ÑÉä¹¥°l¸¸¹Á…••Á•¹‘•¹¥•Ít¤ì($%Á…••Á•¹‘•¹¥•Ì¹ÁÕÍ ¡Ñ•µÁ±…Ñ••Á•¹‘•¹ä¤ì(%ô(%•±•µ•¹ÑÍmÁ…•%‘t€ôÉ•¹‘•É™Ñ•ÉÁÁ•Á•¹‘•¹¥•Ì¡½ÁÑ¥½¹Ì¹•±•µ•¹Ð°Á…••Á•¹‘•¹¥•Ì¤ì(%™½È€¡½¹ÍÐÑ•µÁ±…Ñ•¹ÑÉä½˜Ñ•µÁ±…Ñ•¹ÑÉ¥•Ì¤ì($%½¹ÍÐÑ•µÁ±…Ñ•½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Ñ•µÁ±…Ñ•¹ÑÉä¹Ñ•µÁ±…Ñ•5½‘Õ±”¤ì($%¥˜€ …Ñ•µÁ±…Ñ•½µÁ½¹•¹Ð¤½¹Ñ¥¹Õ”ì($%½¹ÍÐQ•µÁ±…Ñ•½µÁ½¹•¹Ð€ôÑ•µÁ±…Ñ•½µÁ½¹•¹Ðì($%½¹ÍÐÑ•µÁ±…Ñ••Á•¹‘•¹ä€ôÑ•µÁ±…Ñ••Á•¹‘•¹¥•Í	å%¹•Ð¡Ñ•µÁ±…Ñ•¹ÑÉä¹¥¤ì($%½¹ÍÐÑ•µÁ±…Ñ•±•µ•¹Ð€ôÑ•µÁ±…Ñ••Á•¹‘•¹ä€üÉ•¹‘•É]¥Ñ¡ÁÁ•Á•¹‘•¹å	…ÉÉ¥•È ¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Q•µÁ±…Ñ•½µÁ½¹•¹Ð°ì($$%Á…É…µÌè½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ°($$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¡¥±‘É•¸°íô¤($%ô¤°Ñ•µÁ±…Ñ••Á•¹‘•¹ä¤€è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Q•µÁ±…Ñ•½µÁ½¹•¹Ð°ì($$%Á…É…µÌè½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ°($$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¡¥±‘É•¸°íô¤($%ô¤ì($%•±•µ•¹ÑÍmÑ•µÁ±…Ñ•¹ÑÉä¹¥‘t€ôÉ•¹‘•É™Ñ•ÉÁÁ•Á•¹‘•¹¥•Ì¡Ñ•µÁ±…Ñ•±•µ•¹Ð°Ñ•µÁ±…Ñ••Á•¹‘•¹¥•Í	•™½É•	å%¹•Ð¡Ñ•µÁ±…Ñ•¹ÑÉä¹¥¤€üümt¤ì(%ô(%™½È€¡±•Ð¥¹‘•à€ô€Àì¥¹‘•à€ð±…å½ÕÑ¹ÑÉ¥•Ì¹±•¹Ñ ì¥¹‘•à¬¬¤ì($%½¹ÍÐ±…å½ÕÑ¹ÑÉä€ô±…å½ÕÑ¹ÑÉ¥•Ím¥¹‘•átì($%½¹ÍÐ±…å½ÕÑ½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡±…å½ÕÑ¹ÑÉä¹±…å½ÕÑ5½‘Õ±”¤ì($%¥˜€ …±…å½ÕÑ½µÁ½¹•¹Ð¤½¹Ñ¥¹Õ”ì($%½¹ÍÐ±…å½ÕÑAÉ½ÁÌ€ôìÁ…É…µÌè½ÁÑ¥½¹Ì¹µ…­•Q¡•¹…‰±•A…É…µÌ¡É•Í½±Ù•ÁÁA…•M•µ•¹ÑA…É…µÌ¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ°±…å½ÕÑ¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸°½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ¤¤ôì($%™½È€¡½¹ÍÐÍ±½Ð½˜=‰©•Ð¹Ù…±Õ•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹Í±½ÑÌ€üüíô¤¤ì($$%½¹ÍÐÍ±½Ñ9…µ”€ôÍ±½Ð¹¹…µ”ì($$%¥˜€ ¡Í±½Ð¹±…å½ÕÑ%¹‘•à€øô€À€üÍ±½Ð¹±…å½ÕÑ%¹‘•à€è±…å½ÕÑ¹ÑÉ¥•Ì¹±•¹Ñ €´€Ä¤€„ôô¥¹‘•à¤½¹Ñ¥¹Õ”ì($$%±…å½ÕÑAÉ½ÁÍmÍ±½Ñ9…µ•t€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡A…É…±±•±M±½Ð°ì¹…µ”èÍ±½Ñ9…µ”ô¤ì($%ô($%½¹ÍÐ1…å½ÕÑ½µÁ½¹•¹Ð€ô±…å½ÕÑ½µÁ½¹•¹Ðì($%½¹ÍÐ±…å½ÕÑ•Á•¹‘•¹ä€ô±…å½ÕÑ•Á•¹‘•¹¥•Í	å%¹‘•à¹•Ð¡¥¹‘•à¤ì($%½¹ÍÐ±…å½ÕÑ±•µ•¹Ð€ô±…å½ÕÑ•Á•¹‘•¹ä€üÉ•¹‘•É]¥Ñ¡ÁÁ•Á•¹‘•¹å	…ÉÉ¥•È ¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡1…å½ÕÑ½µÁ½¹•¹Ð°ì($$$¸¸¹±…å½ÕÑAÉ½ÁÌ°($$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¡¥±‘É•¸°íô¤($%ô¤°±…å½ÕÑ•Á•¹‘•¹ä¤€è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡1…å½ÕÑ½µÁ½¹•¹Ð°ì($$$¸¸¹±…å½ÕÑAÉ½ÁÌ°($$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¡¥±‘É•¸°íô¤($%ô¤ì($%•±•µ•¹ÑÍm±…å½ÕÑ¹ÑÉä¹¥‘t€ôÉ•¹‘•É™Ñ•ÉÁÁ•Á•¹‘•¹¥•Ì¡±…å½ÕÑ±•µ•¹Ð°±…å½ÕÑ•Á•¹‘•¹¥•Í	•™½É•m¥¹‘•át€üümt¤ì(%ô(%™½È€¡½¹ÍÐmÍ±½Ñ-•ä°Í±½Ñt½˜=‰©•Ð¹•¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹Í±½ÑÌ€üüíô¤¤ì($%½¹ÍÐÍ±½Ñ9…µ”€ôÍ±½Ð¹¹…µ”ì($%½¹ÍÐÑ…É•Ñ%¹‘•à€ôÍ±½Ð¹±…å½ÕÑ%¹‘•à€øô€À€üÍ±½Ð¹±…å½ÕÑ%¹‘•à€è±…å½ÕÑ¹ÑÉ¥•Ì¹±•¹Ñ €´€Äì($%½¹ÍÐÑÉ••A…Ñ €ô±…å½ÕÑ¹ÑÉ¥•ÍmÑ…É•Ñ%¹‘•átü¹ÑÉ••A…Ñ €üü€ˆ¼ˆì($%½¹ÍÐÍ±½Ñ%€ôÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•M±½Ñ%¡Í±½Ñ9…µ”°ÑÉ••A…Ñ ¤ì($%½¹ÍÐÍ±½Ñ=Ù•ÉÉ¥‘”€ôÉ•Í½±Ù•M±½Ñ=Ù•ÉÉ¥‘”¡Í±½Ñ-•ä°Í±½Ñ9…µ”¤ì($%½¹ÍÐÍ±½ÑA…É…µÌ€ô•Ñ™™•Ñ¥Ù•M±½ÑA…É…µÌ¡Í±½Ñ-•ä°Í±½Ñ9…µ”¤ì($%½¹ÍÐÍ±½ÑI•Í•Ñ-•ä€ôÉ•Í½±Ù•ÁÁA…•I½ÕÑ•MÑ…Ñ•-•ä¡Í±½Ð¹É½ÕÑ•M•µ•¹ÑÌ€üümt°Í±½ÑA…É…µÌ¤ì($%½¹ÍÐ½Ù•ÉÉ¥‘•=ÉA…•½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Í±½Ñ=Ù•ÉÉ¥‘”ü¹Á…•5½‘Õ±”¤€üü•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Í±½Ð¹Á…”¤ì($%½¹ÍÐ‘•™…Õ±Ñ½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Í±½Ð¹‘•™…Õ±Ð¤ì($%¥˜€ …½Ù•ÉÉ¥‘•=ÉA…•½µÁ½¹•¹Ð€˜˜‘•™…Õ±Ñ½µÁ½¹•¹Ð€˜˜½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€˜˜½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½Ñ%‘Ìü¹¡…Ì¡Í±½Ñ%¤¤½¹Ñ¥¹Õ”ì($%½¹ÍÐÍ±½Ñ½µÁ½¹•¹Ð€ô½Ù•ÉÉ¥‘•=ÉA…•½µÁ½¹•¹Ð€üü‘•™…Õ±Ñ½µÁ½¹•¹Ðì($%¥˜€ …Í±½Ñ½µÁ½¹•¹Ð¤ì($$%•±•µ•¹ÑÍmÍ±½Ñ%‘t€ôÁÁ±•µ•¹ÑÍ]¥É”¹Õ¹µ…Ñ¡•‘M±½ÑY…±Õ”ì($$%½¹Ñ¥¹Õ”ì($%ô($%½¹ÍÐÍ±½ÑQ¡•¹…‰±•A…É…µÌ€ô½ÁÑ¥½¹Ì¹µ…­•Q¡•¹…‰±•A…É…µÌ¡Í±½ÑA…É…µÌ¤ì($%½¹ÍÐÍ±½ÑAÉ½ÁÌ€ôìÁ…É…µÌèÍ±½ÑQ¡•¹…‰±•A…É…µÌôì($%¥˜€¡Í±½Ñ=Ù•ÉÉ¥‘”ü¹ÁÉ½ÁÌ¤=‰©•Ð¹…ÍÍ¥¸¡Í±½ÑAÉ½ÁÌ°Í±½Ñ=Ù•ÉÉ¥‘”¹ÁÉ½ÁÌ¤ì($%±•ÐÍ±½Ñ±•µ•¹Ð€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Í±½Ñ½µÁ½¹•¹Ð°ì€¸¸¹Í±½ÑAÉ½ÁÌô¤ì($%½¹ÍÐ¥¹Ñ•É•ÁÑ1…å½ÕÑÌ€ôÍ±½Ñ=Ù•ÉÉ¥‘”ü¹±…å½ÕÑ5½‘Õ±•Ì€üümtì($%™½È€¡±•Ð±…å½ÕÑ%¹‘•à€ô¥¹Ñ•É•ÁÑ1…å½ÕÑÌ¹±•¹Ñ €´€Äì±…å½ÕÑ%¹‘•à€øô€Àì±…å½ÕÑ%¹‘•à´´¤ì($$%½¹ÍÐ¥¹Ñ•É•ÁÑ1…å½ÕÑ½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡¥¹Ñ•É•ÁÑ1…å½ÕÑÍm±…å½ÕÑ%¹‘•át¤ì($$%¥˜€ …¥¹Ñ•É•ÁÑ1…å½ÕÑ½µÁ½¹•¹Ð¤½¹Ñ¥¹Õ”ì($$%Í±½Ñ±•µ•¹Ð€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¥¹Ñ•É•ÁÑ1…å½ÕÑ½µÁ½¹•¹Ð°ì($$$%Á…É…µÌèÍ±½ÑQ¡•¹…‰±•A…É…µÌ°($$$%¡¥±‘É•¸èÍ±½Ñ±•µ•¹Ð($$%ô¤ì($%ô($%½¹ÍÐÍ±½Ñ1…å½ÕÑ½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Í±½Ð¹±…å½ÕÐ¤ì($%¥˜€¡Í±½Ñ1…å½ÕÑ½µÁ½¹•¹Ð¤Í±½Ñ±•µ•¹Ð€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Í±½Ñ1…å½ÕÑ½µÁ½¹•¹Ð°ì($$%Á…É…µÌèÍ±½ÑQ¡•¹…‰±•A…É…µÌ°($$%¡¥±‘É•¸èÍ±½Ñ±•µ•¹Ð($%ô¤ì($%½¹ÍÐÍ±½Ñ1½…‘¥¹½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Í±½Ð¹±½…‘¥¹œ¤ì($%¥˜€¡Í±½Ñ1½…‘¥¹½µÁ½¹•¹Ð€˜˜€…Í¡½Õ±‘MÕÁÁÉ•ÍÍ1½…‘¥¹	½Õ¹‘…É¥•Ì¡½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”€üü€‰¹…Ù¥…Ñ¥½¸ˆ¤¤Í±½Ñ±•µ•¹Ð€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹MÕÍÁ•¹Í”°ì($$%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Í±½Ñ1½…‘¥¹½µÁ½¹•¹Ð°íô¤°($$%¡¥±‘É•¸èÍ±½Ñ±•µ•¹Ð($%ô°Í±½ÑI•Í•Ñ-•ä¤ì($%½¹ÍÐÍ±½ÑÉÉ½É½µÁ½¹•¹Ð€ô•ÑÉÉ½É	½Õ¹‘…ÉåáÁ½ÉÐ¡Í±½Ð¹•ÉÉ½È¤ì($%¥˜€¡Í±½ÑÉÉ½É½µÁ½¹•¹Ð¤Í±½Ñ±•µ•¹Ð€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡ÉÉ½É	½Õ¹‘…Éä°ì($$%É•Í•Ñ-•äèÍ±½ÑI•Í•Ñ-•ä°($$%™…±±‰…¬èÍ±½ÑÉÉ½É½µÁ½¹•¹Ð°($$%¡¥±‘É•¸èÍ±½Ñ±•µ•¹Ð($%ô¤ì($%•±•µ•¹ÑÍmÍ±½Ñ%‘t€ôÉ•¹‘•É™Ñ•ÉÁÁ•Á•¹‘•¹¥•Ì¡Í±½Ñ±•µ•¹Ð°Ñ…É•Ñ%¹‘•à€øô€À€üÍ±½Ñ•Á•¹‘•¹¥•Í	å1…å½ÕÑ%¹‘•ámÑ…É•Ñ%¹‘•át€üümt€èmt¤ì(%ô(%±•ÐÉ½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È°ì($%Í•µ•¹Ñ5…Àèì¡¥±‘É•¸èmtô°($%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M±½Ð°ì¥èÁ…•%ô¤(%ô¤ì(%É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡I•‘¥É•Ñ	½Õ¹‘…Éä°ì¡¥±‘É•¸èÉ½ÕÑ•¡¥±‘É•¸ô¤ì(%½¹ÍÐÉ½ÕÑ•1½…‘¥¹½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹±½…‘¥¹œ¤ì(%¥˜€¡É½ÕÑ•1½…‘¥¹½µÁ½¹•¹Ð€˜˜€…Í¡½Õ±‘MÕÁÁÉ•ÍÍ1½…‘¥¹	½Õ¹‘…É¥•Ì¡½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”€üü€‰¹…Ù¥…Ñ¥½¸ˆ¤¤É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹MÕÍÁ•¹Í”°ì($%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡É½ÕÑ•1½…‘¥¹½µÁ½¹•¹Ð°íô¤°($%¡¥±‘É•¸èÉ½ÕÑ•¡¥±‘É•¸(%ô°É½ÕÑ•I•Í•Ñ-•ä¤ì(%½¹ÍÐ±…ÍÑ1…å½ÕÑÉÉ½É5½‘Õ±”€ô•ÉÉ½É¹ÑÉ¥•Ì¹±•¹Ñ €ø€À€ü•ÉÉ½É¹ÑÉ¥•Ím•ÉÉ½É¹ÑÉ¥•Ì¹±•¹Ñ €´€Åt¹•ÉÉ½É5½‘Õ±”€è¹Õ±°ì(%½¹ÍÐ¹½Ñ½Õ¹‘½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹¹½Ñ½Õ¹¤€üü•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡½ÁÑ¥½¹Ì¹É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”¤ì(%¥˜€¡¹½Ñ½Õ¹‘½µÁ½¹•¹Ð¤É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡9½Ñ½Õ¹‘	½Õ¹‘…Éä°ì($%É•Í•Ñ-•äèÉ½ÕÑ•I•Í•Ñ-•ä°($%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡¹½Ñ½Õ¹‘½µÁ½¹•¹Ð°íô¤°($%¡¥±‘É•¸èÉ½ÕÑ•¡¥±‘É•¸(%ô¤ì(%½¹ÍÐ™½É‰¥‘‘•¹½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹™½É‰¥‘‘•¸¤€üü•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡½ÁÑ¥½¹Ì¹É½½Ñ½É‰¥‘‘•¹5½‘Õ±”¤ì(%¥˜€¡™½É‰¥‘‘•¹½µÁ½¹•¹Ð¤É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡½É‰¥‘‘•¹	½Õ¹‘…Éä°ì($%É•Í•Ñ-•äèÉ½ÕÑ•I•Í•Ñ-•ä°($%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡™½É‰¥‘‘•¹½µÁ½¹•¹Ð°íô¤°($%¡¥±‘É•¸èÉ½ÕÑ•¡¥±‘É•¸(%ô¤ì(%½¹ÍÐÕ¹…ÕÑ¡½É¥é•‘½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹Õ¹…ÕÑ¡½É¥é•¤€üü•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡½ÁÑ¥½¹Ì¹É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”¤ì(%¥˜€¡Õ¹…ÕÑ¡½É¥é•‘½µÁ½¹•¹Ð¤É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡U¹…ÕÑ¡½É¥é•‘	½Õ¹‘…Éä°ì($%É•Í•Ñ-•äèÉ½ÕÑ•I•Í•Ñ-•ä°($%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Õ¹…ÕÑ¡½É¥é•‘½µÁ½¹•¹Ð°íô¤°($%¡¥±‘É•¸èÉ½ÕÑ•¡¥±‘É•¸(%ô¤ì(%½¹ÍÐÁ…•ÉÉ½É½µÁ½¹•¹Ð€ô•ÑÉÉ½É	½Õ¹‘…ÉåáÁ½ÉÐ¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹•ÉÉ½È¤ì(%¥˜€¡Á…•ÉÉ½É½µÁ½¹•¹Ð€˜˜½ÁÑ¥½¹Ì¹É½ÕÑ”¹•ÉÉ½È€„ôô±…ÍÑ1…å½ÕÑÉÉ½É5½‘Õ±”¤É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡ÉÉ½É	½Õ¹‘…Éä°ì($%É•Í•Ñ-•äèÉ½ÕÑ•I•Í•Ñ-•ä°($%™…±±‰…¬èÁ…•ÉÉ½É½µÁ½¹•¹Ð°($%¡¥±‘É•¸èÉ½ÕÑ•¡¥±‘É•¸(%ô¤ì(%™½È€¡±•Ð¥¹‘•à€ô½É‘•É•‘QÉ••A½Í¥Ñ¥½¹Ì¹±•¹Ñ €´€Äì¥¹‘•à€øô€Àì¥¹‘•à´´¤ì($%½¹ÍÐÑÉ••A½Í¥Ñ¥½¸€ô½É‘•É•‘QÉ••A½Í¥Ñ¥½¹Ím¥¹‘•átì($%½¹ÍÐÍ•µ•¹ÑI•Í•Ñ-•ä€ôÉ•Í½±Ù•ÁÁA…•M•µ•¹ÑMÑ…Ñ•-•ä¡É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸°½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ¤ì($%±•ÐÍ•µ•¹Ñ¡¥±‘É•¸€ôÉ½ÕÑ•¡¥±‘É•¸ì($%½¹ÍÐ±…å½ÕÑ¹ÑÉä€ô±…å½ÕÑ¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸¹•Ð¡ÑÉ••A½Í¥Ñ¥½¸¤ì($%½¹ÍÐÑ•µÁ±…Ñ•¹ÑÉä€ôÑ•µÁ±…Ñ•¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸¹•Ð¡ÑÉ••A½Í¥Ñ¥½¸¤ì($%½¹ÍÐ•ÉÉ½É¹ÑÉä€ô•ÉÉ½É¹ÑÉ¥•Í	åQÉ••A½Í¥Ñ¥½¸¹•Ð¡ÑÉ••A½Í¥Ñ¥½¸¤ì($%¥˜€¡±…å½ÕÑ¹ÑÉä¤ì($$%½¹ÍÐ±…å½ÕÑ9½Ñ½Õ¹‘½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡±…å½ÕÑ¹ÑÉä¹¹½Ñ½Õ¹‘5½‘Õ±”¤ì($$%¥˜€¡±…å½ÕÑ9½Ñ½Õ¹‘½µÁ½¹•¹Ð¤Í•µ•¹Ñ¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡9½Ñ½Õ¹‘	½Õ¹‘…Éä°ì($$$%É•Í•Ñ-•äèÍ•µ•¹ÑI•Í•Ñ-•ä°($$$%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡±…å½ÕÑ9½Ñ½Õ¹‘½µÁ½¹•¹Ð°íô¤°($$$%¡¥±‘É•¸èÍ•µ•¹Ñ¡¥±‘É•¸($$%ô¤ì($$%½¹ÍÐ±…å½ÕÑ½É‰¥‘‘•¹½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡±…å½ÕÑ¹ÑÉä¹™½É‰¥‘‘•¹5½‘Õ±”¤ì($$%¥˜€¡±…å½ÕÑ½É‰¥‘‘•¹½µÁ½¹•¹Ð¤Í•µ•¹Ñ¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡½É‰¥‘‘•¹	½Õ¹‘…Éä°ì($$$%É•Í•Ñ-•äèÍ•µ•¹ÑI•Í•Ñ-•ä°($$$%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡±…å½ÕÑ½É‰¥‘‘•¹½µÁ½¹•¹Ð°íô¤°($$$%¡¥±‘É•¸èÍ•µ•¹Ñ¡¥±‘É•¸($$%ô¤ì($$%½¹ÍÐ±…å½ÕÑU¹…ÕÑ¡½É¥é•‘½µÁ½¹•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡±…å½ÕÑ¹ÑÉä¹Õ¹…ÕÑ¡½É¥é•‘5½‘Õ±”¤ì($$%¥˜€¡±…å½ÕÑU¹…ÕÑ¡½É¥é•‘½µÁ½¹•¹Ð¤Í•µ•¹Ñ¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡U¹…ÕÑ¡½É¥é•‘	½Õ¹‘…Éä°ì($$$%É•Í•Ñ-•äèÍ•µ•¹ÑI•Í•Ñ-•ä°($$$%™…±±‰…¬è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡±…å½ÕÑU¹…ÕÑ¡½É¥é•‘½µÁ½¹•¹Ð°íô¤°($$$%¡¥±‘É•¸èÍ•µ•¹Ñ¡¥±‘É•¸($$%ô¤ì($%ô($%½¹ÍÐÍ•µ•¹ÑÉÉ½É½µÁ½¹•¹Ð€ô•ÑÉÉ½É	½Õ¹‘…ÉåáÁ½ÉÐ¡•ÉÉ½É¹ÑÉäü¹•ÉÉ½É5½‘Õ±”€üü±…å½ÕÑ¹ÑÉäü¹•ÉÉ½É5½‘Õ±”¤ì($%¥˜€¡Í•µ•¹ÑÉÉ½É½µÁ½¹•¹Ð¤Í•µ•¹Ñ¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡ÉÉ½É	½Õ¹‘…Éä°ì($$%É•Í•Ñ-•äèÍ•µ•¹ÑI•Í•Ñ-•ä°($$%™…±±‰…¬èÍ•µ•¹ÑÉÉ½É½µÁ½¹•¹Ð°($$%¡¥±‘É•¸èÍ•µ•¹Ñ¡¥±‘É•¸($%ô¤ì($%¥˜€¡Ñ•µÁ±…Ñ•¹ÑÉä€˜˜•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡Ñ•µÁ±…Ñ•¹ÑÉä¹Ñ•µÁ±…Ñ•5½‘Õ±”¤¤Í•µ•¹Ñ¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M±½Ð°ì($$%¥èÑ•µÁ±…Ñ•¹ÑÉä¹¥°($$%¡¥±‘É•¸èÍ•µ•¹Ñ¡¥±‘É•¸($%ô°Í•µ•¹ÑI•Í•Ñ-•ä¤ì($%¥˜€ …±…å½ÕÑ¹ÑÉä¤ì($$%É½ÕÑ•¡¥±‘É•¸€ôÍ•µ•¹Ñ¡¥±‘É•¸ì($$%½¹Ñ¥¹Õ”ì($%ô($%½¹ÍÐ±…å½ÕÑ!…Í±•µ•¹Ð€ô•Ñ•™…Õ±ÑáÁ½ÉÐÄ¡±…å½ÕÑ¹ÑÉä¹±…å½ÕÑ5½‘Õ±”¤€„ôô¹Õ±°ì($%½¹ÍÐ±…å½ÕÑ%¹‘•à€ô±…å½ÕÑ%¹‘¥•Í	åQÉ••A½Í¥Ñ¥½¸¹•Ð¡ÑÉ••A½Í¥Ñ¥½¸¤€üü€´Äì($%½¹ÍÐÍ•µ•¹Ñ5…À€ôì¡¥±‘É•¸èÉ•Í½±Ù•ÁÁA…•¡¥±‘M•µ•¹ÑÌ¡É½ÕÑ•M•µ•¹ÑÌ°±…å½ÕÑ¹ÑÉä¹ÑÉ••A½Í¥Ñ¥½¸°½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ¤ôì($%™½È€¡½¹ÍÐmÍ±½Ñ-•ä°Í±½Ñt½˜=‰©•Ð¹•¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”¹Í±½ÑÌ€üüíô¤¤ì($$%½¹ÍÐÍ±½Ñ9…µ”€ôÍ±½Ð¹¹…µ”ì($$%¥˜€ ¡Í±½Ð¹±…å½ÕÑ%¹‘•à€øô€À€üÍ±½Ð¹±…å½ÕÑ%¹‘•à€è±…å½ÕÑ¹ÑÉ¥•Ì¹±•¹Ñ €´€Ä¤€„ôô±…å½ÕÑ%¹‘•à¤½¹Ñ¥¹Õ”ì($$%½¹ÍÐÍ±½ÑA…É…µÌ€ô•Ñ™™•Ñ¥Ù•M±½ÑA…É…µÌ¡Í±½Ñ-•ä°Í±½Ñ9…µ”¤ì($$%Í•µ•¹Ñ5…ÁmÍ±½Ñ9…µ•t€ôÍ±½Ð¹É½ÕÑ•M•µ•¹ÑÌ€üÉ•Í½±Ù•ÁÁA…•¡¥±‘M•µ•¹ÑÌ¡Í±½Ð¹É½ÕÑ•M•µ•¹ÑÌ°€À°Í±½ÑA…É…µÌ¤€èmtì($%ô($%É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È°ì($$%Í•µ•¹Ñ5…À°($$%¡¥±‘É•¸è±…å½ÕÑ!…Í±•µ•¹Ð€ü€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M±½Ð°ì($$$%¥è±…å½ÕÑ¹ÑÉä¹¥°($$$%Á…É…±±•±M±½ÑÌèÉ•…Ñ•ÁÁA…•A…É…±±•±M±½Ñ¹ÑÉ¥•Ì¡±…å½ÕÑ%¹‘•à°±…å½ÕÑ¹ÑÉ¥•Ì°½ÁÑ¥½¹Ì¹É½ÕÑ”°•Ñ™™•Ñ¥Ù•M±½ÑA…É…µÌ¤°($$$%¡¥±‘É•¸èÍ•µ•¹Ñ¡¥±‘É•¸($$%ô¤€èÍ•µ•¹Ñ¡¥±‘É•¸($%ô¤ì(%ô(%½¹ÍÐ±½‰…±ÉÉ½É½µÁ½¹•¹Ð€ô•ÑÉÉ½É	½Õ¹‘…ÉåáÁ½ÉÐ¡½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É5½‘Õ±”¤ì(%¥˜€¡±½‰…±ÉÉ½É½µÁ½¹•¹Ð¤É½ÕÑ•¡¥±‘É•¸€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡ÉÉ½É	½Õ¹‘…Éä°ì($%™…±±‰…¬è±½‰…±ÉÉ½É½µÁ½¹•¹Ð°($%¡¥±‘É•¸èÉ½ÕÑ•¡¥±‘É•¸(%ô¤ì(%•±•µ•¹ÑÍmÉ½ÕÑ•%‘t€ô€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èmÉ•…Ñ•ÁÁA…•I½ÕÑ•!•…¡½ÁÑ¥½¹Ì¹É•Í½±Ù•‘5•Ñ…‘…Ñ„°½ÁÑ¥½¹Ì¹É•Í½±Ù•‘Y¥•ÝÁ½ÉÐ¤°É½ÕÑ•¡¥±‘É•¹tô¤ì(%É•ÑÕÉ¸•±•µ•¹ÑÌì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½™¥±”µ‰…Í•µµ•Ñ…‘…Ñ„¹©Ì)™Õ¹Ñ¥½¸É½ÕÑ•ÁÁ±¥•Ì¡É½ÕÑ•A…Ñ °É½ÕÑ•AÉ•™¥à¤ì(%¥˜€ …É½ÕÑ•AÉ•™¥à¤É•ÑÕÉ¸ÑÉÕ”ì(%É•ÑÕÉ¸É½ÕÑ•A…Ñ €ôôôÉ½ÕÑ•AÉ•™¥àñðÉ½ÕÑ•A…Ñ ¹ÍÑ…ÉÑÍ]¥Ñ ¡€‘íÉ½ÕÑ•AÉ•™¥áô½€¤ì)ô)™Õ¹Ñ¥½¸É½ÕÑ•M½É”¡É½ÕÑ•AÉ•™¥à¤ì(%É•ÑÕÉ¸É½ÕÑ•AÉ•™¥à¹ÍÁ±¥Ð ˆ¼ˆ¤¹™¥±Ñ•È¡	½½±•…¸¤¹±•¹Ñ ì)ô)™Õ¹Ñ¥½¸É½ÕÑ•M•µ•¹ÑÍÁÁ±ä¡É½ÕÑ•M•µ•¹ÑÌ°É½ÕÑ•AÉ•™¥áM•µ•¹ÑÌ¤ì(%¥˜€¡É½ÕÑ•AÉ•™¥áM•µ•¹ÑÌ¹±•¹Ñ €øÉ½ÕÑ•M•µ•¹ÑÌ¹±•¹Ñ ¤É•ÑÕÉ¸™…±Í”ì(%™½È€¡±•Ð¥¹‘•à€ô€Àì¥¹‘•à€ðÉ½ÕÑ•AÉ•™¥áM•µ•¹ÑÌ¹±•¹Ñ ì¥¹‘•à¬¬¤¥˜€¡É½ÕÑ•M•µ•¹ÑÍm¥¹‘•át€„ôôÉ½ÕÑ•AÉ•™¥áM•µ•¹ÑÍm¥¹‘•át¤É•ÑÕÉ¸™…±Í”ì(%É•ÑÕÉ¸ÑÉÕ”ì)ô)™Õ¹Ñ¥½¸É•µ½Ù•A…É…±±•±I½ÕÑ•M•µ•¹ÑÌ¡É½ÕÑ•M•µ•¹ÑÌ¤ì(%É•ÑÕÉ¸É½ÕÑ•M•µ•¹ÑÌ¹™¥±Ñ•È ¡Í•µ•¹Ð¤€ôø€…Í•µ•¹Ð¹ÍÑ…ÉÑÍ]¥Ñ  ‰ ˆ¤¤ì)ô)™Õ¹Ñ¥½¸É½ÕÑ•M•µ•¹ÑÍÁÁ±å]¥Ñ¡A…É…±±•±M±½ÑÌ¡É½ÕÑ•M•µ•¹ÑÌ°É½ÕÑ•AÉ•™¥áM•µ•¹ÑÌ¤ì(%¥˜€¡É½ÕÑ•M•µ•¹ÑÍÁÁ±ä¡É½ÕÑ•M•µ•¹ÑÌ°É½ÕÑ•AÉ•™¥áM•µ•¹ÑÌ¤¤É•ÑÕÉ¸ÑÉÕ”ì(%½¹ÍÐÙ¥Í¥‰±•AÉ•™¥áM•µ•¹ÑÌ€ôÉ•µ½Ù•A…É…±±•±I½ÕÑ•M•µ•¹ÑÌ¡É½ÕÑ•AÉ•™¥áM•µ•¹ÑÌ¤ì(%É•ÑÕÉ¸Ù¥Í¥‰±•AÉ•™¥áM•µ•¹ÑÌ¹±•¹Ñ €„ôôÉ½ÕÑ•AÉ•™¥áM•µ•¹ÑÌ¹±•¹Ñ €˜˜É½ÕÑ•M•µ•¹ÑÍÁÁ±ä¡É½ÕÑ•M•µ•¹ÑÌ°Ù¥Í¥‰±•AÉ•™¥áM•µ•¹ÑÌ¤ì)ô)™Õ¹Ñ¥½¸É½ÕÑ•MÁ•¥™¥¥Ñä¡É½ÕÑ”¤ì(%É•ÑÕÉ¸É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌü¹±•¹Ñ €üüÉ½ÕÑ•M½É”¡É½ÕÑ”¹É½ÕÑ•AÉ•™¥à¤ì)ô)™Õ¹Ñ¥½¸Í•±•Ñ••Á•ÍÑI½ÕÑ•Ì¡µ•Ñ…‘…Ñ…I½ÕÑ•Ì°­¥¹°É½ÕÑ•A…Ñ °Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤ì(%¥˜€ …µ•Ñ…‘…Ñ…I½ÕÑ•Ìñðµ•Ñ…‘…Ñ…I½ÕÑ•Ì¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸mtì(%±•ÐÍ•±•Ñ•‘M½É”€ô€´Äì(%½¹ÍÐÍ•±•Ñ•‘I½ÕÑ•Ì€ômtì(%™½È€¡½¹ÍÐÉ½ÕÑ”½˜µ•Ñ…‘…Ñ…I½ÕÑ•Ì¤ì($%¥˜€ ¡É½ÕÑ”¹¡•…‘…Ñ„ü¹­¥¹€üü•Ñ5•Ñ…‘…Ñ…I½ÕÑ•-¥¹¡É½ÕÑ”¤¤€„ôô­¥¹¤½¹Ñ¥¹Õ”ì($%¥˜€¡É½ÕÑ•M•µ•¹ÑÌ€˜˜É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤ì($$%¥˜€ …É½ÕÑ•M•µ•¹ÑÍÁÁ±å]¥Ñ¡A…É…±±•±M±½ÑÌ¡É½ÕÑ•M•µ•¹ÑÌ°É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤¤½¹Ñ¥¹Õ”ì($$%½¹ÍÐÕÉÉ•¹ÑM½É”€ôÉ½ÕÑ•MÁ•¥™¥¥Ñä¡É½ÕÑ”¤ì($$%¥˜€¡ÕÉÉ•¹ÑM½É”€øÍ•±•Ñ•‘M½É”¤ì($$$%Í•±•Ñ•‘M½É”€ôÕÉÉ•¹ÑM½É”ì($$$%Í•±•Ñ•‘I½ÕÑ•Ì¹±•¹Ñ €ô€Àì($$$%Í•±•Ñ•‘I½ÕÑ•Ì¹ÁÕÍ ¡É½ÕÑ”¤ì($$$%½¹Ñ¥¹Õ”ì($$%ô($$%¥˜€¡ÕÉÉ•¹ÑM½É”€ôôôÍ•±•Ñ•‘M½É”¤Í•±•Ñ•‘I½ÕÑ•Ì¹ÁÕÍ ¡É½ÕÑ”¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%½¹ÍÐÉ½ÕÑ•AÉ•™¥à€ôÉ½ÕÑ”¹É½ÕÑ•AÉ•™¥àì($%½¹ÍÐÉ•Í½±Ù•‘I½ÕÑ•AÉ•™¥à€ô™¥±±I½ÕÑ•A…ÑÑ•É¹M•µ•¹ÑÌ¡É½ÕÑ•AÉ•™¥à°Á…É…µÌ¤ì($%½¹ÍÐ¹½Éµ…±¥é•‘I½ÕÑ•AÉ•™¥à€ôÉ½ÕÑ•A…ÑÑ•É¸¡É½ÕÑ•AÉ•™¥à¤ì($%¥˜€ …É½ÕÑ•ÁÁ±¥•Ì¡É½ÕÑ•A…Ñ °É½ÕÑ•AÉ•™¥à¤€˜˜€…É½ÕÑ•ÁÁ±¥•Ì¡É½ÕÑ•A…Ñ °¹½Éµ…±¥é•‘I½ÕÑ•AÉ•™¥à¤€˜˜€ …É•Í½±Ù•‘I½ÕÑ•AÉ•™¥àñð€…É½ÕÑ•ÁÁ±¥•Ì¡É½ÕÑ•A…Ñ °É•Í½±Ù•‘I½ÕÑ•AÉ•™¥à¤¤¤½¹Ñ¥¹Õ”ì($%½¹ÍÐÕÉÉ•¹ÑM½É”€ôÉ½ÕÑ•MÁ•¥™¥¥Ñä¡É½ÕÑ”¤ì($%¥˜€¡ÕÉÉ•¹ÑM½É”€øÍ•±•Ñ•‘M½É”¤ì($$%Í•±•Ñ•‘M½É”€ôÕÉÉ•¹ÑM½É”ì($$%Í•±•Ñ•‘I½ÕÑ•Ì¹±•¹Ñ €ô€Àì($$%Í•±•Ñ•‘I½ÕÑ•Ì¹ÁÕÍ ¡É½ÕÑ”¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%¥˜€¡ÕÉÉ•¹ÑM½É”€ôôôÍ•±•Ñ•‘M½É”¤Í•±•Ñ•‘I½ÕÑ•Ì¹ÁÕÍ ¡É½ÕÑ”¤ì(%ô(%É•ÑÕÉ¸Í•±•Ñ•‘I½ÕÑ•Ìì)ô)™Õ¹Ñ¥½¸¥ÍMÑÉ¥¹=ÉUÉ°¡Ù…±Õ”¤ì(%É•ÑÕÉ¸ÑåÁ•½˜Ù…±Õ”€ôôô€‰ÍÑÉ¥¹œˆñðÑåÁ•½˜Ù…±Õ”€ôôô€‰½‰©•Ðˆ€˜˜Ù…±Õ”¥¹ÍÑ…¹•½˜UI0ì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•%½¹•ÍÉ¥ÁÑ½È¡Ù…±Õ”¤ì(%¥˜€¡ÑåÁ•½˜Ù…±Õ”€„ôô€‰½‰©•ÐˆñðÙ…±Õ”€ôôô¹Õ±°ñðÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÕÉ±Y…±Õ”€ôI•™±•Ð¹•Ð¡Ù…±Õ”°€‰ÕÉ°ˆ¤ì(%¥˜€ …¥ÍMÑÉ¥¹=ÉUÉ°¡ÕÉ±Y…±Õ”¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ•¹ÑÉä€ôìÕÉ°èÕÉ±Y…±Õ”ôì(%½¹ÍÐÍ¥é•ÍY…±Õ”€ôI•™±•Ð¹•Ð¡Ù…±Õ”°€‰Í¥é•Ìˆ¤ì(%¥˜€¡ÑåÁ•½˜Í¥é•ÍY…±Õ”€ôôô€‰ÍÑÉ¥¹œˆ¤•¹ÑÉä¹Í¥é•Ì€ôÍ¥é•ÍY…±Õ”ì(%½¹ÍÐÑåÁ•Y…±Õ”€ôI•™±•Ð¹•Ð¡Ù…±Õ”°€‰ÑåÁ”ˆ¤ì(%¥˜€¡ÑåÁ•½˜ÑåÁ•Y…±Õ”€ôôô€‰ÍÑÉ¥¹œˆ¤•¹ÑÉä¹ÑåÁ”€ôÑåÁ•Y…±Õ”ì(%½¹ÍÐµ•‘¥…Y…±Õ”€ôI•™±•Ð¹•Ð¡Ù…±Õ”°€‰µ•‘¥„ˆ¤ì(%¥˜€¡ÑåÁ•½˜µ•‘¥…Y…±Õ”€ôôô€‰ÍÑÉ¥¹œˆ¤•¹ÑÉä¹µ•‘¥„€ôµ•‘¥…Y…±Õ”ì(%É•ÑÕÉ¸•¹ÑÉäì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•%½¹Y…±Õ”¡Ù…±Õ”¤ì(%¥˜€¡¥ÍMÑÉ¥¹=ÉUÉ°¡Ù…±Õ”¤¤É•ÑÕÉ¸ìÕÉ°èÙ…±Õ”ôì(%É•ÑÕÉ¸¹½Éµ…±¥é•%½¹•ÍÉ¥ÁÑ½È¡Ù…±Õ”¤ì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•%½¹Y…±Õ•1¥ÍÐ¡Ù…±Õ•Ì¤ì(%½¹ÍÐ¹½Éµ…±¥é•‘¹ÑÉ¥•Ì€ômtì(%™½È€¡½¹ÍÐÙ…±Õ”½˜Ù…±Õ•Ì¤ì($%½¹ÍÐ¹½Éµ…±¥é•‘Y…±Õ”€ô¹½Éµ…±¥é•%½¹Y…±Õ”¡Ù…±Õ”¤ì($%¥˜€¡¹½Éµ…±¥é•‘Y…±Õ”¤¹½Éµ…±¥é•‘¹ÑÉ¥•Ì¹ÁÕÍ ¡¹½Éµ…±¥é•‘Y…±Õ”¤ì(%ô(%É•ÑÕÉ¸¹½Éµ…±¥é•‘¹ÑÉ¥•Ìì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•%½¹¹ÑÉ¥•Ì¡¥½¸¤ì(%½¹ÍÐ¹½Éµ…±¥é•‘Q½Á1•Ù•±Y…±Õ”€ô¹½Éµ…±¥é•%½¹Y…±Õ”¡¥½¸¤ì(%¥˜€¡¹½Éµ…±¥é•‘Q½Á1•Ù•±Y…±Õ”¤É•ÑÕÉ¸m¹½Éµ…±¥é•‘Q½Á1•Ù•±Y…±Õ•tì(%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡¥½¸¤¤É•ÑÕÉ¸¹½Éµ…±¥é•%½¹Y…±Õ•1¥ÍÐ¡¥½¸¤ì(%¥˜€ …¥Í%½¹5…À¡¥½¸¤¤É•ÑÕÉ¸mtì(%½¹ÍÐ¥½¹Y…±Õ”€ô¥½¸¹¥½¸ì(%¥˜€ …¥½¹Y…±Õ”¤É•ÑÕÉ¸mtì(%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡¥½¹Y…±Õ”¤¤É•ÑÕÉ¸¹½Éµ…±¥é•%½¹Y…±Õ•1¥ÍÐ¡¥½¹Y…±Õ”¤ì(%½¹ÍÐ¹½Éµ…±¥é•‘Y…±Õ”€ô¹½Éµ…±¥é•%½¹Y…±Õ”¡¥½¹Y…±Õ”¤ì(%É•ÑÕÉ¸¹½Éµ…±¥é•‘Y…±Õ”€üm¹½Éµ…±¥é•‘Y…±Õ•t€èmtì)ô)™Õ¹Ñ¥½¸¥Í%½¹5…À¡Ù…±Õ”¤ì(%¥˜€ …Ù…±Õ”ñðÑåÁ•½˜Ù…±Õ”€„ôô€‰½‰©•ÐˆñðÙ…±Õ”¥¹ÍÑ…¹•½˜UI0ñðÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤¤É•ÑÕÉ¸™…±Í”ì(%É•ÑÕÉ¸¹½Éµ…±¥é•%½¹Y…±Õ”¡Ù…±Õ”¤€ôôô¹Õ±°ì)ô)™Õ¹Ñ¥½¸±½¹•%½¹5…À¡Ù…±Õ”¤ì(%¥˜€ …Ù…±Õ”¤É•ÑÕÉ¸íôì(%¥˜€¡¥Í%½¹5…À¡Ù…±Õ”¤¤É•ÑÕÉ¸ì€¸¸¹Ù…±Õ”ôì(%½¹ÍÐ¥½¹¹ÑÉ¥•Ì€ô¹½Éµ…±¥é•%½¹¹ÑÉ¥•Ì¡Ù…±Õ”¤ì(%É•ÑÕÉ¸¥½¹¹ÑÉ¥•Ì¹±•¹Ñ €ø€À€üì¥½¸è¥½¹¹ÑÉ¥•Ìô€èíôì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘%½¹¹ÑÉä¡¡•…‘…Ñ„¤ì(%¥˜€¡¡•…‘…Ñ„¹­¥¹€„ôô€‰™…Ù¥½¸ˆ€˜˜¡•…‘…Ñ„¹­¥¹€„ôô€‰¥½¸ˆ¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ¥½¹¹ÑÉä€ôìÕÉ°è¡•…‘…Ñ„¹¡É•˜ôì(%¥˜€¡¡•…‘…Ñ„¹Í¥é•Ì¤¥½¹¹ÑÉä¹Í¥é•Ì€ô¡•…‘…Ñ„¹Í¥é•Ìì(%¥˜€¡¡•…‘…Ñ„¹ÑåÁ”¤¥½¹¹ÑÉä¹ÑåÁ”€ô¡•…‘…Ñ„¹ÑåÁ”ì(%É•ÑÕÉ¸¥½¹¹ÑÉäì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁ±•¹ÑÉä¡¡•…‘…Ñ„¤ì(%¥˜€¡¡•…‘…Ñ„¹­¥¹€„ôô€‰…ÁÁ±”ˆ¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ…ÁÁ±•¹ÑÉä€ôìÕÉ°è¡•…‘…Ñ„¹¡É•˜ôì(%¥˜€¡¡•…‘…Ñ„¹Í¥é•Ì¤…ÁÁ±•¹ÑÉä¹Í¥é•Ì€ô¡•…‘…Ñ„¹Í¥é•Ìì(%¥˜€¡¡•…‘…Ñ„¹ÑåÁ”¤…ÁÁ±•¹ÑÉä¹ÑåÁ”€ô¡•…‘…Ñ„¹ÑåÁ”ì(%É•ÑÕÉ¸…ÁÁ±•¹ÑÉäì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•ÁÁ±•¹ÑÉä¡Ù…±Õ”¤ì(%¥˜€¡¥ÍMÑÉ¥¹=ÉUÉ°¡Ù…±Õ”¤¤É•ÑÕÉ¸ìÕÉ°èÙ…±Õ”ôì(%É•ÑÕÉ¸ì€¸¸¹Ù…±Õ”ôì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘M½¥…±¹ÑÉä¡¡•…‘…Ñ„¤ì(%¥˜€¡¡•…‘…Ñ„¹­¥¹€„ôô€‰½Á•¹É…Á ˆ€˜˜¡•…‘…Ñ„¹­¥¹€„ôô€‰ÑÝ¥ÑÑ•Èˆ¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÍ½¥…±¹ÑÉä€ôìÕÉ°è¡•…‘…Ñ„¹¡É•˜ôì(%¥˜€¡¡•…‘…Ñ„¹Ý¥‘Ñ €„ôôÙ½¥€À¤Í½¥…±¹ÑÉä¹Ý¥‘Ñ €ô¡•…‘…Ñ„¹Ý¥‘Ñ ì(%¥˜€¡¡•…‘…Ñ„¹¡•¥¡Ð€„ôôÙ½¥€À¤Í½¥…±¹ÑÉä¹¡•¥¡Ð€ô¡•…‘…Ñ„¹¡•¥¡Ðì(%¥˜€¡¡•…‘…Ñ„¹…±Ð¤Í½¥…±¹ÑÉä¹…±Ð€ô¡•…‘…Ñ„¹…±Ðì(%¥˜€¡¡•…‘…Ñ„¹ÑåÁ”¤Í½¥…±¹ÑÉä¹ÑåÁ”€ô¡•…‘…Ñ„¹ÑåÁ”ì(%É•ÑÕÉ¸Í½¥…±¹ÑÉäì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•5•Ñ…‘…Ñ…%µ…•%¡É½ÕÑ”°¥¤ì(%½¹ÍÐ¹½Éµ…±¥é•‘%€ôMÑÉ¥¹œ¡¥¤ì(%¥˜€ …¥ÍY…±¥‘5•Ñ…‘…Ñ…%µ…•%¡¹½Éµ…±¥é•‘%¤¤ì($%½¹Í½±”¹Ý…É¸¡mÙ¥¹•áÑtM­¥ÁÁ¥¹œµ•Ñ…‘…Ñ„É½ÕÑ”€‘íÉ½ÕÑ”¹Í•ÉÙ•‘UÉ±ô¥µ…”¥€ˆ‘í¹½Éµ…±¥é•‘%‘ôˆ‰•…ÕÍ”µ•Ñ…‘…Ñ„¥µ…”¥‘ÌµÕÍÐµ…Ñ €½ym„µéµhÀ´äµ|¹t¬¼¹€¤ì($%É•ÑÕÉ¸¹Õ±°ì(%ô(%É•ÑÕÉ¸¹½Éµ…±¥é•‘%ì)ô)™Õ¹Ñ¥½¸Ý¥Ñ¡½¹Ñ•¹Ñ!…Í ¡¡É•˜°½¹Ñ•¹Ñ!…Í ¤ì(%¥˜€ …½¹Ñ•¹Ñ!…Í ¤É•ÑÕÉ¸¡É•˜ì(%É•ÑÕÉ¸€‘í¡É•™ôü‘í½¹Ñ•¹Ñ!…Í¡õ€ì)ô)™Õ¹Ñ¥½¸¡…Í=Ý¹AÉ½Á•ÉÑä¡Í½ÕÉ”°­•ä¤ì(%É•ÑÕÉ¸	½½±•…¸¡Í½ÕÉ”€˜˜=‰©•Ð¹ÁÉ½Ñ½ÑåÁ”¹¡…Í=Ý¹AÉ½Á•ÉÑä¹…±°¡Í½ÕÉ”°­•ä¤¤ì)ô)™Õ¹Ñ¥½¸¡…Í=Á•¹É…Á¡%µ…•Ì¡µ•Ñ…‘…Ñ„¤ì(%É•ÑÕÉ¸¡…Í=Ý¹AÉ½Á•ÉÑä¡µ•Ñ…‘…Ñ„ü¹½Á•¹É…Á °€‰¥µ…•Ìˆ¤ì)ô)™Õ¹Ñ¥½¸¡…ÍQÝ¥ÑÑ•É%µ…•Ì¡µ•Ñ…‘…Ñ„¤ì(%É•ÑÕÉ¸¡…Í=Ý¹AÉ½Á•ÉÑä¡µ•Ñ…‘…Ñ„ü¹ÑÝ¥ÑÑ•È°€‰¥µ…•Ìˆ¤ì)ô)™Õ¹Ñ¥½¸¡…Í%½¹Ì¡µ•Ñ…‘…Ñ„¤ì(%É•ÑÕÉ¸	½½±•…¸¡µ•Ñ…‘…Ñ„ü¹¥½¹Ì¤ì)ô)™Õ¹Ñ¥½¸•Ñ5•Ñ…‘…Ñ…M½ÕÉ•½ÉI½ÕÑ”¡É½ÕÑ”°½ÁÑ¥½¹Ì°™…±±‰…­5•Ñ…‘…Ñ„¤ì(%¥˜€ …½ÁÑ¥½¹Ìü¹µ•Ñ…‘…Ñ…M½ÕÉ•Ì¤É•ÑÕÉ¸™…±±‰…­5•Ñ…‘…Ñ„ì(%¥˜€ …É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤É•ÑÕÉ¸¹Õ±°ì(%™½È€¡±•Ð¥¹‘•à€ô½ÁÑ¥½¹Ì¹µ•Ñ…‘…Ñ…M½ÕÉ•Ì¹±•¹Ñ €´€Äì¥¹‘•à€øô€Àì¥¹‘•à´´¤ì($%½¹ÍÐÍ½ÕÉ”€ô½ÁÑ¥½¹Ì¹µ•Ñ…‘…Ñ…M½ÕÉ•Ím¥¹‘•átì($%¥˜€¡É½ÕÑ•M•µ•¹ÑÍÁÁ±å]¥Ñ¡A…É…±±•±M±½ÑÌ¡Í½ÕÉ”¹É½ÕÑ•M•µ•¹ÑÌ°É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤¤É•ÑÕÉ¸Í½ÕÉ”¹µ•Ñ…‘…Ñ„ì(%ô(%É•ÑÕÉ¸¹Õ±°ì)ô)™Õ¹Ñ¥½¸Í½¥…±I½ÕÑ•!…ÍáÁ±¥¥Ñ%µ…•ÍÑM½ÕÉ”¡É½ÕÑ”°­¥¹°½ÁÑ¥½¹Ì°™…±±‰…­5•Ñ…‘…Ñ„¤ì(%½¹ÍÐÍ½ÕÉ•5•Ñ…‘…Ñ„€ô•Ñ5•Ñ…‘…Ñ…M½ÕÉ•½ÉI½ÕÑ”¡É½ÕÑ”°½ÁÑ¥½¹Ì°™…±±‰…­5•Ñ…‘…Ñ„¤ì(%É•ÑÕÉ¸­¥¹€ôôô€‰½Á•¹É…Á ˆ€ü¡…Í=Á•¹É…Á¡%µ…•Ì¡Í½ÕÉ•5•Ñ…‘…Ñ„¤€è¡…ÍQÝ¥ÑÑ•É%µ…•Ì¡Í½ÕÉ•5•Ñ…‘…Ñ„¤ì)ô)™Õ¹Ñ¥½¸¥½¹I½ÕÑ•!…ÍáÁ±¥¥Ñ%½¹ÍÑM½ÕÉ”¡É½ÕÑ”°½ÁÑ¥½¹Ì°™…±±‰…­5•Ñ…‘…Ñ„¤ì(%É•ÑÕÉ¸¡…Í%½¹Ì¡™…±±‰…­5•Ñ…‘…Ñ„¤ñð¡…Í%½¹Ì¡•Ñ5•Ñ…‘…Ñ…M½ÕÉ•½ÉI½ÕÑ”¡É½ÕÑ”°½ÁÑ¥½¹Ì°¹Õ±°¤¤ì)ô)™Õ¹Ñ¥½¸É•…‘MÑÉ¥¹AÉ½Á•ÉÑä¡Í½ÕÉ”°­•ä¤ì(%½¹ÍÐÙ…±Õ”€ôI•™±•Ð¹•Ð¡Í½ÕÉ”°­•ä¤ì(%É•ÑÕÉ¸ÑåÁ•½˜Ù…±Õ”€ôôô€‰ÍÑÉ¥¹œˆ€üÙ…±Õ”€èÙ½¥€Àì)ô)™Õ¹Ñ¥½¸É•…‘9Õµ‰•ÉAÉ½Á•ÉÑä¡Í½ÕÉ”°­•ä¤ì(%½¹ÍÐÙ…±Õ”€ôI•™±•Ð¹•Ð¡Í½ÕÉ”°­•ä¤ì(%É•ÑÕÉ¸ÑåÁ•½˜Ù…±Õ”€ôôô€‰¹Õµ‰•Èˆ€üÙ…±Õ”€èÙ½¥€Àì)ô)™Õ¹Ñ¥½¸É•…‘MÑÉ¥¹=É9Õµ‰•ÉAÉ½Á•ÉÑä¡Í½ÕÉ”°­•ä¤ì(%½¹ÍÐÙ…±Õ”€ôI•™±•Ð¹•Ð¡Í½ÕÉ”°­•ä¤ì(%¥˜€¡ÑåÁ•½˜Ù…±Õ”€ôôô€‰ÍÑÉ¥¹œˆñðÑåÁ•½˜Ù…±Õ”€ôôô€‰¹Õµ‰•Èˆ¤É•ÑÕÉ¸Ù…±Õ”ì)ô)™Õ¹Ñ¥½¸É•…‘M¥é•AÉ½Á•ÉÑä¡Í½ÕÉ”¤ì(%½¹ÍÐÍ¥é•Y…±Õ”€ôI•™±•Ð¹•Ð¡Í½ÕÉ”°€‰Í¥é”ˆ¤ì(%¥˜€¡ÑåÁ•½˜Í¥é•Y…±Õ”€„ôô€‰½‰©•ÐˆñðÍ¥é•Y…±Õ”€ôôô¹Õ±°¤É•ÑÕÉ¸ì(%½¹ÍÐÝ¥‘Ñ €ôÉ•…‘9Õµ‰•ÉAÉ½Á•ÉÑä¡Í¥é•Y…±Õ”°€‰Ý¥‘Ñ ˆ¤ì(%½¹ÍÐ¡•¥¡Ð€ôÉ•…‘9Õµ‰•ÉAÉ½Á•ÉÑä¡Í¥é•Y…±Õ”°€‰¡•¥¡Ðˆ¤ì(%¥˜€¡Ý¥‘Ñ €ôôôÙ½¥€À€˜˜¡•¥¡Ð€ôôôÙ½¥€À¤É•ÑÕÉ¸ì(%É•ÑÕÉ¸ì($%Ý¥‘Ñ °($%¡•¥¡Ð(%ôì)ô)™Õ¹Ñ¥½¸É•…‘å¹…µ¥%µ…•5•Ñ…‘…Ñ…M½ÕÉ”¡Í½ÕÉ”¤ì(%É•ÑÕÉ¸ì($%¥èÉ•…‘MÑÉ¥¹=É9Õµ‰•ÉAÉ½Á•ÉÑä¡Í½ÕÉ”°€‰¥ˆ¤°($%…±ÐèÉ•…‘MÑÉ¥¹AÉ½Á•ÉÑä¡Í½ÕÉ”°€‰…±Ðˆ¤°($%½¹Ñ•¹ÑQåÁ”èÉ•…‘MÑÉ¥¹AÉ½Á•ÉÑä¡Í½ÕÉ”°€‰½¹Ñ•¹ÑQåÁ”ˆ¤°($%Í¥é”èÉ•…‘M¥é•AÉ½Á•ÉÑä¡Í½ÕÉ”¤(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•å¹…µ¥%µ…•5•Ñ…‘…Ñ…M½ÕÉ•Ì¡É½ÕÑ”°Á…É…µÌ¤ì(%¥˜€ …É½ÕÑ”¹µ½‘Õ±”ñðÑåÁ•½˜É½ÕÑ”¹µ½‘Õ±”€„ôô€‰½‰©•Ðˆ¤É•ÑÕÉ¸mtì(%½¹ÍÐ•¹•É…Ñ•%µ…•5•Ñ…‘…Ñ„€ôI•™±•Ð¹•Ð¡É½ÕÑ”¹µ½‘Õ±”°€‰•¹•É…Ñ•%µ…•5•Ñ…‘…Ñ„ˆ¤ì(%¥˜€¡ÑåÁ•½˜•¹•É…Ñ•%µ…•5•Ñ…‘…Ñ„€„ôô€‰™Õ¹Ñ¥½¸ˆ¤É•ÑÕÉ¸mÉ•…‘å¹…µ¥%µ…•5•Ñ…‘…Ñ…M½ÕÉ”¡É½ÕÑ”¹µ½‘Õ±”¥tì(%½¹ÍÐÉ•ÍÕ±Ð€ô…Ý…¥Ð•¹•É…Ñ•%µ…•5•Ñ…‘…Ñ„¡ìÁ…É…µÌèµ…­•Q¡•¹…‰±•A…É…µÌ¡Á…É…µÌ¤ô¤ì(%¥˜€ …ÉÉ…ä¹¥ÍÉÉ…ä¡É•ÍÕ±Ð¤¤É•ÑÕÉ¸mtì(%½¹ÍÐÍ½ÕÉ•Ì€ômtì(%™½È€¡½¹ÍÐ•¹ÑÉä½˜É•ÍÕ±Ð¤¥˜€¡ÑåÁ•½˜•¹ÑÉä€ôôô€‰½‰©•Ðˆ€˜˜•¹ÑÉä€„ôô¹Õ±°¤ì($%½¹ÍÐÍ½ÕÉ”€ôÉ•…‘å¹…µ¥%µ…•5•Ñ…‘…Ñ…M½ÕÉ”¡•¹ÑÉä¤ì($%¥˜€¡Í½ÕÉ”¹¥€ôôôÙ½¥€À¤ì($$%½¹Í½±”¹Ý…É¸¡mÙ¥¹•áÑtM­¥ÁÁ¥¹œµ•Ñ…‘…Ñ„É½ÕÑ”€‘íÉ½ÕÑ”¹Í•ÉÙ•‘UÉ±ô¥µ…”µ•Ñ…‘…Ñ„•¹ÑÉä‰•…ÕÍ”•¹•É…Ñ•%µ…•5•Ñ…‘…Ñ„•¹ÑÉ¥•ÌµÕÍÐ¥¹±Õ‘”…¸¥¹€¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%Í½ÕÉ•Ì¹ÁÕÍ ¡Í½ÕÉ”¤ì(%ô(%É•ÑÕÉ¸Í½ÕÉ•Ìì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•I½ÕÑ•!•…‘…Ñ„¡É½ÕÑ”°Á…É…µÌ¤ì(%¥˜€ …É½ÕÑ”¹¥Íå¹…µ¥Œñð€…É½ÕÑ”¹µ½‘Õ±”ñðÑåÁ•½˜É½ÕÑ”¹µ½‘Õ±”€„ôô€‰½‰©•Ðˆ¤É•ÑÕÉ¸É½ÕÑ”¹¡•…‘…Ñ„€ümÉ½ÕÑ”¹¡•…‘…Ñ…t€èmtì(%½¹ÍÐÉ½ÕÑ•-¥¹€ô•Ñ5•Ñ…‘…Ñ…%µ…•I½ÕÑ•-¥¹¡É½ÕÑ”¤ì(%¥˜€ …É½ÕÑ•-¥¹¤É•ÑÕÉ¸É½ÕÑ”¹¡•…‘…Ñ„€ümÉ½ÕÑ”¹¡•…‘…Ñ…t€èmtì(%½¹ÍÐÉ•Í½±Ù•‘UÉ°€ô™¥±±I½ÕÑ•A…ÑÑ•É¹M•µ•¹ÑÌ¡É½ÕÑ”¹Í•ÉÙ•‘UÉ°°Á…É…µÌ¤ì(%¥˜€ …É•Í½±Ù•‘UÉ°¤ì($%½¹Í½±”¹Ý…É¸¡mÙ¥¹•áÑtM­¥ÁÁ¥¹œµ•Ñ…‘…Ñ„É½ÕÑ”€‘íÉ½ÕÑ”¹Í•ÉÙ•‘UÉ±ô‰•…ÕÍ”Á…É…µÌ‘¥¹½Ð™¥±°…±°‘å¹…µ¥ŒÍ•µ•¹ÑÌ¹€¤ì($%É•ÑÕÉ¸mtì(%ô(%½¹ÍÐµ•Ñ…‘…Ñ…M½ÕÉ•Ì€ô…Ý…¥ÐÉ•Í½±Ù•å¹…µ¥%µ…•5•Ñ…‘…Ñ…M½ÕÉ•Ì¡É½ÕÑ”°Á…É…µÌ¤ì(%½¹ÍÐÉ•Í½±Ù•‘!•…‘…Ñ„€ômtì(%™½È€¡½¹ÍÐµ•Ñ…‘…Ñ…M½ÕÉ”½˜µ•Ñ…‘…Ñ…M½ÕÉ•Ì¤ì($%±•Ð¡É•™	…Í”€ôÉ•Í½±Ù•‘UÉ°ì($%¥˜€¡µ•Ñ…‘…Ñ…M½ÕÉ”¹¥€„ôôÙ½¥€À¤ì($$%½¹ÍÐ¹½Éµ…±¥é•‘%€ô¹½Éµ…±¥é•5•Ñ…‘…Ñ…%µ…•%¡É½ÕÑ”°µ•Ñ…‘…Ñ…M½ÕÉ”¹¥¤ì($$%¥˜€ …¹½Éµ…±¥é•‘%¤½¹Ñ¥¹Õ”ì($$%¡É•™	…Í”€ô€‘íÉ•Í½±Ù•‘UÉ±ô¼‘í¹½Éµ…±¥é•‘%‘õ€ì($%ô($%½¹ÍÐ¡É•˜€ôÝ¥Ñ¡½¹Ñ•¹Ñ!…Í ¡¡É•™	…Í”°É½ÕÑ”¹½¹Ñ•¹Ñ!…Í ¤ì($%½¹ÍÐ½¹Ñ•¹ÑQåÁ”€ôµ•Ñ…‘…Ñ…M½ÕÉ”¹½¹Ñ•¹ÑQåÁ”€üüÉ½ÕÑ”¹½¹Ñ•¹ÑQåÁ”ì($%½¹ÍÐÍ¥é”€ôµ•Ñ…‘…Ñ…M½ÕÉ”¹Í¥é”ì($%¥˜€¡É½ÕÑ•-¥¹€ôôô€‰¥½¸ˆñðÉ½ÕÑ•-¥¹€ôôô€‰…ÁÁ±”ˆ¤ì($$%±•ÐÍ¥é•Ìì($$%¥˜€¡Í¥é”ü¹Ý¥‘Ñ €„ôôÙ½¥€À€˜˜Í¥é”¹¡•¥¡Ð€„ôôÙ½¥€À¤Í¥é•Ì€ô€‘íÍ¥é”¹Ý¥‘Ñ¡õà‘íÍ¥é”¹¡•¥¡Ñõ€ì($$%É•Í½±Ù•‘!•…‘…Ñ„¹ÁÕÍ ¡ì($$$%­¥¹èÉ½ÕÑ•-¥¹°($$$%¡É•˜°($$$%Í¥é•Ì°($$$%ÑåÁ”è½¹Ñ•¹ÑQåÁ”($$%ô¤ì($$%½¹Ñ¥¹Õ”ì($%ô($%É•Í½±Ù•‘!•…‘…Ñ„¹ÁÕÍ ¡ì($$%­¥¹èÉ½ÕÑ•-¥¹°($$%¡É•˜°($$%…±Ðèµ•Ñ…‘…Ñ…M½ÕÉ”¹…±Ð°($$%¡•¥¡ÐèÍ¥é”ü¹¡•¥¡Ð°($$%ÑåÁ”è½¹Ñ•¹ÑQåÁ”°($$%Ý¥‘Ñ èÍ¥é”ü¹Ý¥‘Ñ ($%ô¤ì(%ô(%É•ÑÕÉ¸É•Í½±Ù•‘!•…‘…Ñ„ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•!•…‘…Ñ…1¥ÍÐ¡É½ÕÑ•Ì°Á…É…µÌ¤ì(%É•ÑÕÉ¸€¡…Ý…¥ÐAÉ½µ¥Í”¹…±°¡É½ÕÑ•Ì¹µ…À ¡É½ÕÑ”¤€ôøÉ•Í½±Ù•I½ÕÑ•!•…‘…Ñ„¡É½ÕÑ”°Á…É…µÌ¤¤¤¤¹™±…Ð ¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸…ÁÁ±å¥±•	…Í•‘5•Ñ…‘…Ñ„¡µ•Ñ…‘…Ñ„°É½ÕÑ•A…Ñ °Á…É…µÌ°µ•Ñ…‘…Ñ…I½ÕÑ•Ì°½ÁÑ¥½¹Ì¤ì(%¥˜€ …µ•Ñ…‘…Ñ…I½ÕÑ•Ìñðµ•Ñ…‘…Ñ…I½ÕÑ•Ì¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸µ•Ñ…‘…Ñ„ì(%½¹ÍÐÉ½ÕÑ•M•µ•¹ÑÌ€ô½ÁÑ¥½¹Ìü¹É½ÕÑ•M•µ•¹ÑÌ€üü¹Õ±°ì(%½¹ÍÐ™…Ù¥½¹I½ÕÑ•Ì€ôÍ•±•Ñ••Á•ÍÑI½ÕÑ•Ì¡µ•Ñ…‘…Ñ…I½ÕÑ•Ì°€‰™…Ù¥½¸ˆ°É½ÕÑ•A…Ñ °Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤ì(%½¹ÍÐ¥½¹I½ÕÑ•Ì€ôÍ•±•Ñ••Á•ÍÑI½ÕÑ•Ì¡µ•Ñ…‘…Ñ…I½ÕÑ•Ì°€‰¥½¸ˆ°É½ÕÑ•A…Ñ °Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤¹™¥±Ñ•È ¡É½ÕÑ”¤€ôø€…¥½¹I½ÕÑ•!…ÍáÁ±¥¥Ñ%½¹ÍÑM½ÕÉ”¡É½ÕÑ”°½ÁÑ¥½¹Ì°µ•Ñ…‘…Ñ„¤¤ì(%½¹ÍÐ…ÁÁ±•I½ÕÑ•Ì€ôÍ•±•Ñ••Á•ÍÑI½ÕÑ•Ì¡µ•Ñ…‘…Ñ…I½ÕÑ•Ì°€‰…ÁÁ±”ˆ°É½ÕÑ•A…Ñ °Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤¹™¥±Ñ•È ¡É½ÕÑ”¤€ôø€…¥½¹I½ÕÑ•!…ÍáÁ±¥¥Ñ%½¹ÍÑM½ÕÉ”¡É½ÕÑ”°½ÁÑ¥½¹Ì°µ•Ñ…‘…Ñ„¤¤ì(%½¹ÍÐ½Á•¹É…Á¡I½ÕÑ•Ì€ôÍ•±•Ñ••Á•ÍÑI½ÕÑ•Ì¡µ•Ñ…‘…Ñ…I½ÕÑ•Ì°€‰½Á•¹É…Á ˆ°É½ÕÑ•A…Ñ °Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤¹™¥±Ñ•È ¡É½ÕÑ”¤€ôø€…Í½¥…±I½ÕÑ•!…ÍáÁ±¥¥Ñ%µ…•ÍÑM½ÕÉ”¡É½ÕÑ”°€‰½Á•¹É…Á ˆ°½ÁÑ¥½¹Ì°µ•Ñ…‘…Ñ„¤¤ì(%½¹ÍÐÑÝ¥ÑÑ•ÉI½ÕÑ•Ì€ôÍ•±•Ñ••Á•ÍÑI½ÕÑ•Ì¡µ•Ñ…‘…Ñ…I½ÕÑ•Ì°€‰ÑÝ¥ÑÑ•Èˆ°É½ÕÑ•A…Ñ °Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤¹™¥±Ñ•È ¡É½ÕÑ”¤€ôø€…Í½¥…±I½ÕÑ•!…ÍáÁ±¥¥Ñ%µ…•ÍÑM½ÕÉ”¡É½ÕÑ”°€‰ÑÝ¥ÑÑ•Èˆ°½ÁÑ¥½¹Ì°µ•Ñ…‘…Ñ„¤¤ì(%½¹ÍÐµ…¹¥™•ÍÑI½ÕÑ•Ì€ôÍ•±•Ñ••Á•ÍÑI½ÕÑ•Ì¡µ•Ñ…‘…Ñ…I½ÕÑ•Ì°€‰µ…¹¥™•ÍÐˆ°É½ÕÑ•A…Ñ °Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤ì(%½¹ÍÐm™…Ù¥½¹!•…‘…Ñ„°¥½¹!•…‘…Ñ„°…ÁÁ±•!•…‘…Ñ„°½Á•¹É…Á¡!•…‘…Ñ„°ÑÝ¥ÑÑ•É!•…‘…Ñ„°µ…¹¥™•ÍÑ!•…‘…Ñ…t€ô…Ý…¥ÐAÉ½µ¥Í”¹…±°¡l($%É•Í½±Ù•!•…‘…Ñ…1¥ÍÐ¡™…Ù¥½¹I½ÕÑ•Ì°Á…É…µÌ¤°($%É•Í½±Ù•!•…‘…Ñ…1¥ÍÐ¡¥½¹I½ÕÑ•Ì°Á…É…µÌ¤°($%É•Í½±Ù•!•…‘…Ñ…1¥ÍÐ¡…ÁÁ±•I½ÕÑ•Ì°Á…É…µÌ¤°($%É•Í½±Ù•!•…‘…Ñ…1¥ÍÐ¡½Á•¹É…Á¡I½ÕÑ•Ì°Á…É…µÌ¤°($%É•Í½±Ù•!•…‘…Ñ…1¥ÍÐ¡ÑÝ¥ÑÑ•ÉI½ÕÑ•Ì°Á…É…µÌ¤°($%É•Í½±Ù•!•…‘…Ñ…1¥ÍÐ¡µ…¹¥™•ÍÑI½ÕÑ•Ì°Á…É…µÌ¤(%t¤ì(%¥˜€ …µ•Ñ…‘…Ñ„€˜˜™…Ù¥½¹!•…‘…Ñ„¹±•¹Ñ €ôôô€À€˜˜¥½¹!•…‘…Ñ„¹±•¹Ñ €ôôô€À€˜˜…ÁÁ±•!•…‘…Ñ„¹±•¹Ñ €ôôô€À€˜˜½Á•¹É…Á¡!•…‘…Ñ„¹±•¹Ñ €ôôô€À€˜˜ÑÝ¥ÑÑ•É!•…‘…Ñ„¹±•¹Ñ €ôôô€À€˜˜µ…¹¥™•ÍÑ!•…‘…Ñ„¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ¹•áÑ5•Ñ…‘…Ñ„€ôµ•Ñ…‘…Ñ„€üì€¸¸¹µ•Ñ…‘…Ñ„ô€èíôì(%½¹ÍÐ™…Ù¥½¹¹ÑÉ¥•Ì€ômtì(%™½È€¡½¹ÍÐ¡•…‘…Ñ„½˜™…Ù¥½¹!•…‘…Ñ„¤ì($%½¹ÍÐ¥½¹¹ÑÉä€ô‰Õ¥±‘%½¹¹ÑÉä¡¡•…‘…Ñ„¤ì($%¥˜€¡¥½¹¹ÑÉä¤™…Ù¥½¹¹ÑÉ¥•Ì¹ÁÕÍ ¡¥½¹¹ÑÉä¤ì(%ô(%¥˜€¡™…Ù¥½¹¹ÑÉ¥•Ì¹±•¹Ñ €ø€À¤ì($%½¹ÍÐ¹•áÑ%½¹Ì€ô±½¹•%½¹5…À¡¹•áÑ5•Ñ…‘…Ñ„¹¥½¹Ì¤ì($%½¹ÍÐ¹½Éµ…±¥é•‘%½¹Ì€ô¹½Éµ…±¥é•%½¹¹ÑÉ¥•Ì¡¹•áÑ%½¹Ì¤ì($%¹•áÑ%½¹Ì¹¥½¸€ôl¸¸¹™…Ù¥½¹¹ÑÉ¥•Ì°€¸¸¹¹½Éµ…±¥é•‘%½¹Ítì($%¹•áÑ5•Ñ…‘…Ñ„¹¥½¹Ì€ô¹•áÑ%½¹Ìì(%ô(%ì($%½¹ÍÐ¹•áÑ%½¹Ì€ô±½¹•%½¹5…À¡¹•áÑ5•Ñ…‘…Ñ„¹¥½¹Ì¤ì($%½¹ÍÐ¥½¹¹ÑÉ¥•Ì€ômtì($%™½È€¡½¹ÍÐ¡•…‘…Ñ„½˜¥½¹!•…‘…Ñ„¤ì($$%½¹ÍÐ¥½¹¹ÑÉä€ô‰Õ¥±‘%½¹¹ÑÉä¡¡•…‘…Ñ„¤ì($$%¥˜€¡¥½¹¹ÑÉä¤¥½¹¹ÑÉ¥•Ì¹ÁÕÍ ¡¥½¹¹ÑÉä¤ì($%ô($%¥˜€¡¥½¹¹ÑÉ¥•Ì¹±•¹Ñ €ø€À¤ì($$%½¹ÍÐ¹½Éµ…±¥é•‘%½¹Ì€ô¹½Éµ…±¥é•%½¹¹ÑÉ¥•Ì¡¹•áÑ%½¹Ì¤ì($$%¹•áÑ%½¹Ì¹¥½¸€ôl¸¸¹¥½¹¹ÑÉ¥•Ì°€¸¸¹¹½Éµ…±¥é•‘%½¹Ítì($%ô($%½¹ÍÐ…ÁÁ±•¹ÑÉ¥•Ì€ômtì($%™½È€¡½¹ÍÐ¡•…‘…Ñ„½˜…ÁÁ±•!•…‘…Ñ„¤ì($$%½¹ÍÐ…ÁÁ±•¹ÑÉä€ô‰Õ¥±‘ÁÁ±•¹ÑÉä¡¡•…‘…Ñ„¤ì($$%¥˜€¡…ÁÁ±•¹ÑÉä¤…ÁÁ±•¹ÑÉ¥•Ì¹ÁÕÍ ¡…ÁÁ±•¹ÑÉä¤ì($%ô($%¥˜€¡…ÁÁ±•¹ÑÉ¥•Ì¹±•¹Ñ €ø€À¤ì($$%½¹ÍÐ•á¥ÍÑ¥¹ÁÁ±”€ô¹•áÑ%½¹Ì¹…ÁÁ±”ì($$%½¹ÍÐ¹½Éµ…±¥é•‘ÁÁ±•¹ÑÉ¥•Ì€ômtì($$%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡•á¥ÍÑ¥¹ÁÁ±”¤¤™½È€¡½¹ÍÐ•¹ÑÉä½˜•á¥ÍÑ¥¹ÁÁ±”¤¹½Éµ…±¥é•‘ÁÁ±•¹ÑÉ¥•Ì¹ÁÕÍ ¡¹½Éµ…±¥é•ÁÁ±•¹ÑÉä¡•¹ÑÉä¤¤ì($$%•±Í”¥˜€¡•á¥ÍÑ¥¹ÁÁ±”¤¹½Éµ…±¥é•‘ÁÁ±•¹ÑÉ¥•Ì¹ÁÕÍ ¡¹½Éµ…±¥é•ÁÁ±•¹ÑÉä¡•á¥ÍÑ¥¹ÁÁ±”¤¤ì($$%¹•áÑ%½¹Ì¹…ÁÁ±”€ôl¸¸¹…ÁÁ±•¹ÑÉ¥•Ì°€¸¸¹¹½Éµ…±¥é•‘ÁÁ±•¹ÑÉ¥•Ítì($%ô($%¥˜€¡¥½¹¹ÑÉ¥•Ì¹±•¹Ñ €ø€Àñð…ÁÁ±•¹ÑÉ¥•Ì¹±•¹Ñ €ø€À¤¹•áÑ5•Ñ…‘…Ñ„¹¥½¹Ì€ô¹•áÑ%½¹Ìì(%ô(%¥˜€¡½Á•¹É…Á¡!•…‘…Ñ„¹±•¹Ñ €ø€À¤ì($%½¹ÍÐÍ½¥…±¹ÑÉ¥•Ì€ômtì($%™½È€¡½¹ÍÐ¡•…‘…Ñ„½˜½Á•¹É…Á¡!•…‘…Ñ„¤ì($$%½¹ÍÐÍ½¥…±¹ÑÉä€ô‰Õ¥±‘M½¥…±¹ÑÉä¡¡•…‘…Ñ„¤ì($$%¥˜€¡Í½¥…±¹ÑÉä¤Í½¥…±¹ÑÉ¥•Ì¹ÁÕÍ ¡Í½¥…±¹ÑÉä¤ì($%ô($%¥˜€¡Í½¥…±¹ÑÉ¥•Ì¹±•¹Ñ €ø€À¤ì($$%½¹ÍÐ¹•áÑ=Á•¹É…Á €ô¹•áÑ5•Ñ…‘…Ñ„¹½Á•¹É…Á €üì€¸¸¹¹•áÑ5•Ñ…‘…Ñ„¹½Á•¹É…Á ô€èíôì($$%¹•áÑ=Á•¹É…Á ¹¥µ…•Ì€ôÍ½¥…±¹ÑÉ¥•Ìì($$%¹•áÑ5•Ñ…‘…Ñ„¹½Á•¹É…Á €ô¹•áÑ=Á•¹É…Á ì($%ô(%ô(%¥˜€¡ÑÝ¥ÑÑ•É!•…‘…Ñ„¹±•¹Ñ €ø€À¤ì($%½¹ÍÐÍ½¥…±¹ÑÉ¥•Ì€ômtì($%™½È€¡½¹ÍÐ¡•…‘…Ñ„½˜ÑÝ¥ÑÑ•É!•…‘…Ñ„¤ì($$%½¹ÍÐÍ½¥…±¹ÑÉä€ô‰Õ¥±‘M½¥…±¹ÑÉä¡¡•…‘…Ñ„¤ì($$%¥˜€¡Í½¥…±¹ÑÉä¤Í½¥…±¹ÑÉ¥•Ì¹ÁÕÍ ¡Í½¥…±¹ÑÉä¤ì($%ô($%¥˜€¡Í½¥…±¹ÑÉ¥•Ì¹±•¹Ñ €ø€À¤ì($$%½¹ÍÐ¹•áÑQÝ¥ÑÑ•È€ô¹•áÑ5•Ñ…‘…Ñ„¹ÑÝ¥ÑÑ•È€üì€¸¸¹¹•áÑ5•Ñ…‘…Ñ„¹ÑÝ¥ÑÑ•Èô€èíôì($$%¹•áÑQÝ¥ÑÑ•È¹¥µ…•Ì€ôÍ½¥…±¹ÑÉ¥•Ìì($$%¹•áÑ5•Ñ…‘…Ñ„¹ÑÝ¥ÑÑ•È€ô¹•áÑQÝ¥ÑÑ•Èì($%ô(%ô(%¥˜€¡µ…¹¥™•ÍÑ!•…‘…Ñ„¹±•¹Ñ €ø€À€˜˜µ…¹¥™•ÍÑ!•…‘…Ñ…lÁt¹­¥¹€ôôô€‰µ…¹¥™•ÍÐˆ¤¹•áÑ5•Ñ…‘…Ñ„¹µ…¹¥™•ÍÐ€ôµ…¹¥™•ÍÑ!•…‘…Ñ…lÁt¹¡É•˜ì(%É•ÑÕÉ¸¹•áÑ5•Ñ…‘…Ñ„ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µ¡•…¹©Ì)™Õ¹Ñ¥½¸É•Í½±Ù•Ñ¥Ù•A…É…±±•±I½ÕÑ•!•…‘%¹ÁÕÑÌ¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸=‰©•Ð¹•¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹Í±½ÑÌ€üüíô¤¹µ…À ¡mÍ±½Ñ-•ä°Í±½Ñt¤€ôøì($%¥˜€¡½ÁÑ¥½¹Ì¹¥¹Ñ•É•ÁÑM±½Ñ-•ä€ôôôÍ±½Ñ-•ä€˜˜½ÁÑ¥½¹Ì¹¥¹Ñ•É•ÁÑA…”¤É•ÑÕÉ¸ì($$%±…å½ÕÑ5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹¥¹Ñ•É•ÁÑ1…å½ÕÑÌ€üümt°($$%Á…•5½‘Õ±”è½ÁÑ¥½¹Ì¹¥¹Ñ•É•ÁÑA…”°($$%Á…É…µÌè½ÁÑ¥½¹Ì¹¥¹Ñ•É•ÁÑA…É…µÌ€üü½ÁÑ¥½¹Ì¹Á…É…µÌ°($$%É½ÕÑ•M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ($%ôì($%É•ÑÕÉ¸ì($$%±…å½ÕÑ5½‘Õ±•ÌèÍ±½Ð¹±…å½ÕÐ€ümÍ±½Ð¹±…å½ÕÑt€èmt°($$%Á…•5½‘Õ±”èÍ±½Ð¹Á…”°($$%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ°($$%É½ÕÑ•M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ($%ôì(%ô¤ì)ô)™Õ¹Ñ¥½¸¥ÍAÉ•Í•¹Ð¡Ù…±Õ”¤ì(%É•ÑÕÉ¸Ù…±Õ”€„ôô¹Õ±°€˜˜Ù…±Õ”€„ôôÙ½¥€Àì)ô)™Õ¹Ñ¥½¸½±±•ÑÁÁA…•M•…É¡A…É…µÌ¡Í•…É¡A…É…µÌ¤ì(%½¹ÍÐÁ…•M•…É¡A…É…µÌ€ô=‰©•Ð¹É•…Ñ”¡¹Õ±°¤ì(%±•Ð¡…ÍM•…É¡A…É…µÌ€ô™…±Í”ì(%Í•…É¡A…É…µÌü¹™½É…  ¡Ù…±Õ”°­•ä¤€ôøì($%¡…ÍM•…É¡A…É…µÌ€ôÑÉÕ”ì($%½¹ÍÐÕÉÉ•¹ÑY…±Õ”€ôÁ…•M•…É¡A…É…µÍm­•åtì($%¥˜€¡ÉÉ…ä¹¥ÍÉÉ…ä¡ÕÉÉ•¹ÑY…±Õ”¤¤ì($$%Á…•M•…É¡A…É…µÍm­•åt€ôl¸¸¹ÕÉÉ•¹ÑY…±Õ”°Ù…±Õ•tì($$%É•ÑÕÉ¸ì($%ô($%¥˜€¡ÕÉÉ•¹ÑY…±Õ”€„ôôÙ½¥€À¤ì($$%Á…•M•…É¡A…É…µÍm­•åt€ômÕÉÉ•¹ÑY…±Õ”°Ù…±Õ•tì($$%É•ÑÕÉ¸ì($%ô($%Á…•M•…É¡A…É…µÍm­•åt€ôÙ…±Õ”ì(%ô¤ì(%É•ÑÕÉ¸ì($%¡…ÍM•…É¡A…É…µÌ°($%Á…•M•…É¡A…É…µÌ(%ôì)ô)™Õ¹Ñ¥½¸É•…Ñ•5•Ñ…‘…Ñ…M½ÕÉ•Ì¡µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ°É½ÕÑ•M•µ•¹ÑÌ°±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°Á…•5•Ñ…‘…Ñ„°¥¹±Õ‘•A…•M½ÕÉ”¤ì(%½¹ÍÐµ•Ñ…‘…Ñ…M½ÕÉ•Ì€ôµ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹µ…À ¡µ•Ñ…‘…Ñ„°¥¹‘•à¤€ôø€¡ì($%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ•M•µ•¹ÑÌ¹Í±¥” À°±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ím¥¹‘•át€üü€À¤°($%µ•Ñ…‘…Ñ„(%ô¤¤ì(%¥˜€¡¥¹±Õ‘•A…•M½ÕÉ”¤µ•Ñ…‘…Ñ…M½ÕÉ•Ì¹ÁÕÍ ¡ì($%É½ÕÑ•M•µ•¹ÑÌ°($%µ•Ñ…‘…Ñ„èÁ…•5•Ñ…‘…Ñ„(%ô¤ì(%É•ÑÕÉ¸µ•Ñ…‘…Ñ…M½ÕÉ•Ìì)ô)™Õ¹Ñ¥½¸É•…Ñ•1…å½ÕÑ%¹ÁÕÑÌ¡±…å½ÕÑ5½‘Õ±•Ì°±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì¤ì(%½¹ÍÐ±…å½ÕÑ%¹ÁÕÑÌ€ômtì(%™½È€¡±•Ð¥¹‘•à€ô€Àì¥¹‘•à€ð±…å½ÕÑ5½‘Õ±•Ì¹±•¹Ñ ì¥¹‘•à¬¬¤ì($%½¹ÍÐ±…å½ÕÑ5½‘Õ±”€ô±…å½ÕÑ5½‘Õ±•Ím¥¹‘•átì($%¥˜€ …¥ÍAÉ•Í•¹Ð¡±…å½ÕÑ5½‘Õ±”¤¤½¹Ñ¥¹Õ”ì($%±…å½ÕÑ%¹ÁÕÑÌ¹ÁÕÍ ¡ì($$%µ½‘Õ±”è±…å½ÕÑ5½‘Õ±”°($$%ÑÉ••A½Í¥Ñ¥½¸è±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ím¥¹‘•át€üü€À($%ô¤ì(%ô(%É•ÑÕÉ¸±…å½ÕÑ%¹ÁÕÑÌì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•1…å½ÕÑ5•Ñ…‘…Ñ„¡±…å½ÕÑ%¹ÁÕÑÌ°Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤ì(%½¹ÍÐ±…å½ÕÑ5•Ñ…‘…Ñ…AÉ½µ¥Í•Ì€ômtì(%±•Ð…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„€ôAÉ½µ¥Í”¹É•Í½±Ù”¡íô¤ì(%™½È€¡½¹ÍÐ±…å½ÕÑ%¹ÁÕÐ½˜±…å½ÕÑ%¹ÁÕÑÌ¤ì($%½¹ÍÐÁ…É•¹Ñ½É1…å½ÕÐ€ô…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„ì($%½¹ÍÐ±…å½ÕÑA…É…µÌ€ôÉ•Í½±Ù•ÁÁA…•M•µ•¹ÑA…É…µÌ¡É½ÕÑ•M•µ•¹ÑÌ°±…å½ÕÑ%¹ÁÕÐ¹ÑÉ••A½Í¥Ñ¥½¸°Á…É…µÌ¤ì($%½¹ÍÐµ•Ñ…‘…Ñ…AÉ½µ¥Í”€ôÉ•Í½±Ù•5½‘Õ±•5•Ñ…‘…Ñ„¡±…å½ÕÑ%¹ÁÕÐ¹µ½‘Õ±”°±…å½ÕÑA…É…µÌ°Ù½¥€À°Á…É•¹Ñ½É1…å½ÕÐ¤ì($%±…å½ÕÑ5•Ñ…‘…Ñ…AÉ½µ¥Í•Ì¹ÁÕÍ ¡µ•Ñ…‘…Ñ…AÉ½µ¥Í”¤ì($%µ•Ñ…‘…Ñ…AÉ½µ¥Í”¹…Ñ   ¤€ôø¹Õ±°¤ì($%…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„€ôµ•Ñ…‘…Ñ…AÉ½µ¥Í”¹Ñ¡•¸¡…Íå¹Œ€¡µ•Ñ…‘…Ñ…I•ÍÕ±Ð¤€ôøì($$%¥˜€¡µ•Ñ…‘…Ñ…I•ÍÕ±Ð¤É•ÑÕÉ¸µ•É•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡mìµ•Ñ…‘…Ñ„è…Ý…¥ÐÁ…É•¹Ñ½É1…å½ÕÐô°ìµ•Ñ…‘…Ñ„èµ•Ñ…‘…Ñ…I•ÍÕ±Ðõt¤ì($$%É•ÑÕÉ¸Á…É•¹Ñ½É1…å½ÕÐì($%ô¤ì($%…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„¹…Ñ   ¤€ôø¹Õ±°¤ì(%ô(%É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡±…å½ÕÑ5•Ñ…‘…Ñ…AÉ½µ¥Í•Ì¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•1…å½ÕÑY¥•ÝÁ½ÉÐ¡±…å½ÕÑ%¹ÁÕÑÌ°Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤ì(%É•ÑÕÉ¸AÉ½µ¥Í”¹…±°¡±…å½ÕÑ%¹ÁÕÑÌ¹µ…À ¡±…å½ÕÑ%¹ÁÕÐ¤€ôøì($%½¹ÍÐ±…å½ÕÑA…É…µÌ€ôÉ•Í½±Ù•ÁÁA…•M•µ•¹ÑA…É…µÌ¡É½ÕÑ•M•µ•¹ÑÌ°±…å½ÕÑ%¹ÁÕÐ¹ÑÉ••A½Í¥Ñ¥½¸°Á…É…µÌ¤ì($%É•ÑÕÉ¸É•Í½±Ù•5½‘Õ±•Y¥•ÝÁ½ÉÐ¡±…å½ÕÑ%¹ÁÕÐ¹µ½‘Õ±”°±…å½ÕÑA…É…µÌ¤ì(%ô¤¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•A…É…±±•±I½ÕÑ•!•…¡Á…É…±±•±I½ÕÑ”°™…±±‰…­A…É…µÌ°™…±±‰…­I½ÕÑ•M•µ•¹ÑÌ°Á…•M•…É¡A…É…µÌ°Á…É•¹Ð¤ì(%½¹ÍÐÁ…É…µÌ€ôÁ…É…±±•±I½ÕÑ”¹Á…É…µÌ€üü™…±±‰…­A…É…µÌì(%½¹ÍÐÉ½ÕÑ•M•µ•¹ÑÌ€ôÁ…É…±±•±I½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ€üü™…±±‰…­I½ÕÑ•M•µ•¹ÑÌì(%½¹ÍÐµ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ€ômtì(%½¹ÍÐÙ¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ€ômtì(%½¹ÍÐµ•Ñ…‘…Ñ…M½ÕÉ•Ì€ômtì(%±•Ð…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„€ôÁ…É•¹Ðì(%½¹ÍÐ±…å½ÕÑ5½‘Õ±•Ì€ôl¸¸¹Á…É…±±•±I½ÕÑ”¹±…å½ÕÑ5½‘Õ±•Ì€üümt°Á…É…±±•±I½ÕÑ”¹±…å½ÕÑ5½‘Õ±•t¹™¥±Ñ•È¡¥ÍAÉ•Í•¹Ð¤ì(%½¹ÍÐ±…å½ÕÑY¥•ÝÁ½ÉÑAÉ½µ¥Í•Ì€ô±…å½ÕÑ5½‘Õ±•Ì¹µ…À ¡±…å½ÕÑ5½‘Õ±”¤€ôøÉ•Í½±Ù•5½‘Õ±•Y¥•ÝÁ½ÉÐ¡±…å½ÕÑ5½‘Õ±”°Á…É…µÌ¤¤ì(%½¹ÍÐÁ…•Y¥•ÝÁ½ÉÑAÉ½µ¥Í”€ôÁ…É…±±•±I½ÕÑ”¹Á…•5½‘Õ±”€üÉ•Í½±Ù•5½‘Õ±•Y¥•ÝÁ½ÉÐ¡Á…É…±±•±I½ÕÑ”¹Á…•5½‘Õ±”°Á…É…µÌ¤€èAÉ½µ¥Í”¹É•Í½±Ù”¡¹Õ±°¤ì(%™½È€¡½¹ÍÐ±…å½ÕÑY¥•ÝÁ½ÉÑAÉ½µ¥Í”½˜±…å½ÕÑY¥•ÝÁ½ÉÑAÉ½µ¥Í•Ì¤±…å½ÕÑY¥•ÝÁ½ÉÑAÉ½µ¥Í”¹…Ñ   ¤€ôø¹Õ±°¤ì(%Á…•Y¥•ÝÁ½ÉÑAÉ½µ¥Í”¹…Ñ   ¤€ôø¹Õ±°¤ì(%™½È€¡½¹ÍÐ±…å½ÕÑ5½‘Õ±”½˜±…å½ÕÑ5½‘Õ±•Ì¤ì($%½¹ÍÐ±…å½ÕÑ5•Ñ…‘…Ñ„€ô…Ý…¥ÐÉ•Í½±Ù•5½‘Õ±•5•Ñ…‘…Ñ„¡±…å½ÕÑ5½‘Õ±”°Á…É…µÌ°Ù½¥€À°…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„¤ì($%µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹ÁÕÍ ¡±…å½ÕÑ5•Ñ…‘…Ñ„¤ì($%µ•Ñ…‘…Ñ…M½ÕÉ•Ì¹ÁÕÍ ¡ì($$%µ•Ñ…‘…Ñ„è±…å½ÕÑ5•Ñ…‘…Ñ„°($$%É½ÕÑ•M•µ•¹ÑÌ($%ô¤ì($%¥˜€¡±…å½ÕÑ5•Ñ…‘…Ñ„¤ì($$%…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„€ô…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„¹Ñ¡•¸¡…Íå¹Œ€¡Á…É•¹Ñ5•Ñ…‘…Ñ„¤€ôøµ•É•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡mìµ•Ñ…‘…Ñ„èÁ…É•¹Ñ5•Ñ…‘…Ñ„ô°ìµ•Ñ…‘…Ñ„è±…å½ÕÑ5•Ñ…‘…Ñ„õt¤¤ì($$%…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„¹…Ñ   ¤€ôø¹Õ±°¤ì($%ô(%ô(%¥˜€¡Á…É…±±•±I½ÕÑ”¹Á…•5½‘Õ±”¤ì($%½¹ÍÐÁ…•5•Ñ…‘…Ñ„€ô…Ý…¥ÐÉ•Í½±Ù•5½‘Õ±•5•Ñ…‘…Ñ„¡Á…É…±±•±I½ÕÑ”¹Á…•5½‘Õ±”°Á…É…µÌ°Á…•M•…É¡A…É…µÌ°…ÕµÕ±…Ñ•‘5•Ñ…‘…Ñ„¤ì($%µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹ÁÕÍ ¡Á…•5•Ñ…‘…Ñ„¤ì($%µ•Ñ…‘…Ñ…M½ÕÉ•Ì¹ÁÕÍ ¡ì($$%µ•Ñ…‘…Ñ„èÁ…•5•Ñ…‘…Ñ„°($$%É½ÕÑ•M•µ•¹ÑÌ($%ô¤ì(%ô(%Ù¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ¹ÁÕÍ  ¸¸¹…Ý…¥ÐAÉ½µ¥Í”¹…±°¡±…å½ÕÑY¥•ÝÁ½ÉÑAÉ½µ¥Í•Ì¤¤ì(%½¹ÍÐÁ…•Y¥•ÝÁ½ÉÐ€ô…Ý…¥ÐÁ…•Y¥•ÝÁ½ÉÑAÉ½µ¥Í”ì(%¥˜€¡Á…É…±±•±I½ÕÑ”¹Á…•5½‘Õ±”¤Ù¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ¹ÁÕÍ ¡Á…•Y¥•ÝÁ½ÉÐ¤ì(%É•ÑÕÉ¸ì($%µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ°($%µ•Ñ…‘…Ñ…M½ÕÉ•Ì°($%Ù¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•!•…¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸…Ý…¥ÐÉÕ¹]¥Ñ¡•Ñ¡•‘ÕÁ”  ¤€ôøÉ•Í½±Ù•ÁÁA…•!•…‘%¹¹•È¡½ÁÑ¥½¹Ì¤¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•!•…‘%¹¹•È¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÉ½ÕÑ•M•µ•¹ÑÌ€ô½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ€üümtì(%½¹ÍÐ±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì€ô½ÁÑ¥½¹Ì¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì€üümtì(%½¹ÍÐ±…å½ÕÑ%¹ÁÕÑÌ€ôÉ•…Ñ•1…å½ÕÑ%¹ÁÕÑÌ¡½ÁÑ¥½¹Ì¹±…å½ÕÑ5½‘Õ±•Ì°±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì¤ì(%½¹ÍÐ±…å½ÕÑM½ÕÉ•A½Í¥Ñ¥½¹Ì€ô±…å½ÕÑ%¹ÁÕÑÌ¹µ…À ¡¥¹ÁÕÐ¤€ôø¥¹ÁÕÐ¹ÑÉ••A½Í¥Ñ¥½¸¤ì(%½¹ÍÐì¡…ÍM•…É¡A…É…µÌ°Á…•M•…É¡A…É…µÌô€ô½±±•ÑÁÁA…•M•…É¡A…É…µÌ¡½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ¤ì(%½¹ÍÐ±…å½ÕÑ5•Ñ…‘…Ñ…AÉ½µ¥Í”€ôÉ•Í½±Ù•1…å½ÕÑ5•Ñ…‘…Ñ„¡±…å½ÕÑ%¹ÁÕÑÌ°½ÁÑ¥½¹Ì¹Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤ì(%½¹ÍÐ±…å½ÕÑY¥•ÝÁ½ÉÑAÉ½µ¥Í”€ôÉ•Í½±Ù•1…å½ÕÑY¥•ÝÁ½ÉÐ¡±…å½ÕÑ%¹ÁÕÑÌ°½ÁÑ¥½¹Ì¹Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ¤ì(%½¹ÍÐ±…å½ÕÑ5•Ñ…‘…Ñ…I•ÍÕ±ÑÍ½ÉA…É•¹Ð€ô±…å½ÕÑ5•Ñ…‘…Ñ…AÉ½µ¥Í”¹Ñ¡•¸ ¡µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¤€ôøµ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹™¥±Ñ•È¡¥ÍAÉ•Í•¹Ð¤¤ì(%±…å½ÕÑ5•Ñ…‘…Ñ…I•ÍÕ±ÑÍ½ÉA…É•¹Ð¹…Ñ   ¤€ôø¹Õ±°¤ì(%½¹ÍÐÁ…•A…É•¹ÑAÉ½µ¥Í”€ô±…å½ÕÑ5•Ñ…‘…Ñ…I•ÍÕ±ÑÍ½ÉA…É•¹Ð¹Ñ¡•¸ ¡µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¤€ôøµ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹±•¹Ñ €ø€À€üµ•É•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹µ…À ¡µ•Ñ…‘…Ñ„¤€ôø€¡ìµ•Ñ…‘…Ñ„ô¤¤¤€èíô¤ì(%Á…•A…É•¹ÑAÉ½µ¥Í”¹…Ñ   ¤€ôø¹Õ±°¤ì(%½¹ÍÐÁ…•5•Ñ…‘…Ñ…AÉ½µ¥Í”€ô½ÁÑ¥½¹Ì¹Á…•5½‘Õ±”€üÉ•Í½±Ù•5½‘Õ±•5•Ñ…‘…Ñ„¡½ÁÑ¥½¹Ì¹Á…•5½‘Õ±”°½ÁÑ¥½¹Ì¹Á…É…µÌ°Á…•M•…É¡A…É…µÌ°Á…•A…É•¹ÑAÉ½µ¥Í”¤€èAÉ½µ¥Í”¹É•Í½±Ù”¡¹Õ±°¤ì(%½¹ÍÐÁ…•Y¥•ÝÁ½ÉÑAÉ½µ¥Í”€ô½ÁÑ¥½¹Ì¹Á…•5½‘Õ±”€üÉ•Í½±Ù•5½‘Õ±•Y¥•ÝÁ½ÉÐ¡½ÁÑ¥½¹Ì¹Á…•5½‘Õ±”°½ÁÑ¥½¹Ì¹Á…É…µÌ¤€èAÉ½µ¥Í”¹É•Í½±Ù”¡¹Õ±°¤ì(%½¹ÍÐÁ…É…±±•±I½ÕÑ•!•…‘AÉ½µ¥Í”€ôAÉ½µ¥Í”¹…±° ¡½ÁÑ¥½¹Ì¹Á…É…±±•±I½ÕÑ•Ì€üümt¤¹µ…À ¡Á…É…±±•±I½ÕÑ”¤€ôøÉ•Í½±Ù•A…É…±±•±I½ÕÑ•!•…¡Á…É…±±•±I½ÕÑ”°½ÁÑ¥½¹Ì¹Á…É…µÌ°É½ÕÑ•M•µ•¹ÑÌ°Á…•M•…É¡A…É…µÌ°Á…•A…É•¹ÑAÉ½µ¥Í”¤¤¤ì(%½¹ÍÐm±…å½ÕÑ5•Ñ…‘…Ñ…I•ÍÕ±ÑÌ°±…å½ÕÑY¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ°Á…•5•Ñ…‘…Ñ„°Á…•Y¥•ÝÁ½ÉÐ°Á…É…±±•±I½ÕÑ•!•…‘Ít€ô…Ý…¥ÐAÉ½µ¥Í”¹…±°¡l($%±…å½ÕÑ5•Ñ…‘…Ñ…AÉ½µ¥Í”°($%±…å½ÕÑY¥•ÝÁ½ÉÑAÉ½µ¥Í”°($%Á…•5•Ñ…‘…Ñ…AÉ½µ¥Í”°($%Á…•Y¥•ÝÁ½ÉÑAÉ½µ¥Í”°($%Á…É…±±•±I½ÕÑ•!•…‘AÉ½µ¥Í”(%t¤ì(%½¹ÍÐÁ…É…±±•±5•Ñ…‘…Ñ…I•ÍÕ±ÑÌ€ôÁ…É…±±•±I½ÕÑ•!•…‘Ì¹™±…Ñ5…À ¡¡•…¤€ôø¡•…¹µ•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¤ì(%½¹ÍÐÁ…É…±±•±Y¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ€ôÁ…É…±±•±I½ÕÑ•!•…‘Ì¹™±…Ñ5…À ¡¡•…¤€ôø¡•…¹Ù¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ¤ì(%½¹ÍÐÁ…É…±±•±5•Ñ…‘…Ñ…M½ÕÉ•Ì€ôÁ…É…±±•±I½ÕÑ•!•…‘Ì¹™±…Ñ5…À ¡¡•…¤€ôø¡•…¹µ•Ñ…‘…Ñ…M½ÕÉ•Ì¤ì(%½¹ÍÐµ•Ñ…‘…Ñ…¹ÑÉ¥•Ì€ôl($$¸¸¹±…å½ÕÑ5•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹™¥±Ñ•È¡¥ÍAÉ•Í•¹Ð¤¹µ…À ¡µ•Ñ…‘…Ñ„¤€ôø€¡ìµ•Ñ…‘…Ñ„ô¤¤°($$¸¸¹Á…•5•Ñ…‘…Ñ„€ümì($$%¥ÍA…”èÑÉÕ”°($$%µ•Ñ…‘…Ñ„èÁ…•5•Ñ…‘…Ñ„($%õt€èmt°($$¸¸¹Á…É…±±•±5•Ñ…‘…Ñ…I•ÍÕ±ÑÌ¹™¥±Ñ•È¡¥ÍAÉ•Í•¹Ð¤¹µ…À ¡µ•Ñ…‘…Ñ„¤€ôø€¡ì($$%½¹ÑÉ¥‰ÕÑ•ÍQ¥Ñ±”è™…±Í”°($$%µ•Ñ…‘…Ñ„($%ô¤¤(%tì(%½¹ÍÐÙ¥•ÝÁ½ÉÑ1¥ÍÐ€ôl($$¸¸¹±…å½ÕÑY¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ¹™¥±Ñ•È¡¥ÍAÉ•Í•¹Ð¤°($$¸¸¹Á…•Y¥•ÝÁ½ÉÐ€ümÁ…•Y¥•ÝÁ½ÉÑt€èmt°($$¸¸¹Á…É…±±•±Y¥•ÝÁ½ÉÑI•ÍÕ±ÑÌ¹™¥±Ñ•È¡¥ÍAÉ•Í•¹Ð¤(%tì(%½¹ÍÐÉ•Í½±Ù•‘5•Ñ…‘…Ñ…	…Í”€ôµ•Ñ…‘…Ñ…¹ÑÉ¥•Ì¹±•¹Ñ €ø€À€üµ•É•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡µ•Ñ…‘…Ñ…¹ÑÉ¥•Ì¤€è¹Õ±°ì(%½¹ÍÐµ•Ñ…‘…Ñ…M½ÕÉ•Ì€ôÉ•…Ñ•5•Ñ…‘…Ñ…M½ÕÉ•Ì¡±…å½ÕÑ5•Ñ…‘…Ñ…I•ÍÕ±ÑÌ°É½ÕÑ•M•µ•¹ÑÌ°±…å½ÕÑM½ÕÉ•A½Í¥Ñ¥½¹Ì°Á…•5•Ñ…‘…Ñ„°	½½±•…¸¡½ÁÑ¥½¹Ì¹Á…•5½‘Õ±”¤¤ì(%µ•Ñ…‘…Ñ…M½ÕÉ•Ì¹ÁÕÍ  ¸¸¹Á…É…±±•±5•Ñ…‘…Ñ…M½ÕÉ•Ì¤ì(%±•Ðµ•Ñ…‘…Ñ„€ôÉ•Í½±Ù•‘5•Ñ…‘…Ñ…	…Í”ì(%ÑÉäì($%µ•Ñ…‘…Ñ„€ô…Ý…¥Ð…ÁÁ±å¥±•	…Í•‘5•Ñ…‘…Ñ„¡É•Í½±Ù•‘5•Ñ…‘…Ñ…	…Í”°½ÁÑ¥½¹Ì¹É½ÕÑ•A…Ñ °½ÁÑ¥½¹Ì¹Á…É…µÌ°½ÁÑ¥½¹Ì¹µ•Ñ…‘…Ñ…I½ÕÑ•Ì°ì($$%É½ÕÑ•M•µ•¹ÑÌ°($$%µ•Ñ…‘…Ñ…M½ÕÉ•Ì($%ô¤ì(%ô…Ñ €¡•ÉÉ½È¤ì($%¥˜€ …½ÁÑ¥½¹Ì¹™…±±‰…­=¹¥±•5•Ñ…‘…Ñ…ÉÉ½È¤Ñ¡É½Ü•ÉÉ½Èì($%½¹Í½±”¹•ÉÉ½È¡mÙ¥¹•áÑt¥±”µ‰…Í•µ•Ñ…‘…Ñ„É•Í½±ÕÑ¥½¸™…¥±•Ý¡¥±”É•¹‘•É¥¹œ•ÉÉ½È‰½Õ¹‘…Éä™½È€‘í½ÁÑ¥½¹Ì¹É½ÕÑ•A…Ñ¡ôé€°•ÉÉ½È¤ì(%ô(%¥˜€¡µ•Ñ…‘…Ñ„¤µ•Ñ…‘…Ñ„€ôÁ½ÍÑAÉ½•ÍÍ5•Ñ…‘…Ñ„¡µ•Ñ…‘…Ñ„¤ì(%É•ÑÕÉ¸ì($%¡…ÍM•…É¡A…É…µÌ°($%µ•Ñ…‘…Ñ„°($%Á…•M•…É¡A…É…µÌ°($%Ù¥•ÝÁ½ÉÐèµ•É•Y¥•ÝÁ½ÉÐ¡Ù¥•ÝÁ½ÉÑ1¥ÍÐ¤(%ôì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µ‰½Õ¹‘…Éä¹©Ì)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•!ÑÑÁ•ÍÍ	½Õ¹‘…Éå½µÁ½¹•¹Ð¡½ÁÑ¥½¹Ì¤ì(%±•Ð‰½Õ¹‘…Éå5½‘Õ±”ì(%¥˜€¡½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÍ½‘”€ôôô€ÐÀÌ¤‰½Õ¹‘…Éå5½‘Õ±”€ô½ÁÑ¥½¹Ì¹É½ÕÑ•½É‰¥‘‘•¹5½‘Õ±”€üü½ÁÑ¥½¹Ì¹É½½Ñ½É‰¥‘‘•¹5½‘Õ±”ì(%•±Í”¥˜€¡½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÍ½‘”€ôôô€ÐÀÄ¤‰½Õ¹‘…Éå5½‘Õ±”€ô½ÁÑ¥½¹Ì¹É½ÕÑ•U¹…ÕÑ¡½É¥é•‘5½‘Õ±”€üü½ÁÑ¥½¹Ì¹É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”ì(%•±Í”‰½Õ¹‘…Éå5½‘Õ±”€ô½ÁÑ¥½¹Ì¹É½ÕÑ•9½Ñ½Õ¹‘5½‘Õ±”€üü½ÁÑ¥½¹Ì¹É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”ì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹•Ñ•™…Õ±ÑáÁ½ÉÐ¡‰½Õ¹‘…Éå5½‘Õ±”¤€üü¹Õ±°ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•A…É•¹Ñ!ÑÑÁ•ÍÍ	½Õ¹‘…Éå5½‘Õ±”¡½ÁÑ¥½¹Ì¤ì(%±•ÐÉ½ÕÑ•5½‘Õ±•Ì€ô½ÁÑ¥½¹Ì¹É½ÕÑ•9½Ñ½Õ¹‘5½‘Õ±•Ìì(%±•ÐÉ½½Ñ5½‘Õ±”€ô½ÁÑ¥½¹Ì¹É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”ì(%¥˜€¡½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÍ½‘”€ôôô€ÐÀÌ¤ì($%É½ÕÑ•5½‘Õ±•Ì€ô½ÁÑ¥½¹Ì¹É½ÕÑ•½É‰¥‘‘•¹5½‘Õ±•Ìì($%É½½Ñ5½‘Õ±”€ô½ÁÑ¥½¹Ì¹É½½Ñ½É‰¥‘‘•¹5½‘Õ±”ì(%ô•±Í”¥˜€¡½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÍ½‘”€ôôô€ÐÀÄ¤ì($%É½ÕÑ•5½‘Õ±•Ì€ô½ÁÑ¥½¹Ì¹É½ÕÑ•U¹…ÕÑ¡½É¥é•‘5½‘Õ±•Ìì($%É½½Ñ5½‘Õ±”€ô½ÁÑ¥½¹Ì¹É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”ì(%ô(%¥˜€¡É½ÕÑ•5½‘Õ±•Ì¤™½È€¡±•Ð¥¹‘•à€ô½ÁÑ¥½¹Ì¹±…å½ÕÑ%¹‘•à€´€Äì¥¹‘•à€øô€Àì¥¹‘•à´´¤ì($%½¹ÍÐµ½‘Õ±”€ôÉ½ÕÑ•5½‘Õ±•Ím¥¹‘•átì($%¥˜€¡µ½‘Õ±”¤É•ÑÕÉ¸µ½‘Õ±”ì(%ô(%É•ÑÕÉ¸É½½Ñ5½‘Õ±”€üü¹Õ±°ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•ÉÉ½É	½Õ¹‘…Éä¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÁ…•ÉÉ½É½µÁ½¹•¹Ð€ô½ÁÑ¥½¹Ì¹•Ñ•™…Õ±ÑáÁ½ÉÐ¡½ÁÑ¥½¹Ì¹Á…•ÉÉ½É5½‘Õ±”¤ì(%¥˜€¡Á…•ÉÉ½É½µÁ½¹•¹Ð¤É•ÑÕÉ¸ì($%½µÁ½¹•¹ÐèÁ…•ÉÉ½É½µÁ½¹•¹Ð°($%¥Í±½‰…±ÉÉ½Èè™…±Í”(%ôì(%½¹ÍÐÍ•µ•¹ÑÉÉ½É5½‘Õ±•Ì€ô½ÁÑ¥½¹Ì¹•ÉÉ½É5½‘Õ±•Ì€üü½ÁÑ¥½¹Ì¹±…å½ÕÑÉÉ½É5½‘Õ±•Ìì(%¥˜€¡Í•µ•¹ÑÉÉ½É5½‘Õ±•Ì¤™½È€¡±•Ð¥¹‘•à€ôÍ•µ•¹ÑÉÉ½É5½‘Õ±•Ì¹±•¹Ñ €´€Äì¥¹‘•à€øô€Àì¥¹‘•à´´¤ì($%½¹ÍÐÍ•µ•¹ÑÉÉ½É½µÁ½¹•¹Ð€ô½ÁÑ¥½¹Ì¹•Ñ•™…Õ±ÑáÁ½ÉÐ¡Í•µ•¹ÑÉÉ½É5½‘Õ±•Ím¥¹‘•át¤ì($%¥˜€¡Í•µ•¹ÑÉÉ½É½µÁ½¹•¹Ð¤É•ÑÕÉ¸ì($$%½µÁ½¹•¹ÐèÍ•µ•¹ÑÉÉ½É½µÁ½¹•¹Ð°($$%¥Í±½‰…±ÉÉ½Èè™…±Í”($%ôì(%ô(%½¹ÍÐ±½‰…±ÉÉ½É½µÁ½¹•¹Ð€ô½ÁÑ¥½¹Ì¹•Ñ•™…Õ±ÑáÁ½ÉÐ¡½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É5½‘Õ±”¤ì(%É•ÑÕÉ¸ì($%½µÁ½¹•¹Ðè±½‰…±ÉÉ½É½µÁ½¹•¹Ð€üü¹Õ±°°($%¥Í±½‰…±ÉÉ½Èè	½½±•…¸¡±½‰…±ÉÉ½É½µÁ½¹•¹Ð¤(%ôì)ô)™Õ¹Ñ¥½¸ÝÉ…ÁÁÁA…•	½Õ¹‘…Éå±•µ•¹Ð¡½ÁÑ¥½¹Ì¤ì(%±•Ð•±•µ•¹Ð€ô½ÁÑ¥½¹Ì¹•±•µ•¹Ðì(%¥˜€ …½ÁÑ¥½¹Ì¹Í­¥Á1…å½ÕÑ]É…ÁÁ¥¹œ¤™½È€¡±•Ð¥¹‘•à€ô½ÁÑ¥½¹Ì¹±…å½ÕÑ5½‘Õ±•Ì¹±•¹Ñ €´€Äì¥¹‘•à€øô€Àì¥¹‘•à´´¤ì($%½¹ÍÐ±…å½ÕÑ½µÁ½¹•¹Ð€ô½ÁÑ¥½¹Ì¹•Ñ•™…Õ±ÑáÁ½ÉÐ¡½ÁÑ¥½¹Ì¹±…å½ÕÑ5½‘Õ±•Ím¥¹‘•át¤ì($%¥˜€ …±…å½ÕÑ½µÁ½¹•¹Ð¤½¹Ñ¥¹Õ”ì($%½¹ÍÐÑÉ••A½Í¥Ñ¥½¸€ô½ÁÑ¥½¹Ì¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì€ü½ÁÑ¥½¹Ì¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ím¥¹‘•át€è€Àì($%½¹ÍÐ…Íå¹A…É…µÌ€ô½ÁÑ¥½¹Ì¹µ…­•Q¡•¹…‰±•A…É…µÌ¡É•Í½±Ù•ÁÁA…•M•µ•¹ÑA…É…µÌ¡½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸°½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ¤¤ì($%•±•µ•¹Ð€ô½ÁÑ¥½¹Ì¹É•¹‘•É1…å½ÕÐ¡±…å½ÕÑ½µÁ½¹•¹Ð°•±•µ•¹Ð°…Íå¹A…É…µÌ¤ì($%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€˜˜½ÁÑ¥½¹Ì¹É•¹‘•É1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È€˜˜½ÁÑ¥½¹Ì¹É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ¤ì($$%½¹ÍÐ¡¥±‘M•µ•¹ÑÌ€ô½ÁÑ¥½¹Ì¹É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ¡½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ€üümt°ÑÉ••A½Í¥Ñ¥½¸°½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ¤ì($$%•±•µ•¹Ð€ô½ÁÑ¥½¹Ì¹É•¹‘•É1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È¡ì¡¥±‘É•¸è¡¥±‘M•µ•¹ÑÌô°•±•µ•¹Ð¤ì($%ô(%ô(%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€˜˜½ÁÑ¥½¹Ì¹¥¹±Õ‘•±½‰…±ÉÉ½É	½Õ¹‘…Éä€˜˜½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É½µÁ½¹•¹Ð¤•±•µ•¹Ð€ô½ÁÑ¥½¹Ì¹É•¹‘•ÉÉÉ½É	½Õ¹‘…Éä¡½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É½µÁ½¹•¹Ð°•±•µ•¹Ð¤ì(%É•ÑÕÉ¸•±•µ•¹Ðì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•	½Õ¹‘…ÉåI•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÉÍMÑÉ•…´€ôÉÕ¹]¥Ñ¡•Ñ¡•‘ÕÁ”  ¤€ôø½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´¡½ÁÑ¥½¹Ì¹•±•µ•¹Ð°ì½¹ÉÉ½Èè½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È ¤ô¤¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ¤ì($%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì($$$‰½¹Ñ•¹ÐµQåÁ”ˆè€‰Ñ•áÐ½àµ½µÁ½¹•¹Ðì¡…ÉÍ•ÐõÕÑ˜´àˆ°($$%Y…ÉäèY%9aQ}IM}YIe}!H($%ô¤ì($%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¡•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ€üü¹Õ±°¤ì($%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡ÉÍMÑÉ•…´°ì($$%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÌ°($$%¡•…‘•ÉÌ($%ô¤ì(%ô(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•…Ñ•!Ñµ±I•ÍÁ½¹Í”¡ÉÍMÑÉ•…´°½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÌ¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µÍÑÉ•…´¹©Ì)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•½¹Ñ…Ñ„¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸ì($%±¥¹­Ìè½ÁÑ¥½¹Ì¹•Ñ1¥¹­Ì ¤°($%ÁÉ•±½…‘Ìè½ÁÑ¥½¹Ì¹•ÑAÉ•±½…‘Ì ¤°($%ÍÑå±•Ìè½ÁÑ¥½¹Ì¹•ÑMÑå±•Ì ¤(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•!Ñµ±MÑÉ•…´¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÍÍÉ=ÁÑ¥½¹Ì€ôì($%™½ÉµMÑ…Ñ”è½ÁÑ¥½¹Ì¹™½ÉµMÑ…Ñ”€üü¹Õ±°°($%ÍÉ¥ÁÑ9½¹”è½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”°($%Í¥‘•MÑÉ•…´è½ÁÑ¥½¹Ì¹Í¥‘•MÑÉ•…´°($%…ÁÑÕÉ•‘IÍ…Ñ…I•˜è½ÁÑ¥½¹Ì¹…ÁÑÕÉ•‘IÍ…Ñ…I•˜°($%Ý…¥Ñ½É±±I•…‘äè½ÁÑ¥½¹Ì¹Ý…¥Ñ½É±±I•…‘ä(%ôì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÍÍÉ!…¹‘±•È¹¡…¹‘±•MÍÈ¡½ÁÑ¥½¹Ì¹ÉÍMÑÉ•…´°½ÁÑ¥½¹Ì¹¹…Ù¥…Ñ¥½¹½¹Ñ•áÐ°½ÁÑ¥½¹Ì¹™½¹Ñ…Ñ„°ÍÍÉ=ÁÑ¥½¹Ì¤ì)ô(¼¨¨(¨]É…ÁÌ„ÍÑÉ•…´Í¼Ñ¡…Ð½¹±ÕÍ¡€¥Ì…±±•Ý¡•¸Ñ¡”±…ÍÐ‰åÑ”¡…Ì‰••¸É•…(¨‰äÑ¡”‘½Ý¹ÍÑÉ•…´½¹ÍÕµ•È€¡¤¹”¸Ý¡•¸Ñ¡”!QQ@±…å•È™¥¹¥Í¡•Ì‘É…¥¹¥¹œÑ¡”(¨É•ÍÁ½¹Í”‰½‘ä¤¸Q¡¥Ì¥ÌÑ¡”½ÉÉ•ÐÁ±…”Ñ¼±•…ÈÁ•ÈµÉ•ÅÕ•ÍÐ½¹Ñ•áÐ°(¨‰•…ÕÍ”Ñ¡”IM½MMHÁ¥Á•±¥¹”¥Ì±…éäƒŠP½µÁ½¹•¹ÑÌ•á•ÕÑ”Ý¡¥±”Ñ¡”ÍÑÉ•…´(¨¥Ì‰•¥¹œ½¹ÍÕµ•°¹½ÐÝ¡•¸Ñ¡”ÍÑÉ•…´¡…¹‘±”¥Ì™¥ÉÍÐ½‰Ñ…¥¹•¸(¨¼)™Õ¹Ñ¥½¸‘•™•ÉU¹Ñ¥±MÑÉ•…µ½¹ÍÕµ•¡ÍÑÉ•…´°½¹±ÕÍ ¤ì(%±•Ð…±±•€ô™…±Í”ì(%½¹ÍÐ½¹”€ô€ ¤€ôøì($%¥˜€ ……±±•¤ì($$%…±±•€ôÑÉÕ”ì($$%½¹±ÕÍ  ¤ì($%ô(%ôì(%½¹ÍÐ±•…¹ÕÀ€ô¹•ÜQÉ…¹Í™½ÉµMÑÉ•…´¡ì™±ÕÍ  ¤ì($%½¹” ¤ì(%ôô¤ì(%½¹ÍÐÉ•…‘•È€ôÍÑÉ•…´¹Á¥Á•Q¡É½Õ ¡±•…¹ÕÀ¤¹•ÑI•…‘•È ¤ì(%É•ÑÕÉ¸¹•ÜI•…‘…‰±•MÑÉ•…´¡ì($%ÁÕ±°¡½¹ÑÉ½±±•È¤ì($$%É•ÑÕÉ¸É•…‘•È¹É•… ¤¹Ñ¡•¸ ¡ì‘½¹”°Ù…±Õ”ô¤€ôøì($$$%¥˜€¡‘½¹”¤½¹ÑÉ½±±•È¹±½Í” ¤ì($$$%•±Í”½¹ÑÉ½±±•È¹•¹ÅÕ•Õ”¡Ù…±Õ”¤ì($$%ô°€¡•ÉÉ½È¤€ôøì($$$%½¹” ¤ì($$$%½¹ÑÉ½±±•È¹•ÉÉ½È¡•ÉÉ½È¤ì($$%ô¤ì($%ô°($%…¹•°¡É•…Í½¸¤ì($$%½¹” ¤ì($$%É•ÑÕÉ¸É•…‘•È¹…¹•°¡É•…Í½¸¤ì($%ô(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•!Ñµ±I•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÍ…™•MÑÉ•…´€ô‘•™•ÉU¹Ñ¥±MÑÉ•…µ½¹ÍÕµ•¡…Ý…¥ÐÉ•¹‘•ÉÁÁA…•!Ñµ±MÑÉ•…´¡½ÁÑ¥½¹Ì¤°€ ¤€ôøì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%ô¤ì(%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì($$‰½¹Ñ•¹ÐµQåÁ”ˆè€‰Ñ•áÐ½¡Ñµ°ì¡…ÉÍ•ÐõÕÑ˜´àˆ°($%Y…ÉäèY%9aQ}IM}YIe}!H(%ô¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹™½¹Ñ1¥¹­!•…‘•È¤¡•…‘•ÉÌ¹Í•Ð ‰1¥¹¬ˆ°½ÁÑ¥½¹Ì¹™½¹Ñ1¥¹­!•…‘•È¤ì(%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¡•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ€üü¹Õ±°¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡Í…™•MÑÉ•…´°ì($%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÌ°($%¡•…‘•ÉÌ(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•!Ñµ±MÑÉ•…µ]¥Ñ¡I•½Ù•Éä¡½ÁÑ¥½¹Ì¤ì(%ÑÉäì($%½¹ÍÐ¡Ñµ±MÑÉ•…´€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•É!Ñµ±MÑÉ•…´ ¤ì($%½ÁÑ¥½¹Ì¹½¹M¡•±±I•¹‘•É•ü¸ ¤ì($%É•ÑÕÉ¸ì($$%¡Ñµ±MÑÉ•…´°($$%É•ÍÁ½¹Í”è¹Õ±°($%ôì(%ô…Ñ €¡•ÉÉ½È¤ì($%½¹ÍÐÍÁ•¥…±ÉÉ½È€ô½ÁÑ¥½¹Ì¹É•Í½±Ù•MÁ•¥…±ÉÉ½È¡•ÉÉ½È¤ì($%¥˜€¡ÍÁ•¥…±ÉÉ½È¤É•ÑÕÉ¸ì($$%¡Ñµ±MÑÉ•…´è¹Õ±°°($$%É•ÍÁ½¹Í”è…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉMÁ•¥…±ÉÉ½ÉI•ÍÁ½¹Í”¡ÍÁ•¥…±ÉÉ½È¤($%ôì($%½¹ÍÐ‰½Õ¹‘…ÉåI•ÍÁ½¹Í”€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”¡•ÉÉ½È¤ì($%¥˜€¡‰½Õ¹‘…ÉåI•ÍÁ½¹Í”¤É•ÑÕÉ¸ì($$%¡Ñµ±MÑÉ•…´è¹Õ±°°($$%É•ÍÁ½¹Í”è‰½Õ¹‘…ÉåI•ÍÁ½¹Í”($%ôì($%Ñ¡É½Ü•ÉÉ½Èì(%ô)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•IÍÉÉ½ÉQÉ…­•È¡‰…Í•=¹ÉÉ½È¤ì(%±•Ð…ÁÑÕÉ•‘ÉÉ½È€ô¹Õ±°ì(%±•Ð…ÁÑÕÉ•‘MÁ•¥…±ÉÉ½È€ô¹Õ±°ì(%É•ÑÕÉ¸ì($%•Ñ…ÁÑÕÉ•‘ÉÉ½È ¤ì($$%É•ÑÕÉ¸…ÁÑÕÉ•‘ÉÉ½Èì($%ô°($%•Ñ…ÁÑÕÉ•‘MÁ•¥…±ÉÉ½È ¤ì($$%É•ÑÕÉ¸…ÁÑÕÉ•‘MÁ•¥…±ÉÉ½Èì($%ô°($%½¹I•¹‘•ÉÉÉ½È¡•ÉÉ½È°É•ÅÕ•ÍÑ%¹™¼°•ÉÉ½É½¹Ñ•áÐ¤ì($$%¥˜€¡•ÉÉ½È€˜˜ÑåÁ•½˜•ÉÉ½È€ôôô€‰½‰©•Ðˆ€˜˜€‰‘¥•ÍÐˆ¥¸•ÉÉ½È¤ì($$$%¥˜€¡…ÁÑÕÉ•‘MÁ•¥…±ÉÉ½È€ôôô¹Õ±°¤…ÁÑÕÉ•‘MÁ•¥…±ÉÉ½È€ô•ÉÉ½Èì($$%ô•±Í”…ÁÑÕÉ•‘ÉÉ½È€ô•ÉÉ½Èì($$%É•ÑÕÉ¸‰…Í•=¹ÉÉ½È¡•ÉÉ½È°É•ÅÕ•ÍÑ%¹™¼°•ÉÉ½É½¹Ñ•áÐ¤ì($%ô(%ôì)ô)™Õ¹Ñ¥½¸Í¡½Õ±‘I•É•¹‘•ÉÁÁA…•]¥Ñ¡±½‰…±ÉÉ½È¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸	½½±•…¸¡½ÁÑ¥½¹Ì¹…ÁÑÕÉ•‘ÉÉ½È¤€˜˜€…½ÁÑ¥½¹Ì¹¡…Í1½…±	½Õ¹‘…Éäì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µ‰½Õ¹‘…ÉäµÉ•¹‘•È¹©Ì)™Õ¹Ñ¥½¸•Ñ•™…Õ±ÑáÁ½ÉÐ¡µ½‘Õ±”¤ì(%É•ÑÕÉ¸µ½‘Õ±”ü¹‘•™…Õ±Ð€üü¹Õ±°ì)ô)™Õ¹Ñ¥½¸ÝÉ…ÁI•¹‘•É•‘	½Õ¹‘…Éå±•µ•¹Ð¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸ÝÉ…ÁÁÁA…•	½Õ¹‘…Éå±•µ•¹Ð¡ì($%•±•µ•¹Ðè½ÁÑ¥½¹Ì¹•±•µ•¹Ð°($%•Ñ•™…Õ±ÑáÁ½ÉÐ°($%±½‰…±ÉÉ½É½µÁ½¹•¹Ðè•Ñ•™…Õ±ÑáÁ½ÉÐ¡½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É5½‘Õ±”¤°($%¥¹±Õ‘•±½‰…±ÉÉ½É	½Õ¹‘…Éäè½ÁÑ¥½¹Ì¹¥¹±Õ‘•±½‰…±ÉÉ½É	½Õ¹‘…Éä°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%±…å½ÕÑ5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹±…å½ÕÑ5½‘Õ±•Ì°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìè½ÁÑ¥½¹Ì¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°($%µ…­•Q¡•¹…‰±•A…É…µÌè½ÁÑ¥½¹Ì¹µ…­•Q¡•¹…‰±•A…É…µÌ°($%µ…Ñ¡•‘A…É…µÌè½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ°($%É•¹‘•ÉÉÉ½É	½Õ¹‘…Éä¡±½‰…±ÉÉ½É½µÁ½¹•¹Ð°¡¥±‘É•¸¤ì($$%É•ÑÕÉ¸€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡ÉÉ½É	½Õ¹‘…Éä°ì($$$%™…±±‰…¬è±½‰…±ÉÉ½É½µÁ½¹•¹Ð°($$$%¡¥±‘É•¸($$%ô¤ì($%ô°($%É•¹‘•É1…å½ÕÐ¡1…å½ÕÑ½µÁ½¹•¹Ð°¡¥±‘É•¸°…Íå¹A…É…µÌ¤ì($$%É•ÑÕÉ¸€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡1…å½ÕÑ½µÁ½¹•¹Ð°ì($$$%¡¥±‘É•¸°($$$%Á…É…µÌè…Íå¹A…É…µÌ($$%ô¤ì($%ô°($%É•¹‘•É1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È¡Í•µ•¹Ñ5…À°¡¥±‘É•¸¤ì($$%É•ÑÕÉ¸€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡1…å½ÕÑM•µ•¹ÑAÉ½Ù¥‘•È°ìÍ•µ•¹Ñ5…Àô°¡¥±‘É•¸¤ì($%ô°($%É•Í½±Ù•¡¥±‘M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ°($%É½ÕÑ•M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ€üümt°($%Í­¥Á1…å½ÕÑ]É…ÁÁ¥¹œè½ÁÑ¥½¹Ì¹Í­¥Á1…å½ÕÑ]É…ÁÁ¥¹œ(%ô¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•	½Õ¹‘…Éå1…å½ÕÑ¹ÑÉ¥•Ì¡É½ÕÑ”°±…å½ÕÑ5½‘Õ±•Ì¤ì(%¥˜€ …É½ÕÑ”ñð±…å½ÕÑ5½‘Õ±•Ì¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸mtì(%É•ÑÕÉ¸É•…Ñ•ÁÁA…•1…å½ÕÑ¹ÑÉ¥•Ì¡ì($%•ÉÉ½ÉÌèÉ½ÕÑ”¹•ÉÉ½ÉÌ°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèÉ½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°($%±…å½ÕÑÌè±…å½ÕÑ5½‘Õ±•Ì°($%¹½Ñ½Õ¹‘Ìè¹Õ±°°($%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ(%ô¤ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•!ÑÑÁ•ÍÍ…±±‰…­!•…‘I½ÕÑ•M•µ•¹ÑÌ¡É½ÕÑ”°±…å½ÕÑ5½‘Õ±•Ì¤ì(%¥˜€ …É½ÕÑ”ü¹É½ÕÑ•M•µ•¹ÑÌ¤É•ÑÕÉ¸ì(%¥˜€ …É½ÕÑ”¹±…å½ÕÑÌñð±…å½ÕÑ5½‘Õ±•Ì¹±•¹Ñ €øôÉ½ÕÑ”¹±…å½ÕÑÌ¹±•¹Ñ ¤É•ÑÕÉ¸É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌì(%½¹ÍÐ±…ÍÑ%¹±Õ‘•‘1…å½ÕÑ%¹‘•à€ô±…å½ÕÑ5½‘Õ±•Ì¹±•¹Ñ €´€Äì(%¥˜€¡±…ÍÑ%¹±Õ‘•‘1…å½ÕÑ%¹‘•à€ð€À¤É•ÑÕÉ¸mtì(%½¹ÍÐÍ•µ•¹Ñ½Õ¹Ð€ôÉ½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹m±…ÍÑ%¹±Õ‘•‘1…å½ÕÑ%¹‘•át€üü€Àì(%É•ÑÕÉ¸É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¹Í±¥” À°Í•µ•¹Ñ½Õ¹Ð¤ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•!ÑÑÁ•ÍÍ…±±‰…­!•…‘1…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì¡É½ÕÑ”°±…å½ÕÑ5½‘Õ±•Ì¤ì(%¥˜€ …É½ÕÑ”ü¹±…å½ÕÑÌñð±…å½ÕÑ5½‘Õ±•Ì¹±•¹Ñ €øôÉ½ÕÑ”¹±…å½ÕÑÌ¹±•¹Ñ ¤É•ÑÕÉ¸É½ÕÑ”ü¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìì(%É•ÑÕÉ¸É½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹Í±¥” À°±…å½ÕÑ5½‘Õ±•Ì¹±•¹Ñ ¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•	½Õ¹‘…ÉåIÍA…å±½…¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÉ½ÕÑ•%€ôÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•I½ÕÑ•%¡½ÁÑ¥½¹Ì¹Á…Ñ¡¹…µ”°¹Õ±°¤ì(%½¹ÍÐ±…å½ÕÑ¹ÑÉ¥•Ì€ôÉ•…Ñ•ÁÁA…•	½Õ¹‘…Éå1…å½ÕÑ¹ÑÉ¥•Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”°½ÁÑ¥½¹Ì¹±…å½ÕÑ5½‘Õ±•Ì¤ì(%É•ÑÕÉ¸ì($$¸¸¹ÁÁ±•µ•¹ÑÍ]¥É”¹É•…Ñ•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡ì($$%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐè¹Õ±°°($$%±…å½ÕÑ%‘Ìè±…å½ÕÑ¹ÑÉ¥•Ì¹µ…À ¡•¹ÑÉä¤€ôø•¹ÑÉä¹¥¤°($$%É½½Ñ1…å½ÕÑQÉ••A…Ñ è±…å½ÕÑ¹ÑÉ¥•ÍlÁtü¹ÑÉ••A…Ñ €üü¹Õ±°°($$%É½ÕÑ•%($%ô¤°($%mÉ½ÕÑ•%‘tè½ÁÑ¥½¹Ì¹•±•µ•¹Ð(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•	½Õ¹‘…Éå±•µ•¹ÑI•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÁ…Ñ¡¹…µ”€ô¹•ÜUI0¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑUÉ°¤¹Á…Ñ¡¹…µ”ì(%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•	½Õ¹‘…ÉåI•ÍÁ½¹Í”¡ì($%…Íå¹ŒÉ•…Ñ•!Ñµ±I•ÍÁ½¹Í”¡ÉÍMÑÉ•…´°É•ÍÁ½¹Í•MÑ…ÑÕÌ¤ì($$%½¹ÍÐ™½¹Ñ…Ñ„€ôÉ•…Ñ•ÁÁA…•½¹Ñ…Ñ„¡ì($$$%•Ñ1¥¹­Ìè½ÁÑ¥½¹Ì¹•Ñ½¹Ñ1¥¹­Ì°($$$%•ÑAÉ•±½…‘Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑAÉ•±½…‘Ì°($$$%•ÑMÑå±•Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑMÑå±•Ì($$%ô¤ì($$%½¹ÍÐÍÍÉ!…¹‘±•È€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹±½…‘MÍÉ!…¹‘±•È ¤ì($$%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•!Ñµ±I•ÍÁ½¹Í”¡ì($$$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$$%™½¹Ñ…Ñ„°($$$%™½¹Ñ1¥¹­!•…‘•Èè½ÁÑ¥½¹Ì¹‰Õ¥±‘½¹Ñ1¥¹­!•…‘•È¡™½¹Ñ…Ñ„¹ÁÉ•±½…‘Ì¤°($$$%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ°($$$%¹…Ù¥…Ñ¥½¹½¹Ñ•áÐè½ÁÑ¥½¹Ì¹•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ ¤°($$$%ÉÍMÑÉ•…´°($$$%ÍÉ¥ÁÑ9½¹”è½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”°($$$%ÍÍÉ!…¹‘±•È°($$$%ÍÑ…ÑÕÌèÉ•ÍÁ½¹Í•MÑ…ÑÕÌ($$%ô¤ì($%ô°($%É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È ¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡Á…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸€üüÁ…Ñ¡¹…µ”¤ì($%ô°($%•±•µ•¹ÐèÉ•…Ñ•ÁÁA…•	½Õ¹‘…ÉåIÍA…å±½…¡ì($$%•±•µ•¹Ðè½ÁÑ¥½¹Ì¹•±•µ•¹Ð°($$%±…å½ÕÑ5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹±…å½ÕÑ5½‘Õ±•Ì°($$%Á…Ñ¡¹…µ”°($$%É½ÕÑ”è½ÁÑ¥½¹Ì¹É½ÕÑ”($%ô¤°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ°($%É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´è½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´°($%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÌ(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•!ÑÑÁ•ÍÍ…±±‰…¬¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ‰½Õ¹‘…Éå½µÁ½¹•¹Ð€ô½ÁÑ¥½¹Ì¹‰½Õ¹‘…Éå½µÁ½¹•¹Ð€üüÉ•Í½±Ù•ÁÁA…•!ÑÑÁ•ÍÍ	½Õ¹‘…Éå½µÁ½¹•¹Ð¡ì($%•Ñ•™…Õ±ÑáÁ½ÉÐ°($%É½½Ñ½É‰¥‘‘•¹5½‘Õ±”è½ÁÑ¥½¹Ì¹É½½Ñ½É‰¥‘‘•¹5½‘Õ±”°($%É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”è½ÁÑ¥½¹Ì¹É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”°($%É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”è½ÁÑ¥½¹Ì¹É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”°($%É½ÕÑ•½É‰¥‘‘•¹5½‘Õ±”è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹™½É‰¥‘‘•¸°($%É½ÕÑ•9½Ñ½Õ¹‘5½‘Õ±”è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹¹½Ñ½Õ¹°($%É½ÕÑ•U¹…ÕÑ¡½É¥é•‘5½‘Õ±”è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹Õ¹…ÕÑ¡½É¥é•°($%ÍÑ…ÑÕÍ½‘”è½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÍ½‘”(%ô¤ì(%¥˜€ …‰½Õ¹‘…Éå½µÁ½¹•¹Ð¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ±…å½ÕÑ5½‘Õ±•Ì€ô½ÁÑ¥½¹Ì¹±…å½ÕÑ5½‘Õ±•Ì€üü½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹±…å½ÕÑÌ€üü½ÁÑ¥½¹Ì¹É½½Ñ1…å½ÕÑÌì(%½¹ÍÐÉ½ÕÑ•M•µ•¹ÑÌ€ôÉ•Í½±Ù•!ÑÑÁ•ÍÍ…±±‰…­!•…‘I½ÕÑ•M•µ•¹ÑÌ¡½ÁÑ¥½¹Ì¹É½ÕÑ”°±…å½ÕÑ5½‘Õ±•Ì¤ì(%½¹ÍÐìµ•Ñ…‘…Ñ„°Ù¥•ÝÁ½ÉÐô€ô…Ý…¥ÐÉ•Í½±Ù•ÁÁA…•!•…¡ì($%±…å½ÕÑ5½‘Õ±•Ì°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèÉ•Í½±Ù•!ÑÑÁ•ÍÍ…±±‰…­!•…‘1…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì¡½ÁÑ¥½¹Ì¹É½ÕÑ”°±…å½ÕÑ5½‘Õ±•Ì¤°($%µ•Ñ…‘…Ñ…I½ÕÑ•Ìè½ÁÑ¥½¹Ì¹µ•Ñ…‘…Ñ…I½ÕÑ•Ì°($%Á…É…µÌè½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ°($%É½ÕÑ•A…Ñ è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹Á…ÑÑ•É¸€üü¹•ÜUI0¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑUÉ°¤¹Á…Ñ¡¹…µ”°($%É½ÕÑ•M•µ•¹ÑÌ(%ô¤ì(%½¹ÍÐ¡•…‘±•µ•¹ÑÌ€ôl À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤ ‰µ•Ñ„ˆ°ì($%¡…ÉM•Ðè€‰ÕÑ˜´àˆ°($%­•äè€‰¡…ÉÍ•Ðˆ(%ô¤°€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤ ‰µ•Ñ„ˆ°ì($%½¹Ñ•¹Ðè€‰¹½¥¹‘•àˆ°($%­•äè€‰É½‰½ÑÌˆ°($%¹…µ”è€‰É½‰½ÑÌˆ(%ô¥tì(%¥˜€¡µ•Ñ…‘…Ñ„¤¡•…‘±•µ•¹ÑÌ¹ÁÕÍ   À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡5•Ñ…‘…Ñ…!•…°ì($%­•äè€‰µ•Ñ…‘…Ñ„ˆ°($%µ•Ñ…‘…Ñ„(%ô¤¤ì(%¡•…‘±•µ•¹ÑÌ¹ÁÕÍ   À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡Y¥•ÝÁ½ÉÑ!•…°ì($%­•äè€‰Ù¥•ÝÁ½ÉÐˆ°($%Ù¥•ÝÁ½ÉÐ(%ô¤¤ì(%½¹ÍÐ•±•µ•¹Ð€ôÝÉ…ÁI•¹‘•É•‘	½Õ¹‘…Éå±•µ•¹Ð¡ì($%•±•µ•¹Ðè€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°¹Õ±°°€¸¸¹¡•…‘±•µ•¹ÑÌ°€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡‰½Õ¹‘…Éå½µÁ½¹•¹Ð¤¤°($%±½‰…±ÉÉ½É5½‘Õ±”è½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É5½‘Õ±”°($%¥¹±Õ‘•±½‰…±ÉÉ½É	½Õ¹‘…ÉäèÑÉÕ”°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%±…å½ÕÑ5½‘Õ±•Ì°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°($%µ…­•Q¡•¹…‰±•A…É…µÌè½ÁÑ¥½¹Ì¹µ…­•Q¡•¹…‰±•A…É…µÌ°($%µ…Ñ¡•‘A…É…µÌè½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ°($%É•Í½±Ù•¡¥±‘M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ°($%É½ÕÑ•M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹É½ÕÑ•M•µ•¹ÑÌ(%ô¤ì(%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•	½Õ¹‘…Éå±•µ•¹ÑI•ÍÁ½¹Í”¡ì($$¸¸¹½ÁÑ¥½¹Ì°($%•±•µ•¹Ð°($%±…å½ÕÑ5½‘Õ±•Ì°($%É½ÕÑ”è½ÁÑ¥½¹Ì¹É½ÕÑ”°($%É½ÕÑ•A…ÑÑ•É¸è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹Á…ÑÑ•É¸°($%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹ÍÑ…ÑÕÍ½‘”(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•ÉÉ½É	½Õ¹‘…Éä¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ•ÉÉ½É	½Õ¹‘…Éä€ôÉ•Í½±Ù•ÁÁA…•ÉÉ½É	½Õ¹‘…Éä¡ì($%•Ñ•™…Õ±ÑáÁ½ÉÐ°($%•ÉÉ½É5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹•ÉÉ½ÉA…Ñ¡Ì°($%±½‰…±ÉÉ½É5½‘Õ±”è½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É5½‘Õ±”°($%±…å½ÕÑÉÉ½É5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹•ÉÉ½ÉÌ°($%Á…•ÉÉ½É5½‘Õ±”è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹•ÉÉ½È(%ô¤ì(%¥˜€ …•ÉÉ½É	½Õ¹‘…Éä¹½µÁ½¹•¹Ð¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐÉ…ÝÉÉ½È€ô½ÁÑ¥½¹Ì¹•ÉÉ½È¥¹ÍÑ…¹•½˜ÉÉ½È€ü½ÁÑ¥½¹Ì¹•ÉÉ½È€è¹•ÜÉÉ½È¡MÑÉ¥¹œ¡½ÁÑ¥½¹Ì¹•ÉÉ½È¤¤ì(%É•ÝÉ¥Ñ•±¥•¹Ñ!½½­ÉÉ½È¡É…ÝÉÉ½È¤ì(%½¹ÍÐ•ÉÉ½É=‰©•Ð€ô½ÁÑ¥½¹Ì¹Í…¹¥Ñ¥é•ÉÉ½É½É±¥•¹Ð¡É…ÝÉÉ½È¤ì(%½¹ÍÐµ…Ñ¡•‘A…É…µÌ€ô½ÁÑ¥½¹Ì¹µ…Ñ¡•‘A…É…µÌ€üü½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹Á…É…µÌ€üüíôì(%½¹ÍÐ±…å½ÕÑ5½‘Õ±•Ì€ô½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹±…å½ÕÑÌ€üü½ÁÑ¥½¹Ì¹É½½Ñ1…å½ÕÑÌì(%½¹ÍÐÁ…Ñ¡¹…µ”€ô¹•ÜUI0¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑUÉ°¤¹Á…Ñ¡¹…µ”ì(%½¹ÍÐ¡•…‘±•µ•¹ÑÌ€ôl À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤ ‰µ•Ñ„ˆ°ì($%¡…ÉM•Ðè€‰ÕÑ˜´àˆ°($%­•äè€‰¡…ÉÍ•Ðˆ(%ô¥tì(%¥˜€ …•ÉÉ½É	½Õ¹‘…Éä¹¥Í±½‰…±ÉÉ½È¤ÑÉäì($%½¹ÍÐìµ•Ñ…‘…Ñ„°Ù¥•ÝÁ½ÉÐô€ô…Ý…¥ÐÉ•Í½±Ù•ÁÁA…•!•…¡ì($$%™…±±‰…­=¹¥±•5•Ñ…‘…Ñ…ÉÉ½ÈèÑÉÕ”°($$%±…å½ÕÑ5½‘Õ±•Ì°($$%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°($$%µ•Ñ…‘…Ñ…I½ÕÑ•Ìè½ÁÑ¥½¹Ì¹µ•Ñ…‘…Ñ…I½ÕÑ•Ì°($$%Á…É…µÌèµ…Ñ¡•‘A…É…µÌ°($$%É½ÕÑ•A…Ñ è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹Á…ÑÑ•É¸€üüÁ…Ñ¡¹…µ”°($$%É½ÕÑ•M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹É½ÕÑ•M•µ•¹ÑÌ($%ô¤ì($%¥˜€¡µ•Ñ…‘…Ñ„¤¡•…‘±•µ•¹ÑÌ¹ÁÕÍ   À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡5•Ñ…‘…Ñ…!•…°ì($$%­•äè€‰µ•Ñ…‘…Ñ„ˆ°($$%µ•Ñ…‘…Ñ„($%ô¤¤ì($%¡•…‘±•µ•¹ÑÌ¹ÁÕÍ   À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡Y¥•ÝÁ½ÉÑ!•…°ì($$%­•äè€‰Ù¥•ÝÁ½ÉÐˆ°($$%Ù¥•ÝÁ½ÉÐ($%ô¤¤ì(%ô…Ñ €¡•ÉÉ½È¤ì($%½¹Í½±”¹•ÉÉ½È¡mÙ¥¹•áÑtÁÀÁ…”•ÉÉ½È‰½Õ¹‘…Éä¡•…É•Í½±ÕÑ¥½¸™…¥±•™½È€‘í½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹Á…ÑÑ•É¸€üüÁ…Ñ¡¹…µ•ôé€°•ÉÉ½È¤ì(%ô(%½¹ÍÐ•±•µ•¹Ð€ôÝÉ…ÁI•¹‘•É•‘	½Õ¹‘…Éå±•µ•¹Ð¡ì($%•±•µ•¹Ðè€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°¹Õ±°°€¸¸¹¡•…‘±•µ•¹ÑÌ°€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡•ÉÉ½É	½Õ¹‘…Éä¹½µÁ½¹•¹Ð°ì•ÉÉ½Èè•ÉÉ½É=‰©•Ðô¤¤°($%±½‰…±ÉÉ½É5½‘Õ±”è½ÁÑ¥½¹Ì¹±½‰…±ÉÉ½É5½‘Õ±”°($%¥¹±Õ‘•±½‰…±ÉÉ½É	½Õ¹‘…Éäè€…•ÉÉ½É	½Õ¹‘…Éä¹¥Í±½‰…±ÉÉ½È°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%±…å½ÕÑ5½‘Õ±•Ì°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°($%µ…­•Q¡•¹…‰±•A…É…µÌè½ÁÑ¥½¹Ì¹µ…­•Q¡•¹…‰±•A…É…µÌ°($%µ…Ñ¡•‘A…É…µÌ°($%É•Í½±Ù•¡¥±‘M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ°($%É½ÕÑ•M•µ•¹ÑÌè½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹É½ÕÑ•M•µ•¹ÑÌ°($%Í­¥Á1…å½ÕÑ]É…ÁÁ¥¹œè•ÉÉ½É	½Õ¹‘…Éä¹¥Í±½‰…±ÉÉ½È(%ô¤ì(%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•	½Õ¹‘…Éå±•µ•¹ÑI•ÍÁ½¹Í”¡ì($$¸¸¹½ÁÑ¥½¹Ì°($%•±•µ•¹Ð°($%±…å½ÕÑ5½‘Õ±•Ì°($%É½ÕÑ”è½ÁÑ¥½¹Ì¹É½ÕÑ”°($%É½ÕÑ•A…ÑÑ•É¸è½ÁÑ¥½¹Ì¹É½ÕÑ”ü¹Á…ÑÑ•É¸°($%ÍÑ…ÑÕÌè€ÈÀÀ(%ô¤ì)ô)Ù…È}±¥•¹Ñ!½½­A…ÑÑ•É¸€ô€½qˆ¡ÕÍ•MÑ…Ñ•ñÕÍ•™™•ÑñÕÍ•I•‘Õ•ÉñÕÍ•I•™ñÕÍ•½¹Ñ•áÑñÕÍ•1…å½ÕÑ™™•ÑñÕÍ•%¹Í•ÉÑ¥½¹™™•ÑñÕÍ•Må¹áÑ•É¹…±MÑ½É•ñÕÍ•QÉ…¹Í¥Ñ¥½¹ñÕÍ•%µÁ•É…Ñ¥Ù•!…¹‘±•ñÕÍ••™•ÉÉ•‘Y…±Õ•ñÕÍ•Ñ¥½¹MÑ…Ñ•ñÕÍ•=ÁÑ¥µ¥ÍÑ¥ñÕÍ•™™•ÑÙ•¹Ð¥qˆ¸©¥Ì¹½Ð„™Õ¹Ñ¥½¸¼ì)™Õ¹Ñ¥½¸É•ÝÉ¥Ñ•±¥•¹Ñ!½½­ÉÉ½È¡•ÉÉ½È¤ì(%½¹ÍÐµ…Ñ €ô•ÉÉ½È¹µ•ÍÍ…”¹µ…Ñ ¡}±¥•¹Ñ!½½­A…ÑÑ•É¸¤ì(%¥˜€¡µ…Ñ ¤•ÉÉ½È¹µ•ÍÍ…”€ô‰Õ¥±‘±¥•¹Ñ!½½­ÉÉ½É5•ÍÍ…”¡€‘íµ…Ñ¡lÅuô ¥€¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµ™…±±‰…¬µÉ•¹‘•É•È¹©Ì)Ù…È5AQe}5]}Q`€ôì(%¡•…‘•ÉÌè¹Õ±°°(%ÍÑ…ÑÕÌè¹Õ±°)ôì)™Õ¹Ñ¥½¸É•…Ñ•ÁÁ…±±‰…­I•¹‘•É•È¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐì±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•Èè‰Õ¥±‘IÍ=¹ÉÉ½É!…¹‘±•È°™½¹ÑAÉ½Ù¥‘•ÉÌ°•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°±½‰…±ÉÉ½É5½‘Õ±”°µ…­•Q¡•¹…‰±•A…É…µÌ°µ•Ñ…‘…Ñ…I½ÕÑ•Ì°É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ°É½½Ñ	½Õ¹‘…É¥•Ì°ÉÍI•¹‘•É•È°Í…¹¥Ñ¥é•È°ÍÍÉ1½…‘•Èô€ô½ÁÑ¥½¹Ìì(%½¹ÍÐìÉ½½Ñ½É‰¥‘‘•¹5½‘Õ±”°É½½Ñ1…å½ÕÑÌ°É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”°É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”ô€ôÉ½½Ñ	½Õ¹‘…É¥•Ìì(%É•ÑÕÉ¸ì($%É•¹‘•É!ÑÑÁ•ÍÍ…±±‰…¬¡É½ÕÑ”°ÍÑ…ÑÕÍ½‘”°¥ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐ°½ÁÑÌ°ÍÉ¥ÁÑ9½¹”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($$%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•!ÑÑÁ•ÍÍ…±±‰…¬¡ì($$$%‰½Õ¹‘…Éå½µÁ½¹•¹Ðè½ÁÑÌü¹‰½Õ¹‘…Éå½µÁ½¹•¹Ð€üü¹Õ±°°($$$%‰Õ¥±‘½¹Ñ1¥¹­!•…‘•Èè™½¹ÑAÉ½Ù¥‘•ÉÌ¹‰Õ¥±‘½¹Ñ1¥¹­!•…‘•È°($$$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$$%É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($$$$%É•ÑÕÉ¸‰Õ¥±‘IÍ=¹ÉÉ½É!…¹‘±•È¡É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($$$%ô°($$$%•Ñ½¹Ñ1¥¹­Ìè™½¹ÑAÉ½Ù¥‘•ÉÌ¹•Ñ½¹Ñ1¥¹­Ì°($$$%•Ñ½¹ÑAÉ•±½…‘Ìè™½¹ÑAÉ½Ù¥‘•ÉÌ¹•Ñ½¹ÑAÉ•±½…‘Ì°($$$%•Ñ½¹ÑMÑå±•Ìè™½¹ÑAÉ½Ù¥‘•ÉÌ¹•Ñ½¹ÑMÑå±•Ì°($$$%•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°($$$%±½‰…±ÉÉ½É5½‘Õ±”°($$$%¥ÍIÍI•ÅÕ•ÍÐ°($$$%±…å½ÕÑ5½‘Õ±•Ìè½ÁÑÌü¹±…å½ÕÑÌ€üü¹Õ±°°($$$%±½…‘MÍÉ!…¹‘±•ÈèÍÍÉ1½…‘•È°($$$%µ…­•Q¡•¹…‰±•A…É…µÌ°($$$%µ…Ñ¡•‘A…É…µÌè½ÁÑÌü¹µ…Ñ¡•‘A…É…µÌ€üüÉ½ÕÑ”ü¹Á…É…µÌ€üüíô°($$$%µ¥‘‘±•Ý…É•½¹Ñ•áÐèµ¥‘‘±•Ý…É•½¹Ñ•áÐ€üü5AQe}5]}Q`°($$$%µ•Ñ…‘…Ñ…I½ÕÑ•Ì°($$$%É•ÅÕ•ÍÑUÉ°èÉ•ÅÕ•ÍÐ¹ÕÉ°°($$$%É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ°($$$%É½½Ñ½É‰¥‘‘•¹5½‘Õ±”°($$$%É½½Ñ1…å½ÕÑÌ°($$$%É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”°($$$%É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”°($$$%É½ÕÑ”°($$$%É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´èÉÍI•¹‘•É•È°($$$%ÍÉ¥ÁÑ9½¹”°($$$%ÍÑ…ÑÕÍ½‘”($$%ô¤ì($%ô°($%É•¹‘•É9½Ñ½Õ¹¡É½ÕÑ”°¥ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐ°µ…Ñ¡•‘A…É…µÌ°ÍÉ¥ÁÑ9½¹”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($$%É•ÑÕÉ¸Ñ¡¥Ì¹É•¹‘•É!ÑÑÁ•ÍÍ…±±‰…¬¡É½ÕÑ”°€ÐÀÐ°¥ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐ°ìµ…Ñ¡•‘A…É…µÌô°ÍÉ¥ÁÑ9½¹”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($%ô°($%É•¹‘•ÉÉÉ½É	½Õ¹‘…Éä¡É½ÕÑ”°•ÉÉ½È°¥ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐ°µ…Ñ¡•‘A…É…µÌ°ÍÉ¥ÁÑ9½¹”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($$%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•ÉÉ½É	½Õ¹‘…Éä¡ì($$$%‰Õ¥±‘½¹Ñ1¥¹­!•…‘•Èè™½¹ÑAÉ½Ù¥‘•ÉÌ¹‰Õ¥±‘½¹Ñ1¥¹­!•…‘•È°($$$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$$%É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($$$$%É•ÑÕÉ¸‰Õ¥±‘IÍ=¹ÉÉ½É!…¹‘±•È¡É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($$$%ô°($$$%•ÉÉ½È°($$$%•Ñ½¹Ñ1¥¹­Ìè™½¹ÑAÉ½Ù¥‘•ÉÌ¹•Ñ½¹Ñ1¥¹­Ì°($$$%•Ñ½¹ÑAÉ•±½…‘Ìè™½¹ÑAÉ½Ù¥‘•ÉÌ¹•Ñ½¹ÑAÉ•±½…‘Ì°($$$%•Ñ½¹ÑMÑå±•Ìè™½¹ÑAÉ½Ù¥‘•ÉÌ¹•Ñ½¹ÑMÑå±•Ì°($$$%•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°($$$%±½‰…±ÉÉ½É5½‘Õ±”°($$$%¥ÍIÍI•ÅÕ•ÍÐ°($$$%±½…‘MÍÉ!…¹‘±•ÈèÍÍÉ1½…‘•È°($$$%µ…­•Q¡•¹…‰±•A…É…µÌ°($$$%µ…Ñ¡•‘A…É…µÌèµ…Ñ¡•‘A…É…µÌ€üüÉ½ÕÑ”ü¹Á…É…µÌ€üüíô°($$$%µ¥‘‘±•Ý…É•½¹Ñ•áÐèµ¥‘‘±•Ý…É•½¹Ñ•áÐ€üü5AQe}5]}Q`°($$$%µ•Ñ…‘…Ñ…I½ÕÑ•Ì°($$$%É•ÅÕ•ÍÑUÉ°èÉ•ÅÕ•ÍÐ¹ÕÉ°°($$$%É•Í½±Ù•¡¥±‘M•µ•¹ÑÌ°($$$%É½½Ñ1…å½ÕÑÌ°($$$%É½ÕÑ”°($$$%É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´èÉÍI•¹‘•É•È°($$$%Í…¹¥Ñ¥é•ÉÉ½É½É±¥•¹ÐèÍ…¹¥Ñ¥é•È°($$$%ÍÉ¥ÁÑ9½¹”($$%ô¤ì($%ô(%ôì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µ•±•µ•¹Ðµ‰Õ¥±‘•È¹©Ì(¼¨¨(¨	Õ¥±Ñ¡”ÁÀI½ÕÑ•È•±•µ•¹ÐÑÉ•”™½È„µ…Ñ¡•É½ÕÑ”¸(¨(¨Q¡¥Ì¥ÌÑ¡”•¹ÑÉ…°•±•µ•¹Ðµ½¹ÍÑÉÕÑ¥½¸Á…Ñ ™½ÈÑ¡”ÁÀI½ÕÑ•ÈIM(¨¡…¹‘±•È¸%ÐÉ•Í½±Ù•ÌÁ…”¡•…µ•Ñ…‘…Ñ„€¡¥¹±Õ‘¥¹œÁ…É…±±•°É½ÕÑ”µ•Ñ…‘…Ñ„¤°(¨É•…Ñ•ÌÑ¡”Á…”I•…Ð•±•µ•¹Ð°…¹Ý¥É•Ì¥Ð¥¹Ñ¼Ñ¡”¹•ÍÑ•±…å½ÕÐ€¬(¨‰½Õ¹‘…ÉäÑÉ•”Ù¥„í±¥¹¬‰Õ¥±‘ÁÁA…•±•µ•¹ÑÍô¸(¨(¨Q¡”™Õ¹Ñ¥½¸¥Ì•áÑÉ…Ñ•™É½´Ñ¡”•¹•É…Ñ•IM•¹ÑÉäÑ•µÁ±…Ñ”Í¼¥Ð…¸(¨‰”Õ¹¥ÐµÑ•ÍÑ•¥¹‘•Á•¹‘•¹Ñ±ä½˜Ñ¡”½‘”µ•¹•É…Ñ¥½¸µ…¡¥¹•Éä¸(¨(¨9•áÐ¹©Ì•ÅÕ¥Ù…±•¹ÐèÑ¡”½µÁ½¹•¹ÐÑÉ•”½¹ÍÑÉÕÑ¥½¸¥¸(¨í±¥¹¬¡ÑÑÁÌè¼½¥Ñ¡Õˆ¹½´½Ù•É•°½¹•áÐ¹©Ì½‰±½ˆ½…¹…Éä½Á…­…•Ì½¹•áÐ½ÍÉŒ½Í•ÉÙ•È½…ÁÀµÉ•¹‘•È½É•…Ñ”µ½µÁ½¹•¹ÐµÑÉ•”¹ÑÍáñÉ•…Ñ”µ½µÁ½¹•¹ÐµÑÉ•”¹ÑÍáô(¨…¹Ñ¡”Á…”¡•…É•Í½±ÕÑ¥½¸¥¸(¨í±¥¹¬¡ÑÑÁÌè¼½¥Ñ¡Õˆ¹½´½Ù•É•°½¹•áÐ¹©Ì½‰±½ˆ½…¹…Éä½Á…­…•Ì½¹•áÐ½ÍÉŒ½Í•ÉÙ•È½…ÁÀµÉ•¹‘•È½É•…Ñ”µµ•Ñ…‘…Ñ„¹ÑÍáñÉ•…Ñ”µµ•Ñ…‘…Ñ„¹ÑÍáô¸(¨¼)…Íå¹Œ™Õ¹Ñ¥½¸‰Õ¥±‘A…•±•µ•¹ÑÌÄ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐìÉ½ÕÑ”°Á…É…µÌ°É½ÕÑ•A…Ñ °Á…•I•ÅÕ•ÍÐ°±½‰…±ÉÉ½É5½‘Õ±”°É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”°É½½Ñ½É‰¥‘‘•¹5½‘Õ±”°É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”°µ•Ñ…‘…Ñ…I½ÕÑ•Ìô€ô½ÁÑ¥½¹Ìì(%½¹ÍÐì½ÁÑÌ°Í•…É¡A…É…µÌ°¥ÍIÍI•ÅÕ•ÍÐ°µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°É•¹‘•É5½‘”€ôAA}IM}I9I}5=}9Y%Q%=8ô€ôÁ…•I•ÅÕ•ÍÐì(%½¹ÍÐÁ…•5½‘Õ±”€ôÉ½ÕÑ”¹Á…”ì(%½¹ÍÐA…•½µÁ½¹•¹Ð€ôÁ…•5½‘Õ±”ü¹‘•™…Õ±Ðì(%¥˜€ „…Á…•5½‘Õ±”€˜˜€…A…•½µÁ½¹•¹Ð¤ì($%½¹ÍÐ¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ€ô½ÁÑÌü¹¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ€üü¹Õ±°ì($%½¹ÍÐ¹½áÁ½ÉÑI½ÕÑ•%€ôÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•I½ÕÑ•%¡É½ÕÑ•A…Ñ °¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ¤ì($%±•Ð¹½áÁ½ÉÑI½½Ñ1…å½ÕÐ€ô¹Õ±°ì($%½¹ÍÐ¹½áÁ½ÉÑ1…å½ÕÑ%‘Ì€ôÉ½ÕÑ”¹¥‘Ìü¹±…å½ÕÑÌ€üüÉ½ÕÑ”¹±…å½ÕÑÌ¹µ…À ¡|°¥¹‘•à¤€ôøÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•1…å½ÕÑ%¡É•…Ñ•ÁÁA…•QÉ••A…Ñ ¡É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ°É½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹m¥¹‘•át€üü€À¤¤¤ì($%¥˜€¡É½ÕÑ”¹±…å½ÕÑÌü¹±•¹Ñ €ø€À¤ì($$%½¹ÍÐÑÉ••A½Í¥Ñ¥½¸€ôÉ½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹lÁt€üü€Àì($$%¹½áÁ½ÉÑI½½Ñ1…å½ÕÐ€ôÉ•…Ñ•ÁÁA…•QÉ••A…Ñ ¡É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ°ÑÉ••A½Í¥Ñ¥½¸¤ì($%ô($%É•ÑÕÉ¸ì($$$¸¸¹ÁÁ±•µ•¹ÑÍ]¥É”¹É•…Ñ•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡ì($$$%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°($$$%±…å½ÕÑ%‘Ìè¹½áÁ½ÉÑ1…å½ÕÑ%‘Ì°($$$%É½½Ñ1…å½ÕÑQÉ••A…Ñ è¹½áÁ½ÉÑI½½Ñ1…å½ÕÐ°($$$%É½ÕÑ•%è¹½áÁ½ÉÑI½ÕÑ•%($$%ô¤°($$%m¹½áÁ½ÉÑI½ÕÑ•%‘tè€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤ ‰‘¥Øˆ°¹Õ±°°€‰A…”¡…Ì¹¼‘•™…Õ±Ð•áÁ½ÉÐˆ¤($%ôì(%ô(%½¹ÍÐì¡…ÍM•…É¡A…É…µÌ°µ•Ñ…‘…Ñ„èÉ•Í½±Ù•‘5•Ñ…‘…Ñ„°Á…•M•…É¡A…É…µÌ°Ù¥•ÝÁ½ÉÐèÉ•Í½±Ù•‘Y¥•ÝÁ½ÉÐô€ô…Ý…¥ÐÉ•Í½±Ù•ÁÁA…•!•…¡ì($%±…å½ÕÑ5½‘Õ±•ÌèÉ½ÕÑ”¹±…å½ÕÑÌ°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèÉ½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°($%µ•Ñ…‘…Ñ…I½ÕÑ•Ì°($%Á…•5½‘Õ±”èÉ½ÕÑ”¹Á…”€üü¹Õ±°°($%Á…É…±±•±I½ÕÑ•ÌèÉ•Í½±Ù•Ñ¥Ù•A…É…±±•±I½ÕÑ•!•…‘%¹ÁÕÑÌ¡ì($$%¥¹Ñ•É•ÁÑ1…å½ÕÑÌè½ÁÑÌü¹¥¹Ñ•É•ÁÑ1…å½ÕÑÌ€üü¹Õ±°°($$%¥¹Ñ•É•ÁÑA…”è½ÁÑÌü¹¥¹Ñ•É•ÁÑA…”€üü¹Õ±°°($$%¥¹Ñ•É•ÁÑA…É…µÌè½ÁÑÌü¹¥¹Ñ•É•ÁÑA…É…µÌ€üü¹Õ±°°($$%¥¹Ñ•É•ÁÑM±½Ñ-•äè½ÁÑÌü¹¥¹Ñ•É•ÁÑM±½Ñ-•ä€üü¹Õ±°°($$%Á…É…µÌ°($$%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ€üümt°($$%Í±½ÑÌèÉ½ÕÑ”¹Í±½ÑÌ€üü¹Õ±°($%ô¤°($%Á…É…µÌ°($%É½ÕÑ•A…Ñ èÉ½ÕÑ”¹Á…ÑÑ•É¸°($%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ€üü¹Õ±°°($%Í•…É¡A…É…µÌ(%ô¤ì(%½¹ÍÐÁ…•AÉ½ÁÌ€ôìÁ…É…µÌèµ…­•Q¡•¹…‰±•A…É…µÌ¡Á…É…µÌ¤ôì(%¥˜€¡Í•…É¡A…É…µÌ¤ì($%Á…•AÉ½ÁÌ¹Í•…É¡A…É…µÌ€ôµ…­•Q¡•¹…‰±•A…É…µÌ¡Á…•M•…É¡A…É…µÌ¤ì($%¥˜€¡¡…ÍM•…É¡A…É…µÌ¤µ…É­å¹…µ¥UÍ…” ¤ì(%ô(%½¹ÍÐµ½Õ¹Ñ•‘M±½Ñ%‘Ì€ôµ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È€ü¹•ÜM•Ð¡µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È¹ÍÁ±¥Ð ˆ€ˆ¤¤€è¹Õ±°ì(%½¹ÍÐÍ±½Ñ=Ù•ÉÉ¥‘•Ì€ô‰Õ¥±‘M±½Ñ=Ù•ÉÉ¥‘•Ì¡É½ÕÑ”°Á…É…µÌ°É½ÕÑ•A…Ñ °½ÁÑÌ¤ì(%É•ÑÕÉ¸‰Õ¥±‘ÁÁA…•±•µ•¹ÑÌ¡ì($%•±•µ•¹ÐèA…•½µÁ½¹•¹Ð€ü€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤¡A…•½µÁ½¹•¹Ð°Á…•AÉ½ÁÌ¤€è¹Õ±°°($%±½‰…±ÉÉ½É5½‘Õ±”è±½‰…±ÉÉ½É5½‘Õ±”€üü¹Õ±°°($%¥ÍIÍI•ÅÕ•ÍÐ°($%µ½Õ¹Ñ•‘M±½Ñ%‘Ì°($%µ…­•Q¡•¹…‰±•A…É…µÌ°($%µ…Ñ¡•‘A…É…µÌèÁ…É…µÌ°($%É•Í½±Ù•‘5•Ñ…‘…Ñ„°($%É•Í½±Ù•‘Y¥•ÝÁ½ÉÐ°($%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐè½ÁÑÌü¹¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ€üü¹Õ±°°($%É½ÕÑ•A…Ñ °($%É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”èÉ½½Ñ9½Ñ½Õ¹‘5½‘Õ±”€üü¹Õ±°°($%É½½Ñ½É‰¥‘‘•¹5½‘Õ±”èÉ½½Ñ½É‰¥‘‘•¹5½‘Õ±”€üü¹Õ±°°($%É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”èÉ½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”€üü¹Õ±°°($%É½ÕÑ”°($%Í±½Ñ=Ù•ÉÉ¥‘•Ì°($%É•¹‘•É5½‘”(%ô¤ì)ô(¼¨¨(¨	Õ¥±Ñ¡”Á•ÈµÉ•ÅÕ•ÍÐÍ±½Ñ=Ù•ÉÉ¥‘•Í€µ…À¸½µ‰¥¹•Ìè(¨€€´%¹Ñ•É•ÁÑ¥½¸½Ù•ÉÉ¥‘•Ì€¡•á¥ÍÑ¥¹œ‰•¡…Ù¥½ÈƒŠPÍÝ…À¥¸Ñ¡”¥¹Ñ•É•ÁÑ¥¹œÁ…”(¨€€€…¹¥ÑÌ±…å½ÕÑÌÝ¡•¸Ñ¡”É•ÅÕ•ÍÐ¥Ì¥¹Ñ•É•ÁÑ•¥¹Ñ¼Ñ¡¥ÌÍ±½Ð¤¸(¨€€´M±½ÐµÍÁ•¥™¥ŒÁ…É…´•áÑÉ…Ñ¥½¸™½È¥¹¡•É¥Ñ•Í±½ÑÌÝ¡½Í”UI0Á…ÑÑ•É¸(¨€€€¡…Ì‘¥™™•É•¹ÐÁ…É…´¹…µ•ÌÑ¡…¸Ñ¡”É½ÕÑ”Ì¸Q¡”ÉÕ¹Ñ¥µ”µ…Ñ¡•ÌÑ¡”(¨€€€±•…¹•É•ÅÕ•ÍÐÁ…Ñ ……¥¹ÍÐÍ±½Ð¹Í±½ÑA…ÑÑ•É¹A…ÉÑÍ€Ñ¼ÁÉ½‘Õ”(¨€€€Í±½ÐµÍ½Á•Á…É…µÌ°Ý¡¥ …ÁÀµÁ…”µÉ½ÕÑ”µÝ¥É¥¹€Ñ¡•¸¡…¹‘ÌÑ¼Ñ¡”(¨€€€Í±½ÐÁ…”¥¹ÍÑ•…½˜Ñ¡”É½ÕÑ”Ìµ…Ñ¡•Á…É…µÌ¸(¨(¨É½ÕÑ•A…Ñ¡€¥ÌÑ¡”…±É•…‘äµ¹½Éµ…±¥é•É•ÅÕ•ÍÐÁ…Ñ¡¹…µ”€¡‰…Í•A…Ñ ÍÑÉ¥ÁÁ•°(¨IMÍÕ™™¥àÉ•µ½Ù•¤¸I”µÁ…ÉÍ¥¹œÉ•ÅÕ•ÍÐ¹ÕÉ±€¡•É”Ý½Õ±É”µ¥¹ÑÉ½‘Õ”Ñ¡”(¨‰…Í•A…Ñ …¹Í¥±•¹Ñ±ä‰É•…¬Ñ¡”µ…Ñ ™½È…¹ä…ÁÀÑ¡…Ð½¹™¥ÕÉ•Ì½¹”¸(¨¼)™Õ¹Ñ¥½¸‰Õ¥±‘M±½Ñ=Ù•ÉÉ¥‘•Ì¡É½ÕÑ”°É½ÕÑ•A…É…µÌ°É½ÕÑ•A…Ñ °½ÁÑÌ¤ì(%½¹ÍÐ½Ù•ÉÉ¥‘•Ì€ôíôì(%¥˜€¡½ÁÑÌ€˜˜½ÁÑÌ¹¥¹Ñ•É•ÁÑM±½Ñ-•ä€˜˜½ÁÑÌ¹¥¹Ñ•É•ÁÑA…”¤½Ù•ÉÉ¥‘•Ím½ÁÑÌ¹¥¹Ñ•É•ÁÑM±½Ñ-•åt€ôì($%±…å½ÕÑ5½‘Õ±•Ìè½ÁÑÌ¹¥¹Ñ•É•ÁÑ1…å½ÕÑÌñð¹Õ±°°($%Á…•5½‘Õ±”è½ÁÑÌ¹¥¹Ñ•É•ÁÑA…”°($%Á…É…µÌè½ÁÑÌ¹¥¹Ñ•É•ÁÑA…É…µÌñðÉ½ÕÑ•A…É…µÌ(%ôì(%½¹ÍÐÍ±½ÑÌ€ôÉ½ÕÑ”¹Í±½ÑÌì(%¥˜€¡Í±½ÑÌ¤ì($%±•ÐÕÉ±A…ÉÑÌ€ô¹Õ±°ì($%½¹ÍÐÉ½ÕÑ•A…É…µM•Ð€ô½±±•ÑA…É…µ9…µ•M•Ð¡É½ÕÑ”¹Á…É…µÌ¤ì($%™½È€¡½¹ÍÐmÍ±½Ñ-•ä°Í±½Ñt½˜=‰©•Ð¹•¹ÑÉ¥•Ì¡Í±½ÑÌ¤¤ì($$%½¹ÍÐÁ…ÑÑ•É¹A…ÉÑÌ€ôÍ±½Ð¹Í±½ÑA…ÑÑ•É¹A…ÉÑÌì($$%½¹ÍÐÁ…É…µ9…µ•Ì€ôÍ±½Ð¹Í±½ÑA…É…µ9…µ•Ìì($$%¥˜€ …Á…ÑÑ•É¹A…ÉÑÌñðÁ…ÑÑ•É¹A…ÉÑÌ¹±•¹Ñ €ôôô€À¤½¹Ñ¥¹Õ”ì($$%¥˜€¡Á…É…µ9…µ•Ì€˜˜Á…É…µ9…µ•Ì¹•Ù•Éä ¡¹…µ”¤€ôøÉ½ÕÑ•A…É…µM•Ð¹¡…Ì¡¹…µ”¤¤¤½¹Ñ¥¹Õ”ì($$%¥˜€¡ÕÉ±A…ÉÑÌ€ôôô¹Õ±°¤ÕÉ±A…ÉÑÌ€ôÉ½ÕÑ•A…Ñ ¹ÍÁ±¥Ð ˆ¼ˆ¤¹™¥±Ñ•È¡	½½±•…¸¤ì($$%½¹ÍÐµ…Ñ¡•€ôµ…Ñ¡I½ÕÑ•A…ÑÑ•É¸¡ÕÉ±A…ÉÑÌ°Á…ÑÑ•É¹A…ÉÑÌ¤ì($$%¥˜€ …µ…Ñ¡•¤½¹Ñ¥¹Õ”ì($$%½¹ÍÐ•á¥ÍÑ¥¹œ€ô½Ù•ÉÉ¥‘•ÍmÍ±½Ñ-•åtì($$%½Ù•ÉÉ¥‘•ÍmÍ±½Ñ-•åt€ô•á¥ÍÑ¥¹œ€üì($$$$¸¸¹•á¥ÍÑ¥¹œ°($$$%Á…É…µÌèµ…Ñ¡•($$%ô€èìÁ…É…µÌèµ…Ñ¡•ôì($%ô(%ô(%É•ÑÕÉ¸=‰©•Ð¹­•åÌ¡½Ù•ÉÉ¥‘•Ì¤¹±•¹Ñ €ø€À€ü½Ù•ÉÉ¥‘•Ì€è¹Õ±°ì)ô)™Õ¹Ñ¥½¸½±±•ÑA…É…µ9…µ•M•Ð¡Á…É…µÌ¤ì(%½¹ÍÐÍ•Ð€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ð ¤ì(%¥˜€¡Á…É…µÌ¤™½È€¡½¹ÍÐ¹…µ”½˜Á…É…µÌ¤Í•Ð¹…‘¡¹…µ”¤ì(%É•ÑÕÉ¸Í•Ðì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½¥ÍÈµ…¡”¹©Ì(¼¨¨(¨%MH€¡%¹É•µ•¹Ñ…°MÑ…Ñ¥ŒI••¹•É…Ñ¥½¸¤…¡”±…å•È¸(¨(¨]É…ÁÌÑ¡”Á±Õ…‰±”…¡•!…¹‘±•ÈÝ¥Ñ ÍÑ…±”µÝ¡¥±”µÉ•Ù…±¥‘…Ñ”Í•µ…¹Ñ¥Ìè(¨€´É•Í ¡¥ÐèÍ•ÉÙ”¥µµ•‘¥…Ñ•±ä(¨€´MÑ…±”¡¥ÐèÍ•ÉÙ”¥µµ•‘¥…Ñ•±ä€¬ÑÉ¥•È‰…­É½Õ¹É••¹•É…Ñ¥½¸(¨€´5¥ÍÌèÉ•¹‘•ÈÍå¹¡É½¹½ÕÍ±ä°…¡”°Í•ÉÙ”(¨(¨	…­É½Õ¹É••¹•É…Ñ¥½¸¥Ì‘•‘ÕÁ•ƒŠP½¹±ä½¹”É••¹•É…Ñ¥½¸Á•È…¡”­•ä(¨ÉÕ¹Ì…Ð„Ñ¥µ”°ÁÉ•Ù•¹Ñ¥¹œÑ¡Õ¹‘•É¥¹œ¡•É½¸Á½ÁÕ±…ÈÁ…•Ì¸(¨(¨Q¡¥Ì±…å•ÈÝ½É­ÌÝ¥Ñ …¹ä…¡•!…¹‘±•È‰…­•¹€¡µ•µ½Éä°I•‘¥Ì°-X°•ÑŒ¸¤(¨‰•…ÕÍ”¥Ð½¹±äÕÍ•ÌÑ¡”ÍÑ…¹‘…É•Ð½Í•Ð¥¹Ñ•É™…”¸(¨¼(¼¨¨(¨•Ð„…¡”•¹ÑÉäÝ¥Ñ ÍÑ…±•¹•ÍÌ¥¹™½Éµ…Ñ¥½¸¸(¨(¨I•ÑÕÉ¹ÌìÙ…±Õ”°¥ÍMÑ…±”è™…±Í”ô™½È™É•Í •¹ÑÉ¥•Ì°(¨ìÙ…±Õ”°¥ÍMÑ…±”èÑÉÕ”ô™½È•áÁ¥É•µ‰ÕÐµÕÍ…‰±”•¹ÑÉ¥•Ì°(¨½È¹Õ±°™½È…¡”µ¥ÍÍ•Ì¸(¨¼)…Íå¹Œ™Õ¹Ñ¥½¸¥ÍÉ•Ð¡­•ä¤ì(%½¹ÍÐÉ•ÍÕ±Ð€ô…Ý…¥Ð•Ñ…¡•!…¹‘±•È ¤¹•Ð¡­•ä¤ì(%¥˜€ …É•ÍÕ±Ðñð€…É•ÍÕ±Ð¹Ù…±Õ”¤É•ÑÕÉ¸¹Õ±°ì(%¥˜€¡É•ÍÕ±Ð¹…¡•MÑ…Ñ”€ôôô€‰•áÁ¥É•ˆ¤É•ÑÕÉ¸¹Õ±°ì(%É•ÑÕÉ¸ì($%Ù…±Õ”èÉ•ÍÕ±Ð°($%¥ÍMÑ…±”èÉ•ÍÕ±Ð¹…¡•MÑ…Ñ”€ôôô€‰ÍÑ…±”ˆ(%ôì)ô(¼¨¨(¨MÑ½É”„Ù…±Õ”¥¸Ñ¡”%MH…¡”Ý¥Ñ „É•Ù…±¥‘…Ñ¥½¸Á•É¥½¸(¨¼)…Íå¹Œ™Õ¹Ñ¥½¸¥ÍÉM•Ð¡­•ä°‘…Ñ„°É•Ù…±¥‘…Ñ•M•½¹‘Ì°Ñ…Ì°•áÁ¥É•M•½¹‘Ì¤ì(%…Ý…¥Ð•Ñ…¡•!…¹‘±•È ¤¹Í•Ð¡­•ä°‘…Ñ„°ì($%…¡•½¹ÑÉ½°è•áÁ¥É•M•½¹‘Ì€ôôôÙ½¥€À€üìÉ•Ù…±¥‘…Ñ”èÉ•Ù…±¥‘…Ñ•M•½¹‘Ìô€èì($$%É•Ù…±¥‘…Ñ”èÉ•Ù…±¥‘…Ñ•M•½¹‘Ì°($$%•áÁ¥É”è•áÁ¥É•M•½¹‘Ì($%ô°($%É•Ù…±¥‘…Ñ”èÉ•Ù…±¥‘…Ñ•M•½¹‘Ì°($%Ñ…ÌèÑ…Ì€üümt(%ô¤ì)ô)Ù…È}A9%9}I9}-d€ôMåµ‰½°¹™½È ‰Ù¥¹•áÐ¹¥ÍÉ…¡”¹Á•¹‘¥¹I••¹•É…Ñ¥½¹Ìˆ¤ì)Ù…È}œÄ€ô±½‰…±Q¡¥Ìì)Ù…ÈÁ•¹‘¥¹I••¹•É…Ñ¥½¹Ì€ô}œÅm}A9%9}I9}-et€üüô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(¼¨¨(¨QÉ¥•È„‰…­É½Õ¹É••¹•É…Ñ¥½¸™½È„…¡”­•ä¸(¨(¨%˜„É••¹•É…Ñ¥½¸™½ÈÑ¡¥Ì­•ä¥Ì…±É•…‘ä¥¸ÁÉ½É•ÍÌ°Ñ¡¥Ì¥Ì„¹¼µ½À¸(¨Q¡”É•¹‘•É¸Í¡½Õ±ÁÉ½‘Õ”Ñ¡”¹•Ü…¡”Ù…±Õ”…¹…±°¥ÍÉM•Ð¥¹Ñ•É¹…±±ä¸(¨(¨=¸±½Õ‘™±…É”]½É­•ÉÌÑ¡”É••¹•É…Ñ¥½¸ÁÉ½µ¥Í”¥ÌÉ•¥ÍÑ•É•Ý¥Ñ (¨Ñà¹Ý…¥ÑU¹Ñ¥° ¥€Ù¥„Ñ¡”1Lµ‰…­•á•ÕÑ¥½¹½¹Ñ•áÐ°­••Á¥¹œÑ¡”¥Í½±…Ñ”(¨…±¥Ù”Õ¹Ñ¥°Ñ¡”É••¹•É…Ñ¥½¸½µÁ±•Ñ•Ì•Ù•¸…™Ñ•ÈÑ¡”I•ÍÁ½¹Í”¥ÌÉ•ÑÕÉ¹•¸(¨(¨]¡•¸•ÉÉ½É½¹Ñ•áÑ€¥ÌÁÉ½Ù¥‘•…¹Ñ¡”É•¹‘•È™Õ¹Ñ¥½¸™…¥±Ì°Ñ¡”•ÉÉ½È(¨¥ÌÉ•Á½ÉÑ•Ù¥„É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½É€€¡¥¹ÍÑÉÕµ•¹Ñ…Ñ¥½¸¡½½¬¤Ý¥Ñ (¨É•Ù…±¥‘…Ñ•I•…Í½¸è€‰ÍÑ…±”‰€¸(¨¼)™Õ¹Ñ¥½¸ÑÉ¥•É	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡­•ä°É•¹‘•É¸°•ÉÉ½É½¹Ñ•áÐ¤ì(%¥˜€¡Á•¹‘¥¹I••¹•É…Ñ¥½¹Ì¹¡…Ì¡­•ä¤¤É•ÑÕÉ¸ì(%½¹ÍÐÁÉ½µ¥Í”€ôÉ•¹‘•É¸ ¤¹…Ñ  ¡•ÉÈ¤€ôøì($%½¹Í½±”¹•ÉÉ½È¡mÙ¥¹•áÑt%MH‰…­É½Õ¹É••¹•É…Ñ¥½¸™…¥±•™½È€‘í­•åôé€°•ÉÈ¤ì($%¥˜€¡•ÉÉ½É½¹Ñ•áÐ¤É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È¡•ÉÈ¥¹ÍÑ…¹•½˜ÉÉ½È€ü•ÉÈ€è¹•ÜÉÉ½È¡MÑÉ¥¹œ¡•ÉÈ¤¤°ì($$%Á…Ñ è­•ä°($$%µ•Ñ¡½è€‰Pˆ°($$%¡•…‘•ÉÌèíô($%ô°ì($$%É½ÕÑ•É-¥¹è•ÉÉ½É½¹Ñ•áÐ¹É½ÕÑ•É-¥¹°($$%É½ÕÑ•A…Ñ è•ÉÉ½É½¹Ñ•áÐ¹É½ÕÑ•A…Ñ °($$%É½ÕÑ•QåÁ”è•ÉÉ½É½¹Ñ•áÐ¹É½ÕÑ•QåÁ”°($$%É•Ù…±¥‘…Ñ•I•…Í½¸è€‰ÍÑ…±”ˆ($%ô¤ì(%ô¤¹™¥¹…±±ä  ¤€ôøì($%Á•¹‘¥¹I••¹•É…Ñ¥½¹Ì¹‘•±•Ñ”¡­•ä¤ì(%ô¤ì(%Á•¹‘¥¹I••¹•É…Ñ¥½¹Ì¹Í•Ð¡­•ä°ÁÉ½µ¥Í”¤ì(%•ÑI•ÅÕ•ÍÑá•ÕÑ¥½¹½¹Ñ•áÐ ¤ü¹Ý…¥ÑU¹Ñ¥°¡ÁÉ½µ¥Í”¤ì)ô(¼¨¨(¨	Õ¥±„…¡•‘ÁÁA…•Y…±Õ”™½ÈÑ¡”ÁÀI½ÕÑ•È%MH…¡”¸(¨¼)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•…¡•Y…±Õ”¡¡Ñµ°°ÉÍ…Ñ„°ÍÑ…ÑÕÌ¤ì(%É•ÑÕÉ¸ì($%­¥¹è€‰AA}Aˆ°($%¡Ñµ°°($%ÉÍ…Ñ„°($%¡•…‘•ÉÌèÙ½¥€À°($%Á½ÍÑÁ½¹•èÙ½¥€À°($%ÍÑ…ÑÕÌ(%ôì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•…¡•A…Ñ¡¹…µ”¡Á…Ñ¡¹…µ”¤ì(%É•ÑÕÉ¸Á…Ñ¡¹…µ”€ôôô€ˆ¼ˆ€ü€ˆ¼ˆ€èÁ…Ñ¡¹…µ”¹É•Á±…” ½p¼¼°€ˆˆ¤ì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘…¡•-•ä¡ÁÉ•™¥à°Á…Ñ¡¹…µ”°ÍÕ™™¥à¤ì(%½¹ÍÐ¹½Éµ…±¥é•€ô¹½Éµ…±¥é•…¡•A…Ñ¡¹…µ”¡Á…Ñ¡¹…µ”¤ì(%½¹ÍÐÍÕ™™¥áA…ÉÐ€ôÍÕ™™¥à€ü€è‘íÍÕ™™¥áõ€€è€ˆˆì(%½¹ÍÐ­•ä€ô€‘íÁÉ•™¥áôè‘í¹½Éµ…±¥é•‘ô‘íÍÕ™™¥áA…ÉÑõ€ì(%¥˜€¡­•ä¹±•¹Ñ €ðô€ÈÀÀ¤É•ÑÕÉ¸­•äì(%É•ÑÕÉ¸€‘íÁÉ•™¥áôé}}¡…Í è‘í™¹ØÅ„ØÐ¡¹½Éµ…±¥é•¥ô‘íÍÕ™™¥áA…ÉÑõ€ì)ô(¼¨¨(¨½µÁÕÑ”…¸ÁÀI½ÕÑ•È%MH­•ä™½È½¹”…¡”…ÉÑ¥™…Ð¸(¨(¨ÁÀÁ…•ÌÍÑ½É”!Q50°IMÁ…å±½…‘Ì°…¹É½ÕÑ”µ¡…¹‘±•ÈÉ•ÍÁ½¹Í•ÌÍ•Á…É…Ñ•±ä¸(¨Q¡”ÍÕ™™¥àµ¥ÉÉ½ÉÌ9•áÐ¹©ÌÌÍ•Á…É…Ñ”½¸µ‘¥Í¬…ÁÀ…ÉÑ¥™…ÑÌÝ¡¥±”­••Á¥¹œÑ¡”(¨±½Õ‘™±…É”-X­•äÕ¹‘•È¥ÑÌ€ÔÄÈµ‰åÑ”±¥µ¥Ð™½È±½¹œÁ…Ñ¡¹…µ•Ì¸(¨¼)™Õ¹Ñ¥½¸…ÁÁ%ÍÉ…¡•-•ä¡Á…Ñ¡¹…µ”°ÍÕ™™¥à°‰Õ¥±‘%€ô€ˆÙˆá‰á˜À´ÍÍ˜´Ñ„Å„´àÐÕ„µ‘‰‰Œå•‘™‘…ˆÐˆ¤ì(%É•ÑÕÉ¸‰Õ¥±‘…¡•-•ä¡‰Õ¥±‘%€ü…ÁÀè‘í‰Õ¥±‘%‘õ€€è€‰…ÁÀˆ°Á…Ñ¡¹…µ”°ÍÕ™™¥à¤ì)ô)™Õ¹Ñ¥½¸…ÁÁ%ÍÉ!Ñµ±-•ä¡Á…Ñ¡¹…µ”¤ì(%É•ÑÕÉ¸…ÁÁ%ÍÉ…¡•-•ä¡Á…Ñ¡¹…µ”°€‰¡Ñµ°ˆ¤ì)ô(¼¨¨(¨	Õ¥±Ñ¡”%MH…¡”­•ä™½È…¸IMÁ…å±½…¸(¨(¨9½Ñ”èÑ¡”­•ä™½Éµ…Ð¡…¹•™É½´ÉÍŒèñ¡…Í ù€Ñ¼ÉÍŒéÍ±½ÑÌèñ¡…Í ù€€¡…¹(¨½ÁÑ¥½¹…±±äÉÍŒéÍ±½ÑÌèñ¡…Í øéÁÉ•Í•ÉÙ”µÕ¥€¤¸á¥ÍÑ¥¹œ…¡••¹ÑÉ¥•ÌÕ¹‘•È(¨Ñ¡”½±™½Éµ…ÐÝ¥±°‰•½µ”Õ¹É•…¡…‰±”…™Ñ•È‘•Á±½åµ•¹Ð¸Q¡¥Ì¥Ì…•ÁÑ…‰±”(¨‰•…ÕÍ”%MH•¹ÑÉ¥•Ì¡…Ù”QQ1Ì…¹Ý¥±°‰”É••¹•É…Ñ•½¸Ñ¡”¹•áÐÉ•ÅÕ•ÍÐ¸(¨¼)™Õ¹Ñ¥½¸…ÁÁ%ÍÉIÍ-•ä¡Á…Ñ¡¹…µ”°µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°É•¹‘•É5½‘”€ôAA}IM}I9I}5=}9Y%Q%=8¤ì(%½¹ÍÐ¹½Éµ…±¥é•‘5½Õ¹Ñ•‘M±½ÑÍ!•…‘•È€ô¹½Éµ…±¥é•5½Õ¹Ñ•‘M±½ÑÍ!•…‘•È¡µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È¤ì(%½¹ÍÐÙ…É¥…¹Ð€ôm¹½Éµ…±¥é•‘5½Õ¹Ñ•‘M±½ÑÍ!•…‘•È€üÍ±½ÑÌè‘í™¹ØÅ„ØÐ¡¹½Éµ…±¥é•‘5½Õ¹Ñ•‘M±½ÑÍ!•…‘•È¥õ€€è¹Õ±°°Í¡½Õ±‘UÍ•AÉ•Í•ÉÙ•U¥…¡•Y…É¥…¹Ð¡É•¹‘•É5½‘”¤€ü€‰ÁÉ•Í•ÉÙ”µÕ¤ˆ€è¹Õ±±t¹™¥±Ñ•È ¡Á…ÉÐ¤€ôøÁ…ÉÐ€„ôô¹Õ±°¤¹©½¥¸ ˆèˆ¤ì(%É•ÑÕÉ¸…ÁÁ%ÍÉ…¡•-•ä¡Á…Ñ¡¹…µ”°Ù…É¥…¹Ð€üÉÍŒè‘íÙ…É¥…¹Ñõ€€è€‰ÉÍŒˆ¤ì)ô)™Õ¹Ñ¥½¸…ÁÁ%ÍÉI½ÕÑ•-•ä¡Á…Ñ¡¹…µ”¤ì(%É•ÑÕÉ¸…ÁÁ%ÍÉ…¡•-•ä¡Á…Ñ¡¹…µ”°€‰É½ÕÑ”ˆ¤ì)ô)Ù…È}IY1%Q}-d€ôMåµ‰½°¹™½È ‰Ù¥¹•áÐ¹¥ÍÉ…¡”¹É•Ù…±¥‘…Ñ•ÕÉ…Ñ¥½¹Ìˆ¤ì)}œÅm}IY1%Q}-et€üüô€¼¨}}AUI}|€¨¼¹•Ü5…À ¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µ…¡”¹©Ì)Ù…È9=}MQ=I}!}=9QI=0€ô€‰¹¼µÍÑ½É”°µÕÍÐµÉ•Ù…±¥‘…Ñ”ˆì)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•…¡•½¹ÑÉ½°¡…¡•MÑ…Ñ”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤ì(%É•ÑÕÉ¸‰Õ¥±‘…¡•‘I•Ù…±¥‘…Ñ•…¡•½¹ÑÉ½°¡…¡•MÑ…Ñ”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤ì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•…¡•‘!•…‘•ÉÌ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì($$‰…¡”µ½¹ÑÉ½°ˆè½ÁÑ¥½¹Ì¹…¡•½¹ÑÉ½°°($$‰½¹Ñ•¹ÐµQåÁ”ˆè½ÁÑ¥½¹Ì¹½¹Ñ•¹ÑQåÁ”°($%Y…ÉäèY%9aQ}IM}YIe}!H°($%mY%9aQ}!}!Itè½ÁÑ¥½¹Ì¹…¡•MÑ…Ñ”(%ô¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È¤¡•…‘•ÉÌ¹Í•Ð¡Y%9aQ}5=U9Q}M1=QM}!H°½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È¤ì(%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¡•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ€üü¹Õ±°¤ì(%É•ÑÕÉ¸¡•…‘•ÉÌì)ô)™Õ¹Ñ¥½¸•Ñ…¡•‘ÁÁA…•Y…±Õ”¡•¹ÑÉä¤ì(%É•ÑÕÉ¸•¹ÑÉäü¹Ù…±Õ”¹Ù…±Õ”€˜˜•¹ÑÉä¹Ù…±Õ”¹Ù…±Õ”¹­¥¹€ôôô€‰AA}Aˆ€ü•¹ÑÉä¹Ù…±Õ”¹Ù…±Õ”€è¹Õ±°ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•…¡•]É¥Ñ•A½±¥ä¡½ÁÑ¥½¹Ì¤ì(%±•ÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì(%±•Ð•áÁ¥É•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ìì(%½¹ÍÐÉ•ÅÕ•ÍÑ…¡•1¥™”€ô½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑ…¡•1¥™”ì(%¥˜€¡É•ÅÕ•ÍÑ…¡•1¥™”ü¹É•Ù…±¥‘…Ñ”€„ôôÙ½¥€À¤É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô¹Õ±°€üÉ•ÅÕ•ÍÑ…¡•1¥™”¹É•Ù…±¥‘…Ñ”€è5…Ñ ¹µ¥¸¡É•Ù…±¥‘…Ñ•M•½¹‘Ì°É•ÅÕ•ÍÑ…¡•1¥™”¹É•Ù…±¥‘…Ñ”¤ì(%¥˜€¡É•ÅÕ•ÍÑ…¡•1¥™”ü¹•áÁ¥É”€„ôôÙ½¥€À¤•áÁ¥É•M•½¹‘Ì€ôÉ•ÅÕ•ÍÑ…¡•1¥™”¹•áÁ¥É”ì(%¥˜€¡É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô¹Õ±°ñðÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ðô€Àñð€…9Õµ‰•È¹¥Í¥¹¥Ñ”¡É•Ù…±¥‘…Ñ•M•½¹‘Ì¤¤É•ÑÕÉ¸¹Õ±°ì(%É•ÑÕÉ¸ì($%•áÁ¥É•M•½¹‘Ì°($%É•Ù…±¥‘…Ñ•M•½¹‘Ì(%ôì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•…¡•‘I•ÍÁ½¹Í”¡…¡•‘Y…±Õ”°½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÍÑ…ÑÕÌ€ô½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•MÑ…ÑÕÌ€üü€¡…¡•‘Y…±Õ”¹ÍÑ…ÑÕÌñð€ÈÀÀ¤ì(%½¹ÍÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹…¡•½¹ÑÉ½°ü¹É•Ù…±¥‘…Ñ”€üü½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì(%½¹ÍÐ•áÁ¥É•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹…¡•½¹ÑÉ½°€ôôôÙ½¥€À€üÙ½¥€À€è½ÁÑ¥½¹Ì¹…¡•½¹ÑÉ½°¹•áÁ¥É”€üü½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ìì(%½¹ÍÐ…¡•½¹ÑÉ½°€ô‰Õ¥±‘ÁÁA…•…¡•½¹ÑÉ½°¡½ÁÑ¥½¹Ì¹…¡•MÑ…Ñ”°É•Ù…±¥‘…Ñ•M•½¹‘Ì°•áÁ¥É•M•½¹‘Ì¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ¤ì($%¥˜€ ……¡•‘Y…±Õ”¹ÉÍ…Ñ„¤É•ÑÕÉ¸¹Õ±°ì($%½¹ÍÐÉÍ!•…‘•ÉÌ€ô‰Õ¥±‘ÁÁA…•…¡•‘!•…‘•ÉÌ¡ì($$%…¡•½¹ÑÉ½°°($$%…¡•MÑ…Ñ”è½ÁÑ¥½¹Ì¹…¡•MÑ…Ñ”°($$%½¹Ñ•¹ÑQåÁ”è€‰Ñ•áÐ½àµ½µÁ½¹•¹Ðì¡…ÉÍ•ÐõÕÑ˜´àˆ°($$%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ°($$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È($%ô¤ì($%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡…¡•‘Y…±Õ”¹ÉÍ…Ñ„°ì($$%ÍÑ…ÑÕÌ°($$%¡•…‘•ÉÌèÉÍ!•…‘•ÉÌ($%ô¤ì(%ô(%¥˜€¡ÑåÁ•½˜…¡•‘Y…±Õ”¹¡Ñµ°€„ôô€‰ÍÑÉ¥¹œˆñð…¡•‘Y…±Õ”¹¡Ñµ°¹±•¹Ñ €ôôô€À¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ¡Ñµ±!•…‘•ÉÌ€ô‰Õ¥±‘ÁÁA…•…¡•‘!•…‘•ÉÌ¡ì($%…¡•½¹ÑÉ½°°($%…¡•MÑ…Ñ”è½ÁÑ¥½¹Ì¹…¡•MÑ…Ñ”°($%½¹Ñ•¹ÑQåÁ”è€‰Ñ•áÐ½¡Ñµ°ì¡…ÉÍ•ÐõÕÑ˜´àˆ°($%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ(%ô¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡…¡•‘Y…±Õ”¹¡Ñµ°°ì($%ÍÑ…ÑÕÌ°($%¡•…‘•ÉÌè¡Ñµ±!•…‘•ÉÌ(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•…‘ÁÁA…•…¡•I•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ¥ÍÉ-•ä€ô½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€ü½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”¤€è½ÁÑ¥½¹Ì¹¥ÍÉ!Ñµ±-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì(%ÑÉäì($%½¹ÍÐ…¡•€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹¥ÍÉ•Ð¡¥ÍÉ-•ä¤ì($%½¹ÍÐ…¡•‘Y…±Õ”€ô•Ñ…¡•‘ÁÁA…•Y…±Õ”¡…¡•¤ì($%¥˜€¡…¡•‘Y…±Õ”€˜˜€……¡•ü¹¥ÍMÑ…±”¤ì($$%½¹ÍÐ¡¥ÑI•ÍÁ½¹Í”€ô‰Õ¥±‘ÁÁA…•…¡•‘I•ÍÁ½¹Í”¡…¡•‘Y…±Õ”°ì($$$%…¡•MÑ…Ñ”è€‰!%Pˆ°($$$%…¡•½¹ÑÉ½°è…¡•ü¹Ù…±Õ”¹…¡•½¹ÑÉ½°°($$$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$$%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($$$%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ°($$$%µ¥‘‘±•Ý…É•MÑ…ÑÕÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•MÑ…ÑÕÌ°($$$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($$%ô¤ì($$%¥˜€¡¡¥ÑI•ÍÁ½¹Í”¤ì($$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€ü€‰!%P€¡IM¤ˆ€è€‰!%P€¡!Q50¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%É•ÑÕÉ¸¡¥ÑI•ÍÁ½¹Í”ì($$%ô($$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰5%ML€¡•µÁÑä…¡••¹ÑÉä¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($%ô($%¥˜€¡…¡•ü¹¥ÍMÑ…±”€˜˜…¡•‘Y…±Õ”¤ì($$%½¹ÍÐÉ••¹•É…Ñ¥½¹-•ä€ô½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€ü½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”¤€è½ÁÑ¥½¹Ì¹¥ÍÉ!Ñµ±-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$%½ÁÑ¥½¹Ì¹Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡É••¹•É…Ñ¥½¹-•ä°…Íå¹Œ€ ¤€ôøì($$$%½¹ÍÐÉ•Ù…±¥‘…Ñ•‘A…”€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉÉ•Í¡A…•½É…¡” ¤ì($$$%½¹ÍÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ôÉ•Ù…±¥‘…Ñ•‘A…”¹…¡•½¹ÑÉ½°ü¹É•Ù…±¥‘…Ñ”€üü½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì($$$%½¹ÍÐ•áÁ¥É•M•½¹‘Ì€ôÉ•Ù…±¥‘…Ñ•‘A…”¹…¡•½¹ÑÉ½°ü¹•áÁ¥É”€üü½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ìì($$$%½¹ÍÐÝÉ¥Ñ•Ì€ôm½ÁÑ¥½¹Ì¹¥ÍÉM•Ð¡½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”¤°‰Õ¥±‘ÁÁA…•…¡•Y…±Õ” ˆˆ°É•Ù…±¥‘…Ñ•‘A…”¹ÉÍ…Ñ„°€ÈÀÀ¤°É•Ù…±¥‘…Ñ•M•½¹‘Ì°É•Ù…±¥‘…Ñ•‘A…”¹Ñ…Ì°•áÁ¥É•M•½¹‘Ì¥tì($$$%¥˜€ …½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ¤ÝÉ¥Ñ•Ì¹ÁÕÍ ¡½ÁÑ¥½¹Ì¹¥ÍÉM•Ð¡½ÁÑ¥½¹Ì¹¥ÍÉ!Ñµ±-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤°‰Õ¥±‘ÁÁA…•…¡•Y…±Õ”¡É•Ù…±¥‘…Ñ•‘A…”¹¡Ñµ°°Ù½¥€À°€ÈÀÀ¤°É•Ù…±¥‘…Ñ•M•½¹‘Ì°É•Ù…±¥‘…Ñ•‘A…”¹Ñ…Ì°•áÁ¥É•M•½¹‘Ì¤¤ì($$$%…Ý…¥ÐAÉ½µ¥Í”¹…±°¡ÝÉ¥Ñ•Ì¤ì($$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰É••¸½µÁ±•Ñ”ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$%ô¤ì($$%½¹ÍÐÍÑ…±•I•ÍÁ½¹Í”€ô‰Õ¥±‘ÁÁA…•…¡•‘I•ÍÁ½¹Í”¡…¡•‘Y…±Õ”°ì($$$%…¡•MÑ…Ñ”è€‰MQ1ˆ°($$$%…¡•½¹ÑÉ½°è…¡•¹Ù…±Õ”¹…¡•½¹ÑÉ½°°($$$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$$%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($$$%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ°($$$%µ¥‘‘±•Ý…É•MÑ…ÑÕÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•MÑ…ÑÕÌ°($$$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($$%ô¤ì($$%¥˜€¡ÍÑ…±•I•ÍÁ½¹Í”¤ì($$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ€ü€‰MQ1€¡IM¤ˆ€è€‰MQ1€¡!Q50¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($$$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%É•ÑÕÉ¸ÍÑ…±•I•ÍÁ½¹Í”ì($$%ô($$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰MQ15%ML€¡•µÁÑäÍÑ…±”•¹ÑÉä¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì($%ô($%¥˜€ ……¡•¤½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰5%ML€¡¹¼…¡”•¹ÑÉä¤ˆ°½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì(%ô…Ñ €¡¥ÍÉI•…‘ÉÉ½È¤ì($%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑt%MH…¡”É•…•ÉÉ½Èèˆ°¥ÍÉI•…‘ÉÉ½È¤ì(%ô(%É•ÑÕÉ¸¹Õ±°ì)ô)™Õ¹Ñ¥½¸™¥¹…±¥é•ÁÁA…•!Ñµ±…¡•I•ÍÁ½¹Í”¡É•ÍÁ½¹Í”°½ÁÑ¥½¹Ì¤ì(%¥˜€ …É•ÍÁ½¹Í”¹‰½‘ä¤É•ÑÕÉ¸É•ÍÁ½¹Í”ì(%½¹ÍÐmÍÑÉ•…µ½É±¥•¹Ð°ÍÑÉ•…µ½É…¡•t€ôÉ•ÍÁ½¹Í”¹‰½‘ä¹Ñ•” ¤ì(%½¹ÍÐ¡Ñµ±-•ä€ô½ÁÑ¥½¹Ì¹¥ÍÉ!Ñµ±-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”¤ì(%½¹ÍÐÉÍ-•ä€ô½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°¹Õ±°¤ì(%½¹ÍÐ±¥•¹Ñ!•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹ÁÉ•Í•ÉÙ•±¥•¹ÑI•ÍÁ½¹Í•!•…‘•ÉÌ€„ôôÑÉÕ”¤ì($%±¥•¹Ñ!•…‘•ÉÌ¹Í•Ð ‰…¡”µ½¹ÑÉ½°ˆ°9=}MQ=I}!}=9QI=0¤ì($%±¥•¹Ñ!•…‘•ÉÌ¹Í•Ð¡Y%9aQ}!}!H°€‰5%MLˆ¤ì(%ô(%½¹ÍÐ…¡•AÉ½µ¥Í”€ô€¡…Íå¹Œ€ ¤€ôøì($%ÑÉäì($$%½¹ÍÐ…¡•‘!Ñµ°€ô…Ý…¥ÐÉ•…‘MÑÉ•…µÍQ•áÐ¡ÍÑÉ•…µ½É…¡”¤ì($$%¥˜€¡½ÁÑ¥½¹Ì¹…ÁÑÕÉ•‘å¹…µ¥UÍ…•	•™½É•½¹Ñ•áÑ±•…¹ÕÀü¸ ¤€ôôôÑÉÕ”ñð½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…” ¤¤ì($$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰!Q50…¡”ÝÉ¥Ñ”Í­¥ÁÁ•€¡‘å¹…µ¥ŒÕÍ…”‘ÕÉ¥¹œÉ•¹‘•È¤ˆ°¡Ñµ±-•ä¤ì($$$%É•ÑÕÉ¸ì($$%ô($$%½¹ÍÐ…¡•A½±¥ä€ôÉ•Í½±Ù•ÁÁA…•…¡•]É¥Ñ•A½±¥ä¡ì($$$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$$%É•ÅÕ•ÍÑ…¡•1¥™”è½ÁÑ¥½¹Ì¹•ÑI•ÅÕ•ÍÑ…¡•1¥™”ü¸ ¤°($$$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($$%ô¤ì($$%¥˜€ ……¡•A½±¥ä¤ì($$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰!Q50…¡”ÝÉ¥Ñ”Í­¥ÁÁ•€¡¹¼…¡”Á½±¥ä¤ˆ°¡Ñµ±-•ä¤ì($$$%É•ÑÕÉ¸ì($$%ô($$%½¹ÍÐÁ…•Q…Ì€ô½ÁÑ¥½¹Ì¹•ÑA…•Q…Ì ¤ì($$%½¹ÍÐÝÉ¥Ñ•Ì€ôm½ÁÑ¥½¹Ì¹¥ÍÉM•Ð¡¡Ñµ±-•ä°‰Õ¥±‘ÁÁA…•…¡•Y…±Õ”¡…¡•‘!Ñµ°°Ù½¥€À°€ÈÀÀ¤°…¡•A½±¥ä¹É•Ù…±¥‘…Ñ•M•½¹‘Ì°Á…•Q…Ì°…¡•A½±¥ä¹•áÁ¥É•M•½¹‘Ì¥tì($$%¥˜€¡½ÁÑ¥½¹Ì¹…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¤ÝÉ¥Ñ•Ì¹ÁÕÍ ¡½ÁÑ¥½¹Ì¹…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¹Ñ¡•¸ ¡ÉÍ…Ñ„¤€ôø½ÁÑ¥½¹Ì¹¥ÍÉM•Ð¡ÉÍ-•ä°‰Õ¥±‘ÁÁA…•…¡•Y…±Õ” ˆˆ°ÉÍ…Ñ„°€ÈÀÀ¤°…¡•A½±¥ä¹É•Ù…±¥‘…Ñ•M•½¹‘Ì°Á…•Q…Ì°…¡•A½±¥ä¹•áÁ¥É•M•½¹‘Ì¤¤¤ì($$%…Ý…¥ÐAÉ½µ¥Í”¹…±°¡ÝÉ¥Ñ•Ì¤ì($$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰!Q50…¡”ÝÉ¥ÑÑ•¸ˆ°¡Ñµ±-•ä¤ì($%ô…Ñ €¡…¡•ÉÉ½È¤ì($$%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑt%MH…¡”ÝÉ¥Ñ”•ÉÉ½Èèˆ°…¡•ÉÉ½È¤ì($%ô(%ô¤ ¤ì(%½ÁÑ¥½¹Ì¹Ý…¥ÑU¹Ñ¥°ü¸¡…¡•AÉ½µ¥Í”¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡ÍÑÉ•…µ½É±¥•¹Ð°ì($%ÍÑ…ÑÕÌèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÌ°($%ÍÑ…ÑÕÍQ•áÐèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÍQ•áÐ°($%¡•…‘•ÉÌè±¥•¹Ñ!•…‘•ÉÌ(%ô¤ì)ô)™Õ¹Ñ¥½¸™¥¹…±¥é•ÁÁA…•IÍ…¡•I•ÍÁ½¹Í”¡É•ÍÁ½¹Í”°½ÁÑ¥½¹Ì¤ì(%¥˜€ …Í¡•‘Õ±•ÁÁA…•IÍ…¡•]É¥Ñ”¡½ÁÑ¥½¹Ì¤¤É•ÑÕÉ¸É•ÍÁ½¹Í”ì(%¥˜€¡½ÁÑ¥½¹Ì¹ÁÉ•Í•ÉÙ•±¥•¹ÑI•ÍÁ½¹Í•!•…‘•ÉÌ€ôôôÑÉÕ”¤É•ÑÕÉ¸É•ÍÁ½¹Í”ì(%½¹ÍÐ±¥•¹Ñ!•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡É•ÍÁ½¹Í”¹¡•…‘•ÉÌ¤ì(%±¥•¹Ñ!•…‘•ÉÌ¹Í•Ð ‰…¡”µ½¹ÑÉ½°ˆ°9=}MQ=I}!}=9QI=0¤ì(%±¥•¹Ñ!•…‘•ÉÌ¹Í•Ð¡Y%9aQ}!}!H°€‰5%MLˆ¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”¹‰½‘ä°ì($%ÍÑ…ÑÕÌèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÌ°($%ÍÑ…ÑÕÍQ•áÐèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÍQ•áÐ°($%¡•…‘•ÉÌè±¥•¹Ñ!•…‘•ÉÌ(%ô¤ì)ô)™Õ¹Ñ¥½¸Í¡•‘Õ±•ÁÁA…•IÍ…¡•]É¥Ñ”¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐ…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”€ô½ÁÑ¥½¹Ì¹…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”ì(%¥˜€ ……ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”ñð½ÁÑ¥½¹Ì¹‘å¹…µ¥UÍ•‘ÕÉ¥¹	Õ¥±¤É•ÑÕÉ¸™…±Í”ì(%½¹ÍÐÉÍ-•ä€ô½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”¤ì(%½¹ÍÐ…¡•AÉ½µ¥Í”€ô€¡…Íå¹Œ€ ¤€ôøì($%ÑÉäì($$%½¹ÍÐÉÍ…Ñ„€ô…Ý…¥Ð…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”ì($$%¥˜€¡½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…” ¤¤ì($$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰IM…¡”ÝÉ¥Ñ”Í­¥ÁÁ•€¡‘å¹…µ¥ŒÕÍ…”‘ÕÉ¥¹œÉ•¹‘•È¤ˆ°ÉÍ-•ä¤ì($$$%É•ÑÕÉ¸ì($$%ô($$%½¹ÍÐ…¡•A½±¥ä€ôÉ•Í½±Ù•ÁÁA…•…¡•]É¥Ñ•A½±¥ä¡ì($$$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$$%É•ÅÕ•ÍÑ…¡•1¥™”è½ÁÑ¥½¹Ì¹•ÑI•ÅÕ•ÍÑ…¡•1¥™”ü¸ ¤°($$$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì($$%ô¤ì($$%¥˜€ ……¡•A½±¥ä¤ì($$$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰IM…¡”ÝÉ¥Ñ”Í­¥ÁÁ•€¡¹¼…¡”Á½±¥ä¤ˆ°ÉÍ-•ä¤ì($$$%É•ÑÕÉ¸ì($$%ô($$%…Ý…¥Ð½ÁÑ¥½¹Ì¹¥ÍÉM•Ð¡ÉÍ-•ä°‰Õ¥±‘ÁÁA…•…¡•Y…±Õ” ˆˆ°ÉÍ…Ñ„°€ÈÀÀ¤°…¡•A½±¥ä¹É•Ù…±¥‘…Ñ•M•½¹‘Ì°½ÁÑ¥½¹Ì¹•ÑA…•Q…Ì ¤°…¡•A½±¥ä¹•áÁ¥É•M•½¹‘Ì¤ì($$%½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœü¸ ‰IM…¡”ÝÉ¥ÑÑ•¸ˆ°ÉÍ-•ä¤ì($%ô…Ñ €¡…¡•ÉÉ½È¤ì($$%½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑt%MHIM…¡”ÝÉ¥Ñ”•ÉÉ½Èèˆ°…¡•ÉÉ½È¤ì($%ô(%ô¤ ¤ì(%½ÁÑ¥½¹Ì¹Ý…¥ÑU¹Ñ¥°ü¸¡…¡•AÉ½µ¥Í”¤ì(%É•ÑÕÉ¸ÑÉÕ”ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µµ•Ñ¡½¹©Ì)™Õ¹Ñ¥½¸¥Í9½¹•Ñ=É!•…¡µ•Ñ¡½¤ì(%½¹ÍÐ¹½Éµ…±¥é•‘5•Ñ¡½€ôµ•Ñ¡½¹Ñ½UÁÁ•É…Í” ¤ì(%É•ÑÕÉ¸¹½Éµ…±¥é•‘5•Ñ¡½€„ôô€‰Pˆ€˜˜¹½Éµ…±¥é•‘5•Ñ¡½€„ôô€‰!ˆì)ô)™Õ¹Ñ¥½¸¥ÍMÑ…Ñ¥=ÉMÍÁÁA…•…¹‘¥‘…Ñ”¡½ÁÑ¥½¹Ì¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µ‘å¹…µ¥Œˆñð½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô€À¤É•ÑÕÉ¸™…±Í”ì(%¥˜€¡½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µÍÑ…Ñ¥Œˆñð½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ€ôôô€‰•ÉÉ½Èˆ¤É•ÑÕÉ¸ÑÉÕ”ì(%¥˜€¡½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô¹Õ±°€˜˜½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ø€À¤É•ÑÕÉ¸ÑÉÕ”ì(%¥˜€¡½ÁÑ¥½¹Ì¹¡…Í•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¤É•ÑÕÉ¸ÑÉÕ”ì(%É•ÑÕÉ¸€…½ÁÑ¥½¹Ì¹¥Íå¹…µ¥I½ÕÑ”ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•5•Ñ¡½‘I•ÍÁ½¹Í”¡½ÁÑ¥½¹Ì¤ì(%¥˜€ …¥Í9½¹•Ñ=É!•…¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¹µ•Ñ¡½¤¤É•ÑÕÉ¸¹Õ±°ì(%¥˜€¡¥ÍA½ÍÍ¥‰±•ÁÁI½ÕÑ•Ñ¥½¹I•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¤¤É•ÑÕÉ¸¹Õ±°ì(%¥˜€ …¥ÍMÑ…Ñ¥=ÉMÍÁÁA…•…¹‘¥‘…Ñ”¡½ÁÑ¥½¹Ì¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ¡•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ ¤ì(%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¡•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•!•…‘•ÉÌ€üü¹Õ±°¤ì(%É•ÑÕÉ¸µ•Ñ¡½‘9½Ñ±±½Ý•‘I•ÍÁ½¹Í” ‰P°!ˆ°ì¡•…‘•ÉÌô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µÁÉ½‰”¹©Ì)…Íå¹Œ™Õ¹Ñ¥½¸ÁÉ½‰•ÁÁA…•	•™½É•I•¹‘•È¡½ÁÑ¥½¹Ì¤ì(%±•Ð±…å½ÕÑ±…Ì€ôíôì(%¥˜€¡½ÁÑ¥½¹Ì¹±…å½ÕÑ½Õ¹Ð€ø€À¤ì($%½¹ÍÐ±…å½ÕÑAÉ½‰•I•ÍÕ±Ð€ô…Ý…¥ÐÁÉ½‰•ÁÁA…•1…å½ÕÑÌ¡ì($$%±…å½ÕÑ½Õ¹Ðè½ÁÑ¥½¹Ì¹±…å½ÕÑ½Õ¹Ð°($$%…Íå¹Œ½¹1…å½ÕÑÉÉ½È¡±…å½ÕÑÉÉ½È°±…å½ÕÑ%¹‘•à¤ì($$$%½¹ÍÐÍÁ•¥…±ÉÉ½È€ô½ÁÑ¥½¹Ì¹É•Í½±Ù•MÁ•¥…±ÉÉ½È¡±…å½ÕÑÉÉ½È¤ì($$$%¥˜€ …ÍÁ•¥…±ÉÉ½È¤É•ÑÕÉ¸¹Õ±°ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•É1…å½ÕÑMÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì($$%ô°($$%ÁÉ½‰•1…å½ÕÑÐè½ÁÑ¥½¹Ì¹ÁÉ½‰•1…å½ÕÑÐ°($$%ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($$%ô°($$%±…ÍÍ¥™¥…Ñ¥½¸è½ÁÑ¥½¹Ì¹±…ÍÍ¥™¥…Ñ¥½¸($%ô¤ì($%±…å½ÕÑ±…Ì€ô±…å½ÕÑAÉ½‰•I•ÍÕ±Ð¹±…å½ÕÑ±…Ìì($%¥˜€¡±…å½ÕÑAÉ½‰•I•ÍÕ±Ð¹É•ÍÁ½¹Í”¤É•ÑÕÉ¸ì($$%É•ÍÁ½¹Í”è±…å½ÕÑAÉ½‰•I•ÍÕ±Ð¹É•ÍÁ½¹Í”°($$%±…å½ÕÑ±…Ì($%ôì(%ô(%¥˜€¡½ÁÑ¥½¹Ì¹¡…Í1½…‘¥¹	½Õ¹‘…Éä¤É•ÑÕÉ¸ì($%É•ÍÁ½¹Í”è¹Õ±°°($%±…å½ÕÑ±…Ì(%ôì(%É•ÑÕÉ¸ì($%É•ÍÁ½¹Í”è…Ý…¥ÐÁÉ½‰•ÁÁA…•½µÁ½¹•¹Ð¡ì($$%…Ý…¥ÑÍå¹I•ÍÕ±ÐèÑÉÕ”°($$%…Íå¹Œ½¹ÉÉ½È¡Á…•ÉÉ½È¤ì($$$%½¹ÍÐÍÁ•¥…±ÉÉ½È€ô½ÁÑ¥½¹Ì¹É•Í½±Ù•MÁ•¥…±ÉÉ½È¡Á…•ÉÉ½È¤ì($$$%¥˜€¡ÍÁ•¥…±ÉÉ½È¤É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤ì($$$%É•ÑÕÉ¸¹Õ±°ì($$%ô°($$%ÁÉ½‰•A…”è½ÁÑ¥½¹Ì¹ÁÉ½‰•A…”°($$%ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($$%ô($%ô¤°($%±…å½ÕÑ±…Ì(%ôì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µÉ•¹‘•È¹©Ì)™Õ¹Ñ¥½¸‰Õ¥±‘I•ÍÁ½¹Í•Q¥µ¥¹œ¡½ÁÑ¥½¹Ì¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸¤É•ÑÕÉ¸ì(%É•ÑÕÉ¸ì($%½µÁ¥±•¹è½ÁÑ¥½¹Ì¹½µÁ¥±•¹°($%¡…¹‘±•ÉMÑ…ÉÐè½ÁÑ¥½¹Ì¹¡…¹‘±•ÉMÑ…ÉÐ°($%É•¹‘•É¹è½ÁÑ¥½¹Ì¹É•¹‘•É¹°($%É•ÍÁ½¹Í•-¥¹è½ÁÑ¥½¹Ì¹É•ÍÁ½¹Í•-¥¹(%ôì)ô)™Õ¹Ñ¥½¸É•…‘I•ÅÕ•ÍÑ…¡•1¥™•½ÉAÉ•É•¹‘•È¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹Á••­I•ÅÕ•ÍÑ…¡•1¥™”ü¸ ¤€üü½ÁÑ¥½¹Ì¹•ÑI•ÅÕ•ÍÑ…¡•1¥™” ¤ì)ô)™Õ¹Ñ¥½¸…ÁÁ±åI•ÅÕ•ÍÑ…¡•1¥™”¡½ÁÑ¥½¹Ì¤ì(%±•ÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì(%±•Ð•áÁ¥É•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ìì(%½¹ÍÐÉ•ÅÕ•ÍÑ…¡•1¥™”€ô½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÑ…¡•1¥™”ì(%¥˜€¡É•ÅÕ•ÍÑ…¡•1¥™”ü¹É•Ù…±¥‘…Ñ”€„ôôÙ½¥€À¤É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô¹Õ±°€üÉ•ÅÕ•ÍÑ…¡•1¥™”¹É•Ù…±¥‘…Ñ”€è5…Ñ ¹µ¥¸¡É•Ù…±¥‘…Ñ•M•½¹‘Ì°É•ÅÕ•ÍÑ…¡•1¥™”¹É•Ù…±¥‘…Ñ”¤ì(%¥˜€¡É•ÅÕ•ÍÑ…¡•1¥™”ü¹•áÁ¥É”€„ôôÙ½¥€À¤•áÁ¥É•M•½¹‘Ì€ôÉ•ÅÕ•ÍÑ…¡•1¥™”¹•áÁ¥É”ì(%É•ÑÕÉ¸ì($%•áÁ¥É•M•½¹‘Ì°($%É•Ù…±¥‘…Ñ•M•½¹‘Ì(%ôì)ô)™Õ¹Ñ¥½¸É•…‘I½½Ñ	½Õ¹‘…Éå%¡•±•µ•¹Ð¤ì(%½¹ÍÐÉ½½Ñ1…å½ÕÑQÉ••A…Ñ €ô•±•µ•¹ÑmÁÁ±•µ•¹ÑÍ]¥É”¹­•åÌ¹É½½Ñ1…å½ÕÑtì(%É•ÑÕÉ¸ÑåÁ•½˜É½½Ñ1…å½ÕÑQÉ••A…Ñ €ôôô€‰ÍÑÉ¥¹œˆ€üÉ½½Ñ1…å½ÕÑQÉ••A…Ñ €è¹Õ±°ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁA…•ÉÑ¥™…Ñ½µÁ…Ñ¥‰¥±¥Ñä¡•±•µ•¹Ð°É½ÕÑ•A…ÑÑ•É¸¤ì(%¥˜€ …¥ÍÁÁ±•µ•¹ÑÍI•½É¡•±•µ•¹Ð¤¤É•ÑÕÉ¸ì(%½¹ÍÐÉ½½Ñ	½Õ¹‘…Éå%€ôÉ•…‘I½½Ñ	½Õ¹‘…Éå%¡•±•µ•¹Ð¤ì(%É•ÑÕÉ¸É•…Ñ•ÉÑ¥™…Ñ½µÁ…Ñ¥‰¥±¥Ñå¹Ù•±½Á”¡ì($%É…Á¡Y•ÉÍ¥½¸èÉ•…Ñ•ÉÑ¥™…Ñ½µÁ…Ñ¥‰¥±¥ÑåÉ…Á¡Y•ÉÍ¥½¸¡ì($$%É½ÕÑ•A…ÑÑ•É¸°($$%É½½Ñ	½Õ¹‘…Éå%($%ô¤°($%‘•Á±½åµ•¹ÑY•ÉÍ¥½¸è€ˆÙˆá‰á˜À´ÍÍ˜´Ñ„Å„´àÐÕ„µ‘‰‰Œå•‘™‘…ˆÐˆ°($%É½½Ñ	½Õ¹‘…Éå%(%ô¤ì)ô(¼¨¨(¨]É…ÁÌ…¸IMÉ•ÍÁ½¹Í”‰½‘äÑ¼É•Á½ÉÐ¥¹Ù…±¥‘å¹…µ¥ŒÕÍ…”•ÉÉ½ÉÌ…™Ñ•ÈÑ¡”(¨ÍÑÉ•…´¥Ì™Õ±±ä½¹ÍÕµ•¸%¸‘•Øµ½‘”°•ÉÉ½ÉÌ™É½´½½­¥•Ì ¤½¡•…‘•ÉÌ ¤¥¹Í¥‘”(¨€‰ÕÍ”…¡”ˆµ…ä‰”…Õ¡Ð‰äÕÍ•ÈÑÉä½…Ñ …¹Í¥±•¹Ñ±äÍÝ…±±½Ý•ƒŠPÑ¡¥Ì(¨ÝÉ…ÁÁ•ÈÝ…¥ÑÌ™½ÈÑ¡”ÍÑÉ•…´Ñ¼‘É…¥¸…¹ÍÕÉ™…•Ì…¹äÉ•½É‘••ÉÉ½ÈÑ¼Ñ¡”(¨Ñ•Éµ¥¹…°€¡…¹°Ù¥„!5H°Ñ¡”‰É½ÝÍ•È‘•Ø½Ù•É±…ä¤¸(¨A½ÉÑ•™É½´9•áÐ¹©Ìè¡ÑÑÁÌè¼½¥Ñ¡Õˆ¹½´½Ù•É•°½¹•áÐ¹©Ì½½µµ¥Ð½˜Õ”ÔÑŒÀØÜÈÙˆÔÜÅ„ÀÐÉ™”ØÜÐÄÝ”ÐÁ„Èå˜ÙˆàØàä(¨¼)™Õ¹Ñ¥½¸ÝÉ…ÁIÍI•ÍÁ½¹Í•½É•ÙÉÉ½ÉI•Á½ÉÑ¥¹œ¡É•ÍÁ½¹Í”°½¹ÍÕµ•%¹Ù…±¥‘å¹…µ¥UÍ…•ÉÉ½È¤ì(%½¹ÍÐ½É¥¥¹…±	½‘ä€ôÉ•ÍÁ½¹Í”¹‰½‘äì(%¥˜€ …½É¥¥¹…±	½‘ä¤É•ÑÕÉ¸É•ÍÁ½¹Í”ì(%±•Ð½¹ÍÕµ•€ô™…±Í”ì(%½¹ÍÐ½¹½¹ÍÕµ•€ô€ ¤€ôøì($%¥˜€¡½¹ÍÕµ•¤É•ÑÕÉ¸ì($%½¹ÍÕµ•€ôÑÉÕ”ì($%½¹ÍÐ•ÉÉ½È€ô½¹ÍÕµ•%¹Ù…±¥‘å¹…µ¥UÍ…•ÉÉ½È ¤ì($%¥˜€¡•ÉÉ½È¤½¹Í½±”¹•ÉÉ½È ‰mÙ¥¹•áÑt%¹Ù…±¥‘å¹…µ¥ŒÕÍ…”èˆ°•ÉÉ½È¤ì(%ôì(%½¹ÍÐ±•…¹ÕÀ€ô¹•ÜQÉ…¹Í™½ÉµMÑÉ•…´¡ì™±ÕÍ  ¤ì($%½¹½¹ÍÕµ• ¤ì(%ôô¤ì(%½¹ÍÐÉ•…‘•È€ô½É¥¥¹…±	½‘ä¹Á¥Á•Q¡É½Õ ¡±•…¹ÕÀ¤¹•ÑI•…‘•È ¤ì(%½¹ÍÐÝÉ…ÁÁ•‘MÑÉ•…´€ô¹•ÜI•…‘…‰±•MÑÉ•…´¡ì($%ÁÕ±°¡½¹ÑÉ½±±•È¤ì($$%É•ÑÕÉ¸É•…‘•È¹É•… ¤¹Ñ¡•¸ ¡ì‘½¹”°Ù…±Õ”ô¤€ôøì($$$%¥˜€¡‘½¹”¤½¹ÑÉ½±±•È¹±½Í” ¤ì($$$%•±Í”½¹ÑÉ½±±•È¹•¹ÅÕ•Õ”¡Ù…±Õ”¤ì($$%ô°€¡ÍÑÉ•…µÉÉ½È¤€ôøì($$$%½¹½¹ÍÕµ• ¤ì($$$%½¹ÑÉ½±±•È¹•ÉÉ½È¡ÍÑÉ•…µÉÉ½È¤ì($$%ô¤ì($%ô°($%…¹•°¡É•…Í½¸¤ì($$%½¹½¹ÍÕµ• ¤ì($$%É•ÑÕÉ¸É•…‘•È¹…¹•°¡É•…Í½¸¤ì($%ô(%ô¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡ÝÉ…ÁÁ•‘MÑÉ•…´°ì($%ÍÑ…ÑÕÌèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÌ°($%ÍÑ…ÑÕÍQ•áÐèÉ•ÍÁ½¹Í”¹ÍÑ…ÑÕÍQ•áÐ°($%¡•…‘•ÉÌèÉ•ÍÁ½¹Í”¹¡•…‘•ÉÌ(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉÁÁA…•1¥™•å±”¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÁÉ•I•¹‘•ÉI•ÍÕ±Ð€ô…Ý…¥ÐÁÉ½‰•ÁÁA…•	•™½É•I•¹‘•È¡ì($%¡…Í1½…‘¥¹	½Õ¹‘…Éäè½ÁÑ¥½¹Ì¹¡…Í1½…‘¥¹	½Õ¹‘…Éä°($%±…å½ÕÑ½Õ¹Ðè½ÁÑ¥½¹Ì¹±…å½ÕÑ½Õ¹Ð°($%ÁÉ½‰•1…å½ÕÑÐ¡±…å½ÕÑ%¹‘•à¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÁÉ½‰•1…å½ÕÑÐ¡±…å½ÕÑ%¹‘•à¤ì($%ô°($%ÁÉ½‰•A…” ¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÁÉ½‰•A…” ¤ì($%ô°($%É•¹‘•É1…å½ÕÑMÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•É1…å½ÕÑMÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì($%ô°($%É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤ì($%ô°($%É•Í½±Ù•MÁ•¥…±ÉÉ½ÈèÉ•Í½±Ù•ÁÁA…•MÁ•¥…±ÉÉ½È°($%ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($%ô°($%±…ÍÍ¥™¥…Ñ¥½¸è½ÁÑ¥½¹Ì¹±…ÍÍ¥™¥…Ñ¥½¸(%ô¤ì(%¥˜€¡ÁÉ•I•¹‘•ÉI•ÍÕ±Ð¹É•ÍÁ½¹Í”¤É•ÑÕÉ¸ÁÉ•I•¹‘•ÉI•ÍÕ±Ð¹É•ÍÁ½¹Í”ì(%½¹ÍÐ±…å½ÕÑ±…Ì€ôÁÉ•I•¹‘•ÉI•ÍÕ±Ð¹±…å½ÕÑ±…Ìì(%½¹ÍÐ…ÉÑ¥™…Ñ½µÁ…Ñ¥‰¥±¥Ñä€ôÉ•…Ñ•ÁÁA…•ÉÑ¥™…Ñ½µÁ…Ñ¥‰¥±¥Ñä¡½ÁÑ¥½¹Ì¹•±•µ•¹Ð°½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸¤ì(%½¹ÍÐ½ÕÑ½¥¹±•µ•¹Ð€ôÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•=ÕÑ½¥¹A…å±½…¡ì($%•±•µ•¹Ðè½ÁÑ¥½¹Ì¹•±•µ•¹Ð°($%±…å½ÕÑ±…Ì°($$¸¸¹…ÉÑ¥™…Ñ½µÁ…Ñ¥‰¥±¥Ñä€üì…ÉÑ¥™…Ñ½µÁ…Ñ¥‰¥±¥Ñäô€èíô(%ô¤ì(%½¹ÍÐ½µÁ¥±•¹€ô½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€üÙ½¥€À€èÁ•É™½Éµ…¹”¹¹½Ü ¤ì(%½¹ÍÐÉÍÉÉ½ÉQÉ…­•È€ôÉ•…Ñ•ÁÁA…•IÍÉÉ½ÉQÉ…­•È¡½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸¤¤ì(%½¹ÍÐÉÍMÑÉ•…´€ôÉÕ¹]¥Ñ¡•Ñ¡•‘ÕÁ”  ¤€ôø½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´¡½ÕÑ½¥¹±•µ•¹Ð°ì½¹ÉÉ½ÈèÉÍÉÉ½ÉQÉ…­•È¹½¹I•¹‘•ÉÉÉ½Èô¤¤ì(%±•ÐÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì(%±•Ð•áÁ¥É•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ìì(%½¹ÍÐÍ¡½Õ±‘…ÁÑÕÉ•IÍ½É…¡•5•Ñ…‘…Ñ„€ô½ÁÑ¥½¹Ì¹¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È€„ôôÑÉÕ”€˜˜€¡½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸ñð½ÁÑ¥½¹Ì¹¥ÍAÉ•É•¹‘•È€ôôôÑÉÕ”¤€˜˜€¡É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô¹Õ±°ñðÉ•Ù…±¥‘…Ñ•M•½¹‘Ì€ø€À€˜˜É•Ù…±¥‘…Ñ•M•½¹‘Ì€„ôô%¹™¥¹¥Ñä¤€˜˜€…½ÁÑ¥½¹Ì¹¥ÍÉ…™Ñ5½‘”€˜˜€…½ÁÑ¥½¹Ì¹¥Í½É•å¹…µ¥Œì(%½¹ÍÐÉÍ…ÁÑÕÉ”€ôÑ••ÁÁA…•IÍMÑÉ•…µ½É…ÁÑÕÉ”¡ÉÍMÑÉ•…´°Í¡½Õ±‘…ÁÑÕÉ•IÍ½É…¡•5•Ñ…‘…Ñ„¤ì(%½¹ÍÐÉÍ½ÉI•ÍÁ½¹Í”€ôÉÍ…ÁÑÕÉ”¹ÍÍÉMÑÉ•…´ì(%½¹ÍÐ…ÁÑÕÉ•‘IÍ…Ñ…I•˜€ôìÙ…±Õ”è¹Õ±°ôì(%¥˜€¡ÉÍ…ÁÑÕÉ”¹Í¥‘•MÑÉ•…´€˜˜½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ¤…ÁÑÕÉ•‘IÍ…Ñ…I•˜¹Ù…±Õ”€ôÉ•…‘ÁÁA…•	¥¹…ÉåMÑÉ•…´¡ÉÍ…ÁÑÕÉ”¹Í¥‘•MÑÉ•…´¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ¤ì($%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍAÉ•É•¹‘•È€ôôôÑÉÕ”¤ì($$%…Ý…¥ÐÍ•ÑÑ±•…ÁÑÕÉ•‘IÍI•¹‘•É½É…¡•5•Ñ…‘…Ñ„¡…ÁÑÕÉ•‘IÍ…Ñ…I•˜¹Ù…±Õ”¤ì($$$¡í•áÁ¥É•M•½¹‘Ì°É•Ù…±¥‘…Ñ•M•½¹‘Íô€ô…ÁÁ±åI•ÅÕ•ÍÑ…¡•1¥™”¡ì($$$%•áÁ¥É•M•½¹‘Ì°($$$%É•ÅÕ•ÍÑ…¡•1¥™”èÉ•…‘I•ÅÕ•ÍÑ…¡•1¥™•½ÉAÉ•É•¹‘•È¡½ÁÑ¥½¹Ì¤°($$$%É•Ù…±¥‘…Ñ•M•½¹‘Ì($$%ô¤¤ì($%ô($%½¹ÍÐ‘å¹…µ¥UÍ•‘ÕÉ¥¹	Õ¥±€ô½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…” ¤ì($%½¹ÍÐÉÍI•ÍÁ½¹Í•A½±¥ä€ôÉ•Í½±Ù•ÁÁA…•IÍI•ÍÁ½¹Í•A½±¥ä¡ì($$%‘å¹…µ¥UÍ•‘ÕÉ¥¹	Õ¥±°($$%¥ÍÉ…™Ñ5½‘”è½ÁÑ¥½¹Ì¹¥ÍÉ…™Ñ5½‘”°($$%¥Íå¹…µ¥ÉÉ½Èè½ÁÑ¥½¹Ì¹¥Íå¹…µ¥ÉÉ½È°($$%¥Í½É•å¹…µ¥Œè½ÁÑ¥½¹Ì¹¥Í½É•å¹…µ¥Œ°($$%¥Í½É•MÑ…Ñ¥Œè½ÁÑ¥½¹Ì¹¥Í½É•MÑ…Ñ¥Œ°($$%¥ÍAÉ½‘ÕÑ¥½¸è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸°($$%•áÁ¥É•M•½¹‘Ì°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ì($%ô¤ì($%½¹ÍÐÉÍI•ÍÁ½¹Í”€ô‰Õ¥±‘ÁÁA…•IÍI•ÍÁ½¹Í”¡ÉÍ½ÉI•ÍÁ½¹Í”°ì($$%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ°($$%Á½±¥äèÉÍI•ÍÁ½¹Í•A½±¥ä°($$%Ñ¥µ¥¹œè‰Õ¥±‘I•ÍÁ½¹Í•Q¥µ¥¹œ¡ì($$$%½µÁ¥±•¹°($$$%¡…¹‘±•ÉMÑ…ÉÐè½ÁÑ¥½¹Ì¹¡…¹‘±•ÉMÑ…ÉÐ°($$$%¥ÍAÉ½‘ÕÑ¥½¸è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸°($$$%É•ÍÁ½¹Í•-¥¹è€‰ÉÍŒˆ($$%ô¤($%ô¤ì($%É•ÑÕÉ¸™¥¹…±¥é•ÁÁA…•IÍ…¡•I•ÍÁ½¹Í” …½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€˜˜ÉÍI•ÍÁ½¹Í”¹‰½‘ä€˜˜½ÁÑ¥½¹Ì¹½¹ÍÕµ•%¹Ù…±¥‘å¹…µ¥UÍ…•ÉÉ½È€üÝÉ…ÁIÍI•ÍÁ½¹Í•½É•ÙÉÉ½ÉI•Á½ÉÑ¥¹œ¡ÉÍI•ÍÁ½¹Í”°½ÁÑ¥½¹Ì¹½¹ÍÕµ•%¹Ù…±¥‘å¹…µ¥UÍ…•ÉÉ½È¤€èÉÍI•ÍÁ½¹Í”°ì($$%…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€˜˜Í¡½Õ±‘…ÁÑÕÉ•IÍ½É…¡•5•Ñ…‘…Ñ„€ü…ÁÑÕÉ•‘IÍ…Ñ…I•˜¹Ù…±Õ”€è¹Õ±°°($$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%½¹ÍÕµ•å¹…µ¥UÍ…”è½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…”°($$%‘å¹…µ¥UÍ•‘ÕÉ¥¹	Õ¥±°($$%•ÑA…•Q…Ì ¤ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹•ÑA…•Q…Ì ¤ì($$%ô°($$%•ÑI•ÅÕ•ÍÑ…¡•1¥™” ¤ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹•ÑI•ÅÕ•ÍÑ…¡•1¥™” ¤ì($$%ô°($$%¥ÍÉ•‰Õœè½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœ°($$%¥ÍÉIÍ-•äè½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä°($$%¥ÍÉM•Ðè½ÁÑ¥½¹Ì¹¥ÍÉM•Ð°($$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$%É•¹‘•É5½‘”è½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”°($$%ÁÉ•Í•ÉÙ•±¥•¹ÑI•ÍÁ½¹Í•!•…‘•ÉÌèÉÍI•ÍÁ½¹Í•A½±¥ä¹…¡•MÑ…Ñ”€„ôô€‰5%MLˆ°($$%•áÁ¥É•M•½¹‘Ì°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ì°($$%Ý…¥ÑU¹Ñ¥°¡ÁÉ½µ¥Í”¤ì($$$%½ÁÑ¥½¹Ì¹Ý…¥ÑU¹Ñ¥°ü¸¡ÁÉ½µ¥Í”¤ì($$%ô($%ô¤ì(%ô(%½¹ÍÐ™½¹Ñ…Ñ„€ôÉ•…Ñ•ÁÁA…•½¹Ñ…Ñ„¡ì($%•Ñ1¥¹­Ìè½ÁÑ¥½¹Ì¹•Ñ½¹Ñ1¥¹­Ì°($%•ÑAÉ•±½…‘Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑAÉ•±½…‘Ì°($%•ÑMÑå±•Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑMÑå±•Ì(%ô¤ì(%½¹ÍÐ™½¹Ñ1¥¹­!•…‘•È€ô‰Õ¥±‘ÁÁA…•½¹Ñ1¥¹­!•…‘•È¡™½¹Ñ…Ñ„¹ÁÉ•±½…‘Ì¤ì(%±•ÐÉ•¹‘•É¹ì(%½¹ÍÐ¡Ñµ±I•¹‘•È€ô…Ý…¥ÐÉ•¹‘•ÉÁÁA…•!Ñµ±MÑÉ•…µ]¥Ñ¡I•½Ù•Éä¡ì($%½¹M¡•±±I•¹‘•É• ¤ì($$%¥˜€ …½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸¤É•¹‘•É¹€ôÁ•É™½Éµ…¹”¹¹½Ü ¤ì($%ô°($%É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”¡•ÉÉ½È¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”¡•ÉÉ½È¤ì($%ô°($%…Íå¹ŒÉ•¹‘•É!Ñµ±MÑÉ•…´ ¤ì($$%½¹ÍÐÍÍÉ!…¹‘±•È€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹±½…‘MÍÉ!…¹‘±•È ¤ì($$%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•!Ñµ±MÑÉ•…´¡ì($$$%…ÁÑÕÉ•‘IÍ…Ñ…I•˜°($$$%™½¹Ñ…Ñ„°($$$%¹…Ù¥…Ñ¥½¹½¹Ñ•áÐè½ÁÑ¥½¹Ì¹•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ ¤°($$$%™½ÉµMÑ…Ñ”è½ÁÑ¥½¹Ì¹™½ÉµMÑ…Ñ”€üü¹Õ±°°($$$%ÉÍMÑÉ•…´èÉÍ½ÉI•ÍÁ½¹Í”°($$$%ÍÉ¥ÁÑ9½¹”è½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”°($$$%Í¥‘•MÑÉ•…´èÉÍ…ÁÑÕÉ”¹Í¥‘•MÑÉ•…´°($$$%ÍÍÉ!…¹‘±•È°($$$%Ý…¥Ñ½É±±I•…‘äè½ÁÑ¥½¹Ì¹¥ÍAÉ•É•¹‘•È($$%ô¤ì($%ô°($%É•¹‘•ÉMÁ•¥…±ÉÉ½ÉI•ÍÁ½¹Í”¡ÍÁ•¥…±ÉÉ½È¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤ì($%ô°($%É•Í½±Ù•MÁ•¥…±ÉÉ½ÈèÉ•Í½±Ù•ÁÁA…•MÁ•¥…±ÉÉ½È(%ô¤ì(%¥˜€¡¡Ñµ±I•¹‘•È¹É•ÍÁ½¹Í”¤É•ÑÕÉ¸¡Ñµ±I•¹‘•È¹É•ÍÁ½¹Í”ì(%½¹ÍÐ¡Ñµ±MÑÉ•…´€ô¡Ñµ±I•¹‘•È¹¡Ñµ±MÑÉ•…´ì(%¥˜€ …¡Ñµ±MÑÉ•…´¤Ñ¡É½Ü¹•ÜÉÉ½È ‰mÙ¥¹•áÑtáÁ•Ñ•…¸!Q50ÍÑÉ•…´Ý¡•¸¹¼™…±±‰…¬É•ÍÁ½¹Í”Ý…ÌÉ•ÑÕÉ¹•ˆ¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹¡…Í1½…‘¥¹	½Õ¹‘…Éä¤ì($%½¹ÍÐ…ÁÑÕÉ•€ôÉÍÉÉ½ÉQÉ…­•È¹•Ñ…ÁÑÕÉ•‘MÁ•¥…±ÉÉ½È ¤ì($%¥˜€¡…ÁÑÕÉ•¤ì($$%½¹ÍÐÍÁ•¥…±ÉÉ½È€ôÉ•Í½±Ù•ÁÁA…•MÁ•¥…±ÉÉ½È¡…ÁÑÕÉ•¤ì($$%¥˜€¡ÍÁ•¥…±ÉÉ½È¤ì($$$%¡Ñµ±MÑÉ•…´¹…¹•° ¤¹…Ñ   ¤€ôøíô¤ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤ì($$%ô($%ô(%ô(%¥˜€¡Í¡½Õ±‘I•É•¹‘•ÉÁÁA…•]¥Ñ¡±½‰…±ÉÉ½È¡ì($%…ÁÑÕÉ•‘ÉÉ½ÈèÉÍÉÉ½ÉQÉ…­•È¹•Ñ…ÁÑÕÉ•‘ÉÉ½È ¤°($%¡…Í1½…±	½Õ¹‘…Éäè½ÁÑ¥½¹Ì¹É½ÕÑ•!…Í1½…±	½Õ¹‘…Éä(%ô¤¤ì($%½¹ÍÐ±•…¹I•ÍÁ½¹Í”€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”¡ÉÍÉÉ½ÉQÉ…­•È¹•Ñ…ÁÑÕÉ•‘ÉÉ½È ¤¤ì($%¥˜€¡±•…¹I•ÍÁ½¹Í”¤É•ÑÕÉ¸±•…¹I•ÍÁ½¹Í”ì(%ô(%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍAÉ•É•¹‘•È€ôôôÑÉÕ”¤ì($%…Ý…¥ÐÍ•ÑÑ±•…ÁÑÕÉ•‘IÍI•¹‘•É½É…¡•5•Ñ…‘…Ñ„¡…ÁÑÕÉ•‘IÍ…Ñ…I•˜¹Ù…±Õ”¤ì($$¡í•áÁ¥É•M•½¹‘Ì°É•Ù…±¥‘…Ñ•M•½¹‘Íô€ô…ÁÁ±åI•ÅÕ•ÍÑ…¡•1¥™”¡ì($$%•áÁ¥É•M•½¹‘Ì°($$%É•ÅÕ•ÍÑ…¡•1¥™”èÉ•…‘I•ÅÕ•ÍÑ…¡•1¥™•½ÉAÉ•É•¹‘•È¡½ÁÑ¥½¹Ì¤°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ì($%ô¤¤ì(%ô(%½¹ÍÐ‘É…™Ñ½½­¥”€ô½ÁÑ¥½¹Ì¹•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È ¤ì(%½¹ÍÐ‘å¹…µ¥UÍ•‘ÕÉ¥¹I•¹‘•È€ô½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…” ¤ì(%±•Ð‘å¹…µ¥UÍ•‘	•™½É•½¹Ñ•áÑ±•…¹ÕÀ€ô‘å¹…µ¥UÍ•‘ÕÉ¥¹I•¹‘•Èì(%½¹ÍÐÍ…™•!Ñµ±MÑÉ•…´€ô‘•™•ÉU¹Ñ¥±MÑÉ•…µ½¹ÍÕµ•¡¡Ñµ±MÑÉ•…´°€ ¤€ôøì($%‘å¹…µ¥UÍ•‘	•™½É•½¹Ñ•áÑ±•…¹ÕÀ€ô‘å¹…µ¥UÍ•‘	•™½É•½¹Ñ•áÑ±•…¹ÕÀñð½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…” ¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%ô¤ì(%½¹ÍÐ¡Ñµ±I•ÍÁ½¹Í•A½±¥ä€ôÉ•Í½±Ù•ÁÁA…•!Ñµ±I•ÍÁ½¹Í•A½±¥ä¡ì($%‘å¹…µ¥UÍ•‘ÕÉ¥¹I•¹‘•È°($%¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•Èè½ÁÑ¥½¹Ì¹¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È€ôôôÑÉÕ”°($%¡…ÍMÉ¥ÁÑ9½¹”è	½½±•…¸¡½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”¤°($%¥ÍÉ…™Ñ5½‘”è½ÁÑ¥½¹Ì¹¥ÍÉ…™Ñ5½‘”°($%¥Íå¹…µ¥ÉÉ½Èè½ÁÑ¥½¹Ì¹¥Íå¹…µ¥ÉÉ½È°($%¥Í½É•å¹…µ¥Œè½ÁÑ¥½¹Ì¹¥Í½É•å¹…µ¥Œ°($%¥Í½É•MÑ…Ñ¥Œè½ÁÑ¥½¹Ì¹¥Í½É•MÑ…Ñ¥Œ°($%¥ÍAÉ½‘ÕÑ¥½¸è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸°($%•áÁ¥É•M•½¹‘Ì°($%É•Ù…±¥‘…Ñ•M•½¹‘Ì(%ô¤ì(%½¹ÍÐ¡Ñµ±I•ÍÁ½¹Í•Q¥µ¥¹œ€ô‰Õ¥±‘I•ÍÁ½¹Í•Q¥µ¥¹œ¡ì($%½µÁ¥±•¹°($%¡…¹‘±•ÉMÑ…ÉÐè½ÁÑ¥½¹Ì¹¡…¹‘±•ÉMÑ…ÉÐ°($%¥ÍAÉ½‘ÕÑ¥½¸è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸°($%É•¹‘•É¹°($%É•ÍÁ½¹Í•-¥¹è€‰¡Ñµ°ˆ(%ô¤ì(%½¹ÍÐÍ¡½Õ±‘MÁ•Õ±…Ñ¥Ù•±å]É¥Ñ•…¡”€ô½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€˜˜Í¡½Õ±‘…ÁÑÕÉ•IÍ½É…¡•5•Ñ…‘…Ñ„€˜˜É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô¹Õ±°€˜˜€…½ÁÑ¥½¹Ì¹¥Íå¹…µ¥ÉÉ½È€˜˜€…½ÁÑ¥½¹Ì¹¥Í½É•MÑ…Ñ¥Œ€˜˜€…½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”€˜˜½ÁÑ¥½¹Ì¹¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È€„ôôÑÉÕ”€˜˜€…‘å¹…µ¥UÍ•‘ÕÉ¥¹I•¹‘•Èì(%¥˜€¡¡Ñµ±I•ÍÁ½¹Í•A½±¥ä¹Í¡½Õ±‘]É¥Ñ•Q½…¡”ñðÍ¡½Õ±‘MÁ•Õ±…Ñ¥Ù•±å]É¥Ñ•…¡”¤ì($%½¹ÍÐ¥ÍÉI•ÍÁ½¹Í”€ô‰Õ¥±‘ÁÁA…•!Ñµ±I•ÍÁ½¹Í”¡Í…™•!Ñµ±MÑÉ•…´°ì($$%‘É…™Ñ½½­¥”°($$%™½¹Ñ1¥¹­!•…‘•È°($$%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($$%Á½±¥äè¡Ñµ±I•ÍÁ½¹Í•A½±¥ä°($$%Ñ¥µ¥¹œè¡Ñµ±I•ÍÁ½¹Í•Q¥µ¥¹œ($%ô¤ì($%¥˜€¡½ÁÑ¥½¹Ì¹¥ÍAÉ•É•¹‘•È€ôôôÑÉÕ”¤É•ÑÕÉ¸¥ÍÉI•ÍÁ½¹Í”ì($%É•ÑÕÉ¸™¥¹…±¥é•ÁÁA…•!Ñµ±…¡•I•ÍÁ½¹Í”¡¥ÍÉI•ÍÁ½¹Í”°ì($$%…ÁÑÕÉ•‘å¹…µ¥UÍ…•	•™½É•½¹Ñ•áÑ±•…¹ÕÀ ¤ì($$$%É•ÑÕÉ¸‘å¹…µ¥UÍ•‘	•™½É•½¹Ñ•áÑ±•…¹ÕÀì($$%ô°($$%…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”è…ÁÑÕÉ•‘IÍ…Ñ…I•˜¹Ù…±Õ”°($$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%½¹ÍÕµ•å¹…µ¥UÍ…”è½ÁÑ¥½¹Ì¹½¹ÍÕµ•å¹…µ¥UÍ…”°($$%•ÑA…•Q…Ì ¤ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹•ÑA…•Q…Ì ¤ì($$%ô°($$%•ÑI•ÅÕ•ÍÑ…¡•1¥™” ¤ì($$$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹•ÑI•ÅÕ•ÍÑ…¡•1¥™” ¤ì($$%ô°($$%¥ÍÉ•‰Õœè½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœ°($$%¥ÍÉ!Ñµ±-•äè½ÁÑ¥½¹Ì¹¥ÍÉ!Ñµ±-•ä°($$%¥ÍÉIÍ-•äè½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä°($$%¥ÍÉM•Ðè½ÁÑ¥½¹Ì¹¥ÍÉM•Ð°($$%ÁÉ•Í•ÉÙ•±¥•¹ÑI•ÍÁ½¹Í•!•…‘•ÉÌè€…¡Ñµ±I•ÍÁ½¹Í•A½±¥ä¹Í¡½Õ±‘]É¥Ñ•Q½…¡”°($$%•áÁ¥É•M•½¹‘Ì°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ì°($$%Ý…¥ÑU¹Ñ¥°¡…¡•AÉ½µ¥Í”¤ì($$$%½ÁÑ¥½¹Ì¹Ý…¥ÑU¹Ñ¥°ü¸¡…¡•AÉ½µ¥Í”¤ì($$%ô($%ô¤ì(%ô(%É•ÑÕÉ¸‰Õ¥±‘ÁÁA…•!Ñµ±I•ÍÁ½¹Í”¡Í…™•!Ñµ±MÑÉ•…´°ì($%‘É…™Ñ½½­¥”°($%™½¹Ñ1¥¹­!•…‘•È°($%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($%Á½±¥äè¡Ñµ±I•ÍÁ½¹Í•A½±¥ä°($%Ñ¥µ¥¹œè¡Ñµ±I•ÍÁ½¹Í•Q¥µ¥¹œ(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸Í•ÑÑ±•…ÁÑÕÉ•‘IÍI•¹‘•É½É…¡•5•Ñ…‘…Ñ„¡…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¤ì(%¥˜€ ……ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¤É•ÑÕÉ¸ì(%ÑÉäì($%…Ý…¥Ð…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”ì(%ô…Ñ íô)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÁ…”µ‘¥ÍÁ…Ñ ¹©Ì)™Õ¹Ñ¥½¸Í¡½Õ±‘I•…‘ÁÁA…•…¡”¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸€˜˜€…½ÁÑ¥½¹Ì¹¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È€˜˜€…½ÁÑ¥½¹Ì¹¥ÍÉ…™Ñ5½‘”€˜˜€…½ÁÑ¥½¹Ì¹¥Í½É•å¹…µ¥Œ€˜˜€¡½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐñð€…½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”¤€˜˜€¡½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôôô¹Õ±°ñð½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ø€À¤ì)ô)™Õ¹Ñ¥½¸‰Õ¥±‘ÁÁA…•Q…Ì¡±•…¹A…Ñ¡¹…µ”°•áÑÉ…Q…Ì°É½ÕÑ•M•µ•¹ÑÌ¤ì(%É•ÑÕÉ¸‰Õ¥±‘A…•…¡•Q…Ì¡±•…¹A…Ñ¡¹…µ”°•áÑÉ…Q…Ì°l¸¸¹É½ÕÑ•M•µ•¹ÑÍt°€‰Á…”ˆ¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸ÉÕ¹ÁÁA…•I•Ù…±¥‘…Ñ¥½¹½¹Ñ•áÐ¡½ÁÑ¥½¹Ì°É•¹‘•É¸¤ì(%É•ÑÕÉ¸ÉÕ¹]¥Ñ¡I•ÅÕ•ÍÑ½¹Ñ•áÐ¡É•…Ñ•I•ÅÕ•ÍÑ½¹Ñ•áÐ¡ì($%¡•…‘•ÉÍ½¹Ñ•áÐèÉ•…Ñ•MÑ…Ñ¥•¹•É…Ñ¥½¹!•…‘•ÉÍ½¹Ñ•áÐ¡ì($$%‘å¹…µ¥½¹™¥œè½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œ°($$%É½ÕÑ•-¥¹è€‰Á…”ˆ°($$%É½ÕÑ•A…ÑÑ•É¸è½ÁÑ¥½¹Ì¹É½ÕÑ•A…ÑÑ•É¸($%ô¤°($%ÕÉÉ•¹Ñ•Ñ¡…¡•5½‘”è½ÁÑ¥½¹Ì¹ÕÉÉ•¹Ñ•Ñ¡…¡•5½‘”€üü¹Õ±°°($%•á•ÕÑ¥½¹½¹Ñ•áÐè•ÑI•ÅÕ•ÍÑá•ÕÑ¥½¹½¹Ñ•áÐ ¤°($%Õ¹ÍÑ…‰±•…¡•I•Ù…±¥‘…Ñ¥½¸è€‰™½É•É½Õ¹ˆ(%ô¤°…Íå¹Œ€ ¤€ôøì($%•¹ÍÕÉ••Ñ¡A…Ñ  ¤ì($%Í•ÑÕÉÉ•¹Ñ•Ñ¡M½™ÑQ…Ì¡‰Õ¥±‘ÁÁA…•Q…Ì¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°mt°½ÁÑ¥½¹Ì¹É½ÕÑ•M•µ•¹ÑÌ¤¤ì($%½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡ì($$%Á…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%Í•…É¡A…É…µÌè¹•ÜUI1M•…É¡A…É…µÌ ¤°($$%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ($%ô¤ì($%É•ÑÕÉ¸…Ý…¥ÐÉÕ¹]¥Ñ¡•Ñ¡•‘ÕÁ”¡É•¹‘•É¸¤ì(%ô¤ì)ô)™Õ¹Ñ¥½¸•Ñ…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¡…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¤ì(%¥˜€ ……ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¤Ñ¡É½Ü¹•ÜÉÉ½È ‰mÙ¥¹•áÑtáÁ•Ñ•…ÁÑÕÉ•IM‘…Ñ„Ý¡¥±”É••¹•É…Ñ¥¹œ…¸…ÁÀÁ…”…¡”•¹ÑÉäˆ¤ì(%É•ÑÕÉ¸…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”ì)ô)™Õ¹Ñ¥½¸Ñ½%¹Ñ•É•ÁÑ=ÁÑ¥½¹Ì¡¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°¥¹Ñ•É•ÁÐ¤ì(%É•ÑÕÉ¸ì($%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°($%¥¹Ñ•É•ÁÑ1…å½ÕÑÌè¥¹Ñ•É•ÁÐ¹¥¹Ñ•É•ÁÑ1…å½ÕÑÌ°($%¥¹Ñ•É•ÁÑA…”è¥¹Ñ•É•ÁÐ¹Á…”°($%¥¹Ñ•É•ÁÑA…É…µÌè¥¹Ñ•É•ÁÐ¹µ…Ñ¡•‘A…É…µÌ°($%¥¹Ñ•É•ÁÑM±½Ñ-•äè¥¹Ñ•É•ÁÐ¹Í±½Ñ-•ä(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸‘¥ÍÁ…Ñ¡ÁÁA…”¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸…Ý…¥ÐÉÕ¹]¥Ñ¡•Ñ¡•‘ÕÁ”  ¤€ôø‘¥ÍÁ…Ñ¡ÁÁA…•%¹¹•È¡½ÁÑ¥½¹Ì¤¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸‘¥ÍÁ…Ñ¡ÁÁA…•%¹¹•È¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÉ½ÕÑ”€ô½ÁÑ¥½¹Ì¹É½ÕÑ”ì(%½¹ÍÐ‘å¹…µ¥½¹™¥œ€ô½ÁÑ¥½¹Ì¹‘å¹…µ¥½¹™¥œì(%½¹ÍÐÕÉÉ•¹ÑI•Ù…±¥‘…Ñ•M•½¹‘Ì€ô½ÁÑ¥½¹Ì¹É•Ù…±¥‘…Ñ•M•½¹‘Ìì(%½¹ÍÐ¥Í½É•MÑ…Ñ¥Œ€ô‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µÍÑ…Ñ¥Œˆì(%½¹ÍÐ¥Íå¹…µ¥ÉÉ½È€ô‘å¹…µ¥½¹™¥œ€ôôô€‰•ÉÉ½Èˆì(%½¹ÍÐ¥Í½É•å¹…µ¥Œ€ô‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µ‘å¹…µ¥Œˆì(%½¹ÍÐ¥ÍÉ…™Ñ5½‘”€ô¥ÍÉ…™Ñ5½‘•I•ÅÕ•ÍÐ¡½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ¤ì(%Í•ÑÕÉÉ•¹Ñ•Ñ¡M½™ÑQ…Ì¡‰Õ¥±‘ÁÁA…•Q…Ì¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°mt°É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤¤ì(%Í•ÑÕÉÉ•¹Ñ•Ñ¡…¡•5½‘”¡½ÁÑ¥½¹Ì¹™•Ñ¡…¡”€üü¹Õ±°¤ì(%¥˜€¡½ÁÑ¥½¹Ì¹¡…ÍA…•5½‘Õ±”€˜˜€…½ÁÑ¥½¹Ì¹¡…ÍA…••™…Õ±ÑáÁ½ÉÐ¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í” ‰A…”¡…Ì¹¼‘•™…Õ±Ð•áÁ½ÉÐˆ°ìÍÑ…ÑÕÌè€ÔÀÀô¤ì(%ô(%½¹ÍÐµ•Ñ¡½‘I•ÍÁ½¹Í”€ôÉ•Í½±Ù•ÁÁA…•5•Ñ¡½‘I•ÍÁ½¹Í”¡ì($%‘å¹…µ¥½¹™¥œ°($%¡…Í•¹•É…Ñ•MÑ…Ñ¥A…É…µÌè½ÁÑ¥½¹Ì¹¡…Í•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ°($%¥Íå¹…µ¥I½ÕÑ”èÉ½ÕÑ”¹¥Íå¹…µ¥Œ°($%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ°($%É•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°($%É•Ù…±¥‘…Ñ•M•½¹‘ÌèÕÉÉ•¹ÑI•Ù…±¥‘…Ñ•M•½¹‘Ì(%ô¤ì(%¥˜€¡µ•Ñ¡½‘I•ÍÁ½¹Í”¤ì($%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸µ•Ñ¡½‘I•ÍÁ½¹Í”ì(%ô(%¥˜€ ¡¥Í½É•MÑ…Ñ¥Œñð¥Íå¹…µ¥ÉÉ½È¤€˜˜€…¥ÍÉ…™Ñ5½‘”¤ì($%Í•Ñ!•…‘•ÉÍ½¹Ñ•áÐ¡É•…Ñ•MÑ…Ñ¥•¹•É…Ñ¥½¹!•…‘•ÉÍ½¹Ñ•áÐ¡ì($$%‘å¹…µ¥½¹™¥œ°($$%É½ÕÑ•-¥¹è€‰Á…”ˆ°($$%É½ÕÑ•A…ÑÑ•É¸èÉ½ÕÑ”¹Á…ÑÑ•É¸($%ô¤¤ì($%½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡ì($$%Á…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%Í•…É¡A…É…µÌè¹•ÜUI1M•…É¡A…É…µÌ ¤°($$%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ($%ô¤ì(%ô(%¥˜€¡Í¡½Õ±‘I•…‘ÁÁA…•…¡”¡ì($%¥ÍÉ…™Ñ5½‘”°($%¥Í½É•å¹…µ¥Œ°($%¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•Èè½ÁÑ¥½¹Ì¹¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È€ôôôÑÉÕ”°($%¥ÍAÉ½‘ÕÑ¥½¸è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%É•Ù…±¥‘…Ñ•M•½¹‘ÌèÕÉÉ•¹ÑI•Ù…±¥‘…Ñ•M•½¹‘Ì°($%ÍÉ¥ÁÑ9½¹”è½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”(%ô¤¤ì($%½¹ÍÐ…¡•‘A…•I•ÍÁ½¹Í”€ô…Ý…¥ÐÉ•…‘ÁÁA…•…¡•I•ÍÁ½¹Í”¡ì($$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($$%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($$%¥ÍÉ•‰Õœè½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœ°($$%¥ÍÉ•Ðè½ÁÑ¥½¹Ì¹¥ÍÉ•Ð°($$%¥ÍÉ!Ñµ±-•äè½ÁÑ¥½¹Ì¹¥ÍÉ!Ñµ±-•ä°($$%¥ÍÉIÍ-•äè½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä°($$%¥ÍÉM•Ðè½ÁÑ¥½¹Ì¹¥ÍÉM•Ð°($$%µ¥‘‘±•Ý…É•!•…‘•ÉÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ°($$%µ¥‘‘±•Ý…É•MÑ…ÑÕÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹ÍÑ…ÑÕÌ°($$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$%É•¹‘•É5½‘”è½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”°($$%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($$%É•Ù…±¥‘…Ñ•M•½¹‘ÌèÕÉÉ•¹ÑI•Ù…±¥‘…Ñ•M•½¹‘Ì€üü€À°($$%É•¹‘•ÉÉ•Í¡A…•½É…¡”è…Íå¹Œ€ ¤€ôøÉÕ¹ÁÁA…•I•Ù…±¥‘…Ñ¥½¹½¹Ñ•áÐ¡ì($$$%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($$$%ÕÉÉ•¹Ñ•Ñ¡…¡•5½‘”è½ÁÑ¥½¹Ì¹™•Ñ¡…¡”€üü¹Õ±°°($$$%‘å¹…µ¥½¹™¥œ°($$$%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ°($$$%É½ÕÑ•A…ÑÑ•É¸èÉ½ÕÑ”¹Á…ÑÑ•É¸°($$$%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ°($$$%Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐè½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ($$%ô°…Íå¹Œ€ ¤€ôøì($$$%½¹ÍÐÉ•Ù…±¥‘…Ñ•‘±•µ•¹Ð€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•±•µ•¹Ð¡É½ÕÑ”°½ÁÑ¥½¹Ì¹Á…É…µÌ°Ù½¥€À°¹•ÜUI1M•…É¡A…É…µÌ ¤¤ì($$$%½¹ÍÐÉ•Ù…±¥‘…Ñ•‘=¹ÉÉ½È€ô½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°É½ÕÑ”¹Á…ÑÑ•É¸¤ì($$$%½¹ÍÐÉ•Ù…±¥‘…Ñ•‘IÍ…ÁÑÕÉ”€ôÑ••ÁÁA…•IÍMÑÉ•…µ½É…ÁÑÕÉ”¡½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´¡É•Ù…±¥‘…Ñ•‘±•µ•¹Ð°ì½¹ÉÉ½ÈèÉ•Ù…±¥‘…Ñ•‘=¹ÉÉ½Èô¤°ÑÉÕ”¤ì($$$%½¹ÍÐÉ•Ù…±¥‘…Ñ•‘MÍÉ¹ÑÉä€ô…Ý…¥Ð½ÁÑ¥½¹Ì¹±½…‘MÍÉ!…¹‘±•È ¤ì($$$%½¹ÍÐÉ•Ù…±¥‘…Ñ•‘…ÁÑÕÉ•‘IÍI•˜€ôìÙ…±Õ”è¹Õ±°ôì($$$%½¹ÍÐ¡Ñµ°€ô…Ý…¥ÐÉ•…‘MÑÉ•…µÍQ•áÐ¡…Ý…¥ÐÉ•Ù…±¥‘…Ñ•‘MÍÉ¹ÑÉä¹¡…¹‘±•MÍÈ¡É•Ù…±¥‘…Ñ•‘IÍ…ÁÑÕÉ”¹ÍÍÉMÑÉ•…´°½ÁÑ¥½¹Ì¹•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ ¤°ì($$$$%±¥¹­Ìè½ÁÑ¥½¹Ì¹•Ñ½¹Ñ1¥¹­Ì ¤°($$$$%ÍÑå±•Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑMÑå±•Ì ¤°($$$$%ÁÉ•±½…‘Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑAÉ•±½…‘Ì ¤($$$%ô°É•Ù…±¥‘…Ñ•‘IÍ…ÁÑÕÉ”¹Í¥‘•MÑÉ•…´€üì($$$$%Í¥‘•MÑÉ•…´èÉ•Ù…±¥‘…Ñ•‘IÍ…ÁÑÕÉ”¹Í¥‘•MÑÉ•…´°($$$$%…ÁÑÕÉ•‘IÍ…Ñ…I•˜èÉ•Ù…±¥‘…Ñ•‘…ÁÑÕÉ•‘IÍI•˜($$$%ô€èÙ½¥€À¤¤ì($$$%½¹ÍÐÉÍ…Ñ„€ô…Ý…¥Ð•Ñ…ÁÑÕÉ•‘IÍ…Ñ…AÉ½µ¥Í”¡É•Ù…±¥‘…Ñ•‘…ÁÑÕÉ•‘IÍI•˜¹Ù…±Õ”¤ì($$$%½¹ÍÐ…¡•1¥™”€ô}½¹ÍÕµ•I•ÅÕ•ÍÑM½Á•‘…¡•1¥™” ¤ì($$$%½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%É•ÑÕÉ¸ì($$$$%¡Ñµ°°($$$$%ÉÍ…Ñ„°($$$$%Ñ…Ìè‰Õ¥±‘ÁÁA…•Q…Ì¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°•Ñ½±±•Ñ•‘•Ñ¡Q…Ì ¤°É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤°($$$$%…¡•½¹ÑÉ½°èÑåÁ•½˜…¡•1¥™”ü¹É•Ù…±¥‘…Ñ”€ôôô€‰¹Õµ‰•Èˆ€üì($$$$$%É•Ù…±¥‘…Ñ”è…¡•1¥™”¹É•Ù…±¥‘…Ñ”°($$$$$%•áÁ¥É”è…¡•1¥™”¹•áÁ¥É”($$$$%ô€èÙ½¥€À($$$%ôì($$%ô¤°($$%Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡­•ä°É•¹‘•É¸¤ì($$$%½ÁÑ¥½¹Ì¹Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡­•ä°É•¹‘•É¸°ì($$$$%É½ÕÑ•É-¥¹è€‰ÁÀI½ÕÑ•Èˆ°($$$$%É½ÕÑ•A…Ñ èÉ½ÕÑ”¹Á…ÑÑ•É¸°($$$$%É½ÕÑ•QåÁ”è€‰É•¹‘•Èˆ($$$%ô¤ì($$%ô($%ô¤ì($%¥˜€¡…¡•‘A…•I•ÍÁ½¹Í”¤É•ÑÕÉ¸…¡•‘A…•I•ÍÁ½¹Í”ì(%ô(%½¹ÍÐ‘å¹…µ¥A…É…µÍI•ÍÁ½¹Í”€ô…Ý…¥ÐÙ…±¥‘…Ñ•ÁÁA…•å¹…µ¥A…É…µÌ¡ì($%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($%•¹™½É•MÑ…Ñ¥A…É…µÍ=¹±äè½ÁÑ¥½¹Ì¹‘å¹…µ¥A…É…µÍ½¹™¥œ€ôôô™…±Í”°($%•¹•É…Ñ•MÑ…Ñ¥A…É…µÌè½ÁÑ¥½¹Ì¹•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ°($%¥Íå¹…µ¥I½ÕÑ”èÉ½ÕÑ”¹¥Íå¹…µ¥Œ°($%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ(%ô¤ì(%¥˜€¡‘å¹…µ¥A…É…µÍI•ÍÁ½¹Í”¤É•ÑÕÉ¸‘å¹…µ¥A…É…µÍI•ÍÁ½¹Í”ì(%½¹ÍÐ¥¹Ñ•É•ÁÑI•ÍÕ±Ð€ô…Ý…¥ÐÉ•Í½±Ù•ÁÁA…•%¹Ñ•É•ÁÐ¡ì($%‰Õ¥±‘A…•±•µ•¹Ð¡¥¹Ñ•É•ÁÑI½ÕÑ”°¥¹Ñ•É•ÁÑA…É…µÌ°¥¹Ñ•É•ÁÑ=ÁÑÌ°¥¹Ñ•É•ÁÑM•…É¡A…É…µÌ¤ì($$%Í•ÑÕÉÉ•¹Ñ•Ñ¡…¡•5½‘”¡½ÁÑ¥½¹Ì¹É•Í½±Ù•I½ÕÑ••Ñ¡…¡•5½‘”ü¸¡¥¹Ñ•É•ÁÑI½ÕÑ”¤€üü¹Õ±°¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•±•µ•¹Ð¡¥¹Ñ•É•ÁÑI½ÕÑ”°¥¹Ñ•É•ÁÑA…É…µÌ°¥¹Ñ•É•ÁÑ=ÁÑÌ°¥¹Ñ•É•ÁÑM•…É¡A…É…µÌ¤ì($%ô°($%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($%ÕÉÉ•¹ÑI½ÕÑ”èÉ½ÕÑ”°($%™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ”¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ”¤ì($%ô°($%•ÑI½ÕÑ•A…É…µ9…µ•Ì¡Í½ÕÉ•I½ÕÑ”¤ì($$%É•ÑÕÉ¸Í½ÕÉ•I½ÕÑ”¹Á…É…µÌì($%ô°($%•ÑM½ÕÉ•I½ÕÑ”¡Í½ÕÉ•I½ÕÑ•%¹‘•à¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹•ÑM½ÕÉ•I½ÕÑ”¡Í½ÕÉ•I½ÕÑ•%¹‘•à¤ì($%ô°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%É•¹‘•É%¹Ñ•É•ÁÑI•ÍÁ½¹Í”¡Í½ÕÉ•I½ÕÑ”°¥¹Ñ•É•ÁÑ±•µ•¹Ð¤ì($$%½¹ÍÐ¥¹Ñ•É•ÁÑ=¹ÉÉ½È€ô½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°Í½ÕÉ•I½ÕÑ”¹Á…ÑÑ•É¸¤ì($$%½¹ÍÐ¥¹Ñ•É•ÁÑMÑÉ•…´€ô½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´¡¥¹Ñ•É•ÁÑ±•µ•¹Ð°ì½¹ÉÉ½Èè¥¹Ñ•É•ÁÑ=¹ÉÉ½Èô¤ì($$%½¹ÍÐ¥¹Ñ•É•ÁÑ!•…‘•ÉÌ€ô¹•Ü!•…‘•ÉÌ¡ì($$$$‰½¹Ñ•¹ÐµQåÁ”ˆè€‰Ñ•áÐ½àµ½µÁ½¹•¹Ðì¡…ÉÍ•ÐõÕÑ˜´àˆ°($$$%Y…ÉäèY%9aQ}IM}YIe}!H($$%ô¤ì($$%µ•É•5¥‘‘±•Ý…É•I•ÍÁ½¹Í•!•…‘•ÉÌ¡¥¹Ñ•É•ÁÑ!•…‘•ÉÌ°½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ¤ì($$%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡¥¹Ñ•É•ÁÑMÑÉ•…´°ì($$$%ÍÑ…ÑÕÌè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ¹ÍÑ…ÑÕÌ€üü€ÈÀÀ°($$$%¡•…‘•ÉÌè¥¹Ñ•É•ÁÑ!•…‘•ÉÌ($$%ô¤ì($%ô°($%Í•…É¡A…É…µÌè½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ°($%Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐè½ÁÑ¥½¹Ì¹Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°($%Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ¡¥¹Ñ•É•ÁÐ¤ì($$%É•ÑÕÉ¸Ñ½%¹Ñ•É•ÁÑ=ÁÑ¥½¹Ì¡½ÁÑ¥½¹Ì¹¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°¥¹Ñ•É•ÁÐ¤ì($%ô(%ô¤ì(%¥˜€¡¥¹Ñ•É•ÁÑI•ÍÕ±Ð¹É•ÍÁ½¹Í”¤É•ÑÕÉ¸¥¹Ñ•É•ÁÑI•ÍÕ±Ð¹É•ÍÁ½¹Í”ì(%½¹ÍÐÁ…•	Õ¥±‘I•ÍÕ±Ð€ô…Ý…¥Ð‰Õ¥±‘ÁÁA…•±•µ•¹Ð¡ì($%‰Õ¥±‘A…•±•µ•¹Ð ¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹‰Õ¥±‘A…•±•µ•¹Ð¡É½ÕÑ”°½ÁÑ¥½¹Ì¹Á…É…µÌ°¥¹Ñ•É•ÁÑI•ÍÕ±Ð¹¥¹Ñ•É•ÁÑ=ÁÑÌ°½ÁÑ¥½¹Ì¹Í•…É¡A…É…µÌ¤ì($%ô°($%É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåA…”¡‰Õ¥±‘ÉÉ½È¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåA…”¡‰Õ¥±‘ÉÉ½È¤ì($%ô°($%É•¹‘•ÉMÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤ì($$%É•ÑÕÉ¸É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡½ÁÑ¥½¹Ì°ÍÁ•¥…±ÉÉ½È¤ì($%ô°($%É•Í½±Ù•MÁ•¥…±ÉÉ½ÈèÉ•Í½±Ù•ÁÁA…•MÁ•¥…±ÉÉ½È(%ô¤ì(%¥˜€¡Á…•	Õ¥±‘I•ÍÕ±Ð¹É•ÍÁ½¹Í”¤É•ÑÕÉ¸Á…•	Õ¥±‘I•ÍÕ±Ð¹É•ÍÁ½¹Í”ì(%É•ÑÕÉ¸É•¹‘•ÉÁÁA…•1¥™•å±”¡ì($%±•…¹A…Ñ¡¹…µ”è½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°($%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($%½¹ÍÕµ•å¹…µ¥UÍ…”°($%½¹ÍÕµ•%¹Ù…±¥‘å¹…µ¥UÍ…•ÉÉ½È°($%É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($%ô°($%•±•µ•¹ÐèÁ…•	Õ¥±‘I•ÍÕ±Ð¹•±•µ•¹Ð°($%•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È°($%•Ñ½¹Ñ1¥¹­Ìè½ÁÑ¥½¹Ì¹•Ñ½¹Ñ1¥¹­Ì°($%•Ñ½¹ÑAÉ•±½…‘Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑAÉ•±½…‘Ì°($%•Ñ½¹ÑMÑå±•Ìè½ÁÑ¥½¹Ì¹•Ñ½¹ÑMÑå±•Ì°($%•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐè½ÁÑ¥½¹Ì¹•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°($%•ÑA…•Q…Ì ¤ì($$%É•ÑÕÉ¸‰Õ¥±‘ÁÁA…•Q…Ì¡½ÁÑ¥½¹Ì¹±•…¹A…Ñ¡¹…µ”°•Ñ½±±•Ñ•‘•Ñ¡Q…Ì ¤°É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ¤ì($%ô°($%•ÑI•ÅÕ•ÍÑ…¡•1¥™” ¤ì($$%É•ÑÕÉ¸}½¹ÍÕµ•I•ÅÕ•ÍÑM½Á•‘…¡•1¥™” ¤ì($%ô°($%Á••­I•ÅÕ•ÍÑ…¡•1¥™” ¤ì($$%É•ÑÕÉ¸}Á••­I•ÅÕ•ÍÑM½Á•‘…¡•1¥™” ¤ì($%ô°($%¡…¹‘±•ÉMÑ…ÉÐè½ÁÑ¥½¹Ì¹¡…¹‘±•ÉMÑ…ÉÐ°($%¡…Í1½…‘¥¹	½Õ¹‘…ÉäèÍ¡½Õ±‘MÕÁÁÉ•ÍÍ1½…‘¥¹	½Õ¹‘…É¥•Ì¡½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”€üü€‰¹…Ù¥…Ñ¥½¸ˆ¤€ü™…±Í”€è	½½±•…¸¡É½ÕÑ”¹±½…‘¥¹œü¹‘•™…Õ±Ð¤°($%™½ÉµMÑ…Ñ”è½ÁÑ¥½¹Ì¹™½ÉµMÑ…Ñ”€üü¹Õ±°°($%¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•Èè½ÁÑ¥½¹Ì¹¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È€ôôôÑÉÕ”°($%¥Íå¹…µ¥ÉÉ½È°($%¥ÍÉ…™Ñ5½‘”°($%¥Í½É•å¹…µ¥Œ°($%¥Í½É•MÑ…Ñ¥Œ°($%¥ÍAÉ•É•¹‘•ÈèÁÉ½•ÍÌ¹•¹Ø¹Y%9aQ}AII9H€ôôô€ˆÄˆ°($%¥ÍAÉ½‘ÕÑ¥½¸è½ÁÑ¥½¹Ì¹¥ÍAÉ½‘ÕÑ¥½¸°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%¥ÍÉ•‰Õœè½ÁÑ¥½¹Ì¹¥ÍÉ•‰Õœ°($%¥ÍÉ!Ñµ±-•äè½ÁÑ¥½¹Ì¹¥ÍÉ!Ñµ±-•ä°($%¥ÍÉIÍ-•äè½ÁÑ¥½¹Ì¹¥ÍÉIÍ-•ä°($%¥ÍÉM•Ðè½ÁÑ¥½¹Ì¹¥ÍÉM•Ð°($%•áÁ¥É•M•½¹‘Ìè½ÁÑ¥½¹Ì¹•áÁ¥É•M•½¹‘Ì°($%±…å½ÕÑ½Õ¹ÐèÉ½ÕÑ”¹±…å½ÕÑÌ¹±•¹Ñ °($%±½…‘MÍÉ!…¹‘±•Èè½ÁÑ¥½¹Ì¹±½…‘MÍÉ!…¹‘±•È°($%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($%Á…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ°($%ÁÉ½‰•1…å½ÕÑÐ¡±…å½ÕÑ%¹‘•à¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÁÉ½‰•1…å½ÕÑÐ¡±…å½ÕÑ%¹‘•à¤ì($%ô°($%ÁÉ½‰•A…” ¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÁÉ½‰•A…” ¤ì($%ô°($%±…ÍÍ¥™¥…Ñ¥½¸èì($$%•Ñ1…å½ÕÑ%¡¥¹‘•à¤ì($$$%½¹ÍÐÑÉ••A½Í¥Ñ¥½¸€ôÉ½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹m¥¹‘•át€üü€Àì($$$%É•ÑÕÉ¸ÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•1…å½ÕÑ%¡É•…Ñ•ÁÁA…•QÉ••A…Ñ ¡l¸¸¹É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÍt°ÑÉ••A½Í¥Ñ¥½¸¤¤ì($$%ô°($$%‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹ÌèÉ½ÕÑ”¹}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ì°($$%‰Õ¥±‘Q¥µ•I•…Í½¹ÌèÉ½ÕÑ”¹}}‰Õ¥±‘Q¥µ•I•…Í½¹Ì°($$%‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸è½ÁÑ¥½¹Ì¹‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸°($$%…Íå¹ŒÉÕ¹]¥Ñ¡%Í½±…Ñ•‘å¹…µ¥M½Á”¡™¸¤ì($$$%½¹ÍÐÁÉ¥½Éå¹…µ¥Œ€ô½¹ÍÕµ•å¹…µ¥UÍ…” ¤ì($$$%ÑÉäì($$$$%É•ÑÕÉ¸ì($$$$$%É•ÍÕ±Ðè…Ý…¥Ð™¸ ¤°($$$$$%‘å¹…µ¥•Ñ•Ñ•è½¹ÍÕµ•å¹…µ¥UÍ…” ¤($$$$%ôì($$$%ô™¥¹…±±äì($$$$%½¹ÍÕµ•å¹…µ¥UÍ…” ¤ì($$$$%¥˜€¡ÁÉ¥½Éå¹…µ¥Œ¤µ…É­å¹…µ¥UÍ…” ¤ì($$$%ô($$%ô($%ô°($%É•Ù…±¥‘…Ñ•M•½¹‘ÌèÕÉÉ•¹ÑI•Ù…±¥‘…Ñ•M•½¹‘Ì°($%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè½ÁÑ¥½¹Ì¹µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($%É•¹‘•É5½‘”è½ÁÑ¥½¹Ì¹É•¹‘•É5½‘”€üü€‰¹…Ù¥…Ñ¥½¸ˆ°($%É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåI•ÍÁ½¹Í”¡É•¹‘•ÉÉÉ½È¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåA…”¡É•¹‘•ÉÉÉ½È¤ì($%ô°($%É•¹‘•É1…å½ÕÑMÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì($$%É•ÑÕÉ¸É•¹‘•É1…å½ÕÑMÁ•¥…±ÉÉ½È¡½ÁÑ¥½¹Ì°ÍÁ•¥…±ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì($%ô°($%É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡ÍÁ•¥…±ÉÉ½È¤ì($$%É•ÑÕÉ¸É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡½ÁÑ¥½¹Ì°ÍÁ•¥…±ÉÉ½È¤ì($%ô°($%É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´è½ÁÑ¥½¹Ì¹É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´°($%É½ÕÑ•!…Í1½…±	½Õ¹‘…Éäè	½½±•…¸¡É½ÕÑ”¹•ÉÉ½Èü¹‘•™…Õ±ÐñðÉ½ÕÑ”¹•ÉÉ½ÉÌü¹Í½µ” ¡•ÉÉ½É5½‘Õ±”¤€ôø•ÉÉ½É5½‘Õ±”ü¹‘•™…Õ±Ð¤¤°($%É½ÕÑ•A…ÑÑ•É¸èÉ½ÕÑ”¹Á…ÑÑ•É¸°($%ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($%ô°($%ÍÉ¥ÁÑ9½¹”è½ÁÑ¥½¹Ì¹ÍÉ¥ÁÑ9½¹”°($%Ý…¥ÑU¹Ñ¥°¡…¡•AÉ½µ¥Í”¤ì($$%•ÑI•ÅÕ•ÍÑá•ÕÑ¥½¹½¹Ñ•áÐ ¤ü¹Ý…¥ÑU¹Ñ¥°¡…¡•AÉ½µ¥Í”¤ì($%ô(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•É1…å½ÕÑMÁ•¥…±ÉÉ½È¡½ÁÑ¥½¹Ì°ÍÁ•¥…±ÉÉ½È°±…å½ÕÑ%¹‘•à¤ì(%É•ÑÕÉ¸‰Õ¥±‘ÁÁA…•MÁ•¥…±ÉÉ½ÉI•ÍÁ½¹Í”¡ì($%‰…Í•A…Ñ è½ÁÑ¥½¹Ì¹‰…Í•A…Ñ °($%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($%É•¹‘•É…±±‰…­A…”¡ÍÑ…ÑÕÍ½‘”¤ì($$%½¹ÍÐÁ…É•¹Ñ	½Õ¹‘…Éä€ôÉ•Í½±Ù•ÁÁA…•A…É•¹Ñ!ÑÑÁ•ÍÍ	½Õ¹‘…Éå5½‘Õ±”¡ì($$$%±…å½ÕÑ%¹‘•à°($$$%É½½Ñ½É‰¥‘‘•¹5½‘Õ±”è½ÁÑ¥½¹Ì¹É½½Ñ½É‰¥‘‘•¹5½‘Õ±”°($$$%É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”è½ÁÑ¥½¹Ì¹É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”°($$$%É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”è½ÁÑ¥½¹Ì¹É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”°($$$%É½ÕÑ•½É‰¥‘‘•¹5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”¹™½É‰¥‘‘•¹Ì°($$$%É½ÕÑ•9½Ñ½Õ¹‘5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”¹¹½Ñ½Õ¹‘Ì°($$$%É½ÕÑ•U¹…ÕÑ¡½É¥é•‘5½‘Õ±•Ìè½ÁÑ¥½¹Ì¹É½ÕÑ”¹Õ¹…ÕÑ¡½É¥é•‘Ì°($$$%ÍÑ…ÑÕÍ½‘”($$%ô¤ü¹‘•™…Õ±Ðì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•É!ÑÑÁ•ÍÍ…±±‰…­A…”¡ÍÑ…ÑÕÍ½‘”°ì($$$%‰½Õ¹‘…Éå½µÁ½¹•¹ÐèÁ…É•¹Ñ	½Õ¹‘…Éä°($$$%±…å½ÕÑÌè½ÁÑ¥½¹Ì¹É½ÕÑ”¹±…å½ÕÑÌ¹Í±¥” À°±…å½ÕÑ%¹‘•à¤°($$$%µ…Ñ¡•‘A…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌ($$%ô°¹Õ±°¤ì($%ô°($%É•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°($%ÍÁ•¥…±ÉÉ½È(%ô¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸É•¹‘•ÉA…•MÁ•¥…±ÉÉ½È¡½ÁÑ¥½¹Ì°ÍÁ•¥…±ÉÉ½È¤ì(%É•ÑÕÉ¸‰Õ¥±‘ÁÁA…•MÁ•¥…±ÉÉ½ÉI•ÍÁ½¹Í”¡ì($%‰…Í•A…Ñ è½ÁÑ¥½¹Ì¹‰…Í•A…Ñ °($%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐè½ÁÑ¥½¹Ì¹±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ°($%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì°($%¥ÍIÍI•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹¥ÍIÍI•ÅÕ•ÍÐ°($%µ¥‘‘±•Ý…É•½¹Ñ•áÐè½ÁÑ¥½¹Ì¹µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($%É•¹‘•É…±±‰…­A…”¡ÍÑ…ÑÕÍ½‘”¤ì($$%É•ÑÕÉ¸½ÁÑ¥½¹Ì¹É•¹‘•É!ÑÑÁ•ÍÍ…±±‰…­A…”¡ÍÑ…ÑÕÍ½‘”°ìµ…Ñ¡•‘A…É…µÌè½ÁÑ¥½¹Ì¹Á…É…µÌô°¹Õ±°¤ì($%ô°($%É•ÅÕ•ÍÐè½ÁÑ¥½¹Ì¹É•ÅÕ•ÍÐ°($%ÍÁ•¥…±ÉÉ½È(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÍ•µ•¹Ðµ½¹™¥œ¹©Ì)Ù…Èe95%}Y1UL€ô¹•ÜM•Ð¡l($‰…ÕÑ¼ˆ°($‰•ÉÉ½Èˆ°($‰™½É”µ‘å¹…µ¥Œˆ°($‰™½É”µÍÑ…Ñ¥Œˆ)t¤ì)Ù…ÈQ!}!}Y1UL€ô¹•ÜM•Ð¡l($‰…ÕÑ¼ˆ°($‰‘•™…Õ±Ðµ…¡”ˆ°($‰‘•™…Õ±Ðµ¹¼µÍÑ½É”ˆ°($‰™½É”µ…¡”ˆ°($‰™½É”µ¹¼µÍÑ½É”ˆ°($‰½¹±äµ…¡”ˆ°($‰½¹±äµ¹¼µÍÑ½É”ˆ)t¤ì)™Õ¹Ñ¥½¸¥ÍI½ÕÑ•M•µ•¹Ñå¹…µ¥Œ¡Ù…±Õ”¤ì(%É•ÑÕÉ¸e95%}Y1UL¹¡…Ì¡Ù…±Õ”¤ì)ô)™Õ¹Ñ¥½¸¥ÍI½ÕÑ•M•µ•¹Ñ•Ñ¡…¡”¡Ù…±Õ”¤ì(%É•ÑÕÉ¸Q!}!}Y1UL¹¡…Ì¡Ù…±Õ”¤ì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•I•Ù…±¥‘…Ñ•M•½¹‘Ì¡ÕÉÉ•¹Ð°Ù…±Õ”¤ì(%¥˜€¡Ù…±Õ”€ôôô™…±Í”¤ì($%¥˜€¡ÕÉÉ•¹Ð€ôôô¹Õ±°¤É•ÑÕÉ¸%¹™¥¹¥Ñäì($%É•ÑÕÉ¸ÕÉÉ•¹Ð€ôôô%¹™¥¹¥Ñä€ü%¹™¥¹¥Ñä€èÕÉÉ•¹Ðì(%ô(%¥˜€¡ÑåÁ•½˜Ù…±Õ”€„ôô€‰¹Õµ‰•Èˆ¤É•ÑÕÉ¸ÕÉÉ•¹Ðì(%¥˜€¡ÕÉÉ•¹Ð€ôôô¹Õ±°¤É•ÑÕÉ¸Ù…±Õ”ì(%É•ÑÕÉ¸Ù…±Õ”€ðÕÉÉ•¹Ð€üÙ…±Õ”€èÕÉÉ•¹Ðì)ô)™Õ¹Ñ¥½¸¥Í…¡••Ñ¡…¡•5½‘”¡Ù…±Õ”¤ì(%É•ÑÕÉ¸Ù…±Õ”€ôôô€‰‘•™…Õ±Ðµ…¡”ˆñðÙ…±Õ”€ôôô€‰™½É”µ…¡”ˆñðÙ…±Õ”€ôôô€‰½¹±äµ…¡”ˆì)ô)™Õ¹Ñ¥½¸‘•ÍÉ¥‰••Ñ¡…¡•½¹™±¥Ð¡Ù…±Õ”¤ì(%É•ÑÕÉ¸I½ÕÑ”Í•µ•¹Ð½¹™¥œ¡…Ì¥¹½µÁ…Ñ¥‰±”™•Ñ¡…¡”Ù…±Õ•Ì¥¹±Õ‘¥¹œ€ˆ‘íÙ…±Õ•ôˆ¹€ì)ô(¼¨¨(¨I•Í½±Ù”Ñ¡”É½ÕÑ”Í•µ•¹Ð½¹™¥œÑ¡…Ð…ÁÁ±¥•ÌÑ¼…¸ÁÀÁ…”É½ÕÑ”¸(¨(¨9•áÐ¹©Ì½±±•ÑÌ½¹™¥œ™É½´•Ù•ÉäÍ•µ•¹Ð¥¸Ñ¡”±½…‘•ÈÑÉ•”…¹É•‘Õ•Ì¥Ð(¨¥¹Ñ¼Ñ¡”•™™•Ñ¥Ù”É½ÕÑ”½¹™¥œ¸Q¡”•¹•É…Ñ•Ù¥¹•áÐ•¹ÑÉä…±É•…‘ä­¹½ÝÌ(¨Ñ¡”½¹É•Ñ”±…å½ÕÐ½Á…”µ½‘Õ±•Ì™½È„É½ÕÑ”°Í¼¥ÐÍ¡½Õ±½¹±ä‘•ÍÉ¥‰”(¨Ñ¡½Í”µ½‘Õ±•Ì…¹‘•±•…Ñ”Ñ¡”‰•¡…Ù¥½ÈÑ¼Ñ¡¥Ì¡•±Á•È¸(¨¼)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…•M•µ•¹Ñ½¹™¥œ¡½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÍ•µ•¹ÑÌ€ôl¸¸¹½ÁÑ¥½¹Ì¹±…å½ÕÑÌ€üümt°½ÁÑ¥½¹Ì¹Á…•tì(%½¹ÍÐ½¹™¥œ€ôìÉ•Ù…±¥‘…Ñ•M•½¹‘Ìè¹Õ±°ôì(%±•Ð¡…Í½É•…¡”€ô™…±Í”ì(%±•Ð¡…Í½É•9½MÑ½É”€ô™…±Í”ì(%±•Ð¡…Í=¹±å…¡”€ô™…±Í”ì(%±•Ð¡…Í=¹±å9½MÑ½É”€ô™…±Í”ì(%±•Ð¡…ÍA…É•¹Ñ•™…Õ±Ñ9½MÑ½É”€ô™…±Í”ì(%™½È€¡½¹ÍÐÍ•µ•¹Ð½˜Í•µ•¹ÑÌ¤ì($%¥˜€ …Í•µ•¹Ð¤½¹Ñ¥¹Õ”ì($%¥˜€¡¥ÍI½ÕÑ•M•µ•¹Ñå¹…µ¥Œ¡Í•µ•¹Ð¹‘å¹…µ¥Œ¤¤½¹™¥œ¹‘å¹…µ¥½¹™¥œ€ôÍ•µ•¹Ð¹‘å¹…µ¥Œì($%¥˜€¡Í•µ•¹Ð¹‘å¹…µ¥A…É…µÌ€ôôô™…±Í”¤½¹™¥œ¹‘å¹…µ¥A…É…µÍ½¹™¥œ€ô™…±Í”ì($%•±Í”¥˜€¡Í•µ•¹Ð¹‘å¹…µ¥A…É…µÌ€ôôôÑÉÕ”€˜˜½¹™¥œ¹‘å¹…µ¥A…É…µÍ½¹™¥œ€„ôô™…±Í”¤½¹™¥œ¹‘å¹…µ¥A…É…µÍ½¹™¥œ€ôÑÉÕ”ì($%¥˜€¡¥ÍI½ÕÑ•M•µ•¹Ñ•Ñ¡…¡”¡Í•µ•¹Ð¹™•Ñ¡…¡”¤¤ì($$%½¹ÍÐ™•Ñ¡…¡”€ôÍ•µ•¹Ð¹™•Ñ¡…¡”ì($$%¥˜€¡¡…ÍA…É•¹Ñ•™…Õ±Ñ9½MÑ½É”€˜˜€¡™•Ñ¡…¡”€ôôô€‰…ÕÑ¼ˆñð¥Í…¡••Ñ¡…¡•5½‘”¡™•Ñ¡…¡”¤¤¤Ñ¡É½Ü¹•ÜÉÉ½È¡‘•ÍÉ¥‰••Ñ¡…¡•½¹™±¥Ð¡™•Ñ¡…¡”¤¤ì($$%¥˜€¡™•Ñ¡…¡”€ôôô€‰™½É”µ…¡”ˆ¤¡…Í½É•…¡”€ôÑÉÕ”ì($$%¥˜€¡™•Ñ¡…¡”€ôôô€‰™½É”µ¹¼µÍÑ½É”ˆ¤¡…Í½É•9½MÑ½É”€ôÑÉÕ”ì($$%¥˜€¡™•Ñ¡…¡”€ôôô€‰½¹±äµ…¡”ˆ¤¡…Í=¹±å…¡”€ôÑÉÕ”ì($$%¥˜€¡™•Ñ¡…¡”€ôôô€‰½¹±äµ¹¼µÍÑ½É”ˆ¤¡…Í=¹±å9½MÑ½É”€ôÑÉÕ”ì($$%¥˜€ ¡¡…Í½É•…¡”ñð¡…Í=¹±å…¡”¤€˜˜€¡¡…Í½É•9½MÑ½É”ñð¡…Í=¹±å9½MÑ½É”¤¤Ñ¡É½Ü¹•ÜÉÉ½È¡‘•ÍÉ¥‰••Ñ¡…¡•½¹™±¥Ð¡™•Ñ¡…¡”¤¤ì($$%¥˜€¡™•Ñ¡…¡”€ôôô€‰‘•™…Õ±Ðµ¹¼µÍÑ½É”ˆ¤¡…ÍA…É•¹Ñ•™…Õ±Ñ9½MÑ½É”€ôÑÉÕ”ì($$%¥˜€¡¡…Í½É•…¡”¤½¹™¥œ¹™•Ñ¡…¡”€ô€‰™½É”µ…¡”ˆì($$%•±Í”¥˜€¡¡…Í½É•9½MÑ½É”¤½¹™¥œ¹™•Ñ¡…¡”€ô€‰™½É”µ¹¼µÍÑ½É”ˆì($$%•±Í”¥˜€¡¡…Í=¹±å…¡”¤½¹™¥œ¹™•Ñ¡…¡”€ô€‰½¹±äµ…¡”ˆì($$%•±Í”¥˜€¡¡…Í=¹±å9½MÑ½É”¤½¹™¥œ¹™•Ñ¡…¡”€ô€‰½¹±äµ¹¼µÍÑ½É”ˆì($$%•±Í”½¹™¥œ¹™•Ñ¡…¡”€ô™•Ñ¡…¡”ì($%ô($%½¹™¥œ¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ôÉ•Í½±Ù•I•Ù…±¥‘…Ñ•M•½¹‘Ì¡½¹™¥œ¹É•Ù…±¥‘…Ñ•M•½¹‘Ì°Í•µ•¹Ð¹É•Ù…±¥‘…Ñ”¤ì(%ô(%¥˜€¡½¹™¥œ¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µ‘å¹…µ¥Œˆ¤½¹™¥œ¹É•Ù…±¥‘…Ñ•M•½¹‘Ì€ô€Àì(%¥˜€¡½¹™¥œ¹™•Ñ¡…¡”€ôôôÙ½¥€À¤ì($%¥˜€¡½¹™¥œ¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µ‘å¹…µ¥Œˆ¤½¹™¥œ¹™•Ñ¡…¡”€ô€‰™½É”µ¹¼µÍÑ½É”ˆì($%•±Í”¥˜€¡½¹™¥œ¹‘å¹…µ¥½¹™¥œ€ôôô€‰•ÉÉ½Èˆ¤½¹™¥œ¹™•Ñ¡…¡”€ô€‰½¹±äµ…¡”ˆì(%ô(%¥˜€¡½¹™¥œ¹‘å¹…µ¥A…É…µÍ½¹™¥œ€ôôôÙ½¥€À€˜˜€¡½¹™¥œ¹‘å¹…µ¥½¹™¥œ€ôôô€‰•ÉÉ½Èˆñð½¹™¥œ¹‘å¹…µ¥½¹™¥œ€ôôô€‰™½É”µÍÑ…Ñ¥Œˆ¤¤½¹™¥œ¹‘å¹…µ¥A…É…µÍ½¹™¥œ€ô™…±Í”ì(%É•ÑÕÉ¸½¹™¥œì)ô)™Õ¹Ñ¥½¸É•Í½±Ù•ÁÁA…••Ñ¡…¡•5½‘”¡½ÁÑ¥½¹Ì¤ì(%É•ÑÕÉ¸É•Í½±Ù•ÁÁA…•M•µ•¹Ñ½¹™¥œ¡½ÁÑ¥½¹Ì¤¹™•Ñ¡…¡”€üü¹Õ±°ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½É½ÕÑ¥¹œ½É½ÕÑ”µÑÉ¥”¹©Ì)™Õ¹Ñ¥½¸É•…Ñ•9½‘” ¤ì(%É•ÑÕÉ¸ì($%ÍÑ…Ñ¥¡¥±‘É•¸è€¼¨}}AUI}|€¨¼¹•Ü5…À ¤°($%‘å¹…µ¥¡¥±è¹Õ±°°($%…Ñ¡±±¡¥±è¹Õ±°°($%½ÁÑ¥½¹…±…Ñ¡±±¡¥±è¹Õ±°°($%É½ÕÑ”è¹Õ±°(%ôì)ô(¼¨¨(¨	Õ¥±„ÑÉ¥”™É½´ÁÉ”µÍ½ÉÑ•É½ÕÑ•Ì¸(¨(¨I½ÕÑ•ÌµÕÍÐ¡…Ù”„Á…ÑÑ•É¹A…ÉÑÍ€ÁÉ½Á•ÉÑä€¡ÍÑÉ¥¹mt½˜UI0Í•µ•¹ÑÌ¤¸(¨A…ÑÑ•É¸Í•µ•¹Ð½¹Ù•¹Ñ¥½¹Ìè(¨€€€´€é¹…µ•€€ƒŠP‘å¹…µ¥ŒÍ•µ•¹Ð(¨€€€´€é¹…µ”­€ƒŠP…Ñ µ…±°€ Ä¬Í•µ•¹ÑÌ¤(¨€€€´€é¹…µ”©€ƒŠP½ÁÑ¥½¹…°…Ñ µ…±°€ À¬Í•µ•¹ÑÌ¤(¨€€€´…¹åÑ¡¥¹œ•±Í”ƒŠPÍÑ…Ñ¥ŒÍ•µ•¹Ð(¨(¨¥ÉÍÐÉ½ÕÑ”Ñ¼±…¥´„Ñ•Éµ¥¹…°Á½Í¥Ñ¥½¸Ý¥¹Ì€¡É½ÕÑ•Ì…É”ÁÉ”µÍ½ÉÑ•(¨‰äÁÉ••‘•¹”°Í¼¥¹Í•ÉÑ¥½¸½É‘•ÈÁÉ•Í•ÉÙ•Ì½ÉÉ•ÐÁÉ¥½É¥Ñä¤¸(¨¼)™Õ¹Ñ¥½¸‰Õ¥±‘I½ÕÑ•QÉ¥”¡É½ÕÑ•Ì¤ì(%½¹ÍÐÉ½½Ð€ôÉ•…Ñ•9½‘” ¤ì(%™½È€¡½¹ÍÐÉ½ÕÑ”½˜É½ÕÑ•Ì¤ì($%½¹ÍÐÁ…ÉÑÌ€ôÉ½ÕÑ”¹Á…ÑÑ•É¹A…ÉÑÌì($%¥˜€¡Á…ÉÑÌ¹±•¹Ñ €ôôô€À¤ì($$%¥˜€¡É½½Ð¹É½ÕÑ”€ôôô¹Õ±°¤É½½Ð¹É½ÕÑ”€ôÉ½ÕÑ”ì($$%½¹Ñ¥¹Õ”ì($%ô($%±•Ð¹½‘”€ôÉ½½Ðì($%™½È€¡±•Ð¤€ô€Àì¤€ðÁ…ÉÑÌ¹±•¹Ñ ì¤¬¬¤ì($$%½¹ÍÐÁ…ÉÐ€ôÁ…ÉÑÍm¥tì($$%¥˜€¡Á…ÉÐ¹•¹‘Í]¥Ñ  ˆ¬ˆ¤€˜˜Á…ÉÐ¹ÍÑ…ÉÑÍ]¥Ñ  ˆèˆ¤¤ì($$$%¥˜€¡¤€„ôôÁ…ÉÑÌ¹±•¹Ñ €´€Ä¤‰É•…¬ì($$$%½¹ÍÐÁ…É…µ9…µ”€ôÁ…ÉÐ¹Í±¥” Ä°€´Ä¤ì($$$%¥˜€¡¹½‘”¹…Ñ¡±±¡¥±€ôôô¹Õ±°¤¹½‘”¹…Ñ¡±±¡¥±€ôì($$$$%Á…É…µ9…µ”°($$$$%É½ÕÑ”($$$%ôì($$$%‰É•…¬ì($$%ô($$%¥˜€¡Á…ÉÐ¹•¹‘Í]¥Ñ  ˆ¨ˆ¤€˜˜Á…ÉÐ¹ÍÑ…ÉÑÍ]¥Ñ  ˆèˆ¤¤ì($$$%¥˜€¡¤€„ôôÁ…ÉÑÌ¹±•¹Ñ €´€Ä¤‰É•…¬ì($$$%½¹ÍÐÁ…É…µ9…µ”€ôÁ…ÉÐ¹Í±¥” Ä°€´Ä¤ì($$$%¥˜€¡¹½‘”¹½ÁÑ¥½¹…±…Ñ¡±±¡¥±€ôôô¹Õ±°¤¹½‘”¹½ÁÑ¥½¹…±…Ñ¡±±¡¥±€ôì($$$$%Á…É…µ9…µ”°($$$$%É½ÕÑ”($$$%ôì($$$%‰É•…¬ì($$%ô($$%¥˜€¡Á…ÉÐ¹ÍÑ…ÉÑÍ]¥Ñ  ˆèˆ¤¤ì($$$%½¹ÍÐÁ…É…µ9…µ”€ôÁ…ÉÐ¹Í±¥” Ä¤ì($$$%¥˜€¡¹½‘”¹‘å¹…µ¥¡¥±€ôôô¹Õ±°¤¹½‘”¹‘å¹…µ¥¡¥±€ôì($$$$%Á…É…µ9…µ”°($$$$%¹½‘”èÉ•…Ñ•9½‘” ¤($$$%ôì($$$%¹½‘”€ô¹½‘”¹‘å¹…µ¥¡¥±¹¹½‘”ì($$$%¥˜€¡¤€ôôôÁ…ÉÑÌ¹±•¹Ñ €´€Ä¤ì($$$$%¥˜€¡¹½‘”¹É½ÕÑ”€ôôô¹Õ±°¤¹½‘”¹É½ÕÑ”€ôÉ½ÕÑ”ì($$$%ô($$$%½¹Ñ¥¹Õ”ì($$%ô($$%±•Ð¡¥±€ô¹½‘”¹ÍÑ…Ñ¥¡¥±‘É•¸¹•Ð¡Á…ÉÐ¤ì($$%¥˜€ …¡¥±¤ì($$$%¡¥±€ôÉ•…Ñ•9½‘” ¤ì($$$%¹½‘”¹ÍÑ…Ñ¥¡¥±‘É•¸¹Í•Ð¡Á…ÉÐ°¡¥±¤ì($$%ô($$%¹½‘”€ô¡¥±ì($$%¥˜€¡¤€ôôôÁ…ÉÑÌ¹±•¹Ñ €´€Ä¤ì($$$%¥˜€¡¹½‘”¹É½ÕÑ”€ôôô¹Õ±°¤¹½‘”¹É½ÕÑ”€ôÉ½ÕÑ”ì($$%ô($%ô(%ô(%É•ÑÕÉ¸É½½Ðì)ô(¼¨¨(¨5…Ñ „UI0……¥¹ÍÐÑ¡”ÑÉ¥”¸(¨(¨I•ÑÕÉ¹Ì‘•½‘•Á…É…´Ù…±Õ•ÌƒŠP‘•½‘•UI%½µÁ½¹•¹Ñ€¥Ì…ÁÁ±¥•Ñ¼(¨¥¹‘¥Ù¥‘Õ…°Á…É…´•¹ÑÉ¥•ÌÍ¼Ñ¡…Ð€”É€ƒŠH€½€°€”ÈÍ€ƒŠH€€°•ÑŒ¸(¨M•µ•¹Ð‰½Õ¹‘…É¥•Ì€¡Ñ¡”½É¥¥¹…°€½€ÍÁ±¥ÑÌ¤…É”ÁÉ•Í•ÉÙ•‰äÑ¡”(¨ÕÁÍÑÉ•…´¹½Éµ…±¥é…Ñ¥½¸±…å•ÈìÑ¡¥ÌÍÑ•À½¹±ä‘•½‘•ÌÑ¡”…ÁÑÕÉ•(¨Á…É…´ÍÑÉ¥¹ÌÑ¡”…±±•ÈÍ••Ì¸(¨(¨5¥ÉÉ½ÉÌ9•áÐ¹©ÌÉ½ÕÑ”µµ…Ñ¡•È¹ÑÌèÈÔ´ÈÜ¸(¨(¨Á…É…´É½½Ð€´QÉ¥”É½½Ð‰Õ¥±Ð‰ä‰Õ¥±‘I½ÕÑ•QÉ¥•€(¨Á…É…´ÕÉ±A…ÉÑÌ€´AÉ”µÍÁ±¥ÐUI0Í•µ•¹ÑÌ€¡¹¼•µÁÑäÍÑÉ¥¹Ì¤(¨É•ÑÕÉ¹Ì5…Ñ É•ÍÕ±ÐÝ¥Ñ É½ÕÑ”…¹•áÑÉ…Ñ•Á…É…µÌ°½È¹Õ±°(¨¼)™Õ¹Ñ¥½¸ÑÉ¥•5…Ñ ¡É½½Ð°ÕÉ±A…ÉÑÌ¤ì(%½¹ÍÐÉ•ÍÕ±Ð€ôµ…Ñ ¡É½½Ð°ÕÉ±A…ÉÑÌ°€À¤ì(%¥˜€¡É•ÍÕ±Ð¤‘•½‘•5…Ñ¡•‘A…É…µÌ¡É•ÍÕ±Ð¹Á…É…µÌ¤ì(%É•ÑÕÉ¸É•ÍÕ±Ðì)ô)™Õ¹Ñ¥½¸É•…Ñ•A…É…µÌ ¤ì(%É•ÑÕÉ¸=‰©•Ð¹É•…Ñ”¡¹Õ±°¤ì)ô)™Õ¹Ñ¥½¸µ…Ñ ¡¹½‘”°ÕÉ±A…ÉÑÌ°¥¹‘•à¤ì(%¥˜€¡¥¹‘•à€ôôôÕÉ±A…ÉÑÌ¹±•¹Ñ ¤ì($%¥˜€¡¹½‘”¹É½ÕÑ”€„ôô¹Õ±°¤É•ÑÕÉ¸ì($$%É½ÕÑ”è¹½‘”¹É½ÕÑ”°($$%Á…É…µÌèÉ•…Ñ•A…É…µÌ ¤($%ôì($%¥˜€¡¹½‘”¹½ÁÑ¥½¹…±…Ñ¡±±¡¥±€„ôô¹Õ±°¤É•ÑÕÉ¸ì($$%É½ÕÑ”è¹½‘”¹½ÁÑ¥½¹…±…Ñ¡±±¡¥±¹É½ÕÑ”°($$%Á…É…µÌèÉ•…Ñ•A…É…µÌ ¤($%ôì($%É•ÑÕÉ¸¹Õ±°ì(%ô(%½¹ÍÐÍ•µ•¹Ð€ôÕÉ±A…ÉÑÍm¥¹‘•átì(%½¹ÍÐÍÑ…Ñ¥¡¥±€ô¹½‘”¹ÍÑ…Ñ¥¡¥±‘É•¸¹•Ð¡Í•µ•¹Ð¤ì(%¥˜€¡ÍÑ…Ñ¥¡¥±¤ì($%½¹ÍÐÉ•ÍÕ±Ð€ôµ…Ñ ¡ÍÑ…Ñ¥¡¥±°ÕÉ±A…ÉÑÌ°¥¹‘•à€¬€Ä¤ì($%¥˜€¡É•ÍÕ±Ð€„ôô¹Õ±°¤É•ÑÕÉ¸É•ÍÕ±Ðì(%ô(%¥˜€¡¹½‘”¹‘å¹…µ¥¡¥±€„ôô¹Õ±°¤ì($%½¹ÍÐÉ•ÍÕ±Ð€ôµ…Ñ ¡¹½‘”¹‘å¹…µ¥¡¥±¹¹½‘”°ÕÉ±A…ÉÑÌ°¥¹‘•à€¬€Ä¤ì($%¥˜€¡É•ÍÕ±Ð€„ôô¹Õ±°¤ì($$%É•ÍÕ±Ð¹Á…É…µÍm¹½‘”¹‘å¹…µ¥¡¥±¹Á…É…µ9…µ•t€ôÍ•µ•¹Ðì($$%É•ÑÕÉ¸É•ÍÕ±Ðì($%ô(%ô(%¥˜€¡¹½‘”¹…Ñ¡±±¡¥±€„ôô¹Õ±°¤ì($%½¹ÍÐÉ•µ…¥¹¥¹œ€ôÕÉ±A…ÉÑÌ¹Í±¥”¡¥¹‘•à¤ì($%½¹ÍÐÁ…É…µÌ€ôÉ•…Ñ•A…É…µÌ ¤ì($%Á…É…µÍm¹½‘”¹…Ñ¡±±¡¥±¹Á…É…µ9…µ•t€ôÉ•µ…¥¹¥¹œì($%É•ÑÕÉ¸ì($$%É½ÕÑ”è¹½‘”¹…Ñ¡±±¡¥±¹É½ÕÑ”°($$%Á…É…µÌ($%ôì(%ô(%¥˜€¡¹½‘”¹½ÁÑ¥½¹…±…Ñ¡±±¡¥±€„ôô¹Õ±°¤ì($%½¹ÍÐÉ•µ…¥¹¥¹œ€ôÕÉ±A…ÉÑÌ¹Í±¥”¡¥¹‘•à¤ì($%½¹ÍÐÁ…É…µÌ€ôÉ•…Ñ•A…É…µÌ ¤ì($%Á…É…µÍm¹½‘”¹½ÁÑ¥½¹…±…Ñ¡±±¡¥±¹Á…É…µ9…µ•t€ôÉ•µ…¥¹¥¹œì($%É•ÑÕÉ¸ì($$%É½ÕÑ”è¹½‘”¹½ÁÑ¥½¹…±…Ñ¡±±¡¥±¹É½ÕÑ”°($$%Á…É…µÌ($%ôì(%ô(%É•ÑÕÉ¸¹Õ±°ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉÍŒµÉ½ÕÑ”µµ…Ñ¡¥¹œ¹©Ì)™Õ¹Ñ¥½¸É•…Ñ•I½ÕÑ•A…É…µÌ ¤ì(%É•ÑÕÉ¸=‰©•Ð¹É•…Ñ”¡¹Õ±°¤ì)ô)™Õ¹Ñ¥½¸…ÁÁIÍA…Ñ¡¹…µ•A…ÉÑÌ¡Á…Ñ¡¹…µ”¤ì(%½¹ÍÐÁ…Ñ¡=¹±ä€ôÁ…Ñ¡¹…µ”¹ÍÁ±¥Ð ˆüˆ¥lÁtì(%É•ÑÕÉ¸¹½Éµ…±¥é•A…Ñ¡¹…µ•½ÉI½ÕÑ•5…Ñ ¡Á…Ñ¡=¹±ä€ôôô€ˆ¼ˆ€ü€ˆ¼ˆ€èÁ…Ñ¡=¹±ä¹É•Á±…” ½p¼¼°€ˆˆ¤¤¹ÍÁ±¥Ð ˆ¼ˆ¤¹™¥±Ñ•È¡	½½±•…¸¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•ÁÁIÍI½ÕÑ•5…Ñ¡•È¡É½ÕÑ•Ì¤ì(%½¹ÍÐÉ½ÕÑ•QÉ¥”€ô‰Õ¥±‘I½ÕÑ•QÉ¥”¡É½ÕÑ•Ì¤ì(%½¹ÍÐ¥¹Ñ•É•ÁÑ1½½­ÕÀ€ôÉ•…Ñ•%¹Ñ•É•ÁÑ1½½­ÕÀ¡É½ÕÑ•Ì¤ì(%É•ÑÕÉ¸ì($%µ…Ñ¡I½ÕÑ”¡ÕÉ°¤ì($$%É•ÑÕÉ¸ÑÉ¥•5…Ñ ¡É½ÕÑ•QÉ¥”°…ÁÁIÍA…Ñ¡¹…µ•A…ÉÑÌ¡ÕÉ°¤¤ì($%ô°($%™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ”°Í½ÕÉ•A…Ñ¡¹…µ”€ô¹Õ±°¤ì($$%½¹ÍÐÕÉ±A…ÉÑÌ€ô…ÁÁIÍA…Ñ¡¹…µ•A…ÉÑÌ¡Á…Ñ¡¹…µ”¤ì($$%™½È€¡½¹ÍÐ•¹ÑÉä½˜¥¹Ñ•É•ÁÑ1½½­ÕÀ¤ì($$$%½¹ÍÐÁ…É…µÌ€ôµ…Ñ¡ÁÁIÍI½ÕÑ•A…ÑÑ•É¸¡ÕÉ±A…ÉÑÌ°•¹ÑÉä¹Ñ…É•ÑA…ÑÑ•É¹A…ÉÑÌ¤ì($$$%¥˜€¡Á…É…µÌ€„ôô¹Õ±°¤ì($$$$%±•ÐÍ½ÕÉ•A…É…µÌ€ôÉ•…Ñ•I½ÕÑ•A…É…µÌ ¤ì($$$$%¥˜€¡Í½ÕÉ•A…Ñ¡¹…µ”€„ôô¹Õ±°¤ì($$$$$%½¹ÍÐÍ½ÕÉ•I½ÕÑ”€ôÉ½ÕÑ•Ím•¹ÑÉä¹Í½ÕÉ•I½ÕÑ•%¹‘•átì($$$$$%½¹ÍÐÍ½ÕÉ•A…ÉÑÌ€ô…ÁÁIÍA…Ñ¡¹…µ•A…ÉÑÌ¡Í½ÕÉ•A…Ñ¡¹…µ”¤ì($$$$$%½¹ÍÐµ…Ñ¡•‘M½ÕÉ•A…É…µÌ€ôÍ½ÕÉ•I½ÕÑ”€üµ…Ñ¡ÁÁIÍI½ÕÑ•A…ÑÑ•É¸¡Í½ÕÉ•A…ÉÑÌ°Í½ÕÉ•I½ÕÑ”¹Á…ÑÑ•É¹A…ÉÑÌ¤€è¹Õ±°ì($$$$$%¥˜€¡µ…Ñ¡•‘M½ÕÉ•A…É…µÌ€„ôô¹Õ±°¤Í½ÕÉ•A…É…µÌ€ôµ…Ñ¡•‘M½ÕÉ•A…É…µÌì($$$$%ô($$$$%É•ÑÕÉ¸ì($$$$$$¸¸¹•¹ÑÉä°($$$$$%µ…Ñ¡•‘A…É…µÌèµ•É•5…Ñ¡•‘A…É…µÌ¡Í½ÕÉ•A…É…µÌ°Á…É…µÌ¤($$$$%ôì($$$%ô($$%ô($$%É•ÑÕÉ¸¹Õ±°ì($%ô(%ôì)ô)™Õ¹Ñ¥½¸É•…Ñ•%¹Ñ•É•ÁÑ1½½­ÕÀ¡É½ÕÑ•Ì¤ì(%½¹ÍÐ¥¹Ñ•É•ÁÑ1½½­ÕÀ€ômtì(%™½È€¡±•ÐÉ½ÕÑ•%¹‘•à€ô€ÀìÉ½ÕÑ•%¹‘•à€ðÉ½ÕÑ•Ì¹±•¹Ñ ìÉ½ÕÑ•%¹‘•à¬¬¤ì($%½¹ÍÐÉ½ÕÑ”€ôÉ½ÕÑ•ÍmÉ½ÕÑ•%¹‘•átì($%¥˜€ …É½ÕÑ”¹Í±½ÑÌ¤½¹Ñ¥¹Õ”ì($%™½È€¡½¹ÍÐmÍ±½Ñ-•ä°Í±½Ñ5½‘Õ±•t½˜=‰©•Ð¹•¹ÑÉ¥•Ì¡É½ÕÑ”¹Í±½ÑÌ¤¤ì($$%¥˜€ …Í±½Ñ5½‘Õ±”¹¥¹Ñ•É•ÁÑÌ¤½¹Ñ¥¹Õ”ì($$%™½È€¡½¹ÍÐ¥¹Ñ•É•ÁÐ½˜Í±½Ñ5½‘Õ±”¹¥¹Ñ•É•ÁÑÌ¤¥¹Ñ•É•ÁÑ1½½­ÕÀ¹ÁÕÍ ¡ì($$$%Í½ÕÉ•I½ÕÑ•%¹‘•àèÉ½ÕÑ•%¹‘•à°($$$%Í±½Ñ-•ä°($$$%Ñ…É•ÑA…ÑÑ•É¸è¥¹Ñ•É•ÁÐ¹Ñ…É•ÑA…ÑÑ•É¸°($$$%Ñ…É•ÑA…ÑÑ•É¹A…ÉÑÌè¥¹Ñ•É•ÁÐ¹Ñ…É•ÑA…ÑÑ•É¸¹ÍÁ±¥Ð ˆ¼ˆ¤¹™¥±Ñ•È¡	½½±•…¸¤°($$$%¥¹Ñ•É•ÁÑ1…å½ÕÑÌè¥¹Ñ•É•ÁÐ¹¥¹Ñ•É•ÁÑ1…å½ÕÑÌ°($$$%Á…”è¥¹Ñ•É•ÁÐ¹Á…”°($$$%Á…É…µÌè¥¹Ñ•É•ÁÐ¹Á…É…µÌ($$%ô¤ì($%ô(%ô(%É•ÑÕÉ¸¥¹Ñ•É•ÁÑ1½½­ÕÀì)ô)™Õ¹Ñ¥½¸µ…Ñ¡ÁÁIÍI½ÕÑ•A…ÑÑ•É¸¡ÕÉ±A…ÉÑÌ°Á…ÑÑ•É¹A…ÉÑÌ¤ì(%É•ÑÕÉ¸µ…Ñ¡I½ÕÑ•A…ÑÑ•É¸¡ÕÉ±A…ÉÑÌ°Á…ÑÑ•É¹A…ÉÑÌ¤ì)ô)™Õ¹Ñ¥½¸µ•É•5…Ñ¡•‘A…É…µÌ¡Í½ÕÉ•A…É…µÌ°Ñ…É•ÑA…É…µÌ¤ì(%É•ÑÕÉ¸=‰©•Ð¹…ÍÍ¥¸¡É•…Ñ•I½ÕÑ•A…É…µÌ ¤°Í½ÕÉ•A…É…µÌ°Ñ…É•ÑA…É…µÌ¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í¡¥µÌ½¹…Ù¥…Ñ¥½¸µÍÑ…Ñ”¹©Ì(¼¨¨(¨M•ÉÙ•Èµ½¹±ä¹…Ù¥…Ñ¥½¸ÍÑ…Ñ”‰…­•‰äÍå¹1½…±MÑ½É…”¸(¨(¨Q¡¥Ìµ½‘Õ±”ÁÉ½Ù¥‘•ÌÉ•ÅÕ•ÍÐµÍ½Á•¥Í½±…Ñ¥½¸™½È¹…Ù¥…Ñ¥½¸½¹Ñ•áÐ(¨…¹ÕÍ•M•ÉÙ•É%¹Í•ÉÑ•‘!Q50…±±‰…­Ì¸]¥Ñ¡½ÕÐ1L°½¹ÕÉÉ•¹ÐÉ•ÅÕ•ÍÑÌ(¨½¸±½Õ‘™±…É”]½É­•ÉÌÝ½Õ±Í¡…É”µ½‘Õ±”µ±•Ù•°ÍÑ…Ñ”…¹±•…¬‘…Ñ„(¨€¡Á…Ñ¡¹…µ•Ì°Á…É…µÌ°MLµ¥¸µ)LÍÑå±•Ì¤‰•ÑÝ••¸É•ÅÕ•ÍÑÌ¸(¨(¨Q¡¥Ìµ½‘Õ±”¥ÌÍ•ÉÙ•Èµ½¹±äƒŠP¥Ð¥µÁ½ÉÑÌ¹½‘”é…Íå¹}¡½½­Ì…¹µÕÍÐ9=P(¨‰”‰Õ¹‘±•™½ÈÑ¡”‰É½ÝÍ•È¸Q¡”‘Õ…°µ•¹Ù¥É½¹µ•¹Ð¹…Ù¥…Ñ¥½¸¹ÑÌÍ¡¥´(¨ÕÍ•Ì„É•¥ÍÑÉ…Ñ¥½¸Á…ÑÑ•É¸Í¼¥ÐÝ½É­Ì¥¸‰½Ñ •¹Ù¥É½¹µ•¹ÑÌ¸(¨¼)Ù…È}11	-}-d€ôMåµ‰½°¹™½È ‰Ù¥¹•áÐ¹¹…Ù¥…Ñ¥½¸¹™…±±‰…¬ˆ¤ì)Ù…È}œ€ô±½‰…±Q¡¥Ìì)Ù…È}…±Ì€ô•Ñ=ÉÉ•…Ñ•±Ì ‰Ù¥¹•áÐ¹¹…Ù¥…Ñ¥½¸¹…±Ìˆ¤ì)Ù…È}™…±±‰…­MÑ…Ñ”€ô}m}11	-}-et€üüôì(%Í•ÉÙ•É½¹Ñ•áÐè¹Õ±°°(%Í•ÉÙ•É%¹Í•ÉÑ•‘!Q51…±±‰…­Ìèmt)ôì)™Õ¹Ñ¥½¸}•ÑMÑ…Ñ” ¤ì(%¥˜€¡¥Í%¹Í¥‘•U¹¥™¥•‘M½Á” ¤¤É•ÑÕÉ¸•ÑI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%É•ÑÕÉ¸}…±Ì¹•ÑMÑ½É” ¤€üü}™…±±‰…­MÑ…Ñ”ì)ô)Ù…È}…•ÍÍ½ÉÌ€ôì(%•ÑM•ÉÙ•É½¹Ñ•áÐ ¤ì($%É•ÑÕÉ¸}•ÑMÑ…Ñ” ¤¹Í•ÉÙ•É½¹Ñ•áÐì(%ô°(%Í•ÑM•ÉÙ•É½¹Ñ•áÐ¡Ñà¤ì($%}•ÑMÑ…Ñ” ¤¹Í•ÉÙ•É½¹Ñ•áÐ€ôÑàì(%ô°(%•Ñ%¹Í•ÉÑ•‘!Q51…±±‰…­Ì ¤ì($%É•ÑÕÉ¸}•ÑMÑ…Ñ” ¤¹Í•ÉÙ•É%¹Í•ÉÑ•‘!Q51…±±‰…­Ìì(%ô°(%±•…É%¹Í•ÉÑ•‘!Q51…±±‰…­Ì ¤ì($%}•ÑMÑ…Ñ” ¤¹Í•ÉÙ•É%¹Í•ÉÑ•‘!Q51…±±‰…­Ì€ômtì(%ô)ôì)}É•¥ÍÑ•ÉMÑ…Ñ••ÍÍ½ÉÌ¡}…•ÍÍ½ÉÌ¤ì)±½‰…±Q¡¥Ím1=	1}MM=IM}-et€ô}…•ÍÍ½ÉÌì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½‰Õ¥±½½½±”µ™½¹ÑÌ½Í½ÉÐµÙ…É¥…¹ÑÌ¹©Ì)™Õ¹Ñ¥½¸Í½ÉÑ½¹ÑÍY…É¥…¹ÑY…±Õ•Ì¡Ù…±°Ù…±¤ì(%¥˜€¡Ù…±¹¥¹±Õ‘•Ì ˆ°ˆ¤€˜˜Ù…±¹¥¹±Õ‘•Ì ˆ°ˆ¤¤ì($%½¹ÍÐm…AÉ•™¥à°…MÕ™™¥át€ôÙ…±¹ÍÁ±¥Ð ˆ°ˆ°€È¤ì($%½¹ÍÐm‰AÉ•™¥à°‰MÕ™™¥át€ôÙ…±¹ÍÁ±¥Ð ˆ°ˆ°€È¤ì($%¥˜€¡…AÉ•™¥à€ôôô‰AÉ•™¥à¤É•ÑÕÉ¸Á…ÉÍ•%¹Ð¡…MÕ™™¥à¤€´Á…ÉÍ•%¹Ð¡‰MÕ™™¥à¤ì($%É•ÑÕÉ¸Á…ÉÍ•%¹Ð¡…AÉ•™¥à¤€´Á…ÉÍ•%¹Ð¡‰AÉ•™¥à¤ì(%ô(%É•ÑÕÉ¸Á…ÉÍ•%¹Ð¡Ù…±¤€´Á…ÉÍ•%¹Ð¡Ù…±¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½‰Õ¥±½½½±”µ™½¹ÑÌ½‰Õ¥±µÕÉ°¹©Ì)™Õ¹Ñ¥½¸‰Õ¥±‘½½±•½¹ÑÍUÉ°Ä¡™½¹Ñ…µ¥±ä°…á•Ì°‘¥ÍÁ±…ä¤ì(%½¹ÍÐÙ…É¥…¹ÑÌ€ômtì(%¥˜€¡…á•Ì¹Ý¡Ð¤™½È€¡½¹ÍÐÝ¡Ð½˜…á•Ì¹Ý¡Ð¤¥˜€ ……á•Ì¹¥Ñ…°¤Ù…É¥…¹ÑÌ¹ÁÕÍ ¡ml‰Ý¡Ðˆ°Ý¡Ñt°€¸¸¹…á•Ì¹Ù…É¥…‰±•á•Ì€üümut¤ì(%•±Í”™½È€¡½¹ÍÐ¥Ñ…°½˜…á•Ì¹¥Ñ…°¤Ù…É¥…¹ÑÌ¹ÁÕÍ ¡l($%l‰¥Ñ…°ˆ°¥Ñ…±t°($%l‰Ý¡Ðˆ°Ý¡Ñt°($$¸¸¹…á•Ì¹Ù…É¥…‰±•á•Ì€üümt(%t¤ì(%•±Í”¥˜€¡…á•Ì¹Ù…É¥…‰±•á•Ì¤Ù…É¥…¹ÑÌ¹ÁÕÍ ¡l¸¸¹…á•Ì¹Ù…É¥…‰±•á•Ít¤ì(%¥˜€¡…á•Ì¹Ù…É¥…‰±•á•Ì¤™½È€¡½¹ÍÐÙ…É¥…¹Ð½˜Ù…É¥…¹ÑÌ¤Ù…É¥…¹Ð¹Í½ÉÐ ¡m…t°m‰t¤€ôøì($%½¹ÍÐ…%Í1½Ý•É…Í”€ô„¹¡…É½‘•Ð À¤€ø€äØì($%½¹ÍÐ‰%Í1½Ý•É…Í”€ôˆ¹¡…É½‘•Ð À¤€ø€äØì($%¥˜€¡…%Í1½Ý•É…Í”€˜˜€…‰%Í1½Ý•É…Í”¤É•ÑÕÉ¸€´Äì($%¥˜€¡‰%Í1½Ý•É…Í”€˜˜€……%Í1½Ý•É…Í”¤É•ÑÕÉ¸€Äì($%É•ÑÕÉ¸„€øˆ€ü€Ä€è€´Äì(%ô¤ì(%±•ÐÕÉ°€ô¡ÑÑÁÌè¼½™½¹ÑÌ¹½½±•…Á¥Ì¹½´½ÍÌÈý™…µ¥±äô‘í™½¹Ñ…µ¥±ä¹É•Á±…” ¼€½œ°€ˆ¬ˆ¥õ€ì(%¥˜€¡Ù…É¥…¹ÑÌ¹±•¹Ñ €ø€À¤ì($%½¹ÍÐ­•å1¥ÍÐ€ôÙ…É¥…¹ÑÍlÁt¹µ…À ¡m­•åt¤€ôø­•ä¤¹©½¥¸ ˆ°ˆ¤ì($%½¹ÍÐÙ…±Õ•1¥ÍÑÌ€ôÙ…É¥…¹ÑÌ¹µ…À ¡Ù…É¥…¹Ð¤€ôøÙ…É¥…¹Ð¹µ…À ¡l°Ù…±t¤€ôøÙ…°¤¹©½¥¸ ˆ°ˆ¤¤¹Í½ÉÐ¡Í½ÉÑ½¹ÑÍY…É¥…¹ÑY…±Õ•Ì¤¹©½¥¸ ˆìˆ¤ì($%ÕÉ°€ô€‘íÕÉ±ôè‘í­•å1¥ÍÑõ ‘íÙ…±Õ•1¥ÍÑÍõ€ì(%ô(%É•ÑÕÉ¸€‘íÕÉ±ô™‘¥ÍÁ±…äô‘í‘¥ÍÁ±…åõ€ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í¡¥µÌ½™½¹Ðµ½½±”µ‰…Í”¹©Ì(¼¨¨(¨¹•áÐ½™½¹Ð½½½±”Í¡¥´(¨(¨AÉ½Ù¥‘•Ì„½µÁ…Ñ¥‰±”Í¡¥´™½È9•áÐ¹©Ì½½±”½¹ÑÌ¸(¨(¨QÝ¼µ½‘•Ìè(¨€Ä¸€¨©•Ø€¼8µ½‘”¨¨€¡‘•™…Õ±Ð¤è1½…‘Ì™½¹ÑÌ™É½´½½±”½¹ÑÌ8Ù¥„€ñ±¥¹¬øÑ…Ì¸(¨€È¸€¨©M•±˜µ¡½ÍÑ•µ½‘”¨¨€¡ÁÉ½‘ÕÑ¥½¸‰Õ¥±¤èQ¡”Ù¥¹•áÐé½½±”µ™½¹ÑÌY¥Ñ”Á±Õ¥¸(¨€€€™•Ñ¡•Ì™½¹ÐML€¬€¹Ý½™˜È™¥±•Ì…Ð‰Õ¥±Ñ¥µ”°…¡•ÌÑ¡•´±½…±±ä°…¹¥¹©•ÑÌ(¨€€€™½¹Ðµ™…”MLÁ½¥¹Ñ¥¹œ…Ð±½…°…ÍÍ•ÑÌ¸9¼É•ÅÕ•ÍÑÌÑ¼½½±”…ÐÉÕ¹Ñ¥µ”¸(¨(¨UÍ…”è(¨€€¥µÁ½ÉÐì%¹Ñ•Èô™É½´€¹•áÐ½™½¹Ð½½½±”œì(¨€€½¹ÍÐ¥¹Ñ•È€ô%¹Ñ•È¡ìÍÕ‰Í•ÑÌèl±…Ñ¥¸t°Ý•¥¡ÐèlœÐÀÀœ°€œÜÀÀtô¤ì(¨€€€¼¼¥¹Ñ•È¹±…ÍÍ9…µ”€´øÍÑ…‰±”ML±…ÍÌ™½ÈÑ¡¥Ì™½¹Ð½½ÁÑ¥½¹ÌÁ…¥È(¨€€€¼¼¥¹Ñ•È¹ÍÑå±”€´øì™½¹Ñ…µ¥±äè€ˆ%¹Ñ•Èœ°Í…¹ÌµÍ•É¥˜ˆô(¨€€€¼¼¥¹Ñ•È¹Ù…É¥…‰±”€´øML±…ÍÌÑ¡…ÐÍ•ÑÌÑ¡”™½¹ÐMLÙ…É¥…‰±”(¨¼(¼¨¨(¨Í…Á”„ÍÑÉ¥¹œ™½ÈÍ…™”¥¹Ñ•ÉÁ½±…Ñ¥½¸¥¹Í¥‘”„MLÍ¥¹±”µÅÕ½Ñ•ÍÑÉ¥¹œ¸(¨(¨AÉ•Ù•¹ÑÌML¥¹©•Ñ¥½¸‰ä•Í…Á¥¹œ¡…É…Ñ•ÉÌÑ¡…Ð½Õ±‰É•…¬½ÕÐ½˜(¨„€œ¸¸¸€MLÍÑÉ¥¹œ½¹Ñ•áÐè‰…­Í±…Í¡•Ì°Í¥¹±”ÅÕ½Ñ•Ì°…¹¹•Ý±¥¹•Ì¸(¨¼)™Õ¹Ñ¥½¸•Í…Á•MMMÑÉ¥¹œ¡Ù…±Õ”¤ì(%É•ÑÕÉ¸Ù…±Õ”¹É•Á±…” ½qp½œ°€‰qqqpˆ¤¹É•Á±…” ¼œ½œ°€‰qpœˆ¤¹É•Á±…” ½q¸½œ°€‰qq„€ˆ¤¹É•Á±…” ½qÈ½œ°€‰qq€ˆ¤ì)ô(¼¨¨(¨Y…±¥‘…Ñ”„MLÕÍÑ½´ÁÉ½Á•ÉÑä¹…µ”€¡”¹œ¸€´µ™½¹Ðµ¥¹Ñ•É€¤¸(¨(¨ÕÍÑ½´ÁÉ½Á•ÉÑ¥•ÌµÕÍÐÍÑ…ÉÐÝ¥Ñ €´µ€…¹½¹±ä½¹Ñ…¥¸…±Á¡…¹Õµ•É¥Œ(¨¡…É…Ñ•ÉÌ°¡åÁ¡•¹Ì°…¹Õ¹‘•ÉÍ½É•Ì¸¹åÑ¡¥¹œ•±Í”½Õ±‰”ÕÍ•Ñ¼(¨‰É•…¬½ÕÐ½˜Ñ¡”ML‘•±…É…Ñ¥½¸…¹¥¹©•Ð…É‰¥ÑÉ…ÉäÉÕ±•Ì¸(¨(¨I•ÑÕÉ¹ÌÑ¡”¹…µ”¥˜Ù…±¥°Õ¹‘•™¥¹•½Ñ¡•ÉÝ¥Í”¸(¨¼)™Õ¹Ñ¥½¸Í…¹¥Ñ¥é•MMY…É9…µ”¡¹…µ”¤ì(%¥˜€ ½x´µm„µéµhÀ´å|µt¬¼¹Ñ•ÍÐ¡¹…µ”¤¤É•ÑÕÉ¸¹…µ”ì)ô(¼¨¨(¨M…¹¥Ñ¥é”„ML™½¹Ðµ™…µ¥±ä™…±±‰…¬¹…µ”¸(¨(¨•¹•É¥Œ™…µ¥±ä¹…µ•Ì€¡Í…¹ÌµÍ•É¥˜°Í•É¥˜°µ½¹½ÍÁ…”°•ÑŒ¸¤…É”ÕÍ•…Ìµ¥Ì¸(¨9…µ•™…µ¥±¥•Ì…É”ÝÉ…ÁÁ•¥¸•Í…Á•ÅÕ½Ñ•Ì¸Q¡¥ÌÁÉ•Ù•¹ÑÌ¥¹©•Ñ¥½¸Ù¥„(¨É…™Ñ•™…±±‰…¬Ù…±Õ•Ì±¥­”€¤ìô‰½‘äì½±½ÈèÉ•ìô€¹àí€¸(¨¼)™Õ¹Ñ¥½¸Í…¹¥Ñ¥é•…±±‰…¬¡¹…µ”¤ì(%½¹ÍÐ•¹•É¥Ì€ô¹•ÜM•Ð¡l($$‰Í•É¥˜ˆ°($$‰Í…¹ÌµÍ•É¥˜ˆ°($$‰µ½¹½ÍÁ…”ˆ°($$‰ÕÉÍ¥Ù”ˆ°($$‰™…¹Ñ…Íäˆ°($$‰ÍåÍÑ•´µÕ¤ˆ°($$‰Õ¤µÍ•É¥˜ˆ°($$‰Õ¤µÍ…¹ÌµÍ•É¥˜ˆ°($$‰Õ¤µµ½¹½ÍÁ…”ˆ°($$‰Õ¤µÉ½Õ¹‘•ˆ°($$‰•µ½©¤ˆ°($$‰µ…Ñ ˆ°($$‰™…¹Í½¹œˆ(%t¤ì(%½¹ÍÐÑÉ¥µµ•€ô¹…µ”¹ÑÉ¥´ ¤ì(%¥˜€¡•¹•É¥Ì¹¡…Ì¡ÑÉ¥µµ•¤¤É•ÑÕÉ¸ÑÉ¥µµ•ì(%É•ÑÕÉ¸€œ‘í•Í…Á•MMMÑÉ¥¹œ¡ÑÉ¥µµ•¥ô€ì)ô)Ù…È¥¹©•Ñ•‘½¹ÑÌ€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ð ¤ì(¼¨¨(¨½¹Ù•ÉÐ„™½¹Ð™…µ¥±ä¹…µ”Ñ¼„MLÙ…É¥…‰±”¹…µ”¸(¨”¹œ¸°€‰%¹Ñ•Èˆ€´ø€ˆ´µ™½¹Ðµ¥¹Ñ•Èˆ°€‰I½‰½Ñ¼5½¹¼ˆ€´ø€ˆ´µ™½¹ÐµÉ½‰½Ñ¼µµ½¹¼ˆ(¨¼)™Õ¹Ñ¥½¸Ñ½Y…É9…µ”¡™…µ¥±ä¤ì(%É•ÑÕÉ¸€ˆ´µ™½¹Ð´ˆ€¬™…µ¥±ä¹Ñ½1½Ý•É…Í” ¤¹É•Á±…” ½qÌ¬½œ°€ˆ´ˆ¤ì)ô)™Õ¹Ñ¥½¸™½¹Ñ±…ÍÍM•µ•¹Ð¡™…µ¥±ä¤ì(%É•ÑÕÉ¸™…µ¥±ä¹Ñ½1½Ý•É…Í” ¤¹É•Á±…” ½my„µèÀ´å|µt¬½œ°€‰|ˆ¤¹É•Á±…” ½y|­ñ|¬½œ°€ˆˆ¤ñð€‰™½¹Ðˆì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•MÑÉ¥¹M•Ñ=ÁÑ¥½¸¡Ù…±Õ”¤ì(%¥˜€ …Ù…±Õ”¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸l¸¸¹¹•ÜM•Ð ¡ÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤€üÙ…±Õ”€èmÙ…±Õ•t¤¹µ…À ¡¥Ñ•´¤€ôø¥Ñ•´¹ÑÉ¥´ ¤¤¹™¥±Ñ•È¡	½½±•…¸¤¥t¹Í½ÉÐ ¤¹©½¥¸ ˆ°ˆ¤ì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•]•¥¡Ñ=ÁÑ¥½¸¡Ù…±Õ”¤ì(%½¹ÍÐ¹½Éµ…±¥é•€ô¹½Éµ…±¥é•MÑÉ¥¹M•Ñ=ÁÑ¥½¸¡Ù…±Õ”¤ì(%É•ÑÕÉ¸¹½Éµ…±¥é•€ôôô€‰Ù…É¥…‰±”ˆ€ü€ˆˆ€è¹½Éµ…±¥é•ì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•MÑå±•=ÁÑ¥½¸¡Ù…±Õ”¤ì(%½¹ÍÐÙ…±Õ•Ì€ô¹•ÜM•Ð ¡ÉÉ…ä¹¥ÍÉÉ…ä¡Ù…±Õ”¤€üÙ…±Õ”€èÙ…±Õ”€ümÙ…±Õ•t€èmt¤¹µ…À ¡¥Ñ•´¤€ôø¥Ñ•´¹ÑÉ¥´ ¤¤¹™¥±Ñ•È¡	½½±•…¸¤¤ì(%½¹ÍÐ¡…Í%Ñ…±¥Œ€ôÙ…±Õ•Ì¹¡…Ì ‰¥Ñ…±¥Œˆ¤ì(%½¹ÍÐ¡…Í9½Éµ…°€ôÙ…±Õ•Ì¹¡…Ì ‰¹½Éµ…°ˆ¤ì(%¥˜€ …¡…Í%Ñ…±¥Œ¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸¡…Í9½Éµ…°€ü€‰¥Ñ…±¥Œ±¹½Éµ…°ˆ€è€‰¥Ñ…±¥Œˆì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•…±±‰…­=ÁÑ¥½¸¡Ù…±Õ”¤ì(%¥˜€ …Ù…±Õ”¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸Ù…±Õ”¹µ…À ¡¥Ñ•´¤€ôø¥Ñ•´¹ÑÉ¥´ ¤¤¹©½¥¸ ˆ°ˆ¤ì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•	½½±•…¹=ÁÑ¥½¸¡Ù…±Õ”¤ì(%¥˜€¡Ù…±Õ”€ôôôÙ½¥€À¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸Ù…±Õ”€ü€ˆÄˆ€è€ˆÀˆì)ô)™Õ¹Ñ¥½¸¹½Éµ…±¥é•MÑÉ¥¹=É	½½±•…¹=ÁÑ¥½¸¡Ù…±Õ”¤ì(%¥˜€¡Ù…±Õ”€ôôôÙ½¥€À¤É•ÑÕÉ¸€ˆˆì(%É•ÑÕÉ¸ÑåÁ•½˜Ù…±Õ”€ôôô€‰‰½½±•…¸ˆ€ü¹½Éµ…±¥é•	½½±•…¹=ÁÑ¥½¸¡Ù…±Õ”¤€èÙ…±Õ”ì)ô)™Õ¹Ñ¥½¸¡…Í¡MÑÉ¥¹œ¡Ù…±Õ”¤ì(%±•Ð¡…Í €ô€ÈÄØØÄÌØÈØÄì(%™½È€¡±•Ð¤€ô€Àì¤€ðÙ…±Õ”¹±•¹Ñ ì¤¬¬¤ì($%¡…Í xôÙ…±Õ”¹¡…É½‘•Ð¡¤¤ì($%¡…Í €ô5…Ñ ¹¥µÕ°¡¡…Í °€ÄØÜÜÜØÄä¤€øøø€Àì(%ô(%É•ÑÕÉ¸¡…Í ¹Ñ½MÑÉ¥¹œ ÌØ¤¹Á…‘MÑ…ÉÐ Ü°€ˆÀˆ¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•½¹Ñ%‘•¹Ñ¥Ñä¡™…µ¥±ä°½ÁÑ¥½¹Ì°ÍÍY…É9…µ”°™…±±‰…¬¤ì(%É•ÑÕÉ¸¡…Í¡MÑÉ¥¹œ¡l($%™…µ¥±ä°($%ÍÍY…É9…µ”°($%¹½Éµ…±¥é•]•¥¡Ñ=ÁÑ¥½¸¡½ÁÑ¥½¹Ì¹Ý•¥¡Ð¤°($%¹½Éµ…±¥é•MÑå±•=ÁÑ¥½¸¡½ÁÑ¥½¹Ì¹ÍÑå±”¤°($%¹½Éµ…±¥é•MÑÉ¥¹M•Ñ=ÁÑ¥½¸¡½ÁÑ¥½¹Ì¹ÍÕ‰Í•ÑÌ¤°($%½ÁÑ¥½¹Ì¹‘¥ÍÁ±…ä€üü€‰ÍÝ…Àˆ°($%¹½Éµ…±¥é•	½½±•…¹=ÁÑ¥½¸¡½ÁÑ¥½¹Ì¹ÁÉ•±½…¤°($%¹½Éµ…±¥é•…±±‰…­=ÁÑ¥½¸¡™…±±‰…¬¤°($%¹½Éµ…±¥é•MÑÉ¥¹=É	½½±•…¹=ÁÑ¥½¸¡½ÁÑ¥½¹Ì¹…‘©ÕÍÑ½¹Ñ…±±‰…¬¤°($%¹½Éµ…±¥é•MÑÉ¥¹M•Ñ=ÁÑ¥½¸¡½ÁÑ¥½¹Ì¹…á•Ì¤°($%½ÁÑ¥½¹Ì¹}Í•±™!½ÍÑ•‘ML€üü€ˆˆ(%t¹©½¥¸ ‰pÀˆ¤¤ì)ô(¼¨¨(¨	Õ¥±„½½±”½¹ÑÌMLUI0¸(¨(¨%¸ÁÉ½‘ÕÑ¥½¸Ñ¡¥Ì½‘”Á…Ñ ¥Ì‘•…¸Q¡”‰Õ¥±Á±Õ¥¸(¨€¡Ù¥¹•áÐé½½±”µ™½¹ÑÍ€¥¸ÍÉŒ½Á±Õ¥¹Ì½™½¹ÑÌ¹ÑÍ€¤ÍÑ…Ñ¥…±±äÉ•Í½±Ù•Ì(¨•… ™½¹Ð…±°Ì…á¥ÌÙ…±Õ•Ì……¥¹ÍÐÑ¡”‰Õ¹‘±•µ•Ñ…‘…Ñ„°™•Ñ¡•ÌÑ¡”(¨½½±”½¹ÑÌML°…¹¥¹©•ÑÌÑ¡”É•ÍÕ±Ñ¥¹œML…Ì}Í•±™!½ÍÑ•‘MM€Í¼(¨Ñ¡”ÉÕ¹Ñ¥µ”¹•Ù•ÈÅÕ•É¥•Ì½½±”¸Q¡”Í¡¥´½¹±äÉ•…¡•ÌÑ¡¥Ì‰Õ¥±‘•È(¨Ý¡•¸Ñ¡”Á±Õ¥¸ÌÍÑ…Ñ¥ŒÁ…ÉÍ•È‰…¥±Ì€¡‘å¹…µ¥Œ½ÁÑ¥½¹Ì°•Ù…°µ½¹±ä(¨Í¡…Á•Ì¤°Ý¡¥ ¥Ì‘•Øµ½¹±ä¸(¨(¨Q¡”‘•Ø™…±±‰…¬¥¹Ñ•¹Ñ¥½¹…±±ä¡…Ì¹¼µ•Ñ…‘…Ñ„èÍ¡¥ÁÁ¥¹œÑ¡”€Ìàà-(¨™½¹Ðµ‘…Ñ„¹©Í½¹€Ñ¼Ñ¡”]½É­•È‰Õ¹‘±”Ý½Õ±‘Ý…É˜Ñ¡”É•ÍÐ½˜Ñ¡”Í¡¥´°(¨…¹Ñ¡”ÁÉ½‘ÕÑ¥½¸Á…Ñ …±É•…‘ä¡…ÌÑ¡”µ•Ñ…‘…Ñ„µ…Ý…É”Ù…É¥…¹Ð¸Q¡”(¨ÑÉ…‘•½™˜¥ÌÑ¡…ÐÑ¡”‘•Ø™…±±‰…¬…¹¹½ÐÉ•Í½±Ù”„Ù…É¥…‰±”™½¹ÐÌ(¨…ÑÕ…°Ý¡Ñ€…á¥ÌÉ…¹”¸%Ð•µ¥ÑÌ¹¼…á¥ÌÍ•µ•¹ÐÝ¡•¸¹¼Ý•¥¡Ñ€¥Ì(¨¥Ù•¸°Ý¡¥ µ…­•Ì½½±”É•ÑÕÉ¸Ñ¡”‘•™…Õ±ÐÍÑ…Ñ¥Œ™…”€ ÈÀÀ¤¥¹ÍÑ•…(¨½˜Ñ¡”‰É½­•¸€éÝ¡Ñ ÄÀÀ¸¸äÀÁ€UI0Ñ¡…Ð¥ÍÍÕ”€ŒààÔÉ•Á½ÉÑÌ¸(¨¼)™Õ¹Ñ¥½¸‰Õ¥±‘½½±•½¹ÑÍUÉ°¡™…µ¥±ä°½ÁÑ¥½¹Ì¤ì(%½¹ÍÐÝ•¥¡ÑÌ€ô½ÁÑ¥½¹Ì¹Ý•¥¡Ð€üÉÉ…ä¹¥ÍÉÉ…ä¡½ÁÑ¥½¹Ì¹Ý•¥¡Ð¤€ü½ÁÑ¥½¹Ì¹Ý•¥¡Ð€èm½ÁÑ¥½¹Ì¹Ý•¥¡Ñt€èmtì(%½¹ÍÐÍÑå±•Ì€ô½ÁÑ¥½¹Ì¹ÍÑå±”€üÉÉ…ä¹¥ÍÉÉ…ä¡½ÁÑ¥½¹Ì¹ÍÑå±”¤€ü½ÁÑ¥½¹Ì¹ÍÑå±”€èm½ÁÑ¥½¹Ì¹ÍÑå±•t€èmtì(%½¹ÍÐ¡…Í%Ñ…±¥Œ€ôÍÑå±•Ì¹¥¹±Õ‘•Ì ‰¥Ñ…±¥Œˆ¤ì(%½¹ÍÐ¡…Í9½Éµ…°€ôÍÑå±•Ì¹¥¹±Õ‘•Ì ‰¹½Éµ…°ˆ¤ì(%½¹ÍÐ¥Ñ…°€ô¡…Í%Ñ…±¥Œ€ül¸¸¹¡…Í9½Éµ…°€ülˆÀ‰t€èmt°€ˆÄ‰t€èÙ½¥€Àì(%½¹ÍÐ¹½Éµ…±¥é•‘]•¥¡ÑÌ€ôÝ•¥¡ÑÌ¹±•¹Ñ €ôôô€Ä€˜˜Ý•¥¡ÑÍlÁt€ôôô€‰Ù…É¥…‰±”ˆ€ümt€èÝ•¥¡ÑÌì(%É•ÑÕÉ¸‰Õ¥±‘½½±•½¹ÑÍUÉ°Ä¡™…µ¥±ä°ì($%Ý¡Ðè¹½Éµ…±¥é•‘]•¥¡ÑÌ¹±•¹Ñ €ø€À€ü¹½Éµ…±¥é•‘]•¥¡ÑÌ€è¥Ñ…°€ülˆÐÀÀ‰t€èÙ½¥€À°($%¥Ñ…°(%ô°½ÁÑ¥½¹Ì¹‘¥ÍÁ±…ä€üü€‰ÍÝ…Àˆ¤ì)ô(¼¨¨(¨%¹©•Ð„€ñ±¥¹¬øÑ…œ™½ÈÑ¡”™½¹Ð€¡±¥•¹ÐµÍ¥‘”½¹±ä¤¸(¨=¸Ñ¡”Í•ÉÙ•È°Ý”ÑÉ…¬™½¹ÐUI1Ì™½ÈMMH¡•…¥¹©•Ñ¥½¸¸(¨¼)™Õ¹Ñ¥½¸¥¹©•Ñ½¹ÑMÑå±•Í¡••Ð¡ÕÉ°¤ì(%¥˜€¡¥¹©•Ñ•‘½¹ÑÌ¹¡…Ì¡ÕÉ°¤¤É•ÑÕÉ¸ì(%¥¹©•Ñ•‘½¹ÑÌ¹…‘¡ÕÉ°¤ì(%¥˜€¡ÑåÁ•½˜‘½Õµ•¹Ð€„ôô€‰Õ¹‘•™¥¹•ˆ¤ì($%½¹ÍÐ±¥¹¬€ô‘½Õµ•¹Ð¹É•…Ñ•±•µ•¹Ð ‰±¥¹¬ˆ¤ì($%±¥¹¬¹É•°€ô€‰ÍÑå±•Í¡••Ðˆì($%±¥¹¬¹¡É•˜€ôÕÉ°ì($%‘½Õµ•¹Ð¹¡•…¹…ÁÁ•¹‘¡¥±¡±¥¹¬¤ì(%ô)ô(¼¨¨QÉ…¬Ý¡¥ ±…ÍÍ9…µ”MLÉÕ±•Ì¡…Ù”‰••¸¥¹©•Ñ•¸€¨¼)Ù…È¥¹©•Ñ•‘±…ÍÍIÕ±•Ì€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ð ¤ì(¼¨¨(¨%¹©•Ð„MLÉÕ±”Ñ¡…Ðµ…ÁÌ„±…ÍÍ9…µ”Ñ¼„™½¹Ðµ™…µ¥±ä¸(¨(¨Q¡¥Ì¥ÌÝ¡…Ðµ…­•Ì€ñ‘¥Ø±…ÍÍ9…µ”õí¥¹Ñ•È¹±…ÍÍ9…µ•ôù€…ÁÁ±äÑ¡”™½¹Ð¸(¨9•áÐ¹©Ì•¹•É…Ñ•Ì•ÅÕ¥Ù…±•¹ÐÉÕ±•Ì…Ð‰Õ¥±Ñ¥µ”¸(¨(¨%¸9•áÐ¹©Ì°Ñ¡”€¹±…ÍÍ9…µ”±…ÍÌ=91dÍ•ÑÌ™½¹Ðµ™…µ¥±äƒŠP¥Ð‘½•Ì9=P(¨Í•ÐMLÙ…É¥…‰±•Ì¸MLÙ…É¥…‰±•Ì…É”¡…¹‘±•Í•Á…É…Ñ•±ä‰äÑ¡”€¹Ù…É¥…‰±”±…ÍÌ¸(¨¼)™Õ¹Ñ¥½¸¥¹©•Ñ±…ÍÍ9…µ•IÕ±”¡±…ÍÍ9…µ”°™½¹Ñ…µ¥±ä¤ì(%¥˜€¡¥¹©•Ñ•‘±…ÍÍIÕ±•Ì¹¡…Ì¡±…ÍÍ9…µ”¤¤É•ÑÕÉ¸ì(%¥¹©•Ñ•‘±…ÍÍIÕ±•Ì¹…‘¡±…ÍÍ9…µ”¤ì(%½¹ÍÐÍÌ€ô€¸‘í±…ÍÍ9…µ•ôì™½¹Ðµ™…µ¥±äè€‘í™½¹Ñ…µ¥±åôìõq¹€ì(%¥˜€¡ÑåÁ•½˜‘½Õµ•¹Ð€ôôô€‰Õ¹‘•™¥¹•ˆ¤ì($%ÍÍÉ½¹ÑMÑå±•ÌÄ¹ÁÕÍ ¡ÍÌ¤ì($%É•ÑÕÉ¸ì(%ô(%½¹ÍÐÍÑå±”€ô‘½Õµ•¹Ð¹É•…Ñ•±•µ•¹Ð ‰ÍÑå±”ˆ¤ì(%ÍÑå±”¹Ñ•áÑ½¹Ñ•¹Ð€ôÍÌì(%ÍÑå±”¹Í•ÑÑÑÉ¥‰ÕÑ” ‰‘…Ñ„µÙ¥¹•áÐµ™½¹Ðµ±…ÍÌˆ°±…ÍÍ9…µ”¤ì(%‘½Õµ•¹Ð¹¡•…¹…ÁÁ•¹‘¡¥±¡ÍÑå±”¤ì)ô(¼¨¨QÉ…¬Ý¡¥ Ù…É¥…‰±”±…ÍÌMLÉÕ±•Ì¡…Ù”‰••¸¥¹©•Ñ•¸€¨¼)Ù…È¥¹©•Ñ•‘Y…É¥…‰±•IÕ±•Ì€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ð ¤ì(¼¨¨(¨%¹©•Ð„MLÉÕ±”Ñ¡…ÐÍ•ÑÌ„MLÙ…É¥…‰±”½¸…¸•±•µ•¹Ð¸(¨Q¡¥Ì¥ÌÝ¡…Ðµ…­•Ì€ñ¡Ñµ°±…ÍÍ9…µ”õí¥¹Ñ•È¹Ù…É¥…‰±•ôù€Í•ÐÑ¡”MLÙ…É¥…‰±”(¨Ñ¡…Ð…¸‰”É•™•É•¹•‰ä½Ñ¡•ÈÍÑå±•Ì€¡”¹œ¸°Q…¥±Ý¥¹Ì™½¹ÐµÍ…¹Ì¤¸(¨(¨%¸9•áÐ¹©Ì°Ñ¡”€¹Ù…É¥…‰±”±…ÍÌ=91dÍ•ÑÌÑ¡”MLÙ…É¥…‰±”ƒŠP¥Ð‘½•Ì9=P(¨Í•Ð™½¹Ðµ™…µ¥±ä¸Q¡¥Ì¥ÌÉ¥Ñ¥…°‰•…ÕÍ”…ÁÁÌ½µµ½¹±ä…ÁÁ±äµÕ±Ñ¥Á±”(¨€¹Ù…É¥…‰±”±…ÍÍ•ÌÑ¼€ñ‰½‘äø€¡”¹œ¸°•¥ÍÑM…¹Ì¹Ù…É¥…‰±”€¬•¥ÍÑ5½¹¼¹Ù…É¥…‰±”¤¸(¨%˜Ý”…±Í¼Í•Ð™½¹Ðµ™…µ¥±ä¡•É”°Ñ¡”±…ÍÐ±…ÍÌÝ¥¹Ì‘Õ”Ñ¼ML…Í…‘”°(¨…ÕÍ¥¹œ…±°Ñ•áÐÑ¼ÕÍ”Ñ¡…Ð™½¹Ð€¡”¹œ¸°•Ù•ÉåÑ¡¥¹œ‰•½µ•Ìµ½¹½ÍÁ…”¤¸(¨¼)™Õ¹Ñ¥½¸¥¹©•ÑY…É¥…‰±•±…ÍÍIÕ±”¡Ù…É¥…‰±•±…ÍÍ9…µ”°ÍÍY…É9…µ”°™½¹Ñ…µ¥±ä¤ì(%¥˜€¡¥¹©•Ñ•‘Y…É¥…‰±•IÕ±•Ì¹¡…Ì¡Ù…É¥…‰±•±…ÍÍ9…µ”¤¤É•ÑÕÉ¸ì(%¥¹©•Ñ•‘Y…É¥…‰±•IÕ±•Ì¹…‘¡Ù…É¥…‰±•±…ÍÍ9…µ”¤ì(%½¹ÍÐÍÌ€ô€¸‘íÙ…É¥…‰±•±…ÍÍ9…µ•ôì€‘íÍÍY…É9…µ•ôè€‘í™½¹Ñ…µ¥±åôìõq¹€ì(%¥˜€¡ÑåÁ•½˜‘½Õµ•¹Ð€ôôô€‰Õ¹‘•™¥¹•ˆ¤ì($%ÍÍÉ½¹ÑMÑå±•ÌÄ¹ÁÕÍ ¡ÍÌ¤ì($%É•ÑÕÉ¸ì(%ô(%½¹ÍÐÍÑå±”€ô‘½Õµ•¹Ð¹É•…Ñ•±•µ•¹Ð ‰ÍÑå±”ˆ¤ì(%ÍÑå±”¹Ñ•áÑ½¹Ñ•¹Ð€ôÍÌì(%ÍÑå±”¹Í•ÑÑÑÉ¥‰ÕÑ” ‰‘…Ñ„µÙ¥¹•áÐµ™½¹ÐµÙ…É¥…‰±”ˆ°Ù…É¥…‰±•±…ÍÍ9…µ”¤ì(%‘½Õµ•¹Ð¹¡•…¹…ÁÁ•¹‘¡¥±¡ÍÑå±”¤ì)ô)Ù…ÈÍÍÉ½¹ÑMÑå±•ÌÄ€ômtì(¼¨¨(¨•Ð½±±•Ñ•MMH™½¹Ð±…ÍÌÍÑå±•Ì€¡ÕÍ•‰äÑ¡”É•¹‘•É•È¤¸(¨9½Ñ”è]”‘½¸Ð±•…ÈÑ¡”…ÉÉ…åÌ‰•…ÕÍ”™½¹ÑÌ…É”±½…‘•…Ðµ½‘Õ±”¥µÁ½ÉÐ(¨Ñ¥µ”…¹¹••Ñ¼Á•ÉÍ¥ÍÐ…É½ÍÌ…±°É•ÅÕ•ÍÑÌ¥¸Ñ¡”]½É­•ÉÌ•¹Ù¥É½¹µ•¹Ð¸(¨¼)™Õ¹Ñ¥½¸•ÑMMI½¹ÑMÑå±•ÌÄ ¤ì(%É•ÑÕÉ¸l¸¸¹ÍÍÉ½¹ÑMÑå±•ÌÅtì)ô)Ù…ÈÍÍÉ½¹ÑUÉ±Ì€ômtì(¼¨¨(¨•Ð½±±•Ñ•MMH™½¹ÐUI1Ì€¡ÕÍ•‰äÑ¡”É•¹‘•É•È¤¸(¨9½Ñ”è]”‘½¸Ð±•…ÈÑ¡”…ÉÉ…åÌ‰•…ÕÍ”™½¹ÑÌ…É”±½…‘•…Ðµ½‘Õ±”¥µÁ½ÉÐ(¨Ñ¥µ”…¹¹••Ñ¼Á•ÉÍ¥ÍÐ…É½ÍÌ…±°É•ÅÕ•ÍÑÌ¥¸Ñ¡”]½É­•ÉÌ•¹Ù¥É½¹µ•¹Ð¸(¨¼)™Õ¹Ñ¥½¸•ÑMMI½¹Ñ1¥¹­Ì ¤ì(%É•ÑÕÉ¸l¸¸¹ÍÍÉ½¹ÑUÉ±Ítì)ô)Ù…ÈÍÍÉ½¹ÑAÉ•±½…‘ÌÄ€ômtì)Ù…ÈÍÍÉ½¹ÑAÉ•±½…‘!É•™Ì€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ð ¤ì(¼¨¨(¨•Ð½±±•Ñ•MMH™½¹ÐÁÉ•±½…‘…Ñ„€¡ÕÍ•‰äÑ¡”É•¹‘•É•È¤¸(¨I•ÑÕÉ¹Ì…¸…ÉÉ…ä½˜ì¡É•˜°ÑåÁ”ô½‰©•ÑÌ™½È•µ¥ÑÑ¥¹œ(¨€ñ±¥¹¬É•°ô‰ÁÉ•±½…ˆ…Ìô‰™½¹Ðˆ€¸¸¸øÑ…Ì¸(¨¼)™Õ¹Ñ¥½¸•ÑMMI½¹ÑAÉ•±½…‘ÌÄ ¤ì(%É•ÑÕÉ¸l¸¸¹ÍÍÉ½¹ÑAÉ•±½…‘ÌÅtì)ô(¼¨¨(¨•Ñ•Éµ¥¹”Ñ¡”5%5ÑåÁ”™½È„™½¹Ð™¥±”‰…Í•½¸¥ÑÌ•áÑ•¹Í¥½¸¸(¨¼)™Õ¹Ñ¥½¸•Ñ½¹Ñ5¥µ•QåÁ”¡Á…Ñ¡=ÉUÉ°¤ì(%¥˜€¡Á…Ñ¡=ÉUÉ°¹•¹‘Í]¥Ñ  ˆ¹Ý½™˜Èˆ¤¤É•ÑÕÉ¸€‰™½¹Ð½Ý½™˜Èˆì(%¥˜€¡Á…Ñ¡=ÉUÉ°¹•¹‘Í]¥Ñ  ˆ¹Ý½™˜ˆ¤¤É•ÑÕÉ¸€‰™½¹Ð½Ý½™˜ˆì(%¥˜€¡Á…Ñ¡=ÉUÉ°¹•¹‘Í]¥Ñ  ˆ¹ÑÑ˜ˆ¤¤É•ÑÕÉ¸€‰™½¹Ð½ÑÑ˜ˆì(%¥˜€¡Á…Ñ¡=ÉUÉ°¹•¹‘Í]¥Ñ  ˆ¹½Ñ˜ˆ¤¤É•ÑÕÉ¸€‰™½¹Ð½½Á•¹ÑåÁ”ˆì(%É•ÑÕÉ¸€‰™½¹Ð½Ý½™˜Èˆì)ô(¼¨¨(¨áÑÉ…Ð™½¹Ð™¥±”UI1Ì™É½´™½¹Ðµ™…”MLÉÕ±•Ì¸(¨A…ÉÍ•ÌÕÉ° œ¸¸¸œ¤É•™•É•¹•Ì™É½´Ñ¡”MLÑ•áÐ¸(¨¼)™Õ¹Ñ¥½¸•áÑÉ…Ñ½¹ÑUÉ±ÍÉ½µML¡ÍÌ¤ì(%½¹ÍÐÕÉ±Ì€ômtì(%½¹ÍÐÕÉ±I••à€ô€½ÕÉ±p¡lœ‰tü¡mxœˆ¥t¬¥lœ‰týp¤½œì(%±•Ðµ…Ñ ì(%Ý¡¥±”€ ¡µ…Ñ €ôÕÉ±I••à¹•á•Œ¡ÍÌ¤¤€„ôô¹Õ±°¤ì($%½¹ÍÐÕÉ°€ôµ…Ñ¡lÅtì($%¥˜€¡ÕÉ°€˜˜ÕÉ°¹ÍÑ…ÉÑÍ]¥Ñ  ˆ¼ˆ¤¤ÕÉ±Ì¹ÁÕÍ ¡ÕÉ°¤ì(%ô(%É•ÑÕÉ¸ÕÉ±Ìì)ô(¼¨¨(¨½±±•Ð™½¹Ð™¥±”UI1Ì™É½´Í•±˜µ¡½ÍÑ•ML™½ÈÁÉ•±½…±¥¹¬•¹•É…Ñ¥½¸¸(¨=¹±ä½±±•ÑÌ½¸Ñ¡”Í•ÉÙ•È€¡MMH¤¸•‘ÕÁ±¥…Ñ•Ì‰ä¡É•˜ÕÍ¥¹œ„M•Ð™½È< Ä¤±½½­ÕÁÌ¸(¨¼)™Õ¹Ñ¥½¸½±±•Ñ½¹ÑAÉ•±½…‘ÍÉ½µML¡ÍÌ¤ì(%¥˜€¡ÑåÁ•½˜‘½Õµ•¹Ð€„ôô€‰Õ¹‘•™¥¹•ˆ¤É•ÑÕÉ¸ì(%½¹ÍÐÕÉ±Ì€ô•áÑÉ…Ñ½¹ÑUÉ±ÍÉ½µML¡ÍÌ¤ì(%™½È€¡½¹ÍÐ¡É•˜½˜ÕÉ±Ì¤¥˜€ …ÍÍÉ½¹ÑAÉ•±½…‘!É•™Ì¹¡…Ì¡¡É•˜¤¤ì($%ÍÍÉ½¹ÑAÉ•±½…‘!É•™Ì¹…‘¡¡É•˜¤ì($%ÍÍÉ½¹ÑAÉ•±½…‘ÌÄ¹ÁÕÍ ¡ì($$%¡É•˜°($$%ÑåÁ”è•Ñ½¹Ñ5¥µ•QåÁ”¡¡É•˜¤($%ô¤ì(%ô)ô(¼¨¨QÉ…¬¥¹©•Ñ•Í•±˜µ¡½ÍÑ•™½¹Ðµ™…”‰±½­Ì€¡‘•‘ÕÁ±¥…Ñ”¤€¨¼)Ù…È¥¹©•Ñ•‘M•±™!½ÍÑ•€ô€¼¨}}AUI}|€¨¼¹•ÜM•Ð ¤ì(¼¨¨(¨%¹©•ÐÍ•±˜µ¡½ÍÑ•™½¹Ðµ™…”ML€¡™É½´Ñ¡”‰Õ¥±Á±Õ¥¸¤¸(¨Q¡¥ÌÉ•Á±…•ÌÑ¡”8€ñ±¥¹¬øÑ…œÝ¥Ñ ¥¹±¥¹”ML¸(¨¼)™Õ¹Ñ¥½¸¥¹©•ÑM•±™!½ÍÑ•‘ML¡ÍÌ¤ì(%¥˜€¡¥¹©•Ñ•‘M•±™!½ÍÑ•¹¡…Ì¡ÍÌ¤¤É•ÑÕÉ¸ì(%¥¹©•Ñ•‘M•±™!½ÍÑ•¹…‘¡ÍÌ¤ì(%½±±•Ñ½¹ÑAÉ•±½…‘ÍÉ½µML¡ÍÌ¤ì(%¥˜€¡ÑåÁ•½˜‘½Õµ•¹Ð€ôôô€‰Õ¹‘•™¥¹•ˆ¤ì($%ÍÍÉ½¹ÑMÑå±•ÌÄ¹ÁÕÍ ¡ÍÌ¤ì($%É•ÑÕÉ¸ì(%ô(%½¹ÍÐÍÑå±”€ô‘½Õµ•¹Ð¹É•…Ñ•±•µ•¹Ð ‰ÍÑå±”ˆ¤ì(%ÍÑå±”¹Ñ•áÑ½¹Ñ•¹Ð€ôÍÌì(%ÍÑå±”¹Í•ÑÑÑÉ¥‰ÕÑ” ‰‘…Ñ„µÙ¥¹•áÐµ™½¹ÐµÍ•±™¡½ÍÑ•ˆ°€‰ÑÉÕ”ˆ¤ì(%‘½Õµ•¹Ð¹¡•…¹…ÁÁ•¹‘¡¥±¡ÍÑå±”¤ì)ô)™Õ¹Ñ¥½¸É•…Ñ•½¹Ñ1½…‘•È¡™…µ¥±ä¤ì(%É•ÑÕÉ¸™Õ¹Ñ¥½¸™½¹Ñ1½…‘•È¡½ÁÑ¥½¹Ì€ôíô¤ì($%½¹ÍÐ™…±±‰…¬€ô½ÁÑ¥½¹Ì¹™…±±‰…¬€üül‰Í…¹ÌµÍ•É¥˜‰tì($%½¹ÍÐ™½¹Ñ…µ¥±ä€ô€œ‘í•Í…Á•MMMÑÉ¥¹œ¡™…µ¥±ä¥ôœ°€‘í™…±±‰…¬¹µ…À¡Í…¹¥Ñ¥é•…±±‰…¬¤¹©½¥¸ ˆ°€ˆ¥õ€ì($%½¹ÍÐ‘•™…Õ±ÑY…É9…µ”€ôÑ½Y…É9…µ”¡™…µ¥±ä¤ì($%½¹ÍÐÍÍY…É9…µ”€ô½ÁÑ¥½¹Ì¹Ù…É¥…‰±”€üÍ…¹¥Ñ¥é•MMY…É9…µ”¡½ÁÑ¥½¹Ì¹Ù…É¥…‰±”¤€üü‘•™…Õ±ÑY…É9…µ”€è‘•™…Õ±ÑY…É9…µ”ì($%½¹ÍÐ¥€ôÉ•…Ñ•½¹Ñ%‘•¹Ñ¥Ñä¡™…µ¥±ä°½ÁÑ¥½¹Ì°ÍÍY…É9…µ”°™…±±‰…¬¤ì($%½¹ÍÐ±…ÍÍM•µ•¹Ð€ô™½¹Ñ±…ÍÍM•µ•¹Ð¡™…µ¥±ä¤ì($%½¹ÍÐ±…ÍÍ9…µ”€ô}}™½¹Ñ|‘í±…ÍÍM•µ•¹Ñõ|‘í¥‘õ€ì($%½¹ÍÐÙ…É¥…‰±•±…ÍÍ9…µ”€ô}}Ù…É¥…‰±•|‘í±…ÍÍM•µ•¹Ñõ|‘í¥‘õ€ì($%¥˜€¡½ÁÑ¥½¹Ì¹}Í•±™!½ÍÑ•‘ML¤¥¹©•ÑM•±™!½ÍÑ•‘ML¡½ÁÑ¥½¹Ì¹}Í•±™!½ÍÑ•‘ML¤ì($%•±Í”ì($$%½¹ÍÐÕÉ°€ô‰Õ¥±‘½½±•½¹ÑÍUÉ°¡™…µ¥±ä°½ÁÑ¥½¹Ì¤ì($$%¥¹©•Ñ½¹ÑMÑå±•Í¡••Ð¡ÕÉ°¤ì($$%¥˜€¡ÑåÁ•½˜‘½Õµ•¹Ð€ôôô€‰Õ¹‘•™¥¹•ˆ¤ì($$$%¥˜€ …ÍÍÉ½¹ÑUÉ±Ì¹¥¹±Õ‘•Ì¡ÕÉ°¤¤ÍÍÉ½¹ÑUÉ±Ì¹ÁÕÍ ¡ÕÉ°¤ì($$%ô($%ô($%¥¹©•Ñ±…ÍÍ9…µ•IÕ±”¡±…ÍÍ9…µ”°™½¹Ñ…µ¥±ä¤ì($%¥¹©•ÑY…É¥…‰±•±…ÍÍIÕ±”¡Ù…É¥…‰±•±…ÍÍ9…µ”°ÍÍY…É9…µ”°™½¹Ñ…µ¥±ä¤ì($%É•ÑÕÉ¸ì($$%±…ÍÍ9…µ”°($$%ÍÑå±”èì™½¹Ñ…µ¥±äô°($$%Ù…É¥…‰±”èÙ…É¥…‰±•±…ÍÍ9…µ”($%ôì(%ôì)ô)Ù…È½½±•½¹ÑÌ€ô¹•ÜAÉ½áä¡íô°ì•Ð¡}Ñ…É•Ð°ÁÉ½À¤ì(%¥˜€¡ÑåÁ•½˜ÁÉ½À€„ôô€‰ÍÑÉ¥¹œˆ¤É•ÑÕÉ¸Ù½¥€Àì(%¥˜€¡ÁÉ½À€ôôô€‰}}•Í5½‘Õ±”ˆ¤É•ÑÕÉ¸ÑÉÕ”ì(%¥˜€¡ÁÉ½À€ôôô€‰‘•™…Õ±Ðˆ¤É•ÑÕÉ¸½½±•½¹ÑÌì(%É•ÑÕÉ¸É•…Ñ•½¹Ñ1½…‘•È¡ÁÉ½À¹É•Á±…” ½|½œ°€ˆ€ˆ¤¹É•Á±…” ¼¡m„µét¤¡mµit¤½œ°€ˆÄ€Èˆ¤¤ì)ôô¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í¡¥µÌ½™½¹Ðµ±½…°¹©Ì)Ù…ÈÍÍÉ½¹ÑMÑå±•Ì€ômtì)Ù…ÈÍÍÉ½¹ÑAÉ•±½…‘Ì€ômtì(¼¨¨(¨•Ð½±±•Ñ•MMH™½¹ÐÍÑå±•Ì€¡ÕÍ•‰äÑ¡”É•¹‘•É•È¤¸(¨9½Ñ”è]”‘½¸Ð±•…ÈÑ¡”…ÉÉ…åÌ‰•…ÕÍ”™½¹ÑÌ…É”±½…‘•…Ðµ½‘Õ±”¥µÁ½ÉÐ(¨Ñ¥µ”…¹¹••Ñ¼Á•ÉÍ¥ÍÐ…É½ÍÌ…±°É•ÅÕ•ÍÑÌ¥¸Ñ¡”]½É­•ÉÌ•¹Ù¥É½¹µ•¹Ð¸(¨¼)™Õ¹Ñ¥½¸•ÑMMI½¹ÑMÑå±•Ì ¤ì(%É•ÑÕÉ¸l¸¸¹ÍÍÉ½¹ÑMÑå±•Ítì)ô(¼¨¨(¨•Ð½±±•Ñ•MMH™½¹ÐÁÉ•±½…‘…Ñ„€¡ÕÍ•‰äÑ¡”É•¹‘•É•È¤¸(¨I•ÑÕÉ¹Ì…¸…ÉÉ…ä½˜ì¡É•˜°ÑåÁ”ô½‰©•ÑÌ™½È•µ¥ÑÑ¥¹œ(¨€ñ±¥¹¬É•°ô‰ÁÉ•±½…ˆ…Ìô‰™½¹Ðˆ€¸¸¸øÑ…Ì¸(¨¼)™Õ¹Ñ¥½¸•ÑMMI½¹ÑAÉ•±½…‘Ì ¤ì(%É•ÑÕÉ¸l¸¸¹ÍÍÉ½¹ÑAÉ•±½…‘Ítì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµ¡½½¬µÝ…É¹¥¹œµÍÕÁÁÉ•ÍÍ¥½¸¹©Ì)Ù…ÈÍÕÁÁÉ•ÍÍ!½½­]…É¹¥¹±Ì€ô¹•ÜÍå¹1½…±MÑ½É…”Ä ¤ì)Ù…È}½É¥½¹Í½±•ÉÉ½È€ô½¹Í½±”¹•ÉÉ½Èì)½¹Í½±”¹•ÉÉ½È€ô€ ¸¸¹…ÉÌ¤€ôøì(%¥˜€¡ÍÕÁÁÉ•ÍÍ!½½­]…É¹¥¹±Ì¹•ÑMÑ½É” ¤€ôôôÑÉÕ”€˜˜ÑåÁ•½˜…ÉÍlÁt€ôôô€‰ÍÑÉ¥¹œˆ€˜˜…ÉÍlÁt¹¥¹±Õ‘•Ì ‰%¹Ù…±¥¡½½¬…±°ˆ¤¤É•ÑÕÉ¸ì(%}½É¥½¹Í½±•ÉÉ½È¹…ÁÁ±ä¡½¹Í½±”°…ÉÌ¤ì)ôì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ•ÅÕ•ÍÐµ½¹Ñ•áÐ¹©Ì(¼¨¨(¨M•Ð¹…Ù¥…Ñ¥½¸½¹Ñ•áÐ¥¸Ñ¡”1Lµ‰…­•ÍÑ½É”¸€‰ÕÍ”±¥•¹Ðˆ½µÁ½¹•¹ÑÌ(¨É•¹‘•É•‘ÕÉ¥¹œMMH¹••Ñ¡”Á…Ñ¡¹…µ”½Í•…É¡A…É…µÌ½Á…É…µÌ‰ÕÐÑ¡”MMH(¨•¹Ù¥É½¹µ•¹Ð¡…Ì„Í•Á…É…Ñ”µ½‘Õ±”¥¹ÍÑ…¹”½˜¹•áÐ½¹…Ù¥…Ñ¥½¸¸(¨(¨±•…É¥¹œ¹…Ø½¹Ñ•áÐ€¡Ñà€ôôô¹Õ±°¤…±Í¼±•…ÉÌÉ½½ÐÁ…É…µÌ¸(¨¼)™Õ¹Ñ¥½¸Í•ÑÁÁ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡Ñà¤ì(%Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡Ñà¤ì(%¥˜€¡Ñà€ôôô¹Õ±°¤Í•ÑI½½ÑA…É…µÌ¡¹Õ±°¤ì)ô(¼¨¨(¨±•…È…±°Á•ÈµÉ•ÅÕ•ÍÐ1LÍÑ…Ñ”½Ý¹•‰äÑ¡”ÁÀI½ÕÑ•È¡…¹‘±•È¸(¨5ÕÍÐ‰”…±±•‰•™½É”É•ÑÕÉ¹¥¹œ„¹½¸µÁ…”É•ÍÁ½¹Í”€¡É•‘¥É•Ð°ÁÕ‰±¥Œ(¨™¥±”ÁÉ½áä°•ÑŒ¸¤Ñ¼ÁÉ•Ù•¹ÐÍÑ…Ñ”±•…­¥¹œ‰•ÑÝ••¸É•ÅÕ•ÍÑÌ½¸]½É­•ÉÌ¸(¨(¨±•…ÉÌè¡•…‘•ÉÌ°¹…Ù¥…Ñ¥½¸½¹Ñ•áÐ°É½½ÐÁ…É…µÌ¸(¨¼)™Õ¹Ñ¥½¸±•…ÉÁÁI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%Í•Ñ!•…‘•ÉÍ½¹Ñ•áÐ¡¹Õ±°¤ì(%Í•ÑÁÁ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ¡¹Õ±°¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í¡¥µÌ½±¥¹¬¹©Ì)Ù…È±¥¹­}‘•™…Õ±Ð€ô€¼¨}}AUI}|€¨¼É•¥ÍÑ•É±¥•¹ÑI•™•É•¹”  ¤€ôøì(%Ñ¡É½Ü¹•ÜÉÉ½È ‰U¹•áÁ•Ñ•‘±ä±¥•¹ÐÉ•™•É•¹”•áÁ½ÉÐ€‘•™…Õ±Ðœ¥Ì…±±•½¸Í•ÉÙ•Èˆ¤ì)ô°€‰ŒÈÜÐÜàààØÌÁ˜ˆ°€‰‘•™…Õ±Ðˆ¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹•ÁÑÌ¹ÑÍà)Ù…È…Ñ•½É¥•Ì€ôl(%l($$‰M¹•…­•ÉÌˆ°($$‰=Á•¸ÕÉÉ•¹Ð½±±•Ñ¥½¸ˆ°($$‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½Í¡½•Ì¼ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}…Ñ•½Éå}¥¹‘•àˆ°($$ˆÀÄˆ(%t°(%l($$‰!½½‘¥•Ìˆ°($$‰=Á•¸ÕÉÉ•¹Ð½±±•Ñ¥½¸ˆ°($$‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½¡½½‘¥•ÌµÍÝ•…Ñ•ÉÌ¼ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}…Ñ•½Éå}¥¹‘•àˆ°($$ˆÀÈˆ(%t°(%l($$‰PµM¡¥ÉÑÌˆ°($$‰=Á•¸ÕÉÉ•¹Ð½±±•Ñ¥½¸ˆ°($$‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÐµÍ¡¥ÉÑÌ¼ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}…Ñ•½Éå}¥¹‘•àˆ°($$ˆÀÌˆ(%t°(%l($$‰)…­•ÑÌˆ°($$‰=Á•¸ÕÉÉ•¹Ð½±±•Ñ¥½¸ˆ°($$‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½©…­•ÑÌ¼ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}…Ñ•½Éå}¥¹‘•àˆ°($$ˆÀÐˆ(%t°(%l($$‰	½ÑÑ½µÌˆ°($$‰=Á•¸ÕÉÉ•¹Ð½±±•Ñ¥½¸ˆ°($$‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½Á…¹ÑÌµÍ¡½ÉÑÌ¼ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}…Ñ•½Éå}¥¹‘•àˆ°($$ˆÀÔˆ(%t°(%l($$‰•ÍÍ½É¥•Ìˆ°($$‰=Á•¸ÕÉÉ•¹Ð½±±•Ñ¥½¸ˆ°($$‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½…•ÍÍ½É¥•Ì¼ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}…Ñ•½Éå}¥¹‘•àˆ°($$ˆÀØˆ(%t)tì)Ù…ÈÁÉ½‘ÕÑÌ€ôl(%ì($%¹…µ”è€‰5•ÉÑÉ„!½½‘¥”ˆ°($%…Ñ•½Éäè€‰!½½‘¥•Ìˆ°($%ÁÉ¥”è€ˆÌÄ¸ÐÐ•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀàÀØ¼Ä´ÈØÁ@ØÄØÌÀÅÔÜ¹Ý•‰Àˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌäÌ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô°(%ì($%¹…µ”è€‰…¹…‘„½½Í”MÝ•…ÑÍ¡¥ÉÐˆ°($%…Ñ•½Éäè€‰!½½‘¥•Ìˆ°($%ÁÉ¥”è€ˆÌÌ¸äÔ•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀÜÈä¼Ä´ÈØÁ äÈÄÈÐÐÔØÄÀ¹Ý•‰Àˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌàÀ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô°(%ì($%¹…µ”è€‰9¥­”MÝ•…Ñ•Èˆ°($%…Ñ•½Éäè€‰!½½‘¥•Ìˆ°($%ÁÉ¥”è€ˆÌä¸ÄÔ•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀÜÈä¼Ä´ÈØÁ äÈÄÄØÈÐØÀÄ¹©Áœˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌÜÔ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô°(%ì($%¹…µ”è€‰€˜MU@AÕ±±½Ù•ÈMÝ•…ÑÍ¡¥ÉÐˆ°($%…Ñ•½Éäè€‰!½½‘¥•Ìˆ°($%ÁÉ¥”è€ˆÔä¸ÄØ•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀÜÈä¼Ä´ÈØÁ äÈÄÄÐÐäØÄÄ¹Ý•‰Àˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌÜÐ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô°(%ì($%¹…µ”è€‰Q¡”9½ÉÑ …”½Ý¸)…­•Ðˆ°($%…Ñ•½Éäè€‰)…­•ÑÌˆ°($%ÁÉ¥”è€ˆäà¸ÌÄ•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀàÀØ¼Ä´ÈØÁ@ØÄØÍ$ÌäÔØ¹Ý•‰Àˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌäØ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô°(%ì($%¹…µ”è€‰1½Õ¥ÌYÕ¥ÑÑ½¸Y…ÉÍ¥Ñäˆ°($%…Ñ•½Éäè€‰)…­•ÑÌˆ°($%ÁÉ¥”è€ˆÐÈ¸àÔ•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀàÀØ¼Ä´ÈØÁ@ØÄØÌØÀÀÅ¹©Áœˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌäÔ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô°(%ì($%¹…µ”è€‰MÑÕÍÍä)…­•Ðˆ°($%…Ñ•½Éäè€‰)…­•ÑÌˆ°($%ÁÉ¥”è€ˆÈØ¸Ìä•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀàÀØ¼Ä´ÈØÁ@ØÄØÌÐÅ(ÄÀ¹Ý•‰Àˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌäÐ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô°(%ì($%¹…µ”è€‰I…±Á 1…ÕÉ•¸1½¹Í±••Ù”ˆ°($%…Ñ•½Éäè€‰!½½‘¥•Ìˆ°($%ÁÉ¥”è€ˆÌÐ¸ÄÀ•ÍÐ¸ˆ°($%¥µ…”è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½ÕÁ±½…‘Ì½…±±¥µœ¼ÈÀÈØÀÜÀÄ¼Ä´ÈØÁÄÄÔÐäÈÁ8à¹Ý•‰Àˆ°($%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ÌÌÐÀ¹¡Ñµ°ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}ÁÉ½‘ÕÑ}¥¹‘•àˆ°($%¡•­•è€ˆÄÈÕœ€ÈÀÈØˆ(%ô)tì)™Õ¹Ñ¥½¸½¹•ÁÑMÝ¥Ñ¡•È¡ì…Ñ¥Ù”ô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¹…Øˆ°ì($%±…ÍÍ9…µ”è€‰½¹•ÁÐµÍÝ¥Ñ¡•Èˆ°($$‰…É¥„µ±…‰•°ˆè€‰MÝ¥Ñ ‘•Í¥¸½¹•ÁÐˆ°($%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡±¥¹­}‘•™…Õ±Ð°ì($$%±…ÍÍ9…µ”è€‰ÍÝ¥Ñ¡•Èµ¡½µ”ˆ°($$%¡É•˜è€ˆ¼ˆ°($$%¡¥±‘É•¸è€‰±°½¹•ÁÑÌˆ($%ô¤°l($$$‰ˆ°($$$‰ˆ°($$$‰ˆ($%t¹µ…À ¡¥Ñ•´¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡±¥¹­}‘•™…Õ±Ð°ì($$%±…ÍÍ9…µ”è…Ñ¥Ù”€ôôô¥Ñ•´€ü€‰…Ñ¥Ù”ˆ€è€ˆˆ°($$%¡É•˜è€½½¹•ÁÐ´‘í¥Ñ•´¹Ñ½1½Ý•É…Í” ¥õ€°($$%¡¥±‘É•¸è¥Ñ•´($%ô°¥Ñ•´¤¥t(%ô¤ì)ô)™Õ¹Ñ¥½¸M•…É¡	…È¡ì±…‰•°€ô€‰M•…É ÕÉÉ•¹ÐÁÉ½‘ÕÑÌˆ°‰ÕÑÑ½¹1…‰•°€ô€‰M•…É ˆô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰™½É´ˆ°ì($%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÐµÍ•…É ˆ°($%…Ñ¥½¸è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½Í•…É ¹¡Ñµ°ˆ°($%µ•Ñ¡½è€‰•Ðˆ°($%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰±…‰•°ˆ°ì($$$%±…ÍÍ9…µ”è€‰ÍÈµ½¹±äˆ°($$$%¡Ñµ±½ÈèÁÉ½‘ÕÐµÍ•…É ´‘í±…‰•±õ€°($$$%¡¥±‘É•¸è€‰M•…É ÁÉ½‘ÕÑÌˆ($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$‰…É¥„µ¡¥‘‘•¸ˆè€‰ÑÉÕ”ˆ°($$$%¡¥±‘É•¸è€‹Š2Tˆ($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥¹ÁÕÐˆ°ì($$$%¥èÁÉ½‘ÕÐµÍ•…É ´‘í±…‰•±õ€°($$$%¹…µ”è€‰­•åÝ½É‘Ìˆ°($$$%ÑåÁ”è€‰Í•…É ˆ°($$$%Á±…•¡½±‘•Èè±…‰•°°($$$%…ÕÑ½½µÁ±•Ñ”è€‰½™˜ˆ°($$$%É•ÅÕ¥É•èÑÉÕ”($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥¹ÁÕÐˆ°ì($$$%ÑåÁ”è€‰¡¥‘‘•¸ˆ°($$$%¹…µ”è€‰¡…¹¹•±¥ˆ°($$$%Ù…±Õ”è€ˆÈˆ($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥¹ÁÕÐˆ°ì($$$%ÑåÁ”è€‰¡¥‘‘•¸ˆ°($$$%¹…µ”è€‰ÕÑµ}Í½ÕÉ”ˆ°($$$%Ù…±Õ”è€‰…±±¡¥¹…‰Õä¹É¼ˆ($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥¹ÁÕÐˆ°ì($$$%ÑåÁ”è€‰¡¥‘‘•¸ˆ°($$$%¹…µ”è€‰ÕÑµ}µ•‘¥Õ´ˆ°($$$%Ù…±Õ”è€‰É•™•ÉÉ…°ˆ($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥¹ÁÕÐˆ°ì($$$%ÑåÁ”è€‰¡¥‘‘•¸ˆ°($$$%¹…µ”è€‰ÕÑµ}…µÁ…¥¸ˆ°($$$%Ù…±Õ”è€‰É½}Í•…É ˆ($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‰ÕÑÑ½¸ˆ°ì($$$%ÑåÁ”è€‰ÍÕ‰µ¥Ðˆ°($$$%¡¥±‘É•¸èl($$$$%‰ÕÑÑ½¹1…‰•°°($$$$$ˆ€ˆ°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‹Š\ˆô¤($$$%t($$%ô¤($%t(%ô¤ì)ô)™Õ¹Ñ¥½¸AÉ½‘ÕÑ…É¡ìÁÉ½‘ÕÐ°¥¹‘•à€ô€À°µ½‘”€ô€‰„ˆ°ÍÑ…ÑÕÍ1…‰•°€ô€‰¡•­•ˆô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($%±…ÍÍ9…µ”èÁÉ½‘ÕÐµ…ÉÁÉ½‘ÕÐ´‘íµ½‘•õ€°($%¡É•˜èÁÉ½‘ÕÐ¹¡É•˜°($%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($%É•°è€‰¹½½Á•¹•Èˆ°($%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÐµ¥µ…”µÝÉ…Àˆ°($$%¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥µœˆ°ì($$$$%ÍÉŒèÁÉ½‘ÕÐ¹¥µ…”°($$$$%…±ÐèÁÉ½‘ÕÐ¹¹…µ”°($$$$%±½…‘¥¹œè€‰±…éäˆ°($$$$%Ý¥‘Ñ è€ˆØÐÀˆ°($$$$%¡•¥¡Ðè€ˆàÀÀˆ($$$%ô¤°($$$%µ½‘”€ôôô€‰„ˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$%±…ÍÍ9…µ”è€‰Ù•É¥™¥•µ‰…‘”ˆ°($$$$%¡¥±‘É•¸è€‰ÕÉ…Ñ•ˆ($$$%ô¤°($$$%µ½‘”€ôôô€‰ˆˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì($$$$%±…ÍÍ9…µ”è€‰•‘¥Ñ½É¥…°µ¹Õµ‰•Èˆ°($$$$%¡¥±‘É•¸èlˆÀˆ°¥¹‘•à€¬€Åt($$$%ô¤($$%t($%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÐµ½Áäˆ°($$%¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÐµ…Ñ•½Éäˆ°($$$$%¡¥±‘É•¸èÁÉ½‘ÕÐ¹…Ñ•½Éä($$$%ô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Ìˆ°ì¡¥±‘É•¸èÁÉ½‘ÕÐ¹¹…µ”ô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÐµ‰½ÑÑ½´ˆ°($$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÑÉ½¹œˆ°ì¡¥±‘É•¸èÁÉ½‘ÕÐ¹ÁÉ¥”ô¤°µ½‘”€ôôô€‰Œˆ€ü€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl($$$$$%ÍÑ…ÑÕÍ1…‰•°°($$$$$$ˆƒ
Ü€ˆ°($$$$$%ÁÉ½‘ÕÐ¹¡•­•($$$$%tô¤€è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰Y¥•Ü™¥¹ƒŠ\ˆô¥t($$$%ô¤($$%t($%ô¥t(%ô¤ì)ô)™Õ¹Ñ¥½¸½½Ñ•È¡ìµ½‘”ô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰™½½Ñ•Èˆ°ì($%±…ÍÍ9…µ”èÍ¥Ñ”µ™½½Ñ•È™½½Ñ•È´‘íµ½‘•õ€°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰‰É…¹µµ…É¬ˆ°($$$%¡¥±‘É•¸è€‰ˆ($$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÑÉ½¹œˆ°ì¡¥±‘É•¸è€‰	ÕäÑ±…Ìˆô¥tô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰%¹‘•Á•¹‘•¹ÐÁÉ½‘ÕÐ‘¥Í½Ù•ÉäÕ¥‘”¸9½Ð…™™¥±¥…Ñ•Ý¥Ñ ±±¡¥¹…	Õä½È…¹ä™•…ÑÕÉ•‰É…¹¸AÉ½‘ÕÐ‘•Ñ…¥±Ì…¹…Ù…¥±…‰¥±¥Ñäµ…ä¡…¹”¸ˆô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰½¹•ÁÐÁÉ•Ù¥•Üƒ
Ü€ÈÀÈØˆô¤($%t(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹•ÁÐµŒ½…ÉÑ¥±•Ì¹ÑÌ)Ù…È•¹±¥Í¡ÉÑ¥±•Ì€ôl(%ì($%Ñ¥Ñ±”è€‰!½ÜÑ¼UÍ”…¸±±¡¥¹…	ÕäMÁÉ•…‘Í¡••Ð]¥Ñ¡½ÕÐ•ÑÑ¥¹œ1½ÍÐˆ°($%Í±Õœè€‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($%‘•ÍÉ¥ÁÑ¥½¸è€‰ÁÉ…Ñ¥…°ÍåÍÑ•´™½ÈÑÕÉ¹¥¹œ„±…É”±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¥¹Ñ¼„Ù•É¥™¥•°½µÁ…É…‰±”Í¡½ÉÑ±¥ÍÐ‰•™½É”å½ÔÍÁ•¹µ½¹•ä¸ˆ°($%ÁÉ¥µ…Éå-•åÝ½Éè€‰±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ðˆ°($%Í•½¹‘…Éå-•åÝ½É‘Ìèl($$$‰	ÕäÍÁÉ•…‘Í¡••Ðˆ°($$$‰±±¡¥¹…	Õä™¥¹‘Ìˆ°($$$‰¡½ÜÑ¼ÕÍ”±±¡¥¹…	Õäˆ°($$$‰±±¡¥¹…	ÕäÁÉ½‘ÕÐ±¥¹­Ìˆ($%t°($%É•…‘Q¥µ”è€ˆäµ¥¸É•…ˆ°($%ÕÁ‘…Ñ•è€‰ÕÕÍÐ€ÄÈ°€ÈÀÈØˆ°($%¥¹ÑÉ¼èl‰±…É”ÁÉ½‘ÕÐÍÁÉ•…‘Í¡••Ð™••±ÌÕÍ•™Õ°‰•…ÕÍ”¥ÐÁÕÑÌ¡Õ¹‘É•‘Ì½ÈÑ¡½ÕÍ…¹‘Ì½˜™¥¹‘Ì¥¸½¹”Á±…”¸Q¡”ÁÉ½‰±•´¥ÌÑ¡…ÐÅÕ…¹Ñ¥Ñä…¸É•…Ñ”™…±Í”½¹™¥‘•¹”¸É½ÜÝ¥Ñ „Á¡½Ñ¼°„ÁÉ¥”…¹„±¥¹¬¥Ì¹½ÐÑ¡”Í…µ”Ñ¡¥¹œ…Ì„¡•­•ÁÉ½‘ÕÐ¸1¥ÍÑ¥¹Ì¡…¹”°Ù…É¥…¹ÑÌ…ÉÉä‘¥™™•É•¹ÐÁÉ¥•Ì°Í•±±•ÉÌÉ•Á±…”Á¡½Ñ½Ì…¹Í½µ”±¥¹­Ì•Ù•¹ÑÕ…±±äÍÑ½ÀÝ½É­¥¹œ¸Q¡”É¥¡ÐÝ…äÑ¼ÕÍ”…¸±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¥ÌÑ¡•É•™½É”¹½ÐÑ¼ÍÉ½±°Õ¹Ñ¥°Í½µ•Ñ¡¥¹œ±½½­Ì•á¥Ñ¥¹œ¸%Ð¥ÌÑ¼ÑÉ•…ÐÑ¡”Í¡••Ð…Ì„‘¥Í½Ù•Éä¥¹‘•à°Ñ¡•¸Ù•É¥™ä•… …¹‘¥‘…Ñ”‰•™½É”½É‘•É¥¹œ¸ˆ°€‰Q¡…Ð‘¥ÍÑ¥¹Ñ¥½¸µ…ÑÑ•ÉÌ‰•…ÕÍ”±±¡¥¹…	Õä‘•ÍÉ¥‰•Ì¥ÑÌÍ•ÉÙ¥”…Ì„É½ÍÌµ‰½É‘•ÈÁÕÉ¡…Í¥¹œ…•¹ä½Ù•É¥¹œÁÉ½ÕÉ•µ•¹Ð°½É‘•È™Õ±™¥±µ•¹Ð°ÅÕ…±¥Ñä¥¹ÍÁ•Ñ¥½¸°¥¹Ñ•É¹…Ñ¥½¹…°±½¥ÍÑ¥Ì…¹…™Ñ•ÈµÍ…±•ÌÍ•ÉÙ¥”¸%¸½Ñ¡•ÈÝ½É‘Ì°Ñ¡”Á±…Ñ™½É´Í¥ÑÌ‰•ÑÝ••¸„Í¡½ÁÁ•È…¹Í•±±•ÉÌ¥¸¡¥¹„¸ÍÁÉ•…‘Í¡••Ð…¸¡•±Àå½Ô‘¥Í½Ù•È…¸¥Ñ•´°‰ÕÐÑ¡”±¥Ù”±¥ÍÑ¥¹œ°½É‘•ÈÉ•½É°Ý…É•¡½ÕÍ”Á¡½Ñ½Ì…¹ÕÉÉ•¹ÐÁ…É•°ÅÕ½Ñ”…É”Ñ¡”É•½É‘ÌÑ¡…Ðµ…ÑÑ•È…Ð±…Ñ•ÈÍÑ…•Ì¸Q¡¥ÌÕ¥‘”¥Ù•Ìå½Ô„É•Á•…Ñ…‰±”Ý…äÑ¼µ½Ù”™É½´‘¥Í½Ù•ÉäÑ¼„Í•¹Í¥‰±”Í¡½ÉÑ±¥ÍÐÝ¥Ñ¡½ÕÐ½¹™ÕÍ¥¹œ…¸½±ÍÁÉ•…‘Í¡••Ð•¹ÑÉäÝ¥Ñ „±¥Ù”½™™•È¸‰t°($%Í•Ñ¥½¹Ìèl($$%ì($$$%¡•…‘¥¹œè€‰MÑ…ÉÐÝ¥Ñ Ñ¡”Í•…É ¥¹Ñ•¹Ð°¹½ÐÑ¡”‰¥•ÍÐ…Ñ•½Éäˆ°($$$%Á…É…É…Á¡Ìèl‰	•™½É”½Á•¹¥¹œÑ•¸Ñ…‰Ì°ÝÉ¥Ñ”‘½Ý¸Ý¡…Ðå½Ô…É”…ÑÕ…±±äÑÉå¥¹œÑ¼™¥¹¸ÕÍ•™Õ°Í•…É ‰É¥•˜¥¹±Õ‘•ÌÑ¡”ÁÉ½‘ÕÐÑåÁ”°…•ÁÑ…‰±”ÁÉ¥”É…¹”°ÁÉ•™•ÉÉ•½±½ÕÈ°É•ÅÕ¥É•Í¥é”½Èµ•…ÍÕÉ•µ•¹ÑÌ°…¹Ñ¡”‘•Ñ…¥±ÌÑ¡…ÐÝ½Õ±µ…­”å½ÔÉ•©•ÐÑ¡”¥Ñ•´¸½È„©…­•Ð°Ñ¡…Ðµ¥¡Ðµ•…¸„ÍÁ•¥™¥Œ¡•ÍÐÝ¥‘Ñ °„é¥À±½ÍÕÉ”…¹„Ñ½Ñ…°¥Ñ•´‰Õ‘•Ð‰•±½Ü„¡½Í•¸…µ½Õ¹Ð¸½ÈÍ¡½•Ì°¥Ðµ…äµ•…¸¥¹Í½±”±•¹Ñ °½±½ÕÈ…¹ÕÁÁ•Èµ…Ñ•É¥…°¸Q¡¥Ì‰É¥•˜ÁÉ•Ù•¹ÑÌ„½µµ½¸ÍÁÉ•…‘Í¡••ÐÁÉ½‰±•´è½µÁ…É¥¹œÁÉ½‘ÕÑÌÑ¡…Ð½¹±ä±½½¬Í¥µ¥±…È¥¸Ñ¡Õµ‰¹…¥°™½É´‰ÕÐ…É”¹½ÐÍÕ‰ÍÑ¥ÑÕÑ•Ì™½È½¹”…¹½Ñ¡•È¸ˆ°€‰UÍ”…Ñ•½ÉäÁ…•ÌÑ¼É•‘Õ”Ñ¡”™¥•±°Ñ¡•¸ÕÍ”‘•ÍÉ¥ÁÑ¥Ù”ÅÕ•É¥•ÌÉ…Ñ¡•ÈÑ¡…¸½¹±ä‰É…¹¹…µ•Ì¸Q•ÉµÌÍÕ …ÌƒŠq¡•…ÙåÝ•¥¡Ðé¥À¡½½‘¥”³ŠtƒŠqÝ¥‘”µ±•œÑÉ½ÕÍ•ÉÏŠt½ÈƒŠq±•…Ñ¡•ÈÉ½ÍÍ‰½‘ä‰…ŸŠt‘•ÍÉ¥‰”Ñ¡”½¹ÍÑÉÕÑ¥½¸å½ÔÝ…¹Ð…¹…¸ÍÕÉ™…”…±Ñ•É¹…Ñ¥Ù•Ì¸Q¡”ÍÁÉ•…‘Í¡••ÐÍ¡½Õ±Í¡½ÉÑ•¸É•Í•…É °¹½Ð‘•¥‘”Ñ…ÍÑ”™½Èå½Ô¸%˜•Ù•ÉäÉ•ÍÕ±Ð¥Ì©Õ‘•……¥¹ÍÐÑ¡”Í…µ”ÝÉ¥ÑÑ•¸‰É¥•˜°„±½Ý•ÈµÁÉ¥•¥Ñ•´…¹¹½ÐÝ¥¸µ•É•±ä‰•…ÕÍ”¥Ð…ÁÁ•…É•™¥ÉÍÐ¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰U¹‘•ÉÍÑ…¹Ý¡…Ð„ÍÁÉ•…‘Í¡••ÐÉ½Ü…¸…¹…¹¹½ÐÁÉ½Ù”ˆ°($$$%Á…É…É…Á¡Ìèl‰½½É½Ü…¸Ñ•±°å½ÔÑ¡…Ð„ÁÉ½‘ÕÐÝ…Ì™½Õ¹…Ð„Á…ÉÑ¥Õ±…ÈUI0°Ý…ÌÁ±…•¥¸„…Ñ•½Éä…¹¡…„‘¥ÍÁ±…å•ÁÉ¥”Ý¡•¸Ñ¡”¥¹‘•àÝ…Ì¡•­•¸%Ðµ…ä…±Í¼Í¡½Ü„ÁÉ•Ù¥•Ü¥µ…”¸%Ð¹½Éµ…±±ä…¹¹½ÐÁÉ½Ù”ÕÉÉ•¹ÐÍÑ½¬°Ñ¡”ÁÉ¥”½˜•Ù•Éä½±½ÕÈ½ÈÍ¥é”°µ…Ñ•É¥…°ÅÕ…±¥Ñä°Í•±±•ÈÁ•É™½Éµ…¹”°™¥¹…°Á…­•Ý•¥¡Ð½È¥¹Ñ•É¹…Ñ¥½¹…°Í¡¥ÁÁ¥¹œ½ÍÐ¸Q¡½Í”™…ÑÌ•¥Ñ¡•È¡…¹”½Ù•ÈÑ¥µ”½È‰•½µ”…Ù…¥±…‰±”½¹±ä…™Ñ•È…¸½É‘•ÈÉ•…¡•Ì±…Ñ•ÈÍÑ…•Ì¸ˆ°€‰QÉ•…ÐÑ¡”É½Ü…Ì„Á½¥¹Ñ•È°¹½Ð„Õ…É…¹Ñ•”¸=Á•¸Ñ¡”•á…ÐÁÉ½‘ÕÐÁ…”…¹½µÁ…É”Ñ¡”ÁÉ½‘ÕÐÑ¥Ñ±”°Í•±•Ñ•Ù…É¥…¹Ð°Í•±±•È¥¹™½Éµ…Ñ¥½¸°‘½µ•ÍÑ¥Œ‘•±¥Ù•ÉäÑ•ÉµÌ…¹±¥Ù”ÁÉ¥”Ý¥Ñ Ñ¡”ÍÁÉ•…‘Í¡••Ð•¹ÑÉä¸%˜Ñ¡”±¥Ù”Á…”…¹Ñ¡”É½Ü‘¥Í…É•”°Ñ¡”±¥Ù”Á…”Ñ…­•ÌÁÉ¥½É¥Ñä¸%˜Ñ¡”±¥¹¬½Á•¹Ì„‘¥™™•É•¹ÐÁÉ½‘ÕÐ°„•¹•É¥ŒÍ•…É Á…”½È…¸Õ¹…Ù…¥±…‰±”±¥ÍÑ¥¹œ°É•µ½Ù”¥Ð™É½´Ñ¡”Í¡½ÉÑ±¥ÍÐ¸‰É½­•¸Í¡½ÉÑÕÐÍ¡½Õ±¹•Ù•È‰•½µ”„É•…Í½¸Ñ¼¥µÁÉ½Ù¥Í”Ý¥Ñ …¸Õ¹­¹½Ý¸ÍÕ‰ÍÑ¥ÑÕÑ”¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰	Õ¥±„Í¡½ÉÑ±¥ÍÐÑ¡…Ð…¸‰”½µÁ…É•™…¥É±äˆ°($$$%Á…É…É…Á¡Ìèl‰1¥µ¥ÐÑ¡”™¥ÉÍÐÍ¡½ÉÑ±¥ÍÐÑ¼Ñ¡É•”Ñ¼™¥Ù”…¹‘¥‘…Ñ•ÌÁ•ÈÁÉ½‘ÕÐÑåÁ”¸5½É”¡½¥•ÌÉ…É•±ä¥µÁÉ½Ù”Ñ¡”‘•¥Í¥½¸½¹”Ñ¡”¥µÁ½ÉÑ…¹Ð…ÑÑÉ¥‰ÕÑ•Ì…É”Ù¥Í¥‰±”¸I•½ÉÑ¡”±¥Ù”¥Ñ•´ÁÉ¥”°Ù…É¥…¹Ð°Í•±±•È°…Ù…¥±…‰±”µ•…ÍÕÉ•µ•¹ÑÌ°‘½µ•ÍÑ¥ŒÍ¡¥ÁÁ¥¹œ¡…É”¥˜Í¡½Ý¸°…¹Ñ¡”‘…Ñ”¡•­•¸‘„¹½Ñ•Ì½±Õµ¸™½ÈÕ¹±•…È‘•Ñ…¥±Ì¸Q¡¥ÌÍµ…±°½µÁ…É¥Í½¸Ñ…‰±”¥Ìµ½É”ÕÍ•™Õ°Ñ¡…¸Í…Ù¥¹œÑÝ•¹ÑäÍÉ••¹Í¡½ÑÌ‰•…ÕÍ”¥Ð™½É•Ì•… …¹‘¥‘…Ñ”¥¹Ñ¼Ñ¡”Í…µ”ÍÑÉÕÑÕÉ”¸ˆ°€‰¼¹½ÐÉ…¹¬‰ä¥Ñ•´ÁÉ¥”…±½¹”¸Í±¥¡Ñ±äµ½É”•áÁ•¹Í¥Ù”±¥ÍÑ¥¹œÝ¥Ñ ±•…Èµ•…ÍÕÉ•µ•¹ÑÌ…¹½¹Í¥ÍÑ•¹ÐÁ¡½Ñ½Ìµ…ä‰”•…Í¥•ÈÑ¼•Ù…±Õ…Ñ”Ñ¡…¸„¡•…Á•È±¥ÍÑ¥¹œÝ¥Ñ Ù…Õ”½ÁÑ¥½¹Ì¸½¹Ù•ÉÍ•±ä°Á½±¥Í¡•¥µ…•Ì‘¼¹½ÐÁÉ½Ù”ÅÕ…±¥Ñä¸Q¡”½…°¥Ì¹½ÐÑ¼…Ý…É„Ý¥¹¹•È¥µµ•‘¥…Ñ•±äì¥Ð¥ÌÑ¼¥‘•¹Ñ¥™äÝ¡¥ …¹‘¥‘…Ñ”ÍÕÁÁ±¥•Ì•¹½Õ ¥¹™½Éµ…Ñ¥½¸Ñ¼©ÕÍÑ¥™ä…¸½É‘•È…¹Ý¡¥ ÅÕ•ÍÑ¥½¹ÌµÕÍÐ‰”…¹ÍÝ•É•±…Ñ•ÈÑ¡É½Õ Ñ¡”ÁÕÉ¡…Í¥¹œ½ÈÝ…É•¡½ÕÍ”ÁÉ½•ÍÌ¸‰t°($$$%¡•­±¥ÍÐèl($$$$$‰á…ÐÑ¥Ñ±”…¹±¥Ù”UI0ˆ°($$$$$‰¡½Í•¸½±½ÕÈ°Í¥é”…¹Ù…É¥…¹ÐÁÉ¥”ˆ°($$$$$‰M•±±•È…¹‘½µ•ÍÑ¥ŒÍ¡¥ÁÁ¥¹œ¥¹™½Éµ…Ñ¥½¸ˆ°($$$$$‰5•…ÍÕÉ•µ•¹ÑÌ½ÈÍ¥é”¡…ÉÐˆ°($$$$$‰EÕ•ÍÑ¥½¹ÌÑ¼Ù•É¥™ä¥¸Ý…É•¡½ÕÍ”Á¡½Ñ½Ìˆ($$$%t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰I•…ÁÉ¥•Ì…ÌÁÉ•Ù¥•ÝÌ°¹½Ð™¥¹…°Ñ½Ñ…±Ìˆ°($$$%Á…É…É…Á¡Ìèl‰MÁÉ•…‘Í¡••ÐÁÉ¥•Ì…É”ÕÍ•™Õ°™½ÈÉ½Õ ½µÁ…É¥Í½¸°‰ÕÐÑ¡•ä…É”É…É•±äÑ¡”½µÁ±•Ñ”±…¹‘•½ÍÐ¸±¥ÍÑ¥¹œ…¸ÕÍ”„±½Ü‘•™…Õ±ÐÁÉ¥”Ý¡¥±”„±…É•ÈÍ¥é”°‘¥™™•É•¹Ðµ…Ñ•É¥…°½ÈÁÉ•µ¥Õ´Ù•ÉÍ¥½¸½ÍÑÌµ½É”¸ÕÉÉ•¹ä½¹Ù•ÉÍ¥½¸…±Í¼¡…¹•ÌÑ¡”‘¥ÍÁ±…å••ÅÕ¥Ù…±•¹Ð¸™Ñ•ÈÑ¡”¥Ñ•´ÁÕÉ¡…Í”½µ”½Ñ¡•ÈÁ½ÍÍ¥‰±”½ÍÐ±…å•ÉÌè‘½µ•ÍÑ¥ŒÍ¡¥ÁÁ¥¹œÑ¼Ñ¡”Ý…É•¡½ÕÍ”°½ÁÑ¥½¹…°Í•ÉÙ¥•Ì°Á…­¥¹œ¡½¥•Ì°¥¹Ñ•É¹…Ñ¥½¹…°ÑÉ…¹ÍÁ½ÉÐ…¹‘•ÍÑ¥¹…Ñ¥½¸µ½Õ¹ÑÉäÑ…á•Ì½È…ÉÉ¥•È¡…É•ÌÝ¡•É”…ÁÁ±¥…‰±”¸ˆ°€‰-••ÀÑÝ¼‰Õ‘•ÑÌ™É½´Ñ¡”ÍÑ…ÉÐ¸Q¡”™¥ÉÍÐ¥ÌÑ¡”¥Ñ•´µÍÑ…”‰Õ‘•Ðè½½‘Ì°Í•±•Ñ•Ù…É¥…¹ÑÌ…¹…¹ä‘½µ•ÍÑ¥Œ¡…É•ÌÙ¥Í¥‰±”…Ð½É‘•ÈÑ¥µ”¸Q¡”Í•½¹¥Ì„Á…É•°É•Í•ÉÙ”™½È¥¹Ñ•É¹…Ñ¥½¹…°‘•±¥Ù•Éä…¹Á½ÍÍ¥‰±”‘•ÍÑ¥¹…Ñ¥½¸¡…É•Ì¸±±¡¥¹…	ÕäÁÉ½Ù¥‘•Ì„Í¡¥ÁÁ¥¹œ…±Õ±…Ñ½È°‰ÕÐ¥ÑÌ½Ý¸™½É´É•ÅÕ¥É•Ì‘•ÍÑ¥¹…Ñ¥½¸°ÁÉ½‘ÕÐ…Ñ•½Éä°•ÍÑ¥µ…Ñ•Ý•¥¡Ð…¹½ÁÑ¥½¹…°Á…­•‘¥µ•¹Í¥½¹Ì¸Q¡…Ð‘•Í¥¸¥Ì„É•µ¥¹‘•ÈÑ¡…Ð„Ñ¡Õµ‰¹…¥°ÁÉ¥”…¹¹½ÐÁÉ•‘¥Ð„Á…É•°Ñ½Ñ…°¸UÍ”•ÍÑ¥µ…Ñ•Ì™½ÈÁ±…¹¹¥¹œ…¹Ñ¡”±¥Ù”ÅÕ½Ñ”™½ÈÑ¡”‘•¥Í¥½¸¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰UÍ”Ý…É•¡½ÕÍ”¥¹ÍÁ•Ñ¥½¸…Ì„‘•¥Í¥½¸…Ñ”ˆ°($$$%Á…É…É…Á¡Ìèl‰±±¡¥¹…	ÕçŠeÌ½™™¥¥…°…ÁÀ‘•ÍÉ¥ÁÑ¥½¸¥¹±Õ‘•ÌÅÕ…±¥Ñä¥¹ÍÁ•Ñ¥½¸…µ½¹œ¥ÑÌÍ•ÉÙ¥•Ì¸Q¡…Ðµ…­•ÌÑ¡”Ý…É•¡½ÕÍ”ÍÑ…”µ½É”Ñ¡…¸„Ý…¥Ñ¥¹œÉ½½´¸]¡•¸Á¡½Ñ½Ì‰•½µ”…Ù…¥±…‰±”°½µÁ…É”Ñ¡”É••¥Ù•¥Ñ•´Ý¥Ñ Ñ¡”•á…ÐÙ…É¥…¹Ð¥¸å½ÕÈ½É‘•ÈÉ•½É¸¡•¬½±½ÕÈ°Í¥é”±…‰•°°Ù¥Í¥‰±”Í¡…Á”°™É½¹Ð…¹‰…¬°±½ÍÕÉ•Ì°ÍÑ¥Ñ¡¥¹œ°ÁÉ¥¹ÐÁ±…•µ•¹Ð…¹…¹ä¥¹±Õ‘•Á…ÉÑÌ¸%˜µ•…ÍÕÉ•µ•¹ÑÌµ…ÑÑ•È°½µÁ…É”„ÉÕ±•ÈÁ¡½Ñ¼Ý¥Ñ „Ý•±°µ™¥ÑÑ¥¹œ¥Ñ•´å½Ô…±É•…‘ä½Ý¸É…Ñ¡•ÈÑ¡…¸É•±å¥¹œ½¹±ä½¸Ñ¡”ÁÉ¥¹Ñ•Í¥é”¸ˆ°€‰EÁ¡½Ñ½ÌÉ•‘Õ”Õ¹•ÉÑ…¥¹Ñä…‰½ÕÐÙ¥Í¥‰±”™•…ÑÕÉ•Ì°‰ÕÐÑ¡•ä‘¼¹½ÐÁÉ½Ù”½µ™½ÉÐ°™…‰É¥Œ½µÁ½Í¥Ñ¥½¸°‘ÕÉ…‰¥±¥Ñä°¥¹Ñ•É¹…°½¹ÍÑÉÕÑ¥½¸½È…ÕÑ¡•¹Ñ¥¥Ñä¸1¥¡Ñ¥¹œ…¹…µ•É„…¹±”…¸…±Í¼¡…¹”¡½Ü½±½ÕÈ…¹ÁÉ½Á½ÉÑ¥½¹Ì…ÁÁ•…È¸•¥‘”Ý¡…Ð…¸‰”…•ÁÑ•°Ý¡…Ð¹••‘Ì…¹½Ñ¡•ÈÁ¡½Ñ¼°…¹Ý¡…Ð¥Ì„É•…Í½¸Ñ¼½¹Ñ…ÐÍÕÁÁ½ÉÐ‰•™½É”¥¹Ñ•É¹…Ñ¥½¹…°Í¡¥ÁÁ¥¹œ¸=¹”„Á…É•°±•…Ù•ÌÑ¡”Ý…É•¡½ÕÍ”°½ÉÉ•Ñ¥¹œ„Í•±±•ÈµÍ¥‘”ÁÉ½‰±•´¥Ì¹½Éµ…±±ä¡…É‘•È…¹µ½É”•áÁ•¹Í¥Ù”¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰I•©•Ð½µµ½¸ÍÁÉ•…‘Í¡••ÐÍ¡½ÉÑÕÑÌˆ°($$$%Á…É…É…Á¡Ìèl‰Q¡”™¥ÉÍÐÍ¡½ÉÑÕÐ¥Ì…ÍÍÕµ¥¹œ„¡¥ µ…Ñ Í½É”°ƒŠqÙ•É¥™¥•“Št±…‰•°½ÈÁ½ÁÕ±…ÈÁ½Í¥Ñ¥½¸µ•…¹ÌÑ¡”ÁÉ½‘ÕÐ¡…Ì‰••¸Á¡åÍ¥…±±äÑ•ÍÑ•‰äÑ¡”¥¹‘•à½Ý¹•È¸U¹±•ÍÌÑ¡”µ•Ñ¡½‘½±½ä¥Ì±•…É±ä•áÁ±…¥¹•°Ñ¡½Í”±…‰•±ÌÍ¡½Õ±‰”ÑÉ•…Ñ•…ÌÕÉ…Ñ¥½¸Í¥¹…±Ì½¹±ä¸Q¡”Í•½¹Í¡½ÉÑÕÐ¥Ì½É‘•É¥¹œÍ•Ù•É…°¹•…Èµ¥‘•¹Ñ¥…°¥Ñ•µÌ‰•…ÕÍ”•… ±½½­Ì¥¹•áÁ•¹Í¥Ù”¸½¹Í½±¥‘…Ñ¥½¸…¸É•‘Õ”É•Á•…Ñ•™¥á•½ÍÑÌ°‰ÕÐ•áÑÉ„Ý•¥¡Ð…¹Ù½±Õµ”ÍÑ¥±°µ…ÑÑ•È°…¹½¹”‰Õ±­ä¥Ñ•´…¸¡…¹”…Ù…¥±…‰±”Í¡¥ÁÁ¥¹œ½ÁÑ¥½¹Ì¸ˆ°€‰Q¡”Ñ¡¥ÉÍ¡½ÉÑÕÐ¥Ì½Áå¥¹œÕÍÑ½µ•È½µµ•¹ÑÌÝ¥Ñ¡½ÕÐ½¹Ñ•áÐ¸É•Ù¥•Üµ…ä‘•ÍÉ¥‰”„‘¥™™•É•¹Ð‰…Ñ °Í¥é”°‘•ÍÑ¥¹…Ñ¥½¸°Í¡¥ÁÁ¥¹œ±¥¹”½ÈÑ¥µ”Á•É¥½¸%Ð…¸É•Ù•…°ÅÕ•ÍÑ¥½¹ÌÝ½ÉÑ …Í­¥¹œ°‰ÕÐ¥Ð…¹¹½ÐÉ•Á±…”„¡•¬½˜å½ÕÈ½Ý¸±¥ÍÑ¥¹œ…¹Á…É•°¸¥¹…±±ä°‘¼¹½Ð…ÍÍÕµ”…¸½±ÍÉ••¹Í¡½ÐÁÉ½Ù•Ì„ÕÉÉ•¹ÐÁÉ½µ½Ñ¥½¸°½ÕÁ½¸°É½ÕÑ”½ÈÉ•ÑÕÉ¸ÉÕ±”¸Q¥µ”µÍ•¹Í¥Ñ¥Ù”±…¥µÌÍ¡½Õ±…±Ý…åÌ‰”Ù•É¥™¥•¥¹Í¥‘”Ñ¡”ÕÉÉ•¹ÐÁ±…Ñ™½É´¥¹Ñ•É™…”‰•™½É”Á…åµ•¹Ð¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰½±±½Ü½¹”É•Á•…Ñ…‰±”Ý½É­™±½Üˆ°($$$%Á…É…É…Á¡Ìèl‰‘•Á•¹‘…‰±”Ý½É­™±½Ü¡…Ì™¥Ù”…Ñ•Ì¸¥Í½Ù•ÈÁÉ½‘ÕÑÌÑ¡É½Õ Ñ¡”ÍÁÉ•…‘Í¡••Ð¸Y•É¥™äÑ¡”±¥Ù”±¥ÍÑ¥¹œ…¹¡½Í•¸Ù…É¥…¹Ð¸I•½É„Íµ…±°Í¡½ÉÑ±¥ÍÐÕÍ¥¹œ½¹Í¥ÍÑ•¹Ð™¥•±‘Ì¸%¹ÍÁ•ÐÑ¡”É••¥Ù•¥Ñ•´Ý¡¥±”¥Ð¥ÌÍÑ¥±°¥¸Ñ¡”Ý…É•¡½ÕÍ”¸Q¡•¸½µÁ…É”Ñ¡”ÕÉÉ•¹ÐÁ…É•°½ÁÑ¥½¹ÌÕÍ¥¹œÉ•…°É•½É‘•Ý•¥¡Ð…¹‘¥µ•¹Í¥½¹Ì¸Ð•Ù•Éä…Ñ”°É•µ½Ù”…¹‘¥‘…Ñ•ÌÑ¡…Ð‘¼¹½ÐÍÕÁÁ±ä•¹½Õ ¥¹™½Éµ…Ñ¥½¸¥¹ÍÑ•…½˜…ÉÉå¥¹œÕ¹•ÉÑ…¥¹Ñä™½ÉÝ…É¸ˆ°€‰Q¡¥Ìµ•Ñ¡½µ…ä™••°Í±½Ý•ÈÑ¡…¸±¥­¥¹œÑ¡”™¥ÉÍÐ…ÑÑÉ…Ñ¥Ù”…É°‰ÕÐ¥ÐÕÍÕ…±±äÍ…Ù•ÌÑ¥µ”‰•…ÕÍ”•… ‘•¥Í¥½¸¡…Ì„ÁÕÉÁ½Í”¸%Ð…±Í¼ÁÉ½‘Õ•Ì‰•ÑÑ•ÈÍ•…É ‰•¡…Ù¥½ÕÈèå½ÔÍÑ½À‰É½ÝÍ¥¹œ•¹•É¥ŒƒŠq‰•ÍÐ™¥¹‘ÏŠtÁ…•Ì…¹ÍÑ…ÉÐ±½½­¥¹œ™½ÈÍÁ•¥™¥Œ½¹ÍÑÉÕÑ¥½¸°µ•…ÍÕÉ•µ•¹Ð°E…¹Í¡¥ÁÁ¥¹œ…¹ÍÝ•ÉÌ¸Q¡…Ð¥Ì•á…Ñ±ä¡½Ü„ÍÁÉ•…‘Í¡••Ð‰•½µ•Ì„ÕÍ•™Õ°Í¡½ÁÁ¥¹œÑ½½°É…Ñ¡•ÈÑ¡…¸…¸•¹‘±•ÍÌ™••¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰¥¹…°ÁÉ”µ½É‘•È¡•­±¥ÍÐˆ°($$$%Á…É…É…Á¡Ìèl‰	•™½É”Á±…¥¹œ…¸½É‘•È°½¹™¥É´Ñ¡…ÐÑ¡”UI0ÍÑ¥±°½Á•¹ÌÑ¡”¥¹Ñ•¹‘•±¥ÍÑ¥¹œ°Ñ¡”Í•±•Ñ•Ù…É¥…¹Ð¥Ì½ÉÉ•Ð°Ñ¡”±¥Ù”ÁÉ¥”¥Ì…•ÁÑ…‰±”…¹Ñ¡”Í¥é”‘•¥Í¥½¸¥Ì‰…Í•½¸µ•…ÍÕÉ•µ•¹ÑÌÝ¡•É”…Ù…¥±…‰±”¸M…Ù”Ñ¡”ÁÉ½‘ÕÐÉ•½É…¹¹½Ñ”Ñ¡”‘…Ñ”¡•­•¸•¥‘”Ý¡¥ Ù¥Í¥‰±”‘•Ñ…¥±ÌµÕÍÐ‰”½¹™¥Éµ•¥¸Ý…É•¡½ÕÍ”Á¡½Ñ½Ì¸¥¹…±±ä°­••À•¹½Õ ‰Õ‘•Ð½ÕÑÍ¥‘”Ñ¡”¥Ñ•´ÁÉ¥”™½ÈÁ…É•°½ÍÑÌì‘¼¹½ÐÍÁ•¹Ñ¡”•¹Ñ¥É”‰Õ‘•Ð…ÐÑ¡”ÁÉ½‘ÕÐÍÑ…”¸ˆ°€‰Q¡”‰•ÍÐ±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¥Ì¹½Ð¹••ÍÍ…É¥±äÑ¡”½¹”Ý¥Ñ Ñ¡”±…É•ÍÐ¹Õµ‰•È¥¸¥ÑÌ¡•…‘±¥¹”¸%Ð¥ÌÑ¡”½¹”Ñ¡…Ð¡•±ÁÌå½ÔÉ•… „Íµ…±±•È°±•…É•È…¹ÕÉÉ•¹Ñ±äÙ•É¥™¥…‰±”Í•Ð½˜¡½¥•Ì¸UÍ”Ñ¡”‘…Ñ…‰…Í”™½È‘¥Í½Ù•Éä°Ñ¡”±¥Ù”±¥ÍÑ¥¹œ™½ÈÑ¡”½É‘•È°Ñ¡”Ý…É•¡½ÕÍ”É•½É™½È¥¹ÍÁ•Ñ¥½¸…¹Ñ¡”±¥Ù”Í¡¥ÁÁ¥¹œÅÕ½Ñ”™½ÈÁ…É•°Á±…¹¹¥¹œ¸… Í½ÕÉ”…¹ÍÝ•ÉÌ„‘¥™™•É•¹ÐÅÕ•ÍÑ¥½¸°…¹ÑÉ•…Ñ¥¹œÑ¡•´Ñ¡…ÐÝ…ä¥ÌÑ¡”Í¥µÁ±•ÍÐÁÉ½Ñ•Ñ¥½¸……¥¹ÍÐ½ÕÑ‘…Ñ•±¥¹­Ì…¹Õ¹É•…±¥ÍÑ¥ŒÑ½Ñ…±Ì¸‰t($$%ô($%t°($%Í½ÕÉ•9½Ñ”è€‰I•Í•…É ‰…Í¥Ìè±±¡¥¹…	Õä½™™¥¥…°Ý•‰Í¥Ñ”…¹Í¡¥ÁÁ¥¹œ…±Õ±…Ñ½È°Á±ÕÌÑ¡”½™™¥¥…°±±¡¥¹…	Õä…ÁÀ‘•ÍÉ¥ÁÑ¥½¸½¸½½±”A±…äì¡•­•ÕÕÍÐ€ÄÈ°€ÈÀÈØ¸Y…É¥…‰±”ÁÉ¥•Ì°É½ÕÑ•Ì°ÁÉ½µ½Ñ¥½¹Ì…¹Á½±¥¥•ÌÍ¡½Õ±‰”É•¡•­•¥¸Ñ¡”±¥Ù”Á±…Ñ™½É´¥¹Ñ•É™…”¸ˆ(%ô°(%ì($%Ñ¥Ñ±”è€‰±±¡¥¹…	ÕäEA¡½Ñ½Ìè¥Ù”µ5¥¹ÕÑ”%¹ÍÁ•Ñ¥½¸I½ÕÑ¥¹”ˆ°($%Í±Õœè€‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($%‘•ÍÉ¥ÁÑ¥½¸è€‰ÁÉ…Ñ¥…°±±¡¥¹…	ÕäEÁ¡½Ñ¼¡•­±¥ÍÐ™½È½¹™¥Éµ¥¹œÑ¡”¥Ñ•´°¡•­¥¹œµ•…ÍÕÉ•µ•¹ÑÌ…¹ÍÁ½ÑÑ¥¹œÙ¥Í¥‰±”ÁÉ½‰±•µÌ‰•™½É”Á…É•°ÍÕ‰µ¥ÍÍ¥½¸¸ˆ°($%ÁÉ¥µ…Éå-•åÝ½Éè€‰±±¡¥¹…	ÕäEÁ¡½Ñ½Ìˆ°($%Í•½¹‘…Éå-•åÝ½É‘Ìèl($$$‰	ÕäEˆ°($$$‰¡½ÜÑ¼¡•¬±±¡¥¹…	ÕäEÁ¡½Ñ½Ìˆ°($$$‰Ý…É•¡½ÕÍ”¥¹ÍÁ•Ñ¥½¸Á¡½Ñ½Ìˆ°($$$‰±±¡¥¹…	ÕäÅÕ…±¥Ñä¥¹ÍÁ•Ñ¥½¸ˆ($%t°($%É•…‘Q¥µ”è€ˆÄÀµ¥¸É•…ˆ°($%ÕÁ‘…Ñ•è€‰ÕÕÍÐ€ÄÈ°€ÈÀÈØˆ°($%¥¹ÑÉ¼èl‰EÕ…±¥Ñäµ½¹ÑÉ½°Á¡½Ñ½Ì…É”µ½ÍÐÕÍ•™Õ°Ý¡•¸Ñ¡•ä±•…Ñ¼„‘•¥Í¥½¸¸Q¡•ä…É”¹½Ð‘•½É…Ñ¥½¸°…¹Ñ¡•ä…É”¹½Ð„•ÉÑ¥™¥…Ñ”Ñ¡…Ð…¸¥Ñ•´¥ÌÁ•É™•Ð¸±±¡¥¹…	ÕäÁÕ‰±¥±ä‘•ÍÉ¥‰•ÌÅÕ…±¥Ñä¥¹ÍÁ•Ñ¥½¸…ÌÁ…ÉÐ½˜¥ÑÌÁÕÉ¡…Í¥¹œµ…•¹äÍ•ÉÙ¥”°…±½¹Í¥‘”ÁÉ½ÕÉ•µ•¹Ð°½É‘•È™Õ±™¥±µ•¹Ð°¥¹Ñ•É¹…Ñ¥½¹…°±½¥ÍÑ¥Ì…¹…™Ñ•ÈµÍ…±•ÌÍÕÁÁ½ÉÐ¸Q¡”ÁÉ…Ñ¥…°ÁÕÉÁ½Í”½˜Ñ¡”Ý…É•¡½ÕÍ”Á¡½Ñ½Ì¥ÌÑ¼±•Ðå½Ô½µÁ…É”Ý¡…Ð…ÉÉ¥Ù•Ý¥Ñ Ý¡…Ðå½Ô½É‘•É•‰•™½É”å½Ô½µµ¥Ð¥ÐÑ¼…¸¥¹Ñ•É¹…Ñ¥½¹…°Á…É•°¸ˆ°€‰¥Ù”™½ÕÍ•µ¥¹ÕÑ•Ì…É”ÕÍÕ…±±äµ½É”Ù…±Õ…‰±”Ñ¡…¸ÑÝ•¹Ñäµ¥¹ÕÑ•Ì½˜É…¹‘½´é½½µ¥¹œ¸MÑ…ÉÐÝ¥Ñ ¥‘•¹Ñ¥Ñä°µ½Ù”Ñ¼Í¡…Á”°¡•¬µ•…ÍÕÉ•µ•¹ÑÌ°¥¹ÍÁ•Ð¡¥ µÉ¥Í¬‘•Ñ…¥±Ì…¹™¥¹¥Í Ý¥Ñ „±•…È½ÕÑ½µ”è…•ÁÐ°…Í¬™½È•Ù¥‘•¹”°½È½¹Ñ…ÐÍÕÁÁ½ÉÐ…‰½ÕÐ„É•ÑÕÉ¸½È•á¡…¹”¸Q¡”É½ÕÑ¥¹”‰•±½Ü¥Ì‘•Í¥¹•™½È±½Ñ¡¥¹œ°Í¡½•Ì°‰…Ì…¹•Ù•Éå‘…ä…•ÍÍ½É¥•Ì°‰ÕÐÑ¡”±½¥Œ…ÁÁ±¥•ÌÑ¼µ½ÍÐÁ¡½Ñ¼µ‰…Í•Ý…É•¡½ÕÍ”¥¹ÍÁ•Ñ¥½¹Ì¸‰t°($%Í•Ñ¥½¹Ìèl($$%ì($$$%¡•…‘¥¹œè€‰5¥¹ÕÑ”½¹”è½¹™¥É´Ñ¡…Ð¥Ð¥ÌÑ¡”É¥¡Ð¥Ñ•´ˆ°($$$%Á…É…É…Á¡Ìèl‰=Á•¸Ñ¡”½É‘•ÈÉ•½É…¹Ñ¡”±¥Ù”±¥ÍÑ¥¹œ‰•Í¥‘”Ñ¡”EÍ•Ð¸½µÁ…É”ÁÉ½‘ÕÐÑåÁ”°½±½ÕÈ°Í•±•Ñ•Í¥é”…¹Ù¥Í¥‰±”½ÁÑ¥½¸‘•Ñ…¥±Ì¸½ÉÉ•Ðµ±½½­¥¹œ¡½½‘¥”¥¸Ñ¡”ÝÉ½¹œ½±½ÕÈ½ÈÍ¥é”¥ÌÍÑ¥±°Ñ¡”ÝÉ½¹œ¥Ñ•´¸¡•¬±…‰•±Ì°Ñ…Ì°µ½‘•°½‘•Ì…¹¥¹±Õ‘•Á…ÉÑÌÝ¡•¸Ñ¡•ä…É”Ù¥Í¥‰±”°‰ÕÐ‘¼¹½Ð±•Ð½¹”µ…Ñ¡¥¹œ±…‰•°½Ù•ÉÉ¥‘”½‰Ù¥½ÕÌ‘¥™™•É•¹•Ì•±Í•Ý¡•É”¸M•±±•ÉÌÍ½µ•Ñ¥µ•ÌÕÍ”•¹•É¥ŒÁ…­…¥¹œ°Í¼Ñ¡”¥Ñ•´¥ÑÍ•±˜É•µ…¥¹ÌÑ¡”µ…¥¸•Ù¥‘•¹”¸ˆ°€‰1½½¬…ÐÑ¡”™Õ±°™É½¹Ð…¹‰…¬‰•™½É”é½½µ¥¹œ¥¹Ñ¼Íµ…±°‘•Ñ…¥±Ì¸Í¬Ý¡•Ñ¡•ÈÑ¡”Í¥±¡½Õ•ÑÑ”°Á…¹•°…ÉÉ…¹•µ•¹Ð°½±±…È°Á½­•ÑÌ°Í½±”Í¡…Á”°ÍÑÉ…ÁÌ½È¡…É‘Ý…É”µ…Ñ Ñ¡”Ù•ÉÍ¥½¸½É‘•É•¸%˜Ñ¡”Á±…Ñ™½É´Í¡½ÝÌÑ¡”Á…É•°½È½É‘•È¥‘•¹Ñ¥™¥•ÈÝ¥Ñ Ñ¡”Á¡½Ñ¼Í•Ð°µ…­”ÍÕÉ”¥Ðµ…Ñ¡•Ìå½ÕÈÉ•½É¸Q¡¥Ì™¥ÉÍÐµ¥¹ÕÑ”…Ñ¡•Ì™Õ±™¥±µ•¹Ðµ¥ÍÑ…­•ÌÑ¡…Ð‘•Ñ…¥±•ÍÑ¥Ñ¡¥¹œ¥¹ÍÁ•Ñ¥½¸…¹¹½ÐÍ½±Ù”¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰5¥¹ÕÑ”ÑÝ¼è©Õ‘”½Ù•É…±°Í¡…Á”…¹Íåµµ•ÑÉäˆ°($$$%Á…É…É…Á¡Ìèl‰M¡…Á”ÁÉ½‰±•µÌ…É”•…Í¥•ÈÑ¼Í•”Ý¡•¸Ñ¡”¥Ñ•´¥ÌÁ¡½Ñ½É…Á¡•™±…Ð½ÈÍÅÕ…É”Ñ¼Ñ¡”…µ•É„¸½µÁ…É”Ñ¡”±•™Ð…¹É¥¡ÐÍ¥‘•Ì°Í¡½Õ±‘•È¡•¥¡Ð°Á½­•ÐÁ½Í¥Ñ¥½¸°Ñ½”‰½á•Ì°¡••°…±¥¹µ•¹Ð°‰…œ¡…¹‘±•Ì…¹Ñ¡”Ý…äÁ…¹•±Ìµ••Ð¸M½µ”…ÁÁ…É•¹Ð…Íåµµ•ÑÉä½µ•Ì™É½´™½±‘Ì½È…µ•É„…¹±”°Í¼±½½¬™½ÈÑ¡”Í…µ”¥ÍÍÕ”¥¸µ½É”Ñ¡…¸½¹”Á¡½Ñ¼‰•™½É”‘•¥‘¥¹œ¥Ð¥Ì„‘•™•Ð¸ˆ°€‰½È±½Ñ¡¥¹œ°¡•¬Ý¡•Ñ¡•ÈÑ¡”…Éµ•¹Ð¥Ì±…¥¹…ÑÕÉ…±±äÉ…Ñ¡•ÈÑ¡…¸ÍÑÉ•Ñ¡•¸½ÈÍ¡½•Ì°½µÁ…É”‰½Ñ Í¡½•ÌÉ…Ñ¡•ÈÑ¡…¸¥¹ÍÁ•Ñ¥¹œ½¹±äÑ¡”±•…¹•È½¹”¸½È‰…Ì°¥¹ÍÁ•ÐÝ¡•Ñ¡•ÈÑ¡”‰…Í”Í¥ÑÌ±•Ù•°…¹Ñ¡”ÍÑÉ…ÁÌ…ÁÁ•…È•ÅÕ…°¸Ý…É•¡½ÕÍ”Á¡½Ñ¼…¹¹½ÐÑ•±°å½Ô¡½Ü…¸¥Ñ•´™••±Ì½¸Ñ¡”‰½‘ä°‰ÕÐ¥Ð…¸É•Ù•…°½‰Ù¥½ÕÌ‘¥ÍÑ½ÉÑ¥½¸°µ¥ÍÍ¥¹œ½µÁ½¹•¹ÑÌ…¹Õ¹•Ù•¸…ÍÍ•µ‰±ä¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰5¥¹ÕÑ”Ñ¡É•”èÕÍ”µ•…ÍÕÉ•µ•¹ÑÌ¥¹ÍÑ•…½˜Í¥é”±…‰•±Ìˆ°($$$%Á…É…É…Á¡Ìèl‰ÁÉ¥¹Ñ•Í¥é”¥Ì„…Ñ•½Éä°¹½Ð„‘¥µ•¹Í¥½¸¸¥™™•É•¹ÐÍ•±±•ÉÌµ…äÕÍ”‘¥™™•É•¹ÐÍ¥é”¡…ÉÑÌ°…¹Ñ¡”™¥¹¥Í¡•¥Ñ•´…¸Ù…Éä™É½´Ñ¡”±¥ÍÑ¥¹œ¸]¡•¸™¥Ðµ…ÑÑ•ÉÌ°½µÁ…É”ÉÕ±•È½ÈÑ…Á”Á¡½Ñ½ÌÝ¥Ñ µ•…ÍÕÉ•µ•¹ÑÌ™É½´…¸¥Ñ•´å½Ô…±É•…‘ä½Ý¸…¹±¥­”¸½ÈÑ½ÁÌ°ÕÍ•™Õ°‘¥µ•¹Í¥½¹Ì½™Ñ•¸¥¹±Õ‘”¡•ÍÐÝ¥‘Ñ °‰½‘ä±•¹Ñ …¹Í±••Ù”±•¹Ñ ¸½ÈÑÉ½ÕÍ•ÉÌ°Ý…¥ÍÐ°É¥Í”°Ñ¡¥ …¹¥¹Í•…´µ…äµ…ÑÑ•È¸½ÈÍ¡½•Ì°¥¹Í½±”±•¹Ñ ¥Ì½™Ñ•¸µ½É”¥¹™½Éµ…Ñ¥Ù”Ñ¡…¸Ñ¡”‰½à±…‰•°…±½¹”¸ˆ°€‰I•…Ñ¡”ÉÕ±•È…É•™Õ±±ä¸¡•¬Ý¡•É”Ñ¡”µ•…ÍÕÉ•µ•¹Ð‰•¥¹Ì°Ý¡•Ñ¡•ÈÑ¡”Ñ…Á”¥ÌÍÑÉ…¥¡Ð…¹Ý¡•Ñ¡•ÈÑ¡”…Éµ•¹Ð¥Ì™±…Ð¸Á¡½Ñ¼Ñ¡…ÐÕÑÌ½™˜Ñ¡”é•É¼Á½¥¹Ð½È‰•¹‘Ì…É½Õ¹™…‰É¥Œ‘½•Ì¹½ÐÁÉ½Ù¥‘”„É•±¥…‰±”¹Õµ‰•È¸%˜Ñ¡”É•ÅÕ¥É•‘¥µ•¹Í¥½¸¥Ìµ¥ÍÍ¥¹œ°…¸…‘‘¥Ñ¥½¹…°µ•…ÍÕÉ•µ•¹ÐÁ¡½Ñ¼…¸‰”µ½É”Ù…±Õ…‰±”Ñ¡…¸…¹½Ñ¡•È±½Í”µÕÀ½˜„±½¼½È±…‰•°¸‰t°($$$%¡•­±¥ÍÐèl($$$$$‰½µÁ…É”……¥¹ÍÐ…¸¥Ñ•´å½Ô½Ý¸ˆ°($$$$$‰¡•¬Ñ¡”ÉÕ±•ÈÍÑ…ÉÑÌ…Ðé•É¼ˆ°($$$$$‰5…­”ÍÕÉ”Ñ¡”¥Ñ•´¥Ì±…¥™±…Ðˆ°($$$$$‰±±½Ü™½È¹½Éµ…°Íµ…±°µ…¹Õ™…ÑÕÉ¥¹œÙ…É¥…Ñ¥½¸ˆ°($$$$$‰I•ÅÕ•ÍÐÑ¡”‘¥µ•¹Í¥½¸Ñ¡…Ð¡…¹•Ìå½ÕÈ‘•¥Í¥½¸ˆ($$$%t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰5¥¹ÕÑ”™½ÕÈè¥¹ÍÁ•ÐÑ¡”‘•Ñ…¥±Ìµ½ÍÐ±¥­•±äÑ¼™…¥°ˆ°($$$%Á…É…É…Á¡Ìèl‰¼¹½Ð¥Ù”•Ù•Éä‘•Ñ…¥°•ÅÕ…°…ÑÑ•¹Ñ¥½¸¸½ÕÌ½¸…É•…ÌÑ¡…Ð…ÉÉäÍÑÉ•ÍÌ½È…É”‘¥™™¥Õ±ÐÑ¼™¥àèé¥ÁÌ°‰ÕÑÑ½¹Ì°•å•±•ÑÌ°‰Õ­±•Ì°¡…¹‘±•Ì°Á½­•Ð½Á•¹¥¹Ì°Í½±”©½¥¹Ì…¹µ…©½ÈÍ•…µÌ¸1½½¬™½È±½½Í”Ñ¡É•…‘Ì°Í­¥ÁÁ•ÍÑ¥Ñ¡•Ì°ÍÑ…¥¹Ì°ÍÉ…Ñ¡•Ì°±Õ”µ…É­Ì°Ñ•…ÉÌ°‘•¹ÑÌ…¹µ¥ÍÍ¥¹œ¡…É‘Ý…É”¸=¸ÁÉ¥¹Ñ•¥Ñ•µÌ°½µÁ…É”Á±…•µ•¹Ð…¹…±¥¹µ•¹Ð…É½ÍÌÑ¡”Ý¡½±”…Éµ•¹Ð‰•™½É”é½½µ¥¹œ¥¹Ñ¼Ñ¡”ÁÉ¥¹Ð•‘”¸ˆ°€‰1¥¡Ñ¥¹œ…¸•á…•É…Ñ”ÍÕÉ™…”µ…É­Ì…¹¡¥‘”Ñ•áÑÕÉ”¸‰É¥¡ÐÉ•™±•Ñ¥½¸½¸½…Ñ•±•…Ñ¡•È¥Ì¹½Ð…ÕÑ½µ…Ñ¥…±±ä„ÍÉ…Ñ °…¹„‘…É¬™½±¥Ì¹½Ð…ÕÑ½µ…Ñ¥…±±ä„ÍÑ…¥¸¸1½½¬™½ÈÉ•Á•…Ñ••Ù¥‘•¹”…É½ÍÌ…¹±•Ì¸A¡½Ñ½Ì…¸Í¡½ÜÙ¥Í¥‰±”½¹ÍÑÉÕÑ¥½¸°‰ÕÐÑ¡•ä…¹¹½ÐÁÉ½Ù”µ…Ñ•É¥…°½µÁ½Í¥Ñ¥½¸°Ý…Ñ•ÉÁÉ½½™¥¹œ°Íµ•±°°±½¹œµÑ•É´‘ÕÉ…‰¥±¥Ñä½ÈÝ¡•Ñ¡•È…¸•±•ÑÉ½¹¥Œ¥Ñ•´™Õ¹Ñ¥½¹ÌÕ¹±•ÍÌ„ÍÁ•¥™¥ŒÑ•ÍÐ¥Ì‘½Õµ•¹Ñ•¸-••ÀÑ¡”½¹±ÕÍ¥½¸¥¹Í¥‘”Ý¡…ÐÑ¡”•Ù¥‘•¹”ÍÕÁÁ½ÉÑÌ¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰5¥¹ÕÑ”™¥Ù”è¡½½Í”…•ÁÐ°±…É¥™ä½È•Í…±…Ñ”ˆ°($$$%Á…É…É…Á¡Ìèl‰¹Ñ¡”¥¹ÍÁ•Ñ¥½¸Ý¥Ñ ½¹”½˜Ñ¡É•”½ÕÑ½µ•Ì¸•ÁÐµ•…¹ÌÑ¡”½ÉÉ•Ð¥Ñ•´…ÉÉ¥Ù•…¹Ñ¡”Ù¥Í¥‰±”½¹‘¥Ñ¥½¸¥ÌÝ¥Ñ¡¥¸å½ÕÈÑ½±•É…¹”¸±…É¥™äµ•…¹Ì½¹”µ¥ÍÍ¥¹œ…¹±”°µ•…ÍÕÉ•µ•¹Ð½È±½Í”µÕÀÝ½Õ±¡…¹”Ñ¡”‘•¥Í¥½¸ìÉ•ÅÕ•ÍÐ½¹±äÑ¡…Ð•Ù¥‘•¹”¸Í…±…Ñ”µ•…¹ÌÑ¡”¥Ñ•´…ÁÁ•…ÉÌÝÉ½¹œ°‘…µ…•½Èµ…Ñ•É¥…±±ä‘¥™™•É•¹Ð™É½´Ñ¡”½É‘•È°Í¼½¹Ñ…ÐÑ¡”Á±…Ñ™½É´Ñ¡É½Õ Ñ¡”ÕÉÉ•¹Ð½É‘•È½ÈÝ…É•¡½ÕÍ”ÁÉ½•ÍÌ‰•™½É”Á…É•°ÍÕ‰µ¥ÍÍ¥½¸¸ˆ°€‰Ù½¥Ù…Õ”É•ÅÕ•ÍÑÌÍÕ …ÌƒŠqÑ…­”‰•ÑÑ•ÈÁ¡½Ñ½Ì»ŠtMÑ…Ñ”Ñ¡”•á…Ð…É•„…¹É•…Í½¸èƒŠqA±•…Í”Á¡½Ñ½É…Á Ñ¡”±•™Ðé¥ÀÑ½½Ñ ÍÑÉ…¥¡Ð½¸³Št½ÈƒŠqA±•…Í”µ•…ÍÕÉ”Ñ¡”¥¹Í½±”™É½´¡••°Ñ¼Ñ½”Ý¥Ñ Ñ¡”é•É¼Á½¥¹ÐÙ¥Í¥‰±”»ŠtMÁ•¥™¥ŒÉ•ÅÕ•ÍÑÌÉ•‘Õ”…µ‰¥Õ¥Ñä¸I•ÑÕÉ¸•±¥¥‰¥±¥Ñä°Ñ¥µ¥¹œ°Í•±±•È…•ÁÑ…¹”…¹™••Ì…¸Ù…Éä°Í¼‘¼¹½Ð½Áä…¸½±½µµÕ¹¥ÑäÉÕ±”¥¹Ñ¼„ÕÉÉ•¹Ð…Í”¸I•…Ñ¡”±¥Ù”½É‘•È½ÁÑ¥½¹Ì…¹½¹Ñ…ÐÍÕÁÁ½ÉÐÝ¡•¸Ñ¡”‘•¥Í¥½¸…™™•ÑÌµ½¹•ä¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰]¡…ÐEÁ¡½Ñ½Ì…¹¹½ÐÕ…É…¹Ñ•”ˆ°($$$%Á…É…É…Á¡Ìèl‰±•…¸Á¡½Ñ¼Í•Ð…¹¹½ÐÕ…É…¹Ñ•”Ñ¡…Ð…¸¥Ñ•´Ý¥±°™¥Ð°™••°½µ™½ÉÑ…‰±”½È±…ÍÐ¸%Ð…±Í¼…¹¹½ÐÙ•É¥™ä¡¥‘‘•¸ÍÑ¥Ñ¡¥¹œ°¥¹Ñ•É¹…°Á…‘‘¥¹œ°™¥‰É”½¹Ñ•¹Ð°½±½ÕÈ…ÕÉ…ä½¸å½ÕÈÍÉ••¸½ÈÁ•É™½Éµ…¹”Õ¹‘•ÈÕÍ”¸A¡½Ñ¼¥¹ÍÁ•Ñ¥½¸¥ÌÍÑÉ½¹•ÍÐ™½È¥‘•¹Ñ¥Ñä°µ•…ÍÕÉ•µ•¹ÑÌ°½‰Ù¥½ÕÌ‘…µ…”°µ¥ÍÍ¥¹œÁ¥••Ì…¹Ù¥Í¥‰±”½¹ÍÑÉÕÑ¥½¸¸QÉ•…Ð±…¥µÌ‰•å½¹Ñ¡½Í”…É•…ÌÝ¥Ñ …ÕÑ¥½¸Õ¹±•ÍÌÑ¡”Á±…Ñ™½É´ÁÉ½Ù¥‘•Ì„ÍÁ•¥™¥Œ‘½Õµ•¹Ñ•Ñ•ÍÐ¸ˆ°€‰EÍ¡½Õ±…±Í¼¹½Ð‰”½¹™ÕÍ•Ý¥Ñ …ÕÑ¡•¹Ñ¥…Ñ¥½¸¸Ý…É•¡½ÕÍ”¥µ…”…¸¡•±Àå½Ô½µÁ…É”Ñ¡”É••¥Ù•¥Ñ•´Ý¥Ñ Ñ¡”Í•±±•ËŠeÌ±¥ÍÑ¥¹œ°‰ÕÐ¥Ð‘½•Ì¹½Ð•ÍÑ…‰±¥Í ¥¹Ñ•±±•ÑÕ…°µÁÉ½Á•ÉÑäÍÑ…ÑÕÌ½È±•…±¥Ñä¥¸å½ÕÈ‘•ÍÑ¥¹…Ñ¥½¸¸	Õå•ÉÌÉ•µ…¥¸É•ÍÁ½¹Í¥‰±”™½ÈÝ¡…ÐÑ¡•äÁÕÉ¡…Í”…¹™½È‘•ÍÑ¥¹…Ñ¥½¸µ½Õ¹ÑÉäÉÕ±•Ì¸%˜…¸¥Ñ•´ÑåÁ”¥ÌÉ•ÍÑÉ¥Ñ•½ÈÍ•¹Í¥Ñ¥Ù”°¡•¬ÕÉÉ•¹ÐÁ±…Ñ™½É´…¹ÕÍÑ½µÌ¥¹™½Éµ…Ñ¥½¸‰•™½É”½É‘•É¥¹œ…¹……¥¸‰•™½É”¡½½Í¥¹œ„É½ÕÑ”¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰-••À„Í¥µÁ±”•Ù¥‘•¹”É•½Éˆ°($$$%Á…É…É…Á¡Ìèl‰M…Ù”Ñ¡”½É‘•È¥‘•¹Ñ¥™¥•È°Í•±•Ñ•Ù…É¥…¹Ð°Í•±±•È±¥ÍÑ¥¹œ…¹É•±•Ù…¹ÐEÁ¡½Ñ½ÌÑ½•Ñ¡•È¸%˜å½Ô…Í¬„ÅÕ•ÍÑ¥½¸°­••ÀÑ¡”É•ÍÁ½¹Í”Ý¥Ñ Ñ¡…ÐÉ•½É¸Q¡¥Ì¥ÌÕÍ•™Õ°Ý¡•¸Í•Ù•É…°Í¥µ¥±…È¥Ñ•µÌ…ÉÉ¥Ù”°…¹¥ÐÁÉ•Ù•¹ÑÌå½Ô™É½´É•±å¥¹œ½¸µ•µ½ÉäÝ¡•¸‰Õ¥±‘¥¹œ„Á…É•°‘…åÌ±…Ñ•È¸Í¡½ÉÐ¹½Ñ”ÍÕ …ÌƒŠqÍ¥é”½¹™¥Éµ•‰ä¡•ÍÐµ•…ÍÕÉ•µ•¹ÐìÍµ…±°µ…É¬…•ÁÑ•“Št•áÁ±…¥¹ÌÝ¡äÑ¡”¥Ñ•´Ý…Ì…ÁÁÉ½Ù•¸ˆ°€‰I•½Éµ­••Á¥¹œ…±Í¼µ…­•Ì±…Ñ•ÈÍÕÁÁ½ÉÐ½¹Ù•ÉÍ…Ñ¥½¹Ì±•…É•È¸%¹ÍÑ•…½˜Í…å¥¹œ…¸¥Ñ•´¥ÌƒŠq‰…³Štå½Ô…¸¥‘•¹Ñ¥™äÑ¡”½É‘•È°Í¡½ÜÑ¡”Í•±•Ñ•Ù…É¥…¹Ð…¹Á½¥¹ÐÑ¼Ñ¡”Ù¥Í¥‰±”¥ÍÍÕ”¸Q¡”½…°¥Ì¹½ÐÑ¼É•…Ñ”„±•…°™¥±”ì¥Ð¥ÌÑ¼ÁÉ•Í•ÉÙ”Ñ¡”•Ù¥‘•¹”Ñ¡…Ð•á¥ÍÑ•‰•™½É”¥¹Ñ•É¹…Ñ¥½¹…°Í¡¥ÁÁ¥¹œ¸=¹”¥Ñ•µÌ…É”½µ‰¥¹•…¹É•Á…­•°¥‘•¹Ñ¥™å¥¹œÝ¡•É”„ÁÉ½‰±•´‰•…¸…¸‰•½µ”µ½É”‘¥™™¥Õ±Ð¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰ÁÉ…Ñ¥…°EÍÑ…¹‘…É™½ÈÉ•…°‰Õå•ÉÌˆ°($$$%Á…É…É…Á¡Ìèl‰A•É™•Ñ¥½¸¥Ì¹½Ð„ÕÍ•™Õ°ÍÑ…¹‘…É™½Èµ…ÍÌµÁÉ½‘Õ•½½‘Ì¸•¥‘”¥¸…‘Ù…¹”Ý¡¥ ‘¥™™•É•¹•Ìµ…ÑÑ•ÈèÝÉ½¹œÍ¥é”°µ¥ÍÍ¥¹œÁ…ÉÐ°µ…©½ÈÍÑ…¥¸°‘…µ…•±½ÍÕÉ”½È„µ•…ÍÕÉ•µ•¹Ð½ÕÑÍ¥‘”å½ÕÈ…•ÁÑ…‰±”É…¹”¸Mµ…±°Á…­…¥¹œ‘•¹ÑÌ½ÈÉ•µ½Ù…‰±”Ñ¡É•…‘Ìµ…ä¹½Ð©ÕÍÑ¥™ä‘•±…ä°Ý¡¥±”„ÝÉ½¹œÙ…É¥…¹Ð±•…É±ä‘½•Ì¸½¹Í¥ÍÑ•¹ÐÑ¡É•Í¡½±‘Ì¡•±Àå½Ô…Ù½¥É•©•Ñ¥¹œ½¹”¥Ñ•´™½È„‘•Ñ…¥°å½Ô…•ÁÑ•½¸…¹½Ñ¡•È¸ˆ°€‰Q¡”ÍÑÉ½¹•ÍÐEÉ½ÕÑ¥¹”¥ÌÍ¡½ÉÐ‰•…ÕÍ”¥Ð™½±±½ÝÌ„™¥á•½É‘•Èè¥‘•¹Ñ¥Ñä°Í¡…Á”°‘¥µ•¹Í¥½¹Ì°É¥Í¬‘•Ñ…¥±Ì…¹½ÕÑ½µ”¸%ÐÕÍ•ÌÁ¡½Ñ½Ì™½ÈÝ¡…ÐÁ¡½Ñ½Ì…¸ÁÉ½Ù”…¹É•ÅÕ•ÍÑÌ•áÑÉ„•Ù¥‘•¹”½¹±äÝ¡•¸¥Ð¡…¹•ÌÑ¡”‘•¥Í¥½¸¸Q¡…Ð¥Ì¡½Ü±±¡¥¹…	ÕäEÁ¡½Ñ½Ì‰•½µ”„ÁÉ…Ñ¥…°Ý…É•¡½ÕÍ”¡•­Á½¥¹Ð¥¹ÍÑ•…½˜„…±±•Éäå½Ô±…¹”…Ð‰•™½É”±¥­¥¹œÍÕ‰µ¥Ð¸‰t($$%ô($%t°($%Í½ÕÉ•9½Ñ”è€‰I•Í•…É ‰…Í¥Ìè±±¡¥¹…	ÕçŠeÌ½™™¥¥…°Í•ÉÙ¥”‘•ÍÉ¥ÁÑ¥½¸¥‘•¹Ñ¥™¥•ÌÅÕ…±¥Ñä¥¹ÍÁ•Ñ¥½¸…ÌÁ…ÉÐ½˜¥ÑÌÁÕÉ¡…Í¥¹œÝ½É­™±½Ü¸%¹ÍÁ•Ñ¥½¸±¥µ¥ÑÌ…¹Ñ¡”‘•¥Í¥½¸™É…µ•Ý½É¬…É”•‘¥Ñ½É¥…°Õ¥‘…¹”°¹½Ð„±…¥´Ñ¡…Ð•Ù•Éä½É‘•ÈÉ••¥Ù•Ì¥‘•¹Ñ¥…°¥µ…•Ì½ÈÍ•ÉÙ¥•Ì¸¡•­•ÕÕÍÐ€ÄÈ°€ÈÀÈØ¸ˆ(%ô°(%ì($%Ñ¥Ñ±”è€‰±±¡¥¹…	ÕäAÉ½‘ÕÐAÉ¥”ÙÌA…É•°½ÍÐè]¡…Ðe½ÔÑÕ…±±äA…äˆ°($%Í±Õœè€‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($%‘•ÍÉ¥ÁÑ¥½¸è€‰U¹‘•ÉÍÑ…¹Ý¡ä…¸±±¡¥¹…	Õä¥Ñ•´ÁÉ¥”…¹¹½ÐÁÉ•‘¥ÐÑ¡”¥¹Ñ•É¹…Ñ¥½¹…°Á…É•°Ñ½Ñ…°°…¹‰Õ¥±„É•…±¥ÍÑ¥Œ‰Õ‘•Ð‰•™½É”½É‘•É¥¹œ¸ˆ°($%ÁÉ¥µ…Éå-•åÝ½Éè€‰±±¡¥¹…	ÕäÍ¡¥ÁÁ¥¹œ½ÍÐˆ°($%Í•½¹‘…Éå-•åÝ½É‘Ìèl($$$‰±±¡¥¹…	ÕäÍ¡¥ÁÁ¥¹œ…±Õ±…Ñ½Èˆ°($$$‰	ÕäÍ¡¥ÁÁ¥¹œÁÉ¥”ˆ°($$$‰±±¡¥¹…	ÕäÁ…É•°½ÍÐˆ°($$$‰±±¡¥¹…	ÕäÙ½±Õµ•ÑÉ¥ŒÝ•¥¡Ðˆ($%t°($%É•…‘Q¥µ”è€ˆÄÄµ¥¸É•…ˆ°($%ÕÁ‘…Ñ•è€‰ÕÕÍÐ€ÄÈ°€ÈÀÈØˆ°($%¥¹ÑÉ¼èl‰±½ÜÁÉ½‘ÕÐÁÉ¥”¥Ì¹½Ð„±½Ü‘•±¥Ù•É•ÁÉ¥”¸Q¡¥Ì¥ÌÑ¡”µ½ÍÐ¥µÁ½ÉÑ…¹Ð‰Õ‘•Ñ¥¹œ±•ÍÍ½¸™½È…¹äÁÕÉ¡…Í¥¹œµ…•¹Ð½É‘•È¸±±¡¥¹…	ÕçŠeÌ½™™¥¥…°‘•ÍÉ¥ÁÑ¥½¸Í•Á…É…Ñ•ÌÁÉ½ÕÉ•µ•¹Ð…¹½É‘•È™Õ±™¥±µ•¹Ð™É½´¥¹Ñ•É¹…Ñ¥½¹…°±½¥ÍÑ¥Ì°…¹¥Ð¹½Ñ•ÌÑ¡…Ð¥¹Ñ•É¹…Ñ¥½¹…°Í¡¥ÁÁ¥¹œ¥ÌÁÉ½Ù¥‘•‰äÑ¡¥ÉµÁ…ÉÑäÍ•ÉÙ¥”½µÁ…¹¥•Ì¸Q¡”½™™¥¥…°Í¡¥ÁÁ¥¹œ…±Õ±…Ñ½È…±Í¼…Í­Ì™½È‘•ÍÑ¥¹…Ñ¥½¸°ÁÉ½‘ÕÐ…Ñ•½Éä°•ÍÑ¥µ…Ñ•Ý•¥¡Ð…¹½ÁÑ¥½¹…°Á…­…”‘¥µ•¹Í¥½¹Ì¸Q¡½Í”¥¹ÁÕÑÌ•áÁ±…¥¸Ý¡äÑ¡”¹Õµ‰•È½¸„ÁÉ½‘ÕÐ…É…¹¹½ÐÁÉ•‘¥ÐÑ¡”¹Õµ‰•ÈÍ¡½Ý¸Ý¡•¸„Á…É•°¥ÌÉ•…‘ä¸ˆ°€‰É•…±¥ÍÑ¥Œ‰Õ‘•Ð¥Ì‰Õ¥±Ð¥¸ÍÑ…•Ì¸¥ÉÍÐ½µ•ÌÑ¡”Í•±•Ñ•ÁÉ½‘ÕÐ…¹…¹ä‘½µ•ÍÑ¥Œµ½Ù•µ•¹ÐÑ¼Ñ¡”Ý…É•¡½ÕÍ”¸Q¡•¸Ñ¡”¥Ñ•´¥Ì¥¹ÍÁ•Ñ•°½µ‰¥¹•Ý¥Ñ ½Ñ¡•È½½‘Ì¥˜‘•Í¥É•°Á…­•°µ•…ÍÕÉ•…¹µ…Ñ¡•Ý¥Ñ É½ÕÑ•Ì…Ù…¥±…‰±”™½È¥ÑÌ‘•ÍÑ¥¹…Ñ¥½¸…¹…Ñ•½Éä¸ÕÉÉ•¹ä½¹Ù•ÉÍ¥½¸°½ÁÑ¥½¹…°Í•ÉÙ¥•Ì…¹‘•ÍÑ¥¹…Ñ¥½¸¡…É•Ìµ…ä…‘™ÕÉÑ¡•ÈÕ¹•ÉÑ…¥¹Ñä¸Q¡¥ÌÕ¥‘”Í¡½ÝÌ¡½ÜÑ¼Á±…¸•… ÍÑ…”Ý¥Ñ¡½ÕÐ¥¹Ù•¹Ñ¥¹œ„Õ¹¥Ù•ÉÍ…°Á•Èµ­¥±½É…´É…Ñ”½ÈÁÉ½µ¥Í¥¹œ„‘•±¥Ù•ÉäÑ¥µ”Ñ¡…ÐÑ¡”±¥Ù”ÅÕ½Ñ”µ…ä¹½ÐÍÕÁÁ½ÉÐ¸‰t°($%Í•Ñ¥½¹Ìèl($$%ì($$$%¡•…‘¥¹œè€‰M•Á…É…Ñ”Ñ¡”ÁÉ½‘ÕÐ½É‘•È™É½´Ñ¡”¥¹Ñ•É¹…Ñ¥½¹…°Á…É•°ˆ°($$$%Á…É…É…Á¡Ìèl‰AÕÉ¡…Í¥¹œµ…•¹Ð½É‘•ÉÌÕÍÕ…±±äÉ•…Ñ”ÑÝ¼‘¥™™•É•¹Ðµ½¹•ä‘•¥Í¥½¹Ì¸Q¡”™¥ÉÍÐ¥ÌÝ¡•Ñ¡•ÈÑ¼‰ÕäÑ¡”¥Ñ•´™É½´„Í•±±•È¥¸¡¥¹„¸Q¡”Í•½¹¥ÌÝ¡•Ñ¡•È…¹¡½ÜÑ¼Í¡¥À½¹”½Èµ½É”Ý…É•¡½ÕÍ”¥Ñ•µÌ¥¹Ñ•É¹…Ñ¥½¹…±±ä¸-••Á¥¹œÑ¡½Í”‘•¥Í¥½¹ÌÍ•Á…É…Ñ”ÁÉ•Ù•¹ÑÌÑ¡”ÁÉ½‘ÕÐÁÉ¥”™É½´½¹ÍÕµ¥¹œÑ¡”Á…É•°‰Õ‘•Ð¸€ÈÀ¥Ñ•´¥Ì¹½ÐƒŠpÈÀ‘•±¥Ù•É•“Štµ•É•±ä‰•…ÕÍ”Ñ¡”‘¥Í½Ù•ÉäÁ…”Í¡½ÝÌ€ÈÀ¸ˆ°€‰ÐÑ¡”ÁÉ½‘ÕÐÍÑ…”°É•½ÉÑ¡”•á…ÐÙ…É¥…¹ÐÁÉ¥”…¹…¹ä‘½µ•ÍÑ¥ŒÍ•±±•ÈµÑ¼µÝ…É•¡½ÕÍ”¡…É”Í¡½Ý¸¸ÐÑ¡”Á…É•°ÍÑ…”°ÕÍ”Ñ¡”Ý…É•¡½ÕÍ—ŠeÌÉ•½É‘•¥Ñ•´¥¹™½Éµ…Ñ¥½¸…¹ÕÉÉ•¹ÐÉ½ÕÑ”½ÁÑ¥½¹Ì¸%˜å½ÔÁ±…¸Í•Ù•É…°ÁÉ½‘ÕÑÌ°É•Í•ÉÙ”µ½¹•ä™½ÈÍ¡¥ÁÁ¥¹œ‰•™½É”Á±…¥¹œ•Ù•Éä¥Ñ•´½É‘•È¸=Ñ¡•ÉÝ¥Í”°å½Ô…¸•¹ÕÀÝ¥Ñ ½½‘Ì¥¸ÍÑ½É…”…¹¹¼½µ™½ÉÑ…‰±”É½ÕÑ”Ý¥Ñ¡¥¸Ñ¡”É•µ…¥¹¥¹œ‰Õ‘•Ð¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰UÍ”Ñ¡”½™™¥¥…°…±Õ±…Ñ½È™½ÈÍ•¹…É¥½Ì°¹½ÐÁÉ½µ¥Í•Ìˆ°($$$%Á…É…É…Á¡Ìèl‰±±¡¥¹…	ÕäÁÉ½Ù¥‘•Ì„ÁÕ‰±¥ŒÍ¡¥ÁÁ¥¹œ…±Õ±…Ñ½È¸%ÑÌÙ¥Í¥‰±”¥¹ÁÕÑÌ¥¹±Õ‘”Ñ¡”‘•ÍÑ¥¹…Ñ¥½¸½Õ¹ÑÉä½ÈÉ•¥½¸°Ñ¡”Ý…É•¡½ÕÍ”½É¥¥¸°ÁÉ½‘ÕÐ…Ñ•½Éä°•ÍÑ¥µ…Ñ•Ý•¥¡Ð…¹Á…­…”‘¥µ•¹Í¥½¹Ì™½È±¥¹•ÌÑ¡…Ð…±Õ±…Ñ”Ý¥Ñ Ù½±Õµ•ÑÉ¥ŒÝ•¥¡Ð¸Q¡¥Ìµ…­•Ì¥ÐÕÍ•™Õ°™½È½µÁ…É¥¹œÍ•¹…É¥½Ì‰•™½É”½É‘•É¥¹œè½¹”±¥¡Ð±½Ñ¡¥¹œÁ…É•°°„Á…É•°½¹Ñ…¥¹¥¹œÍ¡½•ÌÝ¥Ñ ‰½á•Ì°½È„‰Õ±­äµ¥á•½É‘•È¸¡…¹”½¹”¥¹ÁÕÐ…Ð„Ñ¥µ”Í¼å½Ô…¸Í•”Ý¡¥ …ÍÍÕµÁÑ¥½¸µ½Ù•ÌÑ¡”•ÍÑ¥µ…Ñ”¸ˆ°€‰Q¡”É•ÍÕ±ÐÉ•µ…¥¹Ì…¸•ÍÑ¥µ…Ñ”‰•…ÕÍ”Ñ¡”™¥¹…°Á…É•°µ…ä‘¥™™•È™É½´å½ÕÈÕ•ÍÌ¸M•±±•ÈÁ…­…¥¹œ°Ý…É•¡½ÕÍ”Á…­¥¹œ°‘¥µ•¹Í¥½¹…°µ•…ÍÕÉ•µ•¹Ð°É½ÕÑ”…Ù…¥±…‰¥±¥Ñä°™Õ•°½È…ÉÉ¥•È…‘©ÕÍÑµ•¹ÑÌ…¹¥Ñ•´É•ÍÑÉ¥Ñ¥½¹Ì…¸¡…¹”Ñ¡”±¥Ù”½ÁÑ¥½¹Ì¸M…Ù”Ñ¡”‘…Ñ”…¹…ÍÍÕµÁÑ¥½¹ÌÝ¡•¸½µÁ…É¥¹œ•ÍÑ¥µ…Ñ•Ì¸…±Õ±…Ñ½ÈÉ•ÍÕ±ÐÝ¥Ñ¡½ÕÐ¥ÑÌ‘•ÍÑ¥¹…Ñ¥½¸°…Ñ•½Éä°Ý•¥¡Ð…¹‘¥µ•¹Í¥½¹Ì¥Ì¹½Ð„É•ÕÍ…‰±”ÅÕ½Ñ”¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰U¹‘•ÉÍÑ…¹…ÑÕ…°Ý•¥¡Ð…¹Ù½±Õµ•ÑÉ¥ŒÝ•¥¡Ðˆ°($$$%Á…É…É…Á¡Ìèl‰ÑÕ…°Ý•¥¡Ð¥ÌÝ¡…ÐÑ¡”Á…­•Á…É•°Á¡åÍ¥…±±äÝ•¥¡Ì¸Y½±Õµ•ÑÉ¥ŒÝ•¥¡Ð¥Ì„…ÉÉ¥•Èµ•Ñ¡½Ñ¡…Ð½¹Ù•ÉÑÌÁ…­…”‘¥µ•¹Í¥½¹Ì¥¹Ñ¼„¡…É•…‰±”™¥ÕÉ”¸Q¡”•á…Ð‘¥Ù¥Í½È½ÈÉÕ±”…¸‘¥™™•È‰äÉ½ÕÑ”°Í¼ÕÍ”Ñ¡”ÉÕ±”Í¡½Ý¸™½ÈÑ¡”ÕÉÉ•¹Ð½ÁÑ¥½¸É…Ñ¡•ÈÑ¡…¸µ•µ½É¥Í¥¹œ½¹”™½ÉµÕ±„¸Á…É•°™Õ±°½˜±¥¡ÑÝ•¥¡Ð‰ÕÐ‰Õ±­äÁ…­…¥¹œ…¸Ñ¡•É•™½É”‰”¡…É•…Ì¥˜¥ÐÝ•É”¡•…Ù¥•ÈÑ¡…¸Ñ¡”Í…±”É•…‘¥¹œ¸ˆ°€‰Q¡¥Ì¥ÌÝ¡äÍ¡½”‰½á•Ì°É¥¥¥™Ð‰½á•Ì°ÁÕ™™ä±½Ñ¡¥¹œ…¹ÁÉ½Ñ•Ñ¥Ù”…¥ÈÍÁ…”µ…ÑÑ•È¸I•µ½Ù¥¹œÕ¹¹••ÍÍ…ÉäÉ•Ñ…¥°Á…­…¥¹œµ…äÉ•‘Õ”Ù½±Õµ”°‰ÕÐ¥Ð…±Í¼É•µ½Ù•ÌÁÉ½Ñ•Ñ¥½¸¸Q¡”Í•¹Í¥‰±”¡½¥”‘•Á•¹‘Ì½¸Ñ¡”¥Ñ•´¸Í½™ÐPµÍ¡¥ÉÐ…¸Ñ½±•É…Ñ”½µÁ…ÐÁ…­¥¹œì™É…¥±”…•ÍÍ½É¥•Ì½ÈÍÑÉÕÑÕÉ•Í¡½•Ìµ…ä¹••É•¥¹™½É•µ•¹Ð¸Í¬Ý¡…ÐÁ…­¥¹œ¡…¹”¥Ì‰•¥¹œµ…‘”…¹©Õ‘”Ñ¡”Í…Ù¥¹œ……¥¹ÍÐÑ¡”‘…µ…”É¥Í¬¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰½¹Í½±¥‘…Ñ¥½¸¡•±ÁÌ½¹±äÝ¡•¸Ñ¡”Á…É•°ÍÑ¥±°µ…­•ÌÍ•¹Í”ˆ°($$$%Á…É…É…Á¡Ìèl‰½µ‰¥¹¥¹œÍ•Ù•É…°Ý…É•¡½ÕÍ”¥Ñ•µÌ…¸…Ù½¥Í•¹‘¥¹œµÕ±Ñ¥Á±”Í•Á…É…Ñ”Á…É•±Ì…¹µ…äÍÁÉ•…Í½µ”™¥á•¡…¹‘±¥¹œ½È™¥ÉÍÐµÝ•¥¡Ð•™™•ÑÌ…É½ÍÌµ½É”½½‘Ì¸%Ð‘½•Ì¹½Ðµ…­”…‘‘•Ý•¥¡Ð½ÈÙ½±Õµ”‘¥Í…ÁÁ•…È¸Ù•Éä•áÑÉ„¡½½‘¥”°Í¡½”‰½à½È…•ÍÍ½Éä¡…¹•ÌÑ¡”Á…É•°°…¹„µ¥á•…Ñ•½Éä…¸…™™•ÐÝ¡¥ ±¥¹•Ì…É”…Ù…¥±…‰±”¸½¹Í½±¥‘…Ñ¥½¸Í¡½Õ±‰”„Á±…¹¹¥¹œÑ½½°°¹½Ð…¸•áÕÍ”Ñ¼…‘ÁÉ½‘ÕÑÌÕ¹Ñ¥°Ñ¡”¥Ñ•´Ñ½Ñ…°±½½­Ì±…É”•¹½Õ ¸ˆ°€‰	•™½É”½µ‰¥¹¥¹œ•Ù•ÉåÑ¡¥¹œ°½µÁ…É”…Ð±•…ÍÐÑÝ¼Í•¹…É¥½Ìè½¹”½µÁ±•Ñ”Á…É•°…¹„Í•¹Í¥‰±”ÍÁ±¥Ð¸ÍÁ±¥Ð…¸½ÍÐµ½É”½Ù•É…±°°‰ÕÐ¥Ðµ…ä­••À•… Á…É•°Ý¥Ñ¡¥¸É½ÕÑ”±¥µ¥ÑÌ°Í•Á…É…Ñ”Í•¹Í¥Ñ¥Ù”¥Ñ•µÌ½ÈÉ•‘Õ”Ñ¡”½¹Í•ÅÕ•¹”½˜„Í¥¹±”‘•±…ä¸Q¡”¡•…Á•ÍÐ‘¥ÍÁ±…å•±¥¹”¥Ì¹½Ð…ÕÑ½µ…Ñ¥…±±äÑ¡”‰•ÍÐÙ…±Õ”¥˜¥ÑÌÉ•ÍÑÉ¥Ñ¥½¹Ì°ÑÉ…­¥¹œ°½µÁ•¹Í…Ñ¥½¸Ñ•ÉµÌ½È•ÍÑ¥µ…Ñ•Í•ÉÙ¥”±•Ù•°‘¼¹½Ð™¥ÐÑ¡”½É‘•È¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰AÉ½‘ÕÐ…Ñ•½Éä…¸¡…¹”É½ÕÑ”…Ù…¥±…‰¥±¥Ñäˆ°($$$%Á…É…É…Á¡Ìèl‰Q¡”½™™¥¥…°…±Õ±…Ñ½È…Í­Ì™½ÈÁÉ½‘ÕÐ…Ñ•½Éä‰•…ÕÍ”…ÉÉ¥•ÉÌ‘¼¹½ÐÑÉ•…Ð•Ù•Éä¥Ñ•´Ñ¡”Í…µ”¸	…ÑÑ•É¥•Ì°±¥ÅÕ¥‘Ì°µ…¹•ÑÌ°•±•ÑÉ½¹¥Ì°™½½°½Íµ•Ñ¥Ì…¹½Ñ¡•ÈÍ•¹Í¥Ñ¥Ù”…Ñ•½É¥•Ìµ…ä¡…Ù”™•Ý•ÈÉ½ÕÑ•Ì½ÈÍÁ•¥…°½¹‘¥Ñ¥½¹Ì¸Ù•¸½É‘¥¹…Éä½½‘Ì…¸™…”‘•ÍÑ¥¹…Ñ¥½¸µÍÁ•¥™¥Œ±¥µ¥ÑÌ¸¼¹½Ðµ…É¬„ÁÉ½‘ÕÐ…Ì„Í…™•È…Ñ•½ÉäÍ¥µÁ±äÑ¼É•Ù•…°„¡•…Á•È•ÍÑ¥µ…Ñ”ìÑ¡”Ý…É•¡½ÕÍ”½È…ÉÉ¥•È…¸É•±…ÍÍ¥™ä¥Ð±…Ñ•È¸ˆ°€‰¡•¬Ñ¡”ÕÉÉ•¹Ð‘•ÍÉ¥ÁÑ¥½¸½˜•… É½ÕÑ”…¹½¹™¥É´Ñ¡…Ð…±°Á…É•°½¹Ñ•¹ÑÌ…É”•±¥¥‰±”¸%˜„±¥ÍÑ¥¹œ¥ÌÕ¹±•…È…‰½ÕÐµ…Ñ•É¥…°½È½µÁ½¹•¹ÑÌ°É•Í½±Ù”Ñ¡…Ð‰•™½É”Á…É•°ÍÕ‰µ¥ÍÍ¥½¸¸É½ÕÑ”Í¡½Ý¸™½È•¹•É¥Œ±½Ñ¡¥¹œ‘½•Ì¹½ÐÁÉ½Ù”¥ÐÝ¥±°…•ÁÐ„Á…É•°½¹Ñ…¥¹¥¹œ„‰…ÑÑ•ÉäµÁ½Ý•É•…•ÍÍ½Éä¸±¥¥‰¥±¥Ñä¥Ì„±¥Ù”½Á•É…Ñ¥½¹…°™…Ð°¹½Ð„Á•Éµ…¹•¹ÐÁÉ½Á•ÉÑä½˜„ÍÁÉ•…‘Í¡••ÐÉ½Ü¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰	Õ‘•Ð™½ÈÑ¡”½ÍÑÌ½ÕÑÍ¥‘”Ñ¡”™É•¥¡Ð±¥¹”ˆ°($$$%Á…É…É…Á¡Ìèl‰Q¡”¥¹Ñ•É¹…Ñ¥½¹…°±¥¹”¥Ñ•´¥Ì¹½Ð…±Ý…åÌÑ¡”Ý¡½±”‘•±¥Ù•É•½ÍÐ¸•Á•¹‘¥¹œ½¸Ñ¡”½É‘•È…¹‘•ÍÑ¥¹…Ñ¥½¸°Ñ¡”Ñ½Ñ…°…¸…±Í¼¥¹Ù½±Ù”ÕÉÉ•¹ä½¹Ù•ÉÍ¥½¸°Á…åµ•¹ÐÁÉ½•ÍÍ¥¹œ°½ÁÑ¥½¹…°¥¹ÍÁ•Ñ¥½¸½ÈÁ…­¥¹œÍ•ÉÙ¥•Ì°¥¹ÍÕÉ…¹”¡½¥•Ì°Ñ…á•Ì°‘ÕÑ¥•Ì°ÕÍÑ½µÌ…ÍÍ•ÍÍµ•¹Ð½È±…ÍÐµµ¥±”…ÉÉ¥•È¡…É•Ì¸9½Ð•Ù•Éä½ÍÐ…ÁÁ±¥•ÌÑ¼•Ù•ÉäÁ…É•°°…¹Ñ¡”Á±…Ñ™½É´…¹¹½ÐÕ…É…¹Ñ•”¡½Ü„‘•ÍÑ¥¹…Ñ¥½¸…ÕÑ¡½É¥ÑäÝ¥±°…ÍÍ•ÍÌ„Í¡¥Áµ•¹Ð¸ˆ°€‰É•…Ñ”Ñ¡É•”‰Õ‘•Ð½±Õµ¹Ìè­¹½Ý¸°•ÍÑ¥µ…Ñ•…¹‘•ÍÑ¥¹…Ñ¥½¸µ‘•Á•¹‘•¹Ð¸AÉ½‘ÕÐ…¹Í•±•Ñ•Ù…É¥…¹ÐÁÉ¥•Ì‰•±½¹œ¥¸­¹½Ý¸½¹”½¹™¥Éµ•¸…±Õ±…Ñ½ÈÍ•¹…É¥¼‰•±½¹Ì¥¸•ÍÑ¥µ…Ñ•¸Q…á•Ì½È…ÉÉ¥•È¡…É•ÌÑ¡…Ð‘•Á•¹½¸‘•ÍÑ¥¹…Ñ¥½¸ÑÉ•…Ñµ•¹Ð‰•±½¹œ¥¸‘•ÍÑ¥¹…Ñ¥½¸µ‘•Á•¹‘•¹ÐÕ¹Ñ¥°Ù•É¥™¥•¸Q¡¥ÌÁÉ•Ù•¹ÑÌ„ÁÉ•¥Í”µ±½½­¥¹œÍÁÉ•…‘Í¡••ÐÑ½Ñ…°™É½´¡¥‘¥¹œÕ¹•ÉÑ…¥¹Ñä…¹µ…­•Ì¥Ð•…Í¥•ÈÑ¼‘•¥‘”¡½ÜµÕ É•Í•ÉÙ”¥Ì½µ™½ÉÑ…‰±”¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰]¡…ÐÕÍÑ½µ•ÈÉ•Ù¥•ÝÌ…»ŠQ…¹…¹¹½ÓŠQÑ•±°å½Ôˆ°($$$%Á…É…É…Á¡Ìèl‰AÕ‰±¥Œ…ÁÀÉ•Ù¥•ÝÌÍ¡½Üµ¥á••áÁ•É¥•¹•Ì¸M½µ”ÕÍ•ÉÌÁÉ…¥Í”Ñ¡”¥¹Ñ•É™…”°½É‘•ÈÑÉ…­¥¹œ½ÈÕÍÑ½µ•ÈÍÕÁÁ½ÉÐ°Ý¡¥±”½Ñ¡•ÉÌ½µÁ±…¥¸Ñ¡…ÐÍ¡¥ÁÁ¥¹œÝ…ÌµÕ ¡¥¡•ÈÑ¡…¸Ñ¡”ÁÉ½‘ÕÐÙ…±Õ”½ÈÑ¡…ÐÉ½ÕÑ”¥¹™½Éµ…Ñ¥½¸™•±ÐÕ¹±•…È¸Q¡•Í”…½Õ¹ÑÌ…É”ÕÍ•™Õ°‰•…ÕÍ”Ñ¡•ä¡¥¡±¥¡ÐÑ¡”ÅÕ•ÍÑ¥½¹Ì„‰Õå•ÈÍ¡½Õ±…Í¬è]¡…ÐÝ•É”Ñ¡”‘•ÍÑ¥¹…Ñ¥½¸°Á…­•Ý•¥¡Ð°‘¥µ•¹Í¥½¹Ì°…Ñ•½Éä°É½ÕÑ”…¹‘…Ñ”ü]…ÌÑ¡”…µ½Õ¹Ð…¸•ÍÑ¥µ…Ñ”½È™¥¹…°¡…É”ü]•É”‘•ÍÑ¥¹…Ñ¥½¸™••Ì¥¹±Õ‘•üˆ°€‰É•Ù¥•Ü¥Ì¹½Ð„Õ¹¥Ù•ÉÍ…°ÁÉ¥”Ñ…‰±”¸=¹”ÕÍ•ËŠeÌÁ…É•°µ…ä‘¥™™•È¥¸½Õ¹ÑÉä°Ù½±Õµ”°±¥¹”°Ñ¥µ¥¹œ…¹½¹Ñ•¹ÑÌ¸UÍ”É•Á•…Ñ•½µÁ±…¥¹ÑÌ…ÌÁÉ½µÁÑÌ™½ÈÙ•É¥™¥…Ñ¥½¸°¹½Ð…ÌÁÉ½½˜Ñ¡…Ðå½ÕÈÁ…É•°Ý¥±°½ÍÐÑ¡”Í…µ”¸1¥­•Ý¥Í”°„Á½Í¥Ñ¥Ù”‘•±¥Ù•ÉäÍÑ½Éä‘½•Ì¹½ÐÕ…É…¹Ñ•”å½ÕÈÉ½ÕÑ”½ÈÕÍÑ½µÌ½ÕÑ½µ”¸‰…±…¹•É•Ù¥•Ü…ÉÑ¥±”Í¡½Õ±ÁÉ•Í•ÉÙ”Ñ¡¥Ì½¹Ñ•áÐ…¹±•…É±ä±…‰•°ÕÍÑ½µ•ÈÍÑ…Ñ•µ•¹ÑÌ…Ì¥¹‘¥Ù¥‘Õ…°•áÁ•É¥•¹•Ì¸‰t°($$$%¡•­±¥ÍÐèl($$$$$‰•ÍÑ¥¹…Ñ¥½¸…¹‘…Ñ”ˆ°($$$$$‰A…­•Ý•¥¡Ð…¹‘¥µ•¹Í¥½¹Ìˆ°($$$$$‰AÉ½‘ÕÐ…Ñ•½É¥•Ì…¹É•ÍÑÉ¥Ñ¥½¹Ìˆ°($$$$$‰M•±•Ñ•É½ÕÑ”…¹ÅÕ½Ñ•Í•ÉÙ¥”±•Ù•°ˆ°($$$$$‰]¡•Ñ¡•ÈÑ…á•Ì½È±…ÍÐµµ¥±”™••ÌÝ•É”¥¹±Õ‘•ˆ($$$%t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰UÍ”„±…¹‘•µ½ÍÐÝ½É­Í¡••Ð‰•™½É”å½Ô‰Õäˆ°($$$%Á…É…É…Á¡Ìèl‰MÑ…ÉÐÝ¥Ñ Ñ¡”±¥Ù”Ù…É¥…¹ÐÁÉ¥”°‘½µ•ÍÑ¥Œ‘•±¥Ù•Éä…¹Ñ¡”¹Õµ‰•È½˜¥Ñ•µÌ¸‘„Í¡¥ÁÁ¥¹œÍ•¹…É¥¼™É½´Ñ¡”½™™¥¥…°…±Õ±…Ñ½ÈÕÍ¥¹œ¡½¹•ÍÐ…Ñ•½Éä°Ý•¥¡Ð…¹Í¥é”…ÍÍÕµÁÑ¥½¹Ì¸‘½ÁÑ¥½¹…°Í•ÉÙ¥•Ìå½Ô…ÑÕ…±±ä¥¹Ñ•¹Ñ¼ÕÍ”¸Q¡•¸Í•Ð…Í¥‘”„‘•ÍÑ¥¹…Ñ¥½¸É•Í•ÉÙ”‰…Í•½¸ÕÉÉ•¹Ð±½…°ÉÕ±•Ì½È…ÉÉ¥•È¥¹™½Éµ…Ñ¥½¸¸¥Ù¥‘”Ñ¡”•ÍÑ¥µ…Ñ•Ñ½Ñ…°‰äÑ¡”¹Õµ‰•È½˜ÕÍ•™Õ°¥Ñ•µÌ½¹±ä…™Ñ•ÈÑ¡”™Õ±°Ñ½Ñ…°¥ÌÙ¥Í¥‰±”ìÑ¡¥ÌÍ¡½ÝÌÝ¡•Ñ¡•È„ƒŠq¡•…ÃŠt•áÑÉ„¥Ñ•´É•…±±ä¥µÁÉ½Ù•ÌÙ…±Õ”¸ˆ°€‰IÕ¸„ÍÑÉ•ÍÌÑ•ÍÐ‰ä¥¹É•…Í¥¹œ•ÍÑ¥µ…Ñ•Á…É•°½ÍÐ‰ä„Á•É•¹Ñ…”å½Ô…¸Ñ½±•É…Ñ”¸%˜Ñ¡”½É‘•È‰•½µ•ÌÕ¹…™™½É‘…‰±”Ý¥Ñ „µ½‘•É…Ñ”¡…¹”°Ñ¡”¥Ñ•´ÍÑ…”¥Ì…±É•…‘äÑ½¼±…É”¸I•µ½Ù”±½ÜµÁÉ¥½É¥ÑäÁÉ½‘ÕÑÌ‰•™½É”ÁÕÉ¡…Í”É…Ñ¡•ÈÑ¡…¸¡½Á¥¹œÑ¡”™¥¹…°ÅÕ½Ñ”Ý¥±°‰”Õ¹ÕÍÕ…±±ä±½Ü¸	Õ‘•Ñ¥¹œ¥Ìµ½ÍÐ•™™•Ñ¥Ù”Ý¡¥±”•Ù•Éä¥Ñ•´¥ÌÍÑ¥±°½ÁÑ¥½¹…°¸‰t($$%ô°($$%ì($$$%¡•…‘¥¹œè€‰Q¡”‘•¥Í¥½¸ÉÕ±”Ñ¡…ÐÁÉ•Ù•¹ÑÌÍ¡¥ÁÁ¥¹œÍ¡½¬ˆ°($$$%Á…É…É…Á¡Ìèl‰9•Ù•È…ÁÁÉ½Ù”Ñ¡”ÁÉ½‘ÕÐ‰…Í­•ÐÕÍ¥¹œ½¹±äÁÉ½‘ÕÐµ…ÉÁÉ¥•Ì¸ÁÁÉ½Ù”¥Ð½¹±äÝ¡•¸Ñ¡”¥Ñ•´µÍÑ…”½ÍÐÁ±ÕÌ„É•…±¥ÍÑ¥ŒÁ…É•°Í•¹…É¥¼Á±ÕÌ„É•Í•ÉÙ”™¥ÑÌÑ¡”Ñ½Ñ…°‰Õ‘•Ð¸]¡•¸Ý…É•¡½ÕÍ”µ•…ÍÕÉ•µ•¹ÑÌ‰•½µ”…Ù…¥±…‰±”°É•Á±…”…ÍÍÕµÁÑ¥½¹ÌÝ¥Ñ É•½É‘•Ù…±Õ•Ì…¹½µÁ…É”±¥Ù”É½ÕÑ•Ì……¥¸¸%˜Ñ¡”™¥¹…°Á…É•°¥Ì¹½Ð…ÑÑÉ…Ñ¥Ù”°É•½¹Í¥‘•ÈÁ…­¥¹œ°É•µ½Ù”½ÁÑ¥½¹…°Á…­…¥¹œÝ¡•É”…ÁÁÉ½ÁÉ¥…Ñ”°½µÁ…É”„ÍÁ±¥Ð½È‘•±…ä…‘‘¥¹œ±½Ý•ÈµÁÉ¥½É¥Ñä½½‘Ì¸ˆ°€‰Q¡•É”¥Ì¹¼¡½¹•ÍÐÍ¥¹±”…¹ÍÝ•ÈÑ¼ƒŠq!½ÜµÕ ¥Ì±±¡¥¹…	ÕäÍ¡¥ÁÁ¥¹œÿŠtÝ¥Ñ¡½ÕÐ‘•ÍÑ¥¹…Ñ¥½¸°½¹Ñ•¹ÑÌ°Ý•¥¡Ð°‘¥µ•¹Í¥½¹Ì…¹Ñ¥µ¥¹œ¸Q¡”ÕÍ•™Õ°…¹ÍÝ•È¥Ì„ÁÉ½•ÍÌè•ÍÑ¥µ…Ñ”‰•™½É”‰Õå¥¹œ°¥¹ÍÁ•Ð…¹µ•…ÍÕÉ”¥¸Ñ¡”Ý…É•¡½ÕÍ”°½µÁ…É”•±¥¥‰±”±¥Ù”É½ÕÑ•Ì°…¹­••ÀÕ¹•ÉÑ…¥¸‘•ÍÑ¥¹…Ñ¥½¸½ÍÑÌÙ¥Í¥‰±”¸Q¡…ÐÁÉ½•ÍÌ‘½•Ì¹½ÐÕ…É…¹Ñ•”Ñ¡”¡•…Á•ÍÐÁ…É•°°‰ÕÐ¥ÐÁÉ•Ù•¹ÑÌ„±½Ü¥Ñ•´ÁÉ¥”™É½´‰•¥¹œµ¥ÍÑ…­•¸™½È„‘•±¥Ù•É•Ñ½Ñ…°¸‰t($$%ô($%t°($%Í½ÕÉ•9½Ñ”è€‰I•Í•…É ‰…Í¥Ìè±±¡¥¹…	Õä½™™¥¥…°Ý•‰Í¥Ñ”°½™™¥¥…°™É•¥¡Ð…±Õ±…Ñ½È…¹½™™¥¥…°…ÁÀ‘•ÍÉ¥ÁÑ¥½¸ì…±Õ±…Ñ½È™¥•±‘Ì…¹Í•ÉÙ¥”‘•ÍÉ¥ÁÑ¥½¸¡•­•ÕÕÍÐ€ÄÈ°€ÈÀÈØ¸ÕÍÑ½µ•ÈµÉ•Ù¥•ÜÁ…ÑÑ•É¹Ì…É”ÑÉ•…Ñ•…Ì…¹•‘½Ñ…°•áÁ•É¥•¹”°¹½ÐÕ¹¥Ù•ÉÍ…°ÁÉ¥¥¹œ•Ù¥‘•¹”¸ˆ(%ô)tì)Ù…È•Ñ¹±¥Í¡ÉÑ¥±”€ô€¡Í±Õœ¤€ôø•¹±¥Í¡ÉÑ¥±•Ì¹™¥¹ ¡…ÉÑ¥±”¤€ôø…ÉÑ¥±”¹Í±Õœ€ôôôÍ±Õœ¤€üü•¹±¥Í¡ÉÑ¥±•ÍlÁtì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹•ÁÐµŒ½Ñ•Éµ¥¹…°¹ÑÍà)Ù…È±½…±•ÌÄ€ôl($‰•¸ˆ°($‰‘”ˆ°($‰™Èˆ°($‰•Ìˆ°($‰¥Ðˆ°($‰Á°ˆ°($‰É¼ˆ)tì)Ù…È±½…±•½Áä€ôì(%•¸èì($%¹…µ”è€‰¹±¥Í ˆ°($%±…‰•±Ìèl($$$‰…Ñ…‰…Í”ˆ°($$$‰…Ñ•½É¥•Ìˆ°($$$‰EÕ¥‘”ˆ°($$$‰M¡¥ÁÁ¥¹œˆ°($$$‰ÉÑ¥±•Ìˆ°($$$‰Dˆ($%t°($%…ÑÌèl($$$‰M¹•…­•ÉÌˆ°($$$‰!½½‘¥•Ìˆ°($$$‰PµM¡¥ÉÑÌˆ°($$$‰)…­•ÑÌˆ°($$$‰	½ÑÑ½µÌˆ°($$$‰•ÍÍ½É¥•Ìˆ($%t°($%¡•É¼èl($$$‰AI=UP%M=YId9%9ØÌ¸Àˆ°($$$‰M•…É ±•ÍÌ¸¥¹‰•ÑÑ•È¸ˆ°($$$‰™…ÍÐ°ÍÑÉÕÑÕÉ•¥¹‘•à™½È±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••ÐÍ•…É¡•Ì¸½µÁ…É”UMÁÉ¥•Ì…¹½Á•¸Ñ¡”•á…ÐÁÉ½‘ÕÐ±¥ÍÑ¥¹œ¸ˆ($%t°($%Õ¤èl($$$‰	É½ÝÍ”ÁÉ½‘ÕÑÌˆ°($$$‰5•¹Ôˆ°($$$‰1…¹Õ…”ˆ°($$$‰EU%,EUIdˆ°($$$‰%9`MQQULˆ°($$$‰…Ñ¥Ù”É•½É‘Ìˆ°($$$‰%1QILˆ°($$$‰IMPˆ°($$$‰Q=Idˆ°($$$‰AI%}UMˆ°($$$‰MQQULˆ°($$$‰1¥¹¬Ù•É¥™¥•ˆ°($$$‰9•ÜÑ¡¥ÌÝ••¬ˆ°($$$‰5Q!Lˆ°($$$‰UIQˆ°($$$‰]!dQ!%L%9`ˆ°($$$‰I•……ÉÑ¥±”ˆ°($$$‰=Á•¸½±±•Ñ¥½¸ˆ°($$$‰M•…É ÁÉ½‘ÕÑÌ°…Ñ•½É¥•Ì°ÍÑå±•Ì¸¸¸ˆ($%t°($%Á…•Ìèì($$%ÁÉ½‘ÕÑÌèl‰AÉ½‘ÕÐ‘…Ñ…‰…Í”ˆ°€‰	É½ÝÍ”ÕÉ…Ñ•™¥¹‘ÌÝ¥Ñ ÁÉ½‘ÕÐ¥µ…•Ì°UMÁÉ¥”ÁÉ•Ù¥•ÝÌ…¹‘¥É•ÐÁ…Ñ¡ÌÑ¼•á…Ð±¥ÍÑ¥¹Ì¸‰t°($$%…Ñ•½É¥•Ìèl‰	É½ÝÍ”‰ä…Ñ•½Éäˆ°€‰MÑ…ÉÐÝ¥Ñ „™½ÕÍ•‘•Á…ÉÑµ•¹Ð°Ñ¡•¸½Á•¸Ñ¡”µ…Ñ¡¥¹œÍ¡½ÁÁ¥¹œ½±±•Ñ¥½¸¸‰t°($$$‰ÅŒµÕ¥‘”ˆèl‰!½ÜÑ¼É•…EÁ¡½Ñ½Ìˆ°€‰ÁÉ…Ñ¥…°¥¹ÍÁ•Ñ¥½¸¡•­±¥ÍÐ™½ÈÍ¡…Á”°‘•Ñ…¥±Ì°µ•…ÍÕÉ•µ•¹ÑÌ…¹Ù¥Í¥‰±”‘•™•ÑÌ‰•™½É”Í¡¥ÁÁ¥¹œ¸‰t°($$$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰A±…¸å½ÕÈÁ…É•°ˆ°€‰U¹‘•ÉÍÑ…¹½ÍÐ¥¹ÁÕÑÌ‰•™½É”ÍÕ‰µ¥ÍÍ¥½¸¸I½ÕÑ•Ì…¹™¥¹…°ÁÉ¥•Ì‘•Á•¹½¸‘•ÍÑ¥¹…Ñ¥½¸°Í¥é”°Ý•¥¡Ð…¹¥Ñ•´ÑåÁ”¸‰t°($$%…ÉÑ¥±•Ìèl‰I•Í•…É ±¥‰É…Éäˆ°€‰…Ðµ±•Õ¥‘•Ì™½ÈÁÉ½‘ÕÐ‘¥Í½Ù•Éä°¥¹ÍÁ•Ñ¥½¸…¹Á…É•°Á±…¹¹¥¹œ¸‰t°($$%™…Äèl‰É•ÅÕ•¹Ñ±ä…Í­•ÅÕ•ÍÑ¥½¹Ìˆ°€‰±•…È…¹ÍÝ•ÉÌ…‰½ÕÐÑ¡¥Ì¥¹‘•Á•¹‘•¹Ð¥¹‘•à°ÁÉ½‘ÕÐ±¥¹­Ì°EÁ¡½Ñ½Ì°ÁÉ¥¥¹œ…¹Í¡¥ÁÁ¥¹œ¸‰t($%ô°($%ÅŒèl($$%l‰½¹™¥É´Ñ¡”¥Ñ•´ˆ°€‰5…Ñ ÁÉ½‘ÕÐ°½±½ÕÈ…¹Í¥é”Ý¥Ñ Ñ¡”½É‘•ÈÉ•½É‰•™½É”¡•­¥¹œÍµ…±±•È‘•Ñ…¥±Ì¸‰t°($$%l‰¡•¬•Ù•Éä…¹±”ˆ°€‰I•Ù¥•Ü™É½¹Ð°‰…¬°Í¥‘”…¹±½Í”µÕÁÌ™½È…Íåµµ•ÑÉä°ÍÑ…¥¹Ì½È‘…µ…”¸‰t°($$%l‰UÍ”µ•…ÍÕÉ•µ•¹ÑÌˆ°€‰±…‰•°¥Ì¹½Ð„µ•…ÍÕÉ•µ•¹Ð¸½µÁ…É”ÉÕ±•ÈÁ¡½Ñ½ÌÝ¥Ñ …¸¥Ñ•´å½Ô½Ý¸¸‰t°($$%l‰%¹ÍÁ•Ð­•ä‘•Ñ…¥±Ìˆ°€‰i½½´¥¸½¸Í•…µÌ°ÁÉ¥¹ÑÌ°•µ‰É½¥‘•Éä°±½ÍÕÉ•Ì…¹¡…É‘Ý…É”¸‰t°($$%l‰•¥‘”‰•™½É”Í¡¥ÁÁ¥¹œˆ°€‰Í¬™½È±…É¥™¥…Ñ¥½¸Ý¡¥±”Ñ¡”¥Ñ•´¥ÌÍÑ¥±°¥¸Ñ¡”Ý…É•¡½ÕÍ”¸‰t($%t°($%Í¡¥ÁÁ¥¹œèl($$%l‰	Õ¥±Ñ¡”Á…É•°ˆ°€‰½µ‰¥¹”½¹±äÉ•…‘ä¥Ñ•µÌ…¹Ù•É¥™äÉ•½É‘•Ý•¥¡Ð…¹‘¥µ•¹Í¥½¹Ì¸‰t°($$%l‰I•Ù¥•ÜÉ•ÍÑÉ¥Ñ¥½¹Ìˆ°€‰	…ÑÑ•É¥•Ì°±¥ÅÕ¥‘Ì…¹Í•¹Í¥Ñ¥Ù”…Ñ•½É¥•Ì…¸¡…¹”…Ù…¥±…‰±”É½ÕÑ•Ì¸‰t°($$%l‰½µÁ…É”¡…É•…‰±”Ý•¥¡Ðˆ°€‰…ÉÉ¥•ÉÌµ…äÕÍ”…ÑÕ…°½ÈÙ½±Õµ•ÑÉ¥ŒÝ•¥¡Ð¸‰t°($$%l‰¡½½Í”ÁÉ½Ñ•Ñ¥½¸ˆ°€‰I•µ½Ù”Õ¹¹••ÍÍ…ÉäÁ…­…¥¹œ°‰ÕÐÉ•¥¹™½É”™É…¥±”¥Ñ•µÌ¸‰t°($$%l‰Y•É¥™äÑ¡”±¥Ù”ÅÕ½Ñ”ˆ°€‰I½ÕÑ•Ì°•ÍÑ¥µ…Ñ•Ì…¹ÁÉ¥•Ì¡…¹”ì½¹™¥É´Ñ¡”ÕÉÉ•¹Ð¡•­½ÕÐÅÕ½Ñ”¸‰t($%t°($%…ÉÑ¥±•Ìèl($$%l($$$$‰!½ÜÑ¼UÍ”…¸±±¡¥¹…	ÕäMÁÉ•…‘Í¡••Ð]¥Ñ¡½ÕÐ•ÑÑ¥¹œ1½ÍÐˆ°($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($$$$‰5½Ù”™É½´„¡Õ”±¥ÍÐÑ¼„Í¡½ÉÐ°½µÁ…É…‰±”ÁÉ½‘ÕÐÍ¡½ÉÑ±¥ÍÐ¸ˆ($$%t°($$%l($$$$‰EA¡½Ñ½Ìè¥Ù”µ5¥¹ÕÑ”%¹ÍÁ•Ñ¥½¸I½ÕÑ¥¹”ˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($$$$‰]¡…ÐÑ¼¡•¬™¥ÉÍÐ…¹Ý¡•¸…¸•áÑÉ„Á¡½Ñ¼¥ÌÝ½ÉÑ É•ÅÕ•ÍÑ¥¹œ¸ˆ($$%t°($$%l($$$$‰AÉ½‘ÕÐAÉ¥”ÙÌA…É•°½ÍÐˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($$$$‰]¡ä„±½Ü¥Ñ•´ÁÉ¥”‘½•Ì¹½ÐÁÉ•‘¥ÐÑ¡”™¥¹…°Í¡¥ÁÁ¥¹œÑ½Ñ…°¸ˆ($$%t($%t°($%™…Äèl($$%l‰%ÌÑ¡¥ÌÑ¡”½™™¥¥…°±±¡¥¹…	ÕäÝ•‰Í¥Ñ”üˆ°€‰9¼¸Q¡¥Ì¥Ì…¸¥¹‘•Á•¹‘•¹ÐÉ•Í•…É …¹ÁÉ½‘ÕÐµ‘¥Í½Ù•ÉäÍ¥Ñ”¸‰t°($$%l‰]¡•É”‘¼ÁÉ½‘ÕÐ‰ÕÑÑ½¹Ì±•…üˆ°€‰… …É½Á•¹ÌÑ¡”•á…ÐÁÉ½‘ÕÐ…Ð½ÕÈÍ¡½ÁÁ¥¹œ‘•ÍÑ¥¹…Ñ¥½¸°¹½Ð±±¡¥¹…	Õä¸‰t°($$%l‰É”ÁÉ¥•Ì™¥¹…°üˆ°€‰9¼¸UMÙ…±Õ•Ì…É”ÁÉ•Ù¥•ÝÌì½ÁÑ¥½¹Ì°•á¡…¹”É…Ñ•Ì…¹Í¡¥ÁÁ¥¹œ¡…¹”Ñ¡”Ñ½Ñ…°¸‰t°($$%l‰]¡…Ð…É”EÁ¡½Ñ½Ìüˆ°€‰]…É•¡½ÕÍ”¥¹ÍÁ•Ñ¥½¸Á¡½Ñ½ÌÕÍ•‰•™½É”¥¹Ñ•É¹…Ñ¥½¹…°Á…É•°ÍÕ‰µ¥ÍÍ¥½¸¸‰t°($$%l‰¼EÁ¡½Ñ½ÌÕ…É…¹Ñ•”ÅÕ…±¥Ñäüˆ°€‰9¼¸Q¡•ä¡•±ÀÝ¥Ñ Ù¥Í¥‰±”¥ÍÍÕ•Ì‰ÕÐ…¹¹½ÐÉ•Ù•…°•Ù•Éä¡¥‘‘•¸‘•Ñ…¥°¸‰t°($$%l‰…¸$Í•…É ‰äÁÉ½‘ÕÐ¹…µ”üˆ°€‰e•Ì¸Q¡”ÅÕ•Éä¥ÌÍ•¹ÐÑ¼Ñ¡”±¥Ù”Í¡½ÁÁ¥¹œ…Ñ…±½Õ”¸‰t°($$%l‰]¡ä…¸Í¡¥ÁÁ¥¹œ½ÍÐµ½É”Ñ¡…¸Ñ¡”¥Ñ•´üˆ°€‰•ÍÑ¥¹…Ñ¥½¸°É½ÕÑ”°ÑåÁ”°Á…­•Ý•¥¡Ð…¹Ù½±Õµ”‘•Ñ•Éµ¥¹”½ÍÐ¸‰t°($$%l‰¼å½Ô±¥¹¬Ñ¼½µÁ•Ñ¥¹œ…•¹ÑÌüˆ°€‰9¼¸…±±ÌÑ¼…Ñ¥½¸ÕÍ”½¹”½¹Í¥ÍÑ•¹ÐÍ¡½ÁÁ¥¹œ‘•ÍÑ¥¹…Ñ¥½¸¸‰t°($$%l‰]¡…ÐÍ•ÉÙ¥•Ì‘½•Ì±±¡¥¹…	ÕäÁÕ‰±¥±ä‘•ÍÉ¥‰”üˆ°€‰%ÑÌ½™™¥¥…°…ÁÀ‘•ÍÉ¥ÁÑ¥½¸±¥ÍÑÌÁÉ½ÕÉ•µ•¹Ð°½É‘•È™Õ±™¥±µ•¹Ð°ÅÕ…±¥Ñä¥¹ÍÁ•Ñ¥½¸°¥¹Ñ•É¹…Ñ¥½¹…°±½¥ÍÑ¥Ì…¹…™Ñ•ÈµÍ…±•ÌÍ•ÉÙ¥”ì¥¹Ñ•É¹…Ñ¥½¹…°Í¡¥ÁÁ¥¹œ¥ÌÁÉ½Ù¥‘•‰äÑ¡¥ÉµÁ…ÉÑäÍ•ÉÙ¥”½µÁ…¹¥•Ì¸‰t°($$%l‰]¡…Ð¥¹™½Éµ…Ñ¥½¸¥Ì¹••‘•™½È„Í¡¥ÁÁ¥¹œ•ÍÑ¥µ…Ñ”üˆ°€‰Q¡”½™™¥¥…°…±Õ±…Ñ½È…Í­Ì™½È‘•ÍÑ¥¹…Ñ¥½¸°ÁÉ½‘ÕÐ…Ñ•½Éä°•ÍÑ¥µ…Ñ•Ý•¥¡Ð…¹°Ý¡•É”É•±•Ù…¹Ð°Á…­…”‘¥µ•¹Í¥½¹Ì¸‰t°($$%l‰½•Ì„…±Õ±…Ñ½ÈÉ•ÍÕ±ÐÕ…É…¹Ñ•”Ñ¡”™¥¹…°Á…É•°ÁÉ¥”üˆ°€‰9¼¸¥¹…°Á…­•µ•…ÍÕÉ•µ•¹ÑÌ°¥Ñ•´•±¥¥‰¥±¥Ñä…¹ÕÉÉ•¹Ñ±ä…Ù…¥±…‰±”É½ÕÑ•Ì…¸¡…¹”Ñ¡”±¥Ù”ÅÕ½Ñ”¸‰t°($$%l‰]¡…ÐÍ¡½Õ±$Ù•É¥™ä‰•™½É”Á…É•°ÍÕ‰µ¥ÍÍ¥½¸üˆ°€‰½¹™¥É´Ñ¡”É••¥Ù•¥Ñ•´°E•Ù¥‘•¹”°É•½É‘•Ý•¥¡Ð…¹‘¥µ•¹Í¥½¹Ì°É½ÕÑ”•±¥¥‰¥±¥Ñä…¹Ñ¡”ÕÉÉ•¹Ð¡•­½ÕÐÑ½Ñ…°¸‰t($%t(%ô°(%‘”èì($%¹…µ”è€‰•ÕÑÍ ˆ°($%±…‰•±Ìèl($$$‰…Ñ•¹‰…¹¬ˆ°($$$‰-…Ñ•½É¥•¸ˆ°($$$‰EµI…Ñ•‰•Èˆ°($$$‰Y•ÉÍ…¹ˆ°($$$‰ÉÑ¥­•°ˆ°($$$‰Dˆ($%t°($%…ÑÌèl($$$‰M¹•…­•Èˆ°($$$‰!½½‘¥•Ìˆ°($$$‰PµM¡¥ÉÑÌˆ°($$$‰)…­•¸ˆ°($$$‰!½Í•¸ˆ°($$$‰•ÍÍ½¥É•Ìˆ($%t°($%¡•É¼èl($$$‰AI=U-QMU!5M!%9ØÌ¸Àˆ°($$$‰]•¹¥•ÈÍÕ¡•¸¸	•ÍÍ•È™¥¹‘•¸¸ˆ°($$$‰¥¸Í¡¹•±±•È%¹‘•à›ñÈ±±¡¥¹…	ÕäµMÁÉ•…‘Í¡••ÐµMÕ¡•¸¸UMµAÉ•¥Í”Ù•É±•¥¡•¸Õ¹‘¥É•­Ð‘…ÌAÉ½‘Õ­ÐƒÙ™™¹•¸¸ˆ($%t°($%Õ¤èl($$$‰AÉ½‘Õ­Ñ”…¹Í•¡•¸ˆ°($$$‰5•»ðˆ°($$$‰MÁÉ…¡”ˆ°($$$‰M!911MU!ˆ°($$$‰%9aMQQULˆ°($$$‰…­Ñ¥Ù”¥¹ÑË‘”ˆ°($$$‰%1QHˆ°($$$‰iUKq-MQi8ˆ°($$$‰-Q=I%ˆ°($$$‰AI%M}UMˆ°($$$‰MQQULˆ°($$$‰1¥¹¬•ÁËñ™Ðˆ°($$$‰9•Ô‘¥•Í”]½¡”ˆ°($$$‰QIHˆ°($$$‰-UIQ%IPˆ°($$$‰]IU4%MH%9`ˆ°($$$‰ÉÑ¥­•°±•Í•¸ˆ°($$$‰-½±±•­Ñ¥½¸ƒÙ™™¹•¸ˆ°($$$‰AÉ½‘Õ­Ñ”°-…Ñ•½É¥•¸°MÑ¥±”ÍÕ¡•¸¸¸¸ˆ($%t°($%Á…•Ìèì($$%ÁÉ½‘ÕÑÌèl‰AÉ½‘Õ­Ñ‘…Ñ•¹‰…¹¬ˆ°€‰-ÕÉ…Ñ¥•ÉÑ”AÉ½‘Õ­Ñ”µ¥Ð	¥±‘•É¸°UMµAÉ•¥ÍÙ½ÉÍ¡…ÔÕ¹‘¥É•­Ñ•´1¥¹¬¸‰t°($$%…Ñ•½É¥•Ìèl‰9… -…Ñ•½É¥”ˆ°€‰_‘¡±”•¥¹”‰Ñ•¥±Õ¹œÕ¹ƒÙ™™¹”‘¥”Á…ÍÍ•¹‘”-½±±•­Ñ¥½¸¸‰t°($$$‰ÅŒµÕ¥‘”ˆèl‰Eµ½Ñ½ÌÉ¥¡Ñ¥œÁËñ™•¸ˆ°€‰¡•­±¥ÍÑ”›ñÈ½É´°•Ñ…¥±Ì°5‡}”Õ¹Í¥¡Ñ‰…É”7‘¹•°Ù½È‘•´Y•ÉÍ…¹¸‰t°($$$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰A…­•ÐÁ±…¹•¸ˆ°€‰-½ÍÑ•¸£‘¹•¸Ù½¸i¥•°°ËÛ}”°•Ý¥¡ÐÕ¹ÉÑ¥­•±…ÉÐ…ˆ¸‰t°($$%…ÉÑ¥±•Ìèl‰I…Ñ•‰•Èµ	¥‰±¥½Ñ¡•¬ˆ°€‰…­Ñ•¹‰…Í¥•ÉÑ”¹±•¥ÑÕ¹•¸éÔMÕ¡”°AËñ™Õ¹œÕ¹A…­•ÑÁ±…¹Õ¹œ¸‰t°($$%™…Äèl‰#‘Õ™¥”É…•¸ˆ°€‰-±…É”¹ÑÝ½ÉÑ•¸éÔ%¹‘•à°1¥¹­Ì°Eµ½Ñ½Ì°AÉ•¥Í•¸Õ¹Y•ÉÍ…¹¸‰t($%ô°($%ÅŒèl($$%l‰ÉÑ¥­•°‰•ÍÓ‘Ñ¥•¸ˆ°€‰9…µ”°…É‰”Õ¹ËÛ}”éÕ•ÉÍÐµ¥Ð‘•È	•ÍÑ•±±Õ¹œ…‰±•¥¡•¸¸‰t°($$%l‰±±”]¥¹­•°ÁËñ™•¸ˆ°€‰Y½É‘•ÉÍ•¥Ñ”°Kñ­Í•¥Ñ”°M•¥Ñ•¸Õ¹9…¡…Õ™¹…¡µ•¸ÁËñ™•¸¸‰t°($$%l‰5‡}”¹ÕÑé•¸ˆ°€‰Ñ¥­•ÑÑ•¸Í¥¹­•¥¹”5‡}”¸5¥Ð•¥•¹•È-±•¥‘Õ¹œÙ•É±•¥¡•¸¸‰t°($$%l‰•Ñ…¥±ÌÙ•ÉËÛ}•É¸ˆ°€‰;‘¡Ñ”°ÉÕ­”°MÑ¥­•É•¤°Y•ÉÍ¡³ñÍÍ”Õ¹	•Í¡³‘”ÁËñ™•¸¸‰t°($$%l‰Y½ÈY•ÉÍ…¹•¹ÑÍ¡•¥‘•¸ˆ°€‰U¹­±…É”•Ñ…¥±Ì­³‘É•¸°Í½±…¹”‘•ÈÉÑ¥­•°¥´1…•È¥ÍÐ¸‰t($%t°($%Í¡¥ÁÁ¥¹œèl($$%l‰A…­•ÐéÕÍ…µµ•¹ÍÑ•±±•¸ˆ°€‰9ÕÈÙ•ÉÍ…¹‘‰•É•¥Ñ”ÉÑ¥­•°‹ñ¹‘•±¸Õ¹5‡}”ÁËñ™•¸¸‰t°($$%l‰¥¹Í¡Ë‘¹­Õ¹•¸ÁËñ™•¸ˆ°€‰­­ÕÌ°³ñÍÍ¥­•¥Ñ•¸Õ¹Í•¹Í¥‰±”]…É•¸¯Ù¹¹•¸I½ÕÑ•¸‰•É•¹é•¸¸‰t°($$%l‰‰É•¡¹Õ¹Í•Ý¥¡ÐÙ•É±•¥¡•¸ˆ°€‰Ì­…¹¸É•…±•Ì½‘•ÈY½±Õµ•¹•Ý¥¡Ð•±Ñ•¸¸‰t°($$%l‰M¡ÕÑèß‘¡±•¸ˆ°€‰U¹»ÙÑ¥”Y•ÉÁ…­Õ¹œ•¹Ñ™•É¹•¸°i•É‰É•¡±¥¡•ÌÍ£ñÑé•¸¸‰t°($$%l‰­ÑÕ•±±•Ì¹•‰½ÐÁËñ™•¸ˆ°€‰I½ÕÑ•¸Õ¹AÉ•¥Í”ƒ‘¹‘•É¸Í¥ ìµ‡}•‰±¥ ¥ÍÐ‘…Ì…­ÑÕ•±±”¹•‰½Ð¸‰t($%t°($%…ÉÑ¥±•Ìèl($$%l($$$$‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••Ð½¡¹”¡…½Ì¹ÕÑé•¸ˆ°($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($$$$‰Y½¸•¥¹•ÈÉ¿}•¸1¥ÍÑ”éÔ•¥¹•È­ÕÉé•¸AÉ½‘Õ­Ñ…ÕÍÝ…¡°¸ˆ($$%t°($$%l($$$$‰Eµ½Ñ½ÌèAËñ™Õ¹œ¥¸›ñ¹˜5¥¹ÕÑ•¸ˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($$$$‰]…ÌéÕ•ÉÍÐ•ÁËñ™ÐÝ¥ÉÕ¹Ý…¹¸•¥¸iÕÍ…Ñé™½Ñ¼Í¥¹¹Ù½±°¥ÍÐ¸ˆ($$%t°($$%l($$$$‰AÉ½‘Õ­ÑÁÉ•¥ÌÕ¹A…­•Ñ­½ÍÑ•¸ˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($$$$‰]…ÉÕ´•¥¸Ÿñ¹ÍÑ¥•ÈÉÑ¥­•°­•¥¹•¸Ÿñ¹ÍÑ¥•¸Y•ÉÍ…¹…É…¹Ñ¥•ÉÐ¸ˆ($$%t($%t°($%™…Äèl($$%l‰%ÍÐ‘¥•Ì‘¥”½™™¥é¥•±±”±±¡¥¹…	ÕäµM•¥Ñ”üˆ°€‰9•¥¸¸¥•Ì¥ÍÐ•¥¹”Õ¹…‰£‘¹¥”AÉ½‘Õ­ÑÍÕ¡”¸‰t°($$%l‰]½¡¥¸›ñ¡É•¸AÉ½‘Õ­Ñ‰ÕÑÑ½¹Ìüˆ°€‰¥É•­ÐéÕ´AÉ½‘Õ­ÐÕ¹Í•É•Ì¥¹­…Õ™Íé¥•±Ì°¹¥¡ÐéÔ±±¡¥¹…	Õä¸‰t°($$%l‰M¥¹AÉ•¥Í”•¹‘Ÿñ±Ñ¥œüˆ°€‰9•¥¸¸=ÁÑ¥½¹•¸°-ÕÉÍ”Õ¹Y•ÉÍ…¹ƒ‘¹‘•É¸‘•¸¹‘‰•ÑÉ…œ¸‰t°($$%l‰]…ÌÍ¥¹Eµ½Ñ½Ìüˆ°€‰1…•É™½Ñ½ÌéÕÈAËñ™Õ¹œÙ½È‘•´¥¹Ñ•É¹…Ñ¥½¹…±•¸Y•ÉÍ…¹¸‰t°($$%l‰…É…¹Ñ¥•É•¸Í¥”EÕ…±¥Ó‘Ðüˆ°€‰9•¥¸¸M¥”é•¥•¸Í¥¡Ñ‰…É”°…‰•È¹¥¡Ð…±±”Ù•ÉÍÑ•­Ñ•¸•Ñ…¥±Ì¸‰t°($$%l‰-…¹¸¥ ¹… 9…µ•¸ÍÕ¡•¸üˆ°€‰)„¸…ÌMÑ¥¡Ý½ÉÐÝ¥É…¸‘•¸AÉ½‘Õ­Ñ­…Ñ…±½œƒñ‰•É•‰•¸¸‰t°($$%l‰]…ÉÕ´­…¹¸Y•ÉÍ…¹Ñ•ÕÉ•ÈÍ•¥¸üˆ°€‰i¥•°°I½ÕÑ”°]…É•¹…ÉÐ°•Ý¥¡ÐÕ¹Y½±Õµ•¸‰•ÍÑ¥µµ•¸‘•¸AÉ•¥Ì¸‰t°($$%l‰¥‰Ð•Ì1¥¹­ÌéÔ…¹‘•É•¸•¹Ñ•¸üˆ°€‰9•¥¸¸±±”!…¹‘±Õ¹Í±¥¹­Ì¹ÕÑé•¸•¥¸¥¹­…Õ™Íé¥•°¸‰t($%t(%ô°(%™Èèì($%¹…µ”è€‰É…»…¥Ìˆ°($%±…‰•±Ìèl($$$‰	…Í”ÁÉ½‘Õ¥ÑÌˆ°($$$‰…Ó¥½É¥•Ìˆ°($$$‰Õ¥‘”Eˆ°($$$‰1¥ÙÉ…¥Í½¸ˆ°($$$‰ÉÑ¥±•Ìˆ°($$$‰Dˆ($%t°($%…ÑÌèl($$$‰	…Í­•ÑÌˆ°($$$‰MÝ•…ÑÌˆ°($$$‰PµÍ¡¥ÉÑÌˆ°($$$‰Y•ÍÑ•Ìˆ°($$$‰A…¹Ñ…±½¹Ìˆ°($$$‰•ÍÍ½¥É•Ìˆ($%t°($%¡•É¼èl($$$‰5=QUH%=UYIQØÌ¸Àˆ°($$$‰¡•É¡•èµ½¥¹Ì¸QÉ½ÕÙ•èµ¥•Õà¸ˆ°($$$‰U¸¥¹‘•àÍÑÉÕÑÕË¤Á½ÕÈ±•ÌÉ•¡•É¡•Ì±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¸½µÁ…É•è±•ÌÁÉ¥àUM•Ð½ÕÙÉ•è±„™¥¡”•á…Ñ”¸ˆ($%t°($%Õ¤èl($$$‰Y½¥È±•ÌÁÉ½‘Õ¥ÑÌˆ°($$$‰5•¹Ôˆ°($$$‰1…¹Õ”ˆ°($$$‰I!I!IA%ˆ°($$$‹%QP3Še%9`ˆ°($$$‰™¥¡•Ì…Ñ¥Ù•Ìˆ°($$$‰%1QILˆ°($$$‰K%%9%Q%1%MHˆ°($$$‰S%=I%ˆ°($$$‰AI%a}UMˆ°($$$‰MQQUPˆ°($$$‰1¥•¸Û¥É¥™§¤ˆ°($$$‰9½ÕÙ•…Ô•ÑÑ”Í•µ…¥¹”ˆ°($$$‰K%MU1QQLˆ°($$$‰O%1Q%=8ˆ°($$$‰A=UIEU=$P%9`ˆ°($$$‰1¥É”³Še…ÉÑ¥±”ˆ°($$$‰=ÕÙÉ¥È±„½±±•Ñ¥½¸ˆ°($$$‰I•¡•É¡•ÈÁÉ½‘Õ¥ÑÌ°…Ó¥½É¥•Ì°ÍÑå±•Ì¸¸¸ˆ($%t°($%Á…•Ìèì($$%ÁÉ½‘ÕÑÌèl‰	…Í”‘”ÁÉ½‘Õ¥ÑÌˆ°€‰AÉ½‘Õ¥ÑÌÏ¥±•Ñ¥½¹»¥Ì…Ù•Œ¥µ…•Ì°ÁÉ¥àUM•Ð±¥•¸‘¥É•Ð¸‰t°($$%…Ñ•½É¥•Ìèl‰A…È…Ó¥½É¥”ˆ°€‰¡½¥Í¥ÍÍ•èÕ¸É…å½¸ÁÕ¥Ì½ÕÙÉ•è±„½±±•Ñ¥½¸¸‰t°($$$‰ÅŒµÕ¥‘”ˆèl‰1¥É”±•ÌÁ¡½Ñ½ÌEˆ°€‰[¥É¥™¥•è™½Éµ”°“¥Ñ…¥±Ì°µ•ÍÕÉ•Ì•Ð“¥™…ÕÑÌÙ¥Í¥‰±•Ì¸‰t°($$$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰A±…¹¥™¥•È±”½±¥Ìˆ°€‰1”¿íÐ“¥Á•¹‘ÔÁ…åÌ°‘ÔÙ½±Õµ”°‘ÔÁ½¥‘Ì•Ð‘ÔÑåÁ”“Še…ÉÑ¥±”¸‰t°($$%…ÉÑ¥±•Ìèl‰	¥‰±¥½Ñ£¡ÅÕ”‘”Õ¥‘•Ìˆ°€‰½¹Í•¥±Ì™…ÑÕ•±ÌÍÕÈ±„É•¡•É¡”°±”½¹ÑËÑ±”•Ð³Še•áÃ¥‘¥Ñ¥½¸¸‰t°($$%™…Äèl‰EÕ•ÍÑ¥½¹Ì™Ë¥ÅÕ•¹Ñ•Ìˆ°€‰K¥Á½¹Í•ÌÍÕÈ³Še¥¹‘•à°±•Ì±¥•¹Ì°±•ÌÁ¡½Ñ½ÌE•Ð±•Ì¿íÑÌ¸‰t($%ô°($%ÅŒèl($$%l‰½¹™¥Éµ•È³Še…ÉÑ¥±”ˆ°€‰½µÁ…É•è¹½´°½Õ±•ÕÈ•ÐÑ…¥±±”…Ù•Œ±„½µµ…¹‘”¸‰t°($$%l‰Y½¥ÈÑ½ÕÌ±•Ì…¹±•Ìˆ°€‰½¹ÑËÑ±•è™…”°‘½Ì°ÑÓ¥Ì•ÐÉ½ÌÁ±…¹Ì¸‰t°($$%l‰UÑ¥±¥Í•È±•Ìµ•ÍÕÉ•Ìˆ°€‰½µÁ…É•è±•Ìµ•ÍÕÉ•Ì…Ù•ŒÕ¸Û©Ñ•µ•¹Ð½¹¹Ô¸‰t°($$%l‰i½½µ•ÈÍÕÈ±•Ì“¥Ñ…¥±Ìˆ°€‰%¹ÍÁ•Ñ•è½ÕÑÕÉ•Ì°¥µÁÉ•ÍÍ¥½¹Ì°‰É½‘•É¥•Ì•Ð™•Éµ•ÑÕÉ•Ì¸‰t°($$%l‰¥¥‘•È…Ù…¹Ð³Še•¹Ù½¤ˆ°€‰•µ…¹‘•èÕ¹”ÁË¥¥Í¥½¸Ñ…¹ÐÅÕ”³Še…ÉÑ¥±”•ÍÐƒ€³Še•¹ÑÉ•ÃÑÐ¸‰t($%t°($%Í¡¥ÁÁ¥¹œèl($$%l‰½µÁ½Í•È±”½±¥Ìˆ°€‰I•É½ÕÁ•è±•Ì…ÉÑ¥±•ÌÁË©ÑÌ•ÐÛ¥É¥™¥•è±•Ì‘¥µ•¹Í¥½¹Ì¸‰t°($$%l‰[¥É¥™¥•È±•ÌÉ•ÍÑÉ¥Ñ¥½¹Ìˆ°€‰	…ÑÑ•É¥•Ì°±¥ÅÕ¥‘•Ì•Ð…ÉÑ¥±•ÌÍ•¹Í¥‰±•ÌÁ•ÕÙ•¹Ð±¥µ¥Ñ•È±•Ì±¥¹•Ì¸‰t°($$%l‰½µÁ…É•È±”Á½¥‘Ì™…ÑÕË¤ˆ°€‰1”Á½¥‘ÌË¥•°½ÔÙ½±Õ·¥ÑÉ¥ÅÕ”Á•ÕÐÏŠe…ÁÁ±¥ÅÕ•È¸‰t°($$%l‰¡½¥Í¥È±„ÁÉ½Ñ•Ñ¥½¸ˆ°€‰I•Ñ¥É•è±”ÍÕÁ•É™±Ôµ…¥ÌÁÉ½Ó¥•è±•Ì½‰©•ÑÌ™É…¥±•Ì¸‰t°($$%l‰[¥É¥™¥•È±”‘•Ù¥Ìˆ°€‰1¥¹•Ì•ÐÁÉ¥à¡…¹•¹Ðì½¹™¥Éµ•è…Ôµ½µ•¹Ð‘”³Še•¹Ù½¤¸‰t($%t°($%…ÉÑ¥±•Ìèl($$%l($$$$‰UÑ¥±¥Í•ÈÕ¸ÍÁÉ•…‘Í¡••Ð±±¡¥¹…	Õä•™™¥…•µ•¹Ðˆ°($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($$$$‰QÉ…¹Í™½Éµ•ÈÕ¹”±½¹Õ”±¥ÍÑ”•¸½ÕÉÑ”Ï¥±•Ñ¥½¸¸ˆ($$%t°($$%l($$$$‰A¡½Ñ½ÌE€è½¹ÑËÑ±”•¸¥¹Äµ¥¹ÕÑ•Ìˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($$$$‰1•ÌÁÉ¥½É¥Ó¥Ì•Ð±”‰½¸µ½µ•¹ÐÁ½ÕÈ‘•µ…¹‘•ÈÕ¹”Á¡½Ñ¼¸ˆ($$%t°($$%l($$$$‰AÉ¥àÁÉ½‘Õ¥Ð•Ð¿íÐ‘Ô½±¥Ìˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($$$$‰A½ÕÉÅÕ½¤Õ¸…ÉÑ¥±”Á•Ô¡•È¹”…É…¹Ñ¥ÐÁ…ÌÕ¸•¹Ù½¤Á•Ô¡•È¸ˆ($$%t($%t°($%™…Äèl($$%l‰ÍÐµ”±”Í¥Ñ”½™™¥¥•°±±¡¥¹…	Õä€üˆ°€‰9½¸¸Še•ÍÐÕ¸Õ¥‘”¥¹“¥Á•¹‘…¹Ð¸‰t°($$%l‰?ä·¡¹•¹Ð±•Ì‰½ÕÑ½¹Ì€üˆ°€‰Y•ÉÌ±„™¥¡”•á…Ñ”‘”¹½ÑÉ”‘•ÍÑ¥¹…Ñ¥½¸°Á…ÌÙ•ÉÌ±±¡¥¹…	Õä¸‰t°($$%l‰1•ÌÁÉ¥àÍ½¹Ðµ¥±Ì“¥™¥¹¥Ñ¥™Ì€üˆ°€‰9½¸¸=ÁÑ¥½¹Ì°¡…¹”•Ð±¥ÙÉ…¥Í½¸µ½‘¥™¥•¹Ð±”Ñ½Ñ…°¸‰t°($$%l‰EÕ”Í½¹Ð±•ÌÁ¡½Ñ½ÌE€üˆ°€‰•ÌÁ¡½Ñ½Ì“Še•¹ÑÉ•ÃÑÐ…Ù…¹Ð³Še•¹Ù½¤¥¹Ñ•É¹…Ñ¥½¹…°¸‰t°($$%l‰…É…¹Ñ¥ÍÍ•¹Ðµ•±±•Ì±„ÅÕ…±¥Ó¤€üˆ°€‰9½¸¸±±•Ìµ½¹ÑÉ•¹Ð•ÉÑ…¥¹Ì“¥™…ÕÑÌ°Á…ÌÑ½ÕÌ±•Ì“¥Ñ…¥±Ì…£¥Ì¸‰t°($$%l‰AÕ¥Ìµ©”¡•É¡•ÈÁ…È¹½´€üˆ°€‰=Õ¤¸1”µ½Ðµ³¤•ÍÐÑÉ…¹Íµ¥Ì…Ô…Ñ…±½Õ”¸‰t°($$%l‰A½ÕÉÅÕ½¤±„±¥ÙÉ…¥Í½¸Á•ÕÐµ•±±”¿íÑ•ÈÁ±ÕÌ€üˆ°€‰A…åÌ°±¥¹”°Á½¥‘Ì•ÐÙ½±Õµ”“¥Ñ•Éµ¥¹•¹Ð±”¿íÐ¸‰t°($$%l‰1¥•¹ÌÙ•ÉÌ“Še…ÕÑÉ•Ì…•¹ÑÌ€üˆ°€‰9½¸¸Q½ÕÌ±•Ì‰½ÕÑ½¹Ì…É‘•¹ÐÕ¹”Í•Õ±”‘•ÍÑ¥¹…Ñ¥½¸¸‰t($%t(%ô°(%•Ìèì($%¹…µ”è€‰ÍÁ‡Å½°ˆ°($%±…‰•±Ìèl($$$‰	…Í”‘”‘…Ñ½Ìˆ°($$$‰…Ñ•½Ëµ…Ìˆ°($$$‰×µ„Eˆ°($$$‰¹Ûµ¼ˆ°($$$‰ÉÓµÕ±½Ìˆ°($$$‰Dˆ($%t°($%…ÑÌèl($$$‰i…Á…Ñ¥±±…Ìˆ°($$$‰MÕ‘…‘•É…Ìˆ°($$$‰…µ¥Í•Ñ…Ìˆ°($$$‰¡…ÅÕ•Ñ…Ìˆ°($$$‰A…¹Ñ…±½¹•Ìˆ°($$$‰•Í½É¥½Ìˆ($%t°($%¡•É¼èl($$$‰5=Q=HAI=UQ=LØÌ¸Àˆ°($$$‰	ÕÍ„µ•¹½Ì¸¹Õ•¹ÑÉ„µ•©½È¸ˆ°($$$‹5¹‘¥”•ÍÑÉÕÑÕÉ…‘¼Á…É„‹éÍÅÕ•‘…Ì±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¸½µÁ…É„ÁÉ•¥½ÌUMä…‰É”•°ÁÉ½‘ÕÑ¼•á…Ñ¼¸ˆ($%t°($%Õ¤èl($$$‰Y•ÈÁÉ½‘ÕÑ½Ìˆ°($$$‰5•»èˆ°($$$‰%‘¥½µ„ˆ°($$$‰iMEUKA%ˆ°($$$‰MQ<0ƒ59%ˆ°($$$‰É•¥ÍÑÉ½Ì…Ñ¥Ù½Ìˆ°($$$‰%1QI=Lˆ°($$$‰I%9%%Hˆ°($$$‰Q=K5ˆ°($$$‰AI%=}UMˆ°($$$‰MQ<ˆ°($$$‰¹±…”Ù•É¥™¥…‘¼ˆ°($$$‰9Õ•Ù¼•ÍÑ„Í•µ…¹„ˆ°($$$‰IMU1Q=Lˆ°($$$‰M1'M8ˆ°($$$‰A=HEW$MQƒ59%ˆ°($$$‰1••È…ÉÓµÕ±¼ˆ°($$$‰‰É¥È½±•§Í¸ˆ°($$$‰	ÕÍ…ÈÁÉ½‘ÕÑ½Ì°…Ñ•½Ëµ…Ì°•ÍÑ¥±½Ì¸¸¸ˆ($%t°($%Á…•Ìèì($$%ÁÉ½‘ÕÑÌèl‰	…Í”‘”ÁÉ½‘ÕÑ½Ìˆ°€‰AÉ½‘ÕÑ½ÌÍ•±•¥½¹…‘½Ì½¸¥·…•¹•Ì°ÁÉ•¥¼UMä•¹±…”‘¥É•Ñ¼¸‰t°($$%…Ñ•½É¥•Ìèl‰áÁ±½É…È…Ñ•½Ëµ…Ìˆ°€‰±¥”Õ¸‘•Á…ÉÑ…µ•¹Ñ¼ä…‰É”ÍÔ½±•§Í¸¸‰t°($$$‰ÅŒµÕ¥‘”ˆèl‰Íµ¼±••È™½Ñ½ÌEˆ°€‰½µÁÉÕ•‰„™½Éµ„°‘•Ñ…±±•Ì°µ•‘¥‘…Ìä‘•™•Ñ½ÌÙ¥Í¥‰±•Ì¸‰t°($$$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰A±…¹¥™¥„•°Á…ÅÕ•Ñ”ˆ°€‰°½ÍÑ”‘•Á•¹‘”‘”‘•ÍÑ¥¹¼°Ñ…µ‡Å¼°Á•Í¼äÑ¥Á¼¸‰t°($$%…ÉÑ¥±•Ìèl‰	¥‰±¥½Ñ•„‘”×µ…Ìˆ°€‰½¹Í•©½Ì‰…Í…‘½Ì•¸¡•¡½ÌÍ½‰É”‹éÍÅÕ•‘„°½¹ÑÉ½°ä•¹Ûµ¼¸‰t°($$%™…Äèl‰AÉ•Õ¹Ñ…Ì™É•Õ•¹Ñ•Ìˆ°€‰I•ÍÁÕ•ÍÑ…ÌÍ½‰É”•°ƒµ¹‘¥”°•¹±…•Ì°™½Ñ½ÌEä½ÍÑ•Ì¸‰t($%ô°($%ÅŒèl($$%l‰½¹™¥Éµ…È•°…ÉÓµÕ±¼ˆ°€‰½µÁ…É„¹½µ‰É”°½±½ÈäÑ…±±„½¸•°Á•‘¥‘¼¸‰t°($$%l‰I•Ù¥Í…ÈÑ½‘½Ì±½Ìƒ…¹Õ±½Ìˆ°€‰5¥É„™É•¹Ñ”°•ÍÁ…±‘„°±…Ñ•É…±•ÌäÁÉ¥µ•É½ÌÁ±…¹½Ì¸‰t°($$%l‰UÍ…Èµ•‘¥‘…Ìˆ°€‰½µÁ…É„±„¥¹Ñ„·¥ÑÉ¥„½¸Õ¹„ÁÉ•¹‘„ÁÉ½Á¥„¸‰t°($$%l‰µÁ±¥…È‘•Ñ…±±•Ìˆ°€‰I•Ù¥Í„½ÍÑÕÉ…Ì°•ÍÑ…µÁ…‘½Ì°‰½É‘…‘½Ìä¥•ÉÉ•Ì¸‰t°($$%l‰•¥‘¥È…¹Ñ•Ì‘•°•¹Ûµ¼ˆ°€‰±…É„‘Õ‘…Ìµ¥•¹ÑÉ…Ì•°…ÉÓµÕ±¼Í¥Õ”•¸…±µ…¥¸¸‰t($%t°($%Í¡¥ÁÁ¥¹œèl($$%l‰É•…È•°Á…ÅÕ•Ñ”ˆ°€‰ÉÕÁ„…ÉÓµÕ±½Ì±¥ÍÑ½ÌäÙ•É¥™¥„‘¥µ•¹Í¥½¹•Ì¸‰t°($$%l‰I•Ù¥Í…ÈÉ•ÍÑÉ¥¥½¹•Ìˆ°€‰	…Ñ•Ëµ…Ì°³µÅÕ¥‘½Ìä…ÉÓµÕ±½ÌÍ•¹Í¥‰±•ÌÁÕ•‘•¸±¥µ¥Ñ…ÈÉÕÑ…Ì¸‰t°($$%l‰½µÁ…É…ÈÁ•Í¼™…ÑÕÉ…‰±”ˆ°€‰AÕ•‘”…Á±¥…ÉÍ”Á•Í¼É•…°¼Ù½±Õ·¥ÑÉ¥¼¸‰t°($$%l‰±•¥ÈÁÉ½Ñ•§Í¸ˆ°€‰EÕ¥Ñ„•µ‰…±…©”¥¹¹••Í…É¥¼äÁÉ½Ñ•”±¼™Ë…¥°¸‰t°($$%l‰Y•É¥™¥…È½Ñ¥é…§Í¸ˆ°€‰IÕÑ…ÌäÁÉ•¥½Ì…µ‰¥…¸ì½¹™¥Éµ„•°¥µÁ½ÉÑ”…ÑÕ…°¸‰t($%t°($%…ÉÑ¥±•Ìèl($$%l($$$$‰UÍ…ÈÕ¸ÍÁÉ•…‘Í¡••Ð±±¡¥¹…	ÕäÍ¥¸Á•É‘•ÉÍ”ˆ°($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($$$$‰”Õ¹„±¥ÍÑ„•¹½Éµ”„Õ¹„Í•±•§Í¸½µÁ…É…‰±”¸ˆ($$%t°($$%l($$$$‰½Ñ½ÌEèÉ•Ù¥Í§Í¸•¸¥¹¼µ¥¹ÕÑ½Ìˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($$$$‰E×¤É•Ù¥Í…ÈÁÉ¥µ•É¼ä×…¹‘¼Á•‘¥È½ÑÉ„™½Ñ¼¸ˆ($$%t°($$%l($$$$‰AÉ•¥¼‘•°ÁÉ½‘ÕÑ¼ä½ÍÑ”‘•°Á…ÅÕ•Ñ”ˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($$$$‰A½ÈÅ×¤Õ¸ÁÉ½‘ÕÑ¼‰…É…Ñ¼¹¼…Í•ÕÉ„Õ¸•¹Ûµ¼‰…É…Ñ¼¸ˆ($$%t($%t°($%™…Äèl($$%l‹
ýÌ±„Ý•ˆ½™¥¥…°‘”±±¡¥¹…	Õäüˆ°€‰9¼¸ÌÕ¹„×µ„¥¹‘•Á•¹‘¥•¹Ñ”¸‰t°($$%l‹
ý“Í¹‘”±±•Ù…¸±½Ì‰½Ñ½¹•Ìüˆ°€‰±„™¥¡„•á…Ñ„‘”¹Õ•ÍÑÉ¼‘•ÍÑ¥¹¼°¹¼„±±¡¥¹…	Õä¸‰t°($$%l‹
ýM½¸ÁÉ•¥½Ì™¥¹…±•Ìüˆ°€‰9¼¸=Á¥½¹•Ì°…µ‰¥¼ä•¹Ûµ¼µ½‘¥™¥…¸•°Ñ½Ñ…°¸‰t°($$%l‹
ýE×¤Í½¸±…Ì™½Ñ½ÌEüˆ°€‰½Ñ½Ì‘”…±µ…¥¸…¹Ñ•Ì‘•°•¹Ûµ¼¥¹Ñ•É¹…¥½¹…°¸‰t°($$%l‹
ý…É…¹Ñ¥é…¸…±¥‘…üˆ°€‰9¼¸åÕ‘…¸½¸‘•™•Ñ½ÌÙ¥Í¥‰±•Ì°¹¼½¸Ñ½‘¼±¼½Õ±Ñ¼¸‰t°($$%l‹
ýAÕ•‘¼‰ÕÍ…ÈÁ½È¹½µ‰É”üˆ°€‰O´¸1„Á…±…‰É„Í”•¹Ûµ„…°…Ó…±½¼¸‰t°($$%l‹
ýA½ÈÅ×¤•°•¹Ûµ¼ÁÕ•‘”½ÍÑ…È·…Ìüˆ°€‰•ÍÑ¥¹¼°ÉÕÑ„°Á•Í¼äÙ½±Õµ•¸‘•Ñ•Éµ¥¹…¸•°ÁÉ•¥¼¸‰t°($$%l‹
ý!…ä•¹±…•Ì„½ÑÉ½Ì…•¹Ñ•Ìüˆ°€‰9¼¸Q½‘½Ì±½Ì‰½Ñ½¹•ÌÕÍ…¸Õ¸‘•ÍÑ¥¹¼¸‰t($%t(%ô°(%¥Ðèì($%¹…µ”è€‰%Ñ…±¥…¹¼ˆ°($%±…‰•±Ìèl($$$‰…Ñ…‰…Í”ˆ°($$$‰…Ñ•½É¥”ˆ°($$$‰Õ¥‘„Eˆ°($$$‰MÁ•‘¥é¥½¹”ˆ°($$$‰ÉÑ¥½±¤ˆ°($$$‰Dˆ($%t°($%…ÑÌèl($$$‰M¹•…­•Èˆ°($$$‰•±Á”ˆ°($$$‰PµÍ¡¥ÉÐˆ°($$$‰¥…¡”ˆ°($$$‰A…¹Ñ…±½¹¤ˆ°($$$‰•ÍÍ½É¤ˆ($%t°($%¡•É¼èl($$$‰5=Q=I$I%IØÌ¸Àˆ°($$$‰•É„µ•¹¼¸QÉ½Ù„µ•±¥¼¸ˆ°($$$‰%¹‘¥”ÍÑÉÕÑÑÕÉ…Ñ¼Á•ÈÉ¥•É¡”±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¸½¹™É½¹Ñ„¤ÁÉ•éé¤UM”…ÁÉ¤¥°ÁÉ½‘½ÑÑ¼•Í…ÑÑ¼¸ˆ($%t°($%Õ¤èl($$$‰Y•‘¤ÁÉ½‘½ÑÑ¤ˆ°($$$‰5•¹Ôˆ°($$$‰1¥¹Õ„ˆ°($$$‰I%IIA%ˆ°($$$‰MQQ<%9%ˆ°($$$‰Í¡•‘”…ÑÑ¥Ù”ˆ°($$$‰%1QI$ˆ°($$$‰iiIˆ°($$$‰Q=I%ˆ°($$$‰AIii=}UMˆ°($$$‰MQQ<ˆ°($$$‰1¥¹¬Ù•É¥™¥…Ñ¼ˆ°($$$‰9Õ½Ù¤ÅÕ•ÍÑ„Í•ÑÑ¥µ…¹„ˆ°($$$‰I%MU1QQ$ˆ°($$$‰M1i%=9Q$ˆ°($$$‰AI#$EUMQ<%9%ˆ°($$$‰1•¤…ÉÑ¥½±¼ˆ°($$$‰ÁÉ¤½±±•é¥½¹”ˆ°($$$‰•É„ÁÉ½‘½ÑÑ¤°…Ñ•½É¥”°ÍÑ¥±¤¸¸¸ˆ($%t°($%Á…•Ìèì($$%ÁÉ½‘ÕÑÌèl‰…Ñ…‰…Í”ÁÉ½‘½ÑÑ¤ˆ°€‰AÉ½‘½ÑÑ¤Í•±•é¥½¹…Ñ¤½¸¥µµ…¥¹¤°ÁÉ•éé¤UM”±¥¹¬‘¥É•ÑÑ¼¸‰t°($$%…Ñ•½É¥•Ìèl‰ÍÁ±½É„…Ñ•½É¥”ˆ°€‰M•±¤Õ¸É•Á…ÉÑ¼”…ÁÉ¤±„½±±•é¥½¹”¸‰t°($$$‰ÅŒµÕ¥‘”ˆèl‰1••É”±”™½Ñ¼Eˆ°€‰½¹ÑÉ½±±„™½Éµ„°‘•ÑÑ…±¤°µ¥ÍÕÉ””‘¥™•ÑÑ¤Ù¥Í¥‰¥±¤¸‰t°($$$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰A¥…¹¥™¥„¥°Á…¼ˆ°€‰%°½ÍÑ¼‘¥Á•¹‘”‘„‘•ÍÑ¥¹…é¥½¹”°‘¥µ•¹Í¥½¹¤°Á•Í¼”Ñ¥Á¼¸‰t°($$%…ÉÑ¥±•Ìèl‰Õ¥‘””É¥•É¡”ˆ°€‰½¹Ñ•¹ÕÑ¤‰…Í…Ñ¤ÍÔ™…ÑÑ¤Á•ÈÉ¥•É„°½¹ÑÉ½±±¼”ÍÁ•‘¥é¥½¹”¸‰t°($$%™…Äèl‰½µ…¹‘”™É•ÅÕ•¹Ñ¤ˆ°€‰I¥ÍÁ½ÍÑ”ÍÔ¥¹‘¥”°±¥¹¬°™½Ñ¼E”½ÍÑ¤¸‰t($%ô°($%ÅŒèl($$%l‰½¹™•Éµ„³Še…ÉÑ¥½±¼ˆ°€‰½¹™É½¹Ñ„¹½µ”°½±½É””Ñ…±¥„½¸³Še½É‘¥¹”¸‰t°($$%l‰½¹ÑÉ½±±„½¹¤…¹½±¼ˆ°€‰Í…µ¥¹„™É½¹Ñ”°É•ÑÉ¼°±…Ñ¤”ÁÉ¥µ¤Á¥…¹¤¸‰t°($$%l‰UÍ„±”µ¥ÍÕÉ”ˆ°€‰½¹™É½¹Ñ„±”™½Ñ¼½¸Õ¸…Á¼ÑÕ¼¸‰t°($$%l‰%¹É…¹‘¥Í¤¤‘•ÑÑ…±¤ˆ°€‰½¹ÑÉ½±±„Õ¥ÑÕÉ”°ÍÑ…µÁ”°É¥…µ¤”¡¥ÕÍÕÉ”¸‰t°($$%l‰•¥‘¤ÁÉ¥µ„‘•±³Še¥¹Ù¥¼ˆ°€‰¡¥•‘¤¡¥…É¥µ•¹Ñ¤µ•¹ÑÉ”¥°ÁÉ½‘½ÑÑ¼ƒ ¥¸µ……éé¥¹¼¸‰t($%t°($%Í¡¥ÁÁ¥¹œèl($$%l‰½µÁ½¹¤¥°Á…¼ˆ°€‰I…ÉÕÁÁ„…ÉÑ¥½±¤ÁÉ½¹Ñ¤”Ù•É¥™¥„±”‘¥µ•¹Í¥½¹¤¸‰t°($$%l‰½¹ÑÉ½±±„¤±¥µ¥Ñ¤ˆ°€‰	…ÑÑ•É¥”°±¥ÅÕ¥‘¤”…ÉÑ¥½±¤Í•¹Í¥‰¥±¤Á½ÍÍ½¹¼±¥µ¥Ñ…É”±”±¥¹•”¸‰t°($$%l‰½¹™É½¹Ñ„¥°Á•Í¼ˆ°€‰A×ÈÙ…±•É”¥°Á•Í¼É•…±”¼Ù½±Õµ•ÑÉ¥¼¸‰t°($$%l‰M•±¤±„ÁÉ½Ñ•é¥½¹”ˆ°€‰I¥‘Õ¤³Še¥µ‰…±±¼µ„ÁÉ½Ñ•¤±¤½•ÑÑ¤™É…¥±¤¸‰t°($$%l‰Y•É¥™¥„¥°ÁÉ•Ù•¹Ñ¥Ù¼ˆ°€‰1¥¹•””ÁÉ•éé¤…µ‰¥…¹¼ì½¹™•Éµ„¥°‘…Ñ¼…ÑÑÕ…±”¸‰t($%t°($%…ÉÑ¥±•Ìèl($$%l($$$$‰UÍ…É”Õ¹¼ÍÁÉ•…‘Í¡••Ð±±¡¥¹…	ÕäÍ•¹é„Á•É‘•ÉÍ¤ˆ°($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($$$$‰„Õ¹„É…¹‘”±¥ÍÑ„„Õ¹„Í•±•é¥½¹”½¹™É½¹Ñ…‰¥±”¸ˆ($$%t°($$%l($$$$‰½Ñ¼Eè½¹ÑÉ½±±¼¥¸¥¹ÅÕ”µ¥¹ÕÑ¤ˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($$$$‰½Í„Õ…É‘…É”ÁÉ¥µ„”ÅÕ…¹‘¼¡¥•‘•É”Õ¹„™½Ñ¼•áÑÉ„¸ˆ($$%t°($$%l($$$$‰AÉ•éé¼ÁÉ½‘½ÑÑ¼”½ÍÑ¼Á…¼ˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($$$$‰A•É£¤Õ¸…ÉÑ¥½±¼•½¹½µ¥¼¹½¸…É…¹Ñ¥Í”Õ¹„ÍÁ•‘¥é¥½¹”•½¹½µ¥„¸ˆ($$%t($%t°($%™…Äèl($$%l‹ ¥°Í¥Ñ¼Õ™™¥¥…±”±±¡¥¹…	Õäüˆ°€‰9¼¸ƒ Õ¹„Õ¥‘„¥¹‘¥Á•¹‘•¹Ñ”¸‰t°($$%l‰½Ù”Á½ÉÑ…¹¼¤ÁÕ±Í…¹Ñ¤üˆ°€‰±±„Á…¥¹„•Í…ÑÑ„‘•°¹½ÍÑÉ¼Í¥Ñ¼°¹½¸…±±¡¥¹…	Õä¸‰t°($$%l‰$ÁÉ•éé¤Í½¹¼‘•™¥¹¥Ñ¥Ù¤üˆ°€‰9¼¸=Áé¥½¹¤°…µ‰¥¼”ÍÁ•‘¥é¥½¹”…µ‰¥…¹¼¥°Ñ½Ñ…±”¸‰t°($$%l‰½Í„Í½¹¼±”™½Ñ¼Eüˆ°€‰½Ñ¼‘¤µ……éé¥¹¼ÁÉ¥µ„‘•±±„ÍÁ•‘¥é¥½¹”¸‰t°($$%l‰…É…¹Ñ¥Í½¹¼±„ÅÕ…±¥Ó€üˆ°€‰9¼¸¥ÕÑ…¹¼½¸‘¥™•ÑÑ¤Ù¥Í¥‰¥±¤°¹½¸½¸ÑÕÑÑ¼¸‰t°($$%l‰A½ÍÍ¼•É…É”Á•È¹½µ”üˆ°€‰O°¸1„Á…É½±„Á…ÍÍ„…°…Ñ…±½¼¸‰t°($$%l‰A•É£¤±„ÍÁ•‘¥é¥½¹”Á×È½ÍÑ…É”‘¤Á§äüˆ°€‰•ÍÑ¥¹…é¥½¹”°±¥¹•„°Á•Í¼”Ù½±Õµ”‘•Ñ•Éµ¥¹…¹¼¥°½ÍÑ¼¸‰t°($$%l‰½±±•…Ñ”…±ÑÉ¤…•¹Ñ¤üˆ°€‰9¼¸QÕÑÑ¤¤ÁÕ±Í…¹Ñ¤ÕÍ…¹¼Õ¹„Í½±„‘•ÍÑ¥¹…é¥½¹”¸‰t($%t(%ô°(%Á°èì($%¹…µ”è€‰A½±Í­¤ˆ°($%±…‰•±Ìèl($$$‰	…é„ÁÉ½‘Õ­ÓÍÜˆ°($$$‰-…Ñ•½É¥”ˆ°($$$‰A½É…‘¹¥¬Eˆ°($$$‰]åÍç	­„ˆ°($$$‰ÉÑå­×	äˆ°($$$‰Dˆ($%t°($%…ÑÌèl($$$‰	ÕÑäˆ°($$$‰	±Õéäˆ°($$$‰PµÍ¡¥ÉÑäˆ°($$$‰-ÕÉÑ­¤ˆ°($$$‰MÁ½‘¹¥”ˆ°($$$‰­•Í½É¥„ˆ($%t°($%¡•É¼èl($$$‰]eMiU-%]I-AI=U-SM\ØÌ¸Àˆ°($$$‰MéÕ­…¨µ¹¥•¨¸i¹…©‘Õ¨±•Á¥•¨¸ˆ°($$$‰UÁ½Éë‘­½Ý…¹ä¥¹‘•­Ì‘±„ÝåÍéÕ­¥Ý‡±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¸A½ËÍÝ¹Õ¨•¹äUM¤½ÑÝ¥•É…¨­½¹­É•Ñ¹äÁÉ½‘Õ­Ð¸ˆ($%t°($%Õ¤èl($$$‰i½‰…èÁÉ½‘Õ­Ñäˆ°($$$‰5•¹Ôˆ°($$$‰+eéå¬ˆ°($$$‰Mie	-%]eMiU-%]9%ˆ°($$$‰MQ8%9-MTˆ°($$$‰…­ÑåÝ¹å Á½éå©¤ˆ°($$$‰%1QIdˆ°($$$‰IMQU(ˆ°($$$‰-Q=I%ˆ°($$$‰9}UMˆ°($$$‰MQQULˆ°($$$‰1¥¹¬ÍÁÉ…Ý‘é½¹äˆ°($$$‰9½Ý”ÜÑå´Ñå½‘¹¥Ôˆ°($$$‰]e9%/M\ˆ°($$$‰]e	I9ˆ°($$$‰1i<Q8%9-Lˆ°($$$‰éåÑ…¨…ÉÑå­×ˆ°($$$‰=ÑßÍÉè­½±•­«dˆ°($$$‰MéÕ­…¨ÁÉ½‘Õ­ÓÍÜ°­…Ñ•½É¥¤°ÍÑå³ÍÜ¸¸¸ˆ($%t°($%Á…•Ìèì($$%ÁÉ½‘ÕÑÌèl‰	…é„ÁÉ½‘Õ­ÓÍÜˆ°€‰]å‰É…¹”ÁÉ½‘Õ­Ñäé”é‘«e¥…µ¤°•¹…µ¤UM¤±¥¹­¥•´¸‰t°($$%…Ñ•½É¥•Ìèl‰-…Ñ•½É¥”ˆ°€‰]å‰¥•Éè‘é¥‡¤½ÑßÍÉè­½±•­«d¸‰t°($$$‰ÅŒµÕ¥‘”ˆèl‰)…¬éåÑ‡é‘«e¥„Eˆ°€‰MÁÉ…Ý“è­ÍéÑ‡	Ð°‘•Ñ…±”°Ýåµ¥…Éä¤Ý¥‘½é¹”Ý…‘ä¸‰t°($$$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰i…Á±…¹Õ¨Á…é¯dˆ°€‰-½ÍéÐé…±—ñä½­É…©Ô°É½éµ¥…ÉÔ°Ý…¤¤ÑåÁÔ¸‰t°($$%…ÉÑ¥±•Ìèl‰	¥‰±¥½Ñ•­„Á½É…‘¹¥¯ÍÜˆ°€‰Ié•Ñ•±¹”ÑÉ—m¤¼ÝåÍéÕ­¥Ý…¹¥Ô°­½¹ÑÉ½±¤¤ÁÉé•Íç	”¸‰t°($$%™…Äèl‰ëeÍÑ”ÁåÑ…¹¥„ˆ°€‰=‘Á½Ý¥•‘é¤¼¥¹‘•­Í¥”°±¥¹­… °é‘«e¥… E¤­½ÍéÑ… ¸‰t($%ô°($%ÅŒèl($$%l‰A½ÑÝ¥•É“èÁÉ½‘Õ­Ðˆ°€‰A½ËÍÝ¹…¨¹…éßd°­½±½È¤É½éµ¥…Èèé…·ÍÝ¥•¹¥•´¸‰t°($$%l‰MÁÉ…Ý“è­‡ñ‘ä¯Ðˆ°€‰=‰•©Ééå¨ÁÉëÍ°Ñç°‰½­¤¤é‰±§ñ•¹¥„¸‰t°($$%l‰Wñå¨Ýåµ¥…ËÍÜˆ°€‰A½ËÍÝ¹…¨é‘«e¥„èß	…Í»½‘é¥—ó¸‰t°($$%l‰A½Ý§e­ÍèÍéé•ŸÏ	äˆ°€‰MÁÉ…Ý“èÍéÝä°¹…‘ÉÕ­¤°¡…™Ñä¤é…µ­¤¸‰t°($$%l‰i‘•å‘Õ¨ÁÉé•ÝåÍç	¯ˆ°€‰]å©‡m¹¥¨ßÑÁ±¥Ý¿m¤°‘äÁÉ½‘Õ­Ð©•ÍÐÜµ……éå¹¥”¸‰t($%t°($%Í¡¥ÁÁ¥¹œèl($$%l‰i‰Õ‘Õ¨Á…é¯dˆ°€‰A¿è½Ñ½Ý”ÁÉ½‘Õ­Ñä¤ÍÁÉ…Ý“èÝåµ¥…Éä¸‰t°($$%l‰MÁÉ…Ý“è½É…¹¥é•¹¥„ˆ°€‰	…Ñ•É¥”°Ã	å¹ä¤ÝÉ‡ñ±¥Ý”Ñ½Ý…Éäµ½Ÿ½É…¹¥é‡±¥¹¥”¸‰t°($$%l‰A½ËÍÝ¹…¨Ý…Ÿdˆ°€‰5¿ñ”½‰½Ý§éåÝ‡Ý…„Éé•éåÝ¥ÍÑ„±Õˆ½‰«eÑ¿m¥½Ý„¸‰t°($$%l‰]å‰¥•Éèé…‰•éÁ¥•é•¹¥”ˆ°€‰UÍ×é‹e‘¹”½Á…­½Ý…¹¥„¤¡É¿‘•±¥­…Ñ¹”Éé•éä¸‰t°($$%l‰MÁÉ…Ý“èÝå•»dˆ°€‰1¥¹¥”¤•¹äÍ§déµ¥•¹¥…«ìÁ½ÑÝ¥•É“è½™•ÉÓd¸‰t($%t°($%…ÉÑ¥±•Ìèl($$%l($$$$‰)…¬×ñåÝ‡±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð‰•è¡…½ÍÔˆ°($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($$$$‰=½É½µ¹•¨±¥ÍÑä‘¼­ËÍÑ­¥•¼Á½ËÍÝ¹…¹¥„¸ˆ($$%t°($$%l($$$$‰i‘«e¥„Eè­½¹ÑÉ½±„ÜÁ§gµ¥¹ÕÐˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($$$$‰¼ÍÁÉ…Ý‘é§¤­¥•‘äÁ½ÁÉ½Í§¼‘½‘…Ñ­½Ý”é‘«e¥”¸ˆ($$%t°($$%l($$$$‰•¹„ÁÉ½‘Õ­ÑÔ„­½ÍéÐÁ…é­¤ˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($$$$‰±…é•¼Ñ…¹¤ÁÉ½‘Õ­Ð¹¥”½é¹…é„Ñ…¹¥•¨ÝåÍç	­¤¸ˆ($$%t($%t°($%™…Äèl($$%l‰éäÑ¼½™¥©…±¹„ÍÑÉ½¹„±±¡¥¹…	Õäüˆ°€‰9¥”¸Q¼¹¥•é…±—ñ¹äÁÉé•Ý½‘¹¥¬¸‰t°($$%l‰½¯ÁÉ½Ý…‘ëÁÉéå¥Í­¤üˆ°€‰¼‘½¯	…‘¹•¨­…ÉÑäÁÉ½‘Õ­ÑÔ°¹¥”‘¼±±¡¥¹…	Õä¸‰t°($$%l‰éä•¹äÏ½ÍÑ…Ñ•é¹”üˆ°€‰9¥”¸=Á©”°­ÕÉÌ¤ÝåÍç	­„éµ¥•¹¥…«ÍÕ·d¸‰t°($$%l‰éå´Ïé‘«e¥„Eüˆ°€‰i‘«e¥…µ¤µ……éå¹½Ýåµ¤ÁÉé•ÝåÍç	¯¸‰t°($$%l‰éäÝ…É…¹ÑÕ«©…­¿oüˆ°€‰9¥”¸A½­…éÕ«Ý¥‘½é¹”Ý…‘ä°¹¥”ÝÍéåÍÑ­¥”Õ­ÉåÑ”¸‰t°($$%l‰éäµ½ŸdÍéÕ­‡Á¼¹…éÝ¥”üˆ°€‰Q…¬¸!…Ï	¼ÑÉ…™¥„‘¼­…Ñ…±½Ô¸‰t°($$%l‰±…é•¼ÝåÍç	­„‰åÝ„‘É¿ñÍé„üˆ°€‰-É…¨°±¥¹¥„°Ý…„¤½‰«eÑ¿o½­É—m±…«•»d¸‰t°($$%l‰éä±¥¹­Õ©•¥”¥¹¹å …•¹ÓÍÜüˆ°€‰9¥”¸]ÍéåÍÑ­¥”ÁÉéå¥Í­¤ÁÉ½Ý…‘ë‘¼©•‘¹•¼•±Ô¸‰t($%t(%ô°(%É¼èì($%¹…µ”è€‰I½·‰»ˆ°($%±…‰•±Ìèl($$$‰	…ëÁÉ½‘ÕÍ”ˆ°($$$‰…Ñ•½É¥¤ˆ°($$$‰¡¥Eˆ°($$$‰1¥ÙÉ…É”ˆ°($$$‰ÉÑ¥½±”ˆ°($$$‰Dˆ($%t°($%…ÑÌèl($$$‰A…¹Ñ½™¤ˆ°($$$‰!…¹½É…”ˆ°($$$‰QÉ¥½ÕÉ¤ˆ°($$$‰)…¡•Ñ”ˆ°($$$‰A…¹Ñ…±½¹¤ˆ°($$$‰•Í½É¥¤ˆ($%t°($%¡•É¼èl($$$‰5=Q=H	UQIØÌ¸Àˆ°($$$‰…ÕÓµ…¤Á×"m¥¸¸Í—"eÑ”µ…¤‰¥¹”¸ˆ°($$$‰%¹‘•àÍÑÉÕÑÕÉ…ÐÁ•¹ÑÉÔÕÓÉ¤±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð¸½µÁ…ËÁÉ—"mÕÉ¤UMƒ"e¤‘•Í¡¥‘”ÁÉ½‘ÕÍÕ°•á…Ð¸ˆ($%t°($%Õ¤èl($$$‰Y•é¤ÁÉ½‘ÕÍ•±”ˆ°($$$‰5•¹¥Ôˆ°($$$‰1¥µ‹ˆ°($$$‰	UQIIA%ˆ°($$$‰MQI%9`ˆ°($$$‹¹¹É•¥ÍÑËÉ¤…Ñ¥Ù”ˆ°($$$‰%1QIˆ°($$$‰IMQkˆ°($$$‰Q=I%ˆ°($$$‰AI"i}UMˆ°($$$‰MQIˆ°($$$‰1¥¹¬Ù•É¥™¥…Ðˆ°($$$‰9½ÔÏÁÓ·‰¹„…•…ÍÑ„ˆ°($$$‰IiU1QQˆ°($$$‰M1QQˆ°($$$‰MP%9`ˆ°($$$‰¥Ñ—"eÑ”…ÉÑ¥½±Õ°ˆ°($$$‰•Í¡¥‘”½±•"m¥„ˆ°($$$‰…ÕÓÁÉ½‘ÕÍ”°…Ñ•½É¥¤°ÍÑ¥±ÕÉ¤¸¸¸ˆ($%t°($%Á…•Ìèì($$%ÁÉ½‘ÕÑÌèl‰	…ë‘”ÁÉ½‘ÕÍ”ˆ°€‰AÉ½‘ÕÍ”Í•±•Ñ…Ñ”Ô¥µ…¥¹¤°ÁÉ—"mÕÉ¤UMƒ"e¤±¥¹¬‘¥É•Ð¸‰t°($$%…Ñ•½É¥•Ìèl‰áÁ±½É•…ë…Ñ•½É¥¥±”ˆ°€‰±•”Õ¸‘•Á…ÉÑ…µ•¹Ðƒ"e¤‘•Í¡¥‘”½±•"m¥„¸‰t°($$$‰ÅŒµÕ¥‘”ˆèl‰Õ´¥Ñ—"eÑ¤Á½é•±”Eˆ°€‰Y•É¥™¥™½Éµ„°‘•Ñ…±¥¥±”°·ÍÕÉ¥±”ƒ"e¤‘•™•Ñ•±”Ù¥é¥‰¥±”¸‰t°($$$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰A±…¹¥™¥Á…¡•ÑÕ°ˆ°€‰½ÍÑÕ°‘•Á¥¹‘”‘”‘•ÍÑ¥¹‡"m¥”°‘¥µ•¹Í¥Õ¹”°É•ÕÑ…Ñ”ƒ"e¤Ñ¥À¸‰t°($$%…ÉÑ¥±•Ìèl‰	¥‰±¥½Ñ•‘”¡¥‘ÕÉ¤ˆ°€‰½»"m¥¹ÕÐ‘½Õµ•¹Ñ…Ð‘•ÍÁÉ”ÕÑ…É”°Ù•É¥™¥…É”ƒ"e¤±¥ÙÉ…É”¸‰t°($$%™…Äèl‹9¹ÑÉ•‹É¤™É•Ù•¹Ñ”ˆ°€‰KÍÁÕ¹ÍÕÉ¤‘•ÍÁÉ”¥¹‘•à°±¥¹­ÕÉ¤°Á½é”Eƒ"e¤½ÍÑÕÉ¤¸‰t($%ô°($%ÅŒèl($$%l‰½¹™¥É·ÁÉ½‘ÕÍÕ°ˆ°€‰½µÁ…Ë¹Õµ•±”°Õ±½…É•„ƒ"e¤·É¥µ•„Ô½µ…¹‘„¸‰t°($$%l‰Y•É¥™¥Ñ½…Ñ”Õ¹¡¥ÕÉ¥±”ˆ°€‰AÉ¥Ù—"eÑ”™‡"m„°ÍÁ…Ñ•±”°±…Ñ•É…±•±”ƒ"e¤‘•Ñ…±¥¥±”¸‰t°($$%l‰½±½Í—"eÑ”·ÍÕËÑ½É¥±”ˆ°€‰½µÁ…Ë™½Ñ½É…™¥¥±”Ô¼Á¥•ÏÁ”…É”¼…¤¸‰t°($$%l‰7É—"eÑ”‘•Ñ…±¥¥±”ˆ°€‰Y•É¥™¥ÕÏÑÕÉ¤°¥µÁÉ¥µ•ÕÉ¤°‰É½‘•É¥¤ƒ"e¤™•Éµ½…É”¸‰t°($$%l‰•¥‘”ƒ¹¹…¥¹Ñ”‘”±¥ÙÉ…É”ˆ°€‰•É”±…É¥™¥É¤‰ÐÁÉ½‘ÕÍÕ°•ÍÑ”ƒ¹¸‘•Á½é¥Ð¸‰t($%t°($%Í¡¥ÁÁ¥¹œèl($$%l‰½¹ÍÑÉÕ¥—"eÑ”Á…¡•ÑÕ°ˆ°€‰ÉÕÁ•…ëÁÉ½‘ÕÍ•±”ÁÉ•ŸÑ¥Ñ”ƒ"e¤Ù•É¥™¥‘¥µ•¹Í¥Õ¹¥±”¸‰t°($$%l‰Y•É¥™¥É•ÍÑÉ¥"m¥¥±”ˆ°€‰	…Ñ•É¥¥±”°±¥¡¥‘•±”ƒ"e¤ÁÉ½‘ÕÍ•±”Í•¹Í¥‰¥±”Á½Ð±¥µ¥Ñ„ÉÕÑ•±”¸‰t°($$%l‰½µÁ…ËÉ•ÕÑ…Ñ•„ˆ°€‰M”Á½…Ñ”™½±½Í¤É•ÕÑ…Ñ•„É•…³Í…ÔÙ½±Õµ•ÑÉ¥¸‰t°($$%l‰±•”ÁÉ½Ñ•"m¥„ˆ°€‰±¥µ¥»…µ‰…±…©Õ°¥¹ÕÑ¥°ƒ"e¤ÁÉ½Ñ•©•…ë½‰¥•Ñ•±”™É…¥±”¸‰t°($$%l‰Y•É¥™¥½™•ÉÑ„ˆ°€‰IÕÑ•±”ƒ"e¤ÁÉ—"mÕÉ¥±”Í”Í¡¥µ‹ì½¹™¥É·½™•ÉÑ„…ÑÕ…³¸‰t($%t°($%…ÉÑ¥±•Ìèl($$%l($$$$‰Õ´™½±½Í—"eÑ¤Õ¸±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð•™¥¥•¹Ðˆ°($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆ°($$$$‰”±„¼±¥ÍÓµ…É”±„¼Í•±•"m¥”½µÁ…É…‰¥³¸ˆ($$%t°($$%l($$$$‰A½é”EèÙ•É¥™¥…É”ƒ¹¸¥¹¤µ¥¹ÕÑ”ˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆ°($$$$‰”Ù•É¥™¥¤ƒ"e¤‰¹µ•É¥Ó¼™½Ñ½É…™¥”ÍÕÁ±¥µ•¹Ñ…Ë¸ˆ($$%t°($$%l($$$$‰AÉ—"mÕ°ÁÉ½‘ÕÍÕ±Õ¤ƒ"e¤½ÍÑÕ°Á…¡•ÑÕ±Õ¤ˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆ°($$$$‰””Õ¸ÁÉ½‘ÕÌ¥•™Ñ¥¸¹Ô…É…¹Ñ•…ë¼±¥ÙÉ…É”¥•™Ñ¥»¸ˆ($$%t($%t°($%™…Äèl($$%l‰ÍÑ”Í¥Ñ”µÕ°½™¥¥…°±±¡¥¹…	Õäüˆ°€‰9Ô¸ÍÑ”Õ¸¡¥¥¹‘•Á•¹‘•¹Ð¸‰t°($$%l‰U¹‘”‘ÕŒ‰ÕÑ½…¹•±”ÁÉ½‘ÕÍ•±½Èüˆ°€‰1„Á…¥¹„•á…Ó„ÁÉ½‘ÕÍÕ±Õ¤°¹Ô±„±±¡¥¹…	Õä¸‰t°($$%l‰AÉ—"mÕÉ¥±”ÍÕ¹Ð™¥¹…±”üˆ°€‰9Ô¸=Ã"m¥Õ¹¥±”°ÕÉÍÕ°ƒ"e¤±¥ÙÉ…É•„Í¡¥µ‹Ñ½Ñ…±Õ°¸‰t°($$%l‰”ÍÕ¹ÐÁ½é•±”Eüˆ°€‰½Ñ½É…™¥¤‘¥¸‘•Á½é¥Ðƒ¹¹…¥¹Ñ”‘”ÑÉ…¹ÍÁ½ÉÐ¸‰t°($$%l‰…É…¹Ñ•…ë…±¥Ñ…Ñ•„üˆ°€‰9Ô¸É…ÓÁÉ½‰±•µ”Ù¥é¥‰¥±”°¹ÔÑ½…Ñ”‘•Ñ…±¥¥±”…ÍÕ¹Í”¸‰t°($$%l‰A½ÐÕÑ„‘ÕÃ¹Õµ”üˆ°€‰„¸Q•Éµ•¹Õ°•ÍÑ”ÑÉ¥µ¥ÌÑÉ”…Ñ…±½œ¸‰t°($$%l‰””±¥ÙÉ…É•„Á½…Ñ”½ÍÑ„µ…¤µÕ±Ðüˆ°€‰•ÍÑ¥¹‡"m¥„°ÉÕÑ„°É•ÕÑ…Ñ•„ƒ"e¤Ù½±ÕµÕ°‘•Ñ•Éµ¥»½ÍÑÕ°¸‰t°($$%l‰QÉ¥µ¥Ñ—"m¤ÑÉ”…³"m¤…•»"m¤üˆ°€‰9Ô¸Q½…Ñ”…"m¥Õ¹¥±”™½±½Í•ÍŒ¼Í¥¹ÕË‘•ÍÑ¥¹‡"m¥”¸‰t($%t(%ô)ôì)=‰©•Ð¹…ÍÍ¥¸¡±½…±•½Áä¹•¸°ì(%¡•É¼èl($$‰I=59%AI=UP%M=YIdˆ°($$‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••Ð™½ÈI½µ…¹¥„ˆ°($$‰I½µ…¹¥„µ™½ÕÍ•¥¹‘•à™½ÈÁÉ½‘ÕÐ‘¥Í½Ù•Éä°E¡•­Ì…¹Á…É•°Á±…¹¹¥¹œ¸½µÁ…É”ÕÉÉ•¹ÐUM•ÍÑ¥µ…Ñ•Ì…¹½Á•¸Ñ¡”µ…ÁÁ•ÁÉ½‘ÕÐ±¥ÍÑ¥¹œ¸ˆ(%t°(%Õ¤èl($$‰	É½ÝÍ”ÁÉ½‘ÕÑÌˆ°($$‰5•¹Ôˆ°($$‰1…¹Õ…”ˆ°($$‰EU%,EUIdˆ°($$‰%9`MQQULˆ°($$‰Ù¥Í¥‰±”É•½É‘Ìˆ°($$‰%1QILˆ°($$‰IMPˆ°($$‰Q=Idˆ°($$‰AI%}UMˆ°($$‰MQQULˆ°($$‰1¥¹¬¡•­•ˆ°($$‰UM•ÍÑ¥µ…Ñ”ˆ°($$‰IMU1QLˆ°($$‰UIQˆ°($$‰5Q!==1=dˆ°($$‰I•……ÉÑ¥±”ˆ°($$‰=Á•¸½±±•Ñ¥½¸ˆ°($$‰M•…É ÕÉÉ•¹ÐÁÉ½‘ÕÑÌ¸¸¸ˆ(%t°(%Á…•Ìèì($$¸¸¹±½…±•½Áä¹•¸¹Á…•Ì°($%ÁÉ½‘ÕÑÌèl‰AÉ½‘ÕÐ‘…Ñ…‰…Í”™½ÈI½µ…¹¥„ˆ°€‰	É½ÝÍ”•¥¡ÐÙ¥Í¥‰±”É•½É‘ÌÝ¥Ñ ÕÉÉ•¹Ð¥µ…•Ì°UM•ÍÑ¥µ…Ñ•Ì…¹µ…ÁÁ•Á…Ñ¡ÌÑ¼Ñ¡”±¥Ù”…Ñ…±½Õ”¸‰t°($%…Ñ•½É¥•Ìèl‰	É½ÝÍ”‰ä…Ñ•½Éäˆ°€‰=Á•¸Ñ¡”ÕÉÉ•¹ÐÍ¡½ÁÁ¥¹œ½±±•Ñ¥½¸Ý¥Ñ É•™•ÉÉ…°Á…É…µ•Ñ•ÉÌ¥‘•¹Ñ¥™å¥¹œÑÉ…™™¥Œ™É½´…±±¡¥¹…‰Õä¹É¼¸‰t°($$‰ÅŒµÕ¥‘”ˆèl‰!½ÜÑ¼É•…EÁ¡½Ñ½Ìˆ°€‰ÁÉ…Ñ¥…°¡•­±¥ÍÐ™½ÈI½µ…¹¥…¸‰Õå•ÉÌè¥‘•¹Ñ¥Ñä°‘•Ñ…¥±Ì°µ•…ÍÕÉ•µ•¹ÑÌ…¹Ù¥Í¥‰±”‘•™•ÑÌ‰•™½É”¥¹Ñ•É¹…Ñ¥½¹…°Í¡¥ÁÁ¥¹œ¸‰t°($$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰M¡¥ÁÁ¥¹œÑ¼I½µ…¹¥„ˆ°€‰A±…¸É½ÕÑ”•±¥¥‰¥±¥Ñä°Á…­•Ý•¥¡Ð°YP°ÕÍÑ½µÌÑÉ•…Ñµ•¹Ð…¹Ñ¡”±¥Ù”Á…É•°ÅÕ½Ñ”‰•™½É”ÍÕ‰µ¥ÍÍ¥½¸¸‰t°($%…ÉÑ¥±•Ìèl‰I½µ…¹¥„É•Í•…É ±¥‰É…Éäˆ°€‰…Ðµ±•Õ¥‘•Ì™½ÈÁÉ½‘ÕÐ‘¥Í½Ù•Éä°¥¹ÍÁ•Ñ¥½¸…¹Á…É•°Á±…¹¹¥¹œ™½ÈI½µ…¹¥…¸Í¡½ÁÁ•ÉÌ¸‰t°($%™…Äèl‰É•ÅÕ•¹Ñ±ä…Í­•ÅÕ•ÍÑ¥½¹Ìˆ°€‰±•…È…¹ÍÝ•ÉÌ…‰½ÕÐÑ¡¥Ì¥¹‘•Á•¹‘•¹ÐI½µ…¹¥„Õ¥‘”°ÁÉ½‘ÕÐ±¥¹­Ì°EÁ¡½Ñ½Ì°•ÍÑ¥µ…Ñ•Ì…¹Í¡¥ÁÁ¥¹œ¸‰t(%ô)ô¤ì)=‰©•Ð¹…ÍÍ¥¸¡±½…±•½Áä¹É¼°ì(%¡•É¼èl($$‰!%AI=UMA9QITI=7	9%ˆ°($$‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••ÐÁ•¹ÑÉÔI½·‰¹¥„ˆ°($$‰%¹‘•àÉ½·‰¹•ÍŒÁ•¹ÑÉÔ‘•Í½Á•É¥É•„ÁÉ½‘ÕÍ•±½È°Ù•É¥™¥…É•„Á½é•±½ÈEƒ"e¤Á±…¹¥™¥…É•„½±•ÑÕ±Õ¤¸½µÁ…Ë•ÍÑ¥·É¤UM…ÑÕ…±”ƒ"e¤‘•Í¡¥‘”Á…¥¹„µ…Á…Ó„ÁÉ½‘ÕÍÕ±Õ¤¸ˆ(%t°(%Õ¤èl($$‰Y•é¤ÁÉ½‘ÕÍ•±”ˆ°($$‰5•¹¥Ôˆ°($$‰1¥µ‹ˆ°($$‰	UQIIA%ˆ°($$‰MQI%9`ˆ°($$‹¹¹É•¥ÍÑËÉ¤…™§"e…Ñ”ˆ°($$‰%1QIˆ°($$‰IMQkˆ°($$‰Q=I%ˆ°($$‰AI"i}UMˆ°($$‰MQIˆ°($$‰1¥¹¬Ù•É¥™¥…Ðˆ°($$‰ÍÑ¥µ…É”UMˆ°($$‰IiU1QQˆ°($$‰M1QQˆ°($$‰5Q==1=%ˆ°($$‰¥Ñ—"eÑ”…ÉÑ¥½±Õ°ˆ°($$‰•Í¡¥‘”½±•"m¥„ˆ°($$‰…ÕÓÁÉ½‘ÕÍ”…ÑÕ…±”¸¸¸ˆ(%t°(%Á…•Ìèì($$¸¸¹±½…±•½Áä¹É¼¹Á…•Ì°($%ÁÉ½‘ÕÑÌèl‰	…ë‘”ÁÉ½‘ÕÍ”Á•¹ÑÉÔI½·‰¹¥„ˆ°€‰=ÁÐƒ¹¹É•¥ÍÑËÉ¤Ù¥é¥‰¥±”°Ô¥µ…¥¹¤…ÑÕ…±”°•ÍÑ¥·É¤UMƒ"e¤±¥¹­ÕÉ¤µ…Á…Ñ”ÑÉ”…Ñ…±½Õ°…Ñ¥Ø¸‰t°($%…Ñ•½É¥•Ìèl‰áÁ±½É•…ë…Ñ•½É¥¥±”ˆ°€‰•Í¡¥‘”½±•"m¥„…ÑÕ…³°ÔÁ…É…µ•ÑÉ¤‘”É•½µ…¹‘…É”…É”¥‘•¹Ñ¥™¥ÑÉ…™¥Õ°‘¥¸…±±¡¥¹…‰Õä¹É¼¸‰t°($$‰ÅŒµÕ¥‘”ˆèl‰Õ´¥Ñ—"eÑ¤Á½é•±”Eˆ°€‰1¥ÍÓÁÉ…Ñ¥Á•¹ÑÉÔÕµÃËÑ½É¥¤‘¥¸I½·‰¹¥„è¥‘•¹Ñ¥Ñ…Ñ”°‘•Ñ…±¥¤°·ÍÕÉ¤ƒ"e¤‘•™•Ñ”Ù¥é¥‰¥±”ƒ¹¹…¥¹Ñ”‘”•áÁ•‘¥•É”¸‰t°($$‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆèl‰1¥ÙÉ…É”ÑÉ”I½·‰¹¥„ˆ°€‰A±…¹¥™¥•±¥¥‰¥±¥Ñ…Ñ•„ÉÕÑ•¤°É•ÕÑ…Ñ•„…µ‰…±…Ó°QY°™½Éµ…±¥Ó"m¥±”Ù…µ…±”ƒ"e¤½™•ÉÑ„±¥Ù”ƒ¹¹…¥¹Ñ”‘”ÑÉ¥µ¥Ñ•É”¸‰t°($%…ÉÑ¥±•Ìèl‰	¥‰±¥½Ñ•Á•¹ÑÉÔI½·‰¹¥„ˆ°€‰¡¥‘ÕÉ¤‘½Õµ•¹Ñ…Ñ”‘•ÍÁÉ”ÁÉ½‘ÕÍ”°Eƒ"e¤Á±…¹¥™¥…É•„½±•Ñ•±½ÈÁ•¹ÑÉÔÕµÃËÑ½É¥¤‘¥¸I½·‰¹¥„¸‰t°($%™…Äèl‹9¹ÑÉ•‹É¤™É•Ù•¹Ñ”ˆ°€‰KÍÁÕ¹ÍÕÉ¤‘•ÍÁÉ”…•ÍÐ¡¥É½·‰¹•ÍŒ¥¹‘•Á•¹‘•¹Ð°±¥¹­ÕÉ¤°Á½é”E°•ÍÑ¥·É¤ƒ"e¤±¥ÙÉ…É”¸‰t(%ô)ô¤ì)Ù…ÈÍ¥Ñ•Q•áÐ€ôì(%É¼èì($%¥¹‘•Á•¹‘•¹Ðè€‰¡¥¥¹‘•Á•¹‘•¹ÐÁ•¹ÑÉÔI½·‰¹¥„ƒ
Ü9Ô•ÍÑ”Í¥Ñ”µÕ°½™¥¥…°±±¡¥¹…	Õäˆ°($%É•½É‘Ìè€‰ÁÉ½‘ÕÍ”Ù¥é¥‰¥±”ˆ°($%¡•­•è€‰1¥¹­ÕÉ¤Ù•É¥™¥…Ñ”±„€ÄÈ…ÕÕÍÐ€ÈÀÈØˆ°($%•ÍÑ¥µ…Ñ”è€‰ÍÑ¥·É¤UM°¹ÔÁÉ—"mÕÉ¤™¥¹…±”ˆ°($%Í½ÕÉ”è€‰MÕÉÏƒ"e¤µ•Ñ½“ˆ°($%½Á•¸è€‰Q1=1%Yˆ°($%Í•…É è€‰…ÕÓˆ(%ô°(%•¸èì($%¥¹‘•Á•¹‘•¹Ðè€‰%¹‘•Á•¹‘•¹ÐI½µ…¹¥„Õ¥‘”ƒ
Ü9½ÐÑ¡”½™™¥¥…°±±¡¥¹…	ÕäÝ•‰Í¥Ñ”ˆ°($%É•½É‘Ìè€‰Ù¥Í¥‰±”ÁÉ½‘ÕÑÌˆ°($%¡•­•è€‰1¥¹­Ì¡•­•€ÄÈÕÕÍÐ€ÈÀÈØˆ°($%•ÍÑ¥µ…Ñ”è€‰UM•ÍÑ¥µ…Ñ•Ì°¹½Ð™¥¹…°ÁÉ¥•Ìˆ°($%Í½ÕÉ”è€‰M½ÕÉ”…¹µ•Ñ¡½ˆ°($%½Á•¸è€‰1%YQ1=ˆ°($%Í•…É è€‰M•…É ˆ(%ô°(%‘”èì($%¥¹‘•Á•¹‘•¹Ðè€‰U¹…‰£‘¹¥•ÈIÕ·‘¹¥•¸µI…Ñ•‰•Èƒ
Ü-•¥¹”½™™¥é¥•±±”±±¡¥¹…	Õäµ]•‰Í¥Ñ”ˆ°($%É•½É‘Ìè€‰Í¥¡Ñ‰…É”AÉ½‘Õ­Ñ”ˆ°($%¡•­•è€‰1¥¹­Ì•ÁËñ™Ð…´€ÄÈ¸ÕÕÍÐ€ÈÀÈØˆ°($%•ÍÑ¥µ…Ñ”è€‰UMµM£‘ÑéÕ¹•¸°­•¥¹”¹‘ÁÉ•¥Í”ˆ°($%Í½ÕÉ”è€‰EÕ•±±”Õ¹5•Ñ¡½‘”ˆ°($%½Á•¸è€‰1%Yµ-Q1=ˆ°($%Í•…É è€‰MÕ¡•¸ˆ(%ô°(%™Èèì($%¥¹‘•Á•¹‘•¹Ðè€‰Õ¥‘”¥¹“¥Á•¹‘…¹ÐÁ½ÕÈ±„I½Õµ…¹¥”ƒ
Ü”»Še•ÍÐÁ…Ì±”Í¥Ñ”½™™¥¥•°±±¡¥¹…	Õäˆ°($%É•½É‘Ìè€‰ÁÉ½‘Õ¥ÑÌÙ¥Í¥‰±•Ìˆ°($%¡•­•è€‰1¥•¹ÌÛ¥É¥™§¥Ì±”€ÄÈ…¿íÐ€ÈÀÈØˆ°($%•ÍÑ¥µ…Ñ”è€‰ÍÑ¥µ…Ñ¥½¹ÌUM°Á…Ì‘•ÌÁÉ¥à™¥¹…Õàˆ°($%Í½ÕÉ”è€‰M½ÕÉ”•Ð·¥Ñ¡½‘”ˆ°($%½Á•¸è€‰Q1=UQU0ˆ°($%Í•…É è€‰I•¡•É¡•Èˆ(%ô°(%•Ìèì($%¥¹‘•Á•¹‘•¹Ðè€‰×µ„¥¹‘•Á•¹‘¥•¹Ñ”Á…É„IÕµ…»µ„ƒ
Ü9¼•Ì•°Í¥Ñ¥¼½™¥¥…°‘”±±¡¥¹…	Õäˆ°($%É•½É‘Ìè€‰ÁÉ½‘ÕÑ½ÌÙ¥Í¥‰±•Ìˆ°($%¡•­•è€‰¹±…•ÌÉ•Ù¥Í…‘½Ì•°€ÄÈ‘”…½ÍÑ¼‘”€ÈÀÈØˆ°($%•ÍÑ¥µ…Ñ”è€‰ÍÑ¥µ…¥½¹•ÌUM°¹¼ÁÉ•¥½Ì™¥¹…±•Ìˆ°($%Í½ÕÉ”è€‰Õ•¹Ñ”ä·¥Ñ½‘¼ˆ°($%½Á•¸è€‰S1=<QU0ˆ°($%Í•…É è€‰	ÕÍ…Èˆ(%ô°(%¥Ðèì($%¥¹‘•Á•¹‘•¹Ðè€‰Õ¥‘„¥¹‘¥Á•¹‘•¹Ñ”Á•È±„I½µ…¹¥„ƒ
Ü9½¸ƒ ¥°Í¥Ñ¼Õ™™¥¥…±”±±¡¥¹…	Õäˆ°($%É•½É‘Ìè€‰ÁÉ½‘½ÑÑ¤Ù¥Í¥‰¥±¤ˆ°($%¡•­•è€‰1¥¹¬Ù•É¥™¥…Ñ¤¥°€ÄÈ…½ÍÑ¼€ÈÀÈØˆ°($%•ÍÑ¥µ…Ñ”è€‰MÑ¥µ”UM°¹½¸ÁÉ•éé¤™¥¹…±¤ˆ°($%Í½ÕÉ”è€‰½¹Ñ””µ•Ñ½‘¼ˆ°($%½Á•¸è€‰Q1=<QQU1ˆ°($%Í•…É è€‰•É„ˆ(%ô°(%Á°èì($%¥¹‘•Á•¹‘•¹Ðè€‰9¥•é…±—ñ¹äÁÉé•Ý½‘¹¥¬‘±„IÕµÕ¹¥¤ƒ
ÜQ¼¹¥”©•ÍÐ½™¥©…±¹„ÍÑÉ½¹„±±¡¥¹…	Õäˆ°($%É•½É‘Ìè€‰Ý¥‘½é¹”ÁÉ½‘Õ­Ñäˆ°($%¡•­•è€‰1¥¹­¤ÍÁÉ…Ý‘é½¹¼€ÄÈÍ¥•ÉÁ¹¥„€ÈÀÈØˆ°($%•ÍÑ¥µ…Ñ”è€‰Mé…Õ¹­¤UM°¹¥”•¹ä­¿½Ý”ˆ°($%Í½ÕÉ”è€‹åËÍ“	¼¤µ•Ñ½‘„ˆ°($%½Á•¸è€‰-QU19d-Q1=ˆ°($%Í•…É è€‰MéÕ­…¨ˆ(%ô)ôì)Ù…È™…ÑÕ…±…ÅáÑÉ…Ì€ôì(%‘”èl($%l‰]•±¡”1•¥ÍÑÕ¹•¸‰•Í¡É•¥‰Ð±±¡¥¹…	ÕäƒÙ™™•¹Ñ±¥ üˆ°€‰¥”½™™¥é¥•±±”ÁÀ¹•¹¹Ð¥¹­…Õ˜°	•ÍÑ•±±…‰Ý¥­±Õ¹œ°EÕ…±¥Ó‘ÑÍÁËñ™Õ¹œ°¥¹Ñ•É¹…Ñ¥½¹…±”1½¥ÍÑ¥¬Õ¹-Õ¹‘•¹‘¥•¹ÍÐì‘•È¥¹Ñ•É¹…Ñ¥½¹…±”Y•ÉÍ…¹•É™½±Ð‘ÕÉ É¥ÑÑ…¹‰¥•Ñ•È¸‰t°($%l‰]•±¡”…Ñ•¸‰É…Õ¡Ð•¥¹”Y•ÉÍ…¹‘Í£‘ÑéÕ¹œüˆ°€‰•È½™™¥é¥•±±”I•¡¹•È™É…Ð¹… i¥•°°]…É•¹­…Ñ•½É¥”°•Í£‘ÑéÑ•´•Ý¥¡ÐÕ¹••‰•¹•¹™…±±ÌA…­•Ñµ‡}•¸¸‰t°($%l‰%ÍÐ‘•ÈI•¡¹•ÉÁÉ•¥Ì•¹‘Ÿñ±Ñ¥œüˆ°€‰9•¥¸¸¹‘µ‡}”°]…É•¹•¥¹Õ¹œÕ¹…­ÑÕ•±°Ù•É›ñ‰…É”1¥¹¥•¸¯Ù¹¹•¸‘…Ì1¥Ù”µ¹•‰½Ðƒ‘¹‘•É¸¸‰t°($%l‰]…ÌÁËñ™”¥ Ù½È‘•´A…­•ÑÙ•ÉÍ…¹üˆ°€‰ÉÑ¥­•°°Eµ9…¡Ý•¥Í”°•Ý¥¡Ð°5‡}”°1¥¹¥•¸µ¥¹Õ¹œÕ¹‘•¸…­ÑÕ•±±•¸•Í…µÑ‰•ÑÉ…œÁËñ™•¸¸‰t(%t°(%™Èèl($%l‰EÕ•±ÌÍ•ÉÙ¥•Ì±±¡¥¹…	Õä“¥É¥Ðµ¥°€üˆ°€‰3Še…ÁÁ±¥…Ñ¥½¸½™™¥¥•±±”¥Ñ”³Še…¡…Ð°±”ÑÉ…¥Ñ•µ•¹Ð‘•Ì½µµ…¹‘•Ì°±”½¹ÑËÑ±”ÅÕ…±¥Ó¤°±„±½¥ÍÑ¥ÅÕ”¥¹Ñ•É¹…Ñ¥½¹…±”•Ð±”Í•ÉÙ¥”…ÁË¡ÌµÙ•¹Ñ”ì³Še•¹Ù½¤¥¹Ñ•É¹…Ñ¥½¹…°•ÍÐ…ÍÍÕË¤Á…È‘•ÌÑ¥•ÉÌ¸‰t°($%l‰EÕ•±±•Ì‘½¹»¥•Ì™…ÕÐµ¥°Á½ÕÈ•ÍÑ¥µ•È³Še•¹Ù½¤€üˆ°€‰1”…±Õ±…Ñ•ÕÈ½™™¥¥•°‘•µ…¹‘”±„‘•ÍÑ¥¹…Ñ¥½¸°±„…Ó¥½É¥”°±”Á½¥‘Ì•ÍÑ¥·¤•Ð°Í¤»¥•ÍÍ…¥É”°±•Ì‘¥µ•¹Í¥½¹Ì¸‰t°($%l‰1”Ë¥ÍÕ±Ñ…Ð‘Ô…±Õ±…Ñ•ÕÈ•ÍÐµ¥°™¥¹…°€üˆ°€‰9½¸¸5•ÍÕÉ•Ì™¥¹…±•Ì°ƒ¥±¥¥‰¥±¥Ó¤•Ð±¥¹•Ì‘¥ÍÁ½¹¥‰±•ÌÁ•ÕÙ•¹Ðµ½‘¥™¥•È±”‘•Ù¥ÌË¥•°¸‰t°($%l‰EÕ”Û¥É¥™¥•È…Ù…¹Ð³Še•¹Ù½¤€üˆ°€‰ÉÑ¥±”É—Ô°ÁÉ•ÕÙ•ÌE°Á½¥‘Ì°‘¥µ•¹Í¥½¹Ì°ƒ¥±¥¥‰¥±¥Ó¤‘”±„±¥¹”•ÐÑ½Ñ…°…ÑÕ•°¸‰t(%t°(%•Ìèl($%l‹
ýE×¤Í•ÉÙ¥¥½Ì‘•ÍÉ¥‰”±±¡¥¹…	Õäüˆ°€‰1„…ÁÀ½™¥¥…°•¹Õµ•É„½µÁÉ„°•ÍÑ§Í¸‘”Á•‘¥‘½Ì°¥¹ÍÁ•§Í¸‘”…±¥‘…°±½ŸµÍÑ¥„¥¹Ñ•É¹…¥½¹…°äÁ½ÍÙ•¹Ñ„ì•°•¹Ûµ¼¥¹Ñ•É¹…¥½¹…°±¼ÁÉ•ÍÑ…¸Ñ•É•É½Ì¸‰t°($%l‹
ýE×¤‘…Ñ½Ì¹••Í¥Ñ„Õ¹„•ÍÑ¥µ…§Í¸üˆ°€‰1„…±Õ±…‘½É„½™¥¥…°Í½±¥¥Ñ„‘•ÍÑ¥¹¼°…Ñ•½Ëµ„°Á•Í¼•ÍÑ¥µ…‘¼ä°Õ…¹‘¼½ÉÉ•ÍÁ½¹‘”°‘¥µ•¹Í¥½¹•Ì¸‰t°($%l‹
ý°É•ÍÕ±Ñ…‘¼•Ì•°ÁÉ•¥¼™¥¹…°üˆ°€‰9¼¸5•‘¥‘…Ì™¥¹…±•Ì°•±•¥‰¥±¥‘…äÉÕÑ…Ì‘¥ÍÁ½¹¥‰±•ÌÁÕ•‘•¸…µ‰¥…È±„½Ñ¥é…§Í¸É•…°¸‰t°($%l‹
ýE×¤É•Ù¥Í…È…¹Ñ•Ì‘”•¹Ù¥…Èüˆ°€‰AÉ½‘ÕÑ¼°ÁÉÕ•‰…ÌE°Á•Í¼°‘¥µ•¹Í¥½¹•Ì°•±•¥‰¥±¥‘…‘”ÉÕÑ„äÑ½Ñ…°…ÑÕ…°¸‰t(%t°(%¥Ðèl($%l‰EÕ…±¤Í•ÉÙ¥é¤‘•ÍÉ¥Ù”±±¡¥¹…	Õäüˆ°€‰3Še…ÁÀÕ™™¥¥…±”¥¹‘¥„…ÅÕ¥ÍÑ¼°•ÍÑ¥½¹”½É‘¥¹¤°½¹ÑÉ½±±¼ÅÕ…±¥Ó€°±½¥ÍÑ¥„¥¹Ñ•É¹…é¥½¹…±””Á½ÍÐµÙ•¹‘¥Ñ„ì±„ÍÁ•‘¥é¥½¹”¥¹Ñ•É¹…é¥½¹…±”ƒ ™½É¹¥Ñ„‘„Ñ•Éé¤¸‰t°($%l‰EÕ…±¤‘…Ñ¤Í•ÉÙ½¹¼Á•ÈÕ¹„ÍÑ¥µ„üˆ°€‰%°…±½±…Ñ½É”Õ™™¥¥…±”É¥¡¥•‘”‘•ÍÑ¥¹…é¥½¹”°…Ñ•½É¥„°Á•Í¼ÍÑ¥µ…Ñ¼”°Í”¹••ÍÍ…É¥¼°‘¥µ•¹Í¥½¹¤¸‰t°($%l‰%°É¥ÍÕ±Ñ…Ñ¼ƒ ¥°ÁÉ•éé¼™¥¹…±”üˆ°€‰9¼¸5¥ÍÕÉ”™¥¹…±¤°¥‘½¹•¥Ó€”±¥¹•”‘¥ÍÁ½¹¥‰¥±¤Á½ÍÍ½¹¼…µ‰¥…É”¥°ÁÉ•Ù•¹Ñ¥Ù¼É•…±”¸‰t°($%l‰½Í„Ù•É¥™¥…É”ÁÉ¥µ„‘•±±„ÍÁ•‘¥é¥½¹”üˆ°€‰AÉ½‘½ÑÑ¼°ÁÉ½Ù”E°Á•Í¼°‘¥µ•¹Í¥½¹¤°¥‘½¹•¥Ó€‘•±±„±¥¹•„”Ñ½Ñ…±”…ÑÑÕ…±”¸‰t(%t°(%Á°èl($%l‰)…­¥”ÕÏ	Õ¤½Á¥ÍÕ©”±±¡¥¹…	Õäüˆ°€‰=™¥©…±¹„…Á±¥­…©„Ýåµ¥•¹¥„é…­ÕÀ°É•…±¥é…«dé…·ÍÝ¥—°­½¹ÑÉ½³d©…­¿m¤°±½¥ÍÑå¯dµ§e‘éå¹…É½‘½ß¤½‰Ï	ÕŸdÁ½ÍÁÉé•‘‡ñ½ßìÝåÍç	¯dé…Á•Ý¹¥…«™¥Éµäé•Ý»eÑÉé¹”¸‰t°($%l‰)…­¥”‘…¹”ÏÁ½ÑÉé•‰¹”‘¼Ýå•¹äüˆ°€‰=™¥©…±¹ä­…±­Õ±…Ñ½ÈÁåÑ„¼­É…¨°­…Ñ•½É§d°Íé…½Ý…»Ý…Ÿd¤ÜÉ…é¥”Á½ÑÉé•‰äÝåµ¥…Éä¸‰t°($%l‰éäÝå¹¥¬­…±­Õ±…Ñ½É„©•ÍÐ½ÍÑ…Ñ•é¹äüˆ°€‰9¥”¸-¿½Ý”Ýåµ¥…Éä°­Ý…±¥™¥­…©„Ñ½Ý…ÉÔ¤‘½ÍÓeÁ¹”±¥¹¥”µ½Ÿéµ¥•¹§½™•ÉÓd¸‰t°($%l‰¼ÍÁÉ…Ý‘é§ÁÉé•ÝåÍç	¯üˆ°€‰AÉ½‘Õ­Ð°é‘«e¥„E°Ý…Ÿd°Ýåµ¥…Éä°‘½ÍÓeÁ¹¿o±¥¹¥¤¤…­ÑÕ…±»ÍÕ·d¸‰t(%t°(%É¼èl($%l‰”Í•ÉÙ¥¥¤‘•ÍÉ¥”±±¡¥¹…	Õäüˆ°€‰Á±¥‡"m¥„½™¥¥…³•¹Õµ•Ë…¡¥é§"m¥„°ÁÉ½•Í…É•„½µ•¹é¥±½È°½¹ÑÉ½±Õ°…±¥Ó"m¥¤°±½¥ÍÑ¥„¥¹Ñ•É¹‡"m¥½¹…³ƒ"e¤Í•ÉÙ¥¥¥±”Á½ÍÐµÛ‰¹é…É”ìÑÉ…¹ÍÁ½ÉÑÕ°¥¹Ñ•É¹‡"m¥½¹…°•ÍÑ”½™•É¥Ð‘”Ñ•Ë"m¤¸‰t°($%l‰”‘…Ñ”ÍÕ¹Ð¹••Í…É”Á•¹ÑÉÔ•ÍÑ¥µ…É”üˆ°€‰…±Õ±…Ñ½ÉÕ°½™¥¥…°•É”‘•ÍÑ¥¹‡"m¥„°…Ñ•½É¥„°É•ÕÑ…Ñ•„•ÍÑ¥µ…Óƒ"e¤°Õ¹‘”•ÍÑ”…éÕ°°‘¥µ•¹Í¥Õ¹¥±”¸‰t°($%l‰I•éÕ±Ñ…ÑÕ°•ÍÑ”ÁÉ—"mÕ°™¥¹…°üˆ°€‰9Ô¸¥µ•¹Í¥Õ¹¥±”™¥¹…±”°•±¥¥‰¥±¥Ñ…Ñ•„ƒ"e¤ÉÕÑ•±”‘¥ÍÁ½¹¥‰¥±”Á½Ðµ½‘¥™¥„½™•ÉÑ„É•…³¸‰t°($%l‰”Ù•É¥™¥Œƒ¹¹…¥¹Ñ”‘”•áÁ•‘¥•É”üˆ°€‰AÉ½‘ÕÍÕ°°‘½Ù•é¥±”E°É•ÕÑ…Ñ•„°‘¥µ•¹Í¥Õ¹¥±”°•±¥¥‰¥±¥Ñ…Ñ•„ÉÕÑ•¤ƒ"e¤Ñ½Ñ…±Õ°…ÑÕ…°¸‰t(%t)ôì)™½È€¡½¹ÍÐ±½…±”½˜±½…±•ÌÄ¤¥˜€¡±½…±”€„ôô€‰•¸ˆ¤±½…±•½Áåm±½…±•t¹™…Ä¹ÁÕÍ  ¸¸¹™…ÑÕ…±…ÅáÑÉ…Ím±½…±•t¤ì)Ù…Èµ•Ñ¡½‘½±½å½Áä€ôì(%É¼èl($%lˆàƒ99I%MQK	I$Y%i%	%1ˆ°€‰9Õ·ÉÕ°…™§"e…Ð‘•ÍÉ¥”¹Õµ…¤•±”½ÁÐ…É‘ÕÉ¤ÁÕ‰±¥…Ñ”Á”…•…ÍÓÁ…¥»¸9ÔÁÉ•Ñ¥¹‘•´•á¥ÍÓ¼‰…ë…ÍÕ¹ÏÔµ¥¤‘”ÁÉ½‘ÕÍ”¸‰t°($%l‰1%9-UI$5AQˆ°€‰¥•…É”ÁÉ½‘ÕÌ„™½ÍÐÉ•µ…Á…Ð±„¼Á…¥»¹‰Õå¡„¹½´…É”É•ÑÕÉ¹„Õ¸ÁÉ½‘ÕÌÔ…•±‡"e¤¹Õµ”±„Ù•É¥™¥…É•„‘¥¸€ÄÈ…ÕÕÍÐ€ÈÀÈØ¸‰t°($%l‰MQ%7	I$UMˆ°€‰Y…±½É¥±”UMÍÕ¹Ð½É¥•¹Ñ…Ñ¥Ù”°…±Õ±…Ñ”‘¥¸ÁÉ—"mÕÉ¥±”9d…™§"e…Ñ”ƒ"e¤ÕÉÍÕ°‘”É•™•É¥»"o€ÄUM€ô€Ø°ÜÐÐ9d‘¥¸€ÄÈ…ÕÕÍÐ€ÈÀÈØ¸Y…É¥…¹Ñ„ƒ"e¤ÕÉÍÕ°Á½ÐÍ¡¥µ‰„Ñ½Ñ…±Õ°¸‰t(%t°(%•¸èl($%lˆàY%M%	1I=ILˆ°€‰Q¡”½Õ¹Ð‘•ÍÉ¥‰•Ì½¹±äÑ¡”•¥¡ÐÁÉ½‘ÕÐ…É‘ÌÁÕ‰±¥Í¡•½¸Ñ¡¥ÌÁ…”¸]”‘¼¹½Ð±…¥´„¡¥‘‘•¸‘…Ñ…‰…Í”½¹Ñ…¥¹¥¹œÑ¡½ÕÍ…¹‘Ì½˜ÁÉ½‘ÕÑÌ¸‰t°($%l‰5AA1%9-Lˆ°€‰… ÁÉ½‘ÕÐÝ…ÌÉ•µ…ÁÁ•Ñ¼„¹‰Õå¡„¹½´Á…”É•ÑÕÉ¹¥¹œÑ¡”Í…µ”¹…µ•ÁÉ½‘ÕÐÝ¡•¸¡•­•½¸€ÄÈÕÕÍÐ€ÈÀÈØ¸‰t°($%l‰UMMQ%5QLˆ°€‰UMÙ…±Õ•Ì…É”¥¹‘¥…Ñ¥Ù”½¹Ù•ÉÍ¥½¹Ì™É½´‘¥ÍÁ±…å•9dÁÉ¥•ÌÕÍ¥¹œ€ÄUM€ô€Ø¸ÜÐÐ9d½¸€ÄÈÕÕÍÐ€ÈÀÈØ¸Y…É¥…¹Ð…¹•á¡…¹”µÉ…Ñ”¡…¹•Ì…™™•ÐÑ¡”Ñ½Ñ…°¸‰t(%t°(%‘”èl($%lˆàM%!Q	I%9QKˆ°€‰¥”i…¡°‰•Í¡É•¥‰Ð¹ÕÈ‘¥”…¡ÐÙ•ËÙ™™•¹Ñ±¥¡Ñ•¸AÉ½‘Õ­Ñ­…ÉÑ•¸¸ÌÝ¥É­•¥¹”Ù•ÉÍÑ•­Ñ”…Ñ•¹‰…¹¬µ¥ÐQ…ÕÍ•¹‘•¸AÉ½‘Õ­Ñ•¸‰•¡…ÕÁÑ•Ð¸‰t°($%l‰iU=I9Q1%9-Lˆ°€‰)•‘•ÌAÉ½‘Õ­ÐÝÕÉ‘”•¥¹•ÈÁ…ÍÍ•¹‘•¸¹‰Õå¡„¹½´µAÉ½‘Õ­ÑÍ•¥Ñ”éÕ•½É‘¹•ÐÕ¹…´€ÄÈ¸ÕÕÍÐ€ÈÀÈØ•ÁËñ™Ð¸‰t°($%l‰UMµM#QiU98ˆ°€‰¥”UMµ]•ÉÑ”Í¥¹;‘¡•ÉÕ¹•¸…ÕÌ‘•¸…¹•é•¥Ñ•¸9dµAÉ•¥Í•¸‰•¤€ÄUM€ô€Ø°ÜÐÐ9d…´€ÄÈ¸ÕÕÍÐ€ÈÀÈØ¸Y…É¥…¹Ñ”Õ¹]•¡Í•±­ÕÉÌ¯Ù¹¹•¸‘•¸	•ÑÉ…œƒ‘¹‘•É¸¸‰t(%t°(%™Èèl($%lˆà%!LY%M%	1Lˆ°€‰1”¹½µ‰É”“¥É¥ÐÕ¹¥ÅÕ•µ•¹Ð±•Ì¡Õ¥Ð…ÉÑ•ÌÁÕ‰±§¥•ÌÍÕÈ•ÑÑ”Á…”¸9½ÕÌ¹”É•Ù•¹‘¥ÅÕ½¹ÌÁ…ÌÕ¹”‰…Í”…£¥”‘”µ¥±±¥•ÉÌ‘”ÁÉ½‘Õ¥ÑÌ¸‰t°($%l‰1%9L5AC%Lˆ°€‰¡…ÅÕ”ÁÉ½‘Õ¥Ð„ƒ¥Ó¤…ÍÍ½§¤ƒ€Õ¹”™¥¡”¹‰Õå¡„¹½´Á½ÉÑ…¹Ð±”·©µ”¹½´•ÐÛ¥É¥™§¥”±”€ÄÈ…¿íÐ€ÈÀÈØ¸‰t°($%l‰MQ%5Q%=9LUMˆ°€‰1•Ìµ½¹Ñ…¹ÑÌUMÍ½¹Ð‘•Ì½¹Ù•ÉÍ¥½¹Ì¥¹‘¥…Ñ¥Ù•Ì‘•ÌÁÉ¥à9d…Ù•Œ€ÄUM€ô€Ø°ÜÐÐ9d…Ô€ÄÈ…¿íÐ€ÈÀÈØ¸Y…É¥…¹Ñ”•ÐÑ…Õà‘”¡…¹”µ½‘¥™¥•¹Ð±”Ñ½Ñ…°¸‰t(%t°(%•Ìèl($%lˆàI%MQI=LY%M%	1Lˆ°€‰1„¥™É„‘•ÍÉ¥‰”Í½±¼±…Ì½¡¼Ñ…É©•Ñ…ÌÁÕ‰±¥…‘…Ì•¸•ÍÑ„Ã…¥¹„¸9¼…™¥Éµ…µ½ÌÑ•¹•ÈÕ¹„‰…Í”½Õ±Ñ„½¸µ¥±•Ì‘”ÁÉ½‘ÕÑ½Ì¸‰t°($%l‰91L5A=Lˆ°€‰…‘„ÁÉ½‘ÕÑ¼Í”…Í½§Ì½¸Õ¹„™¥¡„‘”¹‰Õå¡„¹½´‘•°µ¥Íµ¼¹½µ‰É”äÍ”É•Ù¥ÏÌ•°€ÄÈ‘”…½ÍÑ¼‘”€ÈÀÈØ¸‰t°($%l‰MQ%5%=9LUMˆ°€‰1½Ì¥µÁ½ÉÑ•ÌUMÍ½¸½¹Ù•ÉÍ¥½¹•Ì½É¥•¹Ñ…Ñ¥Ù…Ì‘”ÁÉ•¥½Ì9d½¸€ÄUM€ô€Ø°ÜÐÐ9d•°€ÄÈ‘”…½ÍÑ¼‘”€ÈÀÈØ¸Y…É¥…¹Ñ”ä…µ‰¥¼ÁÕ•‘•¸µ½‘¥™¥…È•°Ñ½Ñ…°¸‰t(%t°(%¥Ðèl($%lˆàM!Y%M%	%1$ˆ°€‰%°¹Õµ•É¼‘•ÍÉ¥Ù”Í½±Ñ…¹Ñ¼±”½ÑÑ¼Í¡•‘”ÁÕ‰‰±¥…Ñ”¸9½¸‘¥¡¥…É¥…µ¼³Še•Í¥ÍÑ•¹é„‘¤Õ¸‘…Ñ…‰…Í”¹…Í½ÍÑ¼½¸µ¥±¥…¥„‘¤ÁÉ½‘½ÑÑ¤¸‰t°($%l‰1%9,5AAQ$ˆ°€‰=¹¤ÁÉ½‘½ÑÑ¼ƒ ÍÑ…Ñ¼…ÍÍ½¥…Ñ¼„Õ¹„Á…¥¹„¹‰Õå¡„¹½´½¸±¼ÍÑ•ÍÍ¼¹½µ””Ù•É¥™¥…Ñ¼¥°€ÄÈ…½ÍÑ¼€ÈÀÈØ¸‰t°($%l‰MQ%5UMˆ°€‰±¤¥µÁ½ÉÑ¤UMÍ½¹¼½¹Ù•ÉÍ¥½¹¤¥¹‘¥…Ñ¥Ù”‘•¤ÁÉ•éé¤9d½¸€ÄUM€ô€Ø°ÜÐÐ9d…°€ÄÈ…½ÍÑ¼€ÈÀÈØ¸Y…É¥…¹Ñ””…µ‰¥¼Á½ÍÍ½¹¼µ½‘¥™¥…É”¥°Ñ½Ñ…±”¸‰t(%t°(%Á°èl($%lˆà]%=i9e A=ie)$ˆ°€‰1¥é‰„½Á¥ÍÕ©”Ýçé¹¥”½Í¥•´­…ÉÐ½ÁÕ‰±¥­½Ý…¹å ¹„Ñ•¨ÍÑÉ½¹¥”¸9¥”‘•­±…ÉÕ©•µäÕ­ÉåÑ•¨‰…éäèÑåÍ§…µ¤ÁÉ½‘Õ­ÓÍÜ¸‰t°($%l‰=AM=]91%9-$ˆ°€‰-‡ñ‘äÁÉ½‘Õ­ÐÁ¿é½¹¼é”ÍÑÉ½»¹‰Õå¡„¹½´¼Ñ•¨Í…µ•¨¹…éÝ¥”¤ÍÁÉ…Ý‘é½¹¼€ÄÈÍ¥•ÉÁ¹¥„€ÈÀÈØ¸‰t°($%l‰MiU9-$UMˆ°€‰-Ý½ÑäUMÏ½É¥•¹Ñ…å©¹å´ÁÉé•±¥é•¹¥•´•¸9dÁ¼­ÕÉÍ¥”€ÄUM€ô€Ø°ÜÐÐ9dè€ÄÈÍ¥•ÉÁ¹¥„€ÈÀÈØ¸]…É¥…¹Ð¤­ÕÉÌµ½Ÿéµ¥•¹§ÍÕ·d¸‰t(%t)ôì)Ù…ÈÉ½µ…¹¥…Õ¥‘…¹”€ôì(%É¼èl($%l($$$‰QYƒ"e¤‘•±…É‡"m¥„‘”¥µÁ½ÉÐˆ°($$$‰Q½…Ñ”‰Õ¹ÕÉ¥±”…É”¥¹ÑËƒ¹¸U¹••Í¥Ó‘•±…É‡"m¥”‘”¥µÁ½ÉÐ¸A•¹ÑÉÔ•áÁ•‘¥•É¥±”%=ML‘”Ã‰»±„€ÄÔÀUH°QYÁ½…Ñ”™¤½±•Ñ…Ó±„ÕµÃÉ…É”¹Õµ…¤‘…¹Õ·ÉÕ°%=ML…©Õ¹”½É•Ðƒ¹¸µ•Í…©•±”•±•ÑÉ½¹¥”¸ˆ°($$$‰½µ¥Í¥„ÕÉ½Á•…»ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½ÕÍÑ½µÌ½ÕÍÑ½µÌµÁÉ½•‘ÕÉ•Ìµ¥µÁ½ÉÐµ…¹µ•áÁ½ÉÐ½ÕÍÑ½µÌµ½Á•É…Ñ¥½¹Ì½ÕÍÑ½µÌµ™½Éµ…±¥Ñ¥•Ìµ±½ÜµÙ…±Õ”µ½¹Í¥¹µ•¹ÑÍ}•¸ˆ($%t°($%l($$$‰Q…ãÙ…µ…³Ñ•µÁ½É…Ë‘¥¸€ÈÀÈØˆ°($$$‰”±„€Ä¥Õ±¥”€ÈÀÈØ°U…Á±¥¼Ñ…ãÙ…µ…³Ñ•µÁ½É…Ë‘”€ÌUHÁ•È…ÉÑ¥½°Á•¹ÑÉÔÛ‰¹ëÉ¥±”±„‘¥ÍÑ…»"o‘¥¸½±•Ñ”ÔÙ…±½…É”‘”Ã‰»±„€ÄÔÀUH°Ã‰»±„€Ä¥Õ±¥”€ÈÀÈà¸Y•É¥™¥É•Õ±„ƒ¹¹…¥¹Ñ”‘”•áÁ•‘¥•É”¸ˆ°($$$‰¡¥‘Õ°U€ÈÀÈØˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½¹•ÝÌ½Õ¥‘…¹”µ…¹µ±•…°µÑ•áÐµÑ•µÁ½É…Éäµ™±…Ðµ™•”µ±½ÜµÙ…±Õ”µ¥µÁ½ÉÑÌµÝ¡¥ µÝ¥±°µ…ÁÁ±äµÕ¹Ñ¥°´Äµ©Õ±ä´ÈÀÈà´ÈÀÈØ´ÀØ´Àá}•¸ˆ($%t°($%l($$$‰=™•ÉÑ„‘”ÑÉ…¹ÍÁ½ÉÐ¹Ô•ÍÑ”½ÍÑÕ°±¥ÙÉ…Ðˆ°($$$‰AÉ—"mÕ°ÉÕÑ•¤¹Ô…É…¹Ñ•…ëQY°Ñ…á•±”Ù…µ…±”°½µ¥Í¥½¹Õ°‘”ÁÉ•é•¹Ñ…É”Í…Ô…±Ñ”½ÍÑÕÉ¤±½…±”¸½¹™¥É·‘½Õµ•¹Ñ•±”%=MLƒ"e¤Ñ…É¥™•±”…ÑÕ…±”…±”½Á•É…Ñ½ÉÕ±Õ¤ƒ¹¹…¥¹Ñ”‘”ÑÉ¥µ¥Ñ•É”¸ˆ°($$$‰A¿"eÑ„I½·‰»ˆ°($$$‰¡ÑÑÁÌè¼½ÝÝÜ¹Á½ÍÑ„µÉ½µ…¹„¹É¼½•¸½„ÄÐàà½¤µÝ…¹ÐµÑ¼µÉ••¥Ù”½ÕÍ•™Õ°µ¥¹™½Éµ…Ñ¥½¸¼½Ù…Ðµ…¹µÕÍÑ½µÌµ±•…É…¹”µµ½‘¥™¥…Ñ¥½¹Ì¹¡Ñµ°ˆ($%t(%t°(%•¸èl($%l($$$‰%µÁ½ÉÐYP…¹‘•±…É…Ñ¥½¸ˆ°($$$‰±°½½‘Ì•¹Ñ•É¥¹œÑ¡”TÉ•ÅÕ¥É”…¸¥µÁ½ÉÐ‘•±…É…Ñ¥½¸¸½È%=ML½¹Í¥¹µ•¹ÑÌÕÀÑ¼UH€ÄÔÀ°YP¥ÌÑÉ•…Ñ•…ÌÁ…¥…ÐÁÕÉ¡…Í”½¹±äÝ¡•¸Ù…±¥%=ML‘…Ñ„É•…¡•ÌÑ¡”Á½ÍÑ…°ÕÍÑ½µÌµ•ÍÍ…”¸ˆ°($$$‰ÕÉ½Á•…¸½µµ¥ÍÍ¥½¸ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½ÕÍÑ½µÌ½ÕÍÑ½µÌµÁÉ½•‘ÕÉ•Ìµ¥µÁ½ÉÐµ…¹µ•áÁ½ÉÐ½ÕÍÑ½µÌµ½Á•É…Ñ¥½¹Ì½ÕÍÑ½µÌµ™½Éµ…±¥Ñ¥•Ìµ±½ÜµÙ…±Õ”µ½¹Í¥¹µ•¹ÑÍ}•¸ˆ($%t°($%l($$$‰Q•µÁ½É…Éä€ÈÀÈØÕÍÑ½µÌ‘ÕÑäˆ°($$$‰É½´€Ä)Õ±ä€ÈÀÈØ°Ñ¡”T…ÁÁ±¥•Ì„Ñ•µÁ½É…ÉäUH€ÌÕÍÑ½µÌ‘ÕÑäÁ•È¥Ñ•´Ñ¼‘¥ÍÑ…¹”Í…±•Ì¥¸½¹Í¥¹µ•¹ÑÌÕÀÑ¼UH€ÄÔÀ°Õ¹Ñ¥°€Ä)Õ±ä€ÈÀÈà¸I•¡•¬Ñ¡”ÉÕ±”‰•™½É”Í¡¥ÁÁ¥¹œ¸ˆ°($$$‰T€ÈÀÈØÕ¥‘…¹”ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½¹•ÝÌ½Õ¥‘…¹”µ…¹µ±•…°µÑ•áÐµÑ•µÁ½É…Éäµ™±…Ðµ™•”µ±½ÜµÙ…±Õ”µ¥µÁ½ÉÑÌµÝ¡¥ µÝ¥±°µ…ÁÁ±äµÕ¹Ñ¥°´Äµ©Õ±ä´ÈÀÈà´ÈÀÈØ´ÀØ´Àá}•¸ˆ($%t°($%l($$$‰™É•¥¡ÐÅÕ½Ñ”¥Ì¹½Ð±…¹‘•½ÍÐˆ°($$$‰É½ÕÑ”ÁÉ¥”‘½•Ì¹½ÐÕ…É…¹Ñ•”YP°ÕÍÑ½µÌ‘ÕÑä°ÁÉ•Í•¹Ñ…Ñ¥½¸™••Ì½È½Ñ¡•È±½…°¡…É•Ì¸Y•É¥™ä%=ML‘…Ñ„…¹Ñ¡”ÕÉÉ•¹ÐI½µ…¹¥…¸½Á•É…Ñ½ÈÑ…É¥™˜‰•™½É”ÍÕ‰µ¥ÍÍ¥½¸¸ˆ°($$$‰A¿"eÑ„I½·‰»ˆ°($$$‰¡ÑÑÁÌè¼½ÝÝÜ¹Á½ÍÑ„µÉ½µ…¹„¹É¼½•¸½„ÄÐàà½¤µÝ…¹ÐµÑ¼µÉ••¥Ù”½ÕÍ•™Õ°µ¥¹™½Éµ…Ñ¥½¸¼½Ù…Ðµ…¹µÕÍÑ½µÌµ±•…É…¹”µµ½‘¥™¥…Ñ¥½¹Ì¹¡Ñµ°ˆ($%t(%t°(%‘”èl($%l($$$‰¥¹™Õ¡ÉÕµÍ…ÑéÍÑ•Õ•ÈÕ¹¹µ•±‘Õ¹œˆ°($$$‰±±”]…É•¸¥¸‘¥”T‰•»ÙÑ¥•¸•¥¹”¥¹™Õ¡É…¹µ•±‘Õ¹œ¸	•¤%=MLµM•¹‘Õ¹•¸‰¥Ì€ÄÔÀUH¥±Ð‘¥”MÑ•Õ•È¹ÕÈ‘…¹¸…±ÌÙ½É…ÕÍ‰•é…¡±Ð°Ý•¹¸Ÿñ±Ñ¥”%=MLµ…Ñ•¸•±•­ÑÉ½¹¥Í ƒñ‰•Éµ¥ÑÑ•±ÐÝ•É‘•¸¸ˆ°($$$‰ÕÉ½Ã‘¥Í¡”-½µµ¥ÍÍ¥½¸ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½ÕÍÑ½µÌ½ÕÍÑ½µÌµÁÉ½•‘ÕÉ•Ìµ¥µÁ½ÉÐµ…¹µ•áÁ½ÉÐ½ÕÍÑ½µÌµ½Á•É…Ñ¥½¹Ì½ÕÍÑ½µÌµ™½Éµ…±¥Ñ¥•Ìµ±½ÜµÙ…±Õ”µ½¹Í¥¹µ•¹ÑÍ}•¸ˆ($%t°($%l($$$‰	•™É¥ÍÑ•Ñ•Èi½±°€ÈÀÈØˆ°($$$‰M•¥Ð€Ä¸)Õ±¤€ÈÀÈØ¥±ÐÙ½Ëñ‰•É•¡•¹•¥¸i½±°Ù½¸€ÌUH©”ÉÑ¥­•°›ñÈ•É¹Ù•É¯‘Õ™”¥¸M•¹‘Õ¹•¸‰¥Ì€ÄÔÀUH°‰¥Ì€Ä¸)Õ±¤€ÈÀÈà¸Y½ÈY•ÉÍ…¹•É¹•ÕÐÁËñ™•¸¸ˆ°($$$‰Tµ1•¥Ñ™…‘•¸€ÈÀÈØˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½¹•ÝÌ½Õ¥‘…¹”µ…¹µ±•…°µÑ•áÐµÑ•µÁ½É…Éäµ™±…Ðµ™•”µ±½ÜµÙ…±Õ”µ¥µÁ½ÉÑÌµÝ¡¥ µÝ¥±°µ…ÁÁ±äµÕ¹Ñ¥°´Äµ©Õ±ä´ÈÀÈà´ÈÀÈØ´ÀØ´Àá}•¸ˆ($%t°($%l($$$‰É…¡ÑÁÉ•¥Ì¥ÍÐ¹¥¡Ð¹‘ÁÉ•¥Ìˆ°($$$‰•ÈI½ÕÑ•¹ÁÉ•¥Ì…É…¹Ñ¥•ÉÐÝ•‘•ÈMÑ•Õ•È¹½ i½±°°Y½É±…••‹ñ¡È½‘•ÈÝ•¥Ñ•É”±½­…±”-½ÍÑ•¸¸%=MLµ…Ñ•¸Õ¹…­ÑÕ•±±”Q…É¥™”¥¸IÕ·‘¹¥•¸ÁËñ™•¸¸ˆ°($$$‰A¿"eÑ„I½·‰»ˆ°($$$‰¡ÑÑÁÌè¼½ÝÝÜ¹Á½ÍÑ„µÉ½µ…¹„¹É¼½•¸½„ÄÐàà½¤µÝ…¹ÐµÑ¼µÉ••¥Ù”½ÕÍ•™Õ°µ¥¹™½Éµ…Ñ¥½¸¼½Ù…Ðµ…¹µÕÍÑ½µÌµ±•…É…¹”µµ½‘¥™¥…Ñ¥½¹Ì¹¡Ñµ°ˆ($%t(%t°(%™Èèl($%l($$$‰QY•Ð“¥±…É…Ñ¥½¸“Še¥µÁ½ÉÑ…Ñ¥½¸ˆ°($$$‰Q½ÕÑ”µ…É¡…¹‘¥Í”•¹ÑÉ…¹Ð‘…¹Ì³ŠeU•á¥”Õ¹”“¥±…É…Ñ¥½¸¸A½ÕÈ³Še%=ML©ÕÍÅ×Šg€€ÄÔÀUH°±„QY»Še•ÍÐÉ•½¹¹Õ”½µµ”Á…ç¥”ÅÕ”Í¤±•Ì‘½¹»¥•Ì%=MLÙ…±¥‘•ÌÍ½¹ÐÑÉ…¹Íµ¥Í•Ìƒ¥±•ÑÉ½¹¥ÅÕ•µ•¹Ð¸ˆ°($$$‰½µµ¥ÍÍ¥½¸•ÕÉ½Ã¥•¹¹”ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½ÕÍÑ½µÌ½ÕÍÑ½µÌµÁÉ½•‘ÕÉ•Ìµ¥µÁ½ÉÐµ…¹µ•áÁ½ÉÐ½ÕÍÑ½µÌµ½Á•É…Ñ¥½¹Ì½ÕÍÑ½µÌµ™½Éµ…±¥Ñ¥•Ìµ±½ÜµÙ…±Õ”µ½¹Í¥¹µ•¹ÑÍ}•¸ˆ($%t°($%l($$$‰É½¥ÐÑ•µÁ½É…¥É”€ÈÀÈØˆ°($$$‰•ÁÕ¥Ì±”€Å•È©Õ¥±±•Ð€ÈÀÈØ°Õ¸‘É½¥ÐÑ•µÁ½É…¥É”‘”€ÌUHÁ…È…ÉÑ¥±”ÏŠe…ÁÁ±¥ÅÕ”…ÕàÙ•¹Ñ•Ìƒ€‘¥ÍÑ…¹”‘…¹Ì±•Ì½±¥Ì©ÕÍÅ×Šg€€ÄÔÀUH°©ÕÍÅ×Še…Ô€Å•È©Õ¥±±•Ð€ÈÀÈà¸ƒ É•Û¥É¥™¥•È…Ù…¹Ð³Še•¹Ù½¤¸ˆ°($$$‰Õ¥‘”U€ÈÀÈØˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½¹•ÝÌ½Õ¥‘…¹”µ…¹µ±•…°µÑ•áÐµÑ•µÁ½É…Éäµ™±…Ðµ™•”µ±½ÜµÙ…±Õ”µ¥µÁ½ÉÑÌµÝ¡¥ µÝ¥±°µ…ÁÁ±äµÕ¹Ñ¥°´Äµ©Õ±ä´ÈÀÈà´ÈÀÈØ´ÀØ´Àá}•¸ˆ($%t°($%l($$$‰1”‘•Ù¥Ì»Še•ÍÐÁ…Ì±”¿íÐ±¥ÙË¤ˆ°($$$‰1”ÁÉ¥à‘”±„±¥¹”¹”…É…¹Ñ¥Ð¹¤QY°¹¤‘É½¥ÑÌ°¹¤™É…¥Ì‘”ÁË¥Í•¹Ñ…Ñ¥½¸±½…Õà¸[¥É¥™¥•è±•Ì‘½¹»¥•Ì%=ML•Ð±•ÌÑ…É¥™ÌÉ½Õµ…¥¹Ì…ÑÕ•±Ì¸ˆ°($$$‰A¿"eÑ„I½·‰»ˆ°($$$‰¡ÑÑÁÌè¼½ÝÝÜ¹Á½ÍÑ„µÉ½µ…¹„¹É¼½•¸½„ÄÐàà½¤µÝ…¹ÐµÑ¼µÉ••¥Ù”½ÕÍ•™Õ°µ¥¹™½Éµ…Ñ¥½¸¼½Ù…Ðµ…¹µÕÍÑ½µÌµ±•…É…¹”µµ½‘¥™¥…Ñ¥½¹Ì¹¡Ñµ°ˆ($%t(%t°(%•Ìèl($%l($$$‰%Yä‘•±…É…§Í¸‘”¥µÁ½ÉÑ…§Í¸ˆ°($$$‰Q½‘½Ì±½Ì‰¥•¹•ÌÅÕ”•¹ÑÉ…¸•¸±„UÉ•ÅÕ¥•É•¸‘•±…É…§Í¸¸¸%=ML¡…ÍÑ„€ÄÔÀUH°•°%YÍ½±¼Í”É•½¹½”½µ¼Á……‘¼Í¤±½Ì‘…Ñ½Ì%=MLÛ…±¥‘½ÌÍ”ÑÉ…¹Íµ¥Ñ•¸•±•ÑËÍ¹¥…µ•¹Ñ”¸ˆ°($$$‰½µ¥Í§Í¸ÕÉ½Á•„ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½ÕÍÑ½µÌ½ÕÍÑ½µÌµÁÉ½•‘ÕÉ•Ìµ¥µÁ½ÉÐµ…¹µ•áÁ½ÉÐ½ÕÍÑ½µÌµ½Á•É…Ñ¥½¹Ì½ÕÍÑ½µÌµ™½Éµ…±¥Ñ¥•Ìµ±½ÜµÙ…±Õ”µ½¹Í¥¹µ•¹ÑÍ}•¸ˆ($%t°($%l($$$‰•É•¡¼Ñ•µÁ½É…°‘”€ÈÀÈØˆ°($$$‰•Í‘”•°€Ä‘”©Õ±¥¼‘”€ÈÀÈØÍ”…Á±¥„Õ¸‘•É•¡¼Ñ•µÁ½É…°‘”€ÌUHÁ½È…ÉÓµÕ±¼„Ù•¹Ñ…Ì„‘¥ÍÑ…¹¥„•¸•¹Ûµ½Ì‘”¡…ÍÑ„€ÄÔÀUH°¡…ÍÑ„•°€Ä‘”©Õ±¥¼‘”€ÈÀÈà¸I•ÛµÍ…±¼…¹Ñ•Ì‘”•¹Ù¥…È¸ˆ°($$$‰×µ„U€ÈÀÈØˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½¹•ÝÌ½Õ¥‘…¹”µ…¹µ±•…°µÑ•áÐµÑ•µÁ½É…Éäµ™±…Ðµ™•”µ±½ÜµÙ…±Õ”µ¥µÁ½ÉÑÌµÝ¡¥ µÝ¥±°µ…ÁÁ±äµÕ¹Ñ¥°´Äµ©Õ±ä´ÈÀÈà´ÈÀÈØ´ÀØ´Àá}•¸ˆ($%t°($%l($$$‰1„Ñ…É¥™„¹¼•Ì•°½ÍÑ”•¹ÑÉ•…‘¼ˆ°($$$‰°ÁÉ•¥¼‘”±„ÉÕÑ„¹¼…É…¹Ñ¥é„%Y°‘•É•¡½Ì°Ñ…Í…Ì‘”ÁÉ•Í•¹Ñ…§Í¸¹¤½ÑÉ½Ì…É½Ì±½…±•Ì¸Y•É¥™¥„%=MLä±…ÌÑ…É¥™…ÌÙ¥•¹Ñ•Ì•¸IÕµ…»µ„¸ˆ°($$$‰A¿"eÑ„I½·‰»ˆ°($$$‰¡ÑÑÁÌè¼½ÝÝÜ¹Á½ÍÑ„µÉ½µ…¹„¹É¼½•¸½„ÄÐàà½¤µÝ…¹ÐµÑ¼µÉ••¥Ù”½ÕÍ•™Õ°µ¥¹™½Éµ…Ñ¥½¸¼½Ù…Ðµ…¹µÕÍÑ½µÌµ±•…É…¹”µµ½‘¥™¥…Ñ¥½¹Ì¹¡Ñµ°ˆ($%t(%t°(%¥Ðèl($%l($$$‰%Y”‘¥¡¥…É…é¥½¹”“Še¥µÁ½ÉÑ…é¥½¹”ˆ°($$$‰QÕÑÑ”±”µ•É¤¡”•¹ÑÉ…¹¼¹•±³ŠeUÉ¥¡¥•‘½¹¼Õ¹„‘¥¡¥…É…é¥½¹”¸A•È%=ML™¥¹¼„€ÄÔÀUH°³Še%YÉ¥ÍÕ±Ñ„Á……Ñ„Í½±¼Í”¤‘…Ñ¤%=MLÙ…±¥‘¤Í½¹¼ÑÉ…Íµ•ÍÍ¤•±•ÑÑÉ½¹¥…µ•¹Ñ”¸ˆ°($$$‰½µµ¥ÍÍ¥½¹”•ÕÉ½Á•„ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½ÕÍÑ½µÌ½ÕÍÑ½µÌµÁÉ½•‘ÕÉ•Ìµ¥µÁ½ÉÐµ…¹µ•áÁ½ÉÐ½ÕÍÑ½µÌµ½Á•É…Ñ¥½¹Ì½ÕÍÑ½µÌµ™½Éµ…±¥Ñ¥•Ìµ±½ÜµÙ…±Õ”µ½¹Í¥¹µ•¹ÑÍ}•¸ˆ($%t°($%l($$$‰…é¥¼Ñ•µÁ½É…¹•¼€ÈÀÈØˆ°($$$‰…°€Ç
è±Õ±¥¼€ÈÀÈØÍ¤…ÁÁ±¥„Õ¸‘…é¥¼Ñ•µÁ½É…¹•¼‘¤€ÌUHÁ•È…ÉÑ¥½±¼…±±”Ù•¹‘¥Ñ”„‘¥ÍÑ…¹é„¥¸½±±¤™¥¹¼„€ÄÔÀUH°™¥¹¼…°€Ç
è±Õ±¥¼€ÈÀÈà¸I¥½¹ÑÉ½±±„ÁÉ¥µ„‘•±±„ÍÁ•‘¥é¥½¹”¸ˆ°($$$‰Õ¥‘„U€ÈÀÈØˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½¹•ÝÌ½Õ¥‘…¹”µ…¹µ±•…°µÑ•áÐµÑ•µÁ½É…Éäµ™±…Ðµ™•”µ±½ÜµÙ…±Õ”µ¥µÁ½ÉÑÌµÝ¡¥ µÝ¥±°µ…ÁÁ±äµÕ¹Ñ¥°´Äµ©Õ±ä´ÈÀÈà´ÈÀÈØ´ÀØ´Àá}•¸ˆ($%t°($%l($$$‰%°ÁÉ•Ù•¹Ñ¥Ù¼¹½¸ƒ ¥°½ÍÑ¼½¹Í•¹…Ñ¼ˆ°($$$‰%°ÁÉ•éé¼‘•±±„±¥¹•„¹½¸…É…¹Ñ¥Í”%Y°‘…é¤°ÍÁ•Í”‘¤ÁÉ•Í•¹Ñ…é¥½¹”¼…±ÑÉ¤½ÍÑ¤±½…±¤¸Y•É¥™¥„%=ML”±”Ñ…É¥™™”½ÉÉ•¹Ñ¤¥¸I½µ…¹¥„¸ˆ°($$$‰A¿"eÑ„I½·‰»ˆ°($$$‰¡ÑÑÁÌè¼½ÝÝÜ¹Á½ÍÑ„µÉ½µ…¹„¹É¼½•¸½„ÄÐàà½¤µÝ…¹ÐµÑ¼µÉ••¥Ù”½ÕÍ•™Õ°µ¥¹™½Éµ…Ñ¥½¸¼½Ù…Ðµ…¹µÕÍÑ½µÌµ±•…É…¹”µµ½‘¥™¥…Ñ¥½¹Ì¹¡Ñµ°ˆ($%t(%t°(%Á°èl($%l($$$‰YP¤éŸ	½Íé•¹¥”¥µÁ½ÉÑ½Ý”ˆ°($$$‰]ÍéåÍÑ­¥”Ñ½Ý…ÉäÝÝ¿ñ½¹”‘¼UÝåµ……«éŸ	½Íé•¹¥„¸±„%=ML‘¼€ÄÔÀUHYPÕé¹…©”Í§dé„é…Ã	…½¹äÑå±­¼Á¼ÁÉ…Ý¥“	½Ýå´•±•­ÑÉ½¹¥é¹å´ÁÉé•­…é…¹¥Ô‘…¹å %=ML¸ˆ°($$$‰-½µ¥Í©„ÕÉ½Á•©Í­„ˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½ÕÍÑ½µÌ½ÕÍÑ½µÌµÁÉ½•‘ÕÉ•Ìµ¥µÁ½ÉÐµ…¹µ•áÁ½ÉÐ½ÕÍÑ½µÌµ½Á•É…Ñ¥½¹Ì½ÕÍÑ½µÌµ™½Éµ…±¥Ñ¥•Ìµ±½ÜµÙ…±Õ”µ½¹Í¥¹µ•¹ÑÍ}•¸ˆ($%t°($%l($$$‰Qåµé…Í½Ý”	¼€ÈÀÈØˆ°($$$‰=€Ä±¥Á„€ÈÀÈØ½‰½Ý§éÕ©”Ñåµé…Í½Ý”	¼€ÌUHé„ÍéÑÕ¯dÜÍÁÉé•‘‡ñä¹„½‘±•Ÿ	¿o‘±„ÁÉé•Íç	•¬‘¼€ÄÔÀUH°‘¼€Ä±¥Á„€ÈÀÈà¸MÁÉ…Ý“èé…Í…‘äÁÉé•ÝåÍç	¯¸ˆ°($$$‰]åÑåé¹”U€ÈÀÈØˆ°($$$‰¡ÑÑÁÌè¼½Ñ…á…Ñ¥½¸µÕÍÑ½µÌ¹•Œ¹•ÕÉ½Á„¹•Ô½¹•ÝÌ½Õ¥‘…¹”µ…¹µ±•…°µÑ•áÐµÑ•µÁ½É…Éäµ™±…Ðµ™•”µ±½ÜµÙ…±Õ”µ¥µÁ½ÉÑÌµÝ¡¥ µÝ¥±°µ…ÁÁ±äµÕ¹Ñ¥°´Äµ©Õ±ä´ÈÀÈà´ÈÀÈØ´ÀØ´Àá}•¸ˆ($%t°($%l($$$‰]å•¹„¹¥”©•ÍÐ­½ÍéÑ•´‘½ÍÑ…Ýäˆ°($$$‰•¹„ÑÉ…Íä¹¥”Ý…É…¹ÑÕ©”YP°	„°½Ã	…ÐÁÉ•é•¹Ñ…å©¹å …¹¤¥¹¹å ­½ÍéÓÍÜ±½­…±¹å ¸MÁÉ…Ý“è%=ML¤…­ÑÕ…±¹”Ñ…Éå™äÜIÕµÕ¹¥¤¸ˆ°($$$‰A¿"eÑ„I½·‰»ˆ°($$$‰¡ÑÑÁÌè¼½ÝÝÜ¹Á½ÍÑ„µÉ½µ…¹„¹É¼½•¸½„ÄÐàà½¤µÝ…¹ÐµÑ¼µÉ••¥Ù”½ÕÍ•™Õ°µ¥¹™½Éµ…Ñ¥½¸¼½Ù…Ðµ…¹µÕÍÑ½µÌµ±•…É…¹”µµ½‘¥™¥…Ñ¥½¹Ì¹¡Ñµ°ˆ($%t(%t)ôì)Ù…ÈÍ±ÕÌ€ôl($‰ÁÉ½‘ÕÑÌˆ°($‰…Ñ•½É¥•Ìˆ°($‰ÅŒµÕ¥‘”ˆ°($‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆ°($‰…ÉÑ¥±•Ìˆ°($‰™…Äˆ)tì)Ù…È¡É•˜€ô€¡±½…±”°Á…Ñ €ô€ˆˆ¤€ôø€‘í±½…±”€ôôô€‰É¼ˆ€ü€ˆˆ€è€¼‘í±½…±•õô‘íÁ…Ñ €ü€¼‘íÁ…Ñ¡õ€€è±½…±”€ôôô€‰É¼ˆ€ü€ˆ¼ˆ€è€ˆ‰õ€ì)™Õ¹Ñ¥½¸!•…‘•È¡ì±½…±”°Á…Ñ ô¤ì(%½¹ÍÐÐ€ô±½…±•½Áåm±½…±•t°ÍÕ™™¥à€ôÁ…Ñ ¹©½¥¸ ˆ¼ˆ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¡•…‘•Èˆ°ì($%±…ÍÍ9…µ”è€‰Í¥Ñ”µ¹…Ø¹…ØµŒÑ•Éµ¥¹…°µ¡•…‘•Èˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µ‰É…¹ˆ°($$$%¡É•˜è¡É•˜¡±½…±”¤°($$$$‰…É¥„µ±…‰•°ˆè€‰±±¡¥¹…	Õä™¥¹‘Ì¡½µ”ˆ°($$$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥µœˆ°ì($$$$%ÍÉŒè€ˆ½…±±¡¥¹…‰Õä¹Á¹œˆ°($$$$%…±Ðè€‰±±¡¥¹…	Õäˆ°($$$$%Ý¥‘Ñ è€ˆÄÜÄàˆ°($$$$%¡•¥¡Ðè€ˆÈÔÌˆ($$$%ô¤($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¹…Øˆ°ì($$$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µ¹…Øˆ°($$$%¡¥±‘É•¸èÍ±ÕÌ¹µ…À ¡Í±Õœ°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$%±…ÍÍ9…µ”èÁ…Ñ¡lÁt€ôôôÍ±Õœ€ü€‰…Ñ¥Ù”ˆ€è€ˆˆ°($$$$%¡É•˜è¡É•˜¡±½…±”°Í±Õœ¤°($$$$%¡¥±‘É•¸èÐ¹±…‰•±Ím¥t($$$%ô°Í±Õœ¤¤($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µ…Ñ¥½¹Ìˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘•Ñ…¥±Ìˆ°ì($$$$$%±…ÍÍ9…µ”è€‰±…¹œµµ•¹Ôˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÕµµ…Éäˆ°ì¡¥±‘É•¸èm±½…±”¹Ñ½UÁÁ•É…Í” ¤°€‹Š2‰tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì¡¥±‘É•¸è±½…±•ÌÄ¹µ…À ¡°¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$$%±…ÍÍ9…µ”è°€ôôô±½…±”€ü€‰…Ñ¥Ù”ˆ€è€ˆˆ°($$$$$$%¡É•˜è¡É•˜¡°°ÍÕ™™¥à¤°($$$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è°¹Ñ½UÁÁ•É…Í” ¤ô¤°±½…±•½Áåm±t¹¹…µ•t($$$$$%ô°°¤¤ô¥t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µÑ„ˆ°($$$$$%¡É•˜è€‰¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´½±±AÉ½‘ÕÑÌ¼ýÕÑµ}Í½ÕÉ”õ…±±¡¥¹…‰Õä¹É¼™ÕÑµ}µ•‘¥Õ´õÉ•™•ÉÉ…°™ÕÑµ}…µÁ…¥¸õÉ½}¡•…‘•Èˆ°($$$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$$%É•°è€‰¹½½Á•¹•È¹½É•™•ÉÉ•ÈÍÁ½¹Í½É•ˆ°($$$$$%¡¥±‘É•¸èmÐ¹Õ¥lÁt°€ˆƒŠ\‰t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘•Ñ…¥±Ìˆ°ì($$$$$%±…ÍÍ9…µ”è€‰µ½‰¥±”µµ•¹Ôˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÕµµ…Éäˆ°ì¡¥±‘É•¸èÐ¹Õ¥lÅtô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl($$$$$$%Í±ÕÌ¹µ…À ¡Í±Õœ°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$$%¡É•˜è¡É•˜¡±½…±”°Í±Õœ¤°($$$$$$$%¡¥±‘É•¸èÐ¹±…‰•±Ím¥t($$$$$$%ô°Í±Õœ¤¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÐ¹Õ¥lÉtô¤°($$$$$$%±½…±•ÌÄ¹µ…À ¡°¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$$%¡É•˜è¡É•˜¡°°ÍÕ™™¥à¤°($$$$$$$%¡¥±‘É•¸è±½…±•½Áåm±t¹¹…µ”($$$$$$%ô°°¤¤($$$$$%tô¥t($$$$%ô¤($$$%t($$%ô¤($%t(%ô¤ì)ô)™Õ¹Ñ¥½¸M¥Ñ•½½Ñ•È¡ì±½…±”ô¤ì(%½¹ÍÐÐ€ô±½…±•½Áåm±½…±•tì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰™½½Ñ•Èˆ°ì($%±…ÍÍ9…µ”è€‰Í¥Ñ”µ™½½Ñ•È™½½Ñ•ÈµŒÑ•Éµ¥¹…°µ™½½Ñ•Èˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µ™½½Ñ•Èµ±½¼ˆ°($$$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥µœˆ°ì($$$$%ÍÉŒè€ˆ½…±±¡¥¹…‰Õä¹Á¹œˆ°($$$$%…±Ðè€‰±±¡¥¹…	Õäˆ°($$$$%Ý¥‘Ñ è€ˆÄÜÄàˆ°($$$$%¡•¥¡Ðè€ˆÈÔÌˆ($$$%ô¤($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Àˆ°ì¡¥±‘É•¸èl($$$%Ð¹Á…•Ì¹ÁÉ½‘ÕÑÍlÅt°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÍ¥Ñ•Q•áÑm±½…±•t¹¥¹‘•Á•¹‘•¹Ðô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$%±…ÍÍ9…µ”è€‰™½½Ñ•ÈµÑÉÕÍÐµ±¥¹­Ìˆ°($$$$%¡¥±‘É•¸èl($$$$$%l‰5•Ñ¡½‘½±½äˆ°€ˆ½µ•Ñ¡½‘½±½ä‰t°($$$$$%l‰‰½ÕÐˆ°€ˆ½…‰½ÕÐ‰t°($$$$$%l‰½¹Ñ…Ðˆ°€ˆ½½¹Ñ…Ð‰t°($$$$$%l‰AÉ¥Ù…äˆ°€ˆ½ÁÉ¥Ù…ä‰t°($$$$$%l‰Q•ÉµÌˆ°€ˆ½Ñ•ÉµÌ‰t°($$$$$%l‰™™¥±¥…Ñ”‘¥Í±½ÍÕÉ”ˆ°€ˆ½…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”‰t($$$$%t¹µ…À ¡m±…‰•°°ÕÉ±t¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$%¡É•˜èÕÉ°°($$$$$%¡¥±‘É•¸è±…‰•°($$$$%ô°ÕÉ°¤¤($$$%ô¤($$%tô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰…±±¡¥¹…‰Õä¹É¼ƒ
Ü€ÈÀÈØˆô¤($%t(%ô¤ì)ô)™Õ¹Ñ¥½¸!½µ”Ä¡ì±½…±”ô¤ì(%½¹ÍÐÐ€ô±½…±•½Áåm±½…±•tì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èl($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$%±…ÍÍ9…µ”è€‰¡•É¼µŒˆ°($$%¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µÁ…Ñ ˆ°($$$$%¡¥±‘É•¸è€ˆ¼%M=YH€¼11}AI=UQLˆ($$$%ô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰¡•É¼µŒµÉ¥ˆ°($$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰µ½¹¼µ±…‰•°ˆ°($$$$$$%¡¥±‘É•¸èÐ¹¡•É½lÁt($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Äˆ°ì¡¥±‘É•¸èÐ¹¡•É½lÅt¹É•Á±…” ˆ¸€ˆ°€ˆ¹q¸ˆ¤¹ÍÁ±¥Ð ‰q¸ˆ¤¹µ…À ¡à°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èmà°¤€ôôô€À€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¥tô°à¤¤ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÐ¹¡•É½lÉtô¤($$$$%tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰ÍåÍÑ•´µÁ…¹•°ˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÐ¹Õ¥lÑtô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÑÉ½¹œˆ°ì¡¥±‘É•¸èÁÉ½‘ÕÑÌ¹±•¹Ñ ô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Íµ…±°ˆ°ì¡¥±‘É•¸èÍ¥Ñ•Q•áÑm±½…±•t¹É•½É‘Ìô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¡Èˆ°íô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl($$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°ì¡¥±‘É•¸è€ˆà¼àˆô¤°($$$$$$$$ˆƒ
Ü€ˆ°($$$$$$$%Í¥Ñ•Q•áÑm±½…±•t¹¡•­•($$$$$$%tô¤($$$$$%t($$$$%ô¥t($$$%ô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M•…É¡	…È°ì($$$$%±…‰•°èÐ¹Õ¥lÄát°($$$$%‰ÕÑÑ½¹1…‰•°èÍ¥Ñ•Q•áÑm±½…±•t¹Í•…É ($$$%ô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰ÅÕ¥¬µÅÕ•É¥•Ìˆ°($$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èmÐ¹Õ¥lÍt°€ˆè‰tô¤°…Ñ•½É¥•Ì¹Í±¥” À°€Ô¤¹µ…À ¡l°€°ÕÉ±t°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%¡É•˜èÕÉ°°($$$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$$%É•°è€‰¹½½Á•¹•Èˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$‰lˆ°($$$$$$%Ð¹…ÑÍm¥t¹Ñ½UÁÁ•É…Í” ¤°($$$$$$$‰tˆ($$$$$%t($$$$%ô°ÕÉ°¤¥t($$$%ô¤($$%t($%ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µ‰½‘äˆ°($$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰…Í¥‘”ˆ°ì($$$%±…ÍÍ9…µ”è€‰™¥±Ñ•ÈµÁ…¹•°ˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰™¥±Ñ•ÈµÑ¥Ñ±”ˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÐ¹Õ¥lÙtô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸èÐ¹Õ¥lÝtô¥t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰±…‰•°ˆ°ì¡¥±‘É•¸èÐ¹Õ¥látô¤°($$$$%…Ñ•½É¥•Ì¹µ…À ¡l°€°ÕÉ±t°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%¡É•˜èÕÉ°°($$$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$$%É•°è€‰¹½½Á•¹•Èˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°ì±…ÍÍ9…µ”è¤€ôôô€À€ü€‰¡•­•ˆ€è€ˆˆô¤°($$$$$$%Ð¹…ÑÍm¥t°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÍ¥Ñ•Q•áÑm±½…±•t¹½Á•¸ô¤($$$$$%t($$$$%ô°ÕÉ°¤¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰±…‰•°ˆ°ì¡¥±‘É•¸èÐ¹Õ¥låtô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰ÁÉ¥”µÉ…¹”ˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆÀˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆàÀ¬ˆô¥t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰É…¹”µ±¥¹”ˆ°($$$$$%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°íô¤($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰±…‰•°ˆ°ì¡¥±‘É•¸èÐ¹Õ¥lÄÁtô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%¡É•˜è€ˆÉ•ÍÕ±ÑÌˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°ì±…ÍÍ9…µ”è€‰¡•­•ˆô¤°($$$$$$%Ð¹Õ¥lÄÅt°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÁÉ½‘ÕÑÌ¹±•¹Ñ ô¤($$$$$%t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%¡É•˜è€ˆÉ•ÍÕ±ÑÌˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°íô¤°($$$$$$%Ð¹Õ¥lÄÉt°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÁÉ½‘ÕÑÌ¹±•¹Ñ ô¤($$$$$%t($$$$%ô¤($$$%t($$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰É•ÍÕ±ÑÌµÁ…¹•°ˆ°($$$%¥è€‰É•ÍÕ±ÑÌˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰É•ÍÕ±ÑÌµ¡•…ˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰IMU1Q}MPˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ˆˆ°ì¡¥±‘É•¸èl($$$$$$%ÁÉ½‘ÕÑÌ¹±•¹Ñ °($$$$$$$ˆ€ˆ°($$$$$$%Ð¹Õ¥lÄÍt($$$$$%tô¥tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‰ÕÑÑ½¸ˆ°ì¡¥±‘É•¸èmÐ¹Õ¥lÄÑt°€ˆƒŠL‰tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰ÕÑÑ½¸ˆ°ì¡¥±‘É•¸è€‰I%ƒŠZ˜ˆô¥tô¥t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÑÌµŒˆ°($$$$$%¡¥±‘É•¸èÁÉ½‘ÕÑÌ¹µ…À ¡À°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡AÉ½‘ÕÑ…É°ì($$$$$$%µ½‘”è€‰Œˆ°($$$$$$%ÁÉ½‘ÕÐèÀ°($$$$$$%¥¹‘•àè¤°($$$$$$%ÍÑ…ÑÕÍ1…‰•°èÐ¹Õ¥lÄÅt($$$$$%ô°À¹¡É•˜¤¤($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µµ½É”ˆ°($$$$$%¡É•˜è¡É•˜¡±½…±”°€‰ÁÉ½‘ÕÑÌˆ¤°($$$$$%¡¥±‘É•¸èmÐ¹Õ¥lÁt°€ˆƒŠH‰t($$$$%ô¤($$$%t($$%ô¥t($%ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$%±…ÍÍ9…µ”è€‰‘…Ñ„µÁÉ½µ¥Í”ˆ°($$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èÐ¹Õ¥lÄÕtô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èµ•Ñ¡½‘½±½å½Áåm±½…±•t¹µ…À ¡m„°‰t°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰…ÉÑ¥±”ˆ°ì¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ˆˆ°ì¡¥±‘É•¸èlˆÀˆ°¤€¬€Åtô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸è„ô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èˆô¤($$%tô°„¤¤ô¥t($%ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡!½µ•ÉÑ¥±•Ì°ì±½…±”ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡!½µ•…Ä°ì±½…±”ô¤(%tô¤ì)ô)™Õ¹Ñ¥½¸!½µ•ÉÑ¥±•Ì¡ì±½…±”ô¤ì(%½¹ÍÐÐ€ô±½…±•½Áåm±½…±•tì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($%±…ÍÍ9…µ”è€‰¡½µ”µ±¥‰É…Éäˆ°($%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$%±…ÍÍ9…µ”è€‰¡½µ”µµ½‘Õ±”µ¡•…ˆ°($$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆ¼M=}IQ%1Lˆô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸èÐ¹Á…•Ì¹…ÉÑ¥±•ÍlÁtô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÐ¹Á…•Ì¹…ÉÑ¥±•ÍlÅtô¤($$%tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$%¡É•˜è¡É•˜¡±½…±”°€‰…ÉÑ¥±•Ìˆ¤°($$$%¡¥±‘É•¸èmÐ¹±…‰•±ÍlÑt°€ˆƒŠH‰t($$%ô¥t($%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$%±…ÍÍ9…µ”è€‰…ÉÑ¥±”µÉ¥¡½µ”µ…ÉÑ¥±”µÉ¥ˆ°($$%¡¥±‘É•¸èÐ¹…ÉÑ¥±•Ì¹µ…À ¡mÑ¥Ñ±”°Í±Õœ°ÍÕµµ…Éåt°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$%¡É•˜è¡É•˜¡±½…±”°…ÉÑ¥±•Ì¼‘íÍ±Õõ€¤°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl($$$$$$ˆÀˆ°($$$$$%¤€¬€Ä°($$$$$$ˆƒ
Ü%19=Qˆ($$$$%tô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸èÑ¥Ñ±”ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÍÕµµ…Éäô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ˆˆ°ì¡¥±‘É•¸èmÐ¹Õ¥lÄÙt°€ˆƒŠH‰tô¤($$$%t($$%ô°Í±Õœ¤¤($%ô¥t(%ô¤ì)ô)™Õ¹Ñ¥½¸!½µ•…Ä¡ì±½…±”ô¤ì(%½¹ÍÐÐ€ô±½…±•½Áåm±½…±•tì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($%±…ÍÍ9…µ”è€‰¡½µ”µ±¥‰É…Éä¡½µ”µ™…ÄµÍ•Ñ¥½¸ˆ°($%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$%±…ÍÍ9…µ”è€‰¡½µ”µµ½‘Õ±”µ¡•…ˆ°($$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆ¼E}%9`ˆô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸èÐ¹Á…•Ì¹™…ÅlÁtô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÐ¹Á…•Ì¹™…ÅlÅtô¤($$%tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$%¡É•˜è¡É•˜¡±½…±”°€‰™…Äˆ¤°($$$%¡¥±‘É•¸èmÐ¹±…‰•±ÍlÕt°€ˆƒŠH‰t($$%ô¥t($%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$%±…ÍÍ9…µ”è€‰¡½µ”µ™…ÄµÉ¥ˆ°($$%¡¥±‘É•¸èÐ¹™…Ä¹Í±¥” À°€Ð¤¹µ…À ¡mÄ°…t°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$%¡É•˜è¡É•˜¡±½…±”°€‰™…Äˆ¤°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èMÑÉ¥¹œ¡¤€¬€Ä¤¹Á…‘MÑ…ÉÐ È°€ˆÀˆ¤ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Ìˆ°ì¡¥±‘É•¸èÄô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è„ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰DƒŠHˆô¤($$$%t($$%ô°Ä¤¤($%ô¥t(%ô¤ì)ô)™Õ¹Ñ¥½¸A…•!•É¼¡ìÐ°Í•Ñ¥½¸ô¤ì(%½¹ÍÐÀ€ôÐ¹Á…•ÍmÍ•Ñ¥½¹tñðÐ¹Á…•Ì¹…ÉÑ¥±•Ìì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µÁ…”µ¡•É¼ˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èlˆ¼€ˆ°Í•Ñ¥½¸¹Ñ½UÁÁ•É…Í” ¤¹É•Á±…•±° ˆ´ˆ°€‰|ˆ¥tô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Äˆ°ì¡¥±‘É•¸èÁlÁtô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÁlÅtô¤($%t(%ô¤ì)ô)™Õ¹Ñ¥½¸ÉÑ¥±”¡ì±½…±”°Í±Õœô¤ì(%½¹ÍÐÐ€ô±½…±•½Áåm±½…±•t°±½…±¥é•€ôÐ¹…ÉÑ¥±•Ì¹™¥¹ ¡à¤€ôøálÅt€ôôôÍ±Õœ¤ñðÐ¹…ÉÑ¥±•ÍlÁt°…ÉÑ¥±”€ô•Ñ¹±¥Í¡ÉÑ¥±”¡Í±Õœ¤ì(%½¹ÍÐ…ÉÑ¥±•M¡•µ„€ôì($$‰½¹Ñ•áÐˆè€‰¡ÑÑÁÌè¼½Í¡•µ„¹½Éœˆ°($$‰ÑåÁ”ˆè€‰ÉÑ¥±”ˆ°($%¡•…‘±¥¹”è±½…±”€ôôô€‰•¸ˆ€ü…ÉÑ¥±”¹Ñ¥Ñ±”€è±½…±¥é•‘lÁt°($%‘•ÍÉ¥ÁÑ¥½¸è±½…±”€ôôô€‰•¸ˆ€ü…ÉÑ¥±”¹‘•ÍÉ¥ÁÑ¥½¸€è±½…±¥é•‘lÉt°($%‘…Ñ•5½‘¥™¥•è€ˆÈÀÈØ´Àà´ÄÈˆ°($%‘…Ñ•AÕ‰±¥Í¡•è€ˆÈÀÈØ´Àà´ÄÈˆ°($%¥¹1…¹Õ…”è±½…±”°($%µ…¥¹¹Ñ¥Ñå=™A…”è¡ÑÑÁÌè¼½…±±¡¥¹…‰Õä¹É¼‘í¡É•˜¡±½…±”°…ÉÑ¥±•Ì¼‘íÍ±Õõ€¥õ€°($%…ÕÑ¡½Èèì($$$‰ÑåÁ”ˆè€‰=É…¹¥é…Ñ¥½¸ˆ°($$%¹…µ”è€‰…±±¡¥¹…‰Õä¹É¼‘¥Ñ½É¥…°I•Í•…É ˆ($%ô(%ôì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èl($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÉ¥ÁÐˆ°ì($$%ÑåÁ”è€‰…ÁÁ±¥…Ñ¥½¸½±­©Í½¸ˆ°($$%‘…¹•É½ÕÍ±åM•Ñ%¹¹•É!Q50èì}}¡Ñµ°è)M=8¹ÍÑÉ¥¹¥™ä¡…ÉÑ¥±•M¡•µ„¤ô($%ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$%±…ÍÍ9…µ”è€‰…ÉÑ¥±”µ¡•É¼ˆ°($$%¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$%¡É•˜è¡É•˜¡±½…±”°€‰…ÉÑ¥±•Ìˆ¤°($$$$%¡¥±‘É•¸èl‹Š@€ˆ°Ð¹±…‰•±ÍlÑut($$$%ô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl($$$$$‰%19=Qƒ
Ü€ˆ°($$$$%…ÉÑ¥±”¹ÕÁ‘…Ñ•¹Ñ½UÁÁ•É…Í” ¤°($$$$$ˆƒ
Üˆ°($$$$$ˆ€ˆ°($$$$%…ÉÑ¥±”¹É•…‘Q¥µ”¹Ñ½UÁÁ•É…Í” ¤($$$%tô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Äˆ°ì¡¥±‘É•¸è±½…±”€ôôô€‰•¸ˆ€ü…ÉÑ¥±”¹Ñ¥Ñ±”€è±½…±¥é•‘lÁtô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è±½…±”€ôôô€‰•¸ˆ€ü…ÉÑ¥±”¹‘•ÍÉ¥ÁÑ¥½¸€è±½…±¥é•‘lÉtô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰…ÉÑ¥±”µ­•åÝ½É‘Ìˆ°($$$$%¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰AI%5Id-e]=Iˆô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è…ÉÑ¥±”¹ÁÉ¥µ…Éå-•åÝ½Éô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰MUAA=IQ%9ˆô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è…ÉÑ¥±”¹Í•½¹‘…Éå-•åÝ½É‘Ì¹©½¥¸ ˆƒ
Ü€ˆ¤ô¤($$$$%t($$$%ô¤($$%t($%ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰…ÉÑ¥±”ˆ°ì($$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µ…ÉÑ¥±”ˆ°($$%¡¥±‘É•¸èl($$$%…ÉÑ¥±”¹¥¹ÑÉ¼¹µ…À ¡Á…É…É…Á °¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì($$$$%±…ÍÍ9…µ”è¤€ôôô€À€ü€‰…ÉÑ¥±”µ¥¹ÑÉ¼ˆ€è€‰…ÉÑ¥±”µ±•‘”ˆ°($$$$%¡¥±‘É•¸èÁ…É…É…Á ($$$%ô°Á…É…É…Á ¤¤°($$$%…ÉÑ¥±”¹Í•Ñ¥½¹Ì¹µ…À ¡Í•Ñ¥½¸°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èMÑÉ¥¹œ¡¤€¬€Ä¤¹Á…‘MÑ…ÉÐ È°€ˆÀˆ¤ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸èÍ•Ñ¥½¸¹¡•…‘¥¹œô¤°($$$$%Í•Ñ¥½¸¹Á…É…É…Á¡Ì¹µ…À ¡Á…É…É…Á ¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÁ…É…É…Á ô°Á…É…É…Á ¤¤°($$$$%Í•Ñ¥½¸¹¡•­±¥ÍÐ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Õ°ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰…ÉÑ¥±”µ¡•­±¥ÍÐˆ°($$$$$%¡¥±‘É•¸èÍ•Ñ¥½¸¹¡•­±¥ÍÐ¹µ…À ¡¥Ñ•´¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰±¤ˆ°ì¡¥±‘É•¸è¥Ñ•´ô°¥Ñ•´¤¤($$$$%ô¤($$$%tô¥tô°Í•Ñ¥½¸¹¡•…‘¥¹œ¤¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰…ÉÑ¥±”µ…±±½ÕÐˆ°($$$$%¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰IMI 9=Qˆô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è…ÉÑ¥±”¹Í½ÕÉ•9½Ñ”ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Àˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰Í½ÕÉ”µ±¥¹­Ìˆ°($$$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰±±¡¥¹…	Õä™É•¥¡Ð…±Õ±…Ñ½Èƒ
Ü¡•­•€ÄÈÕœ€ÈÀÈØˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰=™™¥¥…°…ÁÀ‘•ÍÉ¥ÁÑ¥½¸ƒ
Ü¡•­•€ÄÈÕœ€ÈÀÈØˆô¥t($$$$$%ô¤($$$$%t($$$%ô¤($$%t($%ô¤(%tô¤ì)ô)™Õ¹Ñ¥½¸M•Ñ¥½¸¡ì±½…±”°Á…Ñ ô¤ì(%½¹ÍÐÐ€ô±½…±•½Áåm±½…±•t°Í•Ñ¥½¸€ôÁ…Ñ¡lÁtñð€‰ÁÉ½‘ÕÑÌˆì(%¥˜€¡Í•Ñ¥½¸€ôôô€‰…ÉÑ¥±•Ìˆ€˜˜Á…Ñ¡lÅt¤É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡ÉÑ¥±”°ì($%±½…±”°($%Í±ÕœèÁ…Ñ¡lÅt(%ô¤ì(%½¹ÍÐ™…ÅM¡•µ„€ôÍ•Ñ¥½¸€ôôô€‰™…Äˆ€üì($$‰½¹Ñ•áÐˆè€‰¡ÑÑÁÌè¼½Í¡•µ„¹½Éœˆ°($$‰ÑåÁ”ˆè€‰EA…”ˆ°($%µ…¥¹¹Ñ¥ÑäèÐ¹™…Ä¹µ…À ¡mÄ°…t¤€ôø€¡ì($$$‰ÑåÁ”ˆè€‰EÕ•ÍÑ¥½¸ˆ°($$%¹…µ”èÄ°($$%…•ÁÑ•‘¹ÍÝ•Èèì($$$$‰ÑåÁ”ˆè€‰¹ÍÝ•Èˆ°($$$%Ñ•áÐè„($$%ô($%ô¤¤(%ô€è¹Õ±°ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èl($%™…ÅM¡•µ„€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÉ¥ÁÐˆ°ì($$%ÑåÁ”è€‰…ÁÁ±¥…Ñ¥½¸½±­©Í½¸ˆ°($$%‘…¹•É½ÕÍ±åM•Ñ%¹¹•É!Q50èì}}¡Ñµ°è)M=8¹ÍÑÉ¥¹¥™ä¡™…ÅM¡•µ„¤ô($%ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡A…•!•É¼°ì($$%Ð°($$%Í•Ñ¥½¸($%ô¤°($$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µÁ…”µ½¹Ñ•¹Ðˆ°($$%¡¥±‘É•¸èl($$$%Í•Ñ¥½¸€ôôô€‰ÁÉ½‘ÕÑÌˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰Á…”µÑ½½±‰…Èˆ°($$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl($$$$$%ÁÉ½‘ÕÑÌ¹±•¹Ñ °($$$$$$ˆ€ˆ°($$$$$%Ð¹Õ¥lÄÍt°($$$$$$ˆƒ
Ü€ˆ°($$$$$%Í¥Ñ•Q•áÑm±½…±•t¹¡•­•($$$$%tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M•…É¡	…È°ì($$$$$%±…‰•°èÐ¹Õ¥lÄát°($$$$$%‰ÕÑÑ½¹1…‰•°èÍ¥Ñ•Q•áÑm±½…±•t¹Í•…É ($$$$%ô¥t($$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÑÌµŒÁ…”µÁÉ½‘ÕÑÌˆ°($$$$%¡¥±‘É•¸èÁÉ½‘ÕÑÌ¹µ…À ¡À°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡AÉ½‘ÕÑ…É°ì($$$$$%µ½‘”è€‰Œˆ°($$$$$%ÁÉ½‘ÕÐèÀ°($$$$$%¥¹‘•àè¤°($$$$$%ÍÑ…ÑÕÍ1…‰•°èÐ¹Õ¥lÄÅt($$$$%ô°À¹¡É•˜¤¤($$$%ô¥tô¤°($$$%Í•Ñ¥½¸€ôôô€‰…Ñ•½É¥•Ìˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰…Ñ•½ÉäµÑ•Éµ¥¹…°µÉ¥ˆ°($$$$%¡¥±‘É•¸è…Ñ•½É¥•Ì¹µ…À ¡l°€°ÕÉ±t°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%¡É•˜èÕÉ°°($$$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$$%É•°è€‰¹½½Á•¹•Èˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èlˆÀˆ°¤€¬€Åtô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸èÐ¹…ÑÍm¥tô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Íµ…±°ˆ°ì¡¥±‘É•¸èÍ¥Ñ•Q•áÑm±½…±•t¹½Á•¸ô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¤ˆ°ì¡¥±‘É•¸èmÐ¹Õ¥lÄÝt°€ˆƒŠ\‰tô¤($$$$$%t($$$$%ô°ÕÉ°¤¤($$$%ô¤°($$$%Í•Ñ¥½¸€ôôô€‰ÅŒµÕ¥‘”ˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡MÑ•ÁÌ°ì¥Ñ•µÌèÐ¹ÅŒô¤°($$$$ˆ€ˆ°($$$%Í•Ñ¥½¸€ôôô€‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤¡¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡MÑ•ÁÌ°ì¥Ñ•µÌèÐ¹Í¡¥ÁÁ¥¹œô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡I•¥½¹…±Õ¥‘…¹”°ì±½…±”ô¥tô¤°($$$$ˆ€ˆ°($$$%Í•Ñ¥½¸€ôôô€‰…ÉÑ¥±•Ìˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰…ÉÑ¥±”µÉ¥ˆ°($$$$%¡¥±‘É•¸èÐ¹…ÉÑ¥±•Ì¹µ…À ¡mÑ¥Ñ±”°Í±Õœ°ÍÕµµ…Éåt°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%¡É•˜è¡É•˜¡±½…±”°…ÉÑ¥±•Ì¼‘íÍ±Õõ€¤°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl($$$$$$$$ˆÀˆ°($$$$$$$%¤€¬€Ä°($$$$$$$$ˆƒ
Ü%19=Qˆ($$$$$$%tô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸èÑ¥Ñ±”ô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÍÕµµ…Éäô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ˆˆ°ì¡¥±‘É•¸èmÐ¹Õ¥lÄÙt°€ˆƒŠH‰tô¤($$$$$%t($$$$%ô°Í±Õœ¤¤($$$%ô¤°($$$%Í•Ñ¥½¸€ôôô€‰™…Äˆ€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰™…ÄµÑ•Éµ¥¹…°ˆ°($$$$%¡¥±‘É•¸èÐ¹™…Ä¹µ…À ¡mÄ°…t°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘•Ñ…¥±Ìˆ°ì($$$$$%½Á•¸è¤€ôôô€À°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÕµµ…Éäˆ°ì¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èMÑÉ¥¹œ¡¤€¬€Ä¤¹Á…‘MÑ…ÉÐ È°€ˆÀˆ¤ô¤°($$$$$$%Ä°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€ˆ¬ˆô¤($$$$$%tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è„ô¥t($$$$%ô°Ä¤¤($$$%ô¤($$%t($%ô¤(%tô¤ì)ô)™Õ¹Ñ¥½¸MÑ•ÁÌ¡ì¥Ñ•µÌô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($%±…ÍÍ9…µ”è€‰Ñ•Éµ¥¹…°µÍÑ•ÁÌˆ°($%¡¥±‘É•¸è¥Ñ•µÌ¹µ…À ¡m °Át°¤¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰…ÉÑ¥±”ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èlˆÀˆ°¤€¬€Åtô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸è ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÀô¥tô¥tô° ¤¤(%ô¤ì)ô)™Õ¹Ñ¥½¸I•¥½¹…±Õ¥‘…¹”¡ì±½…±”ô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($%±…ÍÍ9…µ”è€‰É•¥½¹…°µÕ¥‘…¹”ˆ°($$‰…É¥„µ±…‰•°ˆè€‰I½µ…¹¥„¥µÁ½ÉÐÕ¥‘…¹”ˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆ¼I=59%}%5A=IQ}9=QLˆô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èÉ½µ…¹¥…Õ¥‘…¹•m±½…±•t¹µ…À ¡m¡•…‘¥¹œ°Ñ•áÐ°Í½ÕÉ”°ÕÉ±t°¥¹‘•à¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰…ÉÑ¥±”ˆ°ì¡¥±‘É•¸èl($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ˆˆ°ì¡¥±‘É•¸èlˆÀˆ°¥¹‘•à€¬€Åtô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸è¡•…‘¥¹œô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÑ•áÐô¤°($$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$%¡É•˜èÕÉ°°($$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$%É•°è€‰¹½½Á•¹•È¹½É•™•ÉÉ•Èˆ°($$$$%¡¥±‘É•¸èmÍ½ÕÉ”°€ˆƒŠ\‰t($$$%ô¤($$%tô°¡•…‘¥¹œ¤¤ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì($$$%±…ÍÍ9…µ”è€‰É•¥½¹…°µ¹½Ñ”ˆ°($$$%¡¥±‘É•¸è€‰¡•­•€ÄÈÕÕÍÐ€ÈÀÈØƒ
ÜIÕ±•Ì°É…Ñ•Ì°É½ÕÑ”…Ù…¥±…‰¥±¥Ñä…¹½Á•É…Ñ½È™••Ì…¸¡…¹”¸½¹™¥É´ÕÉÉ•¹Ð½™™¥¥…°¥¹™½Éµ…Ñ¥½¸‰•™½É”Á…É•°ÍÕ‰µ¥ÍÍ¥½¸¸ˆ($$%ô¤($%t(%ô¤ì)ô)™Õ¹Ñ¥½¸Q•Éµ¥¹…±A…”¡ì±½…±”€ô€‰É¼ˆ°Á…Ñ €ômt°Í¡½ÝMÝ¥Ñ¡•È€ô™…±Í”ô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰µ…¥¸ˆ°ì($%±…ÍÍ9…µ”è€‰Í¥Ñ”½¹•ÁÐµŒˆ°($%±…¹œè±½…±”°($%¡¥±‘É•¸èl($$%Í¡½ÝMÝ¥Ñ¡•È€˜˜€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡½¹•ÁÑMÝ¥Ñ¡•È°ì…Ñ¥Ù”è€‰ˆô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡!•…‘•È°ì($$$%±½…±”°($$$%Á…Ñ ($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$%±…ÍÍ9…µ”è€‰¥¹‘•Á•¹‘•¹ÐµÍÑÉ¥Àˆ°($$$%¡¥±‘É•¸èÍ¥Ñ•Q•áÑm±½…±•t¹¥¹‘•Á•¹‘•¹Ð($$%ô¤°($$%Á…Ñ ¹±•¹Ñ €ü€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M•Ñ¥½¸°ì($$$%±½…±”°($$$%Á…Ñ ($$%ô¤€è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡!½µ”Ä°ì±½…±”ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M¥Ñ•½½Ñ•È°ì±½…±”ô¤($%t(%ô¤ì)ô)Ù…È•Ñ1½…±•½Áä€ô€¡±½…±”¤€ôø±½…±•½Áåm±½…±•tì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÄÄ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì‘•™…Õ±Ðè€ ¤€ôø!½µ”ô¤ì)™Õ¹Ñ¥½¸!½µ” ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Q•Éµ¥¹…±A…”°ì±½…±”è€‰É¼ˆô¤ì)ô)Ù…ÈI•Í½ÕÉ•Ì€ô€ ¡I•…Ð°‘•ÁÌ°I•µ½Ù•ÕÁ±¥…Ñ•M•ÉÙ•ÉÍÌ°ÁÉ••‘•¹”¤€ôøì(%É•ÑÕÉ¸™Õ¹Ñ¥½¸I•Í½ÕÉ•Ì ¤ì($%É•ÑÕÉ¸I•…Ð¹É•…Ñ•±•µ•¹Ð¡I•…Ð¹É…µ•¹Ð°¹Õ±°°l¸¸¹‘•ÁÌ¹ÍÌ¹µ…À ¡¡É•˜¤€ôøI•…Ð¹É•…Ñ•±•µ•¹Ð ‰±¥¹¬ˆ°ì($$%­•äè€‰ÍÌèˆ€¬¡É•˜°($$%É•°è€‰ÍÑå±•Í¡••Ðˆ°($$$¸¸¹ÁÉ••‘•¹”€üìÁÉ••‘•¹”ô€èíô°($$%¡É•˜°($$$‰‘…Ñ„µÉÍŒµÍÌµ¡É•˜ˆè¡É•˜($%ô¤¤°I•µ½Ù•ÕÁ±¥…Ñ•M•ÉÙ•ÉÍÌ€˜˜I•…Ð¹É•…Ñ•±•µ•¹Ð¡I•µ½Ù•ÕÁ±¥…Ñ•M•ÉÙ•ÉÍÌ°ì­•äè€‰É•µ½Ù”µ‘ÕÁ±¥…Ñ”µÍÌˆô¥t¤ì(%ôì)ô¤¡¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹‘•™…Õ±Ð°…ÍÍ•ÑÍ5…¹¥™•ÍÐ¹Í•ÉÙ•ÉI•Í½ÕÉ•Íl‰…ÁÀ½±…å½ÕÐ¹ÑÍà‰t°Ù½¥€À°€‰Ù¥Ñ”µÉÍŒ½¥µÁ½ÉÑ•ÈµÉ•Í½ÕÉ•Ìˆ¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸pÁÙ¥ÉÑÕ…°éÙ¥¹•áÐµ½½±”µ™½¹ÑÌý™½¹ÑÌõ•¥ÍÐ”É•¥ÍÑ}5½¹¼)Ù…È•¥ÍÐ€ô€¼¨}}AUI}|€¨¼É•…Ñ•½¹Ñ1½…‘•È ‰•¥ÍÐˆ¤ì)Ù…È•¥ÍÑ}5½¹¼€ô€¼¨}}AUI}|€¨¼É•…Ñ•½¹Ñ1½…‘•È ‰•¥ÍÐ5½¹¼ˆ¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½±…å½ÕÐ¹ÑÍà)Ù…È±…å½ÕÑ}•áÁ½ÉÑÌ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôø€‘ÝÉ…Á}I½½Ñ1…å½ÕÐ°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„ä)ô¤ì)Ù…È•¥ÍÑM…¹Ì€ô•¥ÍÐ¡ì(%Ù…É¥…‰±”è€ˆ´µ™½¹Ðµ•¥ÍÐµÍ…¹Ìˆ°(%ÍÕ‰Í•ÑÌèl‰±…Ñ¥¸‰t°(%}Í•±™!½ÍÑ•‘MLè€ˆ¼¨åÉ¥±±¥Œµ•áÐ€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐœíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐ´á…ŒÀÐÔÕ”ÜäÝ˜½•¥ÍÐµ™˜ÈÌÄÁ˜Ô¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÐØÀ´ÀÔÉ°T¬ÅàÀ´Åá°T¬ÈÁÐ°T¬ÉÀ´É°T­ØÐÀµØå°T­ÉµÉíq¹õq¸¼¨åÉ¥±±¥Œ€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐœíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐ´á…ŒÀÐÔÕ”ÜäÝ˜½•¥ÍÐ´àÜÕ‘Ð¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÌÀÄ°T¬ÀÐÀÀ´ÀÐÕ°T¬ÀÐäÀ´ÀÐäÄ°T¬ÀÑÀ´ÀÑÄ°T¬ÈÄÄØíq¹õq¸¼¨Ù¥•Ñ¹…µ•Í”€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐœíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐ´á…ŒÀÐÔÕ”ÜäÝ˜½•¥ÍÐ´ÔÈÌÀÙ…‰˜¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÄÀÈ´ÀÄÀÌ°T¬ÀÄÄÀ´ÀÄÄÄ°T¬ÀÄÈà´ÀÄÈä°T¬ÀÄØà´ÀÄØä°T¬ÀÅÀ´ÀÅÄ°T¬ÀÅ´ÀÅÀ°T¬ÀÌÀÀ´ÀÌÀÄ°T¬ÀÌÀÌ´ÀÌÀÐ°T¬ÀÌÀà´ÀÌÀä°T¬ÀÌÈÌ°T¬ÀÌÈä°T¬ÅÀ´Åä°T¬ÈÁíq¹õq¸¼¨±…Ñ¥¸µ•áÐ€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐœíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐ´á…ŒÀÐÔÕ”ÜäÝ˜½•¥ÍÐ´ÀÀÄÄÜÕˆÄ¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÄÀÀ´ÀÉ	°T¬ÀÉ	´ÀÉÔ°T¬ÀÉÜ´ÀÉ°T¬ÀÉ´ÀÉÜ°T¬ÀÉ´ÀÉ°T¬ÀÌÀÐ°T¬ÀÌÀà°T¬ÀÌÈä°T¬ÅÀÀ´Å	°T¬ÅÀÀ´Åå°T¬ÅÈ´Å°T¬ÈÀÈÀ°T¬ÈÁÀ´ÈÁ°T¬ÈÁ´ÈÁÀ°T¬ÈÄÄÌ°T¬ÉØÀ´ÉÝ°T­ÜÈÀµÝíq¹õq¸¼¨±…Ñ¥¸€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐœíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐ´á…ŒÀÐÔÕ”ÜäÝ˜½•¥ÍÐ´äá‰‰‰ˆ¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÀÀÀ´ÀÁ°T¬ÀÄÌÄ°T¬ÀÄÔÈ´ÀÄÔÌ°T¬ÀÉ	´ÀÉ	°T¬ÀÉØ°T¬ÀÉ°T¬ÀÉ°T¬ÀÌÀÐ°T¬ÀÌÀà°T¬ÀÌÈä°T¬ÈÀÀÀ´ÈÀÙ°T¬ÈÁ°T¬ÈÄÈÈ°T¬ÈÄäÄ°T¬ÈÄäÌ°T¬ÈÈÄÈ°T¬ÈÈÄÔ°T­°T­íq¹õq¸ˆ)ô¤ì)Ù…È•¥ÍÑ5½¹¼€ô•¥ÍÑ}5½¹¼¡ì(%Ù…É¥…‰±”è€ˆ´µ™½¹Ðµ•¥ÍÐµµ½¹¼ˆ°(%ÍÕ‰Í•ÑÌèl‰±…Ñ¥¸‰t°(%}Í•±™!½ÍÑ•‘MLè€ˆ¼¨åÉ¥±±¥Œµ•áÐ€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐ5½¹¼œíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐµµ½¹¼´ÀÁ”äàäÄÜàÜäÐ½•¥ÍÐµµ½¹¼µ˜ÙˆÌÌÌÈà¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÐØÀ´ÀÔÉ°T¬ÅàÀ´Åá°T¬ÈÁÐ°T¬ÉÀ´É°T­ØÐÀµØå°T­ÉµÉíq¹õq¸¼¨åÉ¥±±¥Œ€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐ5½¹¼œíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐµµ½¹¼´ÀÁ”äàäÄÜàÜäÐ½•¥ÍÐµµ½¹¼´ÐÑ”ÀÌÀÔÈ¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÌÀÄ°T¬ÀÐÀÀ´ÀÐÕ°T¬ÀÐäÀ´ÀÐäÄ°T¬ÀÑÀ´ÀÑÄ°T¬ÈÄÄØíq¹õq¸¼¨Íåµ‰½±ÌÈ€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐ5½¹¼œíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐµµ½¹¼´ÀÁ”äàäÄÜàÜäÐ½•¥ÍÐµµ½¹¼´ÀØÌàÐÐå”¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÈÀÀÀ´ÈÀÀÄ°T¬ÈÀÀÐ´ÈÀÀà°T¬ÈÀÁ°T¬ÈÍà´ÈÍ	°T¬ÈÔÀÀ´ÈÔåíq¹õq¸¼¨Ù¥•Ñ¹…µ•Í”€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐ5½¹¼œíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐµµ½¹¼´ÀÁ”äàäÄÜàÜäÐ½•¥ÍÐµµ½¹¼´äÜÅ™ˆÈÜÐ¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÄÀÈ´ÀÄÀÌ°T¬ÀÄÄÀ´ÀÄÄÄ°T¬ÀÄÈà´ÀÄÈä°T¬ÀÄØà´ÀÄØä°T¬ÀÅÀ´ÀÅÄ°T¬ÀÅ´ÀÅÀ°T¬ÀÌÀÀ´ÀÌÀÄ°T¬ÀÌÀÌ´ÀÌÀÐ°T¬ÀÌÀà´ÀÌÀä°T¬ÀÌÈÌ°T¬ÀÌÈä°T¬ÅÀ´Åä°T¬ÈÁíq¹õq¸¼¨±…Ñ¥¸µ•áÐ€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐ5½¹¼œíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐµµ½¹¼´ÀÁ”äàäÄÜàÜäÐ½•¥ÍÐµµ½¹¼´ÐÐÜÐÔÐÐØ¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÄÀÀ´ÀÉ	°T¬ÀÉ	´ÀÉÔ°T¬ÀÉÜ´ÀÉ°T¬ÀÉ´ÀÉÜ°T¬ÀÉ´ÀÉ°T¬ÀÌÀÐ°T¬ÀÌÀà°T¬ÀÌÈä°T¬ÅÀÀ´Å	°T¬ÅÀÀ´Åå°T¬ÅÈ´Å°T¬ÈÀÈÀ°T¬ÈÁÀ´ÈÁ°T¬ÈÁ´ÈÁÀ°T¬ÈÄÄÌ°T¬ÉØÀ´ÉÝ°T­ÜÈÀµÝíq¹õq¸¼¨±…Ñ¥¸€¨½q¹™½¹Ðµ™…”íq¸€™½¹Ðµ™…µ¥±äè€•¥ÍÐ5½¹¼œíq¸€™½¹ÐµÍÑå±”è¹½Éµ…°íq¸€™½¹ÐµÝ•¥¡Ðè€ÄÀÀ€äÀÀíq¸€™½¹Ðµ‘¥ÍÁ±…äèÍÝ…Àíq¸€ÍÉŒèÕÉ° ½…ÍÍ•ÑÌ½}Ù¥¹•áÑ}™½¹ÑÌ½•¥ÍÐµµ½¹¼´ÀÁ”äàäÄÜàÜäÐ½•¥ÍÐµµ½¹¼´ÀÄÍˆÉ˜É˜¹Ý½™˜È¤™½Éµ…Ð Ý½™˜Èœ¤íq¸€Õ¹¥½‘”µÉ…¹”èT¬ÀÀÀÀ´ÀÁ°T¬ÀÄÌÄ°T¬ÀÄÔÈ´ÀÄÔÌ°T¬ÀÉ	´ÀÉ	°T¬ÀÉØ°T¬ÀÉ°T¬ÀÉ°T¬ÀÌÀÐ°T¬ÀÌÀà°T¬ÀÌÈä°T¬ÈÀÀÀ´ÈÀÙ°T¬ÈÁ°T¬ÈÄÈÈ°T¬ÈÄäÄ°T¬ÈÄäÌ°T¬ÈÈÄÈ°T¬ÈÈÄÔ°T­°T­íq¹õq¸ˆ)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„ä€ôì(%µ•Ñ…‘…Ñ…	…Í”è¹•ÜUI0 ‰¡ÑÑÁÌè¼½…±±¡¥¹…‰Õä¹É¼ˆ¤°(%Ñ¥Ñ±”è€‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••ÐI½·‰¹¥„€ÈÀÈØðAÉ½‘ÕÍ”°Eƒ"e¤1¥ÙÉ…É”ˆ°(%‘•ÍÉ¥ÁÑ¥½¸è€‰¡¥¥¹‘•Á•¹‘•¹Ð±±¡¥¹…	ÕäÁ•¹ÑÉÔI½·‰¹¥„èÁÉ½‘ÕÍ”Í•±•Ñ…Ñ”°Á½é”E°½ÍÑÕÉ¤‘”½±•Ð°QY°Ù…·ƒ"e¤Á±…¹¥™¥…É•„±¥ÙËÉ¥¤¸ˆ°(%…±Ñ•É¹…Ñ•Ìèì($%…¹½¹¥…°è€ˆ¼ˆ°($%±…¹Õ…•Ìèì($$$‰àµ‘•™…Õ±Ðˆè€ˆ¼ˆ°($$%É¼è€ˆ¼ˆ°($$%•¸è€ˆ½•¸ˆ°($$%‘”è€ˆ½‘”ˆ°($$%™Èè€ˆ½™Èˆ°($$%•Ìè€ˆ½•Ìˆ°($$%¥Ðè€ˆ½¥Ðˆ°($$%Á°è€ˆ½Á°ˆ($%ô(%ô°(%½Á•¹É…Á èì($%ÑåÁ”è€‰Ý•‰Í¥Ñ”ˆ°($%ÕÉ°è€ˆ¼ˆ°($%Í¥Ñ•9…µ”è€‰…±±¡¥¹…‰Õä¹É¼ˆ°($%±½…±”è€‰É½}I<ˆ°($%Ñ¥Ñ±”è€‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••ÐÁ•¹ÑÉÔI½·‰¹¥„ˆ°($%‘•ÍÉ¥ÁÑ¥½¸è€‰AÉ½‘ÕÍ”°Á½é”Eƒ"e¤¡¥‘ÕÉ¤‘”±¥ÙÉ…É”Á•¹ÑÉÔÕµÃËÑ½É¥¤‘¥¸I½·‰¹¥„¸ˆ°($%¥µ…•Ìèmì($$%ÕÉ°è€ˆ½…±±¡¥¹…‰Õä¹Á¹œˆ°($$%Ý¥‘Ñ è€ÄÈÀÀ°($$%¡•¥¡Ðè€ÄÜÜ°($$%…±Ðè€‰±±¡¥¹…	Õä¥¹‘•Á•¹‘•¹ÐI½µ…¹¥„Õ¥‘”ˆ($%õt(%ô°(%ÑÝ¥ÑÑ•Èèì($%…Éè€‰ÍÕµµ…Éå}±…É•}¥µ…”ˆ°($%Ñ¥Ñ±”è€‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••ÐÁ•¹ÑÉÔI½·‰¹¥„ˆ°($%‘•ÍÉ¥ÁÑ¥½¸è€‰AÉ½‘ÕÍ”°Á½é”Eƒ"e¤¡¥‘ÕÉ¤‘”±¥ÙÉ…É”Á•¹ÑÉÔÕµÃËÑ½É¥¤‘¥¸I½·‰¹¥„¸ˆ°($%¥µ…•Ìèlˆ½…±±¡¥¹…‰Õä¹Á¹œ‰t(%ô°(%É½‰½ÑÌèì($%¥¹‘•àèÑÉÕ”°($%™½±±½ÜèÑÉÕ”(%ô°(%¥½¹Ìèì($%¥½¸è€ˆ½™…Ù¥½¸¹ÍÙœˆ°($%Í¡½ÉÑÕÐè€ˆ½™…Ù¥½¸¹ÍÙœˆ(%ô)ôì)…Íå¹Œ™Õ¹Ñ¥½¸I½½Ñ1…å½ÕÐ¡ì¡¥±‘É•¸ô¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¡Ñµ°ˆ°ì($%±…¹œè€¡…Ý…¥Ð¡•…‘•ÉÌ ¤¤¹•Ð ‰àµÍ¥Ñ”µ±½…±”ˆ¤ñð€‰É¼ˆ°($%¡¥±‘É•¸è€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‰½‘äˆ°ì($$%±…ÍÍ9…µ”è€‘í•¥ÍÑM…¹Ì¹Ù…É¥…‰±•ô€‘í•¥ÍÑ5½¹¼¹Ù…É¥…‰±•õ€°($$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÉ¥ÁÐˆ°ì($$$%ÑåÁ”è€‰…ÁÁ±¥…Ñ¥½¸½±­©Í½¸ˆ°($$$%‘…¹•É½ÕÍ±åM•Ñ%¹¹•É!Q50èì}}¡Ñµ°è)M=8¹ÍÑÉ¥¹¥™ä¡ì($$$$$‰½¹Ñ•áÐˆè€‰¡ÑÑÁÌè¼½Í¡•µ„¹½Éœˆ°($$$$$‰ÑåÁ”ˆè€‰]•‰M¥Ñ”ˆ°($$$$%¹…µ”è€‰…±±¡¥¹…‰Õä¹É¼ˆ°($$$$%ÕÉ°è€‰¡ÑÑÁÌè¼½…±±¡¥¹…‰Õä¹É¼¼ˆ°($$$$%¥¹1…¹Õ…”èl($$$$$$‰É¼ˆ°($$$$$$‰•¸ˆ°($$$$$$‰‘”ˆ°($$$$$$‰™Èˆ°($$$$$$‰•Ìˆ°($$$$$$‰¥Ðˆ°($$$$$$‰Á°ˆ($$$$%t°($$$$%‘•ÍÉ¥ÁÑ¥½¸è€‰%¹‘•Á•¹‘•¹Ð±±¡¥¹…	ÕäÉ•Í•…É …¹ÁÉ½‘ÕÐµ‘¥Í½Ù•ÉäÕ¥‘”™½ÈÍ¡½ÁÁ•ÉÌ¥¸I½µ…¹¥„¸ˆ($$$%ô¤ô($$%ô¤°¡¥±‘É•¹t($%ô¤(%ô¤ì)ô)Ù…È€‘ÝÉ…Á}I½½Ñ1…å½ÕÐ€ô€¼¨}}AUI}|€¨¼}}Ù¥Ñ•}ÉÍ}ÝÉ…Á}ÍÍ}|¡I½½Ñ1…å½ÕÐ°€‰‘•™…Õ±Ðˆ¤ì)™Õ¹Ñ¥½¸}}Ù¥Ñ•}ÉÍ}ÝÉ…Á}ÍÍ}|¡Ù…±Õ”°¹…µ”¤ì(%¥˜€¡ÑåÁ•½˜Ù…±Õ”€„ôô€‰™Õ¹Ñ¥½¸ˆ¤É•ÑÕÉ¸Ù…±Õ”ì(%™Õ¹Ñ¥½¸}}ÝÉ…ÁÁ•È¡ÁÉ½ÁÌ¤ì($%É•ÑÕÉ¸¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¡¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É…µ•¹Ð°¹Õ±°°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¡I•Í½ÕÉ•Ì¤°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¡Ù…±Õ”°ÁÉ½ÁÌ¤¤ì(%ô(%=‰©•Ð¹‘•™¥¹•AÉ½Á•ÉÑä¡}}ÝÉ…ÁÁ•È°€‰¹…µ”ˆ°ìÙ…±Õ”è¹…µ”ô¤ì(%É•ÑÕÉ¸}}ÝÉ…ÁÁ•Èì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½ÑÉÕÍÐµÁ…•Ì¹ÑÍà)Ù…ÈÑÉÕÍÑA…•ÌÄ€ôì(%µ•Ñ¡½‘½±½äèì($%Ñ¥Ñ±”è€‰5•Ñ½‘½±½¥”ˆ°($%ÍÕµµ…Éäè€‰Õ´Ù•É¥™¥´±¥¹­ÕÉ¥±”°¥µ…¥¹¥±”ƒ"e¤•ÍÑ¥·É¥±”ÁÕ‰±¥…Ñ”Á”…±±¡¥¹…‰Õä¹É¼¸ˆ°($%Í•Ñ¥½¹Ìèl($$%l‰”ÁÕ‰±¥´ˆ°€‰A…¥¹„‘”ÁÉ½‘ÕÍ”…™§"e•…ë½ÁÐƒ¹¹É•¥ÍÑËÉ¤Ù¥é¥‰¥±”¸9Ô™½±½Í¥´¹Õµ•É”‘”‰…ë‘”‘…Ñ”°ÁÉ½•¹Ñ”‘”Á½ÑÉ¥Ù¥É”Í…ÔÍÑ…ÑÕÐƒ
­Ù•É¥™¥…Ó
ì›Ëµ•Ñ½“ƒ"e¤‘½Ù•é¤ÁÕ‰±¥”¸‰t°($$%l‰Y•É¥™¥…É•„±¥¹­ÕÉ¥±½Èˆ°€‰1„€ÄÈ…ÕÕÍÐ€ÈÀÈØ°™¥•…É”…É„™½ÍÐ…Í½¥…ÐÔ¼Á…¥»¹‰Õå¡„¹½´…É”É•ÑÕÉ¹„Õ¸ÁÉ½‘ÕÌÔ…•±‡"e¤¹Õµ”¸1¥¹­ÕÉ¥±”¥¹±ÕÁ…É…µ•ÑÉ¤UQ4Á•¹ÑÉÔ„¥‘•¹Ñ¥™¥„ÑÉ…™¥Õ°‘¥¸…±±¡¥¹…‰Õä¹É¼¸‰t°($$%l‰ÍÑ¥·É¤ƒ¹¸UMˆ°€‰AÉ—"mÕÉ¥±”9d…™§"e…Ñ”…Ô™½ÍÐÑÉ…¹Í™½Éµ…Ñ”½É¥•¹Ñ…Ñ¥Ø±„ÕÉÍÕ°‘”É•™•É¥»"o€ÄUM€ô€Ø°ÜÐÐ9d‘¥¸€ÄÈ…ÕÕÍÐ€ÈÀÈØ¸M•±•"m¥„Ù…É¥…¹Ñ•¤°ÕÉÍÕ°‘”Í¡¥µˆƒ"e¤…ÑÕ…±¥ëÉ¥±”…Ñ…±½Õ±Õ¤Á½Ðµ½‘¥™¥„ÍÕµ„¸‰t°($$%l‰I•Õ±¤Ù…É¥…‰¥±”ˆ°€‰QÉ…¹ÍÁ½ÉÑÕ°°Ñ…á•±”°QY°ÉÕÑ•±”°É•ÍÑÉ¥"m¥¥±”ƒ"e¤Í•ÉÙ¥¥¥±”Í”Ù•É¥™¥‘¥¸ÍÕÉÍ”½™¥¥…±”±„‘…Ñ„ÁÕ‰±¥É¥¤¸%¹™½Éµ‡"m¥„¹Ôƒ¹¹±½Õ¥—"eÑ”½™•ÉÑ„±¥Ù”°…ÕÑ½É¥Ñ…Ñ•„Ù…µ…³Í…Ô½¹ÍÕ±Ñ…»"m„ÁÉ½™•Í¥½¹…³¸‰t($%t(%ô°(%…‰½ÕÐèì($%Ñ¥Ñ±”è€‰•ÍÁÉ”…•ÍÐ¡¥ˆ°($%ÍÕµµ…Éäè€‰…±±¡¥¹…‰Õä¹É¼•ÍÑ”Õ¸¡¥¥¹‘•Á•¹‘•¹ÐÁ•¹ÑÉÔÕµÃËÑ½É¥¤‘¥¸I½·‰¹¥„¸ˆ°($%Í•Ñ¥½¹Ìèl($$%l‰M½Àˆ°€‰=É…¹¥ë´‘•Í½Á•É¥É•„ÁÉ½‘ÕÍ•±½È°Ù•É¥™¥…É•„Á½é•±½ÈEƒ"e¤Á±…¹¥™¥…É•„½±•Ñ•±½Èƒ¹¹ÑÈµÕ¸™½Éµ…Ð×"e½È‘”Ù•É¥™¥…ÐÁ•¹ÑÉÔÕÑ¥±¥é…Ñ½É¥¤‘¥¸I½·‰¹¥„¸‰t°($$%l‰%¹‘•Á•¹‘•»"oˆ°€‰•ÍÑ„¹Ô•ÍÑ”Í¥Ñ”µÕ°½™¥¥…°±±¡¥¹…	Õäƒ"e¤¹Ô•ÍÑ”…™¥±¥…ÐÔ±±¡¥¹…	ÕäÍ…ÔÔ·É¥±”ÁÉ•é•¹Ñ…Ñ”¸9Õµ•±”Ñ•Ë"m¥±½ÈÍÕ¹Ð™½±½Í¥Ñ”‘•ÍÉ¥ÁÑ¥ØÁ•¹ÑÉÔ„•áÁ±¥„ÍÕ‰¥•ÑÕ°¡¥‘Õ±Õ¤¸‰t°($$%l‰1¥µ¥ÓÉ¤ˆ°€‰9ÔÙ¥¹‘•´ÁÉ½‘ÕÍ•±”…™§"e…Ñ”ƒ"e¤¹Ô½¹ÑÉ½³´…Ñ…±½Õ°°ÍÑ½Õ°°…±¥Ñ…Ñ•„°ÑÉ…¹ÍÁ½ÉÑ…Ñ½É¥¤°Ñ…á•±”½É¤‘•¥é¥¥±”Ù…µ…±”¸Y•É¥™¥‘…Ñ•±”±¥Ù”ƒ¹¹…¥¹Ñ”‘”Á±…Ó¸‰t($%t(%ô°(%½¹Ñ…Ðèì($%Ñ¥Ñ±”è€‰½¹Ñ…Ðˆ°($%ÍÕµµ…Éäè€‰½É•"m¥¤•‘¥Ñ½É¥…±”°±¥¹­ÕÉ¤¹•™Õ¹"m¥½¹…±”ƒ"e¤Í½±¥¥ÓÉ¤ÁÉ¥Ù¥¹½»"m¥¹ÕÑÕ°¸ˆ°($%Í•Ñ¥½¹Ìèl($$%l‰½É•"m¥¤ˆ°€‰9ÔÁÕ‰±¥´¼…‘É•Ï‘”½¹Ñ…Ð¹•Ù•É¥™¥…Ó¸C‰»±„…Ñ¥Ù…É•„Õ¹Õ¤…¹…°•‘¥Ñ½É¥…°½¹™¥Éµ…Ð°Á…¥¹¥±”¥¹‘¥‘…Ñ„Õ±Ñ¥µ•¤Ù•É¥™¥É¤°¥…È±¥¹­ÕÉ¥±”¹•™Õ¹"m¥½¹…±”ÍÕ¹ÐÉ•Ù•É¥™¥…Ñ”±„ÕÉ·Ñ½…É•„É•Ù¥é¥”ÁÉ½É…µ…Ó¸‰t°($$%l‰É•ÁÑÕÉ¤ƒ"e¤·É¤ˆ°€‰A•¹ÑÉÔÍ½±¥¥ÓÉ¤ÁÉ¥Ù¥¹‘É•ÁÑÕÉ¥±”‘”…ÕÑ½ÈÍ…Ô·É¥±”°¥¹±Õ‘”µ…Ñ•É¥…±Õ°•á…Ðƒ"e¤‘½Ù…‘„‘É•ÁÑÕ±Õ¤¥¹Ù½…Ð¸Y½´…¹…±¥é„ƒ"e¤½É•Ñ„½»"m¥¹ÕÑÕ°•‘¥Ñ½É¥…°©ÕÍÑ¥™¥…Ð¸‰t°($$%l‰Í¥ÍÑ•»"oÁ•¹ÑÉÔ½µ•¹é¤ˆ°€‰9Ô…Ù•´…•Ì±„½¹ÑÕÉ¤°½µ•¹é¤°Á³"m¤Í…Ô½±•Ñ”¸A•¹ÑÉÔ¼½µ…¹“½¹É•Ó°™½±½Í—"eÑ”…¹…±Õ°‘”ÍÕÁ½ÉÐ…°Í•ÉÙ¥¥Õ±Õ¤ÁÉ¥¸…É”…¤½µ…¹‘…Ð¸‰t($%t(%ô°(%ÁÉ¥Ù…äèì($%Ñ¥Ñ±”è€‰½¹™¥‘•»"m¥…±¥Ñ…Ñ”ˆ°($%ÍÕµµ…Éäè€‰”‘…Ñ”ÍÕ¹ÐÁÉ½•Í…Ñ”‰¹™½±½Í—"eÑ¤…•ÍÐÍ¥Ñ”¸ˆ°($%Í•Ñ¥½¹Ìèl($$%l‰…Ñ”Ñ•¡¹¥”ˆ°€‰M•ÉÙ•ÉÕ°ƒ"e¤™ÕÉ¹¥é½É¥¤‘”¥¹™É…ÍÑÉÕÑÕËÁ½ÐÁÉ½•Í„‘…Ñ”Ñ•¡¹¥”¹••Í…É”±¥ÙËÉ¥¤ƒ"e¤Í•ÕÉ¥Ó"m¥¤°ÁÉ•Õ´…‘É•Í„%@°Ñ¥ÁÕ°‘”‰É½ÝÍ•È°µ½µ•¹ÑÕ°Í½±¥¥ÓÉ¥¤ƒ"e¤Á…¥¹„…•Í…Ó¸‰t°($$%l‰ÕÓÉ¤ƒ"e¤±¥¹­ÕÉ¤•áÑ•É¹”ˆ°€‰ÕÑ…É•„ƒ"e¤±¥¹­ÕÉ¥±”‘”ÁÉ½‘ÕÌÑÉ¥µ¥ÐÕÑ¥±¥é…Ñ½ÉÕ°ÑÉ”¹‰Õå¡„¹½´¸A…É…µ•ÑÉ¥¤UQ4¥‘•¹Ñ¥™¥ÍÕÉÍ„‘”É•½µ…¹‘…É”°›Ë„¥¹±Õ‘”¹Õµ•±”Í…Ô…‘É•Í„Ñ„‘””µµ…¥°¸‰t°($$%l‰½¹Ñ…Ðˆ°€‰M¥Ñ”µÕ°¹Ô½™•Ëƒ¹¸ÁÉ•é•¹ÐÕ¸™½ÉµÕ±…Èƒ"e¤¹ÔÍ½±¥¥Ó‘…Ñ”Á•ÉÍ½¹…±”ÁÉ¥¸”µµ…¥°¸9ÔÑÉ¥µ¥Ñ”Á…É½±”°‘…Ñ”‘”Á±…ÓÍ…Ô‘½Õµ•¹Ñ”Ù…µ…±”Í•¹Í¥‰¥±”ÑÉ”…‘É•Í”…É”ÁÉ•Ñ¥¹É•ÁÉ•é¥¹Ó…•ÍÐ¡¥¸‰t($%t(%ô°(%Ñ•ÉµÌèì($%Ñ¥Ñ±”è€‰Q•Éµ•¹¤‘”ÕÑ¥±¥é…É”ˆ°($%ÍÕµµ…Éäè€‰½¹‘§"m¥¥±”…Á±¥…‰¥±”½»"m¥¹ÕÑÕ±Õ¤•‘¥Ñ½É¥…°ƒ"e¤±¥¹­ÕÉ¥±½È•áÑ•É¹”¸ˆ°($%Í•Ñ¥½¹Ìèl($$%l‰%¹™½Éµ…É”°¹Ô…É…»"m¥”ˆ°€‰½»"m¥¹ÕÑÕ°•ÍÑ”½™•É¥Ðƒ¹¸Í½À¥¹™½Éµ…Ñ¥Ø¸AÉ—"mÕÉ¥±”ÍÕ¹Ð•ÍÑ¥·É¤°¥…È‘¥ÍÁ½¹¥‰¥±¥Ñ…Ñ•„°Ñ…á•±”°ÉÕÑ•±”ƒ"e¤Á½±¥Ñ¥¥±”Í”Á½ÐÍ¡¥µ‰„›Ë¹½Ñ¥™¥…É”¸‰t°($$%l‰I•ÍÁ½¹Í…‰¥±¥Ñ…Ñ•„ÕÑ¥±¥é…Ñ½ÉÕ±Õ¤ˆ°€‰Y•É¥™¥±•…±¥Ñ…Ñ•„ÁÉ½‘ÕÍÕ±Õ¤°½¹‘§"m¥¥±”½µ•É¥…¹ÑÕ±Õ¤°½ÍÑÕ°±¥Ù”ƒ"e¤É•Õ±¥±”‘”¥µÁ½ÉÐ…Á±¥…‰¥±”ƒ¹¸I½·‰¹¥„ƒ¹¹…¥¹Ñ”‘”½µ…¹“Í…Ô•áÁ•‘¥•É”¸‰t°($$%l‰M¥Ñ”µÕÉ¤•áÑ•É¹”ˆ°€‰9Ô½¹ÑÉ½³´½»"m¥¹ÕÑÕ°½É¤™Õ¹"m¥½¹…É•„Á…¥¹¥±½È•áÑ•É¹”¸U¸±¥¹¬Ù…±¥±„‘…Ñ„Ù•É¥™¥É¥¤Á½…Ñ”™¤µ½‘¥™¥…ÐÍ…Ô•±¥µ¥¹…ÐÕ±Ñ•É¥½È‘”…‘µ¥¹¥ÍÑÉ…Ñ½ÉÕ°‘•ÍÑ¥¹‡"m¥•¤¸‰t($%t(%ô°($‰…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”ˆèì($%Ñ¥Ñ±”è€‰•éÛ±Õ¥É”ÁÉ¥Ù¥¹±¥¹­ÕÉ¥±”ˆ°($%ÍÕµµ…Éäè€‰Õ´™Õ¹"m¥½¹•…ë±¥¹­ÕÉ¥±”ÑÉ”…Ñ…±½Õ°•áÑ•É¸¸ˆ°($%Í•Ñ¥½¹Ìèl($$%l‰1¥¹­ÕÉ¤‘”É•½µ…¹‘…É”ˆ°€‰1¥¹­ÕÉ¥±”ÑÉ”¹‰Õå¡„¹½´¥¹±ÕÁ…É…µ•ÑÉ¤UQ4Á•¹ÑÉÔ…ÑÉ¥‰Õ¥É•„ÑÉ…™¥Õ±Õ¤¸M¥Ñ”µÕ°Á½…Ñ”‰•¹•™¥¥„‘¥É•ÐÍ…Ô¥¹‘¥É•Ð‘”É•½µ…¹“É¤°›Ë„…•…ÍÓÉ•±‡"m¥”ÏÍ¡¥µ‰”ÁÉ—"mÕ°…™§"e…ÐÕÑ¥±¥é…Ñ½ÉÕ±Õ¤¸‰t°($$%l‰M•±•"m¥”•‘¥Ñ½É¥…³ˆ°€‰<Á½Í¥‰¥³É•±‡"m¥”‘”É•½µ…¹‘…É”¹ÔÑÉ…¹Í™½É·Õ¸ÁÉ½‘ÕÌƒ¹¹ÑÈµ¼É•½µ…¹‘…É”…É…¹Ñ…Ó¸…É‘ÕÉ¥±”ÍÕ¹ÐÁÕ¹Ñ”‘”‘•Í½Á•É¥É”ƒ"e¤ÑÉ•‰Õ¥”Ù•É¥™¥…Ñ”ƒ¹¸Á…¥¹„±¥Ù”ƒ"e¤°‰¹•á¥ÍÓ°ÁÉ¥¸‘½Ù•é¥±”E¸‰t°($$%l‰9¥¥¼…™¥±¥•É”½™¥¥…³ˆ°€‰…±±¡¥¹…‰Õä¹É¼•ÍÑ”¥¹‘•Á•¹‘•¹Ðƒ"e¤¹ÔÉ•ÁÉ•é¥¹Ó±±¡¥¹…	ÕäÍ…Ô·É¥±”µ•»"m¥½¹…Ñ”¸1¥¹­ÕÉ¥±”¹Ô½¹ÍÑ¥ÑÕ¥”…ÁÉ½‰…É”½™¥¥…³‘¥¸Á…ÉÑ•„Ñ•Ë"m¥±½È¸‰t($%t(%ô)ôì)™Õ¹Ñ¥½¸ÑÉÕÍÑ5•Ñ…‘…Ñ„¡Í±Õœ¤ì(%½¹ÍÐ½¹Ñ•¹Ð€ôÑÉÕÍÑA…•ÌÅmÍ±Õtì(%É•ÑÕÉ¸ì($%Ñ¥Ñ±”è€‘í½¹Ñ•¹Ð¹Ñ¥Ñ±•ôð…±±¡¥¹…‰Õä¹É½€°($%‘•ÍÉ¥ÁÑ¥½¸è½¹Ñ•¹Ð¹ÍÕµµ…Éä°($%…±Ñ•É¹…Ñ•Ìèì…¹½¹¥…°è€¼‘íÍ±Õõ€ô°($%½Á•¹É…Á èì($$%Ñ¥Ñ±”è½¹Ñ•¹Ð¹Ñ¥Ñ±”°($$%‘•ÍÉ¥ÁÑ¥½¸è½¹Ñ•¹Ð¹ÍÕµµ…Éä°($$%ÕÉ°è€¼‘íÍ±Õõ€°($$%ÑåÁ”è€‰Ý•‰Í¥Ñ”ˆ($%ô(%ôì)ô)™Õ¹Ñ¥½¸QÉÕÍÑA…”¡ìÍ±Õœô¤ì(%½¹ÍÐ½¹Ñ•¹Ð€ôÑÉÕÍÑA…•ÌÅmÍ±Õtì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰µ…¥¸ˆ°ì($%±…ÍÍ9…µ”è€‰ÑÉÕÍÐµÁ…”ˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¡•…‘•Èˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡±¥¹­}‘•™…Õ±Ð°ì($$$%¡É•˜è€ˆ¼ˆ°($$$%¡¥±‘É•¸è€‹Š@…±±¡¥¹…‰Õä¹É¼ˆ($$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰!%%9A99PA9QITI=7	9%ˆô¥tô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰ÑÉÕÍÐµÁ…”µ¡•É¼ˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆ¼QIUMQ}9}QI9MAI9dˆô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Äˆ°ì¡¥±‘É•¸è½¹Ñ•¹Ð¹Ñ¥Ñ±”ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è½¹Ñ•¹Ð¹ÍÕµµ…Éäô¤($$$%t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰ÑÉÕÍÐµÁ…”µ½¹Ñ•¹Ðˆ°($$$%¡¥±‘É•¸èm½¹Ñ•¹Ð¹Í•Ñ¥½¹Ì¹µ…À ¡m¡•…‘¥¹œ°Ñ•áÑt°¥¹‘•à¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰…ÉÑ¥±”ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èlˆÀˆ°¥¹‘•à€¬€Åtô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸è¡•…‘¥¹œô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸èÑ•áÐô¥tô¥tô°¡•…‘¥¹œ¤¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì($$$$%±…ÍÍ9…µ”è€‰ÑÉÕÍÐµÕÁ‘…Ñ•ˆ°($$$$%¡¥±‘É•¸è€‰U±Ñ¥µ„…ÑÕ…±¥é…É”è€ÄÈ…ÕÕÍÐ€ÈÀÈØˆ($$$%ô¥t($$%ô¤($%t(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½…‰½ÕÐ½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÄÀ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôøA…”Ô°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„à)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„à€ôÑÉÕÍÑ5•Ñ…‘…Ñ„ ‰…‰½ÕÐˆ¤ì)™Õ¹Ñ¥½¸A…”Ô ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡QÉÕÍÑA…”°ìÍ±Õœè€‰…‰½ÕÐˆô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌä€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôøA…”Ð°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„Ü)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„Ü€ôÑÉÕÍÑ5•Ñ…‘…Ñ„ ‰…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”ˆ¤ì)™Õ¹Ñ¥½¸A…”Ð ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡QÉÕÍÑA…”°ìÍ±Õœè€‰…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”ˆô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹•ÁÐµ„½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌà€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôø½¹•ÁÑ°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„Ø)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„Ø€ôì(%Ñ¥Ñ±”è€‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••Ð€ÈÀÈØƒŠPÕÉ…Ñ•AÉ½‘ÕÐ¥¹‘Ìˆ°(%‘•ÍÉ¥ÁÑ¥½¸è€‰	É½ÝÍ”¥¹‘•Á•¹‘•¹Ð±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð™¥¹‘Ì‰ä…Ñ•½ÉäÝ¥Ñ UMÁÉ¥”ÁÉ•Ù¥•ÝÌ…¹‘¥É•ÐÁÉ½‘ÕÐÁ…Ñ¡Ì¸ˆ°(%É½‰½ÑÌèì($%¥¹‘•àè™…±Í”°($%™½±±½Üè™…±Í”(%ô)ôì)™Õ¹Ñ¥½¸½¹•ÁÑ ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰µ…¥¸ˆ°ì($%±…ÍÍ9…µ”è€‰Í¥Ñ”½¹•ÁÐµ„ˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡½¹•ÁÑMÝ¥Ñ¡•È°ì…Ñ¥Ù”è€‰ˆô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¡•…‘•Èˆ°ì($$$%±…ÍÍ9…µ”è€‰Í¥Ñ”µ¹…Ø¹…Øµ„ˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰Í¥Ñ”µ‰É…¹ˆ°($$$$$%¡É•˜è€ˆÑ½Àˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰‰É…¹µµ…É¬ˆ°($$$$$$%¡¥±‘É•¸è€‰ˆ($$$$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰	ÕäÑ±…Ìˆô¥t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¹…Øˆ°ì¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$%¡É•˜è€ˆ…Ñ•½É¥•Ìˆ°($$$$$$%¡¥±‘É•¸è€‰…Ñ•½É¥•Ìˆ($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$%¡É•˜è€ˆ‘É½ÁÌˆ°($$$$$$%¡¥±‘É•¸è€‰9•Ü‘É½ÁÌˆ($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$%¡É•˜è€ˆÕ¥‘”ˆ°($$$$$$%¡¥±‘É•¸è€‰!½Ü¥ÐÝ½É­Ìˆ($$$$$%ô¤($$$$%tô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰¹…ØµÑ„ˆ°($$$$$%¡É•˜è€ˆ‘É½ÁÌˆ°($$$$$%¡¥±‘É•¸èl‰	É½ÝÍ”™¥¹‘Ì€ˆ°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‹Š\ˆô¥t($$$$%ô¤($$$%t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰¡•É¼µ„ˆ°($$$%¥è€‰Ñ½Àˆ°($$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰¡•É¼µ„µ½Áäˆ°($$$$%¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰±¥Ù”µ¡¥Àˆ°($$$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°íô¤°€ˆUAQU€ÄÈƒ
Ü€ÈÀÈØ‰t($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ Äˆ°ì¡¥±‘É•¸èl($$$$$$$‰¥¹Ñ¡”Á¥•”¸ˆ°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰•´ˆ°ì¡¥±‘É•¸è€‰M­¥ÀÑ¡”¹½¥Í”¸ˆô¤($$$$$%tô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰Í¡…ÉÁ•È±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð•áÁ•É¥•¹—ŠQÕÉ…Ñ•ÁÉ½‘ÕÑÌ°±•…ÈUMÁÉ¥•Ì…¹„‘¥É•ÐÁ…Ñ Ñ¼•Ù•Éä™¥¹¸ˆô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M•…É¡	…È°íô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰ÑÉÕÍÐµÉ½Üˆ°($$$$$$%¡¥±‘É•¸èl($$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€ˆÉ,¬ˆô¤°€ˆÕÉ…Ñ•™¥¹‘Ì‰tô¤°($$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€ˆØˆô¤°€ˆ½É”…Ñ•½É¥•Ì‰tô¤°($$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰…¥±äˆô¤°€ˆ±¥¹¬¡•­Ì‰tô¤($$$$$$%t($$$$$%ô¤($$$$%t($$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰¡•É¼µ„µÙ¥ÍÕ…°ˆ°($$$$%¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì±…ÍÍ9…µ”è€‰Ù¥ÍÕ…°µ½É‰¥Ð½É‰¥Ðµ½¹”ˆô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì±…ÍÍ9…µ”è€‰Ù¥ÍÕ…°µ½É‰¥Ð½É‰¥ÐµÑÝ¼ˆô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰¡•É¼µÁÉ½‘ÕÐ¡•É¼µÁÉ½‘ÕÐµµ…¥¸ˆ°($$$$$$%¡É•˜èÁÉ½‘ÕÑÍlÍt¹¡É•˜°($$$$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$$$%É•°è€‰¹½½Á•¹•Èˆ°($$$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥µœˆ°ì($$$$$$$%ÍÉŒèÁÉ½‘ÕÑÍlÍt¹¥µ…”°($$$$$$$%…±ÐèÁÉ½‘ÕÑÍlÍt¹¹…µ”($$$$$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl($$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰%Q=HLA%,ˆô¤°($$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÑÉ½¹œˆ°ì¡¥±‘É•¸èÁÉ½‘ÕÑÍlÍt¹¹…µ”ô¤°($$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ˆˆ°ì¡¥±‘É•¸èmÁÉ½‘ÕÑÍlÍt¹ÁÉ¥”°€ˆƒŠ\‰tô¤($$$$$$%tô¥t($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰™±½…Ðµ…É™±½…Ðµ…Éµ½¹”ˆ°($$$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰Eˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰A¡½Ñ¼µÉ•…‘ä™¥¹‘Ìˆô¥t($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$$%±…ÍÍ9…µ”è€‰™±½…Ðµ…É™±½…Ðµ…ÉµÑÝ¼ˆ°($$$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€ˆäÐ”ˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰ÕÉ…Ñ¥½¸µ…Ñ ˆô¥t($$$$$%ô¤($$$$%t($$$%ô¥t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰…Ñ•½ÉäµÍÑÉ¥Àˆ°($$$%¥è€‰…Ñ•½É¥•Ìˆ°($$$%¡¥±‘É•¸è…Ñ•½É¥•Ì¹µ…À ¡m¹…µ”°¹½Ñ”°¡É•˜°¹t¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$%¡É•˜°($$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$%É•°è€‰¹½½Á•¹•Èˆ°($$$$%¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è¸ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è¹…µ”ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Íµ…±°ˆ°ì¡¥±‘É•¸è¹½Ñ”ô¥tô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°ì¡¥±‘É•¸è€‹Š\ˆô¤($$$$%t($$$%ô°¹…µ”¤¤($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰Í•Ñ¥½¸µ„ˆ°($$$%¥è€‰‘É½ÁÌˆ°($$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰Í•Ñ¥½¸µ¡•…‘¥¹œˆ°($$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰Í•Ñ¥½¸µ­¥­•Èˆ°($$$$$%¡¥±‘É•¸è€‰IM!1d%9aˆ($$$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ Èˆ°ì¡¥±‘É•¸è€‰Q½‘…äÌÉ…‘…Èˆô¥tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰±•…¸Á¥­Ì°É•…°±¥ÍÑ¥¹œÁ¡½Ñ½Ì°é•É¼•¹‘±•ÍÌÍÁÉ•…‘Í¡••ÐÍÉ½±±¥¹œ¸ˆô¥t($$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÑÌµ„ˆ°($$$$%¡¥±‘É•¸èÁÉ½‘ÕÑÌ¹Í±¥” À°€à¤¹µ…À ¡ÁÉ½‘ÕÐ°¥¹‘•à¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡AÉ½‘ÕÑ…É°ì($$$$$%ÁÉ½‘ÕÐ°($$$$$%¥¹‘•à($$$$%ô°ÁÉ½‘ÕÐ¹¡É•˜¤¤($$$%ô¥t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰¡½Üµ„ˆ°($$$%¥è€‰Õ¥‘”ˆ°($$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$%±…ÍÍ9…µ”è€‰Í•Ñ¥½¸µ­¥­•Èˆ°($$$$%¡¥±‘É•¸è€‰Q!M%5A1I=UQˆ($$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ Èˆ°ì¡¥±‘É•¸èl($$$$$‰É½´™¥¹Ñ¼…ÉÐˆ°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$$‰¥¸Ñ¡É•”±•…¸µ½Ù•Ì¸ˆ($$$%tô¥tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰½°ˆ°ì¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰±¤ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆÀÄˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰¥Í½Ù•Èˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰M•…É ½È‰É½ÝÍ”„Ñ¥¡Ñ±ä½É…¹¥é•…Ñ•½Éä¸ˆô¥tô¥tô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰±¤ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆÀÈˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰%¹ÍÁ•Ðˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰=Á•¸Ñ¡”ÁÉ½‘ÕÐ±¥ÍÑ¥¹œ…¹É•Ù¥•ÜÑ¡”‘•Ñ…¥±Ì¸ˆô¥tô¥tô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰±¤ˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€ˆÀÌˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€‰½¹Ñ¥¹Õ”ˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰UÍ”Ñ¡”‘¥É•ÐÁÉ½‘ÕÐÁ…Ñ Ý¡•¸å½Ô…É”É•…‘ä¸ˆô¥tô¥tô¤($$$%tô¥t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡½½Ñ•È°ìµ½‘”è€‰„ˆô¤($%t(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹•ÁÐµˆ½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÜ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôø½¹•ÁÑ°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„Ô)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„Ô€ôì(%Ñ¥Ñ±”è€‰Q¡”¥¹‘Ì‘¥ÐƒŠP%¹‘•Á•¹‘•¹Ð±±¡¥¹…	ÕäAÉ½‘ÕÐA¥­Ìˆ°(%‘•ÍÉ¥ÁÑ¥½¸è€‰ÕÉ…Ñ••‘¥Ñ½É¥…°Í¡½ÉÑ±¥ÍÐ½˜™…Í¡¥½¸™¥¹‘Ì™½È±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••ÐÍ¡½ÁÁ•ÉÌ¸ˆ°(%É½‰½ÑÌèì($%¥¹‘•àè™…±Í”°($%™½±±½Üè™…±Í”(%ô)ôì)™Õ¹Ñ¥½¸½¹•ÁÑ ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰µ…¥¸ˆ°ì($%±…ÍÍ9…µ”è€‰Í¥Ñ”½¹•ÁÐµˆˆ°($%¡¥±‘É•¸èl($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡½¹•ÁÑMÝ¥Ñ¡•È°ì…Ñ¥Ù”è€‰ˆô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¡•…‘•Èˆ°ì($$$%±…ÍÍ9…µ”è€‰Í¥Ñ”µ¹…Ø¹…Øµˆˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰Í¥Ñ”µ‰É…¹ˆ°($$$$$%¡É•˜è€ˆÑ½Àˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰Q!ˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ˆˆ°ì¡¥±‘É•¸èl($$$$$$$‰%9Lˆ°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$$$$‰%Pˆ($$$$$%tô¥t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰¹…Øˆ°ì¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$%¡É•˜è€ˆ•‘¥Ðˆ°($$$$$$%¡¥±‘É•¸è€‰Q¡”•‘¥Ðˆ($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$%¡É•˜è€ˆ‘•Á…ÉÑµ•¹ÑÌˆ°($$$$$$%¡¥±‘É•¸è€‰•Á…ÉÑµ•¹ÑÌˆ($$$$$%ô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$%¡É•˜è€ˆ¹½Ñ•Ìˆ°($$$$$$%¡¥±‘É•¸è€‰¥•±¹½Ñ•Ìˆ($$$$$%ô¤($$$$%tô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$%±…ÍÍ9…µ”è€‰¹…ØµÑ„ˆ°($$$$$%¡É•˜è€ˆ•‘¥Ðˆ°($$$$$%¡¥±‘É•¸è€‰M¡½ÀÑ¡”¥ÍÍÕ”ƒŠ`ˆ($$$$%ô¤($$$%t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰¡•É¼µˆˆ°($$$%¥è€‰Ñ½Àˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰¥ÍÍÕ”µ±…‰•°ˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰%MMUˆô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ˆˆ°ì¡¥±‘É•¸è€ˆÀà€¼€ÈØˆô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°ì¡¥±‘É•¸è€‰%¹‘•Á•¹‘•¹Ð	Õä‘¥Í½Ù•Éäˆô¤($$$$$%t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰¡•É¼µˆµÑ¥Ñ±”ˆ°($$$$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ Äˆ°ì¡¥±‘É•¸èl($$$$$$$‰Q¡¥¹ÌÝ½ÉÑ ˆ°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰•´ˆ°ì¡¥±‘É•¸è€‰™¥¹‘¥¹œ¸ˆô¤($$$$$%tô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰Ý••­±ä•‘¥Ð½˜ÍÑ…¹‘½ÕÐ™…Í¡¥½¸™¥¹‘ÏŠQÍ•±•Ñ•™½ÈÁ•½Á±”Ý¥Ñ Ñ…ÍÑ”°¹½ÐÑ¥µ”¸ˆô¥t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$%±…ÍÍ9…µ”è€‰¡•É¼µˆµ½±±…”ˆ°($$$$$%¡¥±‘É•¸èl($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$$$$%±…ÍÍ9…µ”è€‰½±±…”µ½Áäˆ°($$$$$$$%¡¥±‘É•¸èl($$$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰I=@€ÀÌÈˆô¤°($$$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ÍÑÉ½¹œˆ°ì¡¥±‘É•¸èl($$$$$$$$$$‰9•Üˆ°($$$$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$$$$$$$‰M•…Í½¸ˆ°($$$$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$$$$$$$‰1…å•ÉÌˆ($$$$$$$$%tô¤°($$$$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰„ˆ°ì($$$$$$$$$%¡É•˜è€ˆ•‘¥Ðˆ°($$$$$$$$$%¡¥±‘É•¸è€‰¹Ñ•ÈÑ¡”•‘¥ÐƒŠ\ˆ($$$$$$$$%ô¤($$$$$$$%t($$$$$$%ô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥µœˆ°ì($$$$$$$%±…ÍÍ9…µ”è€‰½±±…”µµ…¥¸ˆ°($$$$$$$%ÍÉŒèÁÉ½‘ÕÑÍlÑt¹¥µ…”°($$$$$$$%…±ÐèÁÉ½‘ÕÑÍlÑt¹¹…µ”($$$$$$%ô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¥µœˆ°ì($$$$$$$%±…ÍÍ9…µ”è€‰½±±…”µÍµ…±°ˆ°($$$$$$$%ÍÉŒèÁÉ½‘ÕÑÍlÁt¹¥µ…”°($$$$$$$%…±ÐèÁÉ½‘ÕÑÍlÁt¹¹…µ”($$$$$$%ô¤°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì($$$$$$$%±…ÍÍ9…µ”è€‰Ù•ÉÑ¥…°µ¹½Ñ”ˆ°($$$$$$$%¡¥±‘É•¸è€‰UIQ€¼=9M%I€¼UII9Pˆ($$$$$$%ô¤($$$$$%t($$$$%ô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡M•…É¡	…È°ì±…‰•°è€‰]¡…Ð…É”å½Ô±½½­¥¹œ™½Èüˆô¤($$$%t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰‘•Á…ÉÑµ•¹ÑÌµˆˆ°($$$%¥è€‰‘•Á…ÉÑµ•¹ÑÌˆ°($$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰M!=@	dAIQ59Pˆô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì¡¥±‘É•¸è…Ñ•½É¥•Ì¹µ…À ¡m¹…µ”°€°¡É•™t°¥¹‘•à¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰„ˆ°ì($$$$%¡É•˜°($$$$%Ñ…É•Ðè€‰}‰±…¹¬ˆ°($$$$%É•°è€‰¹½½Á•¹•Èˆ°($$$$%¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Íµ…±°ˆ°ì¡¥±‘É•¸èlˆÀˆ°¥¹‘•à€¬€Åtô¤°($$$$$%¹…µ”°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰¤ˆ°ì¡¥±‘É•¸è€‹Š\ˆô¤($$$$%t($$$%ô°¹…µ”¤¤ô¥t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰Í•Ñ¥½¸µˆˆ°($$$%¥è€‰•‘¥Ðˆ°($$$%¡¥±‘É•¸èl¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰•‘¥Ñ½É¥…°µ¡•…‘¥¹œˆ°($$$$%¡¥±‘É•¸èl($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰Q!M!=IQ1%MPƒ
Ü€Àà¸ÄÈ¸ÈØˆô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰ Èˆ°ì¡¥±‘É•¸èl($$$$$$$‰¥¡Ð½½É•…Í½¹Ìˆ°($$$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰Èˆ°íô¤°($$$$$$$‰Ñ¼ÍÑ½ÀÍÉ½±±¥¹œ¸ˆ($$$$$%tô¤°($$$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰AÉ¥•ÌÍ¡½Ý¸¥¸UM™½È™…ÍÑ•È½µÁ…É¥Í½¸¸=Á•¸…¹ä¥Ñ•´Ñ¼Í•”Ñ¡”™Õ±°ÕÉÉ•¹Ð±¥ÍÑ¥¹œ¸ˆô¤($$$$%t($$$%ô¤°€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‘¥Øˆ°ì($$$$%±…ÍÍ9…µ”è€‰ÁÉ½‘ÕÑÌµˆˆ°($$$$%¡¥±‘É•¸èÁÉ½‘ÕÑÌ¹Í±¥” À°€à¤¹µ…À ¡ÁÉ½‘ÕÐ°¥¹‘•à¤€ôø€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡AÉ½‘ÕÑ…É°ì($$$$$%µ½‘”è€‰ˆˆ°($$$$$%ÁÉ½‘ÕÐ°($$$$$%¥¹‘•à($$$$%ô°ÁÉ½‘ÕÐ¹¡É•˜¤¤($$$%ô¥t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©ÍáÌ¤ ‰Í•Ñ¥½¸ˆ°ì($$$%±…ÍÍ9…µ”è€‰¹½Ñ•Ìµˆˆ°($$$%¥è€‰¹½Ñ•Ìˆ°($$$%¡¥±‘É•¸èl($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰ÍÁ…¸ˆ°ì¡¥±‘É•¸è€‰%19=QƒŠX€ÀÐˆô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰‰±½­ÅÕ½Ñ”ˆ°ì¡¥±‘É•¸è€‹ŠqQ¡”‰•ÍÐÍÁÉ•…‘Í¡••Ð¥Í¸ÐÑ¡”±½¹•ÍÐ½¹”¸%ÐÌÑ¡”½¹”Ñ¡…Ð¡•±ÁÌå½Ô‘•¥‘”»Štˆô¤°($$$$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤ ‰Àˆ°ì¡¥±‘É•¸è€‰	Õ¥±Ð…É½Õ¹±•…É•È…Ñ•½É¥•Ì°É•…°ÁÉ½‘ÕÐ¥µ…•Éä…¹™•Ý•È‘•…•¹‘Ì¸ˆô¤($$$%t($$%ô¤°($$$¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡½½Ñ•È°ìµ½‘”è€‰ˆˆô¤($%t(%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹•ÁÐµŒ½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌØ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôø½¹•ÁÑ°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„Ð)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„Ð€ôì(%Ñ¥Ñ±”è€‰	Õä¥¹‘Ì…Ñ…‰…Í”ƒŠP±±¡¥¹…	ÕäMÁÉ•…‘Í¡••Ð€˜EÕ¥‘•Ìˆ°(%‘•ÍÉ¥ÁÑ¥½¸è€‰M•…É ÕÉ…Ñ•ÁÉ½‘ÕÐ™¥¹‘Ì…¹½Á•¸¥¹‘•Á•¹‘•¹Ð±±¡¥¹…	ÕäÍÁÉ•…‘Í¡••Ð°EÁ¡½Ñ¼°Í¡¥ÁÁ¥¹œ…¹DÕ¥‘•Ì¸ˆ°(%É½‰½ÑÌèì($%¥¹‘•àè™…±Í”°($%™½±±½Üè™…±Í”(%ô)ôì)™Õ¹Ñ¥½¸½¹•ÁÑ ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Q•Éµ¥¹…±A…”°íô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹Ñ…Ð½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÔ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôøA…”Ì°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„Ì)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„Ì€ôÑÉÕÍÑ5•Ñ…‘…Ñ„ ‰½¹Ñ…Ðˆ¤ì)™Õ¹Ñ¥½¸A…”Ì ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡QÉÕÍÑA…”°ìÍ±Õœè€‰½¹Ñ…Ðˆô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½µ•Ñ¡½‘½±½ä½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÐ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôøA…”È°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„È)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„È€ôÑÉÕÍÑ5•Ñ…‘…Ñ„ ‰µ•Ñ¡½‘½±½äˆ¤ì)™Õ¹Ñ¥½¸A…”È ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡QÉÕÍÑA…”°ìÍ±Õœè€‰µ•Ñ¡½‘½±½äˆô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½ÁÉ¥Ù…ä½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÌ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôøA…”Ä°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„Ä)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„Ä€ôÑÉÕÍÑ5•Ñ…‘…Ñ„ ‰ÁÉ¥Ù…äˆ¤ì)™Õ¹Ñ¥½¸A…”Ä ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡QÉÕÍÑA…”°ìÍ±Õœè€‰ÁÉ¥Ù…äˆô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½Ñ•ÉµÌ½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÈ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôøA…”°(%µ•Ñ…‘…Ñ„è€ ¤€ôøµ•Ñ…‘…Ñ„)ô¤ì)Ù…Èµ•Ñ…‘…Ñ„€ôÑÉÕÍÑ5•Ñ…‘…Ñ„ ‰Ñ•ÉµÌˆ¤ì)™Õ¹Ñ¥½¸A…” ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡QÉÕÍÑA…”°ìÍ±Õœè€‰Ñ•ÉµÌˆô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½l¸¸¹É½ÕÑ•t½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌÄ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôøAÕ‰±¥I½ÕÑ”°(%•¹•É…Ñ•5•Ñ…‘…Ñ„è€ ¤€ôø•¹•É…Ñ•5•Ñ…‘…Ñ„Ä)ô¤ì)Ù…ÈÍ•Ñ¥½¹Ì€ôl($‰ÁÉ½‘ÕÑÌˆ°($‰…Ñ•½É¥•Ìˆ°($‰ÅŒµÕ¥‘”ˆ°($‰Í¡¥ÁÁ¥¹œµÕ¥‘”ˆ°($‰…ÉÑ¥±•Ìˆ°($‰™…Äˆ)tì)Ù…È±½…±•5•Ñ„€ôì(%É¼èì($%É•¥½¸è€‰Á•¹ÑÉÔÕµÃËÑ½É¥¤‘¥¸I½·‰¹¥„ˆ°($%½1½…±”è€‰É½}I<ˆ(%ô°(%•¸èì($%É•¥½¸è€‰™½ÈÍ¡½ÁÁ•ÉÌ¥¸I½µ…¹¥„ˆ°($%½1½…±”è€‰•¹}ULˆ(%ô°(%‘”èì($%É•¥½¸è€‰›ñÈ/‘Õ™•È¥¸IÕ·‘¹¥•¸ˆ°($%½1½…±”è€‰‘•}ˆ(%ô°(%™Èèì($%É•¥½¸è€‰Á½ÕÈ±•Ì…¡•Ñ•ÕÉÌ•¸I½Õµ…¹¥”ˆ°($%½1½…±”è€‰™É}Hˆ(%ô°(%•Ìèì($%É•¥½¸è€‰Á…É„½µÁÉ…‘½É•Ì•¸IÕµ…»µ„ˆ°($%½1½…±”è€‰•Í}Lˆ(%ô°(%¥Ðèì($%É•¥½¸è€‰Á•È±¤…ÅÕ¥É•¹Ñ¤¥¸I½µ…¹¥„ˆ°($%½1½…±”è€‰¥Ñ}%Pˆ(%ô°(%Á°èì($%É•¥½¸è€‰‘±„­ÕÁÕ«å ÜIÕµÕ¹¥¤ˆ°($%½1½…±”è€‰Á±}A0ˆ(%ô)ôì)™Õ¹Ñ¥½¸Á…ÉÍ•I½ÕÑ”¡É½ÕÑ”¤ì(%½¹ÍÐ…¹‘¥‘…Ñ”€ôÉ½ÕÑ•lÁtì(%½¹ÍÐ¡…Í1½…±”€ô±½…±•ÌÄ¹¥¹±Õ‘•Ì¡…¹‘¥‘…Ñ”¤ì(%É•ÑÕÉ¸ì($%±½…±”è¡…Í1½…±”€ü…¹‘¥‘…Ñ”€è€‰É¼ˆ°($%Á…Ñ è¡…Í1½…±”€üÉ½ÕÑ”¹Í±¥” Ä¤€èÉ½ÕÑ”(%ôì)ô)™Õ¹Ñ¥½¸±•…¹A…Ñ ¡±½…±”°Á…Ñ ¤ì(%½¹ÍÐÍÕ™™¥à€ôÁ…Ñ ¹±•¹Ñ €ü€¼‘íÁ…Ñ ¹©½¥¸ ˆ¼ˆ¥õ€€è€ˆˆì(%É•ÑÕÉ¸±½…±”€ôôô€‰É¼ˆ€üÍÕ™™¥àñð€ˆ¼ˆ€è€¼‘í±½…±•ô‘íÍÕ™™¥áõ€ì)ô)™Õ¹Ñ¥½¸±…¹Õ…•±Ñ•É¹…Ñ•Ì¡Á…Ñ ¤ì(%½¹ÍÐÍÕ™™¥à€ôÁ…Ñ ¹±•¹Ñ €ü€¼‘íÁ…Ñ ¹©½¥¸ ˆ¼ˆ¥õ€€è€ˆˆì(%É•ÑÕÉ¸ì($$‰àµ‘•™…Õ±ÐˆèÍÕ™™¥àñð€ˆ¼ˆ°($%É¼èÍÕ™™¥àñð€ˆ¼ˆ°($%•¸è€½•¸‘íÍÕ™™¥áõ€°($%‘”è€½‘”‘íÍÕ™™¥áõ€°($%™Èè€½™È‘íÍÕ™™¥áõ€°($%•Ìè€½•Ì‘íÍÕ™™¥áõ€°($%¥Ðè€½¥Ð‘íÍÕ™™¥áõ€°($%Á°è€½Á°‘íÍÕ™™¥áõ€(%ôì)ô)™Õ¹Ñ¥½¸¥ÍY…±¥¡Á…Ñ ¤ì(%¥˜€ …Á…Ñ ¹±•¹Ñ ¤É•ÑÕÉ¸ÑÉÕ”ì(%¥˜€ …Í•Ñ¥½¹Ì¹¥¹±Õ‘•Ì¡Á…Ñ¡lÁt¤¤É•ÑÕÉ¸™…±Í”ì(%¥˜€¡Á…Ñ¡lÁt€„ôô€‰…ÉÑ¥±•Ìˆ¤É•ÑÕÉ¸Á…Ñ ¹±•¹Ñ €ôôô€Äì(%¥˜€¡Á…Ñ ¹±•¹Ñ €ôôô€Ä¤É•ÑÕÉ¸ÑÉÕ”ì(%É•ÑÕÉ¸Á…Ñ ¹±•¹Ñ €ôôô€È€˜˜•¹±¥Í¡ÉÑ¥±•Ì¹Í½µ” ¡…ÉÑ¥±”¤€ôø…ÉÑ¥±”¹Í±Õœ€ôôôÁ…Ñ¡lÅt¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸•¹•É…Ñ•5•Ñ…‘…Ñ„Ä¡ìÁ…É…µÌô¤ì(%½¹ÍÐìÉ½ÕÑ”ô€ô…Ý…¥ÐÁ…É…µÌì(%½¹ÍÐì±½…±”°Á…Ñ ô€ôÁ…ÉÍ•I½ÕÑ”¡É½ÕÑ”¤ì(%¥˜€ …¥ÍY…±¥¡Á…Ñ ¤¤É•ÑÕÉ¸íôì(%½¹ÍÐ…¹½¹¥…°€ô±•…¹A…Ñ ¡±½…±”°Á…Ñ ¤ì(%½¹ÍÐ…±Ñ•É¹…Ñ•Ì€ôì($%…¹½¹¥…°°($%±…¹Õ…•Ìè±…¹Õ…•±Ñ•É¹…Ñ•Ì¡Á…Ñ ¤(%ôì(%½¹ÍÐ½Áä€ô•Ñ1½…±•½Áä¡±½…±”¤ì(%½¹ÍÐ½	…Í”€ôì($%ÕÉ°è…¹½¹¥…°°($%Í¥Ñ•9…µ”è€‰…±±¡¥¹…‰Õä¹É¼ˆ°($%±½…±”è±½…±•5•Ñ…m±½…±•t¹½1½…±”°($%…±Ñ•É¹…Ñ•1½…±”è=‰©•Ð¹Ù…±Õ•Ì¡±½…±•5•Ñ„¤¹™¥±Ñ•È ¡¥Ñ•´¤€ôø¥Ñ•´¹½1½…±”€„ôô±½…±•5•Ñ…m±½…±•t¹½1½…±”¤¹µ…À ¡¥Ñ•´¤€ôø¥Ñ•´¹½1½…±”¤°($%¥µ…•Ìèmì($$%ÕÉ°è€ˆ½…±±¡¥¹…‰Õä¹Á¹œˆ°($$%Ý¥‘Ñ è€ÄÈÀÀ°($$%¡•¥¡Ðè€ÄÜÜ°($$%…±Ðè€‰±±¡¥¹…	Õä¥¹‘•Á•¹‘•¹ÐI½µ…¹¥„Õ¥‘”ˆ($%õt(%ôì(%¥˜€¡Á…Ñ¡lÁt€ôôô€‰…ÉÑ¥±•Ìˆ€˜˜Á…Ñ¡lÅt¤ì($%½¹ÍÐ…ÉÑ¥±”€ô•Ñ¹±¥Í¡ÉÑ¥±”¡Á…Ñ¡lÅt¤ì($%½¹ÍÐ±½…±¥é•€ô½Áä¹…ÉÑ¥±•Ì¹™¥¹ ¡¥Ñ•´¤€ôø¥Ñ•µlÅt€ôôô…ÉÑ¥±”¹Í±Õœ¤ñð½Áä¹…ÉÑ¥±•ÍlÁtì($%½¹ÍÐÑ¥Ñ±”€ô€‘í±½…±”€ôôô€‰•¸ˆ€ü…ÉÑ¥±”¹Ñ¥Ñ±”€è±½…±¥é•‘lÁuôðI½·‰¹¥…€ì($%½¹ÍÐ‘•ÍÉ¥ÁÑ¥½¸€ô€‘í±½…±”€ôôô€‰•¸ˆ€ü…ÉÑ¥±”¹‘•ÍÉ¥ÁÑ¥½¸€è±½…±¥é•‘lÉuôƒŠP€‘í±½…±•5•Ñ…m±½…±•t¹É•¥½¹ô¹€ì($%É•ÑÕÉ¸ì($$%Ñ¥Ñ±”°($$%‘•ÍÉ¥ÁÑ¥½¸°($$%…±Ñ•É¹…Ñ•Ì°($$%½Á•¹É…Á èì($$$$¸¸¹½	…Í”°($$$%ÑåÁ”è€‰…ÉÑ¥±”ˆ°($$$%Ñ¥Ñ±”°($$$%‘•ÍÉ¥ÁÑ¥½¸°($$$%ÁÕ‰±¥Í¡•‘Q¥µ”è€ˆÈÀÈØ´Àà´ÄÉPÀÀèÀÀèÀÁhˆ°($$$%µ½‘¥™¥•‘Q¥µ”è€ˆÈÀÈØ´Àà´ÄÉPÀÀèÀÀèÀÁhˆ($$%ô°($$%ÑÝ¥ÑÑ•Èèì($$$%…Éè€‰ÍÕµµ…Éå}±…É•}¥µ…”ˆ°($$$%Ñ¥Ñ±”°($$$%‘•ÍÉ¥ÁÑ¥½¸°($$$%¥µ…•Ìèlˆ½…±±¡¥¹…‰Õä¹Á¹œ‰t($$%ô($%ôì(%ô(%½¹ÍÐÁ…”€ô½Áä¹Á…•ÍmÁ…Ñ¡lÁtñð€‰ÁÉ½‘ÕÑÌ‰tñð½Áä¹Á…•Ì¹…ÉÑ¥±•Ìì(%½¹ÍÐÑ¥Ñ±”€ô€‘íÁ…•lÁuôð±±¡¥¹…	ÕäI½·‰¹¥…€ì(%½¹ÍÐ‘•ÍÉ¥ÁÑ¥½¸€ô€‘íÁ…•lÅuô€‘í±½…±•5•Ñ…m±½…±•t¹É•¥½¹ô¹€ì(%É•ÑÕÉ¸ì($%Ñ¥Ñ±”°($%‘•ÍÉ¥ÁÑ¥½¸°($%…±Ñ•É¹…Ñ•Ì°($%½Á•¹É…Á èì($$$¸¸¹½	…Í”°($$%ÑåÁ”è€‰Ý•‰Í¥Ñ”ˆ°($$%Ñ¥Ñ±”°($$%‘•ÍÉ¥ÁÑ¥½¸($%ô°($%ÑÝ¥ÑÑ•Èèì($$%…Éè€‰ÍÕµµ…Éå}±…É•}¥µ…”ˆ°($$%Ñ¥Ñ±”°($$%‘•ÍÉ¥ÁÑ¥½¸°($$%¥µ…•Ìèlˆ½…±±¡¥¹…‰Õä¹Á¹œ‰t($%ô(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸AÕ‰±¥I½ÕÑ”¡ìÁ…É…µÌô¤ì(%½¹ÍÐìÉ½ÕÑ”ô€ô…Ý…¥ÐÁ…É…µÌì(%¥˜€¡É½ÕÑ•lÁt€ôôô€‰É¼ˆ¤Á•Éµ…¹•¹ÑI•‘¥É•Ð¡€¼‘íÉ½ÕÑ”¹Í±¥” Ä¤¹©½¥¸ ˆ¼ˆ¥õ€¤ì(%½¹ÍÐì±½…±”°Á…Ñ ô€ôÁ…ÉÍ•I½ÕÑ”¡É½ÕÑ”¤ì(%¥˜€ …¥ÍY…±¥¡Á…Ñ ¤¤¹½Ñ½Õ¹ ¤ì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Q•Éµ¥¹…±A…”°ì($%±½…±”°($%Á…Ñ (%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½½¹•ÁÐµŒ½m±½…±•t½ml¸¸¹Á…Ñ¡ut½Á…”¹ÑÍà)Ù…ÈÁ…•}•áÁ½ÉÑÌ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì(%‘•™…Õ±Ðè€ ¤€ôø1½…±¥é•‘Q•Éµ¥¹…°°(%•¹•É…Ñ•5•Ñ…‘…Ñ„è€ ¤€ôø•¹•É…Ñ•5•Ñ…‘…Ñ„)ô¤ì)…Íå¹Œ™Õ¹Ñ¥½¸•¹•É…Ñ•5•Ñ…‘…Ñ„¡ìÁ…É…µÌô¤ì(%½¹ÍÐì±½…±”èÉ…Ý1½…±”°Á…Ñ €ômtô€ô…Ý…¥ÐÁ…É…µÌì(%½¹ÍÐ½Áä€ô•Ñ1½…±•½Áä¡±½…±•ÌÄ¹¥¹±Õ‘•Ì¡É…Ý1½…±”¤€üÉ…Ý1½…±”€è€‰•¸ˆ¤ì(%¥˜€¡Á…Ñ¡lÁt€ôôô€‰…ÉÑ¥±•Ìˆ€˜˜Á…Ñ¡lÅt¤ì($%½¹ÍÐ…ÉÑ¥±”€ô•Ñ¹±¥Í¡ÉÑ¥±”¡Á…Ñ¡lÅt¤ì($%É•ÑÕÉ¸ì($$%Ñ¥Ñ±”èì($$$$‰ÍÁÉ•…‘Í¡••ÐµÕ¥‘”ˆè€‰±±¡¥¹…	ÕäMÁÉ•…‘Í¡••ÐÕ¥‘”è¥¹	•ÑÑ•ÈAÉ½‘ÕÑÌˆ°($$$$‰ÅŒµÁ¡½Ñ¼µÉ½ÕÑ¥¹”ˆè€‰±±¡¥¹…	ÕäEA¡½Ñ½Ìè€Ôµ5¥¹ÕÑ”%¹ÍÁ•Ñ¥½¸Õ¥‘”ˆ°($$$$‰Á…É•°µ½ÍÐµÕ¥‘”ˆè€‰±±¡¥¹…	ÕäM¡¥ÁÁ¥¹œ½ÍÐèAÉ½‘ÕÐÙÌA…É•°AÉ¥”ˆ($$%õm…ÉÑ¥±”¹Í±Õt°($$%‘•ÍÉ¥ÁÑ¥½¸è…ÉÑ¥±”¹‘•ÍÉ¥ÁÑ¥½¸°($$%É½‰½ÑÌèì($$$%¥¹‘•àè™…±Í”°($$$%™½±±½Üè™…±Í”($$%ô($%ôì(%ô(%½¹ÍÐÁ…”€ô½Áä¹Á…•ÍmÁ…Ñ¡lÁtñð€‰ÁÉ½‘ÕÑÌ‰tñð½Áä¹Á…•Ì¹…ÉÑ¥±•Ìì(%É•ÑÕÉ¸ì($%Ñ¥Ñ±”è€‘íÁ…•lÁuôƒŠP	}%9¼½€°($%‘•ÍÉ¥ÁÑ¥½¸èÁ…•lÅt°($%É½‰½ÑÌèì($$%¥¹‘•àè™…±Í”°($$%™½±±½Üè™…±Í”($%ô(%ôì)ô)…Íå¹Œ™Õ¹Ñ¥½¸1½…±¥é•‘Q•Éµ¥¹…°¡ìÁ…É…µÌô¤ì(%½¹ÍÐì±½…±”èÉ…Ý1½…±”°Á…Ñ €ômtô€ô…Ý…¥ÐÁ…É…µÌì(%É•ÑÕÉ¸€¼¨}}AUI}|€¨¼€ À°¥µÁ½ÉÑ}©Íá}ÉÕ¹Ñ¥µ•}É•…Ñ}Í•ÉÙ•È¹©Íà¤¡Q•Éµ¥¹…±A…”°ì($%±½…±”è±½…±•ÌÄ¹¥¹±Õ‘•Ì¡É…Ý1½…±”¤€üÉ…Ý1½…±”€è€‰•¸ˆ°($%Á…Ñ (%ô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½É½‰½ÑÌ¹ÑÌ)Ù…ÈÉ½‰½ÑÍ}•áÁ½ÉÑÌ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì‘•™…Õ±Ðè€ ¤€ôøÉ½‰½ÑÌô¤ì)™Õ¹Ñ¥½¸É½‰½ÑÌ ¤ì(%É•ÑÕÉ¸ì($%ÉÕ±•Ìèì($$%ÕÍ•É•¹Ðè€ˆ¨ˆ°($$%…±±½Üè€ˆ¼ˆ($%ô°($%Í¥Ñ•µ…Àè€‰¡ÑÑÁÌè¼½…±±¡¥¹…‰Õä¹É¼½Í¥Ñ•µ…À¹áµ°ˆ°($%¡½ÍÐè€‰¡ÑÑÁÌè¼½…±±¡¥¹…‰Õä¹É¼ˆ(%ôì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸…ÁÀ½Í¥Ñ•µ…À¹ÑÌ)Ù…ÈÍ¥Ñ•µ…Á}•áÁ½ÉÑÌ€ô€¼¨}}AUI}|€¨¼}}•áÁ½ÉÑ±°¡ì‘•™…Õ±Ðè€ ¤€ôøÍ¥Ñ•µ…Àô¤ì)Ù…È‰…Í”€ô€‰¡ÑÑÁÌè¼½…±±¡¥¹…‰Õä¹É¼ˆì)Ù…È±½…±•Ì€ôl($ˆˆ°($ˆ½•¸ˆ°($ˆ½‘”ˆ°($ˆ½™Èˆ°($ˆ½•Ìˆ°($ˆ½¥Ðˆ°($ˆ½Á°ˆ)tì)Ù…ÈÁ…•Ì€ôl($ˆˆ°($ˆ½ÁÉ½‘ÕÑÌˆ°($ˆ½…Ñ•½É¥•Ìˆ°($ˆ½ÅŒµÕ¥‘”ˆ°($ˆ½Í¡¥ÁÁ¥¹œµÕ¥‘”ˆ°($ˆ½…ÉÑ¥±•Ìˆ°($ˆ½™…Äˆ)tì)Ù…ÈÑÉÕÍÑA…•Ì€ôl($ˆ½µ•Ñ¡½‘½±½äˆ°($ˆ½…‰½ÕÐˆ°($ˆ½½¹Ñ…Ðˆ°($ˆ½ÁÉ¥Ù…äˆ°($ˆ½Ñ•ÉµÌˆ°($ˆ½…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”ˆ)tì)™Õ¹Ñ¥½¸Í¥Ñ•UÉ°¡±½…±”°Á…”¤ì(%¥˜€ …±½…±”€˜˜€…Á…”¤É•ÑÕÉ¸€‘í‰…Í•ô½€ì(%É•ÑÕÉ¸€‘í‰…Í•ô‘í±½…±•ô‘íÁ…•õ€ì)ô)™Õ¹Ñ¥½¸Í¥Ñ•µ…À ¤ì(%½¹ÍÐÉ½ÕÑ•Ì€ô±½…±•Ì¹™±…Ñ5…À ¡±½…±”¤€ôøÁ…•Ì¹µ…À ¡Á…”¤€ôø€¡ì($%ÕÉ°èÍ¥Ñ•UÉ°¡±½…±”°Á…”¤°($%¡…¹•É•ÅÕ•¹äèÁ…”€ôôô€ˆˆñðÁ…”€ôôô€ˆ½ÁÉ½‘ÕÑÌˆ€ü€‰Ý••­±äˆ€è€‰µ½¹Ñ¡±äˆ°($%ÁÉ¥½É¥ÑäèÁ…”€ôôô€ˆˆ€ü€Ä€èÁ…”€ôôô€ˆ½ÁÉ½‘ÕÑÌˆ€ü€¸ä€è€¸Ü(%ô¤¤¤ì(%½¹ÍÐ…ÉÑ¥±•Ì€ô±½…±•Ì¹™±…Ñ5…À ¡±½…±”¤€ôø•¹±¥Í¡ÉÑ¥±•Ì¹µ…À ¡…ÉÑ¥±”¤€ôø€¡ì($%ÕÉ°è€‘í‰…Í•ô‘í±½…±•ô½…ÉÑ¥±•Ì¼‘í…ÉÑ¥±”¹Í±Õõ€°($%±…ÍÑ5½‘¥™¥•è€¼¨}}AUI}|€¨¼¹•Ü…Ñ” ˆÈÀÈØ´Àà´ÄÈˆ¤°($%¡…¹•É•ÅÕ•¹äè€‰µ½¹Ñ¡±äˆ°($%ÁÉ¥½É¥Ñäè€¸à(%ô¤¤¤ì(%½¹ÍÐÑÉÕÍÐ€ôÑÉÕÍÑA…•Ì¹µ…À ¡Á…”¤€ôø€¡ì($%ÕÉ°è€‘í‰…Í•ô‘íÁ…•õ€°($%±…ÍÑ5½‘¥™¥•è€¼¨}}AUI}|€¨¼¹•Ü…Ñ” ˆÈÀÈØ´Àà´ÄÈˆ¤°($%¡…¹•É•ÅÕ•¹äè€‰å•…É±äˆ°($%ÁÉ¥½É¥Ñäè€¸Ð(%ô¤¤ì(%É•ÑÕÉ¸l($$¸¸¹É½ÕÑ•Ì°($$¸¸¹…ÉÑ¥±•Ì°($$¸¸¹ÑÉÕÍÐ(%tì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸pÁÙ¥ÉÑÕ…°éÙ¥¹•áÐµÉÍŒµ•¹ÑÉä)Ù…ÈÉ•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´€ôÉ•…Ñ•IÍI•¹‘•É•È¡É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´Ä¤ì)™Õ¹Ñ¥½¸}•ÑMMI½¹ÑMÑå±•Ì ¤ì(%É•ÑÕÉ¸l¸¸¹•ÑMMI½¹ÑMÑå±•ÌÄ ¤°€¸¸¹•ÑMMI½¹ÑMÑå±•Ì ¥tì)ô)™Õ¹Ñ¥½¸}•ÑMMI½¹ÑAÉ•±½…‘Ì ¤ì(%É•ÑÕÉ¸l¸¸¹•ÑMMI½¹ÑAÉ•±½…‘ÌÄ ¤°€¸¸¹•ÑMMI½¹ÑAÉ•±½…‘Ì ¥tì)ô)Ù…È}}¥ÍÉ•‰Õœ€ôÁÉ½•ÍÌ¹•¹Ø¹9aQ}AI%YQ}	U}!€ü½¹Í½±”¹‘•‰Õœ¹‰¥¹¡½¹Í½±”°€‰mÙ¥¹•áÑt%MHèˆ¤€èÙ½¥€Àì)Ù…È}}±…ÍÍ•‰Õœ€ôÁÉ½•ÍÌ¹•¹Ø¹Y%9aQ}	U}1MM%%Q%=8€ü™Õ¹Ñ¥½¸¡±…å½ÕÑ%°É•…Í½¸¤ì(%½¹Í½±”¹‘•‰Õœ ‰mÙ¥¹•áÑt1Lèˆ°±…å½ÕÑ%°É•…Í½¸¤ì)ô€èÙ½¥€Àì)™Õ¹Ñ¥½¸}}É•Í½±Ù•I½ÕÑ••Ñ¡…¡•5½‘”¡É½ÕÑ”¤ì(%É•ÑÕÉ¸É•Í½±Ù•ÁÁA…••Ñ¡…¡•5½‘”¡ì($%±…å½ÕÑÌèÉ½ÕÑ”¹±…å½ÕÑÌ°($%Á…”èÉ½ÕÑ”¹Á…”(%ô¤ì)ô)™Õ¹Ñ¥½¸}}Y%9aQ}1ML¡É½ÕÑ•%‘à¤ìÉ•ÑÕÉ¸€ ¡É½ÕÑ•%‘à¤€ôøì(€€€ÍÝ¥Ñ €¡É½ÕÑ•%‘à¤ì(€€€€€‘•™…Õ±ÐèÉ•ÑÕÉ¸¹Õ±°ì(€€€ô(€ô¤¡É½ÕÑ•%‘à¤ìô)™Õ¹Ñ¥½¸}}Y%9aQ}1MM}IM=9L¡É½ÕÑ•%‘à¤ì(%É•ÑÕÉ¸¹Õ±°ì)ô)Ù…ÈÉ½ÕÑ•Ì€ôl(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML À¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L À¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è¼ˆ°($$$‰Á…”ˆè€‰Á…”è¼ˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ¼ˆ°($%Á…ÑÑ•É¹A…ÉÑÌèmt°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÄÄ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèmt°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML Ä¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L Ä¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½…‰½ÕÐˆ°($$$‰Á…”ˆè€‰Á…”è½…‰½ÕÐˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½…‰½ÕÐˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰…‰½ÕÐ‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÄÀ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰…‰½ÕÐ‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML È¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L È¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”ˆ°($$$‰Á…”ˆè€‰Á…”è½…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”ˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”ˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌä°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰…™™¥±¥…Ñ”µ‘¥Í±½ÍÕÉ”‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML Ì¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L Ì¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½½¹•ÁÐµ„ˆ°($$$‰Á…”ˆè€‰Á…”è½½¹•ÁÐµ„ˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½½¹•ÁÐµ„ˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰½¹•ÁÐµ„‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌà°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰½¹•ÁÐµ„‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML Ð¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L Ð¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½½¹•ÁÐµˆˆ°($$$‰Á…”ˆè€‰Á…”è½½¹•ÁÐµˆˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½½¹•ÁÐµˆˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰½¹•ÁÐµˆ‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÜ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰½¹•ÁÐµˆ‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML Ô¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L Ô¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½½¹•ÁÐµŒˆ°($$$‰Á…”ˆè€‰Á…”è½½¹•ÁÐµŒˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½½¹•ÁÐµŒˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰½¹•ÁÐµŒ‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌØ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰½¹•ÁÐµŒ‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML Ø¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L Ø¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½½¹Ñ…Ðˆ°($$$‰Á…”ˆè€‰Á…”è½½¹Ñ…Ðˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½½¹Ñ…Ðˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰½¹Ñ…Ð‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÔ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰½¹Ñ…Ð‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML Ü¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L Ü¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½µ•Ñ¡½‘½±½äˆ°($$$‰Á…”ˆè€‰Á…”è½µ•Ñ¡½‘½±½äˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½µ•Ñ¡½‘½±½äˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰µ•Ñ¡½‘½±½ä‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÐ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰µ•Ñ¡½‘½±½ä‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML à¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L à¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½ÁÉ¥Ù…äˆ°($$$‰Á…”ˆè€‰Á…”è½ÁÉ¥Ù…äˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½ÁÉ¥Ù…äˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰ÁÉ¥Ù…ä‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÌ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰ÁÉ¥Ù…ä‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML ä¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L ä¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½Ñ•ÉµÌˆ°($$$‰Á…”ˆè€‰Á…”è½Ñ•ÉµÌˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½Ñ•ÉµÌˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl‰Ñ•ÉµÌ‰t°($%¥Íå¹…µ¥Œè™…±Í”°($%Á…É…µÌèmt°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÈ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰Ñ•ÉµÌ‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML ÄÀ¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L ÄÀ¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è¼éÉ½ÕÑ”¬ˆ°($$$‰Á…”ˆè€‰Á…”è¼éÉ½ÕÑ”¬ˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ¼éÉ½ÕÑ”¬ˆ°($%Á…ÑÑ•É¹A…ÉÑÌèlˆéÉ½ÕÑ”¬‰t°($%¥Íå¹…µ¥ŒèÑÉÕ”°($%Á…É…µÌèl‰É½ÕÑ”‰t°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌÄ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl‰l¸¸¹É½ÕÑ•t‰t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô°(%ì($%}}‰Õ¥±‘Q¥µ•±…ÍÍ¥™¥…Ñ¥½¹Ìè}}Y%9aQ}1ML ÄÄ¤°($%}}‰Õ¥±‘Q¥µ•I•…Í½¹Ìè}}±…ÍÍ•‰Õœ€ü}}Y%9aQ}1MM}IM=9L ÄÄ¤€è¹Õ±°°($%¥‘Ìèì($$$‰É½ÕÑ”ˆè€‰É½ÕÑ”è½½¹•ÁÐµŒ¼é±½…±”¼éÁ…Ñ ¨ˆ°($$$‰Á…”ˆè€‰Á…”è½½¹•ÁÐµŒ¼é±½…±”¼éÁ…Ñ ¨ˆ°($$$‰É½ÕÑ•!…¹‘±•Èˆè¹Õ±°°($$$‰É½½Ñ	½Õ¹‘…Éäˆè€‰É½½Ðµ‰½Õ¹‘…Éäè¼ˆ°($$$‰±…å½ÕÑÌˆèl‰±…å½ÕÐè¼‰t°($$$‰Ñ•µÁ±…Ñ•Ìˆèmt°($$$‰Í±½ÑÌˆèíô($%ô°($%Á…ÑÑ•É¸è€ˆ½½¹•ÁÐµŒ¼é±½…±”¼éÁ…Ñ ¨ˆ°($%Á…ÑÑ•É¹A…ÉÑÌèl($$$‰½¹•ÁÐµŒˆ°($$$ˆé±½…±”ˆ°($$$ˆéÁ…Ñ ¨ˆ($%t°($%¥Íå¹…µ¥ŒèÑÉÕ”°($%Á…É…µÌèl‰±½…±”ˆ°€‰Á…Ñ ‰t°($%É½½ÑA…É…µ9…µ•Ìèmt°($%Á…”èÁ…•}•áÁ½ÉÑÌ°($%É½ÕÑ•!…¹‘±•Èè¹Õ±°°($%±…å½ÕÑÌèm±…å½ÕÑ}•áÁ½ÉÑÍt°($%É½ÕÑ•M•µ•¹ÑÌèl($$$‰½¹•ÁÐµŒˆ°($$$‰m±½…±•tˆ°($$$‰ml¸¸¹Á…Ñ¡utˆ($%t°($%Ñ•µÁ±…Ñ•QÉ••A½Í¥Ñ¥½¹Ìèmt°($%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèlÁt°($%Ñ•µÁ±…Ñ•Ìèmt°($%•ÉÉ½ÉÌèm¹Õ±±t°($%•ÉÉ½ÉA…Ñ¡Ìèmt°($%•ÉÉ½ÉQÉ••A½Í¥Ñ¥½¹Ìèmt°($%Í±½ÑÌèíô°($%±½…‘¥¹œè¹Õ±°°($%•ÉÉ½Èè¹Õ±°°($%¹½Ñ½Õ¹è¹Õ±°°($%¹½Ñ½Õ¹‘Ìèm¹Õ±±t°($%™½É‰¥‘‘•¸è¹Õ±°°($%™½É‰¥‘‘•¹Ìèm¹Õ±±t°($%Õ¹…ÕÑ¡½É¥é•è¹Õ±°°($%Õ¹…ÕÑ¡½É¥é•‘Ìèm¹Õ±±t(%ô)tì)Ù…È}}É½ÕÑ•5…Ñ¡•È€ôÉ•…Ñ•ÁÁIÍI½ÕÑ•5…Ñ¡•È¡É½ÕÑ•Ì¤ì)Ù…Èµ•Ñ…‘…Ñ…I½ÕÑ•Ì€ômì(%ÑåÁ”è€‰É½‰½ÑÌˆ°(%¥Íå¹…µ¥ŒèÑÉÕ”°(%É½ÕÑ•AÉ•™¥àè€ˆˆ°(%É½ÕÑ•M•µ•¹ÑÌèmt°(%Í•ÉÙ•‘UÉ°è€ˆ½É½‰½ÑÌ¹ÑáÐˆ°(%½¹Ñ•¹ÑQåÁ”è€‰Ñ•áÐ½Á±…¥¸ˆ°(%½¹Ñ•¹Ñ!…Í è€ˆÌÕ‰‘ˆÁ•ŒÄÌÀÐå„Üˆ°(%µ½‘Õ±”èÉ½‰½ÑÍ}•áÁ½ÉÑÌ)ô°ì(%ÑåÁ”è€‰Í¥Ñ•µ…Àˆ°(%¥Íå¹…µ¥ŒèÑÉÕ”°(%É½ÕÑ•AÉ•™¥àè€ˆˆ°(%É½ÕÑ•M•µ•¹ÑÌèmt°(%Í•ÉÙ•‘UÉ°è€ˆ½Í¥Ñ•µ…À¹áµ°ˆ°(%½¹Ñ•¹ÑQåÁ”è€‰…ÁÁ±¥…Ñ¥½¸½áµ°ˆ°(%½¹Ñ•¹Ñ!…Í è€‰äÌÜá•˜á˜àÜäå”àÐˆ°(%µ½‘Õ±”èÍ¥Ñ•µ…Á}•áÁ½ÉÑÌ)õtì)Ù…ÈÉ½½Ñ9½Ñ½Õ¹‘5½‘Õ±”€ô¹Õ±°ì)Ù…ÈÉ½½Ñ½É‰¥‘‘•¹5½‘Õ±”€ô¹Õ±°ì)Ù…ÈÉ½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”€ô¹Õ±°ì)Ù…ÈÉ½½Ñ1…å½ÕÑÌ€ôm±…å½ÕÑ}•áÁ½ÉÑÍtì)Ù…ÈÉ•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È€ô€¡É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤€ôøÉ•…Ñ•ÁÁIÍ=¹ÉÉ½É!…¹‘±•È¡É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È°É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì)Ù…È}}™…±±‰…­I•¹‘•É•È€ôÉ•…Ñ•ÁÁ…±±‰…­I•¹‘•É•È¡ì(%É½½Ñ	½Õ¹‘…É¥•Ìèì($%É½½Ñ½É‰¥‘‘•¹5½‘Õ±”°($%É½½Ñ1…å½ÕÑÌ°($%É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”°($%É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”(%ô°(%±½‰…±ÉÉ½É5½‘Õ±”è¹Õ±°°(%µ•Ñ…‘…Ñ…I½ÕÑ•Ì°(%ÍÍÉ1½…‘•È ¤ì($%É•ÑÕÉ¸¥µÁ½ÉÐ ˆ¸½ÍÍÈ½¥¹‘•à¹©Ìˆ¤ì(%ô°(%™½¹ÑAÉ½Ù¥‘•ÉÌèì($%‰Õ¥±‘½¹Ñ1¥¹­!•…‘•Èè‰Õ¥±‘ÁÁA…•½¹Ñ1¥¹­!•…‘•È°($%•Ñ½¹Ñ1¥¹­Ìè•ÑMMI½¹Ñ1¥¹­Ì°($%•Ñ½¹ÑAÉ•±½…‘Ìè}•ÑMMI½¹ÑAÉ•±½…‘Ì°($%•Ñ½¹ÑMÑå±•Ìè}•ÑMMI½¹ÑMÑå±•Ì(%ô°(%µ…­•Q¡•¹…‰±•A…É…µÌ°(%Í…¹¥Ñ¥é•ÈèÍ…¹¥Ñ¥é•ÉÉ½É½É±¥•¹Ð°(%ÉÍI•¹‘•É•ÈèÉ•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´°(%•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°(%É•Í½±Ù•¡¥±‘M•µ•¹ÑÌèÉ•Í½±Ù•ÁÁA…•¡¥±‘M•µ•¹ÑÌ°(%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%±•…ÉÁÁI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%ô°(%É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($%É•ÑÕÉ¸É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì(%ô)ô¤ì)™Õ¹Ñ¥½¸µ…Ñ¡I½ÕÑ”¡ÕÉ°¤ì(%É•ÑÕÉ¸}}É½ÕÑ•5…Ñ¡•È¹µ…Ñ¡I½ÕÑ”¡ÕÉ°¤ì)ô(¼¨¨(¨¡•¬¥˜„Á…Ñ¡¹…µ”µ…Ñ¡•Ì…¹ä¥¹Ñ•É•ÁÑ¥¹œÉ½ÕÑ”¸(¨I•ÑÕÉ¹ÌÑ¡”µ…Ñ ¥¹™¼½È¹Õ±°¸(¨¼)™Õ¹Ñ¥½¸™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ”°Í½ÕÉ•A…Ñ¡¹…µ”€ô¹Õ±°¤ì(%É•ÑÕÉ¸}}É½ÕÑ•5…Ñ¡•È¹™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ”°Í½ÕÉ•A…Ñ¡¹…µ”¤ì)ô)…Íå¹Œ™Õ¹Ñ¥½¸‰Õ¥±‘A…•±•µ•¹ÑÌ¡É½ÕÑ”°Á…É…µÌ°É½ÕÑ•A…Ñ °Á…•I•ÅÕ•ÍÐ¤ì(%É•ÑÕÉ¸‰Õ¥±‘A…•±•µ•¹ÑÌÄ¡ì($%É½ÕÑ”°($%Á…É…µÌ°($%É½ÕÑ•A…Ñ °($%Á…•I•ÅÕ•ÍÐ°($%±½‰…±ÉÉ½É5½‘Õ±”è¹Õ±°°($%É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”è¹Õ±°°($%É½½Ñ½É‰¥‘‘•¹5½‘Õ±”è¹Õ±°°($%É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”è¹Õ±°°($%µ•Ñ…‘…Ñ…I½ÕÑ•Ì(%ô¤ì)ô)Ù…È}}‰…Í•A…Ñ €ô€ˆˆì)Ù…È}}ÑÉ…¥±¥¹M±…Í €ô™…±Í”ì)Ù…È}}¤Äá¹½¹™¥œ€ô¹Õ±°ì)Ù…È}}½¹™¥I•‘¥É•ÑÌ€ômtì)Ù…È}}½¹™¥I•ÝÉ¥Ñ•Ì€ôì($‰‰•™½É•¥±•Ìˆèmt°($‰…™Ñ•É¥±•Ìˆèmt°($‰™…±±‰…¬ˆèmt)ôì)Ù…È}}½¹™¥!•…‘•ÉÌ€ômtì)Ù…È}}ÁÕ‰±¥¥±•Ì€ô¹•ÜM•Ð¡l($ˆ½}¡•…‘•ÉÌˆ°($ˆ½…±±¡¥¹…‰Õä¹Á¹œˆ°($ˆ½™…Ù¥½¸¹ÍÙœˆ°($ˆ½™¥±”¹ÍÙœˆ°($ˆ½±½‰”¹ÍÙœˆ°($ˆ½Ý¥¹‘½Ü¹ÍÙœˆ)t¤ì)Ù…È}}…±±½Ý•‘=É¥¥¹Ì€ômtì)Ù…È}}•áÁ¥É•Q¥µ”€ô€ÌÄÔÌÙ”Ìì)Ù…È}}…±±½Ý•‘•Ù=É¥¥¹Ì€ômtì)Ù…È}}Í…™••Ù!½ÍÑÌ€ôl($‰±½…±¡½ÍÐˆ°($ˆÄÈÜ¸À¸À¸Äˆ°($‰lèèÅtˆ)tì)™Õ¹Ñ¥½¸}}™½É‰¥‘‘•¸ ¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í” ‰½É‰¥‘‘•¸ˆ°ì($%ÍÑ…ÑÕÌè€ÐÀÌ°($%¡•…‘•ÉÌèì€‰½¹Ñ•¹ÐµQåÁ”ˆè€‰Ñ•áÐ½Á±…¥¸ˆô(%ô¤ì)ô)™Õ¹Ñ¥½¸}}Ù…±¥‘…Ñ••ÙI•ÅÕ•ÍÑ=É¥¥¸¡É•ÅÕ•ÍÐ¤ì(%¥˜€¡É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰Í•Œµ™•Ñ µµ½‘”ˆ¤€ôôô€‰¹¼µ½ÉÌˆ€˜˜É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰Í•Œµ™•Ñ µÍ¥Ñ”ˆ¤€ôôô€‰É½ÍÌµÍ¥Ñ”ˆ¤ì($%½¹Í½±”¹Ý…É¸ ‰mÙ¥¹•áÑt	±½­•É½ÍÌµÍ¥Ñ”¹¼µ½ÉÌÉ•ÅÕ•ÍÐÑ¼€ˆ€¬¹•ÜUI0¡É•ÅÕ•ÍÐ¹ÕÉ°¤¹Á…Ñ¡¹…µ”¤ì($%É•ÑÕÉ¸}}™½É‰¥‘‘•¸ ¤ì(%ô(%½¹ÍÐ½É¥¥¸€ôÉ•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰½É¥¥¸ˆ¤ì(%¥˜€ …½É¥¥¸¤É•ÑÕÉ¸¹Õ±°ì(%¥˜€¡½É¥¥¸€ôôô€‰¹Õ±°ˆ¤ì($%¥˜€ …}}…±±½Ý•‘•Ù=É¥¥¹Ì¹¥¹±Õ‘•Ì ‰¹Õ±°ˆ¤¤ì($$%½¹Í½±”¹Ý…É¸ ‰mÙ¥¹•áÑt	±½­•É•ÅÕ•ÍÐÝ¥Ñ =É¥¥¸è¹Õ±°¸‘p‰¹Õ±±pˆÑ¼…±±½Ý•‘•Ù=É¥¥¹ÌÑ¼…±±½ÜÍ…¹‘‰½á•½¹Ñ•áÑÌ¸ˆ¤ì($$%É•ÑÕÉ¸}}™½É‰¥‘‘•¸ ¤ì($%ô($%É•ÑÕÉ¸¹Õ±°ì(%ô(%±•Ð½É¥¥¹!½ÍÑ¹…µ”ì(%ÑÉäì($%½É¥¥¹!½ÍÑ¹…µ”€ô¹•ÜUI0¡½É¥¥¸¤¹¡½ÍÑ¹…µ”¹Ñ½1½Ý•É…Í” ¤ì(%ô…Ñ ì($%É•ÑÕÉ¸}}™½É‰¥‘‘•¸ ¤ì(%ô(%¥˜€¡}}Í…™••Ù!½ÍÑÌ¹¥¹±Õ‘•Ì¡½É¥¥¹!½ÍÑ¹…µ”¤ñð½É¥¥¹!½ÍÑ¹…µ”¹•¹‘Í]¥Ñ  ˆ¹±½…±¡½ÍÐˆ¤¤É•ÑÕÉ¸¹Õ±°ì(%½¹ÍÐ¡½ÍÑ!•…‘•È€ô€¡É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰àµ™½ÉÝ…É‘•µ¡½ÍÐˆ¤ñðÉ•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¹•Ð ‰¡½ÍÐˆ¤ñð€ˆˆ¤¹ÍÁ±¥Ð ˆ°ˆ¥lÁt¹ÑÉ¥´ ¤¹ÍÁ±¥Ð ˆèˆ¥lÁt¹Ñ½1½Ý•É…Í” ¤ì(%¥˜€¡¡½ÍÑ!•…‘•È€˜˜½É¥¥¹!½ÍÑ¹…µ”€ôôô¡½ÍÑ!•…‘•È¤É•ÑÕÉ¸¹Õ±°ì(%™½È€¡½¹ÍÐÁ…ÑÑ•É¸½˜}}…±±½Ý•‘•Ù=É¥¥¹Ì¤¥˜€¡Á…ÑÑ•É¸¹ÍÑ…ÉÑÍ]¥Ñ  ˆ¨¸ˆ¤¤ì($%½¹ÍÐÍÕ™™¥à€ôÁ…ÑÑ•É¸¹Í±¥” Ä¤ì($%¥˜€¡½É¥¥¹!½ÍÑ¹…µ”€ôôôÁ…ÑÑ•É¸¹Í±¥” È¤ñð½É¥¥¹!½ÍÑ¹…µ”¹•¹‘Í]¥Ñ ¡ÍÕ™™¥à¤¤É•ÑÕÉ¸¹Õ±°ì(%ô•±Í”¥˜€¡½É¥¥¹!½ÍÑ¹…µ”€ôôôÁ…ÑÑ•É¸¤É•ÑÕÉ¸¹Õ±°ì(%½¹Í½±”¹Ý…É¸¡mÙ¥¹•áÑt	±½­•É½ÍÌµ½É¥¥¸É•ÅÕ•ÍÐ™É½´€ˆ‘í½É¥¥¹ôˆÑ¼€‘í¹•ÜUI0¡É•ÅÕ•ÍÐ¹ÕÉ°¤¹Á…Ñ¡¹…µ•ô¸Q¼…±±½ÜÑ¡¥Ì½É¥¥¸°…‘¥ÐÑ¼…±±½Ý•‘•Ù=É¥¥¹Ì¥¸¹•áÐ¹½¹™¥œ¹©Ì¹€¤ì(%É•ÑÕÉ¸}}™½É‰¥‘‘•¸ ¤ì)ô(¼¨¨(¨5…á¥µÕ´Í•ÉÙ•Èµ…Ñ¥½¸É•ÅÕ•ÍÐ‰½‘äÍ¥é”¸(¨½¹™¥ÕÉ…‰±”Ù¥„•áÁ•É¥µ•¹Ñ…°¹Í•ÉÙ•ÉÑ¥½¹Ì¹‰½‘åM¥é•1¥µ¥Ð¥¸¹•áÐ¹½¹™¥œ¸(¨•™…Õ±ÑÌÑ¼€Å5°µ…Ñ¡¥¹œÑ¡”9•áÐ¹©Ì‘•™…Õ±Ð¸(¨Í•”¡ÑÑÁÌè¼½¹•áÑ©Ì¹½Éœ½‘½Ì½…ÁÀ½…Á¤µÉ•™•É•¹”½½¹™¥œ½¹•áÐµ½¹™¥œµ©Ì½Í•ÉÙ•ÉÑ¥½¹Ì‰½‘åÍ¥é•±¥µ¥Ð(¨AÉ•Ù•¹ÑÌÕ¹‰½Õ¹‘•É•ÅÕ•ÍÐ‰½‘ä‰Õ™™•É¥¹œ¸(¨¼)Ù…È}}5a}Q%=9}	=e}M%i€ô€ÄÀÐàÔÜØì)Ù…È}Ù¥ÉÑÕ…±}Ù¥¹•áÑ}ÉÍ}•¹ÑÉå}‘•™…Õ±Ð€ôÉ•…Ñ•ÁÁIÍ!…¹‘±•È¡ì(%‰…Í•A…Ñ è}}‰…Í•A…Ñ °(%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($%±•…ÉÁÁI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì(%ô°(%½¹™¥!•…‘•ÉÌè}}½¹™¥!•…‘•ÉÌ°(%½¹™¥I•‘¥É•ÑÌè}}½¹™¥I•‘¥É•ÑÌ°(%½¹™¥I•ÝÉ¥Ñ•Ìè}}½¹™¥I•ÝÉ¥Ñ•Ì°(%‘¥ÍÁ…Ñ¡5…Ñ¡•‘A…”¡ì±•…¹A…Ñ¡¹…µ”°™½ÉµMÑ…Ñ”°¡…¹‘±•ÉMÑ…ÉÐ°¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È°¥ÍIÍI•ÅÕ•ÍÐ°µ¥‘‘±•Ý…É•½¹Ñ•áÐ°µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°Á…É…µÌ°É•ÅÕ•ÍÐ°É½ÕÑ”°ÍÉ¥ÁÑ9½¹”°Í•…É¡A…É…µÌ°É•¹‘•É5½‘”ô¤ì($%½¹ÍÐA…•½µÁ½¹•¹Ð€ôÉ½ÕÑ”¹Á…”ü¹‘•™…Õ±Ðì($%½¹ÍÐ}}Í•µ•¹Ñ½¹™¥œ€ôÉ•Í½±Ù•ÁÁA…•M•µ•¹Ñ½¹™¥œ¡ì($$%±…å½ÕÑÌèÉ½ÕÑ”¹±…å½ÕÑÌ°($$%Á…”èÉ½ÕÑ”¹Á…”($%ô¤ì($%½¹ÍÐ}}•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ€ôÉ•Í½±Ù•ÁÁA…••¹•É…Ñ•MÑ…Ñ¥A…É…µÍM½ÕÉ•Ì¡ì($$%±…å½ÕÑÌèÉ½ÕÑ”¹±…å½ÕÑÌ°($$%±…å½ÕÑQÉ••A½Í¥Ñ¥½¹ÌèÉ½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ì°($$%Á…”èÉ½ÕÑ”¹Á…”°($$%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ($%ô¤ì($%½¹ÍÐ}…Íå¹I½ÕÑ•A…É…µÌ€ôµ…­•Q¡•¹…‰±•A…É…µÌ¡Á…É…µÌ¤ì($%É•ÑÕÉ¸‘¥ÍÁ…Ñ¡ÁÁA…”¡ì($$%‰…Í•A…Ñ è}}‰…Í•A…Ñ °($$%‰Õ¥±‘A…•±•µ•¹Ð¡Ñ…É•ÑI½ÕÑ”°Ñ…É•ÑA…É…µÌ°Ñ…É•Ñ=ÁÑÌ°Ñ…É•ÑM•…É¡A…É…µÌ¤ì($$$%É•ÑÕÉ¸‰Õ¥±‘A…•±•µ•¹ÑÌ¡Ñ…É•ÑI½ÕÑ”°Ñ…É•ÑA…É…µÌ°±•…¹A…Ñ¡¹…µ”°ì($$$$%½ÁÑÌèÑ…É•Ñ=ÁÑÌ°($$$$%Í•…É¡A…É…µÌèÑ…É•ÑM•…É¡A…É…µÌ°($$$$%¥ÍIÍI•ÅÕ•ÍÐ°($$$$%É•ÅÕ•ÍÐ°($$$$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$$$%É•¹‘•É5½‘”($$$%ô¤ì($$%ô°($$%±•…¹A…Ñ¡¹…µ”°($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%±•…ÉÁÁI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%ô°($$%É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($$$%É•ÑÕÉ¸É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡É•ÅÕ•ÍÐ°Á…Ñ¡¹…µ”°É½ÕÑ•A…Ñ ¤ì($$%ô°($$%‘•‰Õ±…ÍÍ¥™¥…Ñ¥½¸è}}±…ÍÍ•‰Õœ°($$%‘å¹…µ¥½¹™¥œè}}Í•µ•¹Ñ½¹™¥œ¹‘å¹…µ¥½¹™¥œ°($$%‘å¹…µ¥A…É…µÍ½¹™¥œè}}Í•µ•¹Ñ½¹™¥œ¹‘å¹…µ¥A…É…µÍ½¹™¥œ°($$%™•Ñ¡…¡”è}}Í•µ•¹Ñ½¹™¥œ¹™•Ñ¡…¡”€üü¹Õ±°°($$%™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ”¤ì($$$%É•ÑÕÉ¸™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ”°¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ¤ì($$%ô°($$%•¹•É…Ñ•MÑ…Ñ¥A…É…µÌè}}•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ°($$%•Ñ½¹Ñ1¥¹­Ìè•ÑMMI½¹Ñ1¥¹­Ì°($$%•Ñ½¹ÑAÉ•±½…‘Ìè}•ÑMMI½¹ÑAÉ•±½…‘Ì°($$%•Ñ½¹ÑMÑå±•Ìè}•ÑMMI½¹ÑMÑå±•Ì°($$%•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°($$%•ÑM½ÕÉ•I½ÕÑ”¡Í½ÕÉ•I½ÕÑ•%¹‘•à¤ì($$$%É•ÑÕÉ¸É½ÕÑ•ÍmÍ½ÕÉ•I½ÕÑ•%¹‘•átì($$%ô°($$%¡…Í•¹•É…Ñ•MÑ…Ñ¥A…É…µÌè}}•¹•É…Ñ•MÑ…Ñ¥A…É…µÌ¹±•¹Ñ €ø€À°($$%¡…ÍA…••™…Õ±ÑáÁ½ÉÐè€„…A…•½µÁ½¹•¹Ð°($$%¡…ÍA…•5½‘Õ±”è€„…É½ÕÑ”¹Á…”°($$%¡…¹‘±•ÉMÑ…ÉÐ°($$%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°($$%•áÁ¥É•M•½¹‘Ìè}}•áÁ¥É•Q¥µ”°($$%™½ÉµMÑ…Ñ”°($$%¥ÍAÉ½É•ÍÍ¥Ù•Ñ¥½¹I•¹‘•È°($$%¥ÍAÉ½‘ÕÑ¥½¸èÑÉÕ”°($$%¥ÍIÍI•ÅÕ•ÍÐ°($$%¥ÍÉ•‰Õœè}}¥ÍÉ•‰Õœ°($$%¥ÍÉ•Ð°($$%¥ÍÉ!Ñµ±-•äè…ÁÁ%ÍÉ!Ñµ±-•ä°($$%¥ÍÉIÍ-•äè…ÁÁ%ÍÉIÍ-•ä°($$%¥ÍÉM•Ð°($$%±½…‘MÍÉ!…¹‘±•È ¤ì($$$%É•ÑÕÉ¸¥µÁ½ÉÐ ˆ¸½ÍÍÈ½¥¹‘•à¹©Ìˆ¤ì($$%ô°($$%µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$%Á…É…µÌ°($$%ÁÉ½‰•1…å½ÕÑÐ¡±¤¤ì($$$%½¹ÍÐ1…å½ÕÑ½µÀ€ôÉ½ÕÑ”¹±…å½ÕÑÍm±¥tü¹‘•™…Õ±Ðì($$$%¥˜€ …1…å½ÕÑ½µÀ¤É•ÑÕÉ¸¹Õ±°ì($$$%É•ÑÕÉ¸1…å½ÕÑ½µÀ¡ì($$$$%Á…É…µÌèµ…­•Q¡•¹…‰±•A…É…µÌ¡É•Í½±Ù•ÁÁA…•M•µ•¹ÑA…É…µÌ¡É½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ°É½ÕÑ”¹±…å½ÕÑQÉ••A½Í¥Ñ¥½¹Ìü¹m±¥t€üü€À°Á…É…µÌ¤¤°($$$$%¡¥±‘É•¸è¹Õ±°($$$%ô¤ì($$%ô°($$%ÁÉ½‰•A…” ¤ì($$$%¥˜€ …A…•½µÁ½¹•¹Ð¤É•ÑÕÉ¸¹Õ±°ì($$$%É•ÑÕÉ¸A…•½µÁ½¹•¹Ð¡ì($$$$%Á…É…µÌè}…Íå¹I½ÕÑ•A…É…µÌ°($$$$%Í•…É¡A…É…µÌèµ…­•Q¡•¹…‰±•A…É…µÌ¡½±±•ÑÁÁA…•M•…É¡A…É…µÌ¡Í•…É¡A…É…µÌ¤¹Í•…É¡A…É…µÍ=‰©•Ð¤($$$%ô¤ì($$%ô°($$%É•¹‘•ÉÉÉ½É	½Õ¹‘…ÉåA…”¡É•¹‘•ÉÉÈ¤ì($$$%É•ÑÕÉ¸}}™…±±‰…­I•¹‘•É•È¹É•¹‘•ÉÉÉ½É	½Õ¹‘…Éä¡É½ÕÑ”°É•¹‘•ÉÉÈ°¥ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐ°Á…É…µÌ°ÍÉ¥ÁÑ9½¹”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($$%ô°($$%É•¹‘•É!ÑÑÁ•ÍÍ…±±‰…­A…”¡ÍÑ…ÑÕÍ½‘”°½ÁÑÌ°ÕÉÉ•¹Ñ5¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($$$%É•ÑÕÉ¸}}™…±±‰…­I•¹‘•É•È¹É•¹‘•É!ÑÑÁ•ÍÍ…±±‰…¬¡É½ÕÑ”°ÍÑ…ÑÕÍ½‘”°¥ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐ°½ÁÑÌ°ÍÉ¥ÁÑ9½¹”°ÕÉÉ•¹Ñ5¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì($$%ô°($$%É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´°($$%É•ÅÕ•ÍÐ°($$%É•Ù…±¥‘…Ñ•M•½¹‘Ìè}}Í•µ•¹Ñ½¹™¥œ¹É•Ù…±¥‘…Ñ•M•½¹‘Ì°($$%É•Í½±Ù•I½ÕÑ••Ñ¡…¡•5½‘”¡Ñ…É•ÑI½ÕÑ”¤ì($$$%É•ÑÕÉ¸}}É•Í½±Ù•I½ÕÑ••Ñ¡…¡•5½‘”¡Ñ…É•ÑI½ÕÑ”¤ì($$%ô°($$%É½½Ñ½É‰¥‘‘•¹5½‘Õ±”°($$%É½½Ñ9½Ñ½Õ¹‘5½‘Õ±”°($$%É½½ÑU¹…ÕÑ¡½É¥é•‘5½‘Õ±”°($$%É½ÕÑ”°($$%ÉÕ¹]¥Ñ¡MÕÁÁÉ•ÍÍ•‘!½½­]…É¹¥¹œ¡ÁÉ½‰”¤ì($$$%É•ÑÕÉ¸ÍÕÁÁÉ•ÍÍ!½½­]…É¹¥¹±Ì¹ÉÕ¸¡ÑÉÕ”°ÁÉ½‰”¤ì($$%ô°($$%Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡­•ä°É•¹‘•É¸°•ÉÉ½É½¹Ñ•áÐ¤ì($$$%ÑÉ¥•É	…­É½Õ¹‘I••¹•É…Ñ¥½¸¡­•ä°É•¹‘•É¸°•ÉÉ½É½¹Ñ•áÐ¤ì($$%ô°($$%ÍÉ¥ÁÑ9½¹”°($$%Í•…É¡A…É…µÌ°($$%Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐèÍ•ÑÁÁ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°($$%É•¹‘•É5½‘”($%ô¤ì(%ô°(%‘¥ÍÁ…Ñ¡5…Ñ¡•‘I½ÕÑ•!…¹‘±•È¡ì±•…¹A…Ñ¡¹…µ”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ°Á…É…µÌ°É•ÅÕ•ÍÐ°É½ÕÑ”°Í•…É¡A…É…µÌô¤ì($%É•ÑÕÉ¸‘¥ÍÁ…Ñ¡ÁÁI½ÕÑ•!…¹‘±•È¡ì($$%‰…Í•A…Ñ è}}‰…Í•A…Ñ °($$%±•…¹A…Ñ¡¹…µ”°($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%±•…ÉÁÁI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%ô°($$%¤Äá¸è}}¤Äá¹½¹™¥œ°($$%¥ÍÉ•‰Õœè}}¥ÍÉ•‰Õœ°($$%¥ÍÉ•Ð°($$%¥ÍÉI½ÕÑ•-•äè…ÁÁ%ÍÉI½ÕÑ•-•ä°($$%¥ÍÉM•Ð°($$%µ¥‘‘±•Ý…É•½¹Ñ•áÐ°($$%µ¥‘‘±•Ý…É•I•ÅÕ•ÍÑ!•…‘•ÉÌèµ¥‘‘±•Ý…É•½¹Ñ•áÐ¹É•ÅÕ•ÍÑ!•…‘•ÉÌ°($$%Á…É…µÌ°($$%É•ÅÕ•ÍÐ°($$%É½ÕÑ”èì($$$%Á…ÑÑ•É¸èÉ½ÕÑ”¹Á…ÑÑ•É¸°($$$%É½ÕÑ•!…¹‘±•ÈèÉ½ÕÑ”¹É½ÕÑ•!…¹‘±•È°($$$%É½ÕÑ•M•µ•¹ÑÌèÉ½ÕÑ”¹É½ÕÑ•M•µ•¹ÑÌ($$%ô°($$%Í¡•‘Õ±•	…­É½Õ¹‘I••¹•É…Ñ¥½¸èÑÉ¥•É	…­É½Õ¹‘I••¹•É…Ñ¥½¸°($$%Í•…É¡A…É…µÌ($%ô¤ì(%ô°(%¡…¹‘±•AÉ½É•ÍÍ¥Ù•Ñ¥½¹I•ÅÕ•ÍÐ¡ì…Ñ¥½¹%°±•…¹A…Ñ¡¹…µ”°½¹Ñ•¹ÑQåÁ”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ°É•ÅÕ•ÍÐô¤ì($%É•ÑÕÉ¸¡…¹‘±•AÉ½É•ÍÍ¥Ù•M•ÉÙ•ÉÑ¥½¹I•ÅÕ•ÍÐ¡ì($$%…Ñ¥½¹%°($$%…±±½Ý•‘=É¥¥¹Ìè}}…±±½Ý•‘=É¥¥¹Ì°($$%±•…¹A…Ñ¡¹…µ”°($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%±•…ÉÁÁI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%ô°($$%½¹Ñ•¹ÑQåÁ”°($$%‘•½‘•Ñ¥½¸°($$%‘•½‘•½ÉµMÑ…Ñ”°($$%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì°($$%•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È°($$%µ…áÑ¥½¹	½‘åM¥é”è}}5a}Q%=9}	=e}M%i°($$%µ¥‘‘±•Ý…É•!•…‘•ÉÌèµ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ°($$%É•…‘½Éµ…Ñ…]¥Ñ¡1¥µ¥ÐèÉ•…‘Ñ¥½¹½Éµ…Ñ…]¥Ñ¡1¥µ¥Ð°($$%É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È°($$%É•ÅÕ•ÍÐ°($$%Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”($%ô¤ì(%ô°(%¡…¹‘±•M•ÉÙ•ÉÑ¥½¹I•ÅÕ•ÍÐ¡ì…Ñ¥½¹%°±•…¹A…Ñ¡¹…µ”°½¹Ñ•¹ÑQåÁ”°¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°¥ÍIÍI•ÅÕ•ÍÐ°µ¥‘‘±•Ý…É•½¹Ñ•áÐ°µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°É•ÅÕ•ÍÐ°Í•…É¡A…É…µÌô¤ì($%É•ÑÕÉ¸¡…¹‘±•M•ÉÙ•ÉÑ¥½¹IÍI•ÅÕ•ÍÐ¡ì($$%…Ñ¥½¹%°($$%…±±½Ý•‘=É¥¥¹Ìè}}…±±½Ý•‘=É¥¥¹Ì°($$%‰Õ¥±‘A…•±•µ•¹Ð¡ìÉ½ÕÑ”è…Ñ¥½¹I½ÕÑ”°Á…É…µÌè…Ñ¥½¹A…É…µÌ°±•…¹A…Ñ¡¹…µ”è…Ñ¥½¹±•…¹A…Ñ¡¹…µ”°¥¹Ñ•É•ÁÑ=ÁÑÌ°Í•…É¡A…É…µÌè…Ñ¥½¹M•…É¡A…É…µÌ°¥ÍIÍI•ÅÕ•ÍÐè…Ñ¥½¹%ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐè…Ñ¥½¹I•ÅÕ•ÍÐ°µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè…Ñ¥½¹5½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°É•¹‘•É5½‘”è…Ñ¥½¹I•¹‘•É5½‘”ô¤ì($$$%É•ÑÕÉ¸‰Õ¥±‘A…•±•µ•¹ÑÌ¡…Ñ¥½¹I½ÕÑ”°…Ñ¥½¹A…É…µÌ°…Ñ¥½¹±•…¹A…Ñ¡¹…µ”°ì($$$$%½ÁÑÌè¥¹Ñ•É•ÁÑ=ÁÑÌ°($$$$%Í•…É¡A…É…µÌè…Ñ¥½¹M•…É¡A…É…µÌ°($$$$%¥ÍIÍI•ÅÕ•ÍÐè…Ñ¥½¹%ÍIÍI•ÅÕ•ÍÐ°($$$$%É•ÅÕ•ÍÐè…Ñ¥½¹I•ÅÕ•ÍÐ°($$$$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•Èè…Ñ¥½¹5½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$$$%É•¹‘•É5½‘”è…Ñ¥½¹I•¹‘•É5½‘”($$$%ô¤ì($$%ô°($$%±•…¹A…Ñ¡¹…µ”°($$%±•…ÉI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$$%±•…ÉÁÁI•ÅÕ•ÍÑ½¹Ñ•áÐ ¤ì($$%ô°($$%½¹Ñ•¹ÑQåÁ”°($$%É•…Ñ•9½Ñ½Õ¹‘±•µ•¹Ð¡…Ñ¥½¹I½ÕÑ•%¤ì($$$%É•ÑÕÉ¸ì($$$$$¸¸¹ÁÁ±•µ•¹ÑÍ]¥É”¹É•…Ñ•5•Ñ…‘…Ñ…¹ÑÉ¥•Ì¡ì($$$$$%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐè¹Õ±°°($$$$$%É½½Ñ1…å½ÕÑQÉ••A…Ñ è¹Õ±°°($$$$$%É½ÕÑ•%è…Ñ¥½¹I½ÕÑ•%($$$$%ô¤°($$$$%m…Ñ¥½¹I½ÕÑ•%‘tè€ À°¥µÁ½ÉÑ}É•…Ñ}É•…Ñ}Í•ÉÙ•È¹É•…Ñ•±•µ•¹Ð¤ ‰‘¥Øˆ°¹Õ±°°€‰A…”¹½Ð™½Õ¹ˆ¤($$$%ôì($$%ô°($$%É•…Ñ•A…å±½…‘I½ÕÑ•%¡Á…Ñ¡¹…µ•Q½I•¹‘•È°ÕÉÉ•¹Ñ%¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ¤ì($$$%É•ÑÕÉ¸ÁÁ±•µ•¹ÑÍ]¥É”¹•¹½‘•I½ÕÑ•%¡Á…Ñ¡¹…µ•Q½I•¹‘•È°ÕÉÉ•¹Ñ%¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ¤ì($$%ô°($$%É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡…Ñ¥½¹I•ÅÕ•ÍÐ°…Ñ¥½¹A…Ñ¡¹…µ”°É½ÕÑ•A…ÑÑ•É¸¤ì($$$%É•ÑÕÉ¸É•…Ñ•IÍ=¹ÉÉ½É!…¹‘±•È¡…Ñ¥½¹I•ÅÕ•ÍÐ°…Ñ¥½¹A…Ñ¡¹…µ”°É½ÕÑ•A…ÑÑ•É¸¤ì($$%ô°($$%É•…Ñ•Q•µÁ½É…ÉåI•™•É•¹•M•Ð°($$%‘•½‘•I•Á±ä°($$%™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ•Q½5…Ñ ¤ì($$$%É•ÑÕÉ¸™¥¹‘%¹Ñ•É•ÁÐ¡Á…Ñ¡¹…µ•Q½5…Ñ °¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ¤ì($$%ô°($$%•Ñ¹‘±•…ÉA•¹‘¥¹½½­¥•Ì°($$%•ÑÉ…™Ñ5½‘•½½­¥•!•…‘•È°($$%•ÑI½ÕÑ•A…É…µ9…µ•Ì¡Í½ÕÉ•I½ÕÑ”¤ì($$$%É•ÑÕÉ¸Í½ÕÉ•I½ÕÑ”¹Á…É…µÌì($$%ô°($$%•ÑM½ÕÉ•I½ÕÑ”¡Í½ÕÉ•I½ÕÑ•%¹‘•à¤ì($$$%É•ÑÕÉ¸É½ÕÑ•ÍmÍ½ÕÉ•I½ÕÑ•%¹‘•átì($$%ô°($$%¥ÍIÍI•ÅÕ•ÍÐ°($$%±½…‘M•ÉÙ•ÉÑ¥½¸°($$%µ…Ñ¡I½ÕÑ”¡Á…Ñ¡¹…µ•Q½5…Ñ ¤ì($$$%É•ÑÕÉ¸µ…Ñ¡I½ÕÑ”¡Á…Ñ¡¹…µ•Q½5…Ñ ¤ì($$%ô°($$%µ…áÑ¥½¹	½‘åM¥é”è}}5a}Q%=9}	=e}M%i°($$%µ¥‘‘±•Ý…É•!•…‘•ÉÌèµ¥‘‘±•Ý…É•½¹Ñ•áÐ¹¡•…‘•ÉÌ°($$%µ¥‘‘±•Ý…É•MÑ…ÑÕÌèµ¥‘‘±•Ý…É•½¹Ñ•áÐ¹ÍÑ…ÑÕÌ°($$%µ½Õ¹Ñ•‘M±½ÑÍ!•…‘•È°($$%É•…‘	½‘å]¥Ñ¡1¥µ¥ÐèÉ•…‘Ñ¥½¹	½‘å]¥Ñ¡1¥µ¥Ð°($$%É•…‘½Éµ…Ñ…]¥Ñ¡1¥µ¥ÐèÉ•…‘Ñ¥½¹½Éµ…Ñ…]¥Ñ¡1¥µ¥Ð°($$%É•¹‘•ÉQ½I•…‘…‰±•MÑÉ•…´°($$%É•Á½ÉÑI•ÅÕ•ÍÑÉÉ½È°($$%É•ÅÕ•ÍÐ°($$%Í…¹¥Ñ¥é•ÉÉ½É½É±¥•¹Ð¡•ÉÉ½È¤ì($$$%É•ÑÕÉ¸Í…¹¥Ñ¥é•ÉÉ½É½É±¥•¹Ð¡•ÉÉ½È¤ì($$%ô°($$%Í•…É¡A…É…µÌ°($$%Í•Ñ!•…‘•ÉÍ•ÍÍA¡…Í”°($$%Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐèÍ•ÑÁÁ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°($$%Ñ½%¹Ñ•É•ÁÑ=ÁÑÌ¡¥¹Ñ•É•ÁÐ¤ì($$$%É•ÑÕÉ¸ì($$$$%¥¹Ñ•É•ÁÑ¥½¹½¹Ñ•áÐ°($$$$%¥¹Ñ•É•ÁÑ1…å½ÕÑÌè¥¹Ñ•É•ÁÐ¹¥¹Ñ•É•ÁÑ1…å½ÕÑÌ°($$$$%¥¹Ñ•É•ÁÑM±½Ñ-•äè¥¹Ñ•É•ÁÐ¹Í±½Ñ-•ä°($$$$%¥¹Ñ•É•ÁÑA…”è¥¹Ñ•É•ÁÐ¹Á…”°($$$$%¥¹Ñ•É•ÁÑA…É…µÌè¥¹Ñ•É•ÁÐ¹µ…Ñ¡•‘A…É…µÌ($$$%ôì($$%ô($%ô¤ì(%ô°(%¤Äá¹½¹™¥œè}}¤Äá¹½¹™¥œ°(%¥Í5¥‘‘±•Ý…É•AÉ½áäèÑÉÕ”°(%µ…­•Q¡•¹…‰±•A…É…µÌ°(%µ…Ñ¡I½ÕÑ”°(%µ•Ñ…‘…Ñ…I½ÕÑ•Ì°(%µ¥‘‘±•Ý…É•5½‘Õ±”èÁÉ½áå}•áÁ½ÉÑÌ°(%ÁÕ‰±¥¥±•Ìè}}ÁÕ‰±¥¥±•Ì°(%É•¹‘•É9½Ñ½Õ¹¡ì¥ÍIÍI•ÅÕ•ÍÐ°µ…Ñ¡•‘A…É…µÌ°µ¥‘‘±•Ý…É•½¹Ñ•áÐ°É•ÅÕ•ÍÐ°É½ÕÑ”°ÍÉ¥ÁÑ9½¹”ô¤ì($%É•ÑÕÉ¸}}™…±±‰…­I•¹‘•É•È¹É•¹‘•É9½Ñ½Õ¹¡É½ÕÑ”°¥ÍIÍI•ÅÕ•ÍÐ°É•ÅÕ•ÍÐ°µ…Ñ¡•‘A…É…µÌ°ÍÉ¥ÁÑ9½¹”°µ¥‘‘±•Ý…É•½¹Ñ•áÐ¤ì(%ô°(%É½½ÑA…É…µ9…µ•Í	åA…ÑÑ•É¸èíô°(%Í•Ñ9…Ù¥…Ñ¥½¹½¹Ñ•áÐèÍ•ÑÁÁ9…Ù¥…Ñ¥½¹½¹Ñ•áÐ°(%ÍÑ…Ñ¥A…É…µÍ5…Àèì($$ˆ¼éÉ½ÕÑ”¬ˆè¹Õ±°°($$ˆ½½¹•ÁÐµŒ¼é±½…±”¼éÁ…Ñ ¨ˆè¹Õ±°(%ô°(%ÑÉ…¥±¥¹M±…Í è}}ÑÉ…¥±¥¹M±…Í °(%Ù…±¥‘…Ñ••ÙI•ÅÕ•ÍÑ=É¥¥¸è}}Ù…±¥‘…Ñ••ÙI•ÅÕ•ÍÑ=É¥¥¸)ô¤ì(¼¼•¹‘É•¥½¸(¼¼É•¥½¸¹½‘•}µ½‘Õ±•Ì½Ù¥¹•áÐ½‘¥ÍÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ•Èµ•¹ÑÉä¹©Ì(¼¨¨(¨•™…Õ±Ð±½Õ‘™±…É”]½É­•È•¹ÑÉäÁ½¥¹Ð™½ÈÙ¥¹•áÐÁÀI½ÕÑ•È¸(¨(¨UÍ”Ñ¡¥Ì‘¥É•Ñ±ä¥¸ÝÉ…¹±•È¹©Í½¹Œè(¨€€€‰µ…¥¸ˆè€‰Ù¥¹•áÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ•Èµ•¹ÑÉäˆ(¨(¨=È¥µÁ½ÉÐ…¹‘•±•…Ñ”Ñ¼¥Ð™É½´„ÕÍÑ½´Ý½É­•Èè(¨€€¥µÁ½ÉÐ¡…¹‘±•È™É½´€‰Ù¥¹•áÐ½Í•ÉÙ•È½…ÁÀµÉ½ÕÑ•Èµ•¹ÑÉäˆì(¨€€É•ÑÕÉ¸¡…¹‘±•È¹™•Ñ ¡É•ÅÕ•ÍÐ°•¹Ø°Ñà¤ì(¨(¨Q¡¥Ì™¥±”ÉÕ¹Ì¥¸Ñ¡”IM•¹Ù¥É½¹µ•¹Ð¸½¹™¥ÕÉ”Ñ¡”±½Õ‘™±…É”Á±Õ¥¸Ý¥Ñ è(¨€€±½Õ‘™±…É”¡ìÙ¥Ñ•¹Ù¥É½¹µ•¹Ðèì¹…µ”è€‰ÉÍŒˆ°¡¥±‘¹Ù¥É½¹µ•¹ÑÌèl‰ÍÍÈ‰tôô¤(¨¼)Ù…È…ÁÁ}É½ÕÑ•É}•¹ÑÉå}‘•™…Õ±Ð€ôì…Íå¹Œ™•Ñ ¡É•ÅÕ•ÍÐ°•¹Ø°Ñà¤ì(%É•ÑÕÉ¸¡…¹‘±•I•ÅÕ•ÍÐ¡É•ÅÕ•ÍÐ°•¹Ø°Ñà¤ì)ôôì)…Íå¹Œ™Õ¹Ñ¥½¸¡…¹‘±•I•ÅÕ•ÍÐ¡É•ÅÕ•ÍÐ°•¹Ø°Ñà¤ì(%½¹ÍÐÕÉ°€ô¹•ÜUI0¡É•ÅÕ•ÍÐ¹ÕÉ°¤ì(%¥˜€¡¥Í=Á•¹I•‘¥É•ÑM¡…Á•¡ÕÉ°¹Á…Ñ¡¹…µ”¤¤É•ÑÕÉ¸¹½Ñ½Õ¹‘I•ÍÁ½¹Í” ¤ì(%ÑÉäì($%‘•½‘•UI%½µÁ½¹•¹Ð¡ÕÉ°¹Á…Ñ¡¹…µ”¤ì(%ô…Ñ ì($%É•ÑÕÉ¸‰…‘I•ÅÕ•ÍÑI•ÍÁ½¹Í” ¤ì(%ô(%ì($%½¹ÍÐ™¥±Ñ•É•‘!•…‘•ÉÌ€ô™¥±Ñ•É%¹Ñ•É¹…±!•…‘•ÉÌ¡É•ÅÕ•ÍÐ¹¡•…‘•ÉÌ¤ì($%É•ÅÕ•ÍÐ€ô±½¹•I•ÅÕ•ÍÑ]¥Ñ¡!•…‘•ÉÌ¡É•ÅÕ•ÍÐ°™¥±Ñ•É•‘!•…‘•ÉÌ¤ì(%ô(%½¹ÍÐ¡…¹‘±•¸€ô€ ¤€ôø}Ù¥ÉÑÕ…±}Ù¥¹•áÑ}ÉÍ}•¹ÑÉå}‘•™…Õ±Ð¡É•ÅÕ•ÍÐ°Ñà¤ì(%½¹ÍÐÉ•ÍÕ±Ð€ô…Ý…¥Ð€¡Ñà€üÉÕ¹]¥Ñ¡á•ÕÑ¥½¹½¹Ñ•áÐ¡Ñà°¡…¹‘±•¸¤€è¡…¹‘±•¸ ¤¤ì(%¥˜€¡É•ÍÕ±Ð¥¹ÍÑ…¹•½˜I•ÍÁ½¹Í”¤ì($%¥˜€¡•¹Øü¹MMQL¤ì($$%½¹ÍÐ…ÍÍ•Ñ•Ñ¡•È€ô•¹Ø¹MMQLì($$%½¹ÍÐ…ÍÍ•ÑI•ÍÁ½¹Í”€ô…Ý…¥ÐÉ•Í½±Ù•MÑ…Ñ¥ÍÍ•ÑM¥¹…°¡É•ÍÕ±Ð°ì™•Ñ¡ÍÍ•Ðè€¡Á…Ñ ¤€ôøAÉ½µ¥Í”¹É•Í½±Ù”¡…ÍÍ•Ñ•Ñ¡•È¹™•Ñ ¡¹•ÜI•ÅÕ•ÍÐ¡¹•ÜUI0¡Á…Ñ °É•ÅÕ•ÍÐ¹ÕÉ°¤¤¤¤ô¤ì($$%¥˜€¡…ÍÍ•ÑI•ÍÁ½¹Í”¤É•ÑÕÉ¸…ÍÍ•ÑI•ÍÁ½¹Í”ì($%ô($%É•ÑÕÉ¸É•ÍÕ±Ðì(%ô(%¥˜€¡É•ÍÕ±Ð€ôôô¹Õ±°ñðÉ•ÍÕ±Ð€ôôôÙ½¥€À¤É•ÑÕÉ¸¹½Ñ½Õ¹‘I•ÍÁ½¹Í” ¤ì(%É•ÑÕÉ¸¹•ÜI•ÍÁ½¹Í”¡MÑÉ¥¹œ¡É•ÍÕ±Ð¤°ìÍÑ…ÑÕÌè€ÈÀÀô¤ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸Ý½É­•È½¥¹‘•à¹ÑÌ(¼¨¨±½Õ‘™±…É”]½É­•È•¹ÑÉäÁ½¥¹Ð™½ÈÑ¡”Ù¥¹•áÐµÍÑ…ÉÑ•ÈÑ•µÁ±…Ñ”¸€¨¼)Ù…ÈÍ•ÕÉ¥Ñå!•…‘•ÉÌ€ôì($‰MÑÉ¥ÐµQÉ…¹ÍÁ½ÉÐµM•ÕÉ¥Ñäˆè€‰µ…àµ…”ôÌÄÔÌØÀÀÀì¥¹±Õ‘•MÕ‰½µ…¥¹Ìˆ°($‰`µ½¹Ñ•¹ÐµQåÁ”µ=ÁÑ¥½¹Ìˆè€‰¹½Í¹¥™˜ˆ°($‰I•™•ÉÉ•ÈµA½±¥äˆè€‰ÍÑÉ¥Ðµ½É¥¥¸µÝ¡•¸µÉ½ÍÌµ½É¥¥¸ˆ°($‰A•Éµ¥ÍÍ¥½¹ÌµA½±¥äˆè€‰…µ•É„ô ¤°µ¥É½Á¡½¹”ô ¤°•½±½…Ñ¥½¸ô ¤ˆ°($‰½¹Ñ•¹ÐµM•ÕÉ¥ÑäµA½±¥äˆè€‰‘•™…Õ±ÐµÍÉŒ€Í•±˜œìÍÉ¥ÁÐµÍÉŒ€Í•±˜œ€Õ¹Í…™”µ¥¹±¥¹”œìÍÑå±”µÍÉŒ€Í•±˜œ€Õ¹Í…™”µ¥¹±¥¹”œì¥µœµÍÉŒ€Í•±˜œ¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´‘…Ñ„èì™½¹ÐµÍÉŒ€Í•±˜œ‘…Ñ„èì½¹¹•ÐµÍÉŒ€Í•±˜œì™½É´µ…Ñ¥½¸€Í•±˜œ¡ÑÑÁÌè¼½ÝÝÜ¹¹‰Õå¡„¹½´ì™É…µ”µ…¹•ÍÑ½ÉÌ€¹½¹”œì‰…Í”µÕÉ¤€Í•±˜œì½‰©•ÐµÍÉŒ€¹½¹”œìÕÁÉ…‘”µ¥¹Í•ÕÉ”µÉ•ÅÕ•ÍÑÌˆ)ôì)™Õ¹Ñ¥½¸Í•ÕÉ”¡É•ÍÁ½¹Í”¤ì(%½¹ÍÐÍ•ÕÉ•€ô¹•ÜI•ÍÁ½¹Í”¡É•ÍÁ½¹Í”¹‰½‘ä°É•ÍÁ½¹Í”¤ì(%™½È€¡½¹ÍÐm¹…µ”°Ù…±Õ•t½˜=‰©•Ð¹•¹ÑÉ¥•Ì¡Í•ÕÉ¥Ñå!•…‘•ÉÌ¤¤Í•ÕÉ•¹¡•…‘•ÉÌ¹Í•Ð¡¹…µ”°Ù…±Õ”¤ì(%É•ÑÕÉ¸Í•ÕÉ•ì)ô(¼¼•¹‘É•¥½¸(¼¼É•¥½¸pÁÙ¥ÉÑÕ…°é±½Õ‘™±…É”½Ý½É­•Èµ•¹ÑÉä)Ù…ÈÝ½É­•É}•¹ÑÉå}‘•™…Õ±Ð€ôì…Íå¹Œ™•Ñ ¡É•ÅÕ•ÍÐ°•¹Ø°Ñà¤ì(%¥˜€¡¹•ÜUI0¡É•ÅÕ•ÍÐ¹ÕÉ°¤¹Á…Ñ¡¹…µ”€ôôô€ˆ½}Ù¥¹•áÐ½¥µ…”ˆ¤É•ÑÕÉ¸Í•ÕÉ”¡…Ý…¥Ð¡…¹‘±•%µ…•=ÁÑ¥µ¥é…Ñ¥½¸¡É•ÅÕ•ÍÐ°ì($%™•Ñ¡ÍÍ•Ðè€¡Á…Ñ ¤€ôø•¹Ø¹MMQL¹™•Ñ ¡¹•ÜI•ÅÕ•ÍÐ¡¹•ÜUI0¡Á…Ñ °É•ÅÕ•ÍÐ¹ÕÉ°¤¤¤°($%ÑÉ…¹Í™½Éµ%µ…”è…Íå¹Œ€¡‰½‘ä°ìÝ¥‘Ñ °™½Éµ…Ð°ÅÕ…±¥Ñäô¤€ôøì($$%É•ÑÕÉ¸€¡…Ý…¥Ð•¹Ø¹%5L¹¥¹ÁÕÐ¡‰½‘ä¤¹ÑÉ…¹Í™½É´¡Ý¥‘Ñ €ø€À€üìÝ¥‘Ñ ô€èíô¤¹½ÕÑÁÕÐ¡ì($$$%™½Éµ…Ð°($$$%ÅÕ…±¥Ñä($$%ô¤¤¹É•ÍÁ½¹Í” ¤ì($%ô(%ô°l¸¸¹U1Q}Y%}M%iL°€¸¸¹U1Q}%5}M%iMt¤¤ì(%É•ÑÕÉ¸Í•ÕÉ”¡…Ý…¥Ð…ÁÁ}É½ÕÑ•É}•¹ÑÉå}‘•™…Õ±Ð¹™•Ñ ¡É•ÅÕ•ÍÐ°•¹Ø°Ñà¤¤ì)ôôì(¼¼•¹‘É•¥½¸)•áÁ½ÉÐìÝ½É­•É}•¹ÑÉå}‘•™…Õ±Ð…Ì‘•™…Õ±Ðôì(