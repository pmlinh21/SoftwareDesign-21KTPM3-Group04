const express = require('express');
const postRoute = express.Router();
const {
    getTrendingPost,
    getPostByID,
    getPostByKeyword,
    getPostByUser,
    getLikeOfPost,
    getResponseOfPost,
    createPost,
    updatePost,
    updatePaywallOfPost,
    updatePublishTimeOfPost,
    updateScheduleTimeOfPost,
    deletePost,
    readPost,
    likePost,
    unlikePost,
    responsePost,
    deleteResponse,
    replyResponse,
    deleteReply,
    getHighlight,
    createHighlight,
    deleteHighlight,
    getPostMonthlyData
} = require('../controllers/postController')

// Get trending post from view
postRoute.get("/trending-view", getTrendingPost)

postRoute.get("/monthly-data", getPostMonthlyData)

postRoute.get("/:id_post", getPostByID)

// Search for post by keyword
postRoute.get("/search/:keyword", getPostByKeyword)

// Get all posts of a user
postRoute.get("/user/:id_user", getPostByUser)

// Create a post (draft, scheduled, published)
postRoute.post("", createPost)

// Update a post (draft -> publish, draft -> schedule, schedule -> publish)
postRoute.put("", updatePost)

postRoute.delete("", deletePost)

// postRoute.put("/paywall/:id_post", updatePaywallOfPost)

// postRoute.put("/publish_time/:id_post", updatePublishTimeOfPost)

// postRoute.put("/schedule_time/:id_post", updateScheduleTimeOfPost)

// postRoute.put("/topic/:id_post", updateTopicOfPost)

postRoute.post("/reading_history", readPost)


postRoute.get("/like/:id_post/user/:id_user", getLikeOfPost)

postRoute.post("/like", likePost)

postRoute.delete("/like/:id_post/user/:id_user", unlikePost)


postRoute.get("/response/:id_post", getResponseOfPost)

postRoute.post("/response", responsePost)

postRoute.delete("/response/:id_response", deleteResponse)


postRoute.post("/reply", replyResponse)

postRoute.delete("/reply/:id_response", deleteReply)


postRoute.get("/highlight/:id_post/user/:id_user", getHighlight)

postRoute.post("/highlight", createHighlight)

postRoute.put("/highlight", deleteHighlight)


module.exports = postRoute;