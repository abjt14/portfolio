export function formatDate(date) {
  const options = { year: "numeric", month: "long" };
  return new Date(date).toLocaleDateString("en-US", options);
}
