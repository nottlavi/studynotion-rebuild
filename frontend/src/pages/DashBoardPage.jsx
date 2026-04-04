import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import axios from "axios";
//importing redux stuff here
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../slices/userSlice";

export const DashBoardPage = () => {
  //getting the url's endpoint to know which part is currently clicked on
  const location = useLocation();
  const currentBoy = location.pathname.split("/")[2];

  //managing the redux stuff here
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const profile = useSelector((state) => state.user.profile);

  ///all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const logout = useLogout();

  useEffect(() => {
    const getProfileByToken = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/get-profile`, {
          withCredentials: true,
        });

        if (res) {
          dispatch(setProfile(res.data.user));
          localStorage.setItem("profile", JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getProfileByToken();
  }, [token]);

  return (
    <div className="site-shell dashboard-page grid md:grid-cols-[260px_1fr] gap-4 float-in">
      {/* Sidebar div */}
      <div className="glass-panel dashboard-sidebar p-3 h-fit">
        <div className="flex flex-col gap-2 dashboard-nav">
          <Link
            to="/dashboard/my-profile"
            className={`section-card dashboard-nav-link ${
              currentBoy === "my-profile" ? "dashboard-nav-link-active" : ""
            }`}
          >
            My Profile
          </Link>
          {profile?.accountType === "Student" ? (
            <div className="flex flex-col gap-2">
              <Link
                to={"/dashboard/enrolled-courses"}
                className={`section-card dashboard-nav-link ${
                  currentBoy === "enrolled-courses"
                    ? "dashboard-nav-link-active"
                    : ""
                }`}
              >
                Enrolled Courses
              </Link>
              <Link
                to={"/dashboard/cart"}
                className={`section-card dashboard-nav-link ${
                  currentBoy === "cart" ? "dashboard-nav-link-active" : ""
                }`}
              >
                Cart
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <hr />
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 px-1">
                Instructor
              </p>
              <Link
                to="/dashboard/my-courses"
                className={`section-card dashboard-nav-link ${
                  currentBoy === "my-courses" ? "dashboard-nav-link-active" : ""
                }`}
              >
                My Courses
              </Link>
            </div>
          )}
          <hr />
          <Link
            to="/dashboard/settings"
            className={`section-card dashboard-nav-link ${
              currentBoy === "settings" ? "dashboard-nav-link-active" : ""
            }`}
          >
            Settings
          </Link>
          <button className="w-full" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
      <div className="glass-panel dashboard-main p-4 md:p-5 min-h-[70vh]">
        <Outlet />
      </div>
    </div>
  );
};
