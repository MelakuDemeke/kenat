export class KenatError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
    }

    toJSON() {
        return {
            type: this.name,
            message: this.message,
        }
    }
}

export class InvalidEthiopianDateError extends KenatError {
    constructor(year, month, day) {
        super(`Invalid Ethiopian date: ${year}/${month}/${day}`)
        this.date = { year, month, day }
    }

    toJSON() {
        return {
            type: this.name,
            message: this.message,
            date: this.date,
            validRange: {
                month: "1–13",
                day: "1–30 (or 5/6 for month 13)",
            },
        }
    }
}

export class InvalidGregorianDateError extends KenatError {
    constructor(year, month, day) {
        super(`Invalid Gregorian date: ${year}/${month}/${day}`)
        this.date = { year, month, day }
    }

    toJSON() {
        return {
            type: this.name,
            message: this.message,
            date: this.date,
            validRange: {
                month: "1–12",
                day: "1–31 (depending on month)",
            },
        }
    }
}