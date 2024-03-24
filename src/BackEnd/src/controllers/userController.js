const db = require('../models/index');
const sequelize = db.sequelize;
const { Op, literal } = require("sequelize");
const init_models = require('../models/init-models');
const model = init_models(sequelize);
require('dotenv').config()
const nodeMailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 

const { successCode, failCode, errorCode } = require('../config/response');

// GET: Login
const login = async(req, res) =>{
    let { email, pwd } = req.body

    try{
        let user = await model.user.findOne({
            where: {
                email
            }
        });

        if (user){
            //let checkPass = bcrypt.compareSync(pwd, user.password);
            if(pwd === user.password){
                successCode(res, user, "Login successfully");
                return;
            }
            // if(checkPass){
            //     user.password = '**********';
            //     sucessCode(res, user, "Login successfully");
            //     return;
            // }
            else{
                failCode(res, "", "Email or password wrong");
                return;
            }
        } 

    }catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// POST: Signup
const signup = async(req, res) =>{
    try{
        let { email, password } = req.body;
        let checkEmail = await model.user.findOne({
            where:{
                email
            }
        })
        if(checkEmail){
            failCode(res,"","Email is existing");
            return;
        }
        else{
            let passWordHash = bcrypt.hashSync(password, 10);
            let data = await model.user.create({ email, password: passWordHash });
            successCode(res, data, "Sign up successfully");
            return;
        }
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// GET: Search account
const searchAccountByName = async (req, res) => {
    let { fullname } = req.body

    try {
        let user = await model.user.findAll({
            where:{
                fullname: {
                    [Op.like]: `%${fullname}%`
                }
            } 
        })
        if (!user) {
            failCode(res, null, "Invalid Name")
        }
        else{
            successCode(res, user, "Account found")
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
} 

// GET: Get subscriber of an account
const getUserSubscriber = async (req, res) => {
    let { id_user } = req.params

    try {
        let user = await model.user.findOne({
            where:{
                id_user: id_user
            }
        })
        if(!user){
            failCode(res, null, "Invalid ID")
        }
        else{
            let subscribers = await model.subscribe.findAll({
                where: {
                    user: id_user
                },
                include: [
                    {
                        model: model.user,
                        as: 'subscriber_user'
                    }
                ]
            });
            successCode(res, subscribers, "Subscribers found");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// Send email config
const sendMail = (to, subject, htmlContent) => {
    const transport = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    })

    const options = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transport.sendMail(options);
}

// POST: Send email to subscriber
const sendEmail = async(req, res) =>{
    try{
        let { author, id_subscriber } = req.body
        
        let check = await model.user.findOne({
            where: {
                id_user: id_subscriber
            }
        })
        if(!check){
            failCode(res, null, "Invalid Subscriber")
        }
        else{
            const htmlContent = `
            <html>
            <body>
                <h2>Dear Subscriber,</h2>
                <p>Thank you for subscribing to ${author}'s newsletter!</p>
                <p>From now on, you will receive regular updates on ${author} latest posts.</p>
                <p>We appreciate your interest in our content and hope you find it valuable.</p>
                <p>Best regards,</p>
                <p>Xplore</p>
            </body>
            </html>
            `;
            await sendMail(check.email, "Welcome Email", htmlContent)
            successCode(res,"","Email sent")
        }
    }catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// GET: Get user by ID
const getUserByID = async (req, res) => {
    let { id_user } = req.params

    try {
        let user = await model.user.findOne({
            where:{
                id_user: id_user
            } 
        })
        if (!user) {
            failCode(res, null, "Invalid ID")
        }
        else{
            successCode(res, user, "User found")
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// PUT: Update user by ID
const updateUserByID = async (req, res) => {
    let { id_user } = req.params
    let { fullname, gender, birthdate, avatar, tipping_link, bio } = req.body;

    try {
        let user = await model.user.findOne({
            where:{
                id_user: id_user
            } 
        })
        if (!user) {
            failCode(res, null, "Invalid ID")
        }
        else{
            await model.user.update({ 
                fullname, gender, birthdate, avatar, tipping_link, bio
            }, {
                where:{
                    id_user: id_user
                }
            }); 
            let data = await model.user.findOne({
                where:{
                    id_user: id_user
                }
            });
            successCode(res, data, "User found")
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}


// GET: Get all user following topics
const getUserTopic = async (req, res) => {
    let { id_user } = req.params

    try {
        let user = await model.user.findOne({
            where:{
                id_user: id_user
            }
        })
        if(!user){
            failCode(res, null, "Invalid ID")
        }
        else{
            let topics = await model.topic_user.findAll({
                where: {
                    id_user: id_user
                },
                include: [
                    {
                        model: model.topic,
                        as: 'id_topic_topic'
                    }
                ]
            });
            successCode(res, topics, "Topics found");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// POST: Follow a topic
const followATopic = async (req, res) => {
    let { id_user, id_topic } = req.body

    try {
        let user = await model.user.findOne({
            where:{
                id_user: id_user
            }
        })
        let topic = await model.topic.findOne({
            where:{
                id_topic: id_topic
            }
        })
        if(!user || !topic){
            failCode(res, null, "User or topic not found")
        }
        else{
            await model.topic_user.create({
                id_user, id_topic
            });
            let topic_user = await model.topic_user.findOne({
                where: {
                    id_user: id_user,
                    id_topic: id_topic
                }
            });
            successCode(res, topic_user, "Follow successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

module.exports = { login, signup, searchAccountByName, getUserSubscriber, 
                sendEmail, getUserByID, updateUserByID, getUserTopic, 
                followATopic }