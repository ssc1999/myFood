const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "lksjdafos;dh#@$!@%HAWHDNF";

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/myfood", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

const defaultHandler = () => {
    console.log("Server started on PORT 5000");
};

const loginHandler = async (req, res) => {
    const { username, password } = req.body;

    // .lean() so that mongoose return a simple json with the username and password
    const user = await User.findOne({ username }).lean();

    if (!user) {
        return res.json({
            status: "error",
            error: {
                message: "Invalid username or password",
                code: 1
            },
        });
    }

    const areEqualPasswords = await bcrypt.compare(password, user.password);
    // if the hashes are the same its fine

    if (areEqualPasswords) {
        return res.json({
            status: "ok",
            user_id: user._id,
            username: user.username,
        });
    }

    res.json({
        status: "error",
        error: {
            message: "Invalid username or password",
            code: 1
        },
    });
};

const validatePassword = (candidatePassword) => candidatePassword.length > 8 && candidatePassword.match(/(\!|@|#|\$|%|\^|&|\*)/g)

const registrationHandler = async (req, res) => {
    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== "string") {
        return res.json({
            status: "error",
            error: {
                message: "Invalid username",
                code: 1
            },
        });
    }
    if (!plainTextPassword || typeof plainTextPassword !== "string") {
        return res.json({
            status: "error",
            error: {
                message: "Invalid password",
                code: 2
            },
        });
    }
    if (!validatePassword(plainTextPassword)) {
        return res.json({
            status: "error",
            error: {
                message: "Password not long enough or doesn't include special characters.",
                code: 3
            },
        });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);


    const response = await User.create({
        username,
        password,
    }).then(res => ({ status: "ok" })
    ).catch(err => {
        console.error(err);
        if (err.code === 11000) {
            return {
                status: "error",
                error: {
                    message: "User already exists",
                    code: 4
                },
            };
        }
    });

    const data = await response;
    console.log({ data });
    res.json(data)
};

const changePasswordHandler = async (req, res) => {

    console.log('server.js primer logger', req.body);
    const _id = req.body.id;
    
    // console.log(_id, password);

    const validatePassword = (candidatePassword) => candidatePassword.length > 8 && candidatePassword.match(/(\!|@|#|\$|%|\^|&|\*)/g)

    if (!validatePassword(req.body.password)) {
        return res.json({
            status: "error",
            error: {
                message: "Password not long enough or doesn't include special characters.",
                code: 1
            },
        });
    }
    const password = await bcrypt.hash(req.body.password, 10);

    const response = await User.updateOne(
        { _id },
        {
            $set: { password: password },
        }
    ).then(res => ({ status: "ok" })
    ).catch(error => ({ status: "error", error: {
                    message: "Invalid token",
                    code: 2
    }
    }));
    const data = await response;
    console.log({ data });
    res.json(data)
};

// post login
app.post("/login", loginHandler);
// post register
app.post("/register", registrationHandler);
// post change-password
app.post("/change-password", changePasswordHandler);
// listen as default
app.listen(5000, defaultHandler);
