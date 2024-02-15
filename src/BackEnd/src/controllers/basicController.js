const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { successCode, failCode, errorCode } = require('../config/response');

const getReportType = async (req,res) => {
    try{
        let data = await model.report_type.findAll()
        successCode(res,data,"Get thành công")
    }
    catch(err){
        errorCode(res,err)
    }

}

module.exports = {
    getReportType
}