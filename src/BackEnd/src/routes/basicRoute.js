const express = require('express');
const basicRoute = express.Router();
const {getReportType} = require('../controllers/basicController')

basicRoute.get("/getReportType", getReportType)

module.exports = basicRoute;