import { toGC, toEC } from './conversions.js';
import { printMonthCalendarGrid } from './render/printMonthCalendarGrid.js';
import { monthNames, daysOfWeek } from './constants.js';
import { toEthiopianTime, toGregorianTime } from './timeConverter.js';
import { toGeez } from './geezConverter.js';
import { getHolidaysInMonth } from './holidays.js';
import { MonthGrid } from './MonthGrid.js';
import { getEthiopianDaysInMonth, isEthiopianLeapYear, getWeekday } from './utils.js';
import {
    formatStandard,
    formatInGeezAmharic,
    formatWithTime,
    formatWithWeekday,
    formatShort,
    toISODateString
} from './formatting.js';

import {
    addDays,
    addMonths,
    addYears,
    diffInDays,
    diffInMonths,
    diffInYears
} from './dayArithmetic.js';
/**
 * Kenat - Ethiopian Calendar Date Wrapper
 * 
 * A lightweight class to work with both Gregorian and Ethiopian calendars.
 * It wraps JavaScript's built-in `Date` object and converts Gregorian dates to Ethiopian equivalents.
 *
 */

export class Kenat {

    /**
     * Constructs a Kenat instance from an Ethiopian date string in 'yyyy/mm/dd' format,
     * or defaults to the current Gregorian date converted to Ethiopian date if no argument is provided.
     *
     * @param {string} [ethiopianDateStr] - The Ethiopian date string in 'yyyy/mm/dd' format.
     * @throws {Error} If the provided date string does not match the 'yyyy/mm/dd' format.
     */
    constructor(ethiopianDateStr, timeObj = null) {
        if (!ethiopianDateStr) {
            // default to current Gregorian date → Ethiopian
            const today = new Date();
            this.ethiopian = toEC(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
            );
            this.time = toEthiopianTime(today.getHours(), today.getMinutes());

        } else if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(ethiopianDateStr)) {
            const [year, month, day] = ethiopianDateStr.split('/').map(Number);
            this.ethiopian = { year, month, day };
            this.time = timeObj || { hour: 12, minute: 0, period: 'day' };
        } else {
            throw new Error("Kenat only accepts Ethiopian date in 'yyyy/mm/dd' format.");
        }
    }

    /**
     * Creates and returns a new instance of the Kenat class representing the current moment.
     *
     * @returns {Kenat} A new Kenat instance set to the current date and time.
     */
    static now() {
        return new Kenat();
    }

    /**
     * Converts the current Ethiopian date stored in this.ethiopian to its Gregorian equivalent.
     *
     * @returns {{ year: number, month: number, day: number }} The Gregorian date corresponding to the Ethiopian date.
     */
    getGregorian() {
        const { year, month, day } = this.ethiopian;
        return toGC(year, month, day);
    }

    /**
     * Returns the Ethiopian equivalent of the stored Gregorian date.
     * 
     * @returns {{ year: number, month: number, day: number }} An object representing the Ethiopian date.
     */
    getEthiopian() {
        return this.ethiopian;
    }

    /**
     * Sets the current time.
     *
     * @param {number} hour - The hour value to set.
     * @param {number} minute - The minute value to set.
     * @param {string} period - The period of the day (e.g., 'AM' or 'PM').
     */
    setTime(hour, minute, period) {
        this.time = { hour, minute, period };
    }

    // Format Methods

    /**
     * Returns a string representation of the Ethiopian date and time.
     *
     * The format is: "Ethiopian: {year}-{month}-{day} {hh:mm period}".
     * If the time is not available, hour and minute are replaced with '??'.
     *
     * @returns {string} The formatted Ethiopian date and time string.
     */
    toString() {
        return formatWithTime(this.ethiopian, this.time);
    }


    /**
     * Formats the Ethiopian date according to the specified options.
     *
     * @param {Object} [options={}] - Formatting options.
     * @param {string} [options.lang='amharic'] - Language to use for formatting ('amharic', 'english', etc.).
     * @param {boolean} [options.showWeekday=false] - Whether to include the weekday in the formatted string.
     * @param {boolean} [options.useGeez=false] - Whether to use Geez numerals (only applies if lang is 'amharic').
     * @param {boolean} [options.includeTime=false] - Whether to include the time in the formatted string.
     * @returns {string} The formatted Ethiopian date string.
     */
    format(options = {}) {
        const {
            lang = 'amharic',
            showWeekday = false,
            useGeez = false,
            includeTime = false
        } = options;

        if (showWeekday && includeTime) {
            return `${formatWithWeekday(this.ethiopian, lang, useGeez)} ${Kenat.formatEthiopianTime(this.time, lang)}`;
        }

        if (showWeekday) {
            return formatWithWeekday(this.ethiopian, lang, useGeez);
        }

        if (includeTime) {
            return formatWithTime(this.ethiopian, this.time, lang);
        }

        return useGeez && lang === 'amharic'
            ? formatInGeezAmharic(this.ethiopian)
            : formatStandard(this.ethiopian, lang);
    }

    /**
     * Formats the Ethiopian date in Geez numerals and Amharic month name.
     *
     * @returns {string} The formatted date string in the format: "{Amharic Month Name} {Geez Day} {Geez Year}".
     *
     * formatInGeezAmharic(); // "የካቲት ፲ ፳፻፲፭"
     */
    formatInGeezAmharic() {
        return formatInGeezAmharic(this.ethiopian);
    }

    /**
     * Formats the Ethiopian date with weekday name.
     *
     * @param {'amharic'|'english'} [lang='amharic'] - Language for month and weekday names.
     * @param {boolean} [useGeez=false] - Whether to show numerals in Geez.
     * @returns {string} Formatted string with weekday, e.g. "ማክሰኞ, መስከረም ፳፩ ፳፻፲፯"
     */
    formatWithWeekday(lang = 'amharic', useGeez = false) {
        return formatWithWeekday(this.ethiopian, lang, useGeez);
    }

    /**
     * Returns the Ethiopian date in "yyyy/mm/dd" short format.
     * @returns {string}
     */
    formatShort() {
        return formatShort(this.ethiopian);
    }

    /**
     * Returns an ISO-style date string: "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm".
     * @returns {string}
     */
    toISOString() {
        return toISODateString(this.ethiopian, this.time);
    }


    // format ends

    /**
     * Generates a calendar for a given Ethiopian month and year, mapping each Ethiopian date
     * to its corresponding Gregorian date and providing formatted display strings.
     *
     * @param {number} [year=this.ethiopian.year] - The Ethiopian year for the calendar.
     * @param {number} [month=this.ethiopian.month] - The Ethiopian month (1-13).
     * @param {boolean} [useGeez=false] - Whether to display dates in Geez numerals.
     * @returns {Array<Object>} An array of objects, each representing a day in the month with
     *   Ethiopian and Gregorian date information and display strings.
     */
    getMonthCalendar(year = this.ethiopian.year, month = this.ethiopian.month, useGeez = false) {
        const daysInMonth = getEthiopianDaysInMonth(year, month);
        const calendar = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const ethDate = { year, month, day };
            const gregDate = toGC(year, month, day);
            calendar.push({
                ethiopian: {
                    ...ethDate,
                    display: useGeez
                        ? `${monthNames.amharic[month - 1]} ${toGeez(day)} ${toGeez(year)}`
                        : `${monthNames.amharic[month - 1]} ${day} ${year}`
                },
                gregorian: {
                    ...gregDate,
                    display: `${gregDate.year}-${gregDate.month.toString().padStart(2, '0')}-${gregDate.day.toString().padStart(2, '0')}`
                }
            });
        }

        return calendar;
    }

    /**
     * Prints the calendar grid for the current Ethiopian month.
     *
     * @param {boolean} [useGeez=false] - If true, displays the calendar using Geez numerals.
     * @returns {void}
     */
    printThisMonth(useGeez = false) {
        const { year, month } = this.getEthiopian();
        const calendar = this.getMonthCalendar(year, month, useGeez);
        printMonthCalendarGrid(year, month, calendar, useGeez);
    }

    /**
     * Generates a full-featured, display-ready calendar view for a given Ethiopian month and year.
     *
     * This method wraps `MonthGrid.create()` to return structured month data,
     * including weekday headers, holidays, today markers, and optionally localized text or Ge'ez numerals.
     *
     * @param {number} year - The Ethiopian year (e.g., 2017).
     * @param {number} month - The Ethiopian month (1–13).
     * @param {Object} [options={}] - Optional configuration for localization and layout.
     * @param {boolean} [options.useGeez=false] - Whether to display numerals in Ge'ez.
     * @param {string} [options.weekdayLang='amharic'] - Language for weekday labels (e.g., 'amharic', 'english').
     * @param {number} [options.weekStart=0] - Week start day (0 = Sunday, 1 = Monday, etc.).
     * @returns {{
     *   month: number,
     *   monthName: string,
     *   year: number,
     *   headers: string[],
     *   days: Array<{
     *     ethiopian: { year: number|string, month: number|string, day: number|string },
     *     gregorian: { year: number, month: number, day: number },
     *     weekday: number,
     *     weekdayName: string,
     *     isToday: boolean,
     *     holidays: Array<Object>
     *   }>
     * }} A structured calendar object for the given month, suitable for display or rendering.
     */
    static getMonthCalendar(year, month, options = {}) {
        const { useGeez = false, weekdayLang = 'amharic', weekStart = 0 } = options;

        const monthGrid = MonthGrid.create({
            year,
            month,
            useGeez,
            weekdayLang,
            weekStart
        });

        return {
            month,
            monthName: monthGrid.monthName,
            year: monthGrid.year,
            headers: monthGrid.headers,
            days: monthGrid.days
        };
    }

    /**
     * Generates a calendar for all 13 months of a given year.
     *
     * @param {number} year - The year for which to generate the calendar.
     * @param {Object} [options={}] - Optional configuration for calendar generation.
     * @param {boolean} [options.useGeez=false] - Whether to use Geez numerals for the calendar.
     * @param {string} [options.weekdayLang='amharic'] - The language to use for weekday names.
     * @param {number} [options.weekStart=0] - The day the week starts on (0 for Sunday, 1 for Monday, etc.).
     * @returns {Array<Object>} An array of month objects, each containing:
     *   - {number} month: The month number (1-13).
     *   - {string} monthName: The name of the month.
     *   - {number} year: The year of the month.
     *   - {Array<string>} headers: The headers for the days of the week.
     *   - {Array<Array<Object>>} days: The grid of days for the month.
     */
    static getYearCalendar(year, options = {}) {
        const { useGeez = false, weekdayLang = 'amharic', weekStart = 0 } = options;
        const fullYear = [];

        for (let month = 1; month <= 13; month++) {
            const monthGrid = MonthGrid.create({
                year,
                month,
                useGeez,
                weekdayLang,
                weekStart
            });

            fullYear.push({
                month,
                monthName: monthGrid.monthName,
                year: monthGrid.year,
                headers: monthGrid.headers,
                days: monthGrid.days
            });
        }

        return fullYear;
    }

    // Arithmetic methods start here

    /**
     * Adds a specified number of days to the current Ethiopian date.
     *
     * @param {number} days - The number of days to add.
     * @returns {Kenat} A new Kenat instance representing the updated date.
     */
    addDays(days) {
        const newDate = addDays(this.ethiopian, days);
        return new Kenat(`${newDate.year}/${newDate.month}/${newDate.day}`);
    }

    /**
     * Returns a new Kenat instance with the date advanced by the specified number of months.
     *
     * @param {number} months - The number of months to add to the current date.
     * @returns {Kenat} A new Kenat instance representing the updated date.
     */
    addMonths(months) {
        const newDate = addMonths(this.ethiopian, months);
        return new Kenat(`${newDate.year}/${newDate.month}/${newDate.day}`);
    }

    /**
     * Returns a new Kenat instance with the year increased by the specified number of years.
     *
     * @param {number} years - The number of years to add to the current date.
     * @returns {Kenat} A new Kenat instance representing the updated date.
     */
    addYears(years) {
        const newDate = addYears(this.ethiopian, years);
        return new Kenat(`${newDate.year}/${newDate.month}/${newDate.day}`);
    }

    /**
     * Calculates the difference in days between this object's Ethiopian date and another object's Ethiopian date.
     *
     * @param {Object} other - An object with a `getEthiopian` method that returns an Ethiopian date.
     * @returns {number} The number of days difference between the two Ethiopian dates.
     */
    diffInDays(other) {
        return diffInDays(this.ethiopian, other.getEthiopian());
    }

    /**
     * Calculates the difference in months between this instance's Ethiopian date and another Ethiopian date.
     *
     * @param {Object} other - An object with a `getEthiopian` method that returns an Ethiopian date.
     * @returns {number} The number of months difference between the two Ethiopian dates.
     */
    diffInMonths(other) {
        return diffInMonths(this.ethiopian, other.getEthiopian());
    }

    /**
     * Calculates the difference in years between this instance's Ethiopian date and another.
     *
     * @param {Object} other - An object with a getEthiopian() method returning an Ethiopian date.
     * @returns {number} The number of years difference between the two Ethiopian dates.
     */
    diffInYears(other) {
        return diffInYears(this.ethiopian, other.getEthiopian());
    }

    // Arithmetic methods end here


    // Time Methods
    getCurrentTime() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        return toEthiopianTime(hour, minute);
    }

    /**
     * Formats an Ethiopian time object.
     *
     * @param {{ hour: number, minute: number, period: 'day' | 'night' }} timeObj - Ethiopian time.
     * @param {'amharic' | 'english'} [lang='amharic'] - Output language.
     * @returns {string} Formatted Ethiopian time.
     */
    static formatEthiopianTime(timeObj, lang = 'amharic') {
        const { hour, minute, period } = timeObj;
        const suffix = lang === 'amharic'
            ? (period === 'day' ? 'ጠዋት' : 'ማታ')
            : (period === 'day' ? 'day' : 'night');
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${suffix}`;
    }
}