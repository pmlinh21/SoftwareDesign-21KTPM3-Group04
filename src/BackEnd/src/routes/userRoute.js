const express = require('express');
const userRoute = express.Router();
const { login, signup, searchAccountByName, getUserSubscriber,
    sendEmail, getUserByID, updateUserByID, getUserTopic,
    followATopic, getUserSubscription, makeASubscription,
    updateSubscriptionByID } = require("../controllers/userController")

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

// PUT: Update user by ID
userRoute.put("/:id_user", updateUserByID)

// GET: Get all user following topics
userRoute.get("/topic/:id_user", getUserTopic)

// POST: Follow a topic
userRoute.post("/topic", followATopic)

// GET: Get all user subscriptions
userRoute.get("/subscription/:id_user", getUserSubscription)

// POST: Make a subscription
userRoute.post("/subscription", makeASubscription)

// PUT: Update a subscription (status) by ID
userRoute.put("/subscription/:id_subscription", updateSubscriptionByID)

module.exports = userRoute;