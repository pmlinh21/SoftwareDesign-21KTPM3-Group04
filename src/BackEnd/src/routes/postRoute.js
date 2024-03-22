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
    likePost,
    unlikePost,
    responsePost,
    deleteResponse,
    replyResponse,
    deleteReply,
    createHighlight,
    deleteHighlight,
    getPostMonthlyData
} = require('../controllers/postController')

postRoute.get("/reading_history", getTrendingPost)

postRoute.get("/monthly-data", getPostMonthlyData)

postRoute.get("/:id_post", getPostByID)

postRoute.get("/search/:keyword", getPostByKeyword)

postRoute.get("/author/:id_user", getPostByUser)

postRoute.get("/like/:id_post", getLikeOfPost)

postRoute.get("/response/:id_post", getResponseOfPost)


postRoute.post("", createPost)

postRoute.post("/like", likePost)

postRoute.post("/response", responsePost)

postRoute.post("/reply", replyResponse)

// postRoute.post("/highlight", createHighlight)


postRoute.put("", updatePost)

postRoute.put("/paywall/:id_post", updatePaywallOfPost)

postRoute.put("/publish_time/:id_post", updatePublishTimeOfPost)

postRoute.put("/schedule_time/:id_post", updateScheduleTimeOfPost)


postRoute.delete("", deletePost)

postRoute.delete("/like", unlikePost)

postRoute.delete("/reply", deleteReply)

postRoute.delete("/response", deleteResponse)

// postRoute.delete("/highlight/:id_highlight", deleteHighlight)


module.exports = postRoute;