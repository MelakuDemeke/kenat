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


export function getBahireHasab(ethiopianYear, options = {}) {
    validateNumericInputs('getBahireHasab', { ethiopianYear });
    const { lang = 'amharic' } = options;

    const ameteAlem = 5500 + ethiopianYear;
    const meteneRabiet = Math.floor(ameteAlem / 4);
    
    const evangelistRemainder = ameteAlem % 4;
    const evangelistName = evangelistNames[lang]?.[evangelistRemainder] || evangelistNames.english[evangelistRemainder];

    const tinteQemer = (ameteAlem + meteneRabiet) % 7;
    const weekdayIndex = (tinteQemer + 6) % 7;
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
    
    // UPDATED: Calculate and build full holiday objects
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

// This function now simply pulls the pre-built object from getBahireHasab
export function getMovableHoliday(holidayKey, ethiopianYear, options = {}) {
    validateNumericInputs('getMovableHoliday', { ethiopianYear });
    const { lang = 'amharic' } = options;
    const { movableFeasts } = getBahireHasab(ethiopianYear, { lang });
    
    const tewsakEnumKey = Object.keys(keyToTewsakMap).find(key => key === holidayKey);
    if (!tewsakEnumKey) return null;
    
    return movableFeasts[holidayKey];
}
