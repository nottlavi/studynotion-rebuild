import { useEffect, useState } from "react";
import axios from "axios";

//importing redux stuff here
import { setProfile as setReduxProfile } from "../../slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export const ProfilePage = () => {
  //redux stuff here
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  //managing states here
  const [profile, setProfile] = useState({});

  //managing dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getProfileByToken = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/get-profile`, {
          withCredentials: true,
        });

        if (res) {
          setProfile(res.data.user);
          dispatch(setReduxProfile(res.data.user));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getProfileByToken();
  }, [token]);

  return (
    <div>
      {profile.firstName}
      {profile.lastName}
      <br />
      {profile.email}
    </div>
  );
};
