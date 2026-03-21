///all the imports here
//importing dependencies here
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//importing redux stuff here
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//importing icons here
import { GoPencil } from "react-icons/go";
import { RiDeleteBin4Line } from "react-icons/ri";
//importing components here
import { DeleteModal } from "../components/MyCoursesPage/DeleteModal";

export const MyCourses = () => {
  ///all the dependencies here
  const navigate = useNavigate();

  ///managing states here
  const [ownedCourses, setOwnedCourses] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseDeleted, setCourseDeleted] = useState({});

  ///redux stuff here
  const profile = useSelector((state) => state.user.profile);

  ///all the use effects here
  useEffect(() => {
    if (profile) {
      setOwnedCourses(profile.courses);
    }
  }, [profile]);

  ///all the functions here
  const editHandler = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">My Courses</h1>
        <Link to="/dashboard/add-course">
          <button>Add Course</button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {ownedCourses.map((ele, idx) => {
          return (
            <div className="section-card flex gap-5 items-start" key={idx}>
              <Link to={`/course/${ele._id}`} className="flex gap-3">
                <img
                  src={ele?.thumbnail}
                  width={100}
                  height={100}
                  className="rounded-xl object-cover"
                />
                {/* the info div */}
                <div>
                  <div className="font-bold">{ele?.title}</div>
                  <div className="text-slate-600">{ele?.description}</div>
                  <p className="text-sm text-slate-500">
                    {new Date(ele?.createdAt).toLocaleString()}
                  </p>
                </div>
              </Link>
              {/* div for durration */}
              <div className="text-slate-700 text-sm">
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
              <div className="font-bold text-blue-700">₹ {ele?.price}</div>
              {/* for for action buttons */}
              <div className="flex gap-1">
                <GoPencil
                  className="text-gray-400 cursor-pointer"
                  onClick={() => {
                    editHandler(ele._id);
                  }}
                />
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
    </div>
  );
};
