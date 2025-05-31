import { dayOfYear } from "../src/utils";
import { monthDayFromDayOfYear } from "../src/utils";

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

describe('monthDayFromDayOfYear', () => {
    it('returns January 1 for day 1 of a non-leap year', () => {
        expect(monthDayFromDayOfYear(2023, 1)).toEqual({ month: 1, day: 1 });
    });

    it('returns January 31 for day 31 of a non-leap year', () => {
        expect(monthDayFromDayOfYear(2023, 31)).toEqual({ month: 1, day: 31 });
    });

    it('returns February 1 for day 32 of a non-leap year', () => {
        expect(monthDayFromDayOfYear(2023, 32)).toEqual({ month: 2, day: 1 });
    });

    it('returns February 28 for day 59 of a non-leap year', () => {
        expect(monthDayFromDayOfYear(2023, 59)).toEqual({ month: 2, day: 28 });
    });

    it('returns March 1 for day 60 of a non-leap year', () => {
        expect(monthDayFromDayOfYear(2023, 60)).toEqual({ month: 3, day: 1 });
    });

    it('returns February 29 for day 60 of a leap year', () => {
        expect(monthDayFromDayOfYear(2024, 60)).toEqual({ month: 2, day: 29 });
    });

    it('returns March 1 for day 61 of a leap year', () => {
        expect(monthDayFromDayOfYear(2024, 61)).toEqual({ month: 3, day: 1 });
    });

    it('returns December 31 for day 365 of a non-leap year', () => {
        expect(monthDayFromDayOfYear(2023, 365)).toEqual({ month: 12, day: 31 });
    });

    it('returns December 31 for day 366 of a leap year', () => {
        expect(monthDayFromDayOfYear(2024, 366)).toEqual({ month: 12, day: 31 });
    });
});