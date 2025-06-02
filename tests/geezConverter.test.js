import { toGeez } from '../src/geezConverter';

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
        expect(() => toGeez(-1)).toThrow('Input must be a natural number.');
        expect(() => toGeez('abc')).toThrow('Input must be a natural number.');
        expect(() => toGeez('')).toThrow('Input must be a natural number.');
        expect(() => toGeez(null)).toThrow();
        expect(() => toGeez(undefined)).toThrow();
        expect(() => toGeez(1.5)).toThrow('Input must be a natural number.');
    });
});