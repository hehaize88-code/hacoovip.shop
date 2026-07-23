const LOGO_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAIYAAAAwCAYAAADU6gL5AAAACXBIWXMAAA7EAAAOxAGVKw4bAAALlElEQVR4nO2be5BcVRHGf9+dSWADwRA2czcoSiCAID7wiQGFCCiUKBblq7AKC5QkO7NUQC0R34qP8oUgmVmMokEotXxi+UTURARNRFHAaKIEkBgys7sR8tol2Z3b/nGTmblzz5ldRDYh3q9qa+/t06e770zfPt19zkCGDBkyZMiQIUOGDBkyZMiQIcOTA9rTBuztsLB0BeL96QFbrlrlFXvEqElAfqKMVug9HXQGAXMwPQ1xGPC0JoO9XbXKdU+UoXsOdqLz/RG37QlrJgvjOoYVek9HwVLEnAYx+TmNULfzNVj5joXvOgBtexbRlE0auGbdE2PyZEMvdZLr/HbSTZlEBJ0GrVD8FEFwS8IpUkz2ptgpSp9AI9sgt4ogutfC4j8s7Hv2E2H0ZMFmLToBcYBzcGzsd5Nu0CTC6xjWUywT6N0dZ5v9QrXKDy0sXom4PDEmzQW71WYVe/535k4ycrl5TrrZX/Tw0s2Tbs8kwukYFvZeDCpOYP5PrNB7BNKlzlExg4APP14j9xiMkz0j+3S0wJVjWNg3B9mnOsy5GaMfaTMjj97N/l3zwTqwy/fhxvq4tItwR5zYyp7TNjgKWo7GblL1i3/1yggXFUBHYAxjGsaCYeo7t+vhpZvtoLfNZOr+h5PXQY0JY/WtsOPvGvrK1k62Idz5he3biSeuctXC4o1Ib3Fym31Dtcp5CdKs4snk9BuvBk9ZZ90XTifX9VnEgglZavyegDdqY/mfaZt7L0fBJyYkJznzj6BrVC1fn7ZvwWzyUx5yThu148gHJ4CdDhwNzEWEmP0DdAemr2lgyc1OjWHxJlAOGAa2YwwTMEwU3aiB/rsTvIXiuQQ8JyWkbqs02P9TCxcdD8HZwAimkfi/jZCzEUZz67RpyRqnDYW+kwiYkhqIop0aqPyW9ohh3X2HIvM5xQaCsbe3kzVYuc3C0kOIQ53zxPdSomaXnkFkv0DMdc5xy3kxxq02e8Gx2rh0ODkYuHOB8YW+AFhmYekY1crvTQzlc/5Il+cHyI5Ki9NRwFHIzrOw+CXVKgmnt4MXPB3pnLbnihEF30zL40OgtGOIRfH/oAv0yYQcFP/l7VvAm9qnWk/fqWDLnc8lfRLiaiuZY+RtoXNCrO/L6S9ktzb6PPTfq1pZkiAVFocYt8XJ6WPG07F8OiH2hfyJQlxu3X1Jx7YOzhY7wDgydZGFxdckaFPzvqVpu4bKdyZIMy8+CDmcIh6Nc5zqfn/x66fgnmof88z4J7WpV+y+STqG8SqvIgtS4bZhw0D5+4zqWIyvgg1h3A5WUq38kjTz2A2JxlhSyQNgv8bsPq8dKPFhW3fpaOAQP/8EkePUpBo76XHLFOe2EXwyV6Xtqfsqom27lxzx+ZF4+XIi5Rg2q3gmwmdDUXx+ZPdN0DLpQET6i4zxV9WW3O8Zw8K+15K3edSmllStzFKtfDJ1vmY9pU9bofjOBJ84wykkoqhqZY6qlVNVqxyJ2U1uZXZk4j5vnZaRFdTtBKpTp2FdB4J9x8upaGZDxewF00Av8vIaV8VhWvMB7wuDtS2vvsgmuz1Fy+F7rpVtMu/xKE9HjJw+7pH5XVXLP2klNHOMnJ3i3ToxG6c8i85GuoiendcZpTsxm94It4Fe3XyI6B1uHbZMA5X+JEk/R7yus17AmOcWaStVq8xv3NfAekofBl7vlqNHG9djU15IzqvwAtUqy1oIKywsneHOsdSwzGYvmIbxQqfIuuPzNZ3kfC61lcqR7iJoj0wA6k6IK/S+Dni+43mGGY0Wt1ObS4kFz3UaDWD2B+8YgHRKy93zE2vw9jhM2iGLngoJvibq9pW0TPbzaBtsY3S/WXWVUrSdtsUjE6DauAoid7g1fqRqwil2Dzzo5JdtaFyPTXE7BcDofmnHkJ3o5E214s2bZ1hhcdiUpyvcTHqfNl27oZ3ckmPY8T4FBHanbyj+wjnaPcgqbS1vAmBK4F5CsCEN9qfLXXlkinsbM2dcMgPxLIfeh9qTOQDyHOZ7DupRy1rtSzxtqcemg93sau4X+Z1ttR656pEEqbv3BaBpTv6dlsxHjLudfACqF4h3iN+MlP5+jbtUK1/lmtqafPr3NeqBt7nElNx53jHZz1ru5jt5zNNFNEf9HtP/1tS90/1WwQq3PQ4nAjDbqqH+tS18HseY9is3Xcd4bF3dwuOrnNLPnwt8CeIabe5/OKF5sHIvmLta3J1niI945Hmr0KZjSLN9TBqsbPONgb3NPxS1JHsOjwUQf0xN49Iub/Yc2S2Na1+CJm9OdJqbrEZdbz0LjwNmpnnsT6p9dnuKGpZ8CTtEo81EUZ6KxLV9L3P3UMy7o7vaTbaChaULnRHd7IuqldPV0C605BjmW9Ox6Qu6nfR4T8X9tsDNql3bsv7ZcW7hWpuihTte67OFfP3Xzbkex4j4e0pNXGmc5RZqP2pe5n3VwL1Oqpkj8QPM7tbQ0o00S2qHswGjSn853j0aczuGyV2ZiMMQH3TYNsCOqe9x64jRGjG8eTgH5D9nM4uN9dl6Fh1uPcV3o+AL3jl1Gi1qm3HJDND+Tj6LHk3R5N3VvT7ZZJN7KQlsR9qefBFxkJN/ZMd3W+48/QOiFKn7wukEXOQ2Vd9uXHYoqdvb1jZr4VHe6K26LxLe5ZF+GfCMFNnsne15TTtaIobnjYgVnM9UPWg9xTUWlu6D3P2gThttN2iwfGsnxU3ROrNhQlh6s4XFL7vLKgA+0+AtXPxc71mJKEhEBgtLZxPoo26R9m1tue7fTXt8vQa9wg5e8JQELd9VBnkSz+jrzWue59Ydv2SN60OKx5LLe/o3bPFvJMpXmbii1AoN9N/os2c3WvdKVnVMQGMDjpnAKdF/sWP04sSsR656xMLiVqTpaZFaaD2lhRj3IJ7doZdytWqVlrU08je2Ai6zntI5YIOYjvTu4wBQbxwLsOmlQ4BnehhnMTX/L+spfg+0PT7yxwke3us10N/s3voqrNjYO6ynuBrjYH8LHJBnGQEYtrs8r0gaY9GiibA1I8aYPjdB0X6YbcbqZzkPsajDDiwQO4VPLrerVrkkyT9uy/qZoJd1dgquTLyF07wt6106dSDofKAX5HYKs41E+cuSNHnzt7gRpVM6OkWMlb4BbS1vwmzjOPPB+Fii+uqAhmNo05I1GO4DNxOCPYDprGTC2YKx6B2YdT7/4MbN0OXaw3l8G2dmv0SjH0gSI98ml3v7PY0RsHM1cHUtQZU5t78fEyKNd8bU0xrfBbP7qG33tcRTSGyixc0Ou2BC3tfUuBazS1StzNFA2ds611D/WiJejjGxQ8Jmy4l0pqrlM9vLRCssDpGO8Mw7D8Pf4TS2YNF7Vaucntot9pXI0lvA1o9j8HqM16jWn36zo9yVmKW6i212b8Xwl/7RiDdixDZ2aHQBRLpALEsn+h6kTnDtavkui38uwFy066cCptnItmLagNiAaT11W6OhircrmpI9WPkzMNfC3hNBZwPzEMGujH8D0n1g92PRH7yRB4AxX+WwRbXKNyzsWwnRWZiOAZsD1BHrMP2GYPQW7/EB9GOw9ibWsKrlFVZY/CKC0RLoZWAtiZCGiPiBBio3eJ974Jp11n3hseT378U4DXR83C21BzCtw1hNNHa1hpZutJ7i+Y7nWj/uaTPTo/78zyoarEysGNht82Nh3ltgPcXPgN7lGPmZqhVPr2LfgoWllyB1YRyK7JXAW92M3KNaebz8JYUJ/+Bor4Jv5zHSPn9ItwGxEqzzq222GYJzOnB48aRzDOMNOcB3VuL/wjGsUBz/KKPZNqJovgYr3nM0ndDxB0d7JQqFFyOPQ497bmRfgafj28QaLHeyBq/903+r4UkXMcDmOeOncU/nzb59CIG91LOGPAh8WtVy+fGqePI5RuDZvnYdj9tnoePjNgHrQQ8iWwssV7Vyx562LEOGDBkyZMiQIUOGDBkyZMiQIUOGvQL/AaxaNgP69VMsAAAAAElFTkSuQmCC";

const WORDMARK_STYLE = `<style id="oopbuy-wordmark-logo">
.brand {
  width: 134px !important;
  min-width: 134px !important;
  height: 48px !important;
  color: transparent !important;
  font-size: 0 !important;
  letter-spacing: 0 !important;
  overflow: hidden;
  background: url("/images/oopbuy.png") no-repeat left center / 134px 48px;
}
.brand span,
.brand i {
  display: none !important;
}
.footer-brand {
  display: inline-flex;
}
@media (max-width: 760px) {
  .brand {
    width: 112px !important;
    min-width: 112px !important;
    height: 40px !important;
    background-size: 112px 40px;
  }
}
</style>`;

function logoResponse() {
  const bytes = Uint8Array.from(atob(LOGO_BASE64), (character) =>
    character.charCodeAt(0),
  );

  return new Response(bytes, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.oopbuys.pro") {
      url.hostname = "oopbuys.pro";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/images/oopbuy.png") {
      return logoResponse();
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("Content-Type") || "";

    if (
      request.method !== "GET" ||
      !contentType.toLowerCase().includes("text/html")
    ) {
      return response;
    }

    const html = await response.text();
    if (!html.includes("</head>") || html.includes('id="oopbuy-wordmark-logo"')) {
      return new Response(html, response);
    }

    const headers = new Headers(response.headers);
    headers.delete("Content-Length");

    return new Response(html.replace("</head>", `${WORDMARK_STYLE}</head>`), {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
