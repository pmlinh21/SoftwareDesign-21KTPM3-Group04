const express = require('express');
const reportRoute = express.Router();
const {
    getReportType,
    createReportPost,
    createReportResponse,
    getReportPost,
    getReportResponse,
    updateReportPost,
    updateReportResponse,
} = require('../controllers/reportController')

reportRoute.get("/type", getReportType)

reportRoute.get("/post", getReportPost)

reportRoute.get("/response", getReportResponse)


reportRoute.post("/post", createReportPost)

reportRoute.post("/response", createReportResponse)


reportRoute.put("/post/:id_report", updateReportPost)

reportRoute.put("/response/:id_report", updateReportResponse)

module.exports = reportRoute;