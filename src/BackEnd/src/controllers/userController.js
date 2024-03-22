const db = require('../models/index');
const sequelize = db.sequelize;
const init_models = require('../models/init-models');
const model = init_models(sequelize);

const { successCode, failCode, errorCode } = require('../config/response');

// GET: Login
const login = async(req, res) =>{
    let { email, pwd } = req.body

    try{
        let user = await model.user.findOne({
            where: {
                email
            }
        });

        if (user){
            //let checkPass = bcrypt.compareSync(pwd, user.password);
            if(pwd === user.password){
                successCode(res, user, "Login successfully");
                return;
            }
            // if(checkPass){
            //     user.password = '**********';
            //     sucessCode(res, user, "Login successfully");
            //     return;
            // }
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
        let { email, password } = req.body;
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
            let data = await model.user.create({ email, password: passWordHash });
            successCode(res, data, "Sign up successfully");
            return;
        }
    }
    catch(err){
        console.log(err)
        errorCode(res,"Internal Server Error")
    }
}

module.exports = { login, signup }