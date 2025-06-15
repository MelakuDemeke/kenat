import { toGeez, toArabic } from './geezConverter.js';
import { PERIOD_LABELS } from './constants.js';
import { InvalidTimeError } from './errors/errorHandler.js';
import { validateNumericInputs } from './utils.js';

export class Time {
    /**
     * Constructs a Time instance representing an Ethiopian time.
     * @param {number} hour - The Ethiopian hour (1-12).
     * @param {number} [minute=0] - The minute (0-59).
     * @param {string} [period='day'] - The period ('day' or 'night').
     * @throws {InvalidTimeError} If any time component is invalid.
     */
    constructor(hour, minute = 0, period = 'day') {
        validateNumericInputs('Time.constructor', { hour, minute });

        if (hour < 1 || hour > 12) {
            throw new InvalidTimeError(`Invalid Ethiopian hour: ${hour}. Must be between 1 and 12.`);
        }
        if (minute < 0 || minute > 59) {
            throw new InvalidTimeError(`Invalid minute: ${minute}. Must be between 0 and 59.`);
        }
        if (period !== 'day' && period !== 'night') {
            throw new InvalidTimeError(`Invalid period: "${period}". Must be 'day' or 'night'.`);
        }

        this.hour = hour;
        this.minute = minute;
        this.period = period;
    }

    /**
     * Creates a Time instance from a Gregorian 24-hour time.
     * @param {number} hour - The Gregorian hour (0-23).
     * @param {number} [minute=0] - The minute (0-59).
     * @returns {Time} A new Time instance.
     * @throws {InvalidTimeError} If the Gregorian time is invalid.
     */
    static fromGregorian(hour, minute = 0) {
        validateNumericInputs('Time.fromGregorian', { hour, minute });

        if (hour < 0 || hour > 23) {
            throw new InvalidTimeError(`Invalid Gregorian hour: ${hour}. Must be between 0 and 23.`);
        }
        if (minute < 0 || minute > 59) {
            throw new InvalidTimeError(`Invalid minute: ${minute}. Must be between 0 and 59.`);
        }

        // Normalize Gregorian hour to an Ethiopian base (where 6 AM is 0)
        let tempHour = hour - 6;
        if (tempHour < 0) {
            tempHour += 24;
        }

        const period = (tempHour < 12) ? 'day' : 'night';
        let ethHour = tempHour % 12;
        ethHour = (ethHour === 0) ? 12 : ethHour;

        return new Time(ethHour, minute, period);
    }

    /**
     * Converts the Ethiopian time to Gregorian 24-hour format.
     * @returns {{hour: number, minute: number}}
     */
    toGregorian() {
        // Convert Ethiopian 1-12 hour to a 0-11 offset, where 12 o'clock is 0.
        let gregHour = this.hour % 12;

        if (this.period === 'day') {
            gregHour += 6;
        } else { // 'night'
            gregHour += 18;
        }

        // Handle the 24-hour wrap-around (e.g., 6 night becomes 24, which should be 0)
        gregHour = gregHour % 24;

        return { hour: gregHour, minute: this.minute };
    }


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
    static fromString(timeString) {
        if (typeof timeString !== 'string' || timeString.trim() === '') {
            throw new InvalidTimeError(`Input must be a non-empty string, but received "${timeString}".`);
        }

        if (!timeString.includes(':')) {
            throw new InvalidTimeError(`Invalid time string format: "${timeString}". Time must include a colon ':' separator.`);
        }

        const parseNumber = (str) => {
            const arabicNum = parseInt(str, 10);
            if (!isNaN(arabicNum)) {
                return arabicNum;
            }
            try {
                return toArabic(str);
            } catch (e) {
                return NaN;
            }
        };

        const parts = timeString.split(/[:\s]+/).filter(p => p);

        if (parts.length < 2) {
            throw new InvalidTimeError(`Invalid time string format: "${timeString}".`);
        }

        const hour = parseNumber(parts[0]);
        const minute = parseNumber(parts[1]);

        if (isNaN(hour) || isNaN(minute)) {
            throw new InvalidTimeError(`Invalid number in time string: "${timeString}"`);
        }

        let period = 'day';
        if (parts.length > 2) {
            const periodStr = parts[2].toLowerCase();
            if (periodStr === 'night' || periodStr === 'ማታ') {
                period = 'night';
            }
        }
        return new Time(hour, minute, period);
    }

    // Time Artimatic
    /**
     * Adds a duration to the current time.
     * @param {{hours?: number, minutes?: number}} duration - Object with hours and/or minutes to add.
     * @returns {Time} A new Time instance with the added duration.
     */
    add(duration) {
        if (typeof duration !== 'object' || duration === null) {
            throw new InvalidTimeError('Duration must be an object.');
        }
        const { hours = 0, minutes = 0 } = duration;
        validateNumericInputs('Time.add', { hours, minutes });

        const greg = this.toGregorian();
        let totalMinutes = greg.hour * 60 + greg.minute + hours * 60 + minutes;
        totalMinutes = ((totalMinutes % 1440) + 1440) % 1440; // Normalize to a 24-hour cycle

        const newHour = Math.floor(totalMinutes / 60);
        const newMinute = totalMinutes % 60;

        return Time.fromGregorian(newHour, newMinute);
    }

    /**
     * Subtracts a duration from the current time.
     * @param {{hours?: number, minutes?: number}} duration - Object with hours and/or minutes to subtract.
     * @returns {Time} A new Time instance with the subtracted duration.
     */
    subtract(duration) {
        if (typeof duration !== 'object' || duration === null) {
            throw new InvalidTimeError('Duration must be an object.');
        }
        const { hours = 0, minutes = 0 } = duration;

        return this.add({ hours: -hours, minutes: -minutes });
    }

    /**
     * Calculates the difference between this time and another.
     * @param {Time} otherTime - Another Time instance to compare against.
     * @returns {{hours: number, minutes: number}} An object with the absolute difference.
     */
    diff(otherTime) {
        if (!(otherTime instanceof Time)) {
            throw new InvalidTimeError('Can only compare with another Time instance.');
        }
        const t1 = this.toGregorian();
        const t2 = otherTime.toGregorian();
        const totalMinutes1 = t1.hour * 60 + t1.minute;
        const totalMinutes2 = t2.hour * 60 + t2.minute;

        let diff = Math.abs(totalMinutes1 - totalMinutes2);

        // Time wraps in a 24h cycle, so find the shortest path
        if (diff > 720) diff = 1440 - diff;

        return {
            hours: Math.floor(diff / 60),
            minutes: diff % 60,
        };
    }

    /**
     * Formats the time as a string.
     * @param {Object} [options] - Formatting options.
     * @param {string} [options.lang] - The language for the period label. Defaults to 'english' if useGeez is false, otherwise 'amharic'.
     * @param {boolean} [options.useGeez=true] - Whether to use Ge'ez numerals.
     * @param {boolean} [options.showPeriodLabel=true] - Whether to show the period label.
     * @param {boolean} [options.zeroAsDash=true] - Whether to represent zero minutes as a dash.
     * @returns {string} The formatted time string.
     */
    format(options = {}) {
        // If useGeez is explicitly false, the default language should be English.
        const defaultLang = options.useGeez === false ? 'english' : 'amharic';
        const { lang = defaultLang, useGeez = true, showPeriodLabel = true, zeroAsDash = true } = options;

        const formatNum = (num) => {
            if (useGeez) return toGeez(num);
            return num.toString().padStart(2, '0');
        };

        const hourStr = formatNum(this.hour);

        let minuteStr;
        if (zeroAsDash && this.minute === 0) {
            minuteStr = '_';
        } else {
            minuteStr = useGeez ? toGeez(this.minute) : this.minute.toString().padStart(2, '0');
        }

        let periodLabel = '';
        if (showPeriodLabel) {
            if (lang === 'english') {
                // Use English labels for the period
                periodLabel = this.period; // 'day' or 'night'
            } else {
                // Default to Amharic labels from constants
                const amharicLabels = { day: 'ጠዋት', night: 'ማታ' };
                periodLabel = amharicLabels[this.period];
            }
        }

        const label = periodLabel ? ` ${periodLabel}` : '';
        return `${hourStr}:${minuteStr}${label}`;
    }
}
