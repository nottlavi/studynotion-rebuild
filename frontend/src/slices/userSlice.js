import { createSlice } from "@reduxjs/toolkit";

//defining the initial state
const initialState = {
  email: "",
  token: "",
  profile: {},
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
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = {};
    },
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
