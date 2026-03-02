import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//defining the initial state
const initialState = {
  email: "",
  token: "",
  profile: {
    enrolledCourses : [],
    purchasedCourses : [],
    
    /*
    Here in profile defined enrolledCourses and purchasedCourses fields because now bacckend sends them both
     */
  },
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      const res = await axios.get(`${BASE_URL}/users/get-profile`, {
        withCredentials: true,
      });

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
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
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
