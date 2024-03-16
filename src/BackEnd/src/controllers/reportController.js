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

module.exports = {
    getReportType
}