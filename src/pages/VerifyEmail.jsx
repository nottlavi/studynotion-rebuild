import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const VerifyEmail = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState();
  const location = useLocation();
  const { email } = location.state;

  const objToSend = {
    email,
    otp,
  };

  const verificationHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/verify-email",
        objToSend
      );
      if (res) {
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        const errMsg = err.response.data.message;
        setError(errMsg);
        toast.error(errMsg);
      } else {
        return;
      }
    }
  };

  return (
    <div>
      <form onSubmit={verificationHandler}>
        <div>
          <label htmlFor="otp">Enter OTP: </label>
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={(e) => {
              setOTP(e.target.value);
            }}
          />
        </div>
        <button type="submit">Verify Email</button>
      </form>

      <Toaster />
    </div>
  );
};
