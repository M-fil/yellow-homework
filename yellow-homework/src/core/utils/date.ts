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
  startDate: string, endDate: string, values: T[], isTimeInMilliseconds: boolean = false,
) {
  const convertedStartDate = new Date(startDate);
  const convertedEndDate = new Date(endDate);

  if (!startDate) {
    return values.filter((item) => {
      const timeValue = isTimeInMilliseconds ? item.date : item.date * 1000;
      return new Date(timeValue) <= convertedEndDate;
    });
  } else if (!endDate) {
    return values.filter((item) => {
      const timeValue = isTimeInMilliseconds ? item.date : item.date * 1000;
      return new Date(timeValue) >= convertedStartDate;
    });
  }

  return values.filter((item) => {
    const timeValue = isTimeInMilliseconds ? item.date : item.date * 1000;
    return new Date(timeValue) >= convertedStartDate && new Date(timeValue) <= convertedEndDate;
  });
}
