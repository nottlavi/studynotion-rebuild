import api from "../utils/api";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearEmail } from "../slices/userSlice";
import { toaster } from "../components/ui/toaster";

export const VerifyEmailPage = () => {
  //managing all the states here
  const [OTP, setOTP] = useState(0);
  const email = useSelector((state) => state.user.email);
  const [loading, setLoading] = useState(false);

  //managing all the dependencies here
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //function to call the server to verify the email
  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await api.post(`/users/verify-email`, { otp: OTP, email });
      toaster.add({
        title: "Verified",
        description: "Email verified successfully.",
        type: "success",
        closable: true,
      });
      dispatch(clearEmail());
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Verification failed";
      toaster.add({
        title: "Verification failed",
        description: message,
        type: "error",
        closable: true,
      });
    } finally {
      setLoading(false);
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
          <button type="submit" disabled={loading}>
            {loading ? "Checking OTP..." : "Verify Email"}
          </button>
        </form>
      </section>
    </main>
  );
};
