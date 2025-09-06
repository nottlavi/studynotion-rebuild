import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // need to know what is signUpData and loading and is loading required here?
  signUpData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  // why is it named auth only and what parameters to pass in createSlice
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signUpData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken (state, value) {
        state.token = value.payload;
    }
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;
