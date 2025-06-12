# Kenat / ቀናት ![NPM Version](https://img.shields.io/npm/v/kenat)

![banner](assets/img/kenatBanner.png)

![Build Status](https://github.com/MelakuDemeke/kenat/actions/workflows/test.yml/badge.svg?branch=main)
![npm bundle size](https://img.shields.io/bundlephobia/min/kenat)
![GitHub issues](https://img.shields.io/github/issues/MelakuDemeke/kenat)
![GitHub Repo stars](https://img.shields.io/github/stars/MelakuDemeke/kenat?logo=github&style=flat)
![GitHub forks](https://img.shields.io/github/forks/MelakuDemeke/kenat?logo=github&style=falt)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/MelakuDemeke/kenat?logo=github)
[![npm downloads](https://img.shields.io/npm/dm/kenat.svg?style=flat-square)](https://www.npmjs.com/package/kenat)

---

# Kenat / ቀናት

📌 **Overview**  
Kenat (Amharic: ቀናት) is a comprehensive JavaScript library for the Ethiopian calendar. It provides a complete toolset for developers, handling date conversions, advanced formatting, full date arithmetic, and a powerful, authentic holiday calculation system based on the traditional **Bahire Hasab (ባሕረ ሃሳብ)**.

---

## ✨ Features

- 🔄 **Bidirectional Conversion**: Seamlessly convert between Ethiopian and Gregorian calendars.
- 🗂️ **Complete Holiday System**: Pre-loaded with all public, religious (Christian & Muslim), and cultural holidays.
- 🔎 **Advanced Holiday Filtering**: Easily filter holidays by tags (e.g., public, christian, muslim).
- 📖 **Authentic Liturgical Calculations**: Implements Bahire Hasab for movable feasts and fasts.
- 🔠 **Localized Formatting**: Display dates in both Amharic and English.
- 🔢 **Geez Numerals**: Convert numbers and dates to traditional Geez numeral equivalents.
- ➕ **Full Date Arithmetic**: Add or subtract days, months, and years with support for the 13-month calendar.
- ↔️ **Date Difference**: Calculate precise differences between two dates.
- 🕒 **Ethiopian Time**: Convert between 24-hour Gregorian and 12-hour Ethiopian time.
- 🗓️ **Calendar Generation**: Create monthly or yearly calendar grids.

---

## 🚀 Installation

```bash
npm install kenat
````

---

## 🔰 Quick Start

Get today’s Ethiopian date:

```js
import Kenat from 'kenat';

const today = new Kenat();

console.log(today.getEthiopian());
// → { year: 2017, month: 9, day: 26 }

console.log(today.format({ lang: 'english', showWeekday: true }));
// → "Friday, Ginbot 26 2017"
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
  ethiopian: { year: 2017, month: 8, day: 21 },
  gregorian: { year: 2025, month: 4, day: 29 }
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
      ethiopian: { year: 2017, month: 8, day: 21 },
      gregorian: { year: 2025, month: 4, day: 29 }
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
```

### Date Difference

```js
const a = new Kenat('2015/5/15');
const b = new Kenat('2012/5/15');

console.log(a.diffInDays(b));    // → 1095
console.log(a.diffInYears(b));   // → 3
```

### Geez Numerals

```js
import { toGeez } from 'kenat';

console.log(toGeez(2017)); // → "፳፻፲፯"
```

---

## 📊 API Reference

Refer to the full documentation site for method details, utility functions, and live examples.

---

## 🎉 Coming Soon

* ✅ Ethiopian Seasons (Tseday, Bega, Kiremt, Meher)
* ✅ Helpers like `.isSameMonth()` and `.startOfYear()`
* 🚀 Multi-language ports (Python, PHP, Dart)
* ⚙️ `.ics` iCalendar export

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
[GitHub](https://github.com) ・ [LinkedIn](https://linkedin.com)

---

## 📄 License

MIT — see `LICENSE` for details.


