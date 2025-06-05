import { toEC, toGC } from './conversions.js';
import { holidayNames } from './constants.js';

export const HolidayTags = {
    PUBLIC: 'public',
    RELIGIOUS: 'religious',
    CHRISTIAN: 'christian',
    MUSLIM: 'muslim',
    STATE: 'state',
    CULTURAL: 'cultural',
    OTHER: 'other'
};

export const fixedHolidayName = {

    enkutatash: {
        key: 'enkutatash',
        month: 1,
        day: 1,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.CULTURAL],
        name: holidayNames.enkutatash,
        description: 'Marks the start of the Ethiopian year; symbolizes renewal and the end of the rainy season.'
    },

    meskel: {
        key: 'meskel',
        month: 1,
        day: 17,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.meskel,
        description: 'Commemorates the discovery of the True Cross by Empress Helena in the 4th century.'
    },

    beherbehereseb: {
        key: 'beherbehereseb',
        month: 3,
        day: 20,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.beherbehereseb,
        description: 'This holiday acknowledges and celebrates the diversity of Ethiopias ethnic groups, affirming their equal rights and fostering unity through culture and language '
    },

    gena: {
        key: 'gena',
        month: 4,
        day: 29,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.gena,
        description: 'Ethiopian Orthodox Christmas celebrating the birth of Jesus Christ.'
    },

    timket: {
        key: 'timket',
        month: 5,
        day: 11,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.timket,
        description: 'Commemorates the baptism of Jesus in the Jordan River.'
    },

    MartyrsDay: {
        key: 'martyrsDay',
        month: 6,
        day: 12,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.martyrsDay,
        description: 'Honors those who sacrificed their lives for Ethiopia’s freedom and independence.'
    },

    adwa: {
        key: 'adwa',
        month: 6,
        day: 23,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.adwa,
        description: 'Celebrates Ethiopia’s victory over Italian colonizers in 1896.'
    },

    labour: {
        key: 'labour',
        month: 8,
        day: 23,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.labour,
        description: 'A global celebration of workers and labor rights.'
    },

    patriots: {
        key: 'patriots',
        month: 8,
        day: 27,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.patriots,
        description: 'Honors Ethiopian resistance fighters who defeated Italian occupation.'
    },
};

export const movableHolidays = {

    eidFitr: {
        key: 'eidFitr',
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: holidayNames.eidFitr,
        description: 'Marks the end of Ramadan, the month of fasting for Muslims.'
    },

    siklet: {
        key: 'siklet',
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.siklet,
        description: 'Marks the crucifixion of Jesus Christ.'
    },

    fasika: {
        key: 'fasika',
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.fasika,
        description: 'Celebrates the resurrection of Jesus Christ. One of the most important Christian holidays in Ethiopia.'
    },

    eidAdha: {
        key: 'eidAdha',
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: holidayNames.eidAdha,
        description: 'Commemorates Abraham’s willingness to sacrifice his son as an act of obedience to God.'
    },

    moulid: {
        key: 'moulid',
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: holidayNames.moulid,
        description: 'Celebrates the birthday of the Prophet Mohammed.'
    },
}
// TODO: Impove the acuracy of the Eid dates by using astronomical calculations or lunar observations.

/**
 * Calculates the date of Fasika (Ethiopian Easter) for a given Ethiopian year.
 *
 * This function uses the Meeus algorithm to compute the Julian Easter date,
 * converts it to the Gregorian calendar, and then converts the Gregorian date
 * back to the Ethiopian calendar.
 *
 * @param {number} ethYear - The Ethiopian year for which to calculate Fasika.
 * @returns {Object} An object containing:
 *   - {Object} gregorian: The Gregorian date of Fasika.
 *     - {number} year - Gregorian year.
 *     - {number} month - Gregorian month (1-based).
 *     - {number} day - Gregorian day.
 *   - {Object} ethiopian: The Ethiopian date of Fasika.
 *     - {number} year - Ethiopian year.
 *     - {number} month - Ethiopian month (1-based).
 *     - {number} day - Ethiopian day.
 */
export function getFasikaDate(ethYear) {
    const gYear = ethYear + 8; // Convert Ethiopian year to Gregorian year

    // Julian Easter calculation (Meeus algorithm)
    const a = gYear % 4;
    const b = gYear % 7;
    const c = gYear % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31); // March or April
    const day = ((d + e + 114) % 31) + 1;

    // Convert Julian to Gregorian (add 13 days)
    const easterGregorian = new Date(Date.UTC(gYear, month - 1, day + 13));
    const gYearFinal = easterGregorian.getUTCFullYear();
    const gMonth = easterGregorian.getUTCMonth() + 1;
    const gDay = easterGregorian.getUTCDate();

    // Convert Gregorian to Ethiopian
    const { year: eYear, month: eMonth, day: eDay } = toEC(gYear, gMonth, gDay);

    return {
        gregorian: {
            year: gYearFinal,
            month: gMonth,
            day: gDay
        },
        ethiopian: {
            year: eYear,
            month: eMonth,
            day: eDay
        }
    };
}

/**
 * Calculates the date of Siklet (Good Friday) for a given Ethiopian year.
 *
 * Siklet is observed two days before Fasika (Ethiopian Easter).
 * This function determines the Gregorian and Ethiopian dates for Siklet.
 *
 * @param {number} ethYear - The Ethiopian year for which to calculate Siklet.
 * @returns {{ 
 *   gregorian: { year: number, month: number, day: number }, 
 *   ethiopian: { year: number, month: number, day: number } 
 * }} An object containing the Siklet date in both Gregorian and Ethiopian calendars.
 */
export function getSikletDate(ethYear) {
    const fasika = getFasikaDate(ethYear);
    const { year, month, day } = fasika.gregorian;

    const fasikaDate = new Date(Date.UTC(year, month - 1, day));
    fasikaDate.setUTCDate(fasikaDate.getUTCDate() - 2);

    const gYear = fasikaDate.getUTCFullYear();
    const gMonth = fasikaDate.getUTCMonth() + 1;
    const gDay = fasikaDate.getUTCDate();

    const eth = toEC(gYear, gMonth, gDay);

    return {
        gregorian: {
            year: gYear,
            month: gMonth,
            day: gDay
        },
        ethiopian: {
            year: eth.year,
            month: eth.month,
            day: eth.day
        }
    };
}

/**
 * Estimates the date of Eid al-Fitr for a given Ethiopian year.
 *
 * The calculation is based on a reference Eid date in the Ethiopian year 2014 (Gregorian 2022-05-02),
 * and shifts the date by approximately 10.875 days per Ethiopian year difference.
 * The result is an estimate and may be off by ±1 day.
 *
 * @param {number} ethiopianYear - The Ethiopian year for which to estimate Eid al-Fitr.
 * @returns {Object} An object containing:
 *   - {Object} gregorian: The estimated Gregorian date ({ year, month, day }).
 *   - {Object} ethiopian: The corresponding Ethiopian date ({ year, month, day }).
 *   - {string} note: A note indicating the estimate's accuracy.
 */
export function getEidFitrDate(ethiopianYear, ethiopianMonth = 9) {
    const baseEthiopianYear = 2014;
    const baseEidDate = { year: 2022, month: 5, day: 2 }; // Eid in 2014 E.C.
    const daysPerYearShift = 10.875;

    let gregorianDate;

    const gregorianBaseYear = toGC(ethiopianYear, ethiopianMonth, 1).year;
    const yearDiff = ethiopianYear - baseEthiopianYear;
    const baseDate = new Date(gregorianBaseYear, 4, 2);

    const daysToShift = Math.round(yearDiff * daysPerYearShift);

    baseDate.setDate(baseDate.getDate() - daysToShift);

    gregorianDate = {
        year: baseDate.getFullYear(),
        month: baseDate.getMonth() + 1,
        day: baseDate.getDate(),
    };

    const ethiopianDate = toEC(
        gregorianDate.year,
        gregorianDate.month,
        gregorianDate.day
    );

    const result = {
        gregorian: gregorianDate,
        ethiopian: ethiopianDate,
        note: 'Estimated ±1 day',
    };

    return result;
}

/**
 * Estimates the date of Eid al-Adha for a given Ethiopian year.
 *
 * Uses a base Gregorian date and shifts approx. 10.875 days per Ethiopian year.
 * Result is an estimate and may be off by ±1 day.
 *
 * @param {number} ethiopianYear - Ethiopian year.
 * @returns {Object} Estimated date in Gregorian and Ethiopian calendars with note.
 */
export function getEidAdhaDate(ethiopianYear) {
    const baseEthiopianYear = 2014;
    const baseEidAdhaDate = { year: 2022, month: 7, day: 9 }; // Eid al-Adha in 2014 E.C.
    const daysPerYearShift = 10.875;

    const gregorianBaseYear = ethiopianYear + 8;
    const yearDiff = ethiopianYear - baseEthiopianYear;

    const baseDate = new Date(gregorianBaseYear, baseEidAdhaDate.month - 1, baseEidAdhaDate.day);
    const daysToShift = Math.round(yearDiff * daysPerYearShift);

    baseDate.setDate(baseDate.getDate() - daysToShift);

    const gregorianDate = {
        year: baseDate.getFullYear(),
        month: baseDate.getMonth() + 1,
        day: baseDate.getDate(),
    };

    const ethiopianDate = toEC(
        gregorianDate.year,
        gregorianDate.month,
        gregorianDate.day
    );

    return {
        gregorian: gregorianDate,
        ethiopian: ethiopianDate,
        note: 'Estimated ±1 day',
    };
}

/**
 * Estimates the date of Moulid (Birth of Prophet Mohammed) for a given Ethiopian year.
 *
 * Uses a base Gregorian date and shifts approx. 10.875 days per Ethiopian year.
 * Result is an estimate and may be off by ±1 day.
 *
 * @param {number} ethiopianYear - Ethiopian year.
 * @returns {Object} Estimated date in Gregorian and Ethiopian calendars with note.
 */
export function getMoulidDate(ethiopianYear) {
    const baseEthiopianYear = 2014;
    const baseMoulidDate = { year: 2022, month: 10, day: 8 }; // Moulid in 2014 E.C.
    const daysPerYearShift = 10.875;

    const gregorianBaseYear = ethiopianYear + 8;
    const yearDiff = ethiopianYear - baseEthiopianYear;

    const baseDate = new Date(gregorianBaseYear, baseMoulidDate.month - 1, baseMoulidDate.day);
    const daysToShift = Math.round(yearDiff * daysPerYearShift);

    baseDate.setDate(baseDate.getDate() - daysToShift);

    const gregorianDate = {
        year: baseDate.getFullYear(),
        month: baseDate.getMonth() + 1,
        day: baseDate.getDate(),
    };

    const ethiopianDate = toEC(
        gregorianDate.year,
        gregorianDate.month,
        gregorianDate.day
    );

    return {
        gregorian: gregorianDate,
        ethiopian: ethiopianDate,
        note: 'Estimated ±1 day',
    };
}

/**
 * Returns a list of holidays occurring in a given Ethiopian month and year.
 *
 * The function collects both fixed-date and movable holidays, returning them as
 * objects containing holiday metadata and their Ethiopian date. Movable holidays
 * are calculated for the given year and included if they fall within the specified month.
 *
 * @param {number} ethYear - The Ethiopian year for which to retrieve holidays.
 * @param {number} ethMonth - The Ethiopian month (1-13) for which to retrieve holidays.
 * @returns {Array<Object>} An array of holiday objects for the specified month, sorted by day.
 *
 * Each holiday object contains:
 *   - {string} name: The name of the holiday.
 *   - {string} [description]: Optional description of the holiday.
 *   - {Object} ethiopian: The Ethiopian date of the holiday ({ year, month, day }).
 *   - {Object} [gregorian]: The Gregorian date of the holiday ({ year, month, day }), for movable holidays.
 *   - {string|null} [note]: Optional note for movable holidays.
 */
export function getHolidaysInMonth(ethYear, ethMonth) {
    const holidays = [];

    // Helper to add a fixed holiday if it matches the month
    function tryAddFixedHoliday(holiday) {
        if (holiday.month === ethMonth) {
            holidays.push({
                ...holiday,
                ethiopian: { year: ethYear, month: holiday.month, day: holiday.day }
            });
        }
    }

    // Add fixed holidays for the month
    Object.values(fixedHolidayName).forEach(tryAddFixedHoliday);

    // Calculate movable holidays for the year
    const fasika = getFasikaDate(ethYear);
    const siklet = getSikletDate(ethYear);
    const eidFitr = getEidFitrDate(ethYear,ethMonth);
    const eidAdha = getEidAdhaDate(ethYear);
    const moulid = getMoulidDate(ethYear);

    // Add movable holidays if they fall in the month
    [fasika, siklet, eidFitr, eidAdha, moulid].forEach(movable => {
        if (movable.ethiopian.month === ethMonth) {
            let holidayKey = null;

            if (movable === fasika) holidayKey = 'fasika';
            else if (movable === siklet) holidayKey = 'siklet';
            else if (movable === eidFitr) holidayKey = 'eidFitr';
            else if (movable === eidAdha) holidayKey = 'eidAdha';
            else if (movable === moulid) holidayKey = 'moulid';

            if (holidayKey && movableHolidays[holidayKey]) {
                holidays.push({
                    ...movableHolidays[holidayKey],
                    ethiopian: movable.ethiopian,
                    gregorian: movable.gregorian,
                    note: movable.note || null,
                });
            }
        }
    });

    // Sort holidays by day of the Ethiopian month
    holidays.sort((a, b) => a.ethiopian.day - b.ethiopian.day);

    return holidays;
}

