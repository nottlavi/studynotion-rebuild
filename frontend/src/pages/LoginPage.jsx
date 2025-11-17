import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/userSlice";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  //managing all the states here
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //function to handle change in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const logInHandler = async (e) => {
    //line to avoid reloading of page on submission of the form
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, inputs, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(setToken(res.data.token));
      localStorage.setItem("token", res.data.token);
      // temporary fix for now
      window.location.reload();
      console.log("login successful, navigating now...");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={logInHandler}>
        <label htmlFor="firstName">email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={inputs.email}
          onChange={handleInputChange}
        />
        <label htmlFor="firstName">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={inputs.password}
          //why is a function called w/o ()
          onChange={handleInputChange}
        />
        <Link to="/forgot-password">forgot password</Link>
        {/* temp */}
        <br />
        <button type="submit">Login!</button>
      </form>
    </div>
  );
};
