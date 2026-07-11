import { Kenat } from '../src/Kenat.js';

// Mock daysOfWeek and getWeekday if they are global or imported in your module
const daysOfWeek: Record<string, string[]> = {
  amharic: ['ሰኞ', 'ማክሰኞ', 'እሮብ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ', 'እሑድ'],
  english: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  // add others if needed
};
const getWeekday = (ethDate: { day: number }): number => {
  // Simplified mock: returns 0..6 cyclic by day for test purpose
  return (ethDate.day - 1) % 7;
};

// This test suite exercises a mock `getMonthGrid` harness bolted onto the real
// Kenat class at runtime (not part of the actual public API - see getMonthCalendar
// for the real equivalent). Preserved as-is from the JS version; `any` is used
// throughout because the monkey-patched shape doesn't match Kenat's real types.
const KenatAny = Kenat as any;

// Mock Kenat.now().getEthiopian() and Kenat constructor for testing
KenatAny.now = () => ({
  getEthiopian: () => ({ year: 2015, month: 9, day: 10 }),
});
KenatAny.prototype.getMonthCalendar = function (year: number, month: number, useGeez: boolean) {
  // Return mock days including the current day 10 for the default test
  return [
    { ethiopian: { year, month, day: 8 }, someData: 'day8' },
    { ethiopian: { year, month, day: 9 }, someData: 'day9' },
    { ethiopian: { year, month, day: 10 }, someData: 'day10' }, // current day
    { ethiopian: { year, month, day: 11 }, someData: 'day11' },
    { ethiopian: { year, month, day: 12 }, someData: 'day12' },
  ];
};
KenatAny.prototype.constructor = Kenat;

// Attach dependencies to global or module scope as needed
(global as any).daysOfWeek = daysOfWeek;
(global as any).getWeekday = getWeekday;

// The method under test
KenatAny.getMonthGrid = function (input: any = {}) {
  let year: number | undefined, month: number | undefined, weekStart = 0, useGeez = false, weekdayLang = 'amharic';

  if (typeof input === 'string') {
    const match = input.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
    if (!match) throw new Error("Invalid Ethiopian date format. Use 'yyyy/mm/dd'");
    year = parseInt(match[1]);
    month = parseInt(match[2]);
  } else if (typeof input === 'object') {
    ({ year, month, weekStart = 0, useGeez = false, weekdayLang = 'amharic' } = input);
  }

  const current = KenatAny.now().getEthiopian();
  const y = year || current.year;
  const m = month || current.month;

  const todayEth = KenatAny.now().getEthiopian();

  const temp = new Kenat(`${y}/${m}/1`);
  const days = (temp as any).getMonthCalendar(y, m, useGeez);

  const labels = daysOfWeek[weekdayLang] || daysOfWeek.amharic;

  const daysWithWeekday = days.map((day: any) => {
    const weekday = getWeekday(day.ethiopian);
    const isToday =
      Number(day.ethiopian.year) === Number(todayEth.year) &&
      Number(day.ethiopian.month) === Number(todayEth.month) &&
      Number(day.ethiopian.day) === Number(todayEth.day);

    return {
      ...day,
      weekday,
      weekdayName: labels[weekday],
      isToday,
    };
  });

  const firstWeekday = daysWithWeekday[0].weekday;
  let offset = firstWeekday - weekStart;
  if (offset < 0) offset += 7;

  const padded = Array(offset).fill(null).concat(daysWithWeekday);
  const headers = labels.slice(weekStart).concat(labels.slice(0, weekStart));

  return {
    headers,
    days: padded,
  };
};

describe('Kenat.getMonthGrid', () => {
  test('returns month grid with default current Ethiopian date when no input', () => {
    const result = KenatAny.getMonthGrid();
    expect(result).toHaveProperty('headers');
    expect(result).toHaveProperty('days');
    expect(Array.isArray(result.headers)).toBe(true);
    expect(Array.isArray(result.days)).toBe(true);
    // Check days contain weekdays and isToday flag
    expect(result.days.some((d: any) => d && d.isToday)).toBe(true);
  });

  test('parses string input correctly and returns valid grid', () => {
    const result = KenatAny.getMonthGrid('2015/9/1');
    expect(result.headers.length).toBe(7);
    expect(result.days.filter((d: any) => d !== null).length).toBe(5); // mock 5 days
    expect(result.days[0]).toHaveProperty('weekday');
  });

  test('throws error on invalid string format', () => {
    expect(() => KenatAny.getMonthGrid('invalid-date')).toThrow(/Invalid Ethiopian date format/);
  });

  test('accepts object input with year, month and custom weekStart', () => {
    const result = KenatAny.getMonthGrid({ year: 2015, month: 9, weekStart: 1, weekdayLang: 'english' });
    expect(result.headers[0]).toBe('Tuesday'); // weekStart=1 shifts headers
    expect(result.days.filter((d: any) => d !== null).length).toBe(5);
    // Check weekdayName matches English labels
    expect(result.days.find((d: any) => d !== null).weekdayName).toBe('Monday');
  });

  test('uses default amharic weekday names if invalid weekdayLang', () => {
    const result = KenatAny.getMonthGrid({ year: 2015, month: 9, weekdayLang: 'invalid' });
    expect(result.headers).toEqual(daysOfWeek.amharic);
  });

  test('pads days array correctly based on weekStart', () => {
    const resultDefault = KenatAny.getMonthGrid({ year: 2015, month: 9, weekStart: 0 });
    const offsetDefault = resultDefault.days.findIndex((day: any) => day !== null);
    expect(offsetDefault).toBeGreaterThanOrEqual(0);
    const resultShift = KenatAny.getMonthGrid({ year: 2015, month: 9, weekStart: 3 });
    const offsetShift = resultShift.days.findIndex((day: any) => day !== null);
    expect(offsetShift).toBeGreaterThanOrEqual(0);
    expect(offsetShift).not.toBe(offsetDefault); // Should differ if weekStart changed
  });
});
