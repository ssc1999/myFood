const { response } = require("express");
var express = require("express");
var router = express.Router();
const apiAdapter = require("../routers/apiAdapter");
const paths = require("./paths");
const BASE_URL = "http://127.0.0.1:8000";
const api = apiAdapter(BASE_URL);
const externalApi = apiAdapter();
const axios = require("axios");


// get food by name
router.get("/api/food/search/**", (routerRequest, routerResponse) => {
    console.log({routerRequest})
    const options = {
        method: 'GET',
        url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
        params: routerRequest.query,
        headers: {
            'X-RapidAPI-Key': 'e6b6f6c0a5mshb1264d10e679cffp1ec677jsncac5cfff3a61',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };
      
    axios.request(options).then(function (response) {
        console.log(response.data);
        routerResponse.send(response.data);
    }).catch(function (error) {
        routerResponse.send(error);
    });
});

// get a food by id
router.get("/api/food/**", (routerRequest, routerResponse) => {
    console.log({routerRequest})
    const options = {
        method: 'GET',
        url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser',
        params: routerRequest.query,
        headers: {
            'X-RapidAPI-Key': 'e6b6f6c0a5mshb1264d10e679cffp1ec677jsncac5cfff3a61',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };
      
    axios.request(options).then(function (response) {
        console.log(response.data);
        routerResponse.send(response.data);
    }).catch(function (error) {
        routerResponse.send(error);
    });
});

// // get all food
// router.get("/food", (routerRequest, routerResponse) => {
//     api.get(routerRequest.path).then((fastApiResponse) => {
//         routerResponse.send(fastApiResponse.data);
//     });
// });

// // post a food
// router.post("/food", (routerRequest, routerResponse) => {
//     console.log(routerRequest.body);
//     api.post(routerRequest.path, routerRequest.body).then((fastApiResponse) => {
//         console.log(fastApiResponse.data);
//         routerResponse.send(fastApiResponse.data);
//     });
// });

// // delete a food by id
// router.delete("/food/*", (routerRequest, routerResponse) => {
//     console.log(routerRequest.path);
//     api.get(routerRequest.path).then((fastApiResponse) => {
//         console.log(fastApiResponse.data);
//         routerResponse.send(fastApiResponse.data);
//     });
// });

// router.get("/food/search/**", (routerRequest, routerResponse) => {
//     var query = JSON.stringify(routerRequest.query);
//     api.get(routerRequest.path, { params: routerRequest.query }).then(
//         (fastApiResponse) => {
//             routerResponse.send(fastApiResponse.data);
//         }
//     );
// });

// router.get("/food/*", (routerRequest, routerResponse) => {
//     console.log(routerRequest.path);
//     api.get(routerRequest.path).then((fastApiResponse) => {
//         console.log(fastApiResponse.data);
//         routerResponse.send(fastApiResponse.data);
//     });
// });

module.exports = router;
