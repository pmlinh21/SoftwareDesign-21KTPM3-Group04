const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("."));

const cors = require('cors');
app.use(cors());

app.listen(8080);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rootRoute = require('./routes');
app.use("/api", rootRoute);

// app.get("/api/report", (req, res) => {
//     model.report_type.findAll().then((data) => {
//         res.status(200).json({
//             message: "success",
//             content: data
//         });
//     }).catch((err) => {
//         res.status(400).json({
//             message: "fail",
//             content: err
//         });
//     });
// })
