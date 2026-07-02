# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Kenat (ቀናት) is a TypeScript library for the Ethiopian calendar: bidirectional Ethiopian↔Gregorian date conversion, formatting (Amharic/English, Geez numerals), date arithmetic, calendar grid generation, and a full Bahire Hasab (ባሕረ ሃሳብ) implementation for computing movable religious holidays and fasting periods. ESM source (`"type": "module"`), no runtime dependencies. Written in TypeScript (`src/**/*.ts`) with strict mode on — types live inline in the source, not in a hand-maintained mirror. `tsup` bundles `src/index.ts` into `dist/` (ESM + CJS + a minified browser IIFE global) with `.d.ts`/`.d.cts` declarations; that `dist/` output is what's published to npm and what consumers actually import.

## Commands

- `npm test` — run the full Jest suite via `ts-jest` (`node --experimental-vm-modules ... jest`, required because the codebase is ESM)
- `npx jest tests/bahireHasab.test.ts` — run a single test file
- `npx jest -t "some test name"` — run tests matching a name pattern
- `npm run typecheck` — `tsc --noEmit`, the fast type-correctness check (no build output)
- `npm run build` — `tsup`, produces `dist/index.{js,cjs,global.js}` + `.d.ts`/`.d.cts`; run this before opening anything in `examples/`, which imports from `../../dist/index.js`, not `src/`
- `npm run docs` — generate API docs into `docs/` via `typedoc` (reads the TS source directly, not JSDoc comments)
- `npm run prepack` — `typecheck && build`, runs automatically before `npm pack`/`npm publish`
- Releasing: `npm run release:patch|minor|major` only bumps the version and pushes the tag (`git push --follow-tags`) — it does **not** publish. Pushing a `v*` tag triggers `.github/workflows/release.yml`, which re-typechecks/re-tests/re-builds and publishes with `npm publish --provenance`. Publishing from a local machine is not the supported flow anymore.

There is no lint script in the repo.

## Architecture

**Entry point:** `src/index.ts` re-exports everything consumers use — the `Kenat` class as default export, named utility exports (`toEC`, `toGC`, `toGeez`, holiday/fasting functions, `MonthGrid`, `Time`, constants), and `export type` re-exports of the public interfaces (`FormatOptions`, `MonthGridConfig`, `DiffBreakdown`, etc., defined alongside their owning module or in `src/types.ts` for cross-cutting domain types like `EthiopianDate`/`GregorianDate`/`Holiday`). When adding a new public function, class, or type, it must be wired into this file to be usable by library consumers.

**Core module dependency shape** (roughly bottom-up):
- `constants.ts` — static data: month/weekday names (English/Amharic), `HolidayTags`, `HolidayNames`, evangelist names, and the Bahire Hasab lookup tables (`movableHolidayTewsak`, `keyToTewsakMap`, `holidayInfo`, `movableHolidays`). Adding or changing a holiday starts here.
- `utils.ts` — low-level validation (`validateNumericInputs`, `validateEthiopianDateObject`) and pure date-math helpers (day-of-year, leap-year checks, weekday calculation) shared across the codebase.
- `conversions.ts` — the Ethiopian↔Gregorian conversion core (`toEC`, `toGC`, `toGCDate`, `fromDateToEC`), plus Hijri/Islamic-calendar conversion (`getHijriYear`, `hijriToGregorian`, via `Intl.DateTimeFormat` with the `islamic` calendar). All date validity checks happen here before conversion math runs.
- `dayArithmetic.ts` — `addDays`/`addMonths`/`addYears` and diff/`diffBreakdown` functions operating on plain `{year,month,day}` Ethiopian date objects (not `Kenat` instances).
- `bahireHasab.ts` — implements the traditional Bahire Hasab algorithm (`_calculateBahireHasabBase` is the single source of truth for `ameteAlem`, `medeb`, `wenber`, `metqi`, `ninevehDate`, etc.). Movable holiday dates are computed as offsets (`tewsak`) from the Nineveh date via `constants.ts`'s `movableHolidayTewsak` table, then converted to Gregorian for the output.
- `holidays.ts` — combines fixed-date holidays with `bahireHasab.ts`'s movable feasts to answer "holidays in year/month" queries; supports tag-based filtering (`HolidayTags`).
- `fasting.ts` — fasting period calculations (Lent, Ramadan, etc.) built on top of `bahireHasab.ts` and Hijri conversion.
- `formatting.ts` — pure formatting functions (standard, Geez/Amharic, with-weekday, ISO string) that take Ethiopian date objects and language/numeral options.
- `geezConverter.ts` — Arabic numeral ↔ Geez numeral conversion (`toGeez`, `toArabic`), used by formatting and directly exported.
- `Time.ts` — models Ethiopian 12-hour day/night time, with conversion to/from Gregorian 24-hour time.
- `nigs.json` — Orthodox Tewahedo monthly commemorations ("Nigs" days), grouped by day-of-month (`"1"`–`"30"`), each entry `{ id, name, description, major, negs: number[] }` where `negs` lists the Ethiopian months in which that day is a major feast. Consumed only by `MonthGrid.ts` (Christian mode). Imported via Node's native `with { type: 'json' }` attribute; `tsup`/esbuild inlines it into the bundle at build time, so it isn't shipped as a separate file. See `docs/fix.txt` for the schema rationale if reshaping it again — day-grouped, flat/uniform entries, `negs` always an array, no nested per-saint `events`.
- `MonthGrid.ts` + `render/printMonthCalendarGrid.ts` — build/print calendar-grid data structures (weeks of days with Ethiopian+Gregorian info, plus saints/Nigs days in `mode: 'christian'`) used by `Kenat.getMonthCalendar`/`getYearCalendar`.
- `Kenat.ts` — the main class. Wraps an Ethiopian `{year,month,day}` plus a `Time` instance and delegates to the modules above for every operation (conversion, formatting, arithmetic, holidays, Bahire Hasab). Nearly all instance methods that "modify" the date return a **new** `Kenat` instance (immutable, fluent/chainable API — e.g. `today.add(2,'years').add(3,'months')`). Static helpers (`Kenat.getMonthCalendar`, `Kenat.getYearCalendar`, `Kenat.generateDateRange`, `Kenat.distanceToHoliday`) live on the class too.
- `errors/errorHandler.ts` — all custom error classes extend `KenatError` and implement `toJSON()` for structured serialization (`InvalidEthiopianDateError`, `InvalidGregorianDateError`, `InvalidDateFormatError`, `UnrecognizedInputError`, `InvalidInputTypeError`, `InvalidTimeError`, `InvalidGridConfigError`, `UnknownHolidayError`, `GeezConverterError`). Prefer throwing one of these (with the right context, e.g. offending function/parameter name) over generic `Error`s when validating input. `KenatError` derives its serialized `type` from `this.constructor.name` — if the build ever mangles class identifiers (full `minify: true` without `keepNames`), this breaks silently. `tsup.config.ts` sets `keepNames: true` on every build target specifically to protect this; don't remove it without checking `toJSON()` output on a real minified build first.

**Key invariant:** functions outside `Kenat.ts` operate on plain Ethiopian date objects (`{year, month, day}`), not `Kenat` instances — `Kenat` is a thin, stateful wrapper around these functional modules. When adding new date logic, prefer writing it as a pure function taking/returning plain date objects in the relevant module, then exposing it as a thin method on `Kenat`.

**Types:** no separate `.d.ts` source tree — types live inline in the `.ts` source and are re-exported from `src/index.ts`. `tsup` generates `dist/index.d.ts`/`dist/index.d.cts` from that at build time; those generated files are the only `.d.ts` that ship, and they're not something to hand-edit.

**Tests:** `tests/*.test.ts` mirrors `src/` roughly one-to-one (e.g. `bahireHasab.test.ts`, `conversions.test.ts`, `holidays.test.ts`). Bahire Hasab and holiday tests encode expected dates for specific known Ethiopian years — treat these as regression fixtures when touching the movable-feast algorithm. Tests that deliberately pass invalid-typed input to check runtime validation use `as any` to bypass strict-mode compile errors while preserving the original intent.

## Examples

`examples/vanilla/*.html` are plain static pages (no bundler) that import from `../../dist/index.js` — run `npm run build` first, or they'll fail to load. `examples/vanilla/ethiopian-clock.html` is the one exception: it's self-contained (embeds a simplified reimplementation) and doesn't import the library at all.
