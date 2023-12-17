import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const pageSize = 20;

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
        });
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.avatar = req.body.avatar || user.avatar;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//Private Routes
//@ACESS: Admin

const getAllUsers = asyncHandler(async (req, res) => {
    const page = Number(req.query.pageNumber) || 1;

    const user = await User.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    if (user) {
        res.json(user);
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({message: "User Removed"});
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

const updatePrivateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

export {
    getUserProfile,
    updateUser,
    getAllUsers,
    deleteUser,
    updatePrivateUser,
    getUserById,
};
