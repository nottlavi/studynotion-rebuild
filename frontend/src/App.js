import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

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
import { UpdateProfile } from "./pages/dashboard/UpdateProfile";
import { MyCourses } from "./pages/MyCourses";
import { AddCourse } from "./pages/dashboard/AddCourse";
import { CourseCategory } from "./pages/CourseCategory";
import { CoursePage } from "./pages/CoursePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { CartPage } from "./pages/dashboard/CartPage";
import { EnrolledCourses } from "./pages/dashboard/EnrolledCourses";

//importing redux state here
import { setToken } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  //importing imp info from redux here
  const token = useSelector((state) => state.user.token);

  // defining all the dependencies here
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [token]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/verify-email" element={<VerifyEmailPage />}></Route>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard/my-profile" replace />
            ) : (
              <LoginPage />
            )
          }
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
          <Route index element={<Navigate to="my-profile" replace />} />
          <Route path="my-profile" element={<ProfilePage />} />
          <Route path="settings" element={<UpdateProfile />} />
          <Route path="cart" element={<CartPage />} />
          {/* instructor only routes */}
          <Route element={<ProtectedRoute allowedRoles={["Instructor"]} />}>
            <Route path="my-courses" element={<MyCourses />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Instructor"]} />}>
            <Route path="add-course" element={<AddCourse />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
          </Route>
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/course-category/:categoryId"
          element={<CourseCategory />}
        />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {/* route for non existing pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
