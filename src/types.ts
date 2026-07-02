/** Shared domain types used across Kenat's modules. */

export type Lang = 'amharic' | 'english' | string;

export interface EthiopianDate {
    year: number;
    month: number;
    day: number;
}

export interface GregorianDate {
    year: number;
    month: number;
    day: number;
}

export type TimePeriod = 'day' | 'night';

export interface LocalizedText {
    amharic: string;
    english: string;
    [lang: string]: string;
}

export interface HolidayInfoEntry {
    name: LocalizedText;
    description: LocalizedText;
}

export interface Holiday {
    key: string;
    tags: string[];
    movable: boolean;
    name?: string;
    description?: string;
    ethiopian: EthiopianDate;
    gregorian?: GregorianDate;
}

export interface DateRange {
    start: EthiopianDate;
    end: EthiopianDate;
}

export type DiffUnit = 'years' | 'months' | 'days';

export interface DiffBreakdown {
    sign: 1 | -1;
    totalDays: number;
    years?: number;
    months?: number;
    days?: number;
}
