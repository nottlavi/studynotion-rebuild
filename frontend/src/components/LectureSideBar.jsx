///all the imports here
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const LectureSideBar = () => {
  ///all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { courseId } = useParams();

  ///all the states here
  const [currentCourse, setCurrentCourse] = useState({});
  const totalSubsections =
    currentCourse?.sections?.reduce(
      (acc, section) => acc + (section.subsections?.length || 0),
      0,
    ) || 0;

  ///all the useEffects here
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/courses/get-course-by-id/${courseId}`,
        );
        setCurrentCourse(res?.data?.course);
      } catch (err) {
        console.log(err.message);
      }
    };

    getCourseDetails();
  }, [courseId]);

  return (
    <div className="flex flex-col">
      {/* the info container */}
      <div className="border-b border-gray-500">
        {/* title and completion counter div */}
        <div className="flex gap-2">
          <p>{currentCourse?.title}</p>
          <p>x / {totalSubsections}</p>
        </div>
        {/* add review div */}
        <div>Add Review</div>
      </div>
      {/* the sections container */}
      <div>
        {currentCourse?.sections.map((section) => {
          return (
            //   the individual section
            <div>{section?.title}</div>
          );
        })}
      </div>
    </div>
  );
};
