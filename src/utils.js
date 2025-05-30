import { ethiopianToGregorian, gregorianToEthiopian } from './conversions.js';

/**
 * Calculates the day of the year for a given date.
 *
 * @param {number} year - The full year (e.g., 2024).
 * @param {number} month - The month (1-based, January is 1, December is 12).
 * @param {number} day - The day of the month.
 * @returns {number} The day of the year (1-based).
 */
export function dayOfYear(year, month, day) {
    const monthLengths = [31, isGregorianLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let doy = 0;
    for (let i = 0; i < month - 1; i++) {
        doy += monthLengths[i];
    }
    doy += day;
    return doy;
}

/**
 * Convert a day of year to Gregorian month and day.
 */
export function monthDayFromDayOfYear(year, dayOfYear) {
    const monthLengths = [31, isGregorianLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = 1;
    while (dayOfYear > monthLengths[month - 1]) {
        dayOfYear -= monthLengths[month - 1];
        month++;
    }
    return { month, day: dayOfYear };
}

/**
 * Checks if the given Gregorian year is a leap year.
 *
 * Gregorian leap years occur every 4 years, except centuries not divisible by 400.
 * For example: 2000 is a leap year, 1900 is not.
 *
 * @param {number} year - Gregorian calendar year (e.g., 2025)
 * @returns {boolean} - True if the year is a leap year, otherwise false.
 */
export function isGregorianLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Checks if the given Ethiopian year is a leap year.
 *
 * Ethiopian leap years occur every 4 years, when the year modulo 4 equals 3.
 * This means years like 2011, 2015, 2019 (in Ethiopian calendar) are leap years.
 *
 * @param {number} year - Ethiopian calendar year (e.g., 2011)
 * @returns {boolean} - True if the year is a leap year, otherwise false.
 */
export function isEthiopianLeapYear(year) {
    return year % 4 === 3;
}

/**
 * Returns the number of days in the given Ethiopian month and year.
 * @param {number} year - Ethiopian year
 * @param {number} month - Ethiopian month (1-13)
 * @returns {number} Number of days in the month
 */
export function getEthiopianDaysInMonth(year, month) {
    if (month === 13) {
        return isEthiopianLeapYear(year) ? 6 : 5;
    }
    return 30;
}

/**
 * Returns the weekday (0-6) for a given Ethiopian date.
 * 
 * @param {Object} param0 - The Ethiopian date.
 * @param {number} param0.year - The Ethiopian year.
 * @param {number} param0.month - The Ethiopian month (1-13).
 * @param {number} param0.day - The Ethiopian day (1-30).
 * @returns {number} The day of the week (0 for Sunday, 6 for Saturday).
 */
export function getWeekday({ year, month, day }) {
    const g = ethiopianToGregorian(year, month, day);
    return new Date(g.year, g.month - 1, g.day).getDay();
}


/**
 * Calculates the Ethiopian Orthodox Easter (Fasika) date for a given Ethiopian year.
 *
 * This function converts the Ethiopian year to the corresponding Gregorian year,
 * computes the Julian Easter date using the Meeus algorithm, converts it to the
 * Gregorian calendar, and then converts the result back to the Ethiopian calendar.
 *
 * @param {number} ethYear - The Ethiopian year for which to calculate Fasika.
 * @returns {{ year: number, month: number, day: number }} An object containing the Ethiopian year, month, and day of Fasika.
 */
export function getFasikaDate(ethYear) {
    const gYear = ethYear + 8; // Convert Ethiopian year to Gregorian year

    // Julian Easter calculation (Meeus algorithm)
    const a = gYear % 4;
    const b = gYear % 7;
    const c = gYear % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31); // March or April
    const day = ((d + e + 114) % 31) + 1;

    // Convert Julian to Gregorian (add 13 days)
    const easterGregorian = new Date(Date.UTC(gYear, month - 1, day + 13));
    const gMonth = easterGregorian.getUTCMonth() + 1;
    const gDay = easterGregorian.getUTCDate();

    // Convert Gregorian to Ethiopian
    const { year: eYear, month: eMonth, day: eDay } = gregorianToEthiopian(gYear, gMonth, gDay);

    return {
        year: eYear,
        month: eMonth,
        day: eDay
    };
}
