/**
 * Finds the start and end dates of a specific Hijri month that falls within an Ethiopian year.
 * @param {number} ethiopianYear - The Ethiopian year.
 * @param {number} hijriMonth - The Hijri month to find (e.g., 9 for Ramadan).
 * @returns {Array<{start: Kenat, end: Kenat}>} An array of start/end date ranges.
 */
export function findHijriMonthRanges(ethiopianYear: number, hijriMonth: number): Array<{
    start: Kenat;
    end: Kenat;
}>;
export function getHoliday(holidayKey: any, ethYear: any, options?: {}): {
    key: any;
    tags: any;
    movable: boolean;
    name: any;
    description: any;
    ethiopian: {
        year: any;
        month: any;
        day: any;
    };
    gregorian?: undefined;
} | {
    key: any;
    tags: any;
    movable: boolean;
    name: any;
    description: any;
    ethiopian: any;
    gregorian: any;
};
export function getHolidaysInMonth(ethYear: any, ethMonth: any, options?: {}): any[];
export function getHolidaysForYear(ethYear: any, options?: {}): any[];
