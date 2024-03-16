const express = require('express');
const rootRoute = express.Router();
const topicRoute = require('./topicRoute');
const userRoute = require('./userRoute');
const reportRoute = require('./reportRoute');
const postRoute = require('./postRoute');
const authRoute = require('./authRoute');

rootRoute.use("/topic", topicRoute);
rootRoute.use("/user", userRoute);
rootRoute.use("/report", reportRoute);
rootRoute.use("/post", postRoute);
rootRoute.use("/auth", authRoute);

module.exports = rootRoute;