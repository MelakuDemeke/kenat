import { toGeez, toArabic } from '../src/geezConverter';
import { GeezConverterError } from '../src/errors/errorHandler.js';


describe('toGeez', () => {
    it('converts single digits correctly', () => {
        expect(toGeez(1)).toBe('፩');
        expect(toGeez(2)).toBe('፪');
        expect(toGeez(9)).toBe('፱');
    });

    it('converts tens correctly', () => {
        expect(toGeez(10)).toBe('፲');
        expect(toGeez(20)).toBe('፳');
        expect(toGeez(99)).toBe('፺፱');
    });

    it('converts hundreds correctly', () => {
        expect(toGeez(100)).toBe('፻');
        expect(toGeez(101)).toBe('፻፩');
        expect(toGeez(110)).toBe('፻፲');
        expect(toGeez(123)).toBe('፻፳፫');
        expect(toGeez(999)).toBe('፱፻፺፱');
    });

    it('converts thousands and ten thousands correctly', () => {
        expect(toGeez(1000)).toBe('፲፻');
        expect(toGeez(10000)).toBe('፼');
    });

    it('returns "0" for input 0', () => {
        expect(toGeez(0)).toBe('0');
    });

    it('accepts string input', () => {
        expect(toGeez('123')).toBe('፻፳፫');
        expect(toGeez('10000')).toBe('፼');
    });

    it('throws error for invalid input', () => {
        expect(() => toGeez(-1)).toThrow(GeezConverterError);
        expect(() => toGeez('abc')).toThrow(GeezConverterError);
        expect(() => toGeez(null)).toThrow();
        expect(() => toGeez(undefined)).toThrow();
        expect(() => toGeez(1.5)).toThrow(GeezConverterError);
    });
});

describe('toArabic', () => {
    it('converts single Ge\'ez numerals to Arabic', () => {
        expect(toArabic('፩')).toBe(1);
        expect(toArabic('፪')).toBe(2);
        expect(toArabic('፱')).toBe(9);
    });

    it('converts Ge\'ez tens to Arabic', () => {
        expect(toArabic('፲')).toBe(10);
        expect(toArabic('፳')).toBe(20);
        expect(toArabic('፺፱')).toBe(99);
    });

    it('converts Ge\'ez hundreds to Arabic', () => {
        expect(toArabic('፻')).toBe(100);
        expect(toArabic('፻፩')).toBe(101);
        expect(toArabic('፻፲')).toBe(110);
        expect(toArabic('፻፳፫')).toBe(123);
        expect(toArabic('፱፻፺፱')).toBe(999);
    });

    it('converts Ge\'ez thousands and ten thousands to Arabic', () => {
        expect(toArabic('፲፻')).toBe(1000);
        expect(toArabic('፼')).toBe(10000);
        expect(toArabic('፲፼')).toBe(100000);
    });

    it('handles complex numbers', () => {
        expect(toArabic('፲፻፺፱')).toBe(1099);
        expect(toArabic('፬፻')).toBe(300 + 100);
    });

    it('throws error for unknown Ge\'ez numerals', () => {
        expect(() => toArabic('A')).toThrow('Unknown Ge\'ez numeral: A');
        expect(() => toArabic('፩X')).toThrow('Unknown Ge\'ez numeral: X');
    });

    it('throws error for non-string input', () => {
        expect(() => toArabic(null)).toThrow(GeezConverterError);
        expect(() => toArabic(undefined)).toThrow(GeezConverterError);
        expect(() => toArabic(123)).toThrow(GeezConverterError);
    });

    it('converts round-trip toGeez -> toArabic', () => {
        for (let n of [1, 10, 99, 100, 123, 999, 1000, 10000, 12345, 999999]) {
            expect(toArabic(toGeez(n))).toBe(n);
        }
    });
});