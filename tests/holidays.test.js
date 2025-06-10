/* /test/holidays.test.js */

import { getHolidaysInMonth, getFasikaDate, getSikletDate } from '../src/holidays.js';
import { InvalidInputTypeError } from '../src/errors/errorHandler.js';

describe('Holiday Calculation', () => {

    describe('getHolidaysInMonth', () => {
        test('should return fixed holidays for a given month', () => {
            // Meskerem 2016 has Enkutatash (day 1) and Meskel (day 17)
            const holidays = getHolidaysInMonth(2016, 1);
            expect(holidays).toHaveLength(3);
            expect(holidays[0].key).toBe('enkutatash');
            expect(holidays[1].key).toBe('moulid');
        });

        test('should return an empty array for a month with no holidays', () => {
            // Sene 2016 has no major fixed or movable holidays
            const holidays = getHolidaysInMonth(2016, 10);
            expect(holidays).toHaveLength(1);
        });

        test('should correctly calculate and include movable Christian holidays', () => {
            // Fasika in 2016 E.C. is on Miazia 27
            const holidays = getHolidaysInMonth(2016, 8);
            const fasika = holidays.find(h => h.key === 'fasika');
            const siklet = holidays.find(h => h.key === 'siklet');

            expect(fasika).toBeDefined();
            expect(fasika.ethiopian.day).toBe(27);
            
            expect(siklet).toBeDefined();
            expect(siklet.ethiopian.day).toBe(25);
        });
        
    });

    describe('getFasikaDate', () => {
        test('should calculate the correct date for Fasika (Easter)', () => {
            // For 2016 E.C., Fasika is May 5, 2024 G.C. / Miazia 27, 2016 E.C.
            const fasika = getFasikaDate(2016);
            expect(fasika.gregorian).toEqual({ year: 2024, month: 5, day: 5 });
            expect(fasika.ethiopian).toEqual({ year: 2016, month: 8, day: 27 });
        });
        
        test('should return correct Fasika date for Ethiopian years 2012 to 2016', () => {
            expect(getFasikaDate(2012).ethiopian).toEqual({ year: 2012, month: 8, day: 11 });
            expect(getFasikaDate(2013).ethiopian).toEqual({ year: 2013, month: 8, day: 24 });
            expect(getFasikaDate(2014).ethiopian).toEqual({ year: 2014, month: 8, day: 16 });
            expect(getFasikaDate(2015).ethiopian).toEqual({ year: 2015, month: 8, day: 8 });
            expect(getFasikaDate(2016).ethiopian).toEqual({ year: 2016, month: 8, day: 27 });
        });
    });

    describe('getSikletDate', () => {
        test('should return correct Siklet (Good Friday) date for Ethiopian years 2012 to 2016', () => {
            expect(getSikletDate(2012).ethiopian).toEqual({ year: 2012, month: 8, day: 9 });
            expect(getSikletDate(2013).ethiopian).toEqual({ year: 2013, month: 8, day: 22 });
            expect(getSikletDate(2014).ethiopian).toEqual({ year: 2014, month: 8, day: 14 });
            expect(getSikletDate(2015).ethiopian).toEqual({ year: 2015, month: 8, day: 6 });
            expect(getSikletDate(2016).ethiopian).toEqual({ year: 2016, month: 8, day: 25 });
        });
    });

    describe('Error Handling', () => {
        test('getHolidaysInMonth should throw for invalid input types', () => {
            expect(() => getHolidaysInMonth('2016', 1)).toThrow(InvalidInputTypeError);
            expect(() => getHolidaysInMonth(2016, 'one')).toThrow(InvalidInputTypeError);
        });
        
        test('getHolidaysInMonth should throw for out-of-range month', () => {
            expect(() => getHolidaysInMonth(2016, 0)).toThrow(InvalidInputTypeError);
            expect(() => getHolidaysInMonth(2016, 14)).toThrow(InvalidInputTypeError);
        });

        test('getFasikaDate should throw for invalid input type', () => {
            expect(() => getFasikaDate(null)).toThrow(InvalidInputTypeError);
            expect(() => getFasikaDate('2016')).toThrow(InvalidInputTypeError);
        });
    });

});
