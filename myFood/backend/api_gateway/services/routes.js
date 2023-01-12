var express = require("express");
var router = express.Router();
const path = require('path');

const pathsMap = [
    'login.html',
    'register.html',
    'index.html',
    'imc.html',
    'change-password.html',
    'food.html',
    'recipes.html'
]

const getPath = (hook) => path.join(__dirname, '/', '../../../frontend/templates', hook)

pathsMap.forEach((hook) => {

    router.get(`/${hook}`, (req, res) => {
        res.sendFile(getPath(hook));
    });
})

module.exports = router;
