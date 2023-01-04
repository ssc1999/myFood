var express = require("express");
var router = express.Router();
const apiAdapter = require("../routers/apiAdapter");

const BASE_URL = "http://127.0.0.1:8000";
const api = apiAdapter(BASE_URL);

// done
const recipesGetHandler = (req, res) => {
    // console.log(req.path);
    api.get(req.path).then((resp) => {
        console.log(JSON.stringify(resp.data, null, 4));
        console.log(resp.data.length);
        // res.send(resp.body);
    });
};

// have to do
const recipeGetHandler = (req, res) => {
    // console.log(req.path);
    api.get(req.path).then((resp) => {
        console.log(JSON.stringify(resp.data, null, 4));
        console.log(resp.data.length);
        // res.send(resp.body);
    });
};

// have to do
const recipePostHandler = (req, res) => {
    api.get(req.path).then((resp) => {
        res.send(resp.data);
    });
};

// have to do
const recipeDeleteHandler = (req, res) => {
    api.get(req.path).then((resp) => {
        res.send(resp.data);
    });
};

// get all recipes
router.get("/recipe", recipesGetHandler);
// get a recipe
router.get("/recipe/{id}", recipeGetHandler);
// post a recipe
router.post("/recipe", recipePostHandler);
// delete a recipe
router.delete("/recipe/{id}", recipeDeleteHandler);

module.exports = router;
