import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export const ProfilePage = () => {
  //redux stuff here
  const token = useSelector((state) => state.user.token);

  //managing states here
  const [profile, setProfile] = useState({});

  //managing dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getProfileFromBackend = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/get-profile`, {
          withCredentials: true,
        });

        if (res) setProfile(res.data.user);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProfileFromBackend();
  }, [token]);

  return <div>
    {profile.firstName}
    {profile.lastName}
    <br />
    {profile.email}
  </div>;
};
