import moment from 'moment';

export function capitalizeFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function getFormattedDate(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  return `${month}/${day}/${year}`;
}

// Get array of date object for each day between start and end day
export const getDaysArray = function (start, end) {
  for (var arr = [], d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    arr.push(new Date(d));
  }
  return arr;
};
export const getWeeksArray = function (start, end) {
  for (var arr = [], d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    arr.push(d.getWeek());
  }
  return [...new Set(arr)];
};
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const getMonthsArray = function () {
  let month = moment().month() + 1;
  let year = moment().year() - 1;
  for (var i = 0, arr = []; i <= 11; i++) {
    if (month > 11) {
      month = 0;
      year++;
    }
    arr.push({
      month,
      year,
    });
    month++;
  }
  return arr;
};

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 7) % 7);
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export const daysInMonthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
