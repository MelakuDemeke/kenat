import { Kenat } from './Kenat.js';
import { getHolidaysInMonth } from './holidays.js';
import { toGeez } from './geezConverter.js';
import { daysOfWeek, monthNames } from './constants.js';
import { getWeekday, validateNumericInputs } from './utils.js';
import { InvalidGridConfigError } from './errors/errorHandler.js';

export class MonthGrid {
  constructor(config = {}) {
    this._validateConfig(config);

    const current = Kenat.now().getEthiopian();
    this.year = config.year ?? current.year;
    this.month = config.month ?? current.month;
    this.weekStart = config.weekStart ?? 1;
    this.useGeez = config.useGeez ?? false;
    this.weekdayLang = config.weekdayLang ?? 'amharic';
    this.holidayFilter = config.holidayFilter ?? null;
  }

  _validateConfig(config) {
    const { year, month, weekStart, weekdayLang } = config;

    // If one is provided, both must be.
    if ((year !== undefined && month === undefined) || (year === undefined && month !== undefined)) {
      throw new InvalidGridConfigError('If providing year or month, both must be provided.');
    }
    if (year !== undefined) validateNumericInputs('MonthGrid.constructor', { year });
    if (month !== undefined) validateNumericInputs('MonthGrid.constructor', { month });


    if (weekStart !== undefined) {
      validateNumericInputs('MonthGrid.constructor', { weekStart });
      if (weekStart < 0 || weekStart > 6) {
        throw new InvalidGridConfigError(`Invalid weekStart value: ${weekStart}. Must be between 0 and 6.`);
      }
    }

    if (weekdayLang !== undefined) {
      if (typeof weekdayLang !== 'string' || !Object.keys(daysOfWeek).includes(weekdayLang)) {
        throw new InvalidGridConfigError(`Invalid weekdayLang: "${weekdayLang}". Must be one of [${Object.keys(daysOfWeek).join(', ')}].`);
      }
    }
  }

  static create(config = {}) {
    const instance = new MonthGrid(config);
    return instance.generate();
  }

  generate() {
    const y = this.year;
    const m = this.month;

    const todayEth = Kenat.now().getEthiopian();
    const temp = new Kenat(`${y}/${m}/1`);
    const rawDays = temp.getMonthCalendar(y, m, this.useGeez);
    const labels = daysOfWeek[this.weekdayLang] || daysOfWeek.amharic;
    const monthLabels = monthNames[this.weekdayLang] || monthNames.amharic;

    const monthHolidays = getHolidaysInMonth(y, m, {
      lang: this.weekdayLang,
      filter: this.holidayFilter
    });
    const holidayMap = {};
    monthHolidays.forEach(h => {
      const key = `${h.ethiopian.year}-${h.ethiopian.month}-${h.ethiopian.day}`;
      if (!holidayMap[key]) holidayMap[key] = [];
      holidayMap[key].push(h);
    });

    const daysWithWeekday = rawDays.map(day => {
      const eth = day.ethiopian;
      const greg = day.gregorian;
      const isToday = eth.year === todayEth.year && eth.month === todayEth.month && eth.day === todayEth.day;
      const weekday = getWeekday(eth);
      const key = `${eth.year}-${eth.month}-${eth.day}`;
      const holidays = holidayMap[key] || [];

      return {
        ethiopian: {
          year: this.useGeez ? toGeez(eth.year) : eth.year,
          month: this.useGeez ? monthLabels[eth.month - 1] : eth.month,
          day: this.useGeez ? toGeez(eth.day) : eth.day
        },
        gregorian: greg,
        weekday,
        weekdayName: labels[weekday],
        isToday,
        holidays
      };
    });

    const offset = ((daysWithWeekday[0].weekday - this.weekStart + 7) % 7);
    const padded = Array(offset).fill(null).concat(daysWithWeekday);
    const headers = labels.slice(this.weekStart).concat(labels.slice(0, this.weekStart));
    const localizedYear = this.useGeez ? toGeez(this.year) : this.year;
    const localizedMonthName = monthLabels[this.month - 1];

    return {
      headers,
      days: padded,
      year: localizedYear,
      month: this.month,
      monthName: localizedMonthName,
      up: () => this.up().generate(),
      down: () => this.down().generate()
    };
  }

  up() {
    if (this.month === 13) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }
    return this;
  }

  down() {
    if (this.month === 1) {
      this.month = 13;
      this.year--;
    } else {
      this.month--;
    }
    return this;
  }
}
