/** A planning comparison only. Tariff increments and route eligibility are excluded. */
export function weightEstimate(values: number[]): { volume: number; larger: number } | null {
  if (values.length !== 5 || values.some(v => !Number.isFinite(v) || v <= 0)) return null;
  const [actual, length, width, height, divisor] = values;
  const volume = length * width * height / divisor;
  if (!Number.isFinite(volume)) return null;
  return { volume, larger: Math.max(actual, volume) };
}
