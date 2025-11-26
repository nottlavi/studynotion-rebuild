import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UpdateProfile = () => {
  //managing all the redux stuff here
  const profile = useSelector((state) => state.user.profile);
  // console.log(profile)

  //managing all the states here
  // all the input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState();
  const [contactNumber, setContactNumber] = useState("");
  const [about, setAbout] = useState("");
  //this state is to block the user to use the button when its invalid for them to send a backend req
  const [blocked, setBlocked] = useState(true);

  //managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const today = new Date().toISOString().split("T")[0];

  //initializing input states with the backend data in this effect
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setDOB(profile.profile?.dob ? profile.profile.dob.split("T")[0] : "");
      setGender(profile.profile?.gender || "");
      setContactNumber(profile.profile?.contactNumber || "");
      setAbout(profile.profile?.about || "");
    }
  }, [profile]);

  // effect to check whether a request can be sent to the backend // to make the button clickable
  useEffect(() => {
    if (profile && profile.profile) {
      const firstNameChange =
        firstName !== profile?.firstName && firstName !== "";
      const lastNameChange = lastName !== profile?.lastName && lastName !== "";
      const dobChange = dob !== profile?.profile?.dob && dob !== "";
      const genderChange = gender !== profile?.profile?.gender && gender !== "";
      const contactNumberChange =
        contactNumber !== profile?.profile?.contactNumber &&
        contactNumber !== "" &&
        contactNumber.length === 10;
      const aboutChange = about !== profile?.profile?.about && about !== "";

      if (
        firstNameChange ||
        lastNameChange ||
        dobChange ||
        genderChange ||
        contactNumberChange ||
        aboutChange
      ) {
        setBlocked(false);
      } else if (contactNumberChange && contactNumber < 10) {
        setBlocked(true);
      } else {
        setBlocked(true);
      }
    }
  }, [firstName, lastName, dob, gender, contactNumber, about]);

  //the function to call the backend
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/users/update-profile`,
        { firstName, lastName, dob, gender, contactNumber, about },
        { withCredentials: true }
      );

      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* div where users can update information */}
      <div className="flex gap-2 flex-col">
        <form onSubmit={updateProfile}>
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
                placeholder={profile.firstName}
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
                placeholder={profile.lastName}
              />
            </div>
          </div>

          {/* dob and gender div */}
          <div className="flex gap-4">
            {/* div for date */}
            <div className="flex flex-col">
              <div>Date of Birth</div>
              <input
                type="date"
                value={dob}
                max={today}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
              />
            </div>
            {/* div for gender */}
            <div className="flex flex-col">
              <div>Gender</div>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* contact no and about div */}
          <div className="flex gap-4">
            {/* contact div */}
            <div className="flex flex-col">
              <div>Contact No</div>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => {
                  const value = e.target.value;

                  // allow only digits
                  if (/^\d*$/.test(value)) {
                    setContactNumber(value);
                  }
                }}
                placeholder={
                  profile?.profile?.contactNumber
                    ? profile.profile.contactNumber
                    : "Enter contact number"
                }
              />
            </div>
            {/* about div */}
            <div className="flex flex-col">
              <div>About</div>
              <input
                placeholder={profile?.profile?.about}
                type="text"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
          </div>
          {/* button container for the above div */}
          <div className="flex gap-4">
            <Link to="/dashboard/my-profile">
              <button>Cancel</button>
            </Link>
            <button onClick={updateProfile} disabled={blocked} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>

      {/* div where users can update their password */}
      <div className="flex flex-col gap-3">
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
