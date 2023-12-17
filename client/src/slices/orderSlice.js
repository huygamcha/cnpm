import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("userInfo"));

const createOrder = createAsyncThunk(
    "createNewOrder",
    async ({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };
        const {data} = await axios
            .post(
                `/api/orders`,
                {
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                },
                config
            )
            .catch((err) => console.log(err));
        return data;
    }
);

const getOrderById = createAsyncThunk("getOrderById", async (id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios
        .get(`/api/orders/${id}`, config)
        .catch((err) => console.log(err));
    return data;
});

//admin routes
const updateOrderToDelivered = createAsyncThunk(
    "updateOrderToDelivered",
    async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };
        const {data} = await axios
            .put(`/api/orders/${id}/deliver`, {}, config)
            .catch((err) => console.log(err));
        return data;
    }
);

const initialState = {
    success: false,
    order: {},
    error: "",
    loading: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //public
        //create order
        builder.addCase(createOrder.pending, (state) => {
            state.success = false;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.success = true;
            state.order = action.payload;
            state.error = "";
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //get order by id
        builder.addCase(getOrderById.pending, (state) => {
            state.loading = true;
            state.order = {};
            state.error = "";
        });
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = "";
        });
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loading = false;
            state.order = {};
            state.error = action.error;
        });

        //admin only
        //update order to delivered
        builder.addCase(updateOrderToDelivered.pending, (state) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(updateOrderToDelivered.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.success = true;
        });
        builder.addCase(updateOrderToDelivered.rejected, (state, action) => {
            state.loading = false;
            state.order = {};
            state.error = action.error;
        });
    },
});

const {reducer} = orderSlice;
export default reducer;
export {createOrder, getOrderById, updateOrderToDelivered};
