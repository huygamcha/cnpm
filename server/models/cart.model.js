import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        href: "user",
    },
    cartItems: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                href: "product",
            },
            qty: {
                type: Number,
                require: true,
                default: 1,
            },
        },
    ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
