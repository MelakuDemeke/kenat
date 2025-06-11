import { toEC, toGC, hijriToGregorian, getHijriYear } from "./conversions.js";
import { holidayInfo, movableHolidayTewsak } from "./constants.js";
import { validateNumericInputs } from "./utils.js";
import { InvalidInputTypeError, UnknownHolidayError } from "./errors/errorHandler.js";
import { getMovableHoliday } from "./bahireHasab.js";

export const HolidayTags = {
    PUBLIC: "public", RELIGIOUS: "religious", CHRISTIAN: "christian",
    MUSLIM: "muslim", STATE: "state", CULTURAL: "cultural", OTHER: "other",
};

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

const keyToTewsakMap = {
    nineveh: 'NINEVEH', abiyTsome: 'ABIY_TSOME', debreZeit: 'DEBRE_ZEIT',
    hosanna: 'HOSANNA', siklet: 'SIKLET', fasika: 'TINSAYE',
    rikbeKahnat: 'RIKBE_KAHNAT', erget: 'ERGET', paraclete: 'PARACLETE',
    tsomeHawaryat: 'TSOME_HAWARYAT', tsomeDihnet: 'TSOME_DIHENET'
};

/**
 * CORRECTED: Internal helper to robustly find all occurrences of an Islamic holiday within an Ethiopian year.
 */
function findAllIslamicOccurrences(ethiopianYear, hijriMonth, hijriDay) {
    const startGregorianYear = toGC(ethiopianYear, 1, 1).year;
    const endGregorianYear = toGC(ethiopianYear, 13, 5).year;
    const occurrences = [];

    const checkGregorianYear = (gYear) => {
        // A Gregorian year can span two Hijri years. We must check both.
        const hijriYearAtStart = getHijriYear(new Date(gYear, 0, 1));
        const hijriYearAtEnd = getHijriYear(new Date(gYear, 11, 31));
        const hijriYearsToCheck = [hijriYearAtStart];
        if (hijriYearAtStart !== hijriYearAtEnd) {
            hijriYearsToCheck.push(hijriYearAtEnd);
        }

        hijriYearsToCheck.forEach(hYear => {
            const gregorianDate = hijriToGregorian(hYear, hijriMonth, hijriDay, gYear);
            if (gregorianDate) {
                const ecDate = toEC(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, gregorianDate.getDate());
                if (ecDate.year === ethiopianYear) {
                    occurrences.push({ 
                        gregorian: { year: gregorianDate.getFullYear(), month: gregorianDate.getMonth() + 1, day: gregorianDate.getDate() }, 
                        ethiopian: ecDate 
                    });
                }
            }
        });
    };

    checkGregorianYear(startGregorianYear);
    if (startGregorianYear !== endGregorianYear) {
        checkGregorianYear(endGregorianYear);
    }
    
    // Remove duplicates that might arise from checking overlapping year ranges
    const uniqueOccurrences = Array.from(new Map(occurrences.map(item => [JSON.stringify(item.ethiopian), item])).values());
    return uniqueOccurrences;
}

// These functions now return an array of all possible occurrences
function getAllMoulidDates(ethiopianYear) {
    return findAllIslamicOccurrences(ethiopianYear, 3, 12);
}
function getAllEidFitrDates(ethiopianYear) {
    return findAllIslamicOccurrences(ethiopianYear, 10, 1);
}
function getAllEidAdhaDates(ethiopianYear) {
    return findAllIslamicOccurrences(ethiopianYear, 12, 10);
}

export function getHoliday(holidayKey, ethYear, options = {}) {
    validateNumericInputs('getHoliday', { ethYear });
    const { lang = 'amharic' } = options;

    const info = holidayInfo[holidayKey];
    if (!info) return null;

    const name = info?.name?.[lang] || info?.name?.english;
    const description = info?.description?.[lang] || info?.description?.english;

    if (fixedHolidays[holidayKey]) {
        const rules = fixedHolidays[holidayKey];
        return { key: holidayKey, tags: rules.tags, movable: false, name, description, ethiopian: { year: ethYear, month: rules.month, day: rules.day } };
    }

    const tewsakKey = keyToTewsakMap[holidayKey];
    if (tewsakKey) {
        const date = getMovableHoliday(tewsakKey, ethYear);
        return { key: holidayKey, tags: movableHolidays[holidayKey].tags, movable: true, name, description, ethiopian: date, gregorian: toGC(date.year, date.month, date.day) };
    }

    // For Islamic holidays, getHoliday returns the *first* occurrence in the year.
    let muslimDateData;
    if (holidayKey === 'eidFitr') muslimDateData = getAllEidFitrDates(ethYear)[0];
    else if (holidayKey === 'eidAdha') muslimDateData = getAllEidAdhaDates(ethYear)[0];
    else if (holidayKey === 'moulid') muslimDateData = getAllMoulidDates(ethYear)[0];
    
    if (muslimDateData) {
        return { key: holidayKey, tags: movableHolidays[holidayKey].tags, movable: true, name, description, ethiopian: muslimDateData.ethiopian, gregorian: muslimDateData.gregorian };
    }

    return null;
}

export function getHolidaysInMonth(ethYear, ethMonth, lang = 'amharic') {
    validateNumericInputs("getHolidaysInMonth", { ethYear, ethMonth });
    if (ethMonth < 1 || ethMonth > 13) {
        throw new InvalidInputTypeError("getHolidaysInMonth", "ethMonth", "number between 1 and 13", ethMonth);
    }

    const holidays = [];

    // Process Fixed Holidays
    Object.keys(fixedHolidays).forEach(key => {
        const holiday = getHoliday(key, ethYear, { lang });
        if (holiday && holiday.ethiopian.month === ethMonth) {
            holidays.push(holiday);
        }
    });

    // Process all Christian Movable Holidays for the year
    Object.keys(keyToTewsakMap).forEach(key => {
        const holiday = getHoliday(key, ethYear, { lang });
        if (holiday && holiday.ethiopian.month === ethMonth) {
            holidays.push(holiday);
        }
    });

    // Process all Islamic Movable Holidays for the year
    const addMuslimHolidays = (key, dateArray) => {
        dateArray.forEach(data => {
            if(data.ethiopian.month === ethMonth) {
                const info = holidayInfo[key];
                holidays.push({
                    key,
                    tags: movableHolidays[key].tags,
                    movable: true,
                    name: info?.name?.[lang] || info?.name?.english,
                    description: info?.description?.[lang] || info?.description?.english,
                    ethiopian: data.ethiopian,
                    gregorian: data.gregorian,
                });
            }
        });
    };
    
    addMuslimHolidays('moulid', getAllMoulidDates(ethYear));
    addMuslimHolidays('eidFitr', getAllEidFitrDates(ethYear));
    addMuslimHolidays('eidAdha', getAllEidAdhaDates(ethYear));

    holidays.sort((a, b) => a.ethiopian.day - b.ethiopian.day);
    return holidays;
}
