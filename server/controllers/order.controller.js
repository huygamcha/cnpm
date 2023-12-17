import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";

const pageSize = 20;

const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    const order = await Order.create({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    res.json(order);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (order) res.json(order);
    else {
        throw new Error("Order not found!");
    }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updateOrder = await order.save();
        res.json(updateOrder);
    } else {
        res.status(404);
        throw new Error("Order not found.");
    }
});

const getMyOrders = asyncHandler(async (req, res) => {
    const page = Number(req.query.pageNumber) || 1;

    const order = await Order.find({user: req.user._id})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    if (order) res.json(order);
    else {
        throw new Error("Order not found!");
    }
});

//PRIVATE ROUTES
//Access Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const page = Number(req.query.pageNumber) || 1;

    const orders = await Order.find({})
        .populate("user", "id name")
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    if (orders) res.json(orders);
    else {
        throw new Error("Orders not found!");
    }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updateOrder = await order.save();
        res.json(updateOrder);
    } else {
        res.status(404);
        throw new Error("Order not found.");
    }
});

export {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders,
    updateOrderToDelivered,
};
