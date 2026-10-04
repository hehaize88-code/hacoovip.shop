import type { Lang } from "./site-data";
import type { ArticleBody } from "./article-data";
import type { ArticleVisual } from "./article-expansions";
import en from "./content/new-en.json";
import de from "./content/new-de.json";
import es from "./content/new-es.json";
import it from "./content/new-it.json";
import pl from "./content/new-pl.json";

export const newArticleSlugs = [
  "hipobuy-shipping-to-germany",
  "hipobuy-shipping-to-italy",
  "hipobuy-shipping-to-france",
  "hipobuy-delivery-time-tracking",
] as const;
export type NewArticleSlug = (typeof newArticleSlugs)[number];
export const newArticleContent = { en, de, es, it, pl };
export function isNewArticle(slug: string): slug is NewArticleSlug {
  return (newArticleSlugs as readonly string[]).includes(slug);
}

const tableCopy: Record<Lang, { label: string; title: string; intro: string; columns: [string, string, string]; actual: string; volume: string; compact: string; divisor: string; original: string; extra: string; freight: string; total: string; trackingTitle: string; trackingIntro: string; trackingColumns: [string,string,string]; trackingRows: Array<[string,string,string]> }> = {
  en: { label: "Worked example", title: "Compare the same parcel", intro: "Illustrative figures only. A 6,000 divisor is assumed; replace it and every price with the selected line’s actual terms. Weight rounding is not included.", columns: ["Scenario", "Inputs", "Calculated result"], actual: "Actual weight", volume: "Original carton", compact: "Compact carton", divisor: "Volumetric weight", original: "Clothing parcel", extra: "With bulky item", freight: "Freight only", total: "Freight + packing", trackingTitle: "Find the stage before asking for help", trackingIntro: "Match the reference to the stage. Status wording and investigation windows depend on the assigned service.", trackingColumns: ["Evidence", "What it establishes", "Next check"], trackingRows: [["Seller order", "Product purchase or dispatch", "Domestic number and warehouse receipt"], ["Label created", "Shipment data prepared", "Physical acceptance event"], ["Local carrier event", "Destination-network milestone", "Delivery notice or collection action"]] },
  de: { label: "Rechenbeispiel", title: "Dasselbe Paket vergleichen", intro: "Nur Beispielwerte. Divisor 6.000 wird angenommen; ersetze ihn und die Preise durch die tatsächlichen Bedingungen. Ohne Gewichts­rundung.", columns: ["Variante", "Eingaben", "Rechenergebnis"], actual: "Tatsächliches Gewicht", volume: "Originalkarton", compact: "Kompakter Karton", divisor: "Volumengewicht", original: "Kleidungspaket", extra: "Mit sperrigem Artikel", freight: "Nur Fracht", total: "Fracht + Verpackung", trackingTitle: "Vor der Nachfrage die Phase bestimmen", trackingIntro: "Referenz und Phase müssen zusammenpassen. Status und Untersuchungsfristen hängen vom Dienst ab.", trackingColumns: ["Nachweis", "Belegt", "Nächste Prüfung"], trackingRows: [["Verkäuferbestellung", "Kauf oder Versand", "Inlandsnummer und Lagereingang"], ["Etikett erstellt", "Sendungsdaten vorbereitet", "Physische Übernahme"], ["Lokales Ereignis", "Meilenstein im Zielnetz", "Zustellnachricht oder Abholung"]] },
  es: { label: "Ejemplo de cálculo", title: "Compara el mismo paquete", intro: "Cifras ilustrativas. Se supone divisor 6.000; sustituye divisor y precios por las condiciones reales. Sin redondeo del peso.", columns: ["Caso", "Datos", "Resultado"], actual: "Peso real", volume: "Cartón original", compact: "Cartón compacto", divisor: "Peso volumétrico", original: "Paquete de ropa", extra: "Con artículo voluminoso", freight: "Solo transporte", total: "Transporte + embalaje", trackingTitle: "Identifica la etapa antes de consultar", trackingIntro: "Relaciona referencia y etapa. Estados y plazos de investigación dependen del servicio.", trackingColumns: ["Prueba", "Qué demuestra", "Siguiente revisión"], trackingRows: [["Pedido al vendedor", "Compra o despacho", "Número nacional y recepción"], ["Etiqueta creada", "Datos preparados", "Aceptación física"], ["Evento local", "Etapa en la red de destino", "Aviso de entrega o recogida"]] },
  it: { label: "Esempio di calcolo", title: "Confronta lo stesso pacco", intro: "Cifre dimostrative. Si ipotizza divisore 6.000; sostituisci divisore e prezzi con le condizioni reali. Arrotondamenti esclusi.", columns: ["Scenario", "Dati", "Risultato"], actual: "Peso reale", volume: "Cartone iniziale", compact: "Cartone compatto", divisor: "Peso volumetrico", original: "Pacco di abbigliamento", extra: "Con articolo ingombrante", freight: "Solo trasporto", total: "Trasporto + imballaggio", trackingTitle: "Identifica la fase prima di chiedere assistenza", trackingIntro: "Collega riferimento e fase. Stati e termini di ricerca dipendono dal servizio assegnato.", trackingColumns: ["Prova", "Cosa dimostra", "Controllo successivo"], trackingRows: [["Ordine al venditore", "Acquisto o partenza", "Codice nazionale e ricezione"], ["Etichetta creata", "Dati predisposti", "Accettazione fisica"], ["Evento locale", "Tappa nella rete di destinazione", "Avviso di consegna o ritiro"]] },
  pl: { label: "Przykład obliczenia", title: "Porównaj tę samą paczkę", intro: "Dane przykładowe. Przyjęto dzielnik 6000; zastąp go i ceny rzeczywistymi warunkami. Bez zaokrąglenia wagi.", columns: ["Wariant", "Dane", "Wynik"], actual: "Waga rzeczywista", volume: "Pierwotny karton", compact: "Mniejszy karton", divisor: "Waga objętościowa", original: "Paczka odzieży", extra: "Z dużym produktem", freight: "Sam transport", total: "Transport + pakowanie", trackingTitle: "Ustal etap przed zgłoszeniem", trackingIntro: "Dopasuj numer do fazy. Statusy i terminy poszukiwania zależą od usługi.", trackingColumns: ["Dowód", "Co potwierdza", "Następna kontrola"], trackingRows: [["Zamówienie sprzedawcy", "Zakup lub nadanie", "Numer krajowy i magazyn"], ["Utworzona etykieta", "Przygotowane dane", "Fizyczne przyjęcie"], ["Zdarzenie lokalne", "Etap w sieci docelowej", "Doręczenie lub odbiór"]] },
};

function visual(lang: Lang, index: number): ArticleVisual {
  const t = tableCopy[lang];
  if (index === 3) return { label: t.label, title: t.trackingTitle, intro: t.trackingIntro, columns: t.trackingColumns, rows: t.trackingRows };
  const rows: Array<[string,string,string]> = index === 0
    ? [[t.actual, "3.2 kg", "3.2 kg"], [t.volume, "40 × 30 × 25 cm", `5 kg · ${t.divisor}`], [t.compact, "40 × 30 × 18 cm", `3.6 kg · ${t.divisor}`]]
    : index === 1
      ? [[t.original, "2.4 kg · 35 × 25 × 20 cm", `2.92 kg · ${t.divisor}`], [t.extra, "3.1 kg · 40 × 30 × 25 cm", `5 kg · ${t.divisor}`]]
      : [[t.freight, "€45 ÷ 3 kg", "€15/kg"], [t.total, "(€45 + €5) ÷ 3 kg", "€16.67/kg"], [t.volume, "45 × 35 × 25 cm", `6.56 kg · ${t.divisor}`]];
  return { label: t.label, title: t.title, intro: t.intro, columns: t.columns, rows };
}

export function newArticleBody(lang: Lang, slug: NewArticleSlug): ArticleBody {
  const index = newArticleSlugs.indexOf(slug);
  const article = newArticleContent[lang][index];
  return { lead: article.lead, keyPoints: article.keyPoints, sections: article.sections, checklist: article.checklist, faqs: [], visual: visual(lang,index) };
}
