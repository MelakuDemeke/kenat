import { toGeez, toArabic } from '../src/geezConverter.js';
import { GeezConverterError } from '../src/errors/errorHandler.js';

describe('toGeez', () => {
    test('converts single digits correctly', () => {
        expect(toGeez(0)).toBe('0');
        expect(toGeez(1)).toBe('፩');
        expect(toGeez(5)).toBe('፭');
        expect(toGeez(9)).toBe('፱');
    });

    test('converts tens correctly', () => {
        expect(toGeez(10)).toBe('፲');
        expect(toGeez(30)).toBe('፴');
        expect(toGeez(99)).toBe('፺፱');
    });

    test('converts hundreds correctly', () => {
        expect(toGeez(100)).toBe('፻');
        expect(toGeez(123)).toBe('፻፳፫');
        expect(toGeez(999)).toBe('፱፻፺፱');

    });

    test('converts thousands and ten-thousands correctly', () => {
        expect(toGeez(10000)).toBe('፼');
        expect(toGeez(12345)).toBe('፼፳፫፻፵፭');
        expect(toGeez(99999)).toBe('፱፼፺፱፻፺፱');
    });

    test('throws error for invalid inputs', () => {
        expect(() => toGeez(-1)).toThrow();
        expect(() => toGeez('abc')).toThrow();
        expect(() => toGeez(null)).toThrow();
    });
});

describe('toArabic (reverse of toGeez)', () => {
    test('reverses single digits correctly', () => {
        expect(toArabic('፩')).toBe(1);
        expect(toArabic('፭')).toBe(5);
        expect(toArabic('፱')).toBe(9);
    });

    test('reverses tens correctly', () => {
        expect(toArabic('፲')).toBe(10);
        expect(toArabic('፴')).toBe(30);
        expect(toArabic('፺፱')).toBe(99);
    });

    test('reverses hundreds correctly', () => {
        expect(toArabic('፻')).toBe(100);
        expect(toArabic('፻፳፫')).toBe(123);
        expect(toArabic('፱፻፺፱')).toBe(999);
    });

    test('reverses thousands and ten-thousands correctly', () => {
        expect(toArabic('፼')).toBe(10000);
        expect(toArabic('፼፳፫፻፵፭')).toBe(12345);
        expect(toArabic('፱፼፺፱፻፺፱')).toBe(99999);
    });

    test('throws error for invalid geez input', () => {
        expect(() => toArabic('xyz')).toThrow(GeezConverterError);
        expect(toArabic('')).toBe(0);
        expect(() => toArabic('፻፻፻x')).toThrow(GeezConverterError);
    });
});
