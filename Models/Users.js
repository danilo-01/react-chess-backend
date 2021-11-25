// User model
const { hash } = require("bcrypt");
const db = require("../Database/db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class Users {
  // Get one user from database with an id or username
  static async getOne(target) {
    // Target can be an id or a username (int or str)
    const selection = +target ? `id = $1` : `username = $1`;

    const query = `SELECT * FROM users
    WHERE ${selection}`;

    const result = await db.query(query, [target]);

    return result.rows[0];
  }

  // Stores new user data in database
  static async create(user) {
    // Hash password
    user.password = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);

    // Query to create a new user
    const query = `INSERT INTO users 
      (username, hashed_password, first_name, last_name, email, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING (id, username, is_admin)`;

    const result = await db.query(query, [
      user.username,
      user.password,
      user.firstName,
      user.lastName,
      user.email,
      false,
    ]);

    return result.rows[0];
  }
}

module.exports = Users;
