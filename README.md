# Kenat / ቀናት ![NPM Version](https://img.shields.io/npm/v/kenat)

![banner](assets/img/kenatBanner.png)

![Build Status](https://github.com/MelakuDemeke/kenat/actions/workflows/test.yml/badge.svg?branch=main)
![npm bundle size](https://img.shields.io/bundlephobia/min/kenat)
![GitHub issues](https://img.shields.io/github/issues/MelakuDemeke/kenat)
![GitHub Repo stars](https://img.shields.io/github/stars/MelakuDemeke/kenat?logo=github&style=flat)
![GitHub forks](https://img.shields.io/github/forks/MelakuDemeke/kenat?logo=github&style=flat)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/MelakuDemeke/kenat?logo=github)
[![npm downloads](https://img.shields.io/npm/dm/kenat.svg?style=flat-square)](https://www.npmjs.com/package/kenat)

---

# Kenat / ቀናት

📌 **Overview**  
Kenat (Amharic: ቀናት) is a comprehensive JavaScript library for the Ethiopian calendar. It provides a complete toolset for developers, handling date conversions, advanced formatting, full date arithmetic, and a powerful, authentic holiday calculation system based on the traditional **Bahire Hasab (ባሕረ ሃሳብ)**.

---

## 📚 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
  - [Requirements](#requirements)
  - [TypeScript Support](#typescript-support)
  - [Import Options](#import-options)
- [Quick Start](#-quick-start)
- [Design Principles](#-design-principles)
- [Bahire Hasab & Holiday System](#-bahire-hasab--holiday-system)
- [More API Examples](#-more-api-examples)
  - [Date Arithmetic](#date-arithmetic)
  - [Comparing Dates](#comparing-dates)
  - [Start / End of a Period](#start--end-of-a-period)
  - [Date Difference & Distance API](#date-difference--distance-api)
  - [Calendar Generation](#calendar-generation)
  - [Fasting Periods](#fasting-periods)
  - [Holiday Distance Helpers](#holiday-distance-helpers)
  - [Geez Numerals & Formatting](#geez-numerals--formatting)
  - [Calendar Preference (Ethiopian / Gregorian)](#calendar-preference-ethiopian--gregorian)
  - [Time Handling](#time-handling)
  - [Serialization](#serialization)
- [API Reference](#-api-reference)
- [Contribution Guide](#-contribution-guide)
- [Author](#-author)
- [Contributors](#-contributors)
- [License](#-license)

---

## ✨ Features

- 🔄 **Bidirectional Conversion**: Seamlessly convert between Ethiopian and Gregorian calendars with high precision.
- 🌓 **Calendar Preference**: Read or format any date as Ethiopian *or* Gregorian with a single `{ calendar }` option — no `if`/`else` needed at call sites.
- 🗂️ **Complete Holiday System**: Pre-loaded with all public, religious (Christian & Muslim), and cultural holidays.
- 🔎 **Advanced Holiday Filtering**: Easily filter holidays by tags (e.g., public, christian, muslim).
- 📖 **Authentic Liturgical Calculations**: Implements Bahire Hasab (ባሕረ ሃሳብ) for movable feasts and fasts, including edge-case years.
- 🔠 **Localized Formatting**: Display dates in both Amharic and English with multiple format options.
- 🔢 **Geez Numerals**: Convert numbers and dates to traditional Geez numeral equivalents.
- ➕ **Full Date Arithmetic**: Add or subtract days, months, and years with support for the 13-month calendar.
- ⏱️ **Start / End of Period**: Snap any date to the start or end of its day, month, or year (leap-year aware).
- ⚖️ **Date Comparison**: `isBefore`, `isAfter`, `isSameDay`, `isSameMonth`, and `isSameYear` for clean, readable comparisons.
- ↔️ **Date Difference & Distance API**: Calculate precise differences and human-friendly distances between dates.
- 🕒 **Ethiopian Time**: Convert between 24-hour Gregorian and 12-hour Ethiopian time systems.
- 🗓️ **Calendar Generation**: Create monthly or yearly calendar grids with customizable options.
- 🕌 **Fasting Periods**: Calculate Orthodox Christian fasting periods and Islamic Ramadan dates.
- 📅 **Date Range Generation**: Generate arrays of dates between two Ethiopian dates.
- 🏷️ **Holiday Distance Helpers**: Find distances to next/previous holiday occurrences.
- 📊 **Multiple Output Formats**: Support for ISO strings, JSON serialization, custom formatting, and structured data.
- 🧊 **Immutable & Chainable**: Every method that changes a date returns a *new* `Kenat` instance, so chaining is always safe.
- 📦 **Zero Dependencies**: Pure JavaScript, no runtime dependencies.

---

## 🚀 Installation

```bash
npm install kenat
```

### Requirements

Node.js 18 or later. Kenat ships zero runtime dependencies and both module formats — `import` (ESM) and `require()` (CJS) both work, so there's no need for a dynamic `import()` workaround in CommonJS projects. A minified browser build (`dist/index.global.js`, global `Kenat`) is also published for plain `<script>` tag / CDN use via [unpkg](https://unpkg.com/kenat/).

### TypeScript Support

Kenat is written in TypeScript and ships its own `.d.ts` declarations — no additional type packages needed, and the types are guaranteed to match the implementation since they're generated from the same source, not hand-maintained separately.

```ts
import Kenat from 'kenat';
import type { EthiopianDate, Holiday } from 'kenat';

const today: Kenat = new Kenat();
const date: EthiopianDate = today.getEthiopian();
```

### Import Options

```js
// Default import (Kenat class)
import Kenat from 'kenat';

// Named imports for utilities
import { 
  getHolidaysForYear, 
  getHolidaysInMonth,
  getHoliday,
  HolidayTags, 
  HolidayNames,
  toGeez, 
  toArabic,
  toEC, 
  toGC,
  diffBreakdown,
  getFastingPeriod,
  getFastingInfo,
  getFastingDays,
  getBahireHasab,
  monthNames,
  MonthGrid,
  Time
} from 'kenat';
```

---

## 🔰 Quick Start

Get today's Ethiopian date:

```js
import Kenat from 'kenat';

const today = new Kenat();

console.log(today.getEthiopian());
// → { year: 2018, month: 1, day: 8 }

console.log(today.format({ lang: 'english', showWeekday: true }));
// → "Thursday, Meskerem 8 2018"

// Get Gregorian equivalent
console.log(today.getGregorian());
// → { year: 2025, month: 9, day: 19 }

// Format with time
const withTime = today.setTime(8, 30, 'day');
console.log(withTime.format({ includeTime: true }));
// → "2018/1/8 8:30 day"
```

---

## 🧭 Design Principles

- **Immutable & chainable** — every method that "changes" a date (`.add()`, `.startOf()`, `.setTime()`, ...) returns a **new** `Kenat` instance rather than mutating the original. This makes chaining predictable and safe:

  ```js
  const future = new Kenat()
    .add(2, 'years')
    .add(3, 'months')
    .startOf('month');
  ```

- **Ethiopian-first, calendar-agnostic where it counts** — dates are stored internally as Ethiopian `{year, month, day}`, but every user-facing accessor and formatter (`getDate`, `format`, `toString`, `toISOString`) accepts a `{ calendar: 'ethiopian' | 'gregorian' }` option, so building calendar-switchable UIs doesn't require branching logic in your own code.
- **No hidden state** — options are always passed explicitly per call (`options = {}`), matching the rest of the library's style; there's no global or instance-level configuration to keep track of.

---

## ⛪ Bahire Hasab & Holiday System

### Get All Holidays for a Year

```js
import { getHolidaysForYear } from 'kenat';

const holidaysIn2017 = getHolidaysForYear(2017);

console.log(holidaysIn2017.find(h => h.key === 'fasika'));
```

```js
// Output for Fasika (Easter) in 2017
{
  key: 'fasika',
  tags: ['public', 'religious', 'christian'],
  movable: true,
  name: 'ፋሲካ',
  description: 'የኢየሱስ ክርስቶስን ከሙታን መነሣት ያከብራል።...',
  ethiopian: { year: 2017, month: 8, day: 12 },
  gregorian: { year: 2025, month: 4, day: 20 }
}
```

### Filter Holidays by Tag

```js
import { getHolidaysForYear, HolidayTags } from 'kenat';

const publicHolidays = getHolidaysForYear(2017, {
  filter: HolidayTags.PUBLIC
});

const religiousHolidays = getHolidaysForYear(2017, {
  filter: [HolidayTags.CHRISTIAN, HolidayTags.MUSLIM]
});
```

### Check if a Specific Date is a Holiday

```js
const meskel = new Kenat('2017/1/17');
console.log(meskel.isHoliday()); // → Returns the Meskel holiday object

const notHoliday = new Kenat('2017/1/18');
console.log(notHoliday.isHoliday()); // → []
```

### Access Bahire Hasab Calculations

```js
const bahireHasab = new Kenat('2017/1/1').getBahireHasab();

console.log(bahireHasab.evangelist);
// → { name: 'ማቴዎስ', remainder: 1 }

console.log(bahireHasab.movableFeasts.fasika.ethiopian);
// → { year: 2017, month: 8, day: 21 }
```

```js
// Full output of .getBahireHasab() for 2017
{
  ameteAlem: 7517,
  meteneRabiet: 1879,
  evangelist: { name: 'ማቴዎስ', remainder: 1 },
  newYear: { dayName: 'ረቡዕ', tinteQemer: 2 },
  medeb: 12,
  wenber: 11,
  abektie: 1,
  metqi: 29,
  bealeMetqi: { date: { year: 2017, month: 1, day: 29 }, weekday: 'Wednesday' },
  mebajaHamer: 3,
  nineveh: { year: 2017, month: 6, day: 3 },
  movableFeasts: {
    nineveh: { /* ... */ },
    abiyTsome: { /* ... */ },
    fasika: {
      key: 'fasika',
      tags: ['public', 'religious', 'christian'],
      movable: true,
      name: 'ፋሲካ',
      description: 'የኢየሱስ ክርስቶስን ከሙታን መነሣት ያከብራል።...',
      ethiopian: { year: 2017, month: 8, day: 12 },
      gregorian: { year: 2025, month: 4, day: 20 }
    },
    // ... other movable holidays
  }
}
```

> The Bahire Hasab engine correctly handles edge-case years where the traditional Metqi calculation lands on 0/30 (e.g. 2006 E.C.), so movable feast dates stay accurate every year.

---

## ➕ More API Examples

### Date Arithmetic

```js
const today = new Kenat();
const nextWeek = today.addDays(7);
const lastMonth = today.addMonths(-1);

// Fluent API
const future = today.add(2, 'years').add(3, 'months').add(15, 'days');
```

### Comparing Dates

```js
const a = new Kenat('2016/1/1');
const b = new Kenat('2016/2/5');

a.isBefore(b);    // → true
b.isAfter(a);     // → true
a.isSameDay(a);   // → true
a.isSameMonth(b); // → false (different months)
a.isSameYear(b);  // → true (both 2016)
```

### Start / End of a Period

`startOf`/`endOf` snap a date to the boundary of its day, month, or year — `endOf('year')` correctly returns Pagume 6 in leap years and Pagume 5 otherwise:

```js
const date = new Kenat('2016/5/15');

date.startOfMonth().getEthiopian(); // → { year: 2016, month: 5, day: 1 }
date.endOfMonth().getEthiopian();   // → { year: 2016, month: 5, day: 30 }

date.startOf('year').getEthiopian(); // → { year: 2016, month: 1, day: 1 }

new Kenat('2015/5/1').endOf('year').getEthiopian();
// → { year: 2015, month: 13, day: 6 }  (2015 is a leap year, so Pagume has 6 days)
```

### Date Difference & Distance API

```js
const a = new Kenat('2015/5/15');
const b = new Kenat('2012/5/15');

// Precise differences
console.log(a.diffInDays(b));    // → 1095
console.log(a.diffInYears(b));   // → 3

// Human-friendly distance
console.log(a.distanceTo(b, { units: ['years', 'months', 'days'], output: 'string' }));
// → "2 years 9 months 3 days"

// Distance from today to a given date
console.log(new Kenat('2018/1/1').distanceFromToday({ output: 'string' }));
```

### Calendar Generation

```js
// Monthly calendar
const calendar = Kenat.getMonthCalendar(2017, 1, { 
  useGeez: false, 
  weekdayLang: 'amharic' 
});

// Yearly calendar
const yearCalendar = Kenat.getYearCalendar(2017);

// Date range generation
const start = new Kenat('2017/1/1');
const end = new Kenat('2017/1/10');
const range = Kenat.generateDateRange(start, end);

// Print the current month as a grid to the console
new Kenat().printThisMonth();
```

### Fasting Periods

```js
import { getFastingPeriod, getFastingInfo } from 'kenat';

// Get Lent fasting period
const lent = getFastingPeriod('ABIY_TSOME', 2017);
console.log(lent);
// → { start: { year: 2017, month: 7, day: 16 }, end: { year: 2017, month: 8, day: 12 } }

// Get fasting information
const fastingInfo = getFastingInfo('NINEVEH', 2017);
```

### Holiday Distance Helpers

```js
import { HolidayNames } from 'kenat';

// Distance to next holiday
console.log(Kenat.distanceToHoliday(HolidayNames.fasika, { 
  direction: 'future', 
  units: ['days'], 
  output: 'string' 
}));
// → "358 days"
```

### Geez Numerals & Formatting

```js
import { toGeez } from 'kenat';

console.log(toGeez(2017)); // → "፳፻፲፯"

// Format in Geez
const date = new Kenat('2017/1/1');
console.log(date.formatInGeezAmharic()); // → "መስከረም ፩ ፳፻፲፯"
```

### Calendar Preference (Ethiopian / Gregorian)

If your app lets end users choose between the Ethiopian and Gregorian calendar, pass `calendar: 'gregorian'` to `format()`, `toString()`, `toISOString()`, or `getDate()` instead of branching with `if`/`else` at every call site:

```js
const date = new Kenat('2016/1/1');
const userPref = 'gregorian'; // e.g. from a user setting

date.format({ calendar: userPref });      // → "September 12, 2023"
date.getDate({ calendar: userPref });     // → { year: 2023, month: 9, day: 12 }
date.toISOString({ calendar: userPref }); // → "2023-09-12T06:00" (standard ISO 8601)

// Defaults to 'ethiopian' when omitted
date.format(); // → "መስከረም 1 2016"
```

> `toISOString({ calendar: 'gregorian' })` converts Kenat's Ethiopian 12-hour time to Gregorian 24-hour time (12:00 day → 06:00) and never appends the non-standard `+12h` suffix that the default Ethiopian-calendar ISO string uses for night times — the result is a genuine, parser-safe ISO 8601 string.

### Time Handling

```js
// Set Ethiopian time (12-hour system)
const withTime = new Kenat('2017/1/1').setTime(8, 30, 'day');
console.log(withTime.format({ includeTime: true }));
// → "2017/1/1 8:30 day"

// Convert to ISO format
console.log(withTime.toISOString());
// → "2017-01-01T08:30"
```

### Serialization

`Kenat` instances serialize cleanly with `JSON.stringify` via a built-in `toJSON()`:

```js
const date = new Kenat('2017/1/15');

console.log(date.toJSON());
// → {
//     ethiopian: { year: 2017, month: 1, day: 15 },
//     gregorian: { year: 2024, month: 9, day: 25 },
//     time: { hour: 12, minute: 0, period: 'day' }
//   }

console.log(JSON.stringify({ createdAt: date }));
// → '{"createdAt":{"ethiopian":{...},"gregorian":{...},"time":{...}}}'
```

---

## 📊 API Reference

### Core Classes

#### `Kenat` (Default Export)
Main class for Ethiopian date operations.

**Constructor:**
```js
new Kenat()                    // Current date
new Kenat('2017/1/1')         // Ethiopian date string
new Kenat({year: 2017, month: 1, day: 1}) // Date object
new Kenat(new Date())         // Gregorian Date object
```

**Access & Conversion**
- `getEthiopian()` - Returns `{year, month, day}`
- `getGregorian()` - Returns Gregorian equivalent
- `getDate({ calendar })` - Returns the date in `'ethiopian'` (default) or `'gregorian'`, no if/else needed
- `getCurrentTime()` - Returns the instance's `Time` object
- `setTime(hour, minute, period)` - Returns a new instance with the given Ethiopian time

**Formatting**
- `format(options)` - Format with various options, including `lang`, `showWeekday`, `useGeez`, `includeTime`, and `{ calendar: 'ethiopian' | 'gregorian' }`
- `toString(options)` - String representation of date + time; also accepts `{ calendar }`
- `formatInGeezAmharic()` - Amharic month name with Geez numerals
- `formatWithWeekday(lang, useGeez)` - Formatted string including the weekday name
- `formatShort()` - Compact `"yyyy/mm/dd"` format
- `toISOString(options)` - ISO-style date string; `{ calendar: 'gregorian' }` returns a standard ISO 8601 date
- `toJSON()` - Plain-object representation for `JSON.stringify`

**Comparison**
- `isBefore(other)` / `isAfter(other)` - Chronological comparison
- `isSameDay(other)` / `isSameMonth(other)` / `isSameYear(other)` - Granular equality checks
- `isLeapYear()` - Whether the instance's Ethiopian year is a leap year
- `weekday()` - Day-of-week index (0 = Sunday)

**Arithmetic & Period Boundaries**
- `add(amount, unit)` / `subtract(amount, unit)` - Chainable arithmetic (`unit`: `'days'|'months'|'years'`)
- `addDays(n)` / `addMonths(n)` / `addYears(n)` - Direct arithmetic shortcuts
- `startOf(unit)` / `endOf(unit)` - Snap to the start/end of `'day'`, `'month'`, or `'year'` (leap-year aware)
- `startOfMonth()` / `endOfMonth()` - Shortcuts for `startOf('month')` / `endOf('month')`
- `diffInDays(other)` / `diffInMonths(other)` / `diffInYears(other)` - Precise numeric differences
- `distanceTo(other, options)` - Human-friendly breakdown or string (`{ units, output, lang }`)
- `distanceFromToday(options)` - Distance from today to this instance

**Holidays & Liturgical Calendar**
- `isHoliday(options)` - Check if the date is a holiday
- `getBahireHasab()` - Get liturgical calculations for the instance's year

**Calendar Grids**
- `getMonthCalendar(year, month, useGeez)` - Instance-level month grid (defaults to the instance's own month)
- `printThisMonth(useGeez)` - Pretty-print the current month's calendar grid to the console

**Static Helpers**
- `Kenat.now()` - Same as `new Kenat()`
- `Kenat.getMonthCalendar(year, month, options)` - Generate a month calendar
- `Kenat.getYearCalendar(year, options)` - Generate a full year's calendar
- `Kenat.generateDateRange(start, end)` - Array of `Kenat` instances between two dates
- `Kenat.distanceToHoliday(holidayKey, options)` - Distance to a holiday occurrence
- `Kenat.formatDistance(breakdown, options)` - Format a distance breakdown as a human string

### Utility Functions

#### Date Conversion
- `toEC(year, month, day)` - Gregorian to Ethiopian
- `toGC(year, month, day)` - Ethiopian to Gregorian
- `toGeez(number)` - Convert to Geez numerals
- `toArabic(geezString)` - Convert from Geez numerals

#### Holiday System
- `getHolidaysForYear(year, options)` - Get all holidays for a year
- `getHolidaysInMonth(year, month, lang)` - Get holidays for a month
- `getHoliday(key, year)` - Get a specific holiday
- `HolidayTags` - Constants for filtering holidays
- `HolidayNames` - Constants for holiday keys

#### Fasting & Religious Calendar
- `getFastingPeriod(fastKey, year)` - Get fasting period dates
- `getFastingInfo(fastKey, year)` - Get fasting information
- `getFastingDays(fastKey, year)` - Get the list of individual fasting days
- `getBahireHasab(year)` - Get Bahire Hasab calculations

#### Calendar Generation
- `Kenat.getMonthCalendar(year, month, options)` - Generate month calendar
- `Kenat.getYearCalendar(year, options)` - Generate year calendar
- `Kenat.generateDateRange(start, end)` - Generate date range
- `MonthGrid.create(options)` - Create calendar grid

#### Distance & Arithmetic
- `diffBreakdown(dateA, dateB, options)` - Precise date difference
- `Kenat.distanceToHoliday(holidayKey, options)` - Distance to holiday

### Constants
- `HolidayTags` - Holiday category tags
- `HolidayNames` - Holiday name constants
- `monthNames` - Month name arrays in multiple languages (includes an English `gregorian` set)
- `FastingKeys` - Fasting period keys

For detailed method signatures and advanced usage, refer to the [full documentation](https://www.kenat.systems/).

---

## 🧱 Contribution Guide

1. Fork the repo & clone it.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Write your changes (in `src/*.ts`) and add tests in the `/tests` directory.
4. Run `npm run typecheck` and `npm test` to ensure everything passes.
5. If you're changing anything in `examples/`, run `npm run build` first — the examples import from `dist/`, not `src/`.
6. Open a Pull Request with your improvements or bug fix.

---

## 👨‍💻 Author

**Melaku Demeke**
- [GitHub](https://github.com/MelakuDemeke) ・ [LinkedIn](https://linkedin.com/in/melakudemeke)
- [Website](https://www.kenat.systems/) ・ [NPM Package](https://www.npmjs.com/package/kenat)

### Acknowledgments

Special thanks to the Ethiopian Orthodox Tewahedo Church for preserving the traditional Bahire Hasab calculations and to the open-source community for their contributions and feedback.

---

## 🙌 Contributors

Thanks to all the amazing people who have contributed to this project!

[![Contributors](https://contrib.rocks/image?repo=MelakuDemeke/kenat)](https://github.com/MelakuDemeke/kenat/graphs/contributors)

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
