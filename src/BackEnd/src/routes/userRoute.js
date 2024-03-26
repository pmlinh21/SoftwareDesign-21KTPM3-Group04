const express = require('express');
const userRoute = express.Router();
const { login, signup, searchAccountByName, getUserSubscriber,
    sendEmail, getUserByID, updateUserByID, getUserTopic,
    followATopic, getUserSubscription, makeASubscription,
    updateSubscriptionByID, subscribeAnotherUser, unsubscribeAnotherUser,
    blockAnotherUser, unblockAnotherUser,
    getUserReceivedNotifications, getUserSentNotifications,
    getUserReadingHistory, deleteReadingHistory,
    getUserList, createList, editList, deleteList,
    addPostToList, deletePostFromList, getUserHighLight } = require("../controllers/userController")

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

// POST: Subscribe another user
userRoute.post("/subscribe", subscribeAnotherUser)

// DELETE: Unsubscribe another user
userRoute.delete("/subscribe/:user/:subscriber", unsubscribeAnotherUser)

// POST: Block another user
userRoute.post("/block/:user/:block", blockAnotherUser)

// DELETE: Unblock another user
userRoute.delete("/block/:user/:block", unblockAnotherUser)

// GET: Get all user received notifications
userRoute.get("/notification/received/:id_user", getUserReceivedNotifications)

// GET: Get all user sent notifications
userRoute.get("/notification/sent/:id_user", getUserSentNotifications)

// GET: Get all user reading history
userRoute.get("/reading_history/:id_user", getUserReadingHistory)

// DELETE: Delete reading history
userRoute.delete("/reading_history/:id_reading_history", deleteReadingHistory)

// GET: Get all user list
userRoute.get("/list/:id_user", getUserList)

// POST: Create a list
userRoute.post("/list", createList)

// PUT: Edit a list
userRoute.put("/list/edit", editList)

// DELETE: Delete a list
userRoute.delete("/list/:id_list", deleteList)

// POST: Add a post to a list
userRoute.post("/list/post", addPostToList)

// DELETE: Delete a post from a list
userRoute.delete("/list/post/:id_list/:id_post", deletePostFromList)

// GET: Get all user highlight
userRoute.get("/highlight/:id_user", getUserHighLight)

module.exports = userRoute;