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
});
