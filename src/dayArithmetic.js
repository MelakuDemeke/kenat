import { getEthiopianDaysInMonth, isEthiopianLeapYear } from './utils.js';

export function addDays(ethiopian, days) {
    let { year, month, day } = ethiopian;
    day += days;

    while (day > getEthiopianDaysInMonth(year, month)) {
        const daysInMonth = getEthiopianDaysInMonth(year, month);
        day -= daysInMonth;
        month += 1;

        if (month > 13) {
            month = 1;
            year += 1;
        }
    }

    return { year, month, day };
}

export function addMonths(ethiopian, months) {
    let { year, month, day } = ethiopian;

    let totalMonths = month + months;

    if (totalMonths > 0) {
        year += Math.floor((totalMonths - 1) / 13);
        month = ((totalMonths - 1) % 13) + 1;
    } else {
        year += Math.floor((totalMonths - 1) / 13);
        month = ((totalMonths - 1) % 13 + 13) % 13 + 1;
    }

    const daysInTargetMonth = getEthiopianDaysInMonth(year, month);
    if (day > daysInTargetMonth) {
        day = daysInTargetMonth;
    }

    return { year, month, day };
}

export function addYears(ethiopian, years) {
    let { year, month, day } = ethiopian;
    year += years;

    // Clamp Pagume 6 to Pagume 5 if the new year is not a leap year
    if (month === 13 && day === 6 && !isEthiopianLeapYear(year)) {
        day = 5;
    }

    return { year, month, day };
}

export function diffInDays(a, b) {
    // a, b are Ethiopian date objects { year, month, day }
    const totalDays = (eth) => {
        let days = 0;

        for (let y = 1; y < eth.year; y++) {
            days += 365;
            if (isEthiopianLeapYear(y)) days += 1;
        }

        for (let m = 1; m < eth.month; m++) {
            days += getEthiopianDaysInMonth(eth.year, m);
        }

        days += eth.day;

        return days;
    };

    return totalDays(a) - totalDays(b);
}

export function diffInMonths(a, b) {
    const totalMonthsA = a.year * 13 + (a.month - 1);
    const totalMonthsB = b.year * 13 + (b.month - 1);

    let diff = totalMonthsA - totalMonthsB;

    if (a.day < b.day) {
        diff -= 1;
    }

    return diff;
}

export function diffInYears(a, b) {
    const isAfter = (
        a.year > b.year ||
        (a.year === b.year && a.month > b.month) ||
        (a.year === b.year && a.month === b.month && a.day > b.day)
    );

    const later = isAfter ? a : b;
    const earlier = isAfter ? b : a;

    let diff = later.year - earlier.year;

    if (
        (later.month < earlier.month) ||
        (later.month === earlier.month && later.day < earlier.day)
    ) {
        diff -= 1;
    }

    if (!isAfter) diff = -diff;

    return diff === 0 ? 0 : diff;
}
