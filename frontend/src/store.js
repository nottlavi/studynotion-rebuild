import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

// create store
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
