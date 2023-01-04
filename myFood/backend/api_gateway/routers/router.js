// to combine all the services endpoints into one
var express = require("express");
var router = express.Router();
var feedService = require("./feedService");
var recipeService = require("./recipeService");
var userService = require("./userService");

router.use((req, res, next) => {
    console.log("Called: ", req.path);
    next();
});

router.use(feedService);
router.use(recipeService);
router.use(userService);

module.exports = router;
