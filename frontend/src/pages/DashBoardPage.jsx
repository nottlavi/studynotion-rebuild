import { Outlet, useLocation, Link } from "react-router-dom";

//importing redux stuff here
import { useSelector } from "react-redux";

export const DashBoardPage = () => {
  //getting the url's endpoint to know which part is currently clicked on
  const location = useLocation();
  const currentBoy = location.pathname.split("/")[2];

  //managing the redux stuff here
  const profile = useSelector((state) => state.user.profile);

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
            <div
              className={
                currentBoy === "enrolled-courses" ? "bg-yellow-100" : ""
              }
            >
              Enrolled Courses
            </div>
            <div className={currentBoy === "cart" ? "bg-yellow-100" : ""}>
              Cart
            </div>
          </div>
        ) : (
        
          <div>
            <hr />
            Instructor
            <div>
              My Courses
            </div>
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
