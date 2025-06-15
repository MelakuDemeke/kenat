import { validateNumericInputs, getWeekday } from './utils.js';
import { addDays } from './dayArithmetic.js';
import { toGC } from './conversions.js';
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
 * Calculates all Bahire Hasab values for a given Ethiopian year, including all movable feasts.
 *
 * @param {number} ethiopianYear - The Ethiopian year to calculate for.
 * @param {Object} [options={}] - Options for language.
 * @param {string} [options.lang='amharic'] - The language for names.
 * @returns {Object} An object containing all the calculated Bahire Hasab values.
 */
export function getBahireHasab(ethiopianYear, options = {}) {
    validateNumericInputs('getBahireHasab', { ethiopianYear });
    const { lang = 'amharic' } = options;

    const base = _calculateBahireHasabBase(ethiopianYear);

    const evangelistRemainder = base.ameteAlem % 4;
    const evangelistName = evangelistNames[lang]?.[evangelistRemainder] || evangelistNames.english[evangelistRemainder];

    const tinteQemer = (base.ameteAlem + base.meteneRabiet) % 7;
    const weekdayIndex = (tinteQemer + 1) % 7; 
    const newYearWeekday = daysOfWeek[lang]?.[weekdayIndex] || daysOfWeek.english[weekdayIndex];
    
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
                key: holidayKey,
                tags: rules.tags,
                movable: true,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: date,
                gregorian: toGC(date.year, date.month, date.day)
            };
        }
    });

    return {
        ameteAlem: base.ameteAlem,
        meteneRabiet: base.meteneRabiet,
        evangelist: { name: evangelistName, remainder: evangelistRemainder },
        newYear: { dayName: newYearWeekday, tinteQemer: tinteQemer },
        medeb: base.medeb,
        wenber: base.wenber,
        abektie: base.abektie,
        metqi: base.metqi,
        bealeMetqi: { date: base.bealeMetqiDate, weekday: base.bealeMetqiWeekday },
        mebajaHamer: base.mebajaHamer,
        nineveh: base.ninevehDate,
        movableFeasts
    };
}


/**
 * Calculates the date of a movable holiday for a given year.
 * This is now a pure date calculator that returns a simple date object,
 * ensuring backward compatibility with existing tests.
 *
 * @param {'ABIY_TSOME'|'TINSAYE'|'ERGET'|...} holidayKey - The key of the holiday from movableHolidayTewsak.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @returns {Object} An Ethiopian date object { year, month, day }.
 */
export function getMovableHoliday(holidayKey, ethiopianYear) {
    validateNumericInputs('getMovableHoliday', { ethiopianYear });

    const tewsak = movableHolidayTewsak[holidayKey];
    if (tewsak === undefined) {
        throw new UnknownHolidayError(holidayKey);
    }
    
    const { ninevehDate } = _calculateBahireHasabBase(ethiopianYear);

    return addDays(ninevehDate, tewsak);
}


/**
 * Calculates and returns all base values for the Bahire Hasab system for a given Ethiopian year.
 * This helper is the single source of truth for the core computational logic.
 *
 * @param {number} ethiopianYear - The Ethiopian year for which to perform the calculations.
 * @returns {{
 * ameteAlem: number,
 * meteneRabiet: number,
 * medeb: number,
 * wenber: number,
 * abektie: number,
 * metqi: number,
 * bealeMetqiDate: { year: number, month: number, day: number },
 * bealeMetqiWeekday: string,
 * mebajaHamer: number,
 * ninevehDate: { year: number, month: number, day: number }
 * }} An object containing all core calculated values.
 */
function _calculateBahireHasabBase(ethiopianYear) {
    const ameteAlem = 5500 + ethiopianYear;
    const meteneRabiet = Math.floor(ameteAlem / 4);
    const medeb = ameteAlem % 19;
    const wenber = medeb === 0 ? 18 : medeb - 1;
    const abektie = (wenber * 11) % 30;
    const metqi = (wenber * 19) % 30;

    const bealeMetqiMonth = metqi > 14 ? 1 : 2;
    const bealeMetqiDay = metqi;
    const bealeMetqiDate = { year: ethiopianYear, month: bealeMetqiMonth, day: bealeMetqiDay };
    
    const bealeMetqiWeekday = daysOfWeek.english[getWeekday(bealeMetqiDate)];
    const tewsak = tewsakMap[bealeMetqiWeekday];
    const mebajaHamerSum = bealeMetqiDay + tewsak;
    const mebajaHamer = mebajaHamerSum > 30 ? mebajaHamerSum % 30 : mebajaHamerSum;

    let ninevehMonth = metqi > 14 ? 5 : 6;
    if (mebajaHamerSum > 30) ninevehMonth++;
    const ninevehDate = { year: ethiopianYear, month: ninevehMonth, day: mebajaHamer };

    return {
        ameteAlem,
        meteneRabiet,
        medeb,
        wenber,
        abektie,
        metqi,
        bealeMetqiDate,
        bealeMetqiWeekday,
        mebajaHamer,
        ninevehDate,
    };
}