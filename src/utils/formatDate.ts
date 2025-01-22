export function formatDate(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "long",
  };
  return typeof date === "string"
    ? new Date(date).toLocaleDateString("en-US", options)
    : new Intl.DateTimeFormat("en-US", options).format(date);
}
