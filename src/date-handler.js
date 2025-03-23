import { format, addDays, getDay } from "date-fns";

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

export function getTodaysDate() {
  return format(date, 'eeee, MMMM d')
}


export function getTime() {
  const time = new Date();
  let suffix = 'AM';
  let hour = time.getHours()
  if (hour >= 12) {
    suffix = 'PM';
    if (hour > 12) {
      hour = hour - 12;
    }
  }
  if (hour === 0) {
    hour = 12;
  }
  let minute = time.getMinutes()
  if (minute < 10) {
    minute = '0' + minute;
  }
  return `${hour}:${minute} ${suffix}`;
}

export function formatGraphTime(time) {
  let splitTime = time.split(':');
  let suffix = 'AM';

  let hour = parseInt(splitTime[0]);

  if (hour >= 12) {
    suffix = 'PM';
    if (hour > 12) {
      hour = hour - 12;
    }
  }
  if (hour === 0) {
    hour = 12;
  }
  return `${hour} ${suffix}`;
}

// setInterval(updateTime, 1000);