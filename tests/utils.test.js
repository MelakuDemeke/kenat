import { dayOfYear } from "../src/utils";

describe('dayOfYear', () => {
    it('returns 1 for January 1st of a non-leap year', () => {
        expect(dayOfYear(2023, 1, 1)).toBe(1);
    });

    it('returns 32 for February 1st of a non-leap year', () => {
        expect(dayOfYear(2023, 2, 1)).toBe(32);
    });

    it('returns 59 for February 28th of a non-leap year', () => {
        expect(dayOfYear(2023, 2, 28)).toBe(59);
    });

    it('returns 60 for March 1st of a non-leap year', () => {
        expect(dayOfYear(2023, 3, 1)).toBe(60);
    });

    it('returns 60 for February 29th of a leap year', () => {
        expect(dayOfYear(2024, 2, 29)).toBe(60);
    });

    it('returns 61 for March 1st of a leap year', () => {
        expect(dayOfYear(2024, 3, 1)).toBe(61);
    });

    it('returns 365 for December 31st of a non-leap year', () => {
        expect(dayOfYear(2023, 12, 31)).toBe(365);
    });

    it('returns 366 for December 31st of a leap year', () => {
        expect(dayOfYear(2024, 12, 31)).toBe(366);
    });
});

