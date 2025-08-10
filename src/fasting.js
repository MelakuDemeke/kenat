import { getBahireHasab } from './bahireHasab.js';
import { findHijriMonthRanges } from './holidays.js';
import { addDays } from './dayArithmetic.js';
import { fastingInfo, FastingKeys } from './constants.js';
import { validateNumericInputs } from './utils.js';

/**
 * Calculates the start and end dates of a specific fasting period for a given year.
 * @param {'ABIY_TSOME' | 'TSOME_HAWARYAT' | 'TSOME_NEBIYAT' | 'NINEVEH' | 'RAMADAN'} fastKey - The key for the fast.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @returns {{start: object, end: object}|null} An object with start and end PLAIN date objects.
 */
export function getFastingPeriod(fastKey, ethiopianYear) {
    const bh = getBahireHasab(ethiopianYear);

    switch (fastKey) {
        case FastingKeys.ABIY_TSOME: {
            const start = bh.movableFeasts.abiyTsome?.ethiopian;
            const end = bh.movableFeasts.siklet?.ethiopian;
            if (start && end) {
                return { start, end };
            }
            return null;
        }

        case FastingKeys.TSOME_HAWARYAT: {
            const start = bh.movableFeasts.tsomeHawaryat?.ethiopian;
            const end = { year: ethiopianYear, month: 11, day: 4 };
            if (start) {
                return { start, end };
            }
            return null;
        }

        case FastingKeys.NINEVEH: {
            const start = bh.movableFeasts.nineveh?.ethiopian;
            if (start) {
                const end = addDays(start, 2);
                return { start, end };
            }
            return null;
        }

        case FastingKeys.TSOME_NEBIYAT: {
            const start = { year: ethiopianYear, month: 3, day: 15 };
            const end = { year: ethiopianYear, month: 4, day: 28 };
            return { start, end };
        }

        case FastingKeys.FILSETA: {
            // Nehase 1 to Nehase 14
            const start = { year: ethiopianYear, month: 12, day: 1 };
            const end = { year: ethiopianYear, month: 12, day: 14 };
            return { start, end };
        }

        case FastingKeys.RAMADAN: {
            const ranges = findHijriMonthRanges(ethiopianYear, 9);
            return ranges.length > 0 ? ranges[0] : null;
        }

        default:
            return null;
    }
}

// Map external keys to internal keys used in fastingInfo
const fastingKeyAliases = null;

/**
 * Returns fasting information (names, descriptions, period) for a given fast and year.
 * @param {'ABIY_TSOME'|'TSOME_HAWARYAT'|'TSOME_NEBIYAT'|'NINEVEH'|'RAMADAN'} fastKey
 * @param {number} ethiopianYear
 * @param {{lang?: 'amharic'|'english'}} options
 * @returns {{ key: string, name: string, description: string, period: { start: object, end: object } } | null}
 */
export function getFastingInfo(fastKey, ethiopianYear, options = {}) {
    validateNumericInputs('getFastingInfo', { ethiopianYear });
    const { lang = 'amharic' } = options;
    const info = fastingInfo[fastKey];
    if (!info) return null;

    const name = info?.name?.[lang] || info?.name?.english;
    const description = info?.description?.[lang] || info?.description?.english;
    const period = getFastingPeriod(fastKey, ethiopianYear);
    if (!period) return null;

    return {
        key: fastKey,
        name,
        description,
        tags: info.tags,
        period,
    };
}
