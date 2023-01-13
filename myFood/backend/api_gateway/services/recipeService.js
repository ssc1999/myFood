const { response } = require("express");
var express = require("express");
var router = express.Router();
const apiAdapter = require("../routers/apiAdapter");
const paths = require("./paths");
const BASE_URL = "http://127.0.0.1:8000";
const api = apiAdapter(BASE_URL);

// connects with fastapi
// const makeHandler = (method, callback) => (routerRequest, routerResponse) => {
//     api[method](routerRequest.path).then((fastApiResponse) => {
//         callback({ routerRequest, routerResponse, fastApiResponse });
//     });
// };

// // creates the router with the method, url and parameters
// const on = (method, path, callback) => {
//     router[method](path, makeHandler(method, callback));
// };

// // data = { routerRequest, routerResponse, fastApiResponse }

// const returnAllRecipes = (data) => {
//     console.log("lol");
//     console.log(data.fastApiRespone.body);
//     // console.log(data.fastApiRespone.body);
//     // console.log(data.fastApiRespone.data);
//     // data.routerResponse.send(data.fastApiResponse);
// };

// const returnRecipeById = (data) => {};

// const postRecipe = (data) => {};

// const deleteRecipeById = (data) => {};

// const initRecipeService = () => {
//     router.use(() => on("get", paths.allRecipes, returnAllRecipes));
//     router.use(() => on("get", paths.recipeById, returnRecipeById));
//     router.use(() => on("post", paths.allRecipes, postRecipe));
//     router.use(() => on("delete", paths.recipeById, deleteRecipeById));
// };

// router.get(paths.allRecipes, makeHandler("get", returnAllRecipes));

// get all recipes
router.get("/api/recipes", (routerRequest, routerResponse) => {
    api.get(routerRequest.path).then((fastApiResponse) => {
        routerResponse.send(fastApiResponse.data);
    });
});

// get a recipe by id
router.get("/api/recipe/*", (routerRequest, routerResponse) => {
    console.log(routerRequest.path);
    api.get(routerRequest.path).then((fastApiResponse) => {
        console.log(fastApiResponse.data);
        routerResponse.send(fastApiResponse.data);
    });
});

// post a recipe
router.post("/api/recipes", (routerRequest, routerResponse) => {
    console.log(routerRequest.body);
    api.post(routerRequest.path, routerRequest.body).then((fastApiResponse) => {
        console.log(fastApiResponse.data);
        routerResponse.send(fastApiResponse.data);
    });
});

// delete a recipe by id
router.delete("/api/recipe/*", (routerRequest, routerResponse) => {
    console.log(routerRequest.path);
    api.get(routerRequest.path).then((fastApiResponse) => {
        console.log(fastApiResponse.data);
        routerResponse.send(fastApiResponse.data);
    });
});

module.exports = router;
