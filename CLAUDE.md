# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Kenat (ቀናት) is a JavaScript library for the Ethiopian calendar: bidirectional Ethiopian↔Gregorian date conversion, formatting (Amharic/English, Geez numerals), date arithmetic, calendar grid generation, and a full Bahire Hasab (ባሕረ ሃሳብ) implementation for computing movable religious holidays and fasting periods. Pure JS, ESM (`"type": "module"`), no runtime dependencies. Hand-written `.d.ts` files in `types/` provide TypeScript support (not generated from JSDoc, though `tsc` does emit declarations from `src/**/*.js` on `prepack` as a build check).

## Commands

- `npm test` — run the full Jest suite (`node --experimental-vm-modules ... jest`, required because the codebase is ESM)
- `npx jest tests/bahireHasab.test.js` — run a single test file
- `npx jest -t "some test name"` — run tests matching a name pattern
- `npm run docs` — generate JSDoc HTML into `docs/`
- `npm run prepack` — emit type declarations via `tsc -p tsconfig.json` (runs automatically before `npm publish`/pack; useful to sanity-check JSDoc types against `src/`)

There is no lint script and no bundler config in the repo; `dist/` is a gitignored build artifact and not something to regenerate manually.

## Architecture

**Entry point:** `src/index.js` re-exports everything consumers use — the `Kenat` class as default export, plus named utility exports (`toEC`, `toGC`, `toGeez`, holiday/fasting functions, `MonthGrid`, `Time`, constants). When adding a new public function or class, it must be wired into this file to be usable by library consumers.

**Core module dependency shape** (roughly bottom-up):
- `constants.js` — static data: month/weekday names (English/Amharic), `HolidayTags`, `HolidayNames`, evangelist names, and the Bahire Hasab lookup tables (`movableHolidayTewsak`, `keyToTewsakMap`, `holidayInfo`, `movableHolidays`). Adding or changing a holiday starts here.
- `utils.js` — low-level validation (`validateNumericInputs`, `validateEthiopianDateObject`) and pure date-math helpers (day-of-year, leap-year checks, weekday calculation) shared across the codebase.
- `conversions.js` — the Ethiopian↔Gregorian conversion core (`toEC`, `toGC`, `toGCDate`, `fromDateToEC`), plus Hijri/Islamic-calendar conversion (`getHijriYear`, `hijriToGregorian`, via `Intl.DateTimeFormat` with the `islamic` calendar). All date validity checks happen here before conversion math runs.
- `dayArithmetic.js` — `addDays`/`addMonths`/`addYears` and diff/`diffBreakdown` functions operating on plain `{year,month,day}` Ethiopian date objects (not `Kenat` instances).
- `bahireHasab.js` — implements the traditional Bahire Hasab algorithm (`_calculateBahireHasabBase` is the single source of truth for `ameteAlem`, `medeb`, `wenber`, `metqi`, `ninevehDate`, etc.). Movable holiday dates are computed as offsets (`tewsak`) from the Nineveh date via `constants.js`'s `movableHolidayTewsak` table, then converted to Gregorian for the output.
- `holidays.js` — combines fixed-date holidays with `bahireHasab.js`'s movable feasts to answer "holidays in year/month" queries; supports tag-based filtering (`HolidayTags`).
- `fasting.js` — fasting period calculations (Lent, Ramadan, etc.) built on top of `bahireHasab.js` and Hijri conversion.
- `formatting.js` — pure formatting functions (standard, Geez/Amharic, with-weekday, ISO string) that take Ethiopian date objects and language/numeral options.
- `geezConverter.js` — Arabic numeral ↔ Geez numeral conversion (`toGeez`, `toArabic`), used by formatting and directly exported.
- `Time.js` — models Ethiopian 12-hour day/night time, with conversion to/from Gregorian 24-hour time.
- `MonthGrid.js` + `render/printMonthCalendarGrid.js` — build/print calendar-grid data structures (weeks of days with Ethiopian+Gregorian info) used by `Kenat.getMonthCalendar`/`getYearCalendar`.
- `Kenat.js` — the main class. Wraps an Ethiopian `{year,month,day}` plus a `Time` instance and delegates to the modules above for every operation (conversion, formatting, arithmetic, holidays, Bahire Hasab). Nearly all instance methods that "modify" the date return a **new** `Kenat` instance (immutable, fluent/chainable API — e.g. `today.add(2,'years').add(3,'months')`). Static helpers (`Kenat.getMonthCalendar`, `Kenat.getYearCalendar`, `Kenat.generateDateRange`, `Kenat.distanceToHoliday`) live on the class too.
- `errors/errorHandler.js` — all custom error classes extend `KenatError` and implement `toJSON()` for structured serialization (`InvalidEthiopianDateError`, `InvalidGregorianDateError`, `InvalidDateFormatError`, `UnrecognizedInputError`, `InvalidInputTypeError`, `InvalidTimeError`, `InvalidGridConfigError`, `UnknownHolidayError`, `GeezConverterError`). Prefer throwing one of these (with the right context, e.g. offending function/parameter name) over generic `Error`s when validating input.

**Key invariant:** functions outside `Kenat.js` operate on plain Ethiopian date objects (`{year, month, day}`), not `Kenat` instances — `Kenat` is a thin, stateful wrapper around these functional modules. When adding new date logic, prefer writing it as a pure function taking/returning plain date objects in the relevant module, then exposing it as a thin method on `Kenat`.

**Types:** `types/*.d.ts` mirror `src/*.js` file-for-file and must be updated by hand alongside source changes (they are not auto-generated for publishing; `tsc`'s `prepack` emission is a validation step, not the source of truth for what ships).

**Tests:** `tests/*.test.js` mirrors `src/` roughly one-to-one (e.g. `bahireHasab.test.js`, `conversions.test.js`, `holidays.test.js`). Bahire Hasab and holiday tests encode expected dates for specific known Ethiopian years — treat these as regression fixtures when touching the movable-feast algorithm.
