import { C as __toESM, y as require_react } from "../index.js";
//#region app/engagement-tracking.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function EngagementTracking() {
	(0, import_react.useEffect)(() => {
		const send = (event, fields) => {
			window.gtag?.("event", event, {
				site_language: document.documentElement.lang,
				...fields
			});
		};
		const onClick = (event) => {
			const anchor = event.target instanceof Element ? event.target.closest("a") : null;
			if (!anchor) return;
			const url = new URL(anchor.href, window.location.href);
			if (url.hostname === "cnfanshp.com") {
				send("catalogue_click", {
					destination_path: url.pathname,
					link_type: /^\/AllProducts\/\d+\.html$/.test(url.pathname) ? "product" : /^\/(AllProducts\/?)?$/.test(url.pathname) ? "catalogue" : "category",
					source_article: anchor.closest("[data-article-slug]")?.getAttribute("data-article-slug") || ""
				});
				return;
			}
			if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
			const homeAction = anchor.dataset.homeAction;
			if (homeAction) send("home_action", {
				action: homeAction,
				destination_path: url.pathname
			});
			const article = url.pathname.match(/^\/(?:en\/|de\/|fr\/|es\/|it\/|pl\/)?articles\/([^/]+)\/?$/);
			if (article) send("guide_click", { article_slug: article[1] });
		};
		const onSubmit = (event) => {
			if (!(event.target instanceof HTMLFormElement)) return;
			const url = new URL(event.target.action, window.location.href);
			if (url.hostname === "cnfanshp.com" && url.pathname === "/search.html") send("catalogue_search", { destination_path: url.pathname });
		};
		document.addEventListener("click", onClick);
		document.addEventListener("submit", onSubmit);
		return () => {
			document.removeEventListener("click", onClick);
			document.removeEventListener("submit", onSubmit);
		};
	}, []);
	return null;
}
//#endregion
export { EngagementTracking };
