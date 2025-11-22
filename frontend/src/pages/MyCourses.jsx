import { Link } from "react-router-dom";

export const MyCourses = () => {
  return (
    <div className="flex items-center">
      <div>My Courses</div>
      <Link to="/dashboard/add-course">
        <button>Add Course</button>
      </Link>
    </div>
  );
};
