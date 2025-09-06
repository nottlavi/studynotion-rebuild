import React from "react";
import { Navbar } from "../components/common/Navbar";

export const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="text-white flex justify-center items-center my-auto h-screen">
        Error 404! Not Found
      </div>
    </div>
  );
};
