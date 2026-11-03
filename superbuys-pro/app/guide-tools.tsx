import type {Locale} from "./content";

export const canadaSlug = "superbuy-shipping-to-canada-2kg-5kg";
export const forwardingSlug = "superbuy-parcel-forwarding-without-tracking-number";
const estimator = "https://www.superbuy.com/en/page/query/freight/";
const canadaSource = "https://www.jadeship.com/shipping-calculator/new/Canada/superbuy";
const fees = "https://www.superbuy.com/en/page/guide/feecomposition/";
const forwarding = "https://www.superbuy.com/en/page/guide/transportagent/";
const inbound = "https://m.superbuy.com/en/order/submit/zy/index";
const shopping = "https://www.superbuy.com/en/page/shopguidelines/";

const labels = {
  en: {calculator:"Open the Superbuy shipping calculator", example:"Try a packed parcel weighing 2,000 g and measuring 30 × 25 × 15 cm. Select your destination and item type, then compare the available lines.", canada:"Compare the 2 kg and 5 kg Canada examples", caption:"Estimated freight to Canada for unbranded clothing", line:"Shipping line", days:"Estimated days", source:"JadeShip estimates in CNY · 3 November 2026", terms:"Official storage and fee schedule", order:"Official shopping and order guide", forward:"Official forwarding guide", intake:"Superbuy parcel registration form"},
  de: {calculator:"Superbuy-Versandrechner öffnen", example:"Probiere ein verpacktes Paket mit 2.000 g und 30 × 25 × 15 cm aus. Wähle Zielland und Warenart und vergleiche die verfügbaren Versandlinien.", canada:"Die Kanada-Beispiele mit 2 kg und 5 kg vergleichen", caption:"Geschätzte Versandkosten für markenlose Kleidung nach Kanada", line:"Versandlinie", days:"Geschätzte Tage", source:"Schätzwerte von JadeShip in CNY · 3. November 2026", terms:"Offizielle Lagerfristen und Gebühren", order:"Offizieller Leitfaden zur Bestellung", forward:"Offizieller Leitfaden zur Paketweiterleitung", intake:"Paket bei Superbuy anmelden"},
  fr: {calculator:"Ouvrir le calculateur d’expédition Superbuy", example:"Essayez un colis emballé de 2 000 g mesurant 30 × 25 × 15 cm. Sélectionnez la destination et la catégorie d’article, puis comparez les lignes disponibles.", canada:"Comparer les exemples de 2 kg et 5 kg vers le Canada", caption:"Estimation du transport de vêtements sans marque vers le Canada", line:"Ligne de transport", days:"Délai estimé (jours)", source:"Estimations JadeShip en CNY · 3 novembre 2026", terms:"Barème officiel des frais et du stockage", order:"Guide officiel des commandes", forward:"Guide officiel de la réexpédition", intake:"Formulaire Superbuy d’enregistrement du colis"},
  it: {calculator:"Apri il calcolatore di spedizione Superbuy", example:"Prova con un pacco imballato da 2.000 g e 30 × 25 × 15 cm. Seleziona destinazione e tipo di articolo, quindi confronta le linee disponibili.", canada:"Confronta gli esempi da 2 kg e 5 kg per il Canada", caption:"Stime di spedizione in Canada per abbigliamento senza marchio", line:"Linea di spedizione", days:"Giorni stimati", source:"Stime JadeShip in CNY · 3 novembre 2026", terms:"Tariffe e condizioni di deposito ufficiali", order:"Guida ufficiale agli ordini", forward:"Guida ufficiale all’inoltro dei pacchi", intake:"Modulo Superbuy per registrare il pacco"},
  nl: {calculator:"Open de verzendcalculator van Superbuy", example:"Probeer een ingepakt pakket van 2.000 g en 30 × 25 × 15 cm. Kies het bestemmingsland en de productsoort en vergelijk de beschikbare verzendmethoden.", canada:"Vergelijk 2 kg en 5 kg voor Canada", caption:"Geschatte verzendkosten naar Canada voor merkloze kleding", line:"Verzendmethode", days:"Geschatte dagen", source:"Ramingen van JadeShip in CNY · 3 november 2026", terms:"Officiële opslagtermijnen en tarieven", order:"Officiële bestelhandleiding", forward:"Officiële handleiding voor doorsturen", intake:"Pakket aanmelden bij Superbuy"},
  ms: {calculator:"Buka kalkulator penghantaran Superbuy", example:"Cuba bungkusan seberat 2,000 g dengan ukuran 30 × 25 × 15 cm selepas dibungkus. Pilih destinasi dan jenis barang, kemudian bandingkan pilihan penghantaran.", canada:"Bandingkan contoh 2 kg dan 5 kg ke Kanada", caption:"Anggaran penghantaran pakaian tanpa jenama ke Kanada", line:"Laluan penghantaran", days:"Anggaran hari", source:"Anggaran JadeShip dalam CNY · 3 November 2026", terms:"Kadar rasmi simpanan dan yuran", order:"Panduan pesanan rasmi", forward:"Panduan rasmi penghantaran semula", intake:"Borang pendaftaran bungkusan Superbuy"},
};

const canadaRates = [
  ["Ocean Route (Special)", "131", "236", "30–39"],
  ["Duty-Prepaid Apparel Line", "232", "510", "12–20"],
  ["YunExpress Air Cargo (General)", "245", "523", "14–21"],
];

export function GuideTools({locale, slug, canadaPath}:{locale:Locale;slug:string;canadaPath:string}) {
  const t = labels[locale];
  if (slug === canadaSlug) return <div className="guide-tools">
    <table><caption>{t.caption}</caption><thead><tr><th scope="col">{t.line}</th><th scope="col">2 kg (CNY)</th><th scope="col">5 kg (CNY)</th><th scope="col">{t.days}</th></tr></thead>
    <tbody>{canadaRates.map(([line,small,large,days])=><tr key={line}><th scope="row">{line}</th><td>{small}</td><td>{large}</td><td>{days}</td></tr>)}</tbody></table>
    <p><a href={canadaSource}>{t.source}</a></p><a href={estimator}>{t.calculator} ↗</a>
  </div>;
  if (slug === "superbuy-shipping-cost-explained") return <div className="guide-tools">
    <a href={estimator}>{t.calculator} ↗</a><p>{t.example}</p><a href={canadaPath}>{t.canada} →</a>
  </div>;
  if (slug === forwardingSlug) return <nav className="guide-tools"><a href={forwarding}>{t.forward} ↗</a><a href={inbound}>{t.intake} ↗</a></nav>;
  if (slug === "superbuy-warehouse-storage-qc-guide") return <div className="guide-tools"><a href={fees}>{t.terms} ↗</a></div>;
  if (slug === "superbuy-order-status-purchase-dispatch-warehouse") return <div className="guide-tools"><a href={shopping}>{t.order} ↗</a></div>;
  return null;
}
