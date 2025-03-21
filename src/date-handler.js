import { add, addDays, getDay } from "date-fns";

const date = new Date();

export const today = formatDate(date);
export const add7Days = formatDate(addDays(date, 7))

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getDayFromDate(date) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return weekdays[getDay(date)];
}