import Kenat, { gregorianToEthiopian, ethiopianToGregorian } from '../src/index.js';

describe('Kenat Ethiopian Calendar conversions', () => {
  test('Gregorian to Ethiopian: May 22, 2025 -> 2017-9-14', () => {
    const result = gregorianToEthiopian(2025, 5, 22);
    expect(result).toEqual({ year: 2017, month: 9, day: 14 });
  });

  test('Ethiopian to Gregorian: 2017-9-14 -> May 22, 2025', () => {
    const result = ethiopianToGregorian(2017, 9, 14);
    expect(result).toEqual({ year: 2025, month: 5, day: 22 });
  });

  test('Ethiopian to Gregorian: Pagumē 5, 2016 (2016-13-5) -> September 10, 2024', () => {
    const result = ethiopianToGregorian(2016, 13, 5);
    expect(result).toEqual({ year: 2024, month: 9, day: 10 });
  });

  test('Gregorian to Ethiopian Leap Year: February 29, 2020 -> Yekatit 22, 2012', () => {
    const result = gregorianToEthiopian(2020, 2, 29);
    expect(result).toEqual({ year: 2012, month: 6, day: 22 });
  });

  test('Ethiopian to Gregorian Leap Year: 2011-13-6 (Pagumē 6, 2011) -> September 11, 2019', () => {
    const result = ethiopianToGregorian(2011, 13, 6);
    expect(result).toEqual({ year: 2019, month: 9, day: 11 });
  });

  test('Ethiopian to Gregorian Leap Year: Pagumē 6, 2019 (2019-13-6) -> September 11, 2027', () => {
    const result = ethiopianToGregorian(2019, 13, 6);
    expect(result).toEqual({ year: 2027, month: 9, day: 11 });
  });

  // Optional: test using the Kenat class itself
  test('Kenat instance toString and getGregorian', () => {
    const ethDateStr = '2017/09/14';
    const kenatInstance = new Kenat(ethDateStr);
    expect(kenatInstance.toString()).toBe('Ethiopian: 2017-9-14 12:00 day');
    expect(kenatInstance.getGregorian()).toEqual({ year: 2025, month: 5, day: 22 });
  });
});
