const db = require('../models/index');
const sequelize = db.sequelize;
const { Op, literal, where } = require("sequelize");
const init_models = require('../models/init-models');
const model = init_models(sequelize);
require('dotenv').config()
const nodeMailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 
const fetch = require("node-fetch");

const moment = require('moment')
const { successCode, failCode, errorCode } = require('../config/response');
const { parseToken, decodeToken } = require('../middlewares/baseToken');

// GET: Login
const login = async(req, res) =>{
let { email, password } = req.body

try{
    // Admin 
    let admin = await model.admin.findOne({
        where: {
            email:email
        }
    });

    if (admin){
        let checkPass = bcrypt.compareSync(password, admin.password);
        if(checkPass){
            successCode(res, parseToken(admin), "Login successfully");
            return;
        }
        else{
            failCode(res, "", "Email or password wrong");
            return;
        }
    } 
    
    // User
    let user = await model.user.findOne({
        where: {
            email:email
        }
    });

    if (user){
        let checkPass = bcrypt.compareSync(password, user.password);
        if(checkPass){
            successCode(res, parseToken(user), "Login successfully");
            return;
        }
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
    let { fullname, email, password, id_role } = req.body;
    if(id_role == '4'){
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
            let data = await model.user.create({ email, password: passWordHash, fullname, is_member: false });
            successCode(res, data, "Sign up successfully");
            return;
        }
    }
    else{
        failCode(res, "", "Not guest");
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
let { fullname } = req.params

try {
    let users = await model.user.findAll({
        where:{
            fullname: {
                [Op.iLike]: `%${fullname}%`
            }
        }
    })
    // let blocks = await model.block.findAll({
    //     attributes: ['block'],
    //     where:{
    //         user: id_user
    //     }
    // })
    // console.log(users)
    // console.log(blocks)

    // users = users.filter(user => {
    //     return !blocks.find(block => block.block === user.id_user);
    // });

    // thêm attribute ['is_subscribe'] nếu item trong users subscribe user có id_user
    // for (let user of users) {
    //     let isSubscribed = await model.subscribe.findOne({
    //         where: {
    //             user: user.id_user,
    //             subscriber: id_user
    //         }
    //     });

    //     user.dataValues.is_subscribe = isSubscribed ? true : false;
    // }

        successCode(res, users, "Account found")
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
        user.password = '**********';
        successCode(res, user, "User found")
    }
} catch (err) {
    console.log(err)
    errorCode(res,"Internal Server Error")
}
}

// GET: Get user by Email
const getUserByEmail = async (req, res) => {
let { email } = req.params

try {
    let user = await model.user.findOne({
        where:{
            email: email
        } 
    })
    if (!user) {
        let admin = await model.admin.findOne({
            where:{
                email: email
            } 
        })
        if(!admin){
            failCode(res, null, "Invalid Email")
        }
        else{
            admin.password = '**********';
            successCode(res, admin, "Admin found")
        }   
    }
    else{
        user.password = '**********';
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

// PUT: Harshing user password
const updatePassword = async(req,res) => {
let { id_admin } = req.params
let { new_password } = req.body;
console.log(id_admin,new_password)
try{
    let admin = await model.admin.findOne({
        where: {
            id_admin: id_admin
        }
    });
    if(admin){
        let passWordHash = bcrypt.hashSync(new_password, 10);
        await model.admin.update({
            password:passWordHash
        }, {
            where: {
                id_admin: id_admin
            }
        })
        let data = await model.admin.findOne({
            where: {
                id_admin:id_admin
            }
        });
        successCode(res, data, "Update thành công");
        return;
    }
    else{
        failCode(res, null, "Invalid id")
    }     
}catch(err){
    errorCode(res,"Lỗi BE")
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
            }
        });

        topics = topics.map(topic => {
            return topic.id_topic;
        });
        successCode(res, topics, "Topics found");
    }
} catch (err) {
    console.log(err)
    errorCode(res,"Internal Server Error")
}
}

// PUT: Follow a topic
const followATopic = async (req, res) => {
let { id_user, id_topic } = req.params

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
        let topic_user = await model.topic_user.findOne({
            where: {
                id_user: id_user,
                id_topic: id_topic
            }
        });

        if (topic_user){
            await model.topic_user.destroy({
                where: {
                    id_user: id_user,
                    id_topic: id_topic
                }
            });

            successCode(res, null, "Unfollow successfully");

        } else{
            const result = await model.topic_user.create({
                id_user, id_topic
            });

            successCode(res, result, "Follow successfully");
        }
    
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
        },
        include:[
            {
                model: model.post,
                as: "saved_posts",
                attributes: ["id_post"],
                through: { attributes: [] },
            }
        ],
        attributes: ["id_list","list_name"],
    });

    list = list.map(item => {
        const plainItem = item.get({ plain: true });
        plainItem.saved_posts = plainItem.saved_posts.map(post => post.id_post);
        return plainItem;
    });

    if(!list){
        failCode(res, [], "User has no listings")
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

// GET: Get user from token
const getUserToken = async (req, res) => {
let { email } = req.params

try {
    let admin = await model.admin.findOne({
        where: {
            email:email
        }
    });

    if (admin){
        successCode(res, parseToken(admin), "Get successfully");
        return;
    }
    else{
        let user = await model.user.findOne({
            where: {
                email: email
            }
        });

        if (user){
            successCode(res, parseToken(user), "Get successfully");
            return;
        } 
        else{
            failCode(res, "", "Email wrong");
            return;
        }
    }
} catch (err) {
    console.log(err)
    errorCode(res,"Internal Server Error")
}
}

// GET: Get all author posts
const getAuthorPosts = async (req, res) => {
let { id_user } = req.params

try {
    let posts = await model.post.findAll({
        where: {
            id_user: id_user
        },
        include:[
            {
                model: model.topic_post,
                as: "topic_posts",
                include:[
                    {
                        model: model.topic,
                        as: "id_topic_topic",
                        attributes: ["topic"]
                    }
                ],
            }
        ],
    });

    if(!posts){
        failCode(res, [], "User has no posts")
    }
    else{
        const formattedPosts = posts.map(post => {
            const { id_post, id_user, title, content, thumbnail, creation_time, status, publish_time, is_member_only } = post.toJSON();
            const list_topic = post.topic_posts.map(item => item.id_topic_topic.topic);
            return { id_post, id_user, title, content, thumbnail, creation_time, status, publish_time, is_member_only, list_topic };
        });

        successCode(res, formattedPosts, "Posts found")
    }
} catch (err) {
    console.log(err)
    errorCode(res,"Internal Server Error")
}
}

const base = "https://api-m.sandbox.paypal.com";

const generateAccessToken = async () => {
    try {
      if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
      const auth = Buffer.from(
        process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET,
      ).toString("base64");
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  };

const createOrder = async (product) => {
// use the product information passed from the front-end to calculate the purchase unit details
    console.log(
        "shopping product information passed from the frontend createOrder() callback:",
        product,
    );

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
        {
            amount: {
            currency_code: "USD",
            value: product.cost,
            },
        },
        ],
    };

    const response = await fetch(url, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
        method: "POST",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};

const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
        },
    });

    return handleResponse(response);
};
  
async function handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
}

module.exports = { login, signup, searchAccountByName, getUserSubscriber, 
            sendEmail, getUserByID, getUserByEmail, updateUserByID, getUserTopic, 
            followATopic, getUserSubscription, makeASubscription,
            updateSubscriptionByID, subscribeAnotherUser, unsubscribeAnotherUser,
            blockAnotherUser, unblockAnotherUser,
            getUserReceivedNotifications, getUserSentNotifications,
            getUserReadingHistory, deleteReadingHistory,
            getUserList, createList, editList, deleteList,
            addPostToList, deletePostFromList, getUserHighLight, updatePassword, 
            getUserToken, getAuthorPosts,
            createOrder, captureOrder }