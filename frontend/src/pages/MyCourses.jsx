import { Link } from "react-router-dom";
//importing redux stuff here
import { useSelector } from "react-redux";

export const MyCourses = () => {
  //redux stuff here
  const token = useSelector((state) => state.user.token);

  return (
    <div className="flex justify-between">
      <div>My Courses</div>

      {/* div for adding a course */}
      <div>
        <Link to="/dashboard/add-course">
          <button>Add Course</button>
        </Link>
      </div>
    </div>
  );
};
