import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//importing pages here
import { ReviewComponent } from "../components/semi/ReviewComponent";

//importing react icons here
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";

//importing redux stuff here
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseTotal } from "../slices/cartSlice";

export const CoursePage = () => {
  ///all redux stuff here
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  ///all dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //this is being fetched from the url, the user is currently on
  const { courseId } = useParams();

  ///all states here
  const [currentCourse, setCurrentCourse] = useState({});
  //state to manage the expanded section
  const [expandMenu, setExpandMenu] = useState(false);
  //state to expand one particular section this will be through element id
  const [expandOneSection, setExpandOneSection] = useState();

  ///all the functions here
  //function to call backend to add a course to cart
  const addToCartHandler = async (e) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/cart/add-to-cart`,
        { courseId: currentCourse._id },
        { withCredentials: true },
      );
      if (res) {
        console.log(res);
        dispatch(addToCart());
        dispatch(increaseTotal(currentCourse.price));
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///all useEffects here
  //this useEffect fetches course details on every course id change
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/courses/get-course-by-id/${courseId}`,
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
  }, [courseId, currentCourse]);

  const totalSubsections =
    currentCourse?.sections?.reduce(
      (total, section) => total + section.subsections.length,
      0,
    ) || 0;

  const totalLectureSeconds =
    currentCourse?.sections?.reduce((total, section) => {
      return (
        total +
        section.subsections.reduce(
          (subTotal, lecture) => subTotal + (lecture.duration || 0),
          0,
        )
      );
    }, 0) || 0;

  const minutes = Math.floor(totalLectureSeconds);
  const seconds = Math.round((totalLectureSeconds - minutes) * 60);

  return (
    <div>
      {/* section 1 */}
      <div className="flex flex-col gap-2 relative">
        {/* div for path */}
        <div>
          Home / Learning /{" "}
          {currentCourse?.category?.name === "web-development"
            ? "Web Development"
            : ""}
        </div>
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
      {/* floating menu */}
      {profile?.accountType === "Instructor" ? (
        <div></div>
      ) : (
        <div className="absolute right-3 top-12 flex flex-col">
          {/* course thumbnail */}
          <img src={currentCourse?.thumbnail} height={300} width={300} />
          {/* div for course price */}
          <div>₹ {currentCourse?.price}</div>
          <button>Buy Now</button>
          <button onClick={addToCartHandler}>Add to Cart</button>
          <div>30-Day Money-Back Guarantee</div>
          <div>This Course Includes: </div>
          {/* share thing div */}
          <div
            className="flex gap-2 items-center cursor-pointer text-yellow-500"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <FaShareSquare /> Share
          </div>
        </div>
      )}
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
              <p>{totalSubsections} lecture(s)</p>
              <GoDotFill className="text-xs text-gray-600" />

              <p>
                {minutes} m {seconds} s total length
              </p>
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
        {/* div for rendering sections and subsections */}
        <div>
          {/* there might be multiple sections, this map function iterates and makes
        an individual gray zone for each section */}
          {currentCourse?.sections?.map((ele) =>
            expandMenu || ele._id === expandOneSection ? (
              // when the particular section is expanded
              <div
                key={ele._id}
                className="cursor-pointer bg-gray-500 opacity-50 flex justify-between flex-col border-gray-400 border-[0.1px]"
                onClick={() => {
                  setExpandOneSection(null);
                }}
              >
                {/* the exact same part as in when not expanded */}
                <div className="flex w-full justify-between">
                  {/* the left part which contains the arrow and the section name */}
                  <div className="flex gap-4 items-center">
                    <MdKeyboardArrowDown />
                    {ele?.title}
                  </div>
                  {/* the right part which shows no of lectures */}
                  <div className="">{ele?.subsections.length} lecture(s)</div>
                </div>
                {/* the part exclusive for expanded */}
                <div className="bg-black flex gap-2 items-center">
                  {ele.subsections.length > 0 ? (
                    <div>
                      <IoVideocam />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {/* there can be multiple sub sections/lectures for a single section
                so i am mapping it */}
                  {ele.subsections.map((lecture) => (
                    // the div for individual lecture title (just display)
                    <div key={lecture._id}>{lecture.title}</div>
                  ))}
                </div>
              </div>
            ) : (
              // when the particular section is not expanded
              <div
                key={ele._id}
                className="cursor-pointer bg-gray-500 opacity-50 flex justify-between border-gray-400 border-[0.1px]"
                onClick={() => {
                  setExpandOneSection(ele._id);
                }}
              >
                {/* the left part which contains the arrow and the section name */}
                <div className="flex gap-4 items-center">
                  <MdKeyboardArrowRight />
                  {ele?.title}
                </div>
                {/* the right part which shows no of lectures */}
                <div className="">{ele?.subsections.length} lecture(s)</div>
              </div>
            ),
          )}
        </div>
        {/* the author div */}
        <div className="flex gap-4 flex-col">
          <p>Author</p>
          <p>
            {`${currentCourse?.instructor?.firstName}`}{" "}
            {`${currentCourse?.instructor?.lastName}`}
          </p>
        </div>
        {/* reviews div */}
        <ReviewComponent />
      </div>
    </div>
  );
};
