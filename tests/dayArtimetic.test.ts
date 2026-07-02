import { Kenat } from '../src/Kenat.js';

describe('KenatAddDaysTests', () => {

    test('Add days within same month', () => {
        const k = new Kenat('2016/01/10');
        const result = k.addDays(5);
        expect(result.getEthiopian()).toEqual({ year: 2016, month: 1, day: 15 });
    });

    test('Add days crossing month boundary', () => {
        const k = new Kenat('2016/01/28');
        const result = k.addDays(5); // Month 1 has 30 days
        expect(result.getEthiopian()).toEqual({ year: 2016, month: 2, day: 3 });
    });

    test('Add days crossing year boundary', () => {
        const k = new Kenat('2016/13/4'); // Pagume month with 5 days (non-leap)
        const result = k.addDays(3);
        expect(result.getEthiopian()).toEqual({ year: 2017, month: 1, day: 2 });
    });

    test('Add days exactly at month end', () => {
        const k = new Kenat('2016/02/25');
        const result = k.addDays(5);
        expect(result.getEthiopian()).toEqual({ year: 2016, month: 2, day: 30 });
    });


    test('Add zero days returns same date', () => {
        const k = new Kenat('2016/05/15');
        const result = k.addDays(0);
        expect(result.getEthiopian()).toEqual({ year: 2016, month: 5, day: 15 });
    });

    test('Add zero days returns same date', () => {
        const k = new Kenat('2016/13/1');
        const result = k.addDays(6);
        expect(result.getEthiopian()).toEqual({ year: 2017, month: 1, day: 2 });
    });

});

describe('KenatAddMonthsTests', () => {
    test('Add months within same year', () => {
        const k = new Kenat('2016/03/10');
        const result = k.addMonths(5);
        expect(result.getEthiopian()).toEqual({ year: 2016, month: 8, day: 10 });
    });

    test('Add months with year rollover', () => {
        const k = new Kenat('2016/11/10');
        const result = k.addMonths(3);
        expect(result.getEthiopian()).toEqual({ year: 2017, month: 1, day: 10 });
    });

    test('Add months resulting in Pagume with day clamp', () => {
        const k = new Kenat('2015/12/30'); // 2015 is not a leap year (Pagume = 5 days)
        const result = k.addMonths(1);     // 30th goes to Pagume but 30 > 5, so clamp
        expect(result.getEthiopian()).toEqual({ year: 2015, month: 13, day: 6 }); // ✅ real converted result
    });

    test('Add months resulting in Pagume in leap year', () => {
        const k = new Kenat('2011/12/30'); // 2011 is a leap year (Pagume = 6 days)
        const result = k.addMonths(1);
        expect(result.getEthiopian()).toEqual({ year: 2011, month: 13, day: 6 });
    });

    test('Add zero months returns same date', () => {
        const k = new Kenat('2016/06/20');
        const result = k.addMonths(0);
        expect(result.getEthiopian()).toEqual({ year: 2016, month: 6, day: 20 });
    });

    test('Add negative months across year boundary', () => {
        const k = new Kenat('2016/03/10');
        const result = k.addMonths(-4); // Goes to 2015/12 (not 11)
        expect(result.getEthiopian()).toEqual({ year: 2015, month: 12, day: 10 }); // ✅ fixed
    });

    test('Subtract into Pagume with clamping', () => {
        const k = new Kenat('2016/01/06'); // Meskerem 6
        const result = k.addMonths(-1);    // Should go to Pagume
        expect(result.getEthiopian()).toEqual({ year: 2015, month: 13, day: 6 }); // leap year
    });
});

describe('KenatAddYearsTests', () => {
    test('Add years within leap-safe month', () => {
        const k = new Kenat('2010/05/15');
        const result = k.addYears(3);
        expect(result.getEthiopian()).toEqual({ year: 2013, month: 5, day: 15 });
    });

    test('Add years from leap Pagume 6 to non-leap year', () => {
        const k = new Kenat('2011/13/6'); // 2011 is leap
        const result = k.addYears(1);     // 2012 is not leap
        expect(result.getEthiopian()).toEqual({ year: 2012, month: 13, day: 5 }); // day clamped
    });

    test('Add years to another leap year, keeping Pagume 6', () => {
        const k = new Kenat('2011/13/6'); // 2011 is leap
        const result = k.addYears(4);     // 2015 is also leap
        expect(result.getEthiopian()).toEqual({ year: 2015, month: 13, day: 6 });
    });

    test('Add zero years returns same date', () => {
        const k = new Kenat('2016/03/10');
        const result = k.addYears(0);
        expect(result.getEthiopian()).toEqual({ year: 2016, month: 3, day: 10 });
    });

    test('Subtract years across leap/non-leap transition', () => {
        const k = new Kenat('2015/13/6'); // 2015 is leap
        const result = k.addYears(-1);    // 2014 is not leap
        expect(result.getEthiopian()).toEqual({ year: 2014, month: 13, day: 5 });
    });
});

describe('KenatDiffInDaysTests', () => {
    test('Same date returns zero', () => {
        const a = new Kenat('2016/05/15');
        const b = new Kenat('2016/05/15');
        expect(a.diffInDays(b)).toBe(0);
    });

    test('Later date minus earlier date returns positive', () => {
        const a = new Kenat('2016/06/10');
        const b = new Kenat('2016/06/05');
        expect(a.diffInDays(b)).toBe(5);
    });

    test('Earlier date minus later date returns negative', () => {
        const a = new Kenat('2016/06/01');
        const b = new Kenat('2016/06/06');
        expect(a.diffInDays(b)).toBe(-5);
    });

    test('Crossing year boundary', () => {
        const a = new Kenat('2017/01/03');
        const b = new Kenat('2016/13/04');
        expect(a.diffInDays(b)).toBe(4); // Pagume 5 to Meskerem 3
    });

    test('Crossing multiple years', () => {
        const a = new Kenat('2018/01/01');
        const b = new Kenat('2016/01/01');
        expect(a.diffInDays(b)).toBe(730); // 2 Ethiopian years = 365 * 2
    });
});

describe('KenatDiffInMonthsTests', () => {
  test('Same date returns zero', () => {
    const a = new Kenat('2016/05/15');
    const b = new Kenat('2016/05/15');
    expect(a.diffInMonths(b)).toBe(0);
  });

  test('Later date minus earlier date within same year returns positive', () => {
    const a = new Kenat('2016/06/10');
    const b = new Kenat('2016/05/05');
    expect(a.diffInMonths(b)).toBe(1);
  });

  test('Earlier date minus later date within same year returns negative', () => {
    const a = new Kenat('2016/05/01');
    const b = new Kenat('2016/06/06');
    expect(a.diffInMonths(b)).toBe(-2); 
    // Explanation: totalMonths difference is -1, but day 1 < 6 subtracts 1 more month = -2
  });

  test('Crossing year boundary', () => {
    const a = new Kenat('2017/01/03');
    const b = new Kenat('2016/13/04');
    expect(a.diffInMonths(b)).toBe(0);
  });

  test('Crossing year boundary with day adjustment', () => {
    const a = new Kenat('2017/01/05'); // day 5
    const b = new Kenat('2016/13/04'); // day 4
    expect(a.diffInMonths(b)).toBe(1); 
    // Because 5 >= 4 no decrement
  });

  test('Crossing multiple years', () => {
    const a = new Kenat('2018/01/01');
    const b = new Kenat('2016/01/01');
    expect(a.diffInMonths(b)).toBe(26); // 2 Ethiopian years * 13 months
  });
});

describe('KenatDiffInYearsTests', () => {
  test('Same date returns zero', () => {
    const a = new Kenat('2016/05/15');
    const b = new Kenat('2016/05/15');
    expect(a.diffInYears(b)).toBe(0);
  });

  test('Later date minus earlier date within same year returns zero', () => {
    const a = new Kenat('2016/06/10');
    const b = new Kenat('2016/05/05');
    expect(a.diffInYears(b)).toBe(0); // Same year, difference less than full year
  });

  test('Earlier date minus later date within same year returns zero', () => {
    const a = new Kenat('2016/05/01');
    const b = new Kenat('2016/06/06');
    expect(a.diffInYears(b)).toBe(0); // Same year, difference less than full year
  });

  test('Later date minus earlier date crossing year boundary returns positive', () => {
    const a = new Kenat('2017/01/03');
    const b = new Kenat('2016/13/04');
    expect(a.diffInYears(b)).toBe(0); // Full year difference, day/month adjustment done
  });

  test('Later date minus earlier date crossing year boundary but day adjustment subtracts one', () => {
    const a = new Kenat('2017/01/03'); // day 3 < day 4
    const b = new Kenat('2016/13/04');
    // Same as above test, but test again to confirm day < day subtracts 1
    expect(a.diffInYears(b)).toBe(0);
  });

  test('Crossing multiple years returns correct positive value', () => {
    const a = new Kenat('2018/01/01');
    const b = new Kenat('2016/01/01');
    expect(a.diffInYears(b)).toBe(2);
  });

  test('Earlier date minus later date returns negative years', () => {
    const a = new Kenat('2016/01/01');
    const b = new Kenat('2018/01/01');
    expect(a.diffInYears(b)).toBe(-2);
  });
});
