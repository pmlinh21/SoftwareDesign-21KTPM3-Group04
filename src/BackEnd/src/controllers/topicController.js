const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { successCode, failCode, errorCode } = require('../config/response');

const get = async (req,res) => {
    try{
        successCode(res,null," found")
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }

}

module.exports = {
    
}