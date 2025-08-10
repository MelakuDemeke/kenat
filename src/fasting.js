import { getBahireHasab } from './bahireHasab.js';
import { findHijriMonthRanges } from './holidays.js';
import { addDays, diffInDays } from './dayArithmetic.js';
import { fastingInfo, FastingKeys } from './constants.js';
import { getWeekday, getEthiopianDaysInMonth, validateNumericInputs, validateEthiopianDateObject } from './utils.js';

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
    // TSOME_DIHENET is a weekly fast (Wed/Fri) with an exception; it doesn't have a single contiguous period.
    if (fastKey === FastingKeys.TSOME_DIHENET) {
        return {
            key: fastKey,
            name,
            description,
            tags: info.tags,
            period: null,
        };
    }

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

/**
 * Checks if a given Ethiopian date is an Orthodox weekly fasting day (Tsome Dihnet).
 * Rules:
 * - Fasting occurs every Wednesday and Friday.
 * - Exception: for the 50 days after Easter (Fasika) up to and including Pentecost (Paraclete),
 *   Wednesdays and Fridays are NOT considered fasting days.
 *
 * @param {{year:number, month:number, day:number}} etDate - Ethiopian date object.
 * @returns {boolean} true if it's a fasting day, false otherwise.
 */
function isTsomeDihnetFastDay(etDate) {
    validateEthiopianDateObject(etDate, 'isTsomeDihnetFastDay', 'etDate');

    const weekday = getWeekday(etDate); // 0=Sun ... 6=Sat
    const isWedOrFri = (weekday === 3 || weekday === 5);
    if (!isWedOrFri) return false;

    // Get Easter (Fasika) for the year and apply 50-day exception window
    const bh = getBahireHasab(etDate.year);
    const fasika = bh?.movableFeasts?.fasika?.ethiopian;
    const paraclete = bh?.movableFeasts?.paraclete?.ethiopian;
    if (!fasika || !paraclete) {
        // If for some reason we cannot compute the window, default to standard Wed/Fri fasting.
        return true;
    }

    const daysFromEaster = diffInDays(etDate, fasika);
    const inPentecostSeason = daysFromEaster >= 1 && diffInDays(etDate, paraclete) <= 0;
    return !inPentecostSeason;
}

// (no export) private helper only

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
export function getFastingDays(fastKey, year, month) {
    validateNumericInputs('getFastingDays', { year, month });
    const daysInMonth = getEthiopianDaysInMonth(year, month);

    if (fastKey === FastingKeys.TSOME_DIHENET) {
        const out = [];
        for (let d = 1; d <= daysInMonth; d++) {
            if (isTsomeDihnetFastDay({ year, month, day: d })) out.push(d);
        }
        return out;
    }

    // For other fasts: compute period and intersect with the month
    const period = getFastingPeriod(fastKey, year);
    if (!period) return [];

    const startYearMonth = { y: period.start.year, m: period.start.month };
    const endYearMonth = { y: period.end.year, m: period.end.month };

    // If the month is completely outside, return []
    const before = (year < startYearMonth.y) || (year === startYearMonth.y && month < startYearMonth.m);
    const after = (year > endYearMonth.y) || (year === endYearMonth.y && month > endYearMonth.m);
    if (before || after) return [];

    const startDay = (year === period.start.year && month === period.start.month) ? period.start.day : 1;
    const endDay = (year === period.end.year && month === period.end.month) ? period.end.day : daysInMonth;
    const result = [];
    for (let d = startDay; d <= endDay; d++) result.push(d);
    return result;
}
