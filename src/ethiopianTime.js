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

/**
 * Adds a duration to an Ethiopian time.
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} baseTime - The original Ethiopian time.
 * @param {{hours?: number, minutes?: number}} duration - The time to add.
 * @returns {{hour: number, minute: number, period: 'day' | 'night'}}
 */
export function addEthiopianTime(baseTime, duration) {
    const { hour, minute = 0, period } = baseTime;
    const { hours = 0, minutes = 0 } = duration;

    // Step 1: Convert to Gregorian 24hr
    const gregTime = toGregorianTime(hour, minute, period);

    // Step 2: Add duration
    let totalMinutes = gregTime.hour * 60 + gregTime.minute + (hours * 60) + minutes;

    // Step 3: Normalize to 0–1439 minutes (24 hrs)
    totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;

    const newHour = Math.floor(totalMinutes / 60);
    const newMinute = totalMinutes % 60;

    // Step 4: Convert back to Ethiopian time
    return toEthiopianTime(newHour, newMinute);
}
