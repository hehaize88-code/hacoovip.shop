export const coreArticleSlugs = ["usfans-index-guide", "qc-photos-guide", "shipping-cost-guide", "usfans-spain-address-checklist"];
export const octoberSlugs = ["usfans-comisiones-coste-total", "usfans-guia-tallas", "usfans-rehearsal-peso-volumetrico", "usfans-link-no-funciona"];
export const growthArticleSlugs = ["que-es-usfans-como-funciona", "usfans-ropa-guia", "usfans-opiniones-fiabilidad", "usfans-canarias-envios", "spanish-line-packet-usfans", "usfans-tiempos-envio-tracking", "usfans-devoluciones-almacen"];
export const articleSlugs = [...coreArticleSlugs,...growthArticleSlugs,...octoberSlugs];

export const supportedArticleLanguages = ["es", "en", "fr", "de", "it", "pl", "pt", "zh"] as const;
export const articleLanguages = (slug: string): readonly string[] => articleSlugs.includes(slug) ? supportedArticleLanguages : [];
