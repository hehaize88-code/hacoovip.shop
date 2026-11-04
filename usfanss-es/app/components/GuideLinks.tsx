"use client";
import { useLanguage } from './LanguageProvider';
import { getArticle } from '../articleRegistry';
import { novemberCopy, topicSlugs } from '../novemberCopy';

export function NextGuides({ slugs }: { slugs: string[] }) {
  const { lang, withLang } = useLanguage();
  return <section className="next-guides"><h2>{novemberCopy[lang].next}</h2><div>{slugs.map(slug => {
    const entry = getArticle(lang, slug);
    return entry ? <a href={withLang(`/articles/${slug}/`)} key={slug}><strong>{entry.card[1]} →</strong><span>{entry.card[2]}</span></a> : null;
  })}</div></section>;
}

export function GuideTopics({ expanded = false }: { expanded?: boolean }) {
  const { lang, withLang } = useLanguage();
  return <nav className={expanded ? 'guide-topics expanded' : 'guide-topics'} aria-label={novemberCopy[lang].articles[0]}>{topicSlugs.map((slugs, index) => <div key={index}>
    <a className="topic-name" href={expanded ? `#topic-${index}` : withLang(`/articles/#topic-${index}`)}>{novemberCopy[lang].topics[index]}</a>
    {expanded && <ul id={`topic-${index}`}>{slugs.map(slug => <li key={slug}><a href={withLang(`/articles/${slug}/`)}>{getArticle(lang,slug)?.card[1]}</a></li>)}</ul>}
  </div>)}</nav>;
}

export const relatedSlugs: Record<string, string[]> = {
  'usfans-index-guide': ['usfans-ropa-guia','usfans-link-no-funciona','usfans-metodos-pago'],
  'qc-photos-guide': ['usfans-guia-tallas','usfans-devoluciones-almacen','usfans-reembolsos-retirar-saldo'],
  'shipping-cost-guide': ['usfans-canarias-envios','spanish-line-packet-usfans','usfans-rehearsal-peso-volumetrico'],
  'usfans-spain-address-checklist': ['usfans-canarias-envios','usfans-tiempos-envio-tracking','shipping-cost-guide'],
  'que-es-usfans-como-funciona': ['usfans-metodos-pago','usfans-comisiones-coste-total','usfans-opiniones-fiabilidad'],
  'usfans-ropa-guia': ['usfans-guia-tallas','qc-photos-guide','usfans-metodos-pago'],
  'usfans-opiniones-fiabilidad': ['usfans-comisiones-coste-total','usfans-devoluciones-almacen','usfans-reembolsos-retirar-saldo'],
  'usfans-canarias-envios': ['usfans-spain-address-checklist','shipping-cost-guide','usfans-tiempos-envio-tracking'],
  'spanish-line-packet-usfans': ['shipping-cost-guide','usfans-rehearsal-peso-volumetrico','usfans-tiempos-envio-tracking'],
  'usfans-tiempos-envio-tracking': ['spanish-line-packet-usfans','usfans-canarias-envios','usfans-spain-address-checklist'],
  'usfans-devoluciones-almacen': ['usfans-reembolsos-retirar-saldo','qc-photos-guide','usfans-guia-tallas'],
  'usfans-comisiones-coste-total': ['usfans-metodos-pago','usfans-cupones-descuento','shipping-cost-guide'],
  'usfans-guia-tallas': ['usfans-ropa-guia','qc-photos-guide','usfans-devoluciones-almacen'],
  'usfans-rehearsal-peso-volumetrico': ['shipping-cost-guide','usfans-cupones-descuento','usfans-canarias-envios'],
  'usfans-link-no-funciona': ['usfans-index-guide','usfans-ropa-guia','que-es-usfans-como-funciona'],
  'usfans-metodos-pago': ['usfans-comisiones-coste-total','usfans-reembolsos-retirar-saldo','usfans-cupones-descuento'],
  'usfans-reembolsos-retirar-saldo': ['usfans-devoluciones-almacen','usfans-metodos-pago','shipping-cost-guide'],
  'usfans-cupones-descuento': ['usfans-comisiones-coste-total','usfans-metodos-pago','usfans-rehearsal-peso-volumetrico'],
};
