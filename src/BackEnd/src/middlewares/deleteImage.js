const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY
});

const deleteImage = function (link) {
    const indexSplash = link.lastIndexOf("/");
    const indexDot = link.lastIndexOf(".");
    const public_id = "xplore" + link.substring(indexSplash,indexDot);

    cloudinary.uploader
        .destroy(public_id)
        .then(result => console.log(result))
}

module.exports = { deleteImage }