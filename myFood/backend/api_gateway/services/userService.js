const { response } = require("express");
var express = require("express");
var router = express.Router();
const apiAdapter = require("../routers/apiAdapter");
const paths = require("./paths");
const BASE_URL = "http://127.0.0.1:5000";
const api = apiAdapter(BASE_URL);
const jwt = require("jsonwebtoken");

//server.js imports
const path = require("path");
const bodyParser = require("body-parser");
const { json } = require("body-parser");

const JWT_SECRET = "lksjdafos;dh#@$!@%HAWHDNF";

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

const defaultHandler = () => {
    console.log("Server started on PORT 5000");
};

// login
router.post("/login", (routerRequest, routerResponse) => {
    api.post(routerRequest.path, routerRequest.body).then((fastApiResponse) => {
        if (fastApiResponse.data.status === "ok") {
            // the combination is successful

            const token = jwt.sign(
                {
                    id: fastApiResponse.data.user_id,
                    username: fastApiResponse.data.username,
                },
                JWT_SECRET
            );

            fastApiResponse.data = {
                status: "ok",
                data: token,
            };
        }
        routerResponse.send(fastApiResponse.data);
    });
});

// // register
// router.post("/register", (routerRequest, routerResponse) => {
//     console.log(routerRequest.body);
//     api.post(routerRequest.path, routerRequest.body).then((fastApiResponse) => {
//         console.log(fastApiResponse.data);
//         routerResponse.send(fastApiResponse.data);
//     });
// });

// // change password
// router.post("/change-password", (routerRequest, routerResponse) => {
//     console.log(routerRequest.body);
//     api.post(routerRequest.path, routerRequest.body).then((fastApiResponse) => {
//         console.log(fastApiResponse.data);
//         routerResponse.send(fastApiResponse.data);
//     });
// });

// const detokenize = (token) => {
//     user = jwt.decode(token);
//     return user;
// };

module.exports = router;
