const express = require('express');
const cloudinaryRoute = express.Router();
const cloudinary = require('cloudinary').v2;

// Get config from cloudinary
cloudinaryRoute.get("/", (req,res) => {
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

module.exports = cloudinaryRoute;