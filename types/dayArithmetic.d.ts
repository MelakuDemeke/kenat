/**
 * Adds a specified number of days to an Ethiopian date.
 *
 * @param {Object} ethiopian - The Ethiopian date object { year, month, day }.
 * @param {number} days - The number of days to add.
 * @returns {Object} The resulting Ethiopian date.
 * @throws {InvalidInputTypeError} If inputs are not of the correct type.
 */
export function addDays(ethiopian: any, days: number): any;
/**
 * Adds a specified number of months to an Ethiopian date.
 *
 * @param {Object} ethiopian - The Ethiopian date object { year, month, day }.
 * @param {number} months - The number of months to add.
 * @returns {Object} The resulting Ethiopian date.
 * @throws {InvalidInputTypeError} If inputs are not of the correct type.
 */
export function addMonths(ethiopian: any, months: number): any;
/**
 * Adds a specified number of years to an Ethiopian date.
 *
 * @param {Object} ethiopian - The Ethiopian date object { year, month, day }.
 * @param {number} years - The number of years to add.
 * @returns {Object} The resulting Ethiopian date.
 * @throws {InvalidInputTypeError} If inputs are not of the correct type.
 */
export function addYears(ethiopian: any, years: number): any;
/**
 * Calculates the difference in days between two Ethiopian dates.
 *
 * @param {Object} a - The first Ethiopian date object.
 * @param {Object} b - The second Ethiopian date object.
 * @returns {number} The difference in days.
 * @throws {InvalidInputTypeError} If inputs are not valid date objects.
 */
export function diffInDays(a: any, b: any): number;
/**
 * Calculates the difference in months between two Ethiopian dates.
 *
 * @param {Object} a - The first Ethiopian date object.
 * @param {Object} b - The second Ethiopian date object.
 * @returns {number} The difference in months.
 * @throws {InvalidInputTypeError} If inputs are not valid date objects.
 */
export function diffInMonths(a: any, b: any): number;
/**
 * Calculates the difference in years between two Ethiopian dates.
 *
 * @param {Object} a - The first Ethiopian date object.
 * @param {Object} b - The second Ethiopian date object.
 * @returns {number} The difference in years.
 * @throws {InvalidInputTypeError} If inputs are not valid date objects.
 */
export function diffInYears(a: any, b: any): number;
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
export function diffBreakdown(a: any, b: any, options?: {
    units?: Array<"years" | "months" | "days">;
}): {
    sign: 1 | -1;
    years?: number;
    months?: number;
    days?: number;
    totalDays: number;
};
