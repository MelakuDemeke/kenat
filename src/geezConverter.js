/**
 * ethiopianNumberConverter.js
 *
 * Converts Arabic numerals (natural numbers) to their equivalent Ethiopic numerals.
 * Supports numbers from 1 up to 99999999.
 * 
 * Example:
 *   toGeez(1);     // '፩'
 *   toGeez(30);    // '፴'
 *   toGeez(123);   // '፻፳፫'
 *   toGeez(10000); // '፼'
 * 
 * @author Melaku Demeke
 * @license MIT
 */
/* /src/geezConverter.js (Updated) */
/* /src/geezConverter.js (Updated) */

import { GeezConverterError } from './errors/errorHandler.js';

const symbols = {
    ones: ['', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'],
    tens: ['', '፲', '፳', '፴', '፵', '፶', '፷', '፸', '፹', '፺'],
    hundred: '፻',
    tenThousand: '፼'
};

/**
 * Converts a natural number to Ethiopic numeral string.
 *
 * @param {number|string} input - The number to convert (positive integer only).
 * @returns {string} Ethiopic numeral string.
 * @throws {GeezConverterError} If input is not a valid positive integer.
 */
export function toGeez(input) {
    if (typeof input !== 'number' && typeof input !== 'string') {
        throw new GeezConverterError("Input must be a number or a string.");
    }

    const num = Number(input);

    if (isNaN(num) || !Number.isInteger(num) || num < 0) {
        throw new GeezConverterError("Input must be a non-negative integer.");
    }
    
    if (num === 0) return '0'; // Often Ge'ez doesn't have a zero, but useful for modern contexts.

    // Helper for numbers 1-99
    function convertBelow100(n) {
        if (n <= 0) return '';
        const tensDigit = Math.floor(n / 10);
        const onesDigit = n % 10;
        return symbols.tens[tensDigit] + symbols.ones[onesDigit];
    }
    
    if (num < 100) {
        return convertBelow100(num);
    }
    
    if (num === 100) return symbols.hundred;
    
    if (num < 10000) {
        const hundreds = Math.floor(num / 100);
        const remainder = num % 100;
        // For numbers like 101, it's ፻፩, not ፩፻፩. If the hundred part is 1, don't add a prefix.
        const hundredPart = (hundreds > 1 ? convertBelow100(hundreds) : '') + symbols.hundred;
        return hundredPart + convertBelow100(remainder);
    }
    
    // For numbers >= 10000, use recursion
    const tenThousandPart = Math.floor(num / 10000);
    const remainder = num % 10000;
    
    // If the ten-thousand part is 1, no prefix is needed (e.g., ፼, not ፩፼)
    const tenThousandGeez = (tenThousandPart > 1 ? toGeez(tenThousandPart) : '') + symbols.tenThousand;
    
    return tenThousandGeez + (remainder > 0 ? toGeez(remainder) : '');
}


/**
 * Converts a Ge'ez numeral string to its Arabic numeral equivalent.
 *
 * @param {string} geezStr - The Ge'ez numeral string to convert.
 * @returns {number} The Arabic numeral representation of the input string.
 * @throws {GeezConverterError} If the input is not a valid Ge'ez numeral string.
 */
export function toArabic(geezStr) {
    if (typeof geezStr !== 'string') {
        throw new GeezConverterError('Input must be a non-empty string.');
    }
    if (geezStr.trim() === '') {
        return 0; // Or throw error, depending on desired behavior for empty string
    }

    const reverseMap = {};
    symbols.ones.forEach((char, i) => { if (char) reverseMap[char] = i; });
    symbols.tens.forEach((char, i) => { if (char) reverseMap[char] = i * 10; });
    reverseMap[symbols.hundred] = 100;
    reverseMap[symbols.tenThousand] = 10000;

    let total = 0;
    let currentNumber = 0;

    for (const char of geezStr) {
        const value = reverseMap[char];

        if (value === undefined) {
            throw new GeezConverterError(`Unknown Ge'ez numeral: ${char}`);
        }

        if (value === 100 || value === 10000) {
            // If currentNumber is 0, it implies a standalone ፻ or ፼, so treat it as 1 * multiplier.
            currentNumber = (currentNumber || 1) * value;

            // ፼ acts as a separator for large numbers. Add the completed segment to the total.
            if (value === 10000) {
                total += currentNumber;
                currentNumber = 0;
            }
        } else {
            // Add simple digit values (1-99)
            currentNumber += value;
        }
    }

    // Add any remaining part (for numbers that don't end in ፼)
    total += currentNumber; 
    return total;
}
