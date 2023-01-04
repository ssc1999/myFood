var express = require("express");
var router = express.Router();
const apiAdapter = require("./apiAdapter");

const BASE_URL = "http://localhost:5000";
const api = apiAdapter(BASE_URL);

router.post("/login", (req, res) => {
    api.post(req.path).then((resp) => {
        res.send(resp.data);
    });
});

router.post("/register", (req, res) => {
    api.post(req.path).then((resp) => {
        res.send(resp.data);
    });
});

router.post("/change-password", (req, res) => {
    api.post(req.path).then((resp) => {
        res.send(resp.data);
    });
});

module.exports = router;
