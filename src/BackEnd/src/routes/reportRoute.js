const express = require('express');
const reportRoute = express.Router();
const {getReportType} = require('../controllers/reportController')

reportRoute.get("/type", getReportType)

module.exports = reportRoute;