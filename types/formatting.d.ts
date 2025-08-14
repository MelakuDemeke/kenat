/**
 * Formats an Ethiopian date using language-specific month name and Arabic numerals.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date object
 * @param {'amharic'|'english'} [lang='amharic'] - Language for month name
 * @returns {string} Formatted string like "መስከረም 10 2016"
 */
export function formatStandard(etDate: {
    year: number;
    month: number;
    day: number;
}, lang?: "amharic" | "english"): string;
/**
 * Formats an Ethiopian date in Geez numerals with Amharic month name.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date
 * @returns {string} Example: "መስከረም ፲፩ ፳፻፲፮"
 */
export function formatInGeezAmharic(etDate: {
    year: number;
    month: number;
    day: number;
}): string;
/**
 * Formats an Ethiopian date and time as a string.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date
 * @param {import('../Time.js').Time} time - An instance of the Time class
 * @param {'amharic'|'english'} [lang='amharic'] - Language for suffix
 * @returns {string} Example: "መስከረም 10 2016 08:30 ጠዋት"
 */
export function formatWithTime(etDate: {
    year: number;
    month: number;
    day: number;
}, time: any, lang?: "amharic" | "english"): string;
/**
 * Formats an Ethiopian date object with the weekday name, month name, day, and year.
 *
 * @param {Object} etDate - The Ethiopian date object to format.
 * @param {number} etDate.day - The day of the month.
 * @param {number} etDate.month - The month number (1-based).
 * @param {number} etDate.year - The year.
 * @param {string} [lang='amharic'] - The language to use for weekday and month names ('amharic', 'english', etc.).
 * @param {boolean} [useGeez=false] - Whether to format the day and year in Geez numerals.
 * @returns {string} The formatted date string, e.g., "ማክሰኞ, መስከረም 1 2016".
 */
export function formatWithWeekday(etDate: {
    day: number;
    month: number;
    year: number;
}, lang?: string, useGeez?: boolean): string;
/**
 * Returns Ethiopian date in short "yyyy/mm/dd" format.
 * @param {{year: number, month: number, day: number}} etDate
 * @returns {string} e.g., "2017/10/25"
 */
export function formatShort(etDate: {
    year: number;
    month: number;
    day: number;
}): string;
/**
 * Returns an ISO-like string: "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm".
 * @param {{year: number, month: number, day: number}} etDate
 * @param {{hour: number, minute: number, period: 'day'|'night'}|null} time
 * @returns {string}
 */
export function toISODateString(etDate: {
    year: number;
    month: number;
    day: number;
}, time?: {
    hour: number;
    minute: number;
    period: "day" | "night";
} | null): string;
