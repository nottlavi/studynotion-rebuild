import React, { use, useState } from "react";
import { HighlightText } from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import { CourseCard } from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

export const ExploreMore = () => {
  const [tab, setTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [card, setCard] = useState(courses[0]);

  const setCurrentTab = (value) => {
    setTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCard(result[0].courses[0]);
  };

  return (
    <div className="text-white  w-full flex flex-col items-center mb-40">
      <p className="text-4xl">
        Unlock the <HighlightText text={"Power of Code"} />
      </p>
      <p className="text-[17px] text-pure-greys-300 font-bold">
        {" "}
        Learn to Build Anything You Can Imagine
      </p>
      <div className="flex flex-col items-center relative">
        {/* tab container */}
        <div className="flex  border-b-[0.1px] border-pure-greys-400 bg-blue-900 w-[150%] gap-4 rounded-full my-4 py-1 ">
          {tabsName.map((elem, index) => {
            return (
              // the single tab
              <div
                key={index}
                className={`text-[16px] font-bold flex flex-row items-center gap-2 justify-center w-[50%] cursor-pointer transition-all duration-500 py-2 mx-1 ${
                  tab === elem
                    ? "bg-richblack-900 text-richblack-5 rounded-full "
                    : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5 rounded-full "
                }`}
                onClick={() => setCurrentTab(elem)}
              >
                {elem}
              </div>
            );
          })}
        </div>
        {/* card container */}
        <div className="flex gap-10 z-[10] absolute text-black top-28">
          {courses.map((ele, index) => {
            return <CourseCard
              key={index}
              cardData = {ele}
              card = {card}
              setCard = {setCard}
            />;
          })}
        </div>
      </div>
    </div>
  );
};
