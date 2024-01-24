import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";

const initialState = {
  loading: false,
  user: null,
  userToken: null,
  error: null,
  success: false,
};

// axiosInstance.get(`/projects?sortBy`);

export const registerUserAction = createAsyncThunk(
  "users/register",
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const data = await axiosInstance.post("/users/register", {
        email,
        password,
        fullName,
      });
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const userLoginAction = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      return data.response;
    } catch (error) {
      // console.log("error", error?.response?.data?.message);
      rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Register User
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    }),
      builder.addCase(registerUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      }),
      builder.addCase(registerUserAction.rejected, (state) => {
        state.loading = false;
        state.success = false;
      }),
      //Login User
      builder.addCase(userLoginAction.pending, (state) => {
        state.loading = true;
        state.success = false;
      }),
      builder.addCase(userLoginAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.user = payload.user;
        state.userToken = payload.token;
      }),
      builder.addCase(userLoginAction.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      });
  },
});

export default authSlice.reducer;
