const UserSchema = require("../models/User");
const express = require("express");
const route = express.Router();

route.post("/login", async (req, res) => {
    try {
        const enteredUsername = req.body.username;
        const enteredPassword = req.body.password;
        const user = await UserSchema.findOne({
            username: enteredUsername,
        });

        if (user != null && enteredPassword != null) {
            if (enteredPassword != user.password) {
                res.status(404).send({
                    status: false,
                    message: "Invalid Username and password",
                });
            } else {
                res.status(201).send({
                    status: true,
                    username: user.username,
                    message: "User logged in successfully",
                });
            }
        } else {
            res.status(404).send({
                status: false,
                message:
                    "Please Enter Username & Password",
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

route.post("/signup", async (req, res) => {
    try {
        const createdUser = new UserSchema(req.body);
        const user = await createdUser.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = route;
