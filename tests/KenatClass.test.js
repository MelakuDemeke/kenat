import { Kenat } from '../src/Kenat.js';

describe('Kenat class', () => {
  test('should create an instance with current date', () => {
    const now = new Date();
    const kenat = new Kenat();

    const gregorian = kenat.getGregorian();
    expect(gregorian).toBeInstanceOf(Date);

    // Allow some time drift (same date, not necessarily same millisecond)
    expect(gregorian.toDateString()).toEqual(now.toDateString());

    const ethiopian = kenat.getEthiopian();
    expect(ethiopian).toHaveProperty('year');
    expect(ethiopian).toHaveProperty('month');
    expect(ethiopian).toHaveProperty('day');
  });

  test('should convert a specific Gregorian date correctly', () => {
    const kenat = new Kenat("2025-05-23T15:30:00");
    const gregorian = kenat.getGregorian();
    expect(gregorian.toISOString()).toContain("2025-05-23");

    const ethiopian = kenat.getEthiopian();
    expect(ethiopian).toEqual({ year: 2017, month: 9, day: 15 }); // Adjust if your conversion logic differs
  });

  test('toString should return Ethiopian date string', () => {
    const kenat = new Kenat("2025-05-23T15:30:00");
    const str = kenat.toString();
    expect(str).toBe("Ethiopian: 2017-9-15");
  });
});
