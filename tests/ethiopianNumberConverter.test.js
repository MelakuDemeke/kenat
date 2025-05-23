import { convertToEthiopianNumeral } from '../src/ethiopianNumberConverter.js';

describe('convertToEthiopianNumeral', () => {
    test('converts single digits correctly', () => {
        expect(convertToEthiopianNumeral(0)).toBe('0');
        expect(convertToEthiopianNumeral(1)).toBe('፩');
        expect(convertToEthiopianNumeral(5)).toBe('፭');
        expect(convertToEthiopianNumeral(9)).toBe('፱');
    });

    test('converts tens correctly', () => {
        expect(convertToEthiopianNumeral(10)).toBe('፲');
        expect(convertToEthiopianNumeral(30)).toBe('፴');
        expect(convertToEthiopianNumeral(99)).toBe('፺፱');
    });

    test('converts hundreds correctly', () => {
        expect(convertToEthiopianNumeral(100)).toBe('፻');
        expect(convertToEthiopianNumeral(123)).toBe('፻፳፫');
        expect(convertToEthiopianNumeral(999)).toBe('፱፻፺፱');

    });

    test('converts thousands and ten-thousands correctly', () => {
        expect(convertToEthiopianNumeral(10000)).toBe('፼');
        expect(convertToEthiopianNumeral(12345)).toBe('፼፳፫፻፵፭');
        expect(convertToEthiopianNumeral(99999)).toBe('፱፼፺፱፻፺፱');
    });

    test('throws error for invalid inputs', () => {
        expect(() => convertToEthiopianNumeral(-1)).toThrow();
        expect(() => convertToEthiopianNumeral('abc')).toThrow();
        expect(() => convertToEthiopianNumeral(null)).toThrow();
    });
});
