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

## ✨ Features

- 🔄 **Bidirectional Conversion**: Seamlessly convert between Ethiopian and Gregorian calendars with high precision.
- 🗂️ **Complete Holiday System**: Pre-loaded with all public, religious (Christian & Muslim), and cultural holidays.
- 🔎 **Advanced Holiday Filtering**: Easily filter holidays by tags (e.g., public, christian, muslim).
- 📖 **Authentic Liturgical Calculations**: Implements Bahire Hasab (ባሕረ ሃሳብ) for movable feasts and fasts.
- 🔠 **Localized Formatting**: Display dates in both Amharic and English with multiple format options.
- 🔢 **Geez Numerals**: Convert numbers and dates to traditional Geez numeral equivalents.
- ➕ **Full Date Arithmetic**: Add or subtract days, months, and years with support for the 13-month calendar.
- ↔️ **Date Difference & Distance API**: Calculate precise differences and human-friendly distances between dates.
- 🕒 **Ethiopian Time**: Convert between 24-hour Gregorian and 12-hour Ethiopian time systems.
- 🗓️ **Calendar Generation**: Create monthly or yearly calendar grids with customizable options.
- 🕌 **Fasting Periods**: Calculate Orthodox Christian fasting periods and Islamic Ramadan dates.
- 📅 **Date Range Generation**: Generate arrays of dates between two Ethiopian dates.
- 🏷️ **Holiday Distance Helpers**: Find distances to next/previous holiday occurrences.
- 📊 **Multiple Output Formats**: Support for ISO strings, custom formatting, and structured data.

---

## 🚀 Installation

```bash
npm install kenat
```

### TypeScript Support

Kenat includes full TypeScript definitions. No additional type packages needed!

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
  HolidayTags, 
  toGeez, 
  toEC, 
  toGC,
  diffBreakdown,
  getFastingPeriod,
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

date.format({ calendar: userPref }); // → "September 12, 2023"
date.getDate({ calendar: userPref }); // → { year: 2023, month: 9, day: 12 }
date.toISOString({ calendar: userPref }); // → "2023-09-12T12:00" (standard ISO 8601)

// Defaults to 'ethiopian' when omitted
date.format(); // → "መስከረም 1 2016"
```

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

**Key Methods:**
- `getEthiopian()` - Returns `{year, month, day}`
- `getGregorian()` - Returns Gregorian equivalent
- `getDate({ calendar })` - Returns the date in `'ethiopian'` (default) or `'gregorian'`, no if/else needed
- `format(options)` - Format with various options, including `{ calendar: 'ethiopian' | 'gregorian' }`
- `add(amount, unit)` / `subtract(amount, unit)` - Date arithmetic
- `distanceTo(other, options)` - Human-friendly distance calculation
- `isHoliday(options)` - Check if date is a holiday
- `getBahireHasab()` - Get liturgical calculations
- `setTime(hour, minute, period)` - Set Ethiopian time

### Utility Functions

#### Date Conversion
- `toEC(year, month, day)` - Gregorian to Ethiopian
- `toGC(year, month, day)` - Ethiopian to Gregorian
- `toGeez(number)` - Convert to Geez numerals
- `toArabic(geezString)` - Convert from Geez numerals

#### Holiday System
- `getHolidaysForYear(year, options)` - Get all holidays for a year
- `getHolidaysInMonth(year, month, lang)` - Get holidays for a month
- `getHoliday(key, year)` - Get specific holiday
- `HolidayTags` - Constants for filtering holidays
- `HolidayNames` - Constants for holiday keys

#### Fasting & Religious Calendar
- `getFastingPeriod(fastKey, year)` - Get fasting period dates
- `getFastingInfo(fastKey, year)` - Get fasting information
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
- `monthNames` - Month name arrays in multiple languages
- `FastingKeys` - Fasting period keys

For detailed method signatures and advanced usage, refer to the [full documentation](https://www.kenat.systems/).

---

## 🧱 Contribution Guide

1. Fork the repo & clone it.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Write your changes and add tests in the `/tests` directory.
4. Run `npm test` to ensure everything passes.
5. Open a Pull Request with your improvements or bug fix.

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


