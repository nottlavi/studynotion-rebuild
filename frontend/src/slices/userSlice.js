import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

//defining the initial state
const initialState = {
  email: "",
  token: "",
  profile: {},
  isLoading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/get-profile");

      return res.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch user profile",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = "";
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch profile";
      });
  },
});

export const {
  setEmail,
  clearEmail,
  setToken,
  clearToken,
  setProfile,
  clearProfile,
} = userSlice.actions;

export default userSlice.reducer;
