import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
    success: false,
    error: "",
    categories: [],
    loading: false,
    deleted: false,
    updated: false,
    products: [],
};

const addCategory = createAsyncThunk(
    "/categories/addCategory",
    async (name) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };

        const {data} = await axios
            .post("/api/categories", {name}, config)
            .catch((err) => console.log(err));
        return data;
    }
);

const getAllCategories = createAsyncThunk("/categories/getAll", async () => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const {data} = await axios.get("/api/categories", config);
    return data;
});

const getProductsCategory = createAsyncThunk(
    "/categories/getProduct",
    async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const {data} = await axios.get(`/api/categories/${id}`, config);
        return data;
    }
);

const updateCategory = createAsyncThunk(
    "/categories/update",
    async ({id, name}) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        };

        const {data} = await axios
            .patch(`/api/categories/${id}`, {name}, config)
            .catch((err) => console.log(err));
        return data;
    }
);

const deleteCategory = createAsyncThunk("/categories/delete", async (id) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.delete(`/api/categories/${id}`, config);
    return data;
});

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //add category
        builder.addCase(addCategory.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.success = false;
        });
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(addCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //get all categories
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //get category products
        builder.addCase(getProductsCategory.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getProductsCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getProductsCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //update category
        builder.addCase(updateCategory.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.updated = false;
        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.updated = true;
        });
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //delete category
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.deleted = false;
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.deleted = true;
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

const {reducer} = categorySlice;

export default reducer;
export {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getProductsCategory,
};
