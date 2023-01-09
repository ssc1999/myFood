// to combine all the services endpoints into one
var express = require("express");
var router = express.Router();
var caloriesService = require("../services/caloriesService");
var foodService = require("../services/foodService");
var recipeService = require("../services/recipeService");
var userService = require("../services/userService");

router.use((req, res, next) => {
    console.log("Called: ", req.path);
    next();
});

// recipeService();

// router.use(caloriesService);
router.use(foodService);
router.use(recipeService);
router.use(userService);

module.exports = router;
