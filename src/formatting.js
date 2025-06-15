import { toGeez } from './geezConverter.js';
import { monthNames } from './constants.js';
import { getWeekday } from './utils.js';
import { daysOfWeek } from './constants.js';

/**
 * Formats an Ethiopian date using language-specific month name and Arabic numerals.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date object
 * @param {'amharic'|'english'} [lang='amharic'] - Language for month name
 * @returns {string} Formatted string like "መስከረም 10 2016"
 */
export function formatStandard(etDate, lang = 'amharic') {
  const names = monthNames[lang] || monthNames.amharic;
  const monthName = names[etDate.month - 1] || `Month${etDate.month}`;
  return `${monthName} ${etDate.day} ${etDate.year}`;
}

/**
 * Formats an Ethiopian date in Geez numerals with Amharic month name.
 *
 * @param {{year: number, month: number, day: number}} etDate - Ethiopian date
 * @returns {string} Example: "መስከረም ፲፩ ፳፻፲፮"
 */
export function formatInGeezAmharic(etDate) {
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
export function formatWithTime(etDate, time, lang = 'amharic') {
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
export function formatWithWeekday(etDate, lang = 'amharic', useGeez = false) {
  const weekdayIndex = getWeekday(etDate);
  const weekdayName = daysOfWeek[lang]?.[weekdayIndex] || daysOfWeek.amharic[weekdayIndex];
  const monthName = monthNames[lang]?.[etDate.month - 1] || `Month${etDate.month}`;
  const day = useGeez ? toGeez(etDate.day) : etDate.day;
  const year = useGeez ? toGeez(etDate.year) : etDate.year;

  return `${weekdayName}, ${monthName} ${day} ${year}`;
}

/**
 * Returns Ethiopian date in short "yyyy/mm/dd" format.
 * @param {{year: number, month: number, day: number}} etDate 
 * @returns {string} e.g., "2017/10/25"
 */
export function formatShort(etDate) {
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
export function toISODateString(etDate, time = null) {
  const y = etDate.year;
  const m = etDate.month.toString().padStart(2, '0');
  const d = etDate.day.toString().padStart(2, '0');

  if (!time) return `${y}-${m}-${d}`;

  const hr = time.hour.toString().padStart(2, '0');
  const min = time.minute.toString().padStart(2, '0');
  const suffix = time.period === 'night' ? '+12h' : '';

  return `${y}-${m}-${d}T${hr}:${min}${suffix}`;
}