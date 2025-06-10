import { toGeez } from './geezConverter.js';
import { PERIOD_LABELS } from './constants.js';
import { validateNumericInputs, validateEthiopianTimeObject } from './utils.js';
import { InvalidTimeError } from './errors/errorHandler.js';

/**
 * Converts a given hour and minute in standard time to Ethiopian time.
 *
 * @param {number} hour - The hour in standard time (0-23).
 * @param {number} [minute=0] - The minute in standard time (0-59).
 * @returns {{ hour: number, minute: number, period: 'day' | 'night' }}
 * @throws {InvalidTimeError} If the Gregorian time is invalid.
 */
export function toEthiopianTime(hour, minute = 0) {
  validateNumericInputs('toEthiopianTime', { hour, minute });
  if (hour < 0 || hour > 23) {
    throw new InvalidTimeError(`Invalid Gregorian hour: ${hour}. Must be between 0 and 23.`);
  }
  if (minute < 0 || minute > 59) {
    throw new InvalidTimeError(`Invalid minute: ${minute}. Must be between 0 and 59.`);
  }

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
 * @throws {InvalidTimeError} If the Ethiopian time is invalid.
 */
export function toGregorianTime(ethHour, minute = 0, period = 'day') {
  validateNumericInputs('toGregorianTime', { ethHour, minute });
  if (ethHour < 1 || ethHour > 12) {
    throw new InvalidTimeError(`Invalid Ethiopian hour: ${ethHour}. Must be between 1 and 12.`);
  }
  if (period !== 'day' && period !== 'night') {
    throw new InvalidTimeError(`Invalid period: "${period}". Must be 'day' or 'night'.`);
  }

  let gregHour = ethHour % 12;
  if (period === 'day') {
    gregHour += 6;
  } else { // 'night'
    gregHour += 18;
  }
  gregHour = gregHour % 24;

  return { hour: gregHour, minute };
}

/**
 * Adds a duration to an Ethiopian time.
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} baseTime - The original Ethiopian time.
 * @param {{hours?: number, minutes?: number}} duration - The time to add.
 * @returns {{hour: number, minute: number, period: 'day' | 'night'}}
 */
export function addEthiopianTime(baseTime, duration) {
  validateEthiopianTimeObject(baseTime, 'addEthiopianTime', 'baseTime');
  if (typeof duration !== 'object' || duration === null) {
    throw new InvalidTimeError('Duration must be an object.');
  }
  const { hours = 0, minutes = 0 } = duration;
  validateNumericInputs('addEthiopianTime', { hours, minutes });

  const gregTime = toGregorianTime(baseTime.hour, baseTime.minute, baseTime.period);

  let totalMinutes = gregTime.hour * 60 + gregTime.minute + (hours * 60) + minutes;
  totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;

  const newHour = Math.floor(totalMinutes / 60);
  const newMinute = totalMinutes % 60;

  return toEthiopianTime(newHour, newMinute);
}

/**
 * Subtracts a duration from an Ethiopian time.
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} baseTime - The original Ethiopian time.
 * @param {{hours?: number, minutes?: number}} duration - The time to subtract.
 * @returns {{hour: number, minute: number, period: 'day' | 'night'}}
 */
export function subtractEthiopianTime(baseTime, duration) {
  const { hours = 0, minutes = 0 } = duration;
  return addEthiopianTime(baseTime, { hours: -hours, minutes: -minutes });
}

/**
 * Calculates the time difference between two Ethiopian times.
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} time1 
 * @param {{hour: number, minute?: number, period: 'day' | 'night'}} time2 
 * @returns {{hours: number, minutes: number}} difference
 */
export function getTimeDifference(time1, time2) {
  validateEthiopianTimeObject(time1, 'getTimeDifference', 'time1');
  validateEthiopianTimeObject(time2, 'getTimeDifference', 'time2');

  const t1 = toGregorianTime(time1.hour, time1.minute, time1.period);
  const t2 = toGregorianTime(time2.hour, time2.minute, time2.period);
  const total1 = t1.hour * 60 + t1.minute;
  const total2 = t2.hour * 60 + t2.minute;
  let diff = Math.abs(total1 - total2);

  if (diff > 720) diff = 1440 - diff;

  return {
    hours: Math.floor(diff / 60),
    minutes: diff % 60,
  };
}


/**
 * Formats an Ethiopian time object.
 * @param {Object} time - The Ethiopian time object { hour, minute, period }.
 * @param {Object} [options] - Formatting options.
 * @returns {string} The formatted time string.
 */
export function formatEthiopianTime(time, options = {}) {
  validateEthiopianTimeObject(time, 'formatEthiopianTime', 'time');

  const defaultLang = options.useGeez === false ? 'english' : 'amharic';
  const { lang = defaultLang, useGeez = true, showPeriodLabel = true, zeroAsDash = true } = options;

  const formatNum = (num) => {
    if (useGeez) return toGeez(num);
    return num.toString().padStart(2, '0');
  };

  const hourStr = formatNum(time.hour);

  let minuteStr;
  if (zeroAsDash && time.minute === 0) {
    minuteStr = '_';
  } else {
    minuteStr = useGeez ? toGeez(time.minute) : time.minute.toString().padStart(2, '0');
  }

  let periodLabel = '';
  if (showPeriodLabel) {
    if (lang === 'english') {
      periodLabel = time.period;
    } else {
      const amharicLabels = { day: 'ጠዋት', night: 'ማታ' };
      periodLabel = amharicLabels[time.period];
    }
  }

  const label = periodLabel ? ` ${periodLabel}` : '';
  return `${hourStr}:${minuteStr}${label}`;
}
