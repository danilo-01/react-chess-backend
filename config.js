/** Shared config for application; */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "development-secret-key";

const PORT = +process.env.PORT || 3000;

const BCRYPT_WORK_FACTOR = 10;

// Get dev database uri or prod uri
const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///react_chess_test"
    : "postgresql:///react_chess";

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "react_chess_test"
    : process.env.DATABASE_URL || "react_chess_test";
}

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI,
  getDatabaseUri,
};
