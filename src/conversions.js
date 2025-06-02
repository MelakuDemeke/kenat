import { getGregorianDateOfEthiopianNewYear } from './newYearDates.js';
import { dayOfYear, monthDayFromDayOfYear, isGregorianLeapYear } from './utils.js';

/**
 * Convert Ethiopian date to Gregorian date.
 *
 * @param {number} ethYear - Ethiopian year
 * @param {number} ethMonth - Ethiopian month (1-13)
 * @param {number} ethDay - Ethiopian day (1-30 for months 1-12, 1-5/6 for month 13)
 * @returns {{year: number, month: number, day: number}} Gregorian date
 */
export function toGC(ethYear, ethMonth, ethDay) {
    // Get Gregorian new year date for the Ethiopian year
    const newYear = getGregorianDateOfEthiopianNewYear(ethYear);

    // Calculate the number of days since Ethiopian New Year for the input date
    // Months 1-12 have 30 days, month 13 (Pagume) has 5 or 6 days
    const daysSinceNewYear = (ethMonth - 1) * 30 + ethDay - 1;

    // Calculate the day of the year in Gregorian calendar for Ethiopian New Year
    const gregorianNewYearDayOfYear = dayOfYear(newYear.gregorianYear, newYear.month, newYear.day);

    // Calculate total day of year in Gregorian calendar
    let gregorianDayOfYear = gregorianNewYearDayOfYear + daysSinceNewYear;

    // Handle leap year overflow (when day of year > 365/366)
    const gregorianYearLength = isGregorianLeapYear(newYear.gregorianYear) ? 366 : 365;
    let gregorianYear = newYear.gregorianYear;

    if (gregorianDayOfYear > gregorianYearLength) {
        gregorianDayOfYear -= gregorianYearLength;
        gregorianYear += 1;
    }

    // Convert day of year back to Gregorian month and day
    const { month, day } = monthDayFromDayOfYear(gregorianYear, gregorianDayOfYear);

    return { year: gregorianYear, month, day };
}

/**
 * Convert Gregorian date to Ethiopian date.
 *
 * @param {number} gYear - Gregorian year
 * @param {number} gMonth - Gregorian month (1-12)
 * @param {number} gDay - Gregorian day
 * @returns {{year: number, month: number, day: number}} Ethiopian date
 */
export function gregorianToEthiopian(gYear, gMonth, gDay) {
    const oneDay = 1000 * 60 * 60 * 24;
    const oneYear = 365 * oneDay;
    const fourYears = 1461 * oneDay; // 365*4 + 1 leap day

    // Reference: Meskerem 1, 1964 = September 12, 1971 (Gregorian)
    const baseDate = new Date(Date.UTC(1971, 8, 12)); // Sep 12, 1971
    const inputDate = new Date(Date.UTC(gYear, gMonth - 1, gDay));

    // Optional range check function
    if (inputDate < new Date(Date.UTC(1900, 0, 1)) || inputDate > new Date(Date.UTC(2100, 11, 31))) {
        throw `Out of range input year: ${gYear}`;
    }

    const difference = inputDate.getTime() - baseDate.getTime();
    const fourYearsPassed = Math.floor(difference / fourYears);

    let remainingYears = Math.floor(
        (difference - fourYearsPassed * fourYears) / oneYear
    );

    if (remainingYears === 4) {
        remainingYears = 3;
    }

    const remainingMonths = Math.floor(
        (difference - fourYearsPassed * fourYears - remainingYears * oneYear) /
        (30 * oneDay)
    );

    const remainingDays = Math.floor(
        (difference -
            fourYearsPassed * fourYears -
            remainingYears * oneYear -
            remainingMonths * 30 * oneDay) / oneDay
    );

    const ethYear = 1964 + 4 * fourYearsPassed + remainingYears;
    const month = remainingMonths + 1;
    const day = remainingDays + 1;

    return { year: ethYear, month, day };
}
