// is to construct the API endpoint for each service
const axios = require("axios");

module.exports = (baseURL) => {
    return axios.create({
        baseURL: baseURL,
    });
};
