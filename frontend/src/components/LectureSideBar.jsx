///all the imports here
//importing dependencies here
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//importing icons here
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export const LectureSideBar = () => {
  ///all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { courseId } = useParams();

  ///all the states here
  const [currentCourse, setCurrentCourse] = useState({});
  const [sectionsExpanded, setSectionsExpanded] = useState([]);

  ///all the useEffects here
  //useEffect to fetch the course details whenever the course id changes
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

  ///all the functions here
  // function to add the clicked section to the array of expanded sections
  const expandSection = (sectionId) => {
    if (!sectionsExpanded.includes(sectionId)) {
      setSectionsExpanded((prev) => [...prev, sectionId]);
    } else {
      setSectionsExpanded((prev) => prev.filter((id) => id !== sectionId));
    }
  };

  const totalSubsections =
    currentCourse?.sections?.reduce(
      (acc, section) => acc + (section.subsections?.length || 0),
      0,
    ) || 0;

  console.log(currentCourse, sectionsExpanded);
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
        {currentCourse?.sections?.map((section) => {
          const sectionDuration =
            section.subsections?.reduce(
              (acc, sub) => acc + (sub.duration || 0),
              0,
            ) || 0;

          const minutes = Math.floor(sectionDuration / 60);
          const seconds = Math.floor(sectionDuration % 60);
          return (
            <div key={section._id} className="relative">
              <div
                onClick={() => {
                  expandSection(section._id);
                }}
                className="flex cursor-pointer items-center justify-between"
              >
                <div>{section?.title}</div>
                <div className="flex items-center">
                  {`${minutes}m${seconds}s`}
                  {sectionsExpanded.includes(section._id) ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
              </div>

              {/* the whole ui below will only be rendered if the current section on the map is expanded */}
              {sectionsExpanded.includes(section._id) && (
                //will render all the subsections of this particular section here
                <div>
                  {section?.subsections?.map((subsection) => (
                    // the individual subsection
                    <div className="flex">
                      {/* check box */}
                      {subsection?.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
