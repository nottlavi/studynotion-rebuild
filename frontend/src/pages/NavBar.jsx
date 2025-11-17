import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

//importing redux stuff here
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../slices/userSlice";

export const NavBar = () => {
  // managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //all the redux stuff here
  const token = useSelector((state) => state.user.token);

  //function for calling backend logout function
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      if (res) {
        localStorage.removeItem("token");
        dispatch(clearToken());
        navigate("/");
      }
    } catch (err) {
      console.log("internal server error at logout caller function");
    }
  };

  return (
    <div className="bg-black text-white h-10 flex justify-between">
      <Link to="/">
        StudyNotion Logo
      </Link>
      {token === "" ? (
        <div className="flex gap-3">
          <Link to="/login">
            <button>log in</button>
          </Link>
          <Link to="/signup">
            <button>sign up</button>
          </Link>
        </div>
      ) : (
        <button onClick={logoutHandler}>Log Out!</button>
      )}
    </div>
  );
};
