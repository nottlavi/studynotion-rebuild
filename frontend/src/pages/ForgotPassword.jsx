import React from "react";

export const ForgotPassword = () => {
  return (
    <div>
      <form>
        <label htmlFor="email">email address</label>
        <input
          type="email"
          placeholder="enter email address"
          name="email"
          id="email"
        ></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
