import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
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

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getProfileByToken = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/get-profile`, {
          withCredentials: true,
        });

        if (res) {
          dispatch(setProfile(res.data.user));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getProfileByToken();
  }, [token]);

  return (
    <div className="flex gap-4">
      {/* Sidebar div */}
      <div className="flex flex-col">
        <Link to="/dashboard/my-profile">
          <div className={currentBoy === "my-profile" ? "bg-yellow-100" : ""}>
            My Profile
          </div>
        </Link>
        {profile.accountType === "Student" ? (
          <div>
            <Link to={"/dashboard/enrolled-courses"}>
              <div
                className={
                  currentBoy === "enrolled-courses" ? "bg-yellow-100" : ""
                }
              >
                Enrolled Courses
              </div>
            </Link>
            <Link to={"/dashboard/cart"}>
              <div className={currentBoy === "cart" ? "bg-yellow-100" : ""}>
                Cart
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <hr />
            Instructor
            <Link to="/dashboard/my-courses">
              <div
                className={currentBoy === "my-courses" ? "bg-yellow-100" : ""}
              >
                My Courses
              </div>
            </Link>
          </div>
        )}
        <hr />
        <Link to="/dashboard/settings">
          <div className={currentBoy === "settings" ? "bg-yellow-100" : ""}>
            Settings
          </div>
        </Link>
        <button className="flex">Log Out</button>
      </div>
      <Outlet />
    </div>
  );
};
