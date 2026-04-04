import React, { useState, useEffect } from "react";
import axios from "axios";

//importing redux stuff here
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slices/userSlice";
import { FetchUserCartDetails } from "../slices/cartSlice";

import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  //managing all the states here
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  ///managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //redux stuff here

  ///all the functions here
  // function to handle change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const logInHandler = async (e) => {
    //line to avoid reloading of page on submission of the form
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/users/login`, inputs, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);
      const resCart = await dispatch(FetchUserCartDetails());
      console.log(resCart);
      console.log("login successful, navigating now...");
      navigate("/dashboard/my-profile");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="site-shell auth-page login-page">
      <section className="max-w-lg mx-auto glass-panel auth-card p-6 md:p-8 float-in">
        <p className="eyebrow text-xs uppercase tracking-[0.16em] text-slate-500">
          Welcome back
        </p>
        <h1 className="text-3xl font-extrabold mt-1 page-title">
          Log In to Continue
        </h1>
        <p className="text-slate-600 mt-2 page-lead">
          Pick up your learning streak and resume your courses.
        </p>

        <form
          onSubmit={logInHandler}
          className="flex flex-col gap-3 mt-5 auth-form"
        >
          <label htmlFor="email" className="font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
          />

          <label htmlFor="password" className="font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={inputs.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />

          <Link
            to="/forgot-password"
            className="text-sm text-blue-700 link-accent"
          >
            Forgot password?
          </Link>

          {loading ? <p className="text-slate-600">Signing in...</p> : null}
          {loading ? null : <button type="submit">Log In</button>}
        </form>
      </section>
    </main>
  );
};
