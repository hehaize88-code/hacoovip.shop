export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    const shouldRedirectHost =
      host === "www.sugargoovip.uk" ||
      host === "sugargoovip-uk.pages.dev";

    if (shouldRedirectHost || url.protocol !== "https:") {
      url.protocol = "https:";
      url.hostname = "sugargoovip.uk";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
