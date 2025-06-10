import { toEC, toGC } from "../src/conversions";
import { InvalidGregorianDateError } from "../src/errors/errorHandler.js";

describe('Ethiopian to Gregorian conversion', () => {

    test('Ethiopian to Gregorian: 2017-9-14 -> May 22, 2025', () => {
        const result = toGC(2017, 9, 14);
        expect(result).toEqual({ year: 2025, month: 5, day: 22 });
    });

    test('Ethiopian to Gregorian: Pagumē 5, 2016 (2016-13-5) -> September 10, 2024', () => {
        const result = toGC(2016, 13, 5);
        expect(result).toEqual({ year: 2024, month: 9, day: 10 });
    });

    test('Ethiopian to Gregorian Leap Year: 2011-13-6 (Pagumē 6, 2011) -> September 11, 2019', () => {
        const result = toGC(2011, 13, 6);
        expect(result).toEqual({ year: 2019, month: 9, day: 11 });
    });

    test('Ethiopian to Gregorian Leap Year: Pagumē 6, 2019 (2019-13-6) -> September 11, 2027', () => {
        const result = toGC(2019, 13, 6);
        expect(result).toEqual({ year: 2027, month: 9, day: 11 });
    });

    test('Ethiopian to Gregorian Leap Year: May 5, 2024 -> Miazia 27, 2016', () => {
        const result = toGC(2016, 8, 27);
        expect(result).toEqual({ year: 2024, month: 5, day: 5 });
    });

        test('Ethiopian to Gregorian: Meskerem 1, 2016 (2016-1-1) -> September 11, 2023', () => {
        const result = toGC(2016, 1, 1);
        expect(result).toEqual({ year: 2023, month: 9, day: 12 });
    });

    test('Ethiopian to Gregorian: Tahsas 30, 2015 (2015-4-30) -> January 8, 2023', () => {
        const result = toGC(2015, 4, 30);
        expect(result).toEqual({ year: 2023, month: 1, day: 8 });
    });

    test('Ethiopian to Gregorian: Pagume 1, 2011 (2011-13-1) -> September 6, 2019', () => {
        const result = toGC(2011, 13, 1);
        expect(result).toEqual({ year: 2019, month: 9, day: 6 });
    });

    test('Ethiopian to Gregorian: Meskerem 1, 1964 (1964-1-1) -> September 12, 1971', () => {
        const result = toGC(1964, 1, 1);
        expect(result).toEqual({ year: 1971, month: 9, day: 12 });
    });

    test('Ethiopian to Gregorian: Pagume 6, 2007 (leap Pagume) -> September 11, 2015', () => {
        const result = toGC(2007, 13, 6);
        expect(result).toEqual({ year: 2015, month: 9, day: 11 });
    });

    test('Ethiopian to Gregorian: Pagume 5, 2006 (non-leap Pagume) -> September 10, 2014', () => {
        const result = toGC(2006, 13, 5);
        expect(result).toEqual({ year: 2014, month: 9, day: 10 });
    });

    test('Ethiopian to Gregorian: End of Ethiopian year (Pagume 5, 2015) -> September 10, 2023', () => {
        const result = toGC(2015, 13, 5);
        expect(result).toEqual({ year: 2023, month: 9, day: 10 });
    });

    test('Ethiopian to Gregorian: Start of Ethiopian year (Meskerem 1, 2015) -> September 11, 2022', () => {
        const result = toGC(2015, 1, 1);
        expect(result).toEqual({ year: 2022, month: 9, day: 11 });
    });
});

describe('Gregorian to Ethiopian conversion', () => {
    test('Gregorian to Ethiopian: May 22, 2025 -> 2017-9-14', () => {
        const result = toEC(2025, 5, 22);
        expect(result).toEqual({ year: 2017, month: 9, day: 14 });
    });

    test('Gregorian to Ethiopian Leap Year: February 29, 2020 -> Yekatit 22, 2012', () => {
        const result = toEC(2020, 2, 29);
        expect(result).toEqual({ year: 2012, month: 6, day: 21 });
    });

    test('Gregorian to Ethiopian Leap Year: May 5, 2024 -> Miazia 27, 2016', () => {
        const result = toEC(2024, 5, 5);
        expect(result).toEqual({ year: 2016, month: 8, day: 27 });
    });

    test('Gregorian to Ethiopian: September 10, 2024 -> 2016-13-5 (Pagumē 5, 2016)', () => {
        const result = toEC(2024, 9, 10);
        expect(result).toEqual({ year: 2016, month: 13, day: 5 });
    });

    test('Gregorian to Ethiopian Leap Year: September 11, 2019 -> 2011-13-6 (Pagumē 6, 2011)', () => {
        const result = toEC(2019, 9, 11);
        expect(result).toEqual({ year: 2011, month: 13, day: 6 });
    });

    test('Gregorian to Ethiopian Leap Year: September 11, 2027 -> 2019-13-6 (Pagumē 6, 2019)', () => {
        const result = toEC(2027, 9, 11);
        expect(result).toEqual({ year: 2019, month: 13, day: 6 });
    });

    test('Gregorian to Ethiopian: January 1, 2000 -> 1992-4-23', () => {
        const result = toEC(2000, 1, 1);
        expect(result).toEqual({ year: 1992, month: 4, day: 22 });
    });

    test('Gregorian to Ethiopian: Out of range year throws error', () => {
        expect(() => toEC(1800, 1, 1)).toThrow(InvalidGregorianDateError);
        expect(() => toEC(2200, 1, 1)).toThrow(InvalidGregorianDateError);
    });

    test('Gregorian to Ethiopian: September 12, 1971 (base date) -> 1964-1-1', () => {
        const result = toEC(1971, 9, 12);
        expect(result).toEqual({ year: 1964, month: 1, day: 1 });
    });

    test('Gregorian to Ethiopian: December 31, 2100 (upper bound) -> valid Ethiopian date', () => {
        const result = toEC(2100, 12, 31);
        expect(result.year).toBeGreaterThanOrEqual(2092);
        expect(result.month).toBeGreaterThanOrEqual(4);
        expect(result.day).toBeGreaterThanOrEqual(20);
    });

    test('Gregorian to Ethiopian: January 1, 1900 (lower bound) -> valid Ethiopian date', () => {
        const result = toEC(1900, 1, 1);
        expect(result.year).toBeLessThanOrEqual(1892);
        expect(result.month).toBeGreaterThanOrEqual(4);
        expect(result.day).toBeGreaterThanOrEqual(22);
    });

    test('Gregorian to Ethiopian: End of Gregorian leap year (December 31, 2020)', () => {
        const result = toEC(2020, 12, 31);
        expect(result).toEqual({ year: 2013, month: 4, day: 22 });
    });

    test('Gregorian to Ethiopian: Start of Gregorian leap year (January 1, 2020)', () => {
        const result = toEC(2020, 1, 1);
        expect(result).toEqual({ year: 2012, month: 4, day: 22 });
    });

    test('Gregorian to Ethiopian: Last day of Ethiopian year (September 10, 2023)', () => {
        const result = toEC(2023, 9, 10);
        expect(result).toEqual({ year: 2015, month: 13, day: 5 });
    });

    test('Gregorian to Ethiopian: Leap Pagume (September 11, 2015)', () => {
        const result = toEC(2023, 9, 11);
        expect(result).toEqual({ year: 2015, month: 13, day: 6 });
    });
});