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

## 📌 Overview

**Kenat** (Amharic: ቀናት) is an all-in-one Ethiopian calendar library for JavaScript. It handles date conversion, formatting (including Geez numerals), time conversion, holidays, and calendar grids — everything you need to build Ethiopian calendar-powered apps.

---

## ✨ Features

* 🔄 **Bidirectional conversion**: Ethiopian ↔ Gregorian
* 🗕 Supports all **13 Ethiopian months**, including **Pagume**
* 🔀 Full **date arithmetic**: Add/subtract days, months, years
* 🌍 Localized formatting in **Amharic** and **English**
* 🔢 Convert numbers to **Geez numerals**
* 🕒 **Ethiopian ↔ Gregorian time** conversion
* 🗖 Calendar grid generation and printing
* 🇮 Built-in **Ethiopian holiday detection**
* 🔍 **Date diff**: years, months, days
* 🧢 Unit-tested, modular, and extendable

---

## 🚀 Installation

```bash
npm install kenat
```

---

## 🔰 Quick Start

```js
import Kenat, { toEC, toGC } from 'kenat';

const today = new Kenat();
console.log(today.getEthiopian());
// → { year: 2017, month: 9, day: 25 } (based on your system date)
```

---

## 🔄 Date Conversion

```js
const eth = toEC(2025, 5, 30);
console.log(eth);
// → { year: 2017, month: 9, day: 22 }

const greg = toGC(2017, 9, 22);
console.log(greg);
// → { year: 2025, month: 5, day: 30 }
```

---

## 🗕 Month Calendar Generation

```js
const calendar = today.getMonthCalendar();
console.log(calendar.slice(0, 2));
```

```js
[
  {
    ethiopian: { year: 2017, month: 9, day: 1, display: 'ግንቦት 1 2017' },
    gregorian: { year: 2025, month: 5, day: 9, display: '2025-05-09' }
  },
  ...
]
```

---

## 🕒 Time Support

```js
console.log(Kenat.formatEthiopianTime(today.getCurrentTime(), 'amharic'));
// → "02:03 ማታ"

today.setTime(3, 30, 'night');
```

---

## 💖 Holiday Detection

```js
import { getHolidaysInMonth } from 'kenat';

const holidays = getHolidaysInMonth(2016, 1);
console.log(holidays);
```

```bash
// Output for January 2016 (Ethiopian calendar)
[
  {
    key: 'enkutatash',
    month: 1,
    day: 1,
    movable: false,
    tags: [ 'public', 'cultural' ],
    name: { amharic: 'እንቁጣጣሽ', english: 'Ethiopian New Year (Enkutatash)' },
    description: 'Marks the start of the Ethiopian year; symbolizes renewal and the end of the rainy season.',
    ethiopian: { year: 2016, month: 1, day: 1 }
  },
  {
    key: 'moulid',
    movable: true,
    tags: [ 'religious', 'muslim' ],
    name: { amharic: 'መውሊድ', english: 'Birth of Prophet Mohammed (Moulid)' },
    description: 'Celebrates the birthday of the Prophet Mohammed.',
    ethiopian: { year: 2016, month: 1, day: 16 },
    gregorian: { year: 2023, month: 9, day: 27 },
    note: null
  },
  {
    key: 'meskel',
    month: 1,
    day: 17,
    movable: false,
    tags: [ 'public', 'religious', 'christian' ],
    name: { amharic: 'መስቀል', english: 'Finding of the True Cross (Meskel)' },
    description: 'Commemorates the discovery of the True Cross by Empress Helena in the 4th century.',
    ethiopian: { year: 2016, month: 1, day: 17 }
  }
]
```

---

## ➕ Date Arithmetic

```js
const newDate = today.addDays(10);
console.log(newDate.toString());

const backOneMonth = today.addMonths(-1);
console.log(backOneMonth.getEthiopian());
```

---

## 📏 Difference Between Dates

```js
const a = new Kenat('2015/5/15');
const b = new Kenat('2012/5/15');

console.log(a.diffInDays(b));    // → 1095
console.log(a.diffInMonths(b));  // → 39
console.log(a.diffInYears(b));   // → 3
```

---

## 🗓 Full Year Calendar

```js
const yearGrid = Kenat.getYearCalendar(2016);
console.log(yearGrid.length);
console.log(yearGrid[0].monthName);
```

---

## 📊 API Reference

Refer to the [full documentation](https://github.com/MelakuDemeke/kenat) for method details, utility functions, and component usage.

---

## 🎉 Coming Soon

* ✅ python, php, dart, and other language suport
* ↔ Better Islamic date estimation
* 📱 React/Flutter UI components
* ⚙️ `.ics` iCalendar export

---

## 🧱 Contribution Guide

1. Fork the repo & clone it
2. Create a new branch: `git checkout -b feature/your-feature`
3. Write your changes + tests in `/tests`
4. Run `npm test` before committing
5. Open a PR with your improvements or bugfix

---

## 👨‍💻 Author

**Melaku Demeke**
[GitHub](https://github.com/MelakuDemeke) ・ [LinkedIn](https://www.linkedin.com/in/melakudemeke/)

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.
