import { add, addDays } from "date-fns";

const date = new Date();

export const today = formatDate(date);
export const add7Days = formatDate(addDays(date, 6))

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}