import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const getUsersList = createAsyncThunk("getUsersList", async () => {
    const currentUser = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.get("/api/users", config);

    return data;
});

const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.delete(`/api/users/${id}`, config);

    return data;
});

const getUserById = createAsyncThunk("getUserById", async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.get(`/api/users/${id}`, config);

    return data;
});

const updatePrivateUser = createAsyncThunk(
    "users/edit",
    async ({id, name, email, isAdmin}) => {
        const currentUser = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };

        const {data} = await axios.put(
            `/api/users/${id}`,
            {
                name,
                email,
                isAdmin,
            },
            config
        );
        console.log(data);
        return data;
    }
);

const initialState = {
    loading: false,
    users: [],
    error: "",
    deleted: false,
    user: {},
};

const usersSlice = createSlice({
    name: "usersList",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get all users
        builder.addCase(getUsersList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUsersList.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getUsersList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        //delete a user
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.deleted = false;
        });
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.loading = false;
            state.deleted = true;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        //get a single user by id
        builder.addCase(getUserById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });

        //update a user
        builder.addCase(updatePrivateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatePrivateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(updatePrivateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

const {reducer} = usersSlice;
export default reducer;
export {getUsersList, deleteUser, getUserById, updatePrivateUser};
