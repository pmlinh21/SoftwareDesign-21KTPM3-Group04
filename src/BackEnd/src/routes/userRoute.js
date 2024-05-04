const express = require('express');
const userRoute = express.Router();
const cookieParser = require("cookie-parser");
const { login, signup, searchAccountByName, getUserSubscriber,
    sendEmail, getUserByID, getUserByEmail, updateUserDetail, updateUserProfile, getUserTopic,
    followATopic, getUserSubscription, makeASubscription,
    cancelSubscriptionByID, subscribeAnotherUser, unsubscribeAnotherUser,
    blockAnotherUser, unblockAnotherUser,
    getUserReceivedNotifications, getUserSentNotifications,
    getUserReadingHistory, deleteReadingHistory,
    getUserList, createList, editList, deleteList, getPostByListId,
    addPostToList, deletePostFromList, getUserHighLight, updatePassword,
    getUserToken, getAuthorPosts,
    createOrder,captureOrder,
    isFollowAuthor, getUserFollow, getUserBlock,
    pinPost, unpinPost, getUserCurrentSubscription,
    getUserResponse, getInvisibleUsers } = require("../controllers/userController")
    
userRoute.use(cookieParser(process.env.JWT_SECRET_KEY))

// GET: Login
userRoute.post("/login", login)

// POST: Signup
userRoute.post("/signup", signup)

// GET: Search account
userRoute.get("/search/:fullname", searchAccountByName)

// GET: Get subscriber of an account
userRoute.get("/subscriber/:id_user", getUserSubscriber)

// POST: Send email to subscriber
userRoute.post("/sendEmail", sendEmail)

// GET: Get user by ID
userRoute.get("/:id_user", getUserByID)

// GET: Get user by Email
userRoute.get("/getUser/:email", getUserByEmail)

// PUT: Update user detail
userRoute.put("/detail/:id_user", updateUserDetail)

// PUT: Update user profile
userRoute.put("/profile/:id_user", updateUserProfile)

// GET: Get all user following topics
userRoute.get("/topic/:id_user", getUserTopic)

// PUT: Follow / unfollow a topic
userRoute.put("/topic/:id_user/:id_topic", followATopic)

// GET: Get all user subscriptions
userRoute.get("/subscription/:id_user", getUserSubscription)

// POST: Make a subscription
userRoute.post("/subscription", makeASubscription)

// PUT: Update a subscription (status) by ID
userRoute.put("/subscription/:id_user/:id_subscription", cancelSubscriptionByID)

// POST: Subscribe another user
userRoute.post("/subscribe/:user/:subscriber", subscribeAnotherUser)

// DELETE: Unsubscribe another user
userRoute.delete("/subscribe/:user/:subscriber", unsubscribeAnotherUser)

// POST: Block another user
userRoute.post("/block/:user/:block", blockAnotherUser)

// DELETE: Unblock another user
userRoute.delete("/block/:user/:block", unblockAnotherUser)

//GET:
userRoute.get("/invisible/:id_user", getInvisibleUsers)

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

// GET: Get all post in a list
userRoute.get("/list/post/:id_list", getPostByListId)

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

// PUT: Harshing user password
userRoute.put("/update/:id_user", updatePassword)

// GET: Get user from token
userRoute.get("/getToken/:email", getUserToken)

// GET: Get all author post -> POST route
userRoute.get("/post/:id_user", getAuthorPosts)

// POST: Create paypal order
userRoute.post("/create-paypal-order", createOrder);

// POST: Capture paypal order
userRoute.post("/capture-paypal-order", captureOrder);

// GET: Is follow author
userRoute.get("/follow/:user/:subscriber", isFollowAuthor)

// GET: Get user follow
userRoute.get("/follow/:id_user", getUserFollow)

// GET: Get user block
userRoute.get("/block/:id_user", getUserBlock)

// PUT: Pin a post
//userRoute.put("/:id_user/:id_pinned_post", pinPost, getUserByID)

userRoute.put("/unpin/:id_user/:id_pinned_post", pinPost)

// PUT: Unpin a post
userRoute.put("/unpin/:id_user", unpinPost)

// GET: Get current user subscription
userRoute.get("/current/:id_user", getUserCurrentSubscription)

// GET: Get user response
userRoute.get("/response/:id_user", getUserResponse)

module.exports = userRoute;