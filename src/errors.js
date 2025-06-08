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