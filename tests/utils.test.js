import { dayOfYear } from "../src/utils";
import {
    monthDayFromDayOfYear,
    isEthiopianLeapYear,
    isGregorianLeapYear,
    getEthiopianDaysInMonth
} from "../src/utils";


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

describe('isGregorianLeapYear', () => {

    it('returns true for years divisible by 4 but not by 100', () => {
        expect(isGregorianLeapYear(2024)).toBe(true);
        expect(isGregorianLeapYear(1996)).toBe(true);
        expect(isGregorianLeapYear(2008)).toBe(true);
    });

    it('returns false for years not divisible by 4', () => {
        expect(isGregorianLeapYear(2023)).toBe(false);
        expect(isGregorianLeapYear(2019)).toBe(false);
        expect(isGregorianLeapYear(2101)).toBe(false);
    });

    it('returns false for years divisible by 100 but not by 400', () => {
        expect(isGregorianLeapYear(1900)).toBe(false);
        expect(isGregorianLeapYear(2100)).toBe(false);
        expect(isGregorianLeapYear(1800)).toBe(false);
    });

    it('returns true for years divisible by 400', () => {
        expect(isGregorianLeapYear(2000)).toBe(true);
        expect(isGregorianLeapYear(1600)).toBe(true);
        expect(isGregorianLeapYear(2400)).toBe(true);
    });
});

describe('isEthiopianLeapYear', () => {
    it('returns true for Ethiopian years where year % 4 === 3', () => {
        expect(isEthiopianLeapYear(2011)).toBe(true);
        expect(isEthiopianLeapYear(2015)).toBe(true);
        expect(isEthiopianLeapYear(2019)).toBe(true);
        expect(isEthiopianLeapYear(2003)).toBe(true);
    });

    it('returns false for Ethiopian years where year % 4 !== 3', () => {
        expect(isEthiopianLeapYear(2010)).toBe(false);
        expect(isEthiopianLeapYear(2012)).toBe(false);
        expect(isEthiopianLeapYear(2013)).toBe(false);
        expect(isEthiopianLeapYear(2014)).toBe(false);
        expect(isEthiopianLeapYear(2020)).toBe(false);
    });
});

describe('getEthiopianDaysInMonth', () => {
    it('returns 30 for any month from 1 to 12', () => {
        for (let month = 1; month <= 12; month++) {
            expect(getEthiopianDaysInMonth(2010, month)).toBe(30);
            expect(getEthiopianDaysInMonth(2011, month)).toBe(30);
            expect(getEthiopianDaysInMonth(2012, month)).toBe(30);
            expect(getEthiopianDaysInMonth(2013, month)).toBe(30);
        }
    });

    it('returns 6 for month 13 in a leap year', () => {
        // 2011, 2015, 2019 are leap years (year % 4 === 3)
        expect(getEthiopianDaysInMonth(2011, 13)).toBe(6);
        expect(getEthiopianDaysInMonth(2015, 13)).toBe(6);
        expect(getEthiopianDaysInMonth(2019, 13)).toBe(6);
    });

    it('returns 5 for month 13 in a non-leap year', () => {
        // 2010, 2012, 2013, 2014, 2020 are not leap years
        expect(getEthiopianDaysInMonth(2010, 13)).toBe(5);
        expect(getEthiopianDaysInMonth(2012, 13)).toBe(5);
        expect(getEthiopianDaysInMonth(2013, 13)).toBe(5);
        expect(getEthiopianDaysInMonth(2014, 13)).toBe(5);
        expect(getEthiopianDaysInMonth(2020, 13)).toBe(5);
    });
});



