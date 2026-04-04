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
        { withCredentials: true },
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
    <main className="site-shell auth-page verify-page">
      <section className="max-w-lg mx-auto glass-panel auth-card p-6 md:p-8 float-in">
        <p className="eyebrow text-xs uppercase tracking-[0.16em] text-slate-500">
          Email Verification
        </p>
        <h1 className="text-3xl font-extrabold mt-1 page-title">
          Confirm Your Email
        </h1>
        <p className="text-slate-600 mt-2 page-lead">
          Enter the one-time password sent to your inbox to activate your
          account.
        </p>

        <form
          onSubmit={verifyEmail}
          className="flex flex-col gap-3 mt-5 auth-form"
        >
          <label htmlFor="OTP" className="font-medium text-slate-700">
            OTP
          </label>
          <input
            id="OTP"
            value={OTP}
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            placeholder="Enter OTP"
          />
          <button type="submit">Verify Email</button>
        </form>
      </section>
    </main>
  );
};
