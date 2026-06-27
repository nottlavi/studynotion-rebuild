import { useEffect, useState } from "react";
import api from "../utils/api";
import { toaster } from "../components/ui/toaster";

export const ForgotPassword = () => {
  //managing states here
  //this state is to determine which ui to show // on which the state the user is currently on?
  const [stage, changeStage] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");

  //managing the dependencies here

  //all the functions which makes a call to the backend
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loadingChange, setLoadingChange] = useState(false);

  const sendOTPHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingSend(true);
      const res = await api.post(`/users/send-otp`, { email });
      if (res.data.success) {
        toaster.add({
          title: "OTP sent",
          description: "Check your email.",
          type: "success",
          closable: true,
        });
        changeStage(2);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Failed to send OTP";
      toaster.add({
        title: "Send OTP failed",
        description: message,
        type: "error",
        closable: true,
      });
    } finally {
      setLoadingSend(false);
    }
  };

  const checkOTPHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingCheck(true);
      const res = await api.post(`/users/check-otp`, { email, otp });
      if (res.data.success) {
        toaster.add({
          title: "OTP verified",
          description: "You may now reset your password.",
          type: "success",
          closable: true,
        });
        changeStage(3);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        "OTP verification failed";
      toaster.add({
        title: "OTP verification failed",
        description: message,
        type: "error",
        closable: true,
      });
    } finally {
      setLoadingCheck(false);
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingChange(true);
      await api.post(`/users/change-password`, { email, password });
      toaster.add({
        title: "Password changed",
        description: "Your password was updated.",
        type: "success",
        closable: true,
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        "Failed to change password";
      toaster.add({
        title: "Change password failed",
        description: message,
        type: "error",
        closable: true,
      });
    } finally {
      setLoadingChange(false);
    }
  };

  //useEffect maybe for page refresh on stage change
  useEffect(() => {}, [stage]);

  return (
    <main className="site-shell auth-page forgot-page">
      <section className="max-w-lg mx-auto glass-panel auth-card p-6 md:p-8 float-in">
        <p className="eyebrow text-xs uppercase tracking-[0.16em] text-slate-500">
          Account Recovery
        </p>
        <h1 className="text-3xl font-extrabold mt-1 page-title">
          Forgot Password
        </h1>
        <p className="text-slate-600 mt-2 page-lead">
          {stage === 1
            ? "We will send an OTP to your registered email."
            : stage === 2
              ? "Enter the OTP sent to your inbox."
              : "Set a new secure password for your account."}
        </p>

        {stage === 1 ? (
          <div className="mt-5">
            <form
              onSubmit={sendOTPHandler}
              className="flex flex-col gap-3 auth-form"
            >
              <label htmlFor="email" className="font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <button type="submit" disabled={loadingSend}>
                {loadingSend ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </div>
        ) : stage === 2 ? (
          <div className="mt-5">
            <form
              onSubmit={checkOTPHandler}
              className="flex flex-col gap-3 auth-form"
            >
              <label htmlFor="otp" className="font-medium text-slate-700">
                OTP
              </label>
              <input
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
              ></input>
              <button type="submit" disabled={loadingCheck}>
                {loadingCheck ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-5">
            <form
              onSubmit={changePasswordHandler}
              className="flex flex-col gap-3 auth-form"
            >
              <label htmlFor="password" className="font-medium text-slate-700">
                New Password
              </label>
              <input
                id="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit" disabled={loadingChange}>
                {loadingChange ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
};
