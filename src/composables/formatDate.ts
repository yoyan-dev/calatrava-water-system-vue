import { format } from "date-fns";

export function formatDate(isoString: any) {
  const date = new Date(isoString);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export const formatDateTimestamp = (timestamp: any) => {
  if (timestamp && typeof timestamp._seconds === "number") {
    const date = new Date(
      timestamp._seconds * 1000 + (timestamp._nanoseconds || 0) / 1e6
    );
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return "";
};
