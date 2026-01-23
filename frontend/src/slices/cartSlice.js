import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0, total: 0 };

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
  },
});

export const { addToCart, removeFromCart, increaseTotal, decreaseTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
