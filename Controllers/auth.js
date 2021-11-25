// Controllers for /auth routes
const jsonschema = require("jsonschema");
const registerSchema = require("../Json Schemas/Auth/register.json");
const Users = require("../Models/Users");
const ExpressError = require("../Helpers/ExpressError");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const regExs = require("../Helpers/regExs");
const { SECRET_KEY, getDatabaseUri } = require("../config");
const sqlErrors = require("../Helpers/sqlErrors");

exports.register = async (req, res, next) => {
  try {
    // Check for errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Create user
    const user = await Users.create(req.body);

    // Return token
    return res.status(200).send({
      _token: jwt.sign(user, SECRET_KEY),
    });
  } catch (error) {
    console.log(error, getDatabaseUri());
    if (sqlErrors[error.constraint]) return next(sqlErrors[error.constraint]);
    return next(new ExpressError(500, "Server error."));
  }
};

exports.retrieve = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.validateParams = (method) => {
  switch (method) {
    case "register": {
      return [
        body("username", "userName is required.")
          .exists()
          .custom((val) => regExs.username.test(val))
          .withMessage(
            "username must be 5 - 20 characters, and not contain unique characters."
          ),
        body("password", "password is required.")
          .exists()
          .custom((val) => regExs.password.test(val))
          .withMessage(
            "password must be at least 8 characters with at least 1 one letter, number, and special character."
          ),
        body("email", "Invalid email").exists().isEmail(),
        body("firstName")
          .exists()
          .custom((val) => regExs.name.test(val))
          .withMessage("firstName can only contain letters."),
        body("lastName")
          .exists()
          .custom((val) => regExs.name.test(val))
          .withMessage("lastName can only contain letters."),
      ];
    }
  }
};

exports.validateSchema = (method) => {
  // Validate json body
  switch (method) {
    case "register":
      return (req, res, next) => {
        const result = jsonschema.validate(req.body, registerSchema);

        if (!result.valid)
          return next(new ExpressError(400, result.errors[0].message));
        return next();
      };
    // case "retrieve":
    //   const result = jsonschema.validate(req.body, schema);
    //   if (!result.isValid())
    //     return next(new ExpressError(400, "Invalid schema"));
  }
};
