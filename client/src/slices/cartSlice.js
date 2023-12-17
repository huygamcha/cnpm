import {createSlice} from "@reduxjs/toolkit";

const currentCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const shippingAdd = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {};

const paymentMethod = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : "";

const initialState = {
    cartItems: currentCart,
    shipping: shippingAdd,
    payment: paymentMethod,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.cartItems.push(action.payload);
            console.log(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        saveShippingAddress: (state, action) => {
            state.shipping = action.payload;
            localStorage.setItem("shipping", JSON.stringify(action.payload));
        },
        savePaymentMethod: (state, action) => {
            state.payment = action.payload;
            localStorage.setItem("payment", JSON.stringify(action.payload));
        },
    },
});

const {reducer, actions} = cartSlice;
export default reducer;
export const {
    addItemToCart,
    removeItem,
    saveShippingAddress,
    savePaymentMethod,
} = actions;
