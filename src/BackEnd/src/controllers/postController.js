const db = require("../models/index");
const sequelize = db.sequelize;
const { Op, literal } = require("sequelize");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require("../config/response");

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

const getPostByKeyword = async (req,res) => {
    const {keyword} = req.params;

    try{
        const posts = await model.post.findAll({
            where: {
              content: {
                [Op.like]: `%${keyword}%`,
              },
            },
          });

        successCode(res,posts,"Get thành công")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
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
    // const {id_post} = req.params;

    try{
        // const post = await model.post.findOne({
        //     where:{
        //         id_post: id_post
        //     }
        // }); 

        if (!post) {
            failCode(res, null, "Invalid ID")
        }

        successCode(res,null,"Post found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

const updatePost = async (req,res) => {
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

const updatePaywallOfPost = async (req,res) => {
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

const updatePublishTimeOfPost = async (req,res) => {
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

const updateScheduleTimeOfPost = async (req,res) => {
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

const getPostMonthlyData = async (req,res) => {
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
    // deletePost,
    // likePost,
    // unlikePost,
    // responsePost,
    // deleteResponse,
    // replyResponse,
    // deleteReply,
    // createHighlight,
    // deleteHighlight,
    getPostMonthlyData
}