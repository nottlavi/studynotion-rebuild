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
    clearCart: () => initialState,
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
