"use client";

import { useState } from "react";
import type { Lang } from "./site-data";
import { weightEstimate } from "./weight-math";

const labels: Record<Lang, string[]> = {
  en: ["Parcel weight worksheet", "Test packed dimensions before opening the official shipping calculator. This is not a shipping quote; route rules and rounding still apply.", "Actual weight (kg)", "Length (cm)", "Width (cm)", "Height (cm)", "Assumed volume divisor", "Calculate weights", "Volume weight", "Larger of the two weights, before route rounding", "Enter positive, finite numbers in every field.", "Open official shipping calculator ↗"],
  fr: ["Simulation du poids du colis", "Testez les dimensions emballées avant le calculateur officiel. Ceci n’est pas un devis ; les règles et arrondis de la ligne restent applicables.", "Poids réel (kg)", "Longueur (cm)", "Largeur (cm)", "Hauteur (cm)", "Diviseur volumétrique supposé", "Calculer les poids", "Poids volumétrique", "Poids le plus élevé, avant arrondi de la ligne", "Saisissez des nombres positifs et finis dans chaque champ.", "Ouvrir le calculateur officiel ↗"],
  de: ["Paketgewicht berechnen", "Teste verpackte Maße vor dem offiziellen Rechner. Dies ist kein Versandangebot; Routenregeln und Rundung gelten zusätzlich.", "Tatsächliches Gewicht (kg)", "Länge (cm)", "Breite (cm)", "Höhe (cm)", "Angenommener Volumendivisor", "Gewichte berechnen", "Volumengewicht", "Größeres Gewicht vor Routenrundung", "In jedem Feld eine positive, endliche Zahl eingeben.", "Offiziellen Versandrechner öffnen ↗"],
  id: ["Lembar hitung berat paket", "Uji ukuran setelah dikemas sebelum memakai kalkulator resmi. Ini bukan penawaran ongkir; aturan dan pembulatan jalur tetap berlaku.", "Berat aktual (kg)", "Panjang (cm)", "Lebar (cm)", "Tinggi (cm)", "Asumsi pembagi volume", "Hitung berat", "Berat volumetrik", "Berat lebih besar sebelum pembulatan jalur", "Masukkan angka positif dan terbatas di setiap kolom.", "Buka kalkulator resmi ↗"],
  "zh-cn": ["包裹重量试算", "先测试打包后的尺寸，再打开官方运费计算器。这里不提供运费报价，实际线路规则和重量进位仍需另行核对。", "实际重量（kg）", "长度（cm）", "宽度（cm）", "高度（cm）", "假设的体积重除数", "计算重量", "体积重量", "两种重量的较大值，尚未按线路进位", "请在每个字段输入大于零的有限数值。", "打开官方运费计算器 ↗"],
};

export default function WeightPlanner({ lang }: { lang: Lang }) {
  const t = labels[lang];
  const [values, setValues] = useState(["3", "40", "30", "20", "6000"]);
  const [result, setResult] = useState<ReturnType<typeof weightEstimate>>(null);
  const [submitted, setSubmitted] = useState(false);
  return <aside className="weight-planner">
    <h2>{t[0]}</h2><p>{t[1]}</p>
    <form onSubmit={event => { event.preventDefault(); setResult(weightEstimate(values.map(Number))); setSubmitted(true); }} data-ga-event="shipping_weight_calculate" data-ga-content="weight-worksheet">
      <div className="weight-fields">{values.map((value, i) => <label key={i}>{t[i + 2]}<input type="number" min="0.001" step="any" required value={value} onChange={event => { setValues(values.map((v, j) => j === i ? event.target.value : v)); setSubmitted(false); }} /></label>)}</div>
      <button type="submit">{t[7]}</button>
    </form>
    <div aria-live="polite">{submitted && (result ? <dl><div><dt>{t[8]}</dt><dd>{new Intl.NumberFormat(lang, { maximumFractionDigits: 3 }).format(result.volume)} kg</dd></div><div><dt>{t[9]}</dt><dd>{new Intl.NumberFormat(lang, { maximumFractionDigits: 3 }).format(result.larger)} kg</dd></div></dl> : <p role="alert">{t[10]}</p>)}</div>
    <a href="https://www.superbuy.com/en/page/query/freight/" target="_blank" rel="noopener" data-ga-event="official_tool_click" data-ga-content="shipping-calculator">{t[11]}</a>
  </aside>;
}
