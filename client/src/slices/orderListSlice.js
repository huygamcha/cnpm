import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("userInfo"));

const getMyOrders = createAsyncThunk("getMyOrders,", async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.get(`/api/orders/myorders`, config);
    return data;
});

const getAllOrders = createAsyncThunk("getAllOrders,", async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.get(`/api/orders`, config);
    return data;
});

const initialState = {
    orders: [],
    error: "",
    loading: false,
};

const orderListSlice = createSlice({
    name: "orderList",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMyOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(getMyOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        //For Admin
        //get all orders
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

const {reducer} = orderListSlice;
export default reducer;
export {getMyOrders, getAllOrders};
