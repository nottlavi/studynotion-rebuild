import { Link } from "react-router-dom";
//importing redux stuff here
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
///importing icons here
import { GoPencil } from "react-icons/go";
import { RiDeleteBin4Line } from "react-icons/ri";
///importing components here
import { DeleteModal } from "../components/MyCoursesPage/DeleteModal";

export const MyCourses = () => {
  //managing states here
  const [ownedCourses, setOwnedCourses] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseDeleted, setCourseDeleted] = useState({});

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
          return (
            <div className="flex gap-5" key={idx}>
              <Link to={`/course/${ele._id}`}>
                <img src={ele?.thumbnail} width={100} height={100} />
                {/* the info div */}
                <div>
                  <div>{ele?.title}</div>
                  <div>{ele?.description}</div>
                  <p>{new Date(ele?.createdAt).toLocaleString()}</p>
                </div>
              </Link>
              {/* div for durration */}
              <div>
                {ele?.sections
                  ?.reduce((sectionAcc, section) => {
                    const sectionDuration = section?.subsections?.reduce(
                      (subAcc, sub) => subAcc + (sub?.duration || 0),
                      0,
                    );
                    return sectionAcc + sectionDuration;
                  }, 0)
                  .toFixed(2)}
                s
              </div>
              {/* div for price */}
              <div>{ele?.price}</div>
              {/* for for action buttons */}
              <div className="flex gap-1">
                <GoPencil className="text-gray-400 cursor-pointer" />
                <RiDeleteBin4Line
                  className="text-gray-500 cursor-pointer"
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setCourseDeleted(ele);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {deleteModalOpen && (
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          courseDeleted={courseDeleted}
          setOwnedCourses={setOwnedCourses}
        />
      )}

      {/* div for adding a course */}
      <div>
        <Link to="/dashboard/add-course">
          <button>Add Course</button>
        </Link>
      </div>
    </div>
  );
};
