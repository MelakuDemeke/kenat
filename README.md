# Kenat / ቀናት ![NPM Version](https://img.shields.io/npm/v/kenat)


![banner](assets/img/kenatBanner.png)


![Build Status](https://github.com/MelakuDemeke/kenat/actions/workflows/test.yml/badge.svg?branch=main)
![npm bundle size](https://img.shields.io/bundlephobia/min/kenat)
![GitHub issues](https://img.shields.io/github/issues/MelakuDemeke/kenat)
![GitHub Repo stars](https://img.shields.io/github/stars/MelakuDemeke/kenat?logo=github&style=flat)
![GitHub forks](https://img.shields.io/github/forks/MelakuDemeke/kenat?logo=github&style=falt)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/MelakuDemeke/kenat?logo=github)
[![npm downloads](https://img.shields.io/npm/dm/my-awesome-package.svg?style=flat-square)](https://www.npmjs.com/package/kenat)
---

## Overview

Kenat (ቀናት) is a JavaScript library for working with the Ethiopian calendar. It provides conversion between Ethiopian and Gregorian dates, date formatting (including Geez numerals), and calendar utilities. Ideal for Ethiopian apps, websites, and tools.

## Features

- 🔄 Convert between **Ethiopian ↔ Gregorian** dates
- 📆 Full **Ethiopian calendar support** with leap years
- 🧮 Date arithmetic: **add/subtract days, months, years**
- 🌐 Localized formatting (Amharic, English)
- 🕒 **Time conversion** between Ethiopian and Gregorian clocks
- 🔢 Format numbers and dates in **Geez numerals**
- 🗓 Generate/print **calendar grids** in Ethiopian format
- ✅ Validate Ethiopian dates and handle **Pagume**
- 📦 Lightweight and framework-agnostic

---

## Installation

```bash
npm install kenat
````

---

## Quick Usage

```js
import Kenat, { toEC, toGC } from 'kenat';

const k = new Kenat();
console.log(k.getEthiopian()); // { year: 2017, month: 9, day: 23 }
```

---

### 🔄 Date Conversion

```js
const eth = toEC(2025, 5, 30);
console.log(eth); // { year: 2017, month: 9, day: 22 }

const greg = toGC(2017, 9, 22);
console.log(greg); // { year: 2025, month: 5, day: 30 }
```

---

### 📅 Month Calendar

```js
const calendar = k.getMonthCalendar();
console.log(calendar.slice(0, 2));
```

Output:

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

### 🕒 Time Support

```js
console.log(Kenat.formatEthiopianTime(k.getCurrentTime(), 'amharic')); // ፩፩:00 ጠዋት
```

---

### 📆 Print Month (ASCII Grid)

```js
k.printThisMonth(false); // without Geez numerals
k.printThisMonth(true);  // with Geez numerals
```

---

### ➕ Date Arithmetic

```js
k.addDays(10);     // 10 days forward
k.addMonths(-1);   // 1 month back
k.addYears(2);     // 2 years forward
```

---

### 📏 Difference Between Dates

```js
const a = new Kenat('2015/5/15');
const b = new Kenat('2012/5/15');

a.diffInDays(b);    // → 1095
a.diffInMonths(b);  // → 39
a.diffInYears(b);   // → 3
```

---

### 🧠 Format In Geez

```js
k.formatInGeezAmharic(); // ግንቦት ፳፫ ፳፻፲፯
```

---

### 🗓 Calendar Grid Generator

```js
const grid = Kenat.getMonthGrid({ year: 2017, month: 9, useGeez: true });
console.log(grid.headers); // Weekday headers
console.log(grid.days);    // Array of day objects
```

---

## API Reference

### Kenat Class

| Method                                                             | Description                                  |
| ------------------------------------------------------------------ | -------------------------------------------- |
| `new Kenat(dateStr?)`                                              | Create instance from `yyyy/mm/dd` or now     |
| `getEthiopian()`                                                   | Returns current Ethiopian date               |
| `getGregorian()`                                                   | Converts to Gregorian date                   |
| `format(lang?)`                                                    | Formatted Ethiopian date                     |
| `formatInGeezAmharic()`                                            | Formatted with Geez numerals                 |
| `printThisMonth(useGeez?)`                                         | Prints calendar grid to console              |
| `getMonthCalendar()`                                               | Returns detailed calendar array              |
| `addDays(n)` / `addMonths(n)` / `addYears(n)`                      | Add to current date                          |
| `diffInDays(other)` / `diffInMonths(other)` / `diffInYears(other)` | Compare dates                                |
| `setTime(hour, min, period)`                                       | Set Ethiopian time (1–12, minute, day/night) |
| `getCurrentTime()`                                                 | Get current time in Ethiopian format         |
| `toString()`                                                       | Returns string like `Ethiopian: yyyy-mm-dd`  |

### Utility Functions

| Function                              | Description                |
| ------------------------------------- | -------------------------- |
| `toEC(y, m, d)`       | → Ethiopian date           |
| `toGC(y, m, d)`       | → Gregorian date           |
| `toGeez(num)`                         | → Ge'ez numeral            |
| `toArabic(geezStr)`                   | → Arabic number from Ge'ez |
| `Kenat.getMonthGrid({ year, month })` | → Calendar grid            |

---

## Contribution Guide

1. Fork the repo & clone it
2. Create a new branch (`feature/xyz`)
3. Write code + add tests under `/tests`
4. Run `npm run test` and submit a PR
5. For major changes, file an issue first to discuss ideas

---

## Author

* Melaku Demeke ([GitHub](https://github.com/MelakuDemeke))

## License

MIT – see [LICENSE](LICENSE) for details.