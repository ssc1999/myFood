const { response } = require("express");
var express = require("express");
var router = express.Router();
const apiAdapter = require("../routers/apiAdapter");
const paths = require("./paths");
const BASE_URL = "http://127.0.0.1:8000";
const api = apiAdapter(BASE_URL);

// not done yet
// post calories
router.post("/calories", (routerRequest, routerResponse) => {
    console.log(routerRequest.body);
    api.post(routerRequest.path, routerRequest.body).then((fastApiResponse) => {
        console.log(fastApiResponse.data);
        routerResponse.send(fastApiResponse.data);
    });
});
