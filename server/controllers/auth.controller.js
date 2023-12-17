import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            avatar: user.avatar,
        });
    } else if (user) {
        res.status(400);
        throw new Error("Invalid password, please try again.");
    } else {
        res.status(400);
        throw new Error("User not found.");
    }
});

const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const existUser = await User.findOne({email: email});

    if (existUser) {
        res.status(400);
        throw new Error("Email has already been used.");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export {login, register};
