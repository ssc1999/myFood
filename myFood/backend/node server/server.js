const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/myfood");
link;

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
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
});

app.listen(5000, () => {
    console.log("Server started on PORT 5000");
});
