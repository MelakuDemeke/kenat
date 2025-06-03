import { toGeez } from './geezConverter.js';
import { monthNames } from './constants.js';

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
 * @param {{hour: number, minute: number, period: 'day'|'night'}} time - Ethiopian time
 * @param {'amharic'|'english'} [lang='amharic'] - Language for suffix
 * @returns {string} Example: "መስከረም 10 2016 08:30 ጠዋት"
 */
export function formatWithTime(etDate, time, lang = 'amharic') {
  const base = formatStandard(etDate, lang);
  const hour = time?.hour?.toString().padStart(2, '0') ?? '??';
  const minute = time?.minute?.toString().padStart(2, '0') ?? '??';
  const suffix = lang === 'amharic'
    ? (time?.period === 'day' ? 'ጠዋት' : 'ማታ')
    : (time?.period === 'day' ? 'day' : 'night');
  return `${base} ${hour}:${minute} ${suffix}`;
}
