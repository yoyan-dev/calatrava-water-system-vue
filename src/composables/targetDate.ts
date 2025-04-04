export function isTargetDate(target: string): boolean {
  const targetDate = new Date(target);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  return targetDate >= currentDate;
}
