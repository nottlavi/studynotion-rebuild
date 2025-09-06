import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../silces/authSlice"

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer;