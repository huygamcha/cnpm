import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const updateUser = createAsyncThunk(
    "users/profile",
    async ({id, name, email, password, avatar}) => {
        const currentUser = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };

        const {data} = await axios.put(
            `/api/users/profile`,
            {
                name,
                email,
                password,
                avatar,
            },
            config
        );
        console.log(data);
        return data;
    }
);

const initialState = {
    loading: false,
    error: "",
    success: false,
};

const userDetailsSlice = createSlice({
    name: "UserDetails",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            //state.userDetails = action.payload;
            console.log(action.payload);
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            state.error = "";
            state.success = true;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            //state.userDetails = null;
            state.error = action.error;
            state.success = false;
        });
    },
});

const {reducer} = userDetailsSlice;
export default reducer;
export {updateUser};
