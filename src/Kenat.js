import { toGC, toEC } from './conversions.js';
import { printMonthCalendarGrid } from './render/printMonthCalendarGrid.js';
import { monthNames, daysOfWeek } from './constants.js';
import { toEthiopianTime, toGregorianTime } from './timeConverter.js';
import { toGeez } from './geezConverter.js';
import { getHolidaysInMonth } from './holidays.js';
import { getEthiopianDaysInMonth, isEthiopianLeapYear, getWeekday } from './utils.js';
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
     * Returns a string representation of the Ethiopian date and time.
     *
     * The format is: "Ethiopian: {year}-{month}-{day} {hh:mm period}".
     * If the time is not available, hour and minute are replaced with '??'.
     *
     * @returns {string} The formatted Ethiopian date and time string.
     */
    toString() {
        const { year, month, day } = this.ethiopian;
        const { hour, minute, period } = this.time || { hour: '??', minute: '??', period: '' };
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        return `Ethiopian: ${year}-${month}-${day} ${timeStr}`;
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

    /**
     * Returns the Ethiopian date formatted with month name.
     * 
     * @param {'english'|'amharic'} [lang='amharic'] - Language for month name.
     * @returns {string} Formatted date, e.g., "Meskerem-15-2017" or "መስከረም-15-2017"
     */
    format(lang = 'amharic') {
        const { year, month, day } = this.ethiopian;
        const names = monthNames[lang] || monthNames.amharic;
        const monthName = names[month - 1] || `Month${month}`;
        return `${monthName}-${day}-${year}`;
    }

    /**
     * Formats the Ethiopian date in Geez numerals and Amharic month name.
     *
     * @returns {string} The formatted date string in the format: "{Amharic Month Name} {Geez Day} {Geez Year}".
     *
     * formatInGeezAmharic(); // "የካቲት ፲ ፳፻፲፭"
     */
    formatInGeezAmharic() {
        const { year, month, day } = this.ethiopian;
        const monthName = monthNames.amharic[month - 1] || `Month${month}`;
        const geezDay = toGeez(day);
        const geezYear = toGeez(year);
        return `${monthName} ${geezDay} ${geezYear}`;
    }

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