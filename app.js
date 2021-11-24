// Server
const express = require("express");
const app = express();
const authRoutes = require("./Routes/auth");

// Routes
app.use("/auth", authRoutes);

// 404 not found

module.exports = app;
