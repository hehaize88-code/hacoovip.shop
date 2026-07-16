export function withTrailingSlash(pathname = "/") {
  if (pathname === "/" || pathname.endsWith("/")) return pathname;
  return `${pathname}/`;
}

export function getCyclicRelated(items, currentSlug, count = 3) {
  if (!Array.isArray(items) || items.length < 2) return [];
  const currentIndex = Math.max(0, items.findIndex((item) => item.slug === currentSlug));
  const maximum = Math.min(count, items.length - 1);
  return Array.from({ length: maximum }, (_, offset) => items[(currentIndex + offset + 1) % items.length]);
}
