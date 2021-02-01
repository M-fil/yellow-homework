export const formatDate = (date: Date, reversedDate = false, separator = '.'): string => {
  const d = new Date(date);
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate())
  const year = d.getFullYear();

  if (month.length < 2)
    month = `0${month}`;
  if (day.length < 2)
    day = `0${day}`;

  if (reversedDate) {
    return [year, month, day].join(separator);
  }

  return [day, month, year].join(separator);
};

export function filterByDatesInRange<T extends { date: number }>(
  startDate: string, endDate: string, values: T[],
) {
  const convertedStartDate = new Date(startDate);
  const convertedEndDate = new Date(endDate);

  if (!startDate) {
    return values.filter((item) => new Date(item.date) <= convertedEndDate);
  } else if (!endDate) {
    return values.filter((item) => new Date(item.date) >= convertedStartDate);
  }

  return values.filter((item) =>
    new Date(item.date) >= convertedStartDate && new Date(item.date) <= convertedEndDate,
  );
}
