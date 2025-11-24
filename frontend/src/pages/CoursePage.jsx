import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const CoursePage = () => {
  //managing dependencies here
  //this is being fetched from the url the user is currently on
  const { courseId } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //managing states here
  const [currentCourse, setCurrentCourse] = useState({});

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/courses/get-course-by-id/${courseId}`
        );
        if (res) {
          setCurrentCourse(res.data.course);
          console.log(res.data.course);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  return (
    <div className="flex flex-col gap-2">
      <div> {currentCourse?.title}</div>
      <div>
        created by {currentCourse?.instructor?.firstName}{" "}
        {currentCourse?.instructor?.lastName}
      </div>
      <div className="flex gap-2">
        <div>
          {currentCourse?.createdAt &&
            new Date(currentCourse.createdAt).toLocaleDateString()}
        </div>
        <div>|</div>
        <div>
          {currentCourse?.createdAt &&
            new Date(currentCourse.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
