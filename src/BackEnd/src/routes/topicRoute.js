const express = require('express');
const topicRoute = express.Router();
const { getAllTopic, searchTopicByName, searchTopicPostByID, getTrendingTopics } = require('../controllers/topicController')

// GET: Get all topic
topicRoute.get("/", getAllTopic)

// GET: Search topic by name
topicRoute.get("/searchByName/:topic_name", searchTopicByName)

// GET: Search topic by id and get all posts by following topic
topicRoute.get("/searchById/:id", searchTopicPostByID)

// GET: Get trending topic
topicRoute.get("/reading_history", getTrendingTopics)

module.exports = topicRoute;