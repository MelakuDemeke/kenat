
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

- 🔄 **Bidirectional conversion**: Ethiopian ↔ Gregorian
- 📅 Supports all **13 Ethiopian months**, including **Pagume**
- 📐 Full **date arithmetic**: Add/subtract days, months, years
- 🌍 Localized formatting in **Amharic** and **English**
- 🔢 Convert numbers to **Geez numerals**
- 🕒 **Ethiopian ↔ Gregorian time** conversion
- 📆 Calendar grid generation and printing
- 🕌 Built-in **Ethiopian holiday detection**
- 🔍 **Date diff**: years, months, days
- 🧪 Unit-tested, modular, and extendable

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

## 📅 Month Calendar Generation

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
// → "፩፪:00 ጠዋት" (or equivalent current time)

today.setTime(3, 30, 'night');
```

---

## 🖨️ Print Calendar Grid (Console)

```js
today.printThisMonth(false); // ← Plain numbers
today.printThisMonth(true);  // ← Geez numerals
```

```txt
   ግንቦት ፳፻፲፯
Mo  Tu  We  Th  Fr  Sa  Su
        1/09 2/10 3/11 4/12 5/13
6/14 7/15 8/16 ...
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

## 🧠 Format with Geez Numerals

```js
console.log(today.formatInGeezAmharic());
// → ግንቦት ፳፭ ፳፻፲፯
```

---

## 🗓 Generate Full Calendar Grid

```js
const grid = Kenat.getMonthGrid({ year: 2017, month: 9, useGeez: true });
console.log(grid.headers); // ["እሑድ", "ሰኞ", "ማክሰኞ", ...]
console.log(grid.days[0]); // First day object with holiday info
```

---

## 📚 API Reference

### 🔹 Kenat Class

| Method                                                             | Description                                  |
| ------------------------------------------------------------------ | -------------------------------------------- |
| `new Kenat(dateStr?)`                                              | Create instance from `yyyy/mm/dd` or now     |
| `getEthiopian()`                                                   | Returns Ethiopian date `{ year, month, day }`|
| `getGregorian()`                                                   | Converts to Gregorian `{ year, month, day }` |
| `format(lang?)`                                                    | Formatted Ethiopian date                     |
| `formatInGeezAmharic()`                                            | Formatted with Geez numerals                 |
| `printThisMonth(useGeez?)`                                         | Print ASCII calendar to console              |
| `getMonthCalendar()`                                               | Returns full month calendar array            |
| `addDays(n)` / `addMonths(n)` / `addYears(n)`                      | Adjust date                                  |
| `diffInDays(other)` / `diffInMonths(other)` / `diffInYears(other)` | Calculate difference                         |
| `setTime(hour, min, period)`                                       | Set Ethiopian time                           |
| `getCurrentTime()`                                                 | Get current EC time                          |
| `toString()`                                                       | String like `Ethiopian: yyyy-mm-dd hh:mm`    |

### 🔹 Utility Functions

| Function                                | Description                                |
|-----------------------------------------|--------------------------------------------|
| `toEC(year, month, day)`                | → Convert Gregorian → Ethiopian            |
| `toGC(year, month, day)`                | → Convert Ethiopian → Gregorian            |
| `toGeez(number)`                        | → Convert number to Geez numerals          |
| `toArabic(geezStr)`                     | → Convert Ge'ez numerals to Arabic         |
| `Kenat.getMonthGrid({ year, month })`   | → Calendar grid with weekday labels        |

---

## 🎉 Coming Soon

- ✅ TS/JS Doc website (built with Nextra)
- 🔄 Full Ethiopian-Gregorian time conversion
- 📱 React/Flutter UI calendar components
- 📦 iCalendar (.ics) export
- 🔭 Astronomical accuracy for Islamic holidays

---

## 🤝 Contribution Guide

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
