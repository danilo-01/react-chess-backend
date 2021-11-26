// Controllers for /auth routes
const jsonschema = require("jsonschema");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, getDatabaseUri } = require("../config");
const registerSchema = require("../Json Schemas/Auth/register.json");
const retrieveSchema = require("../Json Schemas/Auth/retrieve.json");
const Users = require("../Models/Users");
const ExpressError = require("../Helpers/ExpressError");
const regExs = require("../Helpers/regExs");
const { REGISTER, RETRIEVE } = require("./methods");

exports.register = async (req, res, next) => {
  try {
    // Check for errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ExpressError(400, errors.errors[0].msg));
    }

    // Create user
    const user = await Users.create(req.body);

    // Return token
    return res.status(200).send({
      _token: jwt.sign(user, SECRET_KEY),
    });
  } catch (error) {
    // If error isnt an express error return a 500 server error
    return error instanceof ExpressError
      ? next(error)
      : next(new ExpressError(500, "Server error"));
  }
};

exports.retrieve = async (req, res, next) => {
  try {
    // Check for errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ExpressError(400, errors.errors[0].msg));
    }

    // Validate user
    const user = await Users.validate(req.body.username, req.body.password);

    // Return token
    return res.status(200).send({
      _token: jwt.sign(
        {
          username: user.username,
          id: user.id,
          isAdmin: user.is_admin,
        },
        SECRET_KEY
      ),
    });
  } catch (error) {
    // If error isnt an express error return a 500 server error
    return error instanceof ExpressError
      ? next(error)
      : next(new ExpressError(500, "Server error"));
  }
};

exports.validateParams = (method) => {
  switch (method) {
    case REGISTER: {
      return [
        body("username", "userName is required.")
          .exists()
          .custom((val) => regExs.username.test(val))
          .withMessage(
            "username must start with a letter, be 5 - 20 characters, and not contain unique characters."
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
    case RETRIEVE: {
      return [
        body("username", "userName is required.").exists(),
        body("password", "password is required.").exists(),
      ];
    }
  }
};

exports.validateSchema = (method) => {
  // Validate json body
  switch (method) {
    case REGISTER:
      return (req, res, next) => {
        const result = jsonschema.validate(req.body, registerSchema);

        if (!result.valid)
          return next(new ExpressError(400, result.errors[0].message));
        return next();
      };
    case RETRIEVE:
      return (req, res, next) => {
        const result = jsonschema.validate(req.body, retrieveSchema);

        if (!result.valid)
          return next(new ExpressError(400, result.errors[0].message));
        return next();
      };
  }
};
