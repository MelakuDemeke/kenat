// Time.js
import { toGeez } from './geezConverter.js';
import { PERIOD_LABELS } from './constants.js';

export class Time {
    constructor(hour, minute = 0, period = 'day') {
        if (hour < 1 || hour > 12) throw new Error("Invalid Ethiopian hour");
        this.hour = hour;
        this.minute = minute;
        this.period = period;
    }

    static fromGregorian(hour, minute = 0) {
        const period = hour >= 6 && hour < 18 ? 'day' : 'night';
        let ethHour = hour - 6;
        if (ethHour < 0) ethHour += 12;
        else ethHour = ethHour % 12;
        ethHour = ethHour === 0 ? 12 : ethHour;
        return new Time(ethHour, minute, period);
    }

    toGregorian() {
        let hour = (this.hour % 12) + 6;
        if (this.period === 'night') hour += 12;
        if (hour >= 24) hour -= 24;
        return { hour, minute: this.minute };
    }

    add(duration) {
        const { hours = 0, minutes = 0 } = duration;
        const greg = this.toGregorian();
        let totalMinutes = greg.hour * 60 + greg.minute + hours * 60 + minutes;
        totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;
        const newHour = Math.floor(totalMinutes / 60);
        const newMinute = totalMinutes % 60;
        return Time.fromGregorian(newHour, newMinute);
    }

    subtract(duration) {
        const { hours = 0, minutes = 0 } = duration;
        const greg = this.toGregorian();
        let totalMinutes = greg.hour * 60 + greg.minute - (hours * 60 + minutes);
        totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;
        const newHour = Math.floor(totalMinutes / 60);
        const newMinute = totalMinutes % 60;
        return Time.fromGregorian(newHour, newMinute);
    }

    diff(otherTime) {
        const t1 = this.toGregorian();
        const t2 = otherTime.toGregorian();
        let diff = Math.abs(t1.hour * 60 + t1.minute - (t2.hour * 60 + t2.minute));
        if (diff > 720) diff = 1440 - diff;
        return {
            hours: Math.floor(diff / 60),
            minutes: diff % 60,
        };
    }

    format(options = {}) {
        const { useGeez = true, showPeriodLabel = true, zeroAsDash = true } = options;

        const formatNum = (num) => {
            if (useGeez) return toGeez(num);
            return num.toString().padStart(2, '0');
        };

        const hourStr = formatNum(this.hour);

        let minuteStr;
        if (zeroAsDash && this.minute === 0) {
            minuteStr = '_';
        } else if (this.minute < 10 && !useGeez) {
            minuteStr = formatNum(this.minute);
        } else {
            minuteStr = formatNum(this.minute);
        }

        const label = showPeriodLabel ? (PERIOD_LABELS[this.period] ?? '') : '';

        return `${hourStr}:${minuteStr}${label ? ' ' + label : ''}`;
    }
}
