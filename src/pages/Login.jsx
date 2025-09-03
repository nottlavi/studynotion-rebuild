import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
        }
      );
      if (result) {
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        toast.error(error);
      } else {
        console.log("something went wrong");
      }
    }
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit">Sign in</button>
      </form>
      <Toaster />
    </div>
  );
};
