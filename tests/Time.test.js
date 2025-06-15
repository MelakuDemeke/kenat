/* /test/Time.test.js */

import { Kenat } from '../src/Kenat.js';
import { Time } from '../src/Time.js';
import {
  InvalidTimeError,
  InvalidInputTypeError,
} from '../src/errors/errorHandler.js';

describe('Time Class and Related Logic', () => {
  //----------------------------------------------------------------
  // 1. Tests for the Time Class Constructor
  //----------------------------------------------------------------
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

  //----------------------------------------------------------------
  // 2. Tests for Time.fromString() - Addressing the PR Comment
  //----------------------------------------------------------------
  describe('Time.fromString()', () => {
    test('should parse valid strings with Arabic numerals', () => {
      expect(Time.fromString('10:30 day')).toEqual(new Time(10, 30, 'day'));
      expect(Time.fromString('5:00 night')).toEqual(new Time(5, 0, 'night'));
    });

    test('should parse valid strings with Geez numerals', () => {
      expect(Time.fromString('፫:፲፭ ማታ')).toEqual(new Time(3, 15, 'night'));
      expect(Time.fromString('፲፪:፴ day')).toEqual(new Time(12, 30, 'day'));
    });

    test('should default to "day" period when missing', () => {
      expect(Time.fromString('11:45')).toEqual(new Time(11, 45, 'day'));
    });

    test('should handle inconsistent spacing', () => {
      expect(Time.fromString(' 4 : 20  night ')).toEqual(new Time(4, 20, 'night'));
    });

    test('should throw InvalidTimeError for malformed strings', () => {
      // NOTE: We test for the general InvalidTimeError, as InvalidTimeFormatError has been removed.
      expect(() => Time.fromString('10')).toThrow(InvalidTimeError);
      expect(() => Time.fromString('10:')).toThrow(InvalidTimeError);
      expect(() => Time.fromString(':30')).toThrow(InvalidTimeError);
      expect(() => Time.fromString('10 30 day')).toThrow(InvalidTimeError); // No colon
      expect(() => Time.fromString('abc:def period')).toThrow(InvalidTimeError); // Throws from constructor
    });

    test('should throw InvalidTimeError for empty or whitespace strings', () => {
      // NOTE: We test for the general InvalidTimeError, as InvalidTimeFormatError has been removed.
      expect(() => Time.fromString('')).toThrow(InvalidTimeError);
      expect(() => Time.fromString('   ')).toThrow(InvalidTimeError);
    });

    test('should throw InvalidTimeError for valid format but out-of-range values', () => {
      expect(() => Time.fromString('13:00 day')).toThrow(InvalidTimeError);
      expect(() => Time.fromString('5:60 night')).toThrow(InvalidTimeError);
    });
  });

  //----------------------------------------------------------------
  // 3. Tests for Gregorian/Ethiopian Conversions
  //----------------------------------------------------------------
  describe('Gregorian-Ethiopian Conversions', () => {
    test.each([
      [7, 30, new Time(1, 30, 'day')],
      [18, 0, new Time(12, 0, 'night')],
      [0, 0, new Time(6, 0, 'night')],
      [6, 0, new Time(12, 0, 'day')],
    ])('fromGregorian: should convert %i:%i correctly', (gHour, gMinute, expected) => {
      expect(Time.fromGregorian(gHour, gMinute)).toEqual(expected);
    });

    test.each([
      [new Time(1, 30, 'day'), { hour: 7, minute: 30 }],
      [new Time(12, 0, 'night'), { hour: 18, minute: 0 }],
      [new Time(6, 0, 'night'), { hour: 0, minute: 0 }],
      [new Time(12, 0, 'day'), { hour: 6, minute: 0 }],
    ])('toGregorian: should convert %s correctly', (ethTime, expected) => {
      expect(ethTime.toGregorian()).toEqual(expected);
    });

    test('fromGregorian should throw for invalid Gregorian time', () => {
      expect(() => Time.fromGregorian(24, 0)).toThrow(InvalidTimeError);
      expect(() => Time.fromGregorian(-1, 0)).toThrow(InvalidTimeError);
    });
  });

  //----------------------------------------------------------------
  // 4. Tests for Time Arithmetic
  //----------------------------------------------------------------
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

  //----------------------------------------------------------------
  // 5. Tests for Formatting
  //----------------------------------------------------------------
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
  });

  //----------------------------------------------------------------
  // 6. Tests for Kenat Class Time-Related Methods
  //----------------------------------------------------------------
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
});
