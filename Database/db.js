const { Client } = require("pg");
const { DB_URI } = require("../config");

// Connect to a test or production database
if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: DB_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new Client({
    connectionString: DB_URI,
  });
}

db.connect();

module.exports = db;
