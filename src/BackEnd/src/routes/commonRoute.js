const express = require('express');
const commonRoute = express.Router();
const cloudinary = require('cloudinary').v2;

// Get config from cloudinary
commonRoute.get("/cloudinary", (req,res) => {
    const timestamp = Math.round((new Date).getTime()/1000);

    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
        folder: 'xplore'}, process.env.SECRET_KEY);

    res.json({
        signature: signature,
        timestamp: timestamp,
        cloudname: process.env.CLOUD_NAME,
        apikey: process.env.API_KEY
    })
})

const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require('../config/response');

// Get all membership
commonRoute.get("/membership", async (req, res) => {
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

// Get membership by id
commonRoute.get("/membership/:id", async (req, res) => {
    try{
        const membership = await model.membership.findOne({
            where: {
                id_membership: req.params.id
            }
        })
        let plainMembership = membership.get({ plain: true });
        plainMembership = {
            ...plainMembership,
            description: plainMembership.description.trim().split(";")
        }

        successCode(res, plainMembership, "Membership found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
});

module.exports = commonRoute;