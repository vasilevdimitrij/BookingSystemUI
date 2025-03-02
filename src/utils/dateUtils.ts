export const formatDate = (
  date: string | Date,
  locale: string = "en-US",
  forInput: boolean = false
): string => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (forInput) {
    return parsedDate.toISOString().split("T")[0];
  }

  return parsedDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
