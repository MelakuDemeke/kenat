/**
 * Calculates the start and end dates of a specific fasting period for a given year.
 * @param {'ABIY_TSOME' | 'TSOME_HAWARYAT' | 'TSOME_NEBIYAT' | 'NINEVEH' | 'RAMADAN'} fastKey - The key for the fast.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @returns {{start: object, end: object}|null} An object with start and end PLAIN date objects.
 */
export function getFastingPeriod(fastKey: "ABIY_TSOME" | "TSOME_HAWARYAT" | "TSOME_NEBIYAT" | "NINEVEH" | "RAMADAN", ethiopianYear: number): {
    start: object;
    end: object;
} | null;
/**
 * Returns fasting information (names, descriptions, period) for a given fast and year.
 * @param {'ABIY_TSOME'|'TSOME_HAWARYAT'|'TSOME_NEBIYAT'|'NINEVEH'|'RAMADAN'} fastKey
 * @param {number} ethiopianYear
 * @param {{lang?: 'amharic'|'english'}} options
 * @returns {{ key: string, name: string, description: string, period: { start: object, end: object } } | null}
 */
export function getFastingInfo(fastKey: "ABIY_TSOME" | "TSOME_HAWARYAT" | "TSOME_NEBIYAT" | "NINEVEH" | "RAMADAN", ethiopianYear: number, options?: {
    lang?: "amharic" | "english";
}): {
    key: string;
    name: string;
    description: string;
    period: {
        start: object;
        end: object;
    };
} | null;
/**
 * Return an array of day numbers in the given Ethiopian month that belong to a fasting period.
 * For TSOME_DIHENET, it returns all Wednesdays and Fridays excluding the 50-day period after Easter (through Pentecost).
 * For fixed/range fasts, it returns the days intersecting the fast period.
 *
 * @param {string} fastKey - One of FastingKeys
 * @param {number} year - Ethiopian year
 * @param {number} month - Ethiopian month (1-13)
 * @returns {number[]}
 */
export function getFastingDays(fastKey: string, year: number, month: number): number[];
