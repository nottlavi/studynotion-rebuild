import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearEmail } from "../slices/userSlice";

export const VerifyEmailPage = () => {
  //managing all the states here
  const [OTP, setOTP] = useState(0);
  const email = useSelector((state) => state.user.email);

  //managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //function to call the server to verify the email
  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/users/verify-email`,
        { otp: OTP, email },
        { withCredentials: true }
      );
      if (res.error) {
        console.log(res.error);
      }
      console.log(res);
      dispatch(clearEmail());
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
      {/* the main form */}
      <form onSubmit={verifyEmail}>
        {/* div for otp input */}
        <label htmlFor="OTP">OTP: </label>
        <input
          id="OTP"
          value={OTP}
          onChange={(e) => {
            setOTP(e.target.value);
          }}
        />
        <button type="submit">verify email!</button>
      </form>
    </div>
  );
};
