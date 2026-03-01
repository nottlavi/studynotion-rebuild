import axios from "axios";

//importing redux stuff here
import { useDispatch } from "react-redux";
import { clearProfile, clearToken } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../slices/cartSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/logout`,
        {},
        { withCredentials: true },
      );

      if (res) {
        localStorage.removeItem("token");
        dispatch(clearProfile());
        dispatch(clearToken());
        dispatch(clearCart());

        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};
