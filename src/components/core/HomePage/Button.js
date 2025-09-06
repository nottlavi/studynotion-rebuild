import React, { act } from "react";
import { Link } from "react-router-dom";

export const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={` p-3 px-8 rounded-lg

            ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
