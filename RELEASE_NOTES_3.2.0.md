# Kenat v3.2.0 — Distance API and Holiday Helpers

## Highlights
- Human-friendly Ethiopian date distance calculations
- Low-level diff utilities for advanced use cases
- Convenience helpers to compute distances to holidays

## What’s New
- Distance API on `Kenat` instances: `distanceTo(target, { units, output })`
  - Units: `years`, `months`, `days` (any combination)
  - Output: `string` (human-friendly) or `object` (structured)
- Low-level utility export: `diffBreakdown(ethiopianDateA, ethiopianDateB)`
- Holiday helpers:
  - `Kenat.distanceToHoliday(holidayName, { direction, units, output })`
  - `HolidayNames` enum for discoverable holiday keys

## Why it matters
Answer questions like “How long until Meskel?” or “How many days since 2016/1/1?” with concise, accurate, and Ethiopian-calendar–aware distance results. APIs are composable and suitable for both UI strings and logical calculations.

## Install
```bash
npm install kenat@^3.2.0
```

## Usage Examples
```js
import Kenat, { diffBreakdown, HolidayNames } from 'kenat';

// Today in Ethiopian calendar
const today = new Kenat();
console.log('Today (ET):', today.format({ lang: 'english' }));

// 1) Difference to a specific Ethiopian date — only days
console.log('Days since 2016/1/1:', today.distanceTo('2016/1/1', { units: ['days'], output: 'string' }));

// 2) Difference to a future date — months and days
const futureDate = { year: today.getEthiopian().year, month: 13, day: 5 };
console.log('Until 13/5 (this year):', today.distanceTo(futureDate, { units: ['months', 'days'], output: 'string' }));

// 3) Full breakdown (years, months, days) as object
const other = new Kenat('2015/5/10');
console.log('Breakdown (object):', today.distanceTo(other, { units: ['years', 'months', 'days'], output: 'object' }));

// 4) Using low-level diffBreakdown directly on Ethiopian date objects
console.log('diffBreakdown low-level:', diffBreakdown(today.getEthiopian(), other.getEthiopian()));

// 5) Holidays — days until next Ethiopian New Year (Enkutatash)
console.log('Days until next Enkutatash:', Kenat.distanceToHoliday(HolidayNames.enkutatash, { direction: 'future', units: ['days'], output: 'string' }));

// 6) Holidays — how long ago was Meskel (months and days)
console.log('Since last Meskel:', Kenat.distanceToHoliday(HolidayNames.meskel, { direction: 'past', units: ['months', 'days'], output: 'string' }));

// 7) Holidays — closest Meskel (auto chooses nearest past or future) full breakdown
console.log('Nearest Meskel (full):', Kenat.distanceToHoliday(HolidayNames.meskel, { direction: 'auto', units: ['years', 'months', 'days'], output: 'string' }));
```

## Compatibility
- No breaking changes expected to existing public APIs
- New exports: `diffBreakdown`, `HolidayNames`

## Upgrade Notes
- No code changes required for existing consumers
- For TypeScript users, ensure your types pick up the new exports if you rely on re-export patterns

## Testing
```bash
npm test --silent | cat
```

## Acknowledgements
Thanks to the community for feedback guiding these features.
