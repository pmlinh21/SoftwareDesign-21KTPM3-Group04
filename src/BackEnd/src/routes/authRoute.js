const express = require('express');
const authRoute = express.Router();
const { successCode, failCode, errorCode } = require('../config/response');

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


module.exports = authRoute;