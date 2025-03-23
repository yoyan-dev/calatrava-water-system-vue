export function formatNumberWithCommas(number: unknown): string {
  if (typeof number !== "number") {
    return "Invalid number";
  }
  return number.toLocaleString();
}
