import { toEC, toGC, hijriToGregorian, getHijriYear } from "./conversions.js";
import { holidayInfo, movableHolidayTewsak } from "./constants.js";
import { validateNumericInputs } from "./utils.js";
import { InvalidInputTypeError } from "./errors/errorHandler.js";
import { getMovableHoliday } from "./bahireHasab.js";

export const HolidayTags = {
    PUBLIC: "public",
    RELIGIOUS: "religious",
    CHRISTIAN: "christian",
    MUSLIM: "muslim",
    STATE: "state",
    CULTURAL: "cultural",
    OTHER: "other",
};

// Data structure now only contains the RULES for the holiday.
// The text (name, description) is now in holidayInfo.
const fixedHolidays = {
    enkutatash: { month: 1, day: 1, tags: [HolidayTags.PUBLIC, HolidayTags.CULTURAL] },
    meskel: { month: 1, day: 17, tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    beherbehereseb: { month: 3, day: 20, tags: [HolidayTags.PUBLIC, HolidayTags.STATE] },
    gena: { month: 4, day: 29, tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    timket: { month: 5, day: 11, tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    martyrsDay: { month: 6, day: 12, tags: [HolidayTags.PUBLIC, HolidayTags.STATE] },
    adwa: { month: 6, day: 23, tags: [HolidayTags.PUBLIC, HolidayTags.STATE] },
    labour: { month: 8, day: 23, tags: [HolidayTags.PUBLIC, HolidayTags.STATE] },
    patriots: { month: 8, day: 27, tags: [HolidayTags.PUBLIC, HolidayTags.STATE] },
};

const movableHolidays = {
    nineveh: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    abiyTsome: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    debreZeit: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    hosanna: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    siklet: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    fasika: { tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    rikbeKahnat: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    erget: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    paraclete: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    tsomeHawaryat: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    tsomeDihnet: { tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN] },
    eidFitr: { tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM] },
    eidAdha: { tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM] },
    moulid: { tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM] },
};

// These functions remain for calculating Islamic holidays
function getEidFitrDate(ethiopianYear, ethiopianMonth = 9) { /* ... existing code ... */ }
function getEidAdhaDate(ethiopianYear, ethiopianMonth = 12) { /* ... existing code ... */ }
function getMoulidDate(ethiopianYear, ethiopianMonth = 10) { /* ... existing code ... */ }
// NOTE: I've omitted the full code for these three functions for brevity, but they should remain unchanged.

/**
 * Returns a list of holidays occurring in a specific Ethiopian month and year.
 *
 * @param {number} ethYear - The Ethiopian year.
 * @param {number} ethMonth - The Ethiopian month (1-13).
 * @param {string} [lang='amharic'] - The language for names and descriptions.
 * @returns {Array<Object>} An array of holiday objects.
 */
export function getHolidaysInMonth(ethYear, ethMonth, lang = 'amharic') {
    validateNumericInputs("getHolidaysInMonth", { ethYear, ethMonth });
    if (ethMonth < 1 || ethMonth > 13) {
        throw new InvalidInputTypeError("getHolidaysInMonth", "ethMonth", "number between 1 and 13", ethMonth);
    }

    const holidays = [];

    // Process fixed holidays
    Object.entries(fixedHolidays).forEach(([key, rules]) => {
        if (rules.month === ethMonth) {
            const info = holidayInfo[key];
            holidays.push({
                key,
                tags: rules.tags,
                movable: false,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: { year: ethYear, month: rules.month, day: rules.day },
            });
        }
    });

    // A mapping from the calculation key (from movableHolidayTewsak) to the public holiday key
    const tewsakToKeyMap = {
        NINEVEH: 'nineveh',
        ABIY_TSOME: 'abiyTsome',
        DEBRE_ZEIT: 'debreZeit',
        HOSANNA: 'hosanna',
        SIKLET: 'siklet',
        TINSAYE: 'fasika', // Note the mapping here
        RIKBE_KAHNAT: 'rikbeKahnat',
        ERGET: 'erget',
        PARACLETE: 'paraclete',
        TSOME_HAWARYAT: 'tsomeHawaryat',
        TSOME_DIHENET: 'tsomeDihnet'
    };

    // Process movable Christian holidays
    Object.keys(tewsakToKeyMap).forEach(tewsakKey => {
        const date = getMovableHoliday(tewsakKey, ethYear);
        if (date.month === ethMonth) {
            const holidayKey = tewsakToKeyMap[tewsakKey];
            const rules = movableHolidays[holidayKey];
            const info = holidayInfo[holidayKey];
            holidays.push({
                key: holidayKey,
                tags: rules.tags,
                movable: true,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: date,
                gregorian: toGC(date.year, date.month, date.day),
            });
        }
    });

    // Process movable Muslim holidays
    const muslimMovable = {
        eidFitr: getEidFitrDate(ethYear, ethMonth),
        eidAdha: getEidAdhaDate(ethYear, ethMonth),
        moulid: getMoulidDate(ethYear, ethMonth),
    };

    Object.entries(muslimMovable).forEach(([key, data]) => {
        if (data && data.ethiopian.month === ethMonth) {
            const rules = movableHolidays[key];
            const info = holidayInfo[key];
            holidays.push({
                key,
                tags: rules.tags,
                movable: true,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: data.ethiopian,
                gregorian: data.gregorian,
            });
        }
    });

    holidays.sort((a, b) => a.ethiopian.day - b.ethiopian.day);
    return holidays;
}
