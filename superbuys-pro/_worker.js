export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.superbuys.pro") {
      url.hostname = "superbuys.pro";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
