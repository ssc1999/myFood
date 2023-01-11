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
            error: "Invalid username or password",
        });
    }

    const areEqualPasswords = await bcrypt.compare(password, user.password);
    // if the hashes are the same its fine
    if (areEqualPasswords) {
        // the combination is successful

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            JWT_SECRET
        );

        return res.json({
            status: "ok",
            data: token,
        });
    }

    res.json({
        status: "error",
        error: "Invalid username or password",
    });
};

const registerHandler = async (req, res) => {
    console.log(req.body);

    //the body return to the server a json with {username: x, password: y}
    //i save the password value from the json in plainTextPassword
    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== "string") {
        return res.json({
            status: "error",
            error: "Invalid username",
        });
    }
    if (!plainTextPassword || typeof plainTextPassword !== "string") {
        return res.json({
            status: "error",
            error: "Invalid password",
        });
    }
    if (plainTextPassword.length < 5) {
        return res.json({
            status: "error",
            error: "Password too small. At least 5 characters required",
        });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = await User.create({
            username,
            password,
        });
        console.log("User created successfully", response);
    } catch (error) {
        if (error.code === 11000) {
            return res.json({
                status: "error",
                error: "user alredy registered",
            });
        }
        throw error;
    }

    res.json({ status: "ok" });
};

const changePasswordHandler = async (req, res) => {
    const { token, newPassword: plainTextPassword } = req.body;

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
        return res.json({
            status: "error",
            error: "Invalid password",
        });
    }
    if (plainTextPassword.length < 5) {
        return res.json({
            status: "error",
            error: "Password too small. At least 5 characters required",
        });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);

        const _id = user.id;
        const password = await bcrypt.hash(plainTextPassword, 10);

        await User.updateOne(
            { _id },
            {
                $set: { password: password },
            }
        );

        console.log("JWT decoded: ", user);
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: "error", error: "Invalid token" });
    }
};

// post login
app.post("/login", loginHandler);
// post register
app.post("/register", registerHandler);
// post change-password
app.post("/change-password", changePasswordHandler);
// listen as default
app.listen(5000, defaultHandler);
