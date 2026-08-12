export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
  return new Date(date).toLocaleDateString("en-US", options);
}
