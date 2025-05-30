/**
 * Converts a Gregorian time (24hr format) to Ethiopian time.
 * @param {number} hour - Hour in 24hr format (0–23)
 * @param {number} minute - Minute (0–59)
 * @returns {{hour: number, minute: number, period: 'day' | 'night'}}
 */
export function toEthiopianTime(hour, minute = 0) {
    let ethHour = (hour + 6) % 12;
    ethHour = ethHour === 0 ? 12 : ethHour;
    const period = hour >= 6 && hour < 18 ? 'day' : 'night';
    return { hour: ethHour, minute, period };
}

/**
 * Converts Ethiopian time to Gregorian 24-hour format.
 * @param {number} ethHour - Ethiopian hour (1–12)
 * @param {number} minute - Minute (0–59)
 * @param {'day'|'night'} period
 * @returns {{hour: number, minute: number}}
 */
export function toGregorianTime(ethHour, minute = 0, period = 'day') {
    if (ethHour < 1 || ethHour > 12) throw new Error("Invalid Ethiopian hour");

    let hour = (ethHour % 12) + 6;
    if (period === 'night') hour += 12;
    if (hour >= 24) hour -= 24;
    return { hour, minute };
}


// TODO: Implement time arthmetic functions