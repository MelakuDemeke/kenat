/* /src/errors/index.js */

/**
 * Base class for all custom errors in the Kenat library.
 */
export class KenatError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }

    /**
     * Provides a serializable representation of the error.
     * @returns {Object} A plain object with error details.
     */
    toJSON() {
        return {
            type: this.name,
            message: this.message,
        };
    }
}

/**
 * Thrown when an Ethiopian date is numerically invalid (e.g., month 14).
 */
export class InvalidEthiopianDateError extends KenatError {
    constructor(year, month, day) {
        super(`Invalid Ethiopian date: ${year}/${month}/${day}`);
        this.date = { year, month, day };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            date: this.date,
            validRange: {
                month: "1–13",
                day: "1–30 (or 5/6 for the 13th month)",
            },
        };
    }
}

/**
 * Thrown when a Gregorian date is numerically invalid.
 */
export class InvalidGregorianDateError extends KenatError {
    constructor(year, month, day) {
        super(`Invalid Gregorian date: ${year}/${month}/${day}`);
        this.date = { year, month, day };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            date: this.date,
            validRange: {
                month: "1–12",
                day: "1–31 (depending on month)",
            },
        };
    }
}

/**
 * Thrown when a date string provided to the constructor has an invalid format.
 */
export class InvalidDateFormatError extends KenatError {
    constructor(inputString) {
        super(`Invalid date string format: "${inputString}". Expected 'yyyy/mm/dd' or 'yyyy-mm-dd'.`);
        this.inputString = inputString;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            inputString: this.inputString,
        };
    }
}

/**
 * Thrown when the Kenat constructor receives an input type it cannot handle.
 */
export class UnrecognizedInputError extends KenatError {
    constructor(input) {
        const inputType = typeof input;
        super(`Unrecognized input type for Kenat constructor: ${inputType}`);
        this.input = input;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            inputType: typeof this.input,
        };
    }
}

/**
 * Thrown for errors occurring during Ge'ez numeral conversion.
 */
export class GeezConverterError extends KenatError {
    constructor(message) {
        super(message);
    }
}

/**
 * Thrown when a function receives an argument of an incorrect type.
 */
export class InvalidInputTypeError extends KenatError {
    constructor(functionName, parameterName, expectedType, receivedValue) {
        const receivedType = typeof receivedValue;
        super(`Invalid type for parameter '${parameterName}' in function '${functionName}'. Expected '${expectedType}' but got '${receivedType}'.`);
        this.functionName = functionName;
        this.parameterName = parameterName;
        this.expectedType = expectedType;
        this.receivedValue = receivedValue;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            functionName: this.functionName,
            parameterName: this.parameterName,
            expectedType: this.expectedType,
            receivedType: typeof this.receivedValue,
        };
    }
}

/**
 * Thrown for errors related to invalid time components.
 */
export class InvalidTimeError extends KenatError {
    constructor(message) {
        super(message);
    }
}

/**
 * Thrown for invalid configuration options passed to MonthGrid.
 */
export class InvalidGridConfigError extends KenatError {
    constructor(message) {
        super(message);
    }
}

/**
 * Thrown when an unknown holiday key is used.
 */
export class UnknownHolidayError extends KenatError {
    constructor(holidayKey) {
        super(`Unknown movable holiday key: "${holidayKey}"`);
        this.holidayKey = holidayKey;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            holidayKey: this.holidayKey,
        };
    }
}
