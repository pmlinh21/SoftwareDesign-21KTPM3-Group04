const express = require('express');
const passport = require('passport');
const cookieParser = require("cookie-parser");
const authRoute = express.Router();
const { successCode, failCode, errorCode } = require('../config/response');
const { parseToken } = require('../middlewares/baseToken');
const { OpenAI } = require("openai")

require('dotenv').config()

const openai = new OpenAI ({
    apiKey: process.env.GPT_KEY,
});

authRoute.post("/request-gpt", async (req,res, next) =>{
    const msg = req.body.messages
    const modelId = "gpt-3.5-turbo";

    try{
        const result = await openai.chat.completions.create({
            model: modelId,
            messages: msg,
          });

        console.log(result.choices[0].message.content)
        console.log(next)
        res.send(JSON.stringify({data: result}))
    } catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
})

authRoute.use(cookieParser(process.env.JWT_SECRET_KEY))

authRoute.get('/google', passport.authenticate('google', { scope: ['profile', "email"] }));

authRoute.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, info) => {
        if (err) {
            return res.redirect("/")
        }
        console.log("req.info: ", info)
        req.info = info;
        next();
    })(req,res,next)
}, (req, res) => {
    const infoRole = req.info.role
    const infoUser = (infoRole == "1") ? req.info['user']['dataValues']
                    : ((infoRole == "2") ? req.info['user']['dataValues']
                    : req.info['admin']['dataValues'])
    

    // res.cookie("token", parseToken(infoUser),  {
    //     maxAge: 10 * 24 * 60 * 60 * 1000,
    //     httpOnly: true,
    //     signed: false,
    // })

    res.redirect(`http://localhost:3000/?email=${infoUser.email}`)
    }
);

module.exports = authRoute;