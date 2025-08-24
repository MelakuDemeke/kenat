import { Kenat } from '../src/Kenat.js';

describe('Method Chaining Tests', () => {
    test('should support chaining add operations', () => {
        const date = new Kenat('2017/1/1');
        const future = date.add(7, 'days').add(1, 'months').add(1, 'years');

        expect(future.getEthiopian()).toEqual({ year: 2018, month: 2, day: 8 });
    });

    test('should support chaining subtract operations', () => {
        const date = new Kenat('2017/1/1');
        const past = date.subtract(7, 'days').subtract(1, 'months').subtract(1, 'years');

        expect(past.getEthiopian()).toEqual({ year: 2015, month: 11, day: 29 });
    });

    test('should support mixed add and subtract operations', () => {
        const date = new Kenat('2017/1/1');
        const result = date.add(7, 'days').subtract(1, 'months').add(1, 'years');

        expect(result.getEthiopian()).toEqual({ year: 2017, month: 13, day: 5 });
    });

    test('should preserve time during arithmetic operations', () => {
        const date = new Kenat('2017/1/1', { hour: 3, minute: 30, period: 'day' });
        const future = date.add(7, 'days').add(1, 'months');

        expect(future.getEthiopian()).toEqual({ year: 2017, month: 2, day: 8 });
        expect(future.time.hour).toBe(3);
        expect(future.time.minute).toBe(30);
        expect(future.time.period).toBe('day');
    });

    test('should support chaining with startOf and endOf', () => {
        const date = new Kenat('2017/6/15');
        const result = date.startOf('month').add(7, 'days').endOf('day');

        expect(result.getEthiopian()).toEqual({ year: 2017, month: 6, day: 8 });
        expect(result.time.hour).toBe(12);
        expect(result.time.period).toBe('night');
    });

    test('should support chaining with setTime', () => {
        const date = new Kenat('2017/1/1');
        const result = date.add(7, 'days').setTime(6, 30, 'night').add(1, 'months');

        expect(result.getEthiopian()).toEqual({ year: 2017, month: 2, day: 8 });
        expect(result.time.hour).toBe(6);
        expect(result.time.minute).toBe(30);
        expect(result.time.period).toBe('night');
    });

    test('should maintain immutability - original date unchanged', () => {
        const original = new Kenat('2017/1/1');
        const modified = original.add(7, 'days').add(1, 'months');

        expect(original.getEthiopian()).toEqual({ year: 2017, month: 1, day: 1 });
        expect(modified.getEthiopian()).toEqual({ year: 2017, month: 2, day: 8 });
    });

    test('should handle leap year correctly in chaining', () => {
        const date = new Kenat('2015/13/6'); // Leap year Pagume
        const result = date.add(1, 'days').add(1, 'months');

        expect(result.getEthiopian()).toEqual({ year: 2016, month: 2, day: 1 });
    });

    test('should handle month boundaries correctly in chaining', () => {
        const date = new Kenat('2017/1/30'); // Last day of Meskerem
        const result = date.add(1, 'days').add(1, 'months');

        expect(result.getEthiopian()).toEqual({ year: 2017, month: 3, day: 1 });
    });

    test('should support complex chaining operations', () => {
        const date = new Kenat('2017/1/1');
        const result = date
            .startOf('month')
            .add(14, 'days')
            .setTime(12, 0, 'day')
            .add(1, 'months')
            .endOf('day')
            .add(1, 'years');

        expect(result.getEthiopian()).toEqual({ year: 2018, month: 2, day: 15 });
        expect(result.time.hour).toBe(12);
        expect(result.time.period).toBe('night');
    });

    test('should throw error for invalid unit in add()', () => {
        const date = new Kenat('2017/1/1');
        expect(() => date.add(1, 'weeks')).toThrow('Invalid unit: weeks');
    });

    test('should throw error for invalid unit in startOf()', () => {
        const date = new Kenat('2017/1/1');
        expect(() => date.startOf('week')).toThrow('Invalid unit: week');
    });

    test('should throw error for invalid unit in endOf()', () => {
        const date = new Kenat('2017/1/1');
        expect(() => date.endOf('week')).toThrow('Invalid unit: week');
    });

    test('should throw error for non-numeric amount in add()', () => {
        const date = new Kenat('2017/1/1');
        expect(() => date.add('seven', 'days')).toThrow('Amount must be a number');
    });
});
