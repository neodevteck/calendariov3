import dayjs from 'dayjs';
require('dayjs/locale/es');
dayjs.locale('es');

export function getMonth(month = dayjs().locale('es').month()) {
  month = Math.floor(month);
  const year = dayjs().locale('es').year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).locale('es').day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount)).locale('es');
    });
  });
  return daysMatrix;
}
export function getDay(
  day = dayjs().locale('es').day(),
  month = dayjs().locale('es').month()
) {
  const year = dayjs().locale('es').year();
  console.log('year: ' + year);
  console.log('mes: ' + month);
  console.log('day: ' + day);

  return dayjs(new Date(year, month, day)).locale('es');
}

export function timeConvert(ds) {
  let T,
    tz,
    off,
    dobj = ds.match(/(-?\d+)|([+-])|(\d{4})/g);

  T = parseInt(dobj[0], 10);
  tz = dobj[1];
  off = dobj[2];

  if (off) {
    off =
      parseInt(off.substring(0, 2), 10) * 3600000 +
      parseInt(off.substring(2), 10) * 60000;
    if (tz === '-') off *= -1;
  } else off = 0;
  return new Date((T += off)).toUTCString();
}

export function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}


export function strToDate(dtStr) {
  if (!dtStr) return null
  let dateParts = dtStr.split("/");
  let timeParts = dateParts[2].split(" ")[1].split(":");
  dateParts[2] = dateParts[2].split(" ")[0];
  // month is 0-based, that's why we need dataParts[1] - 1
  let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
  return dateObject
}
