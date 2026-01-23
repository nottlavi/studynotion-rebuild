import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// combine reducers manually
const reducer = {
  cart: cartReducer,
  user: userReducer,
};

const persistedReducer = persistReducer(persistConfig, (state, action) => ({
  cart: reducer.cart(state?.cart, action),
  user: reducer.user(state?.user, action),
}));

// create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
