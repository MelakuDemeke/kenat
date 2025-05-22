// tests/kenat.test.js
import { gregorianToEthiopian, ethiopianToGregorian } from '../src/calendar.js';

describe('Kenat Ethiopian Calendar conversions', () => {
  test('Gregorian to Ethiopian: May 22, 2025 -> 2017-9-14', () => {
    const result = gregorianToEthiopian(2025, 5, 22);
    expect(result).toEqual({ year: 2017, month: 9, day: 14 });
  });

  test('Ethiopian to Gregorian: 2017-9-14 -> May 22, 2025', () => {
    const result = ethiopianToGregorian(2017, 9, 14);
    expect(result).toEqual({ year: 2025, month: 5, day: 22 });
  });
});
