/**
 * Formats a number as Indian Rupee currency with comma grouping,
 * e.g. 70200.88 -> "₹70,200.88"
 */
export function formatCurrency(value, { showSign = false } = {}) {
  const num = Number(value) || 0;
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(num));

  if (!showSign) return num < 0 ? `-${formatted}` : formatted;
  if (num > 0) return `+${formatted}`;
  if (num < 0) return `-${formatted}`;
  return formatted;
}

/** Formats a plain number with Indian comma grouping (no currency symbol) */
export function formatNumber(value, decimals = 2) {
  const num = Number(value) || 0;
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}
