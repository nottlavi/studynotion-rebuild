import React from "react";

export const VerifyEmail = () => {
  const verificationHandler = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
      <form onSubmit={verificationHandler}>
        <div>
          <label htmlFor="email">Enter email: </label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="OTP">Enter OTP: </label>
          <input type="text" name="OTP" id="OTP" />
        </div>
        <button type="submit">Verify Email</button>
      </form>
    </div>
  );
};
