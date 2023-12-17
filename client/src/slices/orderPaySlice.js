import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const updateOrderToPaid = createAsyncThunk(
    "updateOrderTopaid",
    async ({id, paymentResult}) => {
        const currentUser = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };
        const {data} = await axios
            .put(`/api/orders/${id}/pay`, paymentResult, config)
            .catch((err) => console.log(err));
        return data;
    }
);

const initialState = {
    loading: false,
    success: false,
    error: "",
};

const orderPaySlice = createSlice({
    name: "orderPay",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateOrderToPaid.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateOrderToPaid.fulfilled, (state) => {
            state.success = true;
            state.loading = false;
        });
        builder.addCase(updateOrderToPaid.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

const {reducer} = orderPaySlice;
export default reducer;
export {updateOrderToPaid};
