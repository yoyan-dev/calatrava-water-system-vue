export function getSeverity(billStatus: string) {
  if (billStatus === "verifying") {
    return "warn";
  } else if (billStatus === "paid") {
    return "success";
  } else if (billStatus === "unpaid") {
    return "danger";
  } else {
    return "error";
  }
}
