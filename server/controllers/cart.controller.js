import asyncHandler from "express-async-handler";
import Cart from "../models/cart.model.js";

const getUserCart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cart = await Cart.find({ user: id }).populate("product");

  if (!cart) {
    res.json({ message: "Your cart is empty." });
  } else res.json(cart);
});

const addCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { item, qty } = req.body;

  const cart = await Cart.find({ user: id });

  if (!cart) {
    const cartItem = [{ item, qty }];
    const newCart = await Cart.create({ user: id, cartItems: [cartItem] });

    res.json(newCart);
  } else {
    cart.cartItems.push({ item, qty });

    const newCart = cart.save();
    res.json(newCart);
  }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { itemId } = req.body;

  const cart = await Cart.find({ user: id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found.");
  }

  const items = cart.cartItems.filter((i) => i.item != itemId);
  cart.cartItems = items;
  await cart.save();

  res.json({ message: "remove item" });
});

export { getUserCart, addCartItem, deleteCartItem };
