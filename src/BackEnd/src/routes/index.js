const express = require('express');
const rootRoute = express.Router();
const topicRoute = require('./topicRoute');
const userRoute = require('./userRoute');
const reportRoute = require('./reportRoute');
const postRoute = require('./postRoute');
const authRoute = require('./authRoute');
const cloudinaryRoute = require('./cloudinaryRoute');

rootRoute.use("/topic", topicRoute);
rootRoute.use("/user", userRoute);
rootRoute.use("/report", reportRoute);
rootRoute.use("/post", postRoute);
rootRoute.use("/auth", authRoute);
rootRoute.use("/cloudinary", cloudinaryRoute)

rootRoute.get("/", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.render('/', { showLoginPopup: true });
    }
    else{
        console.log("User login")
    }
});

module.exports = rootRoute;