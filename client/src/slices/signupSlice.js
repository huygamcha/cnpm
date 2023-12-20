import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const signup = createAsyncThunk(
  "signup",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Types": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/register",
        { email, password, name },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        throw error;
      }
    }
  }
);

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
      state.userInfo = action.payload;
      state.error = "";
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

const { reducer } = signupSlice;
export default reducer;
export { signup };
