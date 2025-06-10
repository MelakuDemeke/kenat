import { InvalidEthiopianDateError, InvalidGregorianDateError, InvalidInputTypeError } from './errors/errorHandler.js'
import { getGregorianDateOfEthiopianNewYear } from './utils.js';
import { dayOfYear, monthDayFromDayOfYear, isGregorianLeapYear, isEthiopianLeapYear } from './utils.js';

/**
 * Validates that all provided date parts are numbers.
 * @param {string} funcName - The name of the function being validated.
 * @param {Object} dateParts - An object where keys are param names and values are the inputs.
 * @throws {InvalidInputTypeError} if any value is not a number.
 */
function validateNumericInputs(funcName, dateParts) {
  for (const [name, value] of Object.entries(dateParts)) {
    if (typeof value !== 'number') {
      throw new InvalidInputTypeError(funcName, name, 'number', value);
    }
  }
}

/**
 * Converts an Ethiopian date to its corresponding Gregorian date.
 *
 * @param {number} ethYear - The Ethiopian year.
 * @param {number} ethMonth - The Ethiopian month (1-13).
 * @param {number} ethDay - The Ethiopian day of the month.
 * @returns {{ year: number, month: number, day: number }} The equivalent Gregorian date.
 * @throws {InvalidInputTypeError} If any input is not a number.
 * @throws {InvalidEthiopianDateError} If the provided Ethiopian date is invalid.
 */
export function toGC(ethYear, ethMonth, ethDay) {
  // 1. Validate input types first
  validateNumericInputs('toGC', { ethYear, ethMonth, ethDay });

  // 2. Validate date range
  if (ethMonth < 1 || ethMonth > 13) {
    throw new InvalidEthiopianDateError(ethYear, ethMonth, ethDay)
  }
  const maxDay = ethMonth === 13 ? (isEthiopianLeapYear(ethYear) ? 6 : 5) : 30
  if (ethDay < 1 || ethDay > maxDay) {
    throw new InvalidEthiopianDateError(ethYear, ethMonth, ethDay)
  }

  // 3. Perform conversion
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
 * Converts a Gregorian date to the Ethiopian calendar (EC) date.
 *
 * @param {number} gYear - The Gregorian year (e.g., 2024).
 * @param {number} gMonth - The Gregorian month (1-12).
 * @param {number} gDay - The Gregorian day of the month (1-31).
 * @returns {{ year: number, month: number, day: number }} The corresponding Ethiopian calendar date.
 * @throws {InvalidInputTypeError} If any input is not a number.
 * @throws {InvalidGregorianDateError} If the input date is invalid or out of supported range.
 */
export function toEC(gYear, gMonth, gDay) {
  // 1. Validate input types first
  validateNumericInputs('toEC', { gYear, gMonth, gDay });

  // 2. Validate date range and validity
  const isValidDate = (y, m, d) => {
    const date = new Date(Date.UTC(y, m - 1, d))
    return (
      date.getUTCFullYear() === y &&
      date.getUTCMonth() === m - 1 &&
      date.getUTCDate() === d
    )
  }

  const inputDate = new Date(Date.UTC(gYear, gMonth - 1, gDay))
  const minDate = new Date(Date.UTC(1900, 0, 1))
  const maxDate = new Date(Date.UTC(2100, 11, 31))

  if (!isValidDate(gYear, gMonth, gDay) || inputDate < minDate || inputDate > maxDate) {
    throw new InvalidGregorianDateError(gYear, gMonth, gDay)
  }

  // 3. Perform conversion
  const oneDay = 86400000
  const oneYear = 365 * oneDay
  const fourYears = 1461 * oneDay
  const baseDate = new Date(Date.UTC(1971, 8, 12))
  const diff = inputDate.getTime() - baseDate.getTime()
  const fourYearCycles = Math.floor(diff / fourYears)
  let remainingYears = Math.floor((diff - fourYearCycles * fourYears) / oneYear)

  if (remainingYears === 4) remainingYears = 3

  const remainingMonths = Math.floor(
    (diff - fourYearCycles * fourYears - remainingYears * oneYear) / (30 * oneDay)
  )

  const remainingDays = Math.floor(
    (diff - fourYearCycles * fourYears - remainingYears * oneYear - remainingMonths * 30 * oneDay) / oneDay
  )

  const ethYear = 1964 + fourYearCycles * 4 + remainingYears
  const month = remainingMonths + 1
  const day = remainingDays + 1

  return { year: ethYear, month, day }
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