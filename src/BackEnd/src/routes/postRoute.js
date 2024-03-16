const express = require('express');
const postRoute = express.Router();
const {
    getTrendingPost,
    getPostByID,
    getPostByKeyword,
    getPostByUser,
    getLikeOfPost,
    getResponseOfPost
} = require('../controllers/postController')

postRoute.get("/reading_history", getTrendingPost)

postRoute.get("/:id_post", getPostByID)

postRoute.get("/search/:keyword", getPostByKeyword)

postRoute.get("/author/:id_user", getPostByUser)

postRoute.get("/like/:id_post", getLikeOfPost)

postRoute.get("/response/:id_post", getResponseOfPost)

module.exports = postRoute;