import asyncHandler from "express-async-handler";
import Category from "../models/category.model.js";
import slugify from "slugify";
import {isValidObjectId} from "mongoose";
import Product from "../models/product.model.js";

const getAllCategory = asyncHandler(async (req, res) => {
    const category = await Category.find();

    if (!category) {
        res.status(404);
        throw new Error("No categories found");
    }

    res.json(category);
});

const getProductByCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const category = await Category.findOne({
        $or: [{_id: isValidObjectId(id) ? id : undefined}, {slug: id}],
    });

    if (!category) {
        res.status(404);
        throw new Error("No product found for this category");
    }

    const products = await Product.find({
        category: category._id,
    }).populate("category", "id name");

    res.json(products);
});

//Private Routes
//ACCESS: ADMIN
const createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const slug = slugify(name);

    const existedCat = await Category.find({name: name});
    if (existedCat.length > 0) {
        res.status(400);
        throw new Error("This category already existed");
    }

    const brand = await Category.create({name, slug});

    res.json(brand);
});

const updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const slug = slugify(name);

    const existedCat = await Category.findById(id);
    if (!existedCat) {
        res.status(404);
        throw new Error("Category not found");
    }

    existedCat.name = name;
    existedCat.slug = slug;

    const brand = existedCat.save();

    res.json(brand);
});

const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const existedCat = await Category.findById(id);
    if (!existedCat) {
        res.status(404);
        throw new Error("Category not found");
    }

    await existedCat.remove();

    res.json({message: "Category removed"});
});

export {
    getAllCategory,
    getProductByCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
