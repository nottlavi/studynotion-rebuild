import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//importing the pages here
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { LoginPage } from "./pages/LoginPage";
import { DashBoardPage } from "./pages/DashBoardPage";
import { ProfilePage } from "./pages/dashboard/ProfilePage";
import { NotFound } from "./pages/NotFound";
import { ForgotPassword } from "./pages/ForgotPassword";
import { NavBar } from "./pages/NavBar";

const App = () => {
  //importing imp info from redux here
  const token = localStorage.getItem("token");

  // defining all the dependencies here

  useEffect(() => {
    if (token) {
      console.log("here is your token", token);
    } else {
      console.log("token not found");
    }
  }, [token]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/verify-email" element={<VerifyEmailPage />}></Route>
        {/* {token ? (
          <Route path="/login" element={<DashBoardPage />}></Route>
        ) : (
          <Route path="/login" element={<LoginPage />}></Route>
        )} */}
        {/* the better way to approach the below functionality */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* routes for dashboard */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <DashBoardPage />
            ) : token === null ? (
              <Navigate to="/login" replace />
            ) : (
              <div>loading</div>
            )
          }
        >
          <Route path="my-profile" element={<ProfilePage />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* route for non existing pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
