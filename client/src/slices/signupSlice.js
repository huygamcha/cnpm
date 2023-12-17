import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const signup = createAsyncThunk("signup", async ({email, password, name}) => {
    const config = {
        headers: {
            "Content-Types": "application/json",
        },
    };
    const {data} = await axios.post(
        "/api/auth/register",
        {email, password, name},
        config
    );
    return data;
});

const initialState = {
    loading: false,
    error: "",
};

const signupSlice = createSlice({
    name: "signup",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

const {reducer} = signupSlice;
export default reducer;
export {signup};
