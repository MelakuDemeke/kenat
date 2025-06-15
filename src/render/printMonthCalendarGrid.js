import { monthNames } from '../constants.js';
import { toGeez } from '../geezConverter.js';
import { validateNumericInputs } from '../utils.js';
import { InvalidInputTypeError } from '../errors/errorHandler.js';

export function printMonthCalendarGrid(ethiopianYear, ethiopianMonth, calendarData, useGeez = false) {
    validateNumericInputs('printMonthCalendarGrid', { ethiopianYear, ethiopianMonth });
    if (ethiopianMonth < 1 || ethiopianMonth > 13) {
        throw new InvalidInputTypeError('printMonthCalendarGrid', 'ethiopianMonth', 'number between 1 and 13', ethiopianMonth);
    }
    if (!Array.isArray(calendarData) || calendarData.length === 0) {
        // This function would crash if calendarData is empty or not an array, so we check it.
        console.error("Calendar data is empty or invalid. Cannot print grid.");
        return;
    }

    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    console.log(`\n   ${monthNames.amharic[ethiopianMonth - 1]} ${useGeez ? toGeez(ethiopianYear) : ethiopianYear}`);
    console.log(daysOfWeek.join('  '));

    const firstDayGregorian = calendarData[0].gregorian;
    const jsDate = new Date(firstDayGregorian.year, firstDayGregorian.month - 1, firstDayGregorian.day);
    const weekDay = (jsDate.getDay() + 6) % 7; // Monday is 0

    let row = Array(weekDay).fill('    ');

    for (const day of calendarData) {
        const ethDay = useGeez ? toGeez(day.ethiopian.day).padStart(2, '፩') : String(day.ethiopian.day).padStart(2, ' ');
        const gregDay = String(day.gregorian.day).padStart(2, ' ');
        row.push(`${ethDay}/${gregDay}`);

        if (row.length === 7) {
            console.log(row.join(' '));
            row = [];
        }
    }

    if (row.length > 0) {
        console.log(row.join(' ').padEnd(27, ' ')); // Pad the last row
    }
}
