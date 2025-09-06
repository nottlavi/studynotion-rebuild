import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

export const TimelineSection = () => {
  return (
    <div className="flex justify-center gap-52 my-24">
      {/* left section */}
      <div>
        {/* the single block image + description */}
        <div className="flex flex-col gap-20">
          {TimeLine.map((ele, i) => {
            return (
              <div className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center">
                  <img src={ele.Logo} />
                </div>
                <div>
                  <div className="font-bold text-[20px]"> {ele.Heading}</div>
                  <div> {ele.Description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* right section */}
      <div className="relative z-0">
        <div className="shadow-[-10px_-10px_50px_1px] shadow-blue-400 "><img className="shadow-[20px_20px] shadow-white h-[502px] w-[652px]" src={TimeLineImage}  /></div>
        <div className="absolute bg-caribbeangreen-700   flex items-center z-10 gap-10 min-w-max right-8 py-8 px-10 text-white justify-center -bottom-10 ">
          <p className="text-[30px] font-extrabold">10</p>
          <p className="text-caribbeangreen-300 w-[20%] text-[13px]">YEARS EXPERIENCE</p>
          <div className="h-[40px] w-[1px] bg-richblack-100  "></div>
          <p className="text-[30px] font-extrabold">250</p>
          <p className="text-caribbeangreen-300 w-[20%] text-[13px]">TYPES OF COURSES</p>
        </div>
      </div>
    </div>
  );
};
