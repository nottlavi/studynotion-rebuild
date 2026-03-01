import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { count: 0, total: 0 };

export const FetchUserCartDetails = createAsyncThunk(
  "/cart/fetchCartDetails",
  async (_, { rejectWithValue }) => {
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      const res = await axios.get(`${BASE_URL}/cart/get-cart-by-user-id`, {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch user cart");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => {
      state.count += 1;
    },
    removeFromCart: (state) => {
      state.count -= 1;
    },
    increaseTotal: (state, action) => {
      state.total += action.payload;
    },
    decreaseTotal: (state, action) => {
      state.total -= action.payload;
    },
    clearCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(FetchUserCartDetails.fulfilled, (state, action) => {
      const cart = action.payload?.cart;
      const courses = cart?.courses || [];

      state.count = courses.length;
      state.total = courses.reduce(
        (acc, course) => acc + (course.price || 0),
        0,
      );
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseTotal,
  decreaseTotal,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
