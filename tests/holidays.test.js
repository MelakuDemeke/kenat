import { getHolidaysInMonth } from '../src/holidays.js';
import { getMovableHoliday } from '../src/bahireHasab.js';
import { InvalidInputTypeError } from '../src/errors/errorHandler.js';

describe('Holiday Calculation', () => {

    describe('getHolidaysInMonth', () => {
        test('should return fixed and movable holidays for a given month', () => {
            // Meskerem 2016 has Enkutatash (day 1) and Meskel (day 17)
            const holidays = getHolidaysInMonth(2016, 1);
            const holidayKeys = holidays.map(h => h.key);
            
            expect(holidayKeys).toContain('enkutatash');
            expect(holidayKeys).toContain('meskel');
        });

        test('should correctly calculate and include movable Christian holidays', () => {
            // In 2016 E.C., Fasika is on Miazia 27 and Siklet is on Miazia 25
            const holidays = getHolidaysInMonth(2016, 8);
            const fasika = holidays.find(h => h.key === 'fasika');
            const siklet = holidays.find(h => h.key === 'siklet');

            expect(fasika).toBeDefined();
            expect(fasika.ethiopian.day).toBe(27);
            
            expect(siklet).toBeDefined();
            expect(siklet.ethiopian.day).toBe(25);
        });
    });

    describe('getMovableHoliday (Bahire Hasab)', () => {
        test('should return correct Fasika (Tinsaye) date for Ethiopian years 2012 to 2016', () => {
            expect(getMovableHoliday('TINSAYE', 2012)).toEqual({ year: 2012, month: 8, day: 11 });
            expect(getMovableHoliday('TINSAYE', 2013)).toEqual({ year: 2013, month: 8, day: 24 });
            expect(getMovableHoliday('TINSAYE', 2014)).toEqual({ year: 2014, month: 8, day: 16 });
            expect(getMovableHoliday('TINSAYE', 2015)).toEqual({ year: 2015, month: 8, day: 8 });
            expect(getMovableHoliday('TINSAYE', 2016)).toEqual({ year: 2016, month: 8, day: 27 });
        });

        test('should return correct Siklet (Good Friday) date for Ethiopian years 2012 to 2016', () => {
            expect(getMovableHoliday('SIKLET', 2012)).toEqual({ year: 2012, month: 8, day: 9 });
            expect(getMovableHoliday('SIKLET', 2013)).toEqual({ year: 2013, month: 8, day: 22 });
            expect(getMovableHoliday('SIKLET', 2014)).toEqual({ year: 2014, month: 8, day: 14 });
            expect(getMovableHoliday('SIKLET', 2015)).toEqual({ year: 2015, month: 8, day: 6 });
            expect(getMovableHoliday('SIKLET', 2016)).toEqual({ year: 2016, month: 8, day: 25 });
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

        test('getMovableHoliday should throw for invalid input type', () => {
            expect(() => getMovableHoliday('TINSAYE', null)).toThrow(InvalidInputTypeError);
            expect(() => getMovableHoliday('TINSAYE', '2016')).toThrow(InvalidInputTypeError);
        });

        test('getMovableHoliday should throw for unknown holiday key', () => {
            expect(() => getMovableHoliday('UNKNOWN_HOLIDAY', 2016)).toThrow('Unknown movable holiday key: UNKNOWN_HOLIDAY');
        });
    });

});
