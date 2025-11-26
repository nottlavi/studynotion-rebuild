//importing redux stuff here
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  //redux stuff here
  const profile = useSelector((state) => state.user.profile);
  console.log(profile);

  return (
    <div className="flex flex-col gap-4">
      <div>My Profile</div>
      {/* name and email div */}
      <div className="flex">
        {/* for image div */}
        <div></div>
        {/* for name and email */}
        <div>
          {/* for name */}
          <div>
            {profile.firstName} {profile.lastName}
          </div>
          {/* for email */}
          <div>{profile.email}</div>
        </div>
        {/* for edit button */}
        <div>
          <Link to="/dashboard/settings">
            <button>Edit</button>
          </Link>
        </div>
      </div>
      {/* about div */}
      <div>
        {/* collective div for about title and the button */}
        <div className="flex justify-between">
          <div>About</div>
          {/* edit button div */}
          <div>
            <Link to="/dashboard/settings">Edit</Link>
          </div>
        </div>
        {/* div for the user's actual about content */}
        <div>
          {profile?.profile?.about == null
            ? "Write Something About Yourself"
            : profile.profile.about}
        </div>
      </div>
      {/* personal details div */}
      <div className="flex flex-col gap-4">
        {/* collective div for title and button */}
        <div className="flex justify-between">
          <div>Personal Details</div>
          {/* edit button div */}
          <div>
            <Link to="/dashboard/settings">Edit</Link>
          </div>
        </div>
        {/* the name display div */}
        <div className="flex justify-between">
          {/* first name */}
          <div className="flex flex-col gap-2">
            <p>First Name</p>
            <p>{profile.firstName}</p>
          </div>
          {/* last name */}
          <div className="flex flex-col gap-2">
            <p>Last Name</p>
            <p>{profile.lastName}</p>
          </div>
        </div>
        {/* email and phone no display */}
        <div className="flex justify-between">
          {/* email */}
          <div className="flex flex-col gap-2">
            <p>Email</p>
            <p>{profile.email}</p>
          </div>
          {/* phone number */}
          <div className="flex flex-col gap-2">
            <p>Phone Number</p>
            <p>
              {profile?.profile?.contactNo
                ? profile?.profile?.contactNo
                : "Add Contact Number"}
            </p>
          </div>
        </div>
        {/* gender and dob div */}
        <div className="flex justify-between">
          {/* gender */}
          <div className="flex flex-col gap-2">
            <p>Gender</p>
            <p>
              {profile?.profile?.gender
                ? profile?.profile?.gender
                : "Add Gender"}
            </p>
          </div>
          {/* phone number */}
          <div className="flex flex-col gap-2">
            <p>Date of Birth</p>
            <p>
              {profile?.profile?.dob
                ? profile?.profile?.dob
                : "Add Date of Birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
