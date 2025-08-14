export class MonthGrid {
    static create(config?: {}): {
        headers: any;
        days: any[];
        year: any;
        month: any;
        monthName: any;
        up: () => /*elided*/ any;
        down: () => /*elided*/ any;
    };
    constructor(config?: {});
    year: any;
    month: any;
    weekStart: any;
    useGeez: any;
    weekdayLang: any;
    holidayFilter: any;
    mode: any;
    showAllSaints: any;
    _validateConfig(config: any): void;
    generate(): {
        headers: any;
        days: any[];
        year: any;
        month: any;
        monthName: any;
        up: () => {
            headers: any;
            days: any[];
            year: any;
            month: any;
            monthName: any;
            up: /*elided*/ any;
            down: () => /*elided*/ any;
        };
        down: () => {
            headers: any;
            days: any[];
            year: any;
            month: any;
            monthName: any;
            up: () => /*elided*/ any;
            down: /*elided*/ any;
        };
    };
    _getRawDays(): any[];
    _getFilteredHolidays(): any[];
    _getSaintsMap(): {};
    _mergeDays(rawDays: any, holidaysList: any, saintsMap: any): any[];
    _getWeekdayHeaders(): any;
    _getLocalizedMonthName(): any;
    _getLocalizedYear(): any;
    up(): this;
    down(): this;
}
