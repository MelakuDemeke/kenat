import { validateNumericInputs } from './utils.js';
import { addDays } from './dayArithmetic.js';
import { Kenat } from './Kenat.js';
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

    // 1. Amete Alem
    const ameteAlem = 5500 + ethiopianYear;

    // 2. Evangelist (Wengelawi) & Metene Rabiet
    const meteneRabiet = Math.floor(ameteAlem / 4);
    const evangelistRemainder = ameteAlem % 4;
    const evangelistName = evangelists[evangelistRemainder];

    // 3. New Year Day (Tinte Qemer)
    const tinteQemer = (ameteAlem + meteneRabiet) % 7;
    const newYearWeekday = newYearWeekdayMap[tinteQemer];

    // 4. Medeb & Wenber
    const medeb = ameteAlem % 19;
    const wenber = medeb === 0 ? 18 : medeb - 1;

    // 5. Abektie & Metqi
    const abektie = (wenber * 11) % 30;
    const metqi = (wenber * 19) % 30;

    // 6. Beale Metqi & Mebaja Hamer
    const bealeMetqiMonth = metqi > 14 ? 1 : 2; // 1 for Meskerem, 2 for Tikimt
    const bealeMetqiDay = metqi;
    const bealeMetqi = new Kenat({ year: ethiopianYear, month: bealeMetqiMonth, day: bealeMetqiDay });
    const bealeMetqiWeekday = daysOfWeek.english[bealeMetqi.weekday()];

    const tewsak = tewsakMap[bealeMetqiWeekday];
    const mebajaHamerSum = bealeMetqiDay + tewsak;
    // If the sum is > 30, take the remainder, otherwise use the sum itself.
    const mebajaHamer = mebajaHamerSum > 30 ? mebajaHamerSum % 30 : mebajaHamerSum;

    // 7. Nineveh Fast
    // The month of Nineveh is determined by Metqi.
    let ninevehMonth = metqi > 14 ? 5 : 6; // Base month: 5 for Tirr, 6 for Yekatit
    // If the sum of Beale Metqi and Tewsak was > 30, it rolls over to the next month.
    if (mebajaHamerSum > 30) {
        ninevehMonth++;
    }
    const ninevehDay = mebajaHamer;
    const ninevehDate = { year: ethiopianYear, month: ninevehMonth, day: ninevehDay };

    return {
        ameteAlem,
        meteneRabiet,
        evangelist: {
            name: evangelistName,
            remainder: evangelistRemainder
        },
        newYear: {
            dayName: newYearWeekday,
            tinteQemer: tinteQemer
        },
        medeb,
        wenber,
        abektie,
        metqi,
        bealeMetqi: {
            date: bealeMetqi.getEthiopian(),
            weekday: bealeMetqiWeekday,
        },
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

    // Get the base date of Nineveh for the given year
    const { nineveh } = getBahireHasab(ethiopianYear);

    // Add the tewsak days to the date of Nineveh
    return addDays(nineveh, tewsak);
}