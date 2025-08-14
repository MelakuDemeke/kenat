/**
 * Calculates all Bahire Hasab values for a given Ethiopian year, including all movable feasts.
 *
 * @param {number} ethiopianYear - The Ethiopian year to calculate for.
 * @param {Object} [options={}] - Options for language.
 * @param {string} [options.lang='amharic'] - The language for names.
 * @returns {Object} An object containing all the calculated Bahire Hasab values.
 */
export function getBahireHasab(ethiopianYear: number, options?: {
    lang?: string;
}): any;
/**
 * Calculates the date of a movable holiday for a given year.
 * This is now a pure date calculator that returns a simple date object,
 * ensuring backward compatibility with existing tests.
 *
 * @param {'ABIY_TSOME'|'TINSAYE'|'ERGET'|...} holidayKey - The key of the holiday from movableHolidayTewsak.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @returns {Object} An Ethiopian date object { year, month, day }.
 */
export function getMovableHoliday(holidayKey: any, ethiopianYear: number): any;
