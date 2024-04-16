const db = require("../models/index");
const sequelize = db.sequelize;
const { Op, literal } = require("sequelize");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require("../config/response");

const LIKE_NOTI = 1, RESPONSE_NOTI = 2, REPLY_NOTI = 3, SUBSCRIBE_NOTI = 4


const getTrendingPost = async (req,res) => {
    try{
        const posts = await model.reading_history.findAll({
            where: {
                reading_time: {
                    [Op.gte]: literal(`NOW() - INTERVAL '24 hour'`), // Greater than or equal to 24 hours ago
                },
            },
            group: ['id_post'],
            attributes: [
                'id_post',
                [sequelize.fn('count', '*'), 'readingCount'],
            ],
            order: [[sequelize.col('readingCount'), 'DESC']], // Order by userCount descending
            limit: 3,
        });
        
        console.log(posts)
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
            }
        }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,post,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const getPostByKeyword = async (req, res) => {
    const { keyword, id_user } = req.params;

    try {
        const posts = await model.post.findAll({
            where: {
                content: {
                    [Op.like]: `%${keyword}%`,
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
                    model: model.user,
                    as: "author",
                    attributes: ["fullname", "avatar", "id_user"],
                },
                {
                    model: model.list,
                    as: "is_saved",
                    attributes: ["id_list"],
                    through: { attributes: [] },
                    where: {
                        id_user: id_user
                    },
                    required: false
                },
            ],
            attributes: ["title", "content", "publish_time", "thumbnail", "id_post"]
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
        const post = await model.post.findAll({
            where:{
                id_user: id_user
            }
        }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,post,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const getLikeOfPost = async (req,res) => {
    const {id_post} = req.params;

    try{
        const count = await model.post.findOne({
            where: { id_post: id_post },
            include: {
              model: model.like_post,
              as: "like_posts",
              attributes: [],
            },
            attributes: [
                "id_post",
                [sequelize.fn("COUNT", sequelize.col("like_posts.id_user")), "likeCount"]
            ],
            group: ["post.id_post"],
        });

        if (!count) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,count,"Post found")
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
                    attributes: ["fullname"],
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
                            attributes: ["id_user","fullname"],
                        }
                    ]
                }
            ],
            attributes:[]
        
        })

        if (!response) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,response,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const createPost = async (req,res) => {
    const {id_user, title, content, thumbnail,creation_time,
            status, publish_time, is_member_only} = req.body;

    try{
        const post = await model.post.create({
            id_user, title, content, thumbnail,creation_time,
            status: 0, publish_time, is_member_only
        }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,post,"Post created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const updatePost = async (req,res) => {
    const {id_post, title, content, thumbnail} = req.body;
    try{
        const post = await model.post.update({
            title: title, content: content, thumbnail: thumbnail
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
    const {id_post} = req.body;

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
            // delte topic_post, post_monthly_data, report_post
            // delete reading_history, list_post, like, highlight, 

            await model.post.destroy({
                where:{
                    id_post: id_post
                }
            }); 

            // delete notfication, response, report_response

            successCode(res,post,"Post deleted")
        }
        
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

        await model.notification.create({
            creator: id_user,
            receiver: post.id_user,
            id_post: id_post,
            id_response: null,
            noti_type: 1,
            noti_time: new Date(),
        }); 

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
    const {id_post, id_user} = req.body;

    try{
        const like = await model.like_post.destroy({
            where:{
                id_post: id_post,
                id_user: id_user
            }
        }); 

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

        await model.notification.create({
            creator: id_user,
            receiver: post.id_user,
            id_post: id_post,
            id_response: data.id_response,
            noti_type: 2,
            noti_time: response_time,
        });  

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

const deleteResponse = async (req,res) => {
    const {id_response} = req.body;

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

        if (!count) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,count,"reply created")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const deleteReply = async (req,res) => {
    const {id_response} = req.body;

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

const createHighlight = async (req,res) => {
    const {id_post, time} = req.params;

    try{
        const data = await model.post_monthly_data.findOne({
            where:{
                id_post: id_post
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

const deleteHighlight = async (req,res) => {
    const {id_post, time} = req.params;

    try{
        const data = await model.post_monthly_data.findOne({
            where:{
                id_post: id_post
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
    likePost,
    unlikePost,
    responsePost,
    deleteResponse,
    replyResponse,
    deleteReply,
    createHighlight,
    deleteHighlight,
    getPostMonthlyData
}