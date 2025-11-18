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
    <div>
      {stage === 1 ? (
        <div>
          <form onSubmit={sendOTPHandler}>
            <label htmlFor="email">email address</label>
            <input
              type="email"
              placeholder="enter email address"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <button type="submit">submit</button>
          </form>
        </div>
      ) : stage === 2 ? (
        <div>
          <form onSubmit={checkOTPHandler}>
            <label htmlFor="otp">otp: </label>
            <input
              id="otp"
              placeholder="enter otp"
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            ></input>
            <button type="submit">submit!</button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={changePasswordHandler}>
            <label htmlFor="password">new password: </label>
            <input
              id="password"
              placeholder="enter the new password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit"> change password?</button>
          </form>
        </div>
      )}
    </div>
  );
};
