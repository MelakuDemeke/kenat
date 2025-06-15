import { Time } from '../src/Time.js';
import { Kenat } from '../src/Kenat.js';

describe('Time Class Functionality', () => {

    // Test for the static method Time.fromGregorian()
    describe('Time.fromGregorian()', () => {
        test.each([
            [0, 0, { hour: 6, minute: 0, period: 'night' }],
            [6, 0, { hour: 12, minute: 0, period: 'day' }],
            [7, 15, { hour: 1, minute: 15, period: 'day' }],
            [13, 30, { hour: 7, minute: 30, period: 'day' }],
            [18, 45, { hour: 12, minute: 45, period: 'night' }],
            [20, 5, { hour: 2, minute: 5, period: 'night' }],
        ])('should convert Gregorian time (%i, %i) to Ethiopian time', (gHour, gMinute, expected) => {
            // FIXED: Test Time.fromGregorian instead of the deleted toEthiopianTime
            expect(Time.fromGregorian(gHour, gMinute)).toEqual(expected);
        });
    });

    // Test for the instance method time.toGregorian()
    describe('time.toGregorian()', () => {
        test.each([
            [1, 15, 'day', { hour: 7, minute: 15 }],
            [12, 0, 'day', { hour: 6, minute: 0 }],
            [6, 0, 'night', { hour: 0, minute: 0 }],
            [3, 30, 'night', { hour: 21, minute: 30 }],
        ])('should convert Ethiopian time (%i, %i, %s) to Gregorian time', (eHour, minute, period, expected) => {
            // FIXED: Create a Time instance and call the .toGregorian() method
            const ethiopianTime = new Time(eHour, minute, period);
            expect(ethiopianTime.toGregorian()).toEqual(expected);
        });
    });
    
    // Test for the instance method time.format()
    describe('time.format()', () => {
        test('formats in Amharic correctly', () => {
            // FIXED: Create a Time instance and call the .format() method
            const time = new Time(2, 5, 'day');
            const formatted = time.format({ lang: 'amharic', useGeez: false, zeroAsDash: false });
            expect(formatted).toBe('02:05 ጠዋት');
        });

        test('formats in English correctly', () => {
            // FIXED: Create a Time instance and call the .format() method
            const time = new Time(10, 45, 'night');
            const formatted = time.format({ lang: 'english', useGeez: false, zeroAsDash: false });
            expect(formatted).toBe('10:45 night');
        });
    });

    // Test for constructor validation
    describe('Time constructor validation', () => {
        test('throws on invalid Ethiopian hour', () => {
            // FIXED: Test the Time constructor for validation
            expect(() => new Time(0, 0, 'day')).toThrow();
            expect(() => new Time(13, 0, 'night')).toThrow();
        });
    });
});

describe('Kenat Time Methods', () => {
    test('getCurrentTime returns a valid Time instance', () => {
        const now = new Kenat();
        const ethTime = now.getCurrentTime();

        expect(ethTime).toBeInstanceOf(Time);

        expect(ethTime).toHaveProperty('hour');
        expect(ethTime).toHaveProperty('minute');
        expect(ethTime).toHaveProperty('period');
    });

});