//importing redux stuff here
import { useSelector } from "react-redux";

export const ProfilePage = () => {
  //redux stuff here
  const profile = useSelector((state) => state.user.profile);

  return (
    <div>
      {profile.firstName}
      {profile.lastName}
      <br />
      {profile.email}
    </div>
  );
};
