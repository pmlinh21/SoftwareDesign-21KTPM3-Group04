const express = require('express');
const topicRoute = express.Router();
const { getAllTopic, searchTopicByName, searchTopicPostByID, getTrendingTopics, getFollowerUser } = require('../controllers/topicController')

// GET: Get all topic
topicRoute.get("/", getAllTopic)

// GET: Search topic by name
topicRoute.get("/search/:topic_name", searchTopicByName)

// GET: Search topic by id and get all posts by following topic
topicRoute.get("/:ids/post", searchTopicPostByID)

// GET: Search topic by id and get the number of followers
topicRoute.get("/:id/follower-count", getFollowerUser)

// GET: Get trending topic
topicRoute.get("/reading_history", getTrendingTopics)

module.exports = topicRoute;