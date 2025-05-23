import Kenat from '../src/index.js';

describe('Kenat - getMonthCalendar', () => {
  test('should return 30 days for a standard Ethiopian month', () => {
    const k = new Kenat('2015/1/1');
    const calendar = k.getMonthCalendar(2015, 1);
    expect(calendar.length).toBe(30);
  });

  test('should return 6 days for Pagumē in a leap year (year % 4 === 3)', () => {
    const k = new Kenat('2011/13/1'); // 2011 is a leap year in Ethiopian calendar
    const calendar = k.getMonthCalendar(2011, 13);
    expect(calendar.length).toBe(6);
  });

  test('should return 5 days for Pagumē in a non-leap year', () => {
    const k = new Kenat('2012/13/1');
    const calendar = k.getMonthCalendar(2012, 13);
    expect(calendar.length).toBe(5);
  });

  test('each day should include properly formatted Ethiopian and Gregorian fields', () => {
    const k = new Kenat('2015/2/1');
    const calendar = k.getMonthCalendar(2015, 2, false);
    const day = calendar[0];
    
    expect(day.ethiopian).toHaveProperty('display');
    expect(day.gregorian).toHaveProperty('display');
    expect(typeof day.ethiopian.display).toBe('string');
    expect(typeof day.gregorian.display).toBe('string');
  });

  test('should correctly format Geez numerals when useGeez = true', () => {
    const k = new Kenat('2015/1/1');
    const calendar = k.getMonthCalendar(2015, 1, true);
    const day = calendar[0];
    expect(day.ethiopian.display).toMatch(/[፩-፻]/); // Regex to match at least one Geez numeral
  });
});
