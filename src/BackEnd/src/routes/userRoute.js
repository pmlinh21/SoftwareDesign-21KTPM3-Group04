const express = require('express');
const userRoute = express.Router();
const { login, signup } = require("../controllers/userController")

// GET: Login
userRoute.get("/login", login)

// POST: Signup
userRoute.post("/signup", signup)

module.exports = userRoute;