import { toEC, toGC, hijriToGregorian, getHijriYear } from "./conversions.js";
import { holidayNames } from "./constants.js";
import { validateNumericInputs } from "./utils.js";
import { InvalidInputTypeError } from "./errors/errorHandler.js";
import { getMovableHoliday, getBahireHasab } from "./bahireHasab.js";

export const HolidayTags = {
    PUBLIC: "public",
    RELIGIOUS: "religious",
    CHRISTIAN: "christian",
    MUSLIM: "muslim",
    STATE: "state",
    CULTURAL: "cultural",
    OTHER: "other",
};

export const fixedHolidayName = {
    enkutatash: {
        key: "enkutatash",
        month: 1,
        day: 1,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.CULTURAL],
        name: holidayNames.enkutatash,
        description:
            "Marks the start of the Ethiopian year; symbolizes renewal and the end of the rainy season.",
    },
    meskel: {
        key: "meskel",
        month: 1,
        day: 17,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.meskel,
        description:
            "Commemorates the discovery of the True Cross by Empress Helena in the 4th century.",
    },
    beherbehereseb: {
        key: "beherbehereseb",
        month: 3,
        day: 20,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.beherbehereseb,
        description:
            "This holiday acknowledges and celebrates the diversity of Ethiopias ethnic groups, affirming their equal rights and fostering unity through culture and language ",
    },
    gena: {
        key: "gena",
        month: 4,
        day: 29,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.gena,
        description:
            "Ethiopian Orthodox Christmas celebrating the birth of Jesus Christ.",
    },
    timket: {
        key: "timket",
        month: 5,
        day: 11,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.timket,
        description: "Commemorates the baptism of Jesus in the Jordan River.",
    },
    MartyrsDay: {
        key: "martyrsDay",
        month: 6,
        day: 12,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.martyrsDay,
        description:
            "Honors those who sacrificed their lives for Ethiopia’s freedom and independence.",
    },
    adwa: {
        key: "adwa",
        month: 6,
        day: 23,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.adwa,
        description:
            "Celebrates Ethiopia’s victory over Italian colonizers in 1896.",
    },
    labour: {
        key: "labour",
        month: 8,
        day: 23,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.labour,
        description: "A global celebration of workers and labor rights.",
    },
    patriots: {
        key: "patriots",
        month: 8,
        day: 27,
        movable: false,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
        name: holidayNames.patriots,
        description:
            "Honors Ethiopian resistance fighters who defeated Italian occupation.",
    },
};

export const movableHolidays = {
    eidFitr: {
        key: "eidFitr",
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: holidayNames.eidFitr,
        description: "Marks the end of Ramadan, the month of fasting for Muslims.",
    },
    siklet: {
        key: "siklet",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.siklet,
        description: "Marks the crucifixion of Jesus Christ.",
    },
    fasika: {
        key: "fasika",
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.fasika,
        description:
            "Celebrates the resurrection of Jesus Christ. One of the most important Christian holidays in Ethiopia.",
    },
    eidAdha: {
        key: "eidAdha",
        movable: true,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: holidayNames.eidAdha,
        description:
            "Commemorates Abraham’s willingness to sacrifice his son as an act of obedience to God.",
    },
    moulid: {
        key: "moulid",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.MUSLIM],
        name: holidayNames.moulid,
        description: "Celebrates the birthday of the Prophet Mohammed.",
    },
    abiyTsome: {
        key: "abiyTsome",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.abiyTsome,
        description: "The Great Lent, a 55-day fasting period before Easter.",
    },
    debreZeit: {
        key: "debreZeit",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.debreZeit,
        description:
            "Mid-Lent Sunday, commemorating Jesus's sermon on the Mount of Olives.",
    },
    hosanna: {
        key: "hosanna",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.hosanna,
        description:
            "Palm Sunday, commemorating Jesus's triumphal entry into Jerusalem.",
    },
    rikbeKahnat: {
        key: "rikbeKahnat",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.rikbeKahnat,
        description: "The Meeting of the Priests, 24 days after Easter.",
    },
    erget: {
        key: "erget",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.erget,
        description: "The Ascension of Jesus into heaven, 40 days after Easter.",
    },
    paraclete: {
        key: "paraclete",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.paraclete,
        description:
            "Pentecost, celebrating the descent of the Holy Spirit upon the Apostles, 50 days after Easter.",
    },
    tsomeHawaryat: {
        key: "tsomeHawaryat",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.tsomeHawaryat,
        description:
            "The Fast of the Apostles, which begins the day after Pentecost.",
    },
    tsomeDihnet: {
        key: "tsomeDihnet",
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.tsomeDihnet,
        description: "The Fast of Salvation, observed on Wednesdays and Fridays.",
    },
    nineveh: {
        key: 'nineveh',
        movable: true,
        tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
        name: holidayNames.nineveh,
        description: 'A three-day fast commemorating the repentance of the people of Nineveh.'
    },

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

/**
 * Returns a list of Ethiopian holidays occurring in a specific Ethiopian month and year.
 *
 * This function collects both fixed-date and movable holidays for the given Ethiopian year and month.
 * It validates the inputs, gathers holidays, and sorts them by day.
 *
 * @param {number} ethYear - The Ethiopian year for which to retrieve holidays.
 * @param {number} ethMonth - The Ethiopian month (1-13) for which to retrieve holidays.
 * @returns {Array<Object>} An array of holiday objects occurring in the specified month, each containing:
 *   - {string} name: The name of the holiday.
 *   - {Object} ethiopian: The Ethiopian date of the holiday ({ year, month, day }).
 *   - {Object} [gregorian]: The Gregorian date of the holiday, if available.
 *   - {string} [note]: Additional notes about the holiday, if any.
 * @throws {InvalidInputTypeError} If ethMonth is not between 1 and 13.
 */
export function getHolidaysInMonth(ethYear, ethMonth) {
    validateNumericInputs("getHolidaysInMonth", { ethYear, ethMonth });
    if (ethMonth < 1 || ethMonth > 13) {
        throw new InvalidInputTypeError(
            "getHolidaysInMonth",
            "ethMonth",
            "number between 1 and 13",
            ethMonth
        );
    }

    const holidays = [];
    // Add fixed holidays
    Object.values(fixedHolidayName).forEach((holiday) => {
        if (holiday.month === ethMonth) {
            holidays.push({
                ...holiday,
                ethiopian: { year: ethYear, month: holiday.month, day: holiday.day },
            });
        }
    });

    const { nineveh } = getBahireHasab(ethYear); 
    // Calculate and add movable Christian holidays using Bahire Hasab
    const christianMovable = {
        nineveh: nineveh,
        fasika: getMovableHoliday('TINSAYE', ethYear),
        siklet: getMovableHoliday('SIKLET', ethYear),
        abiyTsome: getMovableHoliday('ABIY_TSOME', ethYear),
        debreZeit: getMovableHoliday('DEBRE_ZEIT', ethYear),
        hosanna: getMovableHoliday('HOSANNA', ethYear),
        rikbeKahnat: getMovableHoliday('RIKBE_KAHNAT', ethYear),
        erget: getMovableHoliday('ERGET', ethYear),
        paraclete: getMovableHoliday('PARACLETE', ethYear),
        tsomeHawaryat: getMovableHoliday('TSOME_HAWARYAT', ethYear),
        tsomeDihnet: getMovableHoliday('TSOME_DIHENET', ethYear),
    };

    Object.entries(christianMovable).forEach(([key, date]) => {
        if (date.month === ethMonth) {
            holidays.push({
                ...movableHolidays[key],
                ethiopian: date,
                gregorian: toGC(date.year, date.month, date.day),
            });
        }
    });

    // Calculate and add movable Muslim holidays (existing logic)
    const muslimMovable = {
        eidFitr: getEidFitrDate(ethYear, ethMonth),
        eidAdha: getEidAdhaDate(ethYear, ethMonth),
        moulid: getMoulidDate(ethYear, ethMonth),
    };

    Object.entries(muslimMovable).forEach(([key, data]) => {
        if (data && data.ethiopian.month === ethMonth) {
            holidays.push({
                ...movableHolidays[key],
                ethiopian: data.ethiopian,
                gregorian: data.gregorian,
                note: data.note || null,
            });
        }
    });

    holidays.sort((a, b) => a.ethiopian.day - b.ethiopian.day);
    return holidays;
}
