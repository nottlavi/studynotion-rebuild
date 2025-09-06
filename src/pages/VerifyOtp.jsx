import React, { useState } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { users } from "../services/apis";
import { apiConnector } from "../services/apiconnector";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { email, firstName, lastName, password, cnfrmPassword, role } =
    location.state;

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await apiConnector("POST", users.CHECKOTP_API, {
        email,
        otp,
        firstName,
        lastName,
        password,
        cnfrmPassword,
        role
      });
      console.log(res);
      toast.success("user has been registered succesfully");
    } catch (err) {
      toast.error("user couldnt be registered");
      console.log(
        "user couldnt be registered, refer the concerned frontend file"
      );
    }
  };

  return (
    <div className="text-white items-center justify-center flex-col flex">
      {/* the main heading */}
      <div>Verify email</div>
      {/* the info para */}
      <div>{`A verification code has been sent to ${email}. Enter the code below  `}</div>
      <form onSubmit={registerHandler}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input className="bg-slate-800" {...props} />}
        />
        <button type="submit">Verify Email</button>
      </form>
      {/* options available div */}
      <div className="flex w-[50%] justify-between">
        <div>
          <Link to={"/signup"}>Back to SignUp</Link>
        </div>
        <div>Resend It</div>
      </div>
    </div>
  );
};
