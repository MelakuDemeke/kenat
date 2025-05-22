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

// Start with empty function for conversion
export function gregorianToEthiopian(year, month, day) {
  // TODO: Implement conversion logic
  return { year: null, month: null, day: null };
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
function isEthiopianLeapYear(year){
    return year % 4 === 3;
}

