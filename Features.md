## add nextMonth, previousMonth, nextYear, previousYear methods for calendar navigation

## 🔹 Core Features to Add

These are essential for most calendar applications.

1. **Conversion Enhancements**

   * [ ] Support conversion both ways: `gregorianToEthiopian()` and `ethiopianToGregorian()` already exist—expose them more clearly in the API.
   * [ ] Accept JavaScript `Date` object directly (and return one too).
   * [ ] Add parsing and formatting helpers for ISO-8601 (`YYYY-MM-DD`).

2. **Date Arithmetic**

   * [ ] Add/subtract days, months, years on Ethiopian dates.
   * [ ] Get difference between two Ethiopian dates in days/months/years.

3. **Validation**

   * [ ] Validate Ethiopian dates (e.g. Pagume has 5 or 6 days only).
   * [ ] Throw helpful errors for invalid dates.

4. **Leap Year Helpers**

   * [ ] `.isLeapYear()` method for both Ethiopian and Gregorian dates.
   * [ ] `.daysInMonth()` method for any month/year combo.

---

## 🔹 Display & Formatting Features

5. **Localized Formatting**

   * [ ] Support `format()` for multiple languages: `amharic`, `english`, `oromo`, etc.
   * [ ] Add options for different formats: long (e.g. “15 Meskerem 2017”), short (e.g. “15/01/2017”), etc.

6. **Geez Numerals Everywhere**

   * [ ] Add option to display full date in Geez: "መስከረም ፲፭ ፳፻፲፯" and also time in Geez (if relevant).

7. **Pretty Today**

   * [ ] `Kenat.today()` returns a `Kenat` for current date.
   * [ ] `.isToday()` to check if the stored Ethiopian date is today.

---

## 🔹 Advanced Calendar Features

8. **Weekday Support**

   * [ ] `.getWeekday()` – returns day of the week in Amharic or English.
   * [ ] Support for calculating holidays based on weekdays (e.g. Meskel always falls on Wednesday one week after finding the true cross).

9. **Holiday Support**

   * [ ] Built-in support for major Ethiopian holidays (Fasika, Meskel, Timket, Enkutatash, etc.).
   * [ ] Ability to list holidays in a given Ethiopian year.

10. **Week Numbers**

* [ ] `.getWeekNumber()` for Ethiopian calendar (ISO-style).

---

## 🔹 Utility / Developer-Friendly Features

11. **Static Utilities**

* [ ] `Kenat.isValidEthiopianDate(y, m, d)`
* [ ] `Kenat.parse(string)` to convert from formatted string.

12. **CLI Tool (Optional)**

* [ ] CLI tool to convert and format dates (`kenat convert 2017/01/15 --to=gregorian`).

13. **Calendar View Generator**

* [ ] Function to return an array of days for a given month (e.g., for building UIs).
* [ ] Optional metadata (weekday, holiday, isToday, etc.).

---

## Bonus / Fun Features

14. **Date Range Generator**

* [ ] Generate all dates between two Ethiopian dates.

15. **Countdown to Next Holiday**

* [ ] `.daysUntil('meskel')` or `.daysUntilNextHoliday()`

16. **Ethiopian Time Support**

* [ ] Format times in Ethiopian 12-hour system (e.g., “3:00 in the morning” = 9:00 AM Gregorian)