import asyncHandler from "express-async-handler";
import Brand from "../models/brand.model.js";
import slugify from "slugify";
import {isValidObjectId} from "mongoose";
import Product from "../models/product.model.js";

const getAllBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find();

    if (!brands) res.json({message: "No brand found"});

    res.json(brands);
});

const getProductByBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const brand = await Brand.findOne({
        $or: [{_id: isValidObjectId(id) ? id : undefined}, {slug: id}],
    });

    if (!brand) res.json({message: "No product found for this brand"});

    const products = await Product.find({
        brand: brand._id,
    }).populate("brand", "id name");

    res.json(products);
});

//Private Routes
//ACCESS: ADMIN
const createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const slug = slugify(name);

    const existedBrand = await Brand.find({name: name});
    if (existedBrand.length > 0) {
        res.status(400);
        throw new Error("Brand already existed");
    }

    const brand = await Brand.create({name, slug});

    res.json(brand);
});

const updateBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const slug = slugify(name);

    const existedBrand = await Brand.findById(id);
    if (!existedBrand) {
        res.status(404);
        throw new Error("Brand not found");
    }

    existedBrand.name = name;
    existedBrand.slug = slug;

    const brand = existedBrand.save();

    res.json(brand);
});

const deleteBrand = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const existedBrand = await Brand.findById(id);
    if (!existedBrand) {
        res.status(404);
        throw new Error("Brand not found");
    }

    await existedBrand.remove();

    res.json({message: "Brand removed"});
});

export {getAllBrands, getProductByBrand, createBrand, updateBrand, deleteBrand};
