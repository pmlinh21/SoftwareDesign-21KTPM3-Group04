const db = require('../models/index');
const sequelize = db.sequelize;
const { Op, literal } = require("sequelize");
const init_models = require('../models/init-models');
const model = init_models(sequelize);
require('dotenv').config()
const nodeMailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 
const moment = require('moment')
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
            successCode(res, data, "Update successfully")
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

// GET: Get all user subscriptions
const getUserSubscription = async (req, res) => {
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
            let subscriptions = await model.subscription.findAll({
                where: {
                    id_user: id_user
                }
            });
            successCode(res, subscriptions, "Subscriptions found");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// POST: Make a subscription
const makeASubscription = async (req, res) => {
    let { id_user, plan, start_time, end_time, price, status } = req.body

    try {
        let user = await model.user.findOne({
            where:{
                id_user: id_user
            }
        })
        if(!user){
            failCode(res, null, "User not found")
        }
        else{
            await model.subscription.create({
                id_user, plan, start_time, end_time, price, status
            });
            let subscription = await model.subscription.findOne({
                where: {
                    id_user: id_user
                }
            });
            successCode(res, subscription, "Make successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// PUT: Update a subscription (status) by ID
const updateSubscriptionByID= async (req, res) => {
    let { id_subscription } = req.params
    let { start_time, status } = req.body;

    try {
        const [data, metadata] = await sequelize.query
        (`UPDATE subscription SET status = ${status} 
        WHERE id_subscription = ${id_subscription}
        AND start_time = '${start_time}'`);
            
        successCode(res, "", "Update successfully")
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}


// POST: Subscribe another user
const subscribeAnotherUser = async (req, res) => {
    let { user, subscriber, subscriber_time } = req.body
    
    try {
        let check = await model.subscribe.findOne({
            where:{
                user: user,
                subscriber: subscriber 
            }
        })
        if(check){
            failCode(res, null, "User is already subscribed")
        }
        else{
            const [subscribe, metadata] = await sequelize.query
            (`INSERT INTO subscribe 
            VALUES (${user},${subscriber},'${subscriber_time}')`);
            
            successCode(res, "", "Subscribe successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
} 

// DELETE: Unsubscribe another user
const unsubscribeAnotherUser = async (req, res) => {
    let { user, subscriber } = req.params

    try {
        let check = await model.subscribe.findOne({
            where:{
                user: user,
                subscriber: subscriber 
            }
        })
        if(!check){
            failCode(res, null, "User is not subscribed")
        }
        else{
            await model.subscribe.destroy({
                where:{
                    user: user,
                    subscriber: subscriber 
                }    
            });
            successCode(res, "", "Unsubscribe successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// POST: Block another user
const blockAnotherUser = async (req, res) => {
    let { user, block } = req.params

    try {
        let check = await model.block.findOne({
            where:{
                user: user,
                block: block
            }
        })
        if(check){
            failCode(res, null, "User is already blocked")
        }
        else{
            await model.block.create({
                user, block
            });
            successCode(res, "", "Block successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// DELETE: Unblock another user
const unblockAnotherUser = async (req, res) => {
    let { user, block } = req.params

    try {
        let check = await model.block.findOne({
            where:{
                user: user,
                block: block 
            }    
        });
        if(check){
            await model.block.destroy({
                where:{
                    user: user,
                    block: block 
                }    
            });
            successCode(res, "", "Unblock successfully");
        }
        else{
            failCode(res, null, "User is unblocked")
        }
        
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// GET: Get all user received notifications
const getUserReceivedNotifications = async (req, res) => {
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
            let notifications = await model.notification.findAll({
                where: {
                    receiver: id_user
                }
            });
            successCode(res, notifications, "Notifications found");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// GET: Get all user sent notifications
const getUserSentNotifications = async (req, res) => {
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
            let notifications = await model.notification.findAll({
                where: {
                    creator: id_user
                }
            });
            successCode(res, notifications, "Notifications found");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// GET: Get all user reading history
const getUserReadingHistory = async (req, res) => {
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
            let history = await model.reading_history.findAll({
                where: {
                    id_user: id_user
                }
            });
            successCode(res, history, "History found");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// DELETE: Delete reading history
const deleteReadingHistory = async (req, res) => {
    let { id_reading_history } = req.params

    try {
        let check = await model.reading_history.findOne({
            where:{
                id_reading_history: id_reading_history
            }    
        });
        if(check){
            await model.reading_history.destroy({
                where:{
                    id_reading_history: id_reading_history 
                }    
            });
            successCode(res, "", "Delete successfully");
        }
        else{
            failCode(res, null, "History not found")
        }
        
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// GET: Get all user list
const getUserList = async (req, res) => {
    let { id_user } = req.params

    try {
        let list = await model.list.findAll({
            where: {
                id_user: id_user
            }
        });
        if(!list){
            failCode(res, null, "User has no listings")
        }
        else{
            successCode(res, list, "List found")
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// POST: Create a list
const createList = async (req, res) => {
    let { id_user, list_name } = req.body

    try {
        let check = await model.list.findOne({
            where:{
                id_user: id_user,
                list_name: list_name
            }
        })
        if(check){
            failCode(res, null, "List already exists")
        }
        else{
            const [list, metadata] = await sequelize.query
            (`INSERT INTO list (id_user, list_name)
            VALUES (${id_user}, '${list_name}')`);
            successCode(res, list, "Create successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// PUT: Edit a list
const editList = async (req, res) => {
    let { id_list, list_name } = req.body
    
    try {
        let check = await model.list.findOne({
            where:{
                id_list: id_list
            }
        })
        if(!check){
            failCode(res, null, "List does not exist")
        }
        else{
            await model.list.update({
                list_name
            }, {
                where:{
                    id_list: id_list
                }
            })
            successCode(res, "", "Edit successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// DELETE: Delete a list
const deleteList = async (req, res) => {
    let { id_list } = req.params
    
    try {
        let check = await model.list.findOne({
            where:{
                id_list: id_list
            }
        })
        if(!check){
            failCode(res, null, "List does not exist")
        }
        else{
            await model.list.destroy({
                where:{
                    id_list: id_list
                }
            })
            successCode(res, "", "Delete successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// POST: Add a post to a list
const addPostToList = async (req, res) => {
    let { id_list, id_post } = req.body

    try {
        let check = await model.list_post.findOne({
            where:{
                id_list: id_list,
                id_post: id_post
            }
        })
        if(check){
            failCode(res, null, "Post is already in this list")
        }
        else{
            await model.list_post.create({
                id_list, id_post
            });
            successCode(res, "", "Add successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// DELETE: Delete a post from a list
const deletePostFromList = async (req, res) => {
    let { id_list, id_post } = req.params

    try {
        let check = await model.list_post.findOne({
            where:{
                id_list: id_list,
                id_post: id_post
            }
        })
        if(!check){
            failCode(res, null, "Post is not in this list")
        }
        else{
            await model.list_post.destroy({
                where:{
                    id_list: id_list,
                    id_post: id_post
                }
            });
            successCode(res, "", "Delete successfully");
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// GET: Get all user highlight
const getUserHighLight = async (req, res) => {
    let { id_user } = req.params

    try {
        let highlight = await model.highlight.findAll({
            where: {
                id_user: id_user
            }
        });
        if(!highlight){
            failCode(res, null, "User has no highlights")
        }
        else{
            successCode(res, highlight, "Highlight found")
        }
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

module.exports = { login, signup, searchAccountByName, getUserSubscriber, 
                sendEmail, getUserByID, updateUserByID, getUserTopic, 
                followATopic, getUserSubscription, makeASubscription,
                updateSubscriptionByID, subscribeAnotherUser, unsubscribeAnotherUser,
                blockAnotherUser, unblockAnotherUser,
                getUserReceivedNotifications, getUserSentNotifications,
                getUserReadingHistory, deleteReadingHistory,
                getUserList, createList, editList, deleteList,
                addPostToList, deletePostFromList, getUserHighLight }