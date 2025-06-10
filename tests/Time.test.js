/* /test/Time.test.js */

import { Time } from '../src/Time.js';
import { InvalidTimeError, InvalidInputTypeError } from '../src/errors/errorHandler.js';

describe('Time Class', () => {

    describe('Constructor and Validation', () => {
        test('should create a valid Time object', () => {
            const time = new Time(3, 30, 'day');
            expect(time.hour).toBe(3);
            expect(time.minute).toBe(30);
            expect(time.period).toBe('day');
        });

        test('should default minute and period correctly', () => {
            const time = new Time(5);
            expect(time.minute).toBe(0);
            expect(time.period).toBe('day');
        });

        test('should throw InvalidTimeError for out-of-range values', () => {
            expect(() => new Time(0, 0, 'day')).toThrow(InvalidTimeError); // Hour 0 is invalid
            expect(() => new Time(13, 0, 'day')).toThrow(InvalidTimeError); // Hour 13 is invalid
            expect(() => new Time(5, -1, 'day')).toThrow(InvalidTimeError); // Negative minute
            expect(() => new Time(5, 60, 'day')).toThrow(InvalidTimeError); // Minute >= 60
            expect(() => new Time(5, 0, 'morning')).toThrow(InvalidTimeError); // Invalid period
        });

        test('should throw InvalidInputTypeError for non-numeric inputs', () => {
            expect(() => new Time('three', 30)).toThrow(InvalidInputTypeError);
            expect(() => new Time(3, 'thirty')).toThrow(InvalidInputTypeError);
        });
    });

    describe('Gregorian-Ethiopian Conversions', () => {
        test('fromGregorian: 7:30 (Morning) -> 1:30 Day', () => {
            const ethTime = Time.fromGregorian(7, 30);
            expect(ethTime).toEqual(new Time(1, 30, 'day'));
        });

        test('toGregorian: 1:30 Day -> 7:30', () => {
            const gregTime = new Time(1, 30, 'day').toGregorian();
            expect(gregTime).toEqual({ hour: 7, minute: 30 });
        });

        test('fromGregorian: 18:00 (Evening) -> 12:00 Night', () => {
            const ethTime = Time.fromGregorian(18, 0);
            expect(ethTime).toEqual(new Time(12, 0, 'night'));
        });

        test('toGregorian: 12:00 Night -> 18:00', () => {
            const gregTime = new Time(12, 0, 'night').toGregorian();
            expect(gregTime).toEqual({ hour: 18, minute: 0 });
        });

        test('fromGregorian: 0:00 (Midnight) -> 6:00 Night', () => {
            const ethTime = Time.fromGregorian(0, 0);
            expect(ethTime).toEqual(new Time(6, 0, 'night'));
        });

        test('toGregorian: 6:00 Night -> 0:00', () => {
            const gregTime = new Time(6, 0, 'night').toGregorian();
            expect(gregTime).toEqual({ hour: 0, minute: 0 });
        });

        test('fromGregorian: 6:00 (Morning) -> 12:00 Day', () => {
            const ethTime = Time.fromGregorian(6, 0);
            expect(ethTime).toEqual(new Time(12, 0, 'day'));
        });

        test('toGregorian: 12:00 Day -> 6:00', () => {
            const gregTime = new Time(12, 0, 'day').toGregorian();
            expect(gregTime).toEqual({ hour: 6, minute: 0 });
        });

        test('fromGregorian should throw for invalid Gregorian time', () => {
            expect(() => Time.fromGregorian(24, 0)).toThrow(InvalidTimeError);
            expect(() => Time.fromGregorian(-1, 0)).toThrow(InvalidTimeError);
        });
    });

    describe('Time Arithmetic', () => {
        const startTime = new Time(3, 15, 'day'); // 9:15 AM

        test('add: should add hours and minutes correctly within the same period', () => {
            const newTime = startTime.add({ hours: 2, minutes: 10 });
            expect(newTime).toEqual(new Time(5, 25, 'day')); // 11:25 AM
        });

        test('add: should handle rolling over to the next period (day to night)', () => {
            const newTime = startTime.add({ hours: 9 }); // 9:15 AM + 9 hours = 6:15 PM
            expect(newTime).toEqual(new Time(12, 15, 'night'));
        });

        test('subtract: should subtract time correctly', () => {
            const newTime = startTime.subtract({ hours: 1, minutes: 15 });
            expect(newTime).toEqual(new Time(2, 0, 'day')); // 8:00 AM
        });

        test('subtract: should handle rolling back to the previous period (day to night)', () => {
            const newTime = new Time(1, 0, 'day').subtract({ hours: 2 }); // 7:00 AM - 2 hours = 5:00 AM
            expect(newTime).toEqual(new Time(11, 0, 'night'));
        });

        test('diff: should calculate the difference between two times', () => {
            const endTime = new Time(5, 45, 'day');
            const difference = startTime.diff(endTime);
            expect(difference).toEqual({ hours: 2, minutes: 30 });
        });

        test('diff: should calculate the shortest difference across the 24h wrap', () => {
            const t1 = new Time(2, 0, 'night'); // 8 PM
            const t2 = new Time(10, 0, 'night'); // 4 AM
            const difference = t1.diff(t2);
            expect(difference).toEqual({ hours: 8, minutes: 0 }); // 8 hours difference
        });

        test('add/subtract should throw on invalid duration', () => {
            expect(() => startTime.add({ hours: 'two' })).toThrow(InvalidInputTypeError);
            expect(() => startTime.subtract('one hour')).toThrow(InvalidTimeError);
        });
    });

    describe('Formatting', () => {
        test('format: should format with default options (Geez)', () => {
            const time = new Time(5, 30, 'day');
            expect(time.format()).toBe('፭:፴ ጠዋት');
        });

        test('format: should format with Arabic numerals', () => {
            const time = new Time(5, 30, 'day');
            expect(time.format({ useGeez: false })).toBe('05:30 day');
        });

        test('format: should format without period label', () => {
            const time = new Time(8, 15, 'night');
            expect(time.format({ useGeez: false, showPeriodLabel: false })).toBe('08:15');
        });

        test('format: should use a dash for zero minutes', () => {
            const time = new Time(12, 0, 'day');
            expect(time.format({ useGeez: false, zeroAsDash: true })).toBe('12:_ day');
        });

        test('format: should format complex time correctly', () => {
            const time = new Time(12, 0, 'night');
            expect(time.format()).toBe('፲፪:_ ማታ');
        });
    });
});
