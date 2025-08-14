export class Time {
    /**
     * Creates a Time instance from a Gregorian 24-hour time.
     * @param {number} hour - The Gregorian hour (0-23).
     * @param {number} [minute=0] - The minute (0-59).
     * @returns {Time} A new Time instance.
     * @throws {InvalidTimeError} If the Gregorian time is invalid.
     */
    static fromGregorian(hour: number, minute?: number): Time;
    /**
     * Creates a `Time` object from a string representation.
     *
     * This static method parses a time string, which can include hours, minutes, and an optional period (day/night).
     * It supports both Arabic numerals (e.g., "1", "30") and Ethiopic numerals (e.g., "፩", "፴") for hours and minutes,
     * assuming a `toArabic` utility function is available to convert Ethiopic numerals to Arabic numbers.
     *
     * The time string must contain a colon (`:`) separating the hour and minute.
     *
     * @static
     * @param {string} timeString - The string representation of the time.
     *   Expected formats:
     *   - "HH:MM" (e.g., "6:30", "፮:፴")
     *   - "HH:MM period" (e.g., "6:30 night", "፮:፴ ማታ")
     *   Where:
     *     - HH: Hour (Arabic or Ethiopic numeral).
     *     - MM: Minute (Arabic or Ethiopic numeral).
     *     - period: Optional. Case-insensitive. Recognized values are "night" or "ማታ".
     *       If the period is omitted, or if a third part is present but not recognized as "night" or "ማታ",
     *       the time is assumed to be in the 'day' period.
     *
     * @returns {Time} A new `Time` object representing the parsed time.
     *
     * @throws {InvalidTimeError} If the `timeString` is:
     *   - Not a string or an empty string.
     *   - Missing the colon (`:`) separator.
     *   - Formatted incorrectly (e.g., not enough parts after splitting).
     *   - Contains non-numeric values for hour or minute that cannot be parsed into numbers
     *     (neither as Arabic nor as Ethiopic numerals via `toArabic`).
     *
     */
    static fromString(timeString: string): Time;
    /**
     * Constructs a Time instance representing an Ethiopian time.
     * @param {number} hour - The Ethiopian hour (1-12).
     * @param {number} [minute=0] - The minute (0-59).
     * @param {string} [period='day'] - The period ('day' or 'night').
     * @throws {InvalidTimeError} If any time component is invalid.
     */
    constructor(hour: number, minute?: number, period?: string);
    hour: number;
    minute: number;
    period: string;
    /**
     * Converts the Ethiopian time to Gregorian 24-hour format.
     * @returns {{hour: number, minute: number}}
     */
    toGregorian(): {
        hour: number;
        minute: number;
    };
    /**
     * Adds a duration to the current time.
     * @param {{hours?: number, minutes?: number}} duration - Object with hours and/or minutes to add.
     * @returns {Time} A new Time instance with the added duration.
     */
    add(duration: {
        hours?: number;
        minutes?: number;
    }): Time;
    /**
     * Subtracts a duration from the current time.
     * @param {{hours?: number, minutes?: number}} duration - Object with hours and/or minutes to subtract.
     * @returns {Time} A new Time instance with the subtracted duration.
     */
    subtract(duration: {
        hours?: number;
        minutes?: number;
    }): Time;
    /**
     * Calculates the difference between this time and another.
     * @param {Time} otherTime - Another Time instance to compare against.
     * @returns {{hours: number, minutes: number}} An object with the absolute difference.
     */
    diff(otherTime: Time): {
        hours: number;
        minutes: number;
    };
    /**
     * Formats the time as a string.
     * @param {Object} [options] - Formatting options.
     * @param {string} [options.lang] - The language for the period label. Defaults to 'english' if useGeez is false, otherwise 'amharic'.
     * @param {boolean} [options.useGeez=true] - Whether to use Ge'ez numerals.
     * @param {boolean} [options.showPeriodLabel=true] - Whether to show the period label.
     * @param {boolean} [options.zeroAsDash=true] - Whether to represent zero minutes as a dash.
     * @returns {string} The formatted time string.
     */
    format(options?: {
        lang?: string;
        useGeez?: boolean;
        showPeriodLabel?: boolean;
        zeroAsDash?: boolean;
    }): string;
}
