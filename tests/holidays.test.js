import { getFasikaDate, getSikletDate, getEidFitrDate } from "../src/holidays";

describe('Test Fasika and Siklet Dates', () => {
    it('should return correct Fasika date for Ethiopian years 2012 to 2016', () => {
        expect(getFasikaDate(2012).ethiopian).toEqual({ year: 2012, month: 8, day: 11 });
        expect(getFasikaDate(2013).ethiopian).toEqual({ year: 2013, month: 8, day: 24 });
        expect(getFasikaDate(2014).ethiopian).toEqual({ year: 2014, month: 8, day: 16 });
        expect(getFasikaDate(2015).ethiopian).toEqual({ year: 2015, month: 8, day: 8 });
        expect(getFasikaDate(2016).ethiopian).toEqual({ year: 2016, month: 8, day: 27 });
    });

    it('should return correct Siklet (Good Friday) date for Ethiopian years 2012 to 2016', () => {
        expect(getSikletDate(2012).ethiopian).toEqual({ year: 2012, month: 8, day: 9 });
        expect(getSikletDate(2013).ethiopian).toEqual({ year: 2013, month: 8, day: 22 });
        expect(getSikletDate(2014).ethiopian).toEqual({ year: 2014, month: 8, day: 14 });
        expect(getSikletDate(2015).ethiopian).toEqual({ year: 2015, month: 8, day: 6 });
        expect(getSikletDate(2016).ethiopian).toEqual({ year: 2016, month: 8, day: 25 });
    });
});
