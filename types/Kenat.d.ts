/**
 * Kenat - Ethiopian Calendar Date Wrapper
 *
 * A lightweight class to work with both Gregorian and Ethiopian calendars.
 * It wraps JavaScript's built-in `Date` object and converts Gregorian dates to Ethiopian equivalents.
 *
 */
export class Kenat {
    /**
     * Creates and returns a new instance of the Kenat class representing the current moment.
     *
     * @returns {Kenat} A new Kenat instance set to the current date and time.
     */
    static now(): Kenat;
    static getMonthCalendar(year: any, month: any, options?: {}): {
        month: any;
        monthName: any;
        year: any;
        headers: any;
        days: any[];
    };
    /**
     * Generates a full-year calendar as an array of month objects for the specified year.
     *
     * @param {number} year - The year for which to generate the calendar.
     * @param {Object} [options={}] - Optional configuration for calendar generation.
     * @param {boolean} [options.useGeez=false] - Whether to use the Geez calendar system.
     * @param {string} [options.weekdayLang='amharic'] - Language for weekday names (e.g., 'amharic').
     * @param {number} [options.weekStart=0] - The starting day of the week (0 = Sunday, 1 = Monday, etc.).
     * @param {function|null} [options.holidayFilter=null] - Optional filter function for holidays.
     * @returns {Array<Object>} An array of 13 month objects, each containing:
     *   - {number} month: The month number (1-13).
     *   - {string} monthName: The name of the month.
     *   - {number} year: The year of the month.
     *   - {Array<string>} headers: The headers for the days of the week.
     *   - {Array<Array<Object>>} days: The grid of day objects for the month.
     */
    static getYearCalendar(year: number, options?: {
        useGeez?: boolean;
        weekdayLang?: string;
        weekStart?: number;
        holidayFilter?: Function | null;
    }): Array<any>;
    /**
    * Generates an array of Kenat instances for a given date range.
    * @param {Kenat} startDate - The start of the range.
    * @param {Kenat} endDate - The end of the range.
    * @returns {Kenat[]} An array of Kenat objects.
    * @throws {InvalidInputTypeError} If start or end dates are not Kenat instances.
    */
    static generateDateRange(startDate: Kenat, endDate: Kenat): Kenat[];
    /**
     * Constructs a Kenat instance.
     * Can be initialized with:
     * - An Ethiopian date string (e.g., '2016/1/1', '2016-1-1').
     * - An object with { year, month, day }.
     * - A native JavaScript Date object (will be converted from Gregorian).
     * - No arguments, for the current date.
     *
     * @param {string|Object|Date} [input] - The date input.
     * @param {Object} [timeObj] - An optional time object.
     * @throws {InvalidEthiopianDateError} If the provided Ethiopian date is invalid.
     * @throws {InvalidDateFormatError} If the provided date string format is invalid.
     * @throws {UnrecognizedInputError} If the input format is unrecognized.
     */
    constructor(input?: string | any | Date, timeObj?: any);
    time: Time;
    ethiopian: {
        year: any;
        month: any;
        day: any;
    };
    /**
     * Converts the current Ethiopian date stored in this.ethiopian to its Gregorian equivalent.
     *
     * @returns {{ year: number, month: number, day: number }} The Gregorian date corresponding to the Ethiopian date.
     */
    getGregorian(): {
        year: number;
        month: number;
        day: number;
    };
    /**
     * Returns the Ethiopian equivalent of the stored Gregorian date.
     *
     * @returns {{ year: number, month: number, day: number }} An object representing the Ethiopian date.
     */
    getEthiopian(): {
        year: number;
        month: number;
        day: number;
    };
    /**
     * Sets the current time.
     *
     * @param {number} hour - The hour value to set.
     * @param {number} minute - The minute value to set.
     * @param {string} period - The period of the day (e.g., 'AM' or 'PM').
     */
    setTime(hour: number, minute: number, period: string): void;
    /**
     * Calculates and returns the Bahire Hasab values for the current instance's year.
     *
     * @returns {Object} An object containing all the calculated Bahire Hasab values
     * (ameteAlem, evangelist, wenber, metqi, nineveh, etc.).
     */
    getBahireHasab(): any;
    /**
     * Returns a string representation of the Ethiopian date and time.
     *
     * The format is: "Ethiopian: {year}-{month}-{day} {hh:mm period}".
     * If the time is not available, hour and minute are replaced with '??'.
     *
     * @returns {string} The formatted Ethiopian date and time string.
     */
    toString(): string;
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
    format(options?: {
        lang?: string;
        showWeekday?: boolean;
        useGeez?: boolean;
        includeTime?: boolean;
    }): string;
    /**
     * Formats the Ethiopian date in Geez numerals and Amharic month name.
     *
     * @returns {string} The formatted date string in the format: "{Amharic Month Name} {Geez Day} {Geez Year}".
     *
     * formatInGeezAmharic(); // "የካቲት ፲ ፳፻፲፭"
     */
    formatInGeezAmharic(): string;
    /**
     * Formats the Ethiopian date with weekday name.
     *
     * @param {'amharic'|'english'} [lang='amharic'] - Language for month and weekday names.
     * @param {boolean} [useGeez=false] - Whether to show numerals in Geez.
     * @returns {string} Formatted string with weekday, e.g. "ማክሰኞ, መስከረም ፳፩ ፳፻፲፯"
     */
    formatWithWeekday(lang?: "amharic" | "english", useGeez?: boolean): string;
    /**
     * Returns the Ethiopian date in "yyyy/mm/dd" short format.
     * @returns {string}
     */
    formatShort(): string;
    /**
     * Returns an ISO-style date string: "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm".
     * @returns {string}
     */
    toISOString(): string;
    /**
     * Checks if the current date is a holiday.
     * @param {Object} [options={}] - Options for language.
     * @param {string} [options.lang='amharic'] - The language for the holiday names and descriptions.
     * @returns {Array<Object>} An array of holiday objects for the current date, or an empty array if it's not a holiday.
     */
    isHoliday(options?: {
        lang?: string;
    }): Array<any>;
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
    getMonthCalendar(year?: number, month?: number, useGeez?: boolean): Array<any>;
    /**
     * Prints the calendar grid for the current Ethiopian month.
     *
     * @param {boolean} [useGeez=false] - If true, displays the calendar using Geez numerals.
     * @returns {void}
     */
    printThisMonth(useGeez?: boolean): void;
    /**
     * Adds a specified number of days to the current Ethiopian date.
     *
     * @param {number} days - The number of days to add.
     * @returns {Kenat} A new Kenat instance representing the updated date.
     */
    addDays(days: number): Kenat;
    /**
     * Returns a new Kenat instance with the date advanced by the specified number of months.
     *
     * @param {number} months - The number of months to add to the current date.
     * @returns {Kenat} A new Kenat instance representing the updated date.
     */
    addMonths(months: number): Kenat;
    /**
     * Returns a new Kenat instance with the year increased by the specified number of years.
     *
     * @param {number} years - The number of years to add to the current date.
     * @returns {Kenat} A new Kenat instance representing the updated date.
     */
    addYears(years: number): Kenat;
    /**
     * Calculates the difference in days between this object's Ethiopian date and another object's Ethiopian date.
     *
     * @param {Object} other - An object with a `getEthiopian` method that returns an Ethiopian date.
     * @returns {number} The number of days difference between the two Ethiopian dates.
     */
    diffInDays(other: any): number;
    /**
     * Calculates the difference in months between this instance's Ethiopian date and another Ethiopian date.
     *
     * @param {Object} other - An object with a `getEthiopian` method that returns an Ethiopian date.
     * @returns {number} The number of months difference between the two Ethiopian dates.
     */
    diffInMonths(other: any): number;
    /**
     * Calculates the difference in years between this instance's Ethiopian date and another.
     *
     * @param {Object} other - An object with a getEthiopian() method returning an Ethiopian date.
     * @returns {number} The number of years difference between the two Ethiopian dates.
     */
    diffInYears(other: any): number;
    getCurrentTime(): Time;
    /**
     * Checks if the current Kenat instance's date is before another Kenat instance's date.
     * @param {Kenat} other - The other Kenat instance to compare against.
     * @returns {boolean} True if the current date is before the other date.
     */
    isBefore(other: Kenat): boolean;
    /**
     * Checks if the current Kenat instance's date is after another Kenat instance's date.
     * @param {Kenat} other - The other Kenat instance to compare against.
     * @returns {boolean} True if the current date is after the other date.
     */
    isAfter(other: Kenat): boolean;
    /**
     * Checks if the current Kenat instance's date is the same as another Kenat instance's date.
     * @param {Kenat} other - The other Kenat instance to compare against.
     * @returns {boolean} True if the dates are the same.
     */
    isSameDay(other: Kenat): boolean;
    /**
     * Returns a new Kenat instance set to the first day of the current month.
     * @returns {Kenat} A new Kenat instance.
     */
    startOfMonth(): Kenat;
    /**
     * Returns a new Kenat instance set to the last day of the current month.
     * @returns {Kenat} A new Kenat instance.
     */
    endOfMonth(): Kenat;
    /**
     * Checks if the current Ethiopian year is a leap year.
     * @returns {boolean} True if it is a leap year.
     */
    isLeapYear(): boolean;
    /**
     * Returns the weekday number for the current date.
     * @returns {number} The day of the week (0 for Sunday, 6 for Saturday).
     */
    weekday(): number;
}
import { Time } from './Time.js';
