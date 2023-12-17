import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
    success: false,
    error: "",
    brands: [],
    loading: false,
    deleted: false,
    updated: false,
    products: [],
};

const addBrand = createAsyncThunk("/brands/addBrand", async (name) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.post("/api/brands", {name}, config);
    return data;
});

const getAllBrands = createAsyncThunk("/brands/getAll", async () => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const {data} = await axios.get("/api/brands", config);
    return data;
});

const getProductsBrand = createAsyncThunk("/brands/getProduct", async (id) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const {data} = await axios
        .get(`/api/brands/${id}`, config)
        .catch((err) => console.log(err));
    return data;
});

const updateBrand = createAsyncThunk("/brands/update", async ({id, name}) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios
        .patch(`/api/brands/${id}`, {name}, config)
        .catch((err) => console.log(err));
    return data;
});

const deleteBrand = createAsyncThunk("/brand/delete", async (id) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
        },
    };

    const {data} = await axios.delete(`/api/brands/${id}`, config);
    return data;
});

const brandSlice = createSlice({
    name: "brand",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //add brand
        builder.addCase(addBrand.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.success = false;
        });
        builder.addCase(addBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(addBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //get all brands
        builder.addCase(getAllBrands.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getAllBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.brands = action.payload;
        });
        builder.addCase(getAllBrands.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //get brand products
        builder.addCase(getProductsBrand.pending, (state) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(getProductsBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getProductsBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //update brand
        builder.addCase(updateBrand.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.updated = false;
        });
        builder.addCase(updateBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.updated = true;
        });
        builder.addCase(updateBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        //delete brand
        builder.addCase(deleteBrand.pending, (state) => {
            state.loading = true;
            state.error = "";
            state.updated = false;
            state.deleted = false;
        });
        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.updated = true;
            state.deleted = true;
        });
        builder.addCase(deleteBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

const {reducer} = brandSlice;

export default reducer;
export {addBrand, getAllBrands, updateBrand, deleteBrand, getProductsBrand};
