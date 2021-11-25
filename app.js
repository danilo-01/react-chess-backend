// Server
const express = require("express");
const app = express();
const authRoutes = require("./Routes/auth");
const notFoundOrError = require("./Middleware/notFoundOrError");
const expressValidator = require("express-validator");
const { SECRET_KEY } = require("./config");

// Parse json from request
app.use(express.json());

// Express validator
// app.use(expressValidator());

// Routes
app.use("/auth", authRoutes);

// 404 not found or error
app.use(notFoundOrError);

module.exports = app;
