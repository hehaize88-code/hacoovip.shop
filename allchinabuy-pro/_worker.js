const canonicalHost = "allchinabuy.pro";

const canonicalRedirect = {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === `www.${canonicalHost}` || (url.hostname === canonicalHost && url.protocol === "http:")) {
      url.hostname = canonicalHost;
      url.protocol = "https:";
      return Response.redirect(url.href, 308);
    }
    return env.ASSETS.fetch(request);
  },
};

export default canonicalRedirect;
