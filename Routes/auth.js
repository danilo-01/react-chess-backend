// Routes for /auth
const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/auth");

/* 
/auth/register

Accepts
{
    "username" : "someUsername12" * must be unique and 3 or more characters
    "password" : "Supers3cr3t!" * must be at least 8 characters with at least 1 uppercase and 1 special character
    "firstName" : "Firstname" * must contain only text
    "lastName" : "Lastname" * must contain only text and is optional
    "email" : "email@somedomain.com" * must be a valid email and unique
}
*/
router.post(
  "/register",
  controllers.validateSchema("register"),
  controllers.validateParams("register"),
  controllers.register
);

/* 
/auth/register

Accepts
{
    "username" : "someUsername12" * must be in database
    "password" : "Supers3cr3t!" * must match username indatabase's hashed password
}
*/
router.post("/register", controllers.retrieve);

module.exports = router;
