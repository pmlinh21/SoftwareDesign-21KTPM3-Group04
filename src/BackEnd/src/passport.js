const db = require('./models/index');
const init_models = require('./models/init-models');
const model = init_models(db.sequelize);

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require("dotenv").config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
async function(accessToken, refreshToken, profile, cb) {
    console.log("profile email: ", profile.emails[0].value)
    let user = await model.user.findOne({
        where: { email: profile.emails[0].value }
    })
    let admin = await model.admin.findOne({
        where: { email: profile.emails[0].value }
    })
    
    if (!user && !admin) {
        console.log("false");
        return cb(new Error('Email not found.'), false);
    }

    console.log("true");
    // Return the appropriate user object
    if (user && user.is_member == false) {
        return cb(null, {user, role: "1"});
    } else if (user && user.is_member == true) {
        return cb(null, {user, role: "2" });
    } else {
        return cb(null, {admin, role: "3"});
    }
    }
)); 