import dotenv from "dotenv";
import mongoose from "mongoose";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import Brand from "./models/brand.model.js";
import Category from "./models/category.model.js";
import Cart from "./models/cart.model.js";
import brand from "./data/brand.js";
import category from "./data/category.js";

dotenv.config();

connectDB();

async function importData() {
    try {
        await Brand.deleteMany();
        await Category.deleteMany();
        await Cart.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        //  await Brand.insertMany(brand);
        // const brandId = createdBrand[0];

        // const createdCategory = await Category.insertMany(category);
        // const categoryId = createdCategory;

        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser};
        });

        await Product.insertMany(sampleProducts);

        console.log("Data imported!" + adminUser);
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

async function destroyData() {
    try {
        await Brand.deleteMany();
        await Category.deleteMany();
        await Cart.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data destroyed!");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

process.argv[2] === "-d" ? destroyData() : importData();
