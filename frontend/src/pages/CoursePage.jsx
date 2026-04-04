import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//importing pages here
import { ReviewComponent } from "../components/semi/ReviewComponent";

//importing react icons here
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { FaShareSquare, FaStar } from "react-icons/fa";

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

  ///all the states here
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
    <main className="site-shell float-in">
      <div className="grid lg:grid-cols-[1fr_320px] gap-4 relative">
        <div className="page-hero flex flex-col gap-2">
          <div className="text-sm text-slate-500">
            Home / Learning /{" "}
            {currentCourse?.category?.name === "web-development"
              ? "Web Development"
              : ""}
          </div>
          <div className="text-3xl font-extrabold">{currentCourse?.title}</div>
          <div className="text-slate-700">{currentCourse?.description}</div>
          <div className="flex gap-1 items-center flex-wrap">
            <p>{currentCourse?.rating?.average}</p>
            <div className="flex gap-1">
              <FaStar
                className={
                  currentCourse?.rating?.average >= 1
                    ? "text-yellow-500"
                    : "text-white"
                }
              />
              <FaStar
                className={
                  currentCourse?.rating?.average >= 2
                    ? "text-yellow-500"
                    : "text-white"
                }
              />
              <FaStar
                className={
                  currentCourse?.rating?.average >= 3
                    ? "text-yellow-500"
                    : "text-white"
                }
              />
              <FaStar
                className={
                  currentCourse?.rating?.average >= 4
                    ? "text-yellow-500"
                    : "text-white"
                }
              />
              <FaStar
                className={
                  currentCourse?.rating?.average >= 5
                    ? "text-yellow-500"
                    : "text-white"
                }
              />
            </div>
            <p>({currentCourse?.rating?.count} ratings)</p>
            <p>{currentCourse?.enrolledUsers?.length} student(s)</p>
          </div>
          <div className="text-slate-700">
            created by {currentCourse?.instructor?.firstName}{" "}
            {currentCourse?.instructor?.lastName}
          </div>
          <div className="flex gap-2 text-sm text-slate-500">
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

        {profile?.accountType === "Instructor" ? (
          <div></div>
        ) : (
          <aside className="glass-panel p-3 h-fit lg:sticky lg:top-24 flex flex-col gap-2">
            <img
              src={currentCourse?.thumbnail}
              height={300}
              width={300}
              className="rounded-xl w-full object-cover"
            />
            <div className="text-3xl font-extrabold text-blue-700">
              ₹ {currentCourse?.price}
            </div>
            <button>Buy Now</button>
            <button onClick={addToCartHandler}>Add to Cart</button>
            <div className="text-sm text-slate-500">
              30-Day Money-Back Guarantee
            </div>
            <div className="font-semibold">This Course Includes:</div>
            <div
              className="flex gap-2 items-center cursor-pointer text-blue-700 font-semibold"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <FaShareSquare /> Share
            </div>
          </aside>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="section-card">
          <p className="text-2xl font-bold">What You Will Learn?</p>
          <div className="mt-2 text-slate-700">{currentCourse?.benifits}</div>
        </div>

        <div className="section-card">
          <p className="text-2xl font-bold">Course Content</p>
          <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
            <div className="flex gap-5 items-center text-sm text-slate-600 flex-wrap">
              <p>{`${currentCourse?.sections?.length} section(s)`}</p>
              <GoDotFill className="text-xs text-gray-600" />
              <p>{totalSubsections} lecture(s)</p>
              <GoDotFill className="text-xs text-gray-600" />
              <p>
                {minutes} m {seconds} s total length
              </p>
            </div>
            {expandMenu ? (
              <div
                className="cursor-pointer text-blue-700 font-semibold"
                onClick={() => {
                  setExpandMenu(!expandMenu);
                }}
              >
                Collapse All Sections
              </div>
            ) : (
              <div
                className="cursor-pointer text-blue-700 font-semibold"
                onClick={() => {
                  setExpandMenu(!expandMenu);
                }}
              >
                Expand All Sections
              </div>
            )}
          </div>

          <div className="mt-2">
            {currentCourse?.sections?.map((ele) =>
              expandMenu || ele._id === expandOneSection ? (
                <div
                  key={ele._id}
                  className="cursor-pointer mt-2 section-card !bg-slate-50 flex justify-between flex-col"
                  onClick={() => {
                    setExpandOneSection(null);
                  }}
                >
                  <div className="flex w-full justify-between">
                    <div className="flex gap-4 items-center">
                      <MdKeyboardArrowDown />
                      {ele?.title}
                    </div>
                    <div>{ele?.subsections.length} lecture(s)</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 mt-2 flex gap-2 items-center flex-wrap">
                    {ele.subsections.length > 0 ? (
                      <div>
                        <IoVideocam />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {ele.subsections.map((lecture) => (
                      <div key={lecture._id}>{lecture.title}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key={ele._id}
                  className="cursor-pointer mt-2 section-card !bg-slate-50 flex justify-between"
                  onClick={() => {
                    setExpandOneSection(ele._id);
                  }}
                >
                  <div className="flex gap-4 items-center">
                    <MdKeyboardArrowRight />
                    {ele?.title}
                  </div>
                  <div>{ele?.subsections.length} lecture(s)</div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="section-card flex gap-2 flex-col">
          <p className="text-xl font-bold">Author</p>
          <p className="text-slate-700">
            {`${currentCourse?.instructor?.firstName}`}{" "}
            {`${currentCourse?.instructor?.lastName}`}
          </p>
        </div>

        <div className="section-card">Review from other Learners</div>
      </div>
    </main>
  );
};
