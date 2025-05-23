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
```

Import and use:
```js
import Kenat, { gregorianToEthiopian, ethiopianToGregorian } from 'kenat';

// Convert Gregorian to Ethiopian
gregorianToEthiopian(2025, 5, 22); // { year: 2017, month: 9, day: 14 }

// Convert Ethiopian to Gregorian
ethiopianToGregorian(2017, 9, 14); // { year: 2025, month: 5, day: 22 }

// Use the Kenat class
const k = new Kenat('2017/9/14');
k.getGregorian(); // { year: 2025, month: 5, day: 22 }
k.format('amharic'); // "መስከረም-14-2017"
k.formatInGeezAmharic(); // "መስከረም ፲፬ ፳፻፲፯"

// Print the current Ethiopian month calendar
ew Kenat().printThisMonth();
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

