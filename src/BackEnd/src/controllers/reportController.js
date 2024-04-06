const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { successCode, failCode, errorCode } = require('../config/response');

const getReportType = async (req,res) => {
    try{
        let report_type = await model.report_type.findAll()
        successCode(res,report_type,"Report type found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const createReportPost = async (req,res) => {
    const {id_post, id_user, id_report_time, report_time} = req.body
    try{
        let report = await model.report_post.create({
            id_post: id_post, 
            id_user: id_user, 
            id_report_time: id_report_time, 
            report_time: report_time,
            status: false
        })
        successCode(res,report,"Report found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const createReportResponse = async (req,res) => {
    const {id_response, id_user, id_report_time, report_time} = req.body
    try{
        let report = await model.report_post.create({
            id_response: id_response, 
            id_user: id_user, 
            id_report_time: id_report_time, 
            report_time: report_time,
            status: false
        })
        successCode(res,report,"Report found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const getReportPost = async (req,res) => {
    try{
        let report_post = await model.report_post.findAll()
        successCode(res,report_post,"Report found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const getReportResponse = async (req,res) => {
    try{
        let report_response = await model.report_response.findAll()
        successCode(res,report_response,"Report type found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const updateReportPost = async (req,res) => {
    const {id_report} = req.params
    try{
        let report_post = await model.report_post.update({
            status: true
        },{
            where:{
                id_report: id_report
            }
        })
        successCode(res,report_post,"Report found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

const updateReportResponse = async (req,res) => {
    const {id_report} = req.params
    try{
        let report_response = await model.report_response.update({
            status: true
        },{
            where:{
                id_report: id_report
            }
        })
        successCode(res,report_response,"Report found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

module.exports = {
    getReportType,
    createReportPost,
    createReportResponse,
    getReportPost,
    getReportResponse,
    updateReportPost,
    updateReportResponse,
}