import { toEC, toGC, hijriToGregorian, getHijriYear } from "./conversions.js";
import {
    holidayInfo,
    HolidayTags,
    keyToTewsakMap,
    movableHolidays,
} from "./constants.js";
import { validateNumericInputs } from "./utils.js";
import {
    InvalidInputTypeError,
    UnknownHolidayError,
} from "./errors/errorHandler.js";
import { getMovableHoliday } from "./bahireHasab.js";

const fixedHolidays = {
    enkutatash: {
        month: 1,
        day: 1,
        tags: [HolidayTags.PUBLIC, HolidayTags.CULTURAL],
    },
    meskel: {
        month: 1,
        day: 17,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
    },
    beherbehereseb: {
        month: 3,
        day: 20,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
    },
    gena: {
        month: 4,
        day: 29,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
    },
    timket: {
        month: 5,
        day: 11,
        tags: [HolidayTags.PUBLIC, HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN],
    },
    martyrsDay: {
        month: 6,
        day: 12,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
    },
    adwa: { month: 6, day: 23, tags: [HolidayTags.PUBLIC, HolidayTags.STATE] },
    labour: { month: 8, day: 23, tags: [HolidayTags.PUBLIC, HolidayTags.STATE] },
    patriots: {
        month: 8,
        day: 27,
        tags: [HolidayTags.PUBLIC, HolidayTags.STATE],
    },
};

function findAllIslamicOccurrences(ethiopianYear, hijriMonth, hijriDay) {
    const startGregorianYear = toGC(ethiopianYear, 1, 1).year;
    const endGregorianYear = toGC(ethiopianYear, 13, 5).year;
    const occurrences = [];

    const checkGregorianYear = (gYear) => {
        const hijriYearAtStart = getHijriYear(new Date(gYear, 0, 1));
        const hijriYearsToCheck = [hijriYearAtStart, hijriYearAtStart + 1];

        hijriYearsToCheck.forEach((hYear) => {
            const gregorianDate = hijriToGregorian(
                hYear,
                hijriMonth,
                hijriDay,
                gYear
            );
            if (gregorianDate && gregorianDate.getFullYear() === gYear) {
                const ecDate = toEC(
                    gregorianDate.getFullYear(),
                    gregorianDate.getMonth() + 1,
                    gregorianDate.getDate()
                );
                if (ecDate.year === ethiopianYear) {
                    occurrences.push({
                        gregorian: {
                            year: gregorianDate.getFullYear(),
                            month: gregorianDate.getMonth() + 1,
                            day: gregorianDate.getDate(),
                        },
                        ethiopian: ecDate,
                    });
                }
            }
        });
    };

    checkGregorianYear(startGregorianYear);
    if (startGregorianYear !== endGregorianYear) {
        checkGregorianYear(endGregorianYear);
    }

    return Array.from(
        new Map(
            occurrences.map((item) => [JSON.stringify(item.ethiopian), item])
        ).values()
    );
}

/**
 * Finds the start and end dates of a specific Hijri month that falls within an Ethiopian year.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @param {number} hijriMonth - The Hijri month to find (e.g., 9 for Ramadan).
 * @returns {Array<{start: Kenat, end: Kenat}>} An array of start/end date ranges.
 */
export function findHijriMonthRanges(ethiopianYear, hijriMonth) {
    const startGregorianYear = toGC(ethiopianYear, 1, 1).year;
    const endGregorianYear = toGC(ethiopianYear, 13, 5).year;
    const ranges = [];

    const findRangeInGregorianYear = (gYear) => {
        const hijriYearAtStart = getHijriYear(new Date(gYear, 0, 1));
        const hijriYearsToCheck = [
            hijriYearAtStart - 1,
            hijriYearAtStart,
            hijriYearAtStart + 1,
        ];

        for (const hYear of hijriYearsToCheck) {
            const startDateGregorian = hijriToGregorian(hYear, hijriMonth, 1, gYear);
            if (!startDateGregorian) continue;

            const nextMonth = hijriMonth === 12 ? 1 : hijriMonth + 1;
            const nextYear = hijriMonth === 12 ? hYear + 1 : hYear;
            let endDateGregorian;

            const endDateCandidate =
                hijriToGregorian(nextYear, nextMonth, 1, gYear) ||
                hijriToGregorian(nextYear, nextMonth, 1, gYear + 1);
            if (endDateCandidate) {
                endDateGregorian = new Date(endDateCandidate.getTime() - 86400000);
            } else {
                continue;
            }

            const startEC = toEC(
                startDateGregorian.getFullYear(),
                startDateGregorian.getMonth() + 1,
                startDateGregorian.getDate()
            );
            const endEC = toEC(
                endDateGregorian.getFullYear(),
                endDateGregorian.getMonth() + 1,
                endDateGregorian.getDate()
            );

            if (startEC.year === ethiopianYear || endEC.year === ethiopianYear) {
                ranges.push({
                    start: startEC,
                    end: endEC,
                });
            }
        }
    };

    findRangeInGregorianYear(startGregorianYear);
    if (startGregorianYear !== endGregorianYear) {
        findRangeInGregorianYear(endGregorianYear);
    }

    const uniqueRanges = Array.from(new Map(ranges.map(item => [`${item.start.year}/${item.start.month}/${item.start.day}`, item])).values());
    return uniqueRanges;
}

const getAllMoulidDates = (year) => findAllIslamicOccurrences(year, 3, 12);
const getAllEidFitrDates = (year) => findAllIslamicOccurrences(year, 10, 1);
const getAllEidAdhaDates = (year) => findAllIslamicOccurrences(year, 12, 10);

export function getHoliday(holidayKey, ethYear, options = {}) {
    validateNumericInputs("getHoliday", { ethYear });
    const { lang = "amharic" } = options;

    const info = holidayInfo[holidayKey];
    if (!info) return null;

    const name = info?.name?.[lang] || info?.name?.english;
    const description = info?.description?.[lang] || info?.description?.english;

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

    let muslimDateData;
    if (holidayKey === "eidFitr") muslimDateData = getAllEidFitrDates(ethYear)[0];
    else if (holidayKey === "eidAdha")
        muslimDateData = getAllEidAdhaDates(ethYear)[0];
    else if (holidayKey === "moulid")
        muslimDateData = getAllMoulidDates(ethYear)[0];

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

    return null;
}

export function getHolidaysInMonth(ethYear, ethMonth, options = {}) {
    validateNumericInputs("getHolidaysInMonth", { ethYear, ethMonth });
    if (ethMonth < 1 || ethMonth > 13) {
        throw new InvalidInputTypeError(
            "getHolidaysInMonth",
            "ethMonth",
            "number between 1 and 13",
            ethMonth
        );
    }
    const { lang = "amharic", filter = null } = options;

    const allHolidaysForMonth = [];
    const allHolidayKeys = Object.keys(holidayInfo);

    allHolidayKeys.forEach((key) => {
        const holiday = getHoliday(key, ethYear, { lang });
        if (holiday && holiday.ethiopian.month === ethMonth) {
            allHolidaysForMonth.push(holiday);
        }
    });

    // Handle cases where Islamic holidays occur twice
    const muslimHolidays = [
        ...getAllMoulidDates(ethYear).map((d) => ({ ...d, key: "moulid" })),
        ...getAllEidFitrDates(ethYear).map((d) => ({ ...d, key: "eidFitr" })),
        ...getAllEidAdhaDates(ethYear).map((d) => ({ ...d, key: "eidAdha" })),
    ];

    muslimHolidays.forEach((data) => {
        if (data.ethiopian.month === ethMonth) {
            const info = holidayInfo[data.key];
            const holidayObj = {
                key: data.key,
                tags: movableHolidays[data.key].tags,
                movable: true,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: data.ethiopian,
                gregorian: data.gregorian,
            };
            // Avoid duplicates from the getHoliday call
            if (
                !allHolidaysForMonth.some(
                    (h) =>
                        JSON.stringify(h.ethiopian) === JSON.stringify(holidayObj.ethiopian)
                )
            ) {
                allHolidaysForMonth.push(holidayObj);
            }
        }
    });

    const filterTags = filter
        ? Array.isArray(filter)
            ? filter
            : [filter]
        : null;

    const finalHolidays = filterTags
        ? allHolidaysForMonth.filter((holiday) =>
            holiday.tags.some((tag) => filterTags.includes(tag))
        )
        : allHolidaysForMonth;

    finalHolidays.sort((a, b) => a.ethiopian.day - b.ethiopian.day);
    return finalHolidays;
}

export function getHolidaysForYear(ethYear, options = {}) {
    validateNumericInputs("getHolidaysForYear", { ethYear });
    const { lang = "amharic", filter = null } = options;

    const allHolidaysForYear = [];

    // Process all fixed and Christian movable holidays
    const singleOccurrenceKeys = Object.keys(fixedHolidays).concat(
        Object.keys(keyToTewsakMap)
    );
    singleOccurrenceKeys.forEach((key) => {
        const holiday = getHoliday(key, ethYear, { lang });
        if (holiday) {
            allHolidaysForYear.push(holiday);
        }
    });

    // Process all occurrences of Islamic holidays
    const addMuslimHolidays = (key, dateArray) => {
        dateArray.forEach((data) => {
            const info = holidayInfo[key];
            allHolidaysForYear.push({
                key,
                tags: movableHolidays[key].tags,
                movable: true,
                name: info?.name?.[lang] || info?.name?.english,
                description: info?.description?.[lang] || info?.description?.english,
                ethiopian: data.ethiopian,
                gregorian: data.gregorian,
            });
        });
    };

    addMuslimHolidays("moulid", getAllMoulidDates(ethYear));
    addMuslimHolidays("eidFitr", getAllEidFitrDates(ethYear));
    addMuslimHolidays("eidAdha", getAllEidAdhaDates(ethYear));

    const filterTags = filter
        ? Array.isArray(filter)
            ? filter
            : [filter]
        : null;

    const finalHolidays = filterTags
        ? allHolidaysForYear.filter((holiday) =>
            holiday.tags.some((tag) => filterTags.includes(tag))
        )
        : allHolidaysForYear;

    finalHolidays.sort((a, b) => {
        if (a.ethiopian.month !== b.ethiopian.month) {
            return a.ethiopian.month - b.ethiopian.month;
        }
        return a.ethiopian.day - b.ethiopian.day;
    });

    return finalHolidays;
}
