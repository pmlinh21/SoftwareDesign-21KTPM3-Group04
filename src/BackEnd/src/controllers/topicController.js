const db = require('../models/index');
const sequelize = db.sequelize;
const { Op, literal, fn, col } = require("sequelize");
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { successCode, failCode, errorCode } = require('../config/response');

// GET: Get all topic
const getAllTopic = async (req, res) => {
    try{
        let topic = await model.topic.findAll()
        successCode(res, topic, "All topic found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

// GET: Search topic by name
const searchTopicByName = async (req, res) => {
    let { topic_name } = req.params

    try {
        let topic = await model.topic.findAll({
            where:{
                topic:{
                    [Op.like]: `%${topic_name}%`,
                }
            } 
        })
        successCode(res, topic, "Topic found")
    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
} 

// GET: Search topic by id and get all posts by following topic
const searchTopicPostByID = async (req, res) => {
    let { id, id_user } = req.params

    try {
        // Check if topic is exist
        let check = await model.topic.findOne({
            where:{
                id_topic: id
            } 
        })
        if (!check) {
            failCode(res, null, "Invalid ID")
        }
        else{
            const posts = await model.post.findAll({
                include: [
                    {
                        model: model.topic,
                        as: "list_topic",
                        attributes: ["topic"],
                        through: { attributes: [] },
                        where: {
                            id_topic: id
                        },
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
                attributes: [
                    "title", "content", "publish_time", "thumbnail", "id_post",
                ],     
            });

            successCode(res, posts, "Topic and it's posts found") 
        }

    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
} 

// GET: Get trending topic
const getTrendingTopics = async (req, res) => {
    try{
        const posts = await model.reading_history.findAll({
            where: {
                reading_time: {
                    [Op.gte]: literal(`NOW() - INTERVAL '24 hour'`),
                },
            },
            group: ['id_post'],
            attributes: [
                'id_post',
                [sequelize.fn('count', '*'), 'readingCount'],
            ],
            order: [[sequelize.col('readingCount'), 'DESC']],
            limit: 3,
        });
        
        const trendingPostsIds = posts.map(post => post.id_post);

        const topics = await model.topic.findAll({
            include: [
                {
                    model: model.topic_post,
                    as: 'topic_posts',
                    where: {
                        id_post: trendingPostsIds
                    }
                },
            ],
        });
        successCode(res, topics, "Trending topics found");
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const getFollowerUser = async (req,res) => {
    let { id } = req.params

    try {
        // Check if topic is exist
        let check = await model.topic.findOne({
            where:{
                id_topic: id
            } 
        })
        if (!check) {
            failCode(res, null, "Invalid ID")
        }
        else{
            const followerCount = await model.topic_user.findOne({
                where:{
                    id_topic: id
                },
                attributes: [
                    [fn('COUNT', col('id_user')), 'followerCount'],
                ],     
            });

            successCode(res, followerCount, "Topic and it's posts found") 
        }

    } catch (err) {
        console.log(err)
        errorCode(res,"Internal Server Error")
    }    
}

module.exports = { getAllTopic, searchTopicByName, searchTopicPostByID, getTrendingTopics, getFollowerUser }