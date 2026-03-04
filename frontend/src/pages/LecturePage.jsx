///all the imports here
//importing dependencies here
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//importing components here
import { LectureSideBar } from "../components/LectureSideBar";

export const LecturePage = () => {
  ///all the dependencies here
  const { courseId } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  ///all the states here
  const [currentCourse, setCurrentCourse] = useState({});
  const [currentLecture, setCurrentLecture] = useState({});

  ///all the useEffects here
  //useEffect to fetch the course details whenever the course id changes
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/courses/get-course-by-id/${courseId}`,
        );
        setCurrentCourse(res?.data?.course);
        setCurrentLecture(res?.data?.course?.sections?.[0]?.subsections?.[0]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getCourseDetails();
  }, [courseId]);

  console.log(currentLecture);

  return (
    <div className="flex">
      <LectureSideBar
        setCurrentLecture={setCurrentLecture}
        currentCourse={currentCourse}
      />
      {/* the lecture container */}
      <div className="flex flex-col">
        <video
          src={currentLecture?.videoUrl}
          controls
          height={1000}
          width={1000}
        />
        {/* for lecture title */}
        <p>{currentLecture?.title}</p>
        <p>{currentLecture?.description}</p>
      </div>
    </div>
  );
};
