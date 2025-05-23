import { toGeez } from '../src/geezConverter.js';

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
