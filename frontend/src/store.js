import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

// create store
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
