import api from "../utils/api";
import { toaster } from "../components/ui/toaster";

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
      const res = await api.post(`/users/logout`, {});

      if (res) {
        localStorage.removeItem("token");
        dispatch(clearProfile());
        dispatch(clearToken());
        dispatch(clearCart());

        navigate("/");
      }
    } catch (err) {
      toaster.add({
        title: "Logout failed",
        description: err?.message || "Could not logout",
        type: "error",
        closable: true,
      });
    }
  };

  return logout;
};
