const express = require('express');
const rootRoute = express.Router();
const basicRoute = require('./basicRoute');
const userRoute = require('./userRoute');
const adminRoute = require('./adminRoute');
const postRoute = require('./postRoute');
const authRoute = require('./authRoute');

rootRoute.use("/basic", basicRoute);
rootRoute.use("/user", userRoute);
rootRoute.use("/admin", adminRoute);
rootRoute.use("/post", postRoute);
rootRoute.use("/auth", authRoute);

module.exports = rootRoute;