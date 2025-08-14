/**
 * Converts a natural number to Ethiopic numeral string.
 *
 * @param {number|string} input - The number to convert (positive integer only).
 * @returns {string} Ethiopic numeral string.
 * @throws {GeezConverterError} If input is not a valid positive integer.
 */
export function toGeez(input: number | string): string;
/**
 * Converts a Ge'ez numeral string to its Arabic numeral equivalent.
 *
 * @param {string} geezStr - The Ge'ez numeral string to convert.
 * @returns {number} The Arabic numeral representation of the input string.
 * @throws {GeezConverterError} If the input is not a valid Ge'ez numeral string.
 */
export function toArabic(geezStr: string): number;
