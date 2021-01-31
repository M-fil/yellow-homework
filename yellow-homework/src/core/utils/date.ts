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
}
