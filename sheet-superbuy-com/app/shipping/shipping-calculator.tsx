"use client";

import { useMemo, useState } from "react";

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatKg(value: number) {
  return `${value.toFixed(2)} kg`;
}

export function ChargeableWeightCalculator() {
  const [actualWeight, setActualWeight] = useState("2.40");
  const [length, setLength] = useState("45");
  const [width, setWidth] = useState("35");
  const [height, setHeight] = useState("25");
  const [divisor, setDivisor] = useState("6000");

  const result = useMemo(() => {
    const actual = numberValue(actualWeight);
    const volume =
      (numberValue(length) * numberValue(width) * numberValue(height)) /
      numberValue(divisor);

    return {
      actual,
      volume: Number.isFinite(volume) ? volume : 0,
      chargeable: Math.max(actual, Number.isFinite(volume) ? volume : 0),
    };
  }, [actualWeight, divisor, height, length, width]);

  return (
    <div className="shipping-calculator" data-calculator="chargeable-weight">
      <div className="calculator-heading">
        <div>
          <span>FREE PLANNING TOOL</span>
          <h2>Superbuy chargeable-weight calculator</h2>
        </div>
        <p>
          Replace the sample measurements with your packed-parcel estimate. Use
          the divisor shown by the live eligible line; formulas and rounding can
          differ by route.
        </p>
      </div>

      <div className="calculator-grid">
        <label>
          <span>Actual weight</span>
          <span className="calculator-input"><input inputMode="decimal" min="0" step="0.01" type="number" value={actualWeight} onChange={(event) => setActualWeight(event.target.value)} /><small>kg</small></span>
        </label>
        <label>
          <span>Length</span>
          <span className="calculator-input"><input inputMode="decimal" min="0" step="0.1" type="number" value={length} onChange={(event) => setLength(event.target.value)} /><small>cm</small></span>
        </label>
        <label>
          <span>Width</span>
          <span className="calculator-input"><input inputMode="decimal" min="0" step="0.1" type="number" value={width} onChange={(event) => setWidth(event.target.value)} /><small>cm</small></span>
        </label>
        <label>
          <span>Height</span>
          <span className="calculator-input"><input inputMode="decimal" min="0" step="0.1" type="number" value={height} onChange={(event) => setHeight(event.target.value)} /><small>cm</small></span>
        </label>
        <label>
          <span>Route divisor</span>
          <span className="calculator-input"><input inputMode="numeric" min="1" step="1" type="number" value={divisor} onChange={(event) => setDivisor(event.target.value)} /><small>cm³/kg</small></span>
        </label>
      </div>

      <div className="calculator-results" aria-live="polite">
        <div><span>Scale weight</span><strong>{formatKg(result.actual)}</strong></div>
        <div><span>Volumetric weight</span><strong>{formatKg(result.volume)}</strong></div>
        <div className="calculator-result-primary"><span>Planning weight</span><strong>{formatKg(result.chargeable)}</strong></div>
      </div>
      <p className="calculator-note">
        Planning weight is the larger of actual and volumetric weight. It is not
        a freight quote: the selected line may apply its own increments,
        minimums, rounding, restrictions, surcharges, or final measurements.
      </p>
    </div>
  );
}
