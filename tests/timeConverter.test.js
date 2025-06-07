import { toEthiopianTime, toGregorianTime } from '../src/ethiopianTime.js';
import { Kenat } from '../src/Kenat.js';

describe('Time Conversion Tests', () => {
    test.each([
        [0, 0, { hour: 6, minute: 0, period: 'night' }],
        [6, 0, { hour: 12, minute: 0, period: 'day' }],
        [7, 15, { hour: 1, minute: 15, period: 'day' }],
        [13, 30, { hour: 7, minute: 30, period: 'day' }],
        [18, 45, { hour: 12, minute: 45, period: 'night' }],
        [20, 5, { hour: 2, minute: 5, period: 'night' }],
    ])('toEthiopianTime(%i, %i)', (gHour, gMinute, expected) => {
        expect(toEthiopianTime(gHour, gMinute)).toEqual(expected);
    });

    test.each([
        [1, 15, 'day', { hour: 7, minute: 15 }],
        [12, 0, 'day', { hour: 6, minute: 0 }],
        [6, 0, 'night', { hour: 0, minute: 0 }],
        [3, 30, 'night', { hour: 21, minute: 30 }],
    ])('toGregorianTime(%i, %i, %s)', (eHour, minute, period, expected) => {
        expect(toGregorianTime(eHour, minute, period)).toEqual(expected);
    });

    test('throws on invalid Ethiopian hour', () => {
        expect(() => toGregorianTime(0, 0, 'day')).toThrow();
        expect(() => toGregorianTime(13, 0, 'night')).toThrow();
    });
});

describe('Kenat Time Methods', () => {
    test('getCurrentTime returns valid Ethiopian time object', () => {
        const now = new Kenat();
        const ethTime = now.getCurrentTime();
        expect(ethTime).toHaveProperty('hour');
        expect(ethTime).toHaveProperty('minute');
        expect(ethTime).toHaveProperty('period');
        expect(typeof ethTime.hour).toBe('number');
        expect(typeof ethTime.minute).toBe('number');
        expect(['day', 'night']).toContain(ethTime.period);
    });

    test('formatEthiopianTime formats in Amharic', () => {
        const time = { hour: 2, minute: 5, period: 'day' };
        const formatted = Kenat.formatEthiopianTime(time, 'amharic');
        expect(formatted).toBe('02:05 ጠዋት');
    });

    test('formatEthiopianTime formats in English', () => {
        const time = { hour: 10, minute: 45, period: 'night' };
        const formatted = Kenat.formatEthiopianTime(time, 'english');
        expect(formatted).toBe('10:45 night');
    });
});

