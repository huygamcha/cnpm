import {configureStore} from "@reduxjs/toolkit";
import reducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import loginReducer from "./slices/loginSlice";
import signupSlice from "./slices/signupSlice";
import userDetailsReducer from "./slices/userDetailsSlice";
import orderReducer from "./slices/orderSlice";
import orderPayReducer from "./slices/orderPaySlice";
import orderListReducer from "./slices/orderListSlice";
import usersReducer from "./slices/usersSlice";
import brandSlice from "./slices/brandSlice";
import categorySlice from "./slices/categorySlice";

const rootReducer = {
    productsList: reducer,
    cart: cartReducer,
    login: loginReducer,
    signup: signupSlice,
    userDetails: userDetailsReducer,
    order: orderReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    users: usersReducer,
    brands: brandSlice,
    categories: categorySlice,
};

const store = configureStore({reducer: rootReducer});

export default store;
