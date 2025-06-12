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

    const ameteAlem = 5500 + ethiopianYear;
    const meteneRabiet = Math.floor(ameteAlem / 4);
    
    const evangelistRemainder = ameteAlem % 4;
    const evangelistName = evangelistNames[lang]?.[evangelistRemainder] || evangelistNames.english[evangelistRemainder];
    const tinteQemer = (ameteAlem + meteneRabiet) % 7;
    const weekdayIndex = (tinteQemer + 1) % 7; 
    const newYearWeekday = daysOfWeek[lang]?.[weekdayIndex] || daysOfWeek.english[weekdayIndex];

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
    
    const movableFeasts = {};
    const tewsakToKeyMap = Object.entries(keyToTewsakMap).reduce((acc, [key, val]) => {
        acc[val] = key; return acc;
    }, {});

    Object.keys(movableHolidayTewsak).forEach(tewsakKey => {
        const holidayKey = tewsakToKeyMap[tewsakKey];
        if (holidayKey) {
            const date = addDays(ninevehDate, movableHolidayTewsak[tewsakKey]);
            const info = holidayInfo[holidayKey];
            const rules = movableHolidays[holidayKey];

            movableFeasts[holidayKey] = {
                key: holidayKey,
                tags: rules.tags,
                movable: true,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: date,
            };
        }
    });

    return {
        ameteAlem,
        meteneRabiet,
        evangelist: { name: evangelistName, remainder: evangelistRemainder },
        newYear: { dayName: newYearWeekday, tinteQemer: tinteQemer },
        medeb, wenber, abektie, metqi,
        bealeMetqi: { date: bealeMetqiDate, weekday: bealeMetqiWeekday },
        mebajaHamer,
        nineveh: ninevehDate,
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
    
    const { ninevehDate } = _calculateBahireHasabBase(ethiopianYear); // Using the DRY helper

    return addDays(ninevehDate, tewsak);
}


/**
 * INTERNAL: The single engine for all core Bahire Hasab calculations.
 * This function is not exported and only returns raw, un-translated numbers and dates.
 */
function _calculateBahireHasabBase(ethiopianYear) {
    const ameteAlem = 5500 + ethiopianYear;
    const meteneRabiet = Math.floor(ameteAlem / 4);
    
    const medeb = ameteAlem % 19;
    const wenber = medeb === 0 ? 18 : medeb - 1;
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

    return { ninevehDate };
}
