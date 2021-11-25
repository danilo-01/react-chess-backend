const ExpressError = require("./ExpressError");

// Errors from sql to Expresserrors
const sqlErrors = {
  users_email_key: new ExpressError(409, "email already exists."),
  users_username_key: new ExpressError(409, "username already exists."),
};

module.exports = sqlErrors;
