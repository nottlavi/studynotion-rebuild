import { createSlice } from "@reduxjs/toolkit";

//defining the initial state
const initialState = {
  email: "",
  token: "",
};

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
  },
});

export const { setEmail, clearEmail, setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
