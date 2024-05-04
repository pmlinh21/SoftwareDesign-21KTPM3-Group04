const db = require("../models/index");
const sequelize = db.sequelize;
const init_models = require("../models/init-models");
const model = init_models(sequelize);

const { Op, literal, fn, col } = require("sequelize");

const { successCode, failCode, errorCode } = require("../config/response");
const {LIKE_NOTI, RESPONSE_NOTI, REPLY_NOTI} = require("../config/noti_type")


const getTrendingPost = async (req,res) => {
    try{
        const readingHistories = await model.reading_history.findAll({
            where: {
                reading_time: {
                    [Op.gte]: literal(`NOW() - INTERVAL '700 hour'`), // Greater than or equal to 24 hours ago
                },
            },
            group: ['id_post'],
            attributes: [
                "id_post",
                [sequelize.fn('count', '*'), 'readingCount'],
            ],
            order: [[sequelize.col('readingCount'), 'DESC']], // Order by userCount descending
            limit: 6,
        });

        const postIds = readingHistories.map(history => history.id_post);

        if (postIds.length == 0){
            successCode(res, [], "Empty trending post ")
            return
        }
            

        const posts = await model.post.findAll({
            where: {
                id_post: postIds,
            },
            include: [
                {
                    model: model.topic,
                    as: "list_topic",
                    attributes: ["topic", "id_topic"],
                    through: { attributes: [] },
                },
                {
                    model: model.like_post,
                    as: "like_posts",
                    attributes: [],
                },
                {
                    model: model.response,
                    as: "responses",
                    attributes: [],
                },
                {
                    model: model.user,
                    as: "author",
                    attributes: ["fullname", "avatar", "id_user"],
                },
            ],
            attributes: [
                "id_post", "title", "content", "publish_time", "thumbnail",
                "creation_time", "publish_time", "status","is_member_only",
                [literal('COUNT(DISTINCT "like_posts"."id_user")'), 'likeCount'],
                [literal('COUNT(DISTINCT "responses"."id_response")'), 'responseCount'],
            ],
            group: ['post.id_post', 
            "author.fullname", "author.avatar", "author.id_user",
            "list_topic.id_topic",
            "like_posts.id_post", 
            ] ,
            order: [[sequelize.literal(`ARRAY_POSITION(ARRAY[${postIds.join(',')}], "post"."id_post")`)]],
        });

        successCode(res, posts,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const getPostByID = async (req,res) => {
    const {id_post} = req.params;

    try{
        const post = await model.post.findOne({
            where:{
                id_post: id_post
            },
            include: [
                {
                    model: model.topic,
                    as: "list_topic",
                    attributes: ["topic", "id_topic"],
                    through: { attributes: [] },
                },
                {
                    model: model.like_post,
                    as: "like_posts",
                    attributes: [],
                },
                {
                    model: model.response,
                    as: "responses",
                    attributes: [],
                },
                {
                    model: model.user,
                    as: "author",
                    attributes: ["fullname", "avatar", "id_user"],
                },
            ],
            attributes: [
                "title", "content", "publish_time", "thumbnail", "id_post",
                "creation_time", "publish_time", "status","is_member_only",
                [literal('COUNT(DISTINCT "like_posts"."id_user")'), 'likeCount'],
                [literal('COUNT(DISTINCT "responses"."id_response")'), 'responseCount'],
            ],
            group: ['post.id_post', 
            "author.fullname", "author.avatar", "author.id_user",
            "list_topic.id_topic", 
            "like_posts.id_post", 
            ] 
        }); 

        successCode(res,post,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const getPostByKeyword = async (req, res) => {
    const { keyword } = req.params;

    try {
        const posts = await model.post.findAll({
            where: {
                publish_time: {
                    [Op.lt]: new Date() 
                },
                title: {
                    [Op.iLike]: `%${keyword}%`,
                },
            },
            include: [
                {
                    model: model.topic,
                    as: "list_topic",
                    attributes: ["topic"],
                    through: { attributes: [] },
                    
                },
                {
                    model: model.like_post,
                    as: "like_posts",
                    attributes: [],
                    
                },
                {
                    model: model.response,
                    as: "responses",
                    attributes: [],
                    
                },
                {
                    model: model.user,
                    as: "author",
                    attributes: ["fullname", "avatar", "id_user"],
                },
            ],
            attributes: [
                "title", "content", "publish_time", "thumbnail", "id_post",
                "creation_time", "publish_time", "status","is_member_only",
                [literal('COUNT(DISTINCT "like_posts"."id_user")'), 'likeCount'],
                [literal('COUNT(DISTINCT "responses"."id_response")'), 'responseCount'],
            ],
            group: ['post.id_post', 
            "author.fullname", "author.avatar", "author.id_user",
            "list_topic.id_topic", 
            "like_posts.id_post", 
            ]        
        });

        successCode(res, posts, "Get thành công")
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Internal Server Error")
    }

}

const getPostByUser = async (req,res) => {
    const {id_user} = req.params;

    try{
        const posts = await model.post.findAll({
            where:{
                id_user: id_user
            },
            include: [
                {
                    model: model.topic,
                    as: "list_topic",
                    attributes: ["topic", "id_topic"],
                    through: { attributes: [] },
                    
                },
                {
                    model: model.like_post,
                    as: "like_posts",
                    attributes: [],
                    
                },
                {
                    model: model.response,
                    as: "responses",
                    attributes: [],
                    
                }
            ],
            attributes: [
                "title", "content", "publish_time", "thumbnail", "id_post",
                "creation_time", "publish_time", "status","is_member_only",
                [literal('COUNT(DISTINCT "like_posts"."id_user")'), 'likeCount'],
                [literal('COUNT(DISTINCT "responses"."id_response")'), 'responseCount'],
            ],
            group: ['post.id_post', 
            "list_topic.id_topic", 
            "like_posts.id_post", 
            ]        
        }); 

        successCode(res,posts,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const getLikeOfPost = async (req,res) => {
    const {id_post, id_user} = req.params;

    try{
        // const count = await model.post.findOne({
        //     where: { id_post: id_post },
        //     include: {
        //       model: model.like_post,
        //       as: "like_posts",
        //       attributes: [],
        //     },
        //     attributes: [
        //         "id_post",
        //         [sequelize.fn("COUNT", sequelize.col("like_posts.id_user")), "likeCount"]
        //     ],
        //     group: ["post.id_post"],
        // });

        // if (!count) {
        //     failCode(res, null, "Invalid ID")
        // }

        // successCode(res,count,"Post found")

        const count = await model.like_post.findAll({
            where: {
                id_post: id_post,
                id_user: id_user,
            },
        })

        successCode(res,count.length > 0,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const getResponseOfPost = async (req,res) => {
    const {id_post} = req.params;
    try{
        const response = await model.post.findOne({
            where:{
                id_post: id_post
            },
            include:[
                {
                    model: model.user,
                    as: "author",
                    attributes: ["id_user","fullname", "avatar"],
                },
                {
                    model: model.response,
                    as: "responses",
                    attributes: ["id_response","response",
                    "response_time", "reply","reply_time"],
                    include:[
                        {
                            model: model.user,
                            as: "user",
                            attributes: ["id_user","fullname", "avatar"],
                        }
                    ],
                }
            ],
            order: [[{ model: model.response, as: 'responses' }, 'id_response', 'DESC']],
            attributes:[]
        
        })

        if (!response) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,response,"Response found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const updateTopicPost = async(topic, id_post) => {
    // console.log(topic)
    const topicPostPromises = topic.map(async (item) => {
        await model.topic_post.create({
            id_post: id_post,
            id_topic: item.value
        });
    });

    await Promise.all(topicPostPromises);

    const result = await model.topic_post.findAll({
        where: {
            id_post: id_post
        },
        include: [
            {
                model: model.topic,
                as: "id_topic_topic",
            },
        ],
    });

    return result.map(item => {
        return {id_topic : item.id_topic,
            topic : item.id_topic_topic.topic}
    })
}

const nodeMailer = require('nodemailer');
const { response } = require("express");
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

const createPost = async (req,res) => {
    const {id_user, title, content, thumbnail,creation_time,
            publish_time, is_member_only, status, topic} = req.body;

    try{
        const post = await model.post.create({
            id_user, title, content, thumbnail,creation_time,
            status: status, publish_time, is_member_only
        }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        const list_topic = await updateTopicPost(topic, post.id_post);
        const plainPost = post.get({ plain: true });
        
        if (status == 1) {
            try {
                const author = await model.user.findOne({ where: { id_user: id_user } });
                const subscribers = await model.subscribe.findAll({ 
                    where: { user: id_user }, 
                    include: [
                        {
                            model: model.user,
                            as: "subscriber_user",
                            attributes: ["email"]
                        }
                    ],
                    attributes: []
                });
        
                const htmlContent = `
                <html>
                <body>
                    <h2>Hello Subscriber,</h2>
                    <p>We are excited to inform you that ${author.fullname} has published a new post!</p>
                    <p>Click <a href="http://localhost:3000/post?id_post=${post.id_post}">here</a> to read the latest content and stay updated with more insightful posts.</p>
                    <p>We appreciate your interest in our content and hope you find it valuable.</p>
                    <p>Thank you for your continued support.</p>
                    <p>Best regards,</p>
                    <p>Xplore</p>
                </body>
                </html>
                `;
        
                const emailPromises = subscribers.map(item =>
                    sendMail(item.subscriber_user.email, "Welcome Email", htmlContent)
                );
                
                await Promise.all(emailPromises);

                // successCode(res,subscribers,"Post created")
            } catch (error) {
                console.error("Failed to send subscription emails:", error);
            }
        }
        

        successCode(res,{...plainPost, list_topic: list_topic},"Post created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const updatePost = async (req,res) => {
    const {id_post, title, content, thumbnail, publish_time, is_member_only, status, topic} = req.body;
    try{
        const [count, post] = await model.post.update({
            title: title, content: content, thumbnail: thumbnail,
            publish_time:publish_time, is_member_only:is_member_only, status: status
        },{
            where:{
                id_post: id_post
            },
            returning: true,
        }); 

        await model.topic_post.destroy({
            where:{
                id_post: id_post
            }
        })

        const list_topic = await updateTopicPost(topic, post[0].id_post);

        successCode(res,{id_post, title, content, thumbnail, publish_time, is_member_only, status, list_topic: list_topic},"Post updated")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// update khi người dùng thay đổi hoặc hết là member
const updatePaywallOfPost = async (req,res) => {
    const {id_post} = req.params;
    const {is_member_only} = req.body;
    try{
        const post = await model.post.update({
            is_member_only: is_member_only
        },{
            where:{
                id_post: id_post
            }
        }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,post,"Post updated")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// update khi người dùng chọn publish
const updatePublishTimeOfPost = async (req,res) => {
    const {id_post} = req.params;
    const {publish_time} = req.body;

    try{
        const post = await model.post.update({
            publish_time: publish_time,
            status: 1
        },{
            where:{
                id_post: id_post
            }
        }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,post,"Post updated")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

// update khi người dùng chọn schedule
const updateScheduleTimeOfPost = async (req,res) => {
    const {id_post} = req.params;
    const {publish_time} = req.body;

    try{
        const post = await model.post.update({
            publish_time: publish_time,
            status: 2
        },{
            where:{
                id_post: id_post
            }
        }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,post,"Post updated")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const deletePost = async (req,res) => {
    const {id_post} = req.params;
    console.log(id_post)

    try{
        const post = await model.post.findOne({
            where:{
                id_post: id_post
            }
        });

        if (!post) {
            failCode(res, null, "Invalid ID")
        }
        else{

            // USE ON DELETE CASCADE
            // delete topic_post, post_monthly_data, report_post
            // delete reading_history, list_post, like, highlight, 

            // delete notfication, response, report_response
            let delete_post_count = 0;

            let responses = await model.response.findAll({
                where:{
                    id_post: id_post
                },
                attributes: ["id_response"]
            });

            responses.forEach(async (response) => {
                let report_result = '-1'
                report_result = await model.report_response.destroy({
                    where:{
                        id_response: response.id_response
                    }
                });
                if (report_result != '-1')
                    delete_post_count++;
            })

            let response_result = '-1'
            response_result = await model.response.destroy({
                where:{
                    id_post: id_post
                }
            });

            if (response_result != '-1') {
                delete_post_count++;
            }

            let noti_result = '-1'
            noti_result = await model.notification.destroy({
                where:{
                    id_post: id_post
                }
            });

            if (noti_result != '-1') {
                delete_post_count++;
            }
            
            if (delete_post_count == responses.length + 2) {
                let result = await model.post.destroy({
                    where:{
                        id_post: id_post
                    }
                }); 

                if (!result) {
                    failCode(res, null, "Bad request")
                }
                else {
                    successCode(res,result,"Post deleted")
                }
            }
        } 
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const readPost = async (req,res) => {
    const {id_post, id_user, reading_time} = req.body;
    try{
        const record = await model.reading_history.create({
            id_post: id_post,
            id_user: id_user,
            reading_time: reading_time
        });  

        if (!record) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,record,"Read post")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const likePost = async (req,res) => {
    const {id_post, id_user} = req.body;
    try{
        const like = await model.like_post.create({
            id_post: id_post,
            id_user: id_user
        }); 

        const post = await model.post.findOne({
            where:{
                id_post: id_post
            }
        }); 

        if (post.id_user != id_user){
            await model.notification.create({
                creator: id_user,
                receiver: post.id_user,
                id_post: id_post,
                id_response: null,
                noti_type: LIKE_NOTI,
                noti_time: new Date(),
            }); 
        }

        if (!like) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,like,"Like created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const unlikePost = async (req,res) => {
    const {id_post, id_user} = req.params;

    try{
        const like = await model.like_post.destroy({
            where:{
                id_post: id_post,
                id_user: id_user
            }
        }); 

        console.log(like)

        if (!like) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,like,"Like deleted")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const responsePost = async (req,res) => {
    const {id_post, id_user, response, response_time} = req.body;

    try{
        const data = await model.response.create({
            id_post: id_post, 
            id_user: id_user, 
            response: response, 
            response_time: response_time,
            reply: null,
            reply_time: null
        }); 

        const post = await model.post.findOne({
            where:{
                id_post: id_post
            }
        }); 

        if (post.id_user != id_user){
            await model.notification.create({
                creator: id_user,
                receiver: post.id_user,
                id_post: id_post,
                id_response: data.id_response,
                noti_type: RESPONSE_NOTI,
                noti_time: response_time,
            }); 
        }

        if (!data) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,data,"Response created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const updateResponse = async (req,res) => {
    const {id_response, response, response_time} = req.body;

    try{
        console.log({id_response, response, response_time})
        await model.response.update({
            response: response, 
            response_time: response_time,
        }, {
            where:{
                id_response: id_response
            },
        }); 

        const post = await model.response.findOne({
            where:{
                id_response: id_response
            }
        })

        const data = await model.response.findAll({
            where:{
                id_post: post.id_post
            },
            include:[
                {
                    model: model.user,
                    as: "user",
                    attributes: ["id_user","fullname", "avatar"],
                }
            ],
            order: [['id_response', 'DESC']],
            attributes: ["id_response","response", "response_time", "reply","reply_time"],
        
        })

        successCode(res,data,"Response created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const deleteResponse = async (req,res) => {
    const {id_response} = req.params;

    try{
        await model.notification.destroy({
            where:{
                id_response: id_response,
            }
        })

        const response = await model.response.destroy({
            where:{
                id_response: id_response
            }
        }); 

        if (!response) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,response,"Response deleted")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const replyResponse = async (req,res) => {
    const {id_response, reply, reply_time} = req.body;

    try{
        const [count, response] = await model.response.update({
            reply: reply,
            reply_time: reply_time
        },{
            where:{
                id_response: id_response
            },
            returning: true,
        }); 

        const post = await model.post.findOne({
            where:{
                id_post: response[0].id_post
            }
        })

        await model.notification.create({
            creator: post.id_user,
            receiver: response[0].id_user,
            id_post: response[0].id_post,
            id_response: id_response,
            noti_type: REPLY_NOTI,
            noti_time: reply_time
        }); 
        
        const data = await model.response.findAll({
            where:{
                id_post: response[0].id_post
            },
            include:[
                {
                    model: model.user,
                    as: "user",
                    attributes: ["id_user","fullname", "avatar"],
                }
            ],
            order: [['id_response', 'DESC']],
            attributes: ["id_response","response", "response_time", "reply","reply_time"],
        
        })

        successCode(res,data,"reply created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const updateReply = async (req,res) => {
    const {id_response, reply, reply_time} = req.body;

    try{
        await model.response.update({
            reply: reply, 
            reply_time: reply_time,
        }, {
            where:{
                id_response: id_response
            }
        }); 

        const data = await model.response.findOne({
            where:{
                id_response: id_response
            }
        })

        const response = await model.response.findAll({
            where:{
                id_post: data.id_post
            },
            include:[
                {
                    model: model.user,
                    as: "user",
                    attributes: ["id_user","fullname", "avatar"],
                }
            ],
            order: [['id_response', 'DESC']],
            attributes: ["id_response","response", "response_time", "reply","reply_time"],
        
        })

        successCode(res,response,"Response created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const deleteReply = async (req,res) => {
    const {id_response} = req.params;

    try{
        const reply = await model.response.update({
            reply: null,
            reply_time: null
        },{
            where:{
                id_response: id_response
            }
        }); 

        await model.notification.destroy({
            where:{
                id_response: id_response,
                noti_type: REPLY_NOTI
            }
        })

        if (!reply) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,reply,"reply deleted")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const getPostMonthlyData = async (req,res) => {
    const {id_post, month, year} = req.body;

    try{
        const data = await model.post_monthly_data.findOne({
            where:{
                id_post: id_post,
                month: month,
                year: year
            }
        }); 

        if (!data) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,data,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const getHighlight = async (req,res) => {
    const {id_post, id_user} = req.params;

    try{
        const data = await model.highlight.findAll({
            where:{
                id_post: id_post,
                id_user: id_user
            }
        }); 

        successCode(res,data,"Highlight found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const createHighlight = async (req,res) => {
    const { updatedHighlights, id_post, id_user } = req.body;

    try{
        const existingHighlights = await model.highlight.findAll({
            where: { id_post: id_post, id_user: id_user }
        });

        const existingHighlightsMap = existingHighlights.reduce((acc, highlight) => {
            acc[`${highlight.start_index}-${highlight.end_index}`] = highlight;
            return acc;
        }, {});

        const updatedHighlightsMap = updatedHighlights.reduce((acc, highlight) => {
            acc[`${highlight.start_index}-${highlight.end_index}`] = highlight;
            return acc;
        }, {});

        const toDelete = existingHighlights.filter(highlight => 
            !updatedHighlightsMap[`${highlight.start_index}-${highlight.end_index}`]
        );

        const toInsert = updatedHighlights.filter(highlight => 
            !existingHighlightsMap[`${highlight.start_index}-${highlight.end_index}`]
        );

        for (const highlight of toDelete) {
            
            await model.highlight.destroy({
                where: { id_highlight: highlight.id_highlight }
            });
        }

        for (const highlight of toInsert) {

            await model.highlight.create({
                id_post: id_post,
                id_user: id_user,
                start_index: highlight.start_index,
                end_index: highlight.end_index,
                content: highlight.content,
                highlight_time: highlight.highlight_time
            });
        }

        successCode(res,null,"Highlight created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const deleteHighlight = async (req,res) => {
    const {start_index, end_index, id_user, id_post} = req.body;

    try{
        console.log({
            start_index, end_index, id_user, id_post
        })
        const data = await model.highlight.destroy({
            where:{
                start_index, end_index, id_user, id_post
            }
        }); 

        if (!data) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,data,"Highlight deleted")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}


module.exports = {
    getTrendingPost,
    getPostByID,
    getPostByKeyword,
    getPostByUser,
    getLikeOfPost,
    getResponseOfPost,

    createPost,
    updatePost,
    updatePaywallOfPost,
    updatePublishTimeOfPost,
    updateScheduleTimeOfPost,
    deletePost,
    
    readPost,

    likePost,
    unlikePost,
    responsePost,
    updateResponse,
    deleteResponse,
    replyResponse,
    updateReply,
    deleteReply,

    getHighlight,
    createHighlight,
    deleteHighlight,
    getPostMonthlyData
}