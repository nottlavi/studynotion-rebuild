import React, { useState } from "react";
import SignUpImage from "../assets/Images/signup.webp";
import Frame from "../assets/Images/frame.png";
import { Navbar } from "../components/common/Navbar";
import { users } from "../../src/services/apis";
import { apiConnector } from "../services/apiconnector";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmPassword, setCnfrmPassword] = useState("");
  const navigate = useNavigate();

  const bodyData = {
    firstName: firstName,
    lastName: lastName,
    password: password,
    confirmPassword: cnfrmPassword,
    email: email,
    accountType: role,
  };

  const trySignUp = async (e) => {
    e.preventDefault();
    try {
      console.log(users.SIGNUP_API, bodyData);
      const res = await apiConnector("POST", users.SIGNUP_API, bodyData);
      console.log(res);
      
    } catch (err) {
      console.log("couldnt sign up the user due to server error");
    }
  };

  return (
    // creating the outermost div just for the navbar ignore
    <div className="">
      <Navbar active={true} />
      {/* the actual container leaving out the navbar */}
      <div className="text-white flex justify-between mx-28 mt-24 w-[85%]">
        {/* the form + data container */}
        <div className="w-[40%]">
          <p className="text-3xl text-white font-bold w-[91%] mb-4">
            Join the millions learning to code with StudyNotion for free
          </p>
          <p className="text-pure-greys-100 text-lg mb-5">
            Build skills for today, tomorrow, and beyond.
            <br />
            <span className=" text-blue-200 italic font-bold">
              Education to future-proof your career.
            </span>
          </p>

          {/* the main form */}
          <form className="flex flex-col" onSubmit={trySignUp}>
            {/* div to toggle bw student and instructor */}
            <div className="flex bg-gray-900 py-1 w-[47%] rounded-full items-center   border-b-[0.5px] border-gray-700 mb-8 ">
              <input
                className="peer hidden"
                name="choice"
                type="radio"
                id="studentRad"
                value={"Student"}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
              <label
                htmlFor="studentRad"
                className=" peer-checked:bg-black peer-checked:rounded-full text-[17px]   py-2  text-gray-400 px-6 ml-1 peer-checked:text-white transition-all duration-300  "
              >
                {" "}
                Student{" "}
              </label>
              <input
                className="peer/instructor hidden"
                name="choice"
                type="radio"
                id="instructorRad"
                value={"Instructor"}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
              <label
                htmlFor="instructorRad"
                className=" peer-checked/instructor:bg-black text-[17px] text-gray-400 px-6  py-2 peer-checked/instructor:rounded-full   peer-checked/instructor:text-white transition-all duration-300 "
              >
                {" "}
                Instructor{" "}
              </label>
            </div>
            {/* div for first and last names */}
            <div className="flex items-center gap-6 mb-4">
              {/* the first name div */}
              <div className="flex flex-col w-[40%]">
                <label className="text-[14px]" htmlFor="firstName">
                  First Name <span className="text-pink-400">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="appearance-none h-[50px] bg-richblack-700 shadow-[10px] rounded-lg px-2 placeholder:text-richblack-400 border-b-[1px] border-b-richblack-200 outline-none"
                  placeholder="Enter First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                ></input>
              </div>
              {/* the last name div */}
              <div className="flex flex-col">
                <label className="text-[14px]" htmlFor="lastName">
                  Last Name <span className="text-pink-400">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="appearance-none h-[50px] bg-richblack-700 shadow-[10px] rounded-lg px-2 placeholder:text-richblack-400 border-b-[1px] border-b-richblack-200 outline-none"
                  placeholder="Enter Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            {/* div for email add */}
            <div className="flex flex-col mb-4">
              <label className="text-[14px]" htmlFor="email">
                Email Address <span className="text-pink-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="appearance-none h-[50px] bg-richblack-700 shadow-[10px] rounded-lg px-2 placeholder:text-richblack-400 border-b-[1px] border-b-richblack-200 outline-none"
                placeholder="Enter Email Adress"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            {/* div for creation and confirmation of password */}
            <div className="flex gap-4 ">
              {/* div for creation of the password */}
              <div className="flex flex-col">
                  <label className="text-[14px]" htmlFor="password">
                Create Passowrd <span className="text-pink-400">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="appearance-none h-[50px] bg-richblack-700 shadow-[10px] rounded-lg px-2 placeholder:text-richblack-400 border-b-[1px] border-b-richblack-200 outline-none"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
              </div>

                {/* div for confirmation of the password */}
              <div className="flex flex-col">
                  <label className="text-[14px]" htmlFor="cnfrmPassword">
                Confirm Password <span className="text-pink-400">*</span>
              </label>
              <input
                id="cnfrmPassword"
                name="cnfrmPassword"
                type="password"
                className="appearance-none h-[50px] bg-richblack-700 shadow-[10px] rounded-lg px-2 placeholder:text-richblack-400 border-b-[1px] border-b-richblack-200 outline-none"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setCnfrmPassword(e.target.value);
                }}
              ></input>
              </div>

            </div>
            <button type="submit" className="mt-10 bg-yellow-50 text-black font-bold py-2 rounded-md">Create Account</button>
          </form>
        </div>
        {/* the images container */}
        <div className="">
          <img
            src={SignUpImage}
            alt=""
            className="w-[450px] h-[400px] relative z-10 translate-y-[-30px] translate-x-[-10px] "
          />
          <img
            src={Frame}
            alt=""
            className="w-[450px] h-[400px] absolute z-0 top-20 translate-y-[55px] translate-x-[4px]"
          />
        </div>
      </div>
    </div>
  );
};
