import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ToastContainer, toast } from "react-toastify";

export const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="verify-email" element={<VerifyEmail />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
