import { getFasikaDate } from '../src/utils.js';

describe('getFasikaDate', () => {
  const testCases = [
    { year: 2010, expected: '2010/7/30' },
    { year: 2011, expected: '2011/8/20' },
    { year: 2012, expected: '2012/8/11' },
    { year: 2013, expected: '2013/8/24' },
    { year: 2014, expected: '2014/8/16' },
    { year: 2015, expected: '2015/8/8' },
  ];

  testCases.forEach(({ year, expected }) => {
    test(`Fasika in ${year} should be on ${expected}`, () => {
      const { year: y, month, day } = getFasikaDate(year);
      const formatted = `${y}/${month}/${day}`;
      expect(formatted).toBe(expected);
    });
  });
});
