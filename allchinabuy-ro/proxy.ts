import { NextRequest, NextResponse } from "next/server";

const supportedLocales = new Set(["en", "de", "fr", "es", "it", "pl", "ro"]);

export function proxy(request: NextRequest) {
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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|allchinabuy.png|robots.txt|sitemap.xml).*)"],
};
