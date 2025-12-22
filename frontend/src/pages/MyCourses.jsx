import { Link } from "react-router-dom";
//importing redux stuff here
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const MyCourses = () => {
  //managing states here
  const [ownedCourses, setOwnedCourses] = useState([]);

  //redux stuff here
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (profile) {
      setOwnedCourses(profile.courses);
    }
  }, [profile]);

  return (
    <div className="flex gap-5">
      <div>
        My Courses
        {ownedCourses.map((ele, idx) => {
          return <div key={idx}>{ele.title}</div>;
        })}
      </div>

      {/* div for adding a course */}
      <div>
        <Link to="/dashboard/add-course">
          <button>Add Course</button>
        </Link>
      </div>
    </div>
  );
};
