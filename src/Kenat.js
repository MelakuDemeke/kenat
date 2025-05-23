import { gregorianToEthiopian } from './conversions.js';
/**
 * Kenat - Ethiopian Calendar Date Wrapper
 * 
 * A lightweight class to work with both Gregorian and Ethiopian calendars.
 * It wraps JavaScript's built-in `Date` object and converts Gregorian dates to Ethiopian equivalents.
 *
 */

export class Kenat {
    /**
     * Constructs a Kenat date wrapper.
     * 
     * @param {Date | string} [inputDate=new Date()] - A Date object or date string. Defaults to the current date/time.
     */
    constructor(inputDate = new Date()) {
        this.gregorian = new Date(inputDate); // Accepts Date object or ISO string
        const { year, month, day } = this.gregorianToParts(this.gregorian);
        this.ethiopian = gregorianToEthiopian(year, month, day);
    }

    /**
   * Converts a JS Date object into separate year, month, and day components.
   * 
   * @private
   * @param {Date} date - The Date object to extract parts from.
   * @returns {{ year: number, month: number, day: number }}
   */
    gregorianToParts(date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }

    /**
     * Returns the original Gregorian JS `Date` object.
     * 
     * @returns {Date} The internal JavaScript `Date` instance.
     */
    getGregorian() {
        return this.gregorian;
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
}