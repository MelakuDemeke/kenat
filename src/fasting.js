import { Kenat } from './Kenat.js';
import { getBahireHasab } from './bahireHasab.js';
import { findHijriMonthRanges } from './holidays.js';
import { addDays } from './dayArithmetic.js';

/**
 * Calculates the start and end dates of a specific fasting period for a given year.
 * @param {'ABIY_TSOME' | 'TSOME_HAWARYAT' | 'TSOME_NEBIYAT' | 'NINEVEH' | 'RAMADAN'} fastKey - The key for the fast.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @returns {{start: object, end: object}|null} An object with start and end PLAIN date objects.
 */
export function getFastingPeriod(fastKey, ethiopianYear) {
    const bh = getBahireHasab(ethiopianYear);

    switch (fastKey) {
        case 'ABIY_TSOME': {
            const start = bh.movableFeasts.abiyTsome.ethiopian;
            const end = bh.movableFeasts.siklet.ethiopian;
            return { start, end };
        }

        case 'TSOME_HAWARYAT': {
            const start = bh.movableFeasts.tsomeHawaryat.ethiopian;
            const end = { year: ethiopianYear, month: 11, day: 4 };
            return { start, end };
        }

        case 'NINEVEH': {
            const start = bh.movableFeasts.nineveh.ethiopian;
            const end = addDays(start, 2);
            return { start, end };
        }

        case 'TSOME_NEBIYAT': {
            const start = { year: ethiopianYear, month: 3, day: 15 };
            const end = { year: ethiopianYear, month: 4, day: 28 };
            return { start, end };
        }

        case 'RAMADAN': {
            const ranges = findHijriMonthRanges(ethiopianYear, 9);
            return ranges.length > 0 ? ranges[0] : null;
        }

        default:
            return null;
    }
}