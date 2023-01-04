var express = require("express");
var router = express.Router();
const apiAdapter = require("./apiAdapter");

const BASE_URL = "http://127.0.0.1:8000";
const api = apiAdapter(BASE_URL);

router.get("/recipe", (req, res) => {
    // console.log(req);
    console.log(req.path);
    api.get(req.path).then((resp) => {
        console.log(JSON.stringify(resp.data, null, 4));
        console.log(resp.data.length);
        // res.send(resp.body);
    });
    // const fetched = fetch(BASE_URL + req.path);
    // fetched
    //     .then((data) => data.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.log(error.message));
});

// router.get("/recipe/{id}", (req, res) => {
//     api.get(req.path).then((resp) => {
//         res.send(resp.data);
//     });
// });

router.post("/recipe", (req, res) => {
    api.get(req.path).then((resp) => {
        res.send(resp.data);
    });
});

router.delete("/recipe/{id}", (req, res) => {
    api.get(req.path).then((resp) => {
        res.send(resp.data);
    });
});

module.exports = router;
