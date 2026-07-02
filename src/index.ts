import { Kenat } from './Kenat.js';
import { diffBreakdown } from './dayArithmetic.js';
import { MonthGrid } from './MonthGrid.js';
import { toEC, toGC } from './conversions.js';
import { toArabic, toGeez } from './geezConverter.js';
import { getHolidaysInMonth, getHoliday, getHolidaysForYear } from './holidays.js';
import { Time } from './Time.js';
import { HolidayTags, HolidayNames } from './constants.js';
import { getBahireHasab } from './bahireHasab.js';
import { monthNames } from './constants.js';
import { getFastingPeriod, getFastingInfo, getFastingDays } from './fasting.js';

// Default export is the Kenat class directly
export default Kenat;

// Named exports for the conversion functions
export {
  toEC as toEC,
  toGC,
  toArabic,
  toGeez,
  getHolidaysInMonth,
  getHolidaysForYear,
  getBahireHasab,
  getFastingPeriod,
  getFastingInfo,
  getFastingDays,
  MonthGrid,
  Time,
  getHoliday,
  HolidayTags,
  HolidayNames,
  monthNames,
  diffBreakdown,
};

// Type-only exports for TypeScript consumers
export type {
  EthiopianDate,
  GregorianDate,
  Lang,
  TimePeriod,
  LocalizedText,
  Holiday,
  DateRange,
  DiffUnit,
  DiffBreakdown,
} from './types.js';
export type {
  KenatInput,
  KenatTimeInput,
  FormatOptions,
  ToStringOptions,
  ToISOStringOptions,
  GetDateOptions,
  CalendarDay,
  StaticCalendarOptions,
  StaticMonthCalendar,
  DistanceOptions,
  DistanceToHolidayOptions,
} from './Kenat.js';
export type { MonthGridConfig, MonthGridResult, MonthGridDay, DayHolidayEntry } from './MonthGrid.js';
export type { TimeFormatOptions, TimeDuration } from './Time.js';
export type { BahireHasabResult } from './bahireHasab.js';
