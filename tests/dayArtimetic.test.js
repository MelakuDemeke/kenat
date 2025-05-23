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
