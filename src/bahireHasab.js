import { validateNumericInputs, getWeekday } from './utils.js';
import { addDays } from './dayArithmetic.js';
import { UnknownHolidayError } from './errors/errorHandler.js';
import {
    daysOfWeek,
    evangelists,
    newYearWeekdayMap,
    tewsakMap,
    movableHolidayTewsak
} from './constants.js';


/**
 * Calculates all Bahire Hasab values for a given Ethiopian year.
 *
 * @param {number} ethiopianYear - The Ethiopian year to calculate for.
 * @returns {Object} An object containing all the calculated Bahire Hasab values.
 */
export function getBahireHasab(ethiopianYear) {
    validateNumericInputs('getBahireHasab', { ethiopianYear });

    const ameteAlem = 5500 + ethiopianYear;
    const meteneRabiet = Math.floor(ameteAlem / 4);
    const evangelistRemainder = ameteAlem % 4;
    const evangelistName = evangelists[evangelistRemainder];
    const tinteQemer = (ameteAlem + meteneRabiet) % 7;
    const newYearWeekday = newYearWeekdayMap[tinteQemer];
    const medeb = ameteAlem % 19;
    const wenber = medeb === 0 ? 18 : medeb - 1;
    const abektie = (wenber * 11) % 30;
    const metqi = (wenber * 19) % 30;

    const bealeMetqiMonth = metqi > 14 ? 1 : 2;
    const bealeMetqiDay = metqi;

    // FIX: Instead of creating a new Kenat instance, we use the standalone getWeekday utility.
    const bealeMetqiDate = { year: ethiopianYear, month: bealeMetqiMonth, day: bealeMetqiDay };
    const bealeMetqiWeekday = daysOfWeek.english[getWeekday(bealeMetqiDate)];
    
    const tewsak = tewsakMap[bealeMetqiWeekday];
    const mebajaHamerSum = bealeMetqiDay + tewsak;
    const mebajaHamer = mebajaHamerSum > 30 ? mebajaHamerSum % 30 : mebajaHamerSum;

    let ninevehMonth = metqi > 14 ? 5 : 6;
    if (mebajaHamerSum > 30) {
        ninevehMonth++;
    }
    const ninevehDate = { year: ethiopianYear, month: ninevehMonth, day: mebajaHamer };

    return {
        ameteAlem,
        meteneRabiet,
        evangelist: { name: evangelistName, remainder: evangelistRemainder },
        newYear: { dayName: newYearWeekday, tinteQemer: tinteQemer },
        medeb,
        wenber,
        abektie,
        metqi,
        bealeMetqi: { date: bealeMetqiDate, weekday: bealeMetqiWeekday },
        mebajaHamer,
        nineveh: ninevehDate
    };
}


/**
 * Calculates the date of a movable holiday for a given year.
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

    const { nineveh } = getBahireHasab(ethiopianYear);
    return addDays(nineveh, tewsak);
}
