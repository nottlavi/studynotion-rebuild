import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";

export const ForgotPassword = () => {
  return (
    <div>
        <Navbar />
        <div className="flex flex-col text-white mt-52  items-center h-screen">
      <div>Reset your password</div>
      <div>
        Have no fear. We'll email you instructions to reset your password. If
        you dont have access to your email we can try account recovery
      </div>
      <label htmlFor="email" className="flex flex-col">
            Email Address *
        <input 
        name="email"
        id="email"
        />
      </label>
      <button type="submit">
        Submit
      </button>
        <Link to={"/login"}>
        Back to Login
      </Link>
    </div>
    </div>
    
  );
};
