var express = require("express");
var router = express.Router();
const apiAdapter = require("./apiAdapter");

const BASE_URL = "http://localhost:8088";
const api = apiAdapter(BASE_URL);

router.get("/hashtags", (req, res) => {
    api.get(req.path).then((resp) => {
        res.send(resp.data);
    });
});

router.get("/hashtags/:name", (req, res) => {
    api.get(req.path).then((resp) => {
        res.send(resp.data);
    });
});

module.exports = router;
