import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//importing react icons here
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export const CoursePage = () => {
  //managing dependencies here
  //this is being fetched from the url the user is currently on
  const { courseId } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //managing states here
  const [currentCourse, setCurrentCourse] = useState({});
  console.log(currentCourse);

  //state to manage the expanded section
  const [expandMenu, setExpandMenu] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/courses/get-course-by-id/${courseId}`
        );
        if (res) {
          setCurrentCourse(res.data.course);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  return (
    <div>
      {/* section 1 */}
      <div className="flex flex-col gap-2">
        {/* div for course title */}
        <div> {currentCourse?.title}</div>
        {/* div for course description */}
        <div>{currentCourse?.description}</div>
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
      {/* section 2 */}
      <div>
        {/* what you will learn div */}
        <div>
          <p>What You Will Learn?</p>
          {/* dynamic info from backend */}
          <div>{currentCourse?.benifits}</div>
        </div>
        {/* course content div */}
        <div>
          <p>Course Content</p>
          {/* this div contains the no of sections, no of lectures and toggle sections button */}
          <div className="flex items-center w-[60%] justify-between">
            {/* the first section which contains all the numbers */}
            <div className="flex gap-5 items-center">
              <p>{`${currentCourse?.sections?.length} section(s)`}</p>
              <GoDotFill className="text-xs text-gray-600" />
              <p>? lecture(s)</p>
              <GoDotFill className="text-xs text-gray-600" />

              <p>? m ? s total length</p>
            </div>
            {/* the second section which contains the expand section toggle  */}
            {expandMenu ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setExpandMenu(!expandMenu);
                }}
              >
                Collapse All Sections
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setExpandMenu(!expandMenu);
                }}
              >
                Expand All Sections
              </div>
            )}
          </div>
        </div>
        {/* the actual section collapsable*/}
        {expandMenu ? (
          //when expanded
          <div
            className="cursor-pointer"
            onClick={() => {
              setExpandMenu(false);
            }}
          >
            {/* section name and arrow icon */}
            <div>
              <MdKeyboardArrowDown />
            </div>
          </div>
        ) : (
          // when collapsed
          <div
            className="cursor-pointer"
            onClick={() => {
              setExpandMenu(true);
            }}
          >
            {/* section name and arrow icon*/}
            <div>
              <MdKeyboardArrowRight />
            </div>
            {/* lecture count */}
            <div></div>
          </div>
        )}
        {/* the author div */}
        <div className="flex gap-4 flex-col">
          <p>Author</p>
          <p>
            {`${currentCourse?.instructor?.firstName}`}{" "}
            {`${currentCourse?.instructor?.lastName}`}
          </p>
        </div>
      </div>
    </div>
  );
};
