import { useEffect, useState } from "react";
import axios from "axios";

export const ForgotPassword = () => {
  //managing states here
  //this state is to determine which ui to show // on which the state the user is currently on?
  const [stage, changeStage] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");

  //managing the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //all the functions which makes a call to the backend
  const sendOTPHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/users/send-otp`, { email });

      console.log("printing the res", res);
      if (res.data.success) {
        changeStage(2);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const checkOTPHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/users/check-otp`, {
        email,
        otp,
      });
      console.log(res);
      if (res.data.success) {
        changeStage(3);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/users/change-password`, {
        email,
        password,
      });
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  //useEffect maybe for page refresh on stage change
  useEffect(() => {}, [stage]);

  return (
    <main className="site-shell">
      <section className="max-w-lg mx-auto glass-panel p-6 md:p-8 float-in">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
          Account Recovery
        </p>
        <h1 className="text-3xl font-extrabold mt-1">Forgot Password</h1>
        <p className="text-slate-600 mt-2">
          {stage === 1
            ? "We will send an OTP to your registered email."
            : stage === 2
              ? "Enter the OTP sent to your inbox."
              : "Set a new secure password for your account."}
        </p>

        {stage === 1 ? (
          <div className="mt-5">
            <form onSubmit={sendOTPHandler} className="flex flex-col gap-3">
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
              <button type="submit">Send OTP</button>
            </form>
          </div>
        ) : stage === 2 ? (
          <div className="mt-5">
            <form onSubmit={checkOTPHandler} className="flex flex-col gap-3">
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
              <button type="submit">Verify OTP</button>
            </form>
          </div>
        ) : (
          <div className="mt-5">
            <form
              onSubmit={changePasswordHandler}
              className="flex flex-col gap-3"
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
              <button type="submit">Change Password</button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
};
