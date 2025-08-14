/**
 * Base class for all custom errors in the Kenat library.
 */
export class KenatError extends Error {
    constructor(message: any);
    /**
     * Provides a serializable representation of the error.
     * @returns {Object} A plain object with error details.
     */
    toJSON(): any;
}
/**
 * Thrown when an Ethiopian date is numerically invalid (e.g., month 14).
 */
export class InvalidEthiopianDateError extends KenatError {
    constructor(year: any, month: any, day: any);
    date: {
        year: any;
        month: any;
        day: any;
    };
}
/**
 * Thrown when a Gregorian date is numerically invalid.
 */
export class InvalidGregorianDateError extends KenatError {
    constructor(year: any, month: any, day: any);
    date: {
        year: any;
        month: any;
        day: any;
    };
}
/**
 * Thrown when a date string provided to the constructor has an invalid format.
 */
export class InvalidDateFormatError extends KenatError {
    inputString: any;
}
/**
 * Thrown when the Kenat constructor receives an input type it cannot handle.
 */
export class UnrecognizedInputError extends KenatError {
    input: any;
}
/**
 * Thrown for errors occurring during Ge'ez numeral conversion.
 */
export class GeezConverterError extends KenatError {
}
/**
 * Thrown when a function receives an argument of an incorrect type.
 */
export class InvalidInputTypeError extends KenatError {
    constructor(functionName: any, parameterName: any, expectedType: any, receivedValue: any);
    functionName: any;
    parameterName: any;
    expectedType: any;
    receivedValue: any;
}
/**
 * Thrown for errors related to invalid time components.
 */
export class InvalidTimeError extends KenatError {
}
/**
 * Thrown for invalid configuration options passed to MonthGrid.
 */
export class InvalidGridConfigError extends KenatError {
}
/**
 * Thrown when an unknown holiday key is used.
 */
export class UnknownHolidayError extends KenatError {
    holidayKey: any;
}
