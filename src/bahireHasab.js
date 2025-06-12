/* /src/bahireHasab.js (Updated with DRY refactor) */

import { validateNumericInputs, getWeekday } from './utils.js';
import { addDays } from './dayArithmetic.js';
import { UnknownHolidayError } from './errors/errorHandler.js';
import {
    daysOfWeek,
    evangelistNames,
    tewsakMap,
    movableHolidayTewsak,
    keyToTewsakMap,
    holidayInfo,
    movableHolidays
} from './constants.js';

/**
 * INTERNAL: The single engine for all core Bahire Hasab calculations.
 * This function is not exported and only returns raw, un-translated numbers and dates.
 */
function _calculateBahireHasabBase(ethiopianYear) {
    const ameteAlem = 5500 + ethiopianYear;
    const meteneRabiet = Math.floor(ameteAlem / 4);
    const evangelistRemainder = ameteAlem % 4;
    const tinteQemer = (ameteAlem + meteneRabiet) % 7;
    
    const medeb = ameteAlem % 19;
    const wenber = medeb === 0 ? 18 : medeb - 1;
    const abektie = (wenber * 11) % 30;
    const metqi = (wenber * 19) % 30;

    const bealeMetqiMonth = metqi > 14 ? 1 : 2;
    const bealeMetqiDay = metqi;
    const bealeMetqiDate = { year: ethiopianYear, month: bealeMetqiMonth, day: bealeMetqiDay };
    
    const tewsak = tewsakMap[daysOfWeek.english[getWeekday(bealeMetqiDate)]];
    const mebajaHamerSum = bealeMetqiDay + tewsak;
    const mebajaHamer = mebajaHamerSum > 30 ? mebajaHamerSum % 30 : mebajaHamerSum;

    let ninevehMonth = metqi > 14 ? 5 : 6;
    if (mebajaHamerSum > 30) ninevehMonth++;
    const ninevehDate = { year: ethiopianYear, month: ninevehMonth, day: mebajaHamer };

    return {
        ameteAlem, meteneRabiet, evangelistRemainder, tinteQemer,
        medeb, wenber, abektie, metqi,
        bealeMetqiDate, mebajaHamer, ninevehDate
    };
}


/**
 * Calculates all Bahire Hasab values for a given Ethiopian year, including all movable feasts.
 */
export function getBahireHasab(ethiopianYear, options = {}) {
    validateNumericInputs('getBahireHasab', { ethiopianYear });
    const { lang = 'amharic' } = options;

    // Use the base calculation engine
    const base = _calculateBahireHasabBase(ethiopianYear);

    const evangelistName = evangelistNames[lang]?.[base.evangelistRemainder] || evangelistNames.english[base.evangelistRemainder];
    const weekdayIndex = (base.tinteQemer + 6) % 7;
    const newYearWeekday = daysOfWeek[lang]?.[weekdayIndex] || daysOfWeek.english[weekdayIndex];
    
    // Build the rich movableFeasts object
    const movableFeasts = {};
    const tewsakToKeyMap = Object.entries(keyToTewsakMap).reduce((acc, [key, val]) => {
        acc[val] = key; return acc;
    }, {});
    Object.keys(movableHolidayTewsak).forEach(tewsakKey => {
        const holidayKey = tewsakToKeyMap[tewsakKey];
        if (holidayKey) {
            const date = addDays(base.ninevehDate, movableHolidayTewsak[tewsakKey]);
            const info = holidayInfo[holidayKey];
            const rules = movableHolidays[holidayKey];
            movableFeasts[holidayKey] = {
                key: holidayKey, tags: rules.tags, movable: true,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: date,
            };
        }
    });

    return {
        ameteAlem: base.ameteAlem,
        meteneRabiet: base.meteneRabiet,
        evangelist: { name: evangelistName, remainder: base.evangelistRemainder },
        newYear: { dayName: newYearWeekday, tinteQemer: base.tinteQemer },
        medeb: base.medeb, wenber: base.wenber, abektie: base.abektie, metqi: base.metqi,
        bealeMetqi: { date: base.bealeMetqiDate, weekday: daysOfWeek.english[getWeekday(base.bealeMetqiDate)] },
        mebajaHamer: base.mebajaHamer,
        nineveh: base.ninevehDate,
        movableFeasts
    };
}


/**
 * Calculates the date of a movable holiday for a given year.
 * This is a pure date calculator for backward compatibility with tests.
 */
export function getMovableHoliday(holidayKey, ethiopianYear) {
    validateNumericInputs('getMovableHoliday', { ethiopianYear });

    const tewsak = movableHolidayTewsak[holidayKey];
    if (tewsak === undefined) {
        throw new UnknownHolidayError(holidayKey);
    }
    
    // Use the base calculation engine
    const { ninevehDate } = _calculateBahireHasabBase(ethiopianYear);

    return addDays(ninevehDate, tewsak);
}
