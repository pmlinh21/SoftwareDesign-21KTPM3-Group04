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
    // deletePost,
    // likePost,
    // unlikePost,
    // responsePost,
    // deleteResponse,
    // replyResponse,
    // deleteReply,
    // createHighlight,
    // deleteHighlight,
    getPostMonthlyData
} = require('../controllers/postController')

postRoute.get("/reading_history", getTrendingPost)

postRoute.get("/:id_post", getPostByID)

postRoute.get("/search/:keyword", getPostByKeyword)

postRoute.get("/author/:id_user", getPostByUser)

postRoute.get("/like/:id_post", getLikeOfPost)

postRoute.get("/response/:id_post", getResponseOfPost)

postRoute.post("", createPost)

postRoute.put("/:id_post", updatePost)

postRoute.post("/paywall/:id_post", updatePaywallOfPost)

postRoute.post("/publish_time/:id_post", updatePublishTimeOfPost)

postRoute.post("/schedule_time/:id_post", updateScheduleTimeOfPost)

// postRoute.delete("/:id_post", deletePost)

// postRoute.post("/like", likePost)

// postRoute.delete("/like/:id_post/:id_user", unlikePost)

// postRoute.post("/response", responsePost)

// postRoute.delete("/response/:id_response", deleteResponse)

// postRoute.post("/reply", replyResponse)

// postRoute.delete("/reply/:id_response", deleteReply)

// postRoute.post("/highlight", createHighlight)

// postRoute.delete("/highlight/:id_highlight", deleteHighlight)

// postRoute.get("/monthly-data/:id_post/:time", getPostMonthlyData)

module.exports = postRoute;