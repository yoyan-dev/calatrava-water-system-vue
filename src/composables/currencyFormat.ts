export function formatToPeso(amount: unknown): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "Invalid amount";
  }
  return `₱${amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
