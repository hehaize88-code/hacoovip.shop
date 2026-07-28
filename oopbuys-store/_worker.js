export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.oopbuys.store") {
      url.protocol = "https:";
      url.hostname = "oopbuys.store";
      url.port = "";
      return new Response(null, {
        status: 301,
        headers: {
          "Cache-Control": "public, max-age=3600",
          Location: url.toString(),
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
