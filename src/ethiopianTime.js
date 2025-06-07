/**
 * Converts a given hour and minute in standard time to Ethiopian time.
 *
 * Ethiopian time starts at 6 AM standard time (0 Ethiopian hour).
 * The day period is from 6 AM to 6 PM, and the night period is from 6 PM to 6 AM.
 *
 * @param {number} hour - The hour in standard time (0-23).
 * @param {number} [minute=0] - The minute in standard time (0-59).
 * @returns {{ hour: number, minute: number, period: 'day' | 'night' }} 
 *   An object containing the Ethiopian hour, minute, and period ('day' or 'night').
 */
export function toEthiopianTime(hour, minute = 0) {
    const period = hour >= 6 && hour < 18 ? 'day' : 'night';
    let ethHour = hour - 6;
    if (ethHour < 0) ethHour += 12;
    else ethHour = ethHour % 12;

    ethHour = ethHour === 0 ? 12 : ethHour;

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

/**
 * Subtracts a duration from an Ethiopian time.
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} baseTime - The original Ethiopian time.
 * @param {{hours?: number, minutes?: number}} duration - The time to subtract.
 * @returns {{hour: number, minute: number, period: 'day' | 'night'}}
 */
export function subtractEthiopianTime(baseTime, duration) {
    const { hour, minute = 0, period } = baseTime;
    const { hours = 0, minutes = 0 } = duration;

    // Step 1: Convert to Gregorian 24hr time
    const gregTime = toGregorianTime(hour, minute, period);

    // Step 2: Subtract duration
    let totalMinutes = gregTime.hour * 60 + gregTime.minute - (hours * 60 + minutes);

    // Step 3: Normalize (wrap to 0–1439)
    totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;

    const newHour = Math.floor(totalMinutes / 60);
    const newMinute = totalMinutes % 60;

    // Step 4: Convert back to Ethiopian time
    return toEthiopianTime(newHour, newMinute);
}

/**
 * Calculates the time difference between two Ethiopian times.
 * Result is the absolute difference, in hours and minutes.
 * 
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} time1 
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} time2 
 * @returns {{hours: number, minutes: number}} difference
 */
export function getTimeDifference(time1, time2) {
    const t1 = toGregorianTime(time1.hour, time1.minute ?? 0, time1.period);
    const t2 = toGregorianTime(time2.hour, time2.minute ?? 0, time2.period);

    // Convert both to total minutes from start of day
    const total1 = t1.hour * 60 + t1.minute;
    const total2 = t2.hour * 60 + t2.minute;

    // Absolute difference in minutes
    let diff = Math.abs(total1 - total2);

    // Since time wraps in a 24-hour cycle, adjust if difference is > 12 hours
    if (diff > 720) diff = 1440 - diff;

    return {
        hours: Math.floor(diff / 60),
        minutes: diff % 60,
    };
}
