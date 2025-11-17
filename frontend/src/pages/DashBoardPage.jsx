import React from "react";
import { Outlet } from "react-router-dom";

import { ProfilePage } from "./dashboard/ProfilePage";

export const DashBoardPage = () => {
  return (
    <div>
      DashBoard demo
      <Outlet />
    </div>
  );
};
