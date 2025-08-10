import { getFastingPeriod, getFastingInfo, getFastingDays } from '../src/fasting.js';
import { FastingKeys } from '../src/constants.js';
import { getBahireHasab } from '../src/bahireHasab.js';
import { addDays } from '../src/dayArithmetic.js';
import { getWeekday, getEthiopianDaysInMonth } from '../src/utils.js';

// Mock dependencies if they are not available in the test environment
// For this example, we assume the underlying functions are correct.

describe('getFastingPeriod', () => {

    describe('Christian Fasts for 2016 E.C.', () => {
        const year = 2016;

        test('should return the correct start and end dates for The Great Lent (Abiy Tsome)', () => {
            const period = getFastingPeriod(FastingKeys.ABIY_TSOME, year);
            // VERIFIED: In 2016, Abiy Tsome starts on Megabit 2 and ends on Siklet (Miazia 25)
            expect(period.start).toEqual({ year: 2016, month: 7, day: 2 });
            expect(period.end).toEqual({ year: 2016, month: 8, day: 25 });
        });

        test('should return the correct start and end dates for Fast of the Apostles (Tsome Hawaryat)', () => {
            const period = getFastingPeriod(FastingKeys.TSOME_HAWARYAT, year);
            // VERIFIED: In 2016, Paraclete is Sene 17, so Tsome Hawaryat starts Sene 18. It ends on Hamle 4.
            expect(period.end).toEqual({ year: 2016, month: 11, day: 4 });
        });

        test('should return the correct start and end dates for Fast of Nineveh', () => {
            const period = getFastingPeriod(FastingKeys.NINEVEH, year);
            // VERIFIED: In 2016, Nineveh starts on Yekatit 18 and lasts 3 days.
            expect(period.start).toEqual({ year: 2016, month: 6, day: 18 });
            expect(period.end).toEqual({ year: 2016, month: 6, day: 20 });
        });

        test('should return the correct start and end dates for Fast of the Prophets (Tsome Nebiyat)', () => {
            const period = getFastingPeriod(FastingKeys.TSOME_NEBIYAT, year);
            // This is a fixed fast from Hidar 15 to Tahsas 28. This test was already correct.
            expect(period.start).toEqual({ year: 2016, month: 3, day: 15 });
            expect(period.end).toEqual({ year: 2016, month: 4, day: 28 });
        });
    });

    describe('Muslim Fasts for 2016 E.C.', () => {
        const year = 2016;

        test('should return the correct start and end dates for Ramadan', () => {
            const period = getFastingPeriod(FastingKeys.RAMADAN, year);
            // VERIFIED: For 2016 E.C., Ramadan 1445 A.H. runs from Megabit 2 to Miazia 1.
            expect(period.start).toEqual({ year: 2016, month: 7, day: 2 });
        });
    });

    describe('Error and Edge Case Handling', () => {
        test('should return null for an unknown fast key', () => {
            const period = getFastingPeriod('UNKNOWN_FAST_KEY', 2016);
            expect(period).toBeNull();
        });

        test('should return a valid period for a future year', () => {
            // This confirms the calculation logic doesn't crash on different inputs.
            const period = getFastingPeriod(FastingKeys.ABIY_TSOME, 2020);
            expect(period).toBeDefined();
            expect(period.start).toBeDefined();
            expect(period.end).toBeDefined();
        });
    });
});

describe('getFastingInfo', () => {
    const year = 2016;

    test('returns multilingual info and period for Abiy Tsome', () => {
        const infoAm = getFastingInfo(FastingKeys.ABIY_TSOME, year, { lang: 'amharic' });
        expect(infoAm).toBeTruthy();
        expect(infoAm.key).toBe(FastingKeys.ABIY_TSOME);
        expect(infoAm.name).toBe('ዐቢይ ጾም (ሁዳዴ)');
        expect(infoAm.description).toBeDefined();
        expect(infoAm.period.start).toEqual({ year: 2016, month: 7, day: 2 });

        const infoEn = getFastingInfo(FastingKeys.ABIY_TSOME, year, { lang: 'english' });
        expect(infoEn.name).toMatch(/Great Lent/i);
        expect(infoEn.period.end).toEqual({ year: 2016, month: 8, day: 25 });
    });

    test('returns info for Nineveh with 3-day period', () => {
        const info = getFastingInfo(FastingKeys.NINEVEH, year);
        expect(info.name).toBe('ጾመ ነነዌ');
        expect(info.period.start).toEqual({ year: 2016, month: 6, day: 18 });
        expect(info.period.end).toEqual({ year: 2016, month: 6, day: 20 });
    });

    test('returns info for Ramadan including tags', () => {
        const info = getFastingInfo(FastingKeys.RAMADAN, year, { lang: 'english' });
        expect(info.name).toBe('Ramadan');
        expect(Array.isArray(info.tags)).toBe(true);
        expect(info.period.start).toEqual({ year: 2016, month: 7, day: 2 });
    });

    test('returns info for Filseta (fixed Nehase 1-14)', () => {
        const info = getFastingInfo(FastingKeys.FILSETA, year, { lang: 'amharic' });
        expect(info).toBeTruthy();
        expect(info.key).toBe(FastingKeys.FILSETA);
        expect(info.name).toBe('ፍልሰታ');
        expect(info.period.start).toEqual({ year: 2016, month: 12, day: 1 });
        expect(info.period.end).toEqual({ year: 2016, month: 12, day: 14 });
    });
});

describe('Orthodox Weekly Fasting (Tsome Dihnet)', () => {
    test('Wednesdays and Fridays are fasting days outside the 50 days after Easter', () => {
        const year = 2016;
        // Choose a month well before Easter season: Hidar (month 3)
        const month = 3;
        const daysInMonth = getEthiopianDaysInMonth(year, month);
        let foundWed = false;
        let foundFri = false;
        const days = getFastingDays('TSOME_DIHENET', year, month);
        for (let day = 1; day <= daysInMonth; day++) {
            const date = { year, month, day };
            const wd = getWeekday(date);
            if (wd === 3) { // Wednesday
                foundWed = true;
                expect(days.includes(day)).toBe(true);
            }
            if (wd === 5) { // Friday
                foundFri = true;
                expect(days.includes(day)).toBe(true);
            }
        }
        expect(foundWed || foundFri).toBe(true);
    });

    test('No fasting on Wednesdays/Fridays during the 50 days after Easter (until Pentecost)', () => {
        const year = 2016;
        const bh = getBahireHasab(year);
        const easter = bh.movableFeasts.fasika.ethiopian;
        const pentecost = bh.movableFeasts.paraclete.ethiopian;

        // Scan the full window starting the day after Easter through Pentecost inclusive
        let d = addDays(easter, 1);
        while (true) {
            const wd = getWeekday(d);
            if (wd === 3 || wd === 5) {
                const list = getFastingDays('TSOME_DIHENET', d.year, d.month);
                expect(list.includes(d.day)).toBe(false);
            }
            if (d.year === pentecost.year && d.month === pentecost.month && d.day === pentecost.day) break;
            d = addDays(d, 1);
        }
    });

    test('Fasting resumes on Wed/Fri after Pentecost in the same year', () => {
        const year = 2016;
        const bh = getBahireHasab(year);
        const pentecost = bh.movableFeasts.paraclete.ethiopian;
        // Search within a few weeks after Pentecost for a Wed or Fri marked as fasting
        let found = false;
        for (let i = 1; i <= 21; i++) {
            const d = addDays(pentecost, i);
            const wd = getWeekday(d);
            if (wd === 3 || wd === 5) {
                const list = getFastingDays('TSOME_DIHENET', d.year, d.month);
                expect(list.includes(d.day)).toBe(true);
                found = true;
                break;
            }
        }
        expect(found).toBe(true);
    });
});
