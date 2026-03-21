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
    <main className="site-shell float-in">
      <div className="grid lg:grid-cols-[320px_1fr] gap-4 items-start">
        <div className="glass-panel p-3">
          <LectureSideBar
            setCurrentLecture={setCurrentLecture}
            currentCourse={currentCourse}
            ratingModal={ratingModal}
            setRatingModal={setRatingModal}
          />
        </div>
        <div className="glass-panel p-3 md:p-4 flex flex-col gap-3">
          <video
            src={currentLecture?.videoUrl}
            controls
            height={1000}
            width={1000}
            className="rounded-xl w-full max-h-[70vh] bg-black"
          />
          <p className="text-2xl font-bold">{currentLecture?.title}</p>
          <p className="text-slate-700">{currentLecture?.description}</p>
        </div>
      </div>

      {ratingModal && (
        <RatingReviewModal
          profile={profile}
          setRatingModal={setRatingModal}
          courseId={courseId}
        />
      )}
    </main>
  );
};
