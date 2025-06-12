import { getBahireHasab, getMovableHoliday } from '../src/bahireHasab.js';
import { InvalidInputTypeError } from '../src/errors/errorHandler.js';

describe('Bahire Hasab Calculation', () => {

    describe('getBahireHasab for 2016 E.C.', () => {
        const bahireHasab2016 = getBahireHasab(2016);

        test('should calculate Amete Alem and Metene Rabiet correctly', () => {
            expect(bahireHasab2016.ameteAlem).toBe(7516);
            expect(bahireHasab2016.meteneRabiet).toBe(1879);
        });

        test('should identify the correct Evangelist', () => {
            expect(bahireHasab2016.evangelist.name).toBe('ዮሐንስ'); // John in Amharic (default)
            expect(bahireHasab2016.evangelist.remainder).toBe(0);
        });

        test('should determine the correct New Year day', () => {
            expect(bahireHasab2016.newYear.dayName).toBe('ማክሰኞ'); // Tuesday in Amharic (default)
        });

        test('should calculate Medeb, Wenber, Abektie, and Metqi correctly', () => {
            expect(bahireHasab2016.medeb).toBe(11);
            expect(bahireHasab2016.wenber).toBe(10);
            expect(bahireHasab2016.abektie).toBe(20);
            expect(bahireHasab2016.metqi).toBe(10);
        });

        test('should calculate the correct date for Nineveh', () => {
            expect(bahireHasab2016.nineveh).toEqual({ year: 2016, month: 6, day: 18 });
        });
    });

    describe('Internationalization (i18n)', () => {
        test('should return names in English when specified', () => {
            const bahireHasabEnglish = getBahireHasab(2016, { lang: 'english' });
            expect(bahireHasabEnglish.evangelist.name).toBe('John');
            expect(bahireHasabEnglish.newYear.dayName).toBe('Tuesday');
        });
    });

    describe('Movable Feasts Calculation', () => {
        const { movableFeasts } = getBahireHasab(2016, { lang: 'english' });

        test('should return a complete movableFeasts object', () => {
            expect(movableFeasts).toBeDefined();
            expect(Object.keys(movableFeasts).length).toBeGreaterThan(5);
        });

        test('should correctly calculate the date for Fasika (Tinsaye)', () => {
            const fasika = movableFeasts.fasika;
            expect(fasika).toBeDefined();
            expect(fasika.ethiopian).toEqual({ year: 2016, month: 8, day: 27 });
            expect(fasika.name).toBe('Ethiopian Easter');
            expect(fasika.tags).toContain('public');
        });

        test('should correctly calculate the date for Abiy Tsome', () => {
            const abiyTsome = movableFeasts.abiyTsome;
            expect(abiyTsome).toBeDefined();
            expect(abiyTsome.ethiopian).toEqual({ year: 2016, month: 7, day: 2 });
            expect(abiyTsome.name).toBe('Great Lent');
        });
    });

    describe('Error Handling', () => {
        test('should throw InvalidInputTypeError for non-numeric input', () => {
            expect(() => getBahireHasab('2016')).toThrow(InvalidInputTypeError);
            expect(() => getMovableHoliday('TINSAYE', '2016')).toThrow(InvalidInputTypeError);
        });
    });
});
