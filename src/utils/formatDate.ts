export function formatDate(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return typeof date === "string"
    ? date
    : new Intl.DateTimeFormat("en-US", options).format(date);
}
