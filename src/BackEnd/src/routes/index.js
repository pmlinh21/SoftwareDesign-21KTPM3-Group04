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

const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../config/response');

rootRoute.get("/membership", async (req, res) => {
    try{
        const membership = await model.membership.findAll()
        let plainMembership = membership.map(membership => membership.get({ plain: true }));
        plainMembership = plainMembership?.map((item) => {
            return {
                ...item,
                description: item.description.trim().split(";")
            }
        })
        successCode(res, plainMembership, "All membership found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
});

module.exports = rootRoute;