import { toGeez } from './geezConverter.js';
import { monthNames, daysOfWeek } from './constants.js';
import { getWeekday } from './utils.js';
import type { EthiopianDate, GregorianDate, Lang, TimePeriod } from './types.js';
import type { Time } from './Time.js';

/**
 * Formats an Ethiopian date using language-specific month name and Arabic numerals.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date object
 * @param {'amharic'|'english'} [lang='amharic'] - Language for month name
 * @returns {string} Formatted string like "መስከረም 10 2016"
 */
export function formatStandard(etDate: EthiopianDate, lang: Lang = 'amharic'): string {
  const names = (monthNames as Record<string, string[]>)[lang] || monthNames.amharic;
  const monthName = names[etDate.month - 1] || `Month${etDate.month}`;
  return `${monthName} ${etDate.day} ${etDate.year}`;
}

/**
 * Formats an Ethiopian date in Geez numerals with Amharic month name.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date
 * @returns {string} Example: "መስከረም ፲፩ ፳፻፲፮"
 */
export function formatInGeezAmharic(etDate: EthiopianDate): string {
  const monthName = monthNames.amharic[etDate.month - 1] || `Month${etDate.month}`;
  return `${monthName} ${toGeez(etDate.day)} ${toGeez(etDate.year)}`;
}

/**
 * Formats an Ethiopian date and time as a string.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date
 * @param {import('../Time.js').Time} time - An instance of the Time class
 * @param {'amharic'|'english'} [lang='amharic'] - Language for suffix
 * @returns {string} Example: "መስከረም 10 2016 08:30 ጠዋት"
 */
export function formatWithTime(etDate: EthiopianDate, time: Time, lang: Lang = 'amharic'): string {
  const base = formatStandard(etDate, lang);

  // THIS IS THE FIX: Ensure zeroAsDash is false for this specific format.
  const timeString = time.format({
    lang,
    useGeez: false,
    zeroAsDash: false
  });

  return `${base} ${timeString}`;
}

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
export function formatWithWeekday(etDate: EthiopianDate, lang: Lang = 'amharic', useGeez = false): string {
  const weekdayIndex = getWeekday(etDate);
  const daysMap = daysOfWeek as Record<string, string[]>;
  const weekdayName = daysMap[lang]?.[weekdayIndex] || daysOfWeek.amharic[weekdayIndex];
  const monthName = (monthNames as Record<string, string[]>)[lang]?.[etDate.month - 1] || `Month${etDate.month}`;
  const day = useGeez ? toGeez(etDate.day) : etDate.day;
  const year = useGeez ? toGeez(etDate.year) : etDate.year;

  return `${weekdayName}, ${monthName} ${day} ${year}`;
}

/**
 * Formats a Gregorian date using its English month name.
 *
 * @param {{year: number, month: number, day: number}} gDate - Gregorian date object
 * @returns {string} Formatted string like "September 11, 2023"
 */
export function formatGregorianStandard(gDate: GregorianDate): string {
  const monthName = monthNames.gregorian[gDate.month - 1] || `Month${gDate.month}`;
  return `${monthName} ${gDate.day}, ${gDate.year}`;
}

/**
 * Formats a Gregorian date object with the weekday name, month name, day, and year.
 *
 * @param {{year: number, month: number, day: number}} gDate - Gregorian date object
 * @param {'amharic'|'english'} [lang='english'] - The language to use for the weekday name.
 * @returns {string} The formatted date string, e.g., "Monday, September 11, 2023".
 */
export function formatGregorianWithWeekday(gDate: GregorianDate, lang: Lang = 'english'): string {
  // Avoid the Date constructor's 2-digit-year-to-1900s mapping (years 0-99) by
  // setting the year explicitly via setUTCFullYear, and use UTC throughout so
  // the result doesn't depend on the runtime's local timezone/DST rules.
  const jsDate = new Date(0);
  jsDate.setUTCFullYear(gDate.year, gDate.month - 1, gDate.day);
  const weekdayIndex = jsDate.getUTCDay();
  const daysMap = daysOfWeek as Record<string, string[]>;
  const weekdayName = daysMap[lang]?.[weekdayIndex] || daysOfWeek.english[weekdayIndex];
  return `${weekdayName}, ${formatGregorianStandard(gDate)}`;
}

/**
 * Formats a Gregorian date and time as a string.
 *
 * @param {{year: number, month: number, day: number}} gDate - Gregorian date
 * @param {import('../Time.js').Time} time - An instance of the Time class
 * @param {'amharic'|'english'} [lang='amharic'] - Language for the time-of-day suffix
 * @returns {string} Example: "September 11, 2023 08:30 ጠዋት"
 */
export function formatGregorianWithTime(gDate: GregorianDate, time: Time, lang: Lang = 'amharic'): string {
  const base = formatGregorianStandard(gDate);
  const timeString = time.format({
    lang,
    useGeez: false,
    zeroAsDash: false
  });

  return `${base} ${timeString}`;
}

/**
 * Returns Ethiopian date in short "yyyy/mm/dd" format.
 * @param {{year: number, month: number, day: number}} etDate
 * @returns {string} e.g., "2017/10/25"
 */
export function formatShort(etDate: EthiopianDate): string {
  const y = etDate.year;
  const m = etDate.month.toString().padStart(2, '0');
  const d = etDate.day.toString().padStart(2, '0');
  return `${y}/${m}/${d}`;
}

/**
 * Returns an ISO-like string: "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm".
 * @param {{year: number, month: number, day: number}} etDate
 * @param {{hour: number, minute: number, period: 'day'|'night'}|null} time
 * @returns {string}
 */
export function toISODateString(etDate: EthiopianDate, time: { hour: number; minute: number; period: TimePeriod } | null = null): string {
  const y = etDate.year;
  const m = etDate.month.toString().padStart(2, '0');
  const d = etDate.day.toString().padStart(2, '0');

  if (!time) return `${y}-${m}-${d}`;

  const hr = time.hour.toString().padStart(2, '0');
  const min = time.minute.toString().padStart(2, '0');
  const suffix = time.period === 'night' ? '+12h' : '';

  return `${y}-${m}-${d}T${hr}:${min}${suffix}`;
}

/**
 * Returns a standard ISO 8601 date-time string for a Gregorian date. Unlike
 * toISODateString(), the Ethiopian `time` (12-hour, day/night) is converted to
 * Gregorian 24-hour time via Time#toGregorian() and no non-standard suffix is
 * appended, so the result is a valid ISO 8601 string parsers can consume.
 *
 * @param {{year: number, month: number, day: number}} gDate - Gregorian date
 * @param {import('./Time.js').Time|null} [time=null] - Ethiopian time to convert
 * @returns {string}
 */
export function toGregorianISODateString(gDate: GregorianDate, time: Time | null = null): string {
  const y = gDate.year;
  const m = gDate.month.toString().padStart(2, '0');
  const d = gDate.day.toString().padStart(2, '0');

  if (!time) return `${y}-${m}-${d}`;

  const { hour, minute } = time.toGregorian();
  const hr = hour.toString().padStart(2, '0');
  const min = minute.toString().padStart(2, '0');

  return `${y}-${m}-${d}T${hr}:${min}`;
}
