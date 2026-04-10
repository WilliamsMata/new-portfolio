export function getYearsOfExperience(
  startYear = 2021,
  referenceDate: Date = new Date(),
) {
  return Math.max(0, referenceDate.getUTCFullYear() - startYear);
}
