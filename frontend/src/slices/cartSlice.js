import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => {
      state.count += 1;
    },
    removeFromCart: (state) => {
      state.count += 1;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
