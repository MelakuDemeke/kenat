import { ethiopianToGregorian, gregorianToEthiopian } from './conversions.js';
import { monthNames } from './monthNames.js';
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
     * @param {'english'|'amharic'} [lang='english'] - Language for month name.
     * @returns {string} Formatted date, e.g., "Meskerem-15-2017" or "መስከረም-15-2017"
     */
    format(lang = 'amharic') {
        const { year, month, day } = this.ethiopian;
        const names = monthNames[lang] || monthNames.amharic;
        const monthName = names[month - 1] || `Month${month}`;
        return `${monthName}-${day}-${year}`;
    }
}