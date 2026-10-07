export function ShippingPlanner(){
  return <section className="shipping-planner" aria-labelledby="planner-title">
    <div className="section-kicker">PARCEL PLANNER</div><h2 id="planner-title">Estimate weight and your own budget</h2>
    <p>Enter your parcel measurements and route divisor. This tool uses your inputs; it does not fetch live freight rates or apply route-specific rounding, minimum charges or restrictions.</p>
    <form id="weight-planner" className="planner-grid" onSubmit={undefined}>
      <label>Actual weight (kg)<input name="weight" type="number" min="0.001" step="0.001" inputMode="decimal" required/></label>
      <label>Length (cm)<input name="length" type="number" min="0.1" step="0.1" inputMode="decimal" required/></label>
      <label>Width (cm)<input name="width" type="number" min="0.1" step="0.1" inputMode="decimal" required/></label>
      <label>Height (cm)<input name="height" type="number" min="0.1" step="0.1" inputMode="decimal" required/></label>
      <label>Divisor from your route<input name="divisor" type="number" min="1" step="1" inputMode="numeric" required/></label>
    </form>
    <div className="planner-results" aria-live="polite"><p>Volumetric weight <output id="volume-result">—</output> kg</p><p>Larger of actual and volumetric weight <output id="chargeable-result">—</output> kg</p></div>
    <p>Use this comparison only for a route that charges the greater weight. Confirm the actual route rules before payment.</p>
    <h3>Budget in USD</h3><p>Enter each cost once. Convert other currencies before entering them. Blank fields remain unestimated; a subtotal is not a final quote.</p>
    <form id="budget-planner" className="planner-grid">
      {[["items","Items (USD)"],["domestic","Domestic delivery (USD)"],["services","Services and payment fees (USD)"],["packing","Packing (USD)"],["freight","International freight (USD)"],["taxes","Taxes and handling not already included (USD)"]].map(([name,label])=><label key={name}>{label}<input name={name} type="number" min="0" step="0.01" inputMode="decimal"/></label>)}
    </form>
    <div className="planner-results" aria-live="polite"><p>Entered subtotal <output id="budget-result">—</output> USD</p><p>Unestimated fields <output id="budget-missing">6</output></p></div>
  </section>;
}
