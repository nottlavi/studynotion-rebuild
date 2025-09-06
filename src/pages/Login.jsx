import React, { useState } from "react";
import loginImage from "../assets/Images/login.webp";
import { Link } from "react-router-dom";
import { Button } from "../components/core/HomePage/Button";
import { Navbar } from "../components/common/Navbar";
import frame from "../assets/Images/frame.png";
import { FaEye } from "react-icons/fa";
import { users } from "../../src/services/apis";
import { apiConnector } from "../services/apiconnector";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const navigate = useNavigate();

  const toSend = {
    email: email,
    password: password,
  };

  const attemptLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiConnector("POST", users.LOGIN_API, toSend);
      console.log("Login successful:", res.data); // handle response
      if (res) {
        toast.success("logged in succesfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="">
      <Navbar className="bg-blue-300" active={true} />
      <div className="flex  justify-between text-white w-11/12 mx-auto mt-36 px-12">
        {/* actual login / the left container */}
        <div className="flex flex-col mt-7 gap-5 w-[31%] ">
          <p className="font-extrabold text-3xl">Welcome Back</p>
          <p className="text-pure-greys-50 text-lg">
            Build skills for today, tomorrow, and beyond. <br />
            <span className="italic text-blue-100 font-bold text-base">
              Education to future-proof your career.
            </span>
          </p>
          {/* form with the input fields */}
          <form
            className="flex flex-col gap-2 w-[115%] relative"
            onSubmit={attemptLogin}
          >
            <label className="text-[14px]" htmlFor="email">
              Email Address <span className="text-pink-400">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="appearance-none h-[50px] bg-richblack-700 shadow-[10px] rounded-lg px-2 placeholder:text-richblack-400 border-b-[1px] border-b-richblack-200 outline-none"
              placeholder="Enter email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>

            <label htmlFor="password" className="text-[14px]">
              Password <span className="text-pink-400">*</span>
            </label>
            <input
              id="password"
              name="password"
              type= {
                `${hidePassword ? "password" : "text" }`
              }
              className="appearance-none h-[50px] bg-richblack-700 shadow-[10px] rounded-lg px-2 placeholder:text-richblack-400 border-b-[1px] border-b-richblack-200 outline-none"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {hidePassword ? (
              <FaEye
                className="absolute top-[134px] right-4 hover:cursor-pointer"
                onClick={() => {
                  setHidePassword((prev) => !prev);
                }}
              />
            ) : (
              <FaEyeSlash className="absolute top-[134px] right-4 hover:cursor-pointer"
                onClick={() => {
                  setHidePassword((prev) => !prev);
                }} />
            )}

            <Link to={"/forgot-password"}>
              <p className="text-[12px] mt-[-8px] text-end text-blue-100">
                Forgot Password
              </p>
            </Link>
            <button
              type="submit"
              className="mt-8 bg-yellow-50 py-2 rounded-lg text-black font-bold"
            >
              Sign In{" "}
            </button>
          </form>
        </div>
        {/* image container bc it has a shadow like image*/}
        <div className="relative ">
          <img src={loginImage} className="w-[450px] h-[400px] relative z-10" />
          <img
            src={frame}
            className="w-[450px] h-[400px] absolute z-0 top-[15px] left-[15px]"
          />
        </div>
      </div>
    </div>
  );
};
