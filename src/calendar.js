import { monthNames } from './monthNames.js';

/**
 * Ethiopian Calendar Library - Kenat
 * -----------------------------------
 * This file will implement core conversion logic and utilities
 * for working with the Ethiopian calendar and time system.
 */

/**
 * Convert Ethiopian date to Gregorian date.
 *
 * @param {number} ethYear - Ethiopian year
 * @param {number} ethMonth - Ethiopian month (1-13)
 * @param {number} ethDay - Ethiopian day (1-30 for months 1-12, 1-5/6 for month 13)
 * @returns {{year: number, month: number, day: number}} Gregorian date
 */
export function ethiopianToGregorian(ethYear, ethMonth, ethDay) {
    // Get Gregorian new year date for the Ethiopian year
    const newYear = getGregorianDateOfEthiopianNewYear(ethYear);

    // Calculate the number of days since Ethiopian New Year for the input date
    // Months 1-12 have 30 days, month 13 (Pagume) has 5 or 6 days
    const daysSinceNewYear = (ethMonth - 1) * 30 + ethDay - 1;

    // Calculate the day of the year in Gregorian calendar for Ethiopian New Year
    const gregorianNewYearDayOfYear = dayOfYear(newYear.gregorianYear, newYear.month, newYear.day);

    // Calculate total day of year in Gregorian calendar
    let gregorianDayOfYear = gregorianNewYearDayOfYear + daysSinceNewYear;

    // Handle leap year overflow (when day of year > 365/366)
    const gregorianYearLength = isGregorianLeapYear(newYear.gregorianYear) ? 366 : 365;
    let gregorianYear = newYear.gregorianYear;

    if (gregorianDayOfYear > gregorianYearLength) {
        gregorianDayOfYear -= gregorianYearLength;
        gregorianYear += 1;
    }

    // Convert day of year back to Gregorian month and day
    const { month, day } = monthDayFromDayOfYear(gregorianYear, gregorianDayOfYear);

    return { year: gregorianYear, month, day };
}

/**
 * Convert Gregorian date to Ethiopian date.
 *
 * @param {number} gYear - Gregorian year
 * @param {number} gMonth - Gregorian month (1-12)
 * @param {number} gDay - Gregorian day
 * @returns {{year: number, month: number, day: number}} Ethiopian date
 */
export function gregorianToEthiopian(gYear, gMonth, gDay) {
    const inputDayOfYear = dayOfYear(gYear, gMonth, gDay);

    // Get Ethiopian New Year in the Gregorian year
    const ethNewYear = getEthiopianNewYearForGregorian(gYear);
    const newYearDayOfYear = dayOfYear(ethNewYear.gregorianYear, ethNewYear.month, ethNewYear.day);

    let ethYear, daysSinceNewYear;

    if (inputDayOfYear >= newYearDayOfYear) {
        ethYear = gYear - 7; // Ethiopian year is Gregorian year - 7 when after Ethiopian new year
        daysSinceNewYear = inputDayOfYear - newYearDayOfYear;
    } else {
        ethYear = gYear - 8; // Ethiopian year is Gregorian year - 8 when before Ethiopian new year
        // Get previous year's Ethiopian New Year Gregorian date
        const prevEthNewYear = getEthiopianNewYearForGregorian(gYear - 1);
        const prevYearLength = isGregorianLeapYear(gYear - 1) ? 366 : 365;
        const prevNewYearDayOfYear = dayOfYear(prevEthNewYear.gregorianYear, prevEthNewYear.month, prevEthNewYear.day);
        daysSinceNewYear = prevYearLength - prevNewYearDayOfYear + inputDayOfYear;
    }

    // Calculate Ethiopian month and day
    const month = Math.floor(daysSinceNewYear / 30) + 1;
    const day = (daysSinceNewYear % 30) + 1;

    return { year: ethYear, month, day };
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
function isEthiopianLeapYear(year) {
    return year % 4 === 3;
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
function isGregorianLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


/**
 * Get the day of the year for given Gregorian date.
 * Jan 1 is 1.
 */
function dayOfYear(year, month, day) {
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
function monthDayFromDayOfYear(year, dayOfYear) {
    const monthLengths = [31, isGregorianLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = 1;
    while (dayOfYear > monthLengths[month - 1]) {
        dayOfYear -= monthLengths[month - 1];
        month++;
    }
    return { month, day: dayOfYear };
}

