import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UpdateProfile = () => {
  //managing all the redux stuff here
  const token = useSelector((state) => state.user.token);

  //managing all the states here
  const [profile, setProfile] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const updateProfile = async (e) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/users/update-profile`,
        { firstName, lastName },
        { withCredentials: true }
      );

      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getProfileByToken = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/get-profile`, {
          withCredentials: true,
        });

        if (res) {
          setFirstName(res.data.user.firstName);
          setLastName(res.data.user.lastName);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getProfileByToken();
  }, [token]);

  return (
    <div>
      {/* div where users can update information */}
      <div>
        <div>Profile Information</div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <div>First Name</div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <div>Last Name</div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <div>Date of Birth</div>
            <input type="text" />
          </div>
          <div className="flex flex-col">
            <div>Gender</div>
            <input type="text" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <div>Contact No</div>
            <input type="text" />
          </div>
          <div className="flex flex-col">
            <div>About</div>
            <input type="text" />
          </div>
        </div>
      </div>
      {/* button container for the above div */}
      <div className="flex gap-4">
        <Link to="/dashboard/my-profile">
          <button>Cancel</button>
        </Link>
        <button onClick={updateProfile}>Save</button>
      </div>
      {/* div where users can update their password */}
      <div>
        <div>Password</div>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <div>Old Password</div>
            <input type="password" />
          </div>
          <div className="flex flex-col">
            <div>New Password</div>
            <input type="password" />
          </div>
        </div>
      </div>
      {/* button container for the above div */}
      <div className="flex gap-4">
        <Link to="/dashboard/my-profile">
          <button>Cancel</button>
        </Link>
        <button>Update</button>
      </div>
    </div>
  );
};
