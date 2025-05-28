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
 * @throws {Error} If input is not a valid positive integer.
 */
export function toGeez(input) {
    if (!/^\d+$/.test(input.toString())) {
        throw new Error("Input must be a natural number.");
    }

    let number = parseInt(input, 10);
    if (number === 0) return '0';

    let result = '';
    let blocks = [];
    let index = 0;

    // Break number into pairs of 2 digits from the right
    while (number > 0) {
        blocks.unshift(number % 100);
        number = Math.floor(number / 100);
    }

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const isLastBlock = i === blocks.length - 1;
        const [tensDigit, onesDigit] = [Math.floor(block / 10), block % 10];
        let part = '';

        if (block !== 0) {
            if (!(blocks.length > 1 && i === 0 && block === 1)) {
                part = symbols.tens[tensDigit] + symbols.ones[onesDigit];
            }

            const position = blocks.length - i - 1;
            if (position % 2 === 0 && position !== 0) {
                part += symbols.tenThousand;
            } else if (position % 2 !== 0 && position !== 0) {
                part += symbols.hundred;
            }
        }

        result += part;
    }

    return result;
}


/**
 * Converts a Ge'ez numeral string to its Arabic numeral equivalent.
 *
 * @param {string} geezStr - The Ge'ez numeral string to convert.
 * @returns {number} The Arabic numeral representation of the input string.
 * @throws {Error} If the input contains an unknown Ge'ez numeral character.
 */
export function toArabic(geezStr) {
    const reverseMap = {};
    if (typeof geezStr !== 'string' || geezStr.trim() === '') {
        throw new Error('Geez input must be a non-empty string.');
    }

    // Build reverse map from existing symbols
    symbols.ones.forEach((char, i) => {
        if (char) reverseMap[char] = i;
    });
    symbols.tens.forEach((char, i) => {
        if (char) reverseMap[char] = i * 10;
    });
    reverseMap[symbols.hundred] = 100;
    reverseMap[symbols.tenThousand] = 10000;

    let result = 0;
    let temp = 0;

    for (const char of geezStr) {
        const value = reverseMap[char];

        if (value === undefined) {
            throw new Error(`Unknown Ge'ez numeral: ${char}`);
        }

        if (value === 100 || value === 10000) {
            temp = (temp || 1) * value;
            result += temp;
            temp = 0;
        } else {
            temp += value;
        }
    }

    result += temp;

    return result;
}
