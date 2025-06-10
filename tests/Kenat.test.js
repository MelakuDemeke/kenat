import { Kenat } from '../src/Kenat.js';

describe('Kenat class', () => {
    test('should create an instance with current date', () => {
        const now = new Date();
        const kenat = new Kenat();

        const gregorian = kenat.getGregorian();
        expect(gregorian).toHaveProperty('year');
        expect(gregorian).toHaveProperty('month');
        expect(gregorian).toHaveProperty('day');

        // Compare only the date portion
        expect(`${gregorian.year}-${gregorian.month}-${gregorian.day}`).toBe(
            `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        );

        const ethiopian = kenat.getEthiopian();
        expect(ethiopian).toHaveProperty('year');
        expect(ethiopian).toHaveProperty('month');
        expect(ethiopian).toHaveProperty('day');
    });

    test('should convert a specific Ethiopian date correctly', () => {
        const kenat = new Kenat("2016/9/15");
        const gregorian = kenat.getGregorian();
        expect(gregorian).toEqual({ year: 2024, month: 5, day: 23 });

        const ethiopian = kenat.getEthiopian();
        expect(ethiopian).toEqual({ year: 2016, month: 9, day: 15 });
    });

    test('toString should return Ethiopian date string', () => {
        const kenat = new Kenat("2016/9/15");
        const str = kenat.toString();
        expect(str).toBe("ግንቦት 15 2016 12:00 ጠዋት");
    });

    test('format returns Ethiopian date string with month name in English and Amharic', () => {
        const kenat = new Kenat("2017/1/15"); // Meskerem 15, 2017

        const englishFormat = kenat.format({ lang: 'english' });
        expect(englishFormat).toBe("Meskerem 15 2017");

        const amharicFormat = kenat.format({ lang: 'amharic' });
        expect(amharicFormat).toBe("መስከረም 15 2017");
    });

    test('formatInGeezAmharic returns Ethiopian date string with Amharic month and Geez numerals', () => {
        const kenat = new Kenat("2017/1/15"); // Meskerem 15, 2017

        const formatted = kenat.formatInGeezAmharic();

        // Expected: "መስከረም ፲፭ ፳፻፲፯"
        expect(formatted).toBe("መስከረም ፲፭ ፳፻፲፯");
    });

});

describe('Kenat API Helper Methods', () => {
    const date1 = new Kenat("2016/8/15");
    const date2 = new Kenat("2016/8/20");
    const date3 = new Kenat("2016/8/15");
    const leapYearDate = new Kenat("2015/1/1");
    const nonLeapYearDate = new Kenat("2016/1/1");

    test('isBefore() should correctly compare dates', () => {
        expect(date1.isBefore(date2)).toBe(true);
        expect(date2.isBefore(date1)).toBe(false);
        expect(date1.isBefore(date3)).toBe(false);
    });

    test('isAfter() should correctly compare dates', () => {
        expect(date2.isAfter(date1)).toBe(true);
        expect(date1.isAfter(date2)).toBe(false);
        expect(date1.isAfter(date3)).toBe(false);
    });

    test('isSameDay() should correctly compare dates', () => {
        expect(date1.isSameDay(date3)).toBe(true);
        expect(date1.isSameDay(date2)).toBe(false);
    });

    test('startOfMonth() should return the first day of the month', () => {
        const start = date1.startOfMonth();
        expect(start.getEthiopian()).toEqual({ year: 2016, month: 8, day: 1 });
    });

    test('endOfMonth() should return the last day of a standard month', () => {
        const end = date1.endOfMonth();
        expect(end.getEthiopian()).toEqual({ year: 2016, month: 8, day: 30 });
    });

    test('endOfMonth() should return the last day of Pagume in a leap year', () => {
        const pagume = new Kenat("2015/13/1"); // 2015 is a leap year
        const end = pagume.endOfMonth();
        expect(end.getEthiopian()).toEqual({ year: 2015, month: 13, day: 6 });
    });

    test('isLeapYear() should correctly identify leap years', () => {
        expect(leapYearDate.isLeapYear()).toBe(true);
        expect(nonLeapYearDate.isLeapYear()).toBe(false);
    });

    test('weekday() should return the correct day of the week', () => {
        // May 23, 2024 is a Thursday, which is index 4
        const specificDate = new Kenat("2016/9/15");
        expect(specificDate.weekday()).toBe(4);
    });
});