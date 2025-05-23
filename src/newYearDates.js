/**
 * Helper: Get Ethiopian New Year for a Gregorian year.
 */
function getEthiopianNewYearForGregorian(gYear) {
    const prevGYear = gYear - 1;
    const newYearDay = isGregorianLeapYear(prevGYear) ? 12 : 11;
    return {
        gregorianYear: gYear,
        month: 9,
        day: newYearDay
    };
}

/**
 * Returns the Gregorian date of the Ethiopian New Year for the given Ethiopian year.
 *
 * Ethiopian New Year usually falls on September 11 in Gregorian calendar,
 * but falls on September 12 if the previous Gregorian year was a leap year.
 *
 * @param {number} ethiopianYear - Ethiopian calendar year
 * @returns {{gregorianYear: number, month: number, day: number}} - Gregorian year, month (1-12), and day of Ethiopian New Year
 */
function getGregorianDateOfEthiopianNewYear(ethiopianYear) {
    const gregorianYear = ethiopianYear + 7;  // Ethiopian year roughly equals Gregorian year - 7 or -8

    // If the previous Gregorian year is a leap year, Ethiopian new year falls on Sept 12
    const newYearDay = isGregorianLeapYear(gregorianYear + 1) ? 12 : 11;
    return { gregorianYear, month: 9, day: newYearDay };
}