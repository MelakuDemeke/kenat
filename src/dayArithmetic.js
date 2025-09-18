import {
    getEthiopianDaysInMonth,
    isEthiopianLeapYear,
    validateNumericInputs,
    validateEthiopianDateObject
} from './utils.js';


/**
 * Adds a specified number of days to an Ethiopian date.
 *
 * @param {Object} ethiopian - The Ethiopian date object { year, month, day }.
 * @param {number} days - The number of days to add.
 * @returns {Object} The resulting Ethiopian date.
 * @throws {InvalidInputTypeError} If inputs are not of the correct type.
 */
export function addDays(ethiopian, days) {
    validateEthiopianDateObject(ethiopian, 'addDays', 'ethiopian');
    validateNumericInputs('addDays', { days });

    let { year, month, day } = ethiopian;
    day += days;

    // Handle positive days (moving forward)
    while (day > getEthiopianDaysInMonth(year, month)) {
        day -= getEthiopianDaysInMonth(year, month);
        month += 1;

        if (month > 13) {
            month = 1;
            year += 1;
        }
    }

    // Handle negative days (moving backward)
    while (day <= 0) {
        month -= 1;
        if (month < 1) {
            month = 13;
            year -= 1;
        }
        day += getEthiopianDaysInMonth(year, month);
    }

    return { year, month, day };
}

/**
 * Adds a specified number of months to an Ethiopian date.
 *
 * @param {Object} ethiopian - The Ethiopian date object { year, month, day }.
 * @param {number} months - The number of months to add.
 * @returns {Object} The resulting Ethiopian date.
 * @throws {InvalidInputTypeError} If inputs are not of the correct type.
 */
export function addMonths(ethiopian, months) {
    validateEthiopianDateObject(ethiopian, 'addMonths', 'ethiopian');
    validateNumericInputs('addMonths', { months });

    let { year, month, day } = ethiopian;
    let totalMonths = month + months;

    year += Math.floor((totalMonths - 1) / 13);
    month = ((totalMonths - 1) % 13 + 13) % 13 + 1;

    const daysInTargetMonth = getEthiopianDaysInMonth(year, month);
    if (day > daysInTargetMonth) {
        day = daysInTargetMonth;
    }

    return { year, month, day };
}

/**
 * Adds a specified number of years to an Ethiopian date.
 *
 * @param {Object} ethiopian - The Ethiopian date object { year, month, day }.
 * @param {number} years - The number of years to add.
 * @returns {Object} The resulting Ethiopian date.
 * @throws {InvalidInputTypeError} If inputs are not of the correct type.
 */
export function addYears(ethiopian, years) {
    validateEthiopianDateObject(ethiopian, 'addYears', 'ethiopian');
    validateNumericInputs('addYears', { years });

    let { year, month, day } = ethiopian;
    year += years;

    if (month === 13 && day === 6 && !isEthiopianLeapYear(year)) {
        day = 5;
    }

    return { year, month, day };
}

/**
 * Calculates the difference in days between two Ethiopian dates.
 *
 * @param {Object} a - The first Ethiopian date object.
 * @param {Object} b - The second Ethiopian date object.
 * @returns {number} The difference in days.
 * @throws {InvalidInputTypeError} If inputs are not valid date objects.
 */
export function diffInDays(a, b) {
    validateEthiopianDateObject(a, 'diffInDays', 'a');
    validateEthiopianDateObject(b, 'diffInDays', 'b');

    const totalDays = (eth) => {
        let days = 0;
        for (let y = 1; y < eth.year; y++) {
            days += isEthiopianLeapYear(y) ? 366 : 365;
        }
        for (let m = 1; m < eth.month; m++) {
            days += getEthiopianDaysInMonth(eth.year, m);
        }
        days += eth.day;
        return days;
    };

    return totalDays(a) - totalDays(b);
}

/**
 * Calculates the difference in months between two Ethiopian dates.
 *
 * @param {Object} a - The first Ethiopian date object.
 * @param {Object} b - The second Ethiopian date object.
 * @returns {number} The difference in months.
 * @throws {InvalidInputTypeError} If inputs are not valid date objects.
 */
export function diffInMonths(a, b) {
    validateEthiopianDateObject(a, 'diffInMonths', 'a');
    validateEthiopianDateObject(b, 'diffInMonths', 'b');

    const totalMonthsA = a.year * 13 + (a.month - 1);
    const totalMonthsB = b.year * 13 + (b.month - 1);
    let diff = totalMonthsA - totalMonthsB;

    if (a.day < b.day) {
        diff -= 1;
    }

    return diff;
}

/**
 * Calculates the difference in years between two Ethiopian dates.
 *
 * @param {Object} a - The first Ethiopian date object.
 * @param {Object} b - The second Ethiopian date object.
 * @returns {number} The difference in years.
 * @throws {InvalidInputTypeError} If inputs are not valid date objects.
 */
export function diffInYears(a, b) {
    validateEthiopianDateObject(a, 'diffInYears', 'a');
    validateEthiopianDateObject(b, 'diffInYears', 'b');

    const isAfter = (a.year > b.year) ||
        (a.year === b.year && a.month > b.month) ||
        (a.year === b.year && a.month === b.month && a.day >= b.day);

    const [later, earlier] = isAfter ? [a, b] : [b, a];
    let diff = later.year - earlier.year;

    if (later.month < earlier.month || (later.month === earlier.month && later.day < earlier.day)) {
        diff--;
    }

    const finalDiff = isAfter ? diff : -diff;

    // Coerce -0 to 0 to ensure strict equality passes in tests.
    if (finalDiff === 0) {
        return 0;
    }

    return finalDiff;
}

/**
 * Calculates a human-friendly breakdown between two Ethiopian dates.
 * Iteratively accumulates years, then months, then days to avoid off-by-one issues.
 *
 * @param {Object} a - First Ethiopian date { year, month, day }.
 * @param {Object} b - Second Ethiopian date { year, month, day }.
 * @param {Object} [options]
 * @param {Array<'years'|'months'|'days'>} [options.units=['years','months','days']] - Units to include, in order.
 * @returns {{ sign: 1|-1, years?: number, months?: number, days?: number, totalDays: number }}
 */
export function diffBreakdown(a, b, options = {}) {
    validateEthiopianDateObject(a, 'diffBreakdown', 'a');
    validateEthiopianDateObject(b, 'diffBreakdown', 'b');

    const { units = ['years', 'months', 'days'] } = options;
    const totalDaysDiff = diffInDays(a, b); // positive if a after b

    const sign = totalDaysDiff === 0 ? 1 : (totalDaysDiff > 0 ? 1 : -1);
    const later = sign >= 0 ? a : b;
    const earlier = sign >= 0 ? b : a;

    let cursor = { ...earlier };
    const result = { sign, totalDays: Math.abs(totalDaysDiff) };

    if (units.includes('years')) {
        let years = 0;
        while (true) {
            const next = addYears(cursor, 1);
            if (diffInDays(later, next) >= 0) {
                years += 1;
                cursor = next;
            } else {
                break;
            }
        }
        result.years = years;
    }

    if (units.includes('months')) {
        let months = 0;
        while (true) {
            const next = addMonths(cursor, 1);
            if (diffInDays(later, next) >= 0) {
                months += 1;
                cursor = next;
            } else {
                break;
            }
        }
        result.months = months;
    }

    if (units.includes('days')) {
        result.days = Math.abs(diffInDays(later, cursor));
    }

    return result;
}
