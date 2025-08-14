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
export function toGC(ethYear: number, ethMonth: number, ethDay: number): {
    year: number;
    month: number;
    day: number;
};
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
export function toEC(gYear: number, gMonth: number, gDay: number): {
    year: number;
    month: number;
    day: number;
};
/**
 * Converts an Ethiopian date to a Gregorian Calendar JavaScript Date object (UTC).
 *
 * @param {number} ethYear - The Ethiopian year.
 * @param {number} ethMonth - The Ethiopian month (1-based).
 * @param {number} ethDay - The Ethiopian day.
 * @returns {Date} A JavaScript Date object representing the equivalent Gregorian date in UTC.
 */
export function toGCDate(ethYear: number, ethMonth: number, ethDay: number): Date;
/**
 * Converts a JavaScript Date object to the Ethiopian Calendar (EC) date representation.
 *
 * @param {Date} dateObj - The JavaScript Date object to convert.
 * @returns {*} The Ethiopian Calendar date, as returned by the `toEC` function.
 */
export function fromDateToEC(dateObj: Date): any;
/**
 * Get Hijri year from a Gregorian date
 * @param {Date} date
 * @returns {number} hijri year
 */
export function getHijriYear(date: Date): number;
/**
 * Converts a Hijri date to the corresponding Gregorian date within a given Gregorian year.
 *
 * @param {number} hYear - Hijri year (e.g., 1445)
 * @param {number} hMonth - Hijri month (1–12)
 * @param {number} hDay - Hijri day (1–30)
 * @param {number} gregorianYear - Target Gregorian year to restrict the search range
 * @returns {Date|null} Gregorian Date object or null if not found
 */
export function hijriToGregorian(hYear: number, hMonth: number, hDay: number, gregorianYear: number): Date | null;
export const islamicFormatter: Intl.DateTimeFormat;
