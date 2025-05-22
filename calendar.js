// src/calendar.js

/**
 * Ethiopian Calendar Library - Kenat
 * -----------------------------------
 * This file will implement core conversion logic and utilities
 * for working with the Ethiopian calendar and time system.
 */

// TODO:
// - [ ] Convert Gregorian to Ethiopian
// - [ ] Convert Ethiopian to Gregorian
// - [ ] Handle leap years in both calendars
// - [ ] Support Ethiopian time (12-hour offset from Western time)
// - [ ] Add now() to return current Ethiopian date and time
// - [ ] Add formatting helpers (e.g., formatEthiopianDate())
// - [ ] Validate and sanitize input

/**
 * Convert Ethiopian date to Gregorian date.
 *
 * @param {number} ethYear - Ethiopian year
 * @param {number} ethMonth - Ethiopian month (1-13)
 * @param {number} ethDay - Ethiopian day (1-30 for months 1-12, 1-5/6 for month 13)
 * @returns {{year: number, month: number, day: number}} Gregorian date
 */
function ethiopianToGregorian(ethYear, ethMonth, ethDay) {
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


export function ethiopianToGregorian(year, month, day) {
    // TODO: Implement reverse conversion
    return { year: null, month: null, day: null };
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
 * Returns the Gregorian date of the Ethiopian New Year for the given Ethiopian year.
 *
 * Ethiopian New Year usually falls on September 11 in Gregorian calendar,
 * but falls on September 12 if the previous Gregorian year was a leap year.
 *
 * @param {number} ethiopianYear - Ethiopian calendar year
 * @returns {{gregorianYear: number, month: number, day: number}} - Gregorian year, month (1-12), and day of Ethiopian New Year
 */
function getGregorianDateOfEthiopianNewYear(ethiopianYear) {
    const gregorianYear = ethiopianYear + 7;  // Ethiopian year roughly equals Gregorian year - 7 or -8

    // If the previous Gregorian year is a leap year, Ethiopian new year falls on Sept 12
    const previousGregorianYear = gregorianYear - 1;
    const newYearDay = isGregorianLeapYear(previousGregorianYear) ? 12 : 11;

    return { gregorianYear, month: 9, day: newYearDay };
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