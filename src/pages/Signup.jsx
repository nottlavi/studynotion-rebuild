import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("Student");

  const navigate = useNavigate();
  const objToSend = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/signup",
        objToSend
      );
      if (res) {
        navigate("/verify-email");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={signUpHandler}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="radio"
            name="choice"
            value="Student"
            onChange={(e) => {
              setAccountType(e.target.value);
            }}
            id="studentRad"
          />
          <label htmlFor="studentRad">Student</label>

          <input
            name="choice"
            type="radio"
            value="Instructor"
            onChange={(e) => {
              setAccountType(e.target.value);
            }}
            id="instructorRad"
          />
          <label htmlFor="instructorRad">Instructor</label>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
