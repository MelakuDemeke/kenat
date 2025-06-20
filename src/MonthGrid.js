import { Kenat } from './Kenat.js';
import { getHolidaysInMonth } from './holidays.js';
import { toGeez } from './geezConverter.js';
import { orthodoxMonthlydays } from './nigs.js';
import { daysOfWeek, monthNames, HolidayTags, holidayInfo } from './constants.js';
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
    this.mode = config.mode ?? null;
    this.showAllSaints = config.showAllSaints ?? false;
  }

  _validateConfig(config) {
    const { year, month, weekStart, weekdayLang } = config;
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
    const rawDays = this._getRawDays();
    const holidays = this._getFilteredHolidays();
    const saints = this._getSaintsMap();
    const paddedDays = this._mergeDays(rawDays, holidays, saints);
    const headers = this._getWeekdayHeaders();
    const monthName = this._getLocalizedMonthName();
    const yearLabel = this._getLocalizedYear();

    return {
      headers,
      days: paddedDays,
      year: yearLabel,
      month: this.month,
      monthName,
      up: () => this.up().generate(),
      down: () => this.down().generate()
    };
  }

  _getRawDays() {
    const base = new Kenat(`${this.year}/${this.month}/1`);
    return base.getMonthCalendar(this.year, this.month, this.useGeez);
  }

  _getFilteredHolidays() {
    let filter = this.holidayFilter;
    if (this.mode === 'christian') filter = [HolidayTags.CHRISTIAN];
    if (this.mode === 'muslim') filter = [HolidayTags.MUSLIM];
    if (this.mode === 'public') filter = [HolidayTags.PUBLIC];
    return getHolidaysInMonth(this.year, this.month, {
      lang: this.weekdayLang,
      filter
    });
  }

  _getSaintsMap() {
    if (this.mode !== 'christian') return {};
    const map = {};

    Object.entries(orthodoxMonthlydays).forEach(([saintKey, saint]) => {
      if (saint.events) {
        // This is a nested saint object with multiple events
        const nigsEvent = saint.events.find(event =>
          Array.isArray(event.negs) ? event.negs.includes(this.month) : event.negs === this.month
        );

        if (nigsEvent) {
          // It's a major feast ("Nigs") month, so show the specific event
          const day = saint.recuringDate;
          if (!map[day]) map[day] = [];
          map[day].push({
            key: nigsEvent.key,
            name: saint.name[this.weekdayLang] || saint.name.english,
            description: nigsEvent.description[this.weekdayLang] || nigsEvent.description.english,
            isNigs: true,
            tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN, 'NIGS']
          });
        } else if (this.showAllSaints && saint.defaultDescription) {
          // It's NOT a major feast month, but the user wants to see all saints. Show the generic commemoration.
          const day = saint.recuringDate;
          if (!map[day]) map[day] = [];
          map[day].push({
            key: saintKey, // Use the parent key for the generic event
            name: saint.name[this.weekdayLang] || saint.name.english,
            description: saint.defaultDescription[this.weekdayLang] || saint.defaultDescription.english,
            isNigs: false,
            tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN, 'SAINT_DAY']
          });
        }
      } else {
        // This is a flat (single-event) saint object
        const isNigs = Array.isArray(saint.negs) ? saint.negs.includes(this.month) : saint.negs === this.month;
        if (isNigs || this.showAllSaints) {
          const day = saint.recuringDate;
          if (!map[day]) map[day] = [];
          map[day].push({
            key: saint.key,
            name: saint.name[this.weekdayLang] || saint.name.english,
            description: saint.description[this.weekdayLang] || saint.description.english,
            isNigs,
            tags: [HolidayTags.RELIGIOUS, HolidayTags.CHRISTIAN, isNigs ? 'NIGS' : 'SAINT_DAY']
          });
        }
      }
    });
    return map;
  }

  _mergeDays(rawDays, holidaysList, saintsMap) {
    const today = Kenat.now().getEthiopian();
    const labels = daysOfWeek[this.weekdayLang] || daysOfWeek.amharic;
    const monthLabels = monthNames[this.weekdayLang] || monthNames.amharic;
    const holidayMap = {};
    holidaysList.forEach(h => {
      const key = `${h.ethiopian.year}-${h.ethiopian.month}-${h.ethiopian.day}`;
      if (!holidayMap[key]) holidayMap[key] = [];
      holidayMap[key].push(h);
    });

    const mapped = rawDays.map(day => {
      const eth = day.ethiopian;
      const greg = day.gregorian;
      const weekday = getWeekday(eth);
      const key = `${eth.year}-${eth.month}-${eth.day}`;
      let holidays = holidayMap[key] || [];

      if (this.mode === 'christian') {
        holidays = holidays.concat(saintsMap[eth.day] || []);
      }

      if (this.mode === 'muslim' && weekday === 5) {
        const j = holidayInfo.jummah;
        holidays.push({
          key: 'jummah',
          name: j.name[this.weekdayLang] || j.name.english,
          description: j.description[this.weekdayLang] || j.description.english,
          tags: [HolidayTags.RELIGIOUS, HolidayTags.MUSLIM]
        });
      }

      return {
        ethiopian: {
          year: this.useGeez ? toGeez(eth.year) : eth.year,
          month: this.useGeez ? monthLabels[eth.month - 1] : eth.month,
          day: this.useGeez ? toGeez(eth.day) : eth.day
        },
        gregorian: greg,
        weekday,
        weekdayName: labels[weekday],
        isToday: eth.year === today.year && eth.month === today.month && eth.day === today.day,
        holidays
      };
    });

    const offset = ((mapped.length > 0 ? mapped[0].weekday : (new Date(this.year, this.month - 1, 1).getDay())) - this.weekStart + 7) % 7;
    return Array(offset).fill(null).concat(mapped);
  }

  _getWeekdayHeaders() {
    const labels = daysOfWeek[this.weekdayLang] || daysOfWeek.amharic;
    return labels.slice(this.weekStart).concat(labels.slice(0, this.weekStart));
  }

  _getLocalizedMonthName() {
    return (monthNames[this.weekdayLang] || monthNames.amharic)[this.month - 1];
  }

  _getLocalizedYear() {
    return this.useGeez ? toGeez(this.year) : this.year;
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
