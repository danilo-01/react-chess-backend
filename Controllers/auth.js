// Controllers for /auth routes
const validator = require("jsonschema").Validator;
const schema = new validator();
const registerSchema = require("../Json Schemas/Auth/register.json");
const Users = require("../Models/Users");

module.exports.register = async (req, res, next) => {
  try {
    // Validate req body
    schema.validate(req.body, registerSchema);

    // Check db for user
    if(await Users.getOne(req.body.username)) return new Expre

    // Hash password

    // Create new user in database

    // Generate and return token
    const body = JSON.stringify({
      _token: "token",
    });

    return res.status(200).send(body);
  } catch (error) {}
};

module.exports.retrieve = async (req, res, next) => {
  try {
  } catch (error) {}
};
