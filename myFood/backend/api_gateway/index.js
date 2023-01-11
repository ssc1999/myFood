var express = require("express");
var app = express();
var router = require("./routers/router");
var bodyParser = require("body-parser");
const path = require('path');
const index = path.join(__dirname, '/', '../../frontend/templates', 'signUp.html' );
app.use(express.static('../../frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// const cors = require('cors')

// app.use(cors({ origin: whiteList }))

app.get("/", (req, res) => {
    res.sendFile(index);
});

app.use(router);

console.log("Simple API Gateway run on localhost:3000");

app.listen(3000);
