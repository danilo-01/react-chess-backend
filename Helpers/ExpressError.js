// Status code for error, message and array of errors
class ExpressError extends Error {
  constructor(status, message, errors = []) {
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

module.exports = ExpressError;
