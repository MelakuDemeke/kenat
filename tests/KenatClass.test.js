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
        expect(str).toBe("Ethiopian: 2016-9-15");
    });

    test('format returns Ethiopian date string with month name in English and Amharic', () => {
        const kenat = new Kenat("2017/1/15"); // Meskerem 15, 2017

        const englishFormat = kenat.format('english');
        expect(englishFormat).toBe("Meskerem-15-2017");

        const amharicFormat = kenat.format('amharic');
        expect(amharicFormat).toBe("መስከረም-15-2017");
    });

    test('formatInGeezAmharic returns Ethiopian date string with Amharic month and Geez numerals', () => {
        const kenat = new Kenat("2017/1/15"); // Meskerem 15, 2017

        const formatted = kenat.formatInGeezAmharic();

        // Expected: "መስከረም ፲፭ ፳፻፲፯"
        expect(formatted).toBe("መስከረም ፲፭ ፳፻፲፯");
    });

});
