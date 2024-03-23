const express = require('express');
const userRoute = express.Router();
const { login, signup, searchAccountByName, getUserSubscriber,
    sendEmail, getUserByID } = require("../controllers/userController")

// GET: Login
userRoute.get("/login", login)

// POST: Signup
userRoute.post("/signup", signup)

// GET: Search account
userRoute.get("/searchByName", searchAccountByName)

// GET: Get subscriber of an account
userRoute.get("/subscriber/:id_user", getUserSubscriber)

// POST: Send email to subscriber
userRoute.get("/sendEmail", sendEmail)

// GET: Get user by ID
userRoute.get("/:id_user", getUserByID)

module.exports = userRoute;