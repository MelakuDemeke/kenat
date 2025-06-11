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

export function getEidFitrDate(ethiopianYear, ethiopianMonth = 9) {
    validateNumericInputs("getEidFitrDate", { ethiopianYear, ethiopianMonth });
    const gregorianYear = toGC(ethiopianYear, ethiopianMonth, 1).year;
    const year = Number(gregorianYear);
    const hijriYearStart = getHijriYear(new Date(year, 0, 1)),
        hijriYearEnd = getHijriYear(new Date(year, 11, 31));
    const eidStartYear = hijriToGregorian(hijriYearStart, 10, 1, year);
    if (eidStartYear)
        return {
            gregorian: {
                year: eidStartYear.getFullYear(),
                month: eidStartYear.getMonth() + 1,
                day: eidStartYear.getDate(),
            },
            ethiopian: toEC(
                eidStartYear.getFullYear(),
                eidStartYear.getMonth() + 1,
                eidStartYear.getDate()
            ),
        };
    const eidEndYear = hijriToGregorian(hijriYearEnd, 10, 1, year);
    if (eidEndYear)
        return {
            gregorian: {
                year: eidEndYear.getFullYear(),
                month: eidEndYear.getMonth() + 1,
                day: eidEndYear.getDate(),
            },
            ethiopian: toEC(
                eidEndYear.getFullYear(),
                eidEndYear.getMonth() + 1,
                eidEndYear.getDate()
            ),
        };
    return null;
}

export function getEidAdhaDate(ethiopianYear, ethiopianMonth = 12) {
    validateNumericInputs("getEidAdhaDate", { ethiopianYear, ethiopianMonth });
    const gregorianYear = toGC(ethiopianYear, ethiopianMonth, 1).year;
    const year = Number(gregorianYear);
    const hijriMonth = 12,
        hijriDay = 10;
    const hijriYearStart = getHijriYear(new Date(year, 0, 1)),
        hijriYearEnd = getHijriYear(new Date(year, 11, 31));
    const eidStart = hijriToGregorian(hijriYearStart, hijriMonth, hijriDay, year);
    if (eidStart)
        return {
            gregorian: {
                year: eidStart.getFullYear(),
                month: eidStart.getMonth() + 1,
                day: eidStart.getDate(),
            },
            ethiopian: toEC(
                eidStart.getFullYear(),
                eidStart.getMonth() + 1,
                eidStart.getDate()
            ),
        };
    const eidEnd = hijriToGregorian(hijriYearEnd, hijriMonth, hijriDay, year);
    if (eidEnd)
        return {
            gregorian: {
                year: eidEnd.getFullYear(),
                month: eidEnd.getMonth() + 1,
                day: eidEnd.getDate(),
            },
            ethiopian: toEC(
                eidEnd.getFullYear(),
                eidEnd.getMonth() + 1,
                eidEnd.getDate()
            ),
        };
    return null;
}

export function getMoulidDate(ethiopianYear, ethiopianMonth = 10) {
    validateNumericInputs("getMoulidDate", { ethiopianYear, ethiopianMonth });
    const gregorianYear = toGC(ethiopianYear, ethiopianMonth, 1).year;
    const year = Number(gregorianYear);
    const hijriYearStart = getHijriYear(new Date(year, 0, 1)),
        hijriYearEnd = getHijriYear(new Date(year, 11, 31));
    const mawlidStartYear = hijriToGregorian(hijriYearStart, 3, 12, year);
    if (mawlidStartYear)
        return {
            gregorian: {
                year: mawlidStartYear.getFullYear(),
                month: mawlidStartYear.getMonth() + 1,
                day: mawlidStartYear.getDate(),
            },
            ethiopian: toEC(
                mawlidStartYear.getFullYear(),
                mawlidStartYear.getMonth() + 1,
                mawlidStartYear.getDate()
            ),
        };
    const mawlidEndYear = hijriToGregorian(hijriYearEnd, 3, 12, year);
    if (mawlidEndYear)
        return {
            gregorian: {
                year: mawlidEndYear.getFullYear(),
                month: mawlidEndYear.getMonth() + 1,
                day: mawlidEndYear.getDate(),
            },
            ethiopian: toEC(
                mawlidEndYear.getFullYear(),
                mawlidEndYear.getMonth() + 1,
                mawlidEndYear.getDate()
            ),
        };
    return null;
}

const keyToTewsakMap = {
    nineveh: 'NINEVEH',
    abiyTsome: 'ABIY_TSOME',
    debreZeit: 'DEBRE_ZEIT',
    hosanna: 'HOSANNA',
    siklet: 'SIKLET',
    fasika: 'TINSAYE', // Note the mapping here
    rikbeKahnat: 'RIKBE_KAHNAT',
    erget: 'ERGET',
    paraclete: 'PARACLETE',
    tsomeHawaryat: 'TSOME_HAWARYAT',
    tsomeDihnet: 'TSOME_DIHENET'
};

/**
 * Retrieves a specific holiday for a given year.
 *
 * @param {string} holidayKey - The key of the holiday (e.g., 'fasika', 'enkutatash').
 * @param {number} ethYear - The Ethiopian year.
 * @param {Object} [options={}] - Options for language.
 * @param {string} [options.lang='amharic'] - The language for names and descriptions.
 * @returns {Object|null} A holiday object or null if the key is invalid.
 */
export function getHoliday(holidayKey, ethYear, options = {}) {
    validateNumericInputs('getHoliday', { ethYear });
    const { lang = 'amharic' } = options;

    const info = holidayInfo[holidayKey];
    if (!info) {
        return null; // Return null for unknown holiday keys
    }

    const name = info?.name?.[lang] || info?.name?.english;
    const description = info?.description?.[lang] || info?.description?.english;

    // Check if it's a fixed holiday
    if (fixedHolidays[holidayKey]) {
        const rules = fixedHolidays[holidayKey];
        return {
            key: holidayKey,
            tags: rules.tags,
            movable: false,
            name,
            description,
            ethiopian: { year: ethYear, month: rules.month, day: rules.day },
        };
    }

    // Check if it's a movable Christian holiday
    const tewsakKey = keyToTewsakMap[holidayKey];
    if (tewsakKey) {
        const date = getMovableHoliday(tewsakKey, ethYear);
        return {
            key: holidayKey,
            tags: movableHolidays[holidayKey].tags,
            movable: true,
            name,
            description,
            ethiopian: date,
            gregorian: toGC(date.year, date.month, date.day),
        };
    }

    // Check if it's a movable Muslim holiday
    let muslimDateData;
    if (holidayKey === 'eidFitr') {
        muslimDateData = getEidFitrDate(ethYear);
    } else if (holidayKey === 'eidAdha') {
        muslimDateData = getEidAdhaDate(ethYear);
    } else if (holidayKey === 'moulid') {
        muslimDateData = getMoulidDate(ethYear);
    }

    if (muslimDateData) {
        return {
            key: holidayKey,
            tags: movableHolidays[holidayKey].tags,
            movable: true,
            name,
            description,
            ethiopian: muslimDateData.ethiopian,
            gregorian: muslimDateData.gregorian,
        };
    }

    return null; // Should not be reached if holidayInfo is the source of truth
}



/**
 * Returns a list of all holidays occurring in a specific Ethiopian month and year.
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
    const allHolidayKeys = Object.keys(holidayInfo);

    allHolidayKeys.forEach(key => {
        const holiday = getHoliday(key, ethYear, { lang });
        if (holiday && holiday.ethiopian.month === ethMonth) {
            holidays.push(holiday);
        }
    });

    holidays.sort((a, b) => a.ethiopian.day - b.ethiopian.day);
    return holidays;
}
