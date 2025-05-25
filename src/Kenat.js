import { ethiopianToGregorian, gregorianToEthiopian } from './conversions.js';
import { printMonthCalendarGrid } from './render/printMonthCalendarGrid.js';
import { monthNames, daysOfWeek } from './constants.js';
import { toGeez } from './geezConverter.js';
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
    constructor(ethiopianDateStr) {
        if (!ethiopianDateStr) {
            // default to current Gregorian date → Ethiopian
            const today = new Date();
            this.ethiopian = gregorianToEthiopian(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
            );
        } else if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(ethiopianDateStr)) {
            const [year, month, day] = ethiopianDateStr.split('/').map(Number);
            this.ethiopian = { year, month, day };
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
        return ethiopianToGregorian(year, month, day);
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
     * Custom string representation of the Ethiopian date.
     * 
     * @returns {string} A string like "Ethiopian: 2017-9-15"
     */
    toString() {
        return `Ethiopian: ${this.ethiopian.year}-${this.ethiopian.month}-${this.ethiopian.day}`;
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
            const gregDate = ethiopianToGregorian(year, month, day);
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


    static getMonthGrid(input = {}) {
        let year, month, weekStart = 0, useGeez = false, weekdayLang = 'amharic';

        if (typeof input === 'string') {
            const match = input.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
            if (!match) throw new Error("Invalid Ethiopian date format. Use 'yyyy/mm/dd'");
            year = parseInt(match[1]);
            month = parseInt(match[2]);
        } else if (typeof input === 'object') {
            ({ year, month, weekStart = 0, useGeez = false, weekdayLang = 'amharic' } = input);
        }

        const current = Kenat.now().getEthiopian();
        const y = year || current.year;
        const m = month || current.month;

        const temp = new Kenat(`${y}/${m}/1`);
        const days = temp.getMonthCalendar(y, m, useGeez);
        const labels = daysOfWeek[weekdayLang] || daysOfWeek.amharic;

        const daysWithWeekday = days.map(day => {
            const weekday = getWeekday(day.ethiopian);
            return {
                ...day,
                weekday,
                weekdayName: labels[weekday]
            };
        });

        const firstWeekday = daysWithWeekday[0].weekday;
        let offset = firstWeekday - weekStart;
        if (offset < 0) offset += 7;

        const padded = Array(offset).fill(null).concat(daysWithWeekday);

        // 🔁 Rotate weekday labels based on weekStart
        const headers = labels.slice(weekStart).concat(labels.slice(0, weekStart));

        return {
            headers,
            days: padded
        };
    }

}