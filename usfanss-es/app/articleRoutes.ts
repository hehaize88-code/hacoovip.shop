export const coreArticleSlugs = ["usfans-index-guide", "qc-photos-guide", "shipping-cost-guide", "usfans-spain-address-checklist"];
export const octoberSlugs = ["usfans-comisiones-coste-total", "usfans-guia-tallas", "usfans-rehearsal-peso-volumetrico", "usfans-link-no-funciona"];
export const spanishOnlyArticleSlugs = ["que-es-usfans-como-funciona", "usfans-ropa-guia", "usfans-opiniones-fiabilidad", "usfans-canarias-envios", "spanish-line-packet-usfans", "usfans-tiempos-envio-tracking", "usfans-devoluciones-almacen"];
export const articleSlugs = [...coreArticleSlugs,...spanishOnlyArticleSlugs,...octoberSlugs];

export const articleLanguages = (slug: string): string[] => spanishOnlyArticleSlugs.includes(slug) ? ["es"] : octoberSlugs.includes(slug) ? ["es","en"] : ["es","en","fr","de","it","pl","pt","zh"];
