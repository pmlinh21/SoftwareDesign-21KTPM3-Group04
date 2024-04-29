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
                    [Op.iLike]: `%${topic_name}%`,
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
    let { ids } = req.params

    ids = ids.split(",")

    try {
        // Check if topic is exist
        let check = await model.topic.findOne({
            where:{
                id_topic: ids
            } 
        })
        if (!check) {
            failCode(res, null, "Invalid ID")
        }
        else{
            const results = await Promise.all(ids.map(async (item) => {
                const posts = await model.post.findAll({
                    include: [
                        {
                            model: model.topic,
                            as: "list_topic",
                            attributes: ["topic"],
                            through: { attributes: [] },
                            where: {
                                id_topic: item, // Use item instead of ids
                            },
                        },
                        {
                            model: model.user,
                            as: "author",
                            attributes: ["fullname", "avatar", "id_user"],
                        },
                    ],
                    attributes: [
                        "title", "content", "publish_time", "thumbnail", "id_post",
                    ],
                });
            
                return posts;
            }));
            

            successCode(res, results, "Topic and it's posts found") 
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