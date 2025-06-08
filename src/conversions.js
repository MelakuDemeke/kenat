import { InvalidEthiopianDateError } from './errors.js'
import { getGregorianDateOfEthiopianNewYear } from './newYearDates.js';
import { dayOfYear, monthDayFromDayOfYear, isGregorianLeapYear, isEthiopianLeapYear } from './utils.js';

/**
 * Convert Ethiopian date to Gregorian date.
 *
 * @param {number} ethYear - Ethiopian year
 * @param {number} ethMonth - Ethiopian month (1-13)
 * @param {number} ethDay - Ethiopian day (1-30 for months 1-12, 1-5/6 for month 13)
 * @returns {{year: number, month: number, day: number}} Gregorian date
 */
export function toGC(ethYear, ethMonth, ethDay) {
  // Validate month
  if (ethMonth < 1 || ethMonth > 13) {
    throw new InvalidEthiopianDateError(ethYear, ethMonth, ethDay)
  }

  // Validate day
  const maxDay = ethMonth === 13 ? (isEthiopianLeapYear(ethYear) ? 6 : 5) : 30
  if (ethDay < 1 || ethDay > maxDay) {
    throw new InvalidEthiopianDateError(ethYear, ethMonth, ethDay)
  }

  const newYear = getGregorianDateOfEthiopianNewYear(ethYear)

  const daysSinceNewYear = (ethMonth - 1) * 30 + ethDay - 1
  const newYearDOY = dayOfYear(newYear.gregorianYear, newYear.month, newYear.day)

  let gregorianDOY = newYearDOY + daysSinceNewYear
  let gregorianYear = newYear.gregorianYear
  const yearLength = isGregorianLeapYear(gregorianYear) ? 366 : 365

  if (gregorianDOY > yearLength) {
    gregorianDOY -= yearLength
    gregorianYear += 1
  }

  const { month, day } = monthDayFromDayOfYear(gregorianYear, gregorianDOY)
  return { year: gregorianYear, month, day }
}

/**
 * Convert Gregorian date to Ethiopian date.
 *
 * @param {number} gYear - Gregorian year
 * @param {number} gMonth - Gregorian month (1-12)
 * @param {number} gDay - Gregorian day
 * @returns {{year: number, month: number, day: number}} Ethiopian date
 */
export function toEC(gYear, gMonth, gDay) {
  const oneDay = 1000 * 60 * 60 * 24;
  const oneYear = 365 * oneDay;
  const fourYears = 1461 * oneDay; // 365*4 + 1 leap day

  // Reference: Meskerem 1, 1964 = September 12, 1971 (Gregorian)
  const baseDate = new Date(Date.UTC(1971, 8, 12)); // Sep 12, 1971
  const inputDate = new Date(Date.UTC(gYear, gMonth - 1, gDay));

  // Optional range check function
  if (inputDate < new Date(Date.UTC(1900, 0, 1)) || inputDate > new Date(Date.UTC(2100, 11, 31))) {
    throw `Out of range input year: ${gYear}`;
  }

  const difference = inputDate.getTime() - baseDate.getTime();
  const fourYearsPassed = Math.floor(difference / fourYears);

  let remainingYears = Math.floor(
    (difference - fourYearsPassed * fourYears) / oneYear
  );

  if (remainingYears === 4) {
    remainingYears = 3;
  }

  const remainingMonths = Math.floor(
    (difference - fourYearsPassed * fourYears - remainingYears * oneYear) /
    (30 * oneDay)
  );

  const remainingDays = Math.floor(
    (difference -
      fourYearsPassed * fourYears -
      remainingYears * oneYear -
      remainingMonths * 30 * oneDay) / oneDay
  );

  const ethYear = 1964 + 4 * fourYearsPassed + remainingYears;
  const month = remainingMonths + 1;
  const day = remainingDays + 1;

  return { year: ethYear, month, day };
}

/**
 * Converts an Ethiopian date to a Gregorian Calendar JavaScript Date object (UTC).
 *
 * @param {number} ethYear - The Ethiopian year.
 * @param {number} ethMonth - The Ethiopian month (1-based).
 * @param {number} ethDay - The Ethiopian day.
 * @returns {Date} A JavaScript Date object representing the equivalent Gregorian date in UTC.
 */
export function toGCDate(ethYear, ethMonth, ethDay) {
  const { year, month, day } = toGC(ethYear, ethMonth, ethDay);
  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Converts a JavaScript Date object to the Ethiopian Calendar (EC) date representation.
 *
 * @param {Date} dateObj - The JavaScript Date object to convert.
 * @returns {*} The Ethiopian Calendar date, as returned by the `toEC` function.
 */
export function fromDateToEC(dateObj) {
  return toEC(
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    dateObj.getDate()
  );
}

// muslim conversions

export const islamicFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

/**
 * Get Hijri year from a Gregorian date
 * @param {Date} date
 * @returns {number} hijri year
 */
export function getHijriYear(date) {
  const parts = islamicFormatter.formatToParts(date);
  let hYear = null;
  parts.forEach(({ type, value }) => {
    if (type === 'year') hYear = parseInt(value, 10);
  });
  return hYear;
}

const hijriToGregorianCache = new Map();

/**
 * Converts a Hijri date to the corresponding Gregorian date within a given Gregorian year.
 *
 * @param {number} hYear - Hijri year (e.g., 1445)
 * @param {number} hMonth - Hijri month (1–12)
 * @param {number} hDay - Hijri day (1–30)
 * @param {number} gregorianYear - Target Gregorian year to restrict the search range
 * @returns {Date|null} Gregorian Date object or null if not found
 */
export function hijriToGregorian(hYear, hMonth, hDay, gregorianYear) {
  const cacheKey = `${hYear}-${hMonth}-${hDay}-${gregorianYear}`;
  if (hijriToGregorianCache.has(cacheKey)) {
    return hijriToGregorianCache.get(cacheKey);
  }

  const baseDate = new Date(gregorianYear - 1, 0, 1);
  for (let offset = 0; offset <= 730; offset++) {
    const testDate = new Date(baseDate);
    testDate.setDate(testDate.getDate() + offset);

    const parts = islamicFormatter.formatToParts(testDate);
    const hijriParts = {};
    parts.forEach(({ type, value }) => {
      if (type !== 'literal') hijriParts[type] = parseInt(value, 10);
    });

    if (
      hijriParts.year === hYear &&
      hijriParts.month === hMonth &&
      hijriParts.day === hDay &&
      testDate.getFullYear() === gregorianYear
    ) {
      hijriToGregorianCache.set(cacheKey, testDate);
      return testDate;
    }
  }

  hijriToGregorianCache.set(cacheKey, null);
  return null;
}