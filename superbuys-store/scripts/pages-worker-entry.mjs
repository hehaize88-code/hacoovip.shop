import app from "../dist/server/index.js";

const STATIC_SEO_PATHS = new Set(["/robots.txt", "/sitemap.xml"]);

export default {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);

    if (STATIC_SEO_PATHS.has(pathname)) {
      return env.ASSETS.fetch(request);
    }

    return app.fetch(request, env, context);
  },
};
