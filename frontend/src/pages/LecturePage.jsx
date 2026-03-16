///all the imports here
//importing dependencies here
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//importing components here
import { LectureSideBar } from "../components/LectureSideBar";
import { RatingReviewModal } from "../components/RatingReviewModal";

//importing icons here

//importing redux stuff here
import { useSelector } from "react-redux";

export const LecturePage = () => {
  ///all the dependencies here
  const { courseId } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  ///all the redux stuff here
  const profile = useSelector((state) => state.user.profile);

  ///all the states here
  const [currentCourse, setCurrentCourse] = useState({});
  const [currentLecture, setCurrentLecture] = useState({});
  const [ratingModal, setRatingModal] = useState(false);

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

  return (
    <div className="flex fixed">
      <LectureSideBar
        setCurrentLecture={setCurrentLecture}
        currentCourse={currentCourse}
        ratingModal={ratingModal}
        setRatingModal={setRatingModal}
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

      {ratingModal && (
        <RatingReviewModal
          profile={profile}
          setRatingModal={setRatingModal}
          courseId={courseId}
        />
      )}
    </div>
  );
};
