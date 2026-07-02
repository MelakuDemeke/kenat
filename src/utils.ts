import { toGC } from './conversions.js';
import { InvalidInputTypeError } from './errors/errorHandler.js';
import type { EthiopianDate } from './types.js';

// --- Validation Helpers ---

/**
 * Validates that all provided date parts are numbers.
 * @param {string} funcName - The name of the function being validated.
 * @param {Object} dateParts - An object where keys are param names and values are the inputs.
 * @throws {InvalidInputTypeError} if any value is not a number.
 */
export function validateNumericInputs(funcName: string, dateParts: Record<string, unknown>): void {
    for (const [name, value] of Object.entries(dateParts)) {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new InvalidInputTypeError(funcName, name, 'number', value);
        }
    }
}

/**
 * Validates that the input is a valid Ethiopian date object.
 * @param {Object} dateObj - The object to validate.
 * @param {string} funcName - The name of the function being validated.
 * @param {string} paramName - The name of the parameter being validated.
 * @throws {InvalidInputTypeError} if the object is invalid.
 */
export function validateEthiopianDateObject(dateObj: unknown, funcName: string, paramName: string): void {
    if (typeof dateObj !== 'object' || dateObj === null) {
        throw new InvalidInputTypeError(funcName, paramName, 'object', dateObj);
    }
    const d = dateObj as Record<string, unknown>;
    validateNumericInputs(funcName, {
        [`${paramName}.year`]: d.year,
        [`${paramName}.month`]: d.month,
        [`${paramName}.day`]: d.day,
    });
}

/**
 * Validates that the input is a valid Ethiopian time object.
 * @param {Object} timeObj - The object to validate.
 * @param {string} funcName - The name of the function being validated.
 * @param {string} paramName - The name of the parameter being validated.
 * @throws {InvalidInputTypeError} if the object is invalid.
 */
export function validateEthiopianTimeObject(timeObj: unknown, funcName: string, paramName: string): void {
    if (typeof timeObj !== 'object' || timeObj === null) {
        throw new InvalidInputTypeError(funcName, paramName, 'object', timeObj);
    }
    const t = timeObj as Record<string, unknown>;
    if (typeof t.period !== 'string' || (t.period !== 'day' && t.period !== 'night')) {
        throw new InvalidInputTypeError(funcName, `${paramName}.period`, "'day' or 'night'", t.period);
    }
    validateNumericInputs(funcName, {
        [`${paramName}.hour`]: t.hour,
        [`${paramName}.minute`]: t.minute,
    });
}

/**
 * Calculates the day of the year for a given date.
 *
 * @param {number} year - The full year (e.g., 2024).
 * @param {number} month - The month (1-based, January is 1, December is 12).
 * @param {number} day - The day of the month.
 * @returns {number} The day of the year (1-based).
 */
export function dayOfYear(year: number, month: number, day: number): number {
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
export function monthDayFromDayOfYear(year: number, dayOfYear: number): { month: number; day: number } {
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
export function isGregorianLeapYear(year: number): boolean {
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
export function isEthiopianLeapYear(year: number): boolean {
    return year % 4 === 3;
}

/**
 * Returns the number of days in the given Ethiopian month and year.
 * @param {number} year - Ethiopian year
 * @param {number} month - Ethiopian month (1-13)
 * @returns {number} Number of days in the month
 */
export function getEthiopianDaysInMonth(year: number, month: number): number {
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
export function getWeekday({ year, month, day }: EthiopianDate): number {
    const g = toGC(year, month, day);
    return new Date(g.year, g.month - 1, g.day).getDay();
}

/**
 * Checks if a given Ethiopian date is valid.
 * @param {number} year - Ethiopian year
 * @param {number} month - Ethiopian month (1-13)
 * @param {number} day - Ethiopian day (1-30 or 1-5/6)
 * @returns {boolean} - True if the date is valid, otherwise false.
 */
export function isValidEthiopianDate(year: number, month: number, day: number): boolean {
    if (month < 1 || month > 13) {
        return false;
    }
    if (day < 1 || day > getEthiopianDaysInMonth(year, month)) {
        return false;
    }
    return true;
}

/**
 * Helper: Get Ethiopian New Year for a Gregorian year.
 * @param {number} gYear - The Gregorian year.
 * @returns {{gregorianYear: number, month: number, day: number}}
 * @throws {InvalidInputTypeError} If gYear is not a number.
 */
export function getEthiopianNewYearForGregorian(gYear: number): { gregorianYear: number; month: number; day: number } {
    validateNumericInputs('getEthiopianNewYearForGregorian', { gYear });
    const prevGYear = gYear - 1;
    const newYearDay = isGregorianLeapYear(prevGYear) ? 12 : 11;
    return {
        gregorianYear: gYear,
        month: 9,
        day: newYearDay
    };
}

/**
 * Returns the Gregorian date of the Ethiopian New Year for the given Ethiopian year.
 *
 * @param {number} ethiopianYear - Ethiopian calendar year.
 * @returns {{gregorianYear: number, month: number, day: number}}
 * @throws {InvalidInputTypeError} If ethiopianYear is not a number.
 */
export function getGregorianDateOfEthiopianNewYear(ethiopianYear: number): { gregorianYear: number; month: number; day: number } {
    validateNumericInputs('getGregorianDateOfEthiopianNewYear', { ethiopianYear });
    const gregorianYear = ethiopianYear + 7;
    const newYearDay = isGregorianLeapYear(gregorianYear + 1) ? 12 : 11;
    return { gregorianYear, month: 9, day: newYearDay };
}
