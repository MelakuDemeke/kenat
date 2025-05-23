# Kenat/ ቀናት
![banner](assets/img/kenatBanner.png)

![GitHub repo size](https://img.shields.io/github/repo-size/MelakuDemeke/kenat)
![GitHub issues](https://img.shields.io/github/issues/MelakuDemeke/kenat)
![GitHub Repo stars](https://img.shields.io/github/stars/MelakuDemeke/kenat?logo=github&style=flat)
![GitHub forks](https://img.shields.io/github/forks/MelakuDemeke/kenat?logo=github&style=falt)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/MelakuDemeke/kenat?logo=github)

---

## Overview
Kenat (ቀናት) is a JavaScript library for working with the Ethiopian calendar. It provides conversion between Ethiopian and Gregorian dates, date formatting (including Geez numerals), and calendar utilities. Ideal for Ethiopian apps, websites, and tools.

## Features
- Convert between Ethiopian and Gregorian dates
- Accepts and returns JavaScript `Date` objects
- TODO: Parse and format ISO-8601 (`YYYY-MM-DD`)
- TODO: Date arithmetic: add/subtract days, months, years
- Validate Ethiopian dates (including Pagume)
- Leap year helpers for both calendars
- Localized formatting (Amharic, English, etc.)
- Display dates in Geez numerals
- Generate and print Ethiopian month calendars


## Usage

Install via npm:
```bash
npm install kenat
````

Import and use:

```js
import Kenat, { gregorianToEthiopian, ethiopianToGregorian } from 'kenat';

const k = new Kenat();

// Get Ethiopian date
const ethDate = k.getEthiopian();
console.log('Current Ethiopian date:', ethDate);
```

Output:

```bash
Current Ethiopian date: { year: 2017, month: 9, day: 15 }
```

---

```js
// Convert Ethiopian to Gregorian
const gregDate = ethiopianToGregorian(ethDate.year, ethDate.month, ethDate.day);
console.log('Converted back to Gregorian:', gregDate);
```

Output:

```bash
Converted back to Gregorian: { year: 2025, month: 5, day: 23 }
```

---

```js
// Convert Gregorian to Ethiopian for today
const today = new Date();
const ethFromGreg = gregorianToEthiopian(today.getFullYear(), today.getMonth() + 1, today.getDate());
console.log('Gregorian to Ethiopian for today:', ethFromGreg);
```

Output:

```bash
Gregorian to Ethiopian for today: { year: 2017, month: 9, day: 15 }
```

---

```js
// Test Kenat string output
console.log('Kenat toString():', k.toString());
```

Output:

```bash
Kenat toString(): Ethiopian: 2017-9-15
```

---

```js
// Get month calendar for Ethiopian year and month
const calendar = k.getMonthCalendar();
console.log(`Month calendar for ${ethDate.year}/${ethDate.month}:`);
console.log(calendar.slice(0, 3)); // show first 3 days only
```

Output:

```bash
Month calendar for 2017/9:
[
  {
    ethiopian: { year: 2017, month: 9, day: 1, display: 'ግንቦት 1 2017' },
    gregorian: { year: 2025, month: 5, day: 9, display: '2025-05-09' }
  },
  {
    ethiopian: { year: 2017, month: 9, day: 2, display: 'ግንቦት 2 2017' },
    gregorian: { year: 2025, month: 5, day: 10, display: '2025-05-10' }
  },
  {
    ethiopian: { year: 2017, month: 9, day: 3, display: 'ግንቦት 3 2017' },
    gregorian: { year: 2025, month: 5, day: 11, display: '2025-05-11' }
  }
]
```

---

```js
// Get month calendar with Geez numerals
const calendarGeez = k.getMonthCalendar(ethDate.year, ethDate.month, true);
console.log('Calendar with Geez numerals (first 3 days):');
console.log(calendarGeez.slice(0, 3));
```

Output:

```bash
Calendar with Geez numerals (first 3 days):
[
  {
    ethiopian: { year: 2017, month: 9, day: 1, display: 'ግንቦት ፩ ፳፻፲፯' },
    gregorian: { year: 2025, month: 5, day: 9, display: '2025-05-09' }
  },
  {
    ethiopian: { year: 2017, month: 9, day: 2, display: 'ግንቦት ፪ ፳፻፲፯' },
    gregorian: { year: 2025, month: 5, day: 10, display: '2025-05-10' }
  },
  {
    ethiopian: { year: 2017, month: 9, day: 3, display: 'ግንቦት ፫ ፳፻፲፯' },
    gregorian: { year: 2025, month: 5, day: 11, display: '2025-05-11' }
  }
]
```

---

```js
// Print current Ethiopian month calendar (no Geez)
console.log('Printing current Ethiopian month calendar (no Geez):');
k.printThisMonth(false);
```

Output:

```bash
Printing current Ethiopian month calendar (no Geez):

   ግንቦት 2017
Mo  Tu  We  Th  Fr  Sa  Su
                     1/ 9  2/10  3/11
 4/12  5/13  6/14  7/15  8/16  9/17 10/18
11/19 12/20 13/21 14/22 15/23 16/24 17/25
18/26 19/27 20/28 21/29 22/30 23/31 24/ 1
25/ 2 26/ 3 27/ 4 28/ 5 29/ 6 30/ 7
```

---

```js
// Print current Ethiopian month calendar (with Geez)
console.log('Printing current Ethiopian month calendar (with Geez):');
k.printThisMonth(true);
```

Output:

```bash
Printing current Ethiopian month calendar (with Geez):

   ግንቦት ፳፻፲፯
Mo  Tu  We  Th  Fr  Sa  Su
                    ፩፩/ 9 ፩፪/10 ፩፫/11
፩፬/12 ፩፭/13 ፩፮/14 ፩፯/15 ፩፰/16 ፩፱/17 ፩፲/18
፲፩/19 ፲፪/20 ፲፫/21 ፲፬/22 ፲፭/23 ፲፮/24 ፲፯/25
፲፰/26 ፲፱/27 ፩፳/28 ፳፩/29 ፳፪/30 ፳፫/31 ፳፬/ 1
፳፭/ 2 ፳፮/ 3 ፳፯/ 4 ፳፰/ 5 ፳፱/ 6 ፩፴/ 7
```

## Contribution Guide
1. Fork the repository and clone it locally.
2. Create a new branch for your feature or bugfix.
3. Write clear, tested code and update/add tests in `tests/`.
4. Submit a pull request with a clear description of your changes.
5. For major changes, open an issue first to discuss your proposal.

## Contributors
- Melaku Demeke ([GitHub](https://github.com/MelakuDemeke))

## License
MIT License. See [LICENSE](LICENSE) for details.

