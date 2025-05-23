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
