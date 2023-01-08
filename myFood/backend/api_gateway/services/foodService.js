const { response } = require("express");
var express = require("express");
var router = express.Router();
const apiAdapter = require("../routers/apiAdapter");
const paths = require("./paths");
const BASE_URL = "http://127.0.0.1:8000";
const api = apiAdapter(BASE_URL);

// get all food
router.get("/food", (routerRequest, routerResponse) => {
    api.get(routerRequest.path).then((fastApiResponse) => {
        routerResponse.send(fastApiResponse.data);
    });
});

// get food by name
router.get("/food/search/**", (routerRequest, routerResponse) => {
    var query = JSON.stringify(routerRequest.query);
    api.get(routerRequest.path, { params: routerRequest.query }).then(
        (fastApiResponse) => {
            routerResponse.send(fastApiResponse.data);
        }
    );
});

// get a food by id
router.get("/food/*", (routerRequest, routerResponse) => {
    console.log(routerRequest.path);
    api.get(routerRequest.path).then((fastApiResponse) => {
        console.log(fastApiResponse.data);
        routerResponse.send(fastApiResponse.data);
    });
});

// post a food
router.post("/food", (routerRequest, routerResponse) => {
    console.log(routerRequest.body);
    api.post(routerRequest.path, routerRequest.body).then((fastApiResponse) => {
        console.log(fastApiResponse.data);
        routerResponse.send(fastApiResponse.data);
    });
});

// delete a food by id
router.delete("/food/*", (routerRequest, routerResponse) => {
    console.log(routerRequest.path);
    api.get(routerRequest.path).then((fastApiResponse) => {
        console.log(fastApiResponse.data);
        routerResponse.send(fastApiResponse.data);
    });
});

module.exports = router;
