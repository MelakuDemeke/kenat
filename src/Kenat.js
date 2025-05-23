import { ethiopianToGregorian, gregorianToEthiopian } from './conversions.js';
import { printMonthCalendarGrid } from './render/printMonthCalendarGrid.js';
import { monthNames } from './monthNames.js';
import { toGeez } from './geezConverter.js';
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
        const daysInMonth = month === 13 ? (year % 4 === 3 ? 6 : 5) : 30;
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

    /**
     * Add days to current Ethiopian date, return new Kenat instance.
     * @param {number} days
     * @returns {Kenat}
     */
    addDays(days) {
        const greg = this.getGregorian();
        const date = new Date(greg.year, greg.month - 1, greg.day);
        date.setDate(date.getDate() + days);
        const eth = gregorianToEthiopian(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return new Kenat(`${eth.year}/${eth.month}/${eth.day}`);
    }

    /**
     * Add months to current Ethiopian date, return new Kenat instance.
     * @param {number} months
     * @returns {Kenat}
     */
    addMonths(months) {
        const greg = this.getGregorian();
        const date = new Date(greg.year, greg.month - 1, greg.day);
        date.setMonth(date.getMonth() + months);
        const eth = gregorianToEthiopian(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return new Kenat(`${eth.year}/${eth.month}/${eth.day}`);
    }

    /**
     * Add years to current Ethiopian date, return new Kenat instance.
     * @param {number} years
     * @returns {Kenat}
     */
    addYears(years) {
        const greg = this.getGregorian();
        const date = new Date(greg.year, greg.month - 1, greg.day);
        date.setFullYear(date.getFullYear() + years);
        const eth = gregorianToEthiopian(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return new Kenat(`${eth.year}/${eth.month}/${eth.day}`);
    }

    /**
     * Difference between this and another Kenat instance in days.
     * @param {Kenat} other
     * @returns {number} Positive if this > other, negative otherwise
     */
    diffInDays(other) {
        const g1 = this.getGregorian();
        const g2 = other.getGregorian();
        const d1 = new Date(g1.year, g1.month - 1, g1.day);
        const d2 = new Date(g2.year, g2.month - 1, g2.day);
        const diffMs = d1 - d2;
        return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }

    /**
     * Difference between this and another Kenat instance in months.
     * @param {Kenat} other
     * @returns {number} Positive if this > other, negative otherwise
     */
    diffInMonths(other) {
        const g1 = this.getGregorian();
        const g2 = other.getGregorian();
        let months = (g1.year - g2.year) * 12 + (g1.month - g2.month);
        if (g1.day < g2.day) months -= 1;
        return months;
    }

    /**
     * Difference between this and another Kenat instance in years.
     * @param {Kenat} other
     * @returns {number} Positive if this > other, negative otherwise
     */
    diffInYears(other) {
        const g1 = this.getGregorian();
        const g2 = other.getGregorian();
        let years = g1.year - g2.year;
        if (
            g1.month < g2.month ||
            (g1.month === g2.month && g1.day < g2.day)
        ) years -= 1;
        return years;
    }
}