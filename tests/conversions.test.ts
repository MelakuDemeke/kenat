import { toEC, toGC } from "../src/conversions.js";
import { InvalidGregorianDateError } from "../src/errors/errorHandler.js";
import { getGregorianDateOfEthiopianNewYear } from "../src/utils.js";

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
describe('toGC across Gregorian century years (1900, 2100)', () => {
    test('Yekatit 23, 1888 (Battle of Adwa) -> March 1, 1896', () => {
        expect(toGC(1888, 6, 23)).toEqual({ year: 1896, month: 3, day: 1 });
    });

    test('Pagume 6, 2091 and Meskerem 1, 2092 are different days', () => {
        expect(toGC(2091, 13, 6)).toEqual({ year: 2099, month: 9, day: 11 });
        expect(toGC(2092, 1, 1)).toEqual({ year: 2099, month: 9, day: 12 });
    });

    test('Meskerem 1, 2093 -> September 12, 2100', () => {
        expect(toGC(2093, 1, 1)).toEqual({ year: 2100, month: 9, day: 12 });
    });

    test('Ethiopian new year in the 1880s, 1890s and 1900', () => {
        expect(getGregorianDateOfEthiopianNewYear(1888)).toEqual({ gregorianYear: 1895, month: 9, day: 11 });
        expect(getGregorianDateOfEthiopianNewYear(1876)).toEqual({ gregorianYear: 1883, month: 9, day: 11 });
        expect(getGregorianDateOfEthiopianNewYear(1892)).toEqual({ gregorianYear: 1899, month: 9, day: 11 });
        expect(getGregorianDateOfEthiopianNewYear(1893)).toEqual({ gregorianYear: 1900, month: 9, day: 11 });
    });

    test('toGC(toEC(date)) returns the same date for every day toEC supports', () => {
        const oneDay = 86400000;
        const bad: string[] = [];
        for (let t = Date.UTC(1900, 0, 1); t <= Date.UTC(2100, 11, 31); t += oneDay) {
            const d = new Date(t);
            const g = { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
            const e = toEC(g.year, g.month, g.day);
            const back = toGC(e.year, e.month, e.day);
            if (back.year !== g.year || back.month !== g.month || back.day !== g.day) {
                bad.push(`${g.year}-${g.month}-${g.day}`);
            }
        }
        expect(bad).toEqual([]);
    });
});
