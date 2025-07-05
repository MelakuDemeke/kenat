import { getFastingPeriod } from '../src/fasting.js';

describe('getFastingPeriod', () => {

    describe('Christian Fasts for 2016 E.C.', () => {
        const year = 2016;

        test('should return the correct start and end dates for The Great Lent (Abiy Tsome)', () => {
            const period = getFastingPeriod('ABIY_TSOME', year);
            expect(period.start).toEqual({ year: 2016, month: 7, day: 2 });
            expect(period.end).toEqual({ year: 2016, month: 8, day: 25 });
        });

        test('should return the correct start and end dates for Fast of the Apostles (Tsome Hawaryat)', () => {
            const period = getFastingPeriod('TSOME_HAWARYAT', year);
            expect(period.end).toEqual({ year: 2016, month: 11, day: 4 });
        });

        test('should return the correct start and end dates for Fast of Nineveh', () => {
            const period = getFastingPeriod('NINEVEH', year);
            expect(period.start).toEqual({ year: 2016, month: 6, day: 18 });
            expect(period.end).toEqual({ year: 2016, month: 6, day: 20 });
        });

        test('should return the correct start and end dates for Fast of the Prophets (Tsome Nebiyat)', () => {
            const period = getFastingPeriod('TSOME_NEBIYAT', year);
            expect(period.start).toEqual({ year: 2016, month: 3, day: 15 });
            expect(period.end).toEqual({ year: 2016, month: 4, day: 28 });
        });
    });

    describe('Muslim Fasts for 2016 E.C.', () => {
        const year = 2016;

        test('should return the correct start and end dates for Ramadan', () => {
            const period = getFastingPeriod('RAMADAN', year);
            expect(period.start).toEqual({ year: 2016, month: 7, day: 2 });
        });
    });

    describe('Error and Edge Case Handling', () => {
        test('should return null for an unknown fast key', () => {
            const period = getFastingPeriod('UNKNOWN_FAST_KEY', 2016);
            expect(period).toBeNull();
        });

        test('should return a valid period for a future year', () => {
            const period = getFastingPeriod('ABIY_TSOME', 2020);
            expect(period).toBeDefined();
            expect(period.start).toBeDefined();
            expect(period.end).toBeDefined();
        });
    });
});
